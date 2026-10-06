import { useState } from "react";
import { Brain, Activity, Cpu, Sparkles, Network, RefreshCw, HeartPulse, Zap, Stethoscope, Layers } from "lucide-react";
import { RESEARCH_INTERESTS } from "../data/research";

export function ResearchInterests() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "BCI & Neural Signals",
    "Generative & Deep Learning",
    "Clinical Neuroengineering"
  ];

  const filteredInterests = selectedCategory === "All"
    ? RESEARCH_INTERESTS
    : RESEARCH_INTERESTS.filter(item => item.category === selectedCategory);

  const getIconForInterest = (id: string) => {
    switch (id) {
      case "bci":
        return <Brain className="w-5 h-5 text-cyan-400" />;
      case "eeg-analysis":
        return <Activity className="w-5 h-5 text-sky-400" />;
      case "motor-imagery":
        return <Zap className="w-5 h-5 text-amber-400" />;
      case "deep-learning":
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case "generative-neural-ai":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "eeg-reconstruction":
        return <RefreshCw className="w-5 h-5 text-emerald-400" />;
      case "ai-rehabilitation":
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case "digital-neural-bypass":
        return <Network className="w-5 h-5 text-cyan-300" />;
      case "parkinsons-detection":
        return <Stethoscope className="w-5 h-5 text-yellow-400" />;
      case "intelligent-healthcare":
        return <Layers className="w-5 h-5 text-blue-400" />;
      default:
        return <Brain className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="research" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-5 gap-2">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>03. Scientific Inquiry & Neuroengineering</span>
            </div>
            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Research Interests
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl text-justify">
              Focus areas spanning non-invasive neural decoders, oscillatory brain dynamics, generative reconstruction, and assistive biomedical applications.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] border border-cyan-500/50 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scientific Cards Grid with Colorful Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredInterests.map((interest) => {
            const cardColorTheme =
              interest.category === "BCI & Neural Signals"
                ? "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/25 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                : interest.category === "Generative & Deep Learning"
                ? "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/25 shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
                : "border-purple-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-purple-950/25 shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]";

            return (
              <div
                key={interest.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group interactive-card ${cardColorTheme}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 group-hover:scale-105 group-hover:border-cyan-400/60 transition-all shadow-md">
                      {getIconForInterest(interest.id)}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-300 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800">
                      {interest.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {interest.title}
                  </h3>

                  <p className="mt-1.5 text-xs font-semibold text-slate-200 leading-relaxed text-left">
                    {interest.oneLiner}
                  </p>

                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed text-left">
                    {interest.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                  {interest.keyTech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 group-hover:border-slate-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
