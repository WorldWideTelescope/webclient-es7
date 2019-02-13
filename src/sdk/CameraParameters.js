
import {Vector3d} from './Double3d';
import {Coordinates} from './Coordinates';
import ss from './scriptsharp/ss';

export function CameraParameters() {
  this.lat = 0;
  this.lng = 0;
  this.zoom = 0;
  this.rotation = 0;
  this.angle = 0;
  this.raDec = false;
  this.opacity = 0;
  this.target = 0;
  this.zoom = 360;
  this.viewTarget = new Vector3d();
}
CameraParameters.create = function(lat, lng, zoom, rotation, angle, opactity) {
  const temp = new CameraParameters();
  temp.lat = lat;
  temp.lng = lng;
  temp.zoom = zoom;
  temp.rotation = rotation;
  temp.angle = angle;
  temp.raDec = false;
  temp.opacity = opactity;
  temp.viewTarget = new Vector3d(0, 0, 0);
  temp.target = 20;
  temp.targetReferenceFrame = '';
  return temp;
};
CameraParameters.logN = function(num, b) {
  return Math.log(num) / Math.log(b);
};
CameraParameters.sinh = function(v) {
  return (Math.exp(v) - Math.exp(-v)) / 2;
};
CameraParameters.interpolate = function(from, to, alphaIn, type, fastDirectionMove) {
  const result = new CameraParameters();
  const alpha = CameraParameters.easeCurve(alphaIn, type);
  const alphaBIn = Math.min(1, alphaIn * 2);
  const alphaB = CameraParameters.easeCurve(alphaBIn, type);
  result.angle = to.angle * alpha + from.angle * (1 - alpha);
  result.rotation = to.rotation * alpha + from.rotation * (1 - alpha);
  if (fastDirectionMove) {
    result.lat = to.lat * alphaB + from.lat * (1 - alphaB);
    result.lng = to.lng * alphaB + from.lng * (1 - alphaB);
  }
  else {
    result.lat = to.lat * alpha + from.lat * (1 - alpha);
    result.lng = to.lng * alpha + from.lng * (1 - alpha);
  }
  result.zoom = Math.pow(2, CameraParameters.logN(to.zoom, 2) * alpha + CameraParameters.logN(from.zoom, 2) * (1 - alpha));
  result.opacity = (to.opacity * alpha + from.opacity * (1 - alpha));
  result.viewTarget = Vector3d.lerp(from.viewTarget, to.viewTarget, alpha);
  result.targetReferenceFrame = to.targetReferenceFrame;
  if (to.target === from.target) {
    result.target = to.target;
  }
  else {
    result.target = 20;
  }
  return result;
};
CameraParameters.interpolateGreatCircle = function(from, to, alphaIn, type, fastDirectionMove) {
  const result = new CameraParameters();
  const alpha = CameraParameters.easeCurve(alphaIn, type);
  const alphaBIn = Math.min(1, alphaIn * 2);
  const alphaB = CameraParameters.easeCurve(alphaBIn, type);
  result.angle = to.angle * alpha + from.angle * (1 - alpha);
  result.rotation = to.rotation * alpha + from.rotation * (1 - alpha);
  const left = Coordinates.geoTo3dDouble(from.lat, from.lng);
  const right = Coordinates.geoTo3dDouble(to.lat, to.lng);
  const mid = Vector3d.slerp(left, right, alpha);
  const midV2 = Coordinates.cartesianToLatLng(mid);
  result.lat = midV2.y;
  result.lng = midV2.x;
  result.zoom = Math.pow(2, CameraParameters.logN(to.zoom, 2) * alpha + CameraParameters.logN(from.zoom, 2) * (1 - alpha));
  result.opacity = (to.opacity * alpha + from.opacity * (1 - alpha));
  result.viewTarget = Vector3d.lerp(from.viewTarget, to.viewTarget, alpha);
  result.targetReferenceFrame = to.targetReferenceFrame;
  if (to.target === from.target) {
    result.target = to.target;
  }
  else {
    result.target = 20;
  }
  return result;
};
CameraParameters.easeCurve = function(alpha, type) {
  switch (type) {
    case 0:
      return alpha;
    case 4:
      return Math.pow(alpha, 2);
    case 1:
      return ((1 - alpha) * CameraParameters.sinh(alpha / (0.1085712344 * 2)) / 100) + alpha * alpha;
    case 2:
      return (alpha * (1 - CameraParameters.sinh((1 - alpha) / (0.1085712344 * 2)) / 100)) + (1 - alpha) * alpha;
    case 3:
      if (alpha < 0.5) {
        return CameraParameters.sinh(alpha / 0.1085712344) / 100;
      }
      else {
        return 1 - (CameraParameters.sinh((1 - alpha) / 0.1085712344) / 100);
      }
    default:
      return alpha;
  }
};
export const CameraParameters$ = {
  copy: function () {
    const temp = new CameraParameters();
    temp.lat = this.lat;
    temp.lng = this.lng;
    temp.zoom = this.zoom;
    temp.rotation = this.rotation;
    temp.angle = this.angle;
    temp.raDec = this.raDec;
    temp.opacity = this.opacity;
    temp.viewTarget = this.viewTarget.copy();
    temp.target = this.target;
    temp.targetReferenceFrame = this.targetReferenceFrame;
    return temp;
  },
  get_RA: function () {
    return ((((180 - (this.lng - 180)) / 360) * 24) % 24);
  },
  set_RA: function (value) {
    this.lng = 180 - (value / 24 * 360) - 180;
    this.raDec = true;
    return value;
  },
  get_dec: function () {
    return this.lat;
  },
  set_dec: function (value) {
    this.lat = value;
    return value;
  },
  equals: function (obj) {
    if (ss.canCast(obj, CameraParameters)) {
      const cam = obj;
      if (Math.abs(cam.angle - this.angle) > 0.01 || Math.abs(cam.lat - this.lat) > (cam.zoom / 10000) || Math.abs(cam.get_RA() - this.get_RA()) > (cam.zoom / 1000) || Math.abs(cam.rotation - this.rotation) > 0.1 || Math.abs(cam.zoom - this.zoom) > (Math.abs(cam.zoom) / 1000)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
};

