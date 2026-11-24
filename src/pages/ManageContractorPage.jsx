import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Star,
  ShieldCheck,
  UserX,
  RotateCw,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Award,
  ArrowRight,
  Send,
  X
} from 'lucide-react';
import { DEMO_CONTRACTORS } from '../data/mockData';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';

export default function ManageContractorPage() {
  const [contractorsList, setContractorsList] = useState(DEMO_CONTRACTORS);
  const [assignedContractorId, setAssignedContractorId] = useState('cnt-01');

  // Unselection & Feedback Form state
  const [unselectModalOpen, setUnselectModalOpen] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState('Scheduling conflict / requested different time window');
  const [feedbackNotes, setFeedbackNotes] = useState('Need a morning arrival slot on Tuesday.');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Past feedback reports list
  const [feedbackReports, setFeedbackReports] = useState([
    {
      id: 'fb-901',
      date: '2026-10-14',
      previousTech: 'Metro Modular Heating & Air',
      reason: 'Requested earlier service slot',
      notes: 'Customer needed earlier 7 AM arrival window. Reassigned to Apex Precision.',
      status: 'Delivered to Contractor & Local Mechanical'
    }
  ]);

  const assignedContractor = contractorsList.find(c => c.id === assignedContractorId) || contractorsList[0];
  const availableContractors = contractorsList.filter(c => c.id !== assignedContractorId);

  const handleUnselect = () => {
    setUnselectModalOpen(true);
  };

  const handleConfirmUnselect = (e) => {
    e.preventDefault();
    // Add to feedback reports
    const report = {
      id: `fb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      previousTech: assignedContractor.name + ' (' + assignedContractor.company + ')',
      reason: feedbackReason,
      notes: feedbackNotes,
      status: 'Delivered to Contractor & Local Mechanical'
    };
    setFeedbackReports(prev => [report, ...prev]);
    setFeedbackSubmitted(true);
    setUnselectModalOpen(false);

    // Prompt user to select another available contractor
    // We unassign until they pick a new one, or auto-assign the next
  };

  const handleSelectNewContractor = (newId) => {
    setAssignedContractorId(newId);
    setFeedbackSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F4F1EA] via-[#F8F6F0] to-[#F4F1EA] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border border-slate-200 dark:border-[#A4A77E]/30 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-2.5">
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Manage My Contractor
            </h1>
            <p className="text-base sm:text-lg text-[#8C7A58] dark:text-[#C2B59B] font-semibold">
              Certified Technicians. Local Compliance.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Review your assigned certified technician, view verified ratings, or switch to another Local Mechanical approved contractor.
            </p>
            <div className="pt-2">
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs shadow-md transition-colors"
              >
                <span>Reservations Dashboard →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feedback Submitted Confirmation Alert */}
        {feedbackSubmitted && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                Feedback report recorded. Please select a new certified contractor from the available network below.
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Local Mechanical QC Copied</span>
          </div>
        )}

        {/* ===================== CURRENTLY ASSIGNED CONTRACTOR CARD ===================== */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#181A1D] border border-[#A4A77E]/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A4A77E] block">
                Primary Assigned Technician
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mt-0.5">
                {assignedContractor.name}
              </h2>
              <p className="text-xs text-[#C2B59B] font-semibold">{assignedContractor.company}</p>
            </div>

            {/* Verified and approved by Local Mechanical badge with name and logo (PDF Page 7) */}
            <div className="p-3 rounded-xl bg-black/50 border border-[#A4A77E]/40 flex items-center gap-3">
              <LocalMechanicalLogo className="h-10" />
              <div className="text-right">
                <span className="text-[9px] text-[#A4A77E] uppercase font-bold tracking-wider block">
                  Official Status
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved by Local Mechanical
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details & Ratings */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Avatar & Fast Stats */}
            <div className="md:col-span-3 flex flex-col items-center text-center space-y-3">
              <img
                src={assignedContractor.avatar}
                alt={assignedContractor.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#A4A77E] shadow-xl"
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{assignedContractor.rating}</span>
                  <span className="text-xs text-slate-400 font-normal">({assignedContractor.reviewsCount} reviews)</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                  {assignedContractor.completedInstalls} Completed Modular Installs
                </span>
              </div>
            </div>

            {/* Bio & Credentials */}
            <div className="md:col-span-6 space-y-3 text-xs">
              <p className="text-slate-300 leading-relaxed italic">
                "{assignedContractor.bio}"
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">State License</span>
                  <span className="font-mono font-semibold text-white">{assignedContractor.license}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">EPA 608 Universal</span>
                  <span className="font-mono font-semibold text-[#A4A77E]">{assignedContractor.epaCert}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">Territory Base</span>
                  <span className="font-semibold text-white">{assignedContractor.location}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">Insurance Active Through</span>
                  <span className="font-mono font-semibold text-[#C2B59B]">{assignedContractor.insuranceExpires}</span>
                </div>
              </div>
            </div>

            {/* Customer Actions */}
            <div className="md:col-span-3 space-y-3 flex flex-col justify-center">
              <button
                onClick={handleUnselect}
                className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-semibold text-xs border border-red-500/30 transition-all flex items-center justify-center gap-2"
              >
                <UserX className="w-4 h-4" />
                <span>Unselect Contractor</span>
              </button>

              <p className="text-[10px] text-slate-500 text-center leading-normal">
                Dissatisfied or need different availability? You can unselect and choose another certified provider at zero penalty.
              </p>
            </div>

          </div>
        </div>

        {/* ===================== SELECT ANOTHER AVAILABLE CONTRACTOR ===================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif text-white">
                Available Certified Contractors in Your Territory
              </h3>
              <p className="text-xs text-slate-400">
                All candidates carry active EPA Universal certification and Local Mechanical verified standing.
              </p>
            </div>
            <span className="text-xs text-[#A4A77E] font-semibold">
              {availableContractors.length} Verified Alternatives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableContractors.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-[#181A1D] border border-white/10 flex flex-col justify-between space-y-4 shadow-xl hover:border-[#A4A77E]/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#A4A77E]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <p className="text-[11px] text-[#C2B59B] truncate">{c.company}</p>
                      <div className="flex items-center gap-1 text-amber-400 text-xs mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="font-bold">{c.rating}</span>
                        <span className="text-slate-400 text-[10px]">({c.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {c.bio}
                  </p>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>License:</span>
                      <span className="font-mono text-white">{c.license}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Area:</span>
                      <span className="text-slate-200">{c.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 pt-1 border-t border-white/5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified by Local Mechanical</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectNewContractor(c.id)}
                  className="w-full py-2.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Select This Contractor</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== CONTRACTOR FEEDBACK REPORTS ===================== */}
        {/* PDF Requirement: "Contractors receive feedback reports on why they were unselected." */}
        <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C2B59B]" /> Contractor Removal & Feedback Reports (PDF Log)
            </h3>
            <span className="text-xs text-slate-400">Transparency & Continuous Improvement</span>
          </div>

          <div className="space-y-3">
            {feedbackReports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{report.previousTech}</span>
                    <span className="text-slate-400 font-mono text-[10px]">Report #{report.id}</span>
                  </div>
                  <p className="text-slate-300">
                    <strong className="text-amber-400">Reason:</strong> {report.reason}
                  </p>
                  <p className="text-slate-400 italic">
                    Notes: "{report.notes}"
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-slate-400 block text-[10px]">{report.date}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-emerald-400 text-[10px] font-semibold">
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== UNSELECT FEEDBACK MODAL ===================== */}
        {unselectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <div className="bg-[#1C1E22] border border-red-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative space-y-4">
              <button
                onClick={() => setUnselectModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                  <UserX className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Unselect Current Contractor</h3>
                  <p className="text-xs text-slate-400">{assignedContractor.name} ({assignedContractor.company})</p>
                </div>
              </div>

              <p className="text-xs text-slate-300">
                To maintain service quality and help technicians improve, contractors receive a feedback report outlining why they were unselected.
              </p>

              <form onSubmit={handleConfirmUnselect} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Select Primary Reason:</label>
                  <select
                    value={feedbackReason}
                    onChange={(e) => setFeedbackReason(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2 text-white outline-none"
                  >
                    <option value="Scheduling conflict / requested different time window">Scheduling conflict / requested different time window</option>
                    <option value="Slow communication / response time">Slow communication / response time</option>
                    <option value="Customer preferred a different certified specialist">Customer preferred a different certified specialist</option>
                    <option value="Workmanship or site cleanliness concern">Workmanship or site cleanliness concern</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Additional Feedback Comments:</label>
                  <textarea
                    rows={3}
                    value={feedbackNotes}
                    onChange={(e) => setFeedbackNotes(e.target.value)}
                    placeholder="Provide constructive feedback for the contractor..."
                    className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl p-3 text-white outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setUnselectModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                  >
                    Submit Report & Switch Contractor
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
