/**
 * Kinetic Forge — Web Theme Object
 *
 * Mirrors the CSS custom properties defined in index.css @theme block.
 * Use `theme.colors.*` in JS/TS logic that needs color references (e.g. inline styles, dynamic values).
 * Use `theme.hex.*` for libraries that require actual hex strings (e.g. recharts).
 *
 * CSS variable names come from @theme in index.css:
 *   --color-navy     → theme.colors.navy
 *   --color-green    → theme.colors.green
 *   --color-ghost    → theme.colors.ghostGray
 *   --color-stroke   → theme.colors.border
 *   --color-primary  → theme.colors.textPrimary
 *   --color-secondary → theme.colors.textSecondary
 */
export const theme = {
  colors: {
    navy:          "var(--color-navy)",
    green:         "var(--color-green)",
    greenHover:    "var(--color-green-hover)",
    ghostGray:     "var(--color-ghost)",
    border:        "var(--color-stroke)",
    textPrimary:   "var(--color-primary)",
    textSecondary: "var(--color-secondary)",
    success:       "var(--color-success)",
    warning:       "var(--color-warning)",
    error:         "var(--color-error)",
  },
  // Raw hex values for libraries like recharts that require actual hex strings.
  // Keep in sync with @theme values in index.css.
  hex: {
    navy:          "#0f172a",
    green:         "#22c55e",
    greenHover:    "#16a34a",
    ghostGray:     "#f7f9fb",
    border:        "#e2e8f0",
    textPrimary:   "#1e293b",
    textSecondary: "#64748b",
    success:       "#22c55e",
    warning:       "#f59e0b",
    error:         "#ef4444",
  },
} as const;
