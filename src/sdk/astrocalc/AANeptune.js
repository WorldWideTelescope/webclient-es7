import GFX from './GFX';
import {CT} from './AACoordinateTransformation';

const eclipticLongitude = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nL0Coefficients = GFX.g_L0NC.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0NC[i].a * Math.cos(GFX.g_L0NC[i].b + GFX.g_L0NC[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1NC.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1NC[i].a * Math.cos(GFX.g_L1NC[i].b + GFX.g_L1NC[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2NC.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2NC[i].a * Math.cos(GFX.g_L2NC[i].b + GFX.g_L2NC[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3NC.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3NC[i].a * Math.cos(GFX.g_L3NC[i].b + GFX.g_L3NC[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4NC.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4NC[i].a * Math.cos(GFX.g_L4NC[i].b + GFX.g_L4NC[i].c * rho);
  }
  let vvalue = (L0 + L1 * rho + L2 * rhosquared + L3 * rhocubed + L4 * rho4) / 100000000;
  vvalue = CT.m360(CT.r2D(vvalue));
  return vvalue;
};
const eclipticLatitude = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const nB0Coefficients = GFX.g_B0NC.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0NC[i].a * Math.cos(GFX.g_B0NC[i].b + GFX.g_B0NC[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1NC.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1NC[i].a * Math.cos(GFX.g_B1NC[i].b + GFX.g_B1NC[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2NC.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2NC[i].a * Math.cos(GFX.g_B2NC[i].b + GFX.g_B2NC[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3NC.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3NC[i].a * Math.cos(GFX.g_B3NC[i].b + GFX.g_B3NC[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4NC.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4NC[i].a * Math.cos(GFX.g_B4NC[i].b + GFX.g_B4NC[i].c * rho);
  }
  let vvalue = (B0 + B1 * rho + B2 * rhosquared + B3 * rhocubed + B4 * rho4) / 100000000;
  vvalue = CT.r2D(vvalue);
  return vvalue;
};
const radiusVector = JD => {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const nR0Coefficients = GFX.g_R0NC.length;
  let R0 = 0;
  let i;
  for (i = 0; i < nR0Coefficients; i++) {
    R0 += GFX.g_R0NC[i].a * Math.cos(GFX.g_R0NC[i].b + GFX.g_R0NC[i].c * rho);
  }
  const nR1Coefficients = GFX.g_R1NC.length;
  let R1 = 0;
  for (i = 0; i < nR1Coefficients; i++) {
    R1 += GFX.g_R1NC[i].a * Math.cos(GFX.g_R1NC[i].b + GFX.g_R1NC[i].c * rho);
  }
  const nR2Coefficients = GFX.g_R2NC.length;
  let R2 = 0;
  for (i = 0; i < nR2Coefficients; i++) {
    R2 += GFX.g_R2NC[i].a * Math.cos(GFX.g_R2NC[i].b + GFX.g_R2NC[i].c * rho);
  }
  const nR3Coefficients = GFX.g_R3NC.length;
  let R3 = 0;
  for (i = 0; i < nR3Coefficients; i++) {
    R3 += GFX.g_R3NC[i].a * Math.cos(GFX.g_R3NC[i].b + GFX.g_R3NC[i].c * rho);
  }
  return (R0 + R1 * rho + R2 * rhosquared + R3 * rhocubed) / 100000000;
};

export const CAANeptune = {
  eclipticLongitude,
  eclipticLatitude,
  radiusVector
};