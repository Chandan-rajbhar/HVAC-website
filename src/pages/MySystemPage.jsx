import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Cpu,
  ShieldCheck,
  Sliders,
  Wrench,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  COMPANION_FACEPLATES,
  fetchSyncedCompanionState,
  loadCompanionState,
  saveCompanionState,
} from '../lib/hvacSync';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export default function MySystemPage() {
  const { user } = useAuth();
  const [hvacState, setHvacState] = useState(() => loadCompanionState());

  useEffect(() => {
    let active = true;
    const syncRemote = async () => {
      const remote = await fetchSyncedCompanionState();
      if (active && remote) {
        setHvacState((prev) => {
          if (remote.updatedAt && prev.updatedAt && remote.updatedAt <= prev.updatedAt) {
            return prev;
          }
          saveCompanionState(remote, { pushRemote: false });
          return remote;
        });
      }
    };
    syncRemote();
    const timer = setInterval(syncRemote, 1500);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const activeFaceplate =
    COMPANION_FACEPLATES.find((f) => f.id === hvacState.faceplateColor) ||
    COMPANION_FACEPLATES[0];

  const formatTemp = (tempF) => {
    if (hvacState.tempUnit === 'C') {
      return `${Math.round(((tempF - 32) * 5) / 9)}°C`;
    }
    return `${Math.round(tempF)}°F`;
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        {/* Top Back Link */}
        <div className="flex items-center justify-between gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-slate-300 dark:border-white/15 bg-white dark:bg-[#181A1D] text-xs font-semibold"
          >
            <Link to="/profile">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Synced • {hvacState.lastSync}
          </Badge>
        </div>

        {/* Purchased System Overview Card */}
        <Card className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_6px_24px_rgba(0,0,0,0.04)] dark:shadow-2xl overflow-hidden py-0 gap-0">
          <CardHeader className="p-6 bg-gradient-to-r from-[#F4F1EA] via-[#F8F6F0] to-[#F4F1EA] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border-b border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#7E8056] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B] block">
                  Purchased System • {user?.name || hvacState.customer?.name}
                </span>
                <CardTitle className="text-xl font-bold font-serif text-slate-900 dark:text-white mt-0.5">
                  {hvacState.model}
                </CardTitle>
                <CardDescription className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  Serial: {hvacState.serialNumber}
                </CardDescription>
              </div>
            </div>

            <Badge className="w-fit bg-[#7E8056] hover:bg-[#7E8056] text-white border-0 text-xs font-semibold">
              {hvacState.power ? 'System Active' : 'Standby'}
            </Badge>
          </CardHeader>

          <CardContent className="p-6 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">System Health</span>
                <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {hvacState.systemHealth}%
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Target / Mode</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white capitalize">
                  {formatTemp(hvacState.targetTemp)} • {hvacState.mode}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Filter Roll</span>
                <span className="text-lg font-bold font-mono text-[#7E8056] dark:text-[#A4A77E]">
                  {hvacState.filterLife}% ({hvacState.seasonsRemaining} seasons)
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Faceplate</span>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="w-4 h-4 rounded-full border border-slate-300 dark:border-white/20 flex-shrink-0"
                    style={{ backgroundColor: activeFaceplate.hex }}
                  />
                  <span className="font-semibold text-slate-900 dark:text-white truncate">
                    {activeFaceplate.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Contractor Summary */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Assigned Certified Contractor
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {hvacState.contractor?.technician} — {hvacState.contractor?.company}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Installed: {hvacState.contractor?.installedDate}
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 px-3.5 rounded-lg border-slate-300 dark:border-white/15 text-xs font-semibold flex-shrink-0"
              >
                <Link to="/manage-contractor">Manage Contractor</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 4 Modular Compartments */}
        <Card className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_6px_24px_rgba(0,0,0,0.04)] dark:shadow-2xl overflow-hidden py-0 gap-0">
          <CardHeader className="px-6 py-4 bg-slate-50/70 dark:bg-[#1F2226] border-b border-slate-200/80 dark:border-white/[0.08] flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" />
              <CardTitle className="text-base font-bold font-serif text-slate-900 dark:text-white">
                Installed Modular Compartments (4)
              </CardTitle>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              4/4 Docked
            </span>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hvacState.compartments.map((comp) => (
                <div
                  key={comp.id}
                  className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10 space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B]">
                        Slot {comp.slot} • {comp.shortName}
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-white mt-0.5">{comp.name}</h3>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px]"
                    >
                      Operational
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{comp.spec}</p>
                  <div className="pt-2 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{comp.lastService}</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" /> Next: {comp.nextDue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
