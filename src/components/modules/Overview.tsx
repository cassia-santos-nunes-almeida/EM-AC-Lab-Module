import { Target, Compass, AlertTriangle, Scale, Zap, Clock, FunctionSquare, GitBranch, FlaskConical, ArrowRight, Lightbulb } from 'lucide-react';
import { MathWrapper } from '../common/MathWrapper';
import { Tabs } from '../common/Tabs';
import { Link } from 'react-router-dom';

const learningPath = [
  {
    to: '/component-physics',
    icon: Zap,
    title: 'Component Physics',
    description: 'Explore R, L, C from physical principles — adjust materials and geometry to see how component values change.',
    color: 'from-red-50 to-white dark:from-red-950/30 dark:to-slate-800 border-red-200 dark:border-red-800 text-red-700',
    iconBg: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400',
  },
  {
    to: '/circuit-analysis',
    icon: Clock,
    title: 'Circuit Analysis',
    description: 'Compare time-domain ODEs with s-domain algebra side by side for RC, RL, and RLC circuits.',
    color: 'from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 border-blue-200 dark:border-blue-800 text-blue-700',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
  },
  {
    to: '/laplace-theory',
    icon: FunctionSquare,
    title: 'Laplace Theory',
    description: 'Master the transform — definition, tables, properties, and worked examples with partial fractions.',
    color: 'from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-800 border-purple-200 dark:border-purple-800 text-purple-700',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
  },
  {
    to: '/s-domain',
    icon: GitBranch,
    title: 'S-Domain Analysis',
    description: 'Understand transfer functions, pole-zero maps, damping ratios, and stability criteria.',
    color: 'from-emerald-50 to-white dark:from-emerald-950/30 dark:to-slate-800 border-emerald-200 dark:border-emerald-800 text-emerald-700',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
  },
  {
    to: '/interactive-lab',
    icon: FlaskConical,
    title: 'Interactive Lab',
    description: 'Simulate circuits in real time — tweak R, L, C and watch voltage/current responses evolve.',
    color: 'from-amber-50 to-white dark:from-amber-950/30 dark:to-slate-800 border-amber-200 dark:border-amber-800 text-amber-700',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400',
  },
];

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Two-domain overview */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800 p-5 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">Time Domain</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Energy storage in <strong>electric fields</strong> (capacitors) and{' '}
            <strong>magnetic fields</strong> (inductors), analyzed through differential equations
            that describe how voltages and currents evolve over time.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-800 p-5 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
              <FunctionSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-200">S-Domain (Laplace)</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            The <strong>Laplace Transform</strong> converts differential equations into
            algebraic problems — revealing stability, natural frequencies, and damping behavior
            through poles and zeros.
          </p>
        </div>
      </div>

      {/* Learning objectives */}
      <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-700">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Learning Objectives</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {[
            {
              text: <>Master constitutive laws: <MathWrapper formula="V=IR" />, <MathWrapper formula="I=C \frac{dV}{dt}" />, <MathWrapper formula="V=L \frac{dI}{dt}" /></>,
            },
            {
              text: 'Analyze first-order (RC, RL) and second-order (RLC) circuits in the time domain.',
            },
            {
              text: 'Apply the Laplace Transform to solve circuit differential equations algebraically.',
            },
            {
              text: <>Visualize transient responses and understand damping ratio <MathWrapper formula="\zeta" /> and natural frequency <MathWrapper formula="\omega_0" />.</>,
            },
          ].map((objective, index) => (
            <div key={index} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {index + 1}
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">{objective.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Tutor callout */}
      <section className="bg-gradient-to-r from-engineering-blue-50 to-indigo-50 dark:from-engineering-blue-950/30 dark:to-indigo-950/20 rounded-xl p-5 border border-engineering-blue-200 dark:border-engineering-blue-800 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-engineering-blue-100 dark:bg-engineering-blue-900/50 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4 text-engineering-blue-600 dark:text-engineering-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-engineering-blue-900 dark:text-engineering-blue-200 mb-1">AI Circuit Tutor</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Click the <strong>"AI Circuit Tutor"</strong> button on the right side of the screen to ask
              questions anytime. The tutor is powered by Gemini and specializes in circuit analysis — it
              can walk you through derivations, explain damping behavior, help with partial fractions, and more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function LearningPathTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-engineering-blue-100 dark:bg-engineering-blue-900/50 flex items-center justify-center shrink-0">
          <Compass className="w-4 h-4 text-engineering-blue-600 dark:text-engineering-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your Learning Path</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Follow these modules in order for the best learning experience</p>
        </div>
      </div>

      <div className="space-y-3">
        {learningPath.map((module, index) => (
          <Link
            key={module.to}
            to={module.to}
            className={`group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${module.color} border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-5 text-right">{index + 1}</span>
                <div className={`w-10 h-10 rounded-xl ${module.iconBg} flex items-center justify-center`}>
                  <module.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{module.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{module.description}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function AboutTab() {
  return (
    <div className="space-y-6">
      {/* Educational disclaimer */}
      <section className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">Educational Disclaimer</h3>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3 ml-8">
          This application models <strong>ideal linear components</strong>. Real circuits may exhibit
          non-linear behavior, parasitic effects, and tolerance variations not modeled here.
        </p>

        <div className="bg-red-50 dark:bg-red-950/30 border-l-3 border-red-400 dark:border-red-600 p-3 rounded-r-lg ml-8">
          <p className="text-red-800 dark:text-red-300 text-xs leading-relaxed">
            <strong>AI Content Notice:</strong> This application was built with AI assistance. While
            designed to align with engineering standards, always <strong>cross-reference formulas and
            explanations with your course textbooks</strong> (e.g., Nilsson & Riedel). If discrepancies
            are found, inform your teacher.
          </p>
        </div>
      </section>

      {/* License */}
      <section className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-start gap-3 mb-3">
          <Scale className="w-5 h-5 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">License & Ownership</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              <strong>&copy; 2026 CA/EM&CA, LUT University.</strong> Licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-engineering-blue-600 dark:text-engineering-blue-400 underline hover:text-engineering-blue-700 dark:hover:text-engineering-blue-300"
              >
                CC BY-NC-SA 4.0
              </a>
              . Third-party materials used under the Kopiosto Copyright License for Higher Education.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Overview() {
  return (
    <div className="space-y-8">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-engineering-blue-600 via-engineering-blue-700 to-engineering-blue-800 rounded-xl p-8 text-white shadow-lg">
        <p className="text-engineering-blue-200 text-sm font-medium tracking-wide uppercase mb-2">
          LUT University &middot; Electromagnetism and Circuit Analysis
        </p>
        <h1 className="text-3xl font-bold text-white mb-3">
          Module 2: Circuit Analysis
        </h1>
        <p className="text-engineering-blue-100 text-base leading-relaxed max-w-3xl">
          Bridge the gap between <strong className="text-white">physical intuition</strong> and{' '}
          <strong className="text-white">mathematical modeling</strong>. Explore how energy storage
          in electric and magnetic fields connects to Laplace transforms, transfer functions, and
          transient circuit behavior.
        </p>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Overview',
            icon: <Target className="w-4 h-4" />,
            content: <OverviewTab />,
          },
          {
            label: 'Learning Path',
            icon: <Compass className="w-4 h-4" />,
            content: <LearningPathTab />,
          },
          {
            label: 'About',
            icon: <Scale className="w-4 h-4" />,
            content: <AboutTab />,
          },
        ]}
      />
    </div>
  );
}
