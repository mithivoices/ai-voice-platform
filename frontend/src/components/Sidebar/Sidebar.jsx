import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SidebarUserMenu from './SidebarUserMenu';

const navItems = [
  { path: '/dashboard', icon: 'home', label: 'Home' },
  { path: '/text-to-speech', icon: 'record_voice_over', label: 'Text to Speech' },
  { path: '/speech-to-text', icon: 'mic', label: 'Speech to Text' },
  { path: '/voice-chat', icon: 'forum', label: 'Voice Chat' },
  { path: '/voice-lab', icon: 'science', label: 'Voice Lab' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex w-[240px] h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex-col fixed left-0 top-0 z-20 transition-colors duration-200">
      {/* Logo & Brand */}
      <div className="p-4 flex items-center gap-3">
        <div className="size-10 rounded-full bg-linear-to-br from-primary to-blue-800 flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-white text-xl">graphic_eq</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base text-slate-900 dark:text-white leading-none">Mithivoices</span>
          <span className="text-xs text-primary font-medium mt-1">Pro Plan</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-hover hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? 'text-primary' : ''}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Credits Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-500 dark:text-gray-400">Credits Used</span>
          <span className="text-slate-900 dark:text-white font-medium">65%</span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: '65%' }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 mt-1">
          <span>130 used</span>
          <span>70 left</span>
        </div>
        <div className="text-xs text-slate-500 mt-1">Monthly</div>
        <button 
          onClick={() => navigate('/billing')}
          className="w-full mt-3 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-primary/20"
        >
          Upgrade Plan
        </button>
      </div>

      {/* User Section */}
      <div 
        onClick={() => navigate('/settings')}
        className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-dark-hover transition-colors group"
      >
        <div className="size-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
          <span className="text-primary font-bold text-sm">AR</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">Alex Rivera</p>
          <p className="text-xs text-slate-500 dark:text-gray-400">alex@example.com</p>
        </div>
        <SidebarUserMenu />
      </div>
    </aside>
  );
}
