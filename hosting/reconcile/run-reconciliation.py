"""Review draft: one VM reconciliation/proof/QA pipeline, no publication token."""
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys

APP = "9f83e87e4447b805373ff9f7f206adb737e5c413"
MAIN = "e09b9e572e840710ae77c47a01ed10f16d7719f5"
DATA = ["lib/generatedDiscoveryReview.ts", "lib/generatedLibraryOpportunities.ts", "public/opportunities.json"]


def digest(path):
    h = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(65536), b""):
            h.update(block)
    return h.hexdigest()


def main():
    ops = Path(os.environ["OPS_ROOT"]).resolve()
    tools = ops / "hosting/reconcile"
    app = Path(os.environ["APP_REPO"]).resolve()
    candidate = Path(os.environ["RUNNER_TEMP"]) / "reviewed-data-candidate"
    evidence = Path(os.environ["RUNNER_TEMP"]) / "reviewed-data-evidence"
    expected_ops = os.environ["EXPECTED_OPS_COMMIT"]
    if not re.fullmatch(r"[0-9a-f]{40}", expected_ops) or os.environ["GITHUB_SHA"] != expected_ops:
        raise RuntimeError("Operations commit is not the immutable reviewed commit")
    if any(os.environ.get(key) for key in ["GH_TOKEN", "GITHUB_TOKEN", "RECONCILE_WRITE_TOKEN"]):
        raise RuntimeError("Write credentials must not reach app verification")
    stages = []

    def run(name, command, cwd, offline=False, timeout=300):
        env = dict(os.environ)
        env.update(CI="1", NEXT_TELEMETRY_DISABLED="1", npm_config_fund="false",
                   npm_config_cache=str(Path(os.environ["RUNNER_TEMP"]) / "ephemeral-npm-cache"))
        if offline:
            env["NODE_OPTIONS"] = "--max-old-space-size=1536 --import=" + (tools / "offline-network.mjs").as_uri()
            env["GTA_PUBLIC_OPPORTUNITIES_EXPORT"] = str(candidate / "public/opportunities.json")
        print(json.dumps({"stage": name, "state": "start", "command": command}), flush=True)
        result = subprocess.run(command, cwd=cwd, env=env, timeout=timeout)
        stages.append({"stage": name, "exit": result.returncode})
        print(json.dumps(stages[-1]), flush=True)
        if result.returncode:
            raise RuntimeError("First failed stage: " + name)

    run("pin-ops-helpers", [sys.executable, str(tools / "verify-helpers.py"), "--expected-sha256",
                           os.environ["EXPECTED_HELPERS_SHA256"]], ops)
    actual = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ops, text=True).strip()
    if actual != expected_ops:
        raise RuntimeError("Operations checkout mismatch")
    hook_config = subprocess.run(["git", "config", "--get-all", "core.hooksPath"],
                                 cwd=app, capture_output=True, text=True)
    if hook_config.returncode != 1 or hook_config.stdout.strip():
        raise RuntimeError("Unexpected configured hooks; stop for read-only review, never bypass")
    common = Path(subprocess.check_output(["git", "rev-parse", "--git-common-dir"], cwd=app, text=True).strip())
    common = common if common.is_absolute() else app / common
    if any(path.is_file() and not path.name.endswith(".sample") for path in (common / "hooks").iterdir()):
        raise RuntimeError("Active hook files need separate review before execution")
    # A fresh runner need not have an identity. Worktrees share this dedicated
    # VM repository's LOCAL config; no global/system/Mac configuration is changed.
    run("set-VM-repository-committer-name", ["git", "config", "--local", "user.name", "github-actions[bot]"], app)
    run("set-VM-repository-committer-email", ["git", "config", "--local", "user.email",
        "41898282+github-actions[bot]@users.noreply.github.com"], app)
    # checkout's canonical HTTPS origin omits .git; normalize only this dedicated
    # VM repository to the exact same own-repository URL accepted by prepare.
    run("normalize-VM-own-repository-origin", ["git", "remote", "set-url", "origin",
        "https://github.com/rupayon123/gta-free-stem-opportunities.git"], app)
    # Same approved ordinary merge/streamed baselines/checks, on the VM only.
    run("ordinary-merge-preparation", [sys.executable, str(tools / "prepare-candidate.py"),
        "--repository", str(app), "--new-candidate", str(candidate), "--new-evidence", str(evidence),
        "--execute-reviewed-plan"], ops)
    base = subprocess.check_output(["git", "merge-base", APP, MAIN], cwd=candidate, text=True).strip()
    changed_main = subprocess.check_output(["git", "diff", "--name-only", base, MAIN], cwd=candidate, text=True).splitlines()
    if set(changed_main) != set(DATA):
        raise RuntimeError("Fresh main includes changes outside the reviewed three data files")
    run("record-runtime-versions", ["node", "--version"], candidate)
    run("record-package-manager-version", ["npm", "--version"], candidate)
    run("locked-dependencies-no-lifecycle", ["npm", "ci", "--ignore-scripts", "--no-audit", "--no-fund"], candidate)
    run("production-dependency-audit", ["npm", "audit", "--omit=dev", "--audit-level=high"], candidate)
    helper = candidate / "scripts/.local-reconcile-policy.ts"
    if helper.exists():
        raise RuntimeError("Unexpected candidate helper collision")
    shutil.copyfile(tools / "overlay-reviewed-policy.ts", helper)
    node = ["node", "--import", str(candidate / "node_modules/tsx/dist/loader.mjs")]
    run("offline-reviewed-policy-overlay", [*node, str(helper), str(candidate), str(evidence)], candidate, offline=True)
    if digest(helper) != digest(tools / "overlay-reviewed-policy.ts"):
        raise RuntimeError("Temporary helper changed; preserve it and stop")
    helper.unlink()  # Only our exact new helper, never a reviewed product file.
    run("offline-library-partition", [*node, "scripts/prepare-library-catalog.ts"], candidate, offline=True)
    run("offline-compact-source-export", [*node, "scripts/export-public-opportunities.ts", "--publish"], candidate, offline=True)
    run("full-real-native-postproof", [sys.executable, str(tools / "verify-reconciled-feed.py"),
        "--candidate", str(candidate), "--evidence", str(evidence)], candidate)
    native_freeze = {name: digest(candidate / name) for name in DATA}
    run("existing-export-selftest", [*node, "scripts/export-public-opportunities.ts", "--self-test"], candidate, offline=True)
    run("existing-npm-qa", ["npm", "run", "qa"], candidate, offline=True, timeout=600)
    if native_freeze != {name: digest(candidate / name) for name in DATA}:
        raise RuntimeError("QA changed the accepted reconciled data")
    run("post-QA-real-native-postproof", [sys.executable, str(tools / "verify-reconciled-feed.py"),
        "--candidate", str(candidate), "--evidence", str(evidence)], candidate)
    run("recheck-ops-helpers", [sys.executable, str(tools / "verify-helpers.py"), "--expected-sha256",
                             os.environ["EXPECTED_HELPERS_SHA256"]], ops)
    for args, expected in [(["rev-parse", "HEAD"], APP), (["rev-parse", "MERGE_HEAD"], MAIN)]:
        if subprocess.check_output(["git", *args], cwd=candidate, text=True).strip() != expected:
            raise RuntimeError("Candidate merge parent changed")
    changed = subprocess.check_output(["git", "diff", "HEAD", "--name-only"], cwd=candidate, text=True).splitlines()
    if set(changed) - set(DATA):
        raise RuntimeError("Non-data product changes")
    if subprocess.check_output(["git", "ls-files", "--others", "--exclude-standard"], cwd=candidate).strip():
        raise RuntimeError("Untracked files would contaminate the candidate")
    subprocess.run(["git", "add", "--", *DATA], cwd=candidate, check=True)
    subprocess.run(["git", "diff", "--cached", "--check"], cwd=candidate, check=True)
    staged = subprocess.check_output(["git", "diff", "--cached", "--name-only"], cwd=candidate, text=True).splitlines()
    if set(staged) - set(DATA):
        raise RuntimeError("Unexpected staged paths")
    tree = subprocess.check_output(["git", "write-tree"], cwd=candidate, text=True).strip()
    result = {"allStagesPassed": True, "stages": stages, "app": APP, "main": MAIN,
              "operationsCommit": expected_ops, "operationsHelpersSHA256": os.environ["EXPECTED_HELPERS_SHA256"],
              "candidateTree": tree, "changedPaths": changed, "stagedPaths": staged,
              "fileSHA256": native_freeze, "providerRequests": 0, "published": False}
    (evidence / "verified-pipeline.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result), flush=True)
    for name in ["preparation.json", "overlay.json", "native-postproof.json"]:
        print(json.dumps({"receipt": name, "data": json.loads((evidence / name).read_text())}), flush=True)


if __name__ == "__main__":
    main()
