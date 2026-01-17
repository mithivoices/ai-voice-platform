import React from 'react';

export default function Billing() {
  return (
    <div className="grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10 bg-[#f6f8f7] dark:bg-slate-950 min-h-full transition-colors duration-200">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0d1b17] dark:text-white tracking-tight mb-2">Billing & Usage</h1>
          <p className="text-[#4b5563] dark:text-[#9ca3af] text-sm">Manage your subscription plan, payment methods, and usage limits.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#183028] border border-[#e7f3ef] dark:border-[#1f3a33] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-opacity-90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Download Invoice
          </button>
        </div>
      </div>

      {/* Usage Overview (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Monthly Credits (Circular) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#e7f3ef] dark:border-slate-700 shadow-sm flex flex-col h-full transition-colors duration-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-[#0d1b17] dark:text-slate-400">Monthly Credits</h3>
              <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] mt-1">Refreshes in 12 days</p>
            </div>
            <span className="material-symbols-outlined text-[#4b5563] dark:text-[#9ca3af]">generating_tokens</span>
          </div>
          <div className="grow flex flex-col justify-center items-center py-4">
            <div className="relative size-32">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-[#e7f3ef] dark:text-[#1f3a33]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                <path className="text-[#10b77f] drop-shadow-sm" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="82, 100" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="text-2xl font-bold text-[#0d1b17] dark:text-white">82%</span>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-[#0d1b17] dark:text-white">1,250 / 10,000 left</span>
            </div>
            <button className="w-full bg-[#10b77f] hover:bg-[#0e9f6e] text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm shadow-md shadow-[#10b77f]/20">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              Top Up Credits
            </button>
          </div>
        </div>

        {/* Card 2: Storage (Linear) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#e7f3ef] dark:border-slate-700 shadow-sm flex flex-col h-full transition-colors duration-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-medium text-[#0d1b17] dark:text-white">Storage</h3>
              <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] mt-1">Generated audio files</p>
            </div>
            <span className="material-symbols-outlined text-[#4b5563] dark:text-[#9ca3af]">folder_open</span>
          </div>
          <div className="grow flex flex-col justify-center gap-2">
            <div className="flex justify-between items-end mb-1">
              <span className="text-3xl font-bold text-[#0d1b17] dark:text-white">94%</span>
              <span className="text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">Almost Full</span>
            </div>
            <div className="w-full bg-[#e7f3ef] dark:bg-[#1f3a33] rounded-full h-3">
              <div className="bg-[#10b77f] h-3 rounded-full relative overflow-hidden" style={{ width: '94%' }}>
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] mt-2">
              <span className="font-semibold text-[#0d1b17] dark:text-white">9.4GB</span> used of 10GB
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-[#e7f3ef] dark:border-[#1f3a33]">
            <a href="#" className="text-[#10b77f] hover:text-[#0e9f6e] font-medium text-sm flex items-center gap-1 group">
              Manage Files
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Card 3: Next Billing */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#e7f3ef] dark:border-slate-700 shadow-sm flex flex-col h-full transition-colors duration-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-medium text-[#0d1b17] dark:text-white">Next Billing</h3>
              <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] mt-1">Pro Plan Subscription</p>
            </div>
            <span className="material-symbols-outlined text-[#4b5563] dark:text-[#9ca3af]">receipt_long</span>
          </div>
          <div className="grow flex flex-col justify-center">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#0d1b17] dark:text-white">$19.00</span>
              <span className="text-[#4b5563] dark:text-[#9ca3af]">/ month</span>
            </div>
            <div className="flex items-center gap-2 mt-3 text-[#4b5563] dark:text-[#9ca3af]">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              <span className="text-sm">Due on Dec 12, 2024</span>
            </div>
            <div className="mt-3 inline-flex">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30">
                <span className="size-1.5 rounded-full bg-green-500"></span>
                Auto-renewal on
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-white dark:bg-[#183028] hover:bg-gray-50 dark:hover:bg-opacity-80 text-[#0d1b17] dark:text-white border border-[#e7f3ef] dark:border-[#1f3a33] font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
              Change Plan
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Plan Section (Span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-[#e7f3ef] dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-200">
          <div className="p-6 border-b border-[#e7f3ef] dark:border-[#1f3a33] flex justify-between items-center">
            <h3 className="font-bold text-lg">Current Plan</h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-[#10b77f]/10 text-[#10b77f] border border-[#10b77f]/20">
              Active
            </span>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h4 className="text-xl font-bold text-[#0d1b17] dark:text-white">Pro Plan</h4>
                <p className="text-[#4b5563] dark:text-[#9ca3af] text-sm mt-1">Perfect for professional content creators.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#0d1b17] dark:text-white">$19<span className="text-base font-normal text-[#4b5563] dark:text-[#9ca3af]">/mo</span></p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['20h of Generation Time', 'Ultra-fast Processing', 'Commercial Rights', 'Priority Support', 'Custom Voice Clones (3)', 'API Access'].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#10b77f] text-xl">check_circle</span>
                  <span className="text-sm text-[#0d1b17] dark:text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7f3ef] dark:border-slate-700 shadow-sm h-full flex flex-col transition-colors duration-200">
          <div className="p-6 border-b border-[#e7f3ef] dark:border-[#1f3a33]">
            <h3 className="font-bold text-lg">Payment Method</h3>
          </div>
          <div className="p-6 grow flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-10 rounded border border-[#e7f3ef] dark:border-[#1f3a33] flex items-center justify-center bg-white">
                <img alt="Visa Logo" className="h-4 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh-_sAeJAWWs1hZbaYC9hVCU5WoemeKfV3S7vnRjWdGmAUAbq0H0WCe7zKYm9Qjak5qLXFNCAixx73uG9uvrEqRWWVe1Fqm0tsjanA9WbD2EabPCne4Our2UfAcU-8RUkhPAcAe4oFuTMHsZ5W41y-MsWy9n9mLEOGY68tMDg6erIC8lMDsw4nmhEGaGqmFSqb7skiACgScdyYVseXsrolw1CfjOeN1Iuka7QHx5FTfpM2fxc_dyeMsNILr7Q6lk4U-PF08It8nyA" />
              </div>
              <div>
                <p className="font-medium text-[#0d1b17] dark:text-white">Visa ending in 4242</p>
                <p className="text-xs text-[#4b5563] dark:text-[#9ca3af]">Expiry 09/2026</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm py-2 border-b border-[#e7f3ef] dark:border-[#1f3a33] border-dashed">
                <span className="text-[#4b5563] dark:text-[#9ca3af]">Billing Address</span>
                <span className="font-medium">New York, US</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-[#4b5563] dark:text-[#9ca3af]">Email</span>
                <span className="font-medium">alex@mithi.com</span>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0 mt-auto">
            <button className="w-full bg-white dark:bg-[#183028] hover:bg-gray-50 dark:hover:bg-opacity-80 text-[#0d1b17] dark:text-white border border-[#e7f3ef] dark:border-[#1f3a33] font-medium py-2.5 px-4 rounded-lg transition-colors text-sm">
              Edit Payment Method
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7f3ef] dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-200">
        <div className="p-6 border-b border-[#e7f3ef] dark:border-[#1f3a33] flex justify-between items-center">
          <h3 className="font-bold text-lg">Billing History</h3>
          <button className="text-sm text-[#10b77f] font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#4b5563] dark:text-[#9ca3af] uppercase bg-gray-50 dark:bg-white/5 border-b border-[#e7f3ef] dark:border-[#1f3a33]">
              <tr>
                <th className="px-6 py-4 font-medium" scope="col">Date</th>
                <th className="px-6 py-4 font-medium" scope="col">Invoice ID</th>
                <th className="px-6 py-4 font-medium" scope="col">Description</th>
                <th className="px-6 py-4 font-medium" scope="col">Amount</th>
                <th className="px-6 py-4 font-medium text-right" scope="col">Status</th>
                <th className="px-6 py-4 font-medium text-right" scope="col"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e7f3ef] dark:divide-[#1f3a33]">
              {[
                { date: 'Nov 12, 2024', id: 'INV-2024-011', desc: 'Pro Plan - Monthly', amount: '$19.00', status: 'Paid' },
                { date: 'Oct 12, 2024', id: 'INV-2024-010', desc: 'Pro Plan - Monthly', amount: '$19.00', status: 'Paid' },
                { date: 'Sep 28, 2024', id: 'INV-2024-009', desc: 'Extra Credits (5,000)', amount: '$10.00', status: 'Paid' },
                { date: 'Sep 12, 2024', id: 'INV-2024-008', desc: 'Pro Plan - Monthly', amount: '$19.00', status: 'Paid' }
              ].map((item, index) => (
                <tr key={index} className="bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-[#0d1b17] dark:text-white">{item.date}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[#4b5563] dark:text-[#9ca3af]">{item.id}</td>
                  <td className="px-6 py-4 text-[#4b5563] dark:text-[#9ca3af]">{item.desc}</td>
                  <td className="px-6 py-4 font-medium text-[#0d1b17] dark:text-white">{item.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#4b5563] dark:text-[#9ca3af] hover:text-[#10b77f] p-1">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
