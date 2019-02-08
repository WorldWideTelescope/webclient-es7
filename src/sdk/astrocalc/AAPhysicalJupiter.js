
import {CT} from './AACoordinateTransformation';
import {CAAEarth} from './AAEarth';
import {CAAJupiter} from './AAJupiter';
import {CAANutation} from './AANutation';

export function CAAPhysicalJupiterDetails() {
  this.DE = 0;
  this.DS = 0;
  this.geometricw1 = 0;
  this.geometricw2 = 0;
  this.apparentw1 = 0;
  this.apparentw2 = 0;
  this.p = 0;
  this.DE = 0;
  this.DS = 0;
  this.geometricw1 = 0;
  this.geometricw2 = 0;
  this.apparentw1 = 0;
  this.apparentw2 = 0;
  this.p = 0;
}

export function CAAPhysicalJupiter() {}

CAAPhysicalJupiter.calculate = function(JD) {
  const details = new CAAPhysicalJupiterDetails();
  const d = JD - 2433282.5;
  const T1 = d / 36525;
  const alpha0 = 268 + 0.1061 * T1;
  const alpha0rad = CT.d2R(alpha0);
  const delta0 = 64.5 - 0.0164 * T1;
  const delta0rad = CT.d2R(delta0);
  const W1 = CT.m360(17.71 + 877.90003539 * d);
  const W2 = CT.m360(16.838 + 870.27003539 * d);
  const l0 = CAAEarth.eclipticLongitude(JD);
  const l0rad = CT.d2R(l0);
  const b0 = CAAEarth.eclipticLatitude(JD);
  const b0rad = CT.d2R(b0);
  const R = CAAEarth.radiusVector(JD);
  let l = CAAJupiter.eclipticLongitude(JD);
  let lrad = CT.d2R(l);
  const b = CAAJupiter.eclipticLatitude(JD);
  const brad = CT.d2R(b);
  const r = CAAJupiter.radiusVector(JD);
  let x = r * Math.cos(brad) * Math.cos(lrad) - R * Math.cos(l0rad);
  let y = r * Math.cos(brad) * Math.sin(lrad) - R * Math.sin(l0rad);
  let z = r * Math.sin(brad) - R * Math.sin(b0rad);
  let DELTA = Math.sqrt(x * x + y * y + z * z);
  l -= 0.01299 * DELTA / (r * r);
  lrad = CT.d2R(l);
  x = r * Math.cos(brad) * Math.cos(lrad) - R * Math.cos(l0rad);
  y = r * Math.cos(brad) * Math.sin(lrad) - R * Math.sin(l0rad);
  z = r * Math.sin(brad) - R * Math.sin(b0rad);
  DELTA = Math.sqrt(x * x + y * y + z * z);
  let e0 = CAANutation.meanObliquityOfEcliptic(JD);
  let e0rad = CT.d2R(e0);
  const alphas = Math.atan2(Math.cos(e0rad) * Math.sin(lrad) - Math.sin(e0rad) * Math.tan(brad), Math.cos(lrad));
  const deltas = Math.asin(Math.cos(e0rad) * Math.sin(brad) + Math.sin(e0rad) * Math.cos(brad) * Math.sin(lrad));
  details.DS = CT.r2D(Math.asin(-Math.sin(delta0rad) * Math.sin(deltas) - Math.cos(delta0rad) * Math.cos(deltas) * Math.cos(alpha0rad - alphas)));
  const u = y * Math.cos(e0rad) - z * Math.sin(e0rad);
  const v = y * Math.sin(e0rad) + z * Math.cos(e0rad);
  let alpharad = Math.atan2(u, x);
  let alpha = CT.r2D(alpharad);
  let deltarad = Math.atan2(v, Math.sqrt(x * x + u * u));
  let delta = CT.r2D(deltarad);
  const xi = Math.atan2(Math.sin(delta0rad) * Math.cos(deltarad) * Math.cos(alpha0rad - alpharad) - Math.sin(deltarad) * Math.cos(delta0rad), Math.cos(deltarad) * Math.sin(alpha0rad - alpharad));
  details.DE = CT.r2D(Math.asin(-Math.sin(delta0rad) * Math.sin(deltarad) - Math.cos(delta0rad) * Math.cos(deltarad) * Math.cos(alpha0rad - alpharad)));
  details.geometricw1 = CT.m360(W1 - CT.r2D(xi) - 5.07033 * DELTA);
  details.geometricw2 = CT.m360(W2 - CT.r2D(xi) - 5.02626 * DELTA);
  const C = 57.2958 * (2 * r * DELTA + R * R - r * r - DELTA * DELTA) / (4 * r * DELTA);
  if (Math.sin(lrad - l0rad) > 0) {
    details.apparentw1 = CT.m360(details.geometricw1 + C);
    details.apparentw2 = CT.m360(details.geometricw2 + C);
  }
  else {
    details.apparentw1 = CT.m360(details.geometricw1 - C);
    details.apparentw2 = CT.m360(details.geometricw2 - C);
  }
  const NutationInLongitude = CAANutation.nutationInLongitude(JD);
  const NutationInObliquity = CAANutation.nutationInObliquity(JD);
  e0 += NutationInObliquity / 3600;
  e0rad = CT.d2R(e0);
  alpha += 0.005693 * (Math.cos(alpharad) * Math.cos(l0rad) * Math.cos(e0rad) + Math.sin(alpharad) * Math.sin(l0rad)) / Math.cos(deltarad);
  alpha = CT.m360(alpha);
  alpharad = CT.d2R(alpha);
  delta += 0.005693 * (Math.cos(l0rad) * Math.cos(e0rad) * (Math.tan(e0rad) * Math.cos(deltarad) - Math.sin(alpharad) * Math.sin(deltarad)) + Math.cos(alpharad) * Math.sin(deltarad) * Math.sin(l0rad));
  //deltarad = CT.d2R(delta);
  let NutationRA = CAANutation.nutationInRightAscension(alpha / 15, delta, e0, NutationInLongitude, NutationInObliquity);
  const alphadash = alpha + NutationRA / 3600;
  const alphadashrad = CT.d2R(alphadash);
  let NutationDec = CAANutation.nutationInDeclination(alpha / 15, delta, e0, NutationInLongitude, NutationInObliquity);
  const deltadash = delta + NutationDec / 3600;
  const deltadashrad = CT.d2R(deltadash);
  NutationRA = CAANutation.nutationInRightAscension(alpha0 / 15, delta0, e0, NutationInLongitude, NutationInObliquity);
  const alpha0dash = alpha0 + NutationRA / 3600;
  const alpha0dashrad = CT.d2R(alpha0dash);
  NutationDec = CAANutation.nutationInDeclination(alpha0 / 15, delta0, e0, NutationInLongitude, NutationInObliquity);
  const delta0dash = delta0 + NutationDec / 3600;
  const delta0dashrad = CT.d2R(delta0dash);
  details.p = CT.m360(CT.r2D(Math.atan2(Math.cos(delta0dashrad) * Math.sin(alpha0dashrad - alphadashrad), Math.sin(delta0dashrad) * Math.cos(deltadashrad) - Math.cos(delta0dashrad) * Math.sin(deltadashrad) * Math.cos(alpha0dashrad - alphadashrad))));
  return details;
};
