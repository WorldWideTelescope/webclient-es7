export function CAAEclipticalElementDetails() {
  this.i = 0;
  this.w = 0;
  this.omega = 0;
  this.i = 0;
  this.w = 0;
  this.omega = 0;
}
export const CAAEclipticalElementDetails$ = {};

export function CAAEclipticalElements() {}
CAAEclipticalElements.calculate = function(i0, w0, omega0, JD0, JD) {
  const T = (JD0 - 2451545) / 36525;
  const Tsquared = T * T;
  const t = (JD - JD0) / 36525;
  const tsquared = t * t;
  const tcubed = tsquared * t;
  const i0rad = CT.d2R(i0);
  const omega0rad = CT.d2R(omega0);
  let eta = (47.0029 - 0.06603 * T + 0.000598 * Tsquared) * t + (-0.03302 + 0.000598 * T) * tsquared + 6E-05 * tcubed;
  eta = CT.d2R(CT.dmS2D(0, 0, eta));
  let pi = 174.876384 * 3600 + 3289.4789 * T + 0.60622 * Tsquared - (869.8089 + 0.50491 * T) * t + 0.03536 * tsquared;
  pi = CT.d2R(CT.dmS2D(0, 0, pi));
  let p = (5029.0966 + 2.22226 * T - 4.2E-05 * Tsquared) * t + (1.11113 - 4.2E-05 * T) * tsquared - 6E-06 * tcubed;
  p = CT.d2R(CT.dmS2D(0, 0, p));
  const sini0rad = Math.sin(i0rad);
  const cosi0rad = Math.cos(i0rad);
  const sinomega0rad_pi = Math.sin(omega0rad - pi);
  const cosomega0rad_pi = Math.cos(omega0rad - pi);
  const sineta = Math.sin(eta);
  const coseta = Math.cos(eta);
  let A = sini0rad * sinomega0rad_pi;
  let B = -sineta * cosi0rad + coseta * sini0rad * cosomega0rad_pi;
  const irad = Math.asin(Math.sqrt(A * A + B * B));
  const details = new CAAEclipticalElementDetails();
  details.i = CT.r2D(irad);
  const cosi = cosi0rad * coseta + sini0rad * sineta * cosomega0rad_pi;
  if (cosi < 0) {
    details.i = 180 - details.i;
  }
  const phi = pi + p;
  details.omega = CT.m360(CT.r2D(Math.atan2(A, B) + phi));
  A = -sineta * sinomega0rad_pi;
  B = sini0rad * coseta - cosi0rad * sineta * cosomega0rad_pi;
  const deltaw = CT.r2D(Math.atan2(A, B));
  details.w = CT.m360(w0 + deltaw);
  return details;
};
CAAEclipticalElements.fK4B1950ToFK5J2000 = function(i0, w0, omega0) {
  const L = CT.d2R(5.19856209);
  const J = CT.d2R(0.00651966);
  const i0rad = CT.d2R(i0);
  const omega0rad = CT.d2R(omega0);
  const sini0rad = Math.sin(i0rad);
  const cosi0rad = Math.cos(i0rad);
  const cosJ = Math.cos(J);
  const sinJ = Math.sin(J);
  const W = L + omega0rad;
  const cosW = Math.cos(W);
  const sinW = Math.sin(W);
  const A = sinJ * sinW;
  const B = sini0rad * cosJ + cosi0rad * sinJ * cosW;
  const details = new CAAEclipticalElementDetails();
  details.i = CT.r2D(Math.asin(Math.sqrt(A * A + B * B)));
  const cosi = cosi0rad * cosJ - sini0rad * sinJ * cosW;
  if (cosi < 0) {
    details.i = 180 - details.i;
  }
  details.w = CT.m360(w0 + CT.r2D(Math.atan2(A, B)));
  details.omega = CT.m360(CT.r2D(Math.atan2(sini0rad * sinW, cosi0rad * sinJ + sini0rad * cosJ * cosW)) - 4.50001688);
  return details;
};
export const CAAEclipticalElements$ = {};