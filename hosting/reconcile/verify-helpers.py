"""Review draft. Verify an independently pinned operations checkout before use."""
import argparse
import hashlib
import json
from pathlib import Path
import re


def verify(expected):
    root = Path(__file__).resolve().parents[2]
    manifest = Path(__file__).with_name("helpers-manifest.json")
    raw = manifest.read_bytes()
    if not re.fullmatch(r"[0-9a-f]{64}", expected) or hashlib.sha256(raw).hexdigest() != expected:
        raise RuntimeError("Reviewed operations manifest hash mismatch")
    data = json.loads(raw)
    expected_paths = {".github/workflows/refresh-opportunities.yml"} | {
        "hosting/reconcile/" + name for name in ["prepare-candidate.py", "overlay-reviewed-policy.ts",
        "verify-reconciled-feed.py", "guard-linux.py", "verify-helpers.py", "run-reconciliation.py",
        "publish-candidate.py", "offline-network.mjs", "REVIEW_ROUTE.md"]}
    if len(data["files"]) != len(expected_paths) or {row["path"] for row in data["files"]} != expected_paths:
        raise RuntimeError("Unexpected operations helper file list")
    for row in data["files"]:
        path = (root / row["path"]).resolve()
        if root not in path.parents or hashlib.sha256(path.read_bytes()).hexdigest() != row["sha256"]:
            raise RuntimeError("Operations source changed: " + row["path"])
    return data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--expected-sha256", required=True)
    args = parser.parse_args()
    data = verify(args.expected_sha256)
    print(json.dumps({"operationsManifestVerified": True, "files": len(data["files"])}))
