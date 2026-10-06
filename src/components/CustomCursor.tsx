import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices with fine pointer
    const checkTouch = () => {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) {
      return () => window.removeEventListener("resize", checkTouch);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "SELECT" ||
          target.tagName === "SUMMARY" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest("nav") ||
          target.closest("aside") ||
          target.closest(".interactive-card") ||
          target.closest("[role='button']") ||
          target.closest("[role='tab']") ||
          target.closest("[role='menuitem']") ||
          target.closest("[role='link']") ||
          target.classList.contains("cursor-pointer")
        );
        setIsHovering(isInteractive);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, isTouchDevice]);

  // Smooth trailing cursor animation loop
  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId: number;
    const animateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.25,
        y: prev.y + (position.y - prev.y) * 0.25,
      }));
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animationFrameId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="hidden lg:block">
      {/* Precision Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? "w-1.5 h-1.5 bg-cyan-200 scale-75 shadow-[0_0_14px_rgba(34,211,238,1)]"
              : isHovering
              ? "w-2.5 h-2.5 bg-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.95)]"
              : "w-2 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          }`}
        />
      </div>

      {/* Outer Atmospheric Aura Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            isClicking
              ? "w-8 h-8 border-cyan-300/90 bg-cyan-400/20 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-90"
              : isHovering
              ? "w-11 h-11 border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-110"
              : "w-7 h-7 border-cyan-500/30 bg-cyan-500/5 shadow-[0_0_10px_rgba(6,182,212,0.15)] scale-100"
          }`}
        />
      </div>
    </div>
  );
}
