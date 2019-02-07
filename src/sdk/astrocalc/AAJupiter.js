import GFX from './GFX';
import {CT} from './AACoordinateTransformation';

export function CAAJupiter() {}
CAAJupiter.eclipticLongitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nL0Coefficients = GFX.g_L0JupiterCoefficients.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0JupiterCoefficients[i].a * Math.cos(GFX.g_L0JupiterCoefficients[i].b + GFX.g_L0JupiterCoefficients[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1JupiterCoefficients.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1JupiterCoefficients[i].a * Math.cos(GFX.g_L1JupiterCoefficients[i].b + GFX.g_L1JupiterCoefficients[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2JupiterCoefficients.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2JupiterCoefficients[i].a * Math.cos(GFX.g_L2JupiterCoefficients[i].b + GFX.g_L2JupiterCoefficients[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3JupiterCoefficients.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3JupiterCoefficients[i].a * Math.cos(GFX.g_L3JupiterCoefficients[i].b + GFX.g_L3JupiterCoefficients[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4JupiterCoefficients.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4JupiterCoefficients[i].a * Math.cos(GFX.g_L4JupiterCoefficients[i].b + GFX.g_L4JupiterCoefficients[i].c * rho);
  }
  const nL5Coefficients = GFX.g_L5JupiterCoefficients.length;
  let L5 = 0;
  for (i = 0; i < nL5Coefficients; i++) {
    L5 += GFX.g_L5JupiterCoefficients[i].a * Math.cos(GFX.g_L5JupiterCoefficients[i].b + GFX.g_L5JupiterCoefficients[i].c * rho);
  }
  let vvalue = (L0 + L1 * rho + L2 * rhosquared + L3 * rhocubed + L4 * rho4 + L5 * rho5) / 100000000;
  vvalue = CT.m360(CT.r2D(vvalue));
  return vvalue;
};
CAAJupiter.eclipticLatitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nB0Coefficients = GFX.g_B0JupiterCoefficients.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0JupiterCoefficients[i].a * Math.cos(GFX.g_B0JupiterCoefficients[i].b + GFX.g_B0JupiterCoefficients[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1JupiterCoefficients.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1JupiterCoefficients[i].a * Math.cos(GFX.g_B1JupiterCoefficients[i].b + GFX.g_B1JupiterCoefficients[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2JupiterCoefficients.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2JupiterCoefficients[i].a * Math.cos(GFX.g_B2JupiterCoefficients[i].b + GFX.g_B2JupiterCoefficients[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3JupiterCoefficients.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3JupiterCoefficients[i].a * Math.cos(GFX.g_B3JupiterCoefficients[i].b + GFX.g_B3JupiterCoefficients[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4JupiterCoefficients.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4JupiterCoefficients[i].a * Math.cos(GFX.g_B4JupiterCoefficients[i].b + GFX.g_B4JupiterCoefficients[i].c * rho);
  }
  const nB5Coefficients = GFX.g_B5JupiterCoefficients.length;
  let B5 = 0;
  for (i = 0; i < nB5Coefficients; i++) {
    B5 += GFX.g_B5JupiterCoefficients[i].a * Math.cos(GFX.g_B5JupiterCoefficients[i].b + GFX.g_B5JupiterCoefficients[i].c * rho);
  }
  let vvalue = (B0 + B1 * rho + B2 * rhosquared + B3 * rhocubed + B4 * rho4 + B5 * rho5) / 100000000;
  vvalue = CT.r2D(vvalue);
  return vvalue;
};
CAAJupiter.radiusVector = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nR0Coefficients = GFX.g_R0JupiterCoefficients.length;
  let R0 = 0;
  let i;
  for (i = 0; i < nR0Coefficients; i++) {
    R0 += GFX.g_R0JupiterCoefficients[i].a * Math.cos(GFX.g_R0JupiterCoefficients[i].b + GFX.g_R0JupiterCoefficients[i].c * rho);
  }
  const nR1Coefficients = GFX.g_R1JupiterCoefficients.length;
  let R1 = 0;
  for (i = 0; i < nR1Coefficients; i++) {
    R1 += GFX.g_R1JupiterCoefficients[i].a * Math.cos(GFX.g_R1JupiterCoefficients[i].b + GFX.g_R1JupiterCoefficients[i].c * rho);
  }
  const nR2Coefficients = GFX.g_R2JupiterCoefficients.length;
  let R2 = 0;
  for (i = 0; i < nR2Coefficients; i++) {
    R2 += GFX.g_R2JupiterCoefficients[i].a * Math.cos(GFX.g_R2JupiterCoefficients[i].b + GFX.g_R2JupiterCoefficients[i].c * rho);
  }
  const nR3Coefficients = GFX.g_R3JupiterCoefficients.length;
  let R3 = 0;
  for (i = 0; i < nR3Coefficients; i++) {
    R3 += GFX.g_R3JupiterCoefficients[i].a * Math.cos(GFX.g_R3JupiterCoefficients[i].b + GFX.g_R3JupiterCoefficients[i].c * rho);
  }
  const nR4Coefficients = GFX.g_R4JupiterCoefficients.length;
  let R4 = 0;
  for (i = 0; i < nR4Coefficients; i++) {
    R4 += GFX.g_R4JupiterCoefficients[i].a * Math.cos(GFX.g_R4JupiterCoefficients[i].b + GFX.g_R4JupiterCoefficients[i].c * rho);
  }
  const nR5Coefficients = GFX.g_R5JupiterCoefficients.length;
  let R5 = 0;
  for (i = 0; i < nR5Coefficients; i++) {
    R5 += GFX.g_R5JupiterCoefficients[i].a * Math.cos(GFX.g_R5JupiterCoefficients[i].b + GFX.g_R5JupiterCoefficients[i].c * rho);
  }
  return (R0 + R1 * rho + R2 * rhosquared + R3 * rhocubed + R4 * rho4 + R5 * rho5) / 100000000;
};
export const CAAJupiter$ = {};