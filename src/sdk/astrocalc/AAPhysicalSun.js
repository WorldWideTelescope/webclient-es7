import {CAAEarth} from './AAEarth';
import {CAANutation} from './AANutation';
import {CT} from './AACoordinateTransformation';

export function CAAPhysicalSunDetails() {
  this.p = 0;
  this.b0 = 0;
  this.l0 = 0;
  this.p = 0;
  this.b0 = 0;
  this.l0 = 0;
}


export function CAAPhysicalSun() {}
CAAPhysicalSun.calculate = function(JD) {
  let theta = CT.m360((JD - 2398220) * 360 / 25.38);
  let I = 7.25;
  let K = 73.6667 + 1.3958333 * (JD - 2396758) / 36525;
  const L = CAAEarth.eclipticLongitude(JD);
  const R = CAAEarth.radiusVector(JD);
  let SunLong = L + 180 - CT.dmS2D(0, 0, 20.4898 / R);
  let SunLongDash = SunLong + CT.dmS2D(0, 0, CAANutation.nutationInLongitude(JD));
  let epsilon = CAANutation.trueObliquityOfEcliptic(JD);
  epsilon = CT.d2R(epsilon);
  SunLong = CT.d2R(SunLong);
  SunLongDash = CT.d2R(SunLongDash);
  K = CT.d2R(K);
  I = CT.d2R(I);
  theta = CT.d2R(theta);
  const x = Math.atan(-Math.cos(SunLong) * Math.tan(epsilon));
  const y = Math.atan(-Math.cos(SunLong - K) * Math.tan(I));
  const details = new CAAPhysicalSunDetails();
  details.p = CT.r2D(x + y);
  details.b0 = CT.r2D(Math.asin(Math.sin(SunLong - K) * Math.sin(I)));
  const eta = Math.atan(Math.tan(SunLong - K) * Math.cos(I));
  details.l0 = CT.m360(CT.r2D(eta - theta));
  return details;
};
CAAPhysicalSun.timeOfStartOfRotation = function(C) {
  let JED = 2398140.227 + 27.2752316 * C;
  let M = CT.m360(281.96 + 26.882476 * C);
  M = CT.d2R(M);
  JED += (0.1454 * Math.sin(M) - 0.0085 * Math.sin(2 * M) - 0.0141 * Math.cos(2 * M));
  return JED;
};
