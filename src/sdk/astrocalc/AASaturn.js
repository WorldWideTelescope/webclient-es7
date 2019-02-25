import GFX from './GFX';
import {CT} from './AACoordinateTransformation';
import {CAAEarth} from './AAEarth';
import {CAAFK5} from './AAFK5';
import {ELL} from './AAElliptical';
import {CAANutation} from './AANutation';
const eclipticLongitude = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nL0Coefficients = GFX.g_L0SaturnCoefficients.length;
  let L0 = 0;
  let i;
  for (i = 0; i < nL0Coefficients; i++) {
    L0 += GFX.g_L0SaturnCoefficients[i].a * Math.cos(GFX.g_L0SaturnCoefficients[i].b + GFX.g_L0SaturnCoefficients[i].c * rho);
  }
  const nL1Coefficients = GFX.g_L1SaturnCoefficients.length;
  let L1 = 0;
  for (i = 0; i < nL1Coefficients; i++) {
    L1 += GFX.g_L1SaturnCoefficients[i].a * Math.cos(GFX.g_L1SaturnCoefficients[i].b + GFX.g_L1SaturnCoefficients[i].c * rho);
  }
  const nL2Coefficients = GFX.g_L2SaturnCoefficients.length;
  let L2 = 0;
  for (i = 0; i < nL2Coefficients; i++) {
    L2 += GFX.g_L2SaturnCoefficients[i].a * Math.cos(GFX.g_L2SaturnCoefficients[i].b + GFX.g_L2SaturnCoefficients[i].c * rho);
  }
  const nL3Coefficients = GFX.g_L3SaturnCoefficients.length;
  let L3 = 0;
  for (i = 0; i < nL3Coefficients; i++) {
    L3 += GFX.g_L3SaturnCoefficients[i].a * Math.cos(GFX.g_L3SaturnCoefficients[i].b + GFX.g_L3SaturnCoefficients[i].c * rho);
  }
  const nL4Coefficients = GFX.g_L4SaturnCoefficients.length;
  let L4 = 0;
  for (i = 0; i < nL4Coefficients; i++) {
    L4 += GFX.g_L4SaturnCoefficients[i].a * Math.cos(GFX.g_L4SaturnCoefficients[i].b + GFX.g_L4SaturnCoefficients[i].c * rho);
  }
  const nL5Coefficients = GFX.g_L5SaturnCoefficients.length;
  let L5 = 0;
  for (i = 0; i < nL5Coefficients; i++) {
    L5 += GFX.g_L5SaturnCoefficients[i].a * Math.cos(GFX.g_L5SaturnCoefficients[i].b + GFX.g_L5SaturnCoefficients[i].c * rho);
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
  const rho5 = rho4 * rho;
  const nB0Coefficients = GFX.g_B0SaturnCoefficients.length;
  let B0 = 0;
  let i;
  for (i = 0; i < nB0Coefficients; i++) {
    B0 += GFX.g_B0SaturnCoefficients[i].a * Math.cos(GFX.g_B0SaturnCoefficients[i].b + GFX.g_B0SaturnCoefficients[i].c * rho);
  }
  const nB1Coefficients = GFX.g_B1SaturnCoefficients.length;
  let B1 = 0;
  for (i = 0; i < nB1Coefficients; i++) {
    B1 += GFX.g_B1SaturnCoefficients[i].a * Math.cos(GFX.g_B1SaturnCoefficients[i].b + GFX.g_B1SaturnCoefficients[i].c * rho);
  }
  const nB2Coefficients = GFX.g_B2SaturnCoefficients.length;
  let B2 = 0;
  for (i = 0; i < nB2Coefficients; i++) {
    B2 += GFX.g_B2SaturnCoefficients[i].a * Math.cos(GFX.g_B2SaturnCoefficients[i].b + GFX.g_B2SaturnCoefficients[i].c * rho);
  }
  const nB3Coefficients = GFX.g_B3SaturnCoefficients.length;
  let B3 = 0;
  for (i = 0; i < nB3Coefficients; i++) {
    B3 += GFX.g_B3SaturnCoefficients[i].a * Math.cos(GFX.g_B3SaturnCoefficients[i].b + GFX.g_B3SaturnCoefficients[i].c * rho);
  }
  const nB4Coefficients = GFX.g_B4SaturnCoefficients.length;
  let B4 = 0;
  for (i = 0; i < nB4Coefficients; i++) {
    B4 += GFX.g_B4SaturnCoefficients[i].a * Math.cos(GFX.g_B4SaturnCoefficients[i].b + GFX.g_B4SaturnCoefficients[i].c * rho);
  }
  const nB5Coefficients = GFX.g_B5SaturnCoefficients.length;
  let B5 = 0;
  for (i = 0; i < nB5Coefficients; i++) {
    B5 += GFX.g_B5SaturnCoefficients[i].a * Math.cos(GFX.g_B5SaturnCoefficients[i].b + GFX.g_B5SaturnCoefficients[i].c * rho);
  }
  let vvalue = (B0 + B1 * rho + B2 * rhosquared + B3 * rhocubed + B4 * rho4 + B5 * rho5) / 100000000;
  vvalue = CT.r2D(vvalue);
  return vvalue;
};
const radiusVector = function(JD) {
  const rho = (JD - 2451545) / 365250;
  const rhosquared = rho * rho;
  const rhocubed = rhosquared * rho;
  const rho4 = rhocubed * rho;
  const rho5 = rho4 * rho;
  const nR0Coefficients = GFX.g_R0SaturnCoefficients.length;
  let R0 = 0;
  let i;
  for (i = 0; i < nR0Coefficients; i++) {
    R0 += GFX.g_R0SaturnCoefficients[i].a * Math.cos(GFX.g_R0SaturnCoefficients[i].b + GFX.g_R0SaturnCoefficients[i].c * rho);
  }
  const nR1Coefficients = GFX.g_R1SaturnCoefficients.length;
  let R1 = 0;
  for (i = 0; i < nR1Coefficients; i++) {
    R1 += GFX.g_R1SaturnCoefficients[i].a * Math.cos(GFX.g_R1SaturnCoefficients[i].b + GFX.g_R1SaturnCoefficients[i].c * rho);
  }
  const nR2Coefficients = GFX.g_R2SaturnCoefficients.length;
  let R2 = 0;
  for (i = 0; i < nR2Coefficients; i++) {
    R2 += GFX.g_R2SaturnCoefficients[i].a * Math.cos(GFX.g_R2SaturnCoefficients[i].b + GFX.g_R2SaturnCoefficients[i].c * rho);
  }
  const nR3Coefficients = GFX.g_R3SaturnCoefficients.length;
  let R3 = 0;
  for (i = 0; i < nR3Coefficients; i++) {
    R3 += GFX.g_R3SaturnCoefficients[i].a * Math.cos(GFX.g_R3SaturnCoefficients[i].b + GFX.g_R3SaturnCoefficients[i].c * rho);
  }
  const nR4Coefficients = GFX.g_R4SaturnCoefficients.length;
  let R4 = 0;
  for (i = 0; i < nR4Coefficients; i++) {
    R4 += GFX.g_R4SaturnCoefficients[i].a * Math.cos(GFX.g_R4SaturnCoefficients[i].b + GFX.g_R4SaturnCoefficients[i].c * rho);
  }
  const nR5Coefficients = GFX.g_R5SaturnCoefficients.length;
  let R5 = 0;
  for (i = 0; i < nR5Coefficients; i++) {
    R5 += GFX.g_R5SaturnCoefficients[i].a * Math.cos(GFX.g_R5SaturnCoefficients[i].b + GFX.g_R5SaturnCoefficients[i].c * rho);
  }
  return (R0 + R1 * rho + R2 * rhosquared + R3 * rhocubed + R4 * rho4 + R5 * rho5) / 100000000;
};

export const CAASaturn = {
  eclipticLongitude,
  eclipticLatitude,
  radiusVector
};

export function CAASaturnRingDetails() {
  this.b = 0;
  this.bdash = 0;
  this.p = 0;
  this.a = 0;
  this.b = 0;
  this.deltaU = 0;
  this.b = 0;
  this.bdash = 0;
  this.p = 0;
  this.a = 0;
  this.b = 0;
  this.deltaU = 0;
}

const calculate = function(JD) {
  const details = new CAASaturnRingDetails();
  const T = (JD - 2451545) / 36525;
  const T2 = T * T;
  const i = 28.075216 - 0.012998 * T + 4E-06 * T2;
  const irad = CT.d2R(i);
  const omega = 169.50847 + 1.394681 * T + 0.000412 * T2;
  const omegarad = CT.d2R(omega);
  let l0 = CAAEarth.eclipticLongitude(JD);
  let b0 = CAAEarth.eclipticLatitude(JD);
  l0 += CAAFK5.correctionInLongitude(l0, b0, JD);
  const l0rad = CT.d2R(l0);
  b0 += CAAFK5.correctionInLatitude(l0, JD);
  const b0rad = CT.d2R(b0);
  const R = CAAEarth.radiusVector(JD);
  let DELTA = 9;
  let PreviousEarthLightTravelTime = 0;
  let EarthLightTravelTime = ELL.distanceToLightTime(DELTA);
  let JD1 = JD - EarthLightTravelTime;
  let bIterate = true;
  let x = 0;
  let y = 0;
  let z = 0;
  let l = 0;
  let b = 0;
  let r = 0;
  while (bIterate) {
    l = CAASaturn.eclipticLongitude(JD1);
    b = CAASaturn.eclipticLatitude(JD1);
    l += CAAFK5.correctionInLongitude(l, b, JD1);
    b += CAAFK5.correctionInLatitude(l, JD1);
    const lrad = CT.d2R(l);
    const brad = CT.d2R(b);
    r = CAASaturn.radiusVector(JD1);
    x = r * Math.cos(brad) * Math.cos(lrad) - R * Math.cos(l0rad);
    y = r * Math.cos(brad) * Math.sin(lrad) - R * Math.sin(l0rad);
    z = r * Math.sin(brad) - R * Math.sin(b0rad);
    DELTA = Math.sqrt(x * x + y * y + z * z);
    EarthLightTravelTime = ELL.distanceToLightTime(DELTA);
    bIterate = (Math.abs(EarthLightTravelTime - PreviousEarthLightTravelTime) > 2E-06);
    if (bIterate) {
      JD1 = JD - EarthLightTravelTime;
      PreviousEarthLightTravelTime = EarthLightTravelTime;
    }
  }
  let lambda = Math.atan2(y, x);
  let beta = Math.atan2(z, Math.sqrt(x * x + y * y));
  details.b = Math.asin(Math.sin(irad) * Math.cos(beta) * Math.sin(lambda - omegarad) - Math.cos(irad) * Math.sin(beta));
  details.a = 375.35 / DELTA;
  details.b = details.a * Math.sin(Math.abs(details.b));
  details.b = CT.r2D(details.b);
  const N = 113.6655 + 0.8771 * T;
  const Nrad = CT.d2R(N);
  const ldash = l - 0.01759 / r;
  const ldashrad = CT.d2R(ldash);
  const bdash = b - 0.000764 * Math.cos(ldashrad - Nrad) / r;
  const bdashrad = CT.d2R(bdash);
  details.bdash = CT.r2D(Math.asin(Math.sin(irad) * Math.cos(bdashrad) * Math.sin(ldashrad - omegarad) - Math.cos(irad) * Math.sin(bdashrad)));
  const U1 = Math.atan2(Math.sin(irad) * Math.sin(bdashrad) + Math.cos(irad) * Math.cos(bdashrad) * Math.sin(ldashrad - omegarad), Math.cos(bdashrad) * Math.cos(ldashrad - omegarad));
  const U2 = Math.atan2(Math.sin(irad) * Math.sin(beta) + Math.cos(irad) * Math.cos(beta) * Math.sin(lambda - omegarad), Math.cos(beta) * Math.cos(lambda - omegarad));
  details.deltaU = CT.r2D(Math.abs(U1 - U2));
  const Obliquity = CAANutation.trueObliquityOfEcliptic(JD);
  const NutationInLongitude = CAANutation.nutationInLongitude(JD);
  let lambda0 = omega - 90;
  const beta0 = 90 - i;
  lambda += CT.d2R(0.005693 * Math.cos(l0rad - lambda) / Math.cos(beta));
  beta += CT.d2R(0.005693 * Math.sin(l0rad - lambda) * Math.sin(beta));
  lambda = CT.r2D(lambda);
  lambda += NutationInLongitude / 3600;
  lambda = CT.m360(lambda);
  lambda0 += NutationInLongitude / 3600;
  lambda0 = CT.m360(lambda0);
  beta = CT.r2D(beta);
  const GeocentricEclipticSaturn = CT.ec2Eq(lambda, beta, Obliquity);
  const alpha = CT.h2R(GeocentricEclipticSaturn.x);
  const delta = CT.d2R(GeocentricEclipticSaturn.y);
  const GeocentricEclipticNorthPole = CT.ec2Eq(lambda0, beta0, Obliquity);
  const alpha0 = CT.h2R(GeocentricEclipticNorthPole.x);
  const delta0 = CT.d2R(GeocentricEclipticNorthPole.y);
  details.p = CT.r2D(Math.atan2(Math.cos(delta0) * Math.sin(alpha0 - alpha), Math.sin(delta0) * Math.cos(delta) - Math.cos(delta0) * Math.sin(delta) * Math.cos(alpha0 - alpha)));
  return details;
};
export const CAASaturnRings = {calculate};

