import { X, Printer, Check, Copy, ExternalLink, Mail, Phone, MapPin, Globe, Award, BookOpen, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import { PROFILE_DATA } from "../data/profile";
import { PUBLICATIONS_DATA } from "../data/publications";
import { LEADERSHIP_ROLES, ACHIEVEMENTS, CERTIFICATIONS, VOLUNTEERING_ACTIVITIES } from "../data/experience";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

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
1. B.Sc in Computer Science and Engineering (01/2023 – Ongoing)
   Pundra University of Science & Technology, Bogura, Bangladesh
   Grade: CGPA 3.83 / 4.00 (Up to 7th Semester)
   Focus: Artificial Intelligence, Brain-Computer Interfaces, EEG Signal Processing

2. Higher Secondary Certificate (HSC) (07/2019 – 12/2020)
   Govt. Shah Sultan College, Bogura, Bangladesh
   Grade: GPA 5.00 / 5.00 | Group: Science

3. Secondary School Certificate (SSC) (01/2017 – 12/2018)
   Akhlas Shibpur Shampur B.L. High School, Khetlal, Joypurhat, Bangladesh
   Grade: GPA 5.00 / 5.00 | Group: Science

========================================================================
PUBLICATIONS & CONFERENCES
========================================================================
1. "Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI"
   Authors: Md. Masjidul Islam, Md. Ahsanur Rahaman, Mrittika Mahbub
   Venue: International Conference on Robotics, Intelligent Computing and Pattern Recognition (RICRF 2026) [6 Pages]
   Status: Accepted

2. "Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI" [Extended Version]
   Authors: Md. Masjidul Islam, Md. Ahsanur Rahaman, Mrittika Mahbub
   Venue: IEEE Asia-Pacific Conference on Computer Science and Data Engineering (IEEE CSDE 2026) [6 Pages]
   Status: Accepted (Scopus-Indexed, IEEE Xplore)

3. "Reference-Conditioned Diffusion-Based EEG Reconstruction for Parkinson's Disease Detection: A Comparative Evaluation with Transformer and Self-Supervised Baselines"
   Authors: Md. Masjidul Islam, Md. Ahsanur Rahaman, Mrittika Mahbub, Suraiya Jahan
   Venue: International Conference on Electrical, Computer and Communication Engineering (ICEEICT 2027) [6 Pages]
   Status: Submitted / Under Review

========================================================================
HONORS & ACHIEVEMENTS
========================================================================
- 2025: Galactic Problem Solver — NASA Space Apps Challenge (Project MARSWAY)
- 2025: Hackathon Winner (Special Category) — CSE FEST, Department of CSE, Pundra University
- 2025: Runner-Up (Debate Competition) — CSE FEST, Department of CSE, Pundra University
- 2024: Winner — CSE Department Official Logo Contest, Pundra University
- 2023: 1st Runner-Up — PUPC Beginner's Programming Contest, Pundra University

========================================================================
LEADERSHIP & GOVERNANCE
========================================================================
- 2026: General Secretary — PUB Computer & Programming Club (PUB CPC)
- Sept 2025 – Sept 2026: Convener — BASIS Students' Forum (PUB Chapter)
- 2025: Vice President (Competitive Programming) — PUB Computer & Programming Club (PUB CPC)
- Sept 2024 – Sept 2025: Executive Member — BASIS Students' Forum (PUB Chapter)

========================================================================
CERTIFICATIONS & PROFESSIONAL TRAINING
========================================================================
- AI/ML Expert With Phitron (Batch 01) — Phitron (Ongoing)
- Virtual Internship in Python Programming — DecodeLabs (07/2026)
- AI-Powered Analytics — Grameenphone Academy (09/2026)
- Data Foundations with AI — Grameenphone Academy (09/2026)
- Data Analysis with Excel — Futurenation (03/2025)
- Problem Solving (Basic) — HackerRank (03/2025)
- Data Science Fundamentals — OSTAD (06/2026)

========================================================================
KEY ACADEMIC & SOFTWARE PROJECTS
========================================================================
- MARSWAY — Martian Map: Science-aware Marswalk mission planner harnessing NASA open datasets (Galactic Problem Solver).
- KhaliError-Lang: Custom programming language with lexer, recursive descent parser, and AST evaluator for Compiler Design Sessional.
- Crypto Chat: Secure client-server real-time chat application with cryptographic authentication.
- My Weather App 2.0: Flutter cross-platform weather application with real-time meteorological API for Mobile App Sessional.
- Daily Task Tracker: React.js and Firebase Firestore real-time task productivity application.
- Writer Ahona Web: Next.js and TypeScript literature portal with custom Bengali typography.

========================================================================
LANGUAGE PROFICIENCIES (CEFR & IELTS)
========================================================================
- Bangla: Native / Mother Tongue (C2 Mastery)
- English: CEFR B2 (IELTS Academic Overall 6.0: Listening 5.5, Reading 5.5, Writing 6.0, Speaking 6.0 — Date: 06/07/2024)
- Hindi: Listening C1, Spoken Interaction B2, Spoken Production B2, Reading A1, Writing A1

========================================================================
VOLUNTEERING & COMMUNITY ENGAGEMENT
========================================================================
- 2026: NASA Space Apps Challenge, Bangladesh — Global Organizing Committee / Local Chapter
- 2026: Bakeman's 4th International Language League (Divisional Round) — Coordinator
- 2025: National Newspaper Olympiad (Divisional Selection Round) — Event Coordinator
- 2025: CSE FEST — Technical Team Leader
- 2025: Managed and Coordinated Beginner's Programming Contest — PUB CPC

========================================================================
ACADEMIC REFERENCES
========================================================================
1. Md. Habib Ehsanul Hoque
   Assistant Professor & Head, Department of CSE
   Pundra University of Science & Technology, Bogura, Bangladesh
   Email: ehsanamil@gmail.com | Phone: +880 1786 044388

2. Mrittika Mahbub
   Lecturer, Department of CSE
   Pundra University of Science & Technology, Bogura, Bangladesh
   Email: mrittikatania@gmail.com | Phone: +880 1701 577906
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[96vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl z-10 overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-3.5 py-3 sm:px-6 sm:py-4 border-b border-slate-800 bg-[#080d1a] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
              Academic Curriculum Vitae — Md. Ahsanur Rahaman
            </span>
            <span className="text-xs font-mono text-cyan-400 hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
              Verified Dossier
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={copyCvText}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              title="Copy plain text CV to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden xs:inline">{copied ? "Copied" : "Copy Plain Text"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors cursor-pointer"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors ml-1 cursor-pointer"
              aria-label="Close CV modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 bg-white text-slate-900 font-sans print:p-0">
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
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between">
              <span>Personal Statement & Research Objective</span>
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
                  {edu.details && (
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-slate-600 text-xs">
                      {edu.details.map((d, dIdx) => (
                        <li key={dIdx}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between">
              <span>Peer-Reviewed Publications & Conferences</span>
              <span className="text-[11px] font-normal text-slate-600">3 Papers (2 Accepted, 1 Under Review)</span>
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
                  <p className="text-slate-700 text-xs leading-relaxed pt-1 text-justify">
                    {pub.summary}
                  </p>
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

          {/* Leadership */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Leadership & Co-Curricular Governance
            </h2>
            <div className="space-y-2 text-xs sm:text-sm text-slate-800">
              {LEADERSHIP_ROLES.map((role) => (
                <div key={role.role} className="pb-1.5 border-b border-slate-100 last:border-b-0">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{role.role} — {role.organization}</span>
                    <span className="font-mono text-xs text-slate-600">{role.period}</span>
                  </div>
                  <div className="text-slate-600 text-xs mt-0.5">{role.description}</div>
                  <ul className="mt-1 list-disc list-inside space-y-0.5 text-slate-600 text-xs">
                    {role.responsibilities.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Certifications & Professional Training
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="p-2 border border-slate-200 rounded">
                  <div className="font-bold text-slate-900">{cert.title}</div>
                  <div className="text-slate-600 font-mono text-[11px]">{cert.issuer} ({cert.date}) [{cert.status}]</div>
                  {cert.credentialNote && (
                    <div className="text-slate-600 text-[11px] mt-0.5">{cert.credentialNote}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Language Proficiencies (CEFR Framework)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {PROFILE_DATA.languages.map((lang) => (
                <div key={lang.language} className="p-2.5 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="font-bold text-slate-900 text-sm">{lang.language}</div>
                  <div className="text-cyan-800 font-mono font-semibold text-xs">{lang.level}</div>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-200 space-y-0.5 font-mono text-[11px] text-slate-700">
                    <div>Listening: {lang.details.listening}</div>
                    <div>Reading: {lang.details.reading}</div>
                    <div>Speaking: {lang.details.spokenInteraction}</div>
                    <div>Writing: {lang.details.writing}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Volunteering */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Volunteering & Community Service
            </h2>
            <div className="space-y-1.5 text-xs text-slate-800">
              {VOLUNTEERING_ACTIVITIES.map((act, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-slate-900 shrink-0">[{act.year}]</span>
                  <div>
                    <strong>{act.roleOrActivity}</strong> — {act.organization}
                    <div className="text-slate-600 text-xs">{act.description}</div>
                  </div>
                </div>
              ))}
            </div>
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

          {/* Annexes */}
          <section className="space-y-1 pt-2 border-t border-slate-300">
            <div className="text-xs font-mono font-bold text-slate-700 uppercase">
              Dossier Annexes & Supporting Documents (Available Upon Request):
            </div>
            <div className="text-xs text-slate-600 font-mono flex flex-wrap gap-x-3 gap-y-1">
              {PROFILE_DATA.annexes.map((item, idx) => (
                <span key={idx}>· {item}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
