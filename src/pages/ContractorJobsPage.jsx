import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  MapPin,
  Play,
  RotateCw,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const INITIAL_CONTRACTOR_JOBS = [
  {
    id: 'job-101',
    customer: 'David Sterling',
    title: 'Full Modular System Commissioning & Airflow Balance',
    address: '742 Evergreen Terrace, Springfield, CA 95814',
    date: '2026-10-24',
    timeSlot: '10 AM – 1 PM',
    status: 'Scheduled',
    clearance: 'Cleared',
    system: 'NO-TECH VIVID-400 • 3.0 Ton Upflow',
    notes: 'Verify 2x6 structural sub-base, 80ft line sizing, and complete RFID bus registration.',
  },
  {
    id: 'job-102',
    customer: 'Sarah Jenkins',
    title: 'Scheduled Compartment 3 (Heating & Gas) Inspection',
    address: '1204 Pine Valley Way, Sacramento, CA 95822',
    date: '2026-10-25',
    timeSlot: '1 PM – 4 PM',
    status: 'Upcoming',
    clearance: 'Cleared',
    system: 'NO-TECH VIVID-400 • 4.0 Ton Horizontal',
    notes: 'Perform electronic gas leak check and inspect male/female rear conductor prongs.',
  },
];

export default function ContractorJobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(INITIAL_CONTRACTOR_JOBS);
  const [selectedJob, setSelectedJob] = useState(null);
  const [reportJob, setReportJob] = useState(null);
  const [reportNote, setReportNote] = useState('');

  const handleStartInstallation = (jobId) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'In Progress' } : j))
    );
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!reportJob) return;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === reportJob.id
          ? { ...j, status: 'Completed', notes: reportNote.trim() || j.notes }
          : j
      )
    );
    setReportNote('');
    setReportJob(null);
  };

  const activeCount = jobs.filter((j) => j.status !== 'Completed').length;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-slate-300 dark:border-white/15 bg-white dark:bg-[#181A1D] text-xs font-semibold"
          >
            <Link to="/profile">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              <span>Back to Profile</span>
            </Link>
          </Button>

          <Badge
            variant="outline"
            className="border-[#7E8056]/30 bg-[#7E8056]/10 text-[#7E8056] dark:text-[#C2B59B] text-xs font-semibold"
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            {activeCount} Active
          </Badge>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B] block">
            Assigned Orders • {user?.name || 'Contractor'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            My Jobs
          </h1>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-xl py-0 gap-0"
            >
              <CardHeader className="p-5 pb-3 flex flex-row items-start justify-between gap-3 space-y-0">
                <div className="min-w-0">
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                    {job.customer}
                  </CardTitle>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {job.title}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-semibold flex-shrink-0 ${
                    job.status === 'Completed'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                      : job.status === 'In Progress'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                        : 'border-[#7E8056]/30 bg-[#7E8056]/10 text-[#7E8056] dark:text-[#C2B59B]'
                  }`}
                >
                  {job.status}
                </Badge>
              </CardHeader>

              <CardContent className="p-5 pt-2 space-y-4">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10 space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#A4A77E] flex-shrink-0 mt-0.5" />
                    <span>{job.address}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#A4A77E]" />
                      {job.date} • {job.timeSlot}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> {job.clearance}
                    </span>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex items-center gap-2.5">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleStartInstallation(job.id)}
                    disabled={job.status === 'Completed'}
                    className="flex-1 h-9 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-semibold text-xs"
                  >
                    <Play className="w-3.5 h-3.5 mr-1.5" />
                    <span>
                      {job.status === 'In Progress'
                        ? 'In Progress'
                        : job.status === 'Completed'
                          ? 'Completed'
                          : 'Start Installation'}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setReportJob(job);
                      setReportNote(job.notes);
                    }}
                    className="h-9 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white font-semibold text-xs"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    <span>Report</span>
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJob(job)}
                    className="h-8 rounded-lg border-slate-200 dark:border-white/15 text-xs font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    <span>View Job</span>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg border-slate-200 dark:border-white/15 text-xs font-semibold"
                  >
                    <Link to="/contractor/schedule">
                      <RotateCw className="w-3.5 h-3.5 mr-1.5" />
                      <span>Reschedule</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
            <Card className="bg-white dark:bg-[#181A1D] border-slate-200 dark:border-white/15 rounded-2xl max-w-lg w-full shadow-2xl relative py-0 gap-0">
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <CardHeader className="p-6 pb-3">
                <div className="flex items-center gap-2 text-[#7E8056] dark:text-[#C2B59B] text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>Job Details • #{selectedJob.id}</span>
                </div>
                <CardTitle className="text-lg font-bold font-serif text-slate-900 dark:text-white mt-1">
                  {selectedJob.customer}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/10 space-y-2">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Work Scope</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedJob.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">System</span>
                    <span className="font-mono text-[#7E8056] dark:text-[#A4A77E] font-semibold">{selectedJob.system}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Site Address</span>
                    <span className="text-slate-800 dark:text-slate-200">{selectedJob.address}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Schedule</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {selectedJob.date} • {selectedJob.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Technical Notes</span>
                    <span className="text-slate-600 dark:text-slate-300">{selectedJob.notes}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    asChild
                    size="sm"
                    className="h-8 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold"
                  >
                    <Link to="/contractor/rfid">Open RFID Validation →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Completion Report Modal */}
        {reportJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
            <Card className="bg-white dark:bg-[#181A1D] border-slate-200 dark:border-white/15 rounded-2xl max-w-md w-full shadow-2xl relative py-0 gap-0">
              <button
                type="button"
                onClick={() => setReportJob(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <CardHeader className="p-6 pb-3">
                <CardTitle className="text-base font-bold font-serif text-slate-900 dark:text-white">
                  Submit Job Report — {reportJob.customer}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
                  <textarea
                    rows={3}
                    value={reportNote}
                    onChange={(e) => setReportNote(e.target.value)}
                    placeholder="Enter installation & RFID verification notes..."
                    className="w-full bg-[#FAF7F2] dark:bg-black/40 border border-slate-200 dark:border-white/15 rounded-lg p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-[#7E8056]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setReportJob(null)}
                      className="h-8 px-3 rounded-lg text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs"
                    >
                      Mark Completed
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
}
