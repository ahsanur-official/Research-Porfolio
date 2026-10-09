import { useState } from "react";
import { Network, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { THESIS_PROJECT } from "../data/research";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

export function ResearchPipeline() {
  const [activeStep, setActiveStep] = useState<number>(5); // default to CNN/LSTM step

  const currentStepData = THESIS_PROJECT.pipelineSteps.find(s => s.stepNumber === activeStep) || THESIS_PROJECT.pipelineSteps[4];

  return (
    <section id="pipeline" className="py-5 sm:py-6 md:py-8 border-t border-slate-800/80 bg-[#06080d]">
      <div className="w-full max-w-[1720px] mx-auto px-3.5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="max-w-4xl lg:max-w-5xl mb-2.5 sm:mb-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-1">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>04. Featured Research Thesis & Architecture</span>
            </div>
            <ReadingTimeBadge time="2.5 min" wordCount={450} />
          </div>
          <h2 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {THESIS_PROJECT.title}
          </h2>
          <div className="mt-1 text-xs font-mono text-cyan-300 font-medium">
            {THESIS_PROJECT.academicContext} · {THESIS_PROJECT.supervision}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
            {THESIS_PROJECT.overview}
          </p>
        </div>

        {/* Pipeline Visual Container with Colorful Border */}
        <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/95 via-slate-900/70 to-cyan-950/20 backdrop-blur-md p-2.5 sm:p-3.5 md:p-4 space-y-3 shadow-[0_0_30px_rgba(6,182,212,0.12)]">
          {/* Header with Visual Banner */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] sm:aspect-[21/9] max-h-52 w-full">
            <img
              src="/assets/images/neural_eeg_reconstruction_1791200585625.jpg"
              alt="Neural Signal Reconstruction and BCI Architecture"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/50 to-transparent" />
            <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-cyan-300 bg-slate-950/85 px-2.5 py-1 rounded-md border border-cyan-500/40 shadow">
                <Network className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">Motor Intention to Digital Bypass</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 hidden sm:inline-block">
                Tap any node to inspect
              </span>
            </div>
          </div>

          {/* Stepper Buttons (Responsive swipeable strip on mobile, grid on desktop) */}
          <div>
            <div className="flex sm:hidden items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5 px-1">
              <span>Pipeline Stages (Swipe to view all 10)</span>
              <span className="text-cyan-400 font-bold">{activeStep} / 10</span>
            </div>
            <div className="flex sm:grid sm:grid-cols-5 lg:grid-cols-10 gap-2 overflow-x-auto pb-1.5 sm:pb-0 scroll-smooth">
              {THESIS_PROJECT.pipelineSteps.map((step) => {
                const isActive = step.stepNumber === activeStep;
                return (
                  <button
                    key={step.stepNumber}
                    onClick={() => setActiveStep(step.stepNumber)}
                    className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[72px] sm:min-h-[80px] min-w-[125px] sm:min-w-0 shrink-0 sm:shrink ${
                      isActive
                        ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.35)] text-white font-semibold"
                        : "border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={isActive ? "text-cyan-300 font-bold" : "text-slate-500"}>
                        0{step.stepNumber}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyan-400 animate-ping shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-slate-700"}`} />
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2">
                      {step.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector for Active Step */}
          <div className="rounded-xl border border-slate-800/90 bg-[#080c16] p-3.5 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/60 text-cyan-300 font-bold">
                  Stage 0{currentStepData.stepNumber}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-300 font-semibold truncate">{currentStepData.category}</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {currentStepData.label}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                {currentStepData.description}
              </p>

              <div className="pt-0.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-cyan-400">
                <span className="text-slate-500">Methodology:</span>
                <span className="text-slate-200 font-semibold">{currentStepData.technology}</span>
              </div>
            </div>

            {/* Step Controls */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-800 pt-3 lg:pt-0 lg:pl-5 space-y-2">
              <div className="text-[11px] sm:text-xs font-mono text-slate-400">
                Pipeline Progression
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={activeStep <= 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  disabled={activeStep >= 10}
                  onClick={() => setActiveStep(prev => Math.min(10, prev + 1))}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 disabled:opacity-40 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500">
                {activeStep < 4 && "Biosignal Acquisition & Preprocessing"}
                {activeStep >= 4 && activeStep <= 6 && "Deep Feature Extraction & Classification"}
                {activeStep >= 7 && activeStep <= 8 && "Spike Synthesis & Digital Logic"}
                {activeStep >= 9 && "Neuromuscular Effector Stimulation"}
              </div>
            </div>
          </div>

          {/* Academic Transparency Note */}
          <div className="flex items-start gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-[11px] sm:text-xs leading-relaxed">
              <span className="font-semibold text-slate-300">Scope: </span>
              <span>{THESIS_PROJECT.clinicalImpactDisclaimer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
