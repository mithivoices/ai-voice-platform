export interface Voice {
    id: string;
    name: string;
    gender: string;
    language: string;
    engine: string;
}

export function getVoices(): Promise<{ voices: Voice[] }>;

export interface TTSRequest {
    text: string;
    voice_id: string;
    speed: number;
    pitch: number;
    stability: number;
}

export interface TTSResponse {
    audio_url: string;
    duration: number;
}

export function textToSpeech(data: TTSRequest): Promise<TTSResponse>;

export function getAudioUrl(path: string): string;
