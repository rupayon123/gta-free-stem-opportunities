"""REVIEW DRAFT: run only under a separately granted guarded resource batch.

Creates one disposable detached candidate. Never changes the reviewed worktree,
commits, pushes, invokes providers, or starts a subsequent verification stage.
On error retain the candidate for inspection; never reset/retry automatically.
"""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
import subprocess

MAIN = "eba9d4aa569f9c89178d698d4cf37f35226a500b"
APP = "9f83e87e4447b805373ff9f7f206adb737e5c413"
BRANCH = "refs/heads/codex/web-preview-20261030"
GENERATED = {
    "lib/generatedDiscoveryReview.ts": "8a623ffcc787d70cee9d6196d348bf6d1a0fa34d",
    "lib/generatedLibraryOpportunities.ts": "bd7a877d460433f411003120b35e7695ffa7f421",
    "public/opportunities.json": "e58921934b5246b32f1c6edcfdf86f18b529ee7e",
}
YOUTH = ["data/youth-hunter-state.json", "data/youth-hunter-manifest.json", "public/youth-opportunities.json"]


def git(root, *args, check=True, stdout=None):
    # Record the last actual operation even if the resource guard stops Git.
    print(json.dumps({"operation": "git-start", "cwd": str(root), "args": list(args)}), flush=True)
    result = subprocess.run(["git", "-c", "gc.auto=0", "-c", "maintenance.auto=false",
                             "-c", "pack.threads=1", "-c", "pack.windowMemory=16m",
                             "-c", "pack.deltaCacheSize=16m", "-c", "core.packedGitWindowSize=4m",
                             "-c", "core.packedGitLimit=16m", "-c", "index.threads=1",
                             "-c", "checkout.workers=1", *args], cwd=root,
                            stdout=subprocess.PIPE if stdout is None else stdout,
                            stderr=subprocess.PIPE, check=False)
    print(json.dumps({"operation": "git-end", "args": list(args), "exit": result.returncode}), flush=True)
    if check and result.returncode != 0:
        raise subprocess.CalledProcessError(result.returncode, result.args, output=result.stdout, stderr=result.stderr)
    return result


def sha256_file(path):
    result = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(64 * 1024), b""):
            result.update(block)
    return result.hexdigest()


def remote_pin(repo, ref):
    lines = git(repo, "ls-remote", "--refs", "origin", ref).stdout.decode().splitlines()
    if len(lines) != 1 or lines[0].split()[1] != ref:
        raise RuntimeError("Missing or ambiguous remote ref")
    return lines[0].split()[0]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repository", type=Path, required=True)
    parser.add_argument("--new-candidate", type=Path, required=True)
    parser.add_argument("--new-evidence", type=Path, required=True)
    parser.add_argument("--execute-reviewed-plan", action="store_true")
    args = parser.parse_args()
    if not args.execute_reviewed_plan:
        raise RuntimeError("Source draft only; execution requires a separate coordinator grant")
    repo, candidate, evidence = (p.resolve() for p in (args.repository, args.new_candidate, args.new_evidence))
    def overlaps(left, right):
        return left == right or left in right.parents or right in left.parents
    if candidate.exists() or evidence.exists() or overlaps(candidate, repo) or overlaps(evidence, repo) or overlaps(candidate, evidence):
        raise RuntimeError("Candidate/evidence must be new isolated paths outside the reviewed worktree")
    origin = git(repo, "remote", "get-url", "origin").stdout.decode().strip()
    if origin not in ("https://github.com/rupayon123/gta-free-stem-opportunities.git",
                      "git@github.com:rupayon123/gta-free-stem-opportunities.git"):
        raise RuntimeError("Unexpected origin")
    if remote_pin(repo, "refs/heads/main") != MAIN or remote_pin(repo, BRANCH) != APP:
        raise RuntimeError("Main or draft head advanced: stop and obtain a new reviewed plan")
    # Immutable Git object retrieval only; no provider request or working-tree checkout.
    git(repo, "fetch", "--no-tags", "--no-write-fetch-head", "origin", MAIN, APP)
    if remote_pin(repo, "refs/heads/main") != MAIN:
        raise RuntimeError("Main advanced during object retrieval")
    for path, expected in GENERATED.items():
        if git(repo, "rev-parse", MAIN + ":" + path).stdout.decode().strip() != expected:
            raise RuntimeError("Fresh generated blob identity mismatch: " + path)
    evidence.mkdir(parents=True)
    baseline = {}
    for path in [*GENERATED, *YOUTH]:
        ref = MAIN if path in GENERATED else APP
        dest = evidence / "baseline" / path
        dest.parent.mkdir(parents=True, exist_ok=True)
        # Stream Git stdout straight to a new file, never a 27+ MB PIPE buffer.
        with dest.open("xb") as stream:
            git(repo, "show", ref + ":" + path, stdout=stream)
        baseline[path] = {"ref": ref, "sha256": sha256_file(dest), "bytes": dest.stat().st_size}
    # Separate registration and checkout: no worktree-add parent plus reset child
    # simultaneously retaining the large checkout. Configured hooks stay honored.
    git(repo, "worktree", "add", "--detach", "--no-checkout", str(candidate), APP)
    git(candidate, "restore", "--source=" + APP, "--staged", "--worktree", "--", ".")
    merged = git(candidate, "merge", "--no-commit", "--no-ff", MAIN, check=False)
    (evidence / "merge-stdout.txt").write_bytes(merged.stdout)
    (evidence / "merge-stderr.txt").write_bytes(merged.stderr)
    conflicts = git(candidate, "diff", "--name-only", "--diff-filter=U").stdout.decode().splitlines()
    if merged.returncode not in (0, 1) or (merged.returncode == 1 and not conflicts) or set(conflicts) - set(GENERATED):
        raise RuntimeError("Unexpected merge conflict/failure; candidate preserved, no automatic resolution")
    for path in GENERATED:
        # Resolve only these three paths to the exact pinned fresh-main bytes.
        with (evidence / "baseline" / path).open("rb") as source, (candidate / path).open("wb") as destination:
            shutil.copyfileobj(source, destination, length=64 * 1024)
    git(candidate, "add", "--", *GENERATED)
    if git(candidate, "diff", "--name-only", "--diff-filter=U").stdout.strip():
        raise RuntimeError("Unresolved merge paths")
    for path in YOUTH:
        if sha256_file(candidate / path) != baseline[path]["sha256"]:
            raise RuntimeError("Youth paired snapshot changed")
    if git(candidate, "rev-parse", "HEAD").stdout.decode().strip() != APP:
        raise RuntimeError("Candidate parent moved")
    if git(candidate, "rev-parse", "MERGE_HEAD").stdout.decode().strip() != MAIN:
        raise RuntimeError("Unexpected merge parent")
    tracked = git(candidate, "diff", "HEAD", "--name-only").stdout.decode().splitlines()
    staged = git(candidate, "diff", "--cached", "--name-only").stdout.decode().splitlines()
    if set(tracked) - set(GENERATED) or set(staged) - set(GENERATED):
        raise RuntimeError("Unexpected tracked or staged changed path")
    if git(candidate, "ls-files", "--others", "--exclude-standard").stdout.strip():
        raise RuntimeError("Unexpected untracked candidate file")
    receipt = {"main": MAIN, "app": APP, "candidate": str(candidate), "baseline": baseline,
               "resolvedConflicts": conflicts, "trackedChangedPaths": tracked,
               "stagedChangedPaths": staged, "hooksHonored": True,
               "committed": False, "pushed": False,
               "providerRequests": 0, "nextStageExecuted": False}
    (evidence / "preparation.json").write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt))


if __name__ == "__main__":
    main()
