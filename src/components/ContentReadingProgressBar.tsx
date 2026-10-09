import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { BookOpen } from "lucide-react";

interface ContentReadingProgressBarProps {
  /**
   * Optional container ID to monitor. Defaults to "main-content-sections"
   */
  containerId?: string;
  /**
   * Whether to display a compact section status pill in the bar
   */
  showBadge?: boolean;
}

export function ContentReadingProgressBar({
  containerId = "main-content-sections",
  showBadge = true,
}: ContentReadingProgressBarProps) {
  const { activeTheme } = useTheme();
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = document.getElementById(containerId);
          if (!container) {
            ticking = false;
            return;
          }

          const rect = container.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const headerEl = document.querySelector("header");
          const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 56;

          // When top of content hits near the navbar bottom
          const triggerOffset = headerHeight + 40;
          const contentTop = rect.top - triggerOffset;
          const contentHeight = rect.height;
          const scrollDistance = contentHeight - (windowHeight - triggerOffset);

          if (contentTop > 0) {
            // Still in Hero section above main content
            setReadingProgress(0);
            setIsVisible(false);
            setActiveSection("");
          } else if (scrollDistance <= 0 || rect.bottom <= windowHeight * 0.8) {
            // Reached the end of the content
            setReadingProgress(100);
            setIsVisible(true);
          } else {
            const scrolledAmount = -contentTop;
            const currentProgress = Math.min(
              100,
              Math.max(0, (scrolledAmount / scrollDistance) * 100)
            );
            setReadingProgress(currentProgress);
            setIsVisible(currentProgress > 0);

            // Determine active section currently being read
            const sections = container.querySelectorAll("section[id]");
            let currentTitle = "";
            sections.forEach((sec) => {
              const secRect = sec.getBoundingClientRect();
              if (
                secRect.top <= windowHeight * 0.45 &&
                secRect.bottom >= headerHeight
              ) {
                const heading = sec.querySelector("h2");
                if (heading && heading.textContent) {
                  currentTitle = heading.textContent.trim();
                }
              }
            });
            setActiveSection(currentTitle);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerId]);

  return (
    <div
      className={`absolute -bottom-[2px] left-0 right-0 h-[2px] transition-opacity duration-300 pointer-events-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      role="progressbar"
      aria-valuenow={Math.round(readingProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Main content reading progress"
      title={`Content Reading Progress: ${Math.round(readingProgress)}%${
        activeSection ? ` · ${activeSection}` : ""
      }`}
    >
      {/* Background track line */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />

      {/* Dynamic progress bar fill */}
      <div
        className="h-full transition-[width] duration-75 ease-out relative"
        style={{
          width: `${readingProgress}%`,
          background: activeTheme.gradientCss,
          boxShadow: `0 0 10px ${activeTheme.glow}, 0 0 3px ${activeTheme.hex}`,
        }}
      >
        {/* Leading edge luminous pulse bead */}
        {readingProgress > 0 && readingProgress < 100 && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
            style={{
              boxShadow: `0 0 6px #ffffff, 0 0 12px ${activeTheme.hex}`,
            }}
          />
        )}
      </div>

      {/* Floating Section Status Badge on desktop when reading */}
      {showBadge && isVisible && readingProgress > 2 && (
        <div
          className="absolute right-4 top-1.5 hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-300 shadow-lg pointer-events-auto select-none transition-all duration-200"
          style={{
            borderColor: `${activeTheme.hex}40`,
          }}
        >
          <BookOpen
            className="w-3 h-3 shrink-0"
            style={{ color: activeTheme.hex }}
          />
          <span className="text-slate-400">
            {activeSection ? `${activeSection} · ` : "Reading · "}
          </span>
          <span
            className="font-bold"
            style={{ color: activeTheme.hex }}
          >
            {Math.round(readingProgress)}%
          </span>
        </div>
      )}
    </div>
  );
}
