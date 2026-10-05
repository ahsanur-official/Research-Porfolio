import { useEffect, useState } from "react";

export function ScrollProgressBar() {
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
          background: `linear-gradient(90deg, 
            #06b6d4 0%, 
            #22d3ee 30%, 
            #38bdf8 60%, 
            #818cf8 85%, 
            #c084fc 100%
          )`,
          boxShadow: `0 0 12px rgba(6, 182, 212, 0.85), 0 0 4px rgba(34, 211, 238, 0.95)`,
        }}
      >
        {/* Leading edge luminous pulse bead */}
        {scrollProgress > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1),0_0_14px_rgba(6,182,212,1)]" />
        )}
      </div>
    </div>
  );
}
