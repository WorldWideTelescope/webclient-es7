// wwtlib.AstroRaDec

import {ELL} from './AAElliptical';
import {CAAParallax} from './AAParallax';
import {CAAMoon} from './AAMoon';
import {CAANutation} from './AANutation';
import {CT} from './AACoordinateTransformation';
import {CAAPhysicalJupiter} from './AAPhysicalJupiter';
import {GM} from './AAGalileanMoons';
import {DT} from './AADate';
import ss from '../scriptsharp/ss';
import {CAARiseTransitSet} from './AARiseTransitSet';

export function AstroRaDec(ra, dec, dist, shadow, eclipsed) {
  this.RA = 0;
  this.dec = 0;
  this.distance = 0;
  this.shadow = false;
  this.eclipsed = false;
  this.RA = ra;
  this.dec = dec;
  this.distance = dist;
  this.shadow = shadow;
  this.eclipsed = eclipsed;
}

export function RiseSetDetails(bValid, Rise, Transit, Set, neverRises) {
  this.bValid = false;
  this.rise = 0;
  this.transit = 0;
  this.set = 0;
  this.bNeverRises = false;
  this.bValid = bValid;
  this.rise = Rise;
  this.transit = Transit;
  this.set = Set;
  this.bNeverRises = neverRises;
}

export function AstroCalc() {
}
AstroCalc.getPlanet = function(jDate, planetIn, locLat, locLong, locHeight) {
  const planet = planetIn;
  locLong = -locLong;
  let corrected;
  if (planet < 9) {
    const Details = ELL.calculate(jDate, planetIn);
    corrected = CAAParallax.equatorial2Topocentric(Details.apparentGeocentricRA, Details.apparentGeocentricDeclination, Details.apparentGeocentricDistance, locLong, locLat, locHeight, jDate);
    return new AstroRaDec(corrected.x, corrected.y, Details.apparentGeocentricDistance, false, false);
  }
  else if (planet === 9) {
    const lat = CAAMoon.eclipticLatitude(jDate);
    const lng = CAAMoon.eclipticLongitude(jDate);
    const dis = CAAMoon.radiusVector(jDate) / 149598000;
    const epsilon = CAANutation.trueObliquityOfEcliptic(jDate);
    const d = CT.ec2Eq(lng, lat, epsilon);
    corrected = CAAParallax.equatorial2Topocentric(d.x, d.y, dis, locLong, locLat, locHeight, jDate);
    return new AstroRaDec(corrected.x, corrected.y, dis, false, false);
  }
  else {
    if (jDate !== AstroCalc._jDateLast) {
      AstroCalc._jupDetails = ELL.calculate(jDate, 4);
      AstroCalc._jupPhisical = CAAPhysicalJupiter.calculate(jDate);
      corrected = CAAParallax.equatorial2Topocentric(AstroCalc._jupDetails.apparentGeocentricRA, AstroCalc._jupDetails.apparentGeocentricDeclination, AstroCalc._jupDetails.apparentGeocentricDistance, locLong, locLat, locHeight, jDate);
      AstroCalc._jupDetails.apparentGeocentricRA = corrected.x;
      AstroCalc._jupDetails.apparentGeocentricDeclination = corrected.y;
      AstroCalc._galDetails = GM.calculate(jDate);
      AstroCalc._jDateLast = jDate;
    }
    const jupiterDiameter = 0.000954501;
    const scale = Math.atan(0.5 * (jupiterDiameter / AstroCalc._jupDetails.apparentGeocentricDistance)) / 3.1415927 * 180;
    const raScale = (scale / Math.cos(AstroCalc._jupDetails.apparentGeocentricDeclination / 180 * 3.1415927)) / 15;
    let xMoon = 0;
    let yMoon = 0;
    let zMoon = 0;
    let shadow = false;
    let eclipsed = false;
    switch (planet) {
      case 10:
        xMoon = AstroCalc._galDetails.satellite1.apparentRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite1.apparentRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite1.apparentRectangularCoordinates.z;
        eclipsed = AstroCalc._galDetails.satellite1.bInEclipse;
        shadow = AstroCalc._galDetails.satellite1.bInShadowTransit;
        break;
      case 11:
        xMoon = AstroCalc._galDetails.satellite2.apparentRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite2.apparentRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite2.apparentRectangularCoordinates.z;
        eclipsed = AstroCalc._galDetails.satellite2.bInEclipse;
        shadow = AstroCalc._galDetails.satellite2.bInShadowTransit;
        break;
      case 12:
        xMoon = AstroCalc._galDetails.satellite3.apparentRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite3.apparentRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite3.apparentRectangularCoordinates.z;
        eclipsed = AstroCalc._galDetails.satellite3.bInEclipse;
        shadow = AstroCalc._galDetails.satellite3.bInShadowTransit;
        break;
      case 13:
        xMoon = AstroCalc._galDetails.satellite4.apparentRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite4.apparentRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite4.apparentRectangularCoordinates.z;
        eclipsed = AstroCalc._galDetails.satellite4.bInEclipse;
        shadow = AstroCalc._galDetails.satellite4.bInShadowTransit;
        break;
      case 14:
        xMoon = AstroCalc._galDetails.satellite1.apparentShadowRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite1.apparentShadowRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite1.apparentShadowRectangularCoordinates.z * 0.9;
        shadow = AstroCalc._galDetails.satellite1.bInShadowTransit;
        break;
      case 15:
        xMoon = AstroCalc._galDetails.satellite2.apparentShadowRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite2.apparentShadowRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite2.apparentShadowRectangularCoordinates.z * 0.9;
        shadow = AstroCalc._galDetails.satellite2.bInShadowTransit;
        break;
      case 16:
        xMoon = AstroCalc._galDetails.satellite3.apparentShadowRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite3.apparentShadowRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite3.apparentShadowRectangularCoordinates.z * 0.9;
        shadow = AstroCalc._galDetails.satellite3.bInShadowTransit;
        break;
      case 17:
        xMoon = AstroCalc._galDetails.satellite4.apparentShadowRectangularCoordinates.x;
        yMoon = AstroCalc._galDetails.satellite4.apparentShadowRectangularCoordinates.y;
        zMoon = AstroCalc._galDetails.satellite4.apparentShadowRectangularCoordinates.z * 0.9;
        shadow = AstroCalc._galDetails.satellite4.bInShadowTransit;
        break;
    }
    let xTemp;
    let yTemp;
    const radians = AstroCalc._jupPhisical.p / 180 * 3.1415927;
    xTemp = xMoon * Math.cos(radians) - yMoon * Math.sin(radians);
    yTemp = xMoon * Math.sin(radians) + yMoon * Math.cos(radians);
    xMoon = xTemp;
    yMoon = yTemp;
    return new AstroRaDec(AstroCalc._jupDetails.apparentGeocentricRA - (xMoon * raScale), AstroCalc._jupDetails.apparentGeocentricDeclination + yMoon * scale, AstroCalc._jupDetails.apparentGeocentricDistance + (zMoon * jupiterDiameter / 2), shadow, eclipsed);
  }
};
AstroCalc.getJulianDay = function(year, month, day) {
  return DT.dateToJD(ss.truncate(year), ss.truncate(month), day, true);
};
AstroCalc.eclipticToJ2000 = function(l, b, jNow) {
  const radec = CT.ec2Eq(l, b, CAANutation.trueObliquityOfEcliptic(jNow));
  return new AstroRaDec(radec.x, radec.y, 0, false, false);
};
AstroCalc.galacticToJ2000 = function(l, b) {
  const radec = CT.g2Eq(l, b);
  return new AstroRaDec(radec.x, radec.y, 0, false, false);
};
AstroCalc.j2000ToGalactic = function(ra, dec) {
  const galactic = CT.eq2G(ra, dec);
  return new AstroRaDec(galactic.x, galactic.y, 0, false, false);
};
AstroCalc.getRiseTrinsitSet = function(jd, lat, lng, ra1, dec1, ra2, dec2, ra3, dec3, type) {
  let alt = -0.5667;
  switch (type) {
    case 0:
      alt = -0.5667;
      break;
    case 1:
      alt = -0.8333;
      break;
    case 2:
      alt = 0.125;
      break;
  }
  const RiseTransitSetTime = CAARiseTransitSet.rise(jd, ra1, dec1, ra2, dec2, ra3, dec3, lng, lat, alt);
  let neverRises = false;
  if (!RiseTransitSetTime.bValid) {
    neverRises = Util.sign(lat) !== Util.sign(dec2);
  }
  return new RiseSetDetails(RiseTransitSetTime.bValid, RiseTransitSetTime.rise, RiseTransitSetTime.transit, RiseTransitSetTime.set, neverRises);
};
