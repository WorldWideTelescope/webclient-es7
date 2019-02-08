import {CT} from './AACoordinateTransformation';


const rhoSinThetaPrime = (GeographicalLatitude, Height) => {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const U = Math.atan(0.99664719 * Math.tan(GeographicalLatitude));
  return 0.99664719 * Math.sin(U) + (Height / 6378149 * Math.sin(GeographicalLatitude));
};
const rhoCosThetaPrime = (GeographicalLatitude, Height) => {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const U = Math.atan(0.99664719 * Math.tan(GeographicalLatitude));
  return Math.cos(U) + (Height / 6378149 * Math.cos(GeographicalLatitude));
};
const radiusOfParallelOfLatitude = GeographicalLatitude => {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const sinGeo = Math.sin(GeographicalLatitude);
  return (6378.14 * Math.cos(GeographicalLatitude)) / Math.sqrt(1 - 0.0066943847614084 * sinGeo * sinGeo);
};
const radiusOfCurvature = GeographicalLatitude => {
  GeographicalLatitude = CT.d2R(GeographicalLatitude);
  const sinGeo = Math.sin(GeographicalLatitude);
  return (6378.14 * (1 - 0.0066943847614084)) / Math.pow((1 - 0.0066943847614084 * sinGeo * sinGeo), 1.5);
};
const distanceBetweenPoints = (GeographicalLatitude1, GeographicalLongitude1, GeographicalLatitude2, GeographicalLongitude2) => {
  GeographicalLatitude1 = CT.d2R(GeographicalLatitude1);
  GeographicalLatitude2 = CT.d2R(GeographicalLatitude2);
  GeographicalLongitude1 = CT.d2R(GeographicalLongitude1);
  GeographicalLongitude2 = CT.d2R(GeographicalLongitude2);
  const F = (GeographicalLatitude1 + GeographicalLatitude2) / 2;
  const G = (GeographicalLatitude1 - GeographicalLatitude2) / 2;
  const lambda = (GeographicalLongitude1 - GeographicalLongitude2) / 2;
  const sinG = Math.sin(G);
  const cosG = Math.cos(G);
  const cosF = Math.cos(F);
  const sinF = Math.sin(F);
  const sinLambda = Math.sin(lambda);
  const cosLambda = Math.cos(lambda);
  const S = (sinG * sinG * cosLambda * cosLambda) + (cosF * cosF * sinLambda * sinLambda);
  const C = (cosG * cosG * cosLambda * cosLambda) + (sinF * sinF * sinLambda * sinLambda);
  const w = Math.atan(Math.sqrt(S / C));
  const R = Math.sqrt(S * C) / w;
  const D = 2 * w * 6378.14;
  const Hprime = (3 * R - 1) / (2 * C);
  const Hprime2 = (3 * R + 1) / (2 * S);
  const f = 0.00335281317789691;
  return D * (1 + (f * Hprime * sinF * sinF * cosG * cosG) - (f * Hprime2 * cosF * cosF * sinG * sinG));
};

export const CAAGlobe = {
  rhoSinThetaPrime,
  rhoCosThetaPrime,
  radiusOfParallelOfLatitude,
  radiusOfCurvature,
  distanceBetweenPoints
};