import { useUserCredits } from '../hooks/useUserCredits';

export const CreditsDisplay: React.FC = () => {
    const { data: credits, isLoading } = useUserCredits();

    if (isLoading) {
        return (
            <div className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-full flex items-center gap-2 animate-pulse shadow-md">
                <div className="w-3 h-3 bg-white/50 rounded-full" />
                <div className="w-16 h-3 bg-white/30 rounded" />
            </div>
        );
    }

    return (
        <div className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-md hover:scale-105 transition-transform cursor-default">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-1.63-.12-3.21-.74-4.52-1.77l1.47-1.47c1.1.84 2.22 1.27 3.44 1.27 1.34 0 2.1-.55 2.1-1.34 0-.67-.37-1.12-2.12-1.55-2.07-.5-4.22-1.03-4.22-3.41 0-1.89 1.41-3.15 3.39-3.46V5h2.82v1.94c1.43.16 2.7.67 3.74 1.48l-1.4 1.51c-.81-.59-1.8-.97-2.61-.97-1.24 0-1.89.5-1.89 1.15 0 .61.56.97 2.18 1.36 2.05.5 4.3 1.1 4.3 3.51 0 1.95-1.41 3.29-3.49 3.52z"/></svg>
            <span className="text-[var(--text-sm)] font-bold tracking-tight">
                Credits: {credits?.remaining?.toLocaleString()}
            </span>
        </div>
    );
};
