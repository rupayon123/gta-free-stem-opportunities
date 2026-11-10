"""Historical French model trial. Its output is evidence, never a release pack."""
import argparse
import hashlib
import json
import os
from pathlib import Path

from benchmark_cantonese import download
from full_description_translation import sha, translate_entry, write

REVISION = "dd7f6540a7a48a7f4db59e5c0b9c42c8eea67f18"
FIXTURE_SHA = "de6872276264c264019444a117ab7a92b34ba838bf81ab4c978ee3c37e87cc02"
FILES = {
    "pytorch_model.bin": (300827685, "cc1de10b49342ad2f33e06bc4474ddd6eaca278474903c4a8636ce15680d64de"),
    "source.spm": (778395, "173e9f493a668fe396d599e28d414a201193094e6ffd7a4678e5aab0f6d3d838"),
    "target.spm": (802397, "78d0e717c77053f1c4b856d8661d9cb87c64f083a35418c087b9146300e4f585"),
    "vocab.json": (1339166, "945c604346ce15ce4aff9001001e7f925e336d942c4087017f191871162cbdc4"),
    "config.json": (1416, "df92c371911b45282caac6101fe7e7f5d5e9af7f9a99356067ffe306278ce72b"),
    "tokenizer_config.json": (42, "3492a8555368d21fc116cac84bdf551aee16783413be3afbfe4823de045960cf"),
    "generation_config.json": (293, "4956fb9a7caaad7579cf8bb789c1e578b8a1cf48a0a8b779fda2f95dd10bbaa5"),
}


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
              "fixtureSHA256": FIXTURE_SHA, "modelRevision": REVISION, "status": "preparing", "cases": []}
    write(output, report)
    try:
        model_dir.mkdir(parents=True, exist_ok=True)
        for name, (size, digest) in FILES.items():
            download(f"https://huggingface.co/Helsinki-NLP/opus-mt-en-fr/resolve/{REVISION}/{name}", model_dir / name, size, digest)
        os.environ["HF_HUB_OFFLINE"] = "1"
        os.environ["TRANSFORMERS_OFFLINE"] = "1"
        import torch
        import transformers
        from transformers import MarianConfig, MarianMTModel, MarianTokenizer
        if torch.__version__.split("+")[0] != "2.14.1" or transformers.__version__ != "5.21.0":
            raise ValueError("unexpected runtime version")
        torch.set_num_threads(4)
        torch.set_num_interop_threads(1)
        state = torch.load(model_dir / "pytorch_model.bin", weights_only=True, map_location="cpu")
        if not isinstance(state, dict) or not all(isinstance(k, str) and isinstance(v, torch.Tensor) for k, v in state.items()):
            raise ValueError("checkpoint is not tensor-only")
        config = MarianConfig.from_json_file(model_dir / "config.json")
        if config.model_type != "marian" or not config.share_encoder_decoder_embeddings or not config.tie_word_embeddings:
            raise ValueError("unexpected model architecture")
        model = MarianMTModel(config)
        expected = model.state_dict()
        if set(expected) - set(state) != {"lm_head.weight"} or set(state) - set(expected):
            raise ValueError("unexpected checkpoint keys")
        if any(state[k].shape != expected[k].shape or state[k].dtype != expected[k].dtype for k in state):
            raise ValueError("unexpected checkpoint shape or dtype")
        keys = ("model.shared.weight", "model.encoder.embed_tokens.weight", "model.decoder.embed_tokens.weight")
        if not all(torch.equal(state[keys[0]], state[key]) for key in keys[1:]):
            raise ValueError("checkpoint embeddings differ")
        state["lm_head.weight"] = state[keys[0]]
        model.load_state_dict(state, strict=True)
        if len({model.lm_head.weight.data_ptr(), model.model.shared.weight.data_ptr(),
                model.model.encoder.embed_tokens.weight.data_ptr(), model.model.decoder.embed_tokens.weight.data_ptr()}) != 1:
            raise ValueError("model embeddings do not share storage")
        del state, expected
        model.eval()
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
                                            forced_eos_token_id=None, eos_token_id=0, decoder_start_token_id=59513,
                                            early_stopping=True, renormalize_logits=True)[0].tolist()
                ended = len(result) > 1 and result[0] == 59513 and result[-1] == 0 and len(result) - 1 < 384
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
