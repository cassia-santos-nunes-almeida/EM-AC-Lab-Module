import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ModuleProgress {
  /** Route path, e.g. '/component-physics' */
  path: string;
  /** Whether the student has visited this module */
  visited: boolean;
  /** Timestamp of first visit */
  firstVisitedAt?: number;
}

interface ProgressState {
  modules: Record<string, ModuleProgress>;
  markVisited: (path: string) => void;
  resetProgress: () => void;
}

const MODULE_PATHS = [
  '/',
  '/component-physics',
  '/circuit-analysis',
  '/laplace-theory',
  '/s-domain',
  '/interactive-lab',
];

function createInitialModules(): Record<string, ModuleProgress> {
  const modules: Record<string, ModuleProgress> = {};
  for (const path of MODULE_PATHS) {
    modules[path] = { path, visited: false };
  }
  return modules;
}

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light' as Theme,
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'light' ? 'dark' : 'light';
          applyTheme(next);
          return { theme: next };
        }),
    }),
    {
      name: 'emac-theme',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    }
  )
);

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      modules: createInitialModules(),
      markVisited: (path: string) =>
        set((state) => {
          const existing = state.modules[path];
          if (!existing || existing.visited) return state;
          return {
            modules: {
              ...state.modules,
              [path]: {
                ...existing,
                visited: true,
                firstVisitedAt: Date.now(),
              },
            },
          };
        }),
      resetProgress: () => set({ modules: createInitialModules() }),
    }),
    { name: 'emac-progress' }
  )
);
