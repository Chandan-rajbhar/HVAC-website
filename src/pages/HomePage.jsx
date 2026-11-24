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
  RotateCw,
  Box,
  Palette,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';
import HvacModularVisualizer from '../components/hvac/HvacModularVisualizer';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import NoTechLogo from '../components/common/NoTechLogo';
import { COLOR_SWATCHES, COMPARTMENTS } from '../data/mockData';

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].hex);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [selectedCompartment, setSelectedCompartment] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);

  const activeColorPreview = hoveredColor || selectedColor;

  return (
    <div className="min-h-screen bg-[#121315] text-slate-100 overflow-hidden">
      
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full border-b border-white/10 bg-gradient-to-b from-[#181a1d] via-[#141517] to-[#121315] py-10 lg:py-16">
        {/* Architectural Dusk Ambient Lighting Background Overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121315] via-[#121315]/90 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Brand Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#C2B59B] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#A4A77E] animate-ping" />
                <span className="font-semibold tracking-wider uppercase text-[11px]">Patent-Pending Modular Architecture</span>
              </div>

              {/* Exact Headline from Reference Image */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-[1.15]">
                  The Next Generation
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#C2B59B] tracking-tight leading-[1.15]">
                  Modular HVAC System
                </h2>
              </div>

              {/* Tagline & Description from PDF & Image */}
              <div className="space-y-3">
                <p className="text-lg sm:text-xl font-bold text-slate-100 tracking-wide">
                  Plug-and-play. Efficient. Built for You.
                </p>
                <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  No-Tech HVAC delivers a revolutionary modular system with unmatched flexibility, easy installation, and modern design.
                </p>
              </div>

              {/* Hero Call-To-Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/buyers"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-sm transition-all duration-200 shadow-xl shadow-[#A4A77E]/20 hover:scale-[1.02] active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Reserve Your No-Tech HVAC System Today →</span>
                </Link>

                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm border border-white/15 transition-all duration-200 hover:text-white"
                >
                  <Play className="w-4 h-4 text-[#C2B59B] fill-[#C2B59B]" />
                  <span>Explore the System</span>
                </button>
              </div>

              {/* Quick Spec Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block">Installation Time</span>
                  <span className="font-bold text-[#A4A77E]">Under 2 Hours</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Modular Bays</span>
                  <span className="font-bold text-white">4 Independent</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Oversight Body</span>
                  <span className="font-bold text-[#C2B59B]">Local Mechanical</span>
                </div>
              </div>

            </div>

            {/* Right Hero Graphic: Large 3D HVAC Unit Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative group">
                <HvacModularVisualizer
                  activeColor={activeColorPreview}
                  selectedCompartment={selectedCompartment}
                  onSelectCompartment={setSelectedCompartment}
                  isInteractive={true}
                  showLabels={true}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== INTERACTIVE DEMO & COLOR CUSTOMIZER CARDS ===================== */}
      {/* Matches the two side-by-side dark cards in the reference screenshot */}
      <section id="interactive-demo" className="py-12 bg-[#121315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Card 1: Interactive System Demo */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1C1E22] to-[#151719] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E]">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Interactive System Demo</h3>
                      <p className="text-xs text-slate-400">Click any individual bay to test swap kinematics</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#C2B59B] font-mono">
                    Live Simulator
                  </span>
                </div>

                {/* 3 Steps listed in reference image */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#A4A77E] text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span className="text-xs font-medium text-slate-200">Click a compartment</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#A4A77E] text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span className="text-xs font-medium text-slate-200">See the swap process</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#A4A77E] text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span className="text-xs font-medium text-slate-200">Reinstall with ease</span>
                  </div>
                </div>

                {/* Mini Visual Preview of the selected compartment */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#A4A77E] font-bold uppercase tracking-wider">
                      Currently Inspected Bay:
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {COMPARTMENTS.find(c => c.id === selectedCompartment)?.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Zero-loss quick-connects, dual conductor pins, and RFID status sync.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-slate-400">Swaps take under 4 minutes with zero brazing</span>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C2B59B] hover:bg-[#b0a388] text-black font-semibold text-xs transition-all shadow-md active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Watch Demo ▶</span>
                </button>
              </div>
            </div>

            {/* Card 2: Customize Your HVAC System */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1C1E22] to-[#151719] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#C2B59B]/20 text-[#C2B59B]">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Customize Your HVAC System</h3>
                      <p className="text-xs text-slate-400">Interactive military-inspired architectural palette</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#A4A77E]">
                    {COLOR_SWATCHES.find(c => c.hex === activeColorPreview)?.name}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-4">
                  Real-time preview with your preferred color. Hover or click any color swatch below to visualize powder-coat finishes.
                </p>

                {/* Color Swatch Circles */}
                <div className="flex flex-wrap items-center gap-3.5 py-3">
                  {COLOR_SWATCHES.map((swatch) => {
                    const isSelected = selectedColor === swatch.hex;
                    return (
                      <button
                        key={swatch.id}
                        onClick={() => setSelectedColor(swatch.hex)}
                        onMouseEnter={() => setHoveredColor(swatch.hex)}
                        onMouseLeave={() => setHoveredColor(null)}
                        className={`group relative w-10 h-10 rounded-full transition-all duration-200 transform hover:scale-110 shadow-md ${
                          isSelected
                            ? 'ring-4 ring-[#C2B59B] ring-offset-2 ring-offset-[#1C1E22] scale-105'
                            : 'hover:ring-2 hover:ring-white/40'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                        aria-label={`Select ${swatch.name}`}
                        title={swatch.name}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white drop-shadow-md" />
                          </span>
                        )}
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-black text-[10px] text-white px-2 py-0.5 rounded shadow z-10">
                          {swatch.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs mt-3">
                  <span className="text-slate-400">Selected HEX:</span>
                  <span className="font-mono text-[#A4A77E] font-bold">{selectedColor}</span>
                  <span className="text-slate-400">Finish: Ultra-Durable UV Polyester</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-slate-400">Compliant with HOA & architectural codes</span>
                <Link
                  to={`/buyers?color=${encodeURIComponent(selectedColor)}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-semibold text-xs transition-all shadow-md active:scale-95"
                >
                  <span>Choose Color →</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== FEATURES ROW ===================== */}
      {/* 4 Feature pillars + How No-Tech HVAC Works from Reference Image */}
      <section className="py-8 bg-[#181A1D] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="p-2.5 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex-shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Modular Design</h4>
                <p className="text-[11px] text-slate-400">Maximum Flexibility</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="p-2.5 rounded-xl bg-[#C2B59B]/20 text-[#C2B59B] flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Installation</h4>
                <p className="text-[11px] text-slate-400">Save Time & Cost</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="p-2.5 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Reliable Performance</h4>
                <p className="text-[11px] text-slate-400">Built to Last</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="p-2.5 rounded-xl bg-[#C2B59B]/20 text-[#C2B59B] flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Energy Efficient</h4>
                <p className="text-[11px] text-slate-400">Greener Tomorrow</p>
              </div>
            </div>

            {/* How It Works Action Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#22252A] to-[#1C1E22] border border-[#A4A77E]/30 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#A4A77E] uppercase tracking-wide">
                  How No-Tech HVAC Works?
                </span>
                <p className="text-[11px] text-slate-300">
                  Discover the simple 4-step process.
                </p>
              </div>
              <button
                onClick={() => setHowItWorksModalOpen(true)}
                className="mt-2.5 self-start px-3 py-1.5 rounded-lg bg-[#A4A77E] text-black font-semibold text-[11px] hover:bg-[#8e9167] transition-all flex items-center gap-1"
              >
                <span>Learn More →</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== OUR PORTALS & LOCAL MECHANICAL TRUST ===================== */}
      {/* Matches the bottom section of the reference screenshot */}
      <section className="py-14 bg-[#121315]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Our Portals */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">Our Portals</h3>
                <p className="text-xs sm:text-sm text-slate-400">Find everything you need in one place.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Portal 1: Buyers Portal */}
                <Link
                  to="/buyers"
                  className="group p-5 rounded-2xl bg-gradient-to-br from-[#1E2125] to-[#16181B] border border-white/10 hover:border-[#A4A77E]/50 transition-all duration-200 shadow-md hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Buyers Portal</h4>
                  <p className="text-xs text-slate-400 mt-1">Configure tonnage, check compatibility, and reserve.</p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#A4A77E] group-hover:translate-x-1 transition-transform">
                    <span>Select & Purchase</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </Link>

                {/* Portal 2: Investor Hub */}
                <Link
                  to="/investor"
                  className="group p-5 rounded-2xl bg-gradient-to-br from-[#1E2125] to-[#16181B] border border-white/10 hover:border-[#C2B59B]/50 transition-all duration-200 shadow-md hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C2B59B]/20 text-[#C2B59B] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Investor Hub</h4>
                  <p className="text-xs text-slate-400 mt-1">Modular climate infrastructure market opportunity.</p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#C2B59B] group-hover:translate-x-1 transition-transform">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </Link>

                {/* Portal 3: Reservations */}
                <Link
                  to="/reservations"
                  className="group p-5 rounded-2xl bg-gradient-to-br from-[#1E2125] to-[#16181B] border border-white/10 hover:border-[#A4A77E]/50 transition-all duration-200 shadow-md hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Reservations</h4>
                  <p className="text-xs text-slate-400 mt-1">Select installation date, 8 exact PDF time slots.</p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#A4A77E] group-hover:translate-x-1 transition-transform">
                    <span>Book Your Install</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </Link>

                {/* Portal 4: Contractor Onboarding */}
                <Link
                  to="/contractor"
                  className="group p-5 rounded-2xl bg-gradient-to-br from-[#1E2125] to-[#16181B] border border-white/10 hover:border-[#C2B59B]/50 transition-all duration-200 shadow-md hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C2B59B]/20 text-[#C2B59B] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Contractor Onboarding</h4>
                  <p className="text-xs text-slate-400 mt-1">EPA & license uploads, 10-question certification.</p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#C2B59B] group-hover:translate-x-1 transition-transform">
                    <span>Join Our Network</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </Link>

              </div>
            </div>

            {/* Right: Trusted by Professionals & Approved by Local Mechanical */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-gradient-to-br from-[#1B1D21] to-[#141517] border border-white/10 p-6 relative overflow-hidden shadow-xl">
                
                {/* Background Technician Image as per Reference Screenshot */}
                <div 
                  className="absolute inset-0 opacity-15 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=80')`
                  }}
                />
                
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4A77E]">
                      Quality & Safety Governance
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
                      Official Authority
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                      Trusted by Professionals.
                    </h4>
                    <p className="text-base font-semibold text-[#C2B59B]">
                      Approved by Local Mechanical.
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Local Mechanical functions as the certification and quality enforcement hub for all mechanical contractors working with No-Tech HVAC. This ensures standardized service, regulatory compliance, and accountability across every installation.
                    </p>
                  </div>

                  {/* Local Mechanical Emblem Display */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                    <LocalMechanicalLogo className="h-12" />
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Audit Status</span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/local-mechanical"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#A4A77E] hover:text-black text-white font-semibold text-xs transition-all border border-white/10"
                    >
                      <span>Learn More →</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== VIDEO / EXPLORE MODAL ===================== */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-[#1C1E22] border border-[#A4A77E]/50 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[#A4A77E] text-black">
                <Play className="w-5 h-5 fill-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">No-Tech HVAC Modular Engineering Video</h3>
                <p className="text-xs text-[#C2B59B]">Showcasing plug-and-play modular functionality & installation efficiency</p>
              </div>
            </div>

            {/* Video Placeholder Container matching PDF Hero requirements */}
            <div className="relative aspect-video rounded-xl bg-black border border-white/15 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#A4A77E]/20 text-[#A4A77E] border-2 border-[#A4A77E] flex items-center justify-center mb-3 animate-pulse">
                <Play className="w-8 h-8 fill-[#A4A77E] ml-1" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Modular 4-Bay Plug & Play Video Demonstration
              </h4>
              <p className="text-xs text-slate-400 max-w-md">
                Demonstrates zero-loss quick-connect couplings, dual conductor safety inspections, and seamless 4-minute field swaps.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] text-slate-300">4K UHD</span>
                <span className="px-2.5 py-1 rounded bg-white/10 text-[10px] text-slate-300">Stereo Audio</span>
                <span className="px-2.5 py-1 rounded bg-[#A4A77E]/20 text-[10px] text-[#A4A77E]">EPA Compliant</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  navigate('/buyers');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#A4A77E] hover:bg-[#8e9167] text-black"
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
          <div className="bg-[#1C1E22] border border-[#A4A77E]/50 rounded-2xl max-w-3xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setHowItWorksModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif mb-1">How No-Tech HVAC Works</h3>
            <p className="text-xs text-[#C2B59B] mb-6">The 4-Step Revolutionary Plug-and-Play Process</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#A4A77E] text-black font-bold text-xs flex items-center justify-center">1</span>
                <h4 className="text-sm font-bold text-white">Select & Reserve ($200 Fee)</h4>
                <p className="text-xs text-slate-300">
                  Select your tonnage, air handler configuration (upflow/downflow/horizontal), and architectural panel color. Pay a $200 refundable deposit to lock in your production batch number.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#A4A77E] text-black font-bold text-xs flex items-center justify-center">2</span>
                <h4 className="text-sm font-bold text-white">Local Mechanical Certified Install</h4>
                <p className="text-xs text-slate-300">
                  A certified contractor verified by Local Mechanical arrives during your selected 3-hour time slot. Installs standard 2'x6' sub-base and connects line sets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#A4A77E] text-black font-bold text-xs flex items-center justify-center">3</span>
                <h4 className="text-sm font-bold text-white">4-Bay Modular Swapping</h4>
                <p className="text-xs text-slate-300">
                  No brazing or full system replacement required. Each of the 4 compartments unplugs independently via self-aligning male/female pins and zero-loss valves.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <span className="w-7 h-7 rounded-full bg-[#A4A77E] text-black font-bold text-xs flex items-center justify-center">4</span>
                <h4 className="text-sm font-bold text-white">Cryptographic RFID Telemetry</h4>
                <p className="text-xs text-slate-300">
                  Technicians scan old and newly inserted compartments via the No-Tech app. Validation logs are sent directly to Local Mechanical for lifetime quality tracking.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setHowItWorksModalOpen(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#A4A77E] hover:bg-[#8e9167] text-black"
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
