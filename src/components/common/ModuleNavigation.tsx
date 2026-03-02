import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const modules = [
  { path: '/', label: 'Overview' },
  { path: '/component-physics', label: 'Component Physics' },
  { path: '/circuit-analysis', label: 'Circuit Analysis' },
  { path: '/laplace-theory', label: 'Laplace Theory' },
  { path: '/s-domain', label: 'S-Domain Theory' },
  { path: '/interactive-lab', label: 'Interactive Lab' },
];

export function ModuleNavigation() {
  const location = useLocation();
  const currentIndex = modules.findIndex(m =>
    m.path === '/' ? location.pathname === '/' : location.pathname.startsWith(m.path)
  );

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const next = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <nav className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-700" aria-label="Module navigation">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Previous</p>
            <p>{prev.label}</p>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          to={next.path}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-engineering-blue-600 dark:text-engineering-blue-400 hover:bg-engineering-blue-50 dark:hover:bg-engineering-blue-900/20 transition-colors"
        >
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">Next</p>
            <p>{next.label}</p>
          </div>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : <div />}
    </nav>
  );
}
