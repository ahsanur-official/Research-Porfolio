import { useState, useEffect } from "react";
import {
  Menu,
  X,
  BookOpen,
  FileText,
  Github,
  Linkedin,
  Mail,
  Phone,
  User,
  GraduationCap,
  Layers,
  Cpu,
  Trophy,
  Award,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Network,
  HeartHandshake,
  Globe
} from "lucide-react";
import { PROFILE_DATA } from "../data/profile";

interface NavbarProps {
  researchMode: boolean;
  onToggleResearchMode: () => void;
  onOpenCvModal: () => void;
}

export function Navbar({ researchMode, onToggleResearchMode, onOpenCvModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [drawerOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = researchMode
    ? [
        { label: "Research & Publications", href: "#publications", number: "01", icon: <BookOpen className="w-4 h-4 text-sky-400" />, badge: "Peer-Reviewed" },
        { label: "Research Interests & Lab Thrusts", href: "#research", number: "02", icon: <Cpu className="w-4 h-4 text-indigo-400" />, badge: "EEG & BCI" },
        { label: "Neural Bypass Pipeline (Thesis)", href: "#pipeline", number: "03", icon: <Network className="w-4 h-4 text-purple-400" />, badge: "CycleGAN" },
        { label: "Scholastic Timeline (CGPA 3.83)", href: "#education", number: "04", icon: <GraduationCap className="w-4 h-4 text-cyan-300" />, badge: "Top Rank" },
        { label: "About Researcher & Vision", href: "#about", number: "05", icon: <User className="w-4 h-4 text-cyan-400" /> },
        { label: "Scientific & Applied Projects", href: "#projects", number: "06", icon: <Layers className="w-4 h-4 text-emerald-400" /> },
        { label: "Technical Arsenal & ML Stack", href: "#skills", number: "07", icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
        { label: "Honors & Achievements", href: "#achievements", number: "08", icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
        { label: "Academic Leadership & Roles", href: "#leadership", number: "09", icon: <Award className="w-4 h-4 text-blue-400" /> },
        { label: "Certifications", href: "#certifications", number: "10", icon: <ShieldCheck className="w-4 h-4 text-emerald-300" /> },
        { label: "Languages (IELTS Academic 6.0)", href: "#languages", number: "11", icon: <Globe className="w-4 h-4 text-teal-400" />, badge: "Proficient" },
        { label: "Volunteering & Community", href: "#volunteering", number: "12", icon: <HeartHandshake className="w-4 h-4 text-pink-400" /> },
        { label: "Contact & Academic References", href: "#contact", number: "13", icon: <Mail className="w-4 h-4 text-rose-400" /> },
      ]
    : [
        { label: "About Me", href: "#about", number: "01", icon: <User className="w-4 h-4 text-cyan-400" /> },
        { label: "Research & Publications", href: "#publications", number: "02", icon: <BookOpen className="w-4 h-4 text-sky-400" /> },
        { label: "Research Interests", href: "#research", number: "03", icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
        { label: "Neural Bypass Pipeline", href: "#pipeline", number: "04", icon: <Network className="w-4 h-4 text-purple-400" /> },
        { label: "Featured Projects", href: "#projects", number: "05", icon: <Layers className="w-4 h-4 text-emerald-400" /> },
        { label: "Technical Arsenal", href: "#skills", number: "06", icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
        { label: "Academic Timeline", href: "#education", number: "07", icon: <GraduationCap className="w-4 h-4 text-cyan-300" /> },
        { label: "Leadership & Community", href: "#leadership", number: "08", icon: <Award className="w-4 h-4 text-blue-400" /> },
        { label: "Honors & Achievements", href: "#achievements", number: "09", icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
        { label: "Certifications", href: "#certifications", number: "10", icon: <ShieldCheck className="w-4 h-4 text-emerald-300" /> },
        { label: "Volunteering & Community", href: "#volunteering", number: "11", icon: <HeartHandshake className="w-4 h-4 text-pink-400" /> },
        { label: "Languages (IELTS 6.0)", href: "#languages", number: "12", icon: <Globe className="w-4 h-4 text-teal-400" /> },
        { label: "Contact & References", href: "#contact", number: "13", icon: <Mail className="w-4 h-4 text-rose-400" /> },
      ];

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Fixed Navbar: Clean brand and hamburger button */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/90 py-2 sm:py-2.5 shadow-2xl"
            : "bg-[#07090e]/80 backdrop-blur-sm border-b border-slate-900/60 py-2.5 sm:py-3.5"
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Left: Brand name */}
            <a
              href="#"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md min-w-0 cursor-pointer"
            >
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
              <span className="font-display font-extrabold text-sm xs:text-base sm:text-lg lg:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors truncate">
                MD. AHSANUR RAHAMAN
              </span>
              <span className="text-xs font-mono text-cyan-400/90 pl-2.5 border-l border-slate-800 hidden md:inline-block">
                AI / BCI Researcher
              </span>
            </a>

            {/* Right: Quick actions + Hamburger Icon Button */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Direct Desktop & Tablet Toggle for Research Mode (hidden on mobile screen to prevent cramping) */}
              <button
                onClick={onToggleResearchMode}
                className={`hidden sm:flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all cursor-pointer ${
                  researchMode
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                    : "bg-slate-900/90 border-slate-700/80 text-slate-300 hover:border-cyan-500/50 hover:text-white"
                }`}
                title={researchMode ? "Switch to Engineering View" : "Switch to Academic Research View"}
                aria-label="Toggle Research Mode"
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    researchMode ? "bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(6,182,212,1)]" : "bg-slate-500"
                  }`}
                />
                <span>
                  {researchMode ? "Research: ON" : "Research Mode"}
                </span>
              </button>

              {/* Direct CV Button on tablet/desktop */}
              <button
                onClick={onOpenCvModal}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-semibold text-cyan-300 hover:text-white transition-all cursor-pointer"
                title="View Academic Curriculum Vitae"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>CV</span>
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 text-cyan-400 hover:text-white transition-all shadow-md group focus:outline-none focus:ring-2 focus:ring-cyan-400 shrink-0 cursor-pointer"
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Hamburger Drawer Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer content panel */}
          <aside
            className="relative w-full max-w-full sm:max-w-md md:max-w-lg h-full bg-[#080c16] border-l border-cyan-900/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col z-10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Drawer"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 bg-[#060912] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Navigation & Quick Actions
                </span>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
              {/* Researcher Mini Summary */}
              <div className="p-3 sm:p-3.5 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30 flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-cyan-400/50 shrink-0 bg-slate-800 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <img
                    src="/assets/images/ahsanur_main.jpg"
                    alt="Md. Ahsanur Rahaman"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">
                    Md. Ahsanur Rahaman
                  </div>
                  <div className="text-xs text-slate-400 font-mono truncate">
                    B.Sc CSE · CGPA 3.83 / 4.00
                  </div>
                  <div className="text-[11px] text-cyan-400 truncate">
                    Pundra University of Science & Technology
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-2">
                {/* Curriculum Vitae Button */}
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenCvModal();
                  }}
                  className="w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>View Curriculum Vitae</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-75 shrink-0" />
                </button>

                {/* Research Mode Toggle */}
                <button
                  onClick={onToggleResearchMode}
                  className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 rounded-xl border transition-all text-left ${
                    researchMode
                      ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold">
                        {researchMode ? "Research Mode: ON" : "Research Mode: OFF"}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {researchMode
                          ? "Prioritizing publications & neural pipeline"
                          : "Switch to prioritize academic research view"}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-4 rounded-full transition-colors relative shrink-0 ${
                      researchMode ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                        researchMode ? "left-4" : "left-1"
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1 pt-1">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest px-2 mb-2">
                  Directory Sections
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="p-1 rounded-md bg-slate-900 border border-slate-800 group-hover:border-slate-700 shrink-0">
                          {item.icon}
                        </span>
                        <span className="font-medium truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 ml-2">
                        {item.number}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Social and Contact Links with Icons */}
              <div className="pt-3 border-t border-slate-800 space-y-2.5">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest px-2">
                  Connect & Social
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={PROFILE_DATA.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={PROFILE_DATA.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-[#0a66c2] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={`mailto:${PROFILE_DATA.contact.email}`}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors col-span-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="truncate">{PROFILE_DATA.contact.email}</span>
                  </a>

                  <a
                    href={`tel:${PROFILE_DATA.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors col-span-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{PROFILE_DATA.contact.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-slate-800 bg-[#060912] text-center text-[10px] font-mono text-slate-500 shrink-0">
              © 2026 Md. Ahsanur Rahaman · Verified Portfolio
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
