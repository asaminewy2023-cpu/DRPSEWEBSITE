"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const MIN_SCALE = 90;
const MAX_SCALE = 130;
const STEP = 10;
const DEFAULT_SCALE = 100;

type AccessibilityContextType = {
  fontScale: number;
  highContrast: boolean;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
  toggleHighContrast: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScale] = useState(DEFAULT_SCALE);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedScale = Number(localStorage.getItem("fontScale")) || DEFAULT_SCALE;
    const savedContrast = localStorage.getItem("highContrast") === "true";
    setFontScale(savedScale);
    setHighContrast(savedContrast);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
    localStorage.setItem("fontScale", String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("highContrast", String(highContrast));
  }, [highContrast]);

  const increaseFont = useCallback(() => {
    setFontScale((s) => Math.min(s + STEP, MAX_SCALE));
  }, []);

  const decreaseFont = useCallback(() => {
    setFontScale((s) => Math.max(s - STEP, MIN_SCALE));
  }, []);

  const resetFont = useCallback(() => {
    setFontScale(DEFAULT_SCALE);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((v) => !v);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        highContrast,
        increaseFont,
        decreaseFont,
        resetFont,
        toggleHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
}
