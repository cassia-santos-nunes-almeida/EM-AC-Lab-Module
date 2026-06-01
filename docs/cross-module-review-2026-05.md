# Module 2 (Circuit Analysis) -- Phase 2 Plan

Repo: C:\Users\cassi\Documents\GitHub\EM-AC-Lab-Module2

## Physics correctness

The M2 physics auditor in the main workflow run stalled and was re-run as a focused recovery pass (2026-05-29). It re-derived every formula, transform pair, and quiz numeric independently. Result: 1 critical, 1 warning, 2 caption-only notes; everything else verified correct.

Important: `src/utils/circuitSolver.ts` is on the M2 "Do Not Touch" list in CLAUDE.md ("Core math engine, requires careful review and testing before any modification"). The P1 item below is a genuine correctness bug and should be fixed, but only with a paired regression test and explicit review.

- **P1 - Fix the inverted overdamped RLC step response (correctness bug, visible by default).** File `src/utils/circuitSolver.ts`, `calculateRLCUnified`, overdamped `inputType === 'step'` branch (lines 131-143). The coefficients `A1 = Vs*s2/(s2-s1)`, `A2 = -Vs*s1/(s2-s1)` with `voltage = A1*exp1 + A2*exp2` omit the forced term: at t=0 the sum is `A1+A2 = Vs`, and as t grows both exponentials decay to 0, so the code produces v(0)=Vs, v(infinity)=0 (a discharge curve) instead of the step response v(0)=0, v(infinity)=Vs. Confirmed by direct read of the source and independent re-derivation; the adjacent critically-damped step branch (line 165) is correct (`Vs*(1 - e^{-alpha t}(1 + alpha t))`), which is why only the overdamped curve is wrong. The default lab is RLC + Step at R=100, L=0.1, C=1e-4 (zeta=1.58, overdamped), so the wrong curve shows on first load. Fix: `voltage = Vs*(1 + (s2*exp1 - s1*exp2)/(s1 - s2))`, keep `current = C * dv/dt`, which reduces to `current = C*Vs*s1*s2*(exp1 - exp2)/(s1 - s2)` with `s1*s2 = omega0^2`. This gives v(0)=0, v(infinity)=Vs, i(0)=0. Add a regression test asserting overdamped step v(0)~0 and v(last)~Vs; the existing "never exceeds Vs" test passes on the wrong curve and did not catch this. Book citation: Nilsson and Riedel 11e Ch 8, Eqs 8.18-8.21. Verification: re-derived and source-confirmed; not PDF-verified.

- **P2 - Correct the RLC natural-response formula notation.** File `src/components/modules/TimeDomain/ResponseComparisons.tsx` (line 32). Change `v(t) = e^{-\alpha t}(A_1 e^{s_1 t} + A_2 e^{s_2 t})` to `v(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}`, since `s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}` already carries the decay (the leading `e^{-\alpha t}` double-counts it under the module's own convention). Display-only; the solver is unaffected. Book citation: Nilsson and Riedel 11e Ch 8, Eqs 8.5-8.9. Verification: re-derived; not PDF-verified.

- **P3 - Caption: name the unilateral 0^- lower limit on the Laplace definition.** File `src/components/modules/LaplaceTheory.tsx` (line 45). Change `\int_0^\infty` to `\int_{0^-}^\infty`, or add a note that the course uses the one-sided transform with lower limit 0^- so impulses at t=0 are captured. Caption only. Book citation: Nilsson and Riedel 11e Ch 12; laplace-conventions.md.

- **P3 - Caption: explain the negative RC impulse current.** File `src/components/modules/TimeDomain/ResponseComparisons.tsx` (lines 92-93) and/or the InteractiveLab equations panel. The solver correctly plots `i = -(Vs/(R^2 C)) e^{-t/RC}` (verified correct, see below), but nothing tells the student the negative sign is the capacitor discharging through R after the impulse. Add a one-line caption. Caption only. Book citation: Nilsson and Riedel 11e Ch 12-13.

### Verified correct, no change
RC step v and i; RL step v and i; RC impulse v and i (including the negative iScale); RL impulse i and v; RLC underdamped step v and i; RLC critically-damped step v and i; all three RLC impulse branches; transfer function H(s)=omega0^2/(s^2 + 2 alpha s + omega0^2) with pole branching; alpha=R/2L, omega0=1/sqrt(LC), zeta=alpha/omega0=(R/2)sqrt(C/L); all 10 Laplace pairs; all 8 Laplace properties including the now-caveated Final Value Theorem (P-CODE-06 resolved); R=rho L/A, C=eps A/d, L=mu N^2 A/l, Z_C, Z_L; copper 1.68e-8 and iron 6.3e-3 (B-H note present); SDomainAnalysis Read-the-Plot cases A-D; TimeDomain YourTurnPanel numerics; LaplaceMotivation partial fractions and LaplaceTheory Examples 1-4; CircuitAnalysisExercise KVL/KCL/ODE answers.

## Consistency alignment

1. ConceptCheck cadence -- P2. Files: src/components/modules/ComponentPhysics (Resistor/Inductor/Capacitor subsections) and src/components/modules/InteractiveLab/index.tsx. Change: lift each ComponentPhysics subsection and InteractiveLab from 1 to at least 2 inline ConceptChecks (P-CODE-10).
2. ModuleNavigation data-driven -- P2. File: src/components/common/ModuleNavigation.tsx. Change: replace useLocation plus the internal hardcoded modules[] array with M1's data-driven getAdjacentModules pattern fed from a per-module modules constant.
3. TableOfContents scroll-spy -- P2. File: src/components/common/TableOfContents.tsx. Change: adopt M1's items plus activeId scroll-spy contract and active accent, keeping M2's smooth scrollIntoView behavior.
4. Tabs rename to TabSet -- P2. File: src/components/common/Tabs.tsx and call sites. Change: rename the uncontrolled content-carrying component to <TabSet> and add Home/End keyboard support to match the accessibility floor.
5. ChallengeCard name -- P3. File: src/components/common/ChallengeCard.tsx. Change: none to the contract; M2 keeps the ChallengeCard name for the auto-check dismissable variant (it is the canonical source).
6. LaTeX double-backslash normalization -- P2. Files: src/components/modules/SDomainAnalysis.tsx (41-174), TimeDomain/ResponseComparisons.tsx (31-136), TimeDomain/index.tsx (155-167), InteractiveLab/SDomainPanel.tsx (59-67), LaplaceMotivation.tsx (19). Change: convert single-backslash static JSX formula attributes to double backslashes (P-CODE-11), matching M2's own dynamic template literals; grep \\1 after the edit (P-CODE-12). Prioritize \text, \tau, \to, \nabla, \frac, \vec.
7. MathWrapper -- P3. File: src/components/common/MathWrapper.tsx. Change: none; M2's ref-based katex.render implementation is the canonical source.

### Stale prior-audit records to retire (doc-only)
- M2 progress persistence is RESOLVED. File: src/store/progressStore.ts (lines 35-119) has a full useProgressStore persisted to emac-m2-progress, wired into 8 components (P-CODE-09). Update AUDIT_REPORT.md Section 5 and the Section 6 "P1: Add progress persistence" recommendation to mark resolved, and update CLAUDE.md which still describes the store as theme-only.

## Optimization

1. vite.config.ts base path mismatch -- P1. File: vite.config.ts line 8 (and scope/start_url at lines 46-47). Change: the base is '/EM-AC-Lab-Module/' but the repo slug is EM-AC-Lab-Module2; on GitHub Pages this 404s all assets. Confirm the GH Pages slug and set base to '/EM-AC-Lab-Module2/' to match M3's pattern. Verify against the live GH Pages URL before changing, in case the legacy name is intentional for a primary deploy (P-CODE-15).
