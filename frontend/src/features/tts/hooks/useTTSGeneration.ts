import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api';
import { AudioData, VoiceProfile } from '../types/tts.types';
import { useTTSStore } from '../store/ttsStore';

interface GenerateParams {
    text: string;
    voiceId: string;
    languageCode: string;
    speed: number;
    pitch: number;
    stability: number;
    voiceProfile?: VoiceProfile; // Pass the selected voice profile for display
}

interface TTSApiResponse {
    id: string;
    audioUrl: string;
    duration: number;
    createdAt: string;
}

export const useTTSGeneration = () => {
    const { setIsGenerating, setGeneratedAudio } = useTTSStore();

    return useMutation({
        mutationFn: async (params: GenerateParams) => {
            setIsGenerating(true);

            try {
                // Call backend API to generate audio
                const response: TTSApiResponse = await apiClient('/tts/generate', {
                    method: 'POST',
                    body: JSON.stringify({
                        text: params.text,
                        voiceId: params.voiceId,
                        languageId: params.languageCode,
                        speed: params.speed,
                        pitch: params.pitch,
                        stability: params.stability,
                    }),
                });

                // Transform response to match AudioData type
                const audioData: AudioData = {
                    id: response.id,
                    url: response.audioUrl, // Map audioUrl to url
                    duration: response.duration,
                    createdAt: response.createdAt,
                    text: params.text,
                    voiceProfile: params.voiceProfile || {
                        id: params.voiceId,
                        name: 'Generated Voice',
                        tags: [],
                        language: params.languageCode,
                    },
                };

                setGeneratedAudio(audioData);
                return audioData;
            } finally {
                setIsGenerating(false);
            }
        },
        onError: (error) => {
            console.error('TTS Generation failed:', error);
            setIsGenerating(false);
        },
    });
};

