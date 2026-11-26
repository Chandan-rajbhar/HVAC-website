import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  FileText,
  ArrowRight,
  Lock,
  LogIn
} from 'lucide-react';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import { useAuth } from '../context/AuthContext';
import { DEMO_CONTRACTORS } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function LocalMechanicalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'applications' | 'compliance' | 'performance'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected' | 'under_review'

  // Contractor applications state
  const [applications] = useState([
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

  const filteredApps = statusFilter === 'all'
    ? applications
    : applications.filter(a => a.status === statusFilter);

  return (
    <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 h-[400px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
        {/* Full-Width Panoramic Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/local-mechanical-hero-bg.jpg"
            alt="Rooftop Commercial HVAC Mechanical System"
            className="w-full h-full object-cover object-center"
          />
          {/* Clean uniform dark tint for crisp centered text readability */}
          <div className="absolute inset-0 bg-black/40" />
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
                Local Mechanical
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Approval. Compliance. Quality.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-white leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              Track your Local Mechanical contractor certification application status—check whether your submission is approved, pending, under review, or rejected—along with compliance logs and performance standings.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 flex flex-wrap items-center justify-center gap-2.5"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveTab('dashboard');
                  const el = document.getElementById('local-mech-tabs');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
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

        {user?.role !== 'contractor' ? (
          <Card className="max-w-2xl mx-auto bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/20 shadow-md rounded-2xl">
            <CardContent className="p-8 sm:p-10 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center mx-auto border border-[#7E8056]/25">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                  Authorized Portal Access Required
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
                  Local Mechanical administrative records—including contractor verification applications, license audits, RFID telemetry logs, and performance reviews—are restricted to authorized Contractor accounts.
                </p>
              </div>
              {!user && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button
                    asChild
                    size="sm"
                    className="h-9 px-5 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-xs shadow-sm"
                  >
                    <Link to="/login">
                      <LogIn className="w-3.5 h-3.5 mr-1.5" />
                      <span>Sign In to Continue</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-9 px-5 rounded-lg border-slate-300 dark:border-white/15 text-xs font-semibold"
                  >
                    <Link to="/signup">Create Account</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
        <>
        {/* Navigation Sub-Tabs Bar */}
        <div id="local-mech-tabs" className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 shadow-sm flex flex-wrap gap-2">
          {[
            { id: 'dashboard', label: 'Application Tracking' },
            { id: 'compliance', label: 'Installation Compliance & RFID Logs' },
            { id: 'performance', label: 'Contractor Performance & Reviews' },
          ].map((tab) => (
            <Button
              key={tab.id}
              type="button"
              size="sm"
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className={`h-8 px-3.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#7E8056] hover:bg-[#6e7049] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* ===================== TAB 1: APPROVAL DASHBOARD ===================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">

            {/* 4 Stats Cards (Uniform Light/Dark Theme with shadcn Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <Card
                onClick={() => setStatusFilter('pending')}
                className={`transition-all cursor-pointer ${
                  statusFilter === 'pending'
                    ? 'bg-amber-50 dark:bg-amber-500/15 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 hover:border-slate-300 dark:hover:border-white/40'
                }`}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Pending</span>
                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">12</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Applications awaiting audit</span>
                </CardContent>
              </Card>

              <Card
                onClick={() => setStatusFilter('approved')}
                className={`transition-all cursor-pointer ${
                  statusFilter === 'approved'
                    ? 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 hover:border-slate-300 dark:hover:border-white/40'
                }`}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Approved</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">128</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Certified active contractors</span>
                </CardContent>
              </Card>

              <Card
                onClick={() => setStatusFilter('rejected')}
                className={`transition-all cursor-pointer ${
                  statusFilter === 'rejected'
                    ? 'bg-red-50 dark:bg-red-500/15 border-red-500 ring-1 ring-red-500'
                    : 'bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 hover:border-slate-300 dark:hover:border-white/40'
                }`}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Rejected</span>
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">8</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Deficiencies uncorrected</span>
                </CardContent>
              </Card>

              <Card
                onClick={() => setStatusFilter('under_review')}
                className={`transition-all cursor-pointer ${
                  statusFilter === 'under_review'
                    ? 'bg-[#7E8056]/10 dark:bg-[#C2B59B]/15 border-[#7E8056] dark:border-[#C2B59B] ring-1 ring-[#7E8056] dark:ring-[#C2B59B]'
                    : 'bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 hover:border-slate-300 dark:hover:border-white/40'
                }`}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#C2B59B]">Under Review</span>
                    <AlertTriangle className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-2">14</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Additional training or docs</span>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contractor Applications Table (shadcn Card + Table + Select + Badge + Button) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
            <Card className="bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Contractor Application Tracking ({filteredApps.length})
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Filter:</span>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-8 w-[170px] text-xs rounded-lg">
                      <SelectValue placeholder="All Applications" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader className="bg-slate-50 dark:bg-black/25">
                  <TableRow>
                    <TableHead>Contractor / Business</TableHead>
                    <TableHead>State License</TableHead>
                    <TableHead>EPA 608 Universal</TableHead>
                    <TableHead>Insurance (COI)</TableHead>
                    <TableHead>Quiz Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <span className="font-bold text-slate-900 dark:text-white block">{app.name}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{app.company}</span>
                      </TableCell>
                      <TableCell className="font-mono text-[11px] text-slate-700 dark:text-slate-300">{app.license}</TableCell>
                      <TableCell className="font-mono text-[11px] text-slate-700 dark:text-slate-300">{app.epaCert}</TableCell>
                      <TableCell className="text-slate-700 dark:text-slate-300">{app.insurance}</TableCell>
                      <TableCell className="font-mono text-[11px] text-[#7E8056] dark:text-[#A4A77E] font-bold">{app.score}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            app.status === 'approved'
                              ? 'success'
                              : app.status === 'pending'
                                ? 'warning'
                                : app.status === 'under_review'
                                  ? 'secondary'
                                  : 'destructive'
                          }
                        >
                          {app.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            </motion.div>

          </div>
        )}

        {/* ===================== TAB 2: COMPLIANCE & RFID LOGS ===================== */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <Card className="bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-sm overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    RFID Telemetry Scan Logs & Compartment Swaps
                  </h3>
                </div>
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Cryptographically Verified
                </Badge>
              </div>

              <Table>
                <TableHeader className="bg-slate-50 dark:bg-black/25">
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Customer Site</TableHead>
                    <TableHead>Modular Bay</TableHead>
                    <TableHead>RFID Log Hash</TableHead>
                    <TableHead>Pin Continuity</TableHead>
                    <TableHead>QC Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-[11px] text-slate-600 dark:text-slate-300">2026-11-23 14:10:04</TableCell>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">David Vance</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">Preston Hollow, Dallas</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">Bay 01: Inverter Comp.</TableCell>
                    <TableCell className="font-mono text-[11px] text-[#7E8056] dark:text-[#A4A77E]">0x7F89B...NT9821</TableCell>
                    <TableCell className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">PASSED [100%]</TableCell>
                    <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">Approved by Local Mech.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-[11px] text-slate-600 dark:text-slate-300">2026-11-22 11:24:19</TableCell>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">Elena Rostova</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">Round Rock, Austin</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">Bay 02: ECM Blower</TableCell>
                    <TableCell className="font-mono text-[11px] text-[#7E8056] dark:text-[#A4A77E]">0x4C12E...NT4412</TableCell>
                    <TableCell className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">PASSED [100%]</TableCell>
                    <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">Approved by Local Mech.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-[11px] text-slate-600 dark:text-slate-300">2026-11-20 09:42:55</TableCell>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">Marcus Holloway</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">Woodlands, Houston</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">Bay 03: Microchannel</TableCell>
                    <TableCell className="font-mono text-[11px] text-[#7E8056] dark:text-[#A4A77E]">0x9910D...NT3190</TableCell>
                    <TableCell className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">PASSED [100%]</TableCell>
                    <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">Approved by Local Mech.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            {/* Quality Compliance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#A4A77E]">
                    Code Enforcement Standards
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>2'x6' wood or equivalent steel foundation sub-base verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>80-ft line sizing compliance (3/4" to 7/8" and 7/8" to 1" copper)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Electronic gas detector leak test mandatory before reactivation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>Male/female conductor pin physical continuity audit</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A58] dark:text-[#C2B59B]">
                    Flagged Service Issues & Corrective Actions
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Contractors who fail to meet service standards or incur repeated installation defects are placed under review for mandatory retraining or removed from the approved roster.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
                    Current flagged deficiency rate: <strong className="text-slate-900 dark:text-white">0.3%</strong> across 1,840 global installations.
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        )}

        {/* ===================== TAB 3: PERFORMANCE & REVIEWS ===================== */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <Card className="bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#7E8056] dark:text-[#C2B59B]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Contractor Performance Rankings & Customer Reviews
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs sm:text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>4.8 / 5.0 Network Average</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {DEMO_CONTRACTORS.map((c, idx) => (
                    <Card key={c.id} className="bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 shadow-none">
                      <CardContent className="p-4 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <Badge>Rank #{idx + 1}</Badge>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{c.status}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-white/10" />
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{c.name}</h4>
                            <p className="text-[11px] text-[#7E8056] dark:text-[#C2B59B] truncate">{c.company}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-white/10">
                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {c.rating}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">{c.completedInstalls} installs</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        </>
        )}

      </motion.div>
    </div>
  );
}
