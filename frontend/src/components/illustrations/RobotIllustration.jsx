import React from 'react';

export default function RobotIllustration({ className = "w-64 h-64" }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Glow */}
      <circle cx="200" cy="200" r="120" fill="#2563EB" fillOpacity="0.1" />
      
      {/* Robot Body */}
      <rect x="150" y="220" width="100" height="80" rx="20" fill="#F1F5F9" />
      <rect x="150" y="220" width="100" height="80" rx="20" stroke="#CBD5E1" strokeWidth="4" />
      
      {/* Screen/Chest */}
      <rect x="170" y="240" width="60" height="40" rx="8" fill="#334155" />
      <path d="M180 260 H220" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" className="animate-pulse"/>
      
      {/* Head */}
      <rect x="140" y="120" width="120" height="90" rx="24" fill="white" />
      <rect x="140" y="120" width="120" height="90" rx="24" stroke="#CBD5E1" strokeWidth="4" />
      
      {/* Face Screen */}
      <rect x="155" y="135" width="90" height="60" rx="12" fill="#0F172A" />
      
      {/* Eyes (Sad/Confused) */}
      <circle cx="180" cy="160" r="8" fill="#60A5FA" className="animate-bounce" style={{ animationDuration: '3s' }}/>
      <circle cx="220" cy="160" r="8" fill="#60A5FA" className="animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.2s' }}/>
      
      {/* Mouth (Line) */}
      <path d="M190 180 Q200 175 210 180" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
      
      {/* Antenna */}
      <line x1="200" y1="120" x2="200" y2="80" stroke="#CBD5E1" strokeWidth="4" />
      <circle cx="200" cy="70" r="10" fill="#F43F5E" className="animate-pulse" />
      
      {/* Arms */}
      <path d="M150 240 C130 240 120 260 120 280" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
      <circle cx="120" cy="280" r="12" fill="#CBD5E1" />
      
      <path d="M250 240 C270 240 280 260 280 280" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
      <circle cx="280" cy="280" r="12" fill="#CBD5E1" />
      
      {/* Shadow */}
      <ellipse cx="200" cy="340" rx="60" ry="10" fill="#CBD5E1" fillOpacity="0.5" />
    </svg>
  );
}
