import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ChevronLeft,
  X,
  Lock,
  LogIn
} from 'lucide-react';
import { TIME_SLOTS, COMPARTMENTS } from '../data/mockData';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import { useAuth } from '../context/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function ReservationsPage() {
  const { user } = useAuth();
  const isContractor = user?.role === 'contractor';
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2026-12-15');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [selectedRegion, setSelectedRegion] = useState('Dallas-Fort Worth Metro');
  const [activeRFIDBay, setActiveRFIDBay] = useState(1);
  const [scheduleUpdatedMsg, setScheduleUpdatedMsg] = useState('');

  // Contractor Shift Calendar & Reschedule Modal state
  const shiftDates = [
    { day: 'WED', num: '16', label: 'Dec 16, 2026' },
    { day: 'FRI', num: '18', label: 'Dec 18, 2026' },
    { day: 'MON', num: '21', label: 'Dec 21, 2026' },
    { day: 'WED', num: '23', label: 'Dec 23, 2026' },
    { day: 'FRI', num: '25', label: 'Dec 25, 2026' },
  ];
  const [selectedShiftDate, setSelectedShiftDate] = useState('all');
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('2026-12-23');
  const [rescheduleSlot, setRescheduleSlot] = useState(TIME_SLOTS[1]);

  const openRescheduleModal = (appt) => {
    setSelectedAppt(appt);
    setRescheduleSlot(appt.time || TIME_SLOTS[0]);
    setRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!selectedAppt) return;
    const formattedDate = new Date(`${rescheduleDate}T12:00:00`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const updated = upcomingAppointments.map((a) =>
      a.id === selectedAppt.id
        ? { ...a, date: formattedDate, time: rescheduleSlot, status: 'Rescheduled' }
        : a
    );
    setUpcomingAppointments(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    setScheduleUpdatedMsg(`Shift for ${selectedAppt.customer.split('•')[0].trim()} rescheduled to ${formattedDate} (${rescheduleSlot}).`);
    setRescheduleModalOpen(false);
  };

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

  const storageKey = isContractor
    ? `notech_contractor_schedule_${user?.email || 'contractor'}`
    : `notech_customer_reservations_${user?.email || 'guest'}`;

  const [upcomingAppointments, setUpcomingAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    if (isContractor) {
      return [
        {
          id: 'c-apt-1',
          date: 'Dec 16, 2026',
          time: '10 AM – 1 PM',
          customer: 'Robert Chen • 7721 Preston Hollow Way, Dallas, TX',
          status: 'Assigned',
          bay: 'New System Install & Initial Commissioning (3.0 Ton)',
        },
        {
          id: 'c-apt-2',
          date: 'Dec 18, 2026',
          time: '1 PM – 4 PM',
          customer: 'Sarah Montgomery • 4105 River Crest Dr, Fort Worth, TX',
          status: 'Assigned',
          bay: 'Bay 02 ECM Blower Hot-Swap (4.0 Ton)',
        },
        {
          id: 'c-apt-3',
          date: 'Dec 21, 2026',
          time: '7 AM – 10 AM',
          customer: 'Michael Lawson • 1903 Legacy Dr, Plano, TX',
          status: 'Confirmed',
          bay: 'Bay 03 Microchannel Valve Inspection (2.5 Ton)',
        },
      ];
    }
    return [
      {
        id: 'apt-1',
        date: 'Dec 15, 2026',
        time: '10 AM – 1 PM',
        customer: user?.name || 'Your Installation',
        status: 'Confirmed',
        bay: 'All 4 Modular Bays • Dallas-Fort Worth Metro',
      },
    ];
  });

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    const formattedDate = new Date(`${selectedDate}T12:00:00`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const newReservation = {
      id: `apt-${Date.now()}`,
      date: formattedDate,
      time: selectedSlot,
      customer: isContractor
        ? `${user?.name || 'Contractor'} • Assigned Dispatch Block`
        : user?.name || 'Your Installation',
      status: isContractor ? 'Scheduled' : 'Confirmed',
      bay: isContractor
        ? `Available Dispatch Slot • ${selectedRegion}`
        : `All 4 Modular Bays • ${selectedRegion}`,
    };
    const updated = [newReservation, ...upcomingAppointments];
    setUpcomingAppointments(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    if (isContractor) {
      setScheduleUpdatedMsg(`Dispatch slot added for ${formattedDate} (${selectedSlot}) in ${selectedRegion}.`);
      return;
    }
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

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 flex items-center justify-center px-4 py-12 transition-colors duration-200">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#FAF7F2] dark:bg-[#181A1D] border border-slate-200 dark:border-white/15 shadow-lg text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center mx-auto border border-[#7E8056]/25">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
              Customer Login Required
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Please sign in or create a Customer account to view and manage installation reservations.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-5 py-2.5 rounded-lg border border-slate-300 dark:border-white/20 text-xs font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                {isContractor ? 'My Schedule & Dispatch' : 'Reservations & Scheduling'}
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {isContractor ? 'Assigned Installations. Dispatch Windows.' : "Choose Your Date. We'll Handle the Rest."}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-white leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              {isContractor
                ? 'View your upcoming assigned customer installations, manage your 3-hour dispatch windows, and track territory availability.'
                : 'Schedule your installation with ease and track your reservation status across our certified Local Mechanical contractor network.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 flex flex-wrap items-center justify-center gap-2.5"
            >
              <a
                href="#schedule-form"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Schedule Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8"
      >

        {/* ===================== MAIN SCHEDULING & DASHBOARD GRID ===================== */}
        <div id="schedule-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Date & Exact 8 PDF Time Slots */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
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
              {isContractor && scheduleUpdatedMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>{scheduleUpdatedMsg}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleConfirmReservation}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#7E8056] hover:bg-[#6e7049] text-white font-bold text-sm shadow-md transition-all"
                >
                  {isContractor ? 'Add Dispatch Slot →' : 'Confirm Reservation →'}
                </button>
              </div>

            </div>

            {/* Contractor Shift Calendar (Contractor Only) */}
            {isContractor && (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" /> Shift Calendar
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedShiftDate('all')}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                      selectedShiftDate === 'all'
                        ? 'bg-[#7E8056] text-white'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    All Shifts
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {shiftDates.map((d) => {
                    const active = selectedShiftDate === d.label;
                    return (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => setSelectedShiftDate(active ? 'all' : d.label)}
                        className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          active
                            ? 'bg-slate-900 dark:bg-[#7E8056] text-white border-slate-900 dark:border-[#7E8056] shadow-sm'
                            : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-[#7E8056]/50'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase block opacity-75">{d.day}</span>
                        <span className="text-base font-bold font-mono">{d.num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upcoming Appointments / Assigned Shifts List */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-4 shadow-md">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" />{' '}
                  {isContractor ? `Assigned Shifts (${upcomingAppointments.length})` : 'Upcoming Scheduled Installations'}
                </h3>
                {isContractor && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Active Queue</span>
                )}
              </div>
              <div className="space-y-2.5">
                {(isContractor && selectedShiftDate !== 'all'
                  ? upcomingAppointments.filter((apt) => apt.date === selectedShiftDate)
                  : upcomingAppointments
                ).map((apt) => (
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
                      {isContractor && (
                        <button
                          type="button"
                          onClick={() => openRescheduleModal(apt)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 hover:bg-[#7E8056] hover:text-white hover:border-[#7E8056] text-slate-700 dark:text-slate-200 text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Reschedule</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Reservation Capacity Dashboard & RFID Tracking Demo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >

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

          </motion.div>

        </div>

        {/* ===================== BOTTOM 3 FEATURE BADGES ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-[#7E8056]/20 text-[#7E8056] flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">$200 Reservation Fee</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Locks in your batch number and priority schedule.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8C7A58]/20 text-[#8C7A58] dark:text-[#C2B59B] flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Real-Time Availability</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">8 certified 3-hour slots with contractor dispatch.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.23, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-[#7E8056]/20 text-[#7E8056] flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Automated Reminders</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time alerts on production and dispatch.</p>
            </div>
          </motion.div>
        </div>

        {/* Contractor Reschedule Shift Modal */}
        {isContractor && rescheduleModalOpen && selectedAppt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/15 rounded-2xl max-w-md w-full p-6 text-slate-900 dark:text-slate-100 shadow-2xl relative space-y-4">
              <button
                type="button"
                onClick={() => setRescheduleModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B]">
                  Reschedule Shift
                </span>
                <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white mt-0.5">
                  {selectedAppt.customer}
                </h3>
              </div>
              <form onSubmit={handleConfirmReschedule} className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">New Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    min="2026-11-25"
                    max="2027-04-30"
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-[#7E8056]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">New Time Window</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setRescheduleSlot(slot)}
                        className={`py-2 px-2 rounded-lg border text-[11px] font-semibold cursor-pointer transition-all ${
                          rescheduleSlot === slot
                            ? 'bg-[#7E8056] text-white border-[#7E8056]'
                            : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRescheduleModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/15 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold cursor-pointer"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
