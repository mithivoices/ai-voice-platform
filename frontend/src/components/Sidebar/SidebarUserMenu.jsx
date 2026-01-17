import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, CreditCard, LogOut } from 'lucide-react';

export default function SidebarUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors ${isOpen ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
      >
        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-xl">more_vert</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-56 z-50 origin-bottom-right animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-white dark:bg-[#0F172A] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 dark:border-[#334155] overflow-hidden p-1">
            <button
               onClick={() => handleAction('/settings')}
               className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>
            <button
               onClick={() => handleAction('/billing')}
               className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <CreditCard className="w-4 h-4 text-slate-400" />
              <span>Billing</span>
            </button>
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-1" />
            <button
               onClick={() => handleAction('/signin')}
               className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
