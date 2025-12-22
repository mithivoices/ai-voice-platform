import whisper
from pathlib import Path

model = whisper.load_model("base")

def speech_to_text(audio_path: Path) -> str:
    result = model.transcribe(str(audio_path))
    return result["text"]
