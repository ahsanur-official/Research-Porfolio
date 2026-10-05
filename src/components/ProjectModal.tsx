import { X, Github, ExternalLink, Cpu, CheckCircle2, ArrowRight } from "lucide-react";
import { ProjectItem } from "../data/projects";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#0a0f1d] shadow-2xl p-6 sm:p-8 z-10 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.category}</span>
              <span className="text-slate-600">·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Image banner if available */}
        {project.image && (
          <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video max-h-64 w-full bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Problem & Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
              The Engineering Problem
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm text-justify">
              {project.fullProblem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              Engineered Solution
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm text-justify">
              {project.fullSolution}
            </p>
          </div>
        </div>

        {/* Verified Features */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
            Verified Features & Architectural Capabilities
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
            {project.verifiedFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* My Contribution */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs sm:text-sm text-slate-300 text-justify">
          <span className="font-mono font-semibold text-cyan-300 block mb-1">
            My Individual Contribution:
          </span>
          {project.myContribution}
        </div>

        {/* Technologies Used */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-slate-400">Technology Stack:</h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
