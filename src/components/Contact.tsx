import React, { useState } from "react";
import { Mail, Phone, Linkedin, Send, Sparkles, CheckCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  onRequestResume: () => void;
}

export default function Contact({ onRequestResume }: ContactProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !body.trim()) return;

    setSending(true);

    try {
      // 1. Send the message payload securely to our cloud/server-side api
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          subject: subject.trim(),
          body: body.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Local server was unable to store communication transit.");
      }

      // 2. Prepare mailto backup redirect URL 
      const mailtoUrl = `mailto:lokesh8286235@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact Message")}&body=${encodeURIComponent(`Client Email: ${email}\n\nMessage:\n${body}`)}`;

      setSending(false);
      setSuccess(true);

      // Attempt to trigger the native mail client, ignoring standard sandbox wrapper limits
      try {
        window.location.href = mailtoUrl;
      } catch (redirErr) {
        console.warn("Mail client launch deferred inside sandbox preview window.");
      }
    } catch (err) {
      console.error("API transmission failed. Falling back strictly to user client trigger:", err);
      
      const mailtoUrl = `mailto:lokesh8286235@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact Message")}&body=${encodeURIComponent(`Client Email: ${email}\n\nMessage:\n${body}`)}`;
      
      setSending(false);
      setSuccess(true);
      
      try {
        window.location.href = mailtoUrl;
      } catch (redirErr) {
        console.warn("Mail client launch deferred.");
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setSubject("");
    setBody("");
    setSuccess(false);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto border-t border-slate-200 select-none">
      
      {/* Detail header */}
      <div className="mb-14 text-left">
        <span className="font-mono text-[9px] tracking-[0.25em] text-indigo-600 uppercase block mb-1 font-bold">
          CONVERGE & CONNECT
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Let's Connect
        </h2>
        <p className="text-slate-650 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed whitespace-pre-line font-medium">
          I'm currently seeking Software Engineering and AI Systems opportunities.

          Feel free to reach out regarding interviews, opportunities, collaborations, or technical discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Contact Links Column */}
        <div className="lg:col-span-2 space-y-3.5">
          <a
            href="mailto:lokesh8286235@gmail.com"
            className="flex items-center gap-4 p-4.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/10 hover:shadow-xs transition-all duration-300 text-left cursor-pointer group shadow-sm"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-all duration-300">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold">
                Email
              </span>
              <span className="block font-sans text-xs sm:text-sm font-bold text-slate-800 mt-1">
                lokesh8286235@gmail.com
              </span>
            </div>
          </a>

          <a
            href="tel:+14842535918"
            className="flex items-center gap-4 p-4.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/10 hover:shadow-xs transition-all duration-300 text-left cursor-pointer group shadow-sm"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-all duration-300">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold">
                Phone
              </span>
              <span className="block font-sans text-xs sm:text-sm font-bold text-slate-800 mt-1">
                +1 (484) 253-5918
              </span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/naga-lokesh-sai-alla-538242251/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50/10 hover:shadow-xs transition-all duration-300 text-left cursor-pointer group shadow-sm"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-all duration-300">
              <Linkedin className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold">
                LinkedIn
              </span>
              <span className="block font-sans text-xs sm:text-sm font-bold text-slate-800 mt-1 truncate max-w-[190px] sm:max-w-none">
                linkedin.com/in/naga-lokesh-sai-alla
              </span>
            </div>
          </a>

          {/* Core Document Quick pull */}
          <div
            onClick={onRequestResume}
            className="flex items-center gap-4 p-4.5 rounded-xl bg-white border border-indigo-150 hover:border-indigo-400 hover:shadow-xs transition-all duration-300 text-left cursor-pointer group shadow-sm"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white rounded-lg transition-all duration-300">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-indigo-600 font-bold">
                Resume
              </span>
              <span className="block font-sans text-xs font-bold text-slate-800 mt-1">
                View Resume
              </span>
            </div>
          </div>
        </div>

        {/* Form Container Panel */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden relative">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold">
                      Your Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. recruiter@agency.com"
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-indigo-500 focus:bg-white rounded-lg py-2.5 px-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Schedule Tech Call"
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-indigo-500 focus:bg-white rounded-lg py-2.5 px-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-slate-450 font-bold">
                    Message Body
                  </label>
                  <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    placeholder="Describe your inquiry, position parameters, or team bounds..."
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-indigo-500 focus:bg-white rounded-lg py-2.5 px-4 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 resize-none animate-fade-in"
                  />
                </div>

                <div className="pt-2 text-left">
                  <button
                    disabled={sending}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold uppercase tracking-wider leading-none rounded-lg transition-all duration-300 disabled:opacity-50 cursor-pointer text-left focus:ring-1 focus:ring-indigo-500/40 shadow-sm font-bold"
                  >
                    {sending ? (
                      <span className="flex items-center gap-1.5 font-bold animate-pulse">
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-extrabold text-slate-900 tracking-tight">
                  Transmission Secure
                </h3>
                <p className="text-slate-600 text-xs mt-2 max-w-xs leading-relaxed font-sans">
                  Thank you! Your message client has been initialized. Click send in your email client to transmit the message. Alla Naga Lokesh Sai will follow up shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="font-mono text-[9px] uppercase tracking-widest text-indigo-600 hover:text-indigo-700 mt-6 border-b border-indigo-300 cursor-pointer font-bold duration-200"
                >
                  Clear & Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
