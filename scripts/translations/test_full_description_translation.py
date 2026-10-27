import copy
import json
from pathlib import Path
import tempfile
import unittest
from full_description_translation import build_index, encode, generate, parse, sha, split_source, translate_entry, validate_index, validate_pack, write


def row(identity="one", description="Build the device. Test every circuit. Keep the final instruction."):
    return {"id": identity, "title": "Device workshop", "description": description, "organization": "Toronto Public Library", "sourceUrl": "https://tpl.bibliocommons.com/events/" + identity, "registrationUrl": "https://tpl.bibliocommons.com/events/" + identity}


class FakeEngine:
    calls = 0
    def input_length(self, text, language): return len(text)
    def translate(self, text, language):
        self.calls += 1
        return language + ":" + text, True


class FullDescriptionTests(unittest.TestCase):
    def setUp(self):
        self.index = build_index([row()])
        self.pack = generate(self.index, "fr", FakeEngine())

    def test_exact_utf8_hashes_preserve_full_body_and_deduplicate(self):
        text = "  Électricité 🧪\n" + "Long source description. " * 80 + "DO NOT DROP THIS FINAL SENTENCE."
        index = build_index([row("one", text), row("two", text)])
        self.assertEqual(len(index["texts"]), 2)
        self.assertEqual(index["texts"][sha(text)], text)
        self.assertEqual(len(index["records"]), 2)
        self.assertNotEqual(sha(text), sha(text.strip()))

    def test_duplicate_ids_sources_and_source_mutations_are_rejected(self):
        for rows in ([row(), row()], [{**row(), "sourceUrl": "https://attacker.example/events/one"}], [{**row(), "registrationUrl": "https://example.org"}]):
            with self.assertRaises(ValueError): build_index(rows)
        changed = copy.deepcopy(self.index)
        changed["texts"][next(iter(changed["texts"]))] += "edited"
        with self.assertRaises(ValueError): validate_index(changed)

    def test_segments_cover_every_character_in_long_multibyte_sources(self):
        text = "  First paragraph.\n第二段 🧪 " + "Complete paragraph! " * 70 + " \nFinal instruction.  "
        chunks = split_source(text, len, 80)
        self.assertEqual("".join(chunks), text)
        self.assertTrue(all(len(chunk) <= 80 for chunk in chunks))
        entry = translate_entry(text, "fr", FakeEngine())
        self.assertEqual(entry["segments"][-1]["endByte"], len(text.encode("utf-8")))
        self.assertIn("Final instruction.", entry["text"])

    def test_cantonese_cannot_silently_use_mandarin_model(self):
        with self.assertRaisesRegex(ValueError, "unsupported"):
            translate_entry("Translate this full body.", "yue", FakeEngine())

    def test_no_eos_cannot_be_called_complete(self):
        class Truncated(FakeEngine):
            def translate(self, text, language): return "Incomplete", False
        with self.assertRaisesRegex(ValueError, "EOS"): generate(self.index, "fr", Truncated())

    def test_partial_templates_wrong_language_and_stale_index_are_rejected(self):
        for mutation in (
            lambda p: p.update(language="es"),
            lambda p: p.update(translationSource="generated-summary-template"),
            lambda p: p.update(sourceIndexSHA256="0" * 64),
            lambda p: p["translations"].pop(next(iter(p["translations"]))),
        ):
            candidate = copy.deepcopy(self.pack); mutation(candidate)
            with self.assertRaises(ValueError): validate_pack(candidate, self.index, "fr")

    def test_segment_tail_gap_overlap_hash_and_reconstruction_are_rejected(self):
        key = self.index["records"]["one"]["descriptionSHA256"]
        for mutation in (
            lambda e: e["segments"][0].update(startByte=1),
            lambda e: e["segments"][0].update(endByte=10),
            lambda e: e["segments"][0].update(sourceSHA256="0" * 64),
            lambda e: e["segments"][0].update(endedNormally=False),
            lambda e: e.update(text="Generic short summary."),
        ):
            candidate = copy.deepcopy(self.pack); mutation(candidate["translations"][key])
            with self.assertRaises(ValueError): validate_pack(candidate, self.index, "fr")

    def test_cache_reuse_and_changed_source_never_attach_stale_translations(self):
        with tempfile.TemporaryDirectory() as directory:
            cache = Path(directory) / "fr.json"
            engine = FakeEngine()
            generate(self.index, "fr", engine, cache)
            self.assertEqual(engine.calls, 2)
            generate(self.index, "fr", engine, cache)
            self.assertEqual(engine.calls, 2)
            changed = build_index([row(description="Completely revised final instruction.")])
            generated = generate(changed, "fr", engine, cache)
            self.assertEqual(engine.calls, 3)
            self.assertEqual(generated["sourceIndexSHA256"], sha(encode(changed)))
            self.assertNotIn(self.index["records"]["one"]["descriptionSHA256"], generated["translations"])

    def test_corrupted_cached_translation_is_regenerated(self):
        with tempfile.TemporaryDirectory() as directory:
            cache = Path(directory) / "fr.json"
            candidate = copy.deepcopy(self.pack)
            candidate["translations"][next(iter(candidate["translations"]))]["segments"][0]["endByte"] = 0
            write(cache, candidate)
            engine = FakeEngine(); generate(self.index, "fr", engine, cache)
            self.assertEqual(engine.calls, 1)

    def test_duplicate_json_keys_and_oversized_inputs_are_rejected(self):
        with self.assertRaises(ValueError): parse(b'{"language":"fr","language":"es"}')
        with self.assertRaises(ValueError): parse(b' ' * 10_000_001)

    def test_atomic_write_retains_previous_file_on_size_failure(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "retained.json"
            original = write(path, self.pack)
            with self.assertRaises(ValueError): write(path, {"text": "x" * 10_000_001})
            self.assertEqual(path.read_bytes(), original)


if __name__ == "__main__": unittest.main()
