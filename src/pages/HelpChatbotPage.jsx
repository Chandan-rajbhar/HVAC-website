import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  MessageSquare,
  HelpCircle,
  Wrench,
  Calendar,
  Layers,
  ShieldCheck,
  Send,
  ArrowRight,
  BookOpen,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { CHATBOT_KNOWLEDGE } from '../data/mockData';

export default function HelpChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: "How can I help you? I am your AI assistant for No-Tech modular systems, reservations, contractor certifications, and Local Mechanical compliance.",
      options: [
        'System Selection & Tonnage',
        'Installation & Swapping Guide',
        'Reservation & $200 Deposit',
        'Contractor Onboarding & Quiz',
        'Local Mechanical Quality Standards'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleQuery = (query) => {
    if (!query.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      const match = CHATBOT_KNOWLEDGE.find(k =>
        k.trigger.some(term => lower.includes(term))
      );

      let reply;
      if (match) {
        reply = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: match.response,
          targetRoute: match.targetRoute,
          ctaText: match.ctaText
        };
      } else {
        reply = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: "I can provide step-by-step guidance on No-Tech modular units, reservations with a $200 deposit, contractor onboarding, or Local Mechanical quality enforcement.",
          options: [
            'System Selection & Tonnage',
            'Reservation & $200 Deposit',
            'Contractor Onboarding & Quiz',
            'Local Mechanical Standards'
          ]
        };
      }

      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121315] text-slate-900 dark:text-slate-100 py-8 lg:py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ===================== HERO / BANNER ===================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F0ECE1] via-[#F7F4EC] to-[#F0ECE1] dark:from-[#1B1D20] dark:via-[#22252A] dark:to-[#1B1D20] border border-slate-300 dark:border-white/10 p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E8056] dark:text-[#A4A77E]">
              AI Support & Knowledge Base
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
              Help & AI Chatbot
            </h1>
            <p className="text-base sm:text-lg text-[#8C7A58] dark:text-[#C2B59B] font-semibold">
              Get Instant Assistance.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Find answers, get step-by-step guidance, and resolve inquiries quickly across customer selection, contractor training, and Local Mechanical compliance.
            </p>
          </div>

          {/* 3D Robot Mascot Graphic matching reference screenshot */}
          <div className="relative flex-shrink-0">
            <div className="w-28 sm:w-32 h-24 sm:h-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-md bg-white dark:bg-black/40">
              <img
                src="/images/slices/help-robot-3d.jpg"
                alt="3D AI Assistant Robot"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ===================== POPULAR TOPICS & INTERACTIVE CHAT ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Popular Topics */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-base font-bold font-serif text-slate-900 dark:text-white">Popular Topics</h2>
            
            <div className="space-y-2.5">
              {[
                { title: 'System Installation', desc: '4-bay modular swap protocols & 2x6 foundation', route: '/#interactive-demo', icon: Layers },
                { title: 'Reservation Help', desc: '$200 fee, batch queue, and estimated dates', route: '/buyers', icon: Calendar },
                { title: 'Contractor Onboarding', desc: 'EPA license, COI, and 10 technical questions', route: '/contractor', icon: Wrench },
                { title: 'Troubleshooting & RFID', desc: 'Conduct continuity test & scan new tag', route: '/contractor/rfid', icon: ShieldCheck },
                { title: 'Product Information', desc: 'Upflow, downflow, horizontal tonnage specs', route: '/buyers', icon: BookOpen }
              ].map((topic, idx) => {
                const Icon = topic.icon;
                return (
                  <Link
                    key={idx}
                    to={topic.route}
                    className="p-4 rounded-xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 hover:border-[#7E8056]/50 dark:hover:border-[#A4A77E]/50 flex items-center gap-3.5 transition-all group shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7E8056] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#7E8056] dark:group-hover:text-[#A4A77E] transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">{topic.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Column: Embedded Interactive AI Assistant Widget */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#181A1D] border border-slate-200 dark:border-white/10 shadow-md flex flex-col h-[520px] overflow-hidden">
              
              {/* Header */}
              <div className="p-4 bg-slate-50 dark:bg-[#202327] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#7E8056] text-white flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">AI Assistant</h3>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Online & Ready</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">v2.4 Knowledge Engine</span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#7E8056] text-white font-medium shadow-md rounded-br-none'
                          : 'bg-slate-100 dark:bg-[#24272C] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm rounded-bl-none'
                      }`}
                    >
                      <p>{m.text}</p>

                      {m.targetRoute && (
                        <Link
                          to={m.targetRoute}
                          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7E8056] text-white font-bold text-xs"
                        >
                          <span>{m.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {m.options && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuery(opt)}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-black/40 hover:bg-[#7E8056]/10 text-slate-700 dark:text-[#C2B59B] border border-slate-200 dark:border-white/10 text-[11px] transition-colors text-left shadow-2xs"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="p-3 bg-slate-100 dark:bg-[#24272C] rounded-2xl max-w-[100px] flex gap-1.5 border border-slate-200 dark:border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#7E8056] animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-[#8C7A58] animate-bounce delay-150"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-300"></span>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleQuery(inputText);
                }}
                className="p-3 bg-slate-50 dark:bg-black/30 border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about tonnage, swaps, or reservations..."
                  className="flex-1 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 focus:border-[#7E8056] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#7E8056] hover:bg-[#6e7049] text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="p-3 bg-[#202327] border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleQuery(inputText);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-black/50 border border-white/15 focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2.5 rounded-xl bg-[#A4A77E] hover:bg-[#8e9167] text-black font-semibold disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
