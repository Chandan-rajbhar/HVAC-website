import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, CheckCircle2, ArrowRight, User, Wrench, TrendingUp } from 'lucide-react';
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
      <div className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#2B362E] dark:bg-[#1E241F] border border-slate-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        {/* Left Side: Current Architectural Visual + Curved Wave Divider */}
        <div className="lg:col-span-6 relative min-h-[250px] lg:min-h-[560px] bg-[#141619] overflow-hidden">
          <img
            src="/images/auth-login-side.jpg"
            alt="Modular HVAC Mechanical System"
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
                Portal Access
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white leading-snug">
                Precision Climate Control, Verified at{' '}
                <span className="text-[#A4A77E]">Every Step.</span>
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed max-w-xs">
                Manage your modular HVAC reservations, certified contractor assignments, and Local Mechanical compliance logs in one unified portal.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Curved-Card Login Form */}
        <div className="lg:col-span-6 p-7 sm:p-10 lg:px-10 lg:py-12 flex flex-col justify-center text-white">
          <div className="w-full max-w-[380px] mx-auto space-y-5">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                Sign In
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Select your role and enter your credentials to access your portal.
              </p>
            </div>

            {signedIn ? (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center gap-3 text-xs text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>
                  Signed in as <strong>{ROLE_CONFIG[selectedRole]?.label}</strong>. Redirecting to your portal...
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* 3-Role Segmented Pill Selector */}
                <div className="space-y-1.5">
                  <Label className="text-slate-200 text-xs">Select Role</Label>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-black/30 border border-white/10">
                    {ROLE_OPTIONS.map((role) => {
                      const Icon = role.icon;
                      const isActive = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => handleRoleSelect(role.id)}
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
                  <Label htmlFor="login-email" className="text-slate-200 text-xs">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="h-9 rounded-full px-4 bg-black/35 border-white/10 text-white placeholder:text-slate-400 text-xs focus-visible:ring-[#A4A77E]"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="login-password" className="text-slate-200 text-xs">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
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
                  <div className="flex justify-end pt-0.5">
                    <Link
                      to="/help"
                      className="text-[11px] font-medium text-[#C2B59B] hover:underline"
                    >
                      Need help?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  className="w-full h-9 rounded-full bg-[#7E8056] hover:bg-[#8E9167] text-white font-semibold text-xs shadow-md cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  <span>Sign In as {ROLE_CONFIG[selectedRole]?.label}</span>
                </Button>
              </form>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs pt-1 whitespace-nowrap">
              <span className="text-slate-300">New to Local Industries?</span>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 font-semibold text-[#C2B59B] underline hover:text-white"
              >
                <span>Create an account</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
