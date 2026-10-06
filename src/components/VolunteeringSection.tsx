import { HeartHandshake } from "lucide-react";
import { VOLUNTEERING_ACTIVITIES } from "../data/experience";

export function VolunteeringSection() {
  return (
    <section id="volunteering" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>11. Social Engagement & Technical Service</span>
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Volunteering & Activities
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 text-justify">
            Contributing to regional educational Olympiads, student innovation festivals, and academic competition coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {VOLUNTEERING_ACTIVITIES.map((activity, idx) => {
            const themes = [
              "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400",
              "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:border-indigo-400",
              "border-purple-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] hover:border-purple-400"
            ];
            const theme = themes[idx % themes.length];

            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between interactive-card ${theme}`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
                      {activity.year}
                    </span>
                    <HeartHandshake className="w-4 h-4 text-cyan-400" />
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                    {activity.roleOrActivity}
                  </h3>

                  <div className="mt-0.5 text-xs text-cyan-300/90 font-medium">
                    {activity.organization}
                  </div>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed text-left">
                    {activity.description}
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
