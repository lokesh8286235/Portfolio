import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

// Ensure TypeScript is happy with Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I'm Lokesh's portfolio assistant.\n\nI can answer questions about:\n• Projects\n• Technical skills\n• AI systems\n• Education\n• Work authorization\n• Contact information\n\nTry one of the suggested questions below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(true); // Default to muted for seamless UX, user can unmute
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const chips = [
    "Tech Stack",
    "RAG Pipeline",
    "CGPA & Edu",
    "OPT Work Status",
    "Email Info"
  ];

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isListening]);

  // Clean speaking on unmount
  useEffect(() => {
    return () => {
      cancelSpeech();
    };
  }, []);

  // Web Speech API - Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
        cancelSpeech(); // stop speaking if we started listening
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          // Auto-trigger sending the transcribed spoken message
          handleSend(transcript);
        }
      };

      rec.onerror = (e: any) => {
        console.warn("Speech recognition error", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [messages]);

  // Handle Speech Synthesis (Read Aloud)
  const speakText = (text: string) => {
    if (voiceMuted || !("speechSynthesis" in window)) return;

    cancelSpeech();

    // Strip out markdown tokens (* / ** / # / ` / brackets etc) to keep vocalization absolutely fluent
    const cleanToVocalize = text
      .replace(/\*\*?/g, "") // remove asterisks
      .replace(/###?/g, "") // remove headings
      .replace(/`{1,3}[^`]*`{1,3}/g, "") // remove small code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // clean hyperlinks to just anchor text
      .substring(0, 240); // limit spoken length for quick assistant snappy replies

    const utterance = new SpeechSynthesisUtterance(cleanToVocalize);
    utterance.lang = "en-US";
    
    // Find a friendly, sweet female sounding natural english voice if available
    const voices = window.speechSynthesis.getVoices();
    
    // Explicit list of high-quality friendly female voices across platforms
    const sweetFemaleKeywords = ["samantha", "zira", "google us english", "tessa", "natural", "victoria", "karen"];
    
    const targetVoice = voices.find((v) => {
      const nameLower = v.name.toLowerCase();
      return v.lang.startsWith("en") && sweetFemaleKeywords.some(keyword => nameLower.includes(keyword));
    }) || voices.find((v) => {
      const nameLower = v.name.toLowerCase();
      return v.lang.startsWith("en") && (nameLower.includes("female") || nameLower.includes("google") || nameLower.includes("apple"));
    }) || voices.find((v) => v.lang.startsWith("en"));
    
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    activeUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const cancelSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const toggleVoiceMuted = () => {
    setVoiceMuted((prev) => {
      const newVal = !prev;
      if (newVal) {
        cancelSpeech();
      } else {
        // Read the last model response if unmuted
        const lastModelMsg = [...messages].reverse().find((m) => m.role === "model");
        if (lastModelMsg) {
          // Speak with a slight timeout to let browser state lock in
          setTimeout(() => speakText(lastModelMsg.text), 50);
        }
      }
      return newVal;
    });
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error("Failed starting speech recognition session", e);
      }
    }
  };

  const handleSend = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || loading) return;

    // User message
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    cancelSpeech();

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: chatHistory }),
      });

      if (!res.ok) throw new Error("API Callback failed");
      const data = await res.json();
      const reply = data.text || "Hello! Ask me any professional inquiry regarding Alla Naga Lokesh Sai.";
      
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
      speakText(reply);

    } catch (e) {
      console.error("AI assistant endpoint query error:", e);
      const mockReply = getFloatingFallback(trimmed);
      setMessages((prev) => [...prev, { role: "model", text: mockReply }]);
      speakText(mockReply);
    } finally {
      setLoading(false);
    }
  };

  const getFloatingFallback = (q: string): string => {
    const query = q.toLowerCase();
    if (query.includes("tech") || query.includes("stack") || query.includes("language")) {
      return "Lokesh develops primarily with **Python**, **Java**, **TypeScript**, and **Go**. He leverages Spring Boot, React, FastAPI, PostgreSQL, and pgvector.";
    }
    if (query.includes("rag") || query.includes("pipeline") || query.includes("claude")) {
      return "Lokesh engineered a high-density **RAG pipeline** powered by Claude API & LangChain, capturing over 1,000 queries per day at 91% accuracy.";
    }
    if (query.includes("avail") || query.includes("hire") || query.includes("job") || query.includes("visa") || query.includes("opt")) {
      return "Alla Naga Lokesh Sai is actively available to start full-time software or AI engineering roles. He is USA OPT work authorized and is open to hybrid, remote, or physical relocation.";
    }
    if (query.includes("cgpa") || query.includes("gpa") || query.includes("veltech") || query.includes("university") || query.includes("education")) {
      return "Lokesh completed MS in CS at Villanova University (3.5 GPA) and finished BTech in CSE at Veltech University with a **9.1 CGPA / 4.0 GPA** and Honors.";
    }
    return "Lokesh has 3+ years of experience delivering cloud microservices and automated workflows. Drop him an email: **lokesh8286235@gmail.com** !";
  };

  return (
    <>
      {/* Dynamic Action Trigger with signature helper glow */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 flex items-center justify-center cursor-pointer"
        title="Interact with Recruiter Assistant"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
          </div>
        )}
        <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-indigo-400 rounded-full border-2 border-white animate-ping opacity-75" />
      </button>

      {/* Primary Mini Assistant Drawer Canvas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.94 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-[370px] max-w-[calc(100vw-3rem)] h-[480px] rounded-3xl bg-white border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Header with Google Assistant Multicolored Wave Accent */}
            <div className="relative">
              
              {/* Google Multicolored Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="w-1/4 h-full bg-[#4285F4]" /> {/* Blue */}
                <div className="w-1/4 h-full bg-[#EA4335]" /> {/* Red */}
                <div className="w-1/4 h-full bg-[#FBBC05]" /> {/* Yellow */}
                <div className="w-1/4 h-full bg-[#34A853]" /> {/* Green */}
              </div>

              <div className="bg-slate-50/60 backdrop-blur-xs border-b border-slate-200/60 px-5 py-4 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-sans text-xs font-bold shadow-md shadow-indigo-200">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-black text-slate-900 uppercase tracking-widest leading-none flex items-center gap-1.5">
                      LOKESH.AI
                      <span className="bg-indigo-50 border border-indigo-150 text-[8px] font-mono font-bold text-indigo-600 uppercase px-1.5 py-0.5 rounded-sm">
                        Recruiter Assistant
                      </span>
                    </h4>
                    <p className="text-[9.5px] text-slate-500 font-sans tracking-wide mt-1.5 leading-normal max-w-[195px] font-normal">
                      Ask questions about projects, skills, education, work authorization, and experience.
                    </p>
                  </div>
                </div>

                {/* Speech and Close Toggles */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleVoiceMuted}
                    className={`p-2 rounded-lg transition-all border outline-none ${
                      !voiceMuted
                        ? "bg-emerald-50 text-emerald-600 border-emerald-155 border-emerald-250 border-emerald-100"
                        : "text-slate-400 hover:text-slate-650 hover:bg-slate-100 border-transparent"
                    } cursor-pointer`}
                    title={voiceMuted ? "Unmute Assistant voice response" : "Mute assistant voice response"}
                  >
                    {voiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-bounce" />}
                  </button>

                  <button
                    onClick={() => {
                      cancelSpeech();
                      setIsOpen(false);
                    }}
                    className="text-slate-400 hover:text-slate-700 outline-none hover:bg-slate-100 p-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Feed */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-5 space-y-4 flex flex-col scroll-smooth bg-slate-50/50"
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    m.role === "user" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <span className="text-[8px] text-slate-400 font-mono tracking-wider mb-1 uppercase font-bold">
                    {m.role === "user" ? "You" : "Lokesh.AI Assistant"}
                  </span>
                  <div
                    className={`p-3.5 rounded-2xl text-[11.5px] text-left leading-relaxed font-sans shadow-2xs border ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white border-indigo-600 rounded-br-none"
                        : "bg-white border-slate-205 border-slate-150 text-slate-700 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Loader with pulsing waveform design */}
              {loading && (
                <div className="flex flex-col items-start gap-1 p-2 bg-white/60 border border-slate-200/50 rounded-xl max-w-[140px] shadow-2xs">
                  <div className="flex items-center gap-1.5 text-slate-450 font-mono text-[8px] uppercase tracking-wider font-extrabold ml-1">
                    <span className="w-1 h-1 bg-indigo-600 rounded-full animate-ping" />
                    Assistant Sync
                  </div>
                  {/* Colorful Waverunner simulation */}
                  <div className="flex items-end gap-1 h-5 pl-1.5 pt-1">
                    <span className="w-0.75 h-2 bg-[#4285F4] rounded-xs animate-bounce [animation-delay:-0.32s]" />
                    <span className="w-0.75 h-4 bg-[#EA4335] rounded-xs animate-bounce [animation-delay:-0.16s]" />
                    <span className="w-0.75 h-3 bg-[#FBBC05] rounded-xs animate-bounce [animation-delay:-0.24s]" />
                    <span className="w-0.75 h-1.5 bg-[#34A853] rounded-xs animate-bounce" />
                  </div>
                </div>
              )}

              {/* Listening Active Overlay wave */}
              {isListening && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center p-3.5 bg-slate-100/80 border border-dashed border-red-200 rounded-2xl text-center shadow-xs"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-mono text-[9px] font-black text-red-650 uppercase tracking-wider text-red-600">
                      Listening Live Input
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">
                    "Say what programming languages Lokesh knows..."
                  </p>
                </motion.div>
              )}
            </div>

            {/* Suggestion Chips list */}
            <div className="px-4 border-t border-slate-100 py-2.5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap bg-white scrollbar-none">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  disabled={loading}
                  className="px-3 py-1 rounded-full border border-slate-200 text-[9px] text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-50 hover:border-indigo-300 transition-all uppercase font-mono cursor-pointer font-bold shadow-3xs"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form footer with Dynamic Microphone Voice Trigger */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2.5"
            >
              {/* Optional Microphones dictation check banner */}
              {recognitionRef.current ? (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer border ${
                    isListening
                      ? "bg-gradient-to-tr from-rose-500 to-red-500 text-white border-red-400 rotate-12 scale-105"
                      : "bg-white text-slate-600 border-slate-200 hover:border-red-200 hover:text-red-550 hover:text-red-600"
                  }`}
                  title={isListening ? "Listening... Click to lock-in text" : "Start speaking voice query"}
                >
                  <Mic className={`w-3.5 h-3.5 ${isListening ? "animate-pulse" : ""}`} />
                </button>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 opacity-40 cursor-not-allowed flex items-center justify-center" title="Voice Input not supported in your browser context">
                  <MicOff className="w-3.5 h-3.5" />
                </div>
              )}

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening closely... speak now" : "Type a query or speak to ask assistant..."}
                disabled={isListening}
                className="flex-grow bg-white border border-slate-200/90 rounded-xl text-xs text-slate-800 outline-none placeholder:text-slate-400 font-sans px-3.5 py-2.5 focus:border-indigo-400 transition-colors shadow-2xs"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading || isListening}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-20 cursor-pointer shadow-md shadow-indigo-100"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
