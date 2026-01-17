import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import CreditsModal from './CreditsModal';

export default function CreditsPill() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock credits data - should come from context/state management in Phase 3
  const TOTAL_CREDITS = 200;
  const usedCredits = 130; // Mock - should come from backend
  const remainingCredits = TOTAL_CREDITS - usedCredits;

  const handleOpenModal = () => {
    // Close any open TTS dropdowns
    const closeDropdowns = new CustomEvent('closeAllDropdowns');
    window.dispatchEvent(closeDropdowns);
    
    setIsModalOpen(true);
  };

  return (
    <>
      <button 
        onClick={handleOpenModal}
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#DBEAFE] dark:bg-blue-900/20 border border-transparent dark:border-blue-900/50 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors cursor-pointer group"
      >
        <Zap className="w-4 h-4 text-primary dark:text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" />
        <span className="text-sm font-bold text-[#1E40AF] dark:text-blue-300">{remainingCredits} Credits</span>
      </button>

      <CreditsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
