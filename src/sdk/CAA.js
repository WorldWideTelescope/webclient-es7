import GFX from './astrocalc/GFX';
import ss from './scriptsharp/ss';
import {C3D,CT} from './astrocalc/AACoordinateTransformation';





export function CAAGlobe() {}
CAAGlobe.rhoSinThetaPrime = function(GeographicalLatitude, Height) {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const U = Math.atan(0.99664719 * Math.tan(GeographicalLatitude));
  return 0.99664719 * Math.sin(U) + (Height / 6378149 * Math.sin(GeographicalLatitude));
};
CAAGlobe.rhoCosThetaPrime = function(GeographicalLatitude, Height) {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const U = Math.atan(0.99664719 * Math.tan(GeographicalLatitude));
  return Math.cos(U) + (Height / 6378149 * Math.cos(GeographicalLatitude));
};
CAAGlobe.radiusOfParallelOfLatitude = function(GeographicalLatitude) {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const sinGeo = Math.sin(GeographicalLatitude);
  return (6378.14 * Math.cos(GeographicalLatitude)) / Math.sqrt(1 - 0.0066943847614084 * sinGeo * sinGeo);
};
CAAGlobe.radiusOfCurvature = function(GeographicalLatitude) {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const sinGeo = Math.sin(GeographicalLatitude);
  return (6378.14 * (1 - 0.0066943847614084)) / Math.pow((1 - 0.0066943847614084 * sinGeo * sinGeo), 1.5);
};
CAAGlobe.distanceBetweenPoints = function(GeographicalLatitude1, GeographicalLongitude1, GeographicalLatitude2, GeographicalLongitude2) {
  GeographicalLatitude1 = CT.d2R(GeographicalLatitude1);
  GeographicalLatitude2 = CT.d2R(GeographicalLatitude2);
  GeographicalLongitude1 = CT.d2R(GeographicalLongitude1);
  GeographicalLongitude2 = CT.d2R(GeographicalLongitude2);
  const F = (GeographicalLatitude1 + GeographicalLatitude2) / 2;
  const G = (GeographicalLatitude1 - GeographicalLatitude2) / 2;
  const lambda = (GeographicalLongitude1 - GeographicalLongitude2) / 2;
  const sinG = Math.sin(G);
  const cosG = Math.cos(G);
  const cosF = Math.cos(F);
  const sinF = Math.sin(F);
  const sinLambda = Math.sin(lambda);
  const cosLambda = Math.cos(lambda);
  const S = (sinG * sinG * cosLambda * cosLambda) + (cosF * cosF * sinLambda * sinLambda);
  const C = (cosG * cosG * cosLambda * cosLambda) + (sinF * sinF * sinLambda * sinLambda);
  const w = Math.atan(Math.sqrt(S / C));
  const R = Math.sqrt(S * C) / w;
  const D = 2 * w * 6378.14;
  const Hprime = (3 * R - 1) / (2 * C);
  const Hprime2 = (3 * R + 1) / (2 * S);
  const f = 0.00335281317789691;
  return D * (1 + (f * Hprime * sinF * sinF * cosG * cosG) - (f * Hprime2 * cosF * cosF * sinG * sinG));
};
export const CAAGlobe$ = {};


export function CAAFK5() {}
CAAFK5.correctionInLongitude = function(Longitude, Latitude, JD) {
  const T = (JD - 2451545) / 36525;
  let Ldash = Longitude - 1.397 * T - 0.00031 * T * T;
  Ldash = CT.d2R(Ldash);
  Longitude = CT.d2R(Longitude);
  Latitude = CT.d2R(Latitude);
  const vvalue = -0.09033 + 0.03916 * (Math.cos(Ldash) + Math.sin(Ldash)) * Math.tan(Latitude);
  return CT.dmS2D(0, 0, vvalue);
};
CAAFK5.correctionInLatitude = function(Longitude, JD) {
  const T = (JD - 2451545) / 36525;
  let Ldash = Longitude - 1.397 * T - 0.00031 * T * T;
  Ldash = CT.d2R(Ldash);
  Longitude = CT.d2R(Longitude);
  const vvalue = 0.03916 * (Math.cos(Ldash) - Math.sin(Ldash));
  return CT.dmS2D(0, 0, vvalue);
};
CAAFK5.convertVSOPToFK5J2000 = function(vvalue) {
  const result = new C3D();
  result.x = vvalue.x + 4.4036E-07 * vvalue.y - 1.90919E-07 * vvalue.z;
  result.y = -4.79966E-07 * vvalue.x + 0.917482137087 * vvalue.y - 0.397776982902 * vvalue.z;
  result.z = 0.397776982902 * vvalue.y + 0.917482137087 * vvalue.z;
  return result;
};
CAAFK5.convertVSOPToFK5B1950 = function(vvalue) {
  const result = new C3D();
  result.x = 0.999925702634 * vvalue.x + 0.012189716217 * vvalue.y + 1.1134016E-05 * vvalue.z;
  result.y = -0.011179418036 * vvalue.x + 0.917413998946 * vvalue.y - 0.397777041885 * vvalue.z;
  result.z = -0.004859003787 * vvalue.x + 0.397747363646 * vvalue.y + 0.917482111428 * vvalue.z;
  return result;
};
CAAFK5.convertVSOPToFK5AnyEquinox = function(vvalue, JDEquinox) {
  const t = (JDEquinox - 2451545) / 36525;
  const tsquared = t * t;
  const tcubed = tsquared * t;
  let sigma = 2306.2181 * t + 0.30188 * tsquared + 0.017988 * tcubed;
  sigma = CT.d2R(CT.dmS2D(0, 0, sigma));
  let zeta = 2306.2181 * t + 1.09468 * tsquared + 0.018203 * tcubed;
  zeta = CT.d2R(CT.dmS2D(0, 0, zeta));
  let phi = 2004.3109 * t - 0.42665 * tsquared - 0.041833 * tcubed;
  phi = CT.d2R(CT.dmS2D(0, 0, phi));
  const cossigma = Math.cos(sigma);
  const coszeta = Math.cos(zeta);
  const cosphi = Math.cos(phi);
  const sinsigma = Math.sin(sigma);
  const sinzeta = Math.sin(zeta);
  const sinphi = Math.sin(phi);
  const xx = cossigma * coszeta * cosphi - sinsigma * sinzeta;
  const xy = sinsigma * coszeta + cossigma * sinzeta * cosphi;
  const xz = cossigma * sinphi;
  const yx = -cossigma * sinzeta - sinsigma * coszeta * cosphi;
  const yy = cossigma * coszeta - sinsigma * sinzeta * cosphi;
  const yz = -sinsigma * sinphi;
  const zx = -coszeta * sinphi;
  const zy = -sinzeta * sinphi;
  const zz = cosphi;
  const result = new C3D();
  result.x = xx * vvalue.x + yx * vvalue.y + zx * vvalue.z;
  result.y = xy * vvalue.x + yy * vvalue.y + zy * vvalue.z;
  result.z = xz * vvalue.x + yz * vvalue.y + zz * vvalue.z;
  return result;
};
export const CAAFK5$ = {};



export function CAAKepler() {
}
CAAKepler.calculate = function(M, e) {
  return CAAKepler.calculateIter(M, e, 53);
};
CAAKepler.calculateIter = function(M, e, nIterations) {
  M = CT.d2R(M);
  const PI = CT.PI();
  let F = 1;
  if (M < 0) {
    F = -1;
  }
  M = Math.abs(M) / (2 * PI);
  M = (M - ss.truncate(M)) * 2 * PI * F;
  if (M < 0) {
    M += 2 * PI;
  }
  F = 1;
  if (M > PI) {
    F = -1;
  }
  if (M > PI) {
    M = 2 * PI - M;
  }
  let E = PI / 2;
  let scale = PI / 4;
  for (let i = 0; i < nIterations; i++) {
    const R = E - e * Math.sin(E);
    if (M > R) {
      E += scale;
    }
    else {
      E -= scale;
    }
    scale /= 2;
  }
  return CT.r2D(E) * F;
};
export const CAAKepler$ = {};

export function CAAMars() {}
CAAMars.eclipticLongitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nL0Coefficients = GFX.g_L0MarsCoefficients.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0MarsCoefficients[i].a * Math.cos(GFX.g_L0MarsCoefficients[i].b + GFX.g_L0MarsCoefficients[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1MarsCoefficients.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1MarsCoefficients[i].a * Math.cos(GFX.g_L1MarsCoefficients[i].b + GFX.g_L1MarsCoefficients[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2MarsCoefficients.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2MarsCoefficients[i].a * Math.cos(GFX.g_L2MarsCoefficients[i].b + GFX.g_L2MarsCoefficients[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3MarsCoefficients.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3MarsCoefficients[i].a * Math.cos(GFX.g_L3MarsCoefficients[i].b + GFX.g_L3MarsCoefficients[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4MarsCoefficients.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4MarsCoefficients[i].a * Math.cos(GFX.g_L4MarsCoefficients[i].b + GFX.g_L4MarsCoefficients[i].c * rho);
  }
  const nL5Coefficients = GFX.g_L5MarsCoefficients.length;
  let L5 = 0;
  for (i = 0; i < nL5Coefficients; i++) {
    L5 += GFX.g_L5MarsCoefficients[i].a * Math.cos(GFX.g_L5MarsCoefficients[i].b + GFX.g_L5MarsCoefficients[i].c * rho);
  }
  let vvalue = (L0 + L1 * rho + L2 * rhosquared + L3 * rhocubed + L4 * rho4 + L5 * rho5) / 100000000;
  vvalue = CT.m360(CT.r2D(vvalue));
  return vvalue;
};
CAAMars.eclipticLatitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nB0Coefficients = GFX.g_B0MarsCoefficients.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0MarsCoefficients[i].a * Math.cos(GFX.g_B0MarsCoefficients[i].b + GFX.g_B0MarsCoefficients[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1MarsCoefficients.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1MarsCoefficients[i].a * Math.cos(GFX.g_B1MarsCoefficients[i].b + GFX.g_B1MarsCoefficients[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2MarsCoefficients.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2MarsCoefficients[i].a * Math.cos(GFX.g_B2MarsCoefficients[i].b + GFX.g_B2MarsCoefficients[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3MarsCoefficients.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3MarsCoefficients[i].a * Math.cos(GFX.g_B3MarsCoefficients[i].b + GFX.g_B3MarsCoefficients[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4MarsCoefficients.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4MarsCoefficients[i].a * Math.cos(GFX.g_B4MarsCoefficients[i].b + GFX.g_B4MarsCoefficients[i].c * rho);
  }
  let vvalue = (B0 + B1 * rho + B2 * rhosquared + B3 * rhocubed + B4 * rho4) / 100000000;
  vvalue = CT.r2D(vvalue);
  return vvalue;
};
CAAMars.radiusVector = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nR0Coefficients = GFX.g_R0MarsCoefficients.length;
  let R0 = 0;
  let i;
  for (i = 0; i < nR0Coefficients; i++) {
    R0 += GFX.g_R0MarsCoefficients[i].a * Math.cos(GFX.g_R0MarsCoefficients[i].b + GFX.g_R0MarsCoefficients[i].c * rho);
  }
  const nR1Coefficients = GFX.g_R1MarsCoefficients.length;
  let R1 = 0;
  for (i = 0; i < nR1Coefficients; i++) {
    R1 += GFX.g_R1MarsCoefficients[i].a * Math.cos(GFX.g_R1MarsCoefficients[i].b + GFX.g_R1MarsCoefficients[i].c * rho);
  }
  const nR2Coefficients = GFX.g_R2MarsCoefficients.length;
  let R2 = 0;
  for (i = 0; i < nR2Coefficients; i++) {
    R2 += GFX.g_R2MarsCoefficients[i].a * Math.cos(GFX.g_R2MarsCoefficients[i].b + GFX.g_R2MarsCoefficients[i].c * rho);
  }
  const nR3Coefficients = GFX.g_R3MarsCoefficients.length;
  let R3 = 0;
  for (i = 0; i < nR3Coefficients; i++) {
    R3 += GFX.g_R3MarsCoefficients[i].a * Math.cos(GFX.g_R3MarsCoefficients[i].b + GFX.g_R3MarsCoefficients[i].c * rho);
  }
  const nR4Coefficients = GFX.g_R4MarsCoefficients.length;
  let R4 = 0;
  for (i = 0; i < nR4Coefficients; i++) {
    R4 += GFX.g_R4MarsCoefficients[i].a * Math.cos(GFX.g_R4MarsCoefficients[i].b + GFX.g_R4MarsCoefficients[i].c * rho);
  }
  return (R0 + R1 * rho + R2 * rhosquared + R3 * rhocubed + R4 * rho4) / 100000000;
};
export const CAAMars$ = {};





export function CAAMoonNodes() {}
CAAMoonNodes.k = function(Year) {
  return 13.4223 * (Year - 2000.05);
};
CAAMoonNodes.passageThroNode = function(k) {
  const T = k / 1342.23;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  const T4 = Tcubed * T;
  let D = CT.m360(183.638 + 331.73735682 * k + 0.0014852 * Tsquared + 2.09E-06 * Tcubed - 1E-08 * T4);
  let M = CT.m360(17.4006 + 26.8203725 * k + 0.0001186 * Tsquared + 6E-08 * Tcubed);
  let Mdash = CT.m360(38.3776 + 355.52747313 * k + 0.0123499 * Tsquared + 1.4627E-05 * Tcubed - 6.9E-08 * T4);
  let omega = CT.m360(123.9767 - 1.44098956 * k + 0.0020608 * Tsquared + 2.14E-06 * Tcubed - 1.6E-08 * T4);
  let V = CT.m360(299.75 + 132.85 * T - 0.009173 * Tsquared);
  let P = CT.m360(omega + 272.75 - 2.3 * T);
  const E = 1 - 0.002516 * T - 7.4E-06 * Tsquared;
  D = CT.d2R(D);
  const D2 = 2 * D;
  const D4 = D2 * D2;
  M = CT.d2R(M);
  Mdash = CT.d2R(Mdash);
  const Mdash2 = 2 * Mdash;
  omega = CT.d2R(omega);
  V = CT.d2R(V);
  P = CT.d2R(P);
  const JD = 2451565.1619 + 27.212220817 * k + 0.0002762 * Tsquared + 2.1E-08 * Tcubed - 8.8E-11 * T4 - 0.4721 * Math.sin(Mdash) - 0.1649 * Math.sin(D2) - 0.0868 * Math.sin(D2 - Mdash) + 0.0084 * Math.sin(D2 + Mdash) - E * 0.0083 * Math.sin(D2 - M) - E * 0.0039 * Math.sin(D2 - M - Mdash) + 0.0034 * Math.sin(Mdash2) - 0.0031 * Math.sin(D2 - Mdash2) + E * 0.003 * Math.sin(D2 + M) + E * 0.0028 * Math.sin(M - Mdash) + E * 0.0026 * Math.sin(M) + 0.0025 * Math.sin(D4) + 0.0024 * Math.sin(D) + E * 0.0022 * Math.sin(M + Mdash) + 0.0017 * Math.sin(omega) + 0.0014 * Math.sin(D4 - Mdash) + E * 0.0005 * Math.sin(D2 + M - Mdash) + E * 0.0004 * Math.sin(D2 - M + Mdash) - E * 0.0003 * Math.sin(D2 - M * M) + E * 0.0003 * Math.sin(D4 - M) + 0.0003 * Math.sin(V) + 0.0003 * Math.sin(P);
  return JD;
};
export const CAAMoonNodes$ = {};


