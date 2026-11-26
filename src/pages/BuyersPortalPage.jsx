import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Download,
  Loader2,
  Lock
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
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'processing' | 'success'

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
    if (paymentStatus !== 'idle') return;
    setPaymentStatus('processing');

    setTimeout(() => {
      // Generate sample batch number and fulfillment date
      const randomBatch = `NT-2026-B0${Math.floor(Math.random() * 89 + 10)}`;
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 28);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      setBatchNumber(randomBatch);
      setEstimatedDelivery(futureDate.toLocaleDateString('en-US', options));
      setPaymentStatus('success');

      setTimeout(() => {
        setPaymentStatus('idle');
        setCurrentStep(4);
      }, 1300);
    }, 1500);
  };

  const isStep1Filled = Boolean(tonnage && configuration && selectedColor);
  const isStep2Filled = Boolean(fuelSource && voltage && lineLength);
  const isStep3Filled = Boolean(
    customerName.trim() &&
    customerEmail.trim() &&
    customerPhone.trim() &&
    customerAddress.trim()
  );

  const canNavigateToStep = (targetStep) => {
    if (targetStep <= currentStep) return true;
    if (targetStep === 2) return isStep1Filled;
    if (targetStep === 3) return isStep1Filled && isStep2Filled;
    if (targetStep === 4) return isStep1Filled && isStep2Filled && isStep3Filled;
    return false;
  };

  const handleStepClick = (targetStep) => {
    if (!canNavigateToStep(targetStep)) return;
    if (targetStep === 4 && !batchNumber) {
      const randomBatch = `NT-2026-B0${Math.floor(Math.random() * 89 + 10)}`;
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 28);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      setBatchNumber(randomBatch);
      setEstimatedDelivery(futureDate.toLocaleDateString('en-US', options));
    }
    setCurrentStep(targetStep);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 h-[400px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
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

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-md">
                Buyers Portal
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-sm">
                Select. Customize. Reserve.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl mx-auto drop-shadow-sm"
            >
              Configure your No-Tech HVAC system with real-time compatibility and pricing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 flex flex-wrap items-center justify-center gap-2.5"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <motion.div
        id="buyers-selection-area"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >

        {/* Stepper Progress Badges (Moved out of Hero Section) */}
        <div className="mb-6 w-full">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-[11px] w-full">
            {[
              { num: 1, title: '1. Customize System' },
              { num: 2, title: '2. Check Compatibility' },
              { num: 3, title: '3. Pay $200 Fee' },
              { num: 4, title: '4. Get Confirmation' }
            ].map((s, idx) => {
              const isClickable = canNavigateToStep(s.num);
              return (
              <React.Fragment key={s.num}>
                <div
                  onClick={() => handleStepClick(s.num)}
                  className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border transition-all ${currentStep === s.num
                    ? 'bg-[#7E8056] text-white font-bold border-[#7E8056] shadow-sm cursor-pointer'
                    : currentStep > s.num
                      ? 'bg-[#7E8056]/15 text-[#7E8056] dark:text-[#C2B59B] border-[#7E8056]/30 font-semibold hover:bg-[#7E8056]/25 cursor-pointer'
                      : isClickable
                        ? 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/15 hover:border-[#7E8056]/60 hover:bg-[#7E8056]/10 cursor-pointer'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-white/10 cursor-not-allowed opacity-60'
                    }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${currentStep === s.num ? 'bg-white text-slate-900' : currentStep > s.num ? 'bg-[#7E8056] text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}>
                    {currentStep > s.num ? '✓' : s.num}
                  </span>
                  <span className="whitespace-nowrap">{s.title}</span>
                </div>
                {idx < 3 && (
                  <div className="hidden sm:flex flex-1 items-center px-2" aria-hidden="true">
                    <div
                      className={`h-[2px] flex-1 rounded-full transition-colors ${currentStep > s.num
                        ? 'bg-[#7E8056]'
                        : 'bg-slate-300 dark:bg-white/20'
                        }`}
                    />
                    <ChevronRight
                      className={`w-4 h-4 -ml-2 flex-shrink-0 transition-colors ${currentStep > s.num
                        ? 'text-[#7E8056]'
                        : 'text-slate-400 dark:text-white/30'
                        }`}
                      strokeWidth={2.5}
                    />
                  </div>
                )}
              </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ===================== STEP 1: SYSTEM SELECTION & CUSTOMIZATION ===================== */}
        {currentStep === 1 && (
          <div className="space-y-6">

            {/* Top Wide Card: System Selection Tool & Pricing Breakdown */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">System Selection Tool</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Select capacity, airflow orientation, and exterior finish</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <span>{tonnage}</span>
                  <span className="text-slate-400">•</span>
                  <span>{configuration}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono font-bold text-[#7E8056] dark:text-[#A4A77E]">${totalDemoPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                {/* Left Column: System Configuration + Pricing Breakdown */}
                <div className="lg:col-span-6 flex flex-col justify-start gap-4">

                  {/* Configuration Controls */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* HVAC Tonnage */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                          HVAC Tonnage
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
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                          Configuration
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
                    </div>

                    {/* Front Panel Color */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          Front Panel Color
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
                            className={`w-7 h-7 rounded-full transition-all hover:scale-110 shadow-sm cursor-pointer relative ${selectedColor === swatch.hex
                              ? 'ring-2 ring-[#7E8056] dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#121315] scale-110'
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

                  {/* Pricing Breakdown Section (Inset Card) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Pricing Breakdown</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 font-mono">Est. USD</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex justify-between py-0.5">
                        <span>Base Unit</span>
                        <span className="font-mono text-slate-900 dark:text-white font-semibold">${currentBasePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-0.5">
                        <span>Modular Components</span>
                        <span className="font-mono text-slate-900 dark:text-white font-semibold">${modularCompPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-0.5">
                        <span>Installation</span>
                        <span className="font-mono text-slate-900 dark:text-white font-semibold">${installationDemoEstimate.toLocaleString()}</span>
                      </div>
                      <div className="pt-2.5 mt-1 border-t border-slate-200/80 dark:border-white/10 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
                        <span>Total</span>
                        <span className="font-mono text-[#7E8056] dark:text-[#A4A77E] text-base font-bold">${totalDemoPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: High-Res HVAC Unit Preview + Next Action Bar */}
                <div className="lg:col-span-6 w-full flex flex-col gap-4">
                  <div className="relative w-full h-[260px] sm:h-[305px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/15 shadow-lg group">
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

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Only <strong className="text-slate-700 dark:text-slate-200">$200</strong> refundable deposit required at Step 3.
                    </p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Next: Check Compatibility →</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ===================== STEP 2: COMPATIBILITY CHECKER ===================== */}
        {currentStep === 2 && (
          <div className="w-full">
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-4 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">System Compatibility Checker</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Verifying code clearance, electrical feed, and refrigerant piping rules</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <span>{tonnage}</span>
                  <span className="text-slate-400">•</span>
                  <span>{configuration}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-mono font-bold text-[#7E8056] dark:text-[#A4A77E]">${totalDemoPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Compact Single-Panel Checklist (5 uniform horizontal rows) */}
              <div className="rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 divide-y divide-slate-200/80 dark:divide-white/10">

                {/* 1. Confined Space Code Clearance */}
                <div className="px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        1. Confined Space & Code Clearance:
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Code Compliant
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Does the mechanical closet or attic have code clearance (minimum 30" service front clearance)?
                    </p>
                  </div>
                  <div className="w-full lg:w-[410px] grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 flex-shrink-0">
                    <button
                      onClick={() => setClearanceConfirmed(true)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${clearanceConfirmed
                        ? 'bg-[#7E8056] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      Yes, Cleared for Code
                    </button>
                    <button
                      onClick={() => setClearanceConfirmed(false)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${!clearanceConfirmed
                        ? 'bg-[#7E8056] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      Requires Site Survey
                    </button>
                  </div>
                </div>

                {/* 2. Fuel & Auxiliary Heating */}
                <div className="px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    2. Fuel Source Specification:
                  </span>
                  <div className="w-full lg:w-[410px] grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 flex-shrink-0">
                    {['Natural Gas', 'Propane', 'All-Electric Inverter'].map((fuel) => (
                      <button
                        key={fuel}
                        onClick={() => setFuelSource(fuel)}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center truncate ${fuelSource === fuel
                          ? 'bg-[#7E8056] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        title={fuel}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Voltage Specifications */}
                <div className="px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    3. Voltage Feed Specification:
                  </span>
                  <div className="w-full lg:w-[410px] grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 flex-shrink-0">
                    {['208/230V Single-Phase', '208V 3-Phase Commercial'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setVoltage(v)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${voltage === v
                          ? 'bg-[#7E8056] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Refrigerant Line Travel Length (PDF Page 4 Rules) */}
                <div className="px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                      4. Line Set Travel Distance (Condenser to Evaporator):
                    </span>
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-[#555845] dark:text-[#C2B59B]">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 text-[#7E8056] dark:text-[#A4A77E]" />
                      <span><strong>Line Sizing Rule (PDF):</strong> {getLineSetNotice()}</span>
                    </div>
                  </div>
                  <div className="w-full lg:w-[410px] grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 flex-shrink-0">
                    {['Under 80 ft', 'Over 80 ft'].map((len) => (
                      <button
                        key={len}
                        onClick={() => setLineLength(len)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${lineLength === len
                          ? 'bg-[#7E8056] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Structural Foundation Requirement (PDF Page 3) */}
                <div className="px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        5. Sub-Base Structural Support:
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Will the platform utilize <strong>2'x6' wood or equivalent to steel</strong> as required before installing a No-Tech HVAC system?
                    </p>
                  </div>
                  <div className="w-full lg:w-[410px] grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 flex-shrink-0">
                    <button
                      onClick={() => setStructuralCheck(true)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${structuralCheck
                        ? 'bg-[#7E8056] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      Yes (2'x6' wood or steel)
                    </button>
                    <button
                      onClick={() => setStructuralCheck(false)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer text-center ${!structuralCheck
                        ? 'bg-[#7E8056] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      Sub-Base Needs Reinforcement
                    </button>
                  </div>
                </div>

              </div>

              {/* Status Outcome Banner */}
              <div className="px-4 py-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    System Match Confirmed
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span>Your</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-500/25">
                      {tonnage}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-500/25">
                      {configuration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-500/25">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 dark:border-white/40 flex-shrink-0"
                        style={{ backgroundColor: selectedColor }}
                      />
                      {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}
                    </span>
                    <span>system</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-600/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-mono font-bold border border-emerald-500/25">
                      ${totalDemoPrice.toLocaleString()} Est. Total
                    </span>
                    <span>is verified and ready for reservation.</span>
                  </p>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  ← Back to Customizer
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Proceed to $200 Reservation →</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ===================== STEP 3: DEPOSIT PROCESSING ($200 FEE) ===================== */}
        {currentStep === 3 && (
          <div className="w-full">
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-5 shadow-md">

              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">Deposit Processing</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Lock in your production batch & schedule priority</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#7E8056]/10 border border-[#7E8056]/25">
                  <span className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold">Reservation Fee</span>
                  <span className="text-base font-bold text-[#7E8056] dark:text-[#C2B59B] font-mono">$200.00</span>
                </div>
              </div>

              <form onSubmit={handleProcessDeposit} className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                  {/* Left: Customer & Payment Form */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">Full Name:</label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">Email Address:</label>
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">Phone Number:</label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">Installation Property Address:</label>
                        <input
                          type="text"
                          required
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/15 focus:border-[#7E8056] focus:ring-2 focus:ring-[#7E8056]/20 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Simulated Payment Card fields (frontend only) */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <CreditCard className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#C2B59B]" /> Demo Card Checkout
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 font-mono">256-Bit SSL Demo Sandbox</span>
                      </div>

                      <div className="grid grid-cols-12 gap-2.5 text-xs">
                        <input
                          type="text"
                          readOnly
                          value="•••• •••• •••• 4242"
                          className="col-span-12 sm:col-span-6 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2 font-mono text-slate-800 dark:text-slate-200"
                        />
                        <input
                          type="text"
                          readOnly
                          value="12/28"
                          className="col-span-6 sm:col-span-3 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 font-mono text-slate-800 dark:text-slate-200 text-center"
                        />
                        <input
                          type="text"
                          readOnly
                          value="CVC: 882"
                          className="col-span-6 sm:col-span-3 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 font-mono text-slate-800 dark:text-slate-200 text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Selected System Summary Card */}
                  <div className="lg:col-span-5">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3">
                      <h3 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2.5 border-b border-slate-200/80 dark:border-white/10">
                        Order Configuration Summary
                      </h3>
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                          <span>Selected Model:</span>
                          <span className="font-bold text-slate-900 dark:text-white text-right">No-Tech Modular {tonnage} ({configuration})</span>
                        </div>
                        <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                          <span>Architectural Finish:</span>
                          <span className="font-semibold text-[#7E8056] dark:text-[#C2B59B] flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-white/30 inline-block" style={{ backgroundColor: selectedColor }} />
                            {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                          <span>Fuel & Voltage:</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{fuelSource} • {voltage}</span>
                        </div>
                        <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300">
                          <span>Estimated Total:</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">${totalDemoPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between gap-2 text-slate-600 dark:text-slate-300 pt-2.5 border-t border-slate-200/80 dark:border-white/10">
                          <span>Deposit Status:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-right">100% Refundable prior to dispatch</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Navigation Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={paymentStatus !== 'idle'}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#7E8056] hover:bg-[#6e7049] disabled:opacity-70 disabled:cursor-wait active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {paymentStatus !== 'idle' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{paymentStatus === 'success' ? 'Payment Confirmed!' : 'Processing $200.00...'}</span>
                      </>
                    ) : (
                      <span>Pay $200 Reservation Fee & Confirm →</span>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ===================== STEP 4: FINALIZATION & CONFIRMATION ===================== */}
        {currentStep === 4 && (
          <div className="w-full animate-in fade-in zoom-in-95">
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-5 shadow-md">

              {/* Top Success Banner (Anchored inside Step 4 Card) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-emerald-50/40 to-emerald-50/90 dark:from-emerald-500/10 dark:via-emerald-500/[0.04] dark:to-emerald-500/10 border border-emerald-200/90 dark:border-emerald-500/30">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">
                        Reservation Confirmed!
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                        Your $200 reservation deposit has been recorded. Your custom No-Tech modular system is queued in our production pipeline.
                      </p>
                    </div>
                  </div>

                  {/* Batch Number & Date Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-shrink-0">
                    <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200/90 dark:border-white/15 shadow-sm">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Production Batch Number</span>
                      <span className="font-mono text-sm font-bold text-[#7E8056] dark:text-[#A4A77E]">{batchNumber}</span>
                    </div>
                    <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-black/40 border border-slate-200/90 dark:border-white/15 shadow-sm">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Estimated Fulfillment Date</span>
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-[#C2B59B]">{estimatedDelivery}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Progress Dashboard */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" /> Automated Production Tracking Dashboard
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Status: Active Queue
                  </span>
                </div>

                {/* Progress Milestones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
                  {[
                    { step: '1. Deposit Secured', desc: 'Paid $200', active: true, done: true },
                    { step: '2. Batch Assigned', desc: batchNumber, active: true, done: true },
                    { step: '3. Bay Assembly', desc: '4 Modules', active: true, done: false },
                    { step: '4. Local Mech. QC', desc: 'RFID Commissioning', active: false, done: false },
                    { step: '5. Dispatch & Install', desc: 'Certified Tech', active: false, done: false }
                  ].map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col justify-between gap-1 ${m.done
                        ? 'bg-emerald-50/80 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : m.active
                          ? 'bg-[#7E8056]/10 border-[#7E8056]/40 text-[#6C6F4D] dark:text-[#C2B59B]'
                          : 'bg-slate-50/90 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400'
                        }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-bold text-[11px]">{m.step}</span>
                        {m.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : m.active ? (
                          <span className="w-2 h-2 rounded-full bg-[#7E8056] dark:bg-[#C2B59B] animate-pulse flex-shrink-0" />
                        ) : null}
                      </div>
                      <div className="text-[11px] opacity-85 font-mono">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Preview Section (PDF Requirement) */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Confirmation Email Preview
                    </h3>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 font-mono">
                    Sent to: {customerEmail}
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-2.5">
                    <img
                      src="/images/no-tech-hvac-logo.png"
                      alt="No-Tech HVAC"
                      className={`h-7 w-auto object-contain ${isDark ? 'invert hue-rotate-180 brightness-110' : ''}`}
                    />
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white dark:bg-black/40 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300">
                      Order Ref: #{batchNumber}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">Dear {customerName},</p>
                  <p>
                    Thank you for securing your No-Tech Modular HVAC System ({tonnage}, {configuration}).
                    Your $200 refundable reservation fee has been processed and logged under batch <strong className="font-mono text-slate-900 dark:text-white">{batchNumber}</strong>.
                  </p>
                  <div className="p-3.5 bg-white dark:bg-black/35 border border-slate-200/80 dark:border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-mono">
                    <div>• Unit Configuration: {tonnage} - {configuration}</div>
                    <div>• Front-Panel Finish: {COLOR_SWATCHES.find(c => c.hex === selectedColor)?.name}</div>
                    <div>• Service Address: {customerAddress}</div>
                    <div>• Est. Delivery & Installation: {estimatedDelivery}</div>
                    <div className="sm:col-span-2">• Quality Enforcement Authority: Local Mechanical</div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Next step: Choose your preferred installation date and certified 3-hour time slot on our scheduling portal.
                  </p>
                </div>
              </div>

              {/* Action Buttons to Schedule */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  Configure Another Unit
                </button>
                <Link
                  to="/reservations"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>Select Installation Date & Time Slots →</span>
                </Link>
              </div>

            </div>
          </div>
        )}

      </motion.div>

      {/* ===================== REALISTIC PAYMENT PROCESSING & SUCCESS MODAL ===================== */}
      {paymentStatus !== 'idle' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 p-6 sm:p-7 shadow-2xl text-center space-y-4">
            {paymentStatus === 'processing' ? (
              <>
                <div className="w-14 h-14 rounded-full bg-[#7E8056]/15 border border-[#7E8056]/30 flex items-center justify-center mx-auto">
                  <Loader2 className="w-7 h-7 text-[#7E8056] dark:text-[#A4A77E] animate-spin" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">
                    Processing $200.00 Deposit
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Authorizing card ending in <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">4242</span> and assigning your production batch number...
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center mx-auto animate-in zoom-in-95">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-serif text-emerald-700 dark:text-emerald-400">
                    Payment Successful!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Your <strong className="text-slate-900 dark:text-white">$200.00</strong> reservation deposit is confirmed. Batch{' '}
                    <span className="font-mono font-bold text-[#7E8056] dark:text-[#A4A77E]">{batchNumber}</span> assigned.
                  </p>
                </div>
              </>
            )}
            <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>256-Bit Encrypted Payment Gateway</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
