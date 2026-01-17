import React, { useState } from 'react';
import { X, AlertTriangle, ArrowRight, Zap, Check } from 'lucide-react';

export default function CreditsModal({ isOpen, onClose }) {
  const [showUpgradeInfo, setShowUpgradeInfo] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 transition-all duration-300"
    >
      <div className="relative flex w-full max-w-[480px] flex-col overflow-hidden rounded-xl bg-white dark:bg-[#101622] shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!showUpgradeInfo ? (
          <div className="flex flex-col items-center pt-8 pb-4 px-6 md:px-8">
            {/* Icon */}
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-500" fill="currentColor" />
            </div>
            
            {/* Headline */}
            <h3 className="text-[#0d121b] dark:text-white text-2xl font-bold leading-tight text-center mb-3">
              Your Plan & Usage
            </h3>
            
            {/* Body Text */}
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed text-center mb-8">
              You are currently on the <span className="font-semibold text-slate-900 dark:text-white">Free Plan</span>.
            </p>

            {/* Comparison Stats */}
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              {/* Free Plan Card */}
              <div className="flex flex-col gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 text-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Credits Left</span>
                <span className="text-slate-900 dark:text-white text-xl font-bold">200</span>
              </div>
              {/* Pro Plan Card */}
              <div className="relative flex flex-col gap-1 rounded-lg border border-blue-600/30 bg-blue-600/5 dark:bg-blue-600/10 p-4 text-center overflow-hidden">
                <div className="absolute -right-3 -top-3 h-8 w-8 bg-blue-600/10 rounded-full blur-md"></div>
                <span className="text-blue-600 text-sm font-bold">Pro Plan</span>
                <span className="text-[#0d121b] dark:text-white text-xl font-bold">Unlimited</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full flex-col gap-3">
              <button 
                onClick={() => setShowUpgradeInfo(true)}
                className="group flex w-full cursor-pointer items-center justify-center rounded-lg bg-blue-600 h-12 px-5 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
              >
                <span className="text-base font-bold tracking-[0.015em]">Upgrade to Pro</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={onClose}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors duration-200"
              >
                <span className="text-base font-medium">Close</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center pt-8 pb-8 px-6 md:px-8 animate-in slide-in-from-right-8 duration-300">
             <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
              <Check className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
            
            <h3 className="text-[#0d121b] dark:text-white text-2xl font-bold leading-tight text-center mb-3">
              Coming Soon!
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed text-center mb-8 max-w-[320px]">
              We are currently rolling out Pro plans to a limited set of users. Payments are not yet enabled for your account.
            </p>

             <button 
                onClick={onClose}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors duration-200"
              >
                <span className="text-base">Got it</span>
              </button>
          </div>
        )}
      </div>
    </div>
  );
}
