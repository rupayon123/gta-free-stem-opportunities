#!/usr/bin/env python3
"""Exercise publication against disposable local remotes; never contact GitHub."""

import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


HELPER = Path(__file__).resolve().with_name("publish-refreshed-opportunities.sh")
GIT = shutil.which("git")
FILES = (
    "lib/generatedLibraryOpportunities.ts",
    "lib/generatedDiscoveryReview.ts",
    "public/opportunities.json",
)
GATES = ["ci", "audit --omit=dev --audit-level=high", "run engine:refresh", "run build"]


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="gta-publication-test-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.remote = self.root / "remote.git"
        self.runner = self.root / "runner"
        self.human = self.root / "human"
        self.git(self.root, "init", "--bare", "--initial-branch=main", str(self.remote))
        self.git(self.root, "clone", str(self.remote), str(self.human))
        self.configure(self.human)
        self.write_data(self.human, "base")
        (self.human / "source.txt").write_text("base")
        self.git(self.human, "add", ".")
        self.git(self.human, "commit", "-m", "Initial sources")
        self.git(self.human, "push", "origin", "main")
        # Match actions/checkout's shallow history, rather than relying on a full
        # clone to prove that the fetched new tip descends from the old base.
        self.git(self.root, "clone", "--depth=1", self.remote.as_uri(), str(self.runner))
        self.configure(self.runner)
        self.write_data(self.runner, "bot refresh from base")
        self.log = self.root / "commands.log"
        binaries = self.root / "bin"
        binaries.mkdir()
        (binaries / "git").write_text("""#!/usr/bin/env python3
import json, os, pathlib, subprocess, sys
args = sys.argv[1:]
with open(os.environ['TEST_LOG'], 'a') as log:
    log.write(json.dumps(['git', *args]) + '\\n')
if args and args[0] == 'push':
    if os.environ.get('DENY_PUSH') == '1':
        print('remote: Permission denied (publickey).', file=sys.stderr)
        sys.exit(128)
    if os.environ.get('FAKE_SAME_TIP_REJECTION') == '1':
        print('!\\tHEAD:refs/heads/main\\t[rejected] (fetch first)')
        sys.exit(1)
    if os.environ.get('RACE_EVERY_PUSH') == '1':
        human = pathlib.Path(os.environ['TEST_HUMAN'])
        git = [os.environ['REAL_GIT'], '-C', str(human)]
        subprocess.run([*git, 'pull', '--ff-only'], check=True, capture_output=True)
        revision = human / 'source.txt'
        revision.write_text(revision.read_text() + '-new')
        (human / 'lib/generatedLibraryOpportunities.ts').write_text(revision.read_text())
        subprocess.run([*git, 'add', '.'], check=True)
        subprocess.run([*git, 'commit', '-m', 'Concurrent source change'], check=True, capture_output=True)
        subprocess.run([*git, 'push', 'origin', 'main'], check=True, capture_output=True)
sys.exit(subprocess.run([os.environ['REAL_GIT'], *args]).returncode)
""")
        (binaries / "npm").write_text("""#!/usr/bin/env python3
import json, os, pathlib, sys
with open(os.environ['TEST_LOG'], 'a') as log:
    log.write(json.dumps(['npm', *sys.argv[1:]]) + '\\n')
command = ' '.join(sys.argv[1:])
if command == os.environ.get('FAIL_NPM_GATE'):
    print('Fixture failure for npm ' + command, file=sys.stderr)
    sys.exit(43)
if sys.argv[1:] == ['run', 'engine:refresh']:
    if os.environ.get('FAIL_ENGINE') == '1':
        sys.exit(42)
    source = pathlib.Path('source.txt').read_text()
    for name in json.loads(os.environ['TEST_FILES']):
        pathlib.Path(name).write_text('regenerated from ' + source)
""")
        for binary in binaries.iterdir():
            binary.chmod(0o755)
        self.env = {
            **os.environ,
            "PATH": str(binaries) + os.pathsep + os.environ["PATH"],
            "GITHUB_ACTIONS": "true",
            "RUNNER_ENVIRONMENT": "github-hosted",
            "GITHUB_REF_TYPE": "branch",
            "GITHUB_REF_NAME": "main",
            "GITHUB_WORKSPACE": str(self.runner),
            "REAL_GIT": GIT,
            "TEST_LOG": str(self.log),
            "TEST_FILES": json.dumps(FILES),
            "TEST_HUMAN": str(self.human),
        }

    def git(self, cwd, *arguments, check=True):
        return subprocess.run([GIT, *arguments], cwd=cwd, text=True, capture_output=True, check=check)

    def configure(self, repo):
        self.git(repo, "config", "user.name", "Fixture contributor")
        self.git(repo, "config", "user.email", "fixture@example.invalid")

    def write_data(self, repo, value):
        for name in FILES:
            path = repo / name
            path.parent.mkdir(exist_ok=True, parents=True)
            path.write_text(value)

    def advance(self):
        (self.human / "source.txt").write_text("new source policy")
        self.write_data(self.human, "competing generated data")
        self.git(self.human, "add", ".")
        self.git(self.human, "commit", "-m", "Human changes source and generated files")
        self.git(self.human, "push", "origin", "main")
        return self.git(self.human, "rev-parse", "HEAD").stdout.strip()

    def run_helper(self, **environment):
        return subprocess.run(["bash", str(HELPER)], cwd=self.runner,
                              env={**self.env, **environment}, text=True, capture_output=True)

    def commands(self, name):
        return [row[1:] for row in map(json.loads, self.log.read_text().splitlines()) if row[0] == name] if self.log.exists() else []

    def remote_head(self):
        return self.git(self.remote, "rev-parse", "main").stdout.strip()

    def test_original_publisher_reproduces_confirmed_race(self):
        tip = self.advance()
        self.git(self.runner, "add", ".")
        self.git(self.runner, "commit", "-m", "Original unretied refresh")
        result = self.git(self.runner, "push", "origin", "main", check=False)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("fetch first", result.stderr)
        self.assertEqual(self.remote_head(), tip)

    def test_concurrent_generated_collision_regenerates_from_new_source(self):
        tip = self.advance()
        result = self.run_helper()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual((self.runner / "source.txt").read_text(), "new source policy")
        for name in FILES:
            self.assertEqual(self.git(self.remote, "show", "main:" + name).stdout,
                             "regenerated from new source policy")
        self.git(self.remote, "merge-base", "--is-ancestor", tip, "main")
        self.assertEqual([" ".join(cmd) for cmd in self.commands("npm")], GATES)
        self.assertEqual(sum(cmd[0] == "push" for cmd in self.commands("git")), 2)
        self.assertEqual(sum(cmd[0] == "reset" for cmd in self.commands("git")), 1)

    def test_normal_publish_does_not_reset_or_repeat_gates(self):
        result = self.run_helper()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.commands("npm"), [])
        self.assertFalse(any(cmd[0] == "reset" for cmd in self.commands("git")))
        self.assertEqual(sum(cmd[0] == "push" for cmd in self.commands("git")), 1)

    def test_no_change_does_not_push(self):
        self.git(self.runner, "restore", ".")
        self.assertEqual(self.run_helper().returncode, 0)
        self.assertFalse(any(cmd[0] == "push" for cmd in self.commands("git")))

    def test_auth_failure_does_not_fetch_reset_or_regenerate(self):
        tip = self.advance()
        result = self.run_helper(DENY_PUSH="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Permission denied", result.stderr)
        self.assertEqual(self.remote_head(), tip)
        self.assertFalse(any(cmd[0] in ("reset", "fetch") for cmd in self.commands("git")))
        self.assertEqual(self.commands("npm"), [])

    def test_failed_regeneration_keeps_human_remote_unchanged(self):
        tip = self.advance()
        self.assertNotEqual(self.run_helper(FAIL_ENGINE="1").returncode, 0)
        self.assertEqual(self.remote_head(), tip)
        self.assertEqual(sum(cmd[0] == "push" for cmd in self.commands("git")), 1)
        self.assertNotIn(["run", "build"], self.commands("npm"))

    def assert_failed_retry_gate_preserves_remote(self, gate):
        tip = self.advance()
        accepted_tree = self.git(self.remote, "rev-parse", "main^{tree}").stdout.strip()
        accepted_data = {name: self.git(self.remote, "show", "main:" + name).stdout for name in FILES}

        result = self.run_helper(FAIL_NPM_GATE=gate)

        self.assertEqual(result.returncode, 43, result.stderr)
        self.assertIn("Fixture failure for npm " + gate, result.stderr)
        self.assertIn("Regenerating against its new tip (attempt 2/3)", result.stdout)
        self.assertEqual(self.remote_head(), tip)
        self.assertEqual(self.git(self.remote, "rev-parse", "main^{tree}").stdout.strip(), accepted_tree)
        for name, contents in accepted_data.items():
            self.assertEqual(self.git(self.remote, "show", "main:" + name).stdout, contents)
        self.assertEqual([" ".join(cmd) for cmd in self.commands("npm")], GATES[:GATES.index(gate) + 1])
        commands = self.commands("git")
        # Only the original, rejected bot publication is attempted. A failed
        # retry gate must never commit or publish the regenerated local files.
        self.assertEqual(sum(cmd[0] == "push" for cmd in commands), 1)
        self.assertEqual(sum(cmd[0] == "commit" for cmd in commands), 1)
        self.assertEqual(sum(cmd[0] == "fetch" for cmd in commands), 1)
        self.assertEqual(sum(cmd[0] == "reset" for cmd in commands), 1)
        self.assertFalse(any(
            argument == "-f" or argument.startswith(("--force", "+"))
            for command in commands if command[0] == "push"
            for argument in command[1:]
        ))

    def test_failed_retry_dependency_install_keeps_accepted_remote_unchanged(self):
        self.assert_failed_retry_gate_preserves_remote("ci")

    def test_failed_retry_production_audit_keeps_accepted_remote_unchanged(self):
        self.assert_failed_retry_gate_preserves_remote("audit --omit=dev --audit-level=high")

    def test_failed_retry_build_keeps_accepted_remote_unchanged(self):
        self.assert_failed_retry_gate_preserves_remote("run build")

    def test_rejection_without_remote_advance_does_not_reset(self):
        tip = self.remote_head()
        result = self.run_helper(FAKE_SAME_TIP_REJECTION="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("did not advance normally", result.stderr)
        self.assertEqual(self.remote_head(), tip)
        self.assertFalse(any(cmd[0] == "reset" for cmd in self.commands("git")))
        self.assertEqual(self.commands("npm"), [])

    def test_repeated_races_stop_after_three_normal_pushes(self):
        result = self.run_helper(RACE_EVERY_PUSH="1")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("three attempts", result.stderr)
        commands = self.commands("git")
        self.assertEqual(sum(cmd[0] == "push" for cmd in commands), 3)
        self.assertEqual(sum(cmd[0] == "reset" for cmd in commands), 2)
        self.assertFalse(any("--force" in cmd or "+HEAD" in " ".join(cmd) for cmd in commands))
        self.assertEqual([" ".join(cmd) for cmd in self.commands("npm")], GATES * 2)

    def test_non_ci_checkout_is_never_reset_or_published(self):
        self.assertNotEqual(self.run_helper(GITHUB_ACTIONS="false").returncode, 0)
        self.assertEqual(self.commands("git"), [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
