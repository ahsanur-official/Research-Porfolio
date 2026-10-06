import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { ResearchSection } from "./components/ResearchSection";
import { ResearchInterests } from "./components/ResearchInterests";
import { ResearchPipeline } from "./components/ResearchPipeline";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { EducationTimeline } from "./components/EducationTimeline";
import { LeadershipSection } from "./components/LeadershipSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { VolunteeringSection } from "./components/VolunteeringSection";
import { LanguagesSection } from "./components/LanguagesSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CvModal } from "./components/CvModal";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { useGlobalScrollAnimation } from "./hooks/useGlobalScrollAnimation";
import { BookOpen, Code2, GraduationCap, Network, FileText, ArrowRight, X } from "lucide-react";

export default function App() {
  // Initialize state with persistence from URL search params & localStorage
  const [researchMode, setResearchMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode") === "research") return true;
      if (params.get("mode") === "engineering") return false;
      const saved = localStorage.getItem("ahsanur_research_mode");
      if (saved !== null) return saved === "true";
    }
    return false;
  });

  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  // Initialize global scroll reveal animations for all sections and cards
  useGlobalScrollAnimation(researchMode);

  // Sync state to URL and localStorage
  const setModeExplicitly = useCallback((enable: boolean) => {
    setResearchMode(enable);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ahsanur_research_mode", String(enable));
        const url = new URL(window.location.href);
        if (enable) {
          url.searchParams.set("mode", "research");
        } else {
          url.searchParams.delete("mode");
        }
        window.history.replaceState({}, "", url.toString());
      } catch (e) {
        console.error("Failed to sync mode:", e);
      }
    }
  }, []);

  const toggleResearchMode = useCallback(() => {
    setModeExplicitly(!researchMode);
  }, [researchMode, setModeExplicitly]);

  // Support browser Back/Forward buttons smoothly
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const isResearch = params.get("mode") === "research";
      setResearchMode(isResearch);
      localStorage.setItem("ahsanur_research_mode", String(isResearch));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500/25 selection:text-cyan-200 w-full max-w-full overflow-x-hidden">
      {/* Scroll Progress Bar at very top of page */}
      <ScrollProgressBar />

      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar
        researchMode={researchMode}
        onToggleResearchMode={toggleResearchMode}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Top Academic Supervisor Banner when in Research Mode */}
      {researchMode && (
        <aside
          role="region"
          aria-label="Academic Research Mode Banner"
          className="pt-14 sm:pt-16 bg-gradient-to-r from-cyan-950/95 via-slate-900/95 to-indigo-950/95 border-b border-cyan-700/50 shadow-lg text-xs"
        >
          <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 flex flex-col md:flex-row items-center justify-between gap-2.5">
            {/* Left info badge */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[11px] border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                ACADEMIC & RESEARCH VIEW ACTIVE
              </span>
              <span className="text-slate-300 font-medium text-[11px] sm:text-xs">
                Prioritizing 3 Peer-Reviewed Papers, Neural Bypass Pipeline & Academic Credentials
              </span>
            </div>

            {/* Quick jump anchor shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <a
                href="#publications"
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-[11px] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>01. Publications</span>
              </a>
              <a
                href="#pipeline"
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-purple-400 text-purple-300 hover:text-white font-mono text-[11px] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Network className="w-3 h-3 text-purple-400" />
                <span>02. Thesis Pipeline</span>
              </a>
              <a
                href="#education"
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-sky-400 text-sky-300 hover:text-white font-mono text-[11px] transition-colors cursor-pointer flex items-center gap-1"
              >
                <GraduationCap className="w-3 h-3 text-sky-400" />
                <span>03. CGPA 3.83</span>
              </a>
              <button
                onClick={() => setIsCvModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/60 text-cyan-200 hover:text-white font-mono text-[11px] transition-colors font-semibold cursor-pointer flex items-center gap-1"
              >
                <FileText className="w-3 h-3 text-cyan-400" />
                <span>Academic CV</span>
              </button>
              <button
                onClick={() => setModeExplicitly(false)}
                className="ml-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-[11px] transition-colors border border-slate-700 cursor-pointer flex items-center gap-1"
                title="Switch back to Software & AI Engineering view"
              >
                <X className="w-3 h-3 text-slate-400" />
                <span>Exit View</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenCvModal={() => setIsCvModalOpen(true)}
          researchMode={researchMode}
          onToggleResearchMode={toggleResearchMode}
        />

        {/* Dynamic Section Ordering based on Research Mode */}
        {researchMode ? (
          /* ACADEMIC RESEARCH SUPERVISOR EMPHASIS ORDER */
          <>
            {/* 1. Research & Publications (Top priority) */}
            <ResearchSection researchMode={researchMode} />

            {/* 2. Research Interests */}
            <ResearchInterests />

            {/* 3. Featured Thesis & Pipeline */}
            <ResearchPipeline />

            {/* 4. Scholastic Foundations & Academic Timeline */}
            <EducationTimeline />

            {/* 5. About Researcher */}
            <About />

            {/* 6. Featured Engineering & Scientific Projects */}
            <ProjectsSection />

            {/* 7. Technical Skills & Deep Learning Stack */}
            <SkillsSection />

            {/* 8. Honors & Achievements */}
            <AchievementsSection />

            {/* 9. Leadership & Community */}
            <LeadershipSection />

            {/* 10. Certifications */}
            <CertificationsSection />

            {/* 11. Languages (IELTS 6.0) */}
            <LanguagesSection />

            {/* 12. Volunteering */}
            <VolunteeringSection />

            {/* 13. Contact & Academic References */}
            <ContactSection onOpenCvModal={() => setIsCvModalOpen(true)} />
          </>
        ) : (
          /* STANDARD SOFTWARE & AI ENGINEER EMPHASIS ORDER */
          <>
            {/* 1. About Me */}
            <About />

            {/* 2. Research & Publications */}
            <ResearchSection researchMode={researchMode} />

            {/* 3. Research Interests */}
            <ResearchInterests />

            {/* 4. Featured Thesis & Digital Neural Bypass Pipeline */}
            <ResearchPipeline />

            {/* 5. Featured Projects */}
            <ProjectsSection />

            {/* 6. Technical Arsenal & Skills */}
            <SkillsSection />

            {/* 7. Academic Timeline */}
            <EducationTimeline />

            {/* 8. Leadership & Community */}
            <LeadershipSection />

            {/* 9. Honors & Achievements */}
            <AchievementsSection />

            {/* 10. Certifications */}
            <CertificationsSection />

            {/* 11. Volunteering & Activities */}
            <VolunteeringSection />

            {/* 12. Languages */}
            <LanguagesSection />

            {/* 13. Contact & Academic References */}
            <ContactSection onOpenCvModal={() => setIsCvModalOpen(true)} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Curriculum Vitae Printable Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Floating Mode Toggle Pill for quick switching */}
      <div className="fixed bottom-4 right-3.5 sm:bottom-5 sm:right-5 z-40">
        <button
          onClick={toggleResearchMode}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-semibold shadow-2xl border transition-all active:scale-95 cursor-pointer ${
            researchMode
              ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/25 ring-2 ring-cyan-400/40"
              : "bg-slate-900/95 text-slate-200 border-slate-700/80 hover:border-slate-500 hover:text-white backdrop-blur-md"
          }`}
          title="Toggle view between Research focus and Engineering focus"
          aria-label="Toggle Research Mode"
        >
          {researchMode ? (
            <>
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research Mode Active</span>
            </>
          ) : (
            <>
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Switch to Research View</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
