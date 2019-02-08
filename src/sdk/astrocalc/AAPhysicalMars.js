
// CAAPhysicalMarsDetails

import {CT} from './AACoordinateTransformation';
import {CAAEarth} from './AAEarth';
import {CAAMars} from './AAMars';
import {ELL} from './AAElliptical';
import {CAANutation} from './AANutation';
import {CAASun} from './AASun';
import {MIFR} from './AAMoonIlluminatedFraction';
import {IFR} from './AAIlluminatedFraction';

export function CAAPhysicalMarsDetails() {
  this.DE = 0;
  this.DS = 0;
  this.w = 0;
  this.p = 0;
  this.x = 0;
  this.k = 0;
  this.q = 0;
  this.d = 0;
}

export function CAAPhysicalMars() {
}
CAAPhysicalMars.calculate = function(JD) {
  const details = new CAAPhysicalMarsDetails();
  const T = (JD - 2451545) / 36525;
  let Lambda0 = 352.9065 + 1.1733 * T;
  let Lambda0rad = CT.d2R(Lambda0);
  const Beta0 = 63.2818 - 0.00394 * T;
  const Beta0rad = CT.d2R(Beta0);
  const l0 = CAAEarth.eclipticLongitude(JD);
  const l0rad = CT.d2R(l0);
  const b0 = CAAEarth.eclipticLatitude(JD);
  const b0rad = CT.d2R(b0);
  const R = CAAEarth.radiusVector(JD);
  let PreviousLightTravelTime = 0;
  let LightTravelTime = 0;
  let x = 0;
  let y = 0;
  let z = 0;
  let bIterate = true;
  let DELTA = 0;
  let l = 0;
  let lrad = 0;
  let b = 0;
  let brad = 0;
  let r = 0;
  while (bIterate) {
    const JD2 = JD - LightTravelTime;
    l = CAAMars.eclipticLongitude(JD2);
    lrad = CT.d2R(l);
    b = CAAMars.eclipticLatitude(JD2);
    brad = CT.d2R(b);
    r = CAAMars.radiusVector(JD2);
    x = r * Math.cos(brad) * Math.cos(lrad) - R * Math.cos(l0rad);
    y = r * Math.cos(brad) * Math.sin(lrad) - R * Math.sin(l0rad);
    z = r * Math.sin(brad) - R * Math.sin(b0rad);
    DELTA = Math.sqrt(x * x + y * y + z * z);
    LightTravelTime = ELL.distanceToLightTime(DELTA);
    bIterate = (Math.abs(LightTravelTime - PreviousLightTravelTime) > 2E-06);
    if (bIterate) {
      PreviousLightTravelTime = LightTravelTime;
    }
  }
  let lambdarad = Math.atan2(y, x);
  let lambda = CT.r2D(lambdarad);
  const betarad = Math.atan2(z, Math.sqrt(x * x + y * y));
  let beta = CT.r2D(betarad);
  details.DE = CT.r2D(Math.asin(-Math.sin(Beta0rad) * Math.sin(betarad) - Math.cos(Beta0rad) * Math.cos(betarad) * Math.cos(Lambda0rad - lambdarad)));
  const N = 49.5581 + 0.7721 * T;
  const Nrad = CT.d2R(N);
  const ldash = l - 0.00697 / r;
  const ldashrad = CT.d2R(ldash);
  const bdash = b - 0.000225 * (Math.cos(lrad - Nrad) / r);
  const bdashrad = CT.d2R(bdash);
  details.DS = CT.r2D(Math.asin(-Math.sin(Beta0rad) * Math.sin(bdashrad) - Math.cos(Beta0rad) * Math.cos(bdashrad) * Math.cos(Lambda0rad - ldashrad)));
  const W = CT.m360(11.504 + 350.89200025 * (JD - LightTravelTime - 2433282.5));
  let e0 = CAANutation.meanObliquityOfEcliptic(JD);
  let e0rad = CT.d2R(e0);
  const PoleEquatorial = CT.ec2Eq(Lambda0, Beta0, e0);
  const alpha0rad = CT.h2R(PoleEquatorial.x);
  const delta0rad = CT.d2R(PoleEquatorial.y);
  const u = y * Math.cos(e0rad) - z * Math.sin(e0rad);
  const v = y * Math.sin(e0rad) + z * Math.cos(e0rad);
  const alpharad = Math.atan2(u, x);
  const alpha = CT.r2H(alpharad);
  const deltarad = Math.atan2(v, Math.sqrt(x * x + u * u));
  const delta = CT.r2D(deltarad);
  const xi = Math.atan2(Math.sin(delta0rad) * Math.cos(deltarad) * Math.cos(alpha0rad - alpharad) - Math.sin(deltarad) * Math.cos(delta0rad), Math.cos(deltarad) * Math.sin(alpha0rad - alpharad));
  details.w = CT.m360(W - CT.r2D(xi));
  const NutationInLongitude = CAANutation.nutationInLongitude(JD);
  const NutationInObliquity = CAANutation.nutationInObliquity(JD);
  lambda += 0.005693 * Math.cos(l0rad - lambdarad) / Math.cos(betarad);
  beta += 0.005693 * Math.sin(l0rad - lambdarad) * Math.sin(betarad);
  Lambda0 += NutationInLongitude / 3600;
  Lambda0rad = CT.d2R(Lambda0);
  lambda += NutationInLongitude / 3600;
  lambdarad = CT.d2R(lambda);
  e0 += NutationInObliquity / 3600;
  e0rad = CT.d2R(e0rad);
  const ApparentPoleEquatorial = CT.ec2Eq(Lambda0, Beta0, e0);
  const alpha0dash = CT.h2R(ApparentPoleEquatorial.x);
  const delta0dash = CT.d2R(ApparentPoleEquatorial.y);
  const ApparentMars = CT.ec2Eq(lambda, beta, e0);
  const alphadash = CT.h2R(ApparentMars.x);
  const deltadash = CT.d2R(ApparentMars.y);
  details.p = CT.m360(CT.r2D(Math.atan2(Math.cos(delta0dash) * Math.sin(alpha0dash - alphadash), Math.sin(delta0dash) * Math.cos(deltadash) - Math.cos(delta0dash) * Math.sin(deltadash) * Math.cos(alpha0dash - alphadash))));
  const SunLambda = CAASun.geometricEclipticLongitude(JD);
  const SunBeta = CAASun.geometricEclipticLatitude(JD);
  const SunEquatorial = CT.ec2Eq(SunLambda, SunBeta, e0);
  details.x = MIFR.positionAngle(SunEquatorial.x, SunEquatorial.y, alpha, delta);
  details.d = 9.36 / DELTA;
  details.k = IFR.illuminatedFraction2(r, R, DELTA);
  details.q = (1 - details.k) * details.d;
  return details;
};
