import React from 'react';

export default function NoTechLogo({ className = 'h-11', variant = 'full', light = false }) {
  // Matches the exact logo shown in PDF page 9 and the reference image
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Oval emblem */}
      <svg
        viewBox="0 0 160 96"
        className="h-full w-auto max-h-12 aspect-[5/3] drop-shadow-sm flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Oval */}
        <ellipse
          cx="80"
          cy="48"
          rx="76"
          ry="44"
          stroke={light ? '#6D6E71' : '#A4A77E'}
          strokeWidth="3.5"
          className="transition-colors duration-300"
        />
        {/* Inner Fine Oval */}
        <ellipse
          cx="80"
          cy="48"
          rx="70"
          ry="38"
          stroke={light ? '#8A8C90' : '#C2B59B'}
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.85"
        />
        {/* Brand Text */}
        <text
          x="80"
          y="42"
          textAnchor="middle"
          fill={light ? '#1f2937' : '#FFFFFF'}
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="19"
          fontWeight="700"
          letterSpacing="1.2"
        >
          NO-TECH
        </text>
        <text
          x="80"
          y="62"
          textAnchor="middle"
          fill={light ? '#4b5563' : '#C2B59B'}
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="2.5"
        >
          SYSTEMS
        </text>
        <text
          x="80"
          y="77"
          textAnchor="middle"
          fill={light ? '#6D6E71' : '#A4A77E'}
          fontFamily="'Inter', system-ui, sans-serif"
          fontSize="8"
          fontWeight="500"
          letterSpacing="1.5"
        >
          EST. 2022
        </text>
      </svg>

      {variant === 'full' && (
        <div className="flex flex-col justify-center border-l border-slate-600/40 pl-3">
          <span className={`text-sm md:text-base font-bold font-serif tracking-wider ${light ? 'text-gray-900' : 'text-white'}`}>
            NO-TECH HVAC
          </span>
          <span className="text-[9px] md:text-[10px] tracking-widest text-[#A4A77E] font-medium uppercase">
            MODULAR • EFFICIENT • FUTURE READY
          </span>
        </div>
      )}
    </div>
  );
}
