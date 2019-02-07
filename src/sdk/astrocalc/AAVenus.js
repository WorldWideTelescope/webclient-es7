
// CAAVenus

import GFX from './GFX';
import {CT} from './AACoordinateTransformation';

const eclipticLongitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nL0Coefficients = GFX.g_L0VenusCoefficients.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0VenusCoefficients[i].a * Math.cos(GFX.g_L0VenusCoefficients[i].b + GFX.g_L0VenusCoefficients[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1VenusCoefficients.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1VenusCoefficients[i].a * Math.cos(GFX.g_L1VenusCoefficients[i].b + GFX.g_L1VenusCoefficients[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2VenusCoefficients.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2VenusCoefficients[i].a * Math.cos(GFX.g_L2VenusCoefficients[i].b + GFX.g_L2VenusCoefficients[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3VenusCoefficients.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3VenusCoefficients[i].a * Math.cos(GFX.g_L3VenusCoefficients[i].b + GFX.g_L3VenusCoefficients[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4VenusCoefficients.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4VenusCoefficients[i].a * Math.cos(GFX.g_L4VenusCoefficients[i].b + GFX.g_L4VenusCoefficients[i].c * rho);
  }
  const nL5Coefficients = GFX.g_L5VenusCoefficients.length;
  let L5 = 0;
  for (i = 0; i < nL5Coefficients; i++) {
    L5 += GFX.g_L5VenusCoefficients[i].a * Math.cos(GFX.g_L5VenusCoefficients[i].b + GFX.g_L5VenusCoefficients[i].c * rho);
  }
  let vvalue = (L0 + L1 * rho + L2 * rhosquared + L3 * rhocubed + L4 * rho4 + L5 * rho5) / 100000000;
  vvalue = CT.m360(CT.r2D(vvalue));
  return vvalue;
};
const eclipticLatitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nB0Coefficients = GFX.g_B0VenusCoefficients.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0VenusCoefficients[i].a * Math.cos(GFX.g_B0VenusCoefficients[i].b + GFX.g_B0VenusCoefficients[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1VenusCoefficients.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1VenusCoefficients[i].a * Math.cos(GFX.g_B1VenusCoefficients[i].b + GFX.g_B1VenusCoefficients[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2VenusCoefficients.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2VenusCoefficients[i].a * Math.cos(GFX.g_B2VenusCoefficients[i].b + GFX.g_B2VenusCoefficients[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3VenusCoefficients.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3VenusCoefficients[i].a * Math.cos(GFX.g_B3VenusCoefficients[i].b + GFX.g_B3VenusCoefficients[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4VenusCoefficients.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4VenusCoefficients[i].a * Math.cos(GFX.g_B4VenusCoefficients[i].b + GFX.g_B4VenusCoefficients[i].c * rho);
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
  const nR0Coefficients = GFX.g_R0VenusCoefficients.length;
  let R0 = 0;
  let i;
  for (i = 0; i < nR0Coefficients; i++) {
    R0 += GFX.g_R0VenusCoefficients[i].a * Math.cos(GFX.g_R0VenusCoefficients[i].b + GFX.g_R0VenusCoefficients[i].c * rho);
  }
  const nR1Coefficients = GFX.g_R1VenusCoefficients.length;
  let R1 = 0;
  for (i = 0; i < nR1Coefficients; i++) {
    R1 += GFX.g_R1VenusCoefficients[i].a * Math.cos(GFX.g_R1VenusCoefficients[i].b + GFX.g_R1VenusCoefficients[i].c * rho);
  }
  const nR2Coefficients = GFX.g_R2VenusCoefficients.length;
  let R2 = 0;
  for (i = 0; i < nR2Coefficients; i++) {
    R2 += GFX.g_R2VenusCoefficients[i].a * Math.cos(GFX.g_R2VenusCoefficients[i].b + GFX.g_R2VenusCoefficients[i].c * rho);
  }
  const nR3Coefficients = GFX.g_R3VenusCoefficients.length;
  let R3 = 0;
  for (i = 0; i < nR3Coefficients; i++) {
    R3 += GFX.g_R3VenusCoefficients[i].a * Math.cos(GFX.g_R3VenusCoefficients[i].b + GFX.g_R3VenusCoefficients[i].c * rho);
  }
  const nR4Coefficients = GFX.g_R4VenusCoefficients.length;
  let R4 = 0;
  for (i = 0; i < nR4Coefficients; i++) {
    R4 += GFX.g_R4VenusCoefficients[i].a * Math.cos(GFX.g_R4VenusCoefficients[i].b + GFX.g_R4VenusCoefficients[i].c * rho);
  }
  return (R0 + R1 * rho + R2 * rhosquared + R3 * rhocubed + R4 * rho4) / 100000000;
};
export const CAAVenus = {
  eclipticLatitude,
  eclipticLongitude,
  radiusVector
};