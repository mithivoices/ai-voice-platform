"""
Voice Loader Service
Loads and merges voice manifests from all voice asset directories.
"""

import os
import json
from typing import List, Dict, Any

# Base directory for voice assets
VOICE_ASSETS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..", "voice_assets")

# Manifest file paths
MANIFEST_PATHS = [
    os.path.join(VOICE_ASSETS_DIR, "voices.manifest.json"),
    os.path.join(VOICE_ASSETS_DIR, "indic", "voices.manifest.json"),
]


def load_manifest(path: str) -> Dict[str, Any]:
    """Load a single manifest file"""
    if not os.path.exists(path):
        return {"voices": []}
    
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def validate_no_duplicate_ids(voices: List[Dict]) -> None:
    """Fail fast if duplicate voice IDs are found"""
    seen_ids = set()
    for voice in voices:
        voice_id = voice.get("id")
        if voice_id in seen_ids:
            raise ValueError(f"Duplicate voice ID detected: {voice_id}")
        seen_ids.add(voice_id)


def normalize_voice(voice: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize voice data for API response"""
    return {
        "id": voice.get("id"),
        "name": voice.get("name"),
        "language": voice.get("language", voice.get("locale", "en")[:2]).lower(),
        "gender": voice.get("gender", "neutral").lower(),
        "engine": voice.get("engine", "piper").lower(),
        "accent": voice.get("accent", "").lower(),
        "style": voice.get("style", "").lower(),
        "tier": voice.get("tier", "free").lower(),
        "status": voice.get("status", "ready").lower(),
        "language_name": voice.get("language_name", voice.get("language", "en").upper())
    }


def load_voices() -> Dict[str, Any]:
    """
    Load and merge all voice manifests.
    
    Returns:
        Dict with version and list of ready voices
    """
    all_voices = []
    version = "v1.0.0"
    
    for manifest_path in MANIFEST_PATHS:
        try:
            manifest = load_manifest(manifest_path)
            
            # Get version from first manifest that has it
            if "version" in manifest and version == "v1.0.0":
                version = manifest["version"]
            
            voices = manifest.get("voices", [])
            all_voices.extend(voices)
            
        except json.JSONDecodeError as e:
            print(f"Warning: Failed to parse manifest {manifest_path}: {e}")
            continue
        except Exception as e:
            print(f"Warning: Error loading manifest {manifest_path}: {e}")
            continue
    
    # Validate no duplicate IDs (fail fast)
    validate_no_duplicate_ids(all_voices)
    
    # Filter only ready voices
    ready_voices = [v for v in all_voices if v.get("status", "").lower() == "ready"]
    
    # Normalize all voices
    normalized_voices = [normalize_voice(v) for v in ready_voices]
    
    return {
        "version": version,
        "voices": normalized_voices,
        "count": len(normalized_voices),
    }


def get_voice_by_id(voice_id: str) -> Dict[str, Any] | None:
    """Get a specific voice by ID"""
    result = load_voices()
    for voice in result["voices"]:
        if voice["id"] == voice_id:
            return voice
    return None


def get_voice_model_path(voice_id: str) -> str | None:
    """Get the model file path for a voice ID"""
    for manifest_path in MANIFEST_PATHS:
        manifest = load_manifest(manifest_path)
        for voice in manifest.get("voices", []):
            if voice.get("id") == voice_id:
                model_file = voice.get("model_file")
                if model_file:
                    return os.path.join(VOICE_ASSETS_DIR, model_file)
    return None


def get_supported_languages() -> List[Dict[str, Any]]:
    """
    Returns unique list of supported languages based on available voices.
    Includes count of voices per language.
    """
    # Load all voices (only status='ready' is already filtered in load_voices)
    voices_data = load_voices()
    voices = voices_data.get("voices", [])
    
    languages_dict = {}
    
    for voice in voices:
        code = voice.get("language")
        name = voice.get("language_name")
        
        if not code or not name:
            continue
            
        if code not in languages_dict:
            languages_dict[code] = {
                "code": code,
                "name": name,
                "voices_count": 0
            }
        
        languages_dict[code]["voices_count"] += 1
        
    # Return as a list sorted by name
    return sorted(list(languages_dict.values()), key=lambda x: x["name"])


def match_voice_to_language(language_code: str) -> Dict[str, Any] | None:
    """
    Find the best matching voice for a language code.
    Fallback to English if no match is found.
    """
    voices_data = load_voices()
    voices = voices_data.get("voices", [])
    
    # 1. Exact match
    for voice in voices:
        if voice.get("language") == language_code:
            return voice
            
    # 2. Base language match (e.g., 'en-US' -> 'en')
    base_lang = language_code.split("-")[0].lower()
    for voice in voices:
        if voice.get("language") == base_lang:
            return voice
            
    # 3. Fallback to English
    for voice in voices:
        if voice.get("language") == "en":
            return voice
            
    # 4. Final fallback: first available voice
    if voices:
        return voices[0]
        
    return None

