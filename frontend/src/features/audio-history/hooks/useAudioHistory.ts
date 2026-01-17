import { useQuery } from '@tanstack/react-query';
import { AudioData } from '../../tts/types/tts.types';

export const useAudioHistory = (limit = 5) => {
    return useQuery<AudioData[]>({
        queryKey: ['audio-history', limit],
        queryFn: async () => {
            // Mock empty history for simplified app (no auth)
            return [];
        },
    });
};
