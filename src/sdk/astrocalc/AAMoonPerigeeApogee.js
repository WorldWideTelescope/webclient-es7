import GFX from './GFX';

const k = Year => 13.2555 * (Year - 1999.97);
const meanPerigee = k => {
  const T = k / 1325.55;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  return 2451534.6698 + 27.55454989 * k - 0.0006691 * Tsquared - 1.098E-06 * Tcubed + 5.2E-09 * T4;
};
const meanApogee = k => meanPerigee(k);
const truePerigee = k => {
  const MeanJD = meanPerigee(k);
  const T = k / 1325.55;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  let D = CT.m360(171.9179 + 335.9106046 * k - 0.0100383 * Tsquared - 1.156E-05 * Tcubed + 5.5E-08 * T4);
  D = CT.d2R(D);
  let M = CT.m360(347.3477 + 27.1577721 * k - 0.000813 * Tsquared - 1E-06 * Tcubed);
  M = CT.d2R(M);
  let F = CT.m360(316.6109 + 364.5287911 * k - 0.0125053 * Tsquared - 1.48E-05 * Tcubed);
  F = CT.d2R(F);
  const nPerigeeCoefficients = GFX.g_MoonPerigeeApogeeCoefficients1.length;
  let Sigma = 0;
  for (let i = 0; i < nPerigeeCoefficients; i++) {
    Sigma += GFX.g_MoonPerigeeApogeeCoefficients1[i].c * Math.sin(D * GFX.g_MoonPerigeeApogeeCoefficients1[i].d + M * GFX.g_MoonPerigeeApogeeCoefficients1[i].m + F * GFX.g_MoonPerigeeApogeeCoefficients1[i].f + T * GFX.g_MoonPerigeeApogeeCoefficients1[i].t);
  }
  return MeanJD + Sigma;
};
const trueApogee = k => {
  const MeanJD = meanApogee(k);
  const T = k / 1325.55;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  let D = CT.m360(171.9179 + 335.9106046 * k - 0.0100383 * Tsquared - 1.156E-05 * Tcubed + 5.5E-08 * T4);
  D = CT.d2R(D);
  let M = CT.m360(347.3477 + 27.1577721 * k - 0.000813 * Tsquared - 1E-06 * Tcubed);
  M = CT.d2R(M);
  let F = CT.m360(316.6109 + 364.5287911 * k - 0.0125053 * Tsquared - 1.48E-05 * Tcubed);
  F = CT.d2R(F);
  const nApogeeCoefficients = GFX.g_MoonPerigeeApogeeCoefficients2.length;
  let Sigma = 0;
  for (let i = 0; i < nApogeeCoefficients; i++) {
    Sigma += (GFX.g_MoonPerigeeApogeeCoefficients2[i].c + T * GFX.g_MoonPerigeeApogeeCoefficients2[i].t) * Math.sin(D * GFX.g_MoonPerigeeApogeeCoefficients2[i].d + M * GFX.g_MoonPerigeeApogeeCoefficients2[i].m + F * GFX.g_MoonPerigeeApogeeCoefficients2[i].f);
  }
  return MeanJD + Sigma;
};
const perigeeParallax = k => {
  const T = k / 1325.55;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  let D = CT.m360(171.9179 + 335.9106046 * k - 0.0100383 * Tsquared - 1.156E-05 * Tcubed + 5.5E-08 * T4);
  D = CT.d2R(D);
  let M = CT.m360(347.3477 + 27.1577721 * k - 0.000813 * Tsquared - 1E-06 * Tcubed);
  M = CT.d2R(M);
  let F = CT.m360(316.6109 + 364.5287911 * k - 0.0125053 * Tsquared - 1.48E-05 * Tcubed);
  F = CT.d2R(F);
  const nPerigeeCoefficients = GFX.g_MoonPerigeeApogeeCoefficients3.length;
  let Parallax = 3629.215;
  for (let i = 0; i < nPerigeeCoefficients; i++) {
    Parallax += (GFX.g_MoonPerigeeApogeeCoefficients3[i].c + T * GFX.g_MoonPerigeeApogeeCoefficients3[i].t) * Math.cos(D * GFX.g_MoonPerigeeApogeeCoefficients3[i].d + M * GFX.g_MoonPerigeeApogeeCoefficients3[i].m + F * GFX.g_MoonPerigeeApogeeCoefficients3[i].f);
  }
  return Parallax / 3600;
};
const apogeeParallax = k => {
  const T = k / 1325.55;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  let D = CT.m360(171.9179 + 335.9106046 * k - 0.0100383 * Tsquared - 1.156E-05 * Tcubed + 5.5E-08 * T4);
  D = CT.d2R(D);
  let M = CT.m360(347.3477 + 27.1577721 * k - 0.000813 * Tsquared - 1E-06 * Tcubed);
  M = CT.d2R(M);
  let F = CT.m360(316.6109 + 364.5287911 * k - 0.0125053 * Tsquared - 1.48E-05 * Tcubed);
  F = CT.d2R(F);
  const nApogeeCoefficients = GFX.g_MoonPerigeeApogeeCoefficients4.length;
  let Parallax = 3245.251;
  for (let i = 0; i < nApogeeCoefficients; i++) {
    Parallax += (GFX.g_MoonPerigeeApogeeCoefficients4[i].c + T * GFX.g_MoonPerigeeApogeeCoefficients4[i].t) * Math.cos(D * GFX.g_MoonPerigeeApogeeCoefficients4[i].d + M * GFX.g_MoonPerigeeApogeeCoefficients4[i].m + F * GFX.g_MoonPerigeeApogeeCoefficients4[i].f);
  }
  return Parallax / 3600;
};

export function MPAC(D, M, F, C, T) {
  this.d = 0;
  this.m = 0;
  this.f = 0;
  this.c = 0;
  this.t = 0;
  this.d = D;
  this.m = M;
  this.f = F;
  this.c = C;
  this.t = T;
}

export const CAAMoonPerigeeApogee = {
  k,
  meanApogee,
  meanPerigee,
  trueApogee,
  truePerigee,
  perigeeParallax,
  apogeeParallax
};