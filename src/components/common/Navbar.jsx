import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  UserCheck,
  Menu,
  X,
  Home,
  ShoppingCart,
  TrendingUp,
  Calendar,
  HardHat,
  ShieldCheck,
  Headphones,
  User
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth, ROLE_CONFIG } from '../../context/AuthContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const allNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Buyer', path: '/buyers', icon: ShoppingCart },
    { name: 'Reservations', path: '/reservations', icon: Calendar },
    { name: 'Investor Hub', path: '/investor', icon: TrendingUp },
    { name: 'Contractor Onboarding', path: '/contractor', icon: HardHat },
    { name: 'Manage Contractor', path: '/manage-contractor', icon: UserCheck },
    { name: 'Local Mechanical', path: '/local-mechanical', icon: ShieldCheck },
    { name: 'Help & AI', path: '/help', icon: Headphones },
  ];

  // Show role-filtered links when logged in; show all links when signed out
  const navItems = user
    ? allNavItems.filter((item) => ROLE_CONFIG[user.role]?.allowedNavPaths.includes(item.path))
    : allNavItems;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#212428] border-b border-slate-200 dark:border-[#A4A77E]/20 shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-xl transition-colors">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left: Brand Logo - No-Tech HVAC */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.01] flex-shrink-0" title="No-Tech HVAC">
            <img
              src="/images/no-tech-hvac-logo.png"
              alt="No-Tech HVAC"
              className={`h-8 sm:h-9 w-auto object-contain transition-all duration-200 group-hover:scale-[1.02] ${isDark ? 'invert hue-rotate-180 brightness-110' : ''}`}
            />
          </Link>

          {/* Center: Desktop Clean Text-Only Navigation Links with Underline Indicator */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-xs sm:text-[13px] tracking-wide transition-colors duration-150 whitespace-nowrap group ${isActive
                    ? 'text-[#7E8056] dark:text-[#A4A77E] font-bold'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white font-medium'
                    }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#7E8056] dark:bg-[#A4A77E] dark:shadow-[0_0_8px_rgba(164,167,126,0.5)] transition-all" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Theme Toggle Switch, Profile Avatar, Mobile Menu */}
          <div className="flex items-center space-x-3 flex-shrink-0">

            {/* Single Icon Theme Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#25282D] dark:hover:bg-[#32363D] border border-slate-300 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all hover:scale-105 shadow-sm cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#C2B59B]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Auth Button: Only Circular Profile Picture when signed in, Login when signed out */}
            {user ? (
              <Link
                to="/profile"
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#7E8056]/60 hover:border-[#7E8056] flex items-center justify-center bg-[#7E8056] text-white transition-all hover:scale-105 shadow-sm flex-shrink-0"
                title={`${user.name} (${ROLE_CONFIG[user.role]?.label || user.role}) — Open Profile`}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold uppercase">
                    {user.name?.charAt(0) || <User className="w-4 h-4" />}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-3.5 h-7 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                Login
              </Link>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 dark:bg-[#25282D] text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#2F3238] border border-slate-300 dark:border-white/10 transition-colors"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#212428] border-b border-slate-200 dark:border-[#A4A77E]/20 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#A4A77E] px-3 py-1">
            Navigation Portals
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-[#7E8056]/15 text-[#7E8056] dark:text-[#A4A77E] font-bold border-l-2 border-[#7E8056] dark:border-[#A4A77E]'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#7E8056] dark:text-[#A4A77E]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 px-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10">
            <span>Theme Mode</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-transparent"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
