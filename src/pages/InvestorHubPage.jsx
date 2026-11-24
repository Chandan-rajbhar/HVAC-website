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
    <div className="min-h-screen bg-[#121315] text-slate-100 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ===================== HERO BANNER ===================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1B1D20] via-[#22252A] to-[#1B1D20] border border-white/10 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80')`
            }}
          />
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4A77E]">
              no-techhvac/investors.com (PDF Section 13)
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white">
              Investor Hub
            </h1>
            <p className="text-lg sm:text-xl text-[#C2B59B] font-semibold">
              Invest in Innovation.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Discover the opportunity behind No-Tech HVAC's modular solution. We are redefining the global heating, ventilation, and air-conditioning industry through hot-swappable compartmental engineering.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#why-invest"
                className="px-6 py-3 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-xs shadow-lg transition-all"
              >
                Learn More →
              </a>
              <Link
                to="/buyers"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold border border-white/15"
              >
                View Consumer Demand
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== WHY INVEST? CARDS ===================== */}
        {/* Exactly matches "Why Invest?" section in reference screenshot */}
        <section id="why-invest" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Why Invest?
            </h2>
            <p className="text-xs text-slate-400">
              Three pillars driving our modular disruption of commercial and residential HVAC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Innovative Technology */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-3 shadow-xl hover:border-[#A4A77E]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Innovative Technology</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                4-bay hot-swappable architecture eliminates full condenser replacements. Field repairs drop from 6+ hours of brazing to a 4-minute zero-loss module swap.
              </p>
              <div className="pt-2 text-[11px] text-[#A4A77E] font-medium flex items-center gap-1">
                <span>Patent-Pending Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pillar 2: Growing Market */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-3 shadow-xl hover:border-[#C2B59B]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C2B59B]/20 text-[#C2B59B] flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Growing Market</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Addressing the $280B+ global climate infrastructure sector. Increasing heat waves, EPA refrigerant phase-downs, and labor shortages accelerate modular adoption.
              </p>
              <div className="pt-2 text-[11px] text-[#C2B59B] font-medium flex items-center gap-1">
                <span>High-Margin Recurring Swaps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pillar 3: Strong Partnerships */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-3 shadow-xl hover:border-[#A4A77E]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex items-center justify-center">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Strong Partnerships</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exclusive quality control oversight and certification with Local Mechanical. Over 128 vetted mechanical contractors already active across southern metro corridors.
              </p>
              <div className="pt-2 text-[11px] text-[#A4A77E] font-medium flex items-center gap-1">
                <span>Local Mechanical Endorsed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </section>

        {/* ===================== NO-TECH HVAC - A SMARTER FUTURE ===================== */}
        {/* Banner from bottom of Investor Hub in reference screenshot */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1E2125] via-[#24272C] to-[#1E2125] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              No-Tech HVAC – A Smarter Future
            </h3>
            <p className="text-sm font-semibold text-[#A4A77E]">
              Modular. Scalable. Sustainable.
            </p>
            <p className="text-xs text-slate-400 max-w-xl">
              Connect with our corporate development and investor relations team to request formal introductory materials and strategic briefing decks.
            </p>
          </div>

          <a
            href="mailto:investors@no-techhvac.com"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-[#C2B59B] hover:bg-[#b0a388] text-black font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Explore Opportunities →</span>
          </a>
        </div>

      </div>
    </div>
  );
}
