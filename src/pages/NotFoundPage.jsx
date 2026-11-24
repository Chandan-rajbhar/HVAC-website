import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import HvacModularVisualizer from '../components/hvac/HvacModularVisualizer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#121315] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Exact 404 Headline from Reference Screenshot */}
        <h1 className="text-6xl sm:text-7xl font-bold font-serif text-[#C2B59B] tracking-tight">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-white">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-bold text-xs shadow-xl transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Go Back Home →</span>
        </Link>

        {/* Modular Unit Visual in Nature per reference screenshot */}
        <div className="mt-8 pt-6 border-t border-white/10 opacity-70">
          <HvacModularVisualizer
            activeColor="#6D6E71"
            isInteractive={false}
            showLabels={false}
          />
        </div>

      </div>
    </div>
  );
}
