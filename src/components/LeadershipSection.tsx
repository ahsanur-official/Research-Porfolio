import { Calendar } from "lucide-react";
import { LEADERSHIP_ROLES } from "../data/experience";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#06080d]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-1.5">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>08. Governance & Community Stewardship</span>
            </div>
            <ReadingTimeBadge time="1.5 min" wordCount={240} />
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Leadership & Community
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 text-justify">
            Fostering competitive programming culture, organizing regional student hackathons, and bridging academia with Bangladesh's IT industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {LEADERSHIP_ROLES.map((role, rIdx) => {
            const cardTheme =
              rIdx === 0
                ? "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400"
                : "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:border-indigo-400";

            return (
              <div
                key={`${role.role}-${role.period}`}
                className={`p-4 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between interactive-card ${cardTheme}`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{role.period}</span>
                    </div>
                    <span className="text-cyan-400/90 font-mono text-[11px] px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
                      Leadership Role
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {role.role}
                  </h3>

                  <div className="text-xs sm:text-sm font-semibold text-cyan-300/90 mt-0.5">
                    {role.organization}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                    {role.description}
                  </p>

                  <ul className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1 text-xs text-slate-300">
                    {role.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-left">
                        <span className="text-cyan-400 font-mono mt-0.5">›</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
