import subprocess
import uuid
from pathlib import Path
import sys
import re

BASE_DIR = Path(__file__).resolve().parent.parent
VOICE_PATH = BASE_DIR / "models" / "tts" / "en_US-lessac-medium.onnx"
OUTPUT_DIR = BASE_DIR / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

def clean_text(text: str) -> str:
    """
    Remove emojis and unsupported unicode characters
    that break Windows TTS subprocess.
    """
    # Remove emojis & non-ASCII characters
    text = text.encode("ascii", errors="ignore").decode()
    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text

def text_to_speech(text: str) -> Path:
    output_file = OUTPUT_DIR / f"{uuid.uuid4()}.wav"

    safe_text = clean_text(text)

    command = [
        sys.executable,
        "-m",
        "piper",
        "--model",
        str(VOICE_PATH),
        "--output_file",
        str(output_file),
    ]

    process = subprocess.run(
        command,
        input=safe_text,
        text=True,
        encoding="utf-8",
        errors="ignore",
        capture_output=True,
    )

    if process.returncode != 0:
        raise RuntimeError(f"Piper error: {process.stderr}")

    if not output_file.exists():
        raise RuntimeError("TTS failed: output file not created")

    return output_file
