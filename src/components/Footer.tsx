import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { PROFILE_DATA } from "../data/profile";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#05070c] py-6 sm:py-7 text-xs text-slate-400">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
              {PROFILE_DATA.fullName}
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              AI/ML Researcher · CSE Student · Software Developer
            </p>
            <p className="mt-0.5 text-[11px] font-mono text-cyan-400">
              Pundra University of Science & Technology · Bogura, Bangladesh
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#publications" className="hover:text-cyan-400 transition-colors">Publications</a>
            <a href="#research" className="hover:text-cyan-400 transition-colors">Research</a>
            <a href="#pipeline" className="hover:text-cyan-400 transition-colors">Pipeline</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#0a66c2] hover:border-slate-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors ml-1"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 {PROFILE_DATA.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Verified Academic & Engineering Portfolio</span>
            <span>·</span>
            <span className="text-cyan-400/90 font-medium">B.Sc CSE · CGPA 3.83</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
