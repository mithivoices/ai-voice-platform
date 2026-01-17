import React, { useState } from 'react';
import { useTTSStore } from '../../tts/store/ttsStore';
import { AudioData as TTSAudioData } from '../../tts/types/tts.types';
import { useAudioHistory } from '../hooks/useAudioHistory';

export const AudioHistoryWidget: React.FC = () => {
  const { setGeneratedAudio } = useTTSStore();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const { data: allHistory, isLoading } = useAudioHistory(5);
  const history = (allHistory as TTSAudioData[])?.slice(0, 5) || [];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (e: React.MouseEvent, item: TTSAudioData) => {
    e.stopPropagation();
    if (playingId === item.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = item.url;
        audioRef.current.play();
        setPlayingId(item.id);
      }
    }
  };

  const handleDownload = (e: React.MouseEvent, item: TTSAudioData) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.url;
    link.download = `voice-generation-${item.id}.mp3`;
    link.click();
  };

  const handleLoad = (item: TTSAudioData) => {
    setGeneratedAudio(item);
  };

  return (
    <div className="bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-md)] p-[var(--space-md)] shadow-sm flex flex-col h-[450px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[var(--text-sm)] font-bold text-[var(--text-primary)] uppercase tracking-tight">Recent Activity</h3>
        <span className="text-[var(--text-xs)] font-medium text-[var(--text-muted)] cursor-pointer hover:text-[var(--primary)] transition-colors">View All</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-2">
            <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] text-[var(--text-muted)] font-medium">Loading history...</span>
          </div>
        ) : history.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[var(--text-xs)] text-[var(--text-muted)] italic">
            No history yet
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleLoad(item)}
              className="group p-3 bg-[var(--bg-light-gray)] border border-transparent hover:border-[var(--primary)] hover:border-opacity-30 rounded-[var(--radius-sm)] cursor-pointer transition-all duration-200 relative"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-[var(--primary)] uppercase">
                  {item.voiceProfile.name.split(' - ')[0]}
                </span>
                <span className="text-[9px] bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)] px-1.5 py-0.5 rounded font-bold">
                  {formatTime(item.duration)}
                </span>
              </div>
              
              <p className="text-[var(--text-xs)] text-[var(--text-primary)] line-clamp-1 mb-2 font-medium">
                "{item.text.length > 30 ? item.text.substring(0, 30) + '...' : item.text}"
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-[var(--text-muted)]">{item.createdAt}</span>
                
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handlePlayPause(e, item)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-[var(--border-slate)] text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
                  >
                    {playingId === item.id ? (
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current ml-0.5"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <button 
                    onClick={(e) => handleDownload(e, item)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-[var(--border-slate)] text-[var(--text-primary)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-2"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-5l-4 4m0 0l-4-4m4 4V3"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <audio 
        ref={audioRef} 
        onEnded={() => setPlayingId(null)}
        className="hidden"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-slate);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }
      `}} />
    </div>
  );
};
