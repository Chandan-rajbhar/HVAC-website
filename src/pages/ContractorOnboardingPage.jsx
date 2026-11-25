import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HardHat,
  Upload,
  FileCheck,
  CheckCircle2,
  Play,
  Award,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  ShieldCheck,
  Check,
  Eye,
  Radio,
  ArrowRight
} from 'lucide-react';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import { CONTRACTOR_QUESTIONNAIRE } from '../data/mockData';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

export default function ContractorOnboardingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state || {};

  // Form State (empty by default for clean user input)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  // Simple Document Upload State
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [licenseDoc, setLicenseDoc] = useState('Verified');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Video Training State
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Questionnaire State (synced if returning from /contractor/quiz)
  const [quizSubmitted, setQuizSubmitted] = useState(Boolean(navState.quizSubmitted));
  const [quizScore, setQuizScore] = useState(navState.quizScore || 0);

  const handleDocUpload = (type) => {
    // Demo document upload simulation
    if (type === 'epa') setEpaDoc('EPA_608_Universal_Uploaded.pdf');
    if (type === 'license') setLicenseDoc('State_License_Uploaded.pdf');
    if (type === 'insurance') setInsuranceDoc('COI_Local_Mechanical_Uploaded.pdf');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleSelectAnswer = (qId, optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    CONTRACTOR_QUESTIONNAIRE.forEach((q) => {
      const selectedOptIdx = userAnswers[q.id];
      if (selectedOptIdx !== undefined && q.options[selectedOptIdx]?.isCorrect) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const isApproved = formSubmitted && videoWatched && quizSubmitted && quizScore >= 8;

  return (
    <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 h-[400px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
        {/* Full-Width Panoramic Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/contractor-hero-tech.jpg"
            alt="Contractor Technician with No-Tech Systems uniform"
            className="w-full h-full object-cover object-center"
          />
          {/* Clean uniform dark tint for crisp centered text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Centered Hero Content Container */}
        <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 flex flex-col items-center">
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Contractor Onboarding
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Join Our Trusted Network.
              </p>
            </div>

            <p className="text-sm sm:text-base text-white leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Complete your certification and training to become an approved contractor certified by Local Mechanical.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="#registration-form"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Start Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">

        {/* Global Onboarding Approval Status Banner */}
        {isApproved && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#162419] to-emerald-950/80 border-2 border-emerald-500 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-4">
              <LocalMechanicalLogo className="h-14" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-serif">
                    Approved by Local Mechanical
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-black text-xs font-bold uppercase">
                    Certified Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  License: {licenseDoc} | Score: {quizScore}/10 (100%) | EPA Verified | Insurance Active
                </p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                  Technician status listed in the Local Mechanical global registry.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/contractor/schedule"
                className="px-5 py-2.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-xs shadow-md"
              >
                Contractor Schedule →
              </Link>
              <Link
                to="/contractor/rfid"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15"
              >
                RFID Scanner Demo →
              </Link>
            </div>
          </div>
        )}

        {/* ===================== MAIN 2-COLUMN ONBOARDING INTERFACE ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Simple shadcn Registration Form & Uploads */}
          <div id="registration-form" className="lg:col-span-7 space-y-6">

            <Card className="bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-sm">
              <CardContent className="p-5 sm:p-6 space-y-5">

                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" />
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Contractor Registration</h2>
                  </div>
                  <span className="text-[11px] text-[#8C7A58] dark:text-[#C2B59B] font-medium">Verification Form</span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="businessAddress">Business Address *</Label>
                      <Input
                        id="businessAddress"
                        type="text"
                        required
                        placeholder="Enter business address"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="shippingAddress">Shipping Address (for modular bay deliveries) *</Label>
                      <Input
                        id="shippingAddress"
                        type="text"
                        required
                        placeholder="Enter shipping address"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Simple File Upload Option */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-white/10">
                    <Label htmlFor="contractorDocs">Upload Document (PDF / Image)</Label>
                    <Input
                      id="contractorDocs"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedFileName(file.name);
                          setLicenseDoc(file.name);
                        }
                      }}
                      className="cursor-pointer file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:bg-[#7E8056]/15 file:text-[#555845] dark:file:bg-[#A4A77E]/20 dark:file:text-[#C2B59B] file:font-semibold"
                    />
                    {uploadedFileName && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        Selected: {uploadedFileName}
                      </p>
                    )}
                  </div>

                  <div className="pt-1 flex justify-end">
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-semibold text-xs shadow-sm transition-all"
                    >
                      <span>{formSubmitted ? 'Documentation Submitted ✓' : 'Submit Application →'}</span>
                    </Button>
                  </div>
                </form>

              </CardContent>
            </Card>

          </div>

          {/* Right Column: Video Training & 10-Question Questionnaire */}
          <div className="lg:col-span-5 space-y-6">

            {/* Required Video Training Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121315] border border-slate-200/90 dark:border-white/25 space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#7E8056]/15 text-[#7E8056] dark:text-[#C2B59B]">
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Video Training
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Installation & Servicing Protocol
                    </p>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#7E8056]/10 border border-[#7E8056]/25 text-[#7E8056] dark:text-[#C2B59B] font-semibold">
                  Required
                </span>
              </div>

              {/* Real Interactive HVAC Training Video Player */}
              <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-200 dark:border-white/15 overflow-hidden shadow-md">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/demo-interactive-aura-unit.jpg"
                  onEnded={() => setVideoWatched(true)}
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/hero-background-video.mp4" type="video/mp4" />
                  <source src="/videos/gemini_generated_hero.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  Complete training before proceeding to questionnaire.
                </span>
                <button
                  type="button"
                  onClick={() => setVideoWatched(true)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${videoWatched
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#7E8056] hover:bg-[#6c6e49] text-white shadow-sm'
                    }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{videoWatched ? 'Training Completed ✓' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>

          </div >

        </div >

        {/* ===================== EXPANDED FULL-WIDTH INSTALLATION QUESTIONNAIRE CARD ===================== */}
        < Card className="w-full bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-sm" >
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

              {/* Left: Header, Description & Exam Topics */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E]">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                        Installation Questionnaire
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Local Mechanical Technical Certification Exam
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#7E8056]/15 dark:bg-[#A4A77E]/20 text-[#555845] dark:text-[#C2B59B] font-semibold">
                    10 Technical Questions
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Covers structural sub-base requirements, 80ft line sizing, gas detector leak checks, male/female conductor inspection, and RFID app logging per the PDF.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
                  {[
                    "2'x6' Sub-Base Framing",
                    "80ft Line Sizing Rules",
                    "Gas Leak & Pin Checks",
                    "RFID App Validation"
                  ].map((topic) => (
                    <div
                      key={topic}
                      className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7E8056] dark:text-[#A4A77E] flex-shrink-0" />
                      <span className="truncate">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Passing Requirement / Score & Action Button */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-4 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/10">
                {quizSubmitted ? (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">Your Score:</span>
                      <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{quizScore} / 10 ({quizScore * 10}%)</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {quizScore >= 8 ? 'Congratulations! You passed the Local Mechanical technical exam.' : 'Score below 80%. Review PDF materials and retake.'}
                    </p>
                    <button
                      onClick={() => navigate('/contractor/quiz', {
                        state: {
                          reviewMode: true,
                          quizScore,
                          userAnswers: navState.userAnswers || {},
                        },
                      })}
                      className="mt-1 text-xs text-[#7E8056] dark:text-[#A4A77E] underline font-semibold block cursor-pointer"
                    >
                      Review Answers & Explanations
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white block">Certification Requirement</span>
                    <p>
                      Passing score: <strong className="text-slate-800 dark:text-slate-200">8/10 (80%)</strong>. Unlimited practice attempts.
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => navigate('/contractor/quiz')}
                    className="h-8 px-4 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-semibold text-xs shadow-sm transition-all inline-flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{quizSubmitted ? 'Retake Quiz' : 'Start Quiz →'}</span>
                  </Button>
                </div>
              </div>

            </div>
          </CardContent>
        </Card >

        {/* ===================== VIDEO TRAINING MODAL ===================== */}
        {
          videoModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
              <div className="bg-[#1C1E22] border border-[#A4A77E]/50 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative">
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold font-serif mb-1">Local Mechanical Required Training</h3>
                <p className="text-xs text-[#C2B59B] mb-4">Module 1: Modular Handling & Safety Swapping Protocols</p>

                {/* Video Player Display */}
                <div className="relative aspect-video rounded-xl bg-black border border-white/15 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#A4A77E]/20 text-[#A4A77E] border-2 border-[#A4A77E] flex items-center justify-center mb-3 animate-pulse">
                    <Play className="w-8 h-8 fill-[#A4A77E] ml-1" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Technician Installation & Servicing Stream
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    Training video on 2'x6' structural framing, conductor pin safety inspection, and RFID validation steps.
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Duration: 12 minutes</span>
                  <button
                    onClick={() => {
                      setVideoWatched(true);
                      setVideoModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-xs"
                  >
                    Complete Training & Proceed
                  </button>
                </div>
              </div>
            </div>
          )
        }

      </div >
    </div >
  );
}
