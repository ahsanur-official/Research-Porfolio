import { useState, useEffect } from "react";
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
import { BookOpen, Code2 } from "lucide-react";

export default function App() {
  const [researchMode, setResearchMode] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  // Initialize global scroll reveal animations for all sections and cards
  useGlobalScrollAnimation(researchMode);

  // Check URL query parameters or default
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "research") {
      setResearchMode(true);
    }
  }, []);

  const toggleResearchMode = () => {
    setResearchMode((prev) => !prev);
  };

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

      {/* Top Banner when in Research Mode */}
      {researchMode && (
        <div className="pt-14 bg-gradient-to-r from-cyan-950/90 via-slate-900 to-indigo-950/90 border-b border-cyan-800/40 px-4 py-2 text-center text-xs font-mono text-cyan-300 flex flex-wrap items-center justify-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>
            <strong>Research Focus View Active:</strong> Prioritizing Neural Signal Analysis, CycleGAN Publications & Academic Credentials.
          </span>
          <button
            onClick={() => setResearchMode(false)}
            className="underline hover:text-white ml-2 text-[11px] shrink-0"
          >
            Switch to Engineering View
          </button>
        </div>
      )}

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenCvModal={() => setIsCvModalOpen(true)} />

        {/* Dynamic Section Ordering based on Research Mode */}
        {researchMode ? (
          /* ACADEMIC RESEARCH SUPERVISOR EMPHASIS ORDER */
          <>
            {/* 1. Research & Publications (Top priority) */}
            <ResearchSection />

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
            <ResearchSection />

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
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleResearchMode}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-semibold shadow-2xl border transition-all active:scale-95 ${
            researchMode
              ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/25"
              : "bg-slate-900/90 text-slate-200 border-slate-700/80 hover:border-slate-500 hover:text-white backdrop-blur-md"
          }`}
          title="Toggle view between Research focus and Engineering focus"
        >
          {researchMode ? (
            <>
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research Mode</span>
            </>
          ) : (
            <>
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Engineering View</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
