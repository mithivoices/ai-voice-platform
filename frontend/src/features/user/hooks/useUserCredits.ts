import { useQuery } from '@tanstack/react-query';

export interface UserCredits {
    remaining: number;
    total: number;
    percentage: number;
}

export const useUserCredits = () => {
    return useQuery<UserCredits>({
        queryKey: ['user-credits'],
        queryFn: async () => {
            // Mock data for simplified app (no auth)
            return {
                remaining: 1500,
                total: 1500,
                percentage: 100,
            };
        },
    });
};
