export const INTP = {
  interpolate: (n, Y1, Y2, Y3) => {
    const a = Y2 - Y1;
    const b = Y3 - Y2;
    const c = Y1 + Y3 - 2 * Y2;
    return Y2 + n / 2 * (a + b + n * c);
  },
  interpolate2:(n, Y1, Y2, Y3, Y4, Y5) => {
    const A = Y2 - Y1;
    const B = Y3 - Y2;
    const C = Y4 - Y3;
    const D = Y5 - Y4;
    const E = B - A;
    const F = C - B;
    const G = D - C;
    const H = F - E;
    const J = G - F;
    const K = J - H;
    const N2 = n * n;
    const N3 = N2 * n;
    const N4 = N3 * n;
    return Y3 + n * ((B + C) / 2 - (H + J) / 12) + N2 * (F / 2 - K / 24) + N3 * ((H + J) / 12) + N4 * (K / 24);
  },
  interpolateToHalves : (Y1, Y2, Y3, Y4) => (9 * (Y2 + Y3) - Y1 - Y4) / 16,
  lagrangeInterpolate : (X, n, pX, pY) => {
    let V = 0;
    for (let i = 1; i <= n; i++) {
      let C = 1;
      for (let j = 1; j <= n; j++) {
        if (j !== i) {
          C = C * (X - pX[j - 1]) / (pX[i - 1] - pX[j - 1]);
        }
      }
      V += C * pY[i - 1];
    }
    return V;
  },
  zero :(Y1, Y2, Y3) => {
    const a = Y2 - Y1;
    const b = Y3 - Y2;
    const c = Y1 + Y3 - 2 * Y2;
    let bRecalc = true;
    let n0prev = 0;
    let n0 = n0prev;
    while (bRecalc) {
      n0 = -2 * Y2 / (a + b + c * n0prev);
      bRecalc = (Math.abs(n0 - n0prev) > 1E-12);
      if (bRecalc) {
        n0prev = n0;
      }
    }
    return n0;
  },
  zeroB : (Y1, Y2, Y3, Y4, Y5) => {
    const A = Y2 - Y1;
    const B = Y3 - Y2;
    const C = Y4 - Y3;
    const D = Y5 - Y4;
    const E = B - A;
    const F = C - B;
    const G = D - C;
    const H = F - E;
    const J = G - F;
    const K = J - H;
    let bRecalc = true;
    let n0prev = 0;
    let n0 = n0prev;
    while (bRecalc) {
      const n0prev2 = n0prev * n0prev;
      const n0prev3 = n0prev2 * n0prev;
      const n0prev4 = n0prev3 * n0prev;
      n0 = (-24 * Y3 + n0prev2 * (K - 12 * F) - 2 * n0prev3 * (H + J) - n0prev4 * K) / (2 * (6 * B + 6 * C - H - J));
      bRecalc = (Math.abs(n0 - n0prev) > 1E-12);
      if (bRecalc) {
        n0prev = n0;
      }
    }
    return n0;
  },
  zero2 : (Y1, Y2, Y3) => {
    const a = Y2 - Y1;
    const b = Y3 - Y2;
    const c = Y1 + Y3 - 2 * Y2;
    let bRecalc = true;
    let n0prev = 0;
    let n0 = n0prev;
    while (bRecalc) {
      const deltan0 = -(2 * Y2 + n0prev * (a + b + c * n0prev)) / (a + b + 2 * c * n0prev);
      n0 = n0prev + deltan0;
      bRecalc = (Math.abs(deltan0) > 1E-12);
      if (bRecalc) {
        n0prev = n0;
      }
    }
    return n0;
  },
  zero2B : (Y1, Y2, Y3, Y4, Y5) => {
    const A = Y2 - Y1;
    const B = Y3 - Y2;
    const C = Y4 - Y3;
    const D = Y5 - Y4;
    const E = B - A;
    const F = C - B;
    const G = D - C;
    const H = F - E;
    const J = G - F;
    const K = J - H;
    const M = K / 24;
    const N = (H + J) / 12;
    const P = F / 2 - M;
    const Q = (B + C) / 2 - N;
    let bRecalc = true;
    let n0prev = 0;
    let n0 = n0prev;
    while (bRecalc) {
      const n0prev2 = n0prev * n0prev;
      const n0prev3 = n0prev2 * n0prev;
      const n0prev4 = n0prev3 * n0prev;
      const deltan0 = -(M * n0prev4 + N * n0prev3 + P * n0prev2 + Q * n0prev + Y3) / (4 * M * n0prev3 + 3 * N * n0prev2 + 2 * P * n0prev + Q);
      n0 = n0prev + deltan0;
      bRecalc = (Math.abs(deltan0) > 1E-12);
      if (bRecalc) {
        n0prev = n0;
      }
    }
    return n0;
  }
};