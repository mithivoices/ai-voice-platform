import re
from typing import Tuple, Dict, Any, Optional
from .voice_loader import get_voice_by_id

# Regex patterns for different scripts
SCRIPTS = {
    "hi": re.compile(r"[\u0900-\u097F]"), # Devanagari (Hindi, Marathi, Nepali)
    "ml": re.compile(r"[\u0D00-\u0D7F]"), # Malayalam
    "bn": re.compile(r"[\u0980-\u09FF]"), # Bengali
    "ta": re.compile(r"[\u0B80-\u0BFF]"), # Tamil
    "te": re.compile(r"[\u0C00-\u0C7F]"), # Telugu
    "kn": re.compile(r"[\u0C80-\u0CFF]"), # Kannada
    "en": re.compile(r"[a-zA-Z]"),        # Latin (English and others)
}

def resolve_text_language(
    text: str,
    text_language: str,
    custom_language: Optional[str] = None
) -> Tuple[str, str]:
    """
    Returns (resolved_language_code, confidence)
    confidence ∈ {high, medium, low}
    """
    if text_language != "auto":
        # Trust user input
        if text_language == "other" and custom_language:
            return custom_language.lower(), "high"
        return text_language, "high"

    # Case: auto (Detection logic)
    if not text or len(text.strip()) == 0:
        return "en", "low"

    # Count hits for each script
    counts = {}
    total_hits = 0
    for lang, pattern in SCRIPTS.items():
        hits = len(pattern.findall(text))
        if hits > 0:
            counts[lang] = hits
            total_hits += hits

    if not counts:
        return "en", "low"

    # Determine dominant language
    sorted_langs = sorted(counts.items(), key=lambda x: x[1], reverse=True)
    dominant_lang, top_hits = sorted_langs[0]
    
    # Heuristics for confidence
    ratio = top_hits / total_hits
    text_len = len(text.strip())
    
    # Short text (“OK”) -> Low confidence
    if text_len < 10:
        confidence = "low"
    elif ratio > 0.8:
        confidence = "high"
    elif ratio > 0.5:
        confidence = "medium"
    else:
        confidence = "low"

    # Special case for Devanagari: Could be hi, ne, mr. 
    # Without advanced NLP, we default to 'hi' if it's the dominant script in this context,
    # but the manifest might help if we know which languages we actually support.
    return dominant_lang, confidence

def resolve_audio_language(audio_language: str, custom_language: Optional[str] = None) -> Tuple[Optional[str], str]:
    """
    Returns (language_code | None, confidence)
    confidence ∈ {high, medium, low}
    """
    if audio_language != "auto":
        # Trust user input
        if audio_language == "other" and custom_language:
            return custom_language.lower(), "high"
        return audio_language.lower(), "high"

    # Case: auto
    # Let Whisper auto-detect, so we return None as the language code hint
    return None, "low"

def should_translate(
    text: str,
    text_lang_code: str,
    confidence: str,
    voice_lang_code: str,
    user_request_auto: bool
) -> bool:
    """
    Translation decision logic.
    Translation must ONLY happen when:
    resolved_text_language != voice.language
    AND (confidence != "low" OR text_language != "auto")
    """
    if text_lang_code == voice_lang_code:
        return False
    
    # If confidence is LOW and text_language was auto, do NOT translate
    if confidence == "low" and user_request_auto:
        return False
        
    return True

STRICT_TRANSLATION_PROMPT = """
Translate the following text from {source_language} to {target_language}.
Rules:
- Preserve meaning exactly
- Do NOT paraphrase
- Do NOT change tone
- Do NOT add or remove content
Return only the translated text.
"""

def get_strict_translation(llm_service, text: str, source_lang: str, target_lang: str) -> str:
    """
    Call LLM with strict translation prompt.
    """
    if not llm_service:
        return text
        
    prompt = STRICT_TRANSLATION_PROMPT.format(
        source_language=source_lang,
        target_language=target_lang
    )
    
    # Append the text to translate
    full_prompt = f"{prompt}\n\nTEXT TO TRANSLATE:\n{text}"
    
    translated = llm_service.generate(full_prompt).strip()
    return translated
