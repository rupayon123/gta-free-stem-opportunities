"""Historical French model trial. Its output is evidence, never a release pack."""
import argparse
import hashlib
import json
import os
from pathlib import Path

from benchmark_cantonese import download
from full_description_translation import sha, translate_entry, write

REVISION = "6e062862ced6f5622a589ab2aadc2a1d4978db78"
FIXTURE_SHA = "de6872276264c264019444a117ab7a92b34ba838bf81ab4c978ee3c37e87cc02"
FILES = {
    "model.safetensors": (461429130, "5c88b4f7a63934b8be72372b86661e616227c20be4b75612eeee7dca96494217"),
    "source.spm": (802408, "18bb5a422a53a0bd699b005c8086cbd58a85c4be427fd57ca687c958588edcc9"),
    "target.spm": (819955, "6437b5600d2ae14888939e589773b09bc667c77e81326e20e3f57698a4078593"),
    "vocab.json": (1332010, "2994b7def69d6495d8f02369b57e3f04e2474f76ce64eda2921643e1f76fef41"),
    "config.json": (1076, "ac35de27c1645637a46d3b2f41052365ef52a7c23e169719629381f6b1fb025c"),
    "tokenizer_config.json": (337, "9cca379c911ab0d3b9138e0de1c521f1d7bad69889e168b3eb0e0f9f47e5a7fd"),
    "special_tokens_map.json": (65, "09059cedc26bc46bc09a52f05b92d4922e11917e87f3b92059bb1a63a59ab2c4"),
    "generation_config.json": (301, "e08b63c58a6de96ea4275ac59681cefbf88663a10419e65e1510156061c43a88"),
}
FAILURE_LEDGER = [
    "Preserve accessibility accommodations as disability adjustments, not lodging.",
    "Keep the proper venue name Appel Salon and its location identifiable.",
    "Convey rush-line admission after the ticket guarantee cutoff accurately.",
    "Preserve generous support by the named sponsors, without changing its meaning.",
    "Express the fictional date and daytime hours naturally while retaining them exactly.",
]


def run(fixture, model_dir, output):
    raw = fixture.read_bytes()
    if hashlib.sha256(raw).hexdigest() != FIXTURE_SHA:
        raise ValueError("historical fixture checksum mismatch")
    cases = json.loads(raw)["cases"]
    if len(cases) != 3 or sum(len(c["sourceBody"].encode()) for c in cases) != 4881:
        raise ValueError("unexpected historical fixture size")
    github_sha = os.environ.get("GITHUB_SHA", "")
    if len(github_sha) != 40 or any(ch not in "0123456789abcdef" for ch in github_sha):
        raise ValueError("missing or invalid GitHub source revision")
    report = {"experimental": True, "productionEligible": False, "manualSemanticReviewRequired": True, "githubSHA": github_sha,
              "fixtureSHA256": FIXTURE_SHA, "modelRevision": REVISION, "modelLicense": "CC-BY-4.0",
              "priorFailureLedger": FAILURE_LEDGER, "status": "preparing", "cases": []}
    write(output, report)
    try:
        model_dir.mkdir(parents=True, exist_ok=True)
        for name, (size, digest) in FILES.items():
            download(f"https://huggingface.co/Helsinki-NLP/opus-mt-tc-big-en-fr/resolve/{REVISION}/{name}", model_dir / name, size, digest)
        os.environ["HF_HUB_OFFLINE"] = "1"
        os.environ["TRANSFORMERS_OFFLINE"] = "1"
        import torch
        import transformers
        from transformers import MarianConfig, MarianMTModel, MarianTokenizer
        if torch.__version__.split("+")[0] != "2.14.1" or transformers.__version__ != "5.21.0":
            raise ValueError("unexpected runtime version")
        torch.set_num_threads(4)
        torch.set_num_interop_threads(1)
        model = MarianMTModel.from_pretrained(model_dir, local_files_only=True,
                                               trust_remote_code=False, use_safetensors=True).eval()
        config = model.config
        if (config.model_type != "marian" or config.decoder_start_token_id != 53016
                or config.eos_token_id != 43311 or config.max_position_embeddings != 1024):
            raise ValueError("unexpected model architecture or token identifiers")
        model.generation_config.forced_eos_token_id = None
        tokenizer = MarianTokenizer.from_pretrained(model_dir, local_files_only=True)

        class Engine:
            def input_length(self, text, language):
                return len(tokenizer(text, add_special_tokens=True, truncation=False)["input_ids"])

            def translate(self, text, language):
                encoded = tokenizer(text, return_tensors="pt", truncation=False)
                if encoded["input_ids"].shape[1] > 192:
                    raise ValueError("model input exceeds segment budget")
                with torch.inference_mode():
                    result = model.generate(**encoded, num_beams=4, do_sample=False, max_new_tokens=384,
                                            forced_eos_token_id=None, eos_token_id=43311, decoder_start_token_id=53016,
                                            early_stopping=True, renormalize_logits=True)[0].tolist()
                ended = len(result) > 1 and result[0] == 53016 and result[-1] == 43311 and len(result) - 1 < 384
                return tokenizer.decode(result[1:], skip_special_tokens=True, clean_up_tokenization_spaces=False), ended

        report["status"] = "running"
        for case in (cases[2], cases[0], cases[1]):
            result = {"sourceID": case["sourceID"], "caseKind": case["caseKind"], "fields": {}}
            report["cases"].append(result)
            for field in ("sourceTitle", "sourceBody"):
                source = case[field]
                if sha(source) != case.get(field + "SHA256", sha(source)):
                    raise ValueError("source field changed")
                result["fields"][field] = {"source": source, "sourceSHA256": sha(source),
                                           "translation": translate_entry(source, "fr", Engine())}
                write(output, report)
        report["status"] = "structural_trial_completed_semantic_review_required"
    except Exception as error:
        report["status"] = "stopped"
        report["error"] = str(error)
        raise
    finally:
        write(output, report)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--fixture", type=Path, required=True)
    parser.add_argument("--model-dir", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    run(args.fixture, args.model_dir, args.output)
