import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTTSStore } from '../store/ttsStore';
import { TrimControls } from './TrimControls';

export const AudioPreviewSection: React.FC = () => {
  const { 
    generatedAudio, 
    isEditMode, 
    enterEditMode, 
    toggleConfig,
    setIsGenerating,
    setGeneratedAudio
  } = useTTSStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate pseudo-random waveform bars
  const waveformBars = useMemo(() => {
    if (!generatedAudio) return [];
    // Seeded-like random to keep it consistent for the same URL
    let seed = 0;
    const url = generatedAudio.url || '';
    for (let i = 0; i < url.length; i++) {
        seed += url.charCodeAt(i);
    }
    
    return Array.from({ length: 60 }, (_, i) => {
        const val = Math.sin(seed + i * 0.5) * 15 + 35; // Value between 20 and 50
        return Math.max(20, Math.min(60, val));
    });
  }, [generatedAudio?.url]);

  useEffect(() => {
    if (!generatedAudio) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [generatedAudio]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !generatedAudio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const seekTime = percentage * generatedAudio.duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRegenerate = async () => {
    if (!generatedAudio) return;
    setIsGenerating(true);
    // Mock 2s delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedAudio({
        ...generatedAudio,
        id: `gen-${Date.now()}`,
        url: `https://example.com/audio-${Date.now()}.mp3`,
    });
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (isEditMode) {
      alert('Please apply or cancel changes before downloading');
      return;
    }
    // Mock download
    console.log('Downloading...', generatedAudio?.url);
    const link = document.createElement('a');
    link.href = generatedAudio?.url || '';
    link.download = 'generated-audio.mp3';
    link.click();
  };

  if (!generatedAudio) return null;

  const playedPercentage = (currentTime / generatedAudio.duration) * 100;
  const playedBarsCount = Math.floor((playedPercentage / 100) * waveformBars.length);

  return (
    <div className="mt-[var(--space-2xl)] bg-[var(--sidebar-active-bg)] border border-[var(--primary)] border-opacity-20 rounded-[var(--radius-lg)] p-[var(--space-lg)]">
      <div className="flex items-center gap-[var(--space-md)]">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current ml-1"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[var(--text-xs)] font-bold text-[var(--primary)]">
              {generatedAudio.voiceProfile.name} Preview
            </span>
            <span className="text-[var(--text-xs)] font-medium text-[var(--text-secondary)]">
              {formatTime(currentTime)} / {formatTime(generatedAudio.duration)}
            </span>
          </div>
          
          <div 
            className="flex items-center gap-[2px] h-[60px] cursor-pointer group relative"
            onClick={handleWaveformClick}
          >
            {waveformBars.map((height, index) => (
              <div 
                key={index}
                className="w-1 rounded-full transition-colors duration-200"
                style={{ 
                  height: `${height}px`,
                  backgroundColor: index < playedBarsCount ? 'var(--waveform-played)' : 'var(--waveform-unplayed)'
                }}
              />
            ))}
            
            {/* Playback Indicator */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-[var(--primary)] shadow-sm pointer-events-none transition-all duration-100"
              style={{ left: `${playedPercentage}%` }}
            />
            
            <TrimControls />
          </div>
        </div>

        <audio 
          ref={audioRef}
          src={generatedAudio.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
      
      <div className="mt-[var(--space-md)] flex justify-end gap-[var(--space-sm)]">
        <button 
          onClick={toggleConfig}
          disabled={isEditMode}
          className="text-[var(--text-xs)] font-semibold text-[var(--primary)] hover:underline uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Adjust Voice
        </button>
        <button 
          onClick={enterEditMode}
          disabled={isEditMode}
          className="text-[var(--text-xs)] font-semibold text-[var(--primary)] hover:underline uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trim Audio
        </button>
        <button 
          onClick={handleRegenerate}
          disabled={isEditMode}
          className="text-[var(--text-xs)] font-semibold text-[var(--primary)] hover:underline uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Regenerate
        </button>
        <button 
          onClick={handleDownload}
          disabled={isEditMode}
          title={isEditMode ? "Apply changes before downloading" : ""}
          className="px-4 py-2 bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-sm)] text-[var(--text-xs)] font-bold text-[var(--text-primary)] hover:bg-[var(--bg-light-gray)] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95 transition-transform"
        >
          Download Audio
        </button>
      </div>
    </div>
  );
};
