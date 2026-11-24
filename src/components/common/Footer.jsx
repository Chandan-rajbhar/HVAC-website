import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import NoTechLogo from './NoTechLogo';
import LocalMechanicalLogo from './LocalMechanicalLogo';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F1012] border-t border-white/10 text-slate-300">
      {/* Top Banner with Local Mechanical Endorsement */}
      <div className="border-b border-white/10 bg-[#16181B] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LocalMechanicalLogo className="h-10" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Approved by Local Mechanical
              </h4>
              <p className="text-xs text-slate-400">
                Official regulatory and compliance enforcement body for all No-Tech modular installations worldwide.
              </p>
            </div>
          </div>

          <Link
            to="/local-mechanical"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-[#A4A77E] hover:text-black text-slate-200 transition-all border border-white/10"
          >
            <span>View Quality Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <NoTechLogo className="h-12" />
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
                <Link to="/buyers" className="hover:text-[#A4A77E] transition-colors">Buyers Portal</Link>
              </li>
              <li>
                <Link to="/buyers#customizer" className="hover:text-[#A4A77E] transition-colors">System Customizer</Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-[#A4A77E] transition-colors">Reservations & Scheduling</Link>
              </li>
              <li>
                <Link to="/manage-contractor" className="hover:text-[#A4A77E] transition-colors">Manage My Contractor</Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-[#A4A77E] transition-colors">AI Support & FAQs</Link>
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
                <Link to="/contractor" className="hover:text-[#A4A77E] transition-colors">Contractor Onboarding</Link>
              </li>
              <li>
                <Link to="/contractor#questionnaire" className="hover:text-[#A4A77E] transition-colors">10-Question Certification</Link>
              </li>
              <li>
                <Link to="/contractor/schedule" className="hover:text-[#A4A77E] transition-colors">Scheduling Controls</Link>
              </li>
              <li>
                <Link to="/contractor/rfid" className="hover:text-[#A4A77E] transition-colors">RFID Scanning Demo</Link>
              </li>
              <li>
                <Link to="/local-mechanical" className="hover:text-[#A4A77E] transition-colors">Local Mechanical Audits</Link>
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
                <Link to="/investor" className="hover:text-[#A4A77E] transition-colors">Investor Hub</Link>
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
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2022–2026 No-Tech Systems Inc. All rights reserved. Built strictly in accordance with PDF guidelines.</p>
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
