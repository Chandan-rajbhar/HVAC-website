import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Bell,
  Radio,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Sparkles,
  Users,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { TIME_SLOTS, COMPARTMENTS } from '../data/mockData';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';

export default function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState('2026-12-15');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [selectedRegion, setSelectedRegion] = useState('Dallas-Fort Worth Metro');
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [activeRFIDBay, setActiveRFIDBay] = useState(1);

  // Automated notification toggles
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Regional capacity data
  const regionCapacities = {
    'Dallas-Fort Worth Metro': { capacity: 75, slotsLeft: 6, leadDays: 14 },
    'Austin / Round Rock Metro': { capacity: 88, slotsLeft: 3, leadDays: 18 },
    'Houston Greater Metro': { capacity: 62, slotsLeft: 11, leadDays: 10 },
    'San Antonio Metro': { capacity: 70, slotsLeft: 8, leadDays: 12 },
  };

  const currentRegionData = regionCapacities[selectedRegion] || regionCapacities['Dallas-Fort Worth Metro'];

  const upcomingAppointments = [
    { id: 'apt-1', date: 'Dec 15, 2026', time: '10 AM – 1 PM', customer: 'David Vance (Apex Precision)', status: 'Confirmed', bay: 'All 4 Modular Bays' },
    { id: 'apt-2', date: 'Dec 17, 2026', time: '1 PM – 4 PM', customer: 'Elena Rostova (Vanguard)', status: 'Dispatch Ready', bay: 'Bay 01 Inverter Swap' },
    { id: 'apt-3', date: 'Dec 21, 2026', time: '7 AM – 10 AM', customer: 'Marcus Holloway (Metro Modular)', status: 'Scheduled', bay: 'Commissioning' },
  ];

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setReservationConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#121315] text-slate-100 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ===================== HERO BANNER ===================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1B1D20] via-[#22252A] to-[#1B1D20] border border-white/10 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4A77E]">
              no-techhvac/reservations.com
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Reservations & Scheduling
            </h1>
            <p className="text-base sm:text-lg text-[#C2B59B] font-semibold">
              Choose Your Date. We'll Handle the Rest.
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule your installation with ease and track your reservation status across our certified Local Mechanical contractor network.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Reservation Fee: <strong className="text-[#A4A77E]">$200 Refundable</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C2B59B]" />
              8 Specific 3-Hour Time Slots
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#A4A77E]" />
              RFID Inventory Tracking Synced
            </span>
          </div>
        </div>

        {/* Confirmation Banner if confirmed */}
        {reservationConfirmed && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-[#18201A] border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Installation Appointment Locked!</h4>
                <p className="text-xs text-slate-300">
                  Scheduled for <strong className="text-emerald-400">{selectedDate}</strong> during <strong className="text-white">{selectedSlot}</strong> in {selectedRegion}.
                </p>
              </div>
            </div>
            <Link
              to="/manage-contractor"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs"
            >
              Manage My Contractor →
            </Link>
          </div>
        )}

        {/* ===================== MAIN SCHEDULING & DASHBOARD GRID ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Date & Exact 8 PDF Time Slots */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-6 shadow-xl">
              
              {/* Region Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#A4A77E]" /> Select Service Territory:
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                >
                  <option value="Dallas-Fort Worth Metro">Dallas-Fort Worth Metro (High Availability)</option>
                  <option value="Austin / Round Rock Metro">Austin / Round Rock Metro (Filling Fast)</option>
                  <option value="Houston Greater Metro">Houston Greater Metro (High Availability)</option>
                  <option value="San Antonio Metro">San Antonio Metro (Standard Availability)</option>
                </select>
              </div>

              {/* Date Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#C2B59B]" /> Select Installation Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min="2026-11-25"
                    max="2027-04-30"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#A4A77E] rounded-xl px-4 py-3 text-sm text-white font-mono outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Typical lead time for {selectedRegion} is {currentRegionData.leadDays} business days.
                </p>
              </div>

              {/* Exact 8 Time Slots from PDF Page 5 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#A4A77E]" /> Available Time Slots (8 Official PDF Windows):
                  </label>
                  <span className="text-[11px] text-[#A4A77E] font-medium">3-Hour Arrival Windows</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot, index) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                          isSelected
                            ? 'bg-[#A4A77E] text-black border-[#A4A77E] shadow-lg ring-2 ring-[#A4A77E]/50 scale-[1.02]'
                            : 'bg-black/40 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="block text-xs">{slot}</span>
                        <span className="text-[9px] opacity-75 font-normal block mt-1">
                          Slot #{index + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Automated Alerts Preferences */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2B59B]">
                  <Bell className="w-4 h-4" /> Automated Reminders & Alerts (PDF Feature)
                </div>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="rounded accent-[#A4A77E] w-4 h-4"
                    />
                    <span>Receive real-time technician GPS arrival & dispatch SMS updates</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="rounded accent-[#A4A77E] w-4 h-4"
                    />
                    <span>Receive production milestone alerts & Local Mechanical inspection logs</span>
                  </label>
                </div>
              </div>

              {/* Confirmation CTA Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleConfirmReservation}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-sm shadow-xl transition-all"
                >
                  Confirm Reservation →
                </button>
              </div>

            </div>

            {/* Upcoming Appointments List */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#C2B59B]" /> Upcoming Scheduled Installations
              </h3>
              <div className="space-y-2.5">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-white block">{apt.customer}</span>
                      <span className="text-slate-400 text-[11px]">{apt.bay}</span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="font-semibold text-slate-200 block">{apt.date}</span>
                        <span className="text-[11px] text-[#A4A77E]">{apt.time}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Reservation Capacity Dashboard & RFID Tracking Demo */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Circular Gauge / Capacity Dashboard as shown in reference screenshot! */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-5 shadow-xl text-center">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Reservation Dashboard
                </h3>
                <span className="text-xs text-[#A4A77E] font-medium">{selectedRegion}</span>
              </div>

              {/* Gauge Graphic */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#26292E"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#A4A77E"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - currentRegionData.capacity / 100)}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-serif text-white">
                    {currentRegionData.capacity}%
                  </span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                    Capacity
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Open Time Slots</span>
                  <span className="text-base font-bold text-[#A4A77E]">{currentRegionData.slotsLeft} Slots</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Avg Turnaround</span>
                  <span className="text-base font-bold text-[#C2B59B]">48 Hours</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Dynamic availability automatically balances regional certified technician loads.
              </p>
            </div>

            {/* RFID Tracking Integration Demo (PDF Page 3) */}
            <div className="p-6 rounded-2xl bg-[#181A1D] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#A4A77E] animate-pulse" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    RFID Tracking Integration
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-[#C2B59B] font-mono">
                  Live Telemetry
                </span>
              </div>

              <p className="text-xs text-slate-300">
                Seamless inventory management tracking available units, modular components, and scheduled swaps before technician dispatch.
              </p>

              {/* 4 RFID Compartments Status */}
              <div className="space-y-2 text-xs">
                {COMPARTMENTS.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setActiveRFIDBay(c.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeRFIDBay === c.id
                        ? 'bg-[#A4A77E]/20 border-[#A4A77E] text-white shadow-md'
                        : 'bg-black/40 border-white/5 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Bay 0{c.id}: {c.shortName}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-75">{c.rfidTag}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-emerald-400 block">Inventory: In-Stock</span>
                      <span className="text-[9px] text-slate-400">Swap Cycle: {c.estimatedSwapCycle}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3">
                <LocalMechanicalLogo className="h-8" showText={false} />
                <p className="text-[11px] text-slate-300">
                  Every RFID scan is cryptographically signed and logged with Local Mechanical quality enforcement.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ===================== BOTTOM 3 FEATURE BADGES ===================== */}
        {/* Exact 3 badges shown at bottom of screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-[#181A1D] border border-white/10 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">$200 Reservation Fee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Locks in your batch number and priority schedule.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#181A1D] border border-white/10 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#C2B59B]/20 text-[#C2B59B] flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Real-Time Availability</h4>
              <p className="text-xs text-slate-400 mt-0.5">8 certified 3-hour slots with contractor dispatch.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#181A1D] border border-white/10 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#A4A77E]/20 text-[#A4A77E] flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Automated Reminders</h4>
              <p className="text-xs text-slate-400 mt-0.5">Real-time alerts on production and dispatch.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
