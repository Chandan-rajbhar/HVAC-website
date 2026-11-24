import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Mail,
  Calendar,
  Layers,
  Sparkles,
  Info,
  RotateCw,
  Sliders,
  DollarSign,
  ChevronRight,
  Download
} from 'lucide-react';
import HvacModularVisualizer from '../components/hvac/HvacModularVisualizer';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import NoTechLogo from '../components/common/NoTechLogo';
import { COLOR_SWATCHES, COMPARTMENTS } from '../data/mockData';

export default function BuyersPortalPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse color from query string if present
  const queryParams = new URLSearchParams(location.search);
  const initialColor = queryParams.get('color') || COLOR_SWATCHES[0].hex;

  // Step state: 1: Selection, 2: Compatibility, 3: $200 Deposit, 4: Confirmation
  const [currentStep, setCurrentStep] = useState(1);

  // Configuration State
  const [tonnage, setTonnage] = useState('3.0 Ton');
  const [configuration, setConfiguration] = useState('Upflow'); // Upflow, Downflow, Horizontal
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [customBays, setCustomBays] = useState({
    1: 'Inverter Variable-Speed (Standard)',
    2: 'ECM Whisper Multi-Stage (Standard)',
    3: 'All-Aluminum Microchannel (Standard)',
    4: 'MERV 16 Electrostatic + RFID IoT (Standard)'
  });

  // Compatibility State
  const [fuelSource, setFuelSource] = useState('Natural Gas');
  const [voltage, setVoltage] = useState('208/230V Single-Phase');
  const [lineLength, setLineLength] = useState('Under 80 ft');
  const [clearanceConfirmed, setClearanceConfirmed] = useState(true);
  const [structuralCheck, setStructuralCheck] = useState(true);

  // Customer Contact for Demo Reservation
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState('sarah.jenkins@example.com');
  const [customerPhone, setCustomerPhone] = useState('(214) 555-0192');
  const [customerAddress, setCustomerAddress] = useState('4820 Oakmont Ridge, Dallas, TX 75201');

  // Confirmation Demo State
  const [batchNumber, setBatchNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  // Calculate Demo Pricing
  const basePrices = {
    '2.0 Ton': 3800,
    '2.5 Ton': 4100,
    '3.0 Ton': 4500,
    '3.5 Ton': 4900,
    '4.0 Ton': 5300,
    '5.0 Ton': 5900,
  };
  const currentBasePrice = basePrices[tonnage] || 4500;
  const modularCompPrice = 1400; // demo
  const installationDemoEstimate = 850; // demo
  const totalDemoPrice = currentBasePrice + modularCompPrice + installationDemoEstimate;
  const monthlyDemo = Math.round(totalDemoPrice / 48);

  // Line size recommendation per PDF rules
  const getLineSetNotice = () => {
    if (tonnage === '2.0 Ton' || tonnage === '2.5 Ton' || tonnage === '3.0 Ton') {
      if (lineLength === 'Over 80 ft') {
        return 'Travel exceeds 80 ft: Increased to 7/8" x 3/8" copper per PDF specs.';
      }
      return 'Standard run (<80 ft): 3/4" x 3/8" copper per PDF specs.';
    } else {
      if (lineLength === 'Over 80 ft') {
        return 'Travel exceeds 80 ft: Increased to 1" x 3/8" copper per PDF specs.';
      }
      return 'Standard run (<80 ft): 7/8" x 3/8" copper per PDF specs.';
    }
  };

  const handleProcessDeposit = (e) => {
    e.preventDefault();
    // Generate sample batch number and fulfillment date
    const randomBatch = `NT-2026-B0${Math.floor(Math.random() * 89 + 10)}`;
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 28);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    setBatchNumber(randomBatch);
    setEstimatedDelivery(futureDate.toLocaleDateString('en-US', options));
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-[#121315] text-slate-100 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===================== HERO / HEADER BANNER ===================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1B1D20] via-[#22252A] to-[#1B1D20] border border-white/10 p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4A77E]">
              no-techhvac/buyers.com
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Buyers Portal
            </h1>
            <p className="text-base sm:text-lg text-[#C2B59B] font-semibold">
              Select. Customize. Reserve.
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              Configure your No-Tech HVAC system with real-time compatibility checks, transparent pricing breakdown, and a $200 refundable deposit to lock in your production queue.
            </p>
          </div>

          {/* Stepper Progress Badges */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              { num: 1, title: '1. Customize System' },
              { num: 2, title: '2. Check Compatibility' },
              { num: 3, title: '3. Pay $200 Fee' },
              { num: 4, title: '4. Get Confirmation' }
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => currentStep > s.num && setCurrentStep(s.num)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                  currentStep === s.num
                    ? 'bg-[#A4A77E] text-black font-bold border-[#A4A77E] shadow-md'
                    : currentStep > s.num
                    ? 'bg-[#A4A77E]/20 text-[#A4A77E] border-[#A4A77E]/40 font-semibold'
                    : 'bg-white/5 text-slate-400 border-white/5'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === s.num ? 'bg-black text-white' : currentStep > s.num ? 'bg-[#A4A77E] text-black' : 'bg-white/10 text-white'
                }`}>
                  {currentStep > s.num ? '✓' : s.num}
                </span>
                <span className="truncate">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== STEP 1: SYSTEM SELECTION & CUSTOMIZATION ===================== */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Selection Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Tonnage & Air Handler Card */}
              <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#A4A77E]" />
                    <h2 className="text-base font-bold text-white">System Selection Tool</h2>
                  </div>
                  <span className="text-xs text-[#C2B59B]">Real-Time Sizing</span>
                </div>

                {/* HVAC Tonnage Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    HVAC Tonnage Rating:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['2.0 Ton', '2.5 Ton', '3.0 Ton', '3.5 Ton', '4.0 Ton', '5.0 Ton'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTonnage(t)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                          tonnage === t
                            ? 'bg-[#A4A77E] text-black border-[#A4A77E] shadow-md ring-1 ring-[#A4A77E]'
                            : 'bg-black/30 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Recommended for homes between 1,400 sq.ft to 3,600 sq.ft depending on regional cooling load.
                  </p>
                </div>

                {/* Air Handler Configuration: Upflow, Downflow, Horizontal */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Air Handler Configuration:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Upflow', 'Downflow', 'Horizontal'].map((cfg) => (
                      <button
                        key={cfg}
                        onClick={() => setConfiguration(cfg)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                          configuration === cfg
                            ? 'bg-[#C2B59B] text-black border-[#C2B59B] shadow-md'
                            : 'bg-black/30 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="block text-sm mb-0.5">{cfg}</span>
                        <span className="text-[10px] font-normal opacity-75">
                          {cfg === 'Upflow' ? 'Basement / Closet' : cfg === 'Downflow' ? 'Attic / Rooftop' : 'Crawlspace / Ceiling'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Front-Panel Color Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Front-Panel Powder-Coat Color:
                    </label>
                    <span className="text-xs text-[#A4A77E] font-medium">
                      {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 py-2">
                    {COLOR_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.id}
                        onClick={() => setSelectedColor(swatch.hex)}
                        className={`w-9 h-9 rounded-full transition-transform hover:scale-110 shadow-md ${
                          selectedColor === swatch.hex
                            ? 'ring-4 ring-[#A4A77E] ring-offset-2 ring-offset-[#181A1D] scale-105'
                            : 'hover:ring-2 hover:ring-white/30'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                        title={swatch.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Modular Compartments Customization Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Modular Compartment Specifications (4 Bays):
                  </label>
                  <div className="space-y-2 text-xs">
                    {COMPARTMENTS.map((c) => (
                      <div key={c.id} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white block">Bay 0{c.id}: {c.shortName}</span>
                          <span className="text-[11px] text-slate-400">{c.category} • {c.rfidTag}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#A4A77E]/20 text-[#A4A77E] text-[10px] font-semibold">
                          Included
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Pricing Breakdown Card */}
              <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#C2B59B]" />
                    <h3 className="text-base font-bold text-white">Pricing Breakdown</h3>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-slate-400">
                    Demo Transparent Values
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between py-1">
                    <span>Base Modular Chassis ({tonnage}):</span>
                    <span className="font-mono text-white font-semibold">${currentBasePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>4 Modular Compartments (Compressor, ECM Blower, Coil, RFID Hub):</span>
                    <span className="font-mono text-white font-semibold">${modularCompPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Certified Local Mechanical Installation (Demo Estimate):</span>
                    <span className="font-mono text-white font-semibold">${installationDemoEstimate.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                    <span>Total Estimated Package (Demo):</span>
                    <span className="font-mono text-[#A4A77E] text-base">${totalDemoPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#A4A77E]/10 border border-[#A4A77E]/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#A4A77E] font-bold block">Demo Financing Available</span>
                    <span className="text-slate-300 text-[11px]">As low as ${monthlyDemo}/mo for 48 months at 0% APR</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#A4A77E] text-black font-bold text-[10px]">
                    Pre-Qualify
                  </span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-sm shadow-lg transition-all"
                  >
                    <span>Proceed to Compatibility Check →</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Live Visualizer & Summary Column */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              <HvacModularVisualizer
                activeColor={selectedColor}
                showLabels={true}
              />

              {/* Live Configuration Summary Badge */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1C1E22] to-[#151719] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2B59B]">
                  Selected Configuration Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Tonnage</span>
                    <span className="font-bold text-white">{tonnage}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Airflow Layout</span>
                    <span className="font-bold text-white">{configuration}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Finish Color</span>
                    <span className="font-bold text-[#A4A77E] truncate block">
                      {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Reservation Deposit</span>
                    <span className="font-bold text-emerald-400 font-mono">$200 Refundable</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3">
                  <LocalMechanicalLogo className="h-8" showText={false} />
                  <p className="text-[11px] text-slate-300">
                    Pre-certified for Local Mechanical fast-track residential permitting.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ===================== STEP 2: COMPATIBILITY CHECKER ===================== */}
        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#181A1D] border border-white/10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold font-serif text-white">System Compatibility Checker</h2>
                  <p className="text-xs text-slate-400">Verifying code clearance, electrical feed, and refrigerant piping rules</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#A4A77E]/20 text-[#A4A77E] border border-[#A4A77E]/30 text-xs font-semibold">
                  Step 2 of 4
                </span>
              </div>

              {/* PDF Compatibility Rules Form */}
              <div className="space-y-4">
                
                {/* 1. Confined Space Code Clearance */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">
                      1. Confined Space & Code Clearance:
                    </label>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Code Compliant
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Does the mechanical closet or attic have code clearance (minimum 30" service front clearance)?
                  </p>
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => setClearanceConfirmed(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                        clearanceConfirmed ? 'bg-[#A4A77E] text-black border-[#A4A77E]' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      Yes, Cleared for Code
                    </button>
                    <button
                      onClick={() => setClearanceConfirmed(false)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                        !clearanceConfirmed ? 'bg-amber-600 text-white border-amber-600' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      Requires Site Survey
                    </button>
                  </div>
                </div>

                {/* 2. Fuel & Auxiliary Heating */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    2. Fuel Source Specification:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Natural Gas', 'Propane', 'All-Electric Inverter'].map((fuel) => (
                      <button
                        key={fuel}
                        onClick={() => setFuelSource(fuel)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border text-center ${
                          fuelSource === fuel ? 'bg-[#C2B59B] text-black border-[#C2B59B]' : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Voltage Specifications */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    3. Voltage Feed Specification:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['208/230V Single-Phase', '208V 3-Phase Commercial'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setVoltage(v)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border text-center ${
                          voltage === v ? 'bg-[#A4A77E] text-black border-[#A4A77E]' : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Refrigerant Line Travel Length (PDF Page 4 Rules) */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">
                    4. Line Set Travel Distance (Condenser to Evaporator):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Under 80 ft', 'Over 80 ft'].map((len) => (
                      <button
                        key={len}
                        onClick={() => setLineLength(len)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border text-center ${
                          lineLength === len ? 'bg-[#C2B59B] text-black border-[#C2B59B]' : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                  {/* Automated PDF Line Sizing Rule Notice */}
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-[#A4A77E] flex items-start gap-2 mt-2">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span><strong>Line Sizing Rule (PDF):</strong> {getLineSetNotice()}</span>
                  </div>
                </div>

                {/* 5. Structural Foundation Requirement (PDF Page 3) */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider">
                      5. Sub-Base Structural Support:
                    </label>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Will the platform utilize <strong>2'x6' wood or equivalent to steel</strong> as required before installing a No-Tech HVAC system?
                  </p>
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => setStructuralCheck(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                        structuralCheck ? 'bg-[#A4A77E] text-black border-[#A4A77E]' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      Yes (2'x6' wood or steel)
                    </button>
                    <button
                      onClick={() => setStructuralCheck(false)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                        !structuralCheck ? 'bg-amber-600 text-white border-amber-600' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      Sub-Base Needs Reinforcement
                    </button>
                  </div>
                </div>

              </div>

              {/* Status Outcome Banner */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Compatibility Check Passed
                    </h4>
                    <p className="text-xs text-slate-300">
                      System {tonnage} with {configuration} layout is fully matched for your residence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold"
                >
                  ← Back to Customizer
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-sm shadow-lg transition-all"
                >
                  <span>Proceed to $200 Reservation →</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ===================== STEP 3: DEPOSIT PROCESSING ($200 FEE) ===================== */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#181A1D] border border-white/10 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold font-serif text-white">Deposit Processing</h2>
                  <p className="text-xs text-slate-400">Lock in your production batch & schedule priority</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Reservation Fee</span>
                  <span className="text-lg font-bold text-[#A4A77E] font-mono">$200.00</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Model:</span>
                  <span className="font-semibold text-white">No-Tech Modular {tonnage} ({configuration})</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Architectural Finish:</span>
                  <span className="font-semibold text-[#A4A77E]">{COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Deposit Status:</span>
                  <span className="font-semibold text-emerald-400">100% Refundable prior to dispatch</span>
                </div>
              </div>

              {/* Demo Contact & Payment Form */}
              <form onSubmit={handleProcessDeposit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Full Name:</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2 text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Email Address:</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2 text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Phone Number:</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2 text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Installation Property Address:</label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2 text-white outline-none"
                    />
                  </div>
                </div>

                {/* Simulated Payment Card fields (frontend only) */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#C2B59B]" /> Demo Card Checkout
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">256-Bit SSL Demo Sandbox</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      readOnly
                      value="•••• •••• •••• 4242"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 font-mono text-slate-300"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        readOnly
                        value="12/28"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 font-mono text-slate-300 text-center"
                      />
                      <input
                        type="text"
                        readOnly
                        value="CVC: 882"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 font-mono text-slate-300 text-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-sm shadow-xl transition-all"
                  >
                    <span>Pay $200 Reservation Fee & Confirm →</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ===================== STEP 4: FINALIZATION & CONFIRMATION ===================== */}
        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95">
            
            {/* Top Success Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#18201A] via-[#1C251F] to-[#18201A] border border-emerald-500/40 shadow-2xl text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Reservation Confirmed!
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Your $200 reservation deposit has been recorded. Your custom No-Tech modular system is queued in our production pipeline.
              </p>

              {/* Batch Number & Date Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <div className="px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs">
                  <span className="text-slate-400 block text-[10px]">Production Batch Number</span>
                  <span className="font-mono text-base font-bold text-[#A4A77E]">{batchNumber}</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs">
                  <span className="text-slate-400 block text-[10px]">Estimated Fulfillment Date</span>
                  <span className="font-mono text-base font-bold text-[#C2B59B]">{estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Production Progress Dashboard */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#A4A77E]" /> Automated Production Tracking Dashboard
                </h3>
                <span className="text-xs text-emerald-400 font-semibold">Status: Active Queue</span>
              </div>

              {/* Progress Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                {[
                  { step: '1. Deposit Secured', desc: 'Paid $200', active: true, done: true },
                  { step: '2. Batch Assigned', desc: batchNumber, active: true, done: true },
                  { step: '3. Bay Assembly', desc: '4 Modules', active: true, done: false },
                  { step: '4. Local Mech. QC', desc: 'RFID Commissioning', active: false, done: false },
                  { step: '5. Dispatch & Install', desc: 'Certified Tech', active: false, done: false }
                ].map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      m.done
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : m.active
                        ? 'bg-[#A4A77E]/10 border-[#A4A77E]/40 text-[#A4A77E]'
                        : 'bg-white/5 border-white/5 text-slate-500'
                    }`}
                  >
                    <div className="font-bold">{m.step}</div>
                    <div className="text-[10px] mt-0.5 opacity-80">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Preview Card (PDF Requirement) */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#C2B59B]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Confirmation Email Preview
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Sent to: {customerEmail}</span>
              </div>

              <div className="p-5 rounded-xl bg-black/60 border border-white/10 space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <NoTechLogo className="h-8" />
                  <span className="text-[10px] text-slate-400">Order Ref: #{batchNumber}</span>
                </div>
                <p>Dear {customerName},</p>
                <p>
                  Thank you for securing your No-Tech Modular HVAC System ({tonnage}, {configuration}).
                  Your $200 refundable reservation fee has been processed and logged under batch <strong>{batchNumber}</strong>.
                </p>
                <div className="p-3 bg-white/5 rounded-lg space-y-1 text-[11px]">
                  <div>• Unit Configuration: {tonnage} - {configuration}</div>
                  <div>• Front-Panel Finish: {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}</div>
                  <div>• Service Address: {customerAddress}</div>
                  <div>• Est. Delivery & Installation: {estimatedDelivery}</div>
                  <div>• Quality Enforcement Authority: Local Mechanical</div>
                </div>
                <p>
                  Next step: Choose your preferred installation date and certified 3-hour time slot on our scheduling portal.
                </p>
              </div>
            </div>

            {/* Action Buttons to Schedule */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold"
              >
                Configure Another Unit
              </button>
              <Link
                to="/reservations"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-sm shadow-xl transition-all"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Select Installation Date & Time Slots →</span>
              </Link>
            </div>

          </div>
        )}

        {/* ===================== BOTTOM CTA BANNER ===================== */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1E2125] via-[#24272C] to-[#1E2125] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif text-white">
              Reserve Your No-Tech HVAC System Today
            </h3>
            <p className="text-xs text-slate-400">
              Secure your system with a $200 reservation fee. Real-time availability, RFID tracking, and Local Mechanical compliance.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-xs shadow-md transition-all"
          >
            Reserve Now →
          </button>
        </div>

      </div>
    </div>
  );
}
