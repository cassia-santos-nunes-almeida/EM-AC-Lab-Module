import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MultipleChoiceOption {
  text: string;
  correct: boolean;
  explanation: string;
}

interface MultipleChoiceCheck {
  mode: 'multiple-choice';
  question: string;
  options: MultipleChoiceOption[];
}

interface PredictRevealCheck {
  mode: 'predict-reveal';
  question: string;
  answer: string;
}

export type ConceptCheckData = MultipleChoiceCheck | PredictRevealCheck;

interface ConceptCheckProps {
  data: ConceptCheckData;
  className?: string;
}

export function ConceptCheck({ data, className }: ConceptCheckProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={cn(
      'rounded-lg p-4 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
      className,
    )}>
      <div className="flex items-start gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
            Check Your Understanding
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {data.question}
          </p>
        </div>
      </div>

      {data.mode === 'multiple-choice' && (
        <div role="group" aria-label="Answer options" className="space-y-2 ml-7">
          {data.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const showFeedback = isSelected && selectedIndex !== null;

            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                disabled={selectedIndex !== null}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                  selectedIndex === null && 'bg-white dark:bg-slate-700/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-slate-700 dark:text-slate-300',
                  showFeedback && option.correct && 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 ring-2 ring-green-400',
                  showFeedback && !option.correct && 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 ring-2 ring-amber-400',
                  !isSelected && selectedIndex !== null && 'opacity-60 text-slate-500 dark:text-slate-400',
                )}
              >
                {option.text}
                {showFeedback && (
                  <p
                    aria-live="polite"
                    className={cn(
                      'text-xs mt-1',
                      option.correct ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400',
                    )}
                  >
                    {option.explanation}
                  </p>
                )}
              </button>
            );
          })}
          {selectedIndex !== null && (
            <button
              onClick={() => setSelectedIndex(null)}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-medium mt-1"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {data.mode === 'predict-reveal' && (
        <div className="ml-7">
          {revealed ? (
            <div className="bg-white dark:bg-slate-700/50 rounded-md px-3 py-2">
              <p className="text-sm text-slate-700 dark:text-slate-300">{data.answer}</p>
              <button
                onClick={() => setRevealed(false)}
                className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-medium mt-2"
              >
                Hide Answer
              </button>
            </div>
          ) : (
            <button
              onClick={() => setRevealed(true)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Reveal Answer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
