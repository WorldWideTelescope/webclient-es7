import {CT} from './AACoordinateTransformation';

export let MIFR = {
  geocentricElongation: (ObjectAlpha, ObjectDelta, SunAlpha, SunDelta) => {
    ObjectAlpha = CT.d2R(ObjectAlpha * 15);
    SunAlpha = CT.d2R(SunAlpha * 15);
    ObjectDelta = CT.d2R(ObjectDelta);
    SunDelta = CT.d2R(SunDelta);
    return CT.r2D(Math.acos(Math.sin(SunDelta) * Math.sin(ObjectDelta) + Math.cos(SunDelta) * Math.cos(ObjectDelta) * Math.cos(SunAlpha - ObjectAlpha)));
  },
  phaseAngle : (GeocentricElongation, EarthObjectDistance, EarthSunDistance) => {
    GeocentricElongation = CT.d2R(GeocentricElongation);
    return CT.m360(CT.r2D(Math.atan2(EarthSunDistance * Math.sin(GeocentricElongation), EarthObjectDistance - EarthSunDistance * Math.cos(GeocentricElongation))));
  },
  illuminatedFraction: PhaseAngle => {
    PhaseAngle = CT.d2R(PhaseAngle);
    return (1 + Math.cos(PhaseAngle)) / 2;
  },
  positionAngle : (Alpha0, Delta0, Alpha, Delta) => {
    Alpha0 = CT.h2R(Alpha0);
    Alpha = CT.h2R(Alpha);
    Delta0 = CT.d2R(Delta0);
    Delta = CT.d2R(Delta);
    return CT.m360(CT.r2D(Math.atan2(Math.cos(Delta0) * Math.sin(Alpha0 - Alpha), Math.sin(Delta0) * Math.cos(Delta) - Math.cos(Delta0) * Math.sin(Delta) * Math.cos(Alpha0 - Alpha))));
  }
};