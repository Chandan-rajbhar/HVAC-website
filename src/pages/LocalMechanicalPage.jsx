import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Radio,
  Eye,
  Camera,
  Layers,
  Star,
  Award,
  Search,
  Check,
  X,
  FileText
} from 'lucide-react';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import { DEMO_CONTRACTORS } from '../data/mockData';

export default function LocalMechanicalPage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'applications' | 'compliance' | 'performance'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected' | 'under_review'

  // Contractor applications state
  const [applications, setApplications] = useState([
    {
      id: 'app-101',
      name: 'David Vance',
      company: 'Apex Precision Mechanical',
      state: 'Texas',
      license: 'TACLA-882914E',
      epaCert: 'EPA-608 Universal #44912',
      insurance: 'Verified - Local Mechanical listed',
      status: 'approved',
      score: '10/10 (100%)',
      submittedDate: '2026-11-10'
    },
    {
      id: 'app-102',
      name: 'Elena Rostova',
      company: 'Vanguard Thermal Engineering',
      state: 'Texas',
      license: 'TACLA-763401C',
      epaCert: 'EPA-608 Universal #88321',
      insurance: 'Verified - Local Mechanical listed',
      status: 'approved',
      score: '10/10 (100%)',
      submittedDate: '2026-11-12'
    },
    {
      id: 'app-103',
      name: 'Thomas Bradley',
      company: 'Bradley Heating & Cooling LLC',
      state: 'Oklahoma',
      license: 'OK-HVAC-9921',
      epaCert: 'EPA-608 Type II (Universal Pending)',
      insurance: 'Under Review - Local Mechanical endorsement missing',
      status: 'pending',
      score: '8/10 (80%)',
      submittedDate: '2026-11-22'
    },
    {
      id: 'app-104',
      name: 'Kevin Vance Jr.',
      company: 'Vance Bros Air Solutions',
      state: 'Texas',
      license: 'TACLB-110294',
      epaCert: 'EPA-608 Universal #33120',
      insurance: 'Expired 2026-10-31',
      status: 'under_review',
      score: '7/10 (70%)',
      submittedDate: '2026-11-19'
    },
    {
      id: 'app-105',
      name: 'Greg Sanders',
      company: 'Sanders Rapid Air',
      state: 'Louisiana',
      license: 'LA-MEC-3310',
      epaCert: 'Unverified credential',
      insurance: 'Not provided',
      status: 'rejected',
      score: '5/10 (50%)',
      submittedDate: '2026-11-15'
    }
  ]);

  // Selected applicant for review drawer
  const [selectedApp, setSelectedApp] = useState(null);

  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(prev =>
      prev.map(a => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    setSelectedApp(null);
  };

  const filteredApps = statusFilter === 'all'
    ? applications
    : applications.filter(a => a.status === statusFilter);

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ===================== HERO BANNER ===================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F0ECE1] via-[#F7F4EC] to-[#F0ECE1] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border border-slate-300 dark:border-[#A4A77E]/30 p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#A4A77E]">
                Official Quality & Code Enforcement Authority
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
                Local Mechanical
              </h1>
              <p className="text-base sm:text-lg text-[#8C7A58] dark:text-[#C2B59B] font-semibold">
                Approval. Compliance. Quality.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Local Mechanical functions as the certification and quality enforcement hub for all mechanical contractors working with No-Tech HVAC, ensuring standardized service and regulatory compliance worldwide.
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md bg-white dark:bg-black/40 flex items-center justify-center p-2">
                <img
                  src="/images/slices/localmech-shield.jpg"
                  alt="Local Mechanical Quality Shield"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-2 text-xs">
            {[
              { id: 'dashboard', label: 'Approval Dashboard' },
              { id: 'compliance', label: 'Installation Compliance & RFID Logs' },
              { id: 'performance', label: 'Contractor Performance & Reviews' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#7E8056] text-white shadow-md'
                    : 'bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===================== TAB 1: APPROVAL DASHBOARD ===================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* 4 Stats Cards matching reference screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                onClick={() => setStatusFilter('pending')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'pending'
                    ? 'bg-amber-100/70 border-amber-500 text-amber-950 dark:bg-amber-500/20 dark:border-amber-500 dark:text-amber-300 ring-1 ring-amber-500'
                    : 'bg-white dark:bg-[#181A1D] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Pending</span>
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">12</div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Applications awaiting audit</span>
              </div>

              <div
                onClick={() => setStatusFilter('approved')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'approved'
                    ? 'bg-emerald-100/70 border-emerald-500 text-emerald-950 dark:bg-emerald-500/20 dark:border-emerald-500 dark:text-emerald-300 ring-1 ring-emerald-500'
                    : 'bg-white dark:bg-[#181A1D] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Approved</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">128</div>
                <span className="text-[11px] text-slate-400">Certified active contractors</span>
              </div>

              <div
                onClick={() => setStatusFilter('rejected')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'rejected'
                    ? 'bg-red-500/20 border-red-500 text-red-300 ring-1 ring-red-500'
                    : 'bg-[#181A1D] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">Rejected</span>
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-2">8</div>
                <span className="text-[11px] text-slate-400">Deficiencies uncorrected</span>
              </div>

              <div
                onClick={() => setStatusFilter('under_review')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  statusFilter === 'under_review'
                    ? 'bg-[#C2B59B]/20 border-[#C2B59B] text-[#C2B59B] ring-1 ring-[#C2B59B]'
                    : 'bg-[#181A1D] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C2B59B]">Under Review</span>
                  <AlertTriangle className="w-4 h-4 text-[#C2B59B]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-white mt-2">14</div>
                <span className="text-[11px] text-slate-400">Additional training or docs</span>
              </div>
            </div>

            {/* Contractor Applications Table */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Contractor Verification Applications ({filteredApps.length})
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Filter:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-black/50 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                  >
                    <option value="all">All Applications</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="under_review">Under Review</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-[10px] uppercase tracking-wider text-slate-400 border-b border-white/10 bg-black/20">
                    <tr>
                      <th className="py-2.5 px-3">Contractor / Business</th>
                      <th className="py-2.5 px-3">State License</th>
                      <th className="py-2.5 px-3">EPA 608 Universal</th>
                      <th className="py-2.5 px-3">Insurance (COI)</th>
                      <th className="py-2.5 px-3">Quiz Score</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-sans font-bold text-white block">{app.name}</span>
                          <span className="text-[10px] text-slate-400 font-sans">{app.company}</span>
                        </td>
                        <td className="py-3 px-3">{app.license}</td>
                        <td className="py-3 px-3">{app.epaCert}</td>
                        <td className="py-3 px-3 font-sans text-xs">{app.insurance}</td>
                        <td className="py-3 px-3 text-[#A4A77E] font-bold">{app.score}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-sans ${
                            app.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : app.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : app.status === 'under_review'
                              ? 'bg-[#C2B59B]/20 text-[#C2B59B] border border-[#C2B59B]/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {app.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-sans">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 2: COMPLIANCE & RFID LOGS ===================== */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#A4A77E]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    RFID Telemetry Scan Logs & Compartment Swaps
                  </h3>
                </div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cryptographically Verified
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-[10px] uppercase tracking-wider text-slate-400 border-b border-white/10 bg-black/20">
                    <tr>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">Technician</th>
                      <th className="py-2.5 px-3">Customer Site</th>
                      <th className="py-2.5 px-3">Modular Bay</th>
                      <th className="py-2.5 px-3">RFID Log Hash</th>
                      <th className="py-2.5 px-3">Pin Continuity</th>
                      <th className="py-2.5 px-3">QC Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    <tr>
                      <td className="py-3 px-3">2026-11-23 14:10:04</td>
                      <td className="py-3 px-3 font-sans text-white">David Vance</td>
                      <td className="py-3 px-3 font-sans">Preston Hollow, Dallas</td>
                      <td className="py-3 px-3 font-sans">Bay 01: Inverter Comp.</td>
                      <td className="py-3 px-3 text-[#A4A77E]">0x7F89B...NT9821</td>
                      <td className="py-3 px-3 text-emerald-400">PASSED [100%]</td>
                      <td className="py-3 px-3 font-sans font-semibold text-emerald-400">Approved by Local Mech.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3">2026-11-22 11:24:19</td>
                      <td className="py-3 px-3 font-sans text-white">Elena Rostova</td>
                      <td className="py-3 px-3 font-sans">Round Rock, Austin</td>
                      <td className="py-3 px-3 font-sans">Bay 02: ECM Blower</td>
                      <td className="py-3 px-3 text-[#A4A77E]">0x4C12E...NT4412</td>
                      <td className="py-3 px-3 text-emerald-400">PASSED [100%]</td>
                      <td className="py-3 px-3 font-sans font-semibold text-emerald-400">Approved by Local Mech.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3">2026-11-20 09:42:55</td>
                      <td className="py-3 px-3 font-sans text-white">Marcus Holloway</td>
                      <td className="py-3 px-3 font-sans">Woodlands, Houston</td>
                      <td className="py-3 px-3 font-sans">Bay 03: Microchannel</td>
                      <td className="py-3 px-3 text-[#A4A77E]">0x9910D...NT3190</td>
                      <td className="py-3 px-3 text-emerald-400">PASSED [100%]</td>
                      <td className="py-3 px-3 font-sans font-semibold text-emerald-400">Approved by Local Mech.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quality Compliance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A4A77E]">
                  Code Enforcement Standards
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>2'x6' wood or equivalent steel foundation sub-base verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>80-ft line sizing compliance (3/4" to 7/8" and 7/8" to 1" copper)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Electronic gas detector leak test mandatory before reactivation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Male/female conductor pin physical continuity audit</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C2B59B]">
                  Flagged Service Issues & Corrective Actions
                </h4>
                <p className="text-xs text-slate-300">
                  Contractors who fail to meet service standards or incur repeated installation defects are placed under review for mandatory retraining or removed from the approved roster.
                </p>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-400">
                  Current flagged deficiency rate: <strong>0.3%</strong> across 1,840 global installations.
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 3: PERFORMANCE & REVIEWS ===================== */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C2B59B]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Contractor Performance Rankings & Customer Reviews
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.8 / 5.0 Network Average</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {DEMO_CONTRACTORS.map((c, idx) => (
                  <div key={c.id} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#A4A77E] text-black">
                        Rank #{idx + 1}
                      </span>
                      <span className="text-emerald-400 font-semibold">{c.status}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{c.name}</h4>
                        <p className="text-[11px] text-[#C2B59B] truncate">{c.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {c.rating}
                      </span>
                      <span className="text-slate-400">{c.completedInstalls} installs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Review Contractor Modal / Drawer */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <div className="bg-[#1C1E22] border border-[#A4A77E]/50 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative space-y-4">
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <LocalMechanicalLogo className="h-10" />
                <div>
                  <h3 className="text-base font-bold text-white font-serif">{selectedApp.name}</h3>
                  <p className="text-xs text-[#C2B59B]">{selectedApp.company} ({selectedApp.state})</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">State License:</span>
                  <span className="font-mono text-white font-semibold">{selectedApp.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">EPA 608 Universal:</span>
                  <span className="font-mono text-[#A4A77E] font-semibold">{selectedApp.epaCert}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">COI (Insurance):</span>
                  <span className="text-slate-200">{selectedApp.insurance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">10-Question Score:</span>
                  <span className="font-bold text-[#A4A77E]">{selectedApp.score}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 text-xs">
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                  className="px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, 'under_review')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold"
                >
                  Place Under Review
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, 'approved')}
                  className="px-5 py-2 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold"
                >
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
