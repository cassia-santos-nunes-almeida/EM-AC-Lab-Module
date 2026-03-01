import { describe, it, expect } from 'vitest';
import { calculateCircuitResponse, calculateTransferFunction } from '../circuitSolver';
import { classifyDamping, CRITICAL_DAMPING_TOLERANCE } from '../../types/circuit';

// Tolerance for floating-point comparisons
const TOL = 1e-6;

describe('classifyDamping', () => {
  it('returns underdamped when zeta < 1 - tolerance', () => {
    expect(classifyDamping(0.5)).toBe('underdamped');
    expect(classifyDamping(0.0)).toBe('underdamped');
    expect(classifyDamping(1 - CRITICAL_DAMPING_TOLERANCE - 0.001)).toBe('underdamped');
  });

  it('returns overdamped when zeta > 1 + tolerance', () => {
    expect(classifyDamping(2.0)).toBe('overdamped');
    expect(classifyDamping(1 + CRITICAL_DAMPING_TOLERANCE + 0.001)).toBe('overdamped');
  });

  it('returns critically-damped when zeta is within tolerance of 1', () => {
    expect(classifyDamping(1.0)).toBe('critically-damped');
    expect(classifyDamping(1 + CRITICAL_DAMPING_TOLERANCE)).toBe('critically-damped');
    expect(classifyDamping(1 - CRITICAL_DAMPING_TOLERANCE)).toBe('critically-damped');
  });
});

describe('calculateCircuitResponse — RC step', () => {
  const params = { R: 1000, L: 0.1, C: 0.000001, voltage: 5 };
  const tau = params.R * params.C; // 1ms

  it('starts at 0V and converges to Vs', () => {
    const result = calculateCircuitResponse('RC', params, 0.0001, 0.01);
    const first = result.data[0];
    const last = result.data[result.data.length - 1];

    expect(first.voltage).toBeCloseTo(0, 4);
    expect(last.voltage).toBeCloseTo(params.voltage, 1);
  });

  it('returns correct time constant', () => {
    const result = calculateCircuitResponse('RC', params, 0.0001, 0.01);
    expect(result.timeConstant).toBeCloseTo(tau, 8);
  });

  it('matches V = Vs*(1 - e^(-t/tau)) at t = tau', () => {
    const result = calculateCircuitResponse('RC', params, tau, 5 * tau);
    // at t = tau, voltage = Vs * (1 - 1/e) ≈ 0.6321 * Vs
    const atTau = result.data[1]; // index 1 = 1 * tau
    expect(atTau.voltage).toBeCloseTo(params.voltage * (1 - Math.exp(-1)), TOL);
  });

  it('current starts at Vs/R and decays to 0', () => {
    const result = calculateCircuitResponse('RC', params, 0.0001, 0.01);
    const first = result.data[0];
    const last = result.data[result.data.length - 1];

    expect(first.current).toBeCloseTo(params.voltage / params.R, TOL);
    expect(last.current).toBeCloseTo(0, 3);
  });
});

describe('calculateCircuitResponse — RL step', () => {
  const params = { R: 100, L: 0.1, C: 0.0001, voltage: 10 };
  const tau = params.L / params.R; // 1ms

  it('voltage starts at Vs and decays', () => {
    const result = calculateCircuitResponse('RL', params, 0.0001, 0.01);
    expect(result.data[0].voltage).toBeCloseTo(params.voltage, TOL);
    expect(result.data[result.data.length - 1].voltage).toBeCloseTo(0, 2);
  });

  it('current starts at 0 and converges to Vs/R', () => {
    const result = calculateCircuitResponse('RL', params, 0.0001, 0.01);
    expect(result.data[0].current).toBeCloseTo(0, TOL);
    expect(result.data[result.data.length - 1].current).toBeCloseTo(params.voltage / params.R, 2);
  });

  it('returns correct time constant', () => {
    const result = calculateCircuitResponse('RL', params, 0.0001, 0.01);
    expect(result.timeConstant).toBeCloseTo(tau, 8);
  });
});

describe('calculateCircuitResponse — RC impulse', () => {
  const params = { R: 1000, L: 0.1, C: 0.000001, voltage: 5 };

  it('impulse response decays from peak toward 0', () => {
    // Use longer duration (10*tau) so signal fully decays
    const result = calculateCircuitResponse('RC', params, 0.0001, 0.05, 'impulse');
    const first = result.data[0];
    const last = result.data[result.data.length - 1];

    // Impulse starts at Vs/(RC) and decays
    expect(Math.abs(first.voltage)).toBeGreaterThan(Math.abs(last.voltage));
    expect(last.voltage).toBeCloseTo(0, 2);
  });
});

describe('calculateCircuitResponse — RLC', () => {
  it('detects underdamped response (R = 10, L = 0.1, C = 100uF)', () => {
    const params = { R: 10, L: 0.1, C: 0.0001, voltage: 5 };
    const result = calculateCircuitResponse('RLC', params, 0.00001, 0.05);

    expect(result.dampingType).toBe('underdamped');
    expect(result.zeta).toBeDefined();
    expect(result.zeta!).toBeLessThan(1);
  });

  it('detects overdamped response (R = 1000, L = 0.1, C = 100uF)', () => {
    const params = { R: 1000, L: 0.1, C: 0.0001, voltage: 5 };
    const result = calculateCircuitResponse('RLC', params, 0.0001, 0.05);

    expect(result.dampingType).toBe('overdamped');
    expect(result.zeta!).toBeGreaterThan(1);
  });

  it('detects critically-damped response (R = 2*sqrt(L/C))', () => {
    const L = 0.1, C = 0.0001;
    const R = 2 * Math.sqrt(L / C); // exact critical damping
    const params = { R, L, C, voltage: 5 };
    const result = calculateCircuitResponse('RLC', params, 0.0001, 0.05);

    expect(result.dampingType).toBe('critically-damped');
  });

  it('underdamped step response overshoots Vs then settles', () => {
    const params = { R: 10, L: 0.1, C: 0.0001, voltage: 5 };
    const result = calculateCircuitResponse('RLC', params, 0.00001, 0.05);

    const maxVoltage = Math.max(...result.data.map(p => p.voltage));
    expect(maxVoltage).toBeGreaterThan(params.voltage);

    const last = result.data[result.data.length - 1];
    expect(last.voltage).toBeCloseTo(params.voltage, 0);
  });

  it('overdamped step response never exceeds Vs', () => {
    const params = { R: 1000, L: 0.1, C: 0.0001, voltage: 5 };
    const result = calculateCircuitResponse('RLC', params, 0.0001, 0.5);

    const maxVoltage = Math.max(...result.data.map(p => p.voltage));
    expect(maxVoltage).toBeLessThanOrEqual(params.voltage + TOL);
  });

  it('impulse response starts near 0 and returns to 0', () => {
    const params = { R: 10, L: 0.1, C: 0.0001, voltage: 5 };
    // Longer duration so the underdamped oscillation decays fully
    const result = calculateCircuitResponse('RLC', params, 0.00001, 0.5, 'impulse');

    expect(result.data[0].voltage).toBeCloseTo(0, 2);
    const last = result.data[result.data.length - 1];
    expect(last.voltage).toBeCloseTo(0, 1);
  });
});

describe('calculateTransferFunction', () => {
  it('returns correct numerator and denominator for RLC', () => {
    const R = 100, L = 0.1, C = 0.0001;
    const result = calculateTransferFunction(R, L, C);

    const omega0Sq = 1 / (L * C);
    const alpha = R / (2 * L);

    expect(result.numerator).toEqual([omega0Sq]);
    expect(result.denominator).toEqual([1, 2 * alpha, omega0Sq]);
  });

  it('returns two real poles for overdamped system', () => {
    const R = 1000, L = 0.1, C = 0.0001;
    const result = calculateTransferFunction(R, L, C);

    expect(result.poles).toHaveLength(2);
    // Overdamped: both poles are real (imag = 0)
    expect(result.poles[0].imag).toBe(0);
    expect(result.poles[1].imag).toBe(0);
    // Both poles should be negative (stable)
    expect(result.poles[0].real).toBeLessThan(0);
    expect(result.poles[1].real).toBeLessThan(0);
  });

  it('returns conjugate complex poles for underdamped system', () => {
    const R = 10, L = 0.1, C = 0.0001;
    const result = calculateTransferFunction(R, L, C);

    expect(result.poles).toHaveLength(2);
    // Underdamped: complex conjugate pair
    expect(result.poles[0].real).toBeCloseTo(result.poles[1].real, TOL);
    expect(result.poles[0].imag).toBeCloseTo(-result.poles[1].imag, TOL);
    expect(result.poles[0].imag).not.toBe(0);
    // Negative real part (stable)
    expect(result.poles[0].real).toBeLessThan(0);
  });

  it('returns empty zeros array', () => {
    const result = calculateTransferFunction(100, 0.1, 0.0001);
    expect(result.zeros).toEqual([]);
  });
});
