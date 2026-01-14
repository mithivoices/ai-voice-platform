import subprocess
import os

PIPER_EXECUTABLE = "piper"

# Dynamic path resolution
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models", "tts")

VOICE_MODEL = os.getenv("PIPER_VOICE_MODEL", os.path.join(MODELS_DIR, "en_US-lessac-medium.onnx"))
VOICE_CONFIG = os.getenv("PIPER_VOICE_CONFIG", os.path.join(MODELS_DIR, "en_US-lessac-medium.onnx.json"))


def synthesize_speech(text: str, output_path: str) -> None:
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Check if model exists
    if not os.path.exists(VOICE_MODEL):
        raise RuntimeError(f"Voice model not found at: {VOICE_MODEL}\nPlease download it to models/tts/ or set PIPER_VOICE_MODEL env var.")

    command = [
        PIPER_EXECUTABLE,
        "--model", VOICE_MODEL,
        "--config", VOICE_CONFIG,
        "--output_file", output_path,
    ]

    process = subprocess.Popen(
        command,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    stdout, stderr = process.communicate(text)

    if process.returncode != 0:
        raise RuntimeError(f"Piper failed:\n{stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) < 1000:
        raise RuntimeError("Piper produced empty audio")
