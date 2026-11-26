import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, CheckCircle2, ArrowRight, User, Wrench, TrendingUp } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth, ROLE_CONFIG } from '../context/AuthContext';

const ROLE_OPTIONS = [
  { id: 'customer', label: 'Customer', icon: User },
  { id: 'contractor', label: 'Contractor', icon: Wrench },
  { id: 'investor', label: 'Investor', icon: TrendingUp },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [accountRole, setAccountRole] = useState('customer');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    signup({ name: fullName, email, role: accountRole });
    setCreated(true);
    const targetRoute = ROLE_CONFIG[accountRole]?.homeRoute || '/buyers';
    setTimeout(() => {
      navigate(targetRoute);
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 flex items-center justify-center px-4 py-8 sm:py-12 transition-colors duration-200">
      <div className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#2B362E] dark:bg-[#1E241F] border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        {/* Left Side: Current Visual + Curved Wave Divider */}
        <div className="lg:col-span-6 relative min-h-[250px] lg:min-h-[590px] bg-[#141619] overflow-hidden">
          <img
            src="/images/auth-signup-side.jpg"
            alt="Modern Clean Climate Modular Architecture"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

          {/* Sweeping S-Curve Wave SVG Transition */}
          <svg
            viewBox="0 0 100 500"
            preserveAspectRatio="none"
            className="hidden lg:block absolute top-0 -right-px h-full w-44 pointer-events-none fill-[#2B362E] dark:fill-[#1E241F]"
            aria-hidden="true"
          >
            <path d="M22,0 C28,115 98,200 94,325 C90,425 45,472 0,500 L100,500 L100,0 Z" />
          </svg>

          <div className="relative z-10 h-full p-6 sm:p-8 lg:pr-24 flex flex-col justify-end">
            <div className="space-y-2.5">
              <Badge className="bg-[#7E8056] hover:bg-[#7E8056] text-white border-0 text-[10px] font-semibold uppercase tracking-wider">
                Create Account
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white leading-snug">
                Built for Buyers, Contractors &amp;{' '}
                <span className="text-[#A4A77E]">Partners.</span>
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed max-w-xs">
                Reserve modular HVAC units, complete EPA 608 &amp; RFID certification onboarding, or track Local Mechanical quality compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Curved-Card Signup Form */}
        <div className="lg:col-span-6 p-7 sm:p-10 lg:px-10 lg:py-12 flex flex-col justify-center text-white">
          <div className="w-full max-w-[380px] mx-auto space-y-5">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                Sign Up
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Choose your account role to unlock tailored portal access.
              </p>
            </div>

            {created ? (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center gap-3 text-xs text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>
                  Account created as <strong>{ROLE_CONFIG[accountRole]?.label}</strong>. Redirecting to your portal...
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* 3-Role Segmented Pill Selector */}
                <div className="space-y-1.5">
                  <Label className="text-slate-200 text-xs">Account Type</Label>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-black/30 border border-white/10">
                    {ROLE_OPTIONS.map((role) => {
                      const Icon = role.icon;
                      const isActive = accountRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setAccountRole(role.id)}
                          className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#7E8056] text-white shadow-sm'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="signup-name" className="text-slate-200 text-xs">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="David Vance"
                    className="h-9 rounded-full px-4 bg-black/35 border-white/10 text-white placeholder:text-slate-400 text-xs focus-visible:ring-[#A4A77E]"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="signup-email" className="text-slate-200 text-xs">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="h-9 rounded-full px-4 bg-black/35 border-white/10 text-white placeholder:text-slate-400 text-xs focus-visible:ring-[#A4A77E]"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="signup-password" className="text-slate-200 text-xs">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="h-9 rounded-full px-4 pr-10 bg-black/35 border-white/10 text-white placeholder:text-slate-400 text-xs focus-visible:ring-[#A4A77E]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="w-full h-9 rounded-full bg-[#7E8056] hover:bg-[#8E9167] text-white font-semibold text-xs shadow-md cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                  <span>Create {ROLE_CONFIG[accountRole]?.label} Account</span>
                </Button>
              </form>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs pt-1 whitespace-nowrap">
              <span className="text-slate-300">Already have an account?</span>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 font-semibold text-[#C2B59B] underline hover:text-white"
              >
                <span>Sign in</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
