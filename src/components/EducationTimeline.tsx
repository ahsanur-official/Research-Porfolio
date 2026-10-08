import { Award, Calendar, MapPin, CheckCircle } from "lucide-react";
import { PROFILE_DATA } from "../data/profile";

export function EducationTimeline() {
  return (
    <section id="education" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>07. Scholastic Foundations & Academic Timeline</span>
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Academic Timeline
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 text-justify">
            A consistent record of top academic distinction (GPA 5.00 in SSC & HSC; CGPA 3.83 in B.Sc CSE), culminating in advanced neural engineering research and peer-reviewed publications.
          </p>
        </div>

        <div className="relative border-l border-cyan-500/30 ml-2.5 sm:ml-8 space-y-3.5 sm:space-y-5 pl-4 sm:pl-8">
          {PROFILE_DATA.education.map((edu, idx) => {
            const cardThemes = [
              "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_25px_rgba(6,182,212,0.12)] hover:border-cyan-400",
              "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_25px_rgba(99,102,241,0.12)] hover:border-indigo-400",
              "border-purple-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-purple-950/20 shadow-[0_0_25px_rgba(168,85,247,0.12)] hover:border-purple-400"
            ];
            const cardTheme = cardThemes[idx % cardThemes.length];

            return (
              <div key={edu.degree} className="relative group">
                {/* Dot marker on timeline */}
                <div className="absolute -left-[23px] sm:-left-[39px] top-3.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:border-cyan-300 group-hover:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all" />

                <div className={`p-3.5 sm:p-6 rounded-2xl border transition-all interactive-card ${cardTheme}`}>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono text-slate-400 mb-1.5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-slate-200 font-semibold">{edu.duration}</span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5 text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-500/60 px-2 sm:px-2.5 py-0.5 rounded-md shadow-[0_0_10px_rgba(6,182,212,0.2)] text-[11px] sm:text-xs">
                      <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{edu.grade}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {edu.degree}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="font-medium text-slate-200">{edu.institution}</span>
                    <span className="text-slate-600 hidden xs:inline">·</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      {edu.location}
                    </span>
                  </div>

                  {edu.details && (
                    <ul className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1.5 text-xs sm:text-sm text-slate-300">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-left">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
