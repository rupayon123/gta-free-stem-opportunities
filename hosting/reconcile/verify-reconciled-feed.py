"""REVIEW DRAFT: offline post-export proof only, no export, Git mutation or GET."""
import copy
import sys
import argparse
import hashlib
import json
from pathlib import Path


def bounded_differences(before, after):
    """Count every terminal difference; log at most20 paths/array summaries."""
    missing = object()
    samples, arrays = [], []
    total = 0
    def sha(value):
        return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False,
            separators=(",", ":")).encode()).hexdigest()
    def summary(value):
        if value is missing:
            return {"type": "missing"}
        if isinstance(value, (dict, list)):
            return {"type": "object" if isinstance(value, dict) else "array",
                    "count": len(value), "sha256": sha(value)}
        return {"type": type(value).__name__, "value": value[:200] if isinstance(value, str) else value,
                "truncated": isinstance(value, str) and len(value) > 200}
    def array_summary(value):
        result = summary(value)
        for key in ("id", "sourceId"):
            if value and all(isinstance(row, dict) and key in row for row in value):
                ids = [row[key] for row in value]
                result.update(identityKey=key, identityOrderSHA256=sha(ids),
                              firstIDs=[str(item)[:200] for item in ids[:20]])
                break
        return result
    def walk(a, b, path):
        nonlocal total
        if isinstance(a, dict) and isinstance(b, dict):
            for key in sorted(a.keys() | b.keys()):
                walk(a.get(key, missing), b.get(key, missing), path + "/" + key.replace("~", "~0").replace("/", "~1"))
        elif isinstance(a, list) and isinstance(b, list):
            start = total
            for index in range(max(len(a), len(b))):
                walk(a[index] if index < len(a) else missing,
                     b[index] if index < len(b) else missing, path + "/" + str(index))
            if total > start and path != "/opportunities" and len(arrays) < 20:
                arrays.append({"path": path[:1000], "before": array_summary(a),
                               "after": array_summary(b), "orderSensitiveHashEqual": sha(a) == sha(b)})
        elif type(a) != type(b) or a != b:
            total += 1
            if len(samples) < 20:
                samples.append({"path": path[:1000], "before": summary(a), "after": summary(b)})
    walk(before, after, "")
    opportunities = None
    if (isinstance(before, dict) and isinstance(after, dict)
            and isinstance(before.get("opportunities"), list)
            and isinstance(after.get("opportunities"), list)):
        old_rows, new_rows = before["opportunities"], after["opportunities"]
        opportunities = {"path": "/opportunities", "before": array_summary(old_rows),
                         "after": array_summary(new_rows),
                         "orderSensitiveHashEqual": sha(old_rows) == sha(new_rows)}
    return {"totalChangedPaths": total, "firstDifferences": samples,
            "opportunitiesComparison": opportunities,
            "arrayComparisons": arrays, "sampleLimit": 20, "scalarCharacterLimit": 200}



def native_base(feed):
    return {key: [dict((k, v) for k, v in row.items() if k != "accessibilitySupport") for row in value]
            if key == "opportunities" else value
            for key, value in feed.items() if key != "publicationRevision"}


def add_source_bound_raw_notes(before, after, master):
    """One explicit format addition. Never exclude or alter an existing field."""
    original_rows, candidate_rows = before["opportunities"], after["opportunities"]
    assert [row["id"] for row in original_rows] == [row["id"] for row in candidate_rows], "Native identities or order changed"
    by_id = {row["id"]: row for row in master}
    assert len(by_id) == len(master), "Duplicate baseline master IDs"
    expected = copy.deepcopy(before)
    added = 0
    for old, new, target in zip(original_rows, candidate_rows, expected["opportunities"]):
        if "accessibility" in old:
            assert new.get("accessibility") == old["accessibility"], "An existing raw-notes field changed"
            continue
        if "accessibility" not in new:
            continue
        source = by_id.get(old["id"])
        assert source is not None, "New raw notes require an exact baseline master identity"
        for key in ["provider", "sourceUrl", "title", "description"]:
            assert key in old and old[key] == source[key], "Raw-notes source binding changed: " + key
        notes = source.get("accessibility")
        assert isinstance(notes, list) and all(isinstance(note, str) for note in notes), "Baseline raw notes must be literal strings"
        assert new["accessibility"] == notes, "Added raw notes differ from the exact baseline source or its order"
        target["accessibility"] = copy.deepcopy(notes)
        added += 1
    return expected, added


def self_test():
    source = {"id": "fixture", "provider": "Library", "sourceUrl": "https://example.org/event", "title": "Full title", "description": "Full source body — 原文", "accessibility": ["Raw note A", "Raw note B"]}
    row = {key: value for key, value in source.items() if key != "accessibility"}
    before = {"schemaVersion": 1, "count": 1, "publicationRevision": "old", "opportunities": [{**row, "cost": "Free to join"}]}
    after = copy.deepcopy(before)
    after["publicationRevision"] = "new"
    after["opportunities"][0]["accessibility"] = list(source["accessibility"])
    original = copy.deepcopy(before)
    expected, added = add_source_bound_raw_notes(before, after, [source])
    assert added == 1 and before == original and native_base(expected) == native_base(after)
    cases = []
    for value in [["Raw note A"], ["Raw note A", "Raw note B", "Invented support"], ["Raw note B", "Raw note A"], ["Altered note", "Raw note B"], "Raw note A"]:
        changed = copy.deepcopy(after); changed["opportunities"][0]["accessibility"] = value
        cases.append((before, changed, [source]))
    for key, value in [("cost", "$10"), ("description", "Changed body"), ("provider", "Other provider"), ("sourceUrl", "https://example.org/other"), ("id", "another-id"), ("unexpectedField", True)]:
        changed = copy.deepcopy(after); changed["opportunities"][0][key] = value
        cases.append((before, changed, [source]))
    for key in ["provider", "sourceUrl", "title", "description"]:
        old = copy.deepcopy(before); new = copy.deepcopy(after)
        old["opportunities"][0][key] = new["opportunities"][0][key] = "Wrong binding"
        cases.append((old, new, [source]))
    existing = copy.deepcopy(after)
    existing["publicationRevision"] = "old"
    expected, count = add_source_bound_raw_notes(existing, after, [source])
    assert count == 0 and native_base(expected) == native_base(after)
    changed = copy.deepcopy(after); changed["opportunities"][0]["accessibility"] = ["Changed existing note"]
    cases.append((existing, changed, [source]))
    cases.append((before, after, []))
    rejected = 0
    for old, new, master in cases:
        try:
            expected, _ = add_source_bound_raw_notes(old, new, master)
            assert native_base(expected) == native_base(new), "Other native base fields changed"
        except AssertionError:
            rejected += 1
        else:
            raise AssertionError("Tampered raw notes or other base fields were accepted")
    assert rejected == len(cases)
    print(json.dumps({"rawNotesMigrationSelfTest": "passed", "validCases": 2, "rejectedCases": rejected, "networkRequests": 0}))


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

    baseline_source = (evidence / "baseline/lib/generatedLibraryOpportunities.ts").read_text()
    marker = "export const generatedLibraryOpportunities = "
    start = baseline_source.index(marker) + len(marker)
    end = baseline_source.index("\n] satisfies Opportunity[];", start) + 2
    baseline_master = json.loads(baseline_source[start:end])
    expected_before, raw_note_additions = add_source_bound_raw_notes(before, after, baseline_master)

    # Only the named, source-bound addition above changes the expected shape.
    # Every pre-existing field remains exact. No generic field/date/health exclusions.
    if native_base(expected_before) != native_base(after):
        diagnostic = bounded_differences(native_base(expected_before), native_base(after))
        (evidence / "native-base-differences.json").write_text(json.dumps(diagnostic, indent=2) + "\n")
        print(json.dumps({"nativeBaseDifferences": diagnostic}), flush=True)
    assert native_base(expected_before) == native_base(after), "Real native base fields changed beyond the declared exact raw-notes addition"
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
    receipt = {"nativeBaseEquality": native_base(before) == native_base(after),
               "nativeBaseEqualityAfterDeclaredRawNotesAddition": True, "rawNotesAddedToPreviouslyAbsentFields": raw_note_additions,
               "rawNotesSourceSHA256": hashlib.sha256(baseline_source.encode()).hexdigest(),
               "count": after["count"], "bytes": len(after_raw),
               "nativeSHA256": hashlib.sha256(after_raw).hexdigest(),
               "publicationRevision": after["publicationRevision"],
               "proofRows": sum(bool(row.get("accessibilitySupport")) for row in after["opportunities"]),
               "discoveryAndYouthByteExact": True, "providerRequests": 0}
    (evidence / "native-postproof.json").write_text(json.dumps(receipt, indent=2) + "\n")
    print(json.dumps(receipt))


if __name__ == "__main__":
    if sys.argv[1:] == ["--self-test"]:
        self_test()
    else:
        main()
