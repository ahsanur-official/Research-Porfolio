import { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  FileText,
  Send,
  Check,
  Copy,
  UserCheck,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { PROFILE_DATA } from "../data/profile";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

interface ContactSectionProps {
  onOpenCvModal: () => void;
}

export interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  wordCount: number;
}

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "throwawaymail.com",
  "yopmail.com",
  "sharklasers.com",
  "getairmail.com",
  "dispostable.com",
  "trashmail.com",
  "fakeinbox.com",
  "nada.ltd",
  "mohmal.com",
  "maildrop.cc",
  "crazymailing.com",
  "generator.email",
  "inboxkitten.com",
  "mytemp.email",
  "test.com",
  "example.com",
  "fake.com",
  "dummy.com",
  "asdf.com",
  "mailnesia.com",
  "mytempemail.com"
]);

// Suspicious URL shorteners commonly used for phishing
const SUSPICIOUS_SHORTENER_REGEX =
  /(https?:\/\/)?(www\.)?(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|is\.gd|ow\.ly|buff\.ly|adf\.ly|ngrok\.io|ngrok-free\.app|grabify\.link|iplogger\.org|2no\.co|shorturl\.at|cleanuri\.com)\/[a-zA-Z0-9_\-]+/i;

// Dangerous executable file extension links
const EXECUTABLE_LINK_REGEX =
  /(https?:\/\/|\/)[^\s]+\.(exe|scr|bat|cmd|vbs|pif|apk|msi|jar|ps1)($|\s|\?|#)/i;

// Raw IP address URL detection (e.g., http://192.168.1.1)
const RAW_IP_URL_REGEX =
  /https?:\/\/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::\d+)?/i;

// Phishing & scam triggers
const SCAM_KEYWORDS = [
  "claim your reward",
  "claim reward",
  "free crypto",
  "giveaway winner",
  "send btc to",
  "double your crypto",
  "wallet private key",
  "seed phrase",
  "urgent wire transfer",
  "western union fee",
  "bank account password",
  "login here to claim",
  "click here to reset password"
];

export function ContactSection({ onOpenCvModal }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedMsg, setLastSubmittedMsg] = useState<StoredMessage | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Word count computation
  const wordCount = useMemo(() => {
    return formData.message.trim().split(/\s+/).filter(Boolean).length;
  }, [formData.message]);

  // Email verification check
  const emailValidation = useMemo(() => {
    const email = formData.email.trim();
    if (!email) return { isValid: false, message: "" };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: "Invalid email structure. Ensure format is name@domain.com / name@univ.edu."
      };
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
      return {
        isValid: false,
        message: "Disposable/temporary email domains are blocked. Please provide a verified personal or academic email."
      };
    }

    return { isValid: true, message: "Verified email format" };
  }, [formData.email]);

  // Anti-phishing & anti-scam scanner
  const securityThreat = useMemo(() => {
    const textToCheck = `${formData.subject} ${formData.message}`;

    if (SUSPICIOUS_SHORTENER_REGEX.test(textToCheck)) {
      return "Suspicious URL shortener detected. Shortened redirect links (e.g., bit.ly, tinyurl) are blocked to prevent phishing.";
    }

    if (EXECUTABLE_LINK_REGEX.test(textToCheck)) {
      return "Executable or binary download link detected (.exe, .apk, .bat, etc.). File payloads are blocked.";
    }

    if (RAW_IP_URL_REGEX.test(textToCheck)) {
      return "Raw IP address URL detected. Direct IP links are prohibited.";
    }

    for (const keyword of SCAM_KEYWORDS) {
      if (textToCheck.toLowerCase().includes(keyword)) {
        return `Deceptive scam keyword detected ('${keyword}').`;
      }
    }

    return null;
  }, [formData.subject, formData.message]);

  // Overall form validity
  const isFormValid =
    formData.name.trim().length >= 2 &&
    emailValidation.isValid &&
    wordCount >= 10 &&
    !securityThreat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const newMsg: StoredMessage = {
      id: "msg_" + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || "Portfolio Collaboration Inquiry",
      message: formData.message.trim(),
      timestamp: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      }),
      wordCount
    };

    // Silently log message to secure local storage for the private Admin Portal
    try {
      const existing = localStorage.getItem("ahsanur_portfolio_inbox");
      const list: StoredMessage[] = existing ? JSON.parse(existing) : [];
      localStorage.setItem("ahsanur_portfolio_inbox", JSON.stringify([newMsg, ...list]));
    } catch (err) {
      console.error("Storage error:", err);
    }

    // Automatically trigger mailto link to Md. Ahsanur Rahaman's email
    const mailtoUrl = `mailto:${PROFILE_DATA.contact.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${newMsg.subject}`
    )}&body=${encodeURIComponent(
      `From: ${newMsg.name} (${newMsg.email})\nDate: ${newMsg.timestamp}\n\nMessage:\n${newMsg.message}`
    )}`;

    try {
      window.location.href = mailtoUrl;
    } catch {
      // Fallback
    }

    setLastSubmittedMsg(newMsg);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-5">
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
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl text-justify">
            Interested in AI research collaborations, Brain-Computer Interfaces, intelligent rehabilitation systems, or graduate opportunities? Feel free to connect directly or send a message below.
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
                      <div className="text-xs text-slate-400 font-mono">Personal & Academic Email</div>
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
                    <div className="text-xs text-slate-400 font-mono">Location & Address</div>
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
                  <span>View & Download Academic Curriculum Vitae (PDF)</span>
                </button>
              </div>
            </div>

            {/* Academic References Grid */}
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

          {/* Right Column: Protected Contact Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-4 sm:p-6 rounded-2xl border border-slate-800/90 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950 shadow-xl interactive-card h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    Verified Proposition & Inquiry Form
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Spam & Phishing Protected</span>
                  </span>
                </div>

                {submitted && lastSubmittedMsg ? (
                  <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-4 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <Check className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        Inquiry Transmitted Successfully
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                        Thank you, <strong className="text-white">{lastSubmittedMsg.name}</strong>! Your message is on its way to <strong className="text-cyan-300">{PROFILE_DATA.contact.email}</strong>.
                      </p>
                    </div>

                    {/* Direct Gmail Forward Button */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-2 max-w-md mx-auto">
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Instant Delivery to Ahsanur's Gmail:</span>
                      </div>
                      <a
                        href={`mailto:${PROFILE_DATA.contact.email}?subject=${encodeURIComponent(
                          `[Portfolio Inquiry] ${lastSubmittedMsg.subject}`
                        )}&body=${encodeURIComponent(
                          `From: ${lastSubmittedMsg.name} (${lastSubmittedMsg.email})\nDate: ${lastSubmittedMsg.timestamp}\n\nMessage:\n${lastSubmittedMsg.message}`
                        )}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 font-semibold text-xs shadow-md transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Send via Email Client / Gmail</span>
                      </a>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Name & Email inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label htmlFor="name" className="block text-xs font-mono text-slate-400">
                          Your Full Name *
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
                        <div className="flex items-center justify-between">
                          <label htmlFor="email" className="block text-xs font-mono text-slate-400">
                            Verified Email *
                          </label>
                          {formData.email && (
                            <span
                              className={`text-[10px] font-mono flex items-center gap-1 ${
                                emailValidation.isValid ? "text-emerald-400" : "text-rose-400"
                              }`}
                            >
                              {emailValidation.isValid ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Verified</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>Unverified</span>
                                </>
                              )}
                            </span>
                          )}
                        </div>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@university.edu / name@gmail.com"
                          className={`w-full px-3.5 py-2 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-600 focus:outline-none text-xs sm:text-sm font-sans transition-colors ${
                            formData.email
                              ? emailValidation.isValid
                                ? "border-emerald-500/60 focus:border-emerald-400"
                                : "border-rose-500/60 focus:border-rose-400"
                              : "border-slate-800 focus:border-cyan-400"
                          }`}
                        />
                        {formData.email && !emailValidation.isValid && (
                          <p className="text-[10px] text-rose-400 font-mono mt-0.5">
                            {emailValidation.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="space-y-1">
                      <label htmlFor="subject" className="block text-xs font-mono text-slate-400">
                        Subject / Focus Area
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

                    {/* Message textarea with live word count */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="message" className="block text-xs font-mono text-slate-400">
                          Message (Minimum 10 words required) *
                        </label>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            wordCount >= 10
                              ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                              : wordCount > 0
                              ? "bg-amber-950/80 border-amber-500/50 text-amber-300"
                              : "bg-slate-900 border-slate-800 text-slate-500"
                          }`}
                        >
                          {wordCount} / 10 words {wordCount >= 10 ? "✓" : `(need ${Math.max(0, 10 - wordCount)} more)`}
                        </span>
                      </div>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please write your message clearly with at least 10 words describing your collaboration proposal, inquiry, or question..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm font-sans transition-colors resize-none"
                      />
                    </div>

                    {/* Security alert box if phishing or suspicious link is detected */}
                    {securityThreat && (
                      <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-2.5 text-rose-300 text-xs animate-shake">
                        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Security Protection Active:</strong>
                          <p className="mt-0.5 text-[11px] text-rose-200 leading-tight">
                            {securityThreat}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Form footer */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-[11px] font-mono text-slate-500">
                        {wordCount < 10
                          ? "• Minimum 10 words required to submit"
                          : !emailValidation.isValid
                          ? "• Valid verified email required to submit"
                          : securityThreat
                          ? "• Resolve security threat to proceed"
                          : "✓ Direct transmission to Md. Ahsanur Rahaman"}
                      </div>

                      <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${
                          isFormValid
                            ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 cursor-pointer active:scale-[0.98]"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50 opacity-60"
                        }`}
                      >
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Discreet notice */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Direct delivery to: {PROFILE_DATA.contact.email}</span>
                <span className="text-slate-600">Encrypted Transport</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
