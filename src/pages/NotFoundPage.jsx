import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#16181B] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans transition-colors duration-200">
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

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7E8056] hover:bg-[#6e7049] text-white font-bold text-xs shadow-xl transition-all hover:scale-105"
          >
            <span>Go Back Home →</span>
          </Link>
        </div>

        {/* Modular Unit Visual in Nature per reference screenshot */}
        <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl border border-white/10">
          <img
            src="/images/slices/404-landscape-unit.jpg"
            alt="No-Tech HVAC Modular Unit in Landscape"
            className="w-full h-auto object-cover"
          />
        </div>

      </div>
    </div>
  );
}
