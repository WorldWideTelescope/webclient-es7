import {CT} from './AACoordinateTransformation';


export function ASEP() {
}
ASEP.separation = function(Alpha1, Delta1, Alpha2, Delta2) {
  Delta1 = CT.d2R(Delta1);
  Delta2 = CT.d2R(Delta2);
  Alpha1 = CT.h2R(Alpha1);
  Alpha2 = CT.h2R(Alpha2);
  const x = Math.cos(Delta1) * Math.sin(Delta2) - Math.sin(Delta1) * Math.cos(Delta2) * Math.cos(Alpha2 - Alpha1);
  const y = Math.cos(Delta2) * Math.sin(Alpha2 - Alpha1);
  const z = Math.sin(Delta1) * Math.sin(Delta2) + Math.cos(Delta1) * Math.cos(Delta2) * Math.cos(Alpha2 - Alpha1);
  let vvalue = Math.atan2(Math.sqrt(x * x + y * y), z);
  vvalue = CT.r2D(vvalue);
  if (vvalue < 0) {
    vvalue += 180;
  }
  return vvalue;
};
ASEP.positionAngle = function(alpha1, delta1, alpha2, delta2) {
  let Alpha1;
  let Delta1;
  let Alpha2;
  let Delta2;
  Delta1 = CT.d2R(delta1);
  Delta2 = CT.d2R(delta2);
  Alpha1 = CT.h2R(alpha1);
  Alpha2 = CT.h2R(alpha2);
  const DeltaAlpha = Alpha1 - Alpha2;
  const denominator = Math.cos(Delta2) * Math.tan(Delta1) - Math.sin(Delta2) * Math.cos(DeltaAlpha);
  const numerator = Math.sin(DeltaAlpha);
  let vvalue = Math.atan2(numerator, denominator);
  vvalue = CT.r2D(vvalue);
  return vvalue;
};
ASEP.distanceFromGreatArc = function(Alpha1, Delta1, Alpha2, Delta2, Alpha3, Delta3) {
  Delta1 = CT.d2R(Delta1);
  Delta2 = CT.d2R(Delta2);
  Delta3 = CT.d2R(Delta3);
  Alpha1 = CT.h2R(Alpha1);
  Alpha2 = CT.h2R(Alpha2);
  Alpha3 = CT.h2R(Alpha3);
  const X1 = Math.cos(Delta1) * Math.cos(Alpha1);
  const X2 = Math.cos(Delta2) * Math.cos(Alpha2);
  const Y1 = Math.cos(Delta1) * Math.sin(Alpha1);
  const Y2 = Math.cos(Delta2) * Math.sin(Alpha2);
  const Z1 = Math.sin(Delta1);
  const Z2 = Math.sin(Delta2);
  const A = Y1 * Z2 - Z1 * Y2;
  const B = Z1 * X2 - X1 * Z2;
  const C = X1 * Y2 - Y1 * X2;
  const m = Math.tan(Alpha3);
  const n = Math.tan(Delta3) / Math.cos(Alpha3);
  let vvalue = Math.asin((A + B * m + C * n) / (Math.sqrt(A * A + B * B + C * C) * Math.sqrt(1 + m * m + n * n)));
  vvalue = CT.r2D(vvalue);
  if (vvalue < 0) {
    vvalue = Math.abs(vvalue);
  }
  return vvalue;
};