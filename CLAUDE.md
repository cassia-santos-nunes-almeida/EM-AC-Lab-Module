# EM&AC Lab — Module 2: Circuit Analysis

Interactive learning platform for electromagnetics and analog circuit analysis. React 19 + TypeScript app built with Vite. Installable as a PWA with offline support.

## Build & Dev

- `npm run dev` / `npm start` — Start Vite dev server (localhost:5173)
- `npm run build` — TypeScript check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint (includes jsx-a11y accessibility checks)
- `npm run preview` — Preview production build locally
- `npm test` — Run Vitest test suite
- `npm run test:watch` — Run Vitest in watch mode

## Architecture

- `src/types/circuit.ts` — Shared type definitions (CircuitType, DampingType, classifyDamping). Single source of truth.
- `src/store/progressStore.ts` — Zustand stores for progress tracking and theme (persisted to localStorage)
- `src/components/modules/` — Page-level components, lazy-loaded via React.lazy for code-splitting. Large modules use subdirectory structure (e.g., `InteractiveLab/index.tsx` + `InteractiveLab/CircuitDiagram.tsx`).
- `src/components/layout/` — Layout (responsive with mobile sidebar), Sidebar (with progress tracking + dark mode toggle), ErrorBoundary
- `src/components/common/` — Shared components (AiTutor, CircuitCharts, CircuitParameterSliders, MathWrapper, Tabs)
- `src/utils/` — Math/physics calculations (componentMath.ts, circuitSolver.ts), utility helpers (cn.ts)
- `src/App.tsx` — Main app with React Router + Suspense code-splitting
- `src/main.tsx` — Entry point

## Conventions

- React functional components with TypeScript
- Tailwind CSS for styling (via `cn()` utility from `src/utils/cn.ts`)
- KaTeX for math rendering (wrapped by `MathWrapper` component)
- Recharts for data visualization / circuit plots
- Lucide React for icons
- React Router for navigation
- vite-plugin-pwa for service worker generation and offline caching (auto-update strategy)
- Optional Google Generative AI integration for AI tutor (API key in localStorage only)

## Current Sprint

See `context/current-sprint.md` for detailed status.
Goal: Code quality, UX polish, and student experience — dark mode, responsive layout, component architecture, testing, performance.

## Skills

When refactoring code → read `skills/refactor/SKILL.md` first.
When building or improving frontend UI/UX → read `skills/frontend-design/SKILL.md` first.

## Context Files

- `context/current-sprint.md` — What's being built right now
- `context/decisions.md` — Architecture decision log
- `context/known-issues.md` — Active bugs and technical debt

## Do Not Touch

- `.github/workflows/deploy.yml` — CI/CD pipeline, change only with explicit intent
- `src/utils/circuitSolver.ts` — Core math engine, requires careful review and testing before any modification

## Deployment

Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`. The CI pipeline runs lint, type-check, and build before deploying. A `404.html` fallback is generated for SPA client-side routing. Uses `actions/deploy-pages` (requires Pages source set to "GitHub Actions" in repo settings).
