import GFX from './GFX';
import {CT} from './AACoordinateTransformation';

const eclipticLongitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nL0Coefficients = GFX.g_L0UranusCoefficients.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0UranusCoefficients[i].a * Math.cos(GFX.g_L0UranusCoefficients[i].b + GFX.g_L0UranusCoefficients[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1UranusCoefficients.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1UranusCoefficients[i].a * Math.cos(GFX.g_L1UranusCoefficients[i].b + GFX.g_L1UranusCoefficients[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2UranusCoefficients.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2UranusCoefficients[i].a * Math.cos(GFX.g_L2UranusCoefficients[i].b + GFX.g_L2UranusCoefficients[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3UranusCoefficients.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3UranusCoefficients[i].a * Math.cos(GFX.g_L3UranusCoefficients[i].b + GFX.g_L3UranusCoefficients[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4UranusCoefficients.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4UranusCoefficients[i].a * Math.cos(GFX.g_L4UranusCoefficients[i].b + GFX.g_L4UranusCoefficients[i].c * rho);
  }
  let vvalue = (L0 + L1 * rho + L2 * rhosquared + L3 * rhocubed + L4 * rho4) / 100000000;
  vvalue = CT.m360(CT.r2D(vvalue));
  return vvalue;
};
const eclipticLatitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nB0Coefficients = GFX.g_B0UranusCoefficients.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0UranusCoefficients[i].a * Math.cos(GFX.g_B0UranusCoefficients[i].b + GFX.g_B0UranusCoefficients[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1UranusCoefficients.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1UranusCoefficients[i].a * Math.cos(GFX.g_B1UranusCoefficients[i].b + GFX.g_B1UranusCoefficients[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2UranusCoefficients.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2UranusCoefficients[i].a * Math.cos(GFX.g_B2UranusCoefficients[i].b + GFX.g_B2UranusCoefficients[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3UranusCoefficients.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3UranusCoefficients[i].a * Math.cos(GFX.g_B3UranusCoefficients[i].b + GFX.g_B3UranusCoefficients[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4UranusCoefficients.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4UranusCoefficients[i].a * Math.cos(GFX.g_B4UranusCoefficients[i].b + GFX.g_B4UranusCoefficients[i].c * rho);
  }
  let vvalue = (B0 + B1 * rho + B2 * rhosquared + B3 * rhocubed + B4 * rho4) / 100000000;
  vvalue = CT.r2D(vvalue);
  return vvalue;
};
const radiusVector = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nR0Coefficients = GFX.g_R0UranusCoefficients.length;
  let R0 = 0;
  let i;
  for (i = 0; i < nR0Coefficients; i++) {
    R0 += GFX.g_R0UranusCoefficients[i].a * Math.cos(GFX.g_R0UranusCoefficients[i].b + GFX.g_R0UranusCoefficients[i].c * rho);
  }
  const nR1Coefficients = GFX.g_R1UranusCoefficients.length;
  let R1 = 0;
  for (i = 0; i < nR1Coefficients; i++) {
    R1 += GFX.g_R1UranusCoefficients[i].a * Math.cos(GFX.g_R1UranusCoefficients[i].b + GFX.g_R1UranusCoefficients[i].c * rho);
  }
  const nR2Coefficients = GFX.g_R2UranusCoefficients.length;
  let R2 = 0;
  for (i = 0; i < nR2Coefficients; i++) {
    R2 += GFX.g_R2UranusCoefficients[i].a * Math.cos(GFX.g_R2UranusCoefficients[i].b + GFX.g_R2UranusCoefficients[i].c * rho);
  }
  const nR3Coefficients = GFX.g_R3UranusCoefficients.length;
  let R3 = 0;
  for (i = 0; i < nR3Coefficients; i++) {
    R3 += GFX.g_R3UranusCoefficients[i].a * Math.cos(GFX.g_R3UranusCoefficients[i].b + GFX.g_R3UranusCoefficients[i].c * rho);
  }
  const nR4Coefficients = GFX.g_R4UranusCoefficients.length;
  let R4 = 0;
  for (i = 0; i < nR4Coefficients; i++) {
    R4 += GFX.g_R4UranusCoefficients[i].a * Math.cos(GFX.g_R4UranusCoefficients[i].b + GFX.g_R4UranusCoefficients[i].c * rho);
  }
  return (R0 + R1 * rho + R2 * rhosquared + R3 * rhocubed + R4 * rho4) / 100000000;
};
export const CAAUranus = {
  eclipticLatitude,
  eclipticLongitude,
  radiusVector
};