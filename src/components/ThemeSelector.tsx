import { useState, useRef, useEffect } from "react";
import { Palette, Check, ChevronDown, RotateCcw } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeSelectorProps {
  variant?: "dropdown" | "compact" | "segmented";
  className?: string;
}

export function ThemeSelector({ variant = "dropdown", className = "" }: ThemeSelectorProps) {
  const { theme, setTheme, activeTheme, allThemes, resetToDefault } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Segmented Variant (for drawer)
  if (variant === "segmented") {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-300">
            <Palette className="w-3.5 h-3.5" style={{ color: activeTheme.lightHex }} />
            <span>Accent Theme</span>
          </span>
          {theme !== "cyan" && (
            <button
              onClick={resetToDefault}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          {allThemes.map((t) => {
            const isSelected = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-800/90 shadow-md border border-slate-700"
                    : "hover:bg-slate-900/60 text-slate-400 hover:text-slate-200"
                }`}
                title={`${t.label} — ${t.tagline}`}
                aria-label={`Select ${t.name} theme`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full transition-transform"
                  style={{
                    backgroundColor: t.hex,
                    boxShadow: isSelected ? `0 0 10px ${t.glow}` : "none",
                    transform: isSelected ? "scale(1.15)" : "scale(1)",
                  }}
                />
                <span
                  className={`text-[10px] font-mono mt-1 font-semibold truncate ${
                    isSelected ? "text-white" : "text-slate-400"
                  }`}
                >
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact circular button variant (for floating dock)
  if (variant === "compact") {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/95 border border-slate-700/80 hover:border-slate-500 text-slate-300 hover:text-white transition-all shadow-xl backdrop-blur-md cursor-pointer"
          title={`Accent Theme: ${activeTheme.label}`}
          aria-label="Toggle Theme Selector"
          aria-expanded={isOpen}
        >
          <span
            className="w-3 h-3 rounded-full transition-all"
            style={{
              backgroundColor: activeTheme.hex,
              boxShadow: `0 0 8px ${activeTheme.glow}`,
            }}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 bottom-full mb-2 w-60 p-2 rounded-2xl bg-[#080d1a]/98 backdrop-blur-xl border border-slate-700 shadow-2xl z-50 animate-fadeIn">
            <div className="px-2.5 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" style={{ color: activeTheme.lightHex }} />
                <span>Color Palette</span>
              </span>
              {theme !== "cyan" && (
                <button
                  onClick={resetToDefault}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  title="Reset to default Cyber Cyan"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Default</span>
                </button>
              )}
            </div>
            <div className="space-y-1">
              {allThemes.map((t) => {
                const isSelected = t.id === theme;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-800/90 text-white font-semibold"
                        : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: t.hex,
                          boxShadow: isSelected ? `0 0 8px ${t.glow}` : "none",
                        }}
                      />
                      <span className="font-medium text-slate-200">{t.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: t.lightHex }} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default dropdown variant (for desktop navbar)
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-full text-xs font-mono font-medium border border-slate-700/80 bg-slate-900/90 hover:border-slate-500 text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
        title="Choose accent palette"
        aria-label="Select accent theme"
        aria-expanded={isOpen}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
          style={{
            backgroundColor: activeTheme.hex,
            boxShadow: `0 0 6px ${activeTheme.glow}`,
          }}
        />
        <span className="hidden md:inline text-[11px] font-medium text-slate-300">Theme</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl bg-[#080d1a]/98 backdrop-blur-xl border border-slate-700 shadow-2xl z-50 animate-fadeIn">
          <div className="px-2.5 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" style={{ color: activeTheme.lightHex }} />
              <span>Color Themes</span>
            </span>
            {theme !== "cyan" && (
              <button
                onClick={() => {
                  resetToDefault();
                  setIsOpen(false);
                }}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                title="Reset to default Cyber Cyan"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset Default</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            {allThemes.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-800/90 border border-slate-700 shadow-sm"
                      : "hover:bg-slate-900/80 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{
                        backgroundColor: t.hex,
                        boxShadow: isSelected ? `0 0 8px ${t.glow}` : "none",
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                        <span>{t.label}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {t.tagline}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 shrink-0 ml-1.5" style={{ color: t.lightHex }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
