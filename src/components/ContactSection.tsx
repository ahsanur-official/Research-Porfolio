import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Send, Check, Copy, UserCheck } from "lucide-react";
import { PROFILE_DATA } from "../data/profile";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

interface ContactSectionProps {
  onOpenCvModal: () => void;
}

export function ContactSection({ onOpenCvModal }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 5000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-1.5">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>13. Direct Communication & Academic Referees</span>
            </div>
            <ReadingTimeBadge time="1.5 min" wordCount={290} />
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Let's Build Something Meaningful
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl text-justify">
            Interested in AI research collaborations, Brain-Computer Interfaces, intelligent rehabilitation systems, or graduate research opportunities? Feel free to connect directly or reach out to my academic referees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Direct Info & References */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* Contact details card */}
            <div className="p-4 sm:p-6 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 space-y-4 shadow-[0_0_25px_rgba(6,182,212,0.12)] interactive-card">
              <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                Direct Contact Channels
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Email Address</div>
                      <a
                        href={`mailto:${PROFILE_DATA.contact.email}`}
                        className="text-slate-100 hover:text-cyan-400 transition-colors font-medium break-all"
                      >
                        {PROFILE_DATA.contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-slate-300 pb-2.5 border-b border-slate-800/80">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Mobile / WhatsApp</div>
                    <a
                      href="https://wa.me/8801776890648"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-100 hover:text-emerald-400 transition-colors font-mono"
                    >
                      {PROFILE_DATA.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300 pb-2.5 border-b border-slate-800/80">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs text-slate-400 font-mono">Addresses</div>
                    <div className="text-slate-200 font-medium">
                      Current: {PROFILE_DATA.personalInfo.presentAddress}
                    </div>
                    <div className="text-xs text-slate-400">
                      Permanent: {PROFILE_DATA.personalInfo.permanentAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="text-xs text-slate-400 font-mono">Verified Profiles:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={PROFILE_DATA.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={PROFILE_DATA.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-[#0a66c2] transition-colors cursor-pointer"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={onOpenCvModal}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all shadow-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View & Print Academic Curriculum Vitae (CV)</span>
                </button>
              </div>
            </div>

            {/* Academic References Grid - displaying BOTH referees from CV */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Academic Referees ({PROFILE_DATA.references.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PROFILE_DATA.references.map((ref, idx) => (
                  <div
                    key={ref.name}
                    className="p-3.5 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 text-xs space-y-1.5 shadow-md"
                  >
                    <div className="text-[10px] font-mono text-indigo-300 font-semibold uppercase">
                      Referee 0{idx + 1} · {ref.relationship}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        {ref.name}
                      </h4>
                      <p className="text-slate-300 text-[11px] font-medium">
                        {ref.title}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        {ref.department}
                      </p>
                      <p className="text-slate-500 text-[10px]">
                        {ref.institution}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-slate-800/80 font-mono text-[11px] space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-300 truncate">
                        <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                        <a href={`mailto:${ref.email}`} className="hover:text-cyan-300 transition-colors truncate">
                          {ref.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 truncate">
                        <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{ref.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-4 sm:p-6 rounded-2xl border border-slate-800/90 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950 shadow-xl interactive-card h-full flex flex-col justify-between">
              <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3.5">
                Send an Inquiry or Research Proposition
              </h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-2.5 animate-fadeIn">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto text-center leading-relaxed">
                    Thank you, {formData.name || "colleague"}! Your inquiry has been recorded. You can also reach me directly at{" "}
                    <a href={`mailto:${PROFILE_DATA.contact.email}`} className="text-cyan-400 underline">
                      {PROFILE_DATA.contact.email}
                    </a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-xs font-mono text-slate-400">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Jane Doe / John Smith"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm font-sans transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-mono text-slate-400">
                        Your Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="colleague@institution.edu"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm font-sans transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-400">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Research Collaboration / Graduate Admissions / BCI Project"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm font-sans transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-xs font-mono text-slate-400">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your inquiry, collaboration proposition, or research question..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm font-sans transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <div className="text-[11px] font-mono text-slate-500">
                      Replies typically within 24 hours
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
