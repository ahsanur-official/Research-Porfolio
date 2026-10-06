import { Trophy, Award, Medal } from "lucide-react";
import { ACHIEVEMENTS } from "../data/experience";

export function AchievementsSection() {
  const getIconForCategory = (category: string) => {
    if (category.includes("Hackathon") || category.includes("NASA")) return <Trophy className="w-5 h-5 text-amber-400" />;
    if (category.includes("Academic") || category.includes("Excellence")) return <Medal className="w-5 h-5 text-emerald-400" />;
    return <Award className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <section id="achievements" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>09. Competitive Distinctions</span>
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Honors & Achievements
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 text-justify">
            Validated achievements across international hackathons, departmental technology festivals, and competitive programming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ACHIEVEMENTS.map((item, idx) => {
            const themes = [
              "border-amber-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.12)] hover:border-amber-400",
              "border-emerald-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:border-emerald-400",
              "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400",
              "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:border-indigo-400"
            ];
            const theme = themes[idx % themes.length];

            return (
              <div
                key={`${item.title}-${item.year}`}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between group interactive-card ${theme}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 group-hover:scale-105 transition-transform shadow-md">
                      {getIconForCategory(item.category)}
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-amber-500/50 shadow">
                      {item.year}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-cyan-300 font-semibold mb-1">
                    {item.category}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-0.5 text-xs font-medium text-slate-300">
                    {item.organization}
                  </div>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed text-left">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
