import React from 'react';

export default function LocalMechanicalLogo({ className = 'h-10', showText = true, light = false }) {
  // Regulatory-style emblem with shield, gear, and wreath per PDF specifications
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-auto max-h-12 aspect-square drop-shadow-md flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Hexagonal Shield */}
        <path
          d="M50 4 L88 22 V54 C88 76 50 96 50 96 C50 96 12 76 12 54 V22 Z"
          className="fill-slate-100 dark:fill-[#1C1E22]"
          stroke="#C2B59B"
          strokeWidth="3"
        />
        {/* Inner Border Shield */}
        <path
          d="M50 10 L82 25 V52 C82 71 50 88 50 88 C50 88 18 71 18 52 V25 Z"
          stroke="#A4A77E"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        {/* Central Mechanical Gear & Caliper / Wrench */}
        <circle cx="50" cy="46" r="14" stroke="#C2B59B" strokeWidth="2.5" fill="none" />
        <path
          d="M50 26 V32 M50 60 V66 M30 46 H36 M64 46 H70 M36 32 L40 36 M60 56 L64 60 M64 32 L60 36 M36 60 L40 56"
          stroke="#A4A77E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="46" r="6" fill="#A4A77E" />
        {/* Three Regulatory Stars */}
        <polygon points="50,68 52,72 56,72 53,74 54,78 50,75 46,78 47,74 44,72 48,72" fill="#C2B59B" />
        <polygon points="38,64 39,67 42,67 40,69 41,72 38,70 35,72 36,69 34,67 37,67" fill="#C2B59B" transform="scale(0.8) translate(7, 10)" />
        <polygon points="62,64 63,67 66,67 64,69 65,72 62,70 59,72 60,69 58,67 61,67" fill="#C2B59B" transform="scale(0.8) translate(17, 10)" />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className="text-xs md:text-sm font-bold tracking-wider font-serif uppercase text-slate-900 dark:text-slate-100">
            LOCAL MECHANICAL
          </span>
          <span className="text-[9px] text-[#6C6F4D] dark:text-[#A4A77E] tracking-widest uppercase font-semibold">
            Certification & Quality Enforcement
          </span>
        </div>
      )}
    </div>
  );
}
