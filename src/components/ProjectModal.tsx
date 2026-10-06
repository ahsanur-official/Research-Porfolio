import { X, Github, ExternalLink, Cpu, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "../data/projects";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#0a0f1d] shadow-2xl p-4 sm:p-6 sm:p-8 z-10 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3 sm:pb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.category}</span>
              <span className="text-slate-600">·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-display text-xl xs:text-2xl sm:text-3xl font-bold text-white tracking-tight break-words">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Image banner if available */}
        {project.image && (
          <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[16/10] max-h-64 w-full bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Problem & Solution Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 text-xs sm:text-sm">
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider block">
              Core Engineering Challenge
            </span>
            <p className="text-slate-300 leading-relaxed text-justify">
              {project.fullProblem}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              Engineered Solution
            </span>
            <p className="text-slate-300 leading-relaxed text-justify">
              {project.fullSolution}
            </p>
          </div>
        </div>

        {/* Verified Technical Features */}
        {project.verifiedFeatures && project.verifiedFeatures.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Engineering Capabilities</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
              {project.verifiedFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono mt-0.5">›</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contribution */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs sm:text-sm text-slate-300 text-justify">
          <strong className="text-cyan-300 font-mono text-xs block mb-1">
            Lead Developer Responsibilities & Contributions:
          </strong>
          {project.myContribution}
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Technologies & Libraries
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs font-mono">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors flex-1 sm:flex-none"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-colors flex-1 sm:flex-none"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demonstration</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors ml-auto sm:ml-0"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
