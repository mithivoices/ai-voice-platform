import React from 'react';
import { Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import CreditsPill from '../CreditsPill';
import UserDropdown from './UserDropdown';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header({ breadcrumbs = ['Home', 'Text to Speech'], onMenuClick }) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 transition-colors duration-200 shrink-0 relative z-20">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-2 text-sm whitespace-nowrap">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const routeMap = {
              'Home': '/dashboard',
              'Dashboard': '/dashboard',
              'Text to Speech': '/text-to-speech',
              'Speech to Text': '/speech-to-text',
              'Voice Chat': '/voice-chat',
              'Voice Lab': '/voice-lab',
              'Settings': '/settings',
              'Billing & Usage': '/billing'
            };
            const path = routeMap[crumb] || '#';

            return (
              <React.Fragment key={crumb}>
                {index > 0 && <span className="text-slate-300">›</span>}
                {isLast ? (
                  <span className="text-slate-800 dark:text-white font-medium">
                    {crumb}
                  </span>
                ) : (
                  <Link 
                    to={path}
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors"
                  >
                    {crumb}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-40 md:w-64 pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm placeholder:text-slate-400 dark:placeholder:text-dark-text-secondary text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
          />
        </div>

        {/* Search Icon Mobile */}
        <button className="sm:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        </button>

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Credits Badge */}
        <CreditsPill />

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
}
