import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts';
import TextToSpeechPage from './pages/text-to-speech';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SpeechToText from './pages/SpeechToText';
import VoiceChat from './pages/VoiceChat';
import VoiceLab from './pages/VoiceLab';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import Billing from './pages/Billing';
import MobileLandingPage from './pages/MobileLandingPage';
import VoiceChatInput from './pages/VoiceChatInput';

// Hook to detect mobile device
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// Placeholder pages
const DashboardHomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to Mithivoices</h1>
      <p className="text-slate-500 dark:text-slate-400">Your AI-powered voice platform. Get started by navigating to Text to Speech.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => navigate('/text-to-speech')}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-left hover:border-primary/50 hover:shadow-md transition-all group"
        >
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">Text to Speech</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Convert your text into lifelike AI voices</p>
        </button>
        <button 
          onClick={() => navigate('/speech-to-text')}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-left hover:border-primary/50 hover:shadow-md transition-all group"
        >
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">Speech to Text</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Transcribe audio files with high accuracy</p>
        </button>
        <button 
          onClick={() => navigate('/voice-chat')}
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-left hover:border-primary/50 hover:shadow-md transition-all group"
        >
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">Voice Chat</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Have conversations with mithiAI</p>
        </button>
      </div>
    </div>
  );
};

// Wrapper to conditionally render MobileLandingPage or DashboardHomePage with Layout
const DashboardHomeRoute = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileLandingPage />;
  }

  return (
    <DashboardLayout breadcrumbs={['Dashboard']}>
      <DashboardHomePage />
    </DashboardLayout>
  );
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Temporarily redirect root to TTS for testing */}
        <Route path="/" element={<Navigate to="/text-to-speech" replace />} />
        
        {/* Comment out landing page for now */}
        {/* <Route path="/landing" element={<LandingPage />} /> */}
        
        {/* Comment out auth pages for testing */}
        {/* <Route path="/signin" element={<SignInPage />} /> */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
        
        {/* Mobile Testing Routes */}
        <Route path="/mobile-landing" element={<MobileLandingPage />} />
        <Route path="/voice-chat-input" element={<VoiceChatInput />} />
        
        {/* Dashboard Home with Conditional Logic */}
        <Route path="/dashboard" element={<DashboardHomeRoute />} />
        
        {/* Other Dashboard routes always use layout */}
        <Route element={<DashboardLayout breadcrumbs={['Dashboard', 'Text to Speech']} />}>
          <Route path="/text-to-speech" element={<TextToSpeechPage />} />
        </Route>
        
        <Route element={<DashboardLayout breadcrumbs={['Dashboard', 'Speech to Text']} />}>
          <Route path="/speech-to-text" element={<SpeechToText />} />
        </Route>
        
        <Route element={<DashboardLayout breadcrumbs={['Dashboard', 'Voice Chat']} />}>
          <Route path="/voice-chat" element={<VoiceChat />} />
        </Route>
        
        <Route element={<DashboardLayout breadcrumbs={['Dashboard', 'Voice Lab']} />}>
          <Route path="/voice-lab" element={<VoiceLab />} />
        </Route>
        
        <Route element={<DashboardLayout breadcrumbs={['Dashboard', 'Settings']} />}>
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<DashboardLayout breadcrumbs={['Dashboard', 'Billing & Usage']} />}>
          <Route path="/billing" element={<Billing />} />
        </Route>

        {/* Error pages */}
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
