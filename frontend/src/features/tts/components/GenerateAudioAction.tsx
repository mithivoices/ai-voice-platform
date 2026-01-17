import React from 'react';
import { useTTSStore } from '../store/ttsStore';
import { useTTSGeneration } from '../hooks/useTTSGeneration';

export const GenerateAudioAction: React.FC = () => {
  const { 
    inputText, 
    selectedVoice, 
    selectedLanguage,
    speed,
    pitch,
    stability,
    isGenerating, 
  } = useTTSStore();

  const { mutate: generate } = useTTSGeneration();

  const handleGenerate = () => {
    if (!inputText || !selectedVoice || !selectedLanguage) return;

    generate({
      text: inputText,
      voiceId: selectedVoice.id,
      languageCode: selectedLanguage.code,
      speed,
      pitch,
      stability,
      voiceProfile: selectedVoice, // Pass for display in AudioPreviewSection
    });
  };

  const isDisabled = !inputText || !selectedVoice || isGenerating;

  return (
    <div className="flex justify-center mt-[var(--space-xl)]">
      <button
        onClick={handleGenerate}
        disabled={isDisabled}
        className={`
          px-8 py-3 rounded-[var(--radius-full)] font-semibold transition-all
          ${isDisabled 
            ? 'bg-[var(--bg-slate-50)] text-[var(--text-muted)] cursor-not-allowed' 
            : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:scale-95 shadow-lg shadow-blue-200'}
        `}
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Audio...
          </span>
        ) : (
          'Generate Audio'
        )}
      </button>
    </div>
  );
};
