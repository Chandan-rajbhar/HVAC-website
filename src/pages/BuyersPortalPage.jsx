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
import { useTheme } from '../context/ThemeContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function BuyersPortalPage() {
  const { isDark } = useTheme();
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
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-center">
        {/* Full-Width Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/buyers-hero-bg.jpg"
            alt="No-Tech Systems Modular HVAC Unit"
            className="w-full h-full object-cover object-center"
          />
          {/* Clean uniform dark overlay matching reference banner for crisp centered text readability */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Centered Hero Content Container */}
        <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 flex flex-col items-center">

            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-md">
                Buyers Portal
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-sm">
                Select. Customize. Reserve.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl mx-auto drop-shadow-sm">
              Configure your No-Tech HVAC system with real-time compatibility and pricing.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  const el = document.getElementById('buyers-selection-area');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Start Selection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setCurrentStep(2);
                  const el = document.getElementById('buyers-selection-area');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs border border-white/25 transition-all shadow-sm cursor-pointer"
              >
                <span>Check Compatibility</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <div id="buyers-selection-area" className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* Stepper Progress Badges (Moved out of Hero Section) */}
        <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
            {[
              { num: 1, title: '1. Customize System' },
              { num: 2, title: '2. Check Compatibility' },
              { num: 3, title: '3. Pay $200 Fee' },
              { num: 4, title: '4. Get Confirmation' }
            ].map((s) => (
              <div
                key={s.num}
                onClick={() => currentStep > s.num && setCurrentStep(s.num)}
                className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${currentStep === s.num
                  ? 'bg-[#7E8056] text-white font-bold border-[#7E8056] shadow-md'
                  : currentStep > s.num
                    ? 'bg-[#7E8056]/15 text-[#7E8056] dark:text-[#C2B59B] border-[#7E8056]/30 font-semibold hover:bg-[#7E8056]/25'
                    : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5'
                  }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${currentStep === s.num ? 'bg-white text-slate-900' : currentStep > s.num ? 'bg-[#7E8056] text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
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
          <div className="space-y-6">

            {/* Top Wide Card: System Selection Tool */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 shadow-md">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">System Selection Tool</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Select capacity, airflow orientation, and exterior finish</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                {/* Left Controls */}
                <div className="lg:col-span-5 space-y-5">

                  {/* HVAC Tonnage */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                      HVAC Tonnage:
                    </label>
                    <Select value={tonnage} onValueChange={setTonnage}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        {['2.0 Ton', '2.5 Ton', '3.0 Ton', '3.5 Ton', '4.0 Ton', '5.0 Ton'].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t} Capacity
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Configuration */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                      Configuration:
                    </label>
                    <Select value={configuration} onValueChange={setConfiguration}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select configuration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Upflow">Upflow (Basement / Closet)</SelectItem>
                        <SelectItem value="Downflow">Downflow (Attic / Rooftop)</SelectItem>
                        <SelectItem value="Horizontal">Horizontal (Crawlspace / Ceiling)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Front Panel Color */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Front Panel Color:
                      </label>
                      <span className="text-xs text-[#7E8056] dark:text-[#C2B59B] font-semibold">
                        {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {COLOR_SWATCHES.map((swatch) => (
                        <button
                          key={swatch.id}
                          onClick={() => setSelectedColor(swatch.hex)}
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all hover:scale-110 shadow-sm cursor-pointer relative ${selectedColor === swatch.hex
                            ? 'ring-2 ring-[#7E8056] dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#181A1D] scale-110'
                            : 'hover:ring-2 hover:ring-slate-300 dark:hover:ring-white/30'
                            }`}
                          style={{ backgroundColor: swatch.hex }}
                          title={swatch.name}
                          aria-label={`Select ${swatch.name}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Visual: Full-Width High-Res HVAC Unit Preview */}
                <div className="lg:col-span-7 w-full">
                  <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10 aspect-[16/9] shadow-lg group">
                    <img
                      src="/images/buyers-hero-unit.jpg"
                      alt="No-Tech HVAC System Unit Preview"
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                    {/* Real-time exterior color finish tint */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color opacity-35 transition-colors duration-300"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Top-left Active Color Finish Pill */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-[11px] font-semibold text-white flex items-center gap-2 pointer-events-none shadow-md">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/60"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <span>{COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}</span>
                    </div>

                    {/* Bottom-right Spec Pill */}
                    <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/75 text-xs text-[#E8DEC8] border border-white/15 backdrop-blur-md font-mono font-semibold pointer-events-none shadow-md">
                      {tonnage} • {configuration}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom 2 Side-by-Side Cards: Pricing Breakdown & Reservation Process */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1: Pricing Breakdown */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Pricing Breakdown</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 font-mono">Est. USD</span>
                </div>

                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                    <span>Base Unit</span>
                    <span className="font-mono text-slate-900 dark:text-white font-semibold">${currentBasePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                    <span>Modular Components</span>
                    <span className="font-mono text-slate-900 dark:text-white font-semibold">${modularCompPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                    <span>Installation</span>
                    <span className="font-mono text-slate-900 dark:text-white font-semibold">${installationDemoEstimate.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span>Total (Demo)</span>
                    <span className="font-mono text-[#7E8056] dark:text-[#A4A77E] text-base font-bold">${totalDemoPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-sm transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Check Compatibility →</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Reservation Process */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Reservation Process</h3>
                  <span className="text-[11px] text-[#7E8056] dark:text-[#A4A77E] font-medium">Simple 4-Step</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#7E8056] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">1</span>
                    <span className="text-slate-800 dark:text-white font-medium">Customize Your System</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#7E8056] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">2</span>
                    <span className="text-slate-800 dark:text-white font-medium">Check Compatibility</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#7E8056] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">3</span>
                    <span className="text-slate-800 dark:text-white font-medium">Pay $200 Reservation Fee</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#7E8056] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">4</span>
                    <span className="text-slate-800 dark:text-white font-medium">Get Confirmation</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-white/15 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Start Process →</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================== STEP 2: COMPATIBILITY CHECKER ===================== */}
        {currentStep === 2 && (
          <div className="w-full space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 space-y-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">System Compatibility Checker</h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Verifying code clearance, electrical feed, and refrigerant piping rules</p>
                  </div>
                </div>
                <span className="inline-flex items-center self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#7E8056]/15 text-[#7E8056] dark:text-[#C2B59B] border border-[#7E8056]/30 text-xs font-bold">
                  Step 2 of 4
                </span>
              </div>

              {/* PDF Compatibility Rules Form in Responsive 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* 1. Confined Space Code Clearance */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      1. Confined Space & Code Clearance:
                    </label>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Code Compliant
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Does the mechanical closet or attic have code clearance (minimum 30" service front clearance)?
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => setClearanceConfirmed(true)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer active:scale-95 ${clearanceConfirmed
                        ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-sm'
                        : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#7E8056]/50'
                        }`}
                    >
                      Yes, Cleared for Code
                    </button>
                    <button
                      onClick={() => setClearanceConfirmed(false)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer active:scale-95 ${!clearanceConfirmed
                        ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-sm'
                        : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#7E8056]/50'
                        }`}
                    >
                      Requires Site Survey
                    </button>
                  </div>
                </div>

                {/* 5. Structural Foundation Requirement (PDF Page 3) */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      5. Sub-Base Structural Support:
                    </label>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Will the platform utilize <strong>2'x6' wood or equivalent to steel</strong> as required before installing a No-Tech HVAC system?
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => setStructuralCheck(true)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer active:scale-95 ${structuralCheck
                        ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-sm'
                        : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#7E8056]/50'
                        }`}
                    >
                      Yes (2'x6' wood or steel)
                    </button>
                    <button
                      onClick={() => setStructuralCheck(false)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer active:scale-95 ${!structuralCheck
                        ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-sm'
                        : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#7E8056]/50'
                        }`}
                    >
                      Sub-Base Needs Reinforcement
                    </button>
                  </div>
                </div>

                {/* 2. Fuel & Auxiliary Heating */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
                  <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    2. Fuel Source Specification:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Natural Gas', 'Propane', 'All-Electric Inverter'].map((fuel) => (
                      <button
                        key={fuel}
                        onClick={() => setFuelSource(fuel)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border text-center transition-all cursor-pointer active:scale-95 ${fuelSource === fuel
                          ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-sm'
                          : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#7E8056]/50'
                          }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Voltage Specifications */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
                  <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    3. Voltage Feed Specification:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['208/230V Single-Phase', '208V 3-Phase Commercial'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setVoltage(v)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border text-center transition-all cursor-pointer active:scale-95 ${voltage === v
                          ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-sm'
                          : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#7E8056]/50'
                          }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Refrigerant Line Travel Length (PDF Page 4 Rules) - Full Width Row */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
                  <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    4. Line Set Travel Distance (Condenser to Evaporator):
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {['Under 80 ft', 'Over 80 ft'].map((len) => (
                      <button
                        key={len}
                        onClick={() => setLineLength(len)}
                        className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold border text-center transition-all cursor-pointer active:scale-95 ${lineLength === len
                          ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-sm'
                          : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#7E8056]/50'
                          }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                  {/* Automated PDF Line Sizing Rule Notice */}
                  <div className="p-3.5 rounded-xl bg-[#7E8056]/10 dark:bg-white/5 border border-[#7E8056]/25 dark:border-white/10 text-xs text-[#555845] dark:text-[#C2B59B] flex items-start gap-2.5 mt-2">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#7E8056] dark:text-[#A4A77E]" />
                    <span><strong>Line Sizing Rule (PDF):</strong> {getLineSetNotice()}</span>
                  </div>
                </div>

              </div>

              {/* Status Outcome Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Compatibility Check Passed
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      System {tonnage} with {configuration} layout is fully matched for your residence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  ← Back to Customizer
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Proceed to $200 Reservation →</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ===================== STEP 3: DEPOSIT PROCESSING ($200 FEE) ===================== */}
        {currentStep === 3 && (
          <div className="w-full space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 space-y-6 shadow-md">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">Deposit Processing</h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Lock in your production batch & schedule priority</p>
                  </div>
                </div>
                <div className="sm:text-right px-4 py-2 rounded-xl bg-[#7E8056]/10 border border-[#7E8056]/25">
                  <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 block font-semibold">Reservation Fee</span>
                  <span className="text-xl font-bold text-[#7E8056] dark:text-[#C2B59B] font-mono">$200.00</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left: Customer & Payment Form */}
                <form onSubmit={handleProcessDeposit} className="lg:col-span-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block">Full Name:</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block">Email Address:</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block">Phone Number:</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-700 dark:text-slate-300 font-semibold block">Installation Property Address:</label>
                      <input
                        type="text"
                        required
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Simulated Payment Card fields (frontend only) */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/35 border border-slate-200 dark:border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" /> Demo Card Checkout
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">256-Bit SSL Demo Sandbox</span>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <input
                        type="text"
                        readOnly
                        value="•••• •••• •••• 4242"
                        className="w-full bg-white dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 font-mono text-slate-800 dark:text-slate-200"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          readOnly
                          value="12/28"
                          className="w-full bg-white dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 font-mono text-slate-800 dark:text-slate-200 text-center"
                        />
                        <input
                          type="text"
                          readOnly
                          value="CVC: 882"
                          className="w-full bg-white dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 font-mono text-slate-800 dark:text-slate-200 text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>Pay $200 Reservation Fee & Confirm →</span>
                    </button>
                  </div>
                </form>

                {/* Right: Selected System Summary Card */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-200 dark:border-white/10">
                      Order Configuration Summary
                    </h3>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                        <span>Selected Model:</span>
                        <span className="font-bold text-slate-900 dark:text-white text-right">No-Tech Modular {tonnage} ({configuration})</span>
                      </div>
                      <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                        <span>Architectural Finish:</span>
                        <span className="font-semibold text-[#7E8056] dark:text-[#C2B59B] flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full border border-slate-300 dark:border-white/30 inline-block" style={{ backgroundColor: selectedColor }} />
                          {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                        <span>Fuel & Voltage:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{fuelSource} • {voltage}</span>
                      </div>
                      <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-white/10">
                        <span>Deposit Status:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Refundable prior to dispatch</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ===================== STEP 4: FINALIZATION & CONFIRMATION ===================== */}
        {currentStep === 4 && (
          <div className="w-full space-y-6 animate-in fade-in zoom-in-95">

            {/* Top Success Banner */}
            <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-[#18201A] dark:via-[#1C251F] dark:to-[#18201A] border border-emerald-200 dark:border-emerald-500/40 shadow-md text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                Reservation Confirmed!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                Your $200 reservation deposit has been recorded. Your custom No-Tech modular system is queued in our production pipeline.
              </p>

              {/* Batch Number & Date Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <div className="px-5 py-3 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs shadow-sm">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">Production Batch Number</span>
                  <span className="font-mono text-base font-bold text-[#7E8056] dark:text-[#A4A77E]">{batchNumber}</span>
                </div>
                <div className="px-5 py-3 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs shadow-sm">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">Estimated Fulfillment Date</span>
                  <span className="font-mono text-base font-bold text-slate-900 dark:text-[#C2B59B]">{estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Production Progress Dashboard */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 space-y-5 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" /> Automated Production Tracking Dashboard
                </h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Status: Active Queue</span>
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
                    className={`p-3.5 rounded-xl border ${m.done
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : m.active
                        ? 'bg-[#7E8056]/10 border-[#7E8056]/40 text-[#7E8056] dark:text-[#C2B59B]'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500'
                      }`}
                  >
                    <div className="font-bold">{m.step}</div>
                    <div className="text-[11px] mt-0.5 opacity-85">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Preview Card (PDF Requirement) */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 space-y-4 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#7E8056] dark:text-[#C2B59B]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Confirmation Email Preview
                  </h3>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Sent to: {customerEmail}</span>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 space-y-4 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <NoTechLogo className="h-8" light={!isDark} />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Order Ref: #{batchNumber}</span>
                </div>
                <p>Dear {customerName},</p>
                <p>
                  Thank you for securing your No-Tech Modular HVAC System ({tonnage}, {configuration}).
                  Your $200 refundable reservation fee has been processed and logged under batch <strong>{batchNumber}</strong>.
                </p>
                <div className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl space-y-1.5 text-xs">
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
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 active:scale-95 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                Configure Another Unit
              </button>
              <Link
                to="/reservations"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-white" />
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
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-[#A4A77E] hover:bg-[#8e9167] active:scale-95 text-black font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            Reserve Now →
          </button>
        </div>

      </div>
    </div>
  );
}
