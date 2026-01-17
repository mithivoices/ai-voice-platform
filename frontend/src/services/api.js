/**
 * Mithivoices API Client
 * Centralized API calls with environment-based base URL.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';


/**
 * Fetch wrapper with error handling
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Get API health status
 */
export async function getHealth() {
  const response = await apiFetch('/api/health');
  return response.json();
}

/**
 * Get all available voices
 * @returns {{ version: string, voices: Array<{ id, name, language, gender, engine, status }>, count: number }}
 */
export async function getVoices() {
  const response = await apiFetch('/api/voices');
  return response.json();
}

/**
 * Get all supported languages
 * @returns {{ languages: Array<{ code, name }>, has_other: boolean, default: string }}
 */
export async function getLanguages() {
  const response = await apiFetch('/api/languages');
  return response.json();
}

/**
 * Text-to-Speech
 * @param {Object} params
 * @param {string} params.text - Text to convert
 * @param {string} params.voice_id - Voice ID from /api/voices
 * @param {number} [params.speed=1.0] - Speed multiplier
 * @param {number} [params.pitch=0] - Pitch adjustment
 * @param {number} [params.stability=0.75] - Voice stability
 * @returns {{ audio_url: string, duration: number }}
 */
export async function textToSpeech(params) {
  const response = await apiFetch('/api/tts', {
    method: 'POST',
    body: JSON.stringify({
      text: params.text,
      voice_id: params.voice_id || 'piper_en_us_lessac_medium',
      speed: params.speed || 1.0,
      pitch: params.pitch || 0,
      stability: params.stability || 0.75,
      text_language: params.text_language || 'auto',
      custom_language: params.custom_language || null,
    }),
  });
  return response.json();
}

/**
 * Speech-to-Text
 * @param {File|Blob} audioFile - Audio file to transcribe
 * @returns {{ text: string }}
 */
export async function speechToText(audioFile, language = 'auto', customLanguage = null) {
  const formData = new FormData();
  formData.append('audio', audioFile);
  formData.append('audio_language', language);
  if (customLanguage) {
    formData.append('custom_language', customLanguage);
  }
  
  const response = await fetch(`${API_BASE}/api/stt`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  
  return response.json();
}

/**
 * Voice Chat (STT → LLM → TTS)
 * @param {File|Blob} audioFile - Audio file with user speech
 * @param {number} timeoutMs - Timeout in milliseconds (default: 30000)
 * @returns {{ user_text: string, ai_text: string, audio_url: string }}
 */
export async function voiceChat(audioFile, voice_id = 'piper_en_us_lessac_medium', timeoutMs = 30000) {
  console.log('[API] voiceChat called, blob size:', audioFile.size);
  
  // Validate blob
  if (!audioFile || audioFile.size === 0) {
    throw new Error('Invalid audio blob - size is 0');
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.error('[API] Request timeout after', timeoutMs, 'ms');
    controller.abort();
  }, timeoutMs);

  try {
    const formData = new FormData();
    formData.append('audio', audioFile); // Backend likely expects 'audio', not 'recording.webm' based on previous code usually
    formData.append('voice_id', voice_id);
    
    console.log('[API] Sending to backend...');
    const response = await fetch(`${API_BASE}/api/voice-chat`, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text(); // Get text if JSON fails or for more detail
      let errorDetail = errorText;
      try {
         const errorJson = JSON.parse(errorText);
         errorDetail = errorJson.detail || errorText;
      } catch (e) {
        // ignore
      }
      console.error('[API] Backend error:', response.status, errorDetail);
      throw new Error(`Backend error: ${response.status} - ${errorDetail}`);
    }
    
    const data = await response.json();
    console.log('[API] Response received:', data);
    return data;
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      console.error('[API] Request aborted (timeout)');
      throw new Error('Request timeout - backend not responding');
    }
    
    console.error('[API] Request failed:', error);
    throw error;
  }
}

/**
 * Get full audio URL for playback
 * @param {string} audioPath - Relative audio path from API response
 * @returns {string} Full playable URL
 */
export function getAudioUrl(audioPath) {
  if (audioPath.startsWith('http')) {
    return audioPath;
  }
  return `${API_BASE}${audioPath}`;
}

// Export API base for debugging
export { API_BASE };
