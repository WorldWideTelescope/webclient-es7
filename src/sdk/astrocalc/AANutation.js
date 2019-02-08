


// CAANutation

import {CT} from './AACoordinateTransformation';
import GFX from './GFX';

const nutationInLongitude = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  let D = 297.85036 + 445267.11148 * T - 0.0019142 * Tsquared + Tcubed / 189474;
  D = CT.m360(D);
  let M = 357.52772 + 35999.05034 * T - 0.0001603 * Tsquared - Tcubed / 300000;
  M = CT.m360(M);
  let Mprime = 134.96298 + 477198.867398 * T + 0.0086972 * Tsquared + Tcubed / 56250;
  Mprime = CT.m360(Mprime);
  let F = 93.27191 + 483202.017538 * T - 0.0036825 * Tsquared + Tcubed / 327270;
  F = CT.m360(F);
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * Tsquared + Tcubed / 450000;
  omega = CT.m360(omega);
  const nCoefficients = GFX.g_NuC.length;
  let vvalue = 0;
  for (let i = 0; i < nCoefficients; i++) {
    const argument = GFX.g_NuC[i].d * D + GFX.g_NuC[i].m * M + GFX.g_NuC[i].mprime * Mprime + GFX.g_NuC[i].f * F + GFX.g_NuC[i].omega * omega;
    const radargument = CT.d2R(argument);
    vvalue += (GFX.g_NuC[i].sincoeff1 + GFX.g_NuC[i].sincoeff2 * T) * Math.sin(radargument) * 0.0001;
  }
  return vvalue;
};
const nutationInObliquity = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  let D = 297.85036 + 445267.11148 * T - 0.0019142 * Tsquared + Tcubed / 189474;
  D = CT.m360(D);
  let M = 357.52772 + 35999.05034 * T - 0.0001603 * Tsquared - Tcubed / 300000;
  M = CT.m360(M);
  let Mprime = 134.96298 + 477198.867398 * T + 0.0086972 * Tsquared + Tcubed / 56250;
  Mprime = CT.m360(Mprime);
  let F = 93.27191 + 483202.017538 * T - 0.0036825 * Tsquared + Tcubed / 327270;
  F = CT.m360(F);
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * Tsquared + Tcubed / 450000;
  omega = CT.m360(omega);
  const nCoefficients = GFX.g_NuC.length;
  let vvalue = 0;
  for (let i = 0; i < nCoefficients; i++) {
    const argument = GFX.g_NuC[i].d * D + GFX.g_NuC[i].m * M + GFX.g_NuC[i].mprime * Mprime + GFX.g_NuC[i].f * F + GFX.g_NuC[i].omega * omega;
    const radargument = CT.d2R(argument);
    vvalue += (GFX.g_NuC[i].coscoeff1 + GFX.g_NuC[i].coscoeff2 * T) * Math.cos(radargument) * 0.0001;
  }
  return vvalue;
};
const nutationInRightAscension = (Alpha, Delta, Obliquity, NutationInLongitude, NutationInObliquity) => {
  Alpha = CT.h2R(Alpha);
  Delta = CT.d2R(Delta);
  Obliquity = CT.d2R(Obliquity);
  return (Math.cos(Obliquity) + Math.sin(Obliquity) * Math.sin(Alpha) * Math.tan(Delta)) * NutationInLongitude - Math.cos(Alpha) * Math.tan(Delta) * NutationInObliquity;
};
const nutationInDeclination = (Alpha, Delta, Obliquity, NutationInLongitude, NutationInObliquity) => {
  Alpha = CT.h2R(Alpha);
  Delta = CT.d2R(Delta);
  Obliquity = CT.d2R(Obliquity);
  return Math.sin(Obliquity) * Math.cos(Alpha) * NutationInLongitude + Math.sin(Alpha) * NutationInObliquity;
};
const meanObliquityOfEcliptic = JD => {
  const U = (JD - 2451545) / 3652500;
  const Usquared = U * U;
  const Ucubed = Usquared * U;
  const U4 = Ucubed * U;
  const U5 = U4 * U;
  const U6 = U5 * U;
  const U7 = U6 * U;
  const U8 = U7 * U;
  const U9 = U8 * U;
  const U10 = U9 * U;
  return CT.dmS2D(23, 26, 21.448) - CT.dmS2D(0, 0, 4680.93) * U - CT.dmS2D(0, 0, 1.55) * Usquared + CT.dmS2D(0, 0, 1999.25) * Ucubed - CT.dmS2D(0, 0, 51.38) * U4 - CT.dmS2D(0, 0, 249.67) * U5 - CT.dmS2D(0, 0, 39.05) * U6 + CT.dmS2D(0, 0, 7.12) * U7 + CT.dmS2D(0, 0, 27.87) * U8 + CT.dmS2D(0, 0, 5.79) * U9 + CT.dmS2D(0, 0, 2.45) * U10;
};
const trueObliquityOfEcliptic = JD => CAANutation.meanObliquityOfEcliptic(JD) + CT.dmS2D(0, 0, CAANutation.nutationInObliquity(JD));
export const CAANutation = {
  nutationInLongitude,
  nutationInObliquity,
  nutationInRightAscension,
  nutationInDeclination,
  meanObliquityOfEcliptic,
  trueObliquityOfEcliptic
};


// NUC

export function NUC(D, M, Mprime, F, omega, sincoeff1, sincoeff2, coscoeff1, coscoeff2) {
  this.d = 0;
  this.m = 0;
  this.mprime = 0;
  this.f = 0;
  this.omega = 0;
  this.sincoeff1 = 0;
  this.sincoeff2 = 0;
  this.coscoeff1 = 0;
  this.coscoeff2 = 0;
  this.d = D;
  this.m = M;
  this.mprime = Mprime;
  this.f = F;
  this.omega = omega;
  this.sincoeff1 = sincoeff1;
  this.sincoeff2 = sincoeff2;
  this.coscoeff1 = coscoeff1;
  this.coscoeff2 = coscoeff2;
}


