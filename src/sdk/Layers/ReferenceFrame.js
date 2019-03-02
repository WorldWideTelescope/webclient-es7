
// wwtlib.ReferenceFrame

import {Matrix3d, Vector3d} from '../Double3d';
import {Color, Colors} from '../Color';
import {ELL, EOE} from '../astrocalc/AAElliptical';
import {Enums} from '../enums';
import ss from '../scriptsharp/ss';
import {SpaceTimeController} from '../SpaceTimeController';

export class ReferenceFrame {
  constructor() {
    this._systemGenerated = false;
    this.meanAnomoly = 0;
    this.orbitalYears = 0;
    this.observingLocation = false;
    this.reference = 18;
    this.parentsRoationalBase = false;
    this.referenceFrameType = 0;
    this.meanRadius = 6371000;
    this.oblateness = 0.0033528;
    this.heading = 0;
    this.pitch = 0;
    this.roll = 0;
    this.scale = 1;
    this.tilt = 0;
    this.translation = new Vector3d();
    this.lat = 0;
    this.lng = 0;
    this.altitude = 0;
    this.rotationalPeriod = 0;
    this.zeroRotationDate = 0;
    this.representativeColor = Colors.get_white();
    this.showAsPoint = false;
    this.showOrbitPath = false;
    this.stationKeeping = true;
    this.semiMajorAxis = 0;
    this.semiMajorAxisUnits = 1;
    this.eccentricity = 0;
    this.inclination = 0;
    this.argumentOfPeriapsis = 0;
    this.longitudeOfAscendingNode = 0;
    this.meanAnomolyAtEpoch = 0;
    this.meanDailyMotion = 0;
    this.epoch = 0;
    this._orbit = null;
    this._elements = new EOE();
    this.worldMatrix = new Matrix3d();
    this.worldMatrix = Matrix3d.get_identity();
  }

  static isTLECheckSumGood(line) {
    if (line.length !== 69) {
      return false;
    }
    let checksum = 0;
    for (let i = 0; i < 68; i++) {
      switch (line.substr(i, 1)) {
        case '1':
          checksum += 1;
          break;
        case '2':
          checksum += 2;
          break;
        case '3':
          checksum += 3;
          break;
        case '4':
          checksum += 4;
          break;
        case '5':
          checksum += 5;
          break;
        case '6':
          checksum += 6;
          break;
        case '7':
          checksum += 7;
          break;
        case '8':
          checksum += 8;
          break;
        case '9':
          checksum += 9;
          break;
        case '-':
          checksum += 1;
          break;
      }
    }
    return (checksum % 10).toString() === line.charAt(68).toString();
  }

  static toTLEExponential(num, size) {
    let exp = num.toExponential(size);
    if (exp.length < size + 6) {
      exp = exp.substring(0, size + 4) + '0' + exp.substr(size + 4, 1);
    }
    return exp;
  }

  static tleNumberString(num, left, right) {
    let formated = num.toFixed(right);
    let point = formated.indexOf('.');
    if (point === -1) {
      point = formated.length;
      formated += '.0';
    }
    const len = formated.length - point - 1;
    const fill = '00000000';
    formated = fill.substr(0, left - point) + formated + fill.substr(0, right - len);
    return formated;
  }

  static computeTLECheckSum(line) {
    if (line.length !== 68) {
      return '0';
    }
    let checksum = 0;
    for (let i = 0; i < 68; i++) {
      switch (line[i]) {
        case '1':
          checksum += 1;
          break;
        case '2':
          checksum += 2;
          break;
        case '3':
          checksum += 3;
          break;
        case '4':
          checksum += 4;
          break;
        case '5':
          checksum += 5;
          break;
        case '6':
          checksum += 6;
          break;
        case '7':
          checksum += 7;
          break;
        case '8':
          checksum += 8;
          break;
        case '9':
          checksum += 9;
          break;
        case '-':
          checksum += 1;
          break;
      }
    }
    return ((checksum % 10));
  }

  get_representativeColor() {
    return this.representativeColor;
  }
  set_representativeColor(value) {
    if (value !== this.representativeColor) {
      this.representativeColor = value;
      this._orbit = null;
    }
    return value;
  }
  get_orbit() {
    return this._orbit;
  }
  set_orbit(value) {
    this._orbit = value;
    return value;
  }
  getIndentifier() {
    return this.name;
  }
  importTrajectory(filename) {
  }
  saveToXml(xmlWriter) {
    xmlWriter._writeStartElement('ReferenceFrame');
    xmlWriter._writeAttributeString('Name', this.name);
    xmlWriter._writeAttributeString('Parent', this.parent);
    xmlWriter._writeAttributeString('ReferenceFrameType', Enums.toXml('ReferenceFrameTypes', this.referenceFrameType));
    xmlWriter._writeAttributeString('Reference', Enums.toXml('ReferenceFrames', this.reference));
    xmlWriter._writeAttributeString('ParentsRoationalBase', this.parentsRoationalBase.toString());
    xmlWriter._writeAttributeString('MeanRadius', this.meanRadius.toString());
    xmlWriter._writeAttributeString('Oblateness', this.oblateness.toString());
    xmlWriter._writeAttributeString('Heading', this.heading.toString());
    xmlWriter._writeAttributeString('Pitch', this.pitch.toString());
    xmlWriter._writeAttributeString('Roll', this.roll.toString());
    xmlWriter._writeAttributeString('Scale', this.scale.toString());
    xmlWriter._writeAttributeString('Tilt', this.tilt.toString());
    xmlWriter._writeAttributeString('Translation', this.translation.toString());
    if (!this.referenceFrameType) {
      xmlWriter._writeAttributeString('Lat', this.lat.toString());
      xmlWriter._writeAttributeString('Lng', this.lng.toString());
      xmlWriter._writeAttributeString('Altitude', this.altitude.toString());
    }
    xmlWriter._writeAttributeString('RotationalPeriod', this.rotationalPeriod.toString());
    xmlWriter._writeAttributeString('ZeroRotationDate', this.zeroRotationDate.toString());
    xmlWriter._writeAttributeString('RepresentativeColor', this.get_representativeColor().save());
    xmlWriter._writeAttributeString('ShowAsPoint', this.showAsPoint.toString());
    xmlWriter._writeAttributeString('ShowOrbitPath', this.showOrbitPath.toString());
    xmlWriter._writeAttributeString('StationKeeping', this.stationKeeping.toString());
    if (this.referenceFrameType === 1) {
      xmlWriter._writeAttributeString('SemiMajorAxis', this.semiMajorAxis.toString());
      xmlWriter._writeAttributeString('SemiMajorAxisScale', Enums.toXml('AltUnits', this.semiMajorAxisUnits));
      xmlWriter._writeAttributeString('Eccentricity', this.eccentricity.toString());
      xmlWriter._writeAttributeString('Inclination', this.inclination.toString());
      xmlWriter._writeAttributeString('ArgumentOfPeriapsis', this.argumentOfPeriapsis.toString());
      xmlWriter._writeAttributeString('LongitudeOfAscendingNode', this.longitudeOfAscendingNode.toString());
      xmlWriter._writeAttributeString('MeanAnomolyAtEpoch', this.meanAnomolyAtEpoch.toString());
      xmlWriter._writeAttributeString('MeanDailyMotion', this.meanDailyMotion.toString());
      xmlWriter._writeAttributeString('Epoch', this.epoch.toString());
    }
    xmlWriter._writeEndElement();
  }
  initializeFromXml(node) {
    this.name = node.attributes.getNamedItem('Name').nodeValue;
    this.parent = node.attributes.getNamedItem('Parent').nodeValue;
    this.referenceFrameType = Enums.parse('ReferenceFrameTypes', node.attributes.getNamedItem('ReferenceFrameType').nodeValue);
    this.reference = Enums.parse('ReferenceFrames', node.attributes.getNamedItem('Reference').nodeValue);
    this.parentsRoationalBase = ss.boolean(node.attributes.getNamedItem('ParentsRoationalBase').nodeValue);
    this.meanRadius = parseFloat(node.attributes.getNamedItem('MeanRadius').nodeValue);
    this.oblateness = parseFloat(node.attributes.getNamedItem('Oblateness').nodeValue);
    this.heading = parseFloat(node.attributes.getNamedItem('Heading').nodeValue);
    this.pitch = parseFloat(node.attributes.getNamedItem('Pitch').nodeValue);
    this.roll = parseFloat(node.attributes.getNamedItem('Roll').nodeValue);
    this.scale = parseFloat(node.attributes.getNamedItem('Scale').nodeValue);
    this.tilt = parseFloat(node.attributes.getNamedItem('Tilt').nodeValue);
    this.translation = Vector3d.parse(node.attributes.getNamedItem('Translation').nodeValue);
    if (!this.referenceFrameType) {
      this.lat = parseFloat(node.attributes.getNamedItem('Lat').nodeValue);
      this.lng = parseFloat(node.attributes.getNamedItem('Lng').nodeValue);
      this.altitude = parseFloat(node.attributes.getNamedItem('Altitude').nodeValue);
    }
    this.rotationalPeriod = parseFloat(node.attributes.getNamedItem('RotationalPeriod').nodeValue);
    this.zeroRotationDate = parseFloat(node.attributes.getNamedItem('ZeroRotationDate').nodeValue);
    this.set_representativeColor(Color.load(node.attributes.getNamedItem('RepresentativeColor').nodeValue));
    this.showAsPoint = ss.boolean(node.attributes.getNamedItem('ShowAsPoint').nodeValue);
    if (node.attributes.getNamedItem('StationKeeping') != null) {
      this.stationKeeping = ss.boolean(node.attributes.getNamedItem('StationKeeping').nodeValue);
    }
    if (this.referenceFrameType === 1) {
      this.showOrbitPath = ss.boolean(node.attributes.getNamedItem('ShowOrbitPath').nodeValue);
      this.semiMajorAxis = parseFloat(node.attributes.getNamedItem('SemiMajorAxis').nodeValue);
      this.semiMajorAxisUnits = Enums.parse('AltUnits', node.attributes.getNamedItem('SemiMajorAxisScale').nodeValue);
      this.eccentricity = parseFloat(node.attributes.getNamedItem('Eccentricity').nodeValue);
      this.inclination = parseFloat(node.attributes.getNamedItem('Inclination').nodeValue);
      this.argumentOfPeriapsis = parseFloat(node.attributes.getNamedItem('ArgumentOfPeriapsis').nodeValue);
      this.longitudeOfAscendingNode = parseFloat(node.attributes.getNamedItem('LongitudeOfAscendingNode').nodeValue);
      this.meanAnomolyAtEpoch = parseFloat(node.attributes.getNamedItem('MeanAnomolyAtEpoch').nodeValue);
      this.meanDailyMotion = parseFloat(node.attributes.getNamedItem('MeanDailyMotion').nodeValue);
      this.epoch = parseFloat(node.attributes.getNamedItem('Epoch').nodeValue);
    }
  }
  fromTLE(line1, line2, gravity) {
    this.epoch = SpaceTimeController._twoLineDateToJulian(line1.substr(18, 14));
    this.eccentricity = parseFloat('0.' + line2.substr(26, 7));
    this.inclination = parseFloat(line2.substr(8, 8));
    this.longitudeOfAscendingNode = parseFloat(line2.substr(17, 8));
    this.argumentOfPeriapsis = parseFloat(line2.substr(34, 8));
    const revs = parseFloat(line2.substr(52, 11));
    this.meanAnomolyAtEpoch = parseFloat(line2.substr(43, 8));
    this.meanDailyMotion = revs * 360;
    const part = (86400 / revs) / (Math.PI * 2);
    this.semiMajorAxis = Math.pow((part * part) * gravity, 1 / 3);
    this.semiMajorAxisUnits = 1;
  }
  toTLE() {
    const line1 = new ss.StringBuilder();
    line1.append('1 99999U 00111AAA ');
    line1.append(SpaceTimeController.julianToTwoLineDate(this.epoch));
    line1.append(' ');
    line1.append(this.semiMajorAxis.toExponential(4));
    line1.append(' 00000-0 ');
    line1.append(ReferenceFrame.toTLEExponential(this.meanDailyMotion, 5));
    line1.append('  001');
    line1.append(ReferenceFrame.computeTLECheckSum(line1.toString()));
    line1.appendLine('');
    const line2 = new ss.StringBuilder();
    line2.append('2 99999 ');
    line2.append(ReferenceFrame.tleNumberString(this.inclination, 3, 4) + ' ');
    line2.append(ReferenceFrame.tleNumberString(this.longitudeOfAscendingNode, 3, 4) + ' ');
    line2.append((ReferenceFrame.tleNumberString(this.eccentricity, 1, 7) + ' ').substring(2));
    line2.append(ReferenceFrame.tleNumberString(this.argumentOfPeriapsis, 3, 4) + ' ');
    line2.append(ReferenceFrame.tleNumberString(this.meanAnomolyAtEpoch, 3, 4) + ' ');
    line2.append(ReferenceFrame.toTLEExponential(this.meanDailyMotion / 207732, 5));
    line2.append('00001');
    line2.append(ReferenceFrame.computeTLECheckSum(line2.toString()));
    line2.appendLine('');
    return line1.toString() + line2.toString();
  }
  get_elements() {
    this._elements.a = this.semiMajorAxis;
    this._elements.e = this.eccentricity;
    this._elements.i = this.inclination;
    this._elements.w = this.argumentOfPeriapsis;
    this._elements.omega = this.longitudeOfAscendingNode;
    this._elements.jdEquinox = this.epoch;
    if (!this.meanDailyMotion) {
      this._elements.n = ELL.meanMotionFromSemiMajorAxis(this._elements.a);
    } else {
      this._elements.n = this.meanDailyMotion;
    }
    this._elements.t = this.epoch - (this.meanAnomolyAtEpoch / this._elements.n);
    return this._elements;
  }
  set_elements(value) {
    this._elements = value;
    return value;
  }
  computeFrame(renderContext) {
    switch (this.referenceFrameType) {
      case 1:
        this._computeOrbital(renderContext);
        break;
      case 0:
        this._computeFixedSherical(renderContext);
        break;
      case 2:
        this._computeFrameTrajectory(renderContext);
        break;
      default:
        break;
    }
  }
  useRotatingParentFrame() {
    switch (this.referenceFrameType) {
      case 1:
      case 2:
      case 3:
        return false;
      default:
        return true;
    }
  }
  _computeFixedRectangular(renderContext) {
  }
  _computeFixedSherical(renderContext) {
    if (this.observingLocation) {
      this.lat = SpaceTimeController.get_location().get_lat();
      this.lng = SpaceTimeController.get_location().get_lng();
      this.altitude = SpaceTimeController.get_altitude();
    }
    this.worldMatrix = Matrix3d.get_identity();
    this.worldMatrix.translate(this.translation);
    const localScale = (1 / renderContext.get_nominalRadius()) * this.scale * this.meanRadius;
    this.worldMatrix.scale(new Vector3d(localScale, localScale, localScale));
    this.worldMatrix._multiply(Matrix3d.rotationYawPitchRoll((this.heading / 180 * Math.PI), (this.pitch / 180 * Math.PI), (this.roll / 180 * Math.PI)));
    this.worldMatrix._multiply(Matrix3d._rotationZ(-90 / 180 * Math.PI));
    if (!!this.rotationalPeriod) {
      const rotationCurrent = (((SpaceTimeController.get_jNow() - this.zeroRotationDate) / this.rotationalPeriod) * Math.PI * 2) % (Math.PI * 2);
      this.worldMatrix._multiply(Matrix3d._rotationX(-rotationCurrent));
    }
    this.worldMatrix.translate(new Vector3d(1 + (this.altitude / renderContext.get_nominalRadius()), 0, 0));
    this.worldMatrix._multiply(Matrix3d._rotationZ(this.lat / 180 * Math.PI));
    this.worldMatrix._multiply(Matrix3d._rotationY(-(this.lng + 180) / 180 * Math.PI));
  }
  _computeFrameTrajectory(renderContext) {
  }
  _computeOrbital(renderContext) {
    const ee = this.get_elements();
    let point = ELL.calculateRectangularJD(SpaceTimeController.get_jNow(), ee);
    this.meanAnomoly = ee.meanAnnomolyOut;
    const pointInstantLater = ELL.calculateRectangular(ee, this.meanAnomoly + 0.001);
    const direction = Vector3d.subtractVectors(point, pointInstantLater);
    const up = point.copy();
    up.normalize();
    direction.normalize();
    const dist = point.length();
    let scaleFactor = 1;
    switch (this.semiMajorAxisUnits) {
      case 1:
        scaleFactor = 1;
        break;
      case 2:
        scaleFactor = 1 / 3.2808399;
        break;
      case 3:
        scaleFactor = (1 / 3.2808399) / 12;
        break;
      case 4:
        scaleFactor = 1609.344;
        break;
      case 5:
        scaleFactor = 1000;
        break;
      case 6:
        scaleFactor = 149598000 * 1000;
        break;
      case 7:
        scaleFactor = 63239.6717 * 149598000 * 1000;
        break;
      case 8:
        scaleFactor = 206264.806 * 149598000 * 1000;
        break;
      case 9:
        scaleFactor = 206264.806 * 149598000 * 1000 * 1000000;
        break;
      case 10:
        scaleFactor = 1;
        break;
      default:
        break;
    }
    scaleFactor *= 1 / renderContext.get_nominalRadius();
    const look = Matrix3d.lookAtLH(new Vector3d(0, 0, 0), direction, up);
    look.invert();
    this.worldMatrix = Matrix3d.get_identity();
    this.worldMatrix.translate(this.translation);
    const localScale = (1 / renderContext.get_nominalRadius()) * this.scale * this.meanRadius;
    this.worldMatrix.scale(new Vector3d(localScale, localScale, localScale));
    this.worldMatrix._multiply(Matrix3d.rotationYawPitchRoll((this.heading / 180 * Math.PI), (this.pitch / 180 * Math.PI), (this.roll / 180 * Math.PI)));
    if (!!this.rotationalPeriod) {
      const rotationCurrent = (((SpaceTimeController.get_jNow() - this.zeroRotationDate) / this.rotationalPeriod) * Math.PI * 2) % (Math.PI * 2);
      this.worldMatrix._multiply(Matrix3d._rotationX(-rotationCurrent));
    }
    point = Vector3d.scale(point, scaleFactor);
    this.worldMatrix.translate(point);
    if (this.stationKeeping) {
      this.worldMatrix = Matrix3d.multiplyMatrix(look, this.worldMatrix);
    }
  }
}

