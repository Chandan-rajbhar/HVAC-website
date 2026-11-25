import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import LocalIndustriesLogo from '../components/common/LocalIndustriesLogo';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select';

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [accountRole, setAccountRole] = useState('customer');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    setCreated(true);
    setTimeout(() => {
      navigate(accountRole === 'contractor' ? '/contractor' : '/buyers');
    }, 900);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 flex items-center justify-center px-4 py-8 sm:py-12 transition-colors duration-200">
      <Card className="w-full max-w-5xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-2xl py-0 gap-0">

        {/* Left Side: AI-Generated Modern Clean-Climate Visual */}
        <div className="lg:col-span-6 relative min-h-[240px] lg:min-h-[580px] bg-[#141619] overflow-hidden">
          <img
            src="/images/auth-signup-side.jpg"
            alt="Modern Clean Climate Modular Architecture"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
            <div className="inline-flex items-center w-fit px-3.5 py-2 rounded-xl bg-white/95 shadow-md border border-white/40">
              <LocalIndustriesLogo className="h-10 sm:h-11" isDark={false} />
            </div>

            <div className="space-y-3">
              <Badge className="bg-[#7E8056] hover:bg-[#7E8056] text-white border-0 text-[10px] font-semibold uppercase tracking-wider">
                Create Account
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white leading-snug">
                Built for Buyers, Contractors &amp; Partners.
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed max-w-sm">
                Reserve modular HVAC units, complete EPA 608 &amp; RFID certification onboarding, or track Local Mechanical quality compliance.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-emerald-300 font-medium">
                <span className="inline-flex items-center gap-1 bg-black/45 px-2.5 py-1 rounded-lg border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Network Access
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean shadcn Signup Form */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-5">
            <div className="space-y-1.5">
              <Badge
                variant="outline"
                className="border-[#7E8056]/30 bg-[#7E8056]/10 text-[#7E8056] dark:text-[#C2B59B] text-[10px] font-semibold uppercase tracking-wider"
              >
                Get Started
              </Badge>
              <h1 className="text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                Join Local Industries
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Register as a property buyer, certified HVAC contractor, or investor partner.
              </p>
            </div>

            {created ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Account created successfully. Redirecting to your portal...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="David Vance"
                    className="h-9 bg-[#FAF7F2] dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="h-9 bg-[#FAF7F2] dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Account Type</Label>
                  <Select value={accountRole} onValueChange={setAccountRole}>
                    <SelectTrigger className="w-full h-9 bg-[#FAF7F2] dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Homeowner / Buyer</SelectItem>
                      <SelectItem value="contractor">Certified HVAC Contractor</SelectItem>
                      <SelectItem value="investor">Investor / Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="h-9 pr-9 bg-[#FAF7F2] dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="w-full h-9 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-semibold text-xs shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                  <span>Create Account</span>
                </Button>
              </form>
            )}

            <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Already have an account?</span>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 font-semibold text-[#7E8056] dark:text-[#C2B59B] hover:underline"
              >
                <span>Sign in</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
}
