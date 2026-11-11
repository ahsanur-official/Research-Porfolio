import { useState, useEffect } from "react";
import {
  X,
  Download,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Eye,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { PROFILE_DATA } from "../data/profile";
import { PUBLICATIONS_DATA } from "../data/publications";
import { ACHIEVEMENTS } from "../data/experience";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CV_PDF_URL = "/assets/aistudio/Md._Ahsanur_Rahaman_CV_39202be9.pdf";
export const CV_DOWNLOAD_FILENAME = "Md._Ahsanur_Rahaman_CV.pdf";

const CV_PAGES = [
  { pageNum: 1, src: "/assets/cv-page-1.png", title: "Page 1: Profile, Personal Statement, Education & Publications" },
  { pageNum: 2, src: "/assets/cv-page-2.png", title: "Page 2: Selected Projects, Skills, Languages & Leadership" },
  { pageNum: 3, src: "/assets/cv-page-3.png", title: "Page 3: Honors, Certifications, Volunteering & References" },
];

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const [viewMode, setViewMode] = useState<"document" | "text">("document");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activePage, setActivePage] = useState<"all" | 1 | 2 | 3>("all");
  const [copied, setCopied] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 20, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 20, 70));
  const handleResetZoom = () => setZoomLevel(100);

  const copyCvText = () => {
    const cvText = `
MD. AHSANUR RAHAMAN — CURRICULUM VITAE
AI/ML Researcher & Computer Science Engineer
Bogura, Bangladesh | Permanent Address: ${PROFILE_DATA.personalInfo.permanentAddress}
Email: ${PROFILE_DATA.contact.email} | Phone/WhatsApp: ${PROFILE_DATA.contact.phone}
LinkedIn: ${PROFILE_DATA.contact.linkedin} | GitHub: ${PROFILE_DATA.contact.github} | Portfolio: ${PROFILE_DATA.contact.portfolio}
Date of Birth: ${PROFILE_DATA.personalInfo.dateOfBirth} | Nationality: ${PROFILE_DATA.personalInfo.nationality}

========================================================================
PERSONAL STATEMENT
========================================================================
${PROFILE_DATA.personalStatement}

========================================================================
EDUCATION
========================================================================
1. B.Sc in Computer Science and Engineering (2023 – Ongoing)
   Pundra University of Science & Technology, Bogura, Bangladesh
   Grade: CGPA 3.83 (Up to 7th Semester) / 4.00
   Focus: Artificial Intelligence, Brain-Computer Interfaces, Neural Signal Processing

2. Higher Secondary Certificate (HSC) (2019 – 2020)
   Govt. Shah Sultan College, Bogura, Bangladesh
   Grade: GPA 5.00 / 5.00 | Group: Science

3. Secondary School Certificate (SSC) (2017 – 2018)
   Akhlas Shibpur Shampur B.L. High School, Khetlal, Joypurhat, Bangladesh
   Grade: GPA 5.00 / 5.00 | Group: Science

========================================================================
PUBLICATIONS & CONFERENCES
========================================================================
1. [Md. Masjidul Islam, Md. Ahsanur Rahaman, Mrittika Mahbub]
   "Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI."
   Conference, RICRF 2026, 5 Pages | Status: Accepted

2. [Md. Masjidul Islam, Md. Ahsanur Rahaman, Mrittika Mahbub]
   "Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI." [Extended]
   Conference, IEEE CSDE 2026, 6 Pages | Status: Accepted (Scopus-Indexed)

3. [Md. Masjidul Islam, Md. Ahsanur Rahaman, Mrittika Mahbub, Suraiya Jahan]
   "Reference-Conditioned Diffusion-Based EEG Reconstruction for Parkinson's Disease Detection: A Comparative Evaluation with Transformer and Self-Supervised Baselines."
   Conference, ICEEICT 2027, 6 Pages | Status: Submitted

4. [Md. Masjidul Islam, Md. Ahsanur Rahaman, Mrittika Mahbub, Suraiya Jahan]
   "Reference-Conditioned Diffusion-Based EEG Reconstruction for Parkinson's Disease Detection: A Comparative Study of Transformer and Self-Supervised Learning Methods Using Six-Fold Subject-Level Cross-Validation." [Extended]
   Journal, Computers in Biology and Medicine, 10 Pages | Status: Submitted

========================================================================
HONORS & ACHIEVEMENTS
========================================================================
- 2026: Hackathon Champion — CSE FEST 2026, Department of CSE, Pundra University
- 2025: Galactic Problem Solver — NASA Space Apps Challenge (Project MARSWAY)
- 2025: Hackathon Winner (Special Category) — CSE FEST, Department of CSE, PUB
- 2025: Runner-Up (Debate) — CSE FEST, Department of CSE, PUB
- 2024: Winner — CSE Department Logo Contest, Department of CSE, PUB
- 2023: 1st Runner-Up — PUPC Beginner's Programming Contest, Department of CSE, PUB

========================================================================
ACADEMIC REFERENCES
========================================================================
1. Md. Habib Ehsanul Hoque, Assistant Professor & Head (CSE)
   Pundra University of Science & Technology, Bogura, Bangladesh
   Email: ehsanamil@gmail.com | Phone: +880 1786 044388

2. Mrittika Mahbub, Lecturer (CSE)
   Pundra University of Science & Technology, Bogura, Bangladesh
   Email: mrittikatania@gmail.com | Phone: +880 1701 577906
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-3 md:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl h-[94vh] max-h-[96vh] flex flex-col rounded-2xl border border-cyan-800/60 bg-[#090d18] shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10 overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 py-2.5 sm:px-6 sm:py-3 border-b border-slate-800 bg-[#060912] shrink-0">
          {/* Left Title & Status */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                Official Curriculum Vitae — Md. Ahsanur Rahaman
              </h2>
              <p className="text-[10px] text-slate-400 font-mono hidden xs:block">
                Verified 3-Page Academic & Engineering Dossier
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode("document")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === "document"
                  ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/50 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Document Preview</span>
            </button>
            <button
              onClick={() => setViewMode("text")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === "text"
                  ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/50 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Reader View</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Direct PDF Download Button */}
            <a
              href={CV_PDF_URL}
              download={CV_DOWNLOAD_FILENAME}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all active:scale-95 cursor-pointer"
              title="Download official PDF CV"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Download PDF</span>
            </a>

            {/* Open PDF in New Tab */}
            <a
              href={CV_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              title="Open raw PDF directly in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Open Tab</span>
            </a>

            {/* Copy Plain Text */}
            <button
              onClick={copyCvText}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              title="Copy plain text CV to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copied ? "Copied" : "Copy"}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close CV preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Navigation Sub-bar (Only in Document View Mode) */}
        {viewMode === "document" && (
          <div className="px-3.5 sm:px-6 py-1.5 bg-[#080d18] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono shrink-0">
            {/* Page selection pills */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-400 mr-1 hidden sm:inline">Show:</span>
              <button
                onClick={() => setActivePage("all")}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  activePage === "all"
                    ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                All 3 Pages
              </button>
              {CV_PAGES.map((p) => (
                <button
                  key={p.pageNum}
                  onClick={() => setActivePage(p.pageNum as 1 | 2 | 3)}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    activePage === p.pageNum
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  Page {p.pageNum}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 70}
                className="p-1 rounded hover:bg-slate-800 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-cyan-300 font-bold min-w-[42px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 160}
                className="p-1 rounded hover:bg-slate-800 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 rounded hover:bg-slate-800 hover:text-white cursor-pointer ml-0.5"
                title="Reset Zoom to 100%"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Modal Body: Active View */}
        <div className="flex-1 w-full h-full overflow-y-auto bg-[#07090e] flex flex-col">
          {viewMode === "document" ? (
            /* OFFICIAL FULL HIGH-RES DOCUMENT PREVIEW (NO CHROME BLOCK) */
            <div className="w-full flex-1 p-2 sm:p-5 md:p-8 flex flex-col items-center space-y-6 sm:space-y-8">
              {(activePage === "all" ? CV_PAGES : CV_PAGES.filter((p) => p.pageNum === activePage)).map((page) => (
                <div
                  key={page.pageNum}
                  className="w-full flex flex-col items-center transition-all duration-200"
                  style={{ maxWidth: `${Math.round(820 * (zoomLevel / 100))}px` }}
                >
                  {/* Page header label */}
                  <div className="w-full flex items-center justify-between px-2 mb-1.5 text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-400 font-semibold">{page.title}</span>
                    <span className="text-slate-500">Page {page.pageNum} of 3</span>
                  </div>

                  {/* Rendered Document Page Image with sleek paper drop-shadow */}
                  <div className="w-full rounded-lg sm:rounded-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.85)] border border-slate-700/80 bg-white">
                    <img
                      src={page.src}
                      alt={`Md. Ahsanur Rahaman CV - Page ${page.pageNum}`}
                      className="w-full h-auto object-contain block select-none pointer-events-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}

              {/* Bottom Quick Bar */}
              <div className="w-full max-w-3xl pt-2 pb-4 text-center">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Official 3-Page Academic Curriculum Vitae</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <a
                      href={CV_PDF_URL}
                      download={CV_DOWNLOAD_FILENAME}
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF ({CV_DOWNLOAD_FILENAME})</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STRUCTURED TEXT / SCREEN READER ACCESSIBLE VIEW */
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 bg-white text-slate-900 font-sans">
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-4 sm:pb-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Md. Ahsanur Rahaman
                    </h1>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                      AI/ML Researcher & Computer Science Engineer
                    </p>
                    <p className="text-xs text-slate-600 font-medium">
                      B.Sc in CSE · Pundra University of Science & Technology, Bogura, Bangladesh
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-600 space-y-0.5 sm:text-right">
                    <div><strong>DOB:</strong> {PROFILE_DATA.personalInfo.dateOfBirth}</div>
                    <div><strong>Nationality:</strong> {PROFILE_DATA.personalInfo.nationality}</div>
                    <div><strong>Current:</strong> {PROFILE_DATA.contact.location}</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-700 font-mono">
                  <div className="flex items-center gap-1.5">
                    <strong>Email:</strong>
                    <a href={`mailto:${PROFILE_DATA.contact.email}`} className="text-cyan-700 underline">
                      {PROFILE_DATA.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <strong>Phone / WhatsApp:</strong>
                    <span>{PROFILE_DATA.contact.phone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <strong>Permanent Address:</strong> {PROFILE_DATA.personalInfo.permanentAddress}
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap gap-x-4 gap-y-1 pt-1 text-slate-600">
                    <span><strong>GitHub:</strong> {PROFILE_DATA.contact.github}</span>
                    <span><strong>LinkedIn:</strong> {PROFILE_DATA.contact.linkedin}</span>
                    <span><strong>Portfolio:</strong> {PROFILE_DATA.contact.portfolio}</span>
                  </div>
                </div>
              </div>

              {/* Personal Statement */}
              <section className="space-y-1.5">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                  Personal Statement & Research Objective
                </h2>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
                  {PROFILE_DATA.personalStatement}
                </p>
              </section>

              {/* Education */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                  Education
                </h2>
                <div className="space-y-3.5 text-xs sm:text-sm divide-y divide-slate-100">
                  {PROFILE_DATA.education.map((edu, idx) => (
                    <div key={idx} className={idx > 0 ? "pt-2.5" : ""}>
                      <div className="flex flex-wrap justify-between items-baseline font-bold text-slate-900">
                        <span className="text-sm font-extrabold">{edu.degree}</span>
                        <span className="font-mono text-xs text-slate-600">{edu.duration}</span>
                      </div>
                      <div className="text-slate-700 font-medium">
                        {edu.institution}, {edu.location}
                      </div>
                      <div className="text-slate-900 font-bold font-mono text-xs mt-0.5">
                        Final Grade: {edu.grade}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Publications */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between">
                  <span>Peer-Reviewed Publications & Conferences</span>
                  <span className="text-[11px] font-normal text-slate-600">IEEE Scopus-Indexed & Under Review</span>
                </h2>
                <div className="space-y-3 text-xs sm:text-sm">
                  {PUBLICATIONS_DATA.map((pub, idx) => (
                    <div key={pub.id} className="space-y-0.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {idx + 1}. "{pub.title}"
                      </div>
                      <div className="text-slate-700 font-mono text-xs flex flex-wrap gap-x-2">
                        <span className="font-semibold text-cyan-800">{pub.venue}</span>
                        <span>·</span>
                        <span>{pub.year}</span>
                        <span>·</span>
                        <span className="font-bold text-emerald-800">[{pub.status} — {pub.length}]</span>
                      </div>
                      <div className="text-slate-600 text-xs">
                        <strong>Authors:</strong> {pub.authors.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Honors & Achievements */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                  Honors, Competitions & Distinctions
                </h2>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800">
                  {ACHIEVEMENTS.map((item) => (
                    <li key={`${item.title}-${item.year}`} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-slate-900 shrink-0">[{item.year}]</span>
                      <div>
                        <strong>{item.title}</strong> — {item.organization}
                        <div className="text-slate-600 text-xs">{item.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Academic References */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                  Academic References
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {PROFILE_DATA.references.map((ref, idx) => (
                    <div key={idx} className="p-3 border border-slate-200 rounded-lg bg-slate-50 space-y-1">
                      <div className="font-bold text-slate-900 text-sm">{ref.name}</div>
                      <div className="text-slate-700 font-medium">{ref.title}</div>
                      <div className="text-slate-600">{ref.department}</div>
                      <div className="text-slate-600">{ref.institution}, {ref.location}</div>
                      <div className="pt-1.5 border-t border-slate-200 font-mono text-slate-700 space-y-0.5">
                        <div><strong>Email:</strong> {ref.email}</div>
                        <div><strong>Phone:</strong> {ref.phone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
