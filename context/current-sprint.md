# Current Sprint

## Goal
Code quality, UX polish, and student experience — dark mode, responsive layout, component architecture, testing, performance.

## Status
- [x] Initial repo created from audited branch
- [x] CLAUDE.md written
- [x] CI/CD pipeline configured
- [x] Refactor skill created
- [x] Context directory structure set up
- [x] Skills auto-triggering configured in CLAUDE.md
- [x] Unused starter assets removed (react.svg, vite.svg)
- [x] Vitest configured with 21 tests for circuitSolver
- [x] Shared types extracted (CircuitType, DampingType, classifyDamping)
- [x] Code-split routes with React.lazy (566 KB main bundle, down from 1,059 KB)
- [x] eslint-plugin-jsx-a11y added and accessibility issue fixed
- [x] Zustand progress store with localStorage persistence
- [x] Sidebar progress bar and visited-module indicators
- [x] Dark mode support with theme store and class-based toggling
- [x] Tailwind v4 migration — deleted tailwind.config.js, use CSS @theme
- [x] Global CSS cleanup — removed conflicting h1-h4/p styles
- [x] Responsive/mobile layout — collapsible sidebar, hamburger menu, mobile overlay
- [x] Shared CircuitParameterSliders component (replaces duplicated sliders)
- [x] useDeferredValue for chart debounce on slider drag
- [x] Component extraction — InteractiveLab/CircuitDiagram.tsx, subdirectory structure
- [x] componentMath test coverage (16 tests)
- [x] SessionStart hook (.claude/hooks.json)

## Next
- Component-level tests (React Testing Library)
- Further decomposition of large components (TimeDomain, ComponentPhysics)
- PWA offline improvements
- AI Tutor dark mode styling
