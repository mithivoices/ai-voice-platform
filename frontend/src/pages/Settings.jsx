import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [displayName, setDisplayName] = useState("Alexander Mitchell");
  const [playbackQuality, setPlaybackQuality] = useState("standard");

  const handleThemeChange = (e) => {
    const value = e.target.value;
    if (value === 'System Default') setTheme('system');
    else if (value === 'Light') setTheme('light');
    else if (value === 'Dark') setTheme('dark');
  };

  const getThemeValue = () => {
    if (theme === 'system') return 'System Default';
    if (theme === 'light') return 'Light';
    return 'Dark';
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full h-full bg-slate-50 dark:bg-slate-950 px-4 md:px-10 py-8 overflow-y-auto relative transition-colors duration-200">
      <div className="w-full max-w-[960px] space-y-8 pb-20">
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Settings</h1>
          <p className="text-slate-500 text-base font-normal leading-normal">Manage your workspace and preferences.</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav aria-label="Tabs" className="flex gap-8 overflow-x-auto">
            <a href="#general" className="whitespace-nowrap border-b-[3px] border-primary text-slate-900 dark:text-white pb-[13px] pt-2 text-sm font-bold transition-colors">
              General
            </a>
            <a href="#audio" className="whitespace-nowrap border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white pb-[13px] pt-2 text-sm font-medium transition-colors">
              Audio
            </a>
            <a href="#privacy" className="whitespace-nowrap border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white pb-[13px] pt-2 text-sm font-medium transition-colors">
              Privacy
            </a>
            <a href="#account" className="whitespace-nowrap border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white pb-[13px] pt-2 text-sm font-medium transition-colors">
              Account
            </a>
          </nav>
        </div>

        {/* General Section */}
        <section id="general" className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">General Settings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Interface Theme</span>
              <div className="relative">
                <select 
                  value={getThemeValue()}
                  onChange={handleThemeChange}
                  className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow cursor-pointer"
                >
                  <option>System Default</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Language</span>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </label>
          </div>
          <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Notifications</h4>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Email Notifications</span>
                <span className="text-sm text-slate-500">Receive weekly digests and updates.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Desktop Push Notifications</span>
                <span className="text-sm text-slate-500">Real-time alerts for new messages.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Audio Section */}
        <section id="audio" className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">headphones</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Audio Configuration</h3>
          </div>
          <div className="space-y-6">
            <div>
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-3">Playback Quality</span>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  playbackQuality === 'standard' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                  <input 
                    type="radio" 
                    name="quality" 
                    checked={playbackQuality === 'standard'}
                    onChange={() => setPlaybackQuality('standard')}
                    className="w-4 h-4 text-primary bg-slate-100 border-slate-300 focus:ring-primary dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" 
                  />
                  <span className={`text-sm font-medium ${playbackQuality === 'standard' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                    Standard (128kbps)
                  </span>
                </label>

                <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  playbackQuality === 'high' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                  <input 
                    type="radio" 
                    name="quality" 
                    checked={playbackQuality === 'high'}
                    onChange={() => setPlaybackQuality('high')}
                    className="w-4 h-4 text-primary bg-slate-100 border-slate-300 focus:ring-primary dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" 
                  />
                  <span className={`text-sm font-medium ${playbackQuality === 'high' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                    High (256kbps)
                  </span>
                </label>

                <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  playbackQuality === 'lossless' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                  <input 
                    type="radio" 
                    name="quality" 
                    checked={playbackQuality === 'lossless'}
                    onChange={() => setPlaybackQuality('lossless')}
                    className="w-4 h-4 text-primary bg-slate-100 border-slate-300 focus:ring-primary dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600" 
                  />
                  <span className={`text-sm font-medium ${playbackQuality === 'lossless' ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                    Lossless
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-900 dark:text-white font-medium">Auto-play next track</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="pt-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Input Device</span>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <select className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow">
                      <option>Default - MacBook Pro Microphone</option>
                      <option>External USB Microphone</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                  </div>
                  <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">mic</span>
                    Test
                  </button>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">security</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Privacy & Data</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Allow Data Collection</span>
                <span className="text-sm text-slate-500">Help us improve Mithivoices by sending usage data.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium">Save Search History</span>
                <span className="text-sm text-slate-500">Keep a record of your searches for better recommendations.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end border-t border-slate-200 dark:border-slate-700 pt-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Auto-delete history older than</span>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow">
                    <option>Never</option>
                    <option>30 Days</option>
                    <option>1 Year</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                </div>
              </label>
              <div>
                <button className="w-full md:w-auto px-6 py-3 border border-red-200 bg-red-50 text-red-600 dark:bg-red-900/10 dark:border-red-900/30 dark:text-red-400 font-bold text-sm rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">delete_forever</span>
                  Delete All History
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section id="account" className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">person</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Account</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-start">
            <div className="relative group">
              <div className="size-24 rounded-full bg-cover bg-center border-2 border-slate-200 dark:border-slate-700 shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPBvVnuspG5pphbOE98hkmgcstafhrpr5dv6nNRZJW5D2f3bddMRCtyoiBJwRwrJQvBBOKNfcnQhqyEax7DxtPQ-PdO3wyCcdIcTGVK_GgqqkKFXTneT9bQpDC6RuMU5crIYuV3bigJKpu-xtIgEuFtdPCn3yw6HNylZeZo19syoSbfIaXb43ceY4LOATeh5vwxzqrVuxnbf64Fn7b6FXl-S4yyh60if9HlpHIbOSzr9IiRnhXIlvZqN1GBx12BJkOZMKwEQA3udY")' }}></div>
              <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-2 text-slate-500 hover:text-primary shadow-sm transition-colors">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center gap-3">
                <label className="flex flex-col gap-2 w-full">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Display Name</span>
                  <input 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow" 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </label>
                <div className="mt-7">
                  <span className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-bold bg-primary/10 text-primary uppercase tracking-wide">
                    Pro Member
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-500">Your name will be visible to other members of your workspace.</p>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-bold">Delete Account</span>
                <span className="text-sm text-slate-500">Permanently delete your account and all data. This action cannot be undone.</span>
              </div>
              <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-red-400 transition-all">
                Delete my account
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Save Button Floating Footer */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 focus:ring-4 focus:ring-primary/30">
          <span className="material-symbols-outlined">save</span>
          Save Changes
        </button>
      </div>
    </div>
  );
}
