import subprocess
from backend.llm.base import LLM

class OllamaLLM(LLM):
    def __init__(self, model: str = "llama3"):
        self.model = model

    def generate(self, text: str) -> str:
        command = [
            "ollama",
            "run",
            self.model,
            text
        ]

        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",   # ✅ FORCE UTF-8
            errors="ignore"     # ✅ IGNORE INVALID BYTES
        )

        if result.returncode != 0:
            raise RuntimeError(result.stderr)

        return result.stdout.strip()
