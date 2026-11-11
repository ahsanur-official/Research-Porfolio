import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function CustomCursor() {
  const { activeTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  // High-frequency coordinates tracked via refs for pure 120fps compositor updates
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

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
    window.addEventListener("resize", checkTouch, { passive: true });

    if (isTouchDevice) {
      return () => window.removeEventListener("resize", checkTouch);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    // Use event delegation on pointerover/pointerout for lightweight hover detection (no target.closest on every subpixel tick)
    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "SELECT" ||
        target.tagName === "SUMMARY" ||
        target.closest("button, a, nav, [role='button'], [role='tab'], .interactive-card, .cursor-pointer")
      );
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    // 120fps hardware-accelerated render loop bypassing React re-renders
    let lastTime = performance.now();
    const renderLoop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Frame-rate independent lerp factor targeting silky response across 60Hz/120Hz/144Hz displays
      const lerpFactor = 1 - Math.exp(-22 * dt);
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * lerpFactor;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* Precision Core Dot - directly manipulated via GPU translate3d */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClicking
              ? "w-1.5 h-1.5 scale-75"
              : isHovering
              ? "w-2.5 h-2.5"
              : "w-2 h-2"
          }`}
          style={{
            backgroundColor: isClicking ? activeTheme.lighterHex : isHovering ? activeTheme.lightHex : activeTheme.hex,
            boxShadow: `0 0 ${isClicking ? "14px" : isHovering ? "12px" : "8px"} ${activeTheme.glow}`,
          }}
        />
      </div>

      {/* Outer Atmospheric Aura Ring - frame-independent lerp */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          transform: `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            isClicking
              ? "w-8 h-8 scale-90"
              : isHovering
              ? "w-11 h-11 scale-110"
              : "w-7 h-7 scale-100"
          }`}
          style={{
            borderColor: isClicking ? activeTheme.lightHex : isHovering ? activeTheme.hex : activeTheme.border,
            backgroundColor: isClicking ? activeTheme.bgAlpha : isHovering ? activeTheme.bgAlpha : "transparent",
            boxShadow: `0 0 ${isClicking ? "20px" : isHovering ? "25px" : "10px"} ${activeTheme.glow}`,
          }}
        />
      </div>
    </div>
  );
}
