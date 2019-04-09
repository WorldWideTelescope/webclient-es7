import ss from './scriptsharp/ss';
import {Settings} from './settings';
import {WWTControl} from './WWTControl';
import {CameraParameters} from './CameraParameters';
import {Util} from './Util';
import {SpaceTimeController} from './SpaceTimeController';

export class ViewMoverKenBurnsStyle{
  constructor(from, to, time, fromDateTime, toDateTime, type) {
    this.interpolationType = 0;
    this.fastDirectionMove = false;
    this._toTargetTime = 0;
    this._dateTimeSpan = 0;
    this._complete = false;
    this._midpointFired = false;
    this.interpolationType = type;
    if (Math.abs(from.lng - to.lng) > 180) {
      if (from.lng > to.lng) {
        from.lng -= 360;
      } else {
        from.lng += 360;
      }
    }
    this._fromDateTime = fromDateTime;
    this._toDateTime = toDateTime;
    this._dateTimeSpan = toDateTime - fromDateTime;
    this._from = from.copy();
    this._to = to.copy();
    this._fromTime = ss.now();
    this._toTargetTime = time;
  }
  get_complete() {
    return this._complete;
  }
  get_currentPosition() {
    const elapsed = ss.now() - this._fromTime;
    const elapsedSeconds = (elapsed) / 1000;
    let alpha = elapsedSeconds / this._toTargetTime;
    if (!this._midpointFired && alpha >= 0.5) {
      this._midpointFired = true;
      if (this._midpoint != null) {
        this._midpoint();
      }
    }
    if (alpha >= 1) {
      alpha = 1;
      this._complete = true;
      return this._to.copy();
    }
    if (Settings.get_active().get_galacticMode() && WWTControl.singleton.renderContext.space) {
      return CameraParameters.interpolateGreatCircle(this._from, this._to, alpha, this.interpolationType, this.fastDirectionMove);
    }
    return CameraParameters.interpolate(this._from, this._to, alpha, this.interpolationType, this.fastDirectionMove);
  }
  get_currentDateTime() {
    const elapsed = ss.now() - this._fromTime;
    const elapsedSeconds = (elapsed) / 1000;
    const alpha = elapsedSeconds / this._toTargetTime;
    const delta = this._dateTimeSpan * alpha;
    const retDate = new Date(this._fromDateTime.getTime() + ss.truncate(delta));
    return retDate;
  }
  get_midpoint() {
    return this._midpoint;
  }
  set_midpoint(value) {
    this._midpoint = value;
    return value;
  }
  get_moveTime() {
    return this._toTargetTime;
  }
}

export class ViewMoverSlew {
  constructor() {
    this._upTargetTime = 0;
    this._downTargetTime = 0;
    this._toTargetTime = 0;
    this._upTimeFactor = 0.6;
    this._downTimeFactor = 0.6;
    this._travelTimeFactor = 7;
    this._midpointFired = false;
    this._complete = false;
  }

  static create() {
    const temp = new ViewMoverSlew();
    temp.init(from, to);
    return temp;
  }

  static createUpDown() {
    const temp = new ViewMoverSlew();
    temp._upTimeFactor = temp._downTimeFactor = upDowFactor;
    temp.init(from.copy(), to.copy());
    return temp;
  }

  init(from, to) {
    if (Math.abs(from.lng - to.lng) > 180) {
      if (from.lng > to.lng) {
        from.lng -= 360;
      } else {
        from.lng += 360;
      }
    }
    if (to.zoom <= 0) {
      to.zoom = 360;
    }
    if (from.zoom <= 0) {
      from.zoom = 360;
    }
    this._from = from;
    this._to = to;
    this._fromTime = ss.now();
    let zoomUpTarget = 360;
    let travelTime;
    const lngDist = Math.abs(from.lng - to.lng);
    const latDist = Math.abs(from.lat - to.lat);
    const distance = Math.sqrt(latDist * latDist + lngDist * lngDist);
    zoomUpTarget = (distance / 3) * 20;
    if (zoomUpTarget > 360) {
      zoomUpTarget = 360;
    }
    if (zoomUpTarget < from.zoom) {
      zoomUpTarget = from.zoom;
    }
    travelTime = (distance / 180) * (360 / zoomUpTarget) * this._travelTimeFactor;
    const rotateTime = Math.max(Math.abs(from.angle - to.angle), Math.abs(from.rotation - to.rotation));
    const logDistUp = Math.max(Math.abs(Util.logN(zoomUpTarget, 2) - Util.logN(from.zoom, 2)), rotateTime);
    this._upTargetTime = this._upTimeFactor * logDistUp;
    this._downTargetTime = this._upTargetTime + travelTime;
    const logDistDown = Math.abs(Util.logN(zoomUpTarget, 2) - Util.logN(to.zoom, 2));
    this._toTargetTime = this._downTargetTime + Math.max((this._downTimeFactor * logDistDown), rotateTime);
    this._fromTop = from.copy();
    this._fromTop.zoom = zoomUpTarget;
    this._fromTop.angle = (from.angle + to.angle) / 2;
    this._fromTop.rotation = (from.rotation + to.rotation) / 2;
    this._toTop = to.copy();
    this._toTop.zoom = this._fromTop.zoom;
    this._toTop.angle = this._fromTop.angle;
    this._toTop.rotation = this._fromTop.rotation;
  }

  get_complete() {
    return this._complete;
  }

  get_currentPosition() {
    const elapsed = ss.now() - this._fromTime;
    let elapsedSeconds = (elapsed) / 1000;
    if (elapsedSeconds < this._upTargetTime) {
      return CameraParameters.interpolate(this._from, this._fromTop, elapsedSeconds / this._upTargetTime, 3, false);
    } else if (elapsedSeconds < this._downTargetTime) {
      elapsedSeconds -= this._upTargetTime;
      if (Settings.get_active().get_galacticMode() && WWTControl.singleton.renderContext.space) {
        return CameraParameters.interpolateGreatCircle(this._fromTop, this._toTop, elapsedSeconds / (this._downTargetTime - this._upTargetTime), 3, false);
      }
      return CameraParameters.interpolate(this._fromTop, this._toTop, elapsedSeconds / (this._downTargetTime - this._upTargetTime), 3, false);
    } else {
      if (!this._midpointFired) {
        this._midpointFired = true;
        if (this._midpoint != null) {
          this._midpoint();
        }
      }
      elapsedSeconds -= this._downTargetTime;
      let alpha = elapsedSeconds / (this._toTargetTime - this._downTargetTime);
      if (alpha > 1) {
        alpha = 1;
        this._complete = true;
        return this._to.copy();
      }
      return CameraParameters.interpolate(this._toTop, this._to, alpha, 3, false);
    }
  }

  static get_currentDateTime() {
    SpaceTimeController.updateClock();
    return SpaceTimeController.get_now();
  }

  static get_midpoint() {
    return this._midpoint;
  }

  static set_midpoint(value) {
    this._midpoint = value;
    return value;
  }

  static get_moveTime() {
    return this._toTargetTime;
  }
};