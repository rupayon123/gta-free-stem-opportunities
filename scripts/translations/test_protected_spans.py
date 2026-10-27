import unittest

from benchmark_m2m100 import protect, restore


class ProtectedSourceContract(unittest.TestCase):
    def test_full_contact_date_time_age_roundtrip_keeps_punctuation(self):
        source = "Ages 13\u201317, 2026-11-09 at 16:00\u201317:00. Contact help@example.org, 416-555-0100. https://example.org/event."
        masked, mapping = protect(source)
        self.assertEqual(len(mapping), 7)
        self.assertEqual(restore(masked, mapping), source)
        self.assertEqual(restore("Translated: " + masked, mapping), "Translated: " + source)
        self.assertTrue(masked.endswith("QXZ."))

    def test_dropped_duplicate_and_invented_tokens_fail_closed(self):
        masked, mapping = protect("Contact help@example.org.")
        token = next(iter(mapping))
        for bad in (masked.replace(token, ""), masked + token, masked + "ZXQ999999QXZ", masked.lower()):
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                restore(bad, mapping)

    def test_names_and_ordinary_words_are_translated_not_placeholdered(self):
        source = "Youth Hub offers snacks daily, not nightly."
        self.assertEqual(protect(source), (source, {}))

    def test_placeholder_namespace_cannot_be_source_injected(self):
        with self.assertRaises(ValueError):
            protect("ZXQ000000QXZ is source text")
