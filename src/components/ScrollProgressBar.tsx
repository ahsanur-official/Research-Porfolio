import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function ScrollProgressBar() {
  const { activeTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px] bg-slate-900/40 backdrop-blur-[1px]"
      aria-hidden="true"
    >
      <div
        className="h-full transition-[width] duration-75 ease-out relative"
        style={{
          width: `${scrollProgress}%`,
          background: activeTheme.gradientCss,
          boxShadow: `0 0 12px ${activeTheme.glow}, 0 0 4px ${activeTheme.hex}`,
        }}
      >
        {/* Leading edge luminous pulse bead */}
        {scrollProgress > 0 && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
            style={{
              boxShadow: `0 0 8px #ffffff, 0 0 14px ${activeTheme.hex}`,
            }}
          />
        )}
      </div>
    </div>
  );
}
