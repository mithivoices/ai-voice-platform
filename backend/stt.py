import whisper


# Load model ONCE (important for performance)
_model = whisper.load_model("base")


def transcribe_audio(audio_path: str, language: str = None) -> tuple[str, str]:
    """
    Transcribe a WAV audio file to text using Whisper.
    Returns (text, detected_language)
    """
    # transcribe() detects language if not provided
    result = _model.transcribe(audio_path, language=language)
    
    text = result.get("text", "").strip()
    detected_lang = result.get("language", "en")
    
    return text, detected_lang
