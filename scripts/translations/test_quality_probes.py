"""Known failures from real run40501344229 must remain visible to reviewers."""
import unittest

from benchmark_quality_8b import checks


class ObservedFailureProbes(unittest.TestCase):
    def test_corrupted_punjabi_is_flagged_even_when_target_script_is_present(self):
        actual_corrupt_fragment = "\u0a06\u0a35\ufffdSH\u0a28\u0a40\u0a2f"
        self.assertFalse(checks("pa", "accessible devices", actual_corrupt_fragment)["noReplacementCharacters"])

    def test_observed_cantonese_english_body_word_is_flagged(self):
        self.assertFalse(checks("yue", "This program is part of Youth Hub service.",
                                "\u5462\u500b programme \u7cfb\u5c6c\u65bc Youth Hub \u670d\u52d9\u3002")["knownEnglishLeaks"])

    def test_retained_proper_name_is_not_itself_an_english_leak(self):
        self.assertTrue(checks("yue", "Youth Hub", "Youth Hub")["knownEnglishLeaks"])


if __name__ == "__main__":
    unittest.main()
