export function COR() {
  this.x = 0;
  this.y = 0;
}
COR.create = (x, y) => {
  const item = new COR();
  item.x = x;
  item.y = y;
  return item;
};

export function C3D() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
}
C3D.create = (x, y, z) => {
  const item = new C3D();
  item.x = x;
  item.y = y;
  item.z = z;
  return item;
};

const eq2Ec = (Alpha, Delta, Epsilon) => {
  Alpha = CT.h2R(Alpha);
  Delta = CT.d2R(Delta);
  Epsilon = CT.d2R(Epsilon);
  const Ecliptic = new COR();
  Ecliptic.x = CT.r2D(Math.atan2(Math.sin(Alpha) * Math.cos(Epsilon) + Math.tan(Delta) * Math.sin(Epsilon), Math.cos(Alpha)));
  if (Ecliptic.x < 0) {
    Ecliptic.x += 360;
  }
  Ecliptic.y = CT.r2D(Math.asin(Math.sin(Delta) * Math.cos(Epsilon) - Math.cos(Delta) * Math.sin(Epsilon) * Math.sin(Alpha)));
  return Ecliptic;
};
const ec2Eq = (Lambda, Beta, Epsilon) => {
  Lambda = CT.d2R(Lambda);
  Beta = CT.d2R(Beta);
  Epsilon = CT.d2R(Epsilon);
  const Equatorial = new COR();
  Equatorial.x = CT.r2H(Math.atan2(Math.sin(Lambda) * Math.cos(Epsilon) - Math.tan(Beta) * Math.sin(Epsilon), Math.cos(Lambda)));
  if (Equatorial.x < 0) {
    Equatorial.x += 24;
  }
  Equatorial.y = CT.r2D(Math.asin(Math.sin(Beta) * Math.cos(Epsilon) + Math.cos(Beta) * Math.sin(Epsilon) * Math.sin(Lambda)));
  return Equatorial;
};
const eq2H = (LocalHourAngle, Delta, Latitude) => {
  LocalHourAngle = CT.h2R(LocalHourAngle);
  Delta = CT.d2R(Delta);
  Latitude = CT.d2R(Latitude);
  const Horizontal = new COR();
  Horizontal.x = CT.r2D(Math.atan2(Math.sin(LocalHourAngle), Math.cos(LocalHourAngle) * Math.sin(Latitude) - Math.tan(Delta) * Math.cos(Latitude)));
  if (Horizontal.x < 0) {
    Horizontal.x += 360;
  }
  Horizontal.y = CT.r2D(Math.asin(Math.sin(Latitude) * Math.sin(Delta) + Math.cos(Latitude) * Math.cos(Delta) * Math.cos(LocalHourAngle)));
  return Horizontal;
};
const h2Eq = (Azimuth, Altitude, Latitude) => {
  Azimuth = CT.d2R(Azimuth);
  Altitude = CT.d2R(Altitude);
  Latitude = CT.d2R(Latitude);
  const Equatorial = new COR();
  Equatorial.x = CT.r2H(Math.atan2(Math.sin(Azimuth), Math.cos(Azimuth) * Math.sin(Latitude) + Math.tan(Altitude) * Math.cos(Latitude)));
  if (Equatorial.x < 0) {
    Equatorial.x += 24;
  }
  Equatorial.y = CT.r2D(Math.asin(Math.sin(Latitude) * Math.sin(Altitude) - Math.cos(Latitude) * Math.cos(Altitude) * Math.cos(Azimuth)));
  return Equatorial;
};
const eq2G = (Alpha, Delta) => {
  Alpha = 192.25 - CT.h2D(Alpha);
  Alpha = CT.d2R(Alpha);
  Delta = CT.d2R(Delta);
  const Galactic = new COR();
  Galactic.x = CT.r2D(Math.atan2(Math.sin(Alpha), Math.cos(Alpha) * Math.sin(CT.d2R(27.4)) - Math.tan(Delta) * Math.cos(CT.d2R(27.4))));
  Galactic.x = 303 - Galactic.x;
  if (Galactic.x >= 360) {
    Galactic.x -= 360;
  }
  Galactic.y = CT.r2D(Math.asin(Math.sin(Delta) * Math.sin(CT.d2R(27.4)) + Math.cos(Delta) * Math.cos(CT.d2R(27.4)) * Math.cos(Alpha)));
  return Galactic;
};
const g2Eq = (l, b) => {
  l -= 123;
  l = CT.d2R(l);
  b = CT.d2R(b);
  const Equatorial = new COR();
  Equatorial.x = CT.r2D(Math.atan2(Math.sin(l), Math.cos(l) * Math.sin(CT.d2R(27.4)) - Math.tan(b) * Math.cos(CT.d2R(27.4))));
  Equatorial.x += 12.25;
  if (Equatorial.x < 0) {
    Equatorial.x += 360;
  }
  Equatorial.x = CT.d2H(Equatorial.x);
  Equatorial.y = CT.r2D(Math.asin(Math.sin(b) * Math.sin(CT.d2R(27.4)) + Math.cos(b) * Math.cos(CT.d2R(27.4)) * Math.cos(l)));
  return Equatorial;
};
const d2R = Degrees => Degrees * 0.0174532925199433;
const r2D = Radians => Radians * 57.2957795130823;
const r2H = Radians => Radians * 3.81971863420549;
const h2R = Hours => Hours * 0.261799387799149;
const h2D = Hours => Hours * 15;
const d2H = Degrees => Degrees / 15;
const PI = () => Math.PI;
const m360 = Degrees => Degrees - Math.floor(Degrees / 360) * 360;
const m24 = HourAngle => HourAngle - Math.floor(HourAngle / 24) * 24;
const dmS2D = (Degrees, Minutes, Seconds) => CT.dmS2Dp(Degrees, Minutes, Seconds, true);
const dmS2Dp = (Degrees, Minutes, Seconds, bPositive) => {
  if (!bPositive) {
    console.assert(Degrees >= 0);
    console.assert(Minutes >= 0);
    console.assert(Seconds >= 0);
  }
  if (bPositive) {
    return Degrees + Minutes / 60 + Seconds / 3600;
  }
  else {
    return -Degrees - Minutes / 60 - Seconds / 3600;
  }
};
export const  CT = {
  eq2Ec,
  ec2Eq,
  eq2H,
  h2Eq,
  eq2G,
  g2Eq,
  d2R,
  r2H,
  r2D,
  h2R,
  h2D,
  d2H,
  PI,
  m360,
  m24,
  dmS2D,
  dmS2Dp
};