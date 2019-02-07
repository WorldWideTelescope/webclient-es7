import GFX from './GFX';
import {CT} from './AACoordinateTransformation';
const eclipticLongitude = function(JD) {
  const T = (JD - 2451545) / 36525;
  const J = 34.35 + 3034.9057 * T;
  const S = 50.08 + 1222.1138 * T;
  const P = 238.96 + 144.96 * T;
  let L = 0;
  const nPlutoCoefficients = GFX.g_PlutoArgumentCoefficients.length;
  for (let i = 0; i < nPlutoCoefficients; i++) {
    let Alpha = GFX.g_PlutoArgumentCoefficients[i].j * J + GFX.g_PlutoArgumentCoefficients[i].s * S + GFX.g_PlutoArgumentCoefficients[i].p * P;
    Alpha = CT.d2R(Alpha);
    L += ((GFX.g_PlutoLongitudeCoefficients[i].a * Math.sin(Alpha)) + (GFX.g_PlutoLongitudeCoefficients[i].b * Math.cos(Alpha)));
  }
  L = L / 1000000;
  L += (238.958116 + 144.96 * T);
  L = CT.m360(L);
  return L;
};
const eclipticLatitude = function(JD) {
  const T = (JD - 2451545) / 36525;
  const J = 34.35 + 3034.9057 * T;
  const S = 50.08 + 1222.1138 * T;
  const P = 238.96 + 144.96 * T;
  let L = 0;
  const nPlutoCoefficients = GFX.g_PlutoArgumentCoefficients.length;
  for (let i = 0; i < nPlutoCoefficients; i++) {
    let Alpha = GFX.g_PlutoArgumentCoefficients[i].j * J + GFX.g_PlutoArgumentCoefficients[i].s * S + GFX.g_PlutoArgumentCoefficients[i].p * P;
    Alpha = CT.d2R(Alpha);
    L += ((GFX.g_PlutoLatitudeCoefficients[i].a * Math.sin(Alpha)) + (GFX.g_PlutoLatitudeCoefficients[i].b * Math.cos(Alpha)));
  }
  L = L / 1000000;
  L += -3.908239;
  return L;
};
const radiusVector = function(JD) {
  const T = (JD - 2451545) / 36525;
  const J = 34.35 + 3034.9057 * T;
  const S = 50.08 + 1222.1138 * T;
  const P = 238.96 + 144.96 * T;
  let R = 0;
  const nPlutoCoefficients = GFX.g_PlutoArgumentCoefficients.length;
  for (let i = 0; i < nPlutoCoefficients; i++) {
    let Alpha = GFX.g_PlutoArgumentCoefficients[i].j * J + GFX.g_PlutoArgumentCoefficients[i].s * S + GFX.g_PlutoArgumentCoefficients[i].p * P;
    Alpha = CT.d2R(Alpha);
    R += ((GFX.g_PlutoRadiusCoefficients[i].a * Math.sin(Alpha)) + (GFX.g_PlutoRadiusCoefficients[i].b * Math.cos(Alpha)));
  }
  R = R / 10000000;
  R += 40.7241346;
  return R;
};
export const CAAPluto = {
  eclipticLongitude,
  eclipticLatitude,
  radiusVector
};

export function PlutoCoefficient1(j, s, p) {
  this.j = 0;
  this.s = 0;
  this.p = 0;
  this.j = j;
  this.s = s;
  this.p = p;
}

export function PlutoCoefficient2(a, b) {
  this.a = a;
  this.b = b;
}
