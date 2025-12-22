import subprocess
import uuid
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
VOICE_PATH = BASE_DIR / "models" / "tts" / "en_US-lessac-medium.onnx"
OUTPUT_DIR = BASE_DIR / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

def text_to_speech(text: str) -> Path:
    output_file = OUTPUT_DIR / f"{uuid.uuid4()}.wav"

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
        input=text,
        text=True,
        capture_output=True,
    )

    if process.returncode != 0:
        raise RuntimeError(f"Piper error: {process.stderr}")

    if not output_file.exists():
        raise RuntimeError("TTS failed: output file not created")

    return output_file
