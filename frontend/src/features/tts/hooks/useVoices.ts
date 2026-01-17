import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api';
import { VoiceProfile } from '../types/tts.types';

export const useVoices = () => {
    return useQuery<VoiceProfile[]>({
        queryKey: ['voices'],
        queryFn: () => apiClient('/voices'),
    });
};
