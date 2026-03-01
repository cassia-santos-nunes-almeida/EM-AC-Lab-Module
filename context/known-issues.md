# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **Large monolithic components** — `ComponentPhysics.tsx` (~760 lines), `InteractiveLab.tsx` (~680 lines), `TimeDomain.tsx` (~635 lines). Inline SVG and deeply nested JSX. Should be decomposed into sub-components.

2. **Duplicated slider patterns** — R/L/C slider markup is repeated between `SDomainAnalysis.tsx` and `InteractiveLab.tsx`. Needs shared `CircuitParameterSliders` component.

3. **Duplicated `CircuitType` definition** — `type CircuitType = 'RC' | 'RL' | 'RLC'` declared in both `circuitSolver.ts` and `TimeDomain.tsx`. Should be single source.

4. **Inconsistent damping-type tolerance** — `circuitSolver.ts` uses `0.01`, `SDomainAnalysis.tsx` uses `0.05`. Should use a single threshold constant.

## Testing

5. **No test framework** — Zero tests. No Vitest/Jest configured. Math-heavy utils (`circuitSolver.ts`, `componentMath.ts`) are prime candidates for unit tests.

## Styling

6. **No responsive/mobile layout** — Sidebar is fixed 256px. No mobile menu or breakpoints.

7. **No dark mode** — Custom palette exists but no theme switching.

8. **Global heading styles conflict** — `index.css` hardcodes `h1-h4` and `p` styles that can override Tailwind utilities.

9. **Tailwind v4 with v3-style config** — Mixed configuration approach. `tailwind.config.js` may be partially redundant.

## Performance

10. **Bundle size** — Main JS chunk is ~1,059 KB. Should code-split with dynamic imports.

11. **Chart re-renders on slider drag** — Full recalculation on each slider change. Could benefit from debouncing during drag.

## Security

12. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.

