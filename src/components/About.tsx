import { MapPin, GraduationCap, Award, BookOpen, Globe2, FileCheck, Compass, Sparkles } from "lucide-react";
import { PROFILE_DATA } from "../data/profile";

export function About() {
  return (
    <section id="about" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-2">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>01. Background & Academic Trajectory</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              About Me
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-cyan-400/90 font-medium">
            Pundra University of Science & Technology · B.Sc in CSE (2023 – Ongoing)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Narrative description */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed text-justify">
                I am a Computer Science & Engineering undergraduate at{" "}
                <span className="text-white font-semibold">Pundra University of Science & Technology</span> in Bogura, Bangladesh, maintaining a{" "}
                <span className="text-cyan-300 font-mono font-bold">3.83 / 4.00 CGPA</span> across 7 semesters.
              </p>

              <p className="text-justify text-slate-300">
                My core scientific focus is rooted in <strong className="text-white font-medium">Artificial Intelligence for Brain-Computer Interfaces (BCI)</strong> and intelligent neurorehabilitation. Through my undergraduate research, I investigate how generative adversarial networks (CycleGAN) and diffusion probabilistic models can reconstruct high-fidelity, healthy-like EEG patterns from impaired motor imagery trials.
              </p>

              <p className="text-justify text-slate-300">
                Beyond computational neuroscience, I operate as a versatile software developer who bridges algorithmic models with tangible software systems. From building NASA-data-driven mission planners (MARSWAY) to architecting cryptographic chat engines and custom language compilers (KhaliError-Lang), I prioritize mathematical rigour, code clarity, and architectural integrity.
              </p>

              <p className="text-justify text-slate-300">
                At my university, I serve as the <strong className="text-white font-medium">General Secretary of the PUB Computer & Programming Club</strong> and the <strong className="text-white font-medium">Convener of the BASIS Students' Forum PUB Chapter</strong>, organizing regional hackathons, mentoring freshmen in competitive programming, and championing scientific research literacy.
              </p>
            </div>

            {/* Research Methodology Strengths Bar */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono flex flex-wrap items-center justify-between gap-2 text-slate-400">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Research Values:</span>
              </span>
              <span>Zero-Leakage Subject Holdouts</span>
              <span className="text-slate-700">·</span>
              <span>Reproducible Ablations</span>
              <span className="text-slate-700">·</span>
              <span className="text-emerald-400">Scopus/IEEE Indexing</span>
            </div>
          </div>

          {/* Right Column: Academic Dossier & Intentions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
            {/* Academic Dossier Card */}
            <div className="rounded-2xl border border-indigo-500/50 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-indigo-950/30 p-4 sm:p-5 space-y-3 shadow-[0_0_25px_rgba(99,102,241,0.16)] hover:border-indigo-400 transition-all">
              <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Academic Dossier</span>
              </h3>

              <dl className="space-y-2 text-xs sm:text-sm divide-y divide-slate-800/80">
                <div className="pt-1 flex items-start justify-between gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Location</span>
                  </dt>
                  <dd className="font-medium text-slate-200 text-right">
                    {PROFILE_DATA.contact.location}
                  </dd>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Degree</span>
                  </dt>
                  <dd className="font-medium text-slate-200 text-right">
                    B.Sc in Computer Science & Engineering
                  </dd>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>University</span>
                  </dt>
                  <dd className="font-medium text-slate-200 text-right">
                    Pundra University of Science & Technology
                  </dd>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cumulative GPA</span>
                  </dt>
                  <dd className="font-mono font-bold text-emerald-300 text-right">
                    3.83 / 4.00 <span className="text-[11px] text-slate-400 font-normal">(7 Semesters)</span>
                  </dd>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <dt className="text-slate-400 flex items-center gap-2">
                    <Globe2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>IELTS Academic</span>
                  </dt>
                  <dd className="font-mono text-purple-300 font-bold text-right">
                    Overall 6.0 <span className="text-[11px] text-slate-400 font-normal">(L 5.5, R 5.5, W 6.0, S 6.0)</span>
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
                Actively seeking a <strong className="text-white font-medium">Research-Focused Master’s Programme</strong> or <strong className="text-white font-medium">Research Assistantship</strong> in AI-driven neural engineering, biomedical signal processing, and intelligent rehabilitation systems. Also preparing for competitive international graduate scholarships including the Chinese Government Scholarship (CSC).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
