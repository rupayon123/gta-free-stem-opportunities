"""Bounded official translation-model investigation. Never publishes a pack."""
import argparse
import collections
import json
import os
from pathlib import Path
import re
import resource
import time

from benchmark_cantonese import download
from benchmark_quality_8b import segments
from full_description_translation import build_index, read, require, sha, write

REPO = "facebook/m2m100_1.2B"
REVISION = "7b36184180524c1a1bbfa37f120a608046250b98"
FILES = {
    "pytorch_model.bin": (4958230644, "a58ef8f42362ef12adeddc600b3425f1e2bbd019cfa6aae6b0051e2e3e055cd4"),
    "sentencepiece.bpe.model": (2423393, "d8f7c76ed2a5e0822be39f0a4f95a55eb19c78f4593ce609e2edbc2aea4d380a"),
    "vocab.json": (3708092, "b6e77e474aeea8f441363aca7614317c06381f3eacfe10fb9856d5081d1074cc"),
    "config.json": (909, "13b5191c92371b2d587baac6c9a04de018a5264d7179020d379a276769051f95"),
    "generation_config.json": (233, "aed76366507333ddbb8bd49960f23c82fe6446b3319a46a54befdb45324ccf61"),
    "special_tokens_map.json": (1140, "c1a4f86c3874d279ae1b2a05162858db5dd6c61665d84223ed886cbcff08fda6"),
    "tokenizer_config.json": (271, "1566a6cfa4f541a55594c9d5e090f530812d5de7c94882ea3af156962d9933ae"),
}
HARD = {"pa": "tpl-rss-6ac92852295b3b0033cb1160", "fr": "tpl-rss-6acfd30896ec3a003ada9007", "zh": "tpl-rss-6ad92376035faf0033de27c8"}
HELD_OUT = "tpl-rss-6ac7ffe296ec3a003ad9435c"
# Explicitly fictional contrast fixture, never represented as a provider listing.
CONTRAST = "Ages 13\u201317. The entrance is wheelchair accessible. Registration is not required for daytime sessions; registration is required for evening sessions. Free nutritious snacks are offered daily, not nightly. On 2026-11-09, daytime sessions run 16:00\u201317:00. For support, email help@example.org or call 416-555-0100. Details: https://example.org/gta-translation-test."
PROTECTED = re.compile(r"https?://[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[- ]\d{3}[- ]\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}:\d{2}(?:\s?(?:am|pm))?\b|\b\d{1,2}[\u2013-]\d{1,2}\b", re.I)
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


def run(feed, directory, output):
    import torch
    import transformers
    from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
    require(torch.__version__ == "2.14.1+cpu" and transformers.__version__ == "5.21.0", "unexpected runtime version")
    torch.set_num_threads(4)
    rows = {row["id"]: row for row in read(feed)["opportunities"]}
    index = build_index([rows[identity] for identity in [*HARD.values(), HELD_OUT]])
    report = {"experimental": True, "productionEligible": False, "manualSemanticReviewRequired": True,
              "model": {"repo": REPO, "revision": REVISION, "license": "MIT", "files": FILES, "quantization": "torch dynamic INT8 linear layers"},
              "sourceIndex": index, "runtime": {"torch": torch.__version__, "transformers": transformers.__version__, "weightsOnly": True, "trustRemoteCode": False, "localFilesOnly": True},
              "decoding": {"numBeams": 3, "maxNewTokens": 768, "doSample": False}, "results": {}}
    write(output, report)
    directory.mkdir(parents=True, exist_ok=True)
    for filename, (size, digest) in FILES.items():
        print(json.dumps({"download": filename, "expectedBytes": size}), flush=True)
        download(f"https://huggingface.co/{REPO}/resolve/{REVISION}/{filename}", directory / filename, size, digest)
        print(json.dumps({"verified": filename, "sha256": digest}), flush=True)
    os.environ["HF_HUB_OFFLINE"] = "1"
    os.environ["TRANSFORMERS_OFFLINE"] = "1"
    tokenizer = AutoTokenizer.from_pretrained(str(directory), local_files_only=True, trust_remote_code=False, use_fast=False, src_lang="en")
    require(all(language in tokenizer.lang_code_to_id for language in ("en", "pa", "fr", "zh")), "required target absent from actual tokenizer")
    require("yue" not in tokenizer.lang_code_to_id, "unexpected target vocabulary: review before changing Cantonese policy")
    model = AutoModelForSeq2SeqLM.from_pretrained(str(directory), local_files_only=True, trust_remote_code=False, weights_only=True, use_safetensors=False, dtype=torch.float32, low_cpu_mem_usage=True).eval()
    model = torch.ao.quantization.quantize_dynamic(model, {torch.nn.Linear}, dtype=torch.qint8, inplace=True).eval()
    report["peakRSSKiB"] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    write(output, report)
    deadline = time.monotonic() + 28 * 60
    for language, identity, kind in [(lang, identity, "real-hard-source") for lang, identity in HARD.items()] + [(lang, HELD_OUT, "real-held-out-source") for lang in HARD] + [(lang, "synthetic-contrast", "fictional-condition-contrast-not-a-provider-event") for lang in HARD]:
        source = CONTRAST if identity == "synthetic-contrast" else rows[identity]["description"]
        key = language + ":" + identity
        case = {"language": language, "sourceID": identity, "sourceKind": kind, "source": source, "sourceSHA256": sha(source), "segments": []}
        report["results"][key] = case
        offset = 0
        for chunk in segments(source):
            require(time.monotonic() < deadline, "bounded generation deadline exceeded")
            masked, mapping = protect(chunk)
            encoded = tokenizer(masked, return_tensors="pt", truncation=False)
            require(encoded["input_ids"].shape[1] <= 512, "source exceeds bounded input; refusing to truncate")
            started = time.monotonic()
            with torch.inference_mode():
                result = model.generate(**encoded, forced_bos_token_id=tokenizer.get_lang_id(language), forced_eos_token_id=None, num_beams=3, do_sample=False, max_new_tokens=768)
            tokens = result[0].tolist()
            ended_normally = tokens[-1] == tokenizer.eos_token_id and len(tokens) - 1 < 768
            raw = tokenizer.decode(result[0], skip_special_tokens=True)
            restoration_error, restored = None, None
            try:
                restored = restore(raw, mapping)
            except ValueError as error:
                restoration_error = str(error)
            end = offset + len(chunk.encode("utf-8"))
            case["segments"].append({"startByte": offset, "endByte": end, "sourceSHA256": sha(chunk), "source": chunk, "maskedSource": masked, "maskedSourceSHA256": sha(masked), "protected": mapping, "rawTranslation": raw, "text": restored, "restorationError": restoration_error, "generatedTokenCount": len(tokens) - 1, "endedNormally": ended_normally, "seconds": round(time.monotonic() - started, 3)})
            offset = end
            write(output, report)
            print(json.dumps({"case": key, "segment": len(case["segments"]), "normalEOS": tokens[-1] == tokenizer.eos_token_id, "restored": restoration_error is None}), flush=True)
            if not ended_normally:
                break
        case["fullSourceBytesCovered"] = offset == len(source.encode("utf-8"))
        case["allSegmentsEndedNormally"] = all(segment["endedNormally"] for segment in case["segments"])
        case["allProtectedSpansRestoredExactly"] = all(segment["restorationError"] is None for segment in case["segments"])
        case["text"] = " ".join(segment["text"].strip() for segment in case["segments"]) if case["allProtectedSpansRestoredExactly"] else None
        case["fallback"] = {"text": source, "originalProviderURL": rows[identity]["sourceUrl"] if identity in rows else None}
        write(output, report)
    report["completedHardSet"] = True
    report["peakRSSKiB"] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    write(output, report)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--feed", type=Path, required=True)
    parser.add_argument("--directory", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    run(args.feed, args.directory, args.output)
