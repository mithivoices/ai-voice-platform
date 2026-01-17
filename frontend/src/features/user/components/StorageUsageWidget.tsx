import { useUserStorage } from '../hooks/useUserStorage';

export const StorageUsageWidget: React.FC = () => {
    const { data: storage, isLoading } = useUserStorage();

    const getStatusColor = (pct: number) => {
        if (pct < 70) return 'var(--success)';
        if (pct < 90) return 'var(--storage-orange)';
        return 'var(--danger)';
    };

    if (isLoading) {
        return (
            <div className="bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-md)] p-[var(--space-md)] shadow-sm animate-pulse">
                <div className="w-24 h-3 bg-[var(--bg-slate-50)] rounded mb-4" />
                <div className="h-2 bg-[var(--bg-slate-50)] rounded-full mb-3" />
                <div className="flex justify-between">
                    <div className="w-20 h-2 bg-[var(--bg-slate-50)] rounded" />
                    <div className="w-8 h-2 bg-[var(--bg-slate-50)] rounded" />
                </div>
            </div>
        );
    }

    const percentage = storage?.percentage || 0;
    const used = storage?.used || 0;
    const total = storage?.total || 0;
    const statusColor = getStatusColor(percentage);

    return (
        <div className="bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-md)] p-[var(--space-md)] shadow-sm">
            <h3 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Storage Usage</h3>
            
            <div className="h-2 bg-[var(--bg-slate-50)] rounded-full overflow-hidden mb-2 relative">
                <div 
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ 
                        width: `${percentage}%`,
                        backgroundColor: statusColor 
                    }} 
                />
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                <span className="text-[var(--text-muted)] font-medium">
                    {used}GB / {total}GB USED
                </span>
                <span style={{ color: statusColor }}>
                    ({percentage}%)
                </span>
            </div>
        </div>
    );
};
