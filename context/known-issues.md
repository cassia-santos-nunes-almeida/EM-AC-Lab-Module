# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **Large components remain** — `ComponentPhysics/index.tsx` (~760 lines) and `TimeDomain/index.tsx` (~635 lines) still have deeply nested JSX. Further decomposition possible.

## Security

3. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.
