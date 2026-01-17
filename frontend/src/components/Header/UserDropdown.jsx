import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, CreditCard, LogOut, ChevronRight } from 'lucide-react';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'Account Settings', icon: <Settings className="w-4 h-4" />, path: '/settings' },
    { label: 'Billing', icon: <CreditCard className="w-4 h-4" />, path: '/billing' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm ring-2 ring-transparent hover:ring-primary/20"
      >
        <span className="text-white text-sm font-medium">A</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-white dark:bg-[#0F172A] rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-[#334155] overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-4">
              <div className="shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold shadow-inner">
                A
              </div>
              <div className="flex flex-col overflow-hidden text-left">
                <p className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight truncate">Alex Rivera</p>
                <p className="text-[13px] font-normal text-slate-500 dark:text-slate-400 leading-normal truncate mt-0.5">alex@example.com</p>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-[#334155] w-full" />

            {/* Menu Items */}
            <div className="p-2 flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#1E293B] transition-all duration-150 outline-none text-left w-full"
                >
                  <div className="flex items-center justify-center text-slate-400 dark:text-slate-400 group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[14px] font-medium flex-1">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400" />
                </button>
              ))}

              <div className="h-px bg-slate-100 dark:bg-[#334155] mx-2 my-1" />

              <button
                onClick={() => handleNavigate('/signin')}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-700 dark:text-white hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/10 dark:hover:text-red-400 transition-all duration-150 outline-none text-left w-full"
              >
                <div className="flex items-center justify-center text-slate-400 dark:text-slate-400 group-hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="text-[14px] font-medium flex-1">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
