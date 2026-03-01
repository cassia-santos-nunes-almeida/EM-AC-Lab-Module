# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **Large components remain** — `ComponentPhysics/index.tsx` (~760 lines) and `TimeDomain/index.tsx` (~635 lines) still have deeply nested JSX. Further decomposition possible.

## Styling

2. **AI Tutor lacks dark mode** — The AI Tutor panel (`AiTutor.tsx`) does not yet have dark mode classes applied.

## Security

3. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.
