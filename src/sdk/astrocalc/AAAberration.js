
import GFX from './GFX';
import {CAASun} from './AASun';
import {C3D, COR, CT } from './AACoordinateTransformation';


const earthVelocity = function(JD) {
  const T = (JD - 2451545) / 36525;
  const L2 = 3.1761467 + 1021.3285546 * T;
  const L3 = 1.7534703 + 628.3075849 * T;
  const L4 = 6.2034809 + 334.0612431 * T;
  const L5 = 0.5995465 + 52.9690965 * T;
  const L6 = 0.8740168 + 21.3299095 * T;
  const L7 = 5.4812939 + 7.4781599 * T;
  const L8 = 5.3118863 + 3.8133036 * T;
  const Ldash = 3.8103444 + 8399.6847337 * T;
  const D = 5.1984667 + 7771.3771486 * T;
  const Mdash = 2.3555559 + 8328.6914289 * T;
  const F = 1.6279052 + 8433.4661601 * T;
  const velocity = new C3D();
  const nAberrationCoefficients = GFX.g_ACft.length;
  for (let i = 0; i < nAberrationCoefficients; i++) {
    const Argument = GFX.g_ACft[i].l2 * L2 + GFX.g_ACft[i].l3 * L3 + GFX.g_ACft[i].l4 * L4 + GFX.g_ACft[i].l5 * L5 + GFX.g_ACft[i].l6 * L6 + GFX.g_ACft[i].l7 * L7 + GFX.g_ACft[i].l8 * L8 + GFX.g_ACft[i].ldash * Ldash + GFX.g_ACft[i].d * D + GFX.g_ACft[i].mdash * Mdash + GFX.g_ACft[i].f * F;
    velocity.x += (GFX.g_ACft[i].xsin + GFX.g_ACft[i].xsint * T) * Math.sin(Argument);
    velocity.x += (GFX.g_ACft[i].xcos + GFX.g_ACft[i].xcost * T) * Math.cos(Argument);
    velocity.y += (GFX.g_ACft[i].ysin + GFX.g_ACft[i].ysint * T) * Math.sin(Argument);
    velocity.y += (GFX.g_ACft[i].ycos + GFX.g_ACft[i].ycost * T) * Math.cos(Argument);
    velocity.z += (GFX.g_ACft[i].zsin + GFX.g_ACft[i].zsint * T) * Math.sin(Argument);
    velocity.z += (GFX.g_ACft[i].zcos + GFX.g_ACft[i].zcost * T) * Math.cos(Argument);
  }
  return velocity;
};
const eclipticAberration = function(Lambda, Beta, JD) {
  const aberration = new COR();
  const T = (JD - 2451545) / 36525;
  const Tsquared = T * T;
  const e = 0.016708634 - 4.2037E-05 * T - 1.267E-07 * Tsquared;
  let pi = 102.93735 + 1.71946 * T + 0.00046 * Tsquared;
  const k = 20.49552;
  let SunLongitude = CAASun.geometricEclipticLongitude(JD);
  pi = CT.d2R(pi);
  Lambda = CT.d2R(Lambda);
  Beta = CT.d2R(Beta);
  SunLongitude = CT.d2R(SunLongitude);
  aberration.x = (-k * Math.cos(SunLongitude - Lambda) + e * k * Math.cos(pi - Lambda)) / Math.cos(Beta) / 3600;
  aberration.y = -k * Math.sin(Beta) * (Math.sin(SunLongitude - Lambda) - e * Math.sin(pi - Lambda)) / 3600;
  return aberration;
};
const equatorialAberration = function(Alpha, Delta, JD) {
  Alpha = CT.d2R(Alpha * 15);
  Delta = CT.d2R(Delta);
  const cosAlpha = Math.cos(Alpha);
  const sinAlpha = Math.sin(Alpha);
  const cosDelta = Math.cos(Delta);
  const sinDelta = Math.sin(Delta);
  const velocity = ABR.earthVelocity(JD);
  const aberration = new COR();
  aberration.x = CT.r2H((velocity.y * cosAlpha - velocity.x * sinAlpha) / (17314463350 * cosDelta));
  aberration.y = CT.r2D(-(((velocity.x * cosAlpha + velocity.y * sinAlpha) * sinDelta - velocity.z * cosDelta) / 17314463350));
  return aberration;
};
export const ABR = {
  earthVelocity,
  eclipticAberration,
  equatorialAberration
};

export function ACFT(L2, L3, L4, L5, L6, L7, L8, Ldash, D, Mdash, F, xsin, xsint, xcos, xcost, ysin, ysint, ycos, ycost, zsin, zsint, zcos, zcost) {
  this.l2 = 0;
  this.l3 = 0;
  this.l4 = 0;
  this.l5 = 0;
  this.l6 = 0;
  this.l7 = 0;
  this.l8 = 0;
  this.ldash = 0;
  this.d = 0;
  this.mdash = 0;
  this.f = 0;
  this.xsin = 0;
  this.xsint = 0;
  this.xcos = 0;
  this.xcost = 0;
  this.ysin = 0;
  this.ysint = 0;
  this.ycos = 0;
  this.ycost = 0;
  this.zsin = 0;
  this.zsint = 0;
  this.zcos = 0;
  this.zcost = 0;
  this.l2 = L2;
  this.l3 = L3;
  this.l4 = L4;
  this.l5 = L5;
  this.l6 = L6;
  this.l7 = L7;
  this.l8 = L8;
  this.ldash = Ldash;
  this.d = D;
  this.mdash = Mdash;
  this.f = F;
  this.xsin = xsin;
  this.xsint = xsint;
  this.xcos = xcos;
  this.xcost = xcost;
  this.ysin = ysin;
  this.ysint = ysint;
  this.ycos = ycos;
  this.ycost = ycost;
  this.zsin = zsin;
  this.zsint = zsint;
  this.zcos = zcos;
  this.zcost = zcost;
}