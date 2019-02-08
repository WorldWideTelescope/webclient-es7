import GFX from './GFX';
import { CT } from './AACoordinateTransformation';

const eclipticLongitude = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nL0Coefficients = GFX.g_L0EarthCoefficients.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0EarthCoefficients[i].a * Math.cos(GFX.g_L0EarthCoefficients[i].b + GFX.g_L0EarthCoefficients[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1EarthCoefficients.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1EarthCoefficients[i].a * Math.cos(GFX.g_L1EarthCoefficients[i].b + GFX.g_L1EarthCoefficients[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2EarthCoefficients.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2EarthCoefficients[i].a * Math.cos(GFX.g_L2EarthCoefficients[i].b + GFX.g_L2EarthCoefficients[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3EarthCoefficients.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3EarthCoefficients[i].a * Math.cos(GFX.g_L3EarthCoefficients[i].b + GFX.g_L3EarthCoefficients[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4EarthCoefficients.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4EarthCoefficients[i].a * Math.cos(GFX.g_L4EarthCoefficients[i].b + GFX.g_L4EarthCoefficients[i].c * rho);
  }
  const nL5Coefficients = GFX.g_L5EarthCoefficients.length;
  let L5 = 0;
  for (i = 0; i < nL5Coefficients; i++) {
    L5 += GFX.g_L5EarthCoefficients[i].a * Math.cos(GFX.g_L5EarthCoefficients[i].b + GFX.g_L5EarthCoefficients[i].c * rho);
  }
  let vvalue = (L0 + L1 * rho + L2 * rhosquared + L3 * rhocubed + L4 * rho4 + L5 * rho5) / 100000000;
  vvalue = CT.m360(CT.r2D(vvalue));
  return vvalue;
};
const eclipticLatitude = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nB0Coefficients = GFX.g_B0EarthCoefficients.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0EarthCoefficients[i].a * Math.cos(GFX.g_B0EarthCoefficients[i].b + GFX.g_B0EarthCoefficients[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1EarthCoefficients.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1EarthCoefficients[i].a * Math.cos(GFX.g_B1EarthCoefficients[i].b + GFX.g_B1EarthCoefficients[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2EarthCoefficients.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2EarthCoefficients[i].a * Math.cos(GFX.g_B2EarthCoefficients[i].b + GFX.g_B2EarthCoefficients[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3EarthCoefficients.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3EarthCoefficients[i].a * Math.cos(GFX.g_B3EarthCoefficients[i].b + GFX.g_B3EarthCoefficients[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4EarthCoefficients.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4EarthCoefficients[i].a * Math.cos(GFX.g_B4EarthCoefficients[i].b + GFX.g_B4EarthCoefficients[i].c * rho);
  }
  let vvalue = (B0 + B1 * rho + B2 * rhosquared + B3 * rhocubed + B4 * rho4) / 100000000;
  vvalue = CT.r2D(vvalue);
  return vvalue;
};
const radiusVector = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nR0Coefficients = GFX.g_R0EarthCoefficients.length;
  let R0 = 0;
  let i;
  for (i = 0; i < nR0Coefficients; i++) {
    R0 += GFX.g_R0EarthCoefficients[i].a * Math.cos(GFX.g_R0EarthCoefficients[i].b + GFX.g_R0EarthCoefficients[i].c * rho);
  }
  const nR1Coefficients = GFX.g_R1EarthCoefficients.length;
  let R1 = 0;
  for (i = 0; i < nR1Coefficients; i++) {
    R1 += GFX.g_R1EarthCoefficients[i].a * Math.cos(GFX.g_R1EarthCoefficients[i].b + GFX.g_R1EarthCoefficients[i].c * rho);
  }
  const nR2Coefficients = GFX.g_R2EarthCoefficients.length;
  let R2 = 0;
  for (i = 0; i < nR2Coefficients; i++) {
    R2 += GFX.g_R2EarthCoefficients[i].a * Math.cos(GFX.g_R2EarthCoefficients[i].b + GFX.g_R2EarthCoefficients[i].c * rho);
  }
  const nR3Coefficients = GFX.g_R3EarthCoefficients.length;
  let R3 = 0;
  for (i = 0; i < nR3Coefficients; i++) {
    R3 += GFX.g_R3EarthCoefficients[i].a * Math.cos(GFX.g_R3EarthCoefficients[i].b + GFX.g_R3EarthCoefficients[i].c * rho);
  }
  const nR4Coefficients = GFX.g_R4EarthCoefficients.length;
  let R4 = 0;
  for (i = 0; i < nR4Coefficients; i++) {
    R4 += GFX.g_R4EarthCoefficients[i].a * Math.cos(GFX.g_R4EarthCoefficients[i].b + GFX.g_R4EarthCoefficients[i].c * rho);
  }
  return (R0 + R1 * rho + R2 * rhosquared + R3 * rhocubed + R4 * rho4) / 100000000;
};
const sunMeanAnomaly = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const Tcubed = Tsquared * T;
  return CT.m360(357.5291092 + 35999.0502909 * T - 0.0001536 * Tsquared + Tcubed / 24490000);
};
const eccentricity = JD => {
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  return 1 - 0.002516 * T - 7.4E-06 * Tsquared;
};
const eclipticLongitudeJ2000 = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nL0Coefficients = GFX.g_L0EarthCoefficients.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0EarthCoefficients[i].a * Math.cos(GFX.g_L0EarthCoefficients[i].b + GFX.g_L0EarthCoefficients[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1EarthCoefficientsJ2000.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_L1EarthCoefficientsJ2000[i].b + GFX.g_L1EarthCoefficientsJ2000[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2EarthCoefficientsJ2000.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_L2EarthCoefficientsJ2000[i].b + GFX.g_L2EarthCoefficientsJ2000[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3EarthCoefficientsJ2000.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_L3EarthCoefficientsJ2000[i].b + GFX.g_L3EarthCoefficientsJ2000[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4EarthCoefficientsJ2000.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_L4EarthCoefficientsJ2000[i].b + GFX.g_L4EarthCoefficientsJ2000[i].c * rho);
  }
  let vvalue = (L0 + L1 * rho + L2 * rhosquared + L3 * rhocubed + L4 * rho4) / 100000000;
  vvalue = CT.m360(CT.r2D(vvalue));
  return vvalue;
};
const eclipticLatitudeJ2000 = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nB0Coefficients = GFX.g_B0EarthCoefficients.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0EarthCoefficients[i].a * Math.cos(GFX.g_B0EarthCoefficients[i].b + GFX.g_B0EarthCoefficients[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1EarthCoefficientsJ2000.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_B1EarthCoefficientsJ2000[i].b + GFX.g_B1EarthCoefficientsJ2000[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2EarthCoefficientsJ2000.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_B2EarthCoefficientsJ2000[i].b + GFX.g_B2EarthCoefficientsJ2000[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3EarthCoefficientsJ2000.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_B3EarthCoefficientsJ2000[i].b + GFX.g_B3EarthCoefficientsJ2000[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4EarthCoefficientsJ2000.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4EarthCoefficientsJ2000[i].a * Math.cos(GFX.g_B4EarthCoefficientsJ2000[i].b + GFX.g_B4EarthCoefficientsJ2000[i].c * rho);
  }
  let vvalue = (B0 + B1 * rho + B2 * rhosquared + B3 * rhocubed + B4 * rho4) / 100000000;
  vvalue = CT.r2D(vvalue);
  return vvalue;
};

export const CAAEarth = {
  eclipticLatitude,eclipticLongitude,
  radiusVector,eccentricity,
  sunMeanAnomaly,
  eclipticLatitudeJ2000,
  eclipticLongitudeJ2000
};

export function VSC(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
}