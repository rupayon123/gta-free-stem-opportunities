"""Full source translations. Stdlib validation is separate from optional model inference."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import time
from urllib.parse import urlparse

LANGUAGES = ("fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "pt", "gu", "bn", "ja", "ko", "hu")
MODEL_LANGUAGES = {language: ("fil" if language == "tl" else language) for language in LANGUAGES if language != "yue"}
MAX_BYTES = 10_000_000
MAX_RECORDS = 15_000
MAX_TEXT_BYTES = 100_000
PROVIDERS = {"Toronto Public Library": "tpl.bibliocommons.com", "Markham Public Library": "markham.bibliocommons.com"}
ENGINE = "madlad400-3b-ct2-int8-full-source-v1"
MODEL = {
    "original": "google/madlad400-3b-mt",
    "originalRevision": "fa184c675da0b5c9e1c8694fccd4e12e2d422094",
    "license": "Apache-2.0",
    "converted": "santhosh/madlad400-3b-ct2",
    "convertedRevision": "c32ad0cf118807ea6258d14be137547155842723",
    "runtime": "ctranslate2==4.8.4",
    "sentencepiece": "sentencepiece==0.2.1",
}
MODEL_FILES = {
    "model.bin": (2_950_208_251, "f3c87256a2c888100c179d7dcd7f41df17c767469546c59d32c7dde86c740a6b"),
    "config.json": (190, "a428c51cd35517554523b3c6b6974a5928bc35e82b130869a543566a34a83b93"),
    "shared_vocabulary.json": (5_477_099, "c327551ce3ca6efc7b437e11a267f79979893332dda8a1d146e2c950815193f8"),
    "sentencepiece.model": (4_427_844, "ef11ac9a22c7503492f56d48dce53be20e339b63605983e9f27d2cd0e0f3922c"),
}


def sha(value: bytes | str) -> str:
    return hashlib.sha256(value.encode("utf-8") if isinstance(value, str) else value).hexdigest()


def encode(value: object) -> bytes:
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False) + "\n").encode("utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def pairs(items):
    result = {}
    for key, value in items:
        require(key not in result, "duplicate JSON key")
        result[key] = value
    return result


def parse(raw: bytes):
    require(len(raw) <= MAX_BYTES, "translation file exceeds 10 MB")
    return json.loads(raw.decode("utf-8"), object_pairs_hook=pairs)


def read(path: Path):
    with path.open("rb") as stream:
        return parse(stream.read(MAX_BYTES + 1))


def write(path: Path, value: object) -> bytes:
    raw = encode(value)
    require(len(raw) <= MAX_BYTES, "translation file exceeds 10 MB")
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + f".{os.getpid()}.tmp")
    try:
        with temporary.open("xb") as stream:
            stream.write(raw)
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)
    return raw


def validate_index(index: dict) -> dict:
    require(isinstance(index, dict) and index.get("schemaVersion") == 1 and index.get("sourceLanguage") == "en", "invalid source index")
    records, texts = index.get("records"), index.get("texts")
    require(isinstance(records, dict) and 0 < len(records) <= MAX_RECORDS, "invalid source record count")
    require(isinstance(texts, dict) and 0 < len(texts) <= MAX_RECORDS * 2, "invalid source text count")
    referenced = set()
    for text_hash, text in texts.items():
        require(isinstance(text, str) and text.strip() and len(text.encode("utf-8")) <= MAX_TEXT_BYTES and sha(text) == text_hash, "source text hash mismatch")
    for identity, record in records.items():
        require(isinstance(identity, str) and identity.strip() == identity and 0 < len(identity) <= 200 and isinstance(record, dict), "invalid source identity")
        url = urlparse(record.get("sourceUrl", ""))
        require(url.scheme == "https" and url.hostname == PROVIDERS.get(record.get("organization")) and url.username is None and url.password is None and url.port is None and url.path.startswith("/events/"), "unapproved translation source")
        for field in ("titleSHA256", "descriptionSHA256"):
            require(record.get(field) in texts, "source text is absent")
            referenced.add(record[field])
    require(referenced == set(texts), "unreferenced source texts")
    return index


def build_index(rows: list[dict]) -> dict:
    require(isinstance(rows, list) and 0 < len(rows) <= MAX_RECORDS, "invalid source record count")
    records, texts = {}, {}
    for row in rows:
        require(isinstance(row, dict), "invalid source record")
        identity = row.get("id")
        require(identity not in records, "duplicate source identity")
        record = {"organization": row.get("organization"), "sourceUrl": row.get("sourceUrl")}
        require(row.get("registrationUrl") == row.get("sourceUrl"), "source registration link mismatch")
        for field in ("title", "description"):
            text = row.get(field)
            require(isinstance(text, str) and text.strip(), "missing full source text")
            text_hash = sha(text)
            texts[text_hash] = text
            record[field + "SHA256"] = text_hash
        records[identity] = record
    return validate_index({"schemaVersion": 1, "sourceLanguage": "en", "records": records, "texts": texts})


def validate_pack(pack: dict, index: dict, language: str) -> dict:
    validate_index(index)
    require(language in MODEL_LANGUAGES and isinstance(pack, dict) and pack.get("schemaVersion") == 1 and pack.get("language") == language, "wrong translation locale/schema")
    require(pack.get("sourceIndexSHA256") == sha(encode(index)), "stale translation source index")
    require(pack.get("translationSource") == ENGINE and pack.get("model") == MODEL, "unreviewed translation engine or summary template")
    translations = pack.get("translations")
    require(isinstance(translations, dict) and set(translations) == set(index["texts"]), "partial full-source translation pack")
    for text_hash, entry in translations.items():
        require(isinstance(entry, dict), "invalid translated entry")
        text, segments = entry.get("text"), entry.get("segments")
        require(isinstance(text, str) and text.strip() and len(text.encode("utf-8")) <= MAX_TEXT_BYTES * 6, "invalid translated text")
        require(isinstance(segments, list) and 0 < len(segments) <= MAX_TEXT_BYTES, "missing translated source segments")
        offset = 0
        for segment in segments:
            require(isinstance(segment, dict) and type(segment.get("startByte")) is int and type(segment.get("endByte")) is int and segment["startByte"] == offset and segment["endByte"] > offset, "source segment gap/overlap")
            source_bytes = index["texts"][text_hash].encode("utf-8")
            require(segment["endByte"] <= len(source_bytes), "source segment exceeds full source")
            source = source_bytes[offset:segment["endByte"]]
            source.decode("utf-8")
            require(sha(source) == segment.get("sourceSHA256") and segment.get("endedNormally") is True, "incomplete/truncated source segment")
            require(isinstance(segment.get("text"), str) and segment["text"].strip(), "missing translated source segment")
            offset = segment["endByte"]
        require(offset == len(index["texts"][text_hash].encode("utf-8")), "untranslated tail of full source text")
        require(text == " ".join(segment["text"].strip() for segment in segments), "translated segments do not reconstruct body")
    require(len(encode(pack)) <= MAX_BYTES, "translation pack exceeds 10 MB")
    return pack


def publish_manifest(index: dict, packs: dict[str, dict], directory: Path, required_languages=LANGUAGES) -> dict:
    """Publish only verified immutable files; replace the small manifest last."""
    validate_index(index)
    require(set(packs) == set(required_languages), "release is missing a required full-description language")
    for language, pack in packs.items():
        validate_pack(pack, index, language)
    source_raw = encode(index)
    source_hash = sha(source_raw)
    def descriptor(filename: str, raw: bytes) -> dict:
        return {"path": "/translations/" + filename, "sha256": sha(raw), "bytes": len(raw)}
    source_name = source_hash + ".source.json"
    locales = {}
    # All coverage/size validations finish before touching the live manifest.
    for language, pack in sorted(packs.items()):
        raw = encode(pack)
        filename = f"{source_hash}.{language}.{sha(raw)}.json"
        write(directory / filename, pack)
        locales[language] = descriptor(filename, raw)
    write(directory / source_name, index)
    manifest = {"schemaVersion": 1, "sourceLanguage": "en", "source": descriptor(source_name, source_raw), "locales": locales}
    write(directory / "manifest.json", manifest)
    return manifest


def split_source(text: str, measure, limit: int = 192) -> list[str]:
    """Cover every source codepoint exactly once, without tokenizer truncation."""
    require(isinstance(text, str) and text.strip() and limit >= 8, "invalid segment source/limit")
    chunks, offset = [], 0
    while offset < len(text):
        remainder = text[offset:]
        if measure(remainder) <= limit:
            chunks.append(remainder)
            break
        low, high = 1, len(remainder)
        while low < high:
            middle = (low + high + 1) // 2
            if measure(remainder[:middle]) <= limit:
                low = middle
            else:
                high = middle - 1
        require(measure(remainder[:low]) <= limit, "one source character exceeds token limit")
        candidates = [match.end() for match in re.finditer(r"[.!?。！？](?:\s+|$)", remainder[:low]) if match.end() >= low * .5]
        if not candidates:
            candidates = [match.end() for match in re.finditer(r"\s+", remainder[:low]) if match.end() >= low * .7]
        boundary = candidates[-1] if candidates else low
        part = remainder[:boundary]
        if not part.strip() and chunks:
            chunks[-1] += part
        else:
            chunks.append(part)
        offset += boundary
    require("".join(chunks) == text and all(chunk.strip() for chunk in chunks), "source segmentation lost text")
    return chunks


def translate_entry(source: str, language: str, engine) -> dict:
    require(language in MODEL_LANGUAGES, "unsupported translation locale for this model")
    chunks = split_source(source, lambda text: engine.input_length(text, language))
    segments, offset = [], 0
    for chunk in chunks:
        translated, ended = engine.translate(chunk, language)
        require(ended and isinstance(translated, str) and translated.strip(), "model stopped without EOS; source not fully translated")
        segments.append({"startByte": offset, "endByte": offset + len(chunk.encode("utf-8")), "sourceSHA256": sha(chunk), "text": translated.strip(), "endedNormally": True})
        offset += len(chunk.encode("utf-8"))
    return {"text": " ".join(segment["text"] for segment in segments), "segments": segments}


def generate(index: dict, language: str, engine, cache_path: Path | None = None) -> dict:
    validate_index(index)
    cache = read(cache_path) if cache_path and cache_path.is_file() else {}
    pack = {"schemaVersion": 1, "language": language, "sourceIndexSHA256": sha(encode(index)), "translationSource": ENGINE, "model": MODEL, "translations": {}}
    cached = cache.get("translations", {}) if cache.get("language") == language and cache.get("model") == MODEL and cache.get("translationSource") == ENGINE else {}
    for number, (text_hash, text) in enumerate(sorted(index["texts"].items())):
        entry = cached.get(text_hash)
        if entry is not None:
            # Revalidate even a hash-matched cached translation against this text.
            single = {**index, "records": {"cache-check": {"organization": "Toronto Public Library", "sourceUrl": "https://tpl.bibliocommons.com/events/cache", "titleSHA256": text_hash, "descriptionSHA256": text_hash}}, "texts": {text_hash: text}}
            try:
                validate_pack({**pack, "sourceIndexSHA256": sha(encode(single)), "translations": {text_hash: entry}}, single, language)
            except (ValueError, TypeError, KeyError):
                entry = None
        pack["translations"][text_hash] = entry if entry is not None else translate_entry(text, language, engine)
        if cache_path:
            write(cache_path, pack)
        if number % 10 == 0:
            print(json.dumps({"language": language, "completedTexts": number + 1, "totalTexts": len(index["texts"])}), flush=True)
    return validate_pack(pack, index, language)


def download_model(directory: Path) -> None:
    from urllib.request import urlopen
    directory.mkdir(parents=True, exist_ok=True)
    for filename, (size, digest) in MODEL_FILES.items():
        destination = directory / filename
        if destination.is_file() and destination.stat().st_size == size:
            with destination.open("rb") as stream:
                if hashlib.file_digest(stream, "sha256").hexdigest() == digest:
                    continue
        temporary = destination.with_name(filename + ".download")
        count, checksum = 0, hashlib.sha256()
        url = f"https://huggingface.co/{MODEL['converted']}/resolve/{MODEL['convertedRevision']}/{filename}"
        try:
            with urlopen(url, timeout=120) as response, temporary.open("wb") as output:
                while block := response.read(1024 * 1024):
                    count += len(block)
                    require(count <= size, "model file exceeds pinned size")
                    checksum.update(block)
                    output.write(block)
            require(count == size and checksum.hexdigest() == digest, "model provenance checksum mismatch")
            temporary.replace(destination)
            print(json.dumps({"verifiedModelFile": filename, "bytes": count, "sha256": digest}), flush=True)
        finally:
            temporary.unlink(missing_ok=True)


class MadladEngine:
    def __init__(self, directory: Path):
        import ctranslate2
        import sentencepiece
        require(ctranslate2.__version__ == "4.8.4" and sentencepiece.__version__ == "0.2.1", "unreviewed translation runtime")
        self.tokenizer = sentencepiece.SentencePieceProcessor(model_file=str(directory / "sentencepiece.model"))
        self.vocabulary = set(json.loads((directory / "shared_vocabulary.json").read_text()))
        for language in MODEL_LANGUAGES.values():
            require(f"<2{language}>" in self.vocabulary, "target language absent from model vocabulary")
        self.translator = ctranslate2.Translator(str(directory), device="cpu", compute_type="int8", inter_threads=1, intra_threads=min(4, os.cpu_count() or 1))

    def tokens(self, text: str, language: str) -> list[str]:
        return self.tokenizer.encode(f"<2{MODEL_LANGUAGES[language]}> {text}", out_type=str) + ["</s>"]

    def input_length(self, text: str, language: str) -> int:
        return len(self.tokens(text, language))

    def translate(self, text: str, language: str) -> tuple[str, bool]:
        tokens = self.tokens(text, language)
        require(len(tokens) <= 192, "source input exceeds tested token bound")
        result = self.translator.translate_batch([tokens], beam_size=1, max_input_length=192, max_decoding_length=1024, return_end_token=True)[0].hypotheses[0]
        ended = bool(result) and result[-1] == "</s>"
        output = self.tokenizer.decode([token for token in result if token not in {"</s>", "<s>", "<pad>"}])
        return output, ended


def benchmark(feed: Path, directory: Path, output: Path) -> None:
    rows = read(feed)["opportunities"]
    row = next((row for row in rows if row["id"] == "tpl-rss-6ac92852295b3b0033cb1160"), None)
    require(row is not None, "known full-description benchmark event is missing")
    index = build_index([row])
    started = time.monotonic()
    download_model(directory)
    engine = MadladEngine(directory)
    report = {"model": MODEL, "source": row, "supportedTargetTokens": list(MODEL_LANGUAGES), "results": {}, "downloadAndLoadSeconds": round(time.monotonic() - started, 3)}
    for language in ("fr", "zh", "pa"):
        started = time.monotonic()
        pack = generate(index, language, engine)
        report["results"][language] = {"seconds": round(time.monotonic() - started, 3), "pack": pack}
        write(output, report)
    print(json.dumps({"benchmarkComplete": True, "languages": list(report["results"]), "fullSourceCharacters": len(row["description"]), "output": str(output)}), flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--benchmark-feed", type=Path)
    parser.add_argument("--model-dir", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--index", type=Path)
    parser.add_argument("--language", choices=LANGUAGES)
    parser.add_argument("--cache", type=Path)
    args = parser.parse_args()
    if args.benchmark_feed:
        benchmark(args.benchmark_feed, args.model_dir, args.output)
    else:
        require(args.index is not None and args.language is not None, "source index and language required")
        download_model(args.model_dir)
        pack = generate(read(args.index), args.language, MadladEngine(args.model_dir), args.cache)
        write(args.output, pack)


if __name__ == "__main__":
    main()
