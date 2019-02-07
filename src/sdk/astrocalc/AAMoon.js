import GFX from './GFX';
import {CT} from './AACoordinateTransformation';
import {CAAEarth} from './AAEarth';
import {CAANutation} from './AANutation';

const meanLongitude = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  return CT.m360(218.3164477 + 481267.88123421 * T - 0.0015786 * Tsquared + Tcubed / 538841 - T4 / 65194000);
};
const meanElongation = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  return CT.m360(297.8501921 + 445267.1114034 * T - 0.0018819 * Tsquared + Tcubed / 545868 - T4 / 113065000);
};
const meanAnomaly = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  return CT.m360(134.9633964 + 477198.8675055 * T + 0.0087414 * Tsquared + Tcubed / 69699 - T4 / 14712000);
};
const argumentOfLatitude = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  return CT.m360(93.272095 + 483202.0175233 * T - 0.0036539 * Tsquared - Tcubed / 3526000 + T4 / 863310000);
};
const meanLongitudeAscendingNode = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  return CT.m360(125.0445479 - 1934.1362891 * T + 0.0020754 * Tsquared + Tcubed / 467441 - T4 / 60616000);
};
const meanLongitudePerigee = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  return CT.m360(83.3532465 + 4069.0137287 * T - 0.01032 * Tsquared - Tcubed / 80053 + T4 / 18999000);
};
const trueLongitudeAscendingNode = JD => {
  let TrueAscendingNode = meanLongitudeAscendingNode(JD);
  let D = meanElongation(JD);
  D = CT.d2R(D);
  let M = CAAEarth.sunMeanAnomaly(JD);
  M = CT.d2R(M);
  let Mdash = meanAnomaly(JD);
  Mdash = CT.d2R(Mdash);
  let F = argumentOfLatitude(JD);
  F = CT.d2R(F);
  TrueAscendingNode -= 1.4979 * Math.sin(2 * (D - F));
  TrueAscendingNode -= 0.15 * Math.sin(M);
  TrueAscendingNode -= 0.1226 * Math.sin(2 * D);
  TrueAscendingNode += 0.1176 * Math.sin(2 * F);
  TrueAscendingNode -= 0.0801 * Math.sin(2 * (Mdash - F));
  return CT.m360(TrueAscendingNode);
};
const eclipticLongitude = JD => {
  let Ldash = meanLongitude(JD);
  const LdashDegrees = Ldash;
  Ldash = CT.d2R(Ldash);
  let D = meanElongation(JD);
  D = CT.d2R(D);
  let M = CAAEarth.sunMeanAnomaly(JD);
  M = CT.d2R(M);
  let Mdash = meanAnomaly(JD);
  Mdash = CT.d2R(Mdash);
  let F = argumentOfLatitude(JD);
  F = CT.d2R(F);
  const E = CAAEarth.eccentricity(JD);
  const T = (JD - 2451545) / 36525;
  let A1 = CT.m360(119.75 + 131.849 * T);
  A1 = CT.d2R(A1);
  let A2 = CT.m360(53.09 + 479264.29 * T);
  A2 = CT.d2R(A2);
  let A3 = CT.m360(313.45 + 481266.484 * T);
  A3 = CT.d2R(A3);
  const nLCoefficients = GFX.g_MoonCoefficients1.length;
  console.assert(GFX.g_MoonCoefficients2.length === nLCoefficients);
  let SigmaL = 0;
  for (let i = 0; i < nLCoefficients; i++) {
    let ThisSigma = GFX.g_MoonCoefficients2[i].a * Math.sin(GFX.g_MoonCoefficients1[i].d * D + GFX.g_MoonCoefficients1[i].m * M + GFX.g_MoonCoefficients1[i].mdash * Mdash + GFX.g_MoonCoefficients1[i].f * F);
    if (!!GFX.g_MoonCoefficients1[i].m) {
      ThisSigma *= E;
    }
    SigmaL += ThisSigma;
  }
  SigmaL += 3958 * Math.sin(A1);
  SigmaL += 1962 * Math.sin(Ldash - F);
  SigmaL += 318 * Math.sin(A2);
  const NutationInLong = CAANutation.nutationInLongitude(JD);
  return CT.m360(LdashDegrees + SigmaL / 1000000 + NutationInLong / 3600);
};
const eclipticLatitude = JD => {
  let Ldash = meanLongitude(JD);
  Ldash = CT.d2R(Ldash);
  let D = meanElongation(JD);
  D = CT.d2R(D);
  let M = CAAEarth.sunMeanAnomaly(JD);
  M = CT.d2R(M);
  let Mdash = meanAnomaly(JD);
  Mdash = CT.d2R(Mdash);
  let F = argumentOfLatitude(JD);
  F = CT.d2R(F);
  const E = CAAEarth.eccentricity(JD);
  const T = (JD - 2451545) / 36525;
  let A1 = CT.m360(119.75 + 131.849 * T);
  A1 = CT.d2R(A1);
  let A2 = CT.m360(53.09 + 479264.29 * T);
  A2 = CT.d2R(A2);
  let A3 = CT.m360(313.45 + 481266.484 * T);
  A3 = CT.d2R(A3);
  const nBCoefficients = GFX.g_MoonCoefficients3.length;
  console.assert(GFX.g_MoonCoefficients4.length === nBCoefficients);
  let SigmaB = 0;
  for (let i = 0; i < nBCoefficients; i++) {
    let ThisSigma = GFX.g_MoonCoefficients4[i] * Math.sin(GFX.g_MoonCoefficients3[i].d * D + GFX.g_MoonCoefficients3[i].m * M + GFX.g_MoonCoefficients3[i].mdash * Mdash + GFX.g_MoonCoefficients3[i].f * F);
    if (!!GFX.g_MoonCoefficients3[i].m) {
      ThisSigma *= E;
    }
    SigmaB += ThisSigma;
  }
  SigmaB -= 2235 * Math.sin(Ldash);
  SigmaB += 382 * Math.sin(A3);
  SigmaB += 175 * Math.sin(A1 - F);
  SigmaB += 175 * Math.sin(A1 + F);
  SigmaB += 127 * Math.sin(Ldash - Mdash);
  SigmaB -= 115 * Math.sin(Ldash + Mdash);
  return SigmaB / 1000000;
};
const radiusVector = JD => {
  let Ldash = meanLongitude(JD);
  Ldash = CT.d2R(Ldash);
  let D = meanElongation(JD);
  D = CT.d2R(D);
  let M = CAAEarth.sunMeanAnomaly(JD);
  M = CT.d2R(M);
  let Mdash = meanAnomaly(JD);
  Mdash = CT.d2R(Mdash);
  let F = argumentOfLatitude(JD);
  F = CT.d2R(F);
  const E = CAAEarth.eccentricity(JD);
  const T = (JD - 2451545) / 36525;
  let A1 = CT.m360(119.75 + 131.849 * T);
  A1 = CT.d2R(A1);
  let A2 = CT.m360(53.09 + 479264.29 * T);
  A2 = CT.d2R(A2);
  let A3 = CT.m360(313.45 + 481266.484 * T);
  A3 = CT.d2R(A3);
  const nRCoefficients = GFX.g_MoonCoefficients1.length;
  console.assert(GFX.g_MoonCoefficients2.length === nRCoefficients);
  let SigmaR = 0;
  for (let i = 0; i < nRCoefficients; i++) {
    let ThisSigma = GFX.g_MoonCoefficients2[i].b * Math.cos(GFX.g_MoonCoefficients1[i].d * D + GFX.g_MoonCoefficients1[i].m * M + GFX.g_MoonCoefficients1[i].mdash * Mdash + GFX.g_MoonCoefficients1[i].f * F);
    if (!!GFX.g_MoonCoefficients1[i].m) {
      ThisSigma *= E;
    }
    SigmaR += ThisSigma;
  }
  return 385000.56 + SigmaR / 1000;
};
const radiusVectorToHorizontalParallax = RadiusVector => CT.r2D(Math.asin(6378.14 / RadiusVector));
const horizontalParallaxToRadiusVector = Parallax => 6378.14 / Math.sin(CT.d2R(Parallax));

export function MoonCoefficient1(d, m, mdash, f) {
  this.d = 0;
  this.m = 0;
  this.mdash = 0;
  this.f = 0;
  this.d = d;
  this.m = m;
  this.mdash = mdash;
  this.f = f;
}

export function MoonCoefficient2(a, b) {
  this.a = a;
  this.b = b;
}

const MoonCoefficient2$ = {};

export const CAAMoon = {
  meanLongitude,
  meanElongation,
  meanAnomaly,
  argumentOfLatitude,
  meanLongitudePerigee,
  meanLongitudeAscendingNode,
  trueLongitudeAscendingNode,
  eclipticLongitude,
  eclipticLatitude,
  radiusVector,
  radiusVectorToHorizontalParallax,
  horizontalParallaxToRadiusVector
}