import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Cpu,
  Globe2,
  Handshake,
  ArrowRight,
  ShieldCheck,
  Layers,
  Leaf,
  CheckCircle2,
  Mail
} from 'lucide-react';
import NoTechLogo from '../components/common/NoTechLogo';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';

export default function InvestorHubPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#16181B] text-slate-800 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white border-b border-white/10 overflow-hidden">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-slate-300 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7E8056]" />
                <span>Investor Hub</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-sm">
                Investor Hub
              </h1>

              <p className="text-lg sm:text-xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight">
                Invest in Innovation
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Discover the opportunity behind No-Tech HVAC's modular solution. We are redefining the global heating, ventilation, and air-conditioning industry through hot-swappable compartmental engineering.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#why-invest"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:gap-3 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/buyers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all cursor-pointer"
                >
                  <span>View Consumer Demand</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Showcase (Framed with equal right margin aligned to Header) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black/60 aspect-[16/10] sm:aspect-[16/9] group">
                <img
                  src="/images/investor-hero-building.jpg"
                  alt="Corporate Innovation Center at Sunset"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Page Content Body with matching max-w-[1480px] container */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">

        {/* ===================== WHY INVEST? CARDS ===================== */}
        {/* Exactly matches "Why Invest?" section in reference screenshot */}
        <section id="why-invest" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
              Why Invest?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Three pillars driving our modular disruption of commercial and residential HVAC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Pillar 1: Innovative Technology */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1E2024] border border-slate-200 dark:border-white/10 space-y-3 shadow-md hover:border-[#7E8056]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#7E8056]/20 text-[#7E8056] flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Innovative Technology</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                4-bay hot-swappable architecture eliminates full condenser replacements. Field repairs drop from 6+ hours of brazing to a 4-minute zero-loss module swap.
              </p>
              <div className="pt-2 text-[11px] text-[#7E8056] dark:text-[#A4A77E] font-medium flex items-center gap-1">
                <span>Patent-Pending Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pillar 2: Growing Market */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1E2024] border border-slate-200 dark:border-white/10 space-y-3 shadow-md hover:border-[#8C7A58]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#8C7A58]/20 text-[#8C7A58] dark:text-[#C2B59B] flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Growing Market</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Addressing the $280B+ global climate infrastructure sector. Increasing heat waves, EPA refrigerant phase-downs, and labor shortages accelerate modular adoption.
              </p>
              <div className="pt-2 text-[11px] text-[#8C7A58] dark:text-[#C2B59B] font-medium flex items-center gap-1">
                <span>High-Margin Recurring Swaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pillar 3: Strong Partnerships */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1E2024] border border-slate-200 dark:border-white/10 space-y-3 shadow-md hover:border-[#7E8056]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#7E8056]/20 text-[#7E8056] flex items-center justify-center">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Strong Partnerships</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Exclusive quality control oversight and certification with Local Mechanical. Over 128 vetted mechanical contractors already active across southern metro corridors.
              </p>
              <div className="pt-2 text-[11px] text-[#7E8056] dark:text-[#A4A77E] font-medium flex items-center gap-1">
                <span>Local Mechanical Endorsed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </section>

        {/* ===================== NO-TECH HVAC - A SMARTER FUTURE ===================== */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-[#181A1D]">
          <div className="space-y-1.5 z-10">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
              No-Tech HVAC – A Smarter Future
            </h3>
            <p className="text-sm font-semibold text-[#7E8056] dark:text-[#A4A77E]">
              Modular. Scalable. Sustainable.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Connect with our corporate development and investor relations team to request formal introductory materials and strategic briefing decks.
            </p>
            <div className="pt-2">
              <a
                href="mailto:investors@no-techhvac.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7E8056] hover:bg-[#6e7049] text-white font-bold text-xs shadow-md transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Explore Opportunities →</span>
              </a>
            </div>
          </div>

          {/* Glowing Modular Unit graphic on the right */}
          <div className="relative z-10 flex-shrink-0">
            <div className="w-36 sm:w-44 h-20 sm:h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md bg-slate-900">
              <img
                src="/images/slices/investor-bottom-unit.jpg"
                alt="No-Tech HVAC Glowing Modular Unit"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
