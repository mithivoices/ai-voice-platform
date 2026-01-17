import React from 'react';
import { NavLink } from 'react-router-dom';

export default function VoiceChatInput() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-display flex items-center justify-center p-4 sm:p-8">
      {/* Container simulating mobile device/view */}
      <div className="relative w-full max-w-[420px] bg-white dark:bg-slate-900 h-[850px] max-h-[calc(100vh-2rem)] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 ring-8 ring-black/5 dark:ring-white/5">
        
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-100 dark:border-slate-800 px-5 py-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm sticky top-0">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <button className="flex items-center justify-center size-8 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <div>
              <h2 className="text-base font-bold leading-tight">MithiVoice Room</h2>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live Now</span>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center px-4 h-9 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-xs font-bold rounded-full transition-colors hover:bg-red-100 dark:hover:bg-red-900/30">
            Leave
          </button>
        </header>

        {/* Chat Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 scroll-smooth" id="chat-container">
          
          {/* Date Separator */}
          <div className="flex justify-center py-4">
            <span className="text-slate-400 dark:text-slate-500 text-xs font-medium bg-slate-50 dark:bg-slate-800/50 px-3 py-1 rounded-full">Today</span>
          </div>

          {/* Incoming Voice Message */}
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-end gap-3 max-w-[90%]">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 border-2 border-white dark:border-slate-800 shadow-sm"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYnXKIyFIhQwDgelLVBfmyVNAb8MrVj9g1vhhNtuDXcQSKYM-Hlx1GW0XR3I8mmNBpOnCmglTJMmyZ3iPp_t9w1p9xlWePKNlBO6YJPKFabs1mcu4ENBixTlyQb0iJvceqS8ymkMI36wT0MaF3-7Maa-Xz_HCAXVZXXM4OFdJoZXe28lccn7r5_qO2oRZTgx3WrBG51c7NuSHiPmxW_usmTH-JDqm3xoaSmFEDINM9rEndWEhtr9THgBN7cAKn6m0loiKyBX4Bcp0")' }}
              ></div>
              <div className="flex flex-col gap-1.5 w-full">
                <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">Alex Mithi</span>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm p-3 w-full shadow-sm">
                  <div className="flex items-center gap-3">
                    <button className="flex shrink-0 items-center justify-center rounded-full size-10 bg-primary text-white hover:bg-primary/90 transition shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined text-[20px] ml-0.5">play_arrow</span>
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex h-8 items-center gap-0.5">
                        {/* Simulated Waveform */}
                        <div className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-5 bg-primary rounded-full"></div>
                        <div className="w-1 h-4 bg-primary rounded-full"></div>
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        <div className="w-1 h-3 bg-primary rounded-full"></div>
                        <div className="w-1 h-5 bg-primary rounded-full"></div>
                        <div className="w-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-1 h-3 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-1 h-4 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        <div className="w-1 h-3 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">0:24</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">2:23 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex flex-col gap-1 items-end mb-6">
            <div className="flex items-end gap-3 justify-end max-w-[85%]">
              <div className="flex flex-col gap-1 items-end">
                <div className="rounded-2xl rounded-tr-sm px-4 py-3 bg-primary text-white shadow-md shadow-primary/10">
                  <p className="text-[15px] leading-relaxed">Can you repeat that part about the timeline? The audio cut out for a second.</p>
                </div>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium mr-1">2:25 PM · Read</span>
              </div>
            </div>
          </div>

          {/* Incoming Text Message */}
          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-end gap-3 max-w-[85%]">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-8 shrink-0 border border-slate-200 dark:border-slate-700" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARXJ5a-8wzQrZGHANHoD9BdG7ET6G2Vxozuj3zZNLRkPA3UVr1OHEQPIEw6kD8Bg-BFb9Q9Pzk5v2j2bBa7nuTCEcyrwG36uXdB7aDtKNvuvWm7WoUEBMSMWTUdIGNLi5LEWeO5Mmi4bCpLRCkMZYXdyjDiQrMOjrwqArAyO25xFCBDya_X1enDAJYQbVoiLOsGIMtBxh4kx1ozE0xuKO792nzol6ly8fLEsFtDq43UyQLvGKBJpgz3ChW9Jy65YUCEzuuXbL_U6o")' }}
              ></div>
              <div className="flex flex-col gap-1 items-start">
                <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">Alex Mithi</span>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm">
                  <p className="text-[15px] leading-relaxed">Sure, I was saying that we aim to launch the beta by next Friday.</p>
                </div>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium ml-1">2:26 PM</span>
              </div>
            </div>
          </div>

          {/* Another Outgoing Message (Short) */}
          <div className="flex flex-col gap-1 items-end mb-2">
            <div className="flex items-end gap-3 justify-end max-w-[85%]">
              <div className="flex flex-col gap-1 items-end">
                <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 bg-primary text-white shadow-md shadow-primary/10">
                  <p className="text-[15px] leading-relaxed">Got it, thanks! 👍</p>
                </div>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium mr-1">Just now</span>
              </div>
            </div>
          </div>

        </div>

        {/* Fixed Input Composer */}
        <div className="absolute bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-3 z-20">
          <div className="flex items-end gap-3">
            {/* Attachment / Menu Button */}
            <button className="text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors pb-3">
              <span className="material-symbols-outlined text-[28px]">add_circle</span>
            </button>
            
            {/* Input Field Container */}
            <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 rounded-3xl flex items-center gap-2 p-1.5 border border-transparent focus-within:border-primary/30 transition-all">
              {/* Microphone Inside Input (Left) */}
              <button className="size-9 rounded-full bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors shrink-0">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
              <textarea 
                className="bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-[15px] w-full border-none focus:ring-0 resize-none py-2.5 max-h-24 outline-none" 
                placeholder="Type a message..." 
                rows={1} 
                style={{ minHeight: '44px' }}
              ></textarea>
              {/* Sticker Icon */}
              <button className="size-9 rounded-full bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:text-slate-500 flex items-center justify-center transition-colors shrink-0 mr-1">
                <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
              </button>
            </div>
            
            {/* Send Button */}
            <button className="size-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shrink-0 mb-0.5 cursor-pointer">
              <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
            </button>
          </div>
          {/* Safe Area Bottom Spacer */}
          <div className="h-1 w-full"></div>
        </div>

      </div>
    </div>
  );
}
