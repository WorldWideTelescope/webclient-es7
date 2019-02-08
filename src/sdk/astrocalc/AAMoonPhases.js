import {CT} from './AACoordinateTransformation';


const k = (Year) => {
  return 12.3685 * (Year - 2000);
};
const meanPhase = k => {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;
  return 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 - 1.5E-07 * T3 + 7.3E-10 * T4;
};
const truePhase = k => {
  let JD = meanPhase(k);
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;
  const E = 1 - 0.002516 * T - 7.4E-06 * T2;
  const E2 = E * E;
  let M = CT.m360(2.5534 + 29.1053567 * k - 1.4E-06 * T2 - 1.1E-07 * T3);
  M = CT.d2R(M);
  let Mdash = CT.m360(201.5643 + 385.81693528 * k + 0.0107582 * T2 + 1.238E-05 * T3 - 5.8E-08 * T4);
  Mdash = CT.d2R(Mdash);
  let F = CT.m360(160.7108 + 390.67050284 * k - 0.0016118 * T2 - 2.27E-06 * T3 + 1E-08 * T4);
  F = CT.d2R(F);
  let omega = CT.m360(124.7746 - 1.56375588 * k + 0.0020672 * T2 + 2.15E-06 * T3);
  omega = CT.d2R(omega);
  let A1 = CT.m360(299.77 + 0.107408 * k - 0.009173 * T2);
  A1 = CT.d2R(A1);
  let A2 = CT.m360(251.88 + 0.016321 * k);
  A2 = CT.d2R(A2);
  let A3 = CT.m360(251.83 + 26.651886 * k);
  A3 = CT.d2R(A3);
  let A4 = CT.m360(349.42 + 36.412478 * k);
  A4 = CT.d2R(A4);
  let A5 = CT.m360(84.66 + 18.206239 * k);
  A5 = CT.d2R(A5);
  let A6 = CT.m360(141.74 + 53.303771 * k);
  A6 = CT.d2R(A6);
  let A7 = CT.m360(207.14 + 2.453732 * k);
  A7 = CT.d2R(A7);
  let A8 = CT.m360(154.84 + 7.30686 * k);
  A8 = CT.d2R(A8);
  let A9 = CT.m360(34.52 + 27.261239 * k);
  A9 = CT.d2R(A9);
  let A10 = CT.m360(207.19 + 0.121824 * k);
  A10 = CT.d2R(A10);
  let A11 = CT.m360(291.34 + 1.844379 * k);
  A11 = CT.d2R(A11);
  let A12 = CT.m360(161.72 + 24.198154 * k);
  A12 = CT.d2R(A12);
  let A13 = CT.m360(239.56 + 25.513099 * k);
  A13 = CT.d2R(A13);
  let A14 = CT.m360(331.55 + 3.592518 * k);
  A14 = CT.d2R(A14);
  const kint = Math.floor(k);
  let kfrac = k - kint;
  if (kfrac < 0) {
    kfrac = 1 + kfrac;
  }
  let DeltaJD;
  if (!kfrac) {
    DeltaJD = -0.4072 * Math.sin(Mdash) + 0.17241 * E * Math.sin(M) + 0.01608 * Math.sin(2 * Mdash) + 0.01039 * Math.sin(2 * F) + 0.00739 * E * Math.sin(Mdash - M) + -0.00514 * E * Math.sin(Mdash + M) + 0.00208 * E2 * Math.sin(2 * M) + -0.00111 * Math.sin(Mdash - 2 * F) + -0.00057 * Math.sin(Mdash + 2 * F) + 0.00056 * E * Math.sin(2 * Mdash + M) + -0.00042 * Math.sin(3 * Mdash) + 0.00042 * E * Math.sin(M + 2 * F) + 0.00038 * E * Math.sin(M - 2 * F) + -0.00024 * E * Math.sin(2 * Mdash - M) + -0.00017 * Math.sin(omega) + -7E-05 * Math.sin(Mdash + 2 * M) + 4E-05 * Math.sin(2 * Mdash - 2 * F) + 4E-05 * Math.sin(3 * M) + 3E-05 * Math.sin(Mdash + M - 2 * F) + 3E-05 * Math.sin(2 * Mdash + 2 * F) + -3E-05 * Math.sin(Mdash + M + 2 * F) + 3E-05 * Math.sin(Mdash - M + 2 * F) + -2E-05 * Math.sin(Mdash - M - 2 * F) + -2E-05 * Math.sin(3 * Mdash + M) + 2E-05 * Math.sin(4 * Mdash);
    JD += DeltaJD;
  }
  else if ((kfrac === 0.25) || (kfrac === 0.75)) {
    DeltaJD = -0.62801 * Math.sin(Mdash) + 0.17172 * E * Math.sin(M) + -0.01183 * E * Math.sin(Mdash + M) + 0.00862 * Math.sin(2 * Mdash) + 0.00804 * Math.sin(2 * F) + 0.00454 * E * Math.sin(Mdash - M) + 0.00204 * E2 * Math.sin(2 * M) + -0.0018 * Math.sin(Mdash - 2 * F) + -0.0007 * Math.sin(Mdash + 2 * F) + -0.0004 * Math.sin(3 * Mdash) + -0.00034 * E * Math.sin(2 * Mdash - M) + 0.00032 * E * Math.sin(M + 2 * F) + 0.00032 * E * Math.sin(M - 2 * F) + -0.00028 * E2 * Math.sin(Mdash + 2 * M) + 0.00027 * E * Math.sin(2 * Mdash + M) + -0.00017 * Math.sin(omega) + -5E-05 * Math.sin(Mdash - M - 2 * F) + 4E-05 * Math.sin(2 * Mdash + 2 * F) + -4E-05 * Math.sin(Mdash + M + 2 * F) + 4E-05 * Math.sin(Mdash - 2 * M) + 3E-05 * Math.sin(Mdash + M - 2 * F) + 3E-05 * Math.sin(3 * M) + 2E-05 * Math.sin(2 * Mdash - 2 * F) + 2E-05 * Math.sin(Mdash - M + 2 * F) + -2E-05 * Math.sin(3 * Mdash + M);
    JD += DeltaJD;
    const W = 0.00306 - 0.00038 * E * Math.cos(M) + 0.00026 * Math.cos(Mdash) - 2E-05 * Math.cos(Mdash - M) + 2E-05 * Math.cos(Mdash + M) + 2E-05 * Math.cos(2 * F);
    if (kfrac === 0.25) {
      JD += W;
    }
    else {
      JD -= W;
    }
  }
  else if (kfrac === 0.5) {
    DeltaJD = -0.40614 * Math.sin(Mdash) + 0.17302 * E * Math.sin(M) + 0.01614 * Math.sin(2 * Mdash) + 0.01043 * Math.sin(2 * F) + 0.00734 * E * Math.sin(Mdash - M) + -0.00514 * E * Math.sin(Mdash + M) + 0.00209 * E2 * Math.sin(2 * M) + -0.00111 * Math.sin(Mdash - 2 * F) + -0.00057 * Math.sin(Mdash + 2 * F) + 0.00056 * E * Math.sin(2 * Mdash + M) + -0.00042 * Math.sin(3 * Mdash) + 0.00042 * E * Math.sin(M + 2 * F) + 0.00038 * E * Math.sin(M - 2 * F) + -0.00024 * E * Math.sin(2 * Mdash - M) + -0.00017 * Math.sin(omega) + -7E-05 * Math.sin(Mdash + 2 * M) + 4E-05 * Math.sin(2 * Mdash - 2 * F) + 4E-05 * Math.sin(3 * M) + 3E-05 * Math.sin(Mdash + M - 2 * F) + 3E-05 * Math.sin(2 * Mdash + 2 * F) + -3E-05 * Math.sin(Mdash + M + 2 * F) + 3E-05 * Math.sin(Mdash - M + 2 * F) + -2E-05 * Math.sin(Mdash - M - 2 * F) + -2E-05 * Math.sin(3 * Mdash + M) + 2E-05 * Math.sin(4 * Mdash);
    JD += DeltaJD;
  }
  else {
    console.assert(false);
  }
  const DeltaJD2 = 0.000325 * Math.sin(A1) + 0.000165 * Math.sin(A2) + 0.000164 * Math.sin(A3) + 0.000126 * Math.sin(A4) + 0.00011 * Math.sin(A5) + 6.2E-05 * Math.sin(A6) + 6E-05 * Math.sin(A7) + 5.6E-05 * Math.sin(A8) + 4.7E-05 * Math.sin(A9) + 4.2E-05 * Math.sin(A10) + 4E-05 * Math.sin(A11) + 3.7E-05 * Math.sin(A12) + 3.5E-05 * Math.sin(A13) + 2.3E-05 * Math.sin(A14);
  JD += DeltaJD2;
  return JD;
};

export const CAAMoonPhases = {
  k,
  meanPhase,
  truePhase
};