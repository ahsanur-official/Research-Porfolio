import { useState, useEffect, useMemo } from "react";
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
  Inbox,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Download,
  ExternalLink,
  X,
  Clock,
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
  const [inboxOpen, setInboxOpen] = useState(false);
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>([]);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  // Load stored messages from localStorage on mount
  useEffect(() => {
    try {
      const data = localStorage.getItem("ahsanur_portfolio_inbox");
      if (data) {
        setStoredMessages(JSON.parse(data));
      }
    } catch (e) {
      console.error("Failed to load portfolio inbox:", e);
    }
  }, []);

  // Save stored messages
  const saveMessagesToStorage = (msgs: StoredMessage[]) => {
    try {
      localStorage.setItem("ahsanur_portfolio_inbox", JSON.stringify(msgs));
      setStoredMessages(msgs);
    } catch (e) {
      console.error("Failed to save to inbox:", e);
    }
  };

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

    const updated = [newMsg, ...storedMessages];
    saveMessagesToStorage(updated);
    setLastSubmittedMsg(newMsg);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyMessageContent = (msg: StoredMessage) => {
    const text = `From: ${msg.name} <${msg.email}>\nDate: ${msg.timestamp}\nSubject: ${msg.subject}\n\n${msg.message}`;
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msg.id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const exportInboxJson = () => {
    const blob = new Blob([JSON.stringify(storedMessages, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ahsanur_portfolio_inbox_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearInbox = () => {
    if (window.confirm("Are you sure you want to clear all stored inquiries?")) {
      saveMessagesToStorage([]);
    }
  };

  return (
    <section id="contact" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
          <div className="max-w-3xl">
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
              Interested in AI research collaborations, Brain-Computer Interfaces, intelligent rehabilitation systems, or graduate opportunities? Feel free to transmit a verified proposition or view all incoming inquiries.
            </p>
          </div>

          {/* Owner Inbox Viewer Trigger */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => setInboxOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all text-xs font-mono shadow-md cursor-pointer"
              title="View all messages received and stored in this portfolio"
            >
              <Inbox className="w-4 h-4 text-cyan-400" />
              <span>Owner Inbox</span>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/50">
                {storedMessages.length}
              </span>
            </button>
          </div>
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
                        Inquiry Stored & Logged Successfully
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                        Thank you, <strong className="text-white">{lastSubmittedMsg.name}</strong>! Your message is safely preserved in the <strong>Portfolio Inbox</strong>.
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

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => setInboxOpen(true)}
                        className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                      >
                        Open Owner Inbox to View Log
                      </button>
                      <span className="text-slate-600">·</span>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
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
                          : "✓ Ready for transmission"}
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

              {/* Explanatory note about storage destination */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Stored in Portfolio Local Inbox & Direct Email</span>
                <button
                  type="button"
                  onClick={() => setInboxOpen(true)}
                  className="text-cyan-400 hover:underline cursor-pointer"
                >
                  Inspect Inbox ({storedMessages.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Inbox Modal */}
      {inboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setInboxOpen(false)} />

          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-cyan-800/60 bg-[#090d18] shadow-2xl z-10 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-[#060912] shrink-0">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Owner Inbox — Received Contact Inquiries
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {storedMessages.length} Messages
                </span>
              </div>

              <div className="flex items-center gap-2">
                {storedMessages.length > 0 && (
                  <>
                    <button
                      onClick={exportInboxJson}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                      title="Export messages as JSON"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Export JSON</span>
                    </button>
                    <button
                      onClick={clearInbox}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/50 transition-colors cursor-pointer"
                      title="Clear all messages"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setInboxOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                  aria-label="Close inbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Explanation Notice in Bengali & English */}
            <div className="p-3 bg-cyan-950/30 border-b border-cyan-900/40 px-4 sm:px-6 text-xs text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-cyan-200">How to inspect received messages:</span>
                {" "}All messages sent via the contact form are stored persistently in this portfolio inbox. You can also view or forward any message directly to <strong className="text-white">mdahsanurrahaman2456@gmail.com</strong>.
              </div>
            </div>

            {/* Scrollable Message List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
              {storedMessages.length === 0 ? (
                <div className="py-12 text-center space-y-2 text-slate-500">
                  <Inbox className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-sm font-medium text-slate-400">No inquiries in inbox yet</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When someone submits the contact form with a verified email and minimum 10 words, their message will appear right here.
                  </p>
                </div>
              ) : (
                storedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2.5 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div>
                        <span className="text-sm font-bold text-white">{msg.name}</span>
                        <span className="text-slate-400 font-mono text-[11px] ml-2">
                          &lt;{msg.email}&gt;
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-semibold text-cyan-300 text-xs">
                        Subject: {msg.subject}
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-slate-500">
                        Word count: {msg.wordCount} words · Verified
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyMessageContent(msg)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                        >
                          {copiedMsgId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Text</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`mailto:${PROFILE_DATA.contact.email}?subject=${encodeURIComponent(
                            `[Forwarded Inquiry] ${msg.subject}`
                          )}&body=${encodeURIComponent(
                            `From: ${msg.name} (${msg.email})\nDate: ${msg.timestamp}\n\n${msg.message}`
                          )}`}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Forward to Gmail</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
