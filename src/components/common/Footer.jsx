import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import LocalMechanicalLogo from './LocalMechanicalLogo';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#16181B] to-[#111214] border-t border-white/10 text-slate-300 transition-colors duration-200">
      {/* Main Footer Links */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group" title="No-Tech HVAC">
              <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white/95 shadow-sm">
                <img
                  src="/images/no-tech-hvac-logo.png"
                  alt="No-Tech HVAC"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              No-Tech HVAC is redefining climate infrastructure with hot-swappable 4-bay modular systems, zero-loss refrigerant disconnects, and continuous RFID validation.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A4A77E]" />
                Patent Pending
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A4A77E]" />
                ISO-Compliant
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A4A77E]" />
                EPA 608 Certified
              </span>
            </div>
          </div>

          {/* Customer Portals */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#C2B59B]">
              Buyers & Homeowners
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/buyers" className="text-slate-300 hover:text-[#A4A77E] transition-colors">Buyers Portal</Link>
              </li>
              <li>
                <Link to="/buyers#customizer" className="text-slate-300 hover:text-[#A4A77E] transition-colors">System Customizer</Link>
              </li>
              <li>
                <Link to="/reservations" className="text-slate-300 hover:text-[#A4A77E] transition-colors">Reservations & Scheduling</Link>
              </li>
              <li>
                <Link to="/manage-contractor" className="text-slate-300 hover:text-[#A4A77E] transition-colors">Manage My Contractor</Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-300 hover:text-[#A4A77E] transition-colors">AI Support & FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Contractors & Compliance */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#A4A77E]">
              Contractor Hub
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/contractor" className="text-slate-300 hover:text-[#A4A77E] transition-colors">Contractor Onboarding</Link>
              </li>
              <li>
                <Link to="/contractor#questionnaire" className="text-slate-300 hover:text-[#A4A77E] transition-colors">10-Question Certification</Link>
              </li>
              <li>
                <Link to="/local-mechanical" className="text-slate-300 hover:text-[#A4A77E] transition-colors">Local Mechanical Audits</Link>
              </li>
            </ul>
          </div>

          {/* Corporate & Investors */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#C2B59B]">
              Corporate
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/investor" className="text-slate-300 hover:text-[#A4A77E] transition-colors">Investor Hub</Link>
              </li>
              <li>
                <span className="text-slate-500">no-techhvac/buyers.com</span>
              </li>
              <li>
                <span className="text-slate-500">no-techhvac/reservations.com</span>
              </li>
              <li>
                <span className="text-slate-500">no-techhvac/contractor.com</span>
              </li>
              <li>
                <span className="text-slate-500">no-techhvac/investors.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2023–2026 No-Tech Systems Inc. All rights reserved. Built strictly in accordance with PDF guidelines.</p>
          <div className="flex items-center space-x-6">
            <span>Primary Steel Gray (#6D6E71)</span>
            <span>Accent Military Green (#A4A77E)</span>
            <span>Highlight Army Tan (#C2B59B)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
