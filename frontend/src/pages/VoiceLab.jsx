import React from 'react';
import { Link } from 'react-router-dom';

export default function VoiceLab() {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-[#101622] overflow-y-auto relative">
      <div className="w-full max-w-[1080px] mx-auto px-6 py-10 md:px-12 md:py-14 flex flex-col gap-10">
        {/* Header */}
        <header className="flex flex-col gap-3">
          <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Voice Lab</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-normal max-w-2xl">
            Experiment, create, and refine your AI voice identity. Build custom models that resonate with your audience.
          </p>
        </header>

        {/* Status Banner */}
        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 p-5 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white rounded-lg p-2 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h2 className="text-blue-900 dark:text-blue-100 text-base md:text-lg font-bold leading-tight">Voice Lab is coming in Phase 3</h2>
                <p className="text-blue-800 dark:text-blue-200 text-sm font-normal leading-normal">Our team is finalizing the neural models. Expected launch: Q2 2026</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center rounded-full bg-white/50 dark:bg-black/20 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-200 ring-1 ring-inset ring-blue-700/10">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Feature Preview Grid */}
        <section className="@container">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">Planned Features</h3>
              <p className="text-slate-500 dark:text-slate-400 text-base">Here is a sneak peek at the powerful tools coming your way.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Custom Voice Profiles */}
              <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151b2d] p-6 shadow-sm opacity-80 hover:opacity-100 transition-all hover:shadow-md">
                <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">graphic_eq</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h4 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Custom Voice Profiles</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">Fine-tune pitch, cadence, and tone with advanced parametric controls to sculpt your perfect persona.</p>
                </div>
                <div className="mt-2">
                  <a href="#" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
                    Learn More 
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
              {/* Card 2: Voice Cloning */}
              <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151b2d] p-6 shadow-sm opacity-80 hover:opacity-100 transition-all hover:shadow-md">
                <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">content_copy</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h4 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Voice Cloning</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">Create high-fidelity digital twins of any voice in seconds using our instant cloning technology.</p>
                </div>
                <div className="mt-2">
                  <a href="#" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
                    Learn More 
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
              {/* Card 3: Voice Marketplace */}
              <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151b2d] p-6 shadow-sm opacity-80 hover:opacity-100 transition-all hover:shadow-md">
                <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h4 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Voice Marketplace</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">Buy premium voice models or sell your own unique creations to the Mithivoices community.</p>
                </div>
                <div className="mt-2">
                  <a href="#" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
                    Learn More 
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Email Signup CTA */}
        <section className="@container mt-auto pt-6 pb-12">
          <div className="flex flex-col items-center justify-center gap-8 rounded-2xl bg-slate-100 dark:bg-[#1a2235] px-6 py-12 md:px-12 md:py-16 text-center border border-transparent dark:border-slate-800">
            <div className="flex flex-col gap-3 max-w-2xl">
              <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                Get notified when Voice Lab launches
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
                Don't miss out. Join the waitlist today and get early access to beta features.
              </p>
            </div>
            <div className="w-full max-w-[480px]">
              <label className="flex flex-col w-full h-14 md:h-16 relative group/input">
                <div className="flex w-full flex-1 items-stretch rounded-xl shadow-sm overflow-hidden border border-slate-300 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all bg-white dark:bg-[#101622]">
                  <div className="pl-4 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <input 
                    className="flex w-full min-w-0 flex-1 resize-none bg-transparent border-none text-slate-900 dark:text-white focus:outline-0 focus:ring-0 placeholder:text-slate-500 px-4 text-base font-normal leading-normal" 
                    placeholder="Enter your email address" 
                    type="email"
                  />
                  <div className="p-1.5 md:p-2">
                    <button className="h-full px-6 cursor-pointer items-center justify-center rounded-lg bg-primary hover:bg-blue-600 active:bg-blue-700 text-white text-sm md:text-base font-bold leading-normal tracking-wide transition-colors shadow-sm">
                      Notify Me
                    </button>
                  </div>
                </div>
              </label>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-500">We care about your data in our <a href="#" className="underline hover:text-primary">privacy policy</a>.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
