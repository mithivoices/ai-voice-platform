import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: 'home', label: 'Home' },
  { path: '/text-to-speech', icon: 'record_voice_over', label: 'Text to Speech' },
  { path: '/speech-to-text', icon: 'mic', label: 'Speech to Text' },
  { path: '/voice-chat', icon: 'forum', label: 'Voice Chat' },
  { path: '/voice-lab', icon: 'science', label: 'Voice Lab' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

export default function MobileSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed Overlay Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div className="absolute top-0 left-0 h-full w-[80%] max-w-[300px] bg-white dark:bg-[#1a202c] shadow-xl z-50 flex flex-col transition-transform duration-300 animate-in slide-in-from-left">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-linear-to-br from-[#2463eb] to-[#1E40AF] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-lg">graphic_eq</span>
            </div>
            <h1 className="text-gray-900 dark:text-white text-lg font-bold tracking-tight">Mithivoices</h1>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 dark:bg-gray-800"></div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-lg transition-colors group
                ${isActive 
                  ? 'bg-[#DBEAFE] text-primary dark:bg-primary/20 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                {item.icon}
              </span>
              <span className="font-medium text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Footer / User Profile */}
        <div className="mt-auto p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <div 
            onClick={() => {
              navigate('/settings');
              onClose();
            }}
            className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#DBEAFE] dark:bg-blue-900/20 flex items-center justify-center border border-gray-100 dark:border-gray-600 group-hover:scale-105 transition-transform">
                <span className="text-primary font-bold text-sm">AR</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Alex Rivera</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
