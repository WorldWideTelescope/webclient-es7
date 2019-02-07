import {C3D, CT} from './AACoordinateTransformation';
import {CAAEarth} from './AAEarth';
import {CAAFK5} from './AAFK5';
import {CAANutation} from './AANutation';

const geometricEclipticLongitude = JD => CT.m360(CAAEarth.eclipticLongitude(JD) + 180);
const geometricEclipticLatitude = JD => -CAAEarth.eclipticLatitude(JD);
const geometricEclipticLongitudeJ2000 = JD => CT.m360(CAAEarth.eclipticLongitudeJ2000(JD) + 180);
const geometricEclipticLatitudeJ2000 = JD => -CAAEarth.eclipticLatitudeJ2000(JD);
const geometricFK5EclipticLongitude = JD => {
  let Longitude = geometricEclipticLongitude(JD);
  const Latitude = geometricEclipticLatitude(JD);
  Longitude += CAAFK5.correctionInLongitude(Longitude, Latitude, JD);
  return Longitude;
};
const geometricFK5EclipticLatitude = JD => {
  const Longitude = geometricEclipticLongitude(JD);
  let Latitude = geometricEclipticLatitude(JD);
  const SunLatCorrection = CAAFK5.correctionInLatitude(Longitude, JD);
  Latitude += SunLatCorrection;
  return Latitude;
};
const apparentEclipticLongitude = JD => {
  let Longitude = geometricFK5EclipticLongitude(JD);
  Longitude += CT.dmS2D(0, 0, CAANutation.nutationInLongitude(JD));
  const R = CAAEarth.radiusVector(JD);
  Longitude -= CT.dmS2D(0, 0, 20.4898 / R);
  return Longitude;
};
const apparentEclipticLatitude = JD => geometricFK5EclipticLatitude(JD);
const eclipticRectangularCoordinatesMeanEquinox = JD => {
  const Longitude = CT.d2R(geometricFK5EclipticLongitude(JD));
  const Latitude = CT.d2R(geometricFK5EclipticLatitude(JD));
  const R = CAAEarth.radiusVector(JD);
  const epsilon = CT.d2R(CAANutation.meanObliquityOfEcliptic(JD));
  const vvalue = new C3D();
  vvalue.x = R * Math.cos(Latitude) * Math.cos(Longitude);
  vvalue.y = R * (Math.cos(Latitude) * Math.sin(Longitude) * Math.cos(epsilon) - Math.sin(Latitude) * Math.sin(epsilon));
  vvalue.z = R * (Math.cos(Latitude) * Math.sin(Longitude) * Math.sin(epsilon) + Math.sin(Latitude) * Math.cos(epsilon));
  return vvalue;
};
const eclipticRectangularCoordinatesJ2000 = JD => {
  let Longitude = geometricEclipticLongitudeJ2000(JD);
  Longitude = CT.d2R(Longitude);
  let Latitude = geometricEclipticLatitudeJ2000(JD);
  Latitude = CT.d2R(Latitude);
  const R = CAAEarth.radiusVector(JD);
  const vvalue = new C3D();
  const coslatitude = Math.cos(Latitude);
  vvalue.x = R * coslatitude * Math.cos(Longitude);
  vvalue.y = R * coslatitude * Math.sin(Longitude);
  vvalue.z = R * Math.sin(Latitude);
  return vvalue;
};
const equatorialRectangularCoordinatesJ2000 = JD => {
  let vvalue = eclipticRectangularCoordinatesJ2000(JD);
  vvalue = CAAFK5.convertVSOPToFK5J2000(vvalue);
  return vvalue;
};
const equatorialRectangularCoordinatesB1950 = JD => {
  let vvalue = eclipticRectangularCoordinatesJ2000(JD);
  vvalue = CAAFK5.convertVSOPToFK5B1950(vvalue);
  return vvalue;
};
const equatorialRectangularCoordinatesAnyEquinox = (JD, JDEquinox) => {
  let vvalue = equatorialRectangularCoordinatesJ2000(JD);
  vvalue = CAAFK5.convertVSOPToFK5AnyEquinox(vvalue, JDEquinox);
  return vvalue;
};

export const CAASun = {
  geometricEclipticLongitude,
  geometricEclipticLatitude,
  geometricEclipticLongitudeJ2000,
  geometricEclipticLatitudeJ2000,
  geometricFK5EclipticLongitude,
  geometricFK5EclipticLatitude,
  apparentEclipticLongitude,
  apparentEclipticLatitude,
  eclipticRectangularCoordinatesMeanEquinox,
  eclipticRectangularCoordinatesJ2000,
  equatorialRectangularCoordinatesJ2000,
  equatorialRectangularCoordinatesB1950,
  equatorialRectangularCoordinatesAnyEquinox
};