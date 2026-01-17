import React, { useState, useRef, useEffect } from 'react';
import { voiceChat, getAudioUrl } from '../services/api';

export default function VoiceChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: "Hello! I'm ready to help you. How can I assist with your project today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [playingMessageId, setPlayingMessageId] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const chatContainerRef = useRef(null);
  const audioRef = useRef(new Audio());

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Cleanup
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  const processingTimeoutRef = useRef(null);
  const PROCESSING_TIMEOUT = 35000; // 35 seconds max for safety reset

  const resetProcessingState = () => {
    console.log('[VoiceChat] Resetting processing state');
    setIsProcessing(false);
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = null;
    }
  };

  const handleStartRecording = async () => {
    try {
      console.log('[VoiceChat] Starting recording...');
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('[VoiceChat] Microphone access granted');

      // Use Opus if possible for better compression
      const options = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
        ? { mimeType: 'audio/webm;codecs=opus' } 
        : {};
      
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          console.log('[VoiceChat] Audio chunk received:', e.data.size, 'bytes');
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        console.log('[VoiceChat] Recording stopped, processing...');
        
        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());

        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        console.log('[VoiceChat] Audio blob created:', audioBlob.size, 'bytes');
        
        // Validate
        if (audioBlob.size === 0) {
          setError('Recording failed - no audio data captured');
          resetProcessingState();
          return;
        }

        if (audioBlob.size < 1000) {
           // Too short, likely accidental click
           console.warn('[VoiceChat] Recording too short (<1kb)');
           setError('Recording too short - please speak longer');
           resetProcessingState();
           return;
        }

        await processVoiceInput(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      console.log('[VoiceChat] Recording started');
    } catch (err) {
      console.error("[VoiceChat] Error accessing microphone:", err);
      setError("Could not access microphone. Please allow permissions.");
      resetProcessingState();
    }
  };

  const handleStopRecording = () => {
    console.log('[VoiceChat] Stop recording requested');
    if (mediaRecorderRef.current && isRecording) {
      setIsProcessing(true); // START processing UI immediately
      setIsRecording(false);
      
      // Safety timeout - force reset if processing takes too long (e.g. backend hanging)
      if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = setTimeout(() => {
        console.error('[VoiceChat] Processing timeout - forcing reset');
        setError('Processing timeout - server not responding');
        resetProcessingState();
      }, PROCESSING_TIMEOUT);

      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null; // Clean up ref
    }
  };

  const processVoiceInput = async (audioBlob) => {
    try {
      console.log('[VoiceChat] Sending to backend API...');
      
      // Call API with timeout (30s timeout passed to api)
      const result = await voiceChat(audioBlob, undefined, 30000);
      
      console.log('[VoiceChat] Response received:', result);
      
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Add user message if returned (or we could use optimistic UI if we transcribed locally, but we don't)
      const userMsg = {
        id: Date.now(),
        role: 'user',
        text: result.user_text || '(Audio message)', // Fallback
        time: currentTime
      };

      // Add AI message
      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: result.ai_text,
        time: currentTime,
        audioUrl: result.audio_url ? getAudioUrl(result.audio_url) : null,
        detectedLang: result.detected_language
      };

      setMessages(prev => [...prev, userMsg, aiMsg]);

      // Play audio response
      if (result.audio_url) {
        audioRef.current.src = getAudioUrl(result.audio_url);
        
        // Set playing state
        setPlayingMessageId(aiMsg.id);
        audioRef.current.onended = () => setPlayingMessageId(null);
        audioRef.current.onpause = () => setPlayingMessageId(null);
        
        audioRef.current.play().catch(e => {
          console.error("Audio playback error:", e);
          setPlayingMessageId(null);
        });
      }

    } catch (err) {
      console.error("[VoiceChat] Voice Chat process error:", err);
      // Show more descriptive error if available
      setError(err.message || "Failed to process voice input. Please try again.");
    } finally {
      // Clear safety timeout since we finished
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }
      setIsProcessing(false);
    }
  };

  const clearConversation = () => {
    setMessages([{
      id: 1,
      role: 'assistant',
      text: "Hello! I'm ready to help you. How can I assist with your project today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-slate-50 dark:bg-slate-950 rounded-xl transition-colors duration-200">
      {/* Page Header */}
      <header className="flex-none px-6 py-6 md:px-10 border-b border-slate-200/50 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 transition-colors duration-200">
        <div className="flex flex-wrap items-end justify-between gap-4 max-w-5xl mx-auto w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Voice Chat</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Interact with your AI assistant using your voice.</p>
          </div>
          <button 
            onClick={clearConversation}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            <span>Clear Conversation</span>
          </button>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="absolute top-24 left-0 right-0 z-20 px-6 flex justify-center">
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl shadow-lg border border-red-200 flex items-start gap-3 max-w-md animate-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">error</span>
            <div className="flex-1">
              <p className="text-sm font-semibold">Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="p-1 -mr-2 -mt-2 rounded-full hover:bg-red-100 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto w-full scroll-smooth" id="chat-container" ref={chatContainerRef}>
        <div className="flex flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto w-full min-h-full justify-end pb-40">
          {/* Date Separator */}
          <div className="flex justify-center my-4">
            <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">Today</span>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-3 max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
            >
              {/* Avatar */}
              <div 
                className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 md:size-10 shrink-0 shadow-sm border-2 border-white dark:border-slate-800`}
                style={{ 
                  backgroundImage: msg.role === 'user' 
                    ? 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAiwzseteHfwSJ2MW05A8KA1wl9sQFRxurbGfPBNYEJmSwezKJnW6_R5mOdZtL0SgnyvAH5h4UK2U0qnXyyRseS6BMFAhpYwf3ZmgH3UfJDN61zCx8iyPa-NE8_aQjPcZzg9FsNa6WvFDV2pKuIVREetonaCJt5VQaBMH2aGG-EL1Ay9FCE5hRsU_5romprToTpUngJGMjrRir5IszhHAYJt3-E8g0hmhtC_opMerP3s_eQFWl5aZ_CdMZ8ZCtefFA1dxODRM814mU")'
                    : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTtrHWrxs-1a3ol3rwPiOQv7B3sXqGUGS7iHY9OsYnzQRgpL7fwvReJrLiX2W8FhpNPHDcHbmPJriywjGSRJ2zBQDPMTRRAdQMyVgQKKtYoDefxIAl-OL7uctopcUE6rwuAJWjQdrojw_RZZRgAxnYjohJv7Moy_d0qII7mN-pYvMJna3V1hWx0vI97RuGl0XERgwLHMyrxOZqdcl63QUihx4fKUytUJ1p6UanyG9Ez0a21enfjqCPEVtV85eBKjP2xoJhdlHXEs0")'
                }}
              ></div>
              
              <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Meta */}
                <div className={`flex items-center gap-2 ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}>
                  {msg.role === 'user' ? (
                    <>
                      <span className="text-slate-400 text-[10px]">{msg.time}</span>
                      <span className="text-slate-500 text-xs font-medium">You</span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-500 text-xs font-medium">AI Assistant</span>
                      {/* Speaking Badge */}
                      {playingMessageId === msg.id && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider animate-in fade-in zoom-in duration-300">
                          Speaking
                        </span>
                      )}
                      {!playingMessageId && msg.detectedLang && (
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">
                          {msg.detectedLang}
                        </span>
                      )}
                      <span className="text-slate-400 text-[10px]">{msg.time}</span>
                    </>
                  )}
                </div>

                {/* Bubble */}
                <div 
                  className={`p-4 rounded-2xl shadow-sm transition-colors duration-200 leading-relaxed text-sm md:text-base ${
                    msg.role === 'user' 
                      ? 'rounded-br-sm bg-primary text-white shadow-blue-500/20' 
                      : 'rounded-bl-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Visualizer (Only when speaking) */}
                  {playingMessageId === msg.id && (
                    <div className="flex items-center gap-1 mt-3 h-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="w-1 bg-slate-400 dark:bg-slate-500 rounded-full h-2 animate-[pulse_1s_ease-in-out_infinite]"></div>
                        <div className="w-1 bg-slate-400 dark:bg-slate-500 rounded-full h-4 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
                        <div className="w-1 bg-primary rounded-full h-3 animate-[pulse_0.8s_ease-in-out_infinite]"></div>
                        <div className="w-1 bg-primary rounded-full h-2 animate-[pulse_1.1s_ease-in-out_infinite]"></div>
                        <div className="w-1 bg-slate-400 dark:bg-slate-500 rounded-full h-3 animate-[pulse_0.9s_ease-in-out_infinite]"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex w-full justify-center pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 rounded-full backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <p className="text-primary text-xs font-semibold animate-pulse">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/95 dark:via-slate-950/95 to-transparent pointer-events-none transition-colors duration-200 text-primary pt-24">
        <div className="flex flex-col items-center justify-center gap-4 pointer-events-auto max-w-md mx-auto">
          {/* PTT Button Container */}
          <div className="relative group">
            {/* Status Text Above Button */}
            {!isRecording && !isProcessing && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white dark:bg-slate-800 dark:text-slate-400 px-3 py-1 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">Ready to listen</span>
              </div>
            )}
            
            {/* Main Button */}
            <button 
              onMouseDown={handleStartRecording}
              onMouseUp={handleStopRecording}
              onTouchStart={handleStartRecording}
              onTouchEnd={handleStopRecording}
              disabled={isProcessing}
              className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full shadow-xl transition-all focus:outline-none cursor-pointer ${
                isRecording 
                  ? 'bg-red-500 scale-110 shadow-red-500/40 ring-4 ring-red-500/20' 
                  : 'bg-primary hover:bg-blue-600 shadow-primary/30 active:scale-95'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            >
              <span className="material-symbols-outlined text-[36px] md:text-[40px] text-white">
                {isRecording ? 'mic_off' : 'mic'}
              </span>
            </button>
            
            {/* Recording Animation Ring */}
            {isRecording && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-red-500/20 animate-ping z-0"></div>
            )}
            
             {/* Simple Ring for resting state (optional detail from image) */}
             {!isRecording && !isProcessing && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-primary/20 dark:border-primary/10 -z-0"></div>
             )}

          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {isRecording ? 'Release to Send' : 'Hold to Talk'}
          </p>
        </div>
      </div>
    </div>
  );
}
