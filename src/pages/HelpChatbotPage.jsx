import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Wrench,
  Calendar,
  Layers,
  ShieldCheck,
  Send,
  ArrowRight,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { CHATBOT_KNOWLEDGE } from '../data/mockData';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

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
    <div className="min-h-screen bg-white dark:bg-[#212428] text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ===================== FULL-WIDTH CENTERED HERO SECTION WITH BACKGROUND IMAGE ===================== */}
      <section className="relative w-full bg-[#0B0C0E] text-white overflow-hidden border-b border-white/10 h-[400px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
        {/* Full-Width Panoramic Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/help-robot-hero.jpg"
            alt="3D AI Assistant Robot"
            className="w-full h-full object-cover object-center"
          />
          {/* Clean uniform dark tint for crisp centered text readability */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Centered Hero Content Container */}
        <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 flex flex-col items-center">
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Help & AI Chatbot
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#E8DEC8] dark:text-[#C2B59B] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                Get Instant Assistance.
              </p>
            </div>

            <p className="text-sm sm:text-base text-white leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Find answers, get step-by-step guidance, and resolve inquiries quickly across customer selection, contractor training, and Local Mechanical compliance.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('chat-interface-area');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#7E8056] hover:bg-[#6e7049] active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Chat Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Content Body */}
      <div id="chat-interface-area" className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">

        {/* ===================== POPULAR TOPICS & INTERACTIVE CHAT ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Popular Topics */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                  Popular Topics
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick links to technical guides & portals
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-[#7E8056]/30 bg-[#7E8056]/10 text-[#7E8056] dark:text-[#C2B59B] text-[10px] font-semibold"
              >
                5 Guides
              </Badge>
            </div>

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
                  <Link key={idx} to={topic.route} className="block group">
                    <Card className="p-3.5 rounded-xl bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 hover:border-[#7E8056]/60 dark:hover:border-[#A4A77E]/50 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-[#FAF7F2] dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/10 text-[#7E8056] dark:text-[#A4A77E] flex items-center justify-center flex-shrink-0 group-hover:bg-[#7E8056] group-hover:text-white group-hover:border-[#7E8056] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#7E8056] dark:group-hover:text-[#C2B59B] transition-colors">
                            {topic.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                            {topic.desc}
                          </p>
                        </div>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-[#7E8056] dark:group-hover:text-[#C2B59B] group-hover:bg-[#7E8056]/10 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Column: Embedded Interactive AI Assistant Widget */}
          <div className="lg:col-span-7">
            <Card className="rounded-2xl bg-white dark:bg-[#121315] border-slate-200/90 dark:border-white/25 shadow-[0_6px_24px_rgba(0,0,0,0.05)] dark:shadow-2xl flex flex-col h-[530px] overflow-hidden py-0 gap-0">
              {/* Header */}
              <CardHeader className="px-5 py-3.5 bg-slate-50/90 dark:bg-[#1F2226] border-b border-slate-200/80 dark:border-white/[0.08] flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#7E8056] dark:bg-[#8F9267] text-white flex items-center justify-center shadow-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      AI Assistant
                    </CardTitle>
                    <CardDescription className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      Online & Ready
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-mono font-medium"
                >
                  v2.4 Knowledge Engine
                </Badge>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-xs bg-[#FAF9F5]/50 dark:bg-[#141619]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#7E8056] text-white font-medium shadow-sm rounded-br-sm'
                          : 'bg-white dark:bg-[#202328] text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-white/[0.08] shadow-xs rounded-bl-sm'
                      }`}
                    >
                      <p>{m.text}</p>

                      {m.targetRoute && (
                        <Button
                          asChild
                          size="sm"
                          className="mt-3 h-7 px-3 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] text-white font-semibold text-[11px] shadow-xs"
                        >
                          <Link to={m.targetRoute}>
                            <span>{m.ctaText}</span>
                            <ArrowRight className="w-3 h-3 ml-1.5" />
                          </Link>
                        </Button>
                      )}

                      {m.options && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.options.map((opt, i) => (
                            <Button
                              key={i}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuery(opt)}
                              className="h-auto py-1.5 px-2.5 rounded-lg bg-[#FAF7F2] dark:bg-black/40 hover:bg-[#7E8056]/15 hover:border-[#7E8056] dark:hover:border-[#A4A77E] text-slate-800 dark:text-[#C2B59B] border-slate-200 dark:border-white/15 text-[11px] font-medium text-left whitespace-normal"
                            >
                              {opt}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="p-3 bg-white dark:bg-[#202328] rounded-2xl max-w-[96px] flex gap-1.5 border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#7E8056] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#8C7A58] animate-bounce delay-150" />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-300" />
                  </div>
                )}
              </CardContent>

              {/* Single Clean Interactive Input Form */}
              <CardFooter className="p-3.5 bg-slate-50/90 dark:bg-[#1F2226] border-t border-slate-200/80 dark:border-white/[0.08]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleQuery(inputText);
                  }}
                  className="flex items-center gap-2 w-full"
                >
                  <Input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about tonnage, swaps, or reservations..."
                    className="flex-1 h-9 bg-white dark:bg-black/50 border-slate-300 dark:border-white/15 focus-visible:ring-[#7E8056] dark:focus-visible:ring-[#A4A77E] rounded-lg px-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!inputText.trim()}
                    className="h-9 px-3.5 rounded-lg bg-[#7E8056] hover:bg-[#6c6e49] dark:bg-[#A4A77E] dark:hover:bg-[#8F9267] dark:text-black text-white font-semibold shadow-xs disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </CardFooter>

            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
