import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Wrench,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { CHATBOT_KNOWLEDGE } from '../../data/mockData';

export default function AIChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Hello! I am the No-Tech AI Assistant. How can I help you today?",
      options: [
        'System Selection & Tonnage',
        'Installation & Swapping Guide',
        'Reservation & $200 Deposit',
        'Contractor Onboarding & Quiz',
        'Local Mechanical Approval'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Append user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Smart knowledge search
    setTimeout(() => {
      const lower = query.toLowerCase();
      let match = CHATBOT_KNOWLEDGE.find(k =>
        k.trigger.some(term => lower.includes(term))
      );

      let botReply;
      if (match) {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: match.response,
          targetRoute: match.targetRoute,
          ctaText: match.ctaText
        };
      } else {
        botReply = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "I can assist you with our 4-bay modular HVAC system, reservation scheduling with $200 deposit, contractor licensing verification through Local Mechanical, or RFID swap diagnostics.",
          options: [
            'System Selection & Tonnage',
            'Reservation & $200 Deposit',
            'Contractor Onboarding & Quiz',
            'Local Mechanical Portal'
          ]
        };
      }

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Pill & Scroll to Top Buttons matching reference image */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Floating AI Assistant Icon Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-12 h-12 rounded-full bg-white dark:bg-[#1E2024] text-slate-900 dark:text-white border border-slate-200/90 dark:border-white/20 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-black/30 group cursor-pointer"
            aria-label="Open AI Assistant"
            title="AI Assistant"
          >
            <MessageCircle className="w-6 h-6 text-[#7E8056] dark:text-[#A4A77E]" />
            <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1E2024]" />
          </button>

        </div>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[640px] h-[85vh] bg-white dark:bg-[#16181B] rounded-2xl border border-slate-200 dark:border-[#A4A77E]/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#F4F1EA] via-[#F8F6F0] to-[#F4F1EA] dark:from-[#1C1E22] dark:via-[#22252A] dark:to-[#1C1E22] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-[#7E8056] dark:bg-[#A4A77E] text-white dark:text-black flex items-center justify-center font-bold shadow-md">
                <MessageCircle className="w-6 h-6" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#16181B]"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-serif">No-Tech AI Assistant</h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#7E8056]/15 dark:bg-[#C2B59B]/20 text-[#7E8056] dark:text-[#C2B59B] font-mono">v2.4</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Step-by-step guidance & navigation</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/70 dark:hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-black/40 border-b border-slate-200/80 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-600 dark:text-slate-300 scrollbar-none">
            <span className="text-[10px] uppercase font-bold text-[#7E8056] dark:text-[#A4A77E] tracking-wider flex-shrink-0">
              Quick:
            </span>
            <button
              onClick={() => handleSend('Tell me about the modular compartments')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-[#7E8056]/10 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Modular Demo
            </button>
            <button
              onClick={() => handleSend('How do I reserve with $200 fee?')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-[#7E8056]/10 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              $200 Deposit
            </button>
            <button
              onClick={() => handleSend('Contractor license and 10 questions')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-[#7E8056]/10 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Contractor Quiz
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-white dark:bg-[#16181B]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#7E8056] dark:bg-[#A4A77E] text-white dark:text-black font-medium shadow-md rounded-br-none'
                      : 'bg-[#F8F7F4] dark:bg-[#22252A] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-md rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Direct Link Navigation CTA Button */}
                  {msg.targetRoute && (
                    <button
                      onClick={() => {
                        navigate(msg.targetRoute);
                        setIsOpen(false);
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7E8056] hover:bg-[#6E7049] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-semibold text-xs shadow-sm transition-all"
                    >
                      <span>{msg.ctaText || 'Open Portal'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Clickable predefined options */}
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(opt)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-black/40 hover:bg-[#7E8056]/10 dark:hover:bg-[#A4A77E]/20 text-[#6C6F4D] dark:text-[#C2B59B] border border-slate-200 dark:border-white/10 text-[11px] transition-colors text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.sender === 'user' ? 'You' : 'No-Tech Assistant'}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-[#F8F7F4] dark:bg-[#22252A] rounded-2xl max-w-[120px] border border-slate-200 dark:border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#7E8056] dark:bg-[#A4A77E] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#8C7A58] dark:bg-[#C2B59B] animate-bounce delay-150"></span>
                <span className="w-2 h-2 rounded-full bg-[#6D6E71] animate-bounce delay-300"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Field */}
          <div className="p-3 bg-[#F8F7F4] dark:bg-[#1C1E22] border-t border-slate-200 dark:border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about tonnage, slots, Local Mechanical..."
                className="flex-1 bg-white dark:bg-black/50 border border-slate-300 dark:border-white/15 focus:border-[#7E8056] dark:focus:border-[#A4A77E] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-[#7E8056] hover:bg-[#6E7049] dark:bg-[#A4A77E] dark:hover:bg-[#8e9167] text-white dark:text-black font-semibold disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
