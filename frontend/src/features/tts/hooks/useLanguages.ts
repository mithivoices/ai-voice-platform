import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api';
import { Language } from '../types/tts.types';

export const useLanguages = () => {
    return useQuery<Language[]>({
        queryKey: ['languages'],
        queryFn: () => apiClient('/languages'),
    });
};
