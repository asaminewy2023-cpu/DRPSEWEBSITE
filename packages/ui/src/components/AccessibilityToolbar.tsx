"use client";

import { useState } from "react";
import { useAccessibility } from "../lib/AccessibilityContext";

export function AccessibilityToolbar() {
  const { fontScale, highContrast, increaseFont, decreaseFont, resetFont, toggleHighContrast } =
    useAccessibility();
  const [open, setOpen] = useState(true);

  return (
    <div
      className="fixed right-4 top-24 z-[60] flex flex-col items-end gap-2"
      role="toolbar"
      aria-label="Accessibility options"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-expanded={open}
        aria-controls="accessibility-panel"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h.01M15 9h.01M9 15c.75.75 2.25 1.5 3 1.5s2.25-.75 3-1.5m4.5-4.5A8.25 8.25 0 1112 3.75 8.25 8.25 0 0118 12z" />
        </svg>
        <span>Accessibility</span>
      </button>

      {open && (
        <div
          id="accessibility-panel"
          className="w-56 rounded-xl border border-border bg-white p-3 shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-foreground">Text Size</span>
            <span className="text-xs text-muted-foreground">{fontScale}%</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={decreaseFont}
              disabled={fontScale <= 90}
              className="rounded-lg border border-border px-2 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Decrease text size"
            >
              A−
            </button>
            <button
              onClick={resetFont}
              className="rounded-lg border border-border px-2 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Reset text size to 100 percent"
            >
              A
            </button>
            <button
              onClick={increaseFont}
              disabled={fontScale >= 130}
              className="rounded-lg border border-border px-2 py-1.5 text-sm font-bold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          <button
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            className={`mt-2 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              highContrast
                ? "border-primary bg-primary text-white"
                : "border-border text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18A8.25 8.25 0 003.75 12 8.25 8.25 0 0012 21m0-18a8.25 8.25 0 018.25 8.25A8.25 8.25 0 0112 21" />
              </svg>
              High Contrast
            </span>
            <span className={`relative h-4 w-7 rounded-full transition-colors ${highContrast ? "bg-white/40" : "bg-muted-foreground/30"}`}>
              <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${highContrast ? "left-3.5" : "left-0.5"}`} />
            </span>
          </button>

          <button
            onClick={() => setOpen(false)}
            className="mt-2 w-full rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
