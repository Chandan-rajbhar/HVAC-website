import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  User,
  Menu,
  X,
  Home,
  ShoppingCart,
  TrendingUp,
  Calendar,
  HardHat,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import NoTechLogo from './NoTechLogo';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Buyers Portal', path: '/buyers', icon: ShoppingCart },
    { name: 'Investor Hub', path: '/investor', icon: TrendingUp },
    { name: 'Reservations', path: '/reservations', icon: Calendar },
    { name: 'Contractor Onboarding', path: '/contractor', icon: HardHat },
    { name: 'Local Mechanical', path: '/local-mechanical', icon: ShieldCheck },
    { name: 'Help & AI', path: '/help', icon: Headphones },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#16181B]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-sm transition-colors">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left: Brand Logo emblem */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.01] flex-shrink-0">
            <NoTechLogo className="h-11 sm:h-12" variant="logo" light={!isDark} />
          </Link>

          {/* Center: Desktop Clean Text-Only Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#7E8056] text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Theme Toggle Switch, Profile Avatar, Mobile Menu */}
          <div className="flex items-center space-x-3 flex-shrink-0">

            {/* Pill Slider Theme Toggle matching reference image */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="relative flex items-center justify-between w-14 h-7 px-1.5 rounded-full bg-slate-100 dark:bg-[#25282D] border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all cursor-pointer shadow-inner"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <Sun className={`w-3.5 h-3.5 z-10 transition-colors ${!isDark ? 'text-amber-500' : 'text-slate-500'}`} />
              <Moon className={`w-3.5 h-3.5 z-10 transition-colors ${isDark ? 'text-[#C2B59B]' : 'text-slate-400'}`} />
              <span
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-[#7E8056] transition-transform duration-200 shadow-md ${
                  isDark ? 'left-[calc(100%-26px)]' : 'left-0.5'
                }`}
              />
            </button>

            {/* Circular Profile Avatar Button matching reference image */}
            <Link
              to="/manage-contractor"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#25282D] dark:hover:bg-[#32363D] border border-slate-300 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all hover:scale-105 shadow-sm"
              title="Customer Profile & Contractor Portal"
            >
              <User className="w-4 h-4" />
            </Link>

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
        <div className="xl:hidden bg-white dark:bg-[#16181B] border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-xl">
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
                    ? 'bg-[#7E8056] text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#7E8056] dark:text-[#A4A77E]'}`} />
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
