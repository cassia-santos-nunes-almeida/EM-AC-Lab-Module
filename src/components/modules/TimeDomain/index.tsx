import { useState } from 'react';
import { MathWrapper } from '../../common/MathWrapper';
import { CollapsibleSection } from '../../common/CollapsibleSection';
import { ConceptCheck } from '../../common/ConceptCheck';
import { ModuleNavigation } from '../../common/ModuleNavigation';
import { circuitAnalysisFormulas } from '../../../utils/componentMath';
import { CircuitComparisonLayout } from './CircuitComparisonLayout';
import { MethodComparisonTable } from './MethodComparisonTable';
import { ResponseComparisons } from './ResponseComparisons';

import type { CircuitType } from '../../../types/circuit';

export function TimeDomain() {
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitType>('RC');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Circuit Analysis</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Comparing time-domain differential equations with Laplace transform s-domain methods
        </p>
      </div>

      <div className="flex border-b-2 border-slate-200 dark:border-slate-700">
        {(['RC', 'RL', 'RLC'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedCircuit(type)}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-3 -mb-[2px] ${
              selectedCircuit === type
                ? 'border-engineering-blue-600 text-engineering-blue-700 dark:text-engineering-blue-400 bg-engineering-blue-50 dark:bg-engineering-blue-900/20'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {type} Circuit
          </button>
        ))}
      </div>

      {selectedCircuit === 'RC' && <RCCircuitComparison />}
      {selectedCircuit === 'RL' && <RLCircuitComparison />}
      {selectedCircuit === 'RLC' && <RLCCircuitComparison />}

      {selectedCircuit === 'RC' && (
        <ConceptCheck data={{
          mode: 'predict-reveal',
          question: 'If you double R in an RC circuit, what happens to the time constant τ?',
          answer: 'τ = RC, so doubling R doubles the time constant. The circuit responds twice as slowly — it takes twice as long to reach 63.2% of the final value.',
        }} />
      )}
      {selectedCircuit === 'RL' && (
        <ConceptCheck data={{
          mode: 'predict-reveal',
          question: 'If you double R in an RL circuit, what happens to the time constant τ?',
          answer: 'τ = L/R, so doubling R halves the time constant. The circuit responds twice as fast — opposite to the RC case! This is because higher R dissipates energy faster.',
        }} />
      )}
      {selectedCircuit === 'RLC' && (
        <ConceptCheck data={{
          mode: 'predict-reveal',
          question: 'For a 3rd-order circuit, which method (time-domain or s-domain) would be easier and why?',
          answer: 'The s-domain method is much easier. A 3rd-order circuit requires solving a 3rd-order ODE in the time domain (very tedious), but in the s-domain it\'s just a 3rd-degree polynomial in s — solve algebraically, find poles, and inverse-transform.',
        }} />
      )}

      <CollapsibleSection title="Method Comparison" defaultOpen={true}>
        <MethodComparisonTable />
      </CollapsibleSection>
      <CollapsibleSection title="Circuit Response Types" defaultOpen={false}>
        <ResponseComparisons />
      </CollapsibleSection>

      <ModuleNavigation />
    </div>
  );
}

function RCCircuitComparison() {
  return (
    <CircuitComparisonLayout
      timeContent={<>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Circuit Setup</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Consider a series RC circuit with a voltage source <MathWrapper formula="V_s" />,
              resistor <MathWrapper formula="R" />, and capacitor <MathWrapper formula="C" />.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 1: Apply KVL</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Kirchhoff's Voltage Law around the loop:
            </p>
            <MathWrapper formula="V_s = v_R + v_C" block />
            <MathWrapper formula="V_s = iR + v_C" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 2: Use Constitutive Law</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              For a capacitor: <MathWrapper formula="i = C\frac{dv_C}{dt}" />
            </p>
            <MathWrapper formula="V_s = RC\frac{dv_C}{dt} + v_C" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 3: Solve ODE</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              This is a first-order linear ODE. Rearranging:
            </p>
            <MathWrapper formula="\frac{dv_C}{dt} + \frac{1}{RC}v_C = \frac{V_s}{RC}" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 mb-2">
              Time constant: <MathWrapper formula="\tau = RC" />
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Solution (assuming <MathWrapper formula="v_C(0) = 0" />):
            </p>
            <MathWrapper formula={circuitAnalysisFormulas.rc.voltage} block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 4: Find Current</h4>
            <MathWrapper formula="i(t) = C\frac{dv_C}{dt} = \frac{V_s}{R}e^{-t/\tau}" block />
          </div>
      </>}
      sContent={<>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Circuit Setup</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Same RC circuit, but we'll transform to the s-domain using Laplace transforms.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 1: Transform to S-Domain</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Apply Laplace transform to the time-domain equation:
            </p>
            <MathWrapper formula="\mathcal{L}\{V_s\} = \mathcal{L}\{iR + v_C\}" block />
            <MathWrapper formula="\frac{V_s}{s} = RI(s) + V_C(s)" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 2: Capacitor Impedance</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              In s-domain, capacitor impedance is:
            </p>
            <MathWrapper formula="Z_C(s) = \frac{1}{sC}" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 mb-2">
              Using Ohm's law in s-domain:
            </p>
            <MathWrapper formula="V_C(s) = I(s) \cdot \frac{1}{sC}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 3: Solve Algebraically</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Substitute and solve for <MathWrapper formula="I(s)" />:
            </p>
            <MathWrapper formula="\frac{V_s}{s} = I(s)\left(R + \frac{1}{sC}\right)" block />
            <MathWrapper formula="I(s) = \frac{V_s/s}{R + \frac{1}{sC}} = \frac{V_s C}{s(RCs + 1)}" block />
            <MathWrapper formula="I(s) = \frac{V_s}{R} \cdot \frac{1}{s + \frac{1}{RC}}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 4: Inverse Transform</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Using the transform pair <MathWrapper formula="\mathcal{L}^{-1}\{\frac{1}{s+a}\} = e^{-at}" />:
            </p>
            <MathWrapper formula="i(t) = \frac{V_s}{R}e^{-t/RC}" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
              For voltage:
            </p>
            <MathWrapper formula="v_C(t) = V_s(1 - e^{-t/RC})" block />
          </div>
      </>}
      conclusion={
        <p className="text-slate-700 dark:text-slate-300">
          Both methods yield the <strong>identical result</strong>! The time-domain approach
          requires solving a differential equation, while the s-domain approach transforms
          it into an algebraic problem. For simple circuits, both are manageable, but for
          complex circuits, the s-domain method is significantly easier.
        </p>
      }
    />
  );
}

function RLCircuitComparison() {
  return (
    <CircuitComparisonLayout
      timeContent={<>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Circuit Setup</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Consider a series RL circuit with voltage source <MathWrapper formula="V_s" />,
              resistor <MathWrapper formula="R" />, and inductor <MathWrapper formula="L" />.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 1: Apply KVL</h4>
            <MathWrapper formula="V_s = v_R + v_L" block />
            <MathWrapper formula="V_s = iR + v_L" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 2: Use Constitutive Law</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              For an inductor: <MathWrapper formula="v_L = L\frac{di}{dt}" />
            </p>
            <MathWrapper formula="V_s = iR + L\frac{di}{dt}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 3: Solve ODE</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Rearranging:
            </p>
            <MathWrapper formula="\frac{di}{dt} + \frac{R}{L}i = \frac{V_s}{L}" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 mb-2">
              Time constant: <MathWrapper formula="\tau = \frac{L}{R}" />
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Solution (assuming <MathWrapper formula="i(0) = 0" />):
            </p>
            <MathWrapper formula={circuitAnalysisFormulas.rl.current} block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 4: Find Voltage</h4>
            <MathWrapper formula="v_L(t) = L\frac{di}{dt} = V_s e^{-Rt/L}" block />
          </div>
      </>}
      sContent={<>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Circuit Setup</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Same RL circuit, transformed to the s-domain.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 1: Transform to S-Domain</h4>
            <MathWrapper formula="\frac{V_s}{s} = I(s)R + V_L(s)" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 2: Inductor Impedance</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              In s-domain, inductor impedance is:
            </p>
            <MathWrapper formula="Z_L(s) = sL" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 mb-2">
              Therefore:
            </p>
            <MathWrapper formula="V_L(s) = I(s) \cdot sL" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 3: Solve Algebraically</h4>
            <MathWrapper formula="\frac{V_s}{s} = I(s)(R + sL)" block />
            <MathWrapper formula="I(s) = \frac{V_s}{s(R + sL)} = \frac{V_s}{sR(1 + \frac{sL}{R})}" block />
            <MathWrapper formula="I(s) = \frac{V_s}{R} \cdot \frac{1}{s(1 + \frac{sL}{R})} = \frac{V_s}{R}\left(\frac{1}{s} - \frac{1}{s + \frac{R}{L}}\right)" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 4: Inverse Transform</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Using standard transform pairs:
            </p>
            <MathWrapper formula="i(t) = \frac{V_s}{R}(1 - e^{-Rt/L})" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
              For voltage across inductor:
            </p>
            <MathWrapper formula="v_L(t) = V_s e^{-Rt/L}" block />
          </div>
      </>}
      conclusion={
        <p className="text-slate-700 dark:text-slate-300">
          Again, both approaches give the <strong>same result</strong>. The RL circuit behaves
          similarly to the RC circuit with an exponential rise in current and exponential decay
          in voltage across the inductor. The time constant <MathWrapper formula="\tau = L/R" />
          determines the response speed.
        </p>
      }
    />
  );
}

function RLCCircuitComparison() {
  return (
    <CircuitComparisonLayout
      timeContent={<>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Circuit Setup</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Series RLC circuit with <MathWrapper formula="V_s" />, <MathWrapper formula="R" />,
              <MathWrapper formula="L" />, and <MathWrapper formula="C" />.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 1: Apply KVL</h4>
            <MathWrapper formula="V_s = v_R + v_L + v_C" block />
            <MathWrapper formula="V_s = iR + L\frac{di}{dt} + v_C" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 2: Express in Terms of Voltage</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Since <MathWrapper formula="i = C\frac{dv_C}{dt}" />:
            </p>
            <MathWrapper formula="V_s = RC\frac{dv_C}{dt} + LC\frac{d^2v_C}{dt^2} + v_C" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 3: Standard Form</h4>
            <MathWrapper formula="\frac{d^2v_C}{dt^2} + \frac{R}{L}\frac{dv_C}{dt} + \frac{1}{LC}v_C = \frac{V_s}{LC}" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Define parameters:
            </p>
            <MathWrapper formula="\alpha = \frac{R}{2L}" block />
            <MathWrapper formula="\omega_0 = \frac{1}{\sqrt{LC}}" block />
            <MathWrapper formula="\zeta = \frac{\alpha}{\omega_0}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 4: Solutions by Damping Type</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Overdamped</strong> (<MathWrapper formula="\zeta > 1" />):
            </p>
            <MathWrapper formula={circuitAnalysisFormulas.rlc.overdamped} block />

            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 mt-3">
              <strong>Critically Damped</strong> (<MathWrapper formula="\zeta = 1" />):
            </p>
            <MathWrapper formula={circuitAnalysisFormulas.rlc.criticallyDamped} block />

            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 mt-3">
              <strong>Underdamped</strong> (<MathWrapper formula="\zeta < 1" />):
            </p>
            <MathWrapper formula={circuitAnalysisFormulas.rlc.underdamped} block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              where <MathWrapper formula="\omega_d = \omega_0\sqrt{1-\zeta^2}" />
            </p>
          </div>
      </>}
      sContent={<>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Circuit Setup</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Same RLC circuit, transformed to s-domain. Much simpler!
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 1: Component Impedances</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              In s-domain:
            </p>
            <MathWrapper formula="Z_R(s) = R" block />
            <MathWrapper formula="Z_L(s) = sL" block />
            <MathWrapper formula="Z_C(s) = \frac{1}{sC}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 2: Total Impedance</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Series impedance:
            </p>
            <MathWrapper formula="Z_{total}(s) = R + sL + \frac{1}{sC}" block />
            <MathWrapper formula="Z_{total}(s) = \frac{s^2LC + sRC + 1}{sC}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 3: Transfer Function</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Current in s-domain:
            </p>
            <MathWrapper formula="I(s) = \frac{V_s/s}{Z_{total}(s)}" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 mb-2">
              Voltage across capacitor:
            </p>
            <MathWrapper formula="V_C(s) = I(s) \cdot \frac{1}{sC}" block />
            <MathWrapper formula="V_C(s) = \frac{V_s}{s^2LC + sRC + 1}" block />
            <MathWrapper formula="V_C(s) = \frac{V_s/LC}{s(s^2 + \frac{R}{L}s + \frac{1}{LC})}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 4: Find Poles</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Characteristic equation:
            </p>
            <MathWrapper formula="s^2 + \frac{R}{L}s + \frac{1}{LC} = 0" block />
            <MathWrapper formula="s^2 + 2\alpha s + \omega_0^2 = 0" block />
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 mb-2">
              Poles:
            </p>
            <MathWrapper formula="s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}" block />
          </div>

          <div className="bg-white dark:bg-slate-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Step 5: Inverse Transform</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Depending on pole locations (real vs complex), we get:
            </p>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1 ml-4">
              <li>• Two real poles → Overdamped</li>
              <li>• One repeated real pole → Critically damped</li>
              <li>• Complex conjugate poles → Underdamped</li>
            </ul>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">
              The inverse Laplace transform yields the same time-domain solutions!
            </p>
          </div>
      </>}
      conclusion={<>
        <p className="text-slate-700 dark:text-slate-300 mb-3">
          For the RLC circuit, the s-domain advantage becomes clear! Instead of solving a
          second-order differential equation with multiple cases, we:
        </p>
        <ol className="text-slate-700 dark:text-slate-300 space-y-2 ml-6 list-decimal">
          <li>Find the transfer function algebraically</li>
          <li>Determine the pole locations</li>
          <li>Apply inverse Laplace transform based on pole type</li>
        </ol>
        <p className="text-slate-700 dark:text-slate-300 mt-3">
          The damping behavior (<MathWrapper formula="\zeta" />) directly relates to pole
          positions in the s-plane, providing deep physical insight!
        </p>
      </>}
    />
  );
}
