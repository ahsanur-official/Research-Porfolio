import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Award,
  Sparkles,
  FileCode,
  Tag
} from "lucide-react";
import { PUBLICATIONS_DATA, Publication } from "../data/publications";

export function ResearchSection() {
  const [expandedId, setExpandedId] = useState<string | null>("ricrf-2026-cyclegan");
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);

  const handleCopyCitation = (pub: Publication) => {
    const citation = `${pub.authors.join(", ")}. "${pub.title}." ${pub.venueFull}, ${pub.year} [${pub.status} - ${pub.length}].`;
    navigator.clipboard.writeText(citation);
    setCopiedCitationId(pub.id);
    setTimeout(() => setCopiedCitationId(null), 2500);
  };

  const handleCopyBibtex = (pub: Publication) => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => setCopiedBibtexId(null), 2500);
  };

  return (
    <section id="publications" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#06080d]">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="max-w-4xl mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/50 text-xs font-mono text-cyan-300 mb-2 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>02. Peer-Reviewed Scholarly Contributions</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Research & Publications
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-300 leading-relaxed text-justify">
            Investigating generative deep learning architectures (CycleGAN and Denoising Diffusion Probabilistic Models), EEG signal reconstruction, Brain-Computer Interfaces, and digital neural bypass rehabilitation systems.
          </p>
        </div>

        {/* Publications List with Colorful Illuminated Cards */}
        <div className="space-y-4 sm:space-y-5">
          {PUBLICATIONS_DATA.map((pub, index) => {
            const isExpanded = expandedId === pub.id;
            const isAccepted = pub.status === "Accepted";

            // Distinct vibrant colorful card gradients & glows
            const cardTheme =
              index === 0
                ? "border-cyan-500/50 bg-gradient-to-br from-slate-900/95 via-cyan-950/25 to-slate-900/90 shadow-[0_0_30px_rgba(6,182,212,0.18)] hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.28)]"
                : index === 1
                ? "border-emerald-500/50 bg-gradient-to-br from-slate-900/95 via-emerald-950/25 to-slate-900/90 shadow-[0_0_30px_rgba(16,185,129,0.18)] hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.28)]"
                : "border-purple-500/50 bg-gradient-to-br from-slate-900/95 via-purple-950/25 to-slate-900/90 shadow-[0_0_30px_rgba(168,85,247,0.18)] hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.28)]";

            return (
              <article
                key={pub.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden interactive-card ${cardTheme}`}
              >
                {/* Main Card Content */}
                <div className="p-4 sm:p-6 lg:p-7 space-y-3.5">
                  {/* Top Metadata Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
                    <div className="flex flex-wrap items-center gap-2 font-mono">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                          isAccepted
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                        }`}
                      >
                        {isAccepted ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>{pub.status}</span>
                      </span>

                      <span className="text-slate-600">·</span>
                      <span className="font-bold text-white px-2.5 py-0.5 rounded-md bg-slate-800/90 border border-slate-700">
                        {pub.venue}
                      </span>

                      {pub.isExtended && (
                        <span className="font-bold text-cyan-300 px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/70 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                          [Extended Version]
                        </span>
                      )}

                      <span className="text-slate-600">·</span>
                      <span className="text-slate-300">{pub.type}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{pub.year}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400 font-semibold">{pub.length}</span>
                    </div>

                    <div className="text-slate-500 font-mono text-xs">
                      Paper 0{index + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-snug">
                    "{pub.title}."
                    {pub.isExtended && <span className="text-cyan-400 font-bold ml-2">[Extended]</span>}
                  </h3>

                  {/* Venue Full Name */}
                  <div className="text-xs sm:text-sm font-mono text-cyan-300/90 font-medium">
                    {pub.venueFull}
                  </div>

                  {/* Authors row with highlighted Ahsanur Rahaman */}
                  <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-slate-300">
                    <span className="text-slate-400 font-mono text-xs font-semibold">Authors:</span>
                    {pub.authors.map((author, aIdx) => {
                      const isMe = author.toLowerCase().includes("ahsanur");
                      return (
                        <span key={author} className="flex items-center">
                          <span
                            className={
                              isMe
                                ? "font-bold text-cyan-300 underline decoration-cyan-400 decoration-2 underline-offset-2"
                                : "text-slate-200"
                            }
                          >
                            {author}
                          </span>
                          {aIdx < pub.authors.length - 1 && <span className="text-slate-500 ml-1.5 font-normal">·</span>}
                        </span>
                      );
                    })}
                  </div>

                  {/* One-Liner Research Summary */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-justify bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    {pub.summary}
                  </p>

                  {/* Key Empirical Metrics Strip with colorful cards */}
                  {pub.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
                      {pub.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 transition-colors space-y-0.5 shadow-sm"
                        >
                          <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 truncate">
                            {metric.label}
                          </div>
                          <div className={`text-xs sm:text-sm font-mono font-extrabold ${metric.color}`}>
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Keywords & Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs font-mono">
                    <span className="text-slate-500 mr-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>Keywords:</span>
                    </span>
                    {pub.keywords.map((kw, kIdx) => {
                      const tagColors = [
                        "bg-cyan-950/60 text-cyan-300 border-cyan-800/60",
                        "bg-sky-950/60 text-sky-300 border-sky-800/60",
                        "bg-indigo-950/60 text-indigo-300 border-indigo-800/60",
                        "bg-purple-950/60 text-purple-300 border-purple-800/60",
                        "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                      ];
                      const colorClass = tagColors[kIdx % tagColors.length];
                      return (
                        <span
                          key={kw}
                          className={`px-2 py-0.5 rounded-full border text-[11px] ${colorClass}`}
                        >
                          {kw}
                        </span>
                      );
                    })}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/60 transition-all shadow-sm"
                        aria-expanded={isExpanded}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{isExpanded ? "Hide Abstract & Details" : "Read Full Abstract & Contributions"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleCopyCitation(pub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                        title="Copy APA formatted scholarly citation"
                      >
                        {copiedCitationId === pub.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Citation Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px]">
                        Scopus Indexed Venue
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collapsible Abstract & Deep Dive */}
                {isExpanded && (
                  <div className="border-t border-slate-800 bg-[#070b16] p-4 sm:p-6 lg:p-7 space-y-4 animate-fadeIn">
                    {/* Official Conference Abstract */}
                    <div>
                      <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Official Conference Abstract</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify bg-slate-950/80 p-3.5 sm:p-4 rounded-xl border border-slate-800">
                        {pub.abstract}
                      </p>
                    </div>

                    {/* Key Contributions & Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" />
                        <span>Key Contributions & Methodological Highlights</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {pub.keyContributions.map((contrib, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-cyan-500/40 transition-colors space-y-1"
                          >
                            <div className="text-xs font-mono font-bold text-cyan-400">
                              Contribution 0{cIdx + 1}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed text-left">
                              {contrib}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BibTeX Reference */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                          <FileCode className="w-3.5 h-3.5" />
                          <span>BibTeX Reference</span>
                        </h4>
                        <button
                          onClick={() => handleCopyBibtex(pub)}
                          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedBibtexId === pub.id ? "Copied" : "Copy"}</span>
                        </button>
                      </div>

                      <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                        {pub.bibtex}
                      </pre>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
