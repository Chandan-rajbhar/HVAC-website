import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Radio,
  Camera,
  CheckCircle2,
  RotateCw,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { COMPARTMENTS } from '../data/mockData';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';

export default function ContractorRfidPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCustomer = searchParams.get('customer') || 'Robert Chen (Dallas, TX)';

  // 9-Step interactive RFID scanning workflow (PDF Section 9)
  const [selectedCustomer, setSelectedCustomer] = useState(initialCustomer);
  const [selectedCompartment, setSelectedCompartment] = useState(1);
  const [scanStep, setScanStep] = useState('idle'); // 'idle' | 'scanning_old' | 'scanned_old' | 'scanning_new' | 'scanned_new' | 'validated'
  const [swapHistory, setSwapHistory] = useState([
    {
      id: 'swp-01',
      date: '2026-11-20',
      compartment: 'Bay 02: ECM Blower',
      oldTag: 'RFID-NT-4412-C2-REV1',
      newTag: 'RFID-NT-4412-C2-REV2',
      tech: 'David Vance',
      status: 'Validated & Verified',
      newCycle: '6 Years'
    }
  ]);

  const currentComp = COMPARTMENTS.find(c => c.id === selectedCompartment) || COMPARTMENTS[0];

  const handleStartScanning = () => {
    setScanStep('scanning_old');
    // Simulate camera scanning old compartment
    setTimeout(() => {
      setScanStep('scanned_old');
    }, 1500);
  };

  const handleScanNew = () => {
    setScanStep('scanning_new');
    // Simulate camera scanning new compartment
    setTimeout(() => {
      setScanStep('validated');
      // Add to swap history
      const newSwap = {
        id: `swp-0${swapHistory.length + 2}`,
        date: new Date().toISOString().split('T')[0],
        compartment: currentComp.shortName,
        oldTag: `${currentComp.rfidTag}-OLD`,
        newTag: `${currentComp.rfidTag}-NEW-${Math.floor(Math.random() * 899 + 100)}`,
        tech: 'Certified Technician',
        status: 'Validated & Verified',
        newCycle: currentComp.estimatedSwapCycle
      };
      setSwapHistory(prev => [newSwap, ...prev]);
    }, 1500);
  };

  const handleResetDemo = () => {
    setScanStep('idle');
  };

  return (
    <div className="min-h-screen bg-[#121315] text-slate-100 py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1B1D20] via-[#22252A] to-[#1B1D20] border border-white/10 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4A77E]">
              Contractor RFID Scanning Workflow Demo (PDF Section 9)
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              RFID Installation & Swap Scanner
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Interactive simulation of camera RFID tag capture, male/female pin validation, and swap cycle registration.
            </p>
          </div>

          <Link
            to="/local-mechanical"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15"
          >
            <span>Local Mechanical Quality Portal →</span>
          </Link>
        </div>

        {/* Disclaimer per PDF guidelines */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#A4A77E]" />
            Frontend Demonstration: Camera and RFID scanner operate via simulation sandbox without requiring physical NFC hardware.
          </span>
          <button
            onClick={handleResetDemo}
            className="flex items-center gap-1 text-[11px] text-[#A4A77E] hover:underline"
          >
            <RefreshCw className="w-3 h-3" /> Reset Demo
          </button>
        </div>

        {/* 9-Step Interactive Workflow Container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#181A1D] border border-white/10 space-y-6 shadow-2xl">
          
          {/* Step 1 & 2: Select Customer Profile & Compartment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                Step 1: Select Customer Profile:
              </label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-white outline-none"
              >
                <option value="Robert Chen (Dallas, TX)">Robert Chen (7721 Preston Hollow Way, Dallas, TX)</option>
                <option value="Sarah Montgomery (Fort Worth, TX)">Sarah Montgomery (4105 River Crest Dr, Fort Worth, TX)</option>
                <option value="Michael Lawson (Plano, TX)">Michael Lawson (1903 Legacy Dr, Plano, TX)</option>
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                Step 2: Select Compartment (1, 2, 3, or 4):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {COMPARTMENTS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCompartment(c.id);
                      setScanStep('idle');
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                      selectedCompartment === c.id
                        ? 'bg-[#A4A77E] text-black border-[#A4A77E] shadow-md'
                        : 'bg-black/30 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Bay 0{c.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Bay Overview */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{currentComp.title}</span>
                <span className="px-2 py-0.5 rounded bg-[#C2B59B]/20 text-[#C2B59B] font-mono text-[10px]">
                  {currentComp.rfidTag}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">{currentComp.desc}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-slate-400 block text-[10px]">Target Swap Cycle</span>
              <span className="font-bold text-[#A4A77E] font-mono">{currentComp.estimatedSwapCycle}</span>
            </div>
          </div>

          {/* Step 3, 4, 5, 6: Simulated Scanner Viewport */}
          <div className="relative aspect-[16/9] max-h-[340px] rounded-2xl bg-black border-2 border-white/15 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            
            {/* Viewport Reticle / Frame */}
            <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-[#A4A77E]/50 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between text-[10px] font-mono text-[#A4A77E]">
                <span>[RFID-CAM-01]</span>
                <span>ISO/IEC 15693</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#C2B59B]">
                <span>LOCAL MECH. SYNC</span>
                <span>915 MHz UHF</span>
              </div>
            </div>

            {/* Scanning States */}
            {scanStep === 'idle' && (
              <div className="space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#A4A77E]/20 text-[#A4A77E] border-2 border-[#A4A77E] flex items-center justify-center mx-auto shadow-2xl">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Camera & RFID Sensor Ready</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Align camera reticle with the RFID transponder label on the removed compartment.
                  </p>
                </div>
                <button
                  onClick={handleStartScanning}
                  className="px-6 py-3 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-xs shadow-xl transition-all"
                >
                  Step 3: Click "Scan RFID" (Removed Bay) →
                </button>
              </div>
            )}

            {scanStep === 'scanning_old' && (
              <div className="space-y-3 relative z-10 animate-in zoom-in">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border-2 border-amber-500 flex items-center justify-center mx-auto animate-spin">
                  <RotateCw className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-amber-300">Scanning Removed Compartment Tag...</h3>
                <p className="text-xs text-slate-300 font-mono">Simulating optical OCR and UHF 915 MHz interrogation</p>
              </div>
            )}

            {scanStep === 'scanned_old' && (
              <div className="space-y-4 relative z-10 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Removed Bay Tag Scanned!</h3>
                  <p className="text-xs text-slate-300 font-mono text-[#A4A77E]">
                    Logged: {currentComp.rfidTag}-DECOMMISSIONED
                  </p>
                </div>
                <button
                  onClick={handleScanNew}
                  className="px-6 py-3 rounded-xl bg-[#C2B59B] hover:bg-[#b0a388] text-black font-bold text-xs shadow-xl transition-all"
                >
                  Step 6: Scan Newly Inserted Compartment →
                </button>
              </div>
            )}

            {scanStep === 'scanning_new' && (
              <div className="space-y-3 relative z-10 animate-in zoom-in">
                <div className="w-16 h-16 rounded-full bg-[#A4A77E]/20 text-[#A4A77E] border-2 border-[#A4A77E] flex items-center justify-center mx-auto animate-spin">
                  <RotateCw className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#A4A77E]">Validating Newly Inserted Bay...</h3>
                <p className="text-xs text-slate-300 font-mono">Conducting male/female conductor continuity ping</p>
              </div>
            )}

            {scanStep === 'validated' && (
              <div className="space-y-4 relative z-10 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">RFID Validation Success!</h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    New Serial Tag: {currentComp.rfidTag}-NEW-COMMISSIONED
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleResetDemo}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold"
                  >
                    Scan Another Bay
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Step 7, 8, 9 Confirmation Output required by PDF Page 4 & Page 7:
              "Installation validated and submitted to Local Mechanical for quality control review."
              Display Local Mechanical logo near confirmation prompt. */}
          {scanStep === 'validated' && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-[#18231C] to-emerald-950/70 border-2 border-emerald-500/60 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Official Quality Compliance Seal
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white">
                    "Installation validated and submitted to Local Mechanical for quality control review."
                  </p>
                  <p className="text-xs text-slate-300">
                    Customer {selectedCustomer} updated. Conductor pin continuity and zero-loss seals verified.
                  </p>
                </div>
                <LocalMechanicalLogo className="h-12 flex-shrink-0" />
              </div>

              {/* Display New Estimated Swap Cycle */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-xs">
                <div className="p-2.5 rounded-xl bg-black/40">
                  <span className="text-slate-400 block text-[10px]">Bay Swapped</span>
                  <span className="font-bold text-white">{currentComp.shortName}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40">
                  <span className="text-slate-400 block text-[10px]">Audit Status</span>
                  <span className="font-bold text-emerald-400">QC Passed</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40">
                  <span className="text-slate-400 block text-[10px]">Registered Cycle</span>
                  <span className="font-bold text-[#A4A77E]">{currentComp.estimatedSwapCycle}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40">
                  <span className="text-slate-400 block text-[10px]">Next Service Due</span>
                  <span className="font-bold text-[#C2B59B]">Nov 2034</span>
                </div>
              </div>
            </div>
          )}

          {/* Compartment Swap History Table (PDF Step 8) */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#A4A77E]" /> Compartment Swap History & Telemetry Log
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Immutable RFID Audit Trail</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] uppercase tracking-wider text-slate-400 border-b border-white/10 bg-black/20">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Bay Component</th>
                    <th className="py-2.5 px-3">Decommissioned Tag</th>
                    <th className="py-2.5 px-3">New Active RFID Tag</th>
                    <th className="py-2.5 px-3">New Swap Cycle</th>
                    <th className="py-2.5 px-3">Audit Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  {swapHistory.map((swp) => (
                    <tr key={swp.id}>
                      <td className="py-2.5 px-3">{swp.date}</td>
                      <td className="py-2.5 px-3 font-sans font-medium text-white">{swp.compartment}</td>
                      <td className="py-2.5 px-3 text-slate-400 line-through">{swp.oldTag}</td>
                      <td className="py-2.5 px-3 text-[#A4A77E] font-bold">{swp.newTag}</td>
                      <td className="py-2.5 px-3 text-[#C2B59B]">{swp.newCycle}</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-sans font-semibold">Local Mech. QC [OK]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
