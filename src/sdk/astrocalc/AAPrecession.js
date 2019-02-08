// CAAPrecession

import {CT} from './AACoordinateTransformation';
export function CAAPrecession() {
}
CAAPrecession.precessEquatorial = function(Alpha, Delta, JD0, JD) {
  const T = (JD0 - 2451545) / 36525;
  const Tsquared = T * T;
  const t = (JD - JD0) / 36525;
  const tsquared = t * t;
  const tcubed = tsquared * t;
  Alpha = CT.h2R(Alpha);
  Delta = CT.d2R(Delta);
  let sigma = (2306.2181 + 1.39656 * T - 0.000139 * Tsquared) * t + (0.30188 - 3.44E-05 * T) * tsquared + 0.017988 * tcubed;
  sigma = CT.d2R(CT.dmS2D(0, 0, sigma));
  let zeta = (2306.2181 + 1.39656 * T - 0.000138 * Tsquared) * t + (1.09468 + 6.6E-05 * T) * tsquared + 0.018203 * tcubed;
  zeta = CT.d2R(CT.dmS2D(0, 0, zeta));
  let phi = (2004.3109 - 0.8533 * T - 0.000217 * Tsquared) * t - (0.42665 + 0.000217 * T) * tsquared - 0.041833 * tcubed;
  phi = CT.d2R(CT.dmS2D(0, 0, phi));
  const A = Math.cos(Delta) * Math.sin(Alpha + sigma);
  const B = Math.cos(phi) * Math.cos(Delta) * Math.cos(Alpha + sigma) - Math.sin(phi) * Math.sin(Delta);
  const C = Math.sin(phi) * Math.cos(Delta) * Math.cos(Alpha + sigma) + Math.cos(phi) * Math.sin(Delta);
  const vvalue = new COR();
  vvalue.x = CT.r2H(Math.atan2(A, B) + zeta);
  if (vvalue.x < 0) {
    vvalue.x += 24;
  }
  vvalue.y = CT.r2D(Math.asin(C));
  return vvalue;
};
CAAPrecession.precessEquatorialFK4 = function(Alpha, Delta, JD0, JD) {
  const T = (JD0 - 2415020.3135) / 36524.2199;
  const t = (JD - JD0) / 36524.2199;
  const tsquared = t * t;
  const tcubed = tsquared * t;
  Alpha = CT.h2R(Alpha);
  Delta = CT.d2R(Delta);
  let sigma = (2304.25 + 1.396 * T) * t + 0.302 * tsquared + 0.018 * tcubed;
  sigma = CT.d2R(CT.dmS2D(0, 0, sigma));
  let zeta = 0.791 * tsquared + 0.001 * tcubed;
  zeta = CT.d2R(CT.dmS2D(0, 0, zeta));
  zeta += sigma;
  let phi = (2004.682 - 0.853 * T) * t - 0.426 * tsquared - 0.042 * tcubed;
  phi = CT.d2R(CT.dmS2D(0, 0, phi));
  const A = Math.cos(Delta) * Math.sin(Alpha + sigma);
  const B = Math.cos(phi) * Math.cos(Delta) * Math.cos(Alpha + sigma) - Math.sin(phi) * Math.sin(Delta);
  const C = Math.sin(phi) * Math.cos(Delta) * Math.cos(Alpha + sigma) + Math.cos(phi) * Math.sin(Delta);
  const vvalue = new COR();
  vvalue.x = CT.r2H(Math.atan2(A, B) + zeta);
  if (vvalue.x < 0) {
    vvalue.x += 24;
  }
  vvalue.y = CT.r2D(Math.asin(C));
  return vvalue;
};
CAAPrecession.precessEcliptic = function(Lambda, Beta, JD0, JD) {
  const T = (JD0 - 2451545) / 36525;
  const Tsquared = T * T;
  const t = (JD - JD0) / 36525;
  const tsquared = t * t;
  const tcubed = tsquared * t;
  Lambda = CT.d2R(Lambda);
  Beta = CT.d2R(Beta);
  let eta = (47.0029 - 0.06603 * T + 0.000598 * Tsquared) * t + (-0.03302 + 0.000598 * T) * tsquared + 6E-05 * tcubed;
  eta = CT.d2R(CT.dmS2D(0, 0, eta));
  let pi = 174.876384 * 3600 + 3289.4789 * T + 0.60622 * Tsquared - (869.8089 + 0.50491 * T) * t + 0.03536 * tsquared;
  pi = CT.d2R(CT.dmS2D(0, 0, pi));
  let p = (5029.0966 + 2.22226 * T - 4.2E-05 * Tsquared) * t + (1.11113 - 4.2E-05 * T) * tsquared - 6E-06 * tcubed;
  p = CT.d2R(CT.dmS2D(0, 0, p));
  const A = Math.cos(eta) * Math.cos(Beta) * Math.sin(pi - Lambda) - Math.sin(eta) * Math.sin(Beta);
  const B = Math.cos(Beta) * Math.cos(pi - Lambda);
  const C = Math.cos(eta) * Math.sin(Beta) + Math.sin(eta) * Math.cos(Beta) * Math.sin(pi - Lambda);
  const vvalue = new COR();
  vvalue.x = CT.r2D(p + pi - Math.atan2(A, B));
  if (vvalue.x < 0) {
    vvalue.x += 360;
  }
  vvalue.y = CT.r2D(Math.asin(C));
  return vvalue;
};
CAAPrecession.equatorialPMToEcliptic = function(Alpha, Delta, Beta, PMAlpha, PMDelta, Epsilon) {
  Epsilon = CT.d2R(Epsilon);
  Alpha = CT.h2R(Alpha);
  Delta = CT.d2R(Delta);
  Beta = CT.d2R(Beta);
  const cosb = Math.cos(Beta);
  const sinEpsilon = Math.sin(Epsilon);
  const vvalue = new COR();
  vvalue.x = (PMDelta * sinEpsilon * Math.cos(Alpha) + PMAlpha * Math.cos(Delta) * (Math.cos(Epsilon) * Math.cos(Delta) + sinEpsilon * Math.sin(Delta) * Math.sin(Alpha))) / (cosb * cosb);
  vvalue.y = (PMDelta * (Math.cos(Epsilon) * Math.cos(Delta) + sinEpsilon * Math.sin(Delta) * Math.sin(Alpha)) - PMAlpha * sinEpsilon * Math.cos(Alpha) * Math.cos(Delta)) / cosb;
  return vvalue;
};
CAAPrecession.adjustPositionUsingUniformProperMotion = function(t, Alpha, Delta, PMAlpha, PMDelta) {
  const vvalue = new COR();
  vvalue.x = Alpha + (PMAlpha * t / 3600);
  vvalue.y = Delta + (PMDelta * t / 3600);
  return vvalue;
};
CAAPrecession.adjustPositionUsingMotionInSpace = function(r, DeltaR, t, Alpha, Delta, PMAlpha, PMDelta) {
  DeltaR /= 977792;
  PMAlpha /= 13751;
  PMDelta /= 206265;
  Alpha = CT.h2R(Alpha);
  Delta = CT.d2R(Delta);
  let x = r * Math.cos(Delta) * Math.cos(Alpha);
  let y = r * Math.cos(Delta) * Math.sin(Alpha);
  let z = r * Math.sin(Delta);
  const DeltaX = x / r * DeltaR - z * PMDelta * Math.cos(Alpha) - y * PMAlpha;
  const DeltaY = y / r * DeltaR - z * PMDelta * Math.sin(Alpha) + x * PMAlpha;
  const DeltaZ = z / r * DeltaR + r * PMDelta * Math.cos(Delta);
  x += t * DeltaX;
  y += t * DeltaY;
  z += t * DeltaZ;
  const vvalue = new COR();
  vvalue.x = CT.r2H(Math.atan2(y, x));
  if (vvalue.x < 0) {
    vvalue.x += 24;
  }
  vvalue.y = CT.r2D(Math.atan2(z, Math.sqrt(x * x + y * y)));
  return vvalue;
};