import {C3D, COR, CT } from './AACoordinateTransformation';

const correctionInLongitude = (Longitude, Latitude, JD) => {
  const T = (JD - 2451545) / 36525;
  let Ldash = Longitude - 1.397 * T - 0.00031 * T * T;
  Ldash = CT.d2R(Ldash);
  Longitude = CT.d2R(Longitude);
  Latitude = CT.d2R(Latitude);
  const vvalue = -0.09033 + 0.03916 * (Math.cos(Ldash) + Math.sin(Ldash)) * Math.tan(Latitude);
  return CT.dmS2D(0, 0, vvalue);
};
const correctionInLatitude = (Longitude, JD) => {
  const T = (JD - 2451545) / 36525;
  let Ldash = Longitude - 1.397 * T - 0.00031 * T * T;
  Ldash = CT.d2R(Ldash);
  Longitude = CT.d2R(Longitude);
  const vvalue = 0.03916 * (Math.cos(Ldash) - Math.sin(Ldash));
  return CT.dmS2D(0, 0, vvalue);
};
const convertVSOPToFK5J2000 = vvalue => {
  const result = new C3D();
  result.x = vvalue.x + 4.4036E-07 * vvalue.y - 1.90919E-07 * vvalue.z;
  result.y = -4.79966E-07 * vvalue.x + 0.917482137087 * vvalue.y - 0.397776982902 * vvalue.z;
  result.z = 0.397776982902 * vvalue.y + 0.917482137087 * vvalue.z;
  return result;
};
const convertVSOPToFK5B1950 = vvalue => {
  const result = new C3D();
  result.x = 0.999925702634 * vvalue.x + 0.012189716217 * vvalue.y + 1.1134016E-05 * vvalue.z;
  result.y = -0.011179418036 * vvalue.x + 0.917413998946 * vvalue.y - 0.397777041885 * vvalue.z;
  result.z = -0.004859003787 * vvalue.x + 0.397747363646 * vvalue.y + 0.917482111428 * vvalue.z;
  return result;
};
const convertVSOPToFK5AnyEquinox = (vvalue, JDEquinox) => {
  const t = (JDEquinox - 2451545) / 36525;
  const tsquared = t * t;
  const tcubed = tsquared * t;
  let sigma = 2306.2181 * t + 0.30188 * tsquared + 0.017988 * tcubed;
  sigma = CT.d2R(CT.dmS2D(0, 0, sigma));
  let zeta = 2306.2181 * t + 1.09468 * tsquared + 0.018203 * tcubed;
  zeta = CT.d2R(CT.dmS2D(0, 0, zeta));
  let phi = 2004.3109 * t - 0.42665 * tsquared - 0.041833 * tcubed;
  phi = CT.d2R(CT.dmS2D(0, 0, phi));
  const cossigma = Math.cos(sigma);
  const coszeta = Math.cos(zeta);
  const cosphi = Math.cos(phi);
  const sinsigma = Math.sin(sigma);
  const sinzeta = Math.sin(zeta);
  const sinphi = Math.sin(phi);
  const xx = cossigma * coszeta * cosphi - sinsigma * sinzeta;
  const xy = sinsigma * coszeta + cossigma * sinzeta * cosphi;
  const xz = cossigma * sinphi;
  const yx = -cossigma * sinzeta - sinsigma * coszeta * cosphi;
  const yy = cossigma * coszeta - sinsigma * sinzeta * cosphi;
  const yz = -sinsigma * sinphi;
  const zx = -coszeta * sinphi;
  const zy = -sinzeta * sinphi;
  const zz = cosphi;
  const result = new C3D();
  result.x = xx * vvalue.x + yx * vvalue.y + zx * vvalue.z;
  result.y = xy * vvalue.x + yy * vvalue.y + zy * vvalue.z;
  result.z = xz * vvalue.x + yz * vvalue.y + zz * vvalue.z;
  return result;
};
export const CAAFK5 = {
  correctionInLatitude,
  correctionInLongitude,
  convertVSOPToFK5AnyEquinox,
  convertVSOPToFK5B1950,
  convertVSOPToFK5J2000
};