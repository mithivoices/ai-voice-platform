import React, { useState, useEffect, useRef } from 'react';
import { getVoices, textToSpeech, getAudioUrl, Voice } from '../services/api';
import { useFloating, flip, shift, offset, autoUpdate } from '@floating-ui/react';
import { useLocation } from 'react-router-dom';

export default function TextToSpeech() {
  // Form state
  const [script, setScript] = useState("Welcome to Mithivoices. This is a demo of our advanced text-to-speech engine.");
  const [speed, setSpeed] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [stability, setStability] = useState(75);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');

  // Voice loading state
  const [voices, setVoices] = useState<Voice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(true);
  const [voicesError, setVoicesError] = useState<string | null>(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);

  // Settings tracking for regenerate logic
  const [generatedAudio, setGeneratedAudio] = useState(null);
  const [generationSettings, setGenerationSettings] = useState(null);
  const [currentSettings, setCurrentSettings] = useState({
    voice: null,
    speed: 1.0,
    pitch: 0,
    stability: 75,
    text: ''
  });

  // Credits tracking (mock for now - Phase 3: integrate with backend)
  const [usedCredits, setUsedCredits] = useState(130); // Mock initial value
  const TOTAL_CREDITS = 200;
  const remainingCredits = TOTAL_CREDITS - usedCredits;

  // Audio playback
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Dropdown refs for click-outside detection
  const voiceDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Location for route change detection
  const location = useLocation();

  // Dropdown state
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Floating UI for voice dropdown
  const { refs: voiceRefs, floatingStyles: voiceFloatingStyles, context: voiceContext } = useFloating({
    open: isVoiceDropdownOpen,
    onOpenChange: setIsVoiceDropdownOpen,
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ['bottom-start', 'top-start'],
        padding: 10
      }),
      shift({ padding: 10 })
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start'
  });

  // Text Language State
  const [textLanguage, setTextLanguage] = useState('Auto');
  const [customTextLanguage, setCustomTextLanguage] = useState('');
  const [isTextLangDropdownOpen, setIsTextLangDropdownOpen] = useState(false);
  const [autoDetectedLanguage, setAutoDetectedLanguage] = useState('en-US');
  const textLanguageOptions = ['Auto', 'English', 'Hindi', 'Malayalam', 'Nepali', 'Other...'];

  // Load voices on mount
  useEffect(() => {
    async function loadVoices() {
      setVoicesLoading(true);
      setVoicesError(null);
      try {
        const data = await getVoices();
        setVoices(data.voices || []);
        // Select first voice by default
        if (data.voices && data.voices.length > 0) {
          setSelectedVoiceId(data.voices[0].id);
        }
      } catch (error: any) {
        setVoicesError('Failed to load voices. Please check your connection.');
        console.error('Voice loading error:', error);
      } finally {
        setVoicesLoading(false);
      }
    }
    loadVoices();
  }, []);

  // Get selected voice object
  const selectedVoice = voices.find(v => v.id === selectedVoiceId) || null;

  // Filter voices based on language
  const filteredVoices = selectedLanguage === 'all' 
    ? voices 
    : voices.filter(v => v.language === selectedLanguage);

  // Get unique languages
  const languages = ['all', ...new Set(voices.map(v => v.language))].sort();

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setIsLanguageDropdownOpen(false);
    
    // Auto-select first voice of new language
    const newFiltered = lang === 'all' ? voices : voices.filter(v => v.language === lang);
    if (newFiltered.length > 0) {
      // Check if current selection is still valid
      const currentValid = newFiltered.find(v => v.id === selectedVoiceId);
      if (!currentValid) {
        setSelectedVoiceId(newFiltered[0].id);
      }
    }
  };

  // Handle TTS generation
  async function handleGenerate() {
    if (!script.trim()) return;
    if (!selectedVoiceId) return;

    setIsGenerating(true);
    setGenerationError(null);
    setAudioUrl(null);

    try {
      const result = await textToSpeech({
        text: script,
        voice_id: selectedVoiceId,
        speed: speed,
        pitch: pitch,
        stability: stability / 100, // Convert percentage to 0-1
      });
      
      setAudioUrl(getAudioUrl(result.audio_url));
      setAudioDuration(result.duration);
      
      // Save settings used for this generation
      setGenerationSettings({
        voice: selectedVoice,
        speed: speed,
        pitch: pitch,
        stability: stability,
        text: script
      });
      setGeneratedAudio(result.audio_url);
      
      // Increment used credits (mock - Phase 3: sync with backend)
      const creditsUsed = Math.ceil(script.length / 100); // 1 credit per 100 chars
      setUsedCredits(prev => prev + creditsUsed);
    } catch (error: any) {
      setGenerationError(error.message || 'Failed to generate speech');
    } finally {
      setIsGenerating(false);
    }
  }

  // Settings change handlers
  const handleSpeedChange = (value: number) => {
    setSpeed(value);
    setCurrentSettings(prev => ({ ...prev, speed: value }));
  };

  const handlePitchChange = (value: number) => {
    setPitch(value);
    setCurrentSettings(prev => ({ ...prev, pitch: value }));
  };

  const handleStabilityChange = (value: number) => {
    setStability(value);
    setCurrentSettings(prev => ({ ...prev, stability: value }));
  };

  // Update current settings when voice or text changes
  useEffect(() => {
    setCurrentSettings(prev => ({
      ...prev,
      voice: selectedVoice,
      text: script
    }));
  }, [selectedVoice, script]);

  // Detect if settings changed after generation
  const settingsChanged = generatedAudio && generationSettings && (
    currentSettings.speed !== generationSettings.speed ||
    currentSettings.pitch !== generationSettings.pitch ||
    currentSettings.stability !== generationSettings.stability ||
    currentSettings.voice?.id !== generationSettings.voice?.id ||
    currentSettings.text !== generationSettings.text
  );

  // Audio playback handlers
  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  function handleAudioEnded() {
    setIsPlaying(false);
    setCurrentTime(0);
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Get language name
  function getLanguageName(lang: string) {
    const names: Record<string, string> = {
      'en': 'English (US)', 
      'hi': 'Hindi (India)', 
      'ml': 'Malayalam', 
      'ne': 'Nepali',
      'de': 'German', 
      'es': 'Spanish', 
      'ta': 'Tamil', 
      'bn': 'Bengali',
      'all': 'All Languages'
    };
    return names[lang] || lang;
  }

  // Language detection function
  function detectLanguage(text: string): string {
    if (!text.trim()) return 'en-US';
    
    // Hindi detection
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
    
    // Spanish detection
    if (/[áéíóúñ¿¡]/i.test(text)) return 'es-ES';
    
    // German detection
    if (/[äöüß]/i.test(text)) return 'de-DE';
    
    // Malayalam detection
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN';
    
    // Nepali detection
    if (/[\u0900-\u097F]/.test(text) && text.includes('नेपाली')) return 'ne-NP';
    
    // Default to English
    return 'en-US';
  }

  // Auto-detect language when text changes
  useEffect(() => {
    if (textLanguage === 'Auto' && script.trim()) {
      const detected = detectLanguage(script);
      setAutoDetectedLanguage(detected);
    }
  }, [script, textLanguage]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close voice dropdown if click is outside
      if (isVoiceDropdownOpen &&
          voiceDropdownRef.current &&
          !voiceDropdownRef.current.contains(target)) {
        setIsVoiceDropdownOpen(false);
      }

      // Close language dropdown if click is outside
      if (isLanguageDropdownOpen &&
          languageDropdownRef.current &&
          !languageDropdownRef.current.contains(target)) {
        setIsLanguageDropdownOpen(false);
      }

      // Close text language dropdown
      if (isTextLangDropdownOpen && !(event.target as Element).closest('.text-lang-dropdown')) {
        setIsTextLangDropdownOpen(false);
      }
    };

    if (isVoiceDropdownOpen || isLanguageDropdownOpen || isTextLangDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVoiceDropdownOpen, isLanguageDropdownOpen, isTextLangDropdownOpen]);

  // Close dropdowns when route changes
  useEffect(() => {
    setIsVoiceDropdownOpen(false);
    setIsLanguageDropdownOpen(false);
    setIsTextLangDropdownOpen(false);
  }, [location.pathname]);

  // Listen for global close event from modals
  useEffect(() => {
    const handleCloseDropdowns = () => {
      setIsVoiceDropdownOpen(false);
      setIsLanguageDropdownOpen(false);
      setIsTextLangDropdownOpen(false);
    };

    window.addEventListener('closeAllDropdowns', handleCloseDropdowns);

    return () => {
      window.removeEventListener('closeAllDropdowns', handleCloseDropdowns);
    };
  }, []);

  // Get language flag emoji
  function getLanguageFlag(lang: string) {
    const flags: Record<string, string> = {
      'en': '🇺🇸', 'hi': '🇮🇳', 'ml': '🇮🇳', 'ne': '🇳🇵',
      'de': '🇩🇪', 'es': '🇪🇸', 'ta': '🇮🇳', 'bn': '🇮🇳',
    };
    return flags[lang] || '🌐';
  }

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-10 md:px-8 flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Hidden audio element */}
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
        />
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">Create New Audio</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Turn your text into lifelike speech in seconds.</p>
      </header>

      {/* Main Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8 transition-colors duration-200">
        <div className="p-6 md:p-8 space-y-8">
          {/* Text Area Section */}
          <div className="relative">
            <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
              <label className="text-slate-900 dark:text-gray-200 text-sm font-semibold uppercase tracking-wider">Script</label>
              
              <div className="flex items-center gap-3 ml-auto relative">
                 {/* Text Language Selector */}
                 <div className="relative z-20 text-lang-dropdown">
                    <button
                      type="button"
                      onClick={() => setIsTextLangDropdownOpen(!isTextLangDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span className="truncate max-w-[100px]">
                        {textLanguage === 'Auto' ? `Auto${script.trim() ? ` (${getLanguageName(autoDetectedLanguage.split('-')[0])})` : ''}` : textLanguage}
                      </span>
                      <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
                    </button>
                    
                    {isTextLangDropdownOpen && (
                      <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
                        {textLanguageOptions.map((opt) => (
                           <button
                             key={opt}
                             type="button"
                             onClick={() => {
                               if (opt === 'Auto') {
                                 setTextLanguage('Auto');
                                 const detected = detectLanguage(script);
                                 setAutoDetectedLanguage(detected);
                               } else {
                                 setTextLanguage(opt);
                               }
                               setIsTextLangDropdownOpen(false);
                             }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${textLanguage === opt ? 'bg-slate-50 dark:bg-slate-700 font-medium text-primary' : 'text-slate-700 dark:text-slate-200'}`}
                           >
                             {opt === 'Auto' ? `Auto${script.trim() ? ` (${getLanguageName(autoDetectedLanguage.split('-')[0])})` : ''}` : opt}
                           </button>
                        ))}
                      </div>
                    )}
                 </div>

                 <span className="text-slate-400 text-xs font-medium">{script.length}/5000</span>
              </div>
            </div>
            <textarea 
              className="w-full min-h-[160px] resize-y rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-base leading-relaxed text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all" 
              placeholder="Type or paste your script here..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
              maxLength={5000}
            ></textarea>

            {/* Auto Helper Note */}
            {textLanguage === 'Auto' && (
               <div className="mt-3 flex items-start gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg text-xs md:text-sm">
                  <span className="material-symbols-outlined text-sm mt-0.5">info</span>
                  <p>Select the text language for better pronunciation and accuracy.</p>
               </div>
            )}

            {/* Other Language Input */}
            {textLanguage === 'Other...' && (
               <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Enter text language"
                    value={customTextLanguage}
                    onChange={(e) => setCustomTextLanguage(e.target.value)}
                    className="w-full max-w-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white"
                  />
               </div>
            )}
          </div>

          {/* Dropdowns Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Profile - Dynamic */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-900 dark:text-gray-200 text-sm font-semibold uppercase tracking-wider">Voice Profile</label>
              
              {/* Loading state */}
              {voicesLoading && (
                <div className="flex items-center justify-center w-full h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="animate-spin">⏳</span>
                    <span className="text-sm">Loading voices...</span>
                  </div>
                </div>
              )}

              {/* Error state */}
              {voicesError && !voicesLoading && (
                <div className="flex items-center justify-center w-full h-14 px-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <span>⚠️</span>
                    <span className="text-sm">{voicesError}</span>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!voicesLoading && !voicesError && voices.length === 0 && (
                <div className="flex items-center justify-center w-full h-14 px-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/10">
                  <span className="text-sm text-amber-700 dark:text-amber-400">No voices available</span>
                </div>
              )}

              {/* Loaded dropdown */}
              {!voicesLoading && !voicesError && voices.length > 0 && (
                <div ref={voiceDropdownRef} className="relative">
                  <button 
                    ref={voiceRefs.setReference}
                    type="button"
                    onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
                    className="flex items-center justify-between w-full h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {selectedVoice?.gender === 'female' ? '♀' : '♂'}
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{selectedVoice?.name || 'Select a voice'}</p>
                        <p className="text-xs text-slate-500 capitalize truncate">{selectedVoice?.gender} • {selectedVoice?.engine}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                  </button>

                  {/* Dropdown menu with floating-ui */}
                  {isVoiceDropdownOpen && (
                    <div
                      ref={voiceRefs.setFloating}
                      style={voiceFloatingStyles}
                      className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-40 w-full"
                    >
                      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 dark:scrollbar-thumb-slate-500 scrollbar-track-slate-200 dark:scrollbar-track-slate-700">
                        {filteredVoices.map((voice) => (
                          <button
                            key={voice.id}
                            type="button"
                            onClick={() => {
                              setSelectedVoiceId(voice.id);
                              setIsVoiceDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                              voice.id === selectedVoiceId ? 'bg-primary/5' : ''
                            }`}
                          >
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
                              <span className="text-sm font-medium text-white">
                                {voice.language?.slice(0, 2).toUpperCase() || voice.id.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{voice.name}</p>
                              <p className="text-xs text-slate-500 capitalize truncate">{voice.gender} • {getLanguageName(voice.language)} • {voice.engine}</p>
                            </div>
                            {voice.id === selectedVoiceId && (
                              <span className="ml-auto text-primary">✓</span>
                            )}
                          </button>
                        ))}
                        <div className="sticky bottom-0 text-center text-xs text-slate-400 py-2 bg-white/90 dark:bg-slate-800/90 border-t border-slate-100 dark:border-slate-700 backdrop-blur-xs">
                          {filteredVoices.length} voices available
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language - Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-900 dark:text-gray-200 text-sm font-semibold uppercase tracking-wider">Language</label>
              <div ref={languageDropdownRef} className="relative">
                <button 
                  type="button"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  disabled={voicesLoading || voices.length === 0}
                  className="flex items-center justify-between w-full h-14 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   <div className="flex items-center gap-3 overflow-hidden">
                     <span className="text-xl flex items-center justify-center shrink-0">{selectedLanguage === 'all' ? '🌐' : getLanguageFlag(selectedLanguage)}</span>
                     <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                       {getLanguageName(selectedLanguage)}
                     </p>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">expand_more</span>
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute z-40 top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg max-h-64 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleLanguageChange(lang)}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                          lang === selectedLanguage ? 'bg-primary/5' : ''
                        }`}
                      >
                        <span className="text-lg flex items-center justify-center">{lang === 'all' ? '🌐' : getLanguageFlag(lang)}</span>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {getLanguageName(lang)}
                        </p>
                        {lang === selectedLanguage && (
                          <span className="ml-auto text-primary">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sliders Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
            {/* Speed Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Speed</span>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{speed}x</span>
              </div>
              <div className="relative h-6 flex items-center group">
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1" 
                  value={speed}
                  onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                  className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-75"
                    style={{ width: `${((speed - 0.5) / 1.5) * 100}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md transition-transform duration-75 pointer-events-none"
                  style={{ left: `${((speed - 0.5) / 1.5) * 100}%`, transform: 'translateX(-50%)' }}
                ></div>
              </div>
            </div>

            {/* Pitch Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Pitch</span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-gray-400 px-2 py-0.5 rounded">{pitch}</span>
              </div>
              <div className="relative h-6 flex items-center group">
                <input 
                  type="range" 
                  min="-50" 
                  max="50" 
                  value={pitch}
                  onChange={(e) => handlePitchChange(parseInt(e.target.value))}
                  className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-75"
                    style={{ width: `${((pitch + 50) / 100) * 100}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md transition-transform duration-75 pointer-events-none"
                  style={{ left: `${((pitch + 50) / 100) * 100}%`, transform: 'translateX(-50%)' }}
                ></div>
              </div>
            </div>

            {/* Stability Slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Stability</span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-gray-400 px-2 py-0.5 rounded">{stability}%</span>
              </div>
              <div className="relative h-6 flex items-center group">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={stability}
                  onChange={(e) => handleStabilityChange(parseInt(e.target.value))}
                  className="absolute w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-75"
                    style={{ width: `${stability}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md transition-transform duration-75 pointer-events-none"
                  style={{ left: `${stability}%`, transform: 'translateX(-50%)' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-4">
            {/* Settings changed indicator */}
            {settingsChanged && (
              <div className="flex items-center gap-3 p-3 bg-amber-900/30 border border-amber-600/50 rounded-lg mb-4 animate-pulse">
                <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-amber-200">
                  Settings changed. Click <strong className="font-semibold">Regenerate</strong> to apply new voice parameters.
                </p>
              </div>
            )}
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !script.trim() || !selectedVoiceId}
              className="w-full bg-primary hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold h-14 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Generating...
                </>
              ) : generatedAudio ? (
                settingsChanged ? (
                  <>
                    🔄 Regenerate with New Settings
                  </>
                ) : (
                  <>
                    🔄 Regenerate
                  </>
                )
              ) : (
                <>
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Generate Speech
                </>
              )}
            </button>
            {generationError && (
              <p className="text-red-500 text-sm mt-2 text-center">{generationError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Output Section - Only show when audio is generated */}
      {audioUrl && (
        <div className="space-y-4">
          {/* Audio Player Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors duration-200">
            <div className="flex flex-col gap-6">
              {/* Player Upper: Controls & Waveform */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Play Button */}
                <button 
                  onClick={togglePlay}
                  className="shrink-0 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all active:scale-95 group"
                >
                  <span className="material-symbols-outlined text-4xl ml-1 group-hover:scale-110 transition-transform">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                
                {/* Progress bar */}
                <div className="flex-1 w-full space-y-2">
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  {/* Timer */}
                  <div className="flex justify-between text-xs font-semibold text-slate-500 font-mono">
                    <span className="text-primary">{formatTime(currentTime)}</span>
                    <span>{formatTime(audioDuration)}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-end gap-3">
                <a 
                  href={audioUrl} 
                  download="speech.wav"
                  className="px-4 py-2.5 rounded-lg text-primary font-medium hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Download
                </a>
                <button 
                  onClick={handleGenerate}
                  className="px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">refresh</span>
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
