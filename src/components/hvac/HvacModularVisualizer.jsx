import React, { useState } from 'react';
import { Eye, RotateCw, CheckCircle2, ShieldCheck, Cpu, ArrowUpRight, Wrench, X } from 'lucide-react';
import { COMPARTMENTS } from '../../data/mockData';

export default function HvacModularVisualizer({
  activeColor = '#6D6E71',
  selectedCompartment = null,
  onSelectCompartment = null,
  isInteractive = true,
  showLabels = true,
  mode = 'normal', // 'normal' | 'scanning' | 'swapping'
  swappedCompartmentId = null
}) {
  const [internalSelected, setInternalSelected] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const activeId = selectedCompartment !== null ? selectedCompartment : internalSelected;
  const currentComp = COMPARTMENTS.find(c => c.id === activeId) || COMPARTMENTS[0];

  const handleSelect = (id) => {
    if (onSelectCompartment) {
      onSelectCompartment(id);
    } else {
      setInternalSelected(id);
    }
  };

  const handleSwapSimulation = (e) => {
    e.stopPropagation();
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
    }, 1200);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#1E2125] to-[#141618] border border-white/10 p-4 md:p-6 shadow-2xl">
      {/* Top visualizer status bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A4A77E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A4A77E]"></span>
          </span>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C2B59B]">
            Modular Unit 3D Architecture
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">
            Finish: <span className="font-semibold text-[#A4A77E]">{activeColor}</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-[#A4A77E]/20 text-[#A4A77E] border border-[#A4A77E]/30 font-medium">
            Hot-Swappable 4-Bay
          </span>
        </div>
      </div>

      {/* Main SVG Unit Graphic Rendering */}
      <div className="relative w-full aspect-[16/10] max-h-[380px] flex items-center justify-center p-2">
        <svg
          viewBox="0 0 800 480"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="metalChassis" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2D32" />
              <stop offset="50%" stopColor="#1E2024" />
              <stop offset="100%" stopColor="#121316" />
            </linearGradient>

            <linearGradient id="louverGrate" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0C0E" />
              <stop offset="50%" stopColor="#22252A" />
              <stop offset="100%" stopColor="#0D0E10" />
            </linearGradient>

            <linearGradient id="activeCustomColor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={activeColor} stopOpacity="1" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.75" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Unit Concrete Foundation / Anti-vibration Pad */}
          <rect x="70" y="420" width="660" height="34" rx="6" fill="#202226" stroke="#3A3D42" strokeWidth="2" />
          <path d="M70 426 H730" stroke="#121315" strokeWidth="2" />
          <text x="400" y="442" fill="#6D6E71" fontSize="10" fontFamily="sans-serif" textAnchor="middle" letterSpacing="4">
            REINFORCED 2'x6' FOUNDATION SUB-BASE • ISO-MOUNTED
          </text>

          {/* Exterior Heavy-Duty Powder-Coated Cabinet Frame */}
          <rect x="90" y="60" width="620" height="360" rx="14" fill="url(#metalChassis)" stroke="#4A4E55" strokeWidth="3" />
          
          {/* Top Service Access Lip & Heavy Corner Bumpers */}
          <rect x="85" y="55" width="630" height="20" rx="4" fill="#32363D" stroke="#565B63" strokeWidth="1" />
          <circle cx="102" cy="65" r="4" fill="#1C1E22" stroke="#6D6E71" />
          <circle cx="700" cy="65" r="4" fill="#1C1E22" stroke="#6D6E71" />

          {/* 4 MODULAR COMPARTMENTS */}
          {/* COMPARTMENT 1: Left Top (Compressor & Inverter) */}
          <g
            className={`cursor-pointer transition-all duration-500 ${
              isSwapping && activeId === 1 ? '-translate-y-8 opacity-75' : ''
            }`}
            onClick={() => isInteractive && handleSelect(1)}
          >
            <rect
              x="110"
              y="90"
              width="275"
              height="150"
              rx="8"
              fill={activeId === 1 ? 'url(#activeCustomColor)' : '#26292E'}
              stroke={activeId === 1 ? '#C2B59B' : '#3F434A'}
              strokeWidth={activeId === 1 ? '3.5' : '1.5'}
              filter={activeId === 1 ? 'url(#neonGlow)' : 'none'}
            />
            {/* Ventilation Louvers */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x="130"
                y={110 + i * 18}
                width="235"
                height="10"
                rx="3"
                fill="url(#louverGrate)"
                stroke="#1B1C1F"
                strokeWidth="1"
              />
            ))}
            {/* RFID Tag Badge Indicator */}
            <rect x="315" y="98" width="60" height="18" rx="4" fill="#121315" stroke="#A4A77E" strokeWidth="1" />
            <text x="345" y="110" fill="#A4A77E" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              RFID #01
            </text>
            {/* Compartment Title */}
            <rect x="125" y="98" width="130" height="18" rx="4" fill="#15171A" opacity="0.9" />
            <text x="132" y="111" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
              BAY 1: INVERTER COMP.
            </text>
            {activeId === 1 && (
              <circle cx="245" cy="165" r="14" fill="#C2B59B" opacity="0.9" />
            )}
          </g>

          {/* COMPARTMENT 2: Right Top (Blower Assembly) */}
          <g
            className={`cursor-pointer transition-all duration-500 ${
              isSwapping && activeId === 2 ? '-translate-y-8 opacity-75' : ''
            }`}
            onClick={() => isInteractive && handleSelect(2)}
          >
            <rect
              x="415"
              y="90"
              width="275"
              height="150"
              rx="8"
              fill={activeId === 2 ? 'url(#activeCustomColor)' : '#26292E'}
              stroke={activeId === 2 ? '#C2B59B' : '#3F434A'}
              strokeWidth={activeId === 2 ? '3.5' : '1.5'}
              filter={activeId === 2 ? 'url(#neonGlow)' : 'none'}
            />
            {/* Centrifugal Blower Grill */}
            <circle cx="552" cy="165" r="46" fill="#15171A" stroke="#3A3E45" strokeWidth="2" />
            <circle cx="552" cy="165" r="30" fill="none" stroke="#6D6E71" strokeWidth="1.5" strokeDasharray="5 3" />
            <circle cx="552" cy="165" r="14" fill="#2E3238" stroke="#A4A77E" strokeWidth="2" />
            {/* Fan Blades */}
            <line x1="552" y1="125" x2="552" y2="205" stroke="#4A4F57" strokeWidth="2" />
            <line x1="512" y1="165" x2="592" y2="165" stroke="#4A4F57" strokeWidth="2" />
            {/* RFID Tag Badge */}
            <rect x="620" y="98" width="60" height="18" rx="4" fill="#121315" stroke="#A4A77E" strokeWidth="1" />
            <text x="650" y="110" fill="#A4A77E" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              RFID #02
            </text>
            <rect x="428" y="98" width="120" height="18" rx="4" fill="#15171A" opacity="0.9" />
            <text x="435" y="111" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
              BAY 2: ECM BLOWER
            </text>
          </g>

          {/* COMPARTMENT 3: Left Bottom (Microchannel Coil) */}
          <g
            className={`cursor-pointer transition-all duration-500 ${
              isSwapping && activeId === 3 ? 'translate-y-8 opacity-75' : ''
            }`}
            onClick={() => isInteractive && handleSelect(3)}
          >
            <rect
              x="110"
              y="255"
              width="275"
              height="150"
              rx="8"
              fill={activeId === 3 ? 'url(#activeCustomColor)' : '#26292E'}
              stroke={activeId === 3 ? '#C2B59B' : '#3F434A'}
              strokeWidth={activeId === 3 ? '3.5' : '1.5'}
              filter={activeId === 3 ? 'url(#neonGlow)' : 'none'}
            />
            {/* Microchannel Fine Fin Lines */}
            <g opacity="0.6">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <line
                  key={i}
                  x1="125"
                  y1={275 + i * 14}
                  x2="370"
                  y2={275 + i * 14}
                  stroke="#8B919A"
                  strokeWidth="1.2"
                />
              ))}
            </g>
            {/* Zero-loss Brass Quick Connect Valves */}
            <circle cx="140" cy="385" r="7" fill="#C2B59B" stroke="#827660" strokeWidth="2" />
            <circle cx="165" cy="385" r="7" fill="#C2B59B" stroke="#827660" strokeWidth="2" />
            <text x="180" y="388" fill="#D3D2CD" fontSize="8" fontFamily="sans-serif">
              ZERO-LOSS VALVES
            </text>
            {/* RFID Tag Badge */}
            <rect x="315" y="263" width="60" height="18" rx="4" fill="#121315" stroke="#A4A77E" strokeWidth="1" />
            <text x="345" y="275" fill="#A4A77E" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              RFID #03
            </text>
            <rect x="125" y="263" width="130" height="18" rx="4" fill="#15171A" opacity="0.9" />
            <text x="132" y="276" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
              BAY 3: MICROCHANNEL COIL
            </text>
          </g>

          {/* COMPARTMENT 4: Right Bottom (Filtration & IoT Diagnostics) */}
          <g
            className={`cursor-pointer transition-all duration-500 ${
              isSwapping && activeId === 4 ? 'translate-y-8 opacity-75' : ''
            }`}
            onClick={() => isInteractive && handleSelect(4)}
          >
            <rect
              x="415"
              y="255"
              width="275"
              height="150"
              rx="8"
              fill={activeId === 4 ? 'url(#activeCustomColor)' : '#26292E'}
              stroke={activeId === 4 ? '#C2B59B' : '#3F434A'}
              strokeWidth={activeId === 4 ? '3.5' : '1.5'}
              filter={activeId === 4 ? 'url(#neonGlow)' : 'none'}
            />
            {/* Pleated Filter Media & Diagnostic Board */}
            <g opacity="0.7">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={i}
                  x1={440 + i * 20}
                  y1="285"
                  x2={440 + i * 20}
                  y2="375"
                  stroke="#E6E6E8"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              ))}
            </g>
            {/* IoT Telemetry Microcontroller & LED Matrix */}
            <rect x="590" y="295" width="85" height="85" rx="6" fill="#121417" stroke="#3A3E45" strokeWidth="1.5" />
            <circle cx="608" cy="312" r="4" fill="#A4A77E" className="animate-pulse" />
            <circle cx="624" cy="312" r="4" fill="#C2B59B" />
            <circle cx="640" cy="312" r="4" fill="#6D6E71" />
            <text x="632" y="338" fill="#A4A77E" fontSize="8" fontFamily="monospace" textAnchor="middle">
              LOCAL MECH.
            </text>
            <text x="632" y="352" fill="#D3D2CD" fontSize="8" fontFamily="monospace" textAnchor="middle">
              SYNCED [OK]
            </text>
            {/* RFID Tag Badge */}
            <rect x="620" y="263" width="60" height="18" rx="4" fill="#121315" stroke="#A4A77E" strokeWidth="1" />
            <text x="650" y="275" fill="#A4A77E" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              RFID #04
            </text>
            <rect x="428" y="263" width="130" height="18" rx="4" fill="#15171A" opacity="0.9" />
            <text x="435" y="276" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" fontWeight="bold">
              BAY 4: FILTER & RFID HUB
            </text>
          </g>

          {/* Central Structural Spine with Conductor Alignment Rail */}
          <rect x="393" y="80" width="14" height="330" rx="3" fill="#1E2024" stroke="#484C54" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle key={i} cx="400" cy={105 + i * 38} r="3" fill="#C2B59B" stroke="#6D6E71" />
          ))}

          {/* Central Brand Seal Stamp */}
          <circle cx="400" cy="245" r="28" fill="#181A1D" stroke="#A4A77E" strokeWidth="2.5" />
          <circle cx="400" cy="245" r="24" fill="#1F2227" stroke="#C2B59B" strokeWidth="1" strokeDasharray="3 2" />
          <text x="400" y="243" fill="#FFFFFF" fontSize="6.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            NO-TECH
          </text>
          <text x="400" y="252" fill="#A4A77E" fontSize="5" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
            MODULAR
          </text>
        </svg>

        {/* Hand pointer overlay when not hovered */}
        {activeId === 1 && (
          <div className="absolute top-[28%] left-[22%] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C2B59B]/60 text-[11px] text-[#C2B59B] animate-bounce">
            <span>Click any bay to test swap</span>
          </div>
        )}
      </div>

      {/* Selected Bay Live Info Card */}
      {showLabels && (
        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-[#A4A77E] text-black font-bold uppercase tracking-wider">
                {currentComp.shortName}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Tag: {currentComp.rfidTag}
              </span>
            </div>
            <p className="text-sm text-slate-300">
              {currentComp.desc}
            </p>
            <p className="text-xs text-slate-400 italic">
              {currentComp.details}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleSwapSimulation}
              disabled={isSwapping}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#A4A77E] hover:bg-[#8e9167] text-black transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSwapping ? 'animate-spin' : ''}`} />
              {isSwapping ? 'Simulating Swap...' : 'Simulate Quick Swap'}
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
            >
              <Eye className="w-3.5 h-3.5" />
              Specs
            </button>
          </div>
        </div>
      )}

      {/* 4 Quick Bay Selector Pills */}
      {isInteractive && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {COMPARTMENTS.map((c) => (
            <button
              key={c.id}
              onClick={() => handleSelect(c.id)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                activeId === c.id
                  ? 'bg-[#A4A77E]/20 border-[#A4A77E] text-white shadow-lg ring-1 ring-[#A4A77E]'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>Bay 0{c.id}</span>
                <span className="text-[10px] text-[#A4A77E]">{c.swapTime}</span>
              </div>
              <p className="text-xs truncate font-medium text-slate-300 mt-0.5">{c.shortName}</p>
            </button>
          ))}
        </div>
      )}

      {/* Detailed Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#1C1E22] border border-[#A4A77E]/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-lg bg-[#A4A77E]/20 text-[#A4A77E]">
                <Cpu className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold font-serif">{currentComp.title}</h3>
                <span className="text-xs text-[#C2B59B] font-mono">{currentComp.rfidTag}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 my-4 leading-relaxed">
              {currentComp.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-black/40 border border-white/10 text-xs mb-5">
              <div>
                <span className="text-slate-500 block">Swap Duration</span>
                <span className="font-semibold text-[#A4A77E]">{currentComp.swapTime}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Modular Weight</span>
                <span className="font-semibold text-slate-200">{currentComp.weight}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Efficiency Rating</span>
                <span className="font-semibold text-[#C2B59B]">{currentComp.efficiency}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Est. Swap Cycle</span>
                <span className="font-semibold text-slate-200">{currentComp.estimatedSwapCycle}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#A4A77E]/10 border border-[#A4A77E]/30 flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-[#A4A77E] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Local Mechanical Protocol:</strong> Requires male & female conductor inspection prior to bay insertion and RFID telemetry confirmation.
              </span>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#A4A77E] hover:bg-[#8e9167] text-black transition-all"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
