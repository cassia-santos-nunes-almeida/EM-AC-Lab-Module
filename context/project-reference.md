# Project Reference — EM&AC Lab: Module 2

Detailed technical reference. For quick context, see `CLAUDE.md` instead.

---

## Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | React | 19.2.x | Functional components, StrictMode |
| Language | TypeScript | ~5.9.3 | Strict mode, `noUnusedLocals`, `noUnusedParameters` |
| Build tool | Vite | 7.3.x | `@vitejs/plugin-react`, base path `/module2testBolt/` |
| Styling | Tailwind CSS | 4.1.x | PostCSS plugin, `cn()` utility (clsx + tailwind-merge) |
| Routing | React Router DOM | 7.13.x | BrowserRouter with basename from `import.meta.env.BASE_URL` |
| Charts | Recharts | 3.7.x | LineChart, ScatterChart, ResponsiveContainer |
| Math | KaTeX | 0.16.x | Custom `MathWrapper` component |
| Icons | Lucide React | 0.563.x | Tree-shakeable SVG |
| AI | Google Generative AI SDK | 0.24.x | Gemini 2.0 Flash, API key in localStorage |
| Linting | ESLint 9 | flat config | react-hooks, react-refresh, typescript-eslint |
| Deploy | GitHub Pages | — | GitHub Actions on push to `main` |

### Not Present

- No test framework
- No state management library (all local `useState`)
- No backend / server-side code

---

## Key Data Shapes

| Interface | Fields | Purpose |
|-----------|--------|---------|
| `CircuitParams` | `R`, `L`, `C`, `voltage` | Input to the solver |
| `TimeSeriesPoint` | `time`, `voltage`, `current` | Single data point |
| `CircuitResponse` | `data[]`, `dampingType?`, `alpha?`, `omega0?`, `zeta?`, `timeConstant?` | Full simulation output |
| `Complex` | `real`, `imag` | Pole/zero representation |
| `MaterialProperty` | `name`, `resistivity?`, `permittivity?`, `permeability?` | Material constants |

---

## User Flows

### Guided Learning Path
Overview → Component Physics → Circuit Analysis → Laplace Theory → S-Domain Analysis → Interactive Lab

### AI Tutoring
Click "AI Circuit Tutor" → Enter Gemini API key → Chat with LaTeX-formatted responses → Persists across page navigation

### Interactive Circuit Simulation
Select circuit type (RC/RL/RLC) → Toggle input (Step/Impulse) → Adjust sliders → See live charts + equations + analysis

---

## Authentication

None. Static site on GitHub Pages. Only credential is the optional Gemini API key stored in localStorage (`emac_gemini_api_key`).
