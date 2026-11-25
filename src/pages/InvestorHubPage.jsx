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
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function InvestorHubPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#16181B] text-slate-800 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 min-h-[380px] sm:aspect-[1024/350] flex items-center justify-center">
        {/* Full-Width Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/investor-hero-building.jpg"
            alt="Corporate Innovation Center at Sunset"
            className="w-full h-full object-cover object-center"
          />
          {/* Light clean tint so the sunset building shines clearly while text remains readable */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Centered Hero Content Container */}
        <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 flex flex-col items-center">
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Investor Hub
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Invest in Innovation.
              </p>
            </div>

            <p className="text-sm sm:text-base text-white leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Discover the opportunity behind No-Tech HVAC's modular solution. We are redefining the global heating, ventilation, and air-conditioning industry through hot-swappable compartmental engineering.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="#why-invest"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link
                to="/buyers"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold border border-white/25 transition-all shadow-sm"
              >
                <span>View Consumer Demand</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
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

        {/* ===================== NO-TECH HVAC - A SMARTER FUTURE (SHADCN CARD) ===================== */}
        <Card className="overflow-hidden shadow-md border-slate-200 dark:border-white/10 bg-white dark:bg-[#181A1D]">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Side: Content & Action */}
              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                  No-Tech HVAC – A Smarter Future
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#7E8056] dark:text-[#C2B59B]">
                  Modular. Scalable. Sustainable.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  Connect with our corporate development and investor relations team to request formal introductory materials and strategic briefing decks.
                </p>
                <div className="pt-2">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-lg bg-[#7E8056] hover:bg-[#6e7049] text-white font-semibold text-xs px-4 py-2 h-auto shadow-sm transition-all"
                  >
                    <a href="mailto:investors@no-techhvac.com" className="inline-flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Explore Opportunities →</span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Side: High-Res Modular Unit Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md bg-slate-950 aspect-[16/10] group">
                  <img
                    src="/images/investor-smarter-future.jpg"
                    alt="No-Tech Systems Commercial Modular HVAC Unit"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
