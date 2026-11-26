import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  RotateCw,
  X,
  Radio,
  FileCheck2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { TIME_SLOTS } from '../data/mockData';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';

export default function ContractorSchedulePage() {
  const [appointments, setAppointments] = useState([
    {
      id: 'inst-101',
      customer: 'Robert Chen',
      phone: '(214) 555-8821',
      address: '7721 Preston Hollow Way, Dallas, TX',
      system: '3.0 Ton Upflow (Olive Green)',
      date: '2026-12-16',
      timeSlot: '10 AM – 1 PM',
      status: 'Assigned',
      bayWork: 'New System Install & Initial Commissioning'
    },
    {
      id: 'inst-102',
      customer: 'Sarah Montgomery',
      phone: '(817) 555-3390',
      address: '4105 River Crest Dr, Fort Worth, TX',
      system: '4.0 Ton Horizontal (Steel Gray)',
      date: '2026-12-18',
      timeSlot: '1 PM – 4 PM',
      status: 'Assigned',
      bayWork: 'Bay 02 ECM Blower Hot-Swap'
    },
    {
      id: 'inst-103',
      customer: 'Michael Lawson',
      phone: '(972) 555-1178',
      address: '1903 Legacy Dr, Plano, TX',
      system: '2.5 Ton Upflow (Army Tan)',
      date: '2026-12-21',
      timeSlot: '7 AM – 10 AM',
      status: 'Confirmed',
      bayWork: 'Bay 03 Microchannel Valve Inspection'
    }
  ]);

  // Shift calendar dates & selected day filter
  const shiftDates = [
    { day: 'TUE', num: '15', date: '2026-12-15' },
    { day: 'WED', num: '16', date: '2026-12-16' },
    { day: 'THU', num: '17', date: '2026-12-17' },
    { day: 'FRI', num: '18', date: '2026-12-18' },
    { day: 'MON', num: '21', date: '2026-12-21' },
  ];
  const [selectedShiftDate, setSelectedShiftDate] = useState('all');

  // Rescheduling modal state
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [newDate, setNewDate] = useState('2026-12-23');
  const [newSlot, setNewSlot] = useState(TIME_SLOTS[1]);
  const [rescheduleReason, setRescheduleReason] = useState('Emergency part delivery delay');

  const openRescheduleModal = (appt) => {
    setSelectedAppt(appt);
    setRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = () => {
    if (!selectedAppt) return;
    setAppointments(prev =>
      prev.map(a =>
        a.id === selectedAppt.id
          ? { ...a, date: newDate, timeSlot: newSlot, status: 'Reschedule Pending Approval' }
          : a
      )
    );
    setRescheduleModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F4F1EA] via-[#F8F6F0] to-[#F4F1EA] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border border-slate-200 dark:border-[#A4A77E]/30 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7E8056] dark:text-[#C2B59B] block">
              Shift Allocation
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Schedule &amp; Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Manage your assigned installation shifts, review 24/7 dispatch time slots, and reschedule slots in-app.
            </p>
            <div className="pt-2">
              <Link
                to="/contractor/rfid"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7E8056] hover:bg-[#6e7049] text-white font-semibold text-xs shadow-md transition-colors"
              >
                <Radio className="w-4 h-4 text-white" />
                <span>Open RFID Scanner Demo →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Rescheduling Risk Warning Banner per PDF Page 5:
            "Rescheduling must be done in-app if a technician cannot fulfill a time slot, with the risk of losing the assignment." */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-300 font-semibold mb-0.5">
              Notice regarding contractor scheduling controls:
            </strong>
            <span>
              Rescheduling must be completed directly in-app if a technician cannot fulfill an assigned time slot. Please note: requesting a reschedule carries the risk of losing the assignment to another nearby certified contractor to protect customer SLA compliance.
            </span>
          </div>
        </div>

        {/* Shift Calendar & 8 Time Slots Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" /> Shift Calendar
              </h2>
              <button
                type="button"
                onClick={() => setSelectedShiftDate('all')}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                  selectedShiftDate === 'all'
                    ? 'bg-[#7E8056] text-white'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                }`}
              >
                All Dates
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {shiftDates.map((d) => {
                const isSelected = selectedShiftDate === d.date;
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedShiftDate(isSelected ? 'all' : d.date)}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-[#7E8056] text-white border-slate-900 dark:border-[#7E8056] shadow-sm'
                        : 'bg-[#FAF7F2] dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#7E8056]/50'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase block opacity-75">{d.day}</span>
                    <span className="text-base font-bold font-mono">{d.num}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" /> Time Slots (8 Shifts)
              </h2>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">24/7 Dispatch</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const assigned = appointments.find(
                  (a) =>
                    a.timeSlot === slot &&
                    (selectedShiftDate === 'all' || a.date === selectedShiftDate)
                );
                return (
                  <div
                    key={slot}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      assigned
                        ? 'bg-[#7E8056]/10 border-[#7E8056] text-slate-900 dark:text-white'
                        : 'bg-[#FAF7F2] dark:bg-black/40 border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-mono font-bold text-[11px] flex items-center justify-between gap-1">
                      <span>{slot}</span>
                      {assigned && <CheckCircle2 className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#A4A77E] flex-shrink-0" />}
                    </div>
                    <span className="text-[10px] block mt-0.5 truncate opacity-80">
                      {assigned ? assigned.customer : 'Available'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Assigned Installations Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-[#C2B59B] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" /> Assigned Shifts ({appointments.length})
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">Active Queue</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedShiftDate === 'all'
              ? appointments
              : appointments.filter((a) => a.date === selectedShiftDate)
            ).map((appt) => (
              <div
                key={appt.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200/90 dark:border-white/10 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-xl hover:border-[#7E8056]/50 dark:hover:border-white/20 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                      ID: {appt.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      appt.status.includes('Pending')
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    }`}>
                      {appt.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" /> {appt.customer}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" /> {appt.phone}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#8C7A58] dark:text-[#C2B59B]" /> {appt.address}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/5 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">System:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{appt.system}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Date:</span>
                      <span className="font-mono text-[#7E8056] dark:text-[#A4A77E] font-semibold">{appt.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Time Window:</span>
                      <span className="font-mono text-slate-900 dark:text-white font-semibold">{appt.timeSlot}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-200/70 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400">
                      <strong>Task:</strong> {appt.bayWork}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70 dark:border-white/5">
                  <Link
                    to={`/contractor/rfid?id=${appt.id}&customer=${encodeURIComponent(appt.customer)}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-bold text-xs text-center transition-all"
                  >
                    Start RFID Scan
                  </Link>
                  <button
                    onClick={() => openRescheduleModal(appt)}
                    className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-amber-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                    title="Reschedule shift in-app"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Reschedule Shift</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule History */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200/90 dark:border-white/10 space-y-4 shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Installation Completion & History Log
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Passed Local Mechanical Audits
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20">
                <tr>
                  <th className="py-2.5 px-3">Date Completed</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">System / Bay</th>
                  <th className="py-2.5 px-3">Time Slot</th>
                  <th className="py-2.5 px-3">RFID Audit</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                <tr>
                  <td className="py-3 px-3">2026-11-20</td>
                  <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-white">Kenneth Moore</td>
                  <td className="py-3 px-3 font-sans">3.0 Ton Upflow</td>
                  <td className="py-3 px-3">1 PM – 4 PM</td>
                  <td className="py-3 px-3 text-[#7E8056] dark:text-[#A4A77E]">RFID-NT-9821-C1 [VALID]</td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Approved by Local Mech.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3">2026-11-18</td>
                  <td className="py-3 px-3 font-sans font-medium text-slate-900 dark:text-white">Patricia Gomez</td>
                  <td className="py-3 px-3 font-sans">2.0 Ton Downflow</td>
                  <td className="py-3 px-3">7 AM – 10 AM</td>
                  <td className="py-3 px-3 text-[#7E8056] dark:text-[#A4A77E]">RFID-NT-4412-C2 [VALID]</td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Approved by Local Mech.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Reschedule In-App Workflow Modal */}
        {rescheduleModalOpen && selectedAppt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <div className="bg-[#1C1E22] border border-amber-500/50 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative space-y-4">
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">In-App Rescheduling Workflow</h3>
                  <p className="text-xs text-amber-300">Customer: {selectedAppt.customer}</p>
                </div>
              </div>

              {/* PDF Warning Requirement */}
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
                <strong className="block text-amber-300 mb-1">Warning: Risk of losing assignment</strong>
                Rescheduling must be justified. If the customer requires this original slot, Local Mechanical will automatically reassign this installation to another certified technician in the network.
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">New Proposed Date:</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2 text-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">New 3-Hour Time Slot (PDF Official):</label>
                  <select
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2 text-white outline-none"
                  >
                    {TIME_SLOTS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Reason for Rescheduling:</label>
                  <textarea
                    rows={2}
                    value={rescheduleReason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl p-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <button
                  onClick={() => setRescheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReschedule}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs"
                >
                  Submit Reschedule Request
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
