import { SKILL_GROUPS, CURRENTLY_LEARNING, SOFT_SKILLS } from "../data/skills";
import { Cpu, Database, Code, Globe, Terminal, Sparkles, CheckCircle2 } from "lucide-react";

export function SkillsSection() {
  const getCategoryTheme = (category: string) => {
    if (category.includes("Deep Learning")) {
      return {
        icon: <Cpu className="w-4 h-4 text-cyan-400" />,
        cardClass: "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400",
        badgeClass: "text-cyan-300 bg-cyan-950/80 border-cyan-800/60"
      };
    }
    if (category.includes("Data Science")) {
      return {
        icon: <Sparkles className="w-4 h-4 text-sky-400" />,
        cardClass: "border-sky-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-sky-950/20 shadow-[0_0_20px_rgba(56,189,248,0.12)] hover:border-sky-400",
        badgeClass: "text-sky-300 bg-sky-950/80 border-sky-800/60"
      };
    }
    if (category.includes("Programming")) {
      return {
        icon: <Code className="w-4 h-4 text-indigo-400" />,
        cardClass: "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:border-indigo-400",
        badgeClass: "text-indigo-300 bg-indigo-950/80 border-indigo-800/60"
      };
    }
    if (category.includes("Web")) {
      return {
        icon: <Globe className="w-4 h-4 text-emerald-400" />,
        cardClass: "border-emerald-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.12)] hover:border-emerald-400",
        badgeClass: "text-emerald-300 bg-emerald-950/80 border-emerald-800/60"
      };
    }
    if (category.includes("Databases")) {
      return {
        icon: <Database className="w-4 h-4 text-amber-400" />,
        cardClass: "border-amber-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.12)] hover:border-amber-400",
        badgeClass: "text-amber-300 bg-amber-950/80 border-amber-800/60"
      };
    }
    return {
      icon: <Terminal className="w-4 h-4 text-purple-400" />,
      cardClass: "border-purple-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] hover:border-purple-400",
      badgeClass: "text-purple-300 bg-purple-950/80 border-purple-800/60"
    };
  };

  return (
    <section id="skills" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#06080d]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-5">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>06. Technical & Core Competencies</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Technical Arsenal
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
            Categorized technical capabilities grounded in academic research, algorithm engineering, and full-stack software development. Evaluated by practical project execution without arbitrary percentages.
          </p>
        </div>

        {/* Skill Groups Grid with Colorful Illuminated Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILL_GROUPS.map((group) => {
            const theme = getCategoryTheme(group.category);
            return (
              <div
                key={group.category}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between interactive-card ${theme.cardClass}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        {theme.icon}
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">
                        {group.category}
                      </h3>
                    </div>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${theme.badgeClass}`}>
                      {group.skills.length} Skills
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed text-left">
                    {group.description}
                  </p>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950/80 border border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Currently Learning & Active Explorations */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/30 shadow-[0_0_25px_rgba(6,182,212,0.12)]">
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              Currently Expanding & Active Technical Inquiries
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            {CURRENTLY_LEARNING.map((item) => (
              <div key={item.name} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-white font-bold text-sm mb-1">{item.name}</div>
                <div className="text-[11px] text-slate-400 font-sans leading-relaxed text-left">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills & Working Methodologies */}
        <div className="mt-4 p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-mono text-slate-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Core Working Philosophies:</span>
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            {SOFT_SKILLS.map((item) => (
              <span key={item.title} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800" title={item.description}>
                {item.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
