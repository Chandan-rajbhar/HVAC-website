import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Bell,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import { TIME_SLOTS } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function ReservationConfirmedPage() {
  const location = useLocation();
  const state = location.state || {};

  const selectedDate = state.selectedDate || '2026-12-15';
  const selectedSlot = state.selectedSlot || TIME_SLOTS[0];
  const selectedRegion = state.selectedRegion || 'Dallas-Fort Worth Metro';
  const smsAlerts = state.smsAlerts !== undefined ? state.smsAlerts : true;
  const emailAlerts = state.emailAlerts !== undefined ? state.emailAlerts : true;

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-10 lg:py-16 transition-colors duration-200">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">

          {/* Main Confirmation Card */}
          <Card className="overflow-hidden border-emerald-200 dark:border-emerald-500/40 bg-white dark:bg-[#181A1D] shadow-lg">
            <div className="p-6 sm:p-10 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-[#16221B] dark:via-[#18241D] dark:to-[#16221B] border-b border-emerald-200/80 dark:border-emerald-500/20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                Installation Appointment Locked!
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                Scheduled for <strong className="text-emerald-700 dark:text-emerald-400">{selectedDate}</strong> during{' '}
                <strong className="text-slate-900 dark:text-white">{selectedSlot}</strong> in{' '}
                <strong className="text-slate-900 dark:text-white">{selectedRegion}</strong>.
              </p>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Appointment Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#A4A77E]" /> Installation Date
                  </span>
                  <p className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white">
                    {selectedDate}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#A4A77E]" /> Arrival Window
                  </span>
                  <p className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white">
                    {selectedSlot}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#A4A77E]" /> Service Territory
                  </span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedRegion}
                  </p>
                </div>
              </div>

              {/* Notification & Compliance Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Dispatch Notifications</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        SMS: {smsAlerts ? 'Enabled' : 'Off'} • Email: {emailAlerts ? 'Enabled' : 'Off'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                    Active
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Local Mechanical Certified</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        4-Bay RFID Commissioning Included
                      </p>
                    </div>
                  </div>
                  <LocalMechanicalLogo className="h-7" showText={false} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                >
                  <Link to="/reservations" className="inline-flex items-center gap-1.5">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Modify Reservation</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="rounded-lg bg-[#7E8056] hover:bg-[#6e7049] text-white text-xs font-semibold shadow-md"
                >
                  <Link to="/manage-contractor" className="inline-flex items-center gap-1.5">
                    <span>Manage My Contractor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
