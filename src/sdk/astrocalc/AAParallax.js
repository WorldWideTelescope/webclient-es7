import {CAAGlobe} from './AAGlobe';
import {COR, CT} from './AACoordinateTransformation';
import GFX from './GFX';
import {CAASidereal} from './CAASidereal';
export function CAATopocentricEclipticDetails() {
  this.lambda = 0;
  this.beta = 0;
  this.semidiameter = 0;
  this.lambda = 0;
  this.beta = 0;
  this.semidiameter = 0;
}


// CAAParallax

export function CAAParallax() {
}
CAAParallax.equatorial2TopocentricDelta = function(Alpha, Delta, Distance, Longitude, Latitude, Height, JD) {
  const RhoSinThetaPrime = CAAGlobe.rhoSinThetaPrime(Latitude, Height);
  const RhoCosThetaPrime = CAAGlobe.rhoCosThetaPrime(Latitude, Height);
  const theta = CAASidereal.apparentGreenwichSiderealTime(JD);
  Delta = CT.d2R(Delta);
  const cosDelta = Math.cos(Delta);
  const pi = Math.asin(GFX.g_AAParallax_C1 / Distance);
  const H = CT.h2R(theta - Longitude / 15 - Alpha);
  const cosH = Math.cos(H);
  const sinH = Math.sin(H);
  const DeltaTopocentric = new COR();
  DeltaTopocentric.x = CT.r2H(-pi * RhoCosThetaPrime * sinH / cosDelta);
  DeltaTopocentric.y = CT.r2D(-pi * (RhoSinThetaPrime * cosDelta - RhoCosThetaPrime * cosH * Math.sin(Delta)));
  return DeltaTopocentric;
};
CAAParallax.equatorial2Topocentric = function(Alpha, Delta, Distance, Longitude, Latitude, Height, JD) {
  const RhoSinThetaPrime = CAAGlobe.rhoSinThetaPrime(Latitude, Height);
  const RhoCosThetaPrime = CAAGlobe.rhoCosThetaPrime(Latitude, Height);
  const theta = CAASidereal.apparentGreenwichSiderealTime(JD);
  Delta = CT.d2R(Delta);
  const cosDelta = Math.cos(Delta);
  const pi = Math.asin(GFX.g_AAParallax_C1 / Distance);
  const sinpi = Math.sin(pi);
  const H = CT.h2R(theta - Longitude / 15 - Alpha);
  const cosH = Math.cos(H);
  const sinH = Math.sin(H);
  const DeltaAlpha = Math.atan2(-RhoCosThetaPrime * sinpi * sinH, cosDelta - RhoCosThetaPrime * sinpi * cosH);
  const Topocentric = new COR();
  Topocentric.x = CT.m24(Alpha + CT.r2H(DeltaAlpha));
  Topocentric.y = CT.r2D(Math.atan2((Math.sin(Delta) - RhoSinThetaPrime * sinpi) * Math.cos(DeltaAlpha), cosDelta - RhoCosThetaPrime * sinpi * cosH));
  return Topocentric;
};
CAAParallax.ecliptic2Topocentric = function(Lambda, Beta, Semidiameter, Distance, Epsilon, Longitude, Latitude, Height, JD) {
  const S = CAAGlobe.rhoSinThetaPrime(Latitude, Height);
  const C = CAAGlobe.rhoCosThetaPrime(Latitude, Height);
  Lambda = CT.d2R(Lambda);
  Beta = CT.d2R(Beta);
  Epsilon = CT.d2R(Epsilon);
  Longitude = CT.d2R(Longitude);
  Latitude = CT.d2R(Latitude);
  Semidiameter = CT.d2R(Semidiameter);
  const sine = Math.sin(Epsilon);
  const cose = Math.cos(Epsilon);
  const cosBeta = Math.cos(Beta);
  const sinBeta = Math.sin(Beta);
  let theta = CAASidereal.apparentGreenwichSiderealTime(JD);
  theta = CT.h2R(theta);
  const sintheta = Math.sin(theta);
  const pi = Math.asin(GFX.g_AAParallax_C1 / Distance);
  const sinpi = Math.sin(pi);
  const N = Math.cos(Lambda) * cosBeta - C * sinpi * Math.cos(theta);
  const Topocentric = new CAATopocentricEclipticDetails();
  Topocentric.lambda = Math.atan2(Math.sin(Lambda) * cosBeta - sinpi * (S * sine + C * cose * sintheta), N);
  const cosTopocentricLambda = Math.cos(Topocentric.lambda);
  Topocentric.beta = Math.atan(cosTopocentricLambda * (sinBeta - sinpi * (S * cose - C * sine * sintheta)) / N);
  Topocentric.semidiameter = Math.asin(cosTopocentricLambda * Math.cos(Topocentric.beta) * Math.sin(Semidiameter) / N);
  Topocentric.semidiameter = CT.r2D(Topocentric.semidiameter);
  Topocentric.lambda = CT.m360(CT.r2D(Topocentric.lambda));
  Topocentric.beta = CT.r2D(Topocentric.beta);
  return Topocentric;
};
CAAParallax.parallaxToDistance = function(Parallax) {
  return GFX.g_AAParallax_C1 / Math.sin(CT.d2R(Parallax));
};
CAAParallax.distanceToParallax = function(Distance) {
  const pi = Math.asin(GFX.g_AAParallax_C1 / Distance);
  return CT.r2D(pi);
};