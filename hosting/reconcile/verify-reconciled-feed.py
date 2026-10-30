"""REVIEW DRAFT: offline post-export proof only, no export, Git mutation or GET."""
import argparse
import hashlib
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--candidate", type=Path, required=True)
    parser.add_argument("--evidence", type=Path, required=True)
    args = parser.parse_args()
    root, evidence = args.candidate.resolve(), args.evidence.resolve()
    path = "public/opportunities.json"
    before_raw = (evidence / "baseline" / path).read_bytes()
    after_raw = (root / path).read_bytes()
    assert len(after_raw) <= 10_000_000, "Existing UTF-8 byte limit exceeded"
    before, after = json.loads(before_raw), json.loads(after_raw)
    for feed in [before, after]:
        assert feed["schemaVersion"] == 1
        assert feed["count"] == len(feed["opportunities"]) <= 4_999
        assert len({row["id"] for row in feed["opportunities"]}) == feed["count"]

    def without_proof_and_revision(feed):
        return {key: [dict((k, v) for k, v in row.items() if k != "accessibilitySupport") for row in value]
                if key == "opportunities" else value
                for key, value in feed.items() if key != "publicationRevision"}

    # No generic health/date/description exclusions. Any difference stops the
    # operation for root review rather than silently accepting a changed base.
    assert without_proof_and_revision(before) == without_proof_and_revision(after), "Real native base fields changed"
    assert after["publicationRevision"] > before["publicationRevision"], "Changed facts require a newer source revision"
    assert after_raw.endswith(b"\n") and b"\n  \"" not in after_raw, "Expected compact JSON plus trailing newline"
    source = (root / "lib/generatedLibraryOpportunities.ts").read_text()
    marker = "export const generatedLibraryOpportunities = "
    start = source.index(marker) + len(marker)
    end = source.index("\n] satisfies Opportunity[];", start) + 2
    master = json.loads(source[start:end])
    assert len({row["id"] for row in master}) == len(master), "Duplicate reconciled master IDs"
    expected = {row["id"]: row.get("accessibilitySupport") for row in master}
    def owned_replacement(proof):
        return (proof["sourceUrl"] == "https://tpl.ca/accessibility/accessibility-supports/programs-and-events/"
                and proof["scope"] == "provider-policy"
                and proof["category"] in {"sign-language", "hearing-captioning", "support-person"})
    for old, new in zip(before["opportunities"], after["opportunities"]):
        if new["id"] in expected:
            assert new.get("accessibilitySupport") == expected[new["id"]], "Export proof differs from reviewed master"
        else:
            assert new.get("accessibilitySupport") == old.get("accessibilitySupport"), "Non-master proof changed"
        for proof in old.get("accessibilitySupport", {}).get("evidence", []):
            if not owned_replacement(proof):
                assert proof in new.get("accessibilitySupport", {}).get("evidence", []), "Unrelated provider policy or event/venue proof lost"
        for proof in new.get("accessibilitySupport", {}).get("evidence", []):
            if proof["scope"] == "provider-policy" and proof["sourceUrl"] == "https://tpl.ca/accessibility/accessibility-supports/programs-and-events/":
                assert proof["checkedAt"] == "2026-10-30T06:51:08.000Z", "Policy review clock renewed"
    for untouched in ["lib/generatedDiscoveryReview.ts", "data/youth-hunter-state.json",
                      "data/youth-hunter-manifest.json", "public/youth-opportunities.json"]:
        assert (root / untouched).read_bytes() == (evidence / "baseline" / untouched).read_bytes(), "Unrelated snapshot changed"
    receipt = {"nativeBaseEquality": True, "count": after["count"], "bytes": len(after_raw),
               "nativeSHA256": hashlib.sha256(after_raw).hexdigest(),
               "publicationRevision": after["publicationRevision"],
               "proofRows": sum(bool(row.get("accessibilitySupport")) for row in after["opportunities"]),
               "discoveryAndYouthByteExact": True, "providerRequests": 0}
    (evidence / "native-postproof.json").write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt))


if __name__ == "__main__":
    main()
