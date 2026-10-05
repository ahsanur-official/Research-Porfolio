import { useEffect, useRef, useState } from "react";
import { Activity, Play, Pause, BarChart3, Waves, Zap } from "lucide-react";

interface EegChannel {
  name: string;
  region: string;
  functionDesc: string;
  baseFreq: number; // Hz
  amplitude: number; // microvolts
  color: string;
}

const CHANNELS: EegChannel[] = [
  { name: "C3", region: "Left Motor Cortex", functionDesc: "Right Hand Motor Imagery", baseFreq: 10, amplitude: 22, color: "#38bdf8" }, // cyan
  { name: "Cz", region: "Central Motor Strip", functionDesc: "Foot / Midline Rest", baseFreq: 11, amplitude: 24, color: "#818cf8" }, // indigo
  { name: "C4", region: "Right Motor Cortex", functionDesc: "Left Hand Motor Imagery", baseFreq: 10, amplitude: 22, color: "#c084fc" }, // purple
];

export function EegOscilloscope() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulatedState, setSimulatedState] = useState<"Rest" | "Left Hand MI" | "Right Hand MI">("Rest");
  const [viewMode, setViewMode] = useState<"oscilloscope" | "spectrum">("oscilloscope");

  const dimsRef = useRef<{ width: number; height: number }>({ width: 400, height: 180 });
  const timeOffsetRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 200);
      const height = 180;
      dimsRef.current = { width, height };

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    const render = () => {
      const { width, height } = dimsRef.current;
      if (width <= 0) return;

      // Dark technical background
      ctx.fillStyle = "#070b14";
      ctx.fillRect(0, 0, width, height);

      // Technical grid
      ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
      ctx.lineWidth = 1;
      const gridStep = 30;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridStep) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const offset = timeOffsetRef.current;

      if (viewMode === "oscilloscope") {
        // Render 3 Pure Waveforms without ANY overlapping text
        const channelHeight = height / CHANNELS.length;

        CHANNELS.forEach((channel, idx) => {
          const centerY = channelHeight * idx + channelHeight / 2;

          // Zero line
          ctx.strokeStyle = "rgba(71, 85, 105, 0.3)";
          ctx.beginPath();
          ctx.setLineDash([2, 4]);
          ctx.moveTo(0, centerY);
          ctx.lineTo(width, centerY);
          ctx.stroke();
          ctx.setLineDash([]);

          // ERD attenuation calculation (Contralateral Desynchronization)
          let suppression = 1.0;
          if (simulatedState === "Left Hand MI" && channel.name === "C4") {
            suppression = 0.32; // Contralateral ERD
          } else if (simulatedState === "Right Hand MI" && channel.name === "C3") {
            suppression = 0.32; // Contralateral ERD
          }

          // Real-time trace with luminous phosphor effect
          ctx.beginPath();
          ctx.strokeStyle = channel.color;
          ctx.lineWidth = 1.8;

          for (let x = 0; x < width; x += 2) {
            const t = (x + offset) * 0.045;
            const primaryMu = Math.sin(t * (channel.baseFreq * 0.42)) * channel.amplitude * suppression;
            const betaHarmonic = Math.sin(t * 1.85 + idx) * (channel.amplitude * 0.3);
            const noise = Math.sin(t * 3.8 + x * 0.08) * 2.0;

            const y = centerY + primaryMu + betaHarmonic + noise;
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        });
      } else {
        // Render Frequency Band Power Spectrum (FFT Equalizer)
        const bands = [
          { name: "Delta (δ)", range: "0.5-4Hz", power: 20, color: "#94a3b8" },
          { name: "Theta (θ)", range: "4-8Hz", power: 28, color: "#60a5fa" },
          {
            name: "Mu/Alpha (μ)",
            range: "8-12Hz",
            power: simulatedState === "Rest" ? 86 : 36,
            color: "#38bdf8"
          },
          {
            name: "Beta (β)",
            range: "13-30Hz",
            power: simulatedState === "Rest" ? 34 : 76,
            color: "#c084fc"
          },
          { name: "Gamma (γ)", range: "30-50Hz", power: 18, color: "#f43f5e" }
        ];

        const barWidth = Math.min((width - 40) / bands.length - 14, 56);
        const totalBarsWidth = bands.length * barWidth;
        const totalSpacing = width - totalBarsWidth;
        const gap = totalSpacing / (bands.length + 1);

        bands.forEach((band, bIdx) => {
          const x = gap + bIdx * (barWidth + gap);
          const jitter = isPlaying ? Math.sin(offset * 0.08 + bIdx) * 3 : 0;
          const currentHeight = Math.max(12, Math.min(120, band.power + jitter));
          const y = height - 38 - currentHeight;

          // Bar gradient fill
          const grad = ctx.createLinearGradient(0, y, 0, height - 38);
          grad.addColorStop(0, band.color);
          grad.addColorStop(1, "rgba(15, 23, 42, 0.4)");

          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barWidth, currentHeight);

          // Top highlight line
          ctx.fillStyle = band.color;
          ctx.fillRect(x, y, barWidth, 2);

          // Labels
          ctx.font = "10px 'JetBrains Mono', monospace";
          ctx.fillStyle = "#cbd5e1";
          ctx.textAlign = "center";
          ctx.fillText(band.name, x + barWidth / 2, height - 22);

          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "#64748b";
          ctx.fillText(band.range, x + barWidth / 2, height - 9);
        });

        ctx.textAlign = "left";
      }

      if (isPlaying) {
        timeOffsetRef.current += 2;
        animationFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying, simulatedState, viewMode]);

  return (
    <div className="border border-cyan-500/40 bg-gradient-to-br from-[#080d1a] to-[#07090f] backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(6,182,212,0.14)] space-y-3.5">
      {/* Instrument Header: Status, Title, and Mode Controls all cleanly separated */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-800/90">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
            EEG Signal Laboratory
          </span>
          <span className="text-[11px] font-mono text-cyan-400/90 font-medium">· 10-20 System</span>
        </div>

        {/* Active state badge placed cleanly in header, never obscuring waveforms */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <span
              className={`w-2 h-2 rounded-full ${
                simulatedState === "Rest"
                  ? "bg-cyan-400 animate-pulse"
                  : simulatedState === "Left Hand MI"
                  ? "bg-purple-400 animate-pulse"
                  : "bg-sky-400 animate-pulse"
              }`}
            />
            <span className="font-semibold text-white">{simulatedState}</span>
          </div>

          <button
            onClick={() => setViewMode(viewMode === "oscilloscope" ? "spectrum" : "oscilloscope")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-cyan-300 transition-colors border border-slate-700/60"
            title="Toggle between Waveform and Power Spectrum"
          >
            {viewMode === "oscilloscope" ? <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> : <Waves className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{viewMode === "oscilloscope" ? "Spectrum" : "Waves"}</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700/60"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? "Live" : "Hold"}</span>
          </button>
        </div>
      </div>

      {/* Main Signal Display Area: Split Channel Gutter + Clean Waveform Canvas (Zero Text Overlap) */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#070b14] flex">
        {/* Left Channel Metadata Strip (Only shown in oscilloscope mode) */}
        {viewMode === "oscilloscope" && (
          <div className="w-24 sm:w-36 shrink-0 border-r border-slate-800/80 bg-[#050811] flex flex-col justify-around p-2 sm:p-2.5 text-xs font-mono">
            {CHANNELS.map((channel) => {
              const isERD =
                (simulatedState === "Left Hand MI" && channel.name === "C4") ||
                (simulatedState === "Right Hand MI" && channel.name === "C3");

              return (
                <div key={channel.name} className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs" style={{ color: channel.color }}>
                      {channel.name}
                    </span>
                    {isERD ? (
                      <span className="text-[10px] text-purple-400 font-bold animate-pulse">ERD ↓</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">{channel.baseFreq}Hz</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate hidden sm:block">
                    {channel.region}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate hidden sm:block">
                    {channel.functionDesc}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Right Canvas: Pure Waveforms with zero text interference */}
        <div ref={containerRef} className="flex-1 relative overflow-hidden h-[180px]">
          <canvas ref={canvasRef} className="block w-full h-[180px]" />
        </div>
      </div>

      {/* Motor Imagery Controls */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[11px] text-slate-300 font-mono flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulate Motor Intention:</span>
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSimulatedState("Rest")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                simulatedState === "Rest"
                  ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Rest Baseline
            </button>
            <button
              onClick={() => setSimulatedState("Left Hand MI")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                simulatedState === "Left Hand MI"
                  ? "bg-purple-500/25 text-purple-300 border border-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.3)] font-semibold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Left Hand (C4 ERD)
            </button>
            <button
              onClick={() => setSimulatedState("Right Hand MI")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                simulatedState === "Right Hand MI"
                  ? "bg-sky-500/25 text-sky-300 border border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.3)] font-semibold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Right Hand (C3 ERD)
            </button>
          </div>
        </div>

        {/* Biofeedback Telemetry Context Banner */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between gap-2">
          <span className="text-slate-300 font-semibold truncate">
            {simulatedState === "Rest" && "Active State: Symmetrical bilateral baseline Mu (8-12 Hz) oscillations."}
            {simulatedState === "Left Hand MI" && "Contralateral Motor Cortex ERD: Right hemisphere C4 Mu power attenuated by ~68%."}
            {simulatedState === "Right Hand MI" && "Contralateral Motor Cortex ERD: Left hemisphere C3 Mu power attenuated by ~68%."}
          </span>
          <span className="text-cyan-400 font-bold shrink-0">
            {simulatedState === "Rest" ? "250 Hz Live" : "Intent Decoded"}
          </span>
        </div>
      </div>
    </div>
  );
}
