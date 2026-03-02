import { BookOpen, Activity, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MathWrapper } from '../common/MathWrapper';
import { ConceptCheck } from '../common/ConceptCheck';
import { Tabs } from '../common/Tabs';
import { ModuleNavigation } from '../common/ModuleNavigation';

function TheoryTab() {
  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Transfer Function Fundamentals</h2>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Definition:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              A transfer function <MathWrapper formula="H(s)" /> is the ratio of the output to input
              in the s-domain, assuming zero initial conditions.
            </p>
            <MathWrapper formula="H(s) = \frac{Y(s)}{X(s)} = \frac{N(s)}{D(s)}" block />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Poles</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                Values of <MathWrapper formula="s" /> where <MathWrapper formula="D(s) = 0" />
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Poles determine system stability and transient response characteristics.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Zeros</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                Values of <MathWrapper formula="s" /> where <MathWrapper formula="N(s) = 0" />
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Zeros affect the magnitude and phase of the frequency response.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">RLC Circuit Transfer Function</h2>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">For a series RLC circuit:</p>
            <MathWrapper formula="H(s) = \frac{V_C(s)}{V_s(s)} = \frac{\omega_0^2}{s^2 + 2\alpha s + \omega_0^2}" block />
            <div className="mt-3 text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <p>where:</p>
              <p><MathWrapper formula="\alpha = \frac{R}{2L}" /> = Damping coefficient</p>
              <p><MathWrapper formula="\omega_0 = \frac{1}{\sqrt{LC}}" /> = Natural frequency (rad/s)</p>
              <p><MathWrapper formula="\zeta = \frac{\alpha}{\omega_0} = \frac{R}{2}\sqrt{\frac{C}{L}}" /> = Damping ratio</p>
            </div>
          </div>

          <div className="bg-engineering-blue-50 dark:bg-engineering-blue-900/20 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Characteristic Equation:</p>
            <MathWrapper formula="s^2 + 2\alpha s + \omega_0^2 = 0" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Poles: <MathWrapper formula="s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}" />
            </p>
          </div>
        </div>
      </section>

      <ConceptCheck data={{
        mode: 'multiple-choice',
        question: 'A system has poles at s = -3 ± 4j. Is it stable? What damping type?',
        options: [
          { text: 'Stable, underdamped', correct: true, explanation: 'Correct! Both poles have negative real parts (σ = -3 < 0), so the system is stable. The nonzero imaginary parts (±4j) indicate complex conjugate poles → underdamped response with oscillations.' },
          { text: 'Unstable, underdamped', correct: false, explanation: 'The real part is -3, which is negative. Poles in the left half-plane mean the system is stable.' },
          { text: 'Stable, overdamped', correct: false, explanation: 'Overdamped systems have two distinct real poles (no imaginary part). These poles have imaginary parts ±4j, so the response oscillates → underdamped.' },
          { text: 'Stable, critically damped', correct: false, explanation: 'Critical damping requires repeated real poles (same location, no imaginary part). These are complex conjugate poles → underdamped.' },
        ],
      }} />

      <Link
        to="/interactive-lab"
        className="flex items-center gap-4 p-5 rounded-lg bg-gradient-to-r from-engineering-blue-50 to-indigo-50 dark:from-engineering-blue-900/20 dark:to-indigo-900/20 border border-engineering-blue-200 dark:border-engineering-blue-800 hover:shadow-md transition-all hover:-translate-y-0.5 group"
      >
        <div className="w-10 h-10 rounded-xl bg-engineering-blue-100 dark:bg-engineering-blue-900/50 flex items-center justify-center shrink-0">
          <FlaskConical className="w-5 h-5 text-engineering-blue-600 dark:text-engineering-blue-400" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-engineering-blue-900 dark:text-engineering-blue-200 text-sm">Try it in the Interactive Lab</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compute transfer functions, visualize poles on the s-plane, and see how R, L, C affect stability — all in real time.
          </p>
        </div>
        <Activity className="w-4 h-4 text-engineering-blue-400 dark:text-engineering-blue-500 group-hover:text-engineering-blue-600 dark:group-hover:text-engineering-blue-300 transition-colors shrink-0" />
      </Link>
    </div>
  );
}

function DampingTab() {
  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Damping Behavior</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 p-5 rounded-lg border-2 border-blue-300 dark:border-blue-700">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Underdamped (ζ &lt; 1)
            </h4>
            <div className="mb-3">
              <MathWrapper formula="\alpha < \omega_0" block />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Poles:</strong> Complex conjugate pair
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Response:</strong> Oscillatory with exponential decay
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Common in lightly damped resonant circuits. Exhibits ringing and overshoot.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-800 p-5 rounded-lg border-2 border-green-300 dark:border-green-700">
            <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
              Critically Damped (ζ = 1)
            </h4>
            <div className="mb-3">
              <MathWrapper formula="\alpha = \omega_0" block />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Poles:</strong> Two identical real poles
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Response:</strong> Fastest rise time without overshoot
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ideal for control systems requiring fast settling without oscillation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-800 p-5 rounded-lg border-2 border-amber-300 dark:border-amber-700">
            <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
              Overdamped (ζ &gt; 1)
            </h4>
            <div className="mb-3">
              <MathWrapper formula="\alpha > \omega_0" block />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Poles:</strong> Two distinct real poles
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Response:</strong> Slow exponential approach, no overshoot
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Heavily damped systems. Slow to reach steady state but very stable.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-engineering-blue-50 to-slate-50 dark:from-engineering-blue-900/20 dark:to-slate-800 rounded-lg shadow-md p-6 border-l-4 border-engineering-blue-600">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">•</span>
            <span>
              Transfer functions provide a complete description of system dynamics in the s-domain.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">•</span>
            <span>
              Pole locations determine stability and transient behavior. Poles in the left half-plane
              indicate stability.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">•</span>
            <span>
              The damping ratio ζ predicts oscillatory behavior: ζ &lt; 1 gives oscillations,
              ζ = 1 is optimal damping, ζ &gt; 1 is sluggish.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">•</span>
            <span>
              Natural frequency ω₀ determines how fast the system responds, while α controls
              the rate of decay.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export function SDomainAnalysis() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">S-Domain Theory</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Transfer functions, poles, zeros, and stability analysis
        </p>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Theory',
            icon: <BookOpen className="w-4 h-4" />,
            content: <TheoryTab />,
          },
          {
            label: 'Damping & Takeaways',
            icon: <Activity className="w-4 h-4" />,
            content: <DampingTab />,
          },
        ]}
      />

      <ModuleNavigation />
    </div>
  );
}
