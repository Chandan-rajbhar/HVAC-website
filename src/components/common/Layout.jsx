import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatbotModal from './AIChatbotModal';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#121315] text-slate-100 selection:bg-[#A4A77E] selection:text-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Floating AI Chatbot Assistant present across pages per PDF */}
      <AIChatbotModal />
    </div>
  );
}
