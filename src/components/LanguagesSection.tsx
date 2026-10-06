import { Globe } from "lucide-react";
import { PROFILE_DATA } from "../data/profile";

export function LanguagesSection() {
  return (
    <section id="languages" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#06080d]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>12. Linguistic Competence</span>
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Languages & Communication
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 text-justify">
            Standardized language proficiency according to CEFR frameworks and official IELTS Academic certification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {PROFILE_DATA.languages.map((lang, idx) => {
            const themes = [
              "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400",
              "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:border-indigo-400",
              "border-purple-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] hover:border-purple-400"
            ];
            const theme = themes[idx % themes.length];

            return (
              <div
                key={lang.language}
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 transition-all interactive-card ${theme}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {lang.language}
                    </h3>
                    <div className="text-xs font-mono text-cyan-300 font-semibold">
                      {lang.level}
                    </div>
                  </div>
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>

                {/* CEFR breakdown table with tabular numbers */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400 py-0.5 border-b border-slate-800/40">
                    <span>Listening:</span>
                    <span className="font-mono text-slate-200 font-semibold">{lang.details.listening}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 py-0.5 border-b border-slate-800/40">
                    <span>Reading:</span>
                    <span className="font-mono text-slate-200 font-semibold">{lang.details.reading}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 py-0.5 border-b border-slate-800/40">
                    <span>Spoken Interaction:</span>
                    <span className="font-mono text-slate-200 font-semibold">{lang.details.spokenInteraction}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 py-0.5 border-b border-slate-800/40">
                    <span>Spoken Production:</span>
                    <span className="font-mono text-slate-200 font-semibold">{lang.details.spokenProduction}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 py-0.5">
                    <span>Writing:</span>
                    <span className="font-mono text-slate-200 font-semibold">{lang.details.writing}</span>
                  </div>
                </div>

                {lang.language === "English" && (
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
                    <div>Official IELTS Academic Test Report</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Valid CEFR B2 Certified · Suitable for Global Graduate Admissions</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
