import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function ReservationsPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2026-12-15');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [selectedRegion, setSelectedRegion] = useState('Dallas-Fort Worth Metro');
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
    navigate('/reservations/confirmed', {
      state: {
        selectedDate,
        selectedSlot,
        selectedRegion,
        smsAlerts,
        emailAlerts,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 h-[400px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
        {/* Full-Width Panoramic Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/reservations-hero-calendar.jpg"
            alt="Installation Calendar with Date Circled"
            className="w-full h-full object-cover object-center"
          />
          {/* Light clean tint so the calendar shows clearly while centered text stays readable */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Centered Hero Content Container */}
        <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 flex flex-col items-center">
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Reservations & Scheduling
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Choose Your Date. We'll Handle the Rest.
              </p>
            </div>

            <p className="text-sm sm:text-base text-white leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Schedule your installation with ease and track your reservation status across our certified Local Mechanical contractor network.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="#schedule-form"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Schedule Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">

        {/* ===================== MAIN SCHEDULING & DASHBOARD GRID ===================== */}
        <div id="schedule-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Date & Exact 8 PDF Time Slots */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-6 shadow-md">
              {/* Region Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" /> Select Service Territory:
                </label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select service territory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dallas-Fort Worth Metro">Dallas-Fort Worth Metro (High Availability)</SelectItem>
                    <SelectItem value="Austin / Round Rock Metro">Austin / Round Rock Metro (Filling Fast)</SelectItem>
                    <SelectItem value="Houston Greater Metro">Houston Greater Metro (High Availability)</SelectItem>
                    <SelectItem value="San Antonio Metro">San Antonio Metro (Standard Availability)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" /> Select Installation Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min="2026-11-25"
                    max="2027-04-30"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-mono outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Typical lead time for {selectedRegion} is {currentRegionData.leadDays} business days.
                </p>
              </div>

              {/* Exact 8 Time Slots from PDF Page 5 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" /> Available Time Slots (8 Official Windows):
                  </label>
                  <span className="text-[11px] text-[#7E8056] dark:text-[#A4A77E] font-medium">3-Hour Arrival Windows</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot, index) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${isSelected
                          ? 'bg-[#7E8056] text-white border-[#7E8056] shadow-md scale-[1.02]'
                          : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
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
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B]">
                  <Bell className="w-4 h-4" /> Automated Reminders & Alerts
                </div>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="rounded accent-[#7E8056] w-4 h-4"
                    />
                    <span>Receive real-time technician GPS arrival & dispatch SMS updates</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="rounded accent-[#7E8056] w-4 h-4"
                    />
                    <span>Receive production milestone alerts & Local Mechanical inspection logs</span>
                  </label>
                </div>
              </div>

              {/* Confirmation CTA Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleConfirmReservation}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#7E8056] hover:bg-[#6e7049] text-white font-bold text-sm shadow-md transition-all"
                >
                  Confirm Reservation →
                </button>
              </div>

            </div>

            {/* Upcoming Appointments List */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-4 shadow-md">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" /> Upcoming Scheduled Installations
              </h3>
              <div className="space-y-2.5">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{apt.customer}</span>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">{apt.bay}</span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{apt.date}</span>
                        <span className="text-[11px] text-[#7E8056] dark:text-[#A4A77E]">{apt.time}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
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

            {/* Circular Gauge / Capacity Dashboard matching reference screenshot */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-5 shadow-md text-center">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Reservation Dashboard
                </h3>
                <span className="text-xs text-[#7E8056] dark:text-[#A4A77E] font-medium">{selectedRegion}</span>
              </div>

              {/* Gauge Graphic */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E2E8F0"
                    className="dark:stroke-[#26292E]"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#7E8056"
                    className="dark:stroke-[#A4A77E] transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - currentRegionData.capacity / 100)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
                    {currentRegionData.capacity}%
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Capacity
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Open Slots</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {currentRegionData.slotsLeft} remaining
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Avg Turnaround</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    {currentRegionData.leadDays} Days
                  </span>
                </div>
              </div>

            </div>

            {/* RFID Inventory Status Component */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Live RFID Parts Warehouse Sync
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono">
                  Online
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {COMPARTMENTS.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setActiveRFIDBay(c.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${activeRFIDBay === c.id
                      ? 'bg-[#7E8056]/10 border-[#7E8056] text-slate-900 dark:text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                      }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>Bay 0{c.id}: {c.shortName}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-75">{c.rfidTag}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block">Inventory: In-Stock</span>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400">Swap Cycle: {c.estimatedSwapCycle}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 flex items-center gap-3">
                <LocalMechanicalLogo className="h-8" showText={false} />
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Every RFID scan is cryptographically signed and logged with Local Mechanical quality enforcement.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ===================== BOTTOM 3 FEATURE BADGES ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#7E8056]/20 text-[#7E8056] flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">$200 Reservation Fee</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Locks in your batch number and priority schedule.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#8C7A58]/20 text-[#8C7A58] dark:text-[#C2B59B] flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Real-Time Availability</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">8 certified 3-hour slots with contractor dispatch.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#7E8056]/20 text-[#7E8056] flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Automated Reminders</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time alerts on production and dispatch.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
