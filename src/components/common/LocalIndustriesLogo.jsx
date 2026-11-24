import React from 'react';

export default function LocalIndustriesLogo({ className = 'h-12 sm:h-14', isDark = true }) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={isDark ? "/images/local-industries-logo-dark.png" : "/images/local-industries-logo.png"}
        alt="Local Industries Logo"
        className="h-full w-auto object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
      />
    </div>
  );
}
