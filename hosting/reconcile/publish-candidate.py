"""Review draft: final credentialed phase, create one NEW review ref via Git API.

Never updates any existing ref. No push, PR merge, deployment or provider calls.
"""
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import urllib.error
import urllib.request

APP = "9f83e87e4447b805373ff9f7f206adb737e5c413"
MAIN = "e09b9e572e840710ae77c47a01ed10f16d7719f5"
REPOSITORY = "rupayon123/gta-free-stem-opportunities"
API = "https://api.github.com/repos/" + REPOSITORY
DATA = ["lib/generatedDiscoveryReview.ts", "lib/generatedLibraryOpportunities.ts", "public/opportunities.json"]


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, message, headers, new_url):
        raise RuntimeError("Redirect rejected in credentialed GitHub phase")


def main():
    if os.environ["GITHUB_REPOSITORY"] != REPOSITORY or os.environ["GITHUB_EVENT_NAME"] != "workflow_dispatch":
        raise RuntimeError("Wrong repository or event")
    ops = Path(os.environ["OPS_ROOT"]).resolve()
    evidence = Path(os.environ["RUNNER_TEMP"]) / "reviewed-data-evidence"
    candidate = Path(os.environ["RUNNER_TEMP"]) / "reviewed-data-candidate"
    run_id, attempt = os.environ["GITHUB_RUN_ID"], os.environ["GITHUB_RUN_ATTEMPT"]
    if not run_id.isdecimal() or not attempt.isdecimal():
        raise RuntimeError("Unexpected run identity")
    target = "refs/heads/codex/reconciled-data-" + run_id + "-" + attempt
    subprocess.run(["python3", str(ops / "hosting/reconcile/verify-helpers.py"), "--expected-sha256",
                    os.environ["EXPECTED_HELPERS_SHA256"]], check=True)
    phase = json.loads((Path(os.environ["RUNNER_TEMP"]) / "reconciliation-resource.json").read_text())
    proof = json.loads((evidence / "verified-pipeline.json").read_text())
    if not phase["accepted"] or not phase["terminalRelease"] or phase["remainingOwnedPids"]:
        raise RuntimeError("Verification resource guard did not accept and release")
    if not proof["allStagesPassed"] or any(stage["exit"] != 0 for stage in proof["stages"]):
        raise RuntimeError("Offline verification incomplete")
    if proof["app"] != APP or proof["main"] != MAIN or proof["operationsCommit"] != os.environ["GITHUB_SHA"]:
        raise RuntimeError("Verified source pin changed")
    if os.environ["GITHUB_SHA"] != os.environ["EXPECTED_OPS_COMMIT"]:
        raise RuntimeError("Unexpected operations commit")
    if proof["operationsHelpersSHA256"] != os.environ["EXPECTED_HELPERS_SHA256"]:
        raise RuntimeError("Unexpected helpers manifest")
    for name in DATA:
        if hashlib.sha256((candidate / name).read_bytes()).hexdigest() != proof["fileSHA256"][name]:
            raise RuntimeError("Verified file changed: " + name)
    tree = subprocess.check_output(["git", "write-tree"], cwd=candidate, text=True).strip()
    if tree != proof["candidateTree"]:
        raise RuntimeError("Verified candidate tree changed")
    token = os.environ["RECONCILE_WRITE_TOKEN"]
    if not token:
        raise RuntimeError("Missing ephemeral final-phase credential")
    opener = urllib.request.build_opener(NoRedirect)

    def api(path, payload=None):
        # Only fixed GitHub Git-data endpoints below call this local function.
        body = None if payload is None else json.dumps(payload).encode("utf8")
        request = urllib.request.Request(API + path, data=body, headers={
            "Authorization": "Bearer " + token, "Accept": "application/vnd.github+json",
            "Content-Type": "application/json", "User-Agent": "gta-reviewed-reconciliation",
            "X-GitHub-Api-Version": "2022-11-28"})
        with opener.open(request, timeout=60) as response:
            return json.load(response)

    def check_live_pins():
        if api("/git/ref/heads/main")["object"]["sha"] != MAIN:
            raise RuntimeError("Main advanced; stop without creating output branch")
        if api("/git/ref/heads/codex/web-preview-20261030")["object"]["sha"] != APP:
            raise RuntimeError("Reviewed draft advanced; stop")

    check_live_pins()
    entries = []
    for name in DATA:
        raw = (candidate / name).read_bytes()
        if len(raw) > 60_000_000:
            raise RuntimeError("Unexpected generated blob bound")
        expected = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
        uploaded = api("/git/blobs", {"content": raw.decode("utf8"), "encoding": "utf-8"})
        if uploaded["sha"] != expected:
            raise RuntimeError("GitHub blob identity mismatch")
        entries.append({"path": name, "mode": "100644", "type": "blob", "sha": expected})
        print(json.dumps({"uploadedVerifiedBlob": name, "sha": expected}), flush=True)
    app_tree = api("/git/commits/" + APP)["tree"]["sha"]
    created_tree = api("/git/trees", {"base_tree": app_tree, "tree": entries})
    if created_tree["sha"] != tree:
        raise RuntimeError("Remote tree differs from actual verified ordinary-merge tree")
    commit = api("/git/commits", {"message": "Reconcile fresh generated data with reviewed accessibility policies\n\n"
        + "APP " + APP + "\nMAIN " + MAIN + "\nOPS " + os.environ["GITHUB_SHA"]
        + "\nOffline real-data proof and existing QA passed; no production release.",
        "tree": tree, "parents": [APP, MAIN]})
    sha = commit["sha"]
    if not re.fullmatch(r"[0-9a-f]{40}", sha):
        raise RuntimeError("Unexpected created commit identity")
    check_live_pins()  # Snapshot immediately before NEW-ref creation, not a multi-ref CAS claim.
    created = api("/git/refs", {"ref": target, "sha": sha})
    if created["ref"] != target or created["object"]["sha"] != sha:
        raise RuntimeError("New ref result mismatch")
    # POST /git/refs fails if the ref exists: there is no PATCH/update/force path.
    result = {"newCandidateBranch": target, "candidateCommit": sha, "tree": tree,
              "parents": [APP, MAIN], "operationsCommit": os.environ["GITHUB_SHA"],
              "mainAndDraftMatchedImmediatelyBeforeCreate": True,
              "existingRefUpdated": False, "productionMerged": False, "deployed": False}
    print(json.dumps(result), flush=True)
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as summary:
        summary.write("Created review candidate `" + sha + "` on `" + target + "`.\n\n")
        summary.write("No existing branch update, production merge, deployment or translation qualification.\n")


if __name__ == "__main__":
    main()
