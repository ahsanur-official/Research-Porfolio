import { ArrowDownRight, ArrowRight, Download, Github, Linkedin, Mail, Cpu, Sparkles, BookOpen } from "lucide-react";
import { PROFILE_DATA } from "../data/profile";
import { EegOscilloscope } from "./EegOscilloscope";
import { useTheme } from "../context/ThemeContext";

interface HeroProps {
  onOpenCvModal: () => void;
  researchMode?: boolean;
  onToggleResearchMode?: () => void;
}

export function Hero({ onOpenCvModal, researchMode = false, onToggleResearchMode }: HeroProps) {
  const { activeTheme } = useTheme();

  return (
    <section className={`relative pb-5 sm:pb-8 overflow-hidden ${researchMode ? "pt-6 sm:pt-8" : "pt-20 sm:pt-24"}`}>
      {/* Colorful ambient glowing backdrops adapting to theme */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[450px] blur-3xl pointer-events-none rounded-full transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${activeTheme.bgAlpha} 0%, rgba(30, 27, 75, 0.15) 50%, transparent 75%)`,
        }}
      />
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-950/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-slate-900/40 blur-3xl pointer-events-none rounded-full" />

      {/* Expanded wide container reaching comfortably towards sides */}
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Academic & Technical Identity, Profile Card & Metrics */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between space-y-3.5">
            <div className="space-y-3">
              {/* Academic affiliation & Status kicker */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-cyan-400 font-semibold tracking-wide">
                <span className={`px-2 sm:px-2.5 py-0.5 rounded-full border shadow-sm ${
                  researchMode
                    ? "bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] animate-pulse"
                    : "bg-cyan-950/80 border-cyan-500/50"
                }`}>
                  {researchMode ? "🔬 ACADEMIC & RESEARCH VIEW ACTIVE" : "B.Sc in CSE"}
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300">Pundra University</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-cyan-300 font-bold">CGPA 3.83</span>
                {onToggleResearchMode && (
                  <button
                    onClick={onToggleResearchMode}
                    className="ml-auto hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700 bg-slate-900/90 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{researchMode ? "Mode: Research" : "Mode: Engineering"}</span>
                    <span className="text-cyan-400 text-[9px] underline">Switch</span>
                  </button>
                )}
              </div>

              {/* Primary Name Display */}
              <div>
                <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] break-words">
                  MD. AHSANUR RAHAMAN
                </h1>
                <p className="mt-1 text-sm sm:text-base md:text-lg font-medium text-slate-300">
                  AI/ML Researcher & Computer Science Engineer
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-mono">
                  <span className="px-2 sm:px-2.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 font-medium">
                    Brain-Computer Interface
                  </span>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/60 font-medium">
                    EEG Signal Processing
                  </span>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 font-medium">
                    CycleGAN & Diffusion
                  </span>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-medium">
                    Software Systems
                  </span>
                </div>
              </div>

              {/* Core narrative statements */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed text-justify">
                {PROFILE_DATA.heroStatement} Exploring EEG-based Brain-Computer Interfaces, neural signal reconstruction via generative architectures (CycleGAN & Diffusion), AI-assisted neurorehabilitation, and modern full-stack digital systems.
              </p>

              {/* Researcher Profile Mini-Card with Verified Photo & Colorful Metrics */}
              <div className="relative rounded-2xl border border-cyan-500/50 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-cyan-950/30 backdrop-blur-md p-3 sm:p-4 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:border-cyan-400 transition-all overflow-hidden group">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-400/80 bg-slate-800 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
                    <img
                      src="/assets/images/ahsanur_main.jpg"
                      alt="Md. Ahsanur Rahaman - AI/ML Researcher"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
                      <span className="truncate">Verified Researcher</span>
                    </div>
                    <h3 className="text-sm xs:text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
                      Md. Ahsanur Rahaman
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium truncate">
                      Dept. of Computer Science & Engineering
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                      Pundra University of Science & Technology
                    </p>
                  </div>
                </div>

                {/* Colorful metrics row */}
                <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs">
                  {/* CGPA Box: Cyan */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-950 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.18)]">
                    <div className="text-xs sm:text-sm md:text-base font-mono font-extrabold text-cyan-300">3.83</div>
                    <div className="text-[9px] sm:text-[10px] text-cyan-400/80 font-mono mt-0.5">CGPA / 4.00</div>
                  </div>

                  {/* Accepted Papers Box: Emerald */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.18)]">
                    <div className="text-xs sm:text-sm md:text-base font-mono font-extrabold text-emerald-300">2 Conf.</div>
                    <div className="text-[9px] sm:text-[10px] text-emerald-400/80 font-mono mt-0.5">Accepted 2026</div>
                  </div>

                  {/* IELTS Box: Indigo */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/50 shadow-[0_0_12px_rgba(99,102,241,0.18)]">
                    <div className="text-xs sm:text-sm md:text-base font-mono font-extrabold text-indigo-300">6.0</div>
                    <div className="text-[9px] sm:text-[10px] text-indigo-400/80 font-mono mt-0.5">IELTS Academic</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs & Quick Connect Strip - fully responsive on mobile */}
            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2">
                <a
                  href="#publications"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] w-full sm:w-auto text-center cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>{researchMode ? "Explore 3 Research Papers (2 Accepted)" : "Explore Research Papers"}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center w-full sm:w-auto">
                  <a
                    href={researchMode ? "#pipeline" : "#projects"}
                    className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:border-cyan-500/50 transition-all active:scale-[0.98] text-center cursor-pointer"
                  >
                    <span>{researchMode ? "Neural Bypass" : "View Projects"}</span>
                    <ArrowDownRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <button
                    onClick={onOpenCvModal}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/50 bg-slate-950/60 transition-all text-center cursor-pointer"
                    title="Download verified academic Curriculum Vitae"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{researchMode ? "Academic CV" : "CV"}</span>
                  </button>
                </div>
              </div>

              {/* Social links row */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5 sm:gap-3 text-slate-400 text-xs">
                  <a
                    href={PROFILE_DATA.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href={PROFILE_DATA.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-[#0a66c2] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href={`mailto:${PROFILE_DATA.contact.email}`}
                    className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline truncate max-w-[150px] sm:max-w-none">{PROFILE_DATA.contact.email}</span>
                    <span className="xs:hidden">Email</span>
                  </a>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-lg shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>2 Accepted Papers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Neural Biosignal Workstation & Pipeline */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between space-y-3">
            {/* Multichannel EEG Oscilloscope Interactive Instrument */}
            <EegOscilloscope />

            {/* Scientific Verification Telemetry Panel */}
            <div className="p-3 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/20 shadow-md">
              <div className="text-[10px] sm:text-[11px] font-mono font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">Generalization Benchmark (180 Withheld Trial Pairs)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-center text-xs font-mono">
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[9px] sm:text-[10px] text-slate-400">Healthy Similarity</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">89.01% ± 3.14%</div>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[9px] sm:text-[10px] text-slate-400">Peak Similarity</div>
                  <div className="text-xs sm:text-sm font-bold text-cyan-400 mt-0.5">91.29%</div>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[9px] sm:text-[10px] text-slate-400">Movement Retention</div>
                  <div className="text-xs sm:text-sm font-bold text-indigo-400 mt-0.5">80.09%</div>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[9px] sm:text-[10px] text-slate-400">Sampling Rate</div>
                  <div className="text-xs sm:text-sm font-bold text-purple-400 mt-0.5">250 Hz (10-20)</div>
                </div>
              </div>
            </div>

            {/* Scientific Pipeline Flow Tags */}
            <div className="flex flex-wrap items-center justify-between gap-1 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[10px] sm:text-[11px] font-mono text-slate-400">
              <span className="text-slate-300 font-semibold">End-to-End:</span>
              <span className="text-cyan-400 font-medium">EEG</span>
              <span>→</span>
              <span className="text-sky-400 font-medium">MNE Preprocess</span>
              <span>→</span>
              <span className="text-indigo-400 font-medium">CNN-LSTM</span>
              <span>→</span>
              <span className="text-purple-400 font-medium">CycleGAN</span>
              <span>→</span>
              <span className="text-emerald-400 font-medium">Digital Bypass</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
