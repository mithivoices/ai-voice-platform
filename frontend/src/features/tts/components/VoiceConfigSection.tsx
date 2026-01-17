import React, { useEffect } from 'react';
import { useTTSStore } from '../store/ttsStore';
import { useVoices } from '../hooks/useVoices';
import { useLanguages } from '../hooks/useLanguages';

export const VoiceConfigSection: React.FC = () => {
  const { 
    selectedVoice, 
    selectedLanguage, 
    speed, 
    pitch, 
    stability,
    setSelectedVoice,
    setSelectedLanguage,
    setSpeed,
    setPitch,
    setStability,
    isConfigExpanded,
    isEditMode
  } = useTTSStore();

  const { data: voices = [], isLoading: loadingVoices } = useVoices();
  const { data: languages = [], isLoading: loadingLanguages } = useLanguages();

  // Auto-select first voice/language if none selected and data loaded
  useEffect(() => {
    if (voices.length > 0 && !selectedVoice) setSelectedVoice(voices[0]);
    if (languages.length > 0 && !selectedLanguage) setSelectedLanguage(languages[0]);
  }, [voices, languages, selectedVoice, selectedLanguage, setSelectedVoice, setSelectedLanguage]);

  if (!isConfigExpanded) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)] transition-all duration-300 ${isEditMode ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Voice Selection */}
      <div className="bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-md)] p-[var(--space-md)] shadow-sm">
        <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] mb-[var(--space-sm)] block">
          Voice Profile
        </label>
        <select 
          value={selectedVoice?.id || ''} 
          onChange={(e) => {
            const voice = voices.find(v => v.id === e.target.value);
            if (voice) setSelectedVoice(voice);
          }}
          disabled={loadingVoices}
          className="w-full bg-[var(--bg-slate-50)] border border-[var(--border-slate)] rounded-[var(--radius-sm)] p-2 text-[var(--text-sm)] focus:outline-none focus:border-[var(--primary)]"
        >
          <option value="" disabled>{loadingVoices ? 'Loading voices...' : 'Select a voice'}</option>
          {voices.map(voice => (
            <option key={voice.id} value={voice.id}>{voice.name}</option>
          ))}
        </select>
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedVoice?.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-[var(--sidebar-active-bg)] text-[var(--primary)] px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-md)] p-[var(--space-md)] shadow-sm">
        <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] mb-[var(--space-sm)] block">
          Language
        </label>
        <select 
          value={selectedLanguage?.code || ''} 
          onChange={(e) => {
            const lang = languages.find(l => l.code === e.target.value);
            if (lang) setSelectedLanguage(lang);
          }}
          disabled={loadingLanguages}
          className="w-full bg-[var(--bg-slate-50)] border border-[var(--border-slate)] rounded-[var(--radius-sm)] p-2 text-[var(--text-sm)] focus:outline-none focus:border-[var(--primary)]"
        >
          <option value="" disabled>{loadingLanguages ? 'Loading languages...' : 'Select a language'}</option>
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name} ({lang.region})</option>
          ))}
        </select>
      </div>

      {/* Audio Parameters */}
      <div className="md:col-span-2 bg-[var(--bg-white)] border border-[var(--border-slate)] rounded-[var(--radius-md)] p-[var(--space-md)] shadow-sm">
        <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] mb-[var(--space-lg)] block">
          Audio Parameters
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Speed */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[var(--text-xs)] font-medium text-[var(--text-secondary)]">Speed</span>
              <span className="text-[var(--text-xs)] font-bold text-[var(--primary)]">{speed}x</span>
            </div>
            <input 
              type="range" min="0.5" max="2.0" step="0.1" 
              value={speed} 
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Pitch */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[var(--text-xs)] font-medium text-[var(--text-secondary)]">Pitch</span>
              <span className="text-[var(--text-xs)] font-bold text-[var(--primary)]">{pitch > 0 ? `+${pitch}` : pitch}</span>
            </div>
            <input 
              type="range" min="-12" max="12" step="1" 
              value={pitch} 
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Stability */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[var(--text-xs)] font-medium text-[var(--text-secondary)]">Stability</span>
              <span className="text-[var(--text-xs)] font-bold text-[var(--primary)]">{stability}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="1" 
              value={stability} 
              onChange={(e) => setStability(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
