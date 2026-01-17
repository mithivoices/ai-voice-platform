import React, { useRef } from 'react';
import { useTTSStore } from '../store/ttsStore';

export const TrimControls: React.FC = () => {
  const { 
    isEditMode, 
    selectionStart, 
    selectionEnd, 
    setSelectionStart, 
    setSelectionEnd,
    generatedAudio
  } = useTTSStore();
  
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isEditMode || !generatedAudio) return null;

  const duration = generatedAudio.duration;
  const startPct = (selectionStart / duration) * 100;
  const endPct = (selectionEnd / duration) * 100;

  const handleDrag = (e: React.MouseEvent, type: 'start' | 'end') => {
    e.preventDefault();
    if (!containerRef.current) return;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const time = percentage * duration;

      if (type === 'start') {
        if (time < selectionEnd) setSelectionStart(time);
      } else {
        if (time > selectionStart) setSelectionEnd(time);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none select-none">
      {/* Overlay for non-selected regions (30% opacity as requested) */}
      <div 
        className="absolute inset-y-0 left-0 bg-gray-50/70 z-10"
        style={{ width: `${startPct}%` }}
      />
      <div 
        className="absolute inset-y-0 right-0 bg-gray-50/70 z-10"
        style={{ left: `${endPct}%` }}
      />

      {/* Start Handle */}
      <div 
        className="absolute inset-y-0 z-20 w-[2px] bg-blue-600 cursor-ew-resize pointer-events-auto group"
        style={{ left: `${startPct}%` }}
        onMouseDown={(e) => handleDrag(e, 'start')}
      >
        <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded shadow-md font-bold whitespace-nowrap">
          {formatTime(selectionStart)}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-blue-600 rounded-lg shadow-xl border-2 border-white flex flex-col items-center justify-center gap-1">
          <div className="w-0.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>

      {/* End Handle */}
      <div 
        className="absolute inset-y-0 z-20 w-[2px] bg-blue-600 cursor-ew-resize pointer-events-auto group"
        style={{ left: `${endPct}%` }}
        onMouseDown={(e) => handleDrag(e, 'end')}
      >
        <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded shadow-md font-bold whitespace-nowrap">
          {formatTime(selectionEnd)}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-blue-600 rounded-lg shadow-xl border-2 border-white flex flex-col items-center justify-center gap-1">
          <div className="w-0.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};
