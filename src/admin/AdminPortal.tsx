import { useState, useEffect, useMemo } from "react";
import {
  Inbox,
  Lock,
  Unlock,
  KeyRound,
  Mail,
  Trash2,
  Download,
  Upload,
  Copy,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  LogOut,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare
} from "lucide-react";
import { PROFILE_DATA } from "../data/profile";
import type { StoredMessage } from "../components/ContactSection";

const DEFAULT_ADMIN_PIN = "2456";

export function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ahsanur_admin_auth") === "true";
    }
    return false;
  });

  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [storedMessages, setStoredMessages] = useState<StoredMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);

  // Load messages from localStorage
  const loadMessages = () => {
    try {
      const data = localStorage.getItem("ahsanur_portfolio_inbox");
      if (data) {
        const parsed: StoredMessage[] = JSON.parse(data);
        setStoredMessages(parsed);
        if (parsed.length > 0 && !activeMessageId) {
          setActiveMessageId(parsed[0].id);
        }
      } else {
        setStoredMessages([]);
      }
    } catch (e) {
      console.error("Failed to load inbox:", e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("ahsanur_admin_auth", "true");
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ahsanur_admin_auth");
  };

  const saveMessages = (msgs: StoredMessage[]) => {
    try {
      localStorage.setItem("ahsanur_portfolio_inbox", JSON.stringify(msgs));
      setStoredMessages(msgs);
    } catch (e) {
      console.error("Failed to save inbox:", e);
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const filtered = storedMessages.filter((m) => m.id !== id);
      saveMessages(filtered);
      if (activeMessageId === id) {
        setActiveMessageId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm("WARNING: Are you sure you want to clear ALL messages from the inbox? This cannot be undone.")) {
      saveMessages([]);
      setActiveMessageId(null);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(storedMessages, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ahsanur_inbox_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          saveMessages(json);
          alert(`Successfully imported ${json.length} messages.`);
        } else {
          alert("Invalid file format. Expected a JSON array of messages.");
        }
      } catch {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter messages based on search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return storedMessages;
    const q = searchQuery.toLowerCase();
    return storedMessages.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
    );
  }, [storedMessages, searchQuery]);

  const activeMsg = useMemo(() => {
    return storedMessages.find((m) => m.id === activeMessageId) || filteredMessages[0] || null;
  }, [storedMessages, activeMessageId, filteredMessages]);

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <header className="border-b border-slate-800/90 bg-[#080d1a] py-3.5 px-4 sm:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <div>
              <div className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <span>Ahsanur Rahaman</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Private Owner Portal
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Independent Communications & Inquiries Manager
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            <a
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Portfolio</span>
            </a>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 hover:bg-rose-900/50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock Portal</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        {!isAuthenticated ? (
          /* PASSWORD / PIN GATE */
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-cyan-800/50 bg-gradient-to-b from-[#0b1222] to-[#070b16] shadow-2xl text-center space-y-5 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Owner Authentication
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Enter your private security PIN to access the message inbox.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1 text-left">
                  <label htmlFor="pin" className="block text-xs font-mono text-slate-300">
                    Security Passcode / PIN:
                  </label>
                  <div className="relative">
                    <input
                      id="pin"
                      type="password"
                      autoFocus
                      required
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-center tracking-widest text-lg font-mono font-bold"
                    />
                    <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {pinError && (
                    <p className="text-xs text-rose-400 font-mono mt-1">
                      Invalid passcode. Hint: 2456 (last 4 digits of email).
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer font-sans"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Admin Portal</span>
                </button>
              </form>

              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                🔒 Private Dashboard · Completely hidden from public visitors
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col space-y-5">
            {/* Action Bar & Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase">Total Messages</div>
                  <div className="text-2xl font-bold font-mono text-white mt-0.5">
                    {storedMessages.length}
                  </div>
                </div>
                <Inbox className="w-8 h-8 text-cyan-400/40" />
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-emerald-400 uppercase">Verified Senders</div>
                  <div className="text-2xl font-bold font-mono text-white mt-0.5">
                    {storedMessages.length}
                  </div>
                </div>
                <ShieldCheck className="w-8 h-8 text-emerald-400/40" />
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-indigo-400 uppercase">Forwarding Target</div>
                  <div className="text-xs font-mono text-indigo-200 mt-1 truncate max-w-[180px]">
                    {PROFILE_DATA.contact.email}
                  </div>
                </div>
                <Mail className="w-8 h-8 text-indigo-400/40" />
              </div>
            </div>

            {/* Toolbar: Search & Action Buttons */}
            <div className="p-3 sm:p-4 rounded-xl bg-[#080d1a] border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sender, email, subject, or words..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <button
                  onClick={loadMessages}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Reload stored messages"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleExportJson}
                  disabled={storedMessages.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                  title="Export messages as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export JSON</span>
                </button>

                <label
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Import JSON backup"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Import JSON</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>

                {storedMessages.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 hover:bg-rose-900/50 transition-colors cursor-pointer"
                    title="Clear all stored messages"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Split Screen Master-Detail Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[500px]">
              {/* Left Column: Message List */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#080d1a] flex flex-col overflow-hidden max-h-[700px]">
                <div className="p-3 border-b border-slate-800 bg-[#060912] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Messages ({filteredMessages.length})</span>
                  <span>Sorted by Newest</span>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80 p-1.5 space-y-1">
                  {filteredMessages.length === 0 ? (
                    <div className="py-16 text-center text-slate-500 space-y-2">
                      <Inbox className="w-10 h-10 mx-auto text-slate-600" />
                      <p className="text-sm font-medium">No messages found</p>
                      <p className="text-xs text-slate-600 max-w-xs mx-auto">
                        When people contact you through the portfolio, their verified messages will appear here.
                      </p>
                    </div>
                  ) : (
                    filteredMessages.map((msg) => {
                      const isSelected = activeMessageId === msg.id;
                      return (
                        <div
                          key={msg.id}
                          onClick={() => setActiveMessageId(msg.id)}
                          className={`p-3 rounded-xl transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-cyan-950/60 border border-cyan-500/50 shadow-md"
                              : "bg-slate-900/40 hover:bg-slate-900 border border-transparent"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-sm text-white truncate">{msg.name}</span>
                            <span className="text-[10px] font-mono text-slate-500 shrink-0">
                              {msg.timestamp.split(",")[0]}
                            </span>
                          </div>

                          <div className="text-xs text-cyan-300 font-medium truncate mt-0.5">
                            {msg.subject}
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                            {msg.message}
                          </p>

                          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                            <span className="truncate max-w-[180px]">&lt;{msg.email}&gt;</span>
                            <span className="text-emerald-400">{msg.wordCount} words</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Full Message Reading Pane */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#080d1a] flex flex-col overflow-hidden max-h-[700px]">
                {activeMsg ? (
                  <div className="flex-1 flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#060912] space-y-3 shrink-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {activeMsg.subject}
                          </h2>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                            <span className="font-semibold text-slate-200">{activeMsg.name}</span>
                            <span className="text-slate-400 font-mono">&lt;{activeMsg.email}&gt;</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                              Verified
                            </span>
                          </div>
                        </div>

                        {/* Top action buttons */}
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <button
                            onClick={() => copyText(activeMsg.message, "msg")}
                            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Copy message body"
                          >
                            {copiedId === "msg" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => handleDeleteMessage(activeMsg.id)}
                            className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:text-rose-200 transition-colors cursor-pointer"
                            title="Delete this message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{activeMsg.timestamp}</span>
                        </div>
                        <div>
                          <span>Length: </span>
                          <strong className="text-slate-300">{activeMsg.wordCount} words</strong>
                        </div>
                      </div>
                    </div>

                    {/* Message Body Content */}
                    <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-text font-sans">
                        {activeMsg.message}
                      </div>

                      {/* Reply Quick Action */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-800/40 space-y-2">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                          <span>Direct Reply via Gmail:</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Launch your default email client to reply directly to <strong>{activeMsg.email}</strong> with your academic/research signature.
                        </p>
                        <div className="pt-1">
                          <a
                            href={`mailto:${activeMsg.email}?subject=${encodeURIComponent(
                              `Re: ${activeMsg.subject}`
                            )}&body=${encodeURIComponent(
                              `Dear ${activeMsg.name},\n\nThank you for reaching out.\n\n\nBest regards,\nMd. Ahsanur Rahaman\nAI/ML Researcher & Computer Science Engineer\nPundra University of Science & Technology\nEmail: mdahsanurrahaman2456@gmail.com\nPhone: +880 1776 890648`
                            )}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply to {activeMsg.name}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
                    <p className="text-sm">Select a message on the left to read its contents.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060911] py-3 text-center text-[11px] font-mono text-slate-500 shrink-0">
        © 2026 Md. Ahsanur Rahaman · Private Owner Management Portal
      </footer>
    </div>
  );
}
