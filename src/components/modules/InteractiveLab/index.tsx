import { useState, useMemo, useDeferredValue } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { calculateCircuitResponse, type CircuitType, type InputType, type CircuitResponse } from '../../../utils/circuitSolver';
import { MathWrapper } from '../../common/MathWrapper';
import { ResponseChartTooltip } from '../../common/CircuitCharts';
import { CircuitParameterSliders } from '../../common/CircuitParameterSliders';
import { CircuitDiagram } from './CircuitDiagram';
import { useThemeStore } from '../../../store/progressStore';

/** Circuit equations panel showing formulas for the selected circuit/input type (F24). */
function CircuitEquations({ circuitType, inputType, response }: {
  circuitType: CircuitType;
  inputType: InputType;
  response: CircuitResponse;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Circuit Equations</h3>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          inputType === 'step'
            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
        }`}>
          {inputType === 'step' ? 'Step Response' : 'Impulse Response'}
        </span>
      </div>

      {circuitType === 'RC' && inputType === 'step' && (
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Time Constant:</p>
            <MathWrapper formula="\tau = RC" block />
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Voltage Response:</p>
            <MathWrapper formula="v_C(t) = V_s(1 - e^{-t/\tau})" block />
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Current Response:</p>
            <MathWrapper formula="i(t) = \frac{V_s}{R}e^{-t/\tau}" block />
          </div>
        </div>
      )}

      {circuitType === 'RC' && inputType === 'impulse' && (
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-3 border-amber-400 dark:border-amber-500">
            <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">Impulse response h(t) = derivative of step response</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Voltage (Impulse Response):</p>
              <MathWrapper formula="v_C(t) = \frac{1}{RC}e^{-t/\tau}" block />
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">S-Domain:</p>
              <MathWrapper formula="H(s) = \frac{1/RC}{s + 1/RC}" block />
            </div>
          </div>
        </div>
      )}

      {circuitType === 'RL' && inputType === 'step' && (
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Time Constant:</p>
            <MathWrapper formula="\tau = \frac{L}{R}" block />
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Current Response:</p>
            <MathWrapper formula="i(t) = \frac{V_s}{R}(1 - e^{-t/\tau})" block />
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Voltage Response:</p>
            <MathWrapper formula="v_L(t) = V_s e^{-t/\tau}" block />
          </div>
        </div>
      )}

      {circuitType === 'RL' && inputType === 'impulse' && (
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-3 border-amber-400 dark:border-amber-500">
            <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">Impulse response h(t) = derivative of step response</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Current (Impulse Response):</p>
              <MathWrapper formula="i(t) = \frac{1}{L}e^{-Rt/L}" block />
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">S-Domain:</p>
              <MathWrapper formula="H(s) = \frac{R/L}{s + R/L}" block />
            </div>
          </div>
        </div>
      )}

      {circuitType === 'RLC' && response.alpha && response.omega0 && response.zeta && (
        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Characteristic Parameters:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <MathWrapper formula="\alpha = \frac{R}{2L}" />
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">= {response.alpha.toFixed(2)} rad/s</span>
              </div>
              <div>
                <MathWrapper formula="\omega_0 = \frac{1}{\sqrt{LC}}" />
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">= {response.omega0.toFixed(2)} rad/s</span>
              </div>
              <div>
                <MathWrapper formula="\zeta = \frac{\alpha}{\omega_0}" />
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">= {response.zeta.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {inputType === 'impulse' && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-3 border-amber-400 dark:border-amber-500">
              <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">
                Impulse response: <MathWrapper formula="h(t) = \mathcal{L}^{-1}\{H(s)\}" /> — the most fundamental characterization of the system
              </p>
            </div>
          )}

          {response.dampingType === 'underdamped' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Underdamped {inputType === 'impulse' ? 'Impulse' : 'Step'} Response:
              </p>
              {inputType === 'step' ? (
                <MathWrapper formula="v_C(t) = V_s\left(1 - e^{-\alpha t}\left(\cos(\omega_d t) + \frac{\alpha}{\omega_d}\sin(\omega_d t)\right)\right)" block />
              ) : (
                <MathWrapper formula="h(t) = \frac{\omega_0^2}{\omega_d}\,e^{-\alpha t}\sin(\omega_d t)" block />
              )}
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                where <MathWrapper formula="\omega_d = \omega_0\sqrt{1-\zeta^2}" /> = {(response.omega0 * Math.sqrt(1 - response.zeta * response.zeta)).toFixed(2)} rad/s
              </p>
            </div>
          )}

          {response.dampingType === 'critically-damped' && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Critically Damped {inputType === 'impulse' ? 'Impulse' : 'Step'} Response:
              </p>
              {inputType === 'step' ? (
                <MathWrapper formula="v_C(t) = V_s(1 - e^{-\alpha t}(1 + \alpha t))" block />
              ) : (
                <MathWrapper formula="h(t) = \omega_0^2\,t\,e^{-\alpha t}" block />
              )}
            </div>
          )}

          {response.dampingType === 'overdamped' && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-500">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Overdamped {inputType === 'impulse' ? 'Impulse' : 'Step'} Response:
              </p>
              {inputType === 'step' ? (
                <>
                  <MathWrapper formula="v_C(t) = V_s(A_1 e^{s_1 t} + A_2 e^{s_2 t})" block />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">where s&#8321;, s&#8322; are the two distinct real roots</p>
                </>
              ) : (
                <MathWrapper formula="h(t) = \frac{\omega_0^2}{s_1 - s_2}(e^{s_1 t} - e^{s_2 t})" block />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** RLC circuit analysis sidebar showing damping info and parameters (F24). */
function RLCAnalysisPanel({ response, timeConstantMs }: {
  response: CircuitResponse;
  timeConstantMs: number;
}) {
  return (
    <div className="space-y-3 flex-1">
      <div className={`rounded-lg p-4 ${
        response.dampingType === 'underdamped' ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' :
        response.dampingType === 'critically-damped' ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' :
        'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500'
      }`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Damping Type</p>
        <p className="text-xl font-bold capitalize text-slate-900 dark:text-white mt-0.5">
          {response.dampingType!.replace('-', ' ')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Damping Coefficient &#945;</p>
          <p className="text-lg font-bold text-engineering-blue-700 dark:text-engineering-blue-400 mt-0.5">
            {response.alpha?.toFixed(2)} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">rad/s</span>
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Natural Frequency &#969;&#8320;</p>
          <p className="text-lg font-bold text-engineering-blue-700 dark:text-engineering-blue-400 mt-0.5">
            {response.omega0?.toFixed(2)} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">rad/s</span>
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Damping Ratio &#950;</p>
          <p className="text-lg font-bold text-engineering-blue-700 dark:text-engineering-blue-400 mt-0.5">
            {response.zeta?.toFixed(4)}
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Envelope &#964; = 1/&#945;</p>
          <p className="text-lg font-bold text-green-700 dark:text-green-400 mt-0.5">
            {timeConstantMs.toFixed(3)} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">ms</span>
          </p>
        </div>

        {response.dampingType === 'underdamped' && response.omega0 && response.zeta && (
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Damped Frequency &#969;<sub>d</sub></p>
            <p className="text-lg font-bold text-engineering-blue-700 dark:text-engineering-blue-400 mt-0.5">
              {(response.omega0 * Math.sqrt(1 - response.zeta * response.zeta)).toFixed(2)} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">rad/s</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** First-order (RC/RL) analysis sidebar showing time constant info (F24). */
function FirstOrderAnalysisPanel({ circuitType, response, R, L, C }: {
  circuitType: CircuitType;
  response: CircuitResponse;
  R: number;
  L: number;
  C: number;
}) {
  return (
    <div className="space-y-3 flex-1">
      <div className="bg-engineering-blue-50 dark:bg-engineering-blue-900/20 rounded-lg p-4 border-l-4 border-engineering-blue-500">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Time Constant &#964;</p>
        <p className="text-xl font-bold text-engineering-blue-700 dark:text-engineering-blue-400 mt-0.5">
          {response.timeConstant ? (response.timeConstant * 1000).toFixed(3) : '—'} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">ms</span>
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Formula</p>
        <div className="mt-1">
          {circuitType === 'RC'
            ? <MathWrapper formula={`\\tau = RC = ${R} \\times ${(C * 1e6).toFixed(1)} \\mu F = ${((R * C) * 1000).toFixed(3)}\\text{ ms}`} />
            : <MathWrapper formula={`\\tau = \\frac{L}{R} = \\frac{${(L * 1000).toFixed(1)}\\text{ mH}}{${R}\\;\\Omega} = ${((L / R) * 1000).toFixed(3)}\\text{ ms}`} />
          }
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">At t = &#964;</p>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
          Response reaches <span className="font-semibold text-engineering-blue-700 dark:text-engineering-blue-400">63.2%</span> of final value
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">At t = 5&#964;</p>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
          Response reaches <span className="font-semibold text-engineering-blue-700 dark:text-engineering-blue-400">99.3%</span> of final value (steady state)
        </p>
      </div>
    </div>
  );
}

export function InteractiveLab() {
  const [circuitType, setCircuitType] = useState<CircuitType>('RLC');
  const [inputType, setInputType] = useState<InputType>('step');
  const [R, setR] = useState(100);
  const [L, setL] = useState(0.1);
  const [C, setC] = useState(0.0001);
  const [voltage, setVoltage] = useState(10);
  const [duration, setDuration] = useState(0.01);
  const [autoDuration, setAutoDuration] = useState(false);
  const [showCurrent, setShowCurrent] = useState(true);
  const [showVoltage, setShowVoltage] = useState(true);

  const isDark = useThemeStore((s) => s.theme) === 'dark';
  const chartColors = {
    grid: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#cbd5e1' : '#475569',
    legend: isDark ? '#e2e8f0' : '#334155',
  };

  // Defer slider values so chart doesn't re-render on every pixel of drag
  const dR = useDeferredValue(R);
  const dL = useDeferredValue(L);
  const dC = useDeferredValue(C);
  const dV = useDeferredValue(voltage);

  // Compute the time constant for the current circuit
  const timeConstant = useMemo(() => {
    if (circuitType === 'RC') return dR * dC;
    if (circuitType === 'RL') return dL / dR;
    return (2 * dL) / dR;
  }, [circuitType, dR, dL, dC]);

  // R_crit for RLC: R = 2*sqrt(L/C)
  const rCrit = useMemo(() => {
    if (circuitType === 'RLC') return 2 * Math.sqrt(dL / dC);
    return null;
  }, [circuitType, dL, dC]);

  // Auto-duration: 5*tau, clamped to [1ms, 100ms]
  const effectiveDuration = useMemo(() => {
    if (autoDuration) {
      return Math.max(0.001, Math.min(0.1, 5 * timeConstant));
    }
    return duration;
  }, [autoDuration, timeConstant, duration]);

  const response = useMemo(() => {
    return calculateCircuitResponse(
      circuitType,
      { R: dR, L: dL, C: dC, voltage: dV },
      effectiveDuration / 1000,
      effectiveDuration,
      inputType
    );
  }, [circuitType, dR, dL, dC, dV, effectiveDuration, inputType]);

  const chartData = useMemo(() => {
    return response.data.map((point) => ({
      time: point.time * 1000,
      voltage: point.voltage,
      current: point.current * 1000,
    }));
  }, [response.data]);

  const timeConstantMs = timeConstant * 1000;

  const dampedPeriodMs = useMemo(() => {
    if (circuitType === 'RLC' && response.dampingType === 'underdamped' && response.omega0 && response.zeta) {
      const omegaD = response.omega0 * Math.sqrt(1 - response.zeta * response.zeta);
      return (2 * Math.PI / omegaD) * 1000;
    }
    return null;
  }, [circuitType, response]);

  const handleReset = () => {
    setR(100);
    setL(0.1);
    setC(0.0001);
    setVoltage(10);
    setDuration(0.01);
    setAutoDuration(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Interactive Lab</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Real-time circuit simulation and visualization
        </p>
      </div>

      {/* Circuit type tabs + input type toggle */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700">
        <div className="flex">
          {(['RC', 'RL', 'RLC'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setCircuitType(type)}
              className={`px-6 py-3 font-semibold text-sm transition-colors border-b-3 -mb-[2px] ${
                circuitType === type
                  ? 'border-engineering-blue-600 text-engineering-blue-700 dark:text-engineering-blue-400 bg-engineering-blue-50 dark:bg-engineering-blue-900/20'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {type} Circuit
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 mr-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-2 font-medium">Input:</span>
          {(['step', 'impulse'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setInputType(type)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors capitalize ${
                inputType === type
                  ? 'bg-engineering-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {type === 'step' ? 'Step u(t)' : 'Impulse \u03B4(t)'}
            </button>
          ))}
        </div>
      </div>

      {/* ROW 1: Config + Circuit Diagram (2-col) */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CircuitParameterSliders
          R={R} L={L} C={C}
          onR={setR} onL={setL} onC={setC}
          circuitType={circuitType}
          voltage={{ value: voltage, onChange: setVoltage }}
          duration={{ effectiveDuration, autoDuration, duration, onAutoDurationChange: setAutoDuration, onDurationChange: setDuration }}
          onReset={handleReset}
          rCrit={rCrit}
        />

        {/* Right: Circuit diagram */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{circuitType} Circuit Diagram</h2>
          <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-100 dark:border-slate-600">
            <CircuitDiagram type={circuitType} R={R} L={L} C={C} voltage={voltage} />
          </div>
        </div>
      </div>

      {/* ROW 2: Equations */}
      <CircuitEquations circuitType={circuitType} inputType={inputType} response={response} />

      {/* ROW 3: Chart + Analysis side by side */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Left: Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Response Visualization</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                inputType === 'step' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
              }`}>
                {inputType === 'step' ? 'Step Input u(t)' : 'Impulse Input \u03B4(t)'}
              </span>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showVoltage} onChange={(e) => setShowVoltage(e.target.checked)} className="w-4 h-4 accent-blue-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Voltage</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showCurrent} onChange={(e) => setShowCurrent(e.target.checked)} className="w-4 h-4 accent-red-500" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Current</span>
              </label>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="time" tick={{ fill: chartColors.text }} label={{ value: 'Time (ms)', position: 'insideBottom', offset: -5, fill: chartColors.text }} />
              <YAxis tick={{ fill: chartColors.text }} label={{ value: 'Voltage (V) / Current (mA)', angle: -90, position: 'insideLeft', fill: chartColors.text }} />
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
              {/* Damped period marker for underdamped RLC */}
              {dampedPeriodMs && dampedPeriodMs <= effectiveDuration * 1000 && (
                <ReferenceLine
                  x={dampedPeriodMs}
                  stroke="#7c3aed"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                  label={{ value: 'T\u1D48', position: 'top', fill: '#7c3aed', fontWeight: 'bold', fontSize: 13 }}
                />
              )}
              {showVoltage && (
                <Line type="monotone" dataKey="voltage" stroke="#3b82f6" name="Voltage" dot={false} strokeWidth={2} animationDuration={500} animationEasing="ease-out" />
              )}
              {showCurrent && (
                <Line type="monotone" dataKey="current" stroke="#ef4444" name="Current" dot={false} strokeWidth={2} animationDuration={500} animationEasing="ease-out" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Analysis panel */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Circuit Analysis</h2>

          {circuitType === 'RLC' && response.dampingType && (
            <RLCAnalysisPanel response={response} timeConstantMs={timeConstantMs} />
          )}

          {(circuitType === 'RC' || circuitType === 'RL') && (
            <FirstOrderAnalysisPanel circuitType={circuitType} response={response} R={R} L={L} C={C} />
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-engineering-blue-50 to-slate-50 dark:from-engineering-blue-900/20 dark:to-slate-800 rounded-lg shadow-md p-6 border-l-4 border-engineering-blue-600">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Experiment Tips</h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">&#8226;</span>
            <span><strong>RC Circuits:</strong> Increase R or C to slow down the response. The voltage across the capacitor rises exponentially.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">&#8226;</span>
            <span><strong>RL Circuits:</strong> Increase L or decrease R to slow the current rise. The inductor opposes rapid changes in current.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">&#8226;</span>
            <span><strong>RLC Circuits:</strong> Adjust R to change damping. Low R gives oscillations (underdamped), high R eliminates them (overdamped). The green R<sub>crit</sub> marker on the slider shows where critical damping occurs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-engineering-blue-600 font-bold mt-1">&#8226;</span>
            <span>The dashed green line on the chart marks the time constant &#964;. For underdamped RLC, the purple line marks one damped period T<sub>d</sub>.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
