import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function CustomCursor() {
  const { activeTheme } = useTheme();
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
