import React, { useState, useRef, useEffect } from 'react';
import { speechToText, getLanguages } from '../services/api';

export default function SpeechToText() {
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  // Language Support
  const [audioLanguage, setAudioLanguage] = useState("auto");
  const [customLanguage, setCustomLanguage] = useState("");
  const [languages, setLanguages] = useState([]);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const fileInputRef = useRef(null);

  // Cleanup on unmount
  // Timer logic
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Cleanup on unmount
  // Fetch languages
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const data = await getLanguages();
        setLanguages(data.languages);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
      }
    }
    fetchLanguages();
  }, []);

  const getLanguageName = (code) => {
    if (code === 'auto') return 'Auto Detect';
    if (code === 'other') return 'Other...';
    const lang = languages.find(l => l.code === code);
    return lang ? lang.name : code.toUpperCase();
  };

  const getLanguageFlag = (code) => {
    if (code === 'auto') return '🔍';
    if (code === 'other') return '🌐';
    const flags = {
      'en': '🇺🇸', 'hi': '🇮🇳', 'ml': '🇮🇳', 'ne': '🇳🇵', 
      'de': '🇩🇪', 'es': '🇪🇸', 'ta': '🇮🇳', 'bn': '🇮🇳'
    };
    return flags[code] || '🌐';
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError(null);
      setAudioBlob(null);
      setTranscribedText("");
      setRecordingTime(0);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access microphone. Please ensure permissions are granted.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processFile = (file) => {
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setError("File size exceeds 25MB limit.");
        return;
      }
      setAudioBlob(file);
      setError(null);
      setTranscribedText("");
      // Reset recording state if any
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      processFile(file);
    } else {
      setError("Please drop a valid audio file.");
    }
  };

  const handleTranscribe = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    setError(null);
    try {
      const result = await speechToText(
        audioBlob, 
        audioLanguage, 
        audioLanguage === 'other' ? customLanguage : null
      );
      setTranscribedText(result.text);
    } catch (err) {
      console.error("Transcription error:", err);
      setError("Failed to transcribe audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearAll = () => {
    setTranscribedText("");
    setAudioBlob(null);
    setError(null);
    setRecordingTime(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copyToClipboard = () => {
    if (transcribedText) {
      navigator.clipboard.writeText(transcribedText);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 min-h-full transition-colors duration-200">
      <div className="flex justify-center py-8 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col max-w-[1024px] w-full gap-8">
          {/* Page Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Speech to Text</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-normal">
              Record your voice or upload an audio file to generate accurate text transcriptions instantly.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-100 dark:border-red-900/30 flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              <p>{error}</p>
            </div>
          )}

          {/* Input Section: Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: Record Audio */}
            <div className={`group bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all border border-transparent hover:border-primary/20 flex flex-col items-center justify-between gap-6 min-h-[320px] dark:border-slate-800 dark:hover:border-primary/20 ${isRecording ? 'border-primary/50 ring-4 ring-primary/10' : ''}`}>
              <div className="w-full flex justify-between items-start">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Record Audio</h3>
                {isRecording && (
                  <div className="px-2 py-1 rounded bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider animate-pulse dark:bg-red-900/20 dark:text-red-400">
                    Recording
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center gap-6">
                {/* Mic Button Container */}
                <div className="relative">
                  {/* Pulse Effect Ring */}
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
                  )}
                  <div className={`absolute inset-[-12px] rounded-full border-2 transition-colors ${isRecording ? 'border-red-500/30' : 'border-primary/10 group-hover:border-primary/30'}`}></div>
                  {/* Main Button */}
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative z-10 size-20 rounded-full transition-all flex items-center justify-center text-white shadow-lg cursor-pointer active:scale-95 ${isRecording ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' : 'bg-primary hover:bg-blue-600 shadow-primary/30'}`}
                  >
                    <span className="material-symbols-outlined text-[40px]">{isRecording ? 'stop' : 'mic'}</span>
                  </button>
                </div>
                <div className="text-center space-y-1">
                  <div className={`text-3xl font-mono font-bold tracking-widest ${isRecording ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                    {formatTime(recordingTime)}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isRecording ? 'Click to stop' : 'Click to start recording'}
                  </p>
                </div>
              </div>
              {/* Audio Viz placeholder */}
              <div className={`w-full h-8 flex items-end justify-center gap-1 ${isRecording ? 'opacity-100' : 'opacity-30'}`}>
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 rounded-full bg-primary/40 transition-all duration-100 ${isRecording ? 'animate-pulse' : ''}`}
                    style={{ height: isRecording ? `${Math.random() * 100}%` : '20%' }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Right Card: Upload File */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-transparent dark:border-slate-800 flex flex-col gap-4 min-h-[320px]">
              <div className="w-full">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upload File</h3>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="audio/*" 
                className="hidden" 
                id="audio-upload"
              />
              
              {/* Dashed Drop Zone */}
              <label 
                htmlFor="audio-upload"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-1 w-full rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-4 p-6 group ${isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : (audioBlob && !isRecording ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-primary/50')}`}
              >
                <div className="size-16 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    {audioBlob && !isRecording ? 'check' : 'folder_open'}
                  </span>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-base font-medium text-slate-900 dark:text-white">
                    {audioBlob && !isRecording ? (
                      <span className="text-primary">{audioBlob.name || 'File selected'}</span>
                    ) : (
                      <>
                        <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">MP3, WAV, M4A (Max 25MB)</p>
                </div>
              </label>

              {/* Supported types pill */}
              <div className="flex justify-center gap-3">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-500 dark:text-slate-400">.MP3</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-500 dark:text-slate-400">.WAV</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium text-slate-500 dark:text-slate-400">.M4A</span>
              </div>
            </div>
          </div>

          {/* Language Selector Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-transparent dark:border-slate-800 flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col gap-1 min-w-[200px]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Audio Language</h3>
              <p className="text-xs text-slate-400">Specify language for better accuracy</p>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
              <div className="relative flex-1">
                <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center justify-between w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getLanguageFlag(audioLanguage)}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{getLanguageName(audioLanguage)}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">expand_more</span>
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute z-50 bottom-full mb-2 left-0 right-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg max-h-64 overflow-y-auto">
                    <button
                      onClick={() => { setAudioLanguage('auto'); setIsLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${audioLanguage === 'auto' ? 'bg-primary/5' : ''}`}
                    >
                      <span className="text-lg">🔍</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Auto Detect</span>
                    </button>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setAudioLanguage(lang.code); setIsLangDropdownOpen(false); }}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${audioLanguage === lang.code ? 'bg-primary/5' : ''}`}
                      >
                        <span className="text-lg">{getLanguageFlag(lang.code)}</span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{lang.name}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => { setAudioLanguage('other'); setIsLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${audioLanguage === 'other' ? 'bg-primary/5' : ''}`}
                    >
                      <span className="text-lg">🌐</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Other...</span>
                    </button>
                  </div>
                )}
              </div>

              {audioLanguage === 'other' && (
                <div className="flex-1 animate-in slide-in-from-left-2 duration-300">
                  <input 
                    type="text" 
                    placeholder="Enter audio language (e.g. French)"
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-primary/30 bg-primary/5 dark:bg-primary/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main Action Button */}
          <button 
            onClick={handleTranscribe}
            disabled={(!audioBlob && !isRecording) || isProcessing || isRecording}
            className="w-full bg-primary hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg h-14 rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin">⏳</span>
                Transcribing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">transcribe</span>
                Transcribe Audio
              </>
            )}
          </button>

          {/* Transcription Result Area */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">description</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Transcription Result</h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">{transcribedText.length} chars</span>
            </div>
            {/* Text Content */}
            <div className="p-0">
              <textarea 
                className="w-full h-64 p-6 bg-transparent border-0 resize-none text-base leading-[1.6] text-slate-700 dark:text-slate-300 focus:ring-0 placeholder:text-slate-300 outline-none block" 
                placeholder="Your transcribed text will appear here once the process is complete..." 
                readOnly
                value={transcribedText}
              ></textarea>
            </div>
            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <button 
                onClick={clearAll}
                className="text-sm font-medium text-slate-500 hover:text-red-500 px-4 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Clear
              </button>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                Copy Text
              </button>
            </div>
          </div>

          {/* Page Footer (Internal) */}
          <footer className="text-center py-6 text-sm text-slate-400">
            © 2024 Mithivoices. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
