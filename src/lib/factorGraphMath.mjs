/** Tiny, deterministic teaching models. Variances are in squared position units. */
export function fuseGaussian(observationB = 4, sigmaB = 2) {
  const factors = [{ mean: 0, sigma: 2 }, { mean: 2, sigma: 1 }, { mean: observationB, sigma: sigmaB }];
  const precision = factors.reduce((sum, f) => sum + 1 / f.sigma ** 2, 0);
  const mean = factors.reduce((sum, f) => sum + f.mean / f.sigma ** 2, 0) / precision;
  return { mean, variance: 1 / precision, factors };
}

export function binaryMessages(priorOne = 0.4, agreement = 0.9, evidenceOne = 0.8) {
  const prior = [1 - priorOne, priorOne];
  const evidence = [1 - evidenceOne, evidenceOne];
  const transition = [[agreement, 1 - agreement], [1 - agreement, agreement]];
  const message = prior.map((_, i) => transition[i].reduce((sum, f, j) => sum + f * evidence[j], 0));
  const forward = evidence.map((_, j) => prior.reduce((sum, p, i) => sum + p * transition[i][j], 0));
  const joint = prior.flatMap((p, i) => evidence.map((e, j) => p * transition[i][j] * e));
  const partition = joint.reduce((a, b) => a + b, 0);
  return {
    prior, evidence, transition, message, forward, joint, partition,
    marginalOne: prior.map((p, i) => p * message[i] / partition),
    marginalTwo: evidence.map((e, j) => e * forward[j] / partition),
  };
}

// Partial pivoting suffices for this well-conditioned 3 × 3 teaching system.
// Larger problems should use sparse QR/Cholesky, never an explicit matrix inverse.
export function solveLinear(matrix, vector) {
  const n = vector.length;
  const a = matrix.map((row, i) => [...row, vector[i]]);
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(a[i][k]) > Math.abs(a[pivot][k])) pivot = i;
    if (Math.abs(a[pivot][k]) < 1e-12) throw new Error('约束不足：系统存在未固定的自由度。');
    [a[k], a[pivot]] = [a[pivot], a[k]];
    for (let i = k + 1; i < n; i++) {
      const ratio = a[i][k] / a[k][k];
      for (let j = k; j <= n; j++) a[i][j] -= ratio * a[k][j];
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = (a[i][n] - a[i].slice(i + 1, n).reduce((sum, v, j) => sum + v * x[i + 1 + j], 0)) / a[i][i];
  }
  return x;
}

export function trajectoryEstimate({ observation = 2.4, sigma = 0.5, loop = false, absolute = true } = {}) {
  const factors = [
    { name: '运动 1', row: [-1, 1, 0], value: 1, sigma: 0.5 },
    { name: '运动 2', row: [0, -1, 1], value: 1, sigma: 0.5 },
  ];
  if (absolute) {
    factors.unshift({ name: '先验', row: [1, 0, 0], value: 0, sigma: 1 });
    factors.push({ name: '末端观测', row: [0, 0, 1], value: observation, sigma });
  }
  if (loop) factors.push({ name: '回环', row: [-1, 0, 1], value: 2, sigma: 0.2 });
  const information = Array.from({ length: 3 }, () => Array(3).fill(0));
  const rhs = Array(3).fill(0);
  for (const f of factors) {
    for (let i = 0; i < 3; i++) {
      rhs[i] += f.row[i] * f.value / f.sigma ** 2;
      for (let j = 0; j < 3; j++) information[i][j] += f.row[i] * f.row[j] / f.sigma ** 2;
    }
  }
  try {
    const state = solveLinear(information, rhs);
    const residuals = factors.map((f) => ({ ...f, whitened: (f.row.reduce((sum, a, i) => sum + a * state[i], 0) - f.value) / f.sigma }));
    return { state, information, rhs, residuals, cost: residuals.reduce((sum, f) => sum + 0.5 * f.whitened ** 2, 0), error: null };
  } catch (error) {
    return { state: null, information, rhs, residuals: [], cost: null, error: error.message };
  }
}
