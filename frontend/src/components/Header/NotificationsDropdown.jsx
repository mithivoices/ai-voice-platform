import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: 'Credit usage warning',
      message: 'You have used 80% of your monthly voice credits. Upgrade plan to ensure uninterrupted service.',
      time: '10m ago',
      type: 'warning',
      unread: true
    },
    {
      id: 2,
      title: 'Audio generation completed',
      message: "'Project Alpha' voiceover is ready for download.",
      time: '1h ago',
      type: 'success',
      unread: false
    },
    {
      id: 3,
      title: 'System updates',
      message: "New voice models are now available. Try the new 'Multilingual v2' engine.",
      time: '1 day ago',
      type: 'info',
      unread: false
    }
  ];

  const IconMap = {
    warning: <div className="flex items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 w-10 h-10"><span className="material-symbols-outlined text-[20px]">warning</span></div>,
    success: <div className="flex items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 w-10 h-10"><span className="material-symbols-outlined text-[20px]">check_circle</span></div>,
    info: <div className="flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-primary dark:text-blue-400 w-10 h-10"><span className="material-symbols-outlined text-[20px]">info</span></div>
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors duration-200"
      >
        <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-[380px] origin-top-right z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-white dark:bg-[#0F172A] rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] ring-1 ring-black ring-opacity-5 overflow-hidden flex flex-col border border-slate-200 dark:border-[#334155]">
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-[#334155]">
              <h3 className="text-slate-900 dark:text-white text-[16px] font-semibold leading-tight">Notifications</h3>
              <button className="text-xs font-medium text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Mark all as read</button>
            </div>

            <div className="flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className="group flex items-start gap-3 px-4 py-4 hover:bg-slate-50 dark:hover:bg-[#1E293B] cursor-pointer transition-colors border-b border-slate-50 dark:border-[#334155] relative"
                >
                  <div className="shrink-0 mt-0.5">
                    {IconMap[notif.type]}
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <div className="flex justify-between items-start w-full">
                      <p className="text-slate-900 dark:text-white text-sm font-semibold leading-snug">{notif.title}</p>
                      <span className="text-slate-400 dark:text-slate-500 text-xs whitespace-nowrap ml-2">{notif.time}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2">{notif.message}</p>
                  </div>
                  {notif.unread && (
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-[#131d36] border-t border-slate-100 dark:border-[#334155]">
              <button className="flex w-full items-center justify-center rounded-lg h-9 px-4 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-[#334155] text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-opacity-80 transition-colors shadow-sm">
                View all notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
