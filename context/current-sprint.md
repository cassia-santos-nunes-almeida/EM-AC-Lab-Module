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

- [x] AI Tutor dark mode styling
- [x] Dark mode for Tabs, Overview, chart tooltips, DurationControl, page loader
- [x] Mobile AI Tutor access (floating action button)
- [x] Scroll-to-top on route navigation
- [x] CollapsibleSection shared component (progressive disclosure pattern)
- [x] ChallengeCard component with auto-check and hints
- [x] ConceptCheck component (multiple-choice + predict-reveal modes)
- [x] SDomainPanel with transfer function, pole-zero map, damping indicator
- [x] InteractiveLab: S-Domain toggle, guided challenges (4), concept check, collapsible sections
- [x] SDomainAnalysis simplified to theory-only (2 tabs: Theory + Damping & Takeaways)
- [x] TimeDomain: collapsible sections + concept checks for RC/RL/RLC
- [x] ComponentPhysics: collapsible material sections
- [x] ComponentPhysics dark mode fix (61 locations)
- [x] Sidebar + Overview labels updated
- [x] LaplaceTheory full dark mode (was missing all dark: variants)
- [x] LaplaceTheory concept checks (multiple-choice + predict-reveal) and collapsible worked examples
- [x] ModuleNavigation component (Previous/Next links on all 6 pages)
- [x] CircuitDiagram SVG dark mode (CSS custom properties for wire/text colors)
- [x] S-Domain Theory: prominent CTA card linking to Interactive Lab
- [x] Interactive Lab onboarding banner + challenge progress counter
- [x] Component-level tests — 28 new React Testing Library tests for ConceptCheck, CollapsibleSection, Tabs, ChallengeCard, ModuleNavigation (65 total)
- [x] ComponentPhysics decomposed into sub-components (770 → ~107 lines in index.tsx)
- [x] TimeDomain decomposed into sub-components (665 → ~430 lines in index.tsx)
- [x] PWA offline detection — global banner in Layout, AiTutor offline guard + banner (useSyncExternalStore)
- [x] Scroll-to-section — TableOfContents component with pill-style jump links on Circuit Analysis page
- [x] Shared `useOnlineStatus` hook extracted from duplicated code in AiTutor + Layout
- [x] Vendor chunk splitting — manualChunks for react, recharts, katex, gemini (eliminated 500KB+ warning)
- [x] Comprehensive accessibility audit — ARIA tab pattern, roving tabIndex, aria-live regions, skip-to-content, role="dialog", role="progressbar", role="region", role="group"
- [x] Page-level integration tests — 13 tests for ComponentPhysics, TimeDomain, SDomainAnalysis (78 total tests)

## Next
- SDomainAnalysis / LaplaceTheory / Overview page decomposition (if files grow)
- Additional TOC on ComponentPhysics page (currently tab-based, may not need it)
- Consider keyboard shortcut hints in AiTutor
