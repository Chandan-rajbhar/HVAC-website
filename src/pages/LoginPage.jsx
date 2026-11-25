import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, CheckCircle2, ArrowRight, ShieldCheck, User, Wrench, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/card';
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

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('customer');
  const [email, setEmail] = useState(ROLE_CONFIG.customer.defaultCredentials.email);
  const [password, setPassword] = useState(ROLE_CONFIG.customer.defaultCredentials.password);
  const [showPassword, setShowPassword] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    const creds = ROLE_CONFIG[roleId]?.defaultCredentials;
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    const defaultCreds = ROLE_CONFIG[selectedRole]?.defaultCredentials;
    const matchedName = email.trim() === defaultCreds?.email ? defaultCreds.name : undefined;
    login({ email, role: selectedRole, name: matchedName });
    setSignedIn(true);
    const targetRoute = ROLE_CONFIG[selectedRole]?.homeRoute || '/buyers';
    setTimeout(() => {
      navigate(targetRoute);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 flex items-center justify-center px-4 py-8 sm:py-12 transition-colors duration-200">
      <Card className="w-full max-w-5xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#181A1D] border-slate-200/90 dark:border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-2xl py-0 gap-0">

        {/* Left Side: AI-Generated Architectural HVAC Visual */}
        <div className="lg:col-span-6 relative min-h-[240px] lg:min-h-[540px] bg-[#141619] overflow-hidden">
          <img
            src="/images/auth-login-side.jpg"
            alt="Modular HVAC Mechanical System"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
            <div className="inline-flex items-center w-fit px-3.5 py-2 rounded-xl bg-white/95 shadow-md border border-white/40">
              <img
                src="/images/no-tech-hvac-logo.png"
                alt="No-Tech HVAC"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>

            <div className="space-y-3">
              <Badge className="bg-[#7E8056] hover:bg-[#7E8056] text-white border-0 text-[10px] font-semibold uppercase tracking-wider">
                Portal Access
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white leading-snug">
                Precision Climate Control, Verified at Every Step.
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed max-w-sm">
                Manage your modular HVAC reservations, certified contractor assignments, and Local Mechanical compliance logs in one unified portal.
              </p>
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-emerald-300 font-medium">
                <span className="inline-flex items-center gap-1 bg-black/45 px-2.5 py-1 rounded-lg border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Local Mechanical Approved
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean shadcn Login Form */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-5">
            <div className="space-y-1.5">
              <Badge
                variant="outline"
                className="border-[#7E8056]/30 bg-[#7E8056]/10 text-[#7E8056] dark:text-[#C2B59B] text-[10px] font-semibold uppercase tracking-wider"
              >
                Welcome Back
              </Badge>
              <h1 className="text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Select your role and enter your credentials to access your portal.
              </p>
            </div>

            {signedIn ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>
                  Signed in as <strong>{ROLE_CONFIG[selectedRole]?.label}</strong>. Redirecting to your portal...
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 3-Role Segmented Pill Selector */}
                <div className="space-y-1.5">
                  <Label>Select Role</Label>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-slate-100 dark:bg-black/40 border border-slate-200/80 dark:border-white/10">
                    {ROLE_OPTIONS.map((role) => {
                      const Icon = role.icon;
                      const isActive = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleRoleSelect(role.id)}
                          className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#7E8056] text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="h-9 bg-[#FAF7F2] dark:bg-black/50 border-slate-200 dark:border-white/15 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Link
                      to="/help"
                      className="text-[11px] font-medium text-[#7E8056] dark:text-[#C2B59B] hover:underline"
                    >
                      Need help?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
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
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  <span>Sign In as {ROLE_CONFIG[selectedRole]?.label}</span>
                </Button>
              </form>
            )}

            <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">New to Local Industries?</span>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 font-semibold text-[#7E8056] dark:text-[#C2B59B] hover:underline"
              >
                <span>Create an account</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
}
