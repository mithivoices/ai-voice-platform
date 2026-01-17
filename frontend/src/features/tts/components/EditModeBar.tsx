import React from 'react';
import { useTTSStore } from '../store/ttsStore';

export const EditModeBar: React.FC = () => {
  const { isEditMode, exitEditMode, applyChanges } = useTTSStore();

  if (!isEditMode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2563EB] text-white px-8 py-4 shadow-2xl flex items-center justify-between transition-all transform animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <span className="text-sm font-semibold tracking-wide uppercase">
          Edit Mode Active — Changes will not affect the original until applied
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={exitEditMode}
          className="px-6 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-all font-medium text-sm"
        >
          Cancel
        </button>
        <button 
          onClick={applyChanges}
          className="px-6 py-2 rounded-full bg-white text-[#2563EB] hover:bg-blue-50 transition-all font-bold text-sm shadow-lg"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};
