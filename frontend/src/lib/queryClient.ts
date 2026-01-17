import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime in v4)
            refetchOnWindowFocus: false,
            retry: 1,
        },
        mutations: {
            onError: (error: any) => {
                toast.error(error?.message || 'Action failed. Please try again.');
            },
        },
    },
});
