import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MobileLandingPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 md:bg-slate-200 md:dark:bg-slate-900 font-display flex flex-col md:items-center md:justify-center min-h-screen p-0 md:py-8">
      {/* Mobile Device Simulation Container (Responsive: Full screen on mobile, Framed on Desktop) */}
      <div className="relative w-full h-full min-h-screen md:min-h-0 md:h-[850px] md:max-w-[400px] bg-slate-50 dark:bg-slate-950 md:rounded-[32px] shadow-none md:shadow-2xl overflow-hidden flex flex-col md:border border-white/50 dark:border-slate-800 md:ring-8 ring-black/5 dark:ring-white/5">
        
        {/* Status Bar Area (Decorative - Desktop Only) */}
        <div className="hidden md:flex h-10 w-full bg-slate-50 dark:bg-slate-950 shrink-0 items-center justify-between px-6 z-20">
          <span className="text-xs font-bold text-slate-900 dark:text-white">9:41</span>
          <div className="flex gap-1.5">
            <div className="w-4 h-4 rounded-full bg-slate-900/10 dark:bg-white/10"></div>
            <div className="w-4 h-4 rounded-full bg-slate-900/10 dark:bg-white/10"></div>
            <div className="w-4 h-4 rounded-full bg-slate-900/10 dark:bg-white/10"></div>
          </div>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950 sticky top-0 z-10">
          <button className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="size-5 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Mithivoices</h2>
          </div>
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-slate-200 dark:border-slate-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAyJpRmFcJEuWC-VLhdxTXe4lqiGxpX23RIqp0HcpLbO9poNm4aa3MMNUZ2F1mxVOJULH5bQ50vMDfEZtNN-Vsy_JS6CyljKyLzaBRzTcNwDE3bRP3R0lFEWlv_l6tbyQAKZStgU6E9gKC8B3ngmgIwy7vqzC6Y5I97QOJfWzmYEDNJqa6G81dGShq9C1uDHFNrQYMb_FXB1UN3jO_fiFRJdqY0bHC0y3u4QgGvNq473WMsmShRxVm5ZyRbyjkNeoEpkz-Q7eRbFQ")' }}></div>
        </header>

        {/* Main Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-24">
          
          {/* Greeting */}
          <div className="mt-2 mb-8">
            <h1 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight tracking-tight">Hello, Alex</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal mt-1">Here's your studio overview.</p>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Monthly Credits Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-primary">
                    <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                  </span>
                  <h3 className="text-slate-900 dark:text-white text-base font-bold">Voice Credits</h3>
                </div>
                <button className="text-primary text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors">
                  Buy More
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">8,500</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">of 10,000 used</p>
                  </div>
                  <span className="text-slate-900 dark:text-white text-sm font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">85%</span>
                </div>
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 overflow-hidden">
                  <div className="h-full rounded-full bg-primary w-[85%]"></div>
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">Refreshes in 12 days</p>
              </div>
            </div>

            {/* Storage Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <span className="material-symbols-outlined text-[20px]">cloud_queue</span>
                  </span>
                  <h3 className="text-slate-900 dark:text-white text-base font-bold">Storage</h3>
                </div>
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">12 GB</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">of 50 GB used</p>
                  </div>
                  <span className="text-slate-900 dark:text-white text-sm font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">24%</span>
                </div>
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500 w-[24%]"></div>
                </div>
              </div>
            </div>

            {/* Recent Projects List */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Recent Projects</h3>
                <a className="text-primary text-sm font-medium hover:underline" href="#">View All</a>
              </div>
              <div className="flex flex-col gap-3">
                {/* Project Item 1 */}
                <div className="bg-white dark:bg-slate-900 p-3 pr-4 rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800 flex items-center gap-4 group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 bg-center bg-cover shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvRckkGp4jlARby0Snvc0gfNvRhj46ZUZ6848ObAah0pKUEb0_tUAJBM77jv1qRNFmC1kfoD01rb5SmO5qQBQizEtnu71bKbIHwBBBeFfhWO2YS8FjeSdWiDyP-A8X_Y2P9UGL52cI7f0Ais09ib21vl2Hzl4dB59DT74DZIWIHfyJs88Fi-S7C9eOb1--Ja1l_MaUotdQnJXXN1DBoM412oYPryJNGSeABQwffIqBB9Yx5jG2WfpQMuCdCW_VUjrpwU07S8BEEtI")' }}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-900 dark:text-white font-semibold text-sm truncate">Podcast Intro - Ep 4</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>2 mins ago</span>
                      <span className="size-1 rounded-full bg-slate-300"></span>
                      <span className="text-green-600 dark:text-green-400 font-medium">Ready</span>
                    </div>
                  </div>
                  <button className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                  </button>
                </div>
                {/* Project Item 2 */}
                <div className="bg-white dark:bg-slate-900 p-3 pr-4 rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800 flex items-center gap-4 group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 bg-center bg-cover shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBG1ZnUGAh2jsLAlHydwl94SD4l_mn9Mb5fb895yZPjpuy-YA57Wm8CwZzcbRmPWXGoLDXzOIVbEwrDZ2MZ7GKc596zw4KQtNTR_hl4rovbwFEU-YxAaORXKHQXL1cgjXpT3BU3155t5Ku7U2EECRfuQB9ne6KJ_Wbw1Mjdg4EMELVRGIw5sPJc1IUHhdbyD96DXD4ckGOFkDn4Ab-N2yXqUuyWhSeRuuGbdOBQvWfkdv06ya_gtux43B6dEFv8eNUTc4TyMJTzdIY")' }}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-900 dark:text-white font-semibold text-sm truncate">Marketing VSL</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>Yesterday</span>
                      <span className="size-1 rounded-full bg-slate-300"></span>
                      <span className="text-orange-600 dark:text-orange-400 font-medium">Processing</span>
                    </div>
                  </div>
                  <button className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">hourglass_empty</span>
                  </button>
                </div>
                 {/* Project Item 3 */}
                <div className="bg-white dark:bg-slate-900 p-3 pr-4 rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-slate-800 flex items-center gap-4 group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 bg-center bg-cover shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUmB0zNmXOaYP34jRdOH5lI2NWQNl_kiDENCe1V2Ncq_M0_rTWjiF8lkUbRe5ZwMSsxymouF5irVRRWkfCONVZqJB3oGjZCEz9yH_WqubFh9_h9X6VO6uSI9RMdNKMoBO9TEm5XeraKZNQkEGR9kk73MV1YXF2SDJZ0qMsNHcvlZp65dqc8QTuIiGR2O8xcAl2CJVlXWBxTSm3SF8YVkwa76aisr6Y66CIeW2UCe9I9bcarUFX2vsIQG2q9i2VPpXUW0A6eUUT1Zg")' }}></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-900 dark:text-white font-semibold text-sm truncate">Chapter 1 Audiobook</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>3 days ago</span>
                      <span className="size-1 rounded-full bg-slate-300"></span>
                      <span className="text-green-600 dark:text-green-400 font-medium">Ready</span>
                    </div>
                  </div>
                  <button className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* "End of list" spacer */}
          <div className="h-8"></div>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="absolute bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-20">
          <NavLink to="/" className="flex flex-col items-center gap-1 text-primary group">
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">home</span>
            <span className="text-[10px] font-medium">Home</span>
          </NavLink>
          <NavLink to="/" className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">folder_open</span>
            <span className="text-[10px] font-medium">Projects</span>
          </NavLink>
          {/* Floating Action Button (Center) */}
          <div className="relative -top-6">
            <button className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-blue-600 transition-colors">
              <span className="material-symbols-outlined text-[28px]">add</span>
            </button>
          </div>
          <NavLink to="/voice-lab" className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">graphic_eq</span>
            <span className="text-[10px] font-medium">Voices</span>
          </NavLink>
          <NavLink to="/settings" className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">settings</span>
            <span className="text-[10px] font-medium">Settings</span>
          </NavLink>
        </nav>

        {/* Home indicator for iOS feeling - Hide on Desktop, show on Mobile? or Keep consistency? It's a mobile feeling page. Keep it. */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full z-30 pointer-events-none"></div>

      </div>
    </div>
  );
}
