import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Play,
  Pause,
  Volume2,
  VolumeX,
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
  RotateCw,
  Sparkles,
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
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);
  const [showInteractiveModel, setShowInteractiveModel] = useState(false);
  const [exploreTab, setExploreTab] = useState('video'); // 'video' | 'specs' | 'diagram'

  // High-Definition Hero Background Video Controls
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const activeColorPreview = hoveredColor || selectedColor;

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#16181B] text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">

      {/* ===================== HERO SECTION ===================== */}
      {/* Dark dusk left section with high-definition modular HVAC video on the right */}
      <section className="relative w-full min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden bg-[#0D0E11] border-b border-slate-200/80 dark:border-white/10 transition-colors">

        {/* Full-Bleed Hero Background Video: Completely clear without any left-side blur */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          <video
            ref={videoRef}
            key="hero-video-gemini"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center transform-gpu will-change-transform filter contrast-[1.05] saturate-[1.05] brightness-[1.02] transition-opacity duration-700"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            <source src="/videos/hero-background-video.mp4?v=gemini" type="video/mp4" />
            <source src="/videos/gemini_generated_hero.mp4" type="video/mp4" />
            {/* Fallback image if video is not supported */}
            <img
              src="/images/hero-bg-unit.jpg"
              alt="The Next Generation Modular HVAC System by No-Tech Systems"
              className="w-full h-full object-cover object-center"
            />
          </video>

          {/* Subtle clean ambient tint for crystal-clear text readability across the video without any left-side blur */}
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold font-serif text-white tracking-tight leading-[1.12] drop-shadow-lg">
                The Next Generation
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold font-serif text-[#C2B59B] tracking-tight leading-[1.12] drop-shadow-lg">
                Modular HVAC System
              </h2>
            </div>

            {/* Tagline & Description */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-bold text-white tracking-wide drop-shadow-md">
                Plug-and-play. Efficient. Built for You.
              </p>
              <p className="text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed drop-shadow-sm">
                No-Tech HVAC delivers a revolutionary modular system with unmatched flexibility, easy installation, and modern design.
              </p>
            </div>

            {/* Hero Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xl shadow-[#7E8056]/30 transition-all duration-200 hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Reserve Your No-Tech HVAC</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/60 hover:bg-black/80 text-white font-medium text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-white fill-current" />
                <span>Explore the System</span>
              </button>
            </div>

            {/* Micro-Content & Key Highlights directly in Hero under buttons */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 text-[#C2B59B] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A4A77E] animate-pulse" />
                <span>$200 Refundable Deposit</span>
              </div>
              <span className="text-white/25 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A4A77E]" />
                <span>Priority 2026 Batch Allocation</span>
              </div>
              <span className="text-white/25 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A4A77E]" />
                <span>10-Year Local Mechanical Guarantee</span>
              </div>
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
          {/* Video Play/Pause & Audio Mute Toggles */}
          <div className="flex items-center bg-black/80 rounded-full border border-white/20 backdrop-blur-md px-1.5 py-1 shadow-2xl">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors"
              title={isPlaying ? "Pause Background Video" : "Play Background Video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors"
              title={isMuted ? "Unmute Background Video" : "Mute Background Video"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-300" /> : <Volume2 className="w-3.5 h-3.5 text-[#C2B59B]" />}
            </button>
            <span className="text-[10px] font-bold text-[#A4A77E] px-2 uppercase tracking-widest hidden md:inline border-l border-white/15 ml-1">
              HD Video
            </span>
          </div>

          <button
            onClick={() => setShowInteractiveModel(!showInteractiveModel)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-medium border border-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-105"
            title="Toggle 3D Diagram or Architectural Video"
          >
            <Box className="w-4 h-4 text-[#C2B59B]" />
            <span>{showInteractiveModel ? 'Show Video View' : 'Switch to 3D Diagram View'}</span>
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
            <div className="group rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1C1E22] border border-slate-200/90 dark:border-white/10 p-5 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl dark:shadow-none transition-all duration-300">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                        Interactive System Demo
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        Patented 4-bay modular slide-out drawer architecture
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#7E8056] animate-pulse" />
                    Bay {selectedCompartment} / 4
                  </span>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">

                  {/* Left: Interactive pulled-out compartment drawer image */}
                  <div className="sm:col-span-7 relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10 aspect-[16/10] shadow-inner group/img">
                    <img
                      src="/images/demo-compartment-drawer-swap.jpg"
                      alt="Modular Unit Interactive Compartment Slide-Out Drawer"
                      className="w-full h-full object-cover object-center cursor-pointer group-hover/img:scale-105 transition-transform duration-500"
                      onClick={() => setSelectedCompartment(prev => prev === 4 ? 1 : prev + 1)}
                      title="Click to simulate compartment slide-out & swap"
                    />
                    {/* Live overlay badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-black/75 border border-white/20 backdrop-blur-md text-[10px] font-semibold text-white flex items-center gap-1.5 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A4A77E]" />
                      <span>Slide-Out Drawer Bay #{selectedCompartment}</span>
                    </div>

                    {/* Bottom click hint */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 border border-white/20 backdrop-blur-md text-[10px] font-medium text-[#C2B59B] pointer-events-none flex items-center gap-1">
                      <span>Click to cycle bays</span>
                      <RotateCw className="w-3 h-3 text-[#A4A77E]" />
                    </div>
                  </div>

                  {/* Right: 3 Steps & Watch Demo Button */}
                  <div className="sm:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-3.5">
                    <div className="space-y-2 sm:space-y-2.5">
                      <div
                        onClick={() => setSelectedCompartment(1)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          selectedCompartment === 1
                            ? 'bg-[#7E8056]/15 border-[#7E8056] text-slate-900 dark:text-white shadow-sm'
                            : 'bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center flex-shrink-0 ${
                          selectedCompartment === 1 ? 'bg-[#7E8056] text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                        }`}>
                          1
                        </span>
                        <div className="leading-tight">
                          <span className="text-xs font-semibold block">Click a compartment</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">Pull out slide-in module</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setSelectedCompartment(2)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          selectedCompartment === 2
                            ? 'bg-[#7E8056]/15 border-[#7E8056] text-slate-900 dark:text-white shadow-sm'
                            : 'bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center flex-shrink-0 ${
                          selectedCompartment === 2 ? 'bg-[#7E8056] text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                        }`}>
                          2
                        </span>
                        <div className="leading-tight">
                          <span className="text-xs font-semibold block">See the swap process</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">Zero refrigerant venting</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setSelectedCompartment(3)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          selectedCompartment === 3
                            ? 'bg-[#7E8056]/15 border-[#7E8056] text-slate-900 dark:text-white shadow-sm'
                            : 'bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center flex-shrink-0 ${
                          selectedCompartment === 3 ? 'bg-[#7E8056] text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                        }`}>
                          3
                        </span>
                        <div className="leading-tight">
                          <span className="text-xs font-semibold block">Reinstall with ease</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">Self-aligning pin lock</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => setIsVideoModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg shadow-[#7E8056]/20 active:scale-95 cursor-pointer"
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
            <div className="group rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1C1E22] border border-slate-200/90 dark:border-white/10 p-5 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl dark:shadow-none transition-all duration-300">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                        Customize Your HVAC System
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        Architectural powder-coated exterior panels
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#7E8056] dark:text-[#C2B59B] capitalize">
                    {HOMEPAGE_SWATCHES.find(s => s.hex === activeColorPreview)?.name || 'Custom Color'}
                  </span>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">

                  {/* Left: Swatches, Description, and Choose Color Button */}
                  <div className="sm:col-span-6 space-y-3.5 sm:space-y-4">
                    {/* Swatch Selection Area */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                        Select Panel Color:
                      </span>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {HOMEPAGE_SWATCHES.map((swatch) => {
                          const isSelected = selectedColor === swatch.hex;
                          return (
                            <button
                              key={swatch.id}
                              onClick={() => setSelectedColor(swatch.hex)}
                              onMouseEnter={() => setHoveredColor(swatch.hex)}
                              onMouseLeave={() => setHoveredColor(null)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 shadow-md cursor-pointer relative ${isSelected
                                ? 'ring-2 ring-[#7E8056] dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#1C1E22] scale-110'
                                : 'hover:scale-105 opacity-85 hover:opacity-100'
                                }`}
                              style={{ backgroundColor: swatch.hex }}
                              aria-label={`Select ${swatch.name}`}
                              title={swatch.name}
                            >
                              {isSelected && (
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-white drop-shadow" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 space-y-0.5">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                        Real-time Architectural Preview
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Matches luxury exterior facade, stucco, brick, and modern siding.
                      </p>
                    </div>

                    <div className="pt-1">
                      <Link
                        to={`/buyers?color=${encodeURIComponent(selectedColor)}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg shadow-[#7E8056]/20 active:scale-95 cursor-pointer"
                      >
                        <span>Choose Color →</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right: Architectural Luxury Villa HVAC Render with Dynamic Color Tint */}
                  <div className="sm:col-span-6 relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10 aspect-[16/10] shadow-inner group/img">
                    <img
                      src="/images/customize-architectural-unit.jpg"
                      alt="Customized Architectural HVAC Modular System at Modern Luxury Home"
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                    />
                    {/* Dynamic color tint overlay that responds in real-time to selected/hovered swatch */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color opacity-35 transition-colors duration-300"
                      style={{ backgroundColor: activeColorPreview }}
                    />
                    {/* Architectural tag pill */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 border border-white/20 backdrop-blur-md text-[10px] font-medium text-white flex items-center gap-1.5 pointer-events-none">
                      <span
                        className="w-2 h-2 rounded-full border border-white/50"
                        style={{ backgroundColor: activeColorPreview }}
                      />
                      <span className="capitalize">{HOMEPAGE_SWATCHES.find(s => s.hex === activeColorPreview)?.name}</span>
                    </div>
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

      {/* ===================== HERO QUICK RESERVATION MODAL ===================== */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#16181B] border border-slate-200 dark:border-white/15 rounded-2xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-[#7E8056] text-white">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#7E8056]/15 text-[#7E8056] dark:text-[#C2B59B] text-[10px] font-bold uppercase tracking-wider mb-1">
                  Production Batch 2026 Reservation
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  Reserve Your No-Tech Modular HVAC System
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Lock in your production batch number and pricing with a $200 fully refundable deposit.
                </p>
              </div>
            </div>

            {/* 3 Step Reservation Process */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#7E8056] text-white font-bold text-xs flex items-center justify-center">1</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Configure Tonnage</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Choose 3.0, 4.0 or 5.0 ton capacity with upflow/downflow/horizontal duct routing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#7E8056] text-white font-bold text-xs flex items-center justify-center">2</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">$200 Deposit</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Secures your spot in line. 100% refundable prior to production delivery.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#7E8056] text-white font-bold text-xs flex items-center justify-center">3</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Certified Install</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Local Mechanical certified technician executes 3-hour sub-base installation.
                </p>
              </div>
            </div>

            {/* System Highlights Included */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B]">
                Included with Every Modular System:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7E8056] flex-shrink-0" />
                  <span>4 Hot-Swappable Independent Bays</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7E8056] flex-shrink-0" />
                  <span>Zero-Loss Quick Refrigerant Couplings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7E8056] flex-shrink-0" />
                  <span>Dual Conductor Male/Female Self-Aligning Pins</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7E8056] flex-shrink-0" />
                  <span>Local Mechanical Lifetime Quality Telemetry</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Estimated Delivery: <strong className="text-slate-800 dark:text-white">Q1 2026 Batch</strong>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setIsReserveModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsReserveModalOpen(false);
                    navigate('/buyers');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#7E8056] hover:bg-[#6e7049] text-white shadow-lg shadow-[#7E8056]/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Go to Buyers Customizer & Pay $200 Deposit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== VIDEO & SYSTEM EXPLORER MODAL ===================== */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#1C1E22] border border-slate-200 dark:border-[#A4A77E]/50 rounded-2xl max-w-3xl w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title & Navigation Tabs */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-[#7E8056] text-white">
                  <Play className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                    Explore the No-Tech Modular HVAC System
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#C2B59B]">
                    Engineered for zero downtime, 4-bay plug-and-play swapping, and certified by Local Mechanical
                  </p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
                <button
                  onClick={() => setExploreTab('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${exploreTab === 'video'
                      ? 'bg-[#7E8056] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  Video Walkthrough
                </button>
                <button
                  onClick={() => setExploreTab('specs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${exploreTab === 'specs'
                      ? 'bg-[#7E8056] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setExploreTab('diagram')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${exploreTab === 'diagram'
                      ? 'bg-[#7E8056] text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  Interactive 3D Diagram
                </button>
              </div>
            </div>

            {/* Tab 1: Video */}
            {exploreTab === 'video' && (
              <div className="relative aspect-video rounded-xl bg-black border border-slate-200 dark:border-white/15 overflow-hidden shadow-2xl mb-4">
                <video
                  src="/videos/hero-background-video.mp4?v=gemini"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Tab 2: Technical Specs */}
            {exploreTab === 'specs' && (
              <div className="space-y-4 py-2 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#7E8056] dark:text-[#A4A77E]">Efficiency Rating</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Up to 24.5 SEER2 / 14.5 HSPF2</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Inverter variable-speed scroll compressor with intelligent staged cooling.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#7E8056] dark:text-[#A4A77E]">Refrigerant Coupling</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Dry-Break Zero-Loss Disconnects</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Self-sealing flat face couplers prevent any refrigerant venting during swap.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#7E8056] dark:text-[#A4A77E]">Electrical Pins</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Self-Aligning Male/Female Terminals</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">High-amperage silver-plated guide pins with dual micro-switch safety lockouts.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#7E8056] dark:text-[#A4A77E]">Telemetry</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Cryptographic RFID Asset Tracking</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Every compartment serial is cryptographically validated with Local Mechanical.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Interactive 3D Diagram */}
            {exploreTab === 'diagram' && (
              <div className="mb-4">
                <HvacModularVisualizer
                  activeColor={activeColorPreview}
                  selectedCompartment={selectedCompartment}
                  onSelectCompartment={setSelectedCompartment}
                  isInteractive={true}
                  showLabels={true}
                />
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                Patent-Pending Modular Architecture
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    navigate('/buyers');
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#7E8056] hover:bg-[#6e7049] text-white shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Configure My System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
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
