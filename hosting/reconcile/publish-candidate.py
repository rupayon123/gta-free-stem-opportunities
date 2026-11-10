"""Review draft: final credentialed phase, create one NEW review ref via Git API.

Never updates an existing ref. A Git transfer uses an empty expected-ref lease.
No PR merge, deployment or provider calls.
"""
import base64
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import urllib.error
import urllib.request

APP = "9f83e87e4447b805373ff9f7f206adb737e5c413"
MAIN = "dfa1b64a9c0c5ef6263e9f93d494926ab4032f30"
REPOSITORY = "rupayon123/gta-free-stem-opportunities"
API = "https://api.github.com/repos/" + REPOSITORY
DATA = ["lib/generatedDiscoveryReview.ts", "lib/generatedLibraryOpportunities.ts", "public/opportunities.json"]


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, message, headers, new_url):
        raise RuntimeError("Redirect rejected in credentialed GitHub phase")



def bulk_blob_size_error(status, details):
    if status != 422:
        return False
    text = json.dumps(details).lower()
    if any(word in text for word in ["quota", "storage", "rate limit", "abuse", "spam"]):
        return False
    subject = any(word in text for word in ["blob", "content", "body", "entity"])
    size = any(word in text for word in ["too_large", "too large", "too big", "larger", "maximum size", "size limit", "up to"])
    return subject and size


def validate_event():
    if os.environ["GITHUB_REPOSITORY"] != REPOSITORY:
        raise RuntimeError("Wrong repository")
    if os.environ["GITHUB_EVENT_NAME"] == "workflow_dispatch":
        return
    if os.environ["GITHUB_EVENT_NAME"] != "push":
        raise RuntimeError("Wrong event")
    event = json.loads(Path(os.environ["GITHUB_EVENT_PATH"]).read_text())
    if (event.get("ref") != "refs/heads/codex/frontend-reconcile-20261109"
            or event.get("before") != "fa845e998e5180b1f902a5c7e375c4f56c095a93"
            or event.get("after") != os.environ["EXPECTED_OPS_COMMIT"]
            or any(event.get(key) is not False for key in ["created", "deleted", "forced"])):
        raise RuntimeError("Push is outside the one authorized operations revision")


def main():
    validate_event()
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

    def api(path, payload=None, missing_ok=False):
        # Only fixed GitHub Git-data endpoints below call this local function.
        body = None if payload is None else json.dumps(payload).encode("utf8")
        request = urllib.request.Request(API + path, data=body, headers={
            "Authorization": "Bearer " + token, "Accept": "application/vnd.github+json",
            "Content-Type": "application/json", "User-Agent": "gta-reviewed-reconciliation",
            "X-GitHub-Api-Version": "2022-11-28"})
        try:
            with opener.open(request, timeout=60) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            if missing_ok and error.code == 404:
                return None
            raw = error.read(65536)
            try:
                parsed = json.loads(raw)
            except (ValueError, UnicodeError):
                parsed = {"message": raw.decode("utf8", errors="replace")[:600]}
            details = {"message": str(parsed.get("message", ""))[:600], "errors": [
                {key: str(item[key])[:300] for key in ["resource", "field", "code", "message"] if key in item}
                for item in parsed.get("errors", [])[:5] if isinstance(item, dict)]}
            details = json.loads(json.dumps(details).replace(token, "[redacted]"))
            error.public_details = details
            print(json.dumps({"gitAPIError": {"path": path, "status": error.code, **details}}), flush=True)
            raise

    def check_live_pins():
        if api("/git/ref/heads/main")["object"]["sha"] != MAIN:
            raise RuntimeError("Main advanced; stop without creating output branch")
        if api("/git/ref/heads/codex/web-preview-20261030")["object"]["sha"] != APP:
            raise RuntimeError("Reviewed draft advanced; stop")

    check_live_pins()
    if api("/git/ref/" + target.removeprefix("refs/"), missing_ok=True) is not None:
        raise RuntimeError("Candidate target already exists; no existing ref may be updated")
    use_git_pack = False
    entries = []
    for name in DATA:
        raw = (candidate / name).read_bytes()
        if len(raw) > 60_000_000:
            raise RuntimeError("Unexpected generated blob bound")
        expected = hashlib.sha1(b"blob " + str(len(raw)).encode() + b"\0" + raw).hexdigest()
        try:
            uploaded = api("/git/blobs", {"content": raw.decode("utf8"), "encoding": "utf-8"})
        except urllib.error.HTTPError as error:
            if not bulk_blob_size_error(error.code, getattr(error, "public_details", {})):
                raise
            use_git_pack = True
            print(json.dumps({"confirmedBulkBlobSizeRejection": True, "file": name, "rawBytes": len(raw),
                              "nextTransport": "git-pack-create-only-lease"}), flush=True)
            break
        if uploaded["sha"] != expected:
            raise RuntimeError("GitHub blob identity mismatch")
        entries.append({"path": name, "mode": "100644", "type": "blob", "sha": expected})
        print(json.dumps({"uploadedVerifiedBlob": name, "sha": expected}), flush=True)
    message = ("Reconcile fresh generated data with reviewed accessibility policies\n\n"
        + "APP " + APP + "\nMAIN " + MAIN + "\nOPS " + os.environ["GITHUB_SHA"]
        + "\nOffline real-data proof and existing QA passed; no production release.")
    if use_git_pack:
        clean = {key: value for key, value in os.environ.items()
                 if not key.startswith("GIT_TRACE") and key not in ["GIT_CURL_VERBOSE", "RECONCILE_WRITE_TOKEN"]}
        sha = subprocess.check_output(["git", "commit-tree", tree, "-p", APP, "-p", MAIN],
            cwd=candidate, env=clean, input=message, text=True).strip()
        if not re.fullmatch(r"[0-9a-f]{40}", sha):
            raise RuntimeError("Unexpected local verified commit identity")
        if subprocess.check_output(["git", "show", "-s", "--format=%T %P", sha], cwd=candidate, text=True).strip() != tree + " " + APP + " " + MAIN:
            raise RuntimeError("Git transfer commit tree or parent identities changed")
        check_live_pins()
        credential = base64.b64encode(("x-access-token:" + token).encode()).decode()
        clean.update(GIT_TERMINAL_PROMPT="0", GIT_CONFIG_COUNT="2",
            GIT_CONFIG_KEY_0="http.https://github.com/.extraheader", GIT_CONFIG_VALUE_0="AUTHORIZATION: basic " + credential,
            GIT_CONFIG_KEY_1="http.followRedirects", GIT_CONFIG_VALUE_1="false")
        # An explicitly empty expectation requires the target NOT to exist.
        # Even a concurrent fast-forward-capable ref cannot be overwritten.
        result = subprocess.run(["git", "-c", "pack.threads=1", "-c", "pack.windowMemory=16m",
            "-c", "pack.deltaCacheSize=16m", "push", "--porcelain", "--force-with-lease=" + target + ":",
            "https://github.com/" + REPOSITORY + ".git", sha + ":" + target],
            cwd=candidate, env=clean, capture_output=True, text=True, timeout=180)
        output = (result.stdout + result.stderr).replace(token, "[redacted]").replace(credential, "[redacted]")
        print(json.dumps({"gitCreateOnlyTransfer": {"exit": result.returncode, "output": output[-4000:]}}), flush=True)
        if result.returncode:
            raise RuntimeError("Create-only Git transfer failed; no update or force retry is permitted")
        transport = "git-pack-create-only-lease"
    else:
        app_tree = api("/git/commits/" + APP)["tree"]["sha"]
        created_tree = api("/git/trees", {"base_tree": app_tree, "tree": entries})
        if created_tree["sha"] != tree:
            raise RuntimeError("Remote tree differs from the actual verified ordinary-merge tree")
        sha = api("/git/commits", {"message": message, "tree": tree, "parents": [APP, MAIN]})["sha"]
        check_live_pins()
        created = api("/git/refs", {"ref": target, "sha": sha})
        if created["ref"] != target or created["object"]["sha"] != sha:
            raise RuntimeError("New ref result mismatch")
        transport = "git-data-api"
    created = api("/git/ref/" + target.removeprefix("refs/"))
    remote_commit = api("/git/commits/" + sha)
    if (created["ref"] != target or created["object"]["sha"] != sha
            or remote_commit["tree"]["sha"] != tree
            or [parent["sha"] for parent in remote_commit["parents"]] != [APP, MAIN]):
        raise RuntimeError("Published review ref/tree/parents failed independent readback")
    # Both transports enforce new-ref creation; no existing-ref update path.
    result = {"newCandidateBranch": target, "candidateCommit": sha, "tree": tree,
              "parents": [APP, MAIN], "operationsCommit": os.environ["GITHUB_SHA"],
              "mainAndDraftMatchedImmediatelyBeforeCreate": True,
              "existingRefUpdated": False, "productionMerged": False, "deployed": False, "transport": transport}
    print(json.dumps(result), flush=True)
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as summary:
        summary.write("Created review candidate `" + sha + "` on `" + target + "`.\n\n")
        summary.write("No existing branch update, production merge, deployment or translation qualification.\n")


if __name__ == "__main__":
    main()
