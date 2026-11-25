import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-800 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">

      {/* ===================== HERO SECTION ===================== */}
      {/* Dark dusk left section with high-definition modular HVAC video on the right */}
      <section className="relative w-full min-h-[600px] lg:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-[#0D0E11] border-b border-slate-200/80 dark:border-white/10 transition-colors">

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
            className="w-full h-full object-cover object-center transform-gpu will-change-transform filter contrast-[1.05] saturate-[1.05] brightness-110 transition-opacity duration-700"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0) scale(1.24)',
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

        </div>

        {/* Centered Hero Content Area */}
        <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">

            {/* Headline - Fixed high-contrast colors identical in both Light & Dark themes */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] font-bold font-serif text-white tracking-tight leading-[1.05] drop-shadow-lg">
                The Next Generation
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] font-bold font-serif text-[#7E8056] tracking-tight leading-[1.05] drop-shadow-lg">
                Modular HVAC System
              </h2>
            </motion.div>

            {/* Tagline & Description */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 max-w-2xl mx-auto"
            >
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-wide drop-shadow-md">
                Plug-and-play. Efficient. Built for You.
              </p>
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed drop-shadow-sm">
                No-Tech HVAC delivers a revolutionary modular system with unmatched flexibility, easy installation, and modern design.
              </p>
            </motion.div>

            {/* Hero Call-To-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
            >
              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="w-full sm:w-[220px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-black/60 hover:bg-black/80 text-white font-semibold text-sm tracking-wide border border-white/30 hover:border-white/50 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 group cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#A4A77E] flex-shrink-0" />
                <span>Reserve Now</span>
                <ArrowRight className="w-4 h-4 text-[#A4A77E] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-[220px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-black/60 hover:bg-black/80 text-white font-semibold text-sm tracking-wide border border-white/30 hover:border-white/50 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 text-[#A4A77E] fill-current flex-shrink-0" />
                <span>Explore System</span>
              </button>
            </motion.div>

          </div>
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
      <section id="interactive-demo" className="py-12 sm:py-16 bg-white dark:bg-[#212428] transition-colors">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Explore & Customize Your System
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Interact with modular bay swaps and preview custom finishes in real time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Card 1: Interactive System Demo */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.35, ease: 'easeOut' } }}
              className="rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 p-6 sm:p-7 flex flex-col shadow-md"
            >
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-transparent border border-[#7E8056]/35 dark:border-[#A4A77E]/35 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0">
                    <Box className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Interactive System Demo</h3>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">

                  {/* Left: Unit image with glowing highlighted compartment and hand cursor */}
                  <div className="sm:col-span-6 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 aspect-[16/10] group/img shadow-inner">
                    <img
                      src="/images/demo-interactive-aura-unit.jpg"
                      alt="Aura Series S Modular Unit Interactive Compartment Demo"
                      className="w-full h-full object-cover object-center cursor-pointer group-hover/img:scale-105 transition-transform duration-500"
                      onClick={() => setSelectedCompartment(prev => prev === 4 ? 1 : prev + 1)}
                      title="Click compartment to simulate swap"
                    />
                    {/* Live Bay Indicator & Interactive Click Hint */}
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/75 border border-white/20 backdrop-blur-md text-[10px] font-semibold text-white flex items-center gap-1.5 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A4A77E] animate-pulse" />
                      <span>Bay #{selectedCompartment} Active</span>
                    </div>
                  </div>

                  {/* Right: 3 Steps & Watch Demo Button */}
                  <div className="sm:col-span-6 h-full flex flex-col justify-between space-y-3">
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
            </motion.div>

            {/* Card 2: Customize Your HVAC System */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.05, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.35, ease: 'easeOut' } }}
              className="rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 p-6 sm:p-7 flex flex-col shadow-md"
            >
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-transparent border border-[#7E8056]/35 dark:border-[#A4A77E]/35 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0">
                    <Palette className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Customize Your HVAC System</h3>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">

                  {/* Left: Customized HVAC Unit Visual from Reference Image */}
                  <div className="sm:col-span-6 relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 aspect-[16/10] group/colorimg shadow-inner">
                    <img
                      src="/images/customize-hvac-unit.jpg"
                      alt="Customized HVAC Modular System"
                      className="w-full h-full object-cover object-center group-hover/colorimg:scale-105 transition-transform duration-500"
                    />
                    {/* Dynamic color tint responding in real-time to selected/hovered swatch */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color opacity-35 transition-colors duration-300"
                      style={{ backgroundColor: activeColorPreview }}
                    />
                    {/* Architectural color badge */}
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-black/75 border border-white/20 backdrop-blur-md text-[10px] font-semibold text-white flex items-center gap-1.5 pointer-events-none">
                      <span
                        className="w-2 h-2 rounded-full border border-white/40 shadow-sm"
                        style={{ backgroundColor: activeColorPreview }}
                      />
                      <span className="capitalize">{HOMEPAGE_SWATCHES.find(s => s.hex === activeColorPreview)?.name || 'Custom'}</span>
                    </div>
                  </div>

                  {/* Right: Swatches, Description, and Choose Color Button */}
                  <div className="sm:col-span-6 h-full flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
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
                                ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#121315] scale-110'
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
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/buyers?color=${encodeURIComponent(selectedColor)}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs transition-all shadow-md active:scale-95"
                      >
                        <span>Choose Color →</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===================== FEATURES ROW ===================== */}
      <section className="py-8 sm:py-10 bg-white dark:bg-[#212428] transition-colors">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 px-6 py-10 sm:px-10 sm:py-12 min-h-[220px] flex flex-col justify-center space-y-8 shadow-md"
          >

            {/* Centered Section Heading Inside Box */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-2xl mx-auto space-y-1.5"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                Why Choose No-Tech HVAC?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Engineered for plug-and-play simplicity, lasting durability, and lower installation costs.
              </p>
            </motion.div>

            {/* 4 Core Pillars */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200/90 dark:lg:divide-white/10">

              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="flex items-center lg:justify-center gap-3.5 lg:pr-6"
              >
                <div className="w-11 h-11 rounded-xl bg-transparent border border-[#7E8056]/35 dark:border-[#A4A77E]/35 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Modular Design</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Maximum Flexibility</p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="flex items-center lg:justify-center gap-3.5 lg:px-6"
              >
                <div className="w-11 h-11 rounded-xl bg-transparent border border-[#7E8056]/35 dark:border-[#A4A77E]/35 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Quick Installation</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Save Time & Cost</p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="flex items-center lg:justify-center gap-3.5 lg:px-6"
              >
                <div className="w-11 h-11 rounded-xl bg-transparent border border-[#7E8056]/35 dark:border-[#A4A77E]/35 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Reliable Performance</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Built to Last</p>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.85, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="flex items-center lg:justify-center gap-3.5 lg:pl-6"
              >
                <div className="w-11 h-11 rounded-xl bg-transparent border border-[#7E8056]/35 dark:border-[#A4A77E]/35 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Energy Efficient</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Greener Tomorrow</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== OUR PORTALS & LOCAL MECHANICAL ===================== */}
      {/* Light ivory/cream background with portals and technician card */}
      <section className="bg-white dark:bg-[#212428] py-12 sm:py-16 text-slate-900 dark:text-slate-100 transition-colors">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2"
          >
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Our Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Find everything you need in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

            {/* Left: 4 Portals Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">

              {/* Portal 1: Buyers Portal */}
              <motion.div
                initial={{ opacity: 0, x: 55 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="h-full"
              >
                <Link
                  to="/buyers"
                  className="group h-full p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121315] border border-[#E6E0D6] dark:border-white/25 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Buyers Portal</h4>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                      <span>Select & Purchase</span>
                      <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Portal 2: Investor Hub */}
              <motion.div
                initial={{ opacity: 0, x: 55 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="h-full"
              >
                <Link
                  to="/investor"
                  className="group h-full p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121315] border border-[#E6E0D6] dark:border-white/25 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Investor Hub</h4>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                      <span>Learn More</span>
                      <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Portal 3: Reservations */}
              <motion.div
                initial={{ opacity: 0, x: 55 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="h-full"
              >
                <Link
                  to="/reservations"
                  className="group h-full p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121315] border border-[#E6E0D6] dark:border-white/25 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Reservations</h4>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                      <span>Book Your Install</span>
                      <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Portal 4: Contractor Onboarding */}
              <motion.div
                initial={{ opacity: 0, x: 55 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.95, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="h-full"
              >
                <Link
                  to="/contractor"
                  className="group h-full p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121315] border border-[#E6E0D6] dark:border-white/25 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-center items-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F0EDE6] dark:bg-white/10 text-[#555845] dark:text-[#A4A77E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <HardHat className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Contractor Onboarding</h4>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white">
                      <span>Join Our Network</span>
                      <span className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-500 flex items-center justify-center text-[9px] group-hover:border-black dark:group-hover:border-white">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>

            </div>

            {/* Right: Wide Technician & Local Mechanical Card */}
            <motion.div
              initial={{ opacity: 0, x: 55 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.95, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="lg:col-span-4"
            >
              <div className="relative h-full rounded-2xl overflow-hidden shadow-lg border border-slate-300 dark:border-white/25 bg-[#121315] text-white p-5 sm:p-6 flex items-center justify-between min-h-[140px]">

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
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-[11px] transition-all shadow-md"
                  >
                    <span>Learn More →</span>
                  </Link>
                </div>

              </div>
            </motion.div>

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
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A4A77E]/15 border border-[#A4A77E]/30 text-[#6C6F4D] dark:text-[#A4A77E] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  Production Batch 2026 Reservation
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  Reserve Your No-Tech Modular HVAC System
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
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
