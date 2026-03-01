import { useState, useMemo, useDeferredValue } from 'react';
import { BookOpen, SlidersHorizontal, Activity } from 'lucide-react';
import { MathWrapper } from '../common/MathWrapper';
import { Tabs } from '../common/Tabs';
import { ResponseChartTooltip, PoleTooltip } from '../common/CircuitCharts';
import { CircuitParameterSliders } from '../common/CircuitParameterSliders';
import { calculateTransferFunction, calculateCircuitResponse } from '../../utils/circuitSolver';
import { classifyDamping, dampingLabel } from '../../types/circuit';
import { useThemeStore } from '../../store/progressStore';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, LineChart, Line, Legend,
} from 'recharts';

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
    </div>
  );
}

/** Pole-zero scatter plot on the s-plane (F21). */
function PoleZeroMap({ poleData, poles, chartColors }: {
  poleData: Array<{ x: number; y: number; name: string }>;
  poles: Array<{ real: number; imag: number }>;
  chartColors: { grid: string; text: string; legend: string };
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">S-Plane Pole-Zero Map</h3>
      <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis
              type="number"
              dataKey="x"
              name="Real"
              tick={{ fill: chartColors.text }}
              label={{ value: 'Real Axis (\u03C3)', position: 'insideBottom', offset: -10, fill: chartColors.text }}
              domain={['auto', 'auto']}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Imaginary"
              tick={{ fill: chartColors.text }}
              label={{ value: 'Imaginary Axis (j\u03C9)', angle: -90, position: 'insideLeft', fill: chartColors.text }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ payload }) => <PoleTooltip payload={payload as Array<{ payload: { name: string; x: number; y: number } }>} />}
            />
            <ReferenceLine x={0} stroke="#64748b" strokeWidth={2} />
            <ReferenceLine y={0} stroke="#64748b" strokeWidth={2} />
            <Scatter
              name="Poles"
              data={poleData}
              fill="#ef4444"
              shape="cross"
              line={false}
              animationDuration={400}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-xs text-center text-slate-600 dark:text-slate-400 mt-2">
          Red ✕ marks indicate pole locations
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-4 border-l-4 border-amber-500">
        <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-1">Stability:</h4>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          {poles.every(p => p.real < 0) ? (
            <span className="text-green-700 dark:text-green-400 font-semibold">
              ✓ STABLE — all poles in left half-plane
            </span>
          ) : (
            <span className="text-red-700 dark:text-red-400 font-semibold">
              ✗ UNSTABLE — poles in right half-plane
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

/** Step response line chart with time constant and damped period markers (F21). */
function StepResponsePanel({ chartData, timeConstantMs, dampedPeriodMs, effectiveDuration, chartColors }: {
  chartData: Array<{ time: number; voltage: number; current: number }>;
  timeConstantMs: number;
  dampedPeriodMs: number | null;
  effectiveDuration: number;
  chartColors: { grid: string; text: string; legend: string };
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Step Response (Time Domain)</h3>
      <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="time" tick={{ fill: chartColors.text }} label={{ value: 'Time (ms)', position: 'insideBottom', offset: -5, fill: chartColors.text }} />
            <YAxis tick={{ fill: chartColors.text }} label={{ value: 'V / mA', angle: -90, position: 'insideLeft', fill: chartColors.text }} />
            <Tooltip content={({ payload, label }) => <ResponseChartTooltip payload={payload as Array<{ color?: string; name?: string; value?: string | number }>} label={label} />} />
            <Legend wrapperStyle={{ color: chartColors.legend }} />
            {/* Time constant marker */}
            {timeConstantMs <= effectiveDuration * 1000 && (
              <ReferenceLine
                x={timeConstantMs}
                stroke="#16a34a"
                strokeWidth={1.5}
                strokeDasharray="6 3"
                label={{ value: '\u03C4', position: 'top', fill: '#16a34a', fontWeight: 'bold', fontSize: 14 }}
              />
            )}
            {/* Damped period marker */}
            {dampedPeriodMs && dampedPeriodMs <= effectiveDuration * 1000 && (
              <ReferenceLine
                x={dampedPeriodMs}
                stroke="#7c3aed"
                strokeWidth={1.5}
                strokeDasharray="6 3"
                label={{ value: 'T\u1D48', position: 'top', fill: '#7c3aed', fontWeight: 'bold', fontSize: 13 }}
              />
            )}
            <Line type="monotone" dataKey="voltage" stroke="#3b82f6" name="Voltage" dot={false} strokeWidth={2} animationDuration={500} animationEasing="ease-out" />
            <Line type="monotone" dataKey="current" stroke="#ef4444" name="Current" dot={false} strokeWidth={2} animationDuration={500} animationEasing="ease-out" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-center text-slate-600 dark:text-slate-400 mt-2">
          Green dashed line = &#964; (1/&#945;){dampedPeriodMs ? ', purple = damped period T\u1D48' : ''}
        </p>
      </div>

      {/* Compact analysis metrics */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Envelope &#964; = 1/&#945;</p>
          <p className="text-lg font-bold text-green-700 dark:text-green-400 mt-0.5">
            {timeConstantMs.toFixed(3)} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">ms</span>
          </p>
        </div>
        {dampedPeriodMs !== null && (
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Damped Freq &#969;<sub>d</sub></p>
            <p className="text-lg font-bold text-engineering-blue-700 dark:text-engineering-blue-400 mt-0.5">
              {dampedPeriodMs !== null ? ((2 * Math.PI / (dampedPeriodMs / 1000))).toFixed(2) : '—'} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">rad/s</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveTab() {
  const [R, setR] = useState(100);
  const [L, setL] = useState(0.1);
  const [C, setC] = useState(0.0001);
  const [autoDuration, setAutoDuration] = useState(true);
  const [duration, setDuration] = useState(0.01);

  const isDark = useThemeStore((s) => s.theme) === 'dark';
  const chartColors = {
    grid: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#cbd5e1' : '#475569',
    legend: isDark ? '#e2e8f0' : '#334155',
  };

  // Defer slider values so charts don't re-render on every pixel of drag
  const dR = useDeferredValue(R);
  const dL = useDeferredValue(L);
  const dC = useDeferredValue(C);

  const { poles, numerator, denominator } = calculateTransferFunction(dR, dL, dC);
  const alpha = dR / (2 * dL);
  const omega0 = 1 / Math.sqrt(dL * dC);
  const zeta = alpha / omega0;

  const dampingType = dampingLabel(classifyDamping(zeta));

  const rCrit = 2 * Math.sqrt(dL / dC);

  const timeConstant = (2 * dL) / dR;
  const timeConstantMs = timeConstant * 1000;

  const effectiveDuration = useMemo(() => {
    if (autoDuration) {
      return Math.max(0.001, Math.min(0.1, 5 * timeConstant));
    }
    return duration;
  }, [autoDuration, timeConstant, duration]);

  const dampedPeriodMs = useMemo(() => {
    if (zeta < 1) {
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
      return (2 * Math.PI / omegaD) * 1000;
    }
    return null;
  }, [zeta, omega0]);

  const poleData = poles.map((pole, idx) => ({
    x: pole.real,
    y: pole.imag,
    name: `Pole ${idx + 1}`,
  }));

  const response = useMemo(() => {
    return calculateCircuitResponse(
      'RLC',
      { R: dR, L: dL, C: dC, voltage: 10 },
      effectiveDuration / 1000,
      effectiveDuration,
      'step'
    );
  }, [dR, dL, dC, effectiveDuration]);

  const chartData = useMemo(() => {
    return response.data.map((point) => ({
      time: point.time * 1000,
      voltage: point.voltage,
      current: point.current * 1000,
    }));
  }, [response.data]);

  const handleReset = () => {
    setR(100);
    setL(0.1);
    setC(0.0001);
    setAutoDuration(true);
    setDuration(0.01);
  };

  return (
    <div className="space-y-6">
      {/* ROW 1: Sliders + Transfer Function / Pole Locations (2-col) */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CircuitParameterSliders
          R={R} L={L} C={C}
          onR={setR} onL={setL} onC={setC}
          circuitType="RLC"
          title="Circuit Parameters"
          duration={{ effectiveDuration, autoDuration, duration, onAutoDurationChange: setAutoDuration, onDurationChange: setDuration }}
          onReset={handleReset}
          rCrit={rCrit}
        />

        {/* Right: Transfer function + characteristic equation */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Transfer Function</h2>

          <div className="space-y-4 flex-1">
            <div className="bg-engineering-blue-50 dark:bg-engineering-blue-900/20 p-4 rounded-lg">
              <MathWrapper
                formula={`H(s) = \\frac{${numerator[0].toFixed(0)}}{s^2 + ${denominator[1].toFixed(2)}s + ${denominator[2].toFixed(0)}}`}
                block
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Characteristic Parameters:</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <MathWrapper formula="\alpha = \frac{R}{2L}" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">= {alpha.toFixed(2)} rad/s</p>
                </div>
                <div>
                  <MathWrapper formula="\omega_0 = \frac{1}{\sqrt{LC}}" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">= {omega0.toFixed(2)} rad/s</p>
                </div>
                <div>
                  <MathWrapper formula="\zeta = \frac{\alpha}{\omega_0}" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">= {zeta.toFixed(3)}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Pole Locations:</p>
              <div className="space-y-1">
                {poles.map((pole, idx) => (
                  <p key={idx} className="text-sm text-slate-700 dark:text-slate-300">
                    s<sub>{idx + 1}</sub> = {pole.real.toFixed(2)}
                    {pole.imag !== 0 && ` ${pole.imag > 0 ? '+' : ''}${pole.imag.toFixed(2)}j`}
                  </p>
                ))}
              </div>
            </div>

            <div className={`rounded-lg p-4 ${
              dampingType === 'Underdamped' ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' :
              dampingType === 'Overdamped' ? 'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500' :
              'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
            }`}>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Damping Type</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{dampingType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Pole-Zero Map + Step Response side-by-side */}
      <div className="grid lg:grid-cols-2 gap-6">
        <PoleZeroMap poleData={poleData} poles={poles} chartColors={chartColors} />
        <StepResponsePanel
          chartData={chartData}
          timeConstantMs={timeConstantMs}
          dampedPeriodMs={dampedPeriodMs}
          effectiveDuration={effectiveDuration}
          chartColors={chartColors}
        />
      </div>
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
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">S-Domain Analysis</h1>
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
            label: 'Interactive Lab',
            icon: <SlidersHorizontal className="w-4 h-4" />,
            content: <InteractiveTab />,
          },
          {
            label: 'Damping & Takeaways',
            icon: <Activity className="w-4 h-4" />,
            content: <DampingTab />,
          },
        ]}
      />
    </div>
  );
}
