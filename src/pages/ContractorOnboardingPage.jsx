import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Radio
} from 'lucide-react';
import LocalMechanicalLogo from '../components/common/LocalMechanicalLogo';
import { CONTRACTOR_QUESTIONNAIRE } from '../data/mockData';

export default function ContractorOnboardingPage() {
  // Form State
  const [fullName, setFullName] = useState('Marcus Aurelius Vance');
  const [email, setEmail] = useState('marcus.vance@apexthermal.com');
  const [phone, setPhone] = useState('(214) 882-9901');
  const [businessAddress, setBusinessAddress] = useState('1402 Industrial Pkwy, Suite 400, Dallas, TX 75207');
  const [shippingAddress, setShippingAddress] = useState('1402 Industrial Pkwy, Dock Bay 2, Dallas, TX 75207');

  // Document Uploads State (simulated)
  const [epaDoc, setEpaDoc] = useState('EPA_608_Universal_Cert_Vance.pdf');
  const [licenseDoc, setLicenseDoc] = useState('Texas_TDLR_TACLA_882914E.pdf');
  const [insuranceDoc, setInsuranceDoc] = useState('COI_Listing_Local_Mechanical.pdf');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Video Training State
  const [videoWatched, setVideoWatched] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Questionnaire State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

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
    <div className="min-h-screen bg-white dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ===================== HERO BANNER ===================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F4F1EA] via-[#F8F6F0] to-[#F4F1EA] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border border-slate-200 dark:border-[#A4A77E]/30 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-2xl space-y-2.5">
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                Contractor Onboarding
              </h1>
              <p className="text-base sm:text-lg text-[#8C7A58] dark:text-[#C2B59B] font-semibold">
                Join Our Trusted Network.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Complete your certification and training to become an approved contractor certified by Local Mechanical.
              </p>
              <div className="pt-2">
                <a
                  href="#registration-form"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7E8056] hover:bg-[#6e7049] text-white font-semibold text-xs transition-all shadow-md"
                >
                  <span>Start Application →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Global Onboarding Approval Status Banner */}
        {isApproved ? (
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
        ) : (
          <div className="p-4 rounded-xl bg-white dark:bg-[#1C1E22] border border-slate-200/90 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <LocalMechanicalLogo className="h-7" showText={false} />
              <span>
                <strong className="text-slate-900 dark:text-white">Approval Requirement:</strong> Complete documentation upload, view required video training, and score 80%+ on the 10-question technical questionnaire.
              </span>
            </div>
            <span className="text-[#8C7A58] dark:text-[#C2B59B] font-semibold">
              Step {(!formSubmitted ? '1' : !videoWatched ? '2' : '3')} of 3
            </span>
          </div>
        )}

        {/* ===================== MAIN 2-COLUMN ONBOARDING INTERFACE ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Registration Form & Uploads */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200/90 dark:border-white/[0.08] space-y-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Contractor Registration</h2>
                </div>
                <span className="text-xs text-[#8C7A58] dark:text-[#C2B59B] font-medium">Verification Form</span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] dark:focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] dark:focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] dark:focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-semibold">Business Address *</label>
                    <input
                      type="text"
                      required
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] dark:focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white outline-none transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-slate-700 dark:text-slate-300 font-semibold">Shipping Address (for modular bay deliveries) *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] dark:focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Upload Required Documents Section */}
                <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Upload Required Documents (PDF Specification):
                    </label>
                  </div>

                  {/* 1. EPA Certification Upload */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">EPA Certification</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{epaDoc}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDocUpload('epa')}
                      className="px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
                    >
                      {epaDoc ? 'Replace File' : 'Upload EPA'}
                    </button>
                  </div>

                  {/* 2. State Contractor License Upload */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-[#8C7A58] dark:text-[#C2B59B]" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">State Contractor License</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{licenseDoc}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDocUpload('license')}
                      className="px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
                    >
                      {licenseDoc ? 'Replace File' : 'Upload License'}
                    </button>
                  </div>

                  {/* 3. Certificate of Insurance Upload (Local Mechanical must be listed) */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-[#7E8056] dark:text-[#A4A77E]" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">Certificate of Insurance (COI)</span>
                        <span className="text-[10px] text-[#7E8056] dark:text-[#A4A77E] font-medium">Local Mechanical listed as certificate holder *</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">{insuranceDoc}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDocUpload('insurance')}
                      className="px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors"
                    >
                      {insuranceDoc ? 'Replace File' : 'Upload COI'}
                    </button>
                  </div>

                  {/* Exact message and logo required by PDF Page 5 & Page 7:
                      "Submitting documentation to Local Mechanical for approval…"
                      Position Local Mechanical logo and name near upload boxes */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-black/60 border border-[#7E8056]/40 dark:border-[#A4A77E]/40 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-900 dark:text-slate-200 font-semibold italic">
                        "Submitting documentation to Local Mechanical for approval…"
                      </p>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400">
                        Uploaded credentials undergo automated verification against state licensing boards and EPA Section 608 universal databases.
                      </p>
                    </div>
                    <LocalMechanicalLogo className="h-10" />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-bold text-xs shadow-lg transition-all"
                  >
                    <span>{formSubmitted ? 'Documentation Submitted ✓' : 'Submit Application →'}</span>
                  </button>
                </div>
              </form>

            </div>

          </div>

          {/* Right Column: Video Training & 10-Question Questionnaire */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Required Video Training Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200/90 dark:border-white/[0.08] space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#8C7A58] dark:text-[#C2B59B]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Video Training
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-medium">
                  Required
                </span>
              </div>

              {/* Video Player Preview matching reference screenshot */}
              <div
                onClick={() => setVideoModalOpen(true)}
                className="relative aspect-video rounded-xl bg-black border border-slate-200 dark:border-white/15 overflow-hidden flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
              >
                <img
                  src="/images/slices/contractor-video-thumb.jpg"
                  alt="Training Video Preview"
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#7E8056] dark:bg-[#A4A77E] text-white dark:text-black flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <Play className="w-5 h-5 fill-white dark:fill-black ml-0.5" />
                </div>
                <span className="relative z-10 text-xs font-bold text-white mt-2 drop-shadow">
                  Installation & Servicing Protocol
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  Complete training before proceeding to questionnaire.
                </span>
                <button
                  onClick={() => setVideoWatched(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    videoWatched
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                      : 'bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] text-white dark:text-black dark:hover:bg-[#8e9167]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{videoWatched ? 'Training Completed ✓' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>

            {/* Installation Questionnaire Starter Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200/90 dark:border-white/[0.08] space-y-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#7E8056] dark:text-[#A4A77E]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Installation Questionnaire
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-[#7E8056]/15 dark:bg-[#A4A77E]/20 text-[#6C6F4D] dark:text-[#A4A77E] font-bold">
                  10 Technical Questions
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Covers structural sub-base requirements, 80ft line sizing, gas detector leak checks, male/female conductor inspection, and RFID app logging per the PDF.
              </p>

              {quizSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">Your Score:</span>
                    <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">{quizScore} / 10 ({quizScore * 10}%)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {quizScore >= 8 ? 'Congratulations! You passed the Local Mechanical technical exam.' : 'Score below 80%. Review PDF materials and retake.'}
                  </p>
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizModalOpen(true);
                    }}
                    className="mt-2 text-xs text-[#7E8056] dark:text-[#A4A77E] underline font-semibold block"
                  >
                    Review Answers & Explanations
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400">
                  Passing score: 8/10 (80%). Unlimited practice attempts.
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setQuizModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>{quizSubmitted ? 'Retake Quiz' : 'Start Quiz →'}</span>
                </button>
              </div>
            </div>

            {/* Approved by Local Mechanical Badge Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#141518] border border-slate-200/90 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LocalMechanicalLogo className="h-9" showText={false} />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Approved by Local Mechanical</span>
                  <span className="text-[10px] text-[#7E8056] dark:text-[#A4A77E] font-medium">Direct Regulatory Oversight</span>
                </div>
              </div>
              <Link
                to="/local-mechanical"
                className="text-[11px] text-[#8C7A58] dark:text-[#C2B59B] hover:text-[#6C6F4D] dark:hover:text-white underline font-medium"
              >
                Learn More
              </Link>
            </div>

          </div>

        </div>

        {/* ===================== VIDEO TRAINING MODAL ===================== */}
        {videoModalOpen && (
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
        )}

        {/* ===================== 10-QUESTION QUESTIONNAIRE MODAL ===================== */}
        {quizModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
            <div className="bg-[#181A1D] border border-[#A4A77E]/50 rounded-2xl max-w-3xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[90vh] flex flex-col">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#A4A77E] text-black text-[10px] font-bold uppercase">
                      Local Mechanical Quiz
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Question {currentQIndex + 1} of {CONTRACTOR_QUESTIONNAIRE.length}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-white mt-1">
                    {CONTRACTOR_QUESTIONNAIRE[currentQIndex].topic}
                  </h3>
                </div>

                <button
                  onClick={() => setQuizModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden my-4 border border-white/5">
                <div
                  className="bg-[#A4A77E] h-full transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / CONTRACTOR_QUESTIONNAIRE.length) * 100}%` }}
                />
              </div>

              {/* Question & Options Area */}
              <div className="flex-1 overflow-y-auto space-y-4 py-2">
                <p className="text-sm sm:text-base font-semibold text-slate-200">
                  {CONTRACTOR_QUESTIONNAIRE[currentQIndex].question}
                </p>

                <div className="space-y-2.5">
                  {CONTRACTOR_QUESTIONNAIRE[currentQIndex].options.map((opt, optIdx) => {
                    const isSelected = userAnswers[CONTRACTOR_QUESTIONNAIRE[currentQIndex].id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(CONTRACTOR_QUESTIONNAIRE[currentQIndex].id, optIdx)}
                        className={`w-full p-3.5 rounded-xl text-xs text-left transition-all border flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#A4A77E]/20 border-[#A4A77E] text-white shadow-md ring-1 ring-[#A4A77E]'
                            : 'bg-black/30 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                          isSelected ? 'bg-[#A4A77E] text-black' : 'bg-white/10 text-white'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Show explanation if reviewing submitted quiz */}
                {quizSubmitted && (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#C2B59B] mt-4 space-y-1">
                    <span className="font-bold block uppercase tracking-wider text-[10px] text-[#A4A77E]">
                      Official Technical Rationale (from PDF):
                    </span>
                    <p>{CONTRACTOR_QUESTIONNAIRE[currentQIndex].explanation}</p>
                  </div>
                )}
              </div>

              {/* Modal Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentQIndex < CONTRACTOR_QUESTIONNAIRE.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex(prev => prev + 1)}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black text-xs font-bold"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleQuizSubmit();
                        setQuizModalOpen(false);
                      }}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold shadow-lg"
                    >
                      <Award className="w-4 h-4" />
                      <span>Submit Answers & Score</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
