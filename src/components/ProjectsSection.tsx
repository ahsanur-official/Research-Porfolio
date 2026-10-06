import { useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import { PROJECTS_DATA, ProjectItem, ProjectCategory } from "../data/projects";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showAllRepositories, setShowAllRepositories] = useState(false);

  const categories: ProjectCategory[] = [
    "All",
    "AI & Scientific",
    "Web & Full Stack",
    "Mobile",
    "Systems & Compilers",
    "Developer Utilities"
  ];

  const featuredProjects = PROJECTS_DATA.filter(p => p.featured);
  const additionalProjects = PROJECTS_DATA.filter(p => !p.featured);

  const filterProject = (p: ProjectItem) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  };

  const currentDisplayFeatured = featuredProjects.filter(filterProject);
  const currentDisplayAdditional = additionalProjects.filter(filterProject);

  return (
    <section id="projects" className="py-7 sm:py-8 md:py-10 border-t border-slate-800/80 bg-[#07090e]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-5 gap-3">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>05. Software & Systems Engineering</span>
            </div>
            <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Selected production applications, scientific mission tools, compilers, and real-time systems built with modern engineering standards.
            </p>
          </div>

          {/* Category Filter Tabs - Smooth horizontal swipe on mobile */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] border border-cyan-500/50 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project Spotlight: MARSWAY — Martian Map */}
        {(activeCategory === "All" || activeCategory === "AI & Scientific") && (
          <div className="mb-4 sm:mb-5 rounded-2xl border border-rose-500/50 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-rose-950/25 p-3.5 sm:p-6 lg:p-7 shadow-[0_0_35px_rgba(244,63,94,0.18)] hover:border-rose-400/80 transition-all relative overflow-hidden group interactive-card">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-950/25 blur-3xl rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
              <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs">
                  <span className="text-rose-300 font-bold px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.25)]">
                    NASA Space Apps 2025
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-cyan-300 font-semibold">Galactic Problem Solver</span>
                </div>

                <h3 className="font-display text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  MARSWAY — Martian Map
                </h3>

                <p className="text-xs sm:text-sm font-mono text-cyan-300 font-medium">
                  Science-Aware Marswalk Mission Planner with NASA Topography Data
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
                  Developed an interactive planetary exploration tool calculating terrain slopes, elevation contours, and hazard proximities from authentic NASA planetary datasets to synthesize optimal Marswalk routes for EVA astronauts.
                </p>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono pt-0.5">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-slate-950 border border-cyan-500/40 text-cyan-300">
                    NASA Open Datasets
                  </span>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-slate-950 border border-indigo-500/40 text-indigo-300">
                    Spatial Path Optimization
                  </span>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-slate-950 border border-emerald-500/40 text-emerald-300">
                    React + Three.js
                  </span>
                </div>

                <div className="pt-1.5 grid grid-cols-1 sm:flex sm:items-center gap-2">
                  <button
                    onClick={() => {
                      const marsway = PROJECTS_DATA.find(p => p.id === "marsway-martian-map");
                      if (marsway) setSelectedProject(marsway);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-sm w-full sm:w-auto"
                  >
                    <span>Inspect Mission Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="https://github.com/Ahsanur01/Marsway"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-700 bg-slate-900/80 text-slate-200 hover:text-white hover:border-slate-500 transition-colors w-full sm:w-auto"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>

              {/* Martian Visual Asset */}
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.2)] bg-slate-950 aspect-[16/10]">
                <img
                  src="/assets/images/marsway_mission_map_1791200571783.jpg"
                  alt="MARSWAY Planetary EVA Route Planner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                  <span className="text-rose-400 font-semibold truncate">NASA MOLA DEM</span>
                  <span>Client Solvers</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {currentDisplayFeatured
            .filter(p => p.id !== "marsway-martian-map")
            .map((project, pIdx) => {
              const borderTheme =
                pIdx % 3 === 0
                  ? "border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400"
                  : pIdx % 3 === 1
                  ? "border-indigo-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-indigo-950/20 shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:border-indigo-400"
                  : "border-purple-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] hover:border-purple-400";

              return (
                <div
                  key={project.id}
                  className={`rounded-2xl border p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-300 group interactive-card ${borderTheme}`}
                >
                  <div>
                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1.5 sm:mb-2">
                      <span className="text-cyan-300 font-semibold">{project.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-slate-300 leading-snug">
                      {project.tagline}
                    </p>

                    <p className="mt-1.5 sm:mt-2 text-xs text-slate-400 leading-relaxed text-left line-clamp-3">
                      {project.cvDescription}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 sm:pt-3 border-t border-slate-800/80">
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3 text-[10px] sm:text-[11px] font-mono text-slate-400">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 text-slate-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Technical Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                        aria-label={`${project.title} on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Additional Verified Repositories Accordion */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">
                More Verified Projects & Repositories
              </h3>
              <p className="text-xs text-slate-400">
                Additional software utilities, algorithms, and academic coursework systems from GitHub.
              </p>
            </div>

            <button
              onClick={() => setShowAllRepositories(!showAllRepositories)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors self-start sm:self-auto"
            >
              {showAllRepositories ? "Collapse Additional" : `Explore All (${currentDisplayAdditional.length} More)`}
            </button>
          </div>

          {showAllRepositories && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fadeIn">
              {currentDisplayAdditional.map((project) => (
                <div
                  key={project.id}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-800/80 bg-slate-950/70 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span className="text-cyan-300">{project.category}</span>
                      <span>{project.year}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {project.title}
                    </h4>

                    <p className="mt-1 text-xs text-slate-400 leading-relaxed text-left">
                      {project.cvDescription}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      View Specs
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white"
                      aria-label={`${project.title} repository`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
