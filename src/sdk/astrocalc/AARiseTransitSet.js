// CAARiseTransitSetDetails

import {CAASidereal} from './AASidereal';
import {DYT} from './AADynamicalTime';
import {CT} from './AACoordinateTransformation';
import {INTP} from './AAInterpolate';

export function CAARiseTransitSetDetails() {
  this.bValid = false;
  this.rise = 0;
  this.transit = 0;
  this.set = 0;
  this.bValid = false;
  this.rise = 0;
  this.transit = 0;
  this.set = 0;
}



// CAARiseTransitSet

export function CAARiseTransitSet() {
}
CAARiseTransitSet.rise = function(JD, Alpha1, Delta1, Alpha2, Delta2, Alpha3, Delta3, Longitude, Latitude, h0) {
  const details = new CAARiseTransitSetDetails();
  details.bValid = false;
  let theta0 = CAASidereal.apparentGreenwichSiderealTime(JD);
  theta0 *= 15;
  const deltaT = DYT.deltaT(JD);
  const Delta2Rad = CT.d2R(Delta2);
  const LatitudeRad = CT.d2R(Latitude);
  const h0Rad = CT.d2R(h0);
  const cosH0 = (Math.sin(h0Rad) - Math.sin(LatitudeRad) * Math.sin(Delta2Rad)) / (Math.cos(LatitudeRad) * Math.cos(Delta2Rad));
  if ((cosH0 > 1) || (cosH0 < -1)) {
    return details;
  }
  let H0 = Math.acos(cosH0);
  H0 = CT.r2D(H0);
  let M0 = (Alpha2 * 15 + Longitude - theta0) / 360;
  let M1 = M0 - H0 / 360;
  let M2 = M0 + H0 / 360;
  if (M0 > 1) {
    M0 -= 1;
  }
  else if (M0 < 0) {
    M0 += 1;
  }
  if (M1 > 1) {
    M1 -= 1;
  }
  else if (M1 < 0) {
    M1 += 1;
  }
  if (M2 > 1) {
    M2 -= 1;
  }
  else if (M2 < 0) {
    M2 += 1;
  }
  for (let i = 0; i < 2; i++) {
    let theta1 = theta0 + 360.985647 * M1;
    theta1 = CT.m360(theta1);
    let n = M1 + deltaT / 86400;
    let Alpha = INTP.interpolate(n, Alpha1, Alpha2, Alpha3);
    let Delta = INTP.interpolate(n, Delta1, Delta2, Delta3);
    let H = theta1 - Longitude - Alpha * 15;
    let Horizontal = CT.eq2H(H / 15, Delta, Latitude);
    let DeltaM = (Horizontal.y - h0) / (360 * Math.cos(CT.d2R(Delta)) * Math.cos(LatitudeRad) * Math.sin(CT.d2R(H)));
    M1 += DeltaM;
    theta1 = theta0 + 360.985647 * M0;
    theta1 = CT.m360(theta1);
    n = M0 + deltaT / 86400;
    Alpha = INTP.interpolate(n, Alpha1, Alpha2, Alpha3);
    H = theta1 - Longitude - Alpha * 15;
    if (H < -180) {
      H += 360;
    }
    DeltaM = -H / 360;
    M0 += DeltaM;
    theta1 = theta0 + 360.985647 * M2;
    theta1 = CT.m360(theta1);
    n = M2 + deltaT / 86400;
    Alpha = INTP.interpolate(n, Alpha1, Alpha2, Alpha3);
    Delta = INTP.interpolate(n, Delta1, Delta2, Delta3);
    H = theta1 - Longitude - Alpha * 15;
    Horizontal = CT.eq2H(H / 15, Delta, Latitude);
    DeltaM = (Horizontal.y - h0) / (360 * Math.cos(CT.d2R(Delta)) * Math.cos(LatitudeRad) * Math.sin(CT.d2R(H)));
    M2 += DeltaM;
  }
  details.bValid = true;
  details.rise = M1 * 24;
  details.set = M2 * 24;
  details.transit = M0 * 24;
  return details;
};