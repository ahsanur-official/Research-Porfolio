import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export type ThemeId = "cyan" | "titanium" | "emerald" | "indigo" | "bronze";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  label: string;
  tagline: string;
  hex: string;
  lightHex: string;
  lighterHex: string;
  darkHex: string;
  glow: string;
  border: string;
  bgAlpha: string;
  swatchClass: string;
  ringClass: string;
  badgeBg: string;
  badgeText: string;
  gradientCss: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  cyan: {
    id: "cyan",
    name: "Cyan",
    label: "Neural Cyan (Default)",
    tagline: "Signature neural interface & cybernetic glass",
    hex: "#06b6d4",
    lightHex: "#22d3ee",
    lighterHex: "#67e8f9",
    darkHex: "#0e7490",
    glow: "rgba(6, 182, 212, 0.4)",
    border: "rgba(6, 182, 212, 0.35)",
    bgAlpha: "rgba(6, 182, 212, 0.1)",
    swatchClass: "bg-cyan-400",
    ringClass: "ring-cyan-400 border-cyan-400",
    badgeBg: "bg-cyan-950/80",
    badgeText: "text-cyan-300",
    gradientCss: "linear-gradient(90deg, #06b6d4 0%, #22d3ee 35%, #38bdf8 65%, #818cf8 100%)",
  },
  titanium: {
    id: "titanium",
    name: "Titanium",
    label: "Minimalist Titanium",
    tagline: "Sleek monochrome silver & Apple-grade restraint",
    hex: "#e2e8f0",
    lightHex: "#f8fafc",
    lighterHex: "#ffffff",
    darkHex: "#64748b",
    glow: "rgba(248, 250, 252, 0.25)",
    border: "rgba(226, 232, 240, 0.3)",
    bgAlpha: "rgba(248, 250, 252, 0.08)",
    swatchClass: "bg-slate-200",
    ringClass: "ring-slate-200 border-slate-300",
    badgeBg: "bg-slate-900/90",
    badgeText: "text-slate-100",
    gradientCss: "linear-gradient(90deg, #64748b 0%, #cbd5e1 40%, #f8fafc 80%, #ffffff 100%)",
  },
  emerald: {
    id: "emerald",
    name: "Sage",
    label: "Nordic Sage",
    tagline: "Muted biosignal green & clinical neuroengineering",
    hex: "#10b981",
    lightHex: "#34d399",
    lighterHex: "#6ee7b7",
    darkHex: "#047857",
    glow: "rgba(16, 185, 129, 0.35)",
    border: "rgba(16, 185, 129, 0.35)",
    bgAlpha: "rgba(16, 185, 129, 0.1)",
    swatchClass: "bg-emerald-400",
    ringClass: "ring-emerald-400 border-emerald-400",
    badgeBg: "bg-emerald-950/80",
    badgeText: "text-emerald-300",
    gradientCss: "linear-gradient(90deg, #059669 0%, #10b981 35%, #34d399 70%, #14b8a6 100%)",
  },
  indigo: {
    id: "indigo",
    name: "Indigo",
    label: "Oxford Indigo",
    tagline: "Academic deep royal blue & mathematical rigour",
    hex: "#6366f1",
    lightHex: "#818cf8",
    lighterHex: "#a5b4fc",
    darkHex: "#4338ca",
    glow: "rgba(99, 102, 241, 0.35)",
    border: "rgba(99, 102, 241, 0.35)",
    bgAlpha: "rgba(99, 102, 241, 0.1)",
    swatchClass: "bg-indigo-400",
    ringClass: "ring-indigo-400 border-indigo-400",
    badgeBg: "bg-indigo-950/80",
    badgeText: "text-indigo-300",
    gradientCss: "linear-gradient(90deg, #4f46e5 0%, #6366f1 35%, #818cf8 70%, #a5b4fc 100%)",
  },
  bronze: {
    id: "bronze",
    name: "Bronze",
    label: "Warm Bronze",
    tagline: "Subtle champagne brass & Mars expedition warmth",
    hex: "#f59e0b",
    lightHex: "#fbbf24",
    lighterHex: "#fde68a",
    darkHex: "#b45309",
    glow: "rgba(245, 158, 11, 0.35)",
    border: "rgba(245, 158, 11, 0.35)",
    bgAlpha: "rgba(245, 158, 11, 0.1)",
    swatchClass: "bg-amber-400",
    ringClass: "ring-amber-400 border-amber-400",
    badgeBg: "bg-amber-950/80",
    badgeText: "text-amber-300",
    gradientCss: "linear-gradient(90deg, #d97706 0%, #f59e0b 35%, #fbbf24 70%, #fde68a 100%)",
  },
};

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  activeTheme: ThemeConfig;
  allThemes: ThemeConfig[];
  resetToDefault: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ahsanur_accent_theme");
      if (saved && saved in THEMES) {
        return saved as ThemeId;
      }
    }
    return "cyan";
  });

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ahsanur_accent_theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      } catch (e) {
        console.error("Failed to save theme:", e);
      }
    }
  };

  const resetToDefault = () => {
    setTheme("cyan");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const activeTheme = useMemo(() => THEMES[theme] || THEMES.cyan, [theme]);
  const allThemes = useMemo(() => Object.values(THEMES), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeTheme, allThemes, resetToDefault }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
