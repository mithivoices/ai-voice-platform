import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import RobotIllustration from '../components/illustrations/RobotIllustration';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white transition-colors duration-200">
      {/* Navigation Bar */}
      <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-slate-900 dark:text-white">
            <div className="w-8 h-8 text-blue-600 dark:text-blue-500">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_319)">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48"></rect></clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Mithivoices</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <Link to="/login" className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold leading-normal transition-colors">
              <span className="truncate">Log In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex flex-col grow items-center justify-center p-6">
        <div className="flex w-full max-w-[640px] flex-col items-center gap-8 py-12 md:py-20 animate-in fade-in duration-700 slide-in-from-bottom-4">
          
          {/* Illustration Container */}
          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            {/* Decorative background blob */}
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60"></div>
            
            {/* Robot Illustration Component */}
            <div className="relative z-10 w-64 h-64 flex items-center justify-center">
              <RobotIllustration className="w-full h-full drop-shadow-xl" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-[100px] md:text-[140px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-blue-600 via-blue-400 to-blue-200 dark:to-blue-600 select-none">
              404
            </h1>
            <div className="space-y-3 max-w-[480px]">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Page Not Found
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-6 w-full max-w-xs">
            <Link to="/" className="w-full flex items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-base font-semibold shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
              <LayoutDashboard className="w-5 h-5" />
              <span className="truncate">Go to Dashboard</span>
            </Link>
            <a href="#" className="group flex items-center gap-2 text-blue-600 hover:text-blue-500 dark:hover:text-blue-400 text-sm font-medium transition-colors">
              <span className="underline decoration-transparent group-hover:decoration-current underline-offset-4 transition-all">Need help? Contact Support</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
