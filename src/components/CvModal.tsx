import { X, Printer, Check, Copy } from "lucide-react";
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
B.Sc in Computer Science & Engineering | Pundra University of Science & Technology, Bogura, Bangladesh
Email: ${PROFILE_DATA.contact.email} | Mobile/WhatsApp: ${PROFILE_DATA.contact.phone}
LinkedIn: ${PROFILE_DATA.contact.linkedin} | GitHub: ${PROFILE_DATA.contact.github}

PERSONAL STATEMENT:
${PROFILE_DATA.personalStatement}

EDUCATION:
- B.Sc in Computer Science and Engineering (01/2023 - Ongoing)
  Pundra University of Science & Technology, Bogura, Bangladesh
  Final grade: CGPA 3.83 (Up to 7th Semester) / 4.00
- Higher Secondary Certificate (HSC) (07/2019 - 12/2020)
  Govt. Shah Sultan College, Bogura, Bangladesh | GPA 5.00 / 5.00
- Secondary School Certificate (SSC) (01/2017 - 12/2018)
  Akhlas Shibpur Shampur B.L. High School, Khetlal, Joypurhat, Bangladesh | GPA 5.00 / 5.00

PUBLICATIONS AND CONFERENCES:
1. "Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI" [RICRF 2026, 6 Pages] | Status: Accepted
2. "Reference-Conditioned Healthy-Like EEG Reconstruction Using Movement-Aware CycleGAN for Motor Imagery BCI" [Extended] [IEEE CSDE 2026, 6 Pages] | Status: Accepted
3. "Reference-Conditioned Diffusion-Based EEG Reconstruction for Parkinson's Disease Detection: A Comparative Evaluation with Transformer and Self-Supervised Baselines" [ICEEICT 2027, 6 Pages] | Status: Submitted

LANGUAGES:
- Bangla (Mother tongue): C2
- English: B2 (IELTS Academic 6.0: L 5.5, R 5.5, W 6.0, S 6.0 - 06/07/2024)
- Hindi: Listening C1, Spoken B2, Reading A1, Writing A1

HONORS & ACHIEVEMENTS:
- 2025: Galactic Problem Solver (NASA Space Apps Challenge)
- 2025: Hackathon Winner - Special Category (CSE FEST, PUB)
- 2025: Runner-Up - Debate (CSE FEST, PUB)
- 2024: Winner - CSE Department Logo Contest (PUB)
- 2023: 1st Runner-Up - PUPC Beginner's Programming Contest (PUB)
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
              CV — Md. Ahsanur Rahaman
            </span>
            <span className="text-xs font-mono text-cyan-400 hidden sm:inline-block">
              · Verified
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={copyCvText}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Copy plain text CV to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden xs:inline">{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print/PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors ml-1"
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
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Md. Ahsanur Rahaman
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
              B.Sc in CSE | Pundra University of Science & Technology, Bogura, Bangladesh
            </p>

            <div className="mt-2.5 sm:mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-700 font-mono">
              <div><strong>Email:</strong> {PROFILE_DATA.contact.email}</div>
              <div><strong>Phone:</strong> {PROFILE_DATA.contact.phone} (Mobile / WhatsApp)</div>
              <div><strong>Address:</strong> {PROFILE_DATA.contact.address}</div>
              <div><strong>Profiles:</strong> LinkedIn | GitHub | Portfolio</div>
              <div><strong>Personal:</strong> DOB: 27/01/2003 | Nationality: Bangladeshi</div>
            </div>
          </div>

          {/* Personal Statement */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Personal Statement
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
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex flex-wrap justify-between font-bold text-slate-900">
                  <span>B.Sc in Computer Science and Engineering</span>
                  <span>01/2023 – Ongoing</span>
                </div>
                <div className="text-slate-700">Pundra University of Science & Technology, Bogura, Bangladesh</div>
                <div className="text-slate-900 font-semibold">Final grade: CGPA 3.83 (Up to 7th Semester) / 4.00</div>
              </div>

              <div>
                <div className="flex flex-wrap justify-between font-bold text-slate-900">
                  <span>Higher Secondary Certificate (HSC)</span>
                  <span>07/2019 – 12/2020</span>
                </div>
                <div className="text-slate-700">Govt. Shah Sultan College, Bogura, Bangladesh</div>
                <div className="text-slate-900 font-semibold">Final grade: GPA 5.00 / 5.00</div>
              </div>

              <div>
                <div className="flex flex-wrap justify-between font-bold text-slate-900">
                  <span>Secondary School Certificate (SSC)</span>
                  <span>01/2017 – 12/2018</span>
                </div>
                <div className="text-slate-700">Akhlas Shibpur Shampur B.L. High School, Khetlal, Joypurhat, Bangladesh</div>
                <div className="text-slate-900 font-semibold">Final grade: GPA 5.00 / 5.00</div>
              </div>
            </div>
          </section>

          {/* Publications */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Scholarly Publications & Conferences
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              {PUBLICATIONS_DATA.map((pub, idx) => (
                <div key={pub.id} className="space-y-0.5">
                  <div className="font-bold text-slate-900">
                    {idx + 1}. "{pub.title}."
                  </div>
                  <div className="text-slate-700 font-mono text-xs">
                    {pub.venueFull} · {pub.year} [{pub.status} - {pub.length}]
                  </div>
                  <div className="text-slate-600 text-xs">
                    Authors: {pub.authors.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Language Proficiencies (CEFR)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {PROFILE_DATA.languages.map((lang) => (
                <div key={lang.language} className="p-2 border border-slate-200 rounded">
                  <div className="font-bold text-slate-900">{lang.language}</div>
                  <div className="text-slate-700 font-mono text-[11px]">{lang.level}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Honors & Achievements */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Honors, Hackathons & Distinctions
            </h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 list-disc list-inside">
              {ACHIEVEMENTS.map((item) => (
                <li key={`${item.title}-${item.year}`}>
                  <strong>{item.year}: {item.title}</strong> — {item.organization}
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
                <div key={role.role}>
                  <div className="font-bold text-slate-900">{role.role} — {role.organization} ({role.period})</div>
                  <div className="text-slate-600 text-xs">{role.description}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Certifications & Technical Training
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-800">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title}>
                  <strong>{cert.title}</strong> — {cert.issuer} ({cert.date}) [{cert.status}]
                </div>
              ))}
            </div>
          </section>

          {/* Volunteering */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Volunteering & Community Service
            </h2>
            <div className="space-y-1 text-xs text-slate-800">
              {VOLUNTEERING_ACTIVITIES.map((act, aIdx) => (
                <div key={aIdx}>
                  <strong>{act.roleOrActivity}</strong> — {act.organization} ({act.year})
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
