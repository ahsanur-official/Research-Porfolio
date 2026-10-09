import { Clock } from "lucide-react";

interface ReadingTimeBadgeProps {
  /**
   * Reading time display, e.g. "2 min", "3 min", "1.5 min" or numeric minutes like 2
   */
  time: string | number;
  /**
   * Optional approximate word count to show on hover/tooltip or desktop
   */
  wordCount?: number;
  /**
   * Additional custom classes
   */
  className?: string;
}

export function ReadingTimeBadge({
  time,
  wordCount,
  className = ""
}: ReadingTimeBadgeProps) {
  const formattedTime =
    typeof time === "number"
      ? `~${time} min read`
      : time.toLowerCase().includes("read")
      ? time
      : `~${time} read`;

  const tooltipText = `Estimated reading time: ${formattedTime}${
    wordCount ? ` (${wordCount.toLocaleString()} words)` : ""
  }`;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/70 hover:border-cyan-500/50 text-slate-300 font-mono text-[11px] tracking-wide transition-colors duration-200 select-none shadow-sm ${className}`}
      title={tooltipText}
      aria-label={tooltipText}
    >
      <Clock className="w-3 h-3 text-cyan-400 shrink-0" aria-hidden="true" />
      <span className="font-medium text-slate-300">{formattedTime}</span>
      {wordCount && (
        <span className="text-slate-500 text-[10px] hidden md:inline">
          · {wordCount} words
        </span>
      )}
    </span>
  );
}
