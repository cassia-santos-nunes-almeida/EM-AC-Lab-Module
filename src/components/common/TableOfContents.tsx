interface TocEntry {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  entries: TocEntry[];
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  return (
    <nav
      aria-label="Page sections"
      className="flex flex-wrap gap-2 text-sm"
    >
      <span className="text-slate-500 dark:text-slate-400 font-medium py-1">Jump to:</span>
      {entries.map((entry) => (
        <button
          key={entry.id}
          onClick={() =>
            document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-engineering-blue-100 dark:hover:bg-engineering-blue-900/30 hover:text-engineering-blue-700 dark:hover:text-engineering-blue-300 transition-colors"
        >
          {entry.label}
        </button>
      ))}
    </nav>
  );
}
