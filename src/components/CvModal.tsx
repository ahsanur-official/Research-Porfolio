import { X, Printer, Download, ExternalLink, Check, Copy } from "lucide-react";
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

      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl z-10 overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d1a] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-tight">
              Curriculum Vitae — Md. Ahsanur Rahaman
            </span>
            <span className="text-xs font-mono text-cyan-400 hidden sm:inline-block">
              · Verified Document
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyCvText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Text" : "Copy Text"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors ml-2"
              aria-label="Close CV modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-slate-900 font-sans print:p-0">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Md. Ahsanur Rahaman
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">
              B.Sc in CSE | Pundra University of Science & Technology, Bogura, Bangladesh
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-700 font-mono">
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
                <div className="flex justify-between font-bold text-slate-900">
                  <span>B.Sc in Computer Science and Engineering</span>
                  <span>01/2023 – Ongoing</span>
                </div>
                <div className="text-slate-700">Pundra University of Science & Technology, Bogura, Bangladesh</div>
                <div className="text-slate-900 font-semibold">Final grade: CGPA 3.83 (Up to 7th Semester) / 4.00</div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Higher Secondary Certificate (HSC)</span>
                  <span>07/2019 – 12/2020</span>
                </div>
                <div className="text-slate-700">Govt. Shah Sultan College, Bogura, Bangladesh</div>
                <div className="text-slate-900 font-semibold">Final grade: GPA 5.00 / 5.00</div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-900">
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
              Publications and Conferences
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              {PUBLICATIONS_DATA.map((pub) => (
                <div key={pub.id} className="space-y-0.5">
                  <div className="text-slate-900">
                    <span className="font-semibold">[{pub.authors.join(", ")}] </span>
                    <span className="italic">"{pub.title}"</span>
                  </div>
                  <div className="text-slate-700 text-xs font-mono">
                    [{pub.type}], [{pub.venue}], [{pub.length}] | <strong>Status: {pub.status}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Projects */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Selected Engineering Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="font-bold text-slate-900">MARSWAY — Martian Map (2026)</div>
                <div className="text-slate-700">Science-Aware Marswalk Mission Planner with NASA Topography Data</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">Daily Task Tracker (2026)</div>
                <div className="text-slate-700">Responsive task-management application with Firebase data storage</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">AA Game Station (2026)</div>
                <div className="text-slate-700">Browser-based gaming platform featuring 10 interactive JavaScript games</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">Writer Ahona Web (2026)</div>
                <div className="text-slate-700">Bengali writer platform and CMS using Next.js, React, and TypeScript</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">ASCII Lab (2026)</div>
                <div className="text-slate-700">Multi-format text, ASCII, binary, hexadecimal, and octal conversion tool</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">Crypto Chat (2026)</div>
                <div className="text-slate-700">Secure real-time chat system with cryptographic primitives and authentication</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">KhaliError-Lang (2025)</div>
                <div className="text-slate-700">Custom programming language exploring lexer, parser, and code generation</div>
              </div>
              <div>
                <div className="font-bold text-slate-900">My Weather App 2.0 (2025)</div>
                <div className="text-slate-700">Flutter cross-platform weather app using real-time meteorological API</div>
              </div>
            </div>
          </section>

          {/* Languages & Digital Skills */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Languages
              </h2>
              <div className="text-xs space-y-1 text-slate-800">
                <div><strong>Bangla:</strong> Native (C2)</div>
                <div><strong>English:</strong> B2 (IELTS Academic 6.0: L 5.5, R 5.5, W 6.0, S 6.0)</div>
                <div><strong>Hindi:</strong> Listening C1, Spoken B2, Reading A1, Writing A1</div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Digital Skills
              </h2>
              <div className="text-xs space-y-1 text-slate-800">
                <div><strong>Programming:</strong> Python, C, C++, Java, JavaScript, SQL</div>
                <div><strong>Data Science & ML:</strong> NumPy, Pandas, Scikit-learn, Matplotlib</div>
                <div><strong>Deep Learning:</strong> CNN, LSTM, TensorFlow, PyTorch</div>
                <div><strong>Web:</strong> HTML, CSS, React.js, Node.js</div>
                <div><strong>Tools:</strong> Git, GitHub, Figma, MATLAB</div>
              </div>
            </div>
          </section>

          {/* Honors & Leadership */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Honors & Achievements
              </h2>
              <ul className="text-xs space-y-1 text-slate-800">
                {ACHIEVEMENTS.map((ach) => (
                  <li key={ach.title}>
                    <strong>{ach.year}:</strong> {ach.title} ({ach.organization})
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Leadership Roles
              </h2>
              <ul className="text-xs space-y-1 text-slate-800">
                {LEADERSHIP_ROLES.map((lead) => (
                  <li key={`${lead.role}-${lead.period}`}>
                    <strong>{lead.period}:</strong> {lead.role} — {lead.organization}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Academic References */}
          <section className="space-y-1.5 pt-2 border-t border-slate-300">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900">
              Academic References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-800">
              {PROFILE_DATA.references.map((ref) => (
                <div key={ref.name}>
                  <div className="font-bold">{ref.name}</div>
                  <div>{ref.title}, {ref.institution}</div>
                  <div>{ref.email} | {ref.phone}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
