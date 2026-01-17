import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import { Header } from '../components/Header';

export default function DashboardLayout({ breadcrumbs, children }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-light-gray dark:bg-slate-950 transition-colors duration-200">
      {/* Sidebar (Desktop) */}
      <Sidebar />

      {/* Mobile Sidebar (Drawer) */}
      <MobileSidebar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:ml-[240px] flex flex-col min-h-screen transition-all duration-300">
        {/* Header */}
        <Header 
          breadcrumbs={breadcrumbs} 
          onMenuClick={() => setIsMobileNavOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
