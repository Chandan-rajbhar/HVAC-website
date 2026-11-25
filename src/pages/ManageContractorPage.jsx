import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Star,
  ShieldCheck,
  UserX,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  X
} from 'lucide-react';
import { DEMO_CONTRACTORS } from '../data/mockData';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../components/ui/table';

export default function ManageContractorPage() {
  const [contractorsList] = useState(DEMO_CONTRACTORS);
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
    const report = {
      id: `fb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      previousTech: `${assignedContractor.name} (${assignedContractor.company})`,
      reason: feedbackReason,
      notes: feedbackNotes,
      status: 'Delivered to Contractor & Local Mechanical'
    };
    setFeedbackReports(prev => [report, ...prev]);
    setFeedbackSubmitted(true);
    setUnselectModalOpen(false);
  };

  const handleSelectNewContractor = (newId) => {
    setAssignedContractorId(newId);
    setFeedbackSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 h-[400px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
        {/* Full-Width Panoramic Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/manage-contractor-hero.jpg"
            alt="Certified HVAC Specialist Inspecting Modular System"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Centered Hero Content Container */}
        <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 flex flex-col items-center">
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Manage My Contractor
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Certified Technicians. Local Compliance.
              </p>
            </div>

            <p className="text-sm sm:text-base text-white leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Review your assigned certified technician, view verified ratings, or switch to another Local Mechanical approved contractor.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
              <Button
                asChild
                size="sm"
                className="h-9 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] text-white font-semibold text-xs shadow-md transition-all"
              >
                <Link to="/reservations">
                  <span>Reservations Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-6">

        {/* Feedback Submitted Confirmation Alert */}
        {feedbackSubmitted && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>
                Feedback report recorded. Please select a new certified contractor from the available network below.
              </span>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px]"
            >
              Local Mechanical QC Copied
            </Badge>
          </div>
        )}

        {/* ===================== CURRENTLY ASSIGNED CONTRACTOR CARD ===================== */}
        <Card className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-2xl overflow-hidden py-0 gap-0">
          <CardHeader className="px-6 py-5 bg-slate-50/70 dark:bg-[#1F2226] border-b border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7E8056] dark:text-[#A4A77E] block">
                Primary Assigned Technician
              </span>
              <CardTitle className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white mt-0.5">
                {assignedContractor.name}
              </CardTitle>
              <CardDescription className="text-xs text-[#8C7A58] dark:text-[#C2B59B] font-semibold">
                {assignedContractor.company}
              </CardDescription>
            </div>

            {/* Verified and approved by Local Mechanical badge */}
            <div className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#141619] border border-slate-200/90 dark:border-[#A4A77E]/30 flex items-center gap-3 shadow-2xs">
              <LocalMechanicalLogo className="h-9" />
              <div className="text-right">
                <span className="text-[9px] text-[#7E8056] dark:text-[#A4A77E] uppercase font-bold tracking-wider block">
                  Official Status
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved by Local Mechanical
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Avatar & Fast Stats */}
              <div className="md:col-span-3 flex flex-col items-center text-center space-y-2.5">
                <img
                  src={assignedContractor.avatar}
                  alt={assignedContractor.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-[#7E8056] dark:border-[#A4A77E] shadow-md"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-1 text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>{assignedContractor.rating}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                      ({assignedContractor.reviewsCount} reviews)
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold"
                  >
                    {assignedContractor.completedInstalls} Completed Modular Installs
                  </Badge>
                </div>
              </div>

              {/* Bio & Credentials */}
              <div className="md:col-span-6 space-y-3 text-xs">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{assignedContractor.bio}"
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/5">
                    <span className="text-slate-500 block text-[10px]">State License</span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">{assignedContractor.license}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/5">
                    <span className="text-slate-500 block text-[10px]">EPA 608 Universal</span>
                    <span className="font-mono font-semibold text-[#7E8056] dark:text-[#A4A77E]">{assignedContractor.epaCert}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/5">
                    <span className="text-slate-500 block text-[10px]">Territory Base</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{assignedContractor.location}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/5">
                    <span className="text-slate-500 block text-[10px]">Insurance Active Through</span>
                    <span className="font-mono font-semibold text-[#8C7A58] dark:text-[#C2B59B]">{assignedContractor.insuranceExpires}</span>
                  </div>
                </div>
              </div>

              {/* Customer Actions */}
              <div className="md:col-span-3 space-y-2.5 flex flex-col items-center justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleUnselect}
                  className="h-8 px-3.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold text-xs border-red-500/30"
                >
                  <UserX className="w-3.5 h-3.5 mr-1.5" />
                  <span>Unselect Contractor</span>
                </Button>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed max-w-[240px]">
                  Dissatisfied or need different availability? Unselect and choose another certified provider at zero penalty.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===================== SELECT ANOTHER AVAILABLE CONTRACTOR ===================== */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                Available Certified Contractors in Your Territory
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                All candidates carry active EPA Universal certification and Local Mechanical verified standing.
              </p>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-[#7E8056]/30 bg-[#7E8056]/10 text-[#7E8056] dark:text-[#C2B59B] text-xs font-semibold"
            >
              {availableContractors.length} Verified Alternatives
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {availableContractors.map((c) => (
              <Card
                key={c.id}
                className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-xl hover:border-[#7E8056]/60 dark:hover:border-[#A4A77E]/50 transition-all py-0 gap-0"
              >
                <CardContent className="p-5 space-y-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#7E8056]/60 dark:border-[#A4A77E]"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{c.name}</h4>
                      <p className="text-[11px] text-[#8C7A58] dark:text-[#C2B59B] font-medium truncate">{c.company}</p>
                      <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span className="font-bold">{c.rating}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">({c.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {c.bio}
                  </p>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-black/40 border border-slate-200/70 dark:border-white/5 text-[11px] space-y-1.5">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>License:</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">{c.license}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Area:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{c.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 pt-1.5 border-t border-slate-200/70 dark:border-white/5 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified by Local Mechanical</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-5 pb-5 pt-0">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleSelectNewContractor(c.id)}
                    className="w-full h-8 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-semibold text-xs shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                    <span>Select This Contractor</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* ===================== CONTRACTOR FEEDBACK REPORTS (SHADCN TABLE) ===================== */}
        <Card className="rounded-2xl bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-xl overflow-hidden py-0 gap-0">
          <CardHeader className="px-6 py-4 bg-slate-50/70 dark:bg-[#1F2226] border-b border-slate-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 space-y-0">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" />
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Contractor Removal &amp; Feedback Reports (PDF Log)
              </CardTitle>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-medium"
            >
              Transparency &amp; Continuous Improvement
            </Badge>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FAF7F2]/80 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/[0.08]">
                  <TableHead className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400">Report ID</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400">Technician / Company</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400">Reason</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400">Customer Notes</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400">Date</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbackReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="border-slate-200/70 dark:border-white/[0.06] hover:bg-slate-50/80 dark:hover:bg-white/[0.02]"
                  >
                    <TableCell className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      #{report.id}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-slate-900 dark:text-white">
                      {report.previousTech}
                    </TableCell>
                    <TableCell className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                      {report.reason}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600 dark:text-slate-400 italic max-w-xs">
                      "{report.notes}"
                    </TableCell>
                    <TableCell className="font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {report.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold"
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ===================== UNSELECT FEEDBACK MODAL ===================== */}
        {unselectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
            <Card className="bg-white dark:bg-[#1C1E22] border-red-500/30 rounded-2xl max-w-lg w-full text-slate-900 dark:text-slate-100 shadow-2xl relative py-0 gap-0">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setUnselectModalOpen(false)}
                className="absolute top-3.5 right-3.5 h-7 w-7 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>

              <CardHeader className="p-6 pb-3 flex flex-row items-center gap-3 space-y-0">
                <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                  <UserX className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                    Unselect Current Contractor
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                    {assignedContractor.name} ({assignedContractor.company})
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-2 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  To maintain service quality and help technicians improve, contractors receive a feedback report outlining why they were unselected.
                </p>

                <form onSubmit={handleConfirmUnselect} className="space-y-3.5 text-xs">
                  <div className="space-y-1.5">
                    <Label>Select Primary Reason</Label>
                    <Select value={feedbackReason} onValueChange={setFeedbackReason}>
                      <SelectTrigger className="w-full h-9 bg-[#FAF7F2] dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scheduling conflict / requested different time window">
                          Scheduling conflict / requested different time window
                        </SelectItem>
                        <SelectItem value="Slow communication / response time">
                          Slow communication / response time
                        </SelectItem>
                        <SelectItem value="Customer preferred a different certified specialist">
                          Customer preferred a different certified specialist
                        </SelectItem>
                        <SelectItem value="Workmanship or site cleanliness concern">
                          Workmanship or site cleanliness concern
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Additional Feedback Comments</Label>
                    <textarea
                      rows={3}
                      value={feedbackNotes}
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                      placeholder="Provide constructive feedback for the contractor..."
                      className="w-full bg-[#FAF7F2] dark:bg-black/50 border border-slate-200 dark:border-white/15 focus:border-[#7E8056] dark:focus:border-[#A4A77E] rounded-lg p-3 text-xs text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/10">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setUnselectModalOpen(false)}
                      className="h-8 px-3.5 rounded-lg text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs"
                    >
                      Submit Report &amp; Switch Contractor
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
