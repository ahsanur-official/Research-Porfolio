import { ExternalLink, CheckCircle, Clock } from "lucide-react";
import { CERTIFICATIONS } from "../data/experience";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#06080d]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-1.5">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>10. Verified Credentials</span>
            </div>
            <ReadingTimeBadge time="1 min" wordCount={180} />
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Certifications & Training
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 text-justify">
            Professional skill accreditations in Machine Learning, Python engineering, predictive data analytics, and algorithmic problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CERTIFICATIONS.map((cert) => {
            const isOngoing = cert.status === "Ongoing";
            const themes = [
              "border-emerald-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:border-emerald-400",
              "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400",
              "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:border-indigo-400",
              "border-amber-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.12)] hover:border-amber-400"
            ];
            const theme = themes[cert.title.length % themes.length];

            return (
              <div
                key={cert.title}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between interactive-card ${theme}`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        isOngoing
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                      }`}
                    >
                      {isOngoing ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      <span>{cert.status.toUpperCase()}</span>
                    </span>

                    <span className="text-slate-300 font-mono">{cert.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {cert.title}
                  </h3>

                  <div className="mt-0.5 text-xs font-medium text-cyan-300">
                    {cert.issuer}
                  </div>

                  {cert.credentialNote && (
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed text-left">
                      {cert.credentialNote}
                    </p>
                  )}

                  {/* Skills learned */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                    {cert.skillsLearned.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {cert.verifyUrl && (
                  <div className="mt-3.5 pt-2.5 border-t border-slate-800/80">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Verify Credential Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
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
