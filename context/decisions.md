# Architecture Decisions

Chronological log of key decisions. Newest at top.

---

### 2026-03-01 — Adopt Claude Code context management pattern
**Decision**: Structure project with `context/`, `skills/`, and auto-triggering in CLAUDE.md.
**Reason**: Enables efficient cross-session context loading and compound learning through skill changelogs.
**Alternatives considered**: Flat files at repo root (rejected — doesn't scale, mixes concerns).

### 2026-03-01 — New repo from audited branch
**Decision**: Created fresh repo `EM-AC-Lab-Module` from the audited state of the original `module2testBolt` project.
**Reason**: Clean starting point with known technical debt documented. Old repo had accumulated drift.

### Initial — Local-only state management
**Decision**: All state is local `useState`. No Zustand/Redux.
**Reason**: App is a single-user learning tool with no shared state requirements across routes. AI Tutor state lives in Layout and persists during navigation. Acceptable trade-off for simplicity.

### Initial — Client-side Gemini API key
**Decision**: Store Google Gemini API key in localStorage, call API directly from browser.
**Reason**: No backend exists. Acceptable risk for a student learning tool. Key is user-provided and user-controlled.

### Initial — Tailwind CSS for styling
**Decision**: Use Tailwind with `cn()` utility (clsx + tailwind-merge).
**Reason**: Rapid prototyping, consistent design tokens, no runtime CSS-in-JS overhead.

### Initial — KaTeX over MathJax
**Decision**: Use KaTeX for math rendering.
**Reason**: Faster rendering than MathJax, sufficient LaTeX subset for circuit analysis formulas.
