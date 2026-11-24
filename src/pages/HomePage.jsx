import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Play,
  ArrowRight,
  Layers,
  Zap,
  ShieldCheck,
  Leaf,
  ShoppingCart,
  TrendingUp,
  HardHat,
  Box,
  Palette,
  CheckCircle2,
  X,
  ExternalLink,
  Settings,
  Building2
} from 'lucide-react';
import HvacModularVisualizer from '../components/hvac/HvacModularVisualizer';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import NoTechLogo from '../components/common/NoTechLogo';
import { COLOR_SWATCHES, COMPARTMENTS } from '../data/mockData';

// Image 1 exact color palette swatches
const HOMEPAGE_SWATCHES = [
  { id: 'slate', name: 'Dark Slate Charcoal', hex: '#373C42' },
  { id: 'olive', name: 'Military Olive', hex: '#7E8056' },
  { id: 'tan', name: 'Army Tan', hex: '#C2B59B' },
  { id: 'cream', name: 'Warm Cream Sand', hex: '#E8DEC8' },
  { id: 'sage', name: 'Sage Green', hex: '#6E7C66' },
  { id: 'forest', name: 'Forest Green', hex: '#4D5C43' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(HOMEPAGE_SWATCHES[1].hex); // Default Olive
  const [hoveredColor, setHoveredColor] = useState(null);
  const [selectedCompartment, setSelectedCompartment] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);
  const [showInteractiveModel, setShowInteractiveModel] = useState(false);

  const activeColorPreview = hoveredColor || selectedColor;

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#16181B] text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">

      {/* ===================== HERO SECTION ===================== */}
      {/* Dark dusk left section with full proper HVAC unit image on the right */}
      <section className="relative w-full min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden bg-[#0D0E11] border-b border-slate-200/80 dark:border-white/10 transition-colors">

        {/* Right Side: Full Proper HVAC Unit Image */}
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-[68%] lg:w-[63%] xl:w-[59%] h-full z-0">
          <img
            src="/images/hero-bg-unit.jpg"
            alt="The Next Generation Modular HVAC System by No-Tech Systems"
            className="w-full h-full object-cover object-[center_35%] lg:object-center"
          />

          {/* On mobile: soft dark overlay for text readability; transparent on desktop */}
          <div className="absolute inset-0 bg-[#0D0E11]/75 md:hidden pointer-events-none" />

          {/* Light & Gentle Left Gradient: Halka blur/blend so the machine stays clearly visible without heavy dark obscuring */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-r from-[#0D0E11] via-[#0D0E11]/25 to-transparent pointer-events-none" />

          {/* Subtle Top & Bottom Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/35 via-transparent to-[#0D0E11]/20 pointer-events-none" />
        </div>

        {/* Left Side: Dark Dusk Content Area */}
        <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-xl lg:max-w-2xl space-y-5 sm:space-y-6">

            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A4A77E] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#C2B59B]">
                MODULAR • EFFICIENT • FUTURE READY
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold font-serif text-white tracking-tight leading-[1.12]">
                The Next Generation
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold font-serif text-[#C2B59B] tracking-tight leading-[1.12]">
                Modular HVAC System
              </h2>
            </div>

            {/* Tagline & Description */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                Plug-and-play. Efficient. Built for You.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                No-Tech HVAC delivers a revolutionary modular system with unmatched flexibility, easy installation, and modern design.
              </p>
            </div>

            {/* Hero Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/buyers"
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#7E8056]/30 transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Reserve Your No-Tech HVAC System Today →</span>
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/50 hover:bg-black/70 text-white font-medium text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all duration-200 hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 text-white fill-current" />
                <span>Explore the System</span>
              </button>
            </div>

            {/* Feature Highlights Mini Strip */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#A4A77E]" />
                <span>4-Bay Hot-Swappable</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#A4A77E]" />
                <span>Zero-Loss Disconnects</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#A4A77E]" />
                <span>Local Mechanical Approved</span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Controls on bottom right of the hero */}
        <div className="absolute bottom-5 right-5 z-20 hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setShowInteractiveModel(!showInteractiveModel)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 hover:bg-black text-white text-xs font-medium border border-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-105"
            title="Toggle 3D Diagram or Architectural Photo"
          >
            <Box className="w-4 h-4 text-[#C2B59B]" />
            <span>{showInteractiveModel ? 'Show Architectural Photo' : 'Switch to 3D Diagram View'}</span>
          </button>
        </div>

        {/* Interactive 3D Diagram Overlay (when toggled on) */}
        {showInteractiveModel && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-[#16181B] rounded-2xl border border-white/20 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Box className="w-5 h-5 text-[#A4A77E]" />
                  <h3 className="text-base font-bold text-white">Interactive 3D Modular Diagram</h3>
                </div>
                <button
                  onClick={() => setShowInteractiveModel(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <HvacModularVisualizer
                activeColor={activeColorPreview}
                selectedCompartment={selectedCompartment}
                onSelectCompartment={setSelectedCompartment}
                isInteractive={true}
                showLabels={true}
              />
            </div>
          </div>
        )}

      </section>

      {/* ===================== INTERACTIVE DEMO & COLOR CUSTOMIZER CARDS ===================== */}
      {/* 2 Side-by-side cards with clean light/dark styling */}
      <section id="interactive-demo" className="py-8 bg-[#FAF7F2] dark:bg-[#16181B] transition-colors">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Card 1: Interactive System Demo */}
            <div className="rounded-2xl bg-white dark:bg-[#23262A] border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Box className="w-5 h-5 text-[#7E8056] dark:text-white" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Interactive System Demo</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">

                  {/* Left: Unit image with glowing highlighted compartment and hand cursor */}
                  <div className="sm:col-span-7 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 aspect-[16/10] max-h-[190px]">
                    <img
                      src="/images/slices/demo-compartment-glow.jpg"
                      alt="Modular Unit Interactive Compartment Demo"
                      className="w-full h-full object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => setSelectedCompartment(prev => prev === 4 ? 1 : prev + 1)}
                      title="Click compartment to simulate swap"
                    />
                  </div>

                  {/* Right: 3 Steps & Watch Demo Button */}
                  <div className="sm:col-span-5 flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 p-1.5 rounded-lg bg-[#FAF7F2] dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                        <span className="w-5 h-5 rounded-full bg-[#7E8056] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                          1
                        </span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Click a compartment</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-1.5 rounded-lg bg-[#FAF7F2] dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                        <span className="w-5 h-5 rounded-full bg-[#7E8056] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                          2
                        </span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">See the swap process</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-1.5 rounded-lg bg-[#FAF7F2] dark:bg-black/30 border border-slate-200/60 dark:border-white/5">
                        <span className="w-5 h-5 rounded-full bg-[#7E8056] text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                          3
                        </span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Reinstall with ease</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs transition-all shadow-md active:scale-95"
                      >
                        <span>Watch Demo</span>
                        <Play className="w-3 h-3 fill-white ml-0.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Card 2: Customize Your HVAC System */}
            <div className="rounded-2xl bg-white dark:bg-[#23262A] border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Palette className="w-5 h-5 text-[#7E8056] dark:text-white" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Customize Your HVAC System</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">

                  {/* Left: Swatches, Description, and Choose Color Button */}
                  <div className="sm:col-span-6 space-y-4">
                    {/* Color Swatch Circles */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {HOMEPAGE_SWATCHES.map((swatch) => {
                        const isSelected = selectedColor === swatch.hex;
                        return (
                          <button
                            key={swatch.id}
                            onClick={() => setSelectedColor(swatch.hex)}
                            onMouseEnter={() => setHoveredColor(swatch.hex)}
                            onMouseLeave={() => setHoveredColor(null)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 shadow-md ${isSelected
                              ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#23262A] scale-110'
                              : 'hover:scale-105 opacity-85 hover:opacity-100'
                              }`}
                            style={{ backgroundColor: swatch.hex }}
                            aria-label={`Select ${swatch.name}`}
                            title={swatch.name}
                          />
                        );
                      })}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Real-time preview with your preferred color.
                    </p>

                    <div>
                      <Link
                        to={`/buyers?color=${encodeURIComponent(selectedColor)}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs transition-all shadow-md active:scale-95"
                      >
                        <span>Choose Color →</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right: Customized HVAC Unit Visual from Reference Image */}
                  <div className="sm:col-span-6 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 aspect-[16/10] max-h-[190px]">
                    <img
                      src="/images/slices/customize-colored-unit.jpg"
                      alt="Customized HVAC Modular System"
                      className="w-full h-full object-cover object-center transition-all duration-300"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color opacity-30 transition-colors duration-300"
                      style={{ backgroundColor: activeColorPreview }}
                    />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== FEATURES ROW ===================== */}
      {/* Light sand / cream banner matching the reference image strip */}
      <section className="bg-[#EAE4D7] dark:bg-[#1E2024] py-4 border-y border-[#DDD5C7] dark:border-white/10 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">

            {/* Feature 1 */}
            <div className="flex items-center gap-3 py-1">
              <div className="text-[#555845] dark:text-[#A4A77E]">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">Modular Design</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Maximum Flexibility</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 py-1">
              <div className="text-[#555845] dark:text-[#A4A77E]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">Quick Installation</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Save Time & Cost</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 py-1">
              <div className="text-[#555845] dark:text-[#A4A77E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">Reliable Performance</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Built to Last</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3 py-1">
              <div className="text-[#555845] dark:text-[#A4A77E]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">Energy Efficient</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Greener Tomorrow</p>
              </div>
            </div>

            {/* Feature 5: How No-Tech HVAC Works? Action Card */}
            <div className="col-span-2 md:col-span-1 flex items-center justify-between gap-3 bg-white/80 dark:bg-black/30 rounded-xl p-2.5 border border-slate-300/80 dark:border-white/10 shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">How No-Tech HVAC Works?</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400">Discover the simple 4-step process.</p>
              </div>
              <button
                onClick={() => setHowItWorksModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-[11px] font-semibold whitespace-nowrap transition-colors shadow-sm"
              >
                Learn More →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== OUR PORTALS & LOCAL MECHANICAL ===================== */}
      {/* Light ivory/cream background with portals and technician card */}
      <section className="bg-[#FAF7F2] dark:bg-[#121315] py-12 text-slate-900 dark:text-slate-100 transition-colors">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* Left Header */}
            <div className="lg:col-span-3 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">Our Portals</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Find everything you need in one place.</p>
              <div className="h-0.5 w-14 bg-[#7E8056] dark:bg-[#C2B59B] mt-1" />
            </div>

            {/* Center: 4 Portals Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">

              {/* Portal 1: Buyers Portal */}
              <Link
                to="/buyers"
                className="group p-3.5 rounded-2xl bg-white dark:bg-[#1E2125] border border-[#E6E0D6] dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Buyers Portal</h4>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                    <span>Select & Purchase</span>
                    <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                  </div>
                </div>
              </Link>

              {/* Portal 2: Investor Hub */}
              <Link
                to="/investor"
                className="group p-3.5 rounded-2xl bg-white dark:bg-[#1E2125] border border-[#E6E0D6] dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Investor Hub</h4>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                    <span>Learn More</span>
                    <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                  </div>
                </div>
              </Link>

              {/* Portal 3: Reservations */}
              <Link
                to="/reservations"
                className="group p-3.5 rounded-2xl bg-white dark:bg-[#1E2125] border border-[#E6E0D6] dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Reservations</h4>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                    <span>Book Your Install</span>
                    <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                  </div>
                </div>
              </Link>

              {/* Portal 4: Contractor Onboarding */}
              <Link
                to="/contractor"
                className="group p-3.5 rounded-2xl bg-white dark:bg-[#1E2125] border border-[#E6E0D6] dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <HardHat className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Contractor Onboarding</h4>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                    <span>Join Our Network</span>
                    <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                  </div>
                </div>
              </Link>

            </div>

            {/* Right: Wide Technician & Local Mechanical Card */}
            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-300 dark:border-[#3E4249] bg-[#1E2024] text-white p-4 sm:p-5 flex items-center justify-between min-h-[120px]">

                {/* Background Technician Photo from Image */}
                <div className="absolute inset-0">
                  <img
                    src="/images/slices/technician-portals-card.jpg"
                    alt="Technician inspecting No-Tech unit"
                    className="w-full h-full object-cover object-center brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
                </div>

                {/* Overlaid Content */}
                <div className="relative z-10 space-y-2 max-w-[280px]">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      Trusted by Professionals.
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-200 font-medium">
                      Approved by Local Mechanical.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 self-end">
                  <Link
                    to="/local-mechanical"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-[11px] transition-all shadow-md"
                  >
                    <span>Learn More →</span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== VIDEO / EXPLORE MODAL ===================== */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#1C1E22] border border-slate-200 dark:border-[#A4A77E]/50 rounded-2xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#7E8056] text-white">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">No-Tech HVAC Modular Engineering Video</h3>
                <p className="text-xs text-slate-500 dark:text-[#C2B59B]">Showcasing plug-and-play modular functionality & installation efficiency</p>
              </div>
            </div>

            {/* Video demonstration */}
            <div className="relative aspect-video rounded-xl bg-black border border-slate-200 dark:border-white/15 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#7E8056]/20 text-[#7E8056] border-2 border-[#7E8056] flex items-center justify-center mb-3 animate-pulse">
                <Play className="w-8 h-8 fill-[#7E8056] ml-1" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Modular 4-Bay Plug & Play Video Demonstration
              </h4>
              <p className="text-xs text-slate-300 max-w-md">
                Demonstrates zero-loss quick-connect couplings, dual conductor safety inspections, and seamless 4-minute field swaps.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] text-slate-300">4K UHD</span>
                <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] text-slate-300">Stereo Audio</span>
                <span className="px-2.5 py-1 rounded bg-[#7E8056]/30 text-[10px] text-white">EPA Compliant</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  navigate('/buyers');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#7E8056] hover:bg-[#6e7049] text-white"
              >
                Configure My System
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== HOW NO-TECH HVAC WORKS MODAL ===================== */}
      {howItWorksModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#1C1E22] border border-slate-200 dark:border-[#A4A77E]/50 rounded-2xl max-w-3xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setHowItWorksModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif mb-1">How No-Tech HVAC Works</h3>
            <p className="text-xs text-[#7E8056] dark:text-[#C2B59B] mb-6 font-semibold">The 4-Step Revolutionary Plug-and-Play Process</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#7E8056] text-white font-bold text-xs flex items-center justify-center">1</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Select & Reserve ($200 Fee)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Select your tonnage, air handler configuration (upflow/downflow/horizontal), and architectural panel color. Pay a $200 refundable deposit to lock in your production batch number.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#7E8056] text-white font-bold text-xs flex items-center justify-center">2</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Local Mechanical Certified Install</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  A certified contractor verified by Local Mechanical arrives during your selected 3-hour time slot. Installs standard 2'x6' sub-base and connects line sets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#7E8056] text-white font-bold text-xs flex items-center justify-center">3</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">4-Bay Modular Swapping</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  No brazing or full system replacement required. Each of the 4 compartments unplugs independently via self-aligning male/female pins and zero-loss valves.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#7E8056] text-white font-bold text-xs flex items-center justify-center">4</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cryptographic RFID Telemetry</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Technicians scan old and newly inserted compartments via the No-Tech app. Validation logs are sent directly to Local Mechanical for lifetime quality tracking.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setHowItWorksModalOpen(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#7E8056] hover:bg-[#6e7049] text-white"
              >
                Understood, Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
