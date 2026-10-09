import { MapPin, GraduationCap, Award, BookOpen, Globe2, FileCheck, Compass, Sparkles, UserCheck } from "lucide-react";
import { PROFILE_DATA } from "../data/profile";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

export function About() {
  return (
    <section id="about" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-5 gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-1.5">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span>01. Background & Academic Trajectory</span>
              </div>
              <ReadingTimeBadge time="2.5 min" wordCount={480} />
            </div>
            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              About Researcher
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-cyan-400/90 font-medium">
            Pundra University of Science & Technology · B.Sc in CSE (01/2023 – Ongoing)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Narrative description */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed text-justify">
                I am a Computer Science & Engineering undergraduate at{" "}
                <span className="text-white font-semibold">Pundra University of Science & Technology</span> in Bogura, Bangladesh, maintaining a{" "}
                <span className="text-cyan-300 font-mono font-bold">3.83 / 4.00 CGPA</span> across 7 semesters, following uninterrupted straight-A distinctions (<span className="text-emerald-300 font-mono font-semibold">GPA 5.00 / 5.00</span> in both HSC & SSC).
              </p>

              <p className="text-justify text-slate-300">
                My core scientific focus is rooted in <strong className="text-white font-medium">Artificial Intelligence for Brain-Computer Interfaces (BCI)</strong> and intelligent neurorehabilitation. Guided by academic mentors <span className="text-slate-200 font-medium">Md. Habib Ehsanul Hoque</span> (Head of CSE) and <span className="text-slate-200 font-medium">Mrittika Mahbub</span> (Lecturer), my research investigates how generative adversarial networks (Movement-Aware CycleGAN) and diffusion probabilistic models reconstruct high-fidelity, healthy-like EEG patterns from impaired stroke and Parkinson's disease cohorts.
              </p>

              <p className="text-justify text-slate-300">
                Beyond computational neuroscience, I operate as a versatile software engineer who bridges algorithmic models with tangible software platforms. From engineering NASA-dataset-driven mission planners (<strong className="text-slate-200">MARSWAY</strong>, winning <em>Galactic Problem Solver</em> at NASA Space Apps) to architecting cryptographic chat engines (<strong className="text-slate-200">Crypto Chat</strong>) and custom programming languages (<strong className="text-slate-200">KhaliError-Lang</strong>), I prioritize mathematical rigour, code clarity, and architectural integrity.
              </p>

              <p className="text-justify text-slate-300">
                In university governance, I serve as the <strong className="text-white font-medium">General Secretary of the PUB Computer & Programming Club (PUB CPC)</strong> for 2026 (having served as Vice President in 2025) and <strong className="text-white font-medium">Convener of the BASIS Students' Forum PUB Chapter</strong> (2025–2026), organizing national-level tech events, programming contests, and mentoring junior cohorts in algorithms and data structures.
              </p>
            </div>

            {/* Research Methodology Strengths Bar */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-slate-400">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Academic Tenets:</span>
              </span>
              <span>Patient-Level Holdouts</span>
              <span className="text-slate-700">·</span>
              <span>Reproducible Ablations</span>
              <span className="text-slate-700">·</span>
              <span className="text-emerald-400">IEEE Scopus Indexed</span>
              <span className="text-slate-700">·</span>
              <span className="text-indigo-400">IELTS B2 (6.0)</span>
            </div>
          </div>

          {/* Right Column: Academic Dossier & Intentions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
            {/* Academic Dossier Card */}
            <div className="rounded-2xl border border-indigo-500/50 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-indigo-950/30 p-3.5 sm:p-5 space-y-3 shadow-[0_0_25px_rgba(99,102,241,0.16)] hover:border-indigo-400 transition-all">
              <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Verified Academic Dossier</span>
              </h3>

              <dl className="space-y-2 text-xs sm:text-sm divide-y divide-slate-800/80">
                <div className="pt-1 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Location</span>
                  </dt>
                  <dd className="font-medium text-slate-200 text-left xs:text-right">
                    Bogura (Present) · Joypurhat (Permanent)
                  </dd>
                </div>

                <div className="pt-2 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Current Degree</span>
                  </dt>
                  <dd className="font-medium text-slate-200 text-left xs:text-right">
                    B.Sc in Computer Science & Engineering
                  </dd>
                </div>

                <div className="pt-2 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>University</span>
                  </dt>
                  <dd className="font-medium text-slate-200 text-left xs:text-right">
                    Pundra University of Science & Technology
                  </dd>
                </div>

                <div className="pt-2 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cumulative GPA</span>
                  </dt>
                  <dd className="font-mono font-bold text-emerald-300 text-left xs:text-right">
                    3.83 / 4.00 <span className="text-[11px] text-slate-400 font-normal">(Up to 7th Semester)</span>
                  </dd>
                </div>

                <div className="pt-2 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <Globe2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>IELTS Academic</span>
                  </dt>
                  <dd className="font-mono text-purple-300 font-bold text-left xs:text-right">
                    Overall 6.0 <span className="text-[11px] text-slate-400 font-normal">(L 5.5, R 5.5, W 6.0, S 6.0)</span>
                  </dd>
                </div>

                <div className="pt-2 flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Personal Info</span>
                  </dt>
                  <dd className="font-mono text-slate-200 text-left xs:text-right text-xs">
                    DOB: 27/01/2003 · Nationality: Bangladeshi
                  </dd>
                </div>
              </dl>

              {/* Verified academic annexes callout */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-1">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dossier Annexes (Available Upon Request):</span>
                </div>
                <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] text-slate-400 font-mono">
                  {PROFILE_DATA.annexes.map((item) => (
                    <span key={item} className="flex items-center gap-1">
                      <span className="text-cyan-500">·</span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Intentions & Target Opportunities Card */}
            <div className="p-3.5 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-cyan-950/30 text-xs sm:text-sm space-y-1.5 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Academic Intentions & Target Opportunities</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed text-justify">
                Actively seeking a <strong className="text-white font-medium">Research-Focused Master’s Programme</strong> or <strong className="text-white font-medium">Research Assistantship</strong> in AI-driven neural engineering, biomedical signal processing, and intelligent rehabilitation systems. Also preparing for competitive international graduate scholarships including the Chinese Government Scholarship (CSC) and European fellowships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
