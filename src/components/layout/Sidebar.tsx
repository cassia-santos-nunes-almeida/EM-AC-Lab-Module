import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Zap,
  Clock,
  FunctionSquare,
  GitBranch,
  FlaskConical,
  Check,
  Moon,
  Sun,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useProgressStore } from '../../store/progressStore';
import { useThemeStore } from '../../store/progressStore';

const navigationLinks = [
  { to: '/', icon: Home, label: 'Overview', step: 0 },
  { to: '/component-physics', icon: Zap, label: 'Component Physics', step: 1 },
  { to: '/circuit-analysis', icon: Clock, label: 'Circuit Analysis', step: 2 },
  { to: '/laplace-theory', icon: FunctionSquare, label: 'Laplace Theory', step: 3 },
  { to: '/s-domain', icon: GitBranch, label: 'S-Domain Analysis', step: 4 },
  { to: '/interactive-lab', icon: FlaskConical, label: 'Interactive Lab', step: 5 },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { modules, markVisited } = useProgressStore();
  const { theme, toggleTheme } = useThemeStore();
  const currentIndex = navigationLinks.findIndex(link =>
    link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
  );

  useEffect(() => {
    markVisited(location.pathname);
  }, [location.pathname, markVisited]);

  const visitedCount = Object.values(modules).filter(m => m.visited).length;
  const totalModules = navigationLinks.length;

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-br from-engineering-blue-600 to-engineering-blue-800">
        <h1 className="text-xl font-bold text-white">EM&AC Lab</h1>
        <p className="text-sm text-engineering-blue-200 mt-1">Module 2: Circuit Analysis</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto" aria-label="Learning path">
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-2">Learning Path</p>
        <ul className="space-y-1">
          {navigationLinks.map((link, index) => {
            const visited = modules[link.to]?.visited ?? false;
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm',
                      isActive
                        ? 'bg-engineering-blue-50 dark:bg-engineering-blue-900/30 text-engineering-blue-700 dark:text-engineering-blue-300 font-semibold border-l-3 border-engineering-blue-600'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    )
                  }
                >
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors',
                    index === currentIndex
                      ? 'bg-engineering-blue-600 text-white'
                      : visited
                      ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'
                      : index < currentIndex
                      ? 'bg-engineering-blue-100 dark:bg-engineering-blue-900/30 text-engineering-blue-600 dark:text-engineering-blue-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                  )}>
                    {visited && index !== currentIndex ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <link.icon className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span>{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Progress</span>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{visitedCount}/{totalModules}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(visitedCount / totalModules) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 mb-3 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium tracking-wide">
          CA/EM&CA Course
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-0.5">
          &copy; 2026 LUT University
        </p>
      </div>
    </aside>
  );
}
