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
    <header className="sticky top-0 z-50 w-full bg-[#16181B]/95 backdrop-blur-md shadow-md transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3.5">
          
          {/* Left: Brand Logo (clean oval emblem without text) */}
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.02]">
            <NoTechLogo className="h-11 sm:h-12" variant="logo" />
          </Link>

          {/* Center: Premium Text-Only Desktop Navigation Links (Clean, No Border Capsule) */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#7E8056] text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Theme Toggle, Profile, Mobile Menu */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">

            {/* Modern Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark and Light Mode"
              className="p-2 rounded-xl bg-[#25282D] hover:bg-[#2F3238] border border-white/10 text-slate-300 transition-colors flex items-center justify-center"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#C2B59B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#A4A77E]" />
              )}
            </button>

            {/* User Profile Avatar Pill */}
            <Link
              to="/manage-contractor"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-[#25282D] hover:bg-[#2F3238] border border-white/10 text-slate-200 transition-all text-xs font-medium shadow-sm"
              title="Customer Profile & Contractor Management"
            >
              <div className="w-6 h-6 rounded-lg bg-[#7E8056] text-slate-950 flex items-center justify-center font-bold text-xs">
                <User className="w-3.5 h-3.5 text-slate-950" />
              </div>
              <span className="hidden lg:inline text-xs font-semibold">Portal</span>
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#25282D] text-slate-300 hover:text-white hover:bg-[#2F3238] border border-white/10 transition-colors"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#16181B] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#A4A77E] px-3 py-1">
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#7E8056] text-black font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#A4A77E]'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 px-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
            <span>Theme Mode</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-[#C2B59B]" /> : <Moon className="w-3.5 h-3.5 text-[#A4A77E]" />}
              <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
