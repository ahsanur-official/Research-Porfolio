import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function ScrollProgressBar() {
  const { activeTheme } = useTheme();
  const barRef = useRef<HTMLDivElement | null>(null);
  const beadRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollY / scrollHeight)) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      if (beadRef.current) {
        beadRef.current.style.transform = `translate3d(${progress * 100}%, -50%, 0)`;
        beadRef.current.style.opacity = progress > 0.005 ? "1" : "0";
      }

      if (progress > 0.005 && !hasScrolled) {
        setHasScrolled(true);
      } else if (progress <= 0.005 && hasScrolled) {
        setHasScrolled(false);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hasScrolled]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px] bg-slate-900/40 backdrop-blur-[1px]"
      aria-hidden="true"
    >
      {/* Hardware-accelerated GPU scaleX progress fill */}
      <div
        ref={barRef}
        className="h-full w-full origin-left will-change-transform"
        style={{
          transform: "scaleX(0)",
          background: activeTheme.gradientCss,
          boxShadow: `0 0 12px ${activeTheme.glow}, 0 0 4px ${activeTheme.hex}`,
        }}
      />

      {/* Leading edge luminous pulse bead */}
      <div
        ref={beadRef}
        className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-white will-change-transform transition-opacity duration-150"
        style={{
          transform: "translate3d(0, -50%, 0)",
          opacity: 0,
          boxShadow: `0 0 8px #ffffff, 0 0 14px ${activeTheme.hex}`,
        }}
      />
    </div>
  );
}
