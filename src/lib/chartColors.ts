// Recharts needs raw hex values (CSS variables don't reach SVG props reliably).
// Keep in sync with the tokens in app/globals.css.
export const chart = {
  left: "#3b82f6",
  right: "#93c5fd",
  grid: "#ecece7",
  axis: "#8a918e",
  radarCurrent: "#3b82f6",
  radarPrevious: "#9ca3af",
  target: "#2f8f5b", // target-range bands (same green as --color-good)
  tremor: "#e0a526", // same gold as --color-gold
  lean: "#6b7370", // same grey as --color-muted
};
