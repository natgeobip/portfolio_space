const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Arrow = () => (
  <svg {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Building = () => (
  <svg {...base}><path d="M4 21V4l10-2v19M14 8h6v13M8 8h2M8 12h2M8 16h2M3 21h18" /></svg>
)
export const Challenge = () => (
  <svg {...base}><path d="M12 3 2 20h20L12 3zM12 10v5M12 18h.01" /></svg>
)
export const Analyzed = () => (
  <svg {...base}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></svg>
)
export const Approach = () => (
  <svg {...base}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg>
)

export const storyIcons = { challenge: Challenge, analyzed: Analyzed, approach: Approach }
