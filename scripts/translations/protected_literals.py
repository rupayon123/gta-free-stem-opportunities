"""Pure reversible literal shielding; no model imports or downloads."""
import collections
import re

def require(condition, message):
    if not condition:
        raise ValueError(message)

PROTECTED = re.compile(r"https?://[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[- ]\d{3}[- ]\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}:\d{2}(?:\s?(?:am|pm))?\b|\b\d{1,2}\s?(?:am|pm)\b|\b\d{1,2}[\u2013-]\d{1,2}\b|[$€£]\s?\d[\d,]*(?:\.\d+)?|\b\d+(?:[.,]\d+)*%?", re.I)
TOKEN = re.compile(r"ZXQ\d{6}QXZ")


def protect(text):
    require("ZXQ" not in text and "QXZ" not in text, "source collides with placeholder namespace")
    mapping = {}
    def replace(match):
        value = match.group()
        suffix = ""
        if value.startswith(("https://", "http://")):
            value = value.rstrip(".,;!")
            suffix = match.group()[len(value):]
        token = f"ZXQ{len(mapping):06d}QXZ"
        mapping[token] = value
        return token + suffix
    masked = PROTECTED.sub(replace, text)
    require(restore(masked, mapping) == text, "source placeholders are not reversible")
    return masked, mapping


def restore(text, mapping):
    require(collections.Counter(TOKEN.findall(text)) == collections.Counter(mapping.keys()), "missing, altered, duplicated or invented protected placeholder")
    result = TOKEN.sub(lambda match: mapping[match.group()], text)
    require("ZXQ" not in result and "QXZ" not in result, "unrestored placeholder fragment")
    return result

