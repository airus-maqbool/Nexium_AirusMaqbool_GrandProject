import React from "react";

export default function AnimatedLogo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2">
        {/* Icon with interconnected elements */}
        <div className="relative">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main gear */}
            <circle cx="16" cy="16" r="14" stroke="#3B82F6" strokeWidth="2" fill="none"/>
            <circle cx="16" cy="16" r="8" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
            {/* Gear teeth */}
            <rect x="14" y="2" width="4" height="6" fill="#3B82F6" rx="2"/>
            <rect x="14" y="24" width="4" height="6" fill="#3B82F6" rx="2"/>
            <rect x="2" y="14" width="6" height="4" fill="#3B82F6" rx="2"/>
            <rect x="24" y="14" width="6" height="4" fill="#3B82F6" rx="2"/>
            {/* Connecting lines */}
            <line x1="8" y1="8" x2="12" y2="12" stroke="#3B82F6" strokeWidth="1.5"/>
            <line x1="20" y1="20" x2="24" y2="24" stroke="#3B82F6" strokeWidth="1.5"/>
            <line x1="8" y1="24" x2="12" y2="20" stroke="#3B82F6" strokeWidth="1.5"/>
            <line x1="20" y1="12" x2="24" y2="8" stroke="#3B82F6" strokeWidth="1.5"/>
          </svg>
        </div>
        {/* Text */}
        <span className="text-2xl font-bold text-blue-600 tracking-wide">
          TAILOR RESUME.AI
        </span>
      </div>
    </div>
  );
} 