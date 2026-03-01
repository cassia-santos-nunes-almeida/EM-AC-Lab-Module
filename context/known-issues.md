# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **Large monolithic components** — `ComponentPhysics.tsx` (~760 lines), `InteractiveLab.tsx` (~680 lines), `TimeDomain.tsx` (~635 lines). Inline SVG and deeply nested JSX. Should be decomposed into sub-components.

2. **Duplicated slider patterns** — R/L/C slider markup is repeated between `SDomainAnalysis.tsx` and `InteractiveLab.tsx`. Needs shared `CircuitParameterSliders` component.

## Styling

3. **No responsive/mobile layout** — Sidebar is fixed 256px. No mobile menu or breakpoints.

4. **No dark mode** — Custom palette exists but no theme switching.

5. **Global heading styles conflict** — `index.css` hardcodes `h1-h4` and `p` styles that can override Tailwind utilities.

6. **Tailwind v4 with v3-style config** — Mixed configuration approach. `tailwind.config.js` may be partially redundant.

## Performance

7. **Chart re-renders on slider drag** — Full recalculation on each slider change. Could benefit from debouncing during drag.

## Security

8. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.
