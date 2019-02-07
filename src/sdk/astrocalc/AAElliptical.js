
// EOE

import {C3D, CT} from './AACoordinateTransformation';
import {CAAEarth} from './AAEarth';
import {CAAMercury} from './AAMercury';
import {CAAKepler, CAAMars} from '../CAA';
import {CAANeptune} from './AANeptune';
import {ABR} from './AAAberration';
import {CAAFK5} from './AAFK5';
import {CAANutation} from './AANutation';
import {CAASun} from './AASun';
import {CAAPluto} from './AAPluto';
import {CAAVenus} from './AAVenus';
import {CAAJupiter} from './AAJupiter';
import {CAASaturn} from './AASaturn';
import {CAAUranus} from './AAUranus';

export function EOE() {
  this.a = 0;
  this.e = 0;
  this.i = 0;
  this.w = 0;
  this.omega = 0;
  this.jdEquinox = 0;
  this.t = 0;
  this.n = 0;
  this.meanAnnomolyOut = 0;
  this.a = 0;
  this.e = 0;
  this.i = 0;
  this.w = 0;
  this.omega = 0;
  this.jdEquinox = 0;
  this.t = 0;
}
EOE._create = function(br) {
  const tmp = new EOE();
  tmp.a = br.readSingle();
  tmp.e = br.readSingle();
  tmp.i = br.readSingle();
  tmp.w = br.readSingle();
  tmp.omega = br.readSingle();
  tmp.jdEquinox = br.readSingle();
  tmp.t = br.readSingle();
  return tmp;
};
export function EPD() {
  this.apparentGeocentricLongitude = 0;
  this.apparentGeocentricLatitude = 0;
  this.apparentGeocentricDistance = 0;
  this.apparentLightTime = 0;
  this.apparentGeocentricRA = 0;
  this.apparentGeocentricDeclination = 0;
  this.apparentGeocentricLongitude = 0;
  this.apparentGeocentricLatitude = 0;
  this.apparentGeocentricDistance = 0;
  this.apparentLightTime = 0;
  this.apparentGeocentricRA = 0;
  this.apparentGeocentricDeclination = 0;
}
export function EOD() {
  this.heliocentricRectangularEquatorial = new C3D();
  this.heliocentricRectangularEcliptical = new C3D();
  this.heliocentricEclipticLongitude = 0;
  this.heliocentricEclipticLatitude = 0;
  this.trueGeocentricRA = 0;
  this.trueGeocentricDeclination = 0;
  this.trueGeocentricDistance = 0;
  this.trueGeocentricLightTime = 0;
  this.astrometricGeocenticRA = 0;
  this.astrometricGeocentricDeclination = 0;
  this.astrometricGeocentricDistance = 0;
  this.astrometricGeocentricLightTime = 0;
  this.elongation = 0;
  this.phaseAngle = 0;
  this.heliocentricEclipticLongitude = 0;
  this.heliocentricEclipticLatitude = 0;
  this.trueGeocentricRA = 0;
  this.trueGeocentricDeclination = 0;
  this.trueGeocentricDistance = 0;
  this.trueGeocentricLightTime = 0;
  this.astrometricGeocenticRA = 0;
  this.astrometricGeocentricDeclination = 0;
  this.astrometricGeocentricDistance = 0;
  this.astrometricGeocentricLightTime = 0;
  this.elongation = 0;
  this.phaseAngle = 0;
}

const distanceToLightTime = function(Distance) {
  return Distance * 0.0057755183;
};
const calculate = function(JD, oobject) {
  const details = new EPD();
  let JD0 = JD;
  let L0 = 0;
  let B0 = 0;
  let R0 = 0;
  let cosB0 = 0;
  if (!!oobject) {
    L0 = CAAEarth.eclipticLongitude(JD0);
    B0 = CAAEarth.eclipticLatitude(JD0);
    R0 = CAAEarth.radiusVector(JD0);
    L0 = CT.d2R(L0);
    B0 = CT.d2R(B0);
    cosB0 = Math.cos(B0);
  }
  let L = 0;
  let B = 0;
  let R = 0;
  let Lrad;
  let Brad;
  let cosB;
  let cosL;
  let x;
  let y;
  let z;
  let bRecalc = true;
  let bFirstRecalc = true;
  let LPrevious = 0;
  let BPrevious = 0;
  let RPrevious = 0;
  while (bRecalc) {
    switch (oobject) {
      case 0:
        L = CAASun.geometricEclipticLongitude(JD0);
        B = CAASun.geometricEclipticLatitude(JD0);
        R = CAAEarth.radiusVector(JD0);
        break;
      case 1:
        L = CAAMercury.eclipticLongitude(JD0);
        B = CAAMercury.eclipticLatitude(JD0);
        R = CAAMercury.radiusVector(JD0);
        break;
      case 2:
        L = CAAVenus.eclipticLongitude(JD0);
        B = CAAVenus.eclipticLatitude(JD0);
        R = CAAVenus.radiusVector(JD0);
        break;
      case 3:
        L = CAAMars.eclipticLongitude(JD0);
        B = CAAMars.eclipticLatitude(JD0);
        R = CAAMars.radiusVector(JD0);
        break;
      case 4:
        L = CAAJupiter.eclipticLongitude(JD0);
        B = CAAJupiter.eclipticLatitude(JD0);
        R = CAAJupiter.radiusVector(JD0);
        break;
      case 5:
        L = CAASaturn.eclipticLongitude(JD0);
        B = CAASaturn.eclipticLatitude(JD0);
        R = CAASaturn.radiusVector(JD0);
        break;
      case 6:
        L = CAAUranus.eclipticLongitude(JD0);
        B = CAAUranus.eclipticLatitude(JD0);
        R = CAAUranus.radiusVector(JD0);
        break;
      case 7:
        L = CAANeptune.eclipticLongitude(JD0);
        B = CAANeptune.eclipticLatitude(JD0);
        R = CAANeptune.radiusVector(JD0);
        break;
      case 8:
        L = CAAPluto.eclipticLongitude(JD0);
        B = CAAPluto.eclipticLatitude(JD0);
        R = CAAPluto.radiusVector(JD0);
        break;
      default:
        console.assert(false);
        break;
    }
    if (!bFirstRecalc) {
      bRecalc = ((Math.abs(L - LPrevious) > 1E-05) || (Math.abs(B - BPrevious) > 1E-05) || (Math.abs(R - RPrevious) > 1E-06));
      LPrevious = L;
      BPrevious = B;
      RPrevious = R;
    }
    else {
      bFirstRecalc = false;
    }
    if (bRecalc) {
      let distance = 0;
      if (!!oobject) {
        Lrad = CT.d2R(L);
        Brad = CT.d2R(B);
        cosB = Math.cos(Brad);
        cosL = Math.cos(Lrad);
        x = R * cosB * cosL - R0 * cosB0 * Math.cos(L0);
        y = R * cosB * Math.sin(Lrad) - R0 * cosB0 * Math.sin(L0);
        z = R * Math.sin(Brad) - R0 * Math.sin(B0);
        distance = Math.sqrt(x * x + y * y + z * z);
      }
      else {
        distance = R;
      }
      JD0 = JD - ELL.distanceToLightTime(distance);
    }
  }
  Lrad = CT.d2R(L);
  Brad = CT.d2R(B);
  cosB = Math.cos(Brad);
  cosL = Math.cos(Lrad);
  x = R * cosB * cosL - R0 * cosB0 * Math.cos(L0);
  y = R * cosB * Math.sin(Lrad) - R0 * cosB0 * Math.sin(L0);
  z = R * Math.sin(Brad) - R0 * Math.sin(B0);
  const x2 = x * x;
  const y2 = y * y;
  details.apparentGeocentricLatitude = CT.r2D(Math.atan2(z, Math.sqrt(x2 + y2)));
  details.apparentGeocentricDistance = Math.sqrt(x2 + y2 + z * z);
  details.apparentGeocentricLongitude = CT.m360(CT.r2D(Math.atan2(y, x)));
  details.apparentLightTime = ELL.distanceToLightTime(details.apparentGeocentricDistance);
  const Aberration = ABR.eclipticAberration(details.apparentGeocentricLongitude, details.apparentGeocentricLatitude, JD);
  details.apparentGeocentricLongitude += Aberration.x;
  details.apparentGeocentricLatitude += Aberration.y;
  const DeltaLong = CAAFK5.correctionInLongitude(details.apparentGeocentricLongitude, details.apparentGeocentricLatitude, JD);
  details.apparentGeocentricLatitude += CAAFK5.correctionInLatitude(details.apparentGeocentricLongitude, JD);
  details.apparentGeocentricLongitude += DeltaLong;
  const NutationInLongitude = CAANutation.nutationInLongitude(JD);
  const Epsilon = CAANutation.trueObliquityOfEcliptic(JD);
  details.apparentGeocentricLongitude += CT.dmS2D(0, 0, NutationInLongitude);
  const ApparentEqu = CT.ec2Eq(details.apparentGeocentricLongitude, details.apparentGeocentricLatitude, Epsilon);
  details.apparentGeocentricRA = ApparentEqu.x;
  details.apparentGeocentricDeclination = ApparentEqu.y;
  return details;
};
const semiMajorAxisFromPerihelionDistance = function(q, e) {
  return q / (1 - e);
};
const meanMotionFromSemiMajorAxis = function(a) {
  return 0.9856076686 / (a * Math.sqrt(a));
};
const calculateRectangularJD = function(JD, elements) {
  const JD0 = JD;
  const omega = CT.d2R(elements.omega);
  const w = CT.d2R(elements.w);
  const i = CT.d2R(elements.i);
  const sinEpsilon = 0;
  const cosEpsilon = 1;
  const sinOmega = Math.sin(omega);
  const cosOmega = Math.cos(omega);
  const cosi = Math.cos(i);
  const sini = Math.sin(i);
  const F = cosOmega;
  const G = sinOmega * cosEpsilon;
  const H = sinOmega * sinEpsilon;
  const P = -sinOmega * cosi;
  const Q = cosOmega * cosi * cosEpsilon - sini * sinEpsilon;
  const R = cosOmega * cosi * sinEpsilon + sini * cosEpsilon;
  const a = Math.sqrt(F * F + P * P);
  const b = Math.sqrt(G * G + Q * Q);
  const c = Math.sqrt(H * H + R * R);
  const A = Math.atan2(F, P);
  const B = Math.atan2(G, Q);
  const C = Math.atan2(H, R);
  const M = elements.n * (JD0 - elements.t);
  elements.meanAnnomolyOut = M;
  let E = CAAKepler.calculate(M, elements.e);
  E = CT.d2R(E);
  const v = 2 * Math.atan(Math.sqrt((1 + elements.e) / (1 - elements.e)) * Math.tan(E / 2));
  const r = elements.a * (1 - elements.e * Math.cos(E));
  const x = r * a * Math.sin(A + w + v);
  const y = r * b * Math.sin(B + w + v);
  const z = r * c * Math.sin(C + w + v);
  return Vector3d.create(x, z, y);
};
const calculateRectangular = function(elements, meanAnomoly) {
  const omega = CT.d2R(elements.omega);
  const w = CT.d2R(elements.w);
  const i = CT.d2R(elements.i);
  const sinEpsilon = 0;
  const cosEpsilon = 1;
  const sinOmega = Math.sin(omega);
  const cosOmega = Math.cos(omega);
  const cosi = Math.cos(i);
  const sini = Math.sin(i);
  const F = cosOmega;
  const G = sinOmega * cosEpsilon;
  const H = sinOmega * sinEpsilon;
  const P = -sinOmega * cosi;
  const Q = cosOmega * cosi * cosEpsilon - sini * sinEpsilon;
  const R = cosOmega * cosi * sinEpsilon + sini * cosEpsilon;
  const a = Math.sqrt(F * F + P * P);
  const b = Math.sqrt(G * G + Q * Q);
  const c = Math.sqrt(H * H + R * R);
  const A = Math.atan2(F, P);
  const B = Math.atan2(G, Q);
  const C = Math.atan2(H, R);
  const n = elements.n;
  const M = meanAnomoly;
  let E = CAAKepler.calculate(M, elements.e);
  E = CT.d2R(E);
  const v = 2 * Math.atan(Math.sqrt((1 + elements.e) / (1 - elements.e)) * Math.tan(E / 2));
  const r = elements.a * (1 - elements.e * Math.cos(E));
  const x = r * a * Math.sin(A + w + v);
  const y = r * b * Math.sin(B + w + v);
  const z = r * c * Math.sin(C + w + v);
  return Vector3d.create(x, z, y);
};
const calculateElements = function(JD, elements) {
  let Epsilon = CAANutation.meanObliquityOfEcliptic(elements.jdEquinox);
  let JD0 = JD;
  const details = new EOD();
  Epsilon = CT.d2R(Epsilon);
  const omega = CT.d2R(elements.omega);
  const w = CT.d2R(elements.w);
  const i = CT.d2R(elements.i);
  const sinEpsilon = Math.sin(Epsilon);
  const cosEpsilon = Math.cos(Epsilon);
  const sinOmega = Math.sin(omega);
  const cosOmega = Math.cos(omega);
  const cosi = Math.cos(i);
  const sini = Math.sin(i);
  const F = cosOmega;
  const G = sinOmega * cosEpsilon;
  const H = sinOmega * sinEpsilon;
  const P = -sinOmega * cosi;
  const Q = cosOmega * cosi * cosEpsilon - sini * sinEpsilon;
  const R = cosOmega * cosi * sinEpsilon + sini * cosEpsilon;
  const a = Math.sqrt(F * F + P * P);
  const b = Math.sqrt(G * G + Q * Q);
  const c = Math.sqrt(H * H + R * R);
  const A = Math.atan2(F, P);
  const B = Math.atan2(G, Q);
  const C = Math.atan2(H, R);
  const n = ELL.meanMotionFromSemiMajorAxis(elements.a);
  const SunCoord = CAASun.equatorialRectangularCoordinatesAnyEquinox(JD, elements.jdEquinox);
  for (let j = 0; j < 2; j++) {
    const M = n * (JD0 - elements.t);
    let E = CAAKepler.calculate(M, elements.e);
    E = CT.d2R(E);
    const v = 2 * Math.atan(Math.sqrt((1 + elements.e) / (1 - elements.e)) * Math.tan(E / 2));
    const r = elements.a * (1 - elements.e * Math.cos(E));
    const x = r * a * Math.sin(A + w + v);
    const y = r * b * Math.sin(B + w + v);
    const z = r * c * Math.sin(C + w + v);
    if (!j) {
      details.heliocentricRectangularEquatorial.x = x;
      details.heliocentricRectangularEquatorial.y = y;
      details.heliocentricRectangularEquatorial.z = z;
      const u = omega + v;
      const cosu = Math.cos(u);
      const sinu = Math.sin(u);
      details.heliocentricRectangularEcliptical.x = r * (cosOmega * cosu - sinOmega * sinu * cosi);
      details.heliocentricRectangularEcliptical.y = r * (sinOmega * cosu + cosOmega * sinu * cosi);
      details.heliocentricRectangularEcliptical.z = r * sini * sinu;
      details.heliocentricEclipticLongitude = Math.atan2(y, x);
      details.heliocentricEclipticLongitude = CT.m24(CT.r2D(details.heliocentricEclipticLongitude) / 15);
      details.heliocentricEclipticLatitude = Math.asin(z / r);
      details.heliocentricEclipticLatitude = CT.r2D(details.heliocentricEclipticLatitude);
    }
    const psi = SunCoord.x + x;
    const nu = SunCoord.y + y;
    const sigma = SunCoord.z + z;
    let Alpha = Math.atan2(nu, psi);
    Alpha = CT.r2D(Alpha);
    let Delta = Math.atan2(sigma, Math.sqrt(psi * psi + nu * nu));
    Delta = CT.r2D(Delta);
    const Distance = Math.sqrt(psi * psi + nu * nu + sigma * sigma);
    if (!j) {
      details.trueGeocentricRA = CT.m24(Alpha / 15);
      details.trueGeocentricDeclination = Delta;
      details.trueGeocentricDistance = Distance;
      details.trueGeocentricLightTime = ELL.distanceToLightTime(Distance);
    }
    else {
      details.astrometricGeocenticRA = CT.m24(Alpha / 15);
      details.astrometricGeocentricDeclination = Delta;
      details.astrometricGeocentricDistance = Distance;
      details.astrometricGeocentricLightTime = ELL.distanceToLightTime(Distance);
      const RES = Math.sqrt(SunCoord.x * SunCoord.x + SunCoord.y * SunCoord.y + SunCoord.z * SunCoord.z);
      details.elongation = Math.acos((RES * RES + Distance * Distance - r * r) / (2 * RES * Distance));
      details.elongation = CT.r2D(details.elongation);
      details.phaseAngle = Math.acos((r * r + Distance * Distance - RES * RES) / (2 * r * Distance));
      details.phaseAngle = CT.r2D(details.phaseAngle);
    }
    if (!j) {
      JD0 = JD - details.trueGeocentricLightTime;
    }
  }
  return details;
};
const instantaneousVelocity = function(r, a) {
  return 42.1219 * Math.sqrt((1 / r) - (1 / (2 * a)));
};
const velocityAtPerihelion = function(e, a) {
  return 29.7847 / Math.sqrt(a) * Math.sqrt((1 + e) / (1 - e));
};
const velocityAtAphelion = function(e, a) {
  return 29.7847 / Math.sqrt(a) * Math.sqrt((1 - e) / (1 + e));
};
const lengthOfEllipse = function(e, a) {
  const b = a * Math.sqrt(1 - e * e);
  return CT.PI() * (3 * (a + b) - Math.sqrt((a + 3 * b) * (3 * a + b)));
};
const cometMagnitude = function(g, delta, k, r) {
  return g + 5 * Util.log10(delta) + k * Util.log10(r);
};
const minorPlanetMagnitude = function(H, delta, G, r, PhaseAngle) {
  PhaseAngle = CT.d2R(PhaseAngle);
  const phi1 = Math.exp(-3.33 * Math.pow(Math.tan(PhaseAngle / 2), 0.63));
  const phi2 = Math.exp(-1.87 * Math.pow(Math.tan(PhaseAngle / 2), 1.22));
  return H + 5 * Util.log10(r * delta) - 2.5 * Util.log10((1 - G) * phi1 + G * phi2);
};
export const ELL = {
  distanceToLightTime,
  calculate,
  semiMajorAxisFromPerihelionDistance,
  meanMotionFromSemiMajorAxis,
  calculateRectangularJD,
  calculateRectangular,
  calculateElements,
  instantaneousVelocity,
  velocityAtAphelion,
  velocityAtPerihelion,
  lengthOfEllipse,
  cometMagnitude,
  minorPlanetMagnitude
};