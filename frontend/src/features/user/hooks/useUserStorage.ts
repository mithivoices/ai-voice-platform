import { useQuery } from '@tanstack/react-query';

export interface UserStorage {
    used: number;
    total: number;
    percentage: number;
}

export const useUserStorage = () => {
    return useQuery<UserStorage>({
        queryKey: ['user-storage'],
        queryFn: async () => {
            // Mock data for simplified app (no auth)
            return {
                used: 0,
                total: 10,
                percentage: 0,
            };
        },
    });
};
