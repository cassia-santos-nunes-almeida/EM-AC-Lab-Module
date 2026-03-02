# Architecture Decisions

Chronological log of key decisions. Newest at top.

---

### 2026-03-02 — Module navigation component
**Decision**: Create a shared `ModuleNavigation` component with Previous/Next links, embedded at the bottom of every module page.
**Reason**: Students had to use the sidebar for all navigation, breaking flow. Sequential links at the bottom of content guide linear learners through the intended path.

### 2026-03-02 — CircuitDiagram dark mode via CSS custom properties
**Decision**: Use CSS custom properties (`--circuit-wire`, `--circuit-text`) with Tailwind's `dark:` class on the SVG root, instead of hardcoded hex colors.
**Reason**: SVG stroke/fill attributes don't support Tailwind's `dark:` prefix directly. CSS custom properties are the lightest-weight approach — no JS theme detection needed, no `useThemeStore` import, and the variables are scoped to the SVG element.

### 2026-03-02 — Progressive disclosure with CollapsibleSection
**Decision**: Create a shared `CollapsibleSection` component and use it throughout modules for secondary content (material properties, experiment tips, method comparisons).
**Reason**: Long pages overwhelm students. Collapsible sections let students focus on primary content first and expand details on demand. Reduces initial cognitive load while keeping all content accessible.

### 2026-03-02 — Guided challenges in InteractiveLab
**Decision**: Add `ChallengeCard` component with auto-check functions and 4 guided challenges (find critical damping, make it ring, double time constant, impulse vs step).
**Reason**: Students need structured exploration goals, not just open-ended sliders. Challenges with math-based auto-checking provide immediate feedback without requiring a backend.

### 2026-03-02 — ConceptCheck component (multiple-choice + predict-reveal)
**Decision**: Create a reusable `ConceptCheck` component with two modes and embed throughout modules.
**Reason**: Active recall is more effective than passive reading. Lightweight concept checks at the end of sections reinforce key takeaways. No grading system needed — self-assessment only.

### 2026-03-02 — S-Domain Panel in InteractiveLab (not separate page)
**Decision**: Add S-Domain analysis as a toggle panel within InteractiveLab rather than keeping it as a separate interactive page.
**Reason**: Students benefit from seeing time-domain and s-domain representations side-by-side with the same parameter values. SDomainAnalysis page simplified to theory-only (2 tabs) since the interactive part now lives in the lab.

### 2026-03-01 — Frontend design skill (adapted)
**Decision**: Install Anthropic's `frontend-design` plugin skill, adapted for educational context.
**Reason**: The original skill pushes toward bold, "unforgettable" aesthetics that can compete with STEM learning content. Adapted version channels creative energy into micro-interactions, visual hierarchy, state transitions, and data visualization polish — areas that enhance student engagement without sacrificing clarity.
**Alternatives considered**: Install as-is (rejected — "brutalist/maximalist" direction conflicts with educational readability), skip entirely (rejected — useful framework for intentional design decisions).

---

### 2026-03-01 — SessionStart hook for npm install
**Decision**: Add `.claude/hooks.json` with SessionStart hook running `npm install --silent`.
**Reason**: Ensures dependencies are installed when opening a web session, avoiding missing-dependency errors.

### 2026-03-01 — Component subdirectory structure
**Decision**: Move large page components (InteractiveLab, ComponentPhysics, TimeDomain) into subdirectories with `index.tsx` entry points.
**Reason**: Enables extracting sub-components (e.g., `CircuitDiagram.tsx`) without polluting the flat `modules/` directory. Imports remain unchanged for consumers.

### 2026-03-01 — Shared CircuitParameterSliders component
**Decision**: Extract R/L/C slider UI into a shared `CircuitParameterSliders` component in `src/components/common/`.
**Reason**: Identical slider markup was duplicated between InteractiveLab and SDomainAnalysis. Shared component eliminates ~100 lines of duplication.

### 2026-03-01 — useDeferredValue for slider debounce
**Decision**: Use React's `useDeferredValue` on slider state values before passing to chart computation.
**Reason**: Charts were recalculating on every pixel of slider drag. `useDeferredValue` defers low-priority re-renders without adding external debounce libraries or timers. Built into React 19.

### 2026-03-01 — Dark mode with Zustand theme store
**Decision**: Class-based dark mode using `useThemeStore` (Zustand + persist). Toggle in sidebar applies/removes `.dark` class on `<html>`.
**Reason**: Class-based approach works with Tailwind v4's `@variant dark`. Zustand persistence remembers preference across sessions.

### 2026-03-01 — Tailwind v4 CSS-only configuration
**Decision**: Delete `tailwind.config.js` and use Tailwind v4's `@theme` directive in `index.css` for custom colors and fonts.
**Reason**: The v3-style config was redundant and potentially conflicting with v4's CSS-first approach. Single source of truth in CSS.

### 2026-03-01 — Remove global heading/paragraph styles
**Decision**: Remove `h1-h4` and `p` style rules from `index.css`.
**Reason**: These global styles were overriding Tailwind utility classes, causing unexpected font sizes and margins.

### 2026-03-01 — Responsive sidebar with mobile overlay
**Decision**: Sidebar uses CSS transform + transition for mobile (hidden by default), always visible on md+ breakpoint. Mobile header with hamburger menu.
**Reason**: Students may use the app on tablets/phones. No external UI library needed — pure Tailwind CSS transitions.

### 2026-03-01 — Add Zustand for progress tracking
**Decision**: Use Zustand with `persist` middleware for student learning progress. Store in localStorage under `emac-progress`.
**Reason**: Students need to see which modules they've visited. Zustand is minimal (1 KB), integrates cleanly, and the persist middleware handles localStorage automatically.
**Alternatives considered**: Local useState (rejected — doesn't survive page refresh), Redux (overkill for this use case).

### 2026-03-01 — Extract shared types to src/types/circuit.ts
**Decision**: Move CircuitType, DampingType, and damping classification into a single shared module.
**Reason**: These types were duplicated across circuitSolver.ts and TimeDomain.tsx, and damping tolerance was inconsistent (0.01 vs 0.05). Single source of truth eliminates drift.

### 2026-03-01 — Code-split routes with React.lazy
**Decision**: Lazy-load all module page components via React.lazy + Suspense.
**Reason**: Main bundle was 1,059 KB. After splitting: 566 KB main + 14-28 KB per page loaded on demand. Students on slow connections load faster.

### 2026-03-01 — Vitest for testing
**Decision**: Use Vitest with jsdom environment.
**Reason**: Native Vite integration, same config file, fast execution. Vitest 4.x is the current standard for Vite projects.

### 2026-03-01 — eslint-plugin-jsx-a11y for accessibility
**Decision**: Add jsx-a11y recommended ruleset to ESLint.
**Reason**: Catches accessibility issues at lint time (missing roles, labels, interactive element violations). Zero runtime cost, immediate feedback loop.

### 2026-03-01 — Adopt Claude Code context management pattern
**Decision**: Structure project with `context/`, `skills/`, and auto-triggering in CLAUDE.md.
**Reason**: Enables efficient cross-session context loading and compound learning through skill changelogs.
**Alternatives considered**: Flat files at repo root (rejected — doesn't scale, mixes concerns).

### 2026-03-01 — New repo from audited branch
**Decision**: Created fresh repo `EM-AC-Lab-Module` from the audited state of the original `module2testBolt` project.
**Reason**: Clean starting point with known technical debt documented. Old repo had accumulated drift.

### Initial — Local-only state management (updated 2026-03-01)
**Decision**: Component state via `useState`. Zustand only for cross-session persistence (progress tracking).
**Reason**: App is a single-user learning tool. Most state is page-local. AI Tutor state lives in Layout. Zustand added later only for progress that must survive page refresh.

### Initial — Client-side Gemini API key
**Decision**: Store Google Gemini API key in localStorage, call API directly from browser.
**Reason**: No backend exists. Acceptable risk for a student learning tool. Key is user-provided and user-controlled.

### Initial — Tailwind CSS for styling
**Decision**: Use Tailwind with `cn()` utility (clsx + tailwind-merge).
**Reason**: Rapid prototyping, consistent design tokens, no runtime CSS-in-JS overhead.

### Initial — KaTeX over MathJax
**Decision**: Use KaTeX for math rendering.
**Reason**: Faster rendering than MathJax, sufficient LaTeX subset for circuit analysis formulas.
