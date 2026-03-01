# Current Sprint

## Goal
Code quality and student experience improvements — testing, performance, accessibility, progress tracking.

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

## Next
- Extract monolithic components (ComponentPhysics, InteractiveLab, TimeDomain)
- Add responsive/mobile layout
- Add more test coverage (componentMath, component tests)
- Add dark mode support
