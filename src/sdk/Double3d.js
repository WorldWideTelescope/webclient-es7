import ss from './scriptsharp/ss';
import {Tile} from './Tile';
import {Color} from './Color';
import {Coordinates} from './Coordinates';


export class PositionTexture {
  constructor() {
    this.tu = 0;
    this.tv = 0;
    this.position = new Vector3d();
  }

  static createPos(pos, u, v) {
    const temp = new PositionTexture();
    temp.tu = u * Tile.uvMultiple;
    temp.tv = v * Tile.uvMultiple;
    temp.position = pos;
    return temp;
  }

  static createPosRaw(pos, u, v) {
    const temp = new PositionTexture();
    temp.tu = u;
    temp.tv = v;
    temp.position = pos;
    return temp;
  }

  static createPosSize(pos, u, v, width, height) {
    const temp = new PositionTexture();
    temp.tu = u * width;
    temp.tv = v * height;
    temp.position = pos;
    return temp;
  }

  static create(xvalue, yvalue, zvalue, u, v) {
    const temp = new PositionTexture();
    temp.position = new Vector3d(xvalue, yvalue, zvalue);
    temp.tu = u * Tile.uvMultiple;
    temp.tv = v * Tile.uvMultiple;
    return temp;
  }

  copy() {
    const temp = new PositionTexture();
    temp.position = Vector3d.makeCopy(this.position);
    temp.tu = this.tu;
    temp.tv = this.tv;
    return temp;
  }

  toString() {
    return `${this.position.x}, ${this.position.y}, ${this.position.z}, ${this.tu}, ${this.tv}`;
  }
}

export class PositionColoredTextured {
  constructor() {
    this.tu = 0;
    this.tv = 0;
    this.color = new Color();
    this.position = new Vector3d();
  }

  static createPos(pos, u, v) {
    const temp = new PositionColoredTextured();
    temp.tu = u * Tile.uvMultiple;
    temp.tv = v * Tile.uvMultiple;
    temp.position = pos;
    return temp;
  }

  static createPosRaw(pos, u, v) {
    const temp = new PositionColoredTextured();
    temp.tu = u;
    temp.tv = v;
    temp.position = pos;
    return temp;
  }

  static createPosSize(pos, u, v, width, height) {
    const temp = new PositionColoredTextured();
    temp.tu = u * width;
    temp.tv = v * height;
    temp.position = pos;
    return temp;
  }

  static create(xvalue, yvalue, zvalue, u, v) {
    const temp = new PositionTexture();
    temp.position = new Vector3d(xvalue, yvalue, zvalue);
    temp.tu = u * Tile.uvMultiple;
    temp.tv = v * Tile.uvMultiple;
    return temp;
  }

  copy() {
    const temp = new PositionTexture();
    temp.position = Vector3d.makeCopy(this.position);
    temp.tu = this.tu;
    temp.tv = this.tv;
    return temp;
  }

  toString() {
    return `${this.position.x}, ${this.position.y}, ${this.position.z}, ${this.tu}, ${this.tv}`;
  }
};

export class PositionColored {
  constructor(pos, color) {
    this.color = new Color();
    this.color = color._clone();
    this.position = pos.copy();
  }

  copy() {
    const temp = new PositionColored(this.position, this.color);
    return temp;
  }

  toString() {
    return ss.format('{0}, {1}, {2}, {3}', this.position.x, this.position.y, this.position.z, this.color.toString());
  }
}

export class PositionNormalTexturedTangent {
  constructor(position, normal, texCoord, tangent) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.nx = 0;
    this.ny = 0;
    this.nz = 0;
    this.tu = 0;
    this.tv = 0;
    this.tanx = 0;
    this.tany = 0;
    this.tanz = 0;
    this.x = position.x;
    this.y = position.y;
    this.z = position.z;
    this.nx = normal.x;
    this.ny = normal.y;
    this.nz = normal.z;
    this.tu = texCoord.x;
    this.tv = texCoord.y;
    this.tanx = tangent.x;
    this.tany = tangent.y;
    this.tanz = tangent.z;
  }

  get_normal() {
    return new Vector3d(this.nx, this.ny, this.nz);
  }

  set_normal(value) {
    this.nx = value.x;
    this.ny = value.y;
    this.nz = value.z;
    return value;
  }

  get_position() {
    return new Vector3d(this.x, this.y, this.z);
  }

  set_position(value) {
    this.x = value.x;
    this.y = value.y;
    this.z = value.z;
    return value;
  }

  get_texCoord() {
    return new Vector2d(this.tu, this.tv);
  }

  set_texCoord(value) {
    this.tu = value.x;
    this.tv = value.y;
    return value;
  }

  get_tangent() {
    return new Vector3d(this.tanx, this.tany, this.tanz);
  }

  set_tangent(value) {
    this.tanx = value.x;
    this.tany = value.y;
    this.tanz = value.z;
    return value;
  }

  toString() {
    return ss.format('X={0}, Y={1}, Z={2}, Nx={3}, Ny={4}, Nz={5}, U={6}, V={7}, TanX={8}, TanY={9}, TanZ={10}', this.x, this.y, this.z, this.nx, this.ny, this.nz, this.tu, this.tv, this.tanx, this.tany, this.tanz);
  }
};

export class Vector3d {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static makeCopy(value) {
    const temp = new Vector3d();
    temp.x = value.x;
    temp.y = value.y;
    temp.z = value.z;
    return temp;
  };

  static negate(vec) {
    return new Vector3d(-vec.x, -vec.y, -vec.z);
  };

  static midPoint(left, right) {
    const result = new Vector3d((left.x + right.x) / 2, (left.y + right.y) / 2, (left.z + right.z) / 2);
    result.normalize();
    return result;
  };

  static midPointByLength(left, right) {
    const result = new Vector3d((left.x + right.x) / 2, (left.y + right.y) / 2, (left.z + right.z) / 2);
    result.normalize();
    result.multiply(left.length());
    return result;
  };

  static get empty() {
    return new Vector3d(0, 0, 0);
  }

  static get_empty() {
    return new Vector3d(0, 0, 0);
  };

  static addVectors(left, right) {
    return new Vector3d(left.x + right.x, left.y + right.y, left.z + right.z);
  };

  static cross(left, right) {
    return new Vector3d(left.y * right.z - left.z * right.y, left.z * right.x - left.x * right.z, left.x * right.y - left.y * right.x);
  };

  static dot(left, right) {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  };

  static getLength(source) {
    return Math.sqrt(source.x * source.x + source.y * source.y + source.z * source.z);
  };

  static getLengthSq(source) {
    return source.x * source.x + source.y * source.y + source.z * source.z;
  };

  static lerp(left, right, interpolater) {
    return new Vector3d(left.x * (1 - interpolater) + right.x * interpolater, left.y * (1 - interpolater) + right.y * interpolater, left.z * (1 - interpolater) + right.z * interpolater);
  };

  static midpoint(left, right) {
    const tmp = new Vector3d(left.x * (0.5) + right.x * 0.5, left.y * (0.5) + right.y * 0.5, left.z * (0.5) + right.z * 0.5);
    tmp.normalize();
    return tmp;
  };

  static slerp(left, right, interpolater) {
    let dot = Vector3d.dot(left, right);
    while (dot < 0.98) {
      const middle = Vector3d.midpoint(left, right);
      if (interpolater > 0.5) {
        left = middle;
        interpolater -= 0.5;
        interpolater *= 2;
      } else {
        right = middle;
        interpolater *= 2;
      }
      dot = Vector3d.dot(left, right);
    }
    const tmp = Vector3d.lerp(left, right, interpolater);
    tmp.normalize();
    return tmp;
  };

  static multiplyScalar(source, f) {
    const result = source.copy();
    result.multiply(f);
    return result;
  };

  static scale(source, scalingFactor) {
    const result = source;
    result.multiply(scalingFactor);
    return result;
  };

  static subtractVectors(left, right) {
    const result = left.copy();
    result.subtract(right);
    return result;
  };

  static parse(data) {
    const newVector = new Vector3d();
    const list = data.split(',');
    if (list.length === 3) {
      newVector.x = parseFloat(list[0]);
      newVector.y = parseFloat(list[1]);
      newVector.z = parseFloat(list[2]);
    }
    return newVector;
  };

  static _transformCoordinate(vector3d, mat) {
    return mat.transform(vector3d);
  };

  set(valueX, valueY, valueZ) {
    this.x = valueX;
    this.y = valueY;
    this.z = valueZ;
  }

  copy() {
    const temp = new Vector3d();
    temp.x = this.x;
    temp.y = this.y;
    temp.z = this.z;
    return temp;
  }

  round() {
    this.x = ss.truncate((this.x * 65536)) / 65536;
    this.y = ss.truncate((this.y * 65536)) / 65536;
    this.z = ss.truncate((this.z * 65536)) / 65536;
  }

  add(source) {
    this.x += source.x;
    this.y += source.y;
    this.z += source.z;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  multiply(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }

  normalize() {
    const length = this.length();
    if (!!length) {
      this.x /= length;
      this.y /= length;
      this.z /= length;
    }
  }

  rotateX(radians) {
    let zTemp;
    let yTemp;
    yTemp = this.y * Math.cos(radians) - this.z * Math.sin(radians);
    zTemp = this.y * Math.sin(radians) + this.z * Math.cos(radians);
    this.z = zTemp;
    this.y = yTemp;
  }

  rotateZ(radians) {
    let xTemp;
    let yTemp;
    xTemp = this.x * Math.cos(radians) - this.y * Math.sin(radians);
    yTemp = this.x * Math.sin(radians) + this.y * Math.cos(radians);
    this.y = yTemp;
    this.x = xTemp;
  }

  rotateY(radians) {
    let zTemp;
    let xTemp;
    zTemp = this.z * Math.cos(radians) - this.x * Math.sin(radians);
    xTemp = this.z * Math.sin(radians) + this.x * Math.cos(radians);
    this.x = xTemp;
    this.z = zTemp;
  }

  subtract(source) {
    this.x -= source.x;
    this.y -= source.y;
    this.z -= source.z;
  }

  toString() {
    return ss.format('{0}, {1}, {2}', this.x, this.y, this.z);
  }

  toSpherical() {
    let ascention;
    let declination;
    const radius = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    const XZ = Math.sqrt(this.x * this.x + this.z * this.z);
    declination = Math.asin(this.y / radius);
    if (!XZ) {
      ascention = 0;
    } else if (0 <= this.x) {
      ascention = Math.asin(this.z / XZ);
    } else {
      ascention = Math.PI - Math.asin(this.z / XZ);
    }
    return new Vector2d(((ascention + Math.PI) % (2 * Math.PI)), (declination + (Math.PI / 2)));
  }

  toRaDec() {
    const point = this.toSpherical();
    point.x = point.x / Math.PI * 12;
    point.y = (point.y / Math.PI * 180) - 90;
    return point;
  }

  distanceToLine(x1, x2) {
    const t1 = Vector3d.subtractVectors(x2, x1);
    const t2 = Vector3d.subtractVectors(x1, this);
    const t3 = Vector3d.cross(t1, t2);
    const d1 = t3.length();
    const t4 = Vector3d.subtractVectors(x2, x1);
    const d2 = t4.length();
    return d1 / d2;
  }

  _transformByMatrics(lookAtAdjust) {
    const temp = lookAtAdjust.transform(this);
    this.x = temp.x;
    this.y = temp.y;
    this.z = temp.z;
  }
}

export class Vector2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static lerp(left, right, interpolater) {
    return new Vector2d(left.x * (1 - interpolater) + right.x * interpolater, left.y * (1 - interpolater) + right.y * interpolater);
  };

  static cartesianToSpherical2(vector) {
    const rho = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    const longitude = Math.atan2(vector.z, vector.x);
    const latitude = Math.asin(vector.y / rho);
    return new Vector2d(longitude / Math.PI * 180, latitude / Math.PI * 180);
  };

  static average3d(left, right) {
    const pntLeft = Coordinates.geoTo3dDouble(left.y, left.x);
    const pntRight = Coordinates.geoTo3dDouble(right.y, right.x);
    const pntOut = Vector3d.addVectors(pntLeft, pntRight);
    pntOut.multiply(0.5);
    pntOut.normalize();
    return Vector2d.cartesianToSpherical2(pntOut);
  };

  static subtract(left, right) {
    return new Vector2d(left.x - right.x, left.y - right.y);
  };

  distance3d(pointB) {
    const pnt1 = Coordinates.geoTo3dDouble(pointB.y, pointB.x);
    const pnt2 = Coordinates.geoTo3dDouble(this.y, this.x);
    const pntDiff = Vector3d.subtractVectors(pnt1, pnt2);
    return pntDiff.length() / Math.PI * 180;
  }

  get_length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const length = this.get_length();
    if (!!length) {
      this.x /= length;
      this.y /= length;
    }
  }

  extend(factor) {
    this.x = this.x * factor;
    this.y = this.y * factor;
  }
}

export const Vector2d$ = {};

export function Matrix3d(m11 = 0, m12 = 0, m13 = 0, m14 = 0, m21 = 0, m22 = 0, m23 = 0, m24 = 0, m31 = 0, m32 = 0, m33 = 0, m34 = 0, offsetX = 0, offsetY = 0, offsetZ = 0, m44 = 0) {
  this._m11 = m11;
  this._m12 = m12;
  this._m13 = m13;
  this._m14 = m14;
  this._m21 = m21;
  this._m22 = m22;
  this._m23 = m23;
  this._m24 = m24;
  this._m31 = m31;
  this._m32 = m32;
  this._m33 = m33;
  this._m34 = m34;
  this._offsetX = offsetX;
  this._offsetY = offsetY;
  this._offsetZ = offsetZ;
  this._m44 = m44;
  this._isNotKnownToBeIdentity = m11 !== 0 || m12 !== 0 || m13 !== 0 || m14 !== 0 || m21 !== 0;
}

Matrix3d.get_identity = function () {
  const temp = new Matrix3d();
  temp.set(Matrix3d._s_identity);
  return temp;
};
Matrix3d.multiplyMatrix = function (matrix1, matrix2) {
  if (matrix1.get__isDistinguishedIdentity()) {
    return matrix2;
  }
  if (matrix2.get__isDistinguishedIdentity()) {
    return matrix1;
  }
  return new Matrix3d((((matrix1._m11 * matrix2._m11) + (matrix1._m12 * matrix2._m21)) + (matrix1._m13 * matrix2._m31)) + (matrix1._m14 * matrix2._offsetX), (((matrix1._m11 * matrix2._m12) + (matrix1._m12 * matrix2._m22)) + (matrix1._m13 * matrix2._m32)) + (matrix1._m14 * matrix2._offsetY), (((matrix1._m11 * matrix2._m13) + (matrix1._m12 * matrix2._m23)) + (matrix1._m13 * matrix2._m33)) + (matrix1._m14 * matrix2._offsetZ), (((matrix1._m11 * matrix2._m14) + (matrix1._m12 * matrix2._m24)) + (matrix1._m13 * matrix2._m34)) + (matrix1._m14 * matrix2._m44), (((matrix1._m21 * matrix2._m11) + (matrix1._m22 * matrix2._m21)) + (matrix1._m23 * matrix2._m31)) + (matrix1._m24 * matrix2._offsetX), (((matrix1._m21 * matrix2._m12) + (matrix1._m22 * matrix2._m22)) + (matrix1._m23 * matrix2._m32)) + (matrix1._m24 * matrix2._offsetY), (((matrix1._m21 * matrix2._m13) + (matrix1._m22 * matrix2._m23)) + (matrix1._m23 * matrix2._m33)) + (matrix1._m24 * matrix2._offsetZ), (((matrix1._m21 * matrix2._m14) + (matrix1._m22 * matrix2._m24)) + (matrix1._m23 * matrix2._m34)) + (matrix1._m24 * matrix2._m44), (((matrix1._m31 * matrix2._m11) + (matrix1._m32 * matrix2._m21)) + (matrix1._m33 * matrix2._m31)) + (matrix1._m34 * matrix2._offsetX), (((matrix1._m31 * matrix2._m12) + (matrix1._m32 * matrix2._m22)) + (matrix1._m33 * matrix2._m32)) + (matrix1._m34 * matrix2._offsetY), (((matrix1._m31 * matrix2._m13) + (matrix1._m32 * matrix2._m23)) + (matrix1._m33 * matrix2._m33)) + (matrix1._m34 * matrix2._offsetZ), (((matrix1._m31 * matrix2._m14) + (matrix1._m32 * matrix2._m24)) + (matrix1._m33 * matrix2._m34)) + (matrix1._m34 * matrix2._m44), (((matrix1._offsetX * matrix2._m11) + (matrix1._offsetY * matrix2._m21)) + (matrix1._offsetZ * matrix2._m31)) + (matrix1._m44 * matrix2._offsetX), (((matrix1._offsetX * matrix2._m12) + (matrix1._offsetY * matrix2._m22)) + (matrix1._offsetZ * matrix2._m32)) + (matrix1._m44 * matrix2._offsetY), (((matrix1._offsetX * matrix2._m13) + (matrix1._offsetY * matrix2._m23)) + (matrix1._offsetZ * matrix2._m33)) + (matrix1._m44 * matrix2._offsetZ), (((matrix1._offsetX * matrix2._m14) + (matrix1._offsetY * matrix2._m24)) + (matrix1._offsetZ * matrix2._m34)) + (matrix1._m44 * matrix2._m44));
};
Matrix3d.lookAtLH = function (cameraPosition, cameraTarget, cameraUpVector) {
  const zaxis = Vector3d.subtractVectors(cameraTarget, cameraPosition);
  zaxis.normalize();
  const xaxis = Vector3d.cross(cameraUpVector, zaxis);
  xaxis.normalize();
  const yaxis = Vector3d.cross(zaxis, xaxis);
  const mat = new Matrix3d(xaxis.x, yaxis.x, zaxis.x, 0, xaxis.y, yaxis.y, zaxis.y, 0, xaxis.z, yaxis.z, zaxis.z, 0, -Vector3d.dot(xaxis, cameraPosition), -Vector3d.dot(yaxis, cameraPosition), -Vector3d.dot(zaxis, cameraPosition), 1);
  return mat;
};
Matrix3d._createIdentity = function () {
  const matrixd = new Matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  matrixd.set__isDistinguishedIdentity(true);
  return matrixd;
};
Matrix3d.equals = function (matrix1, matrix2) {
  if (matrix1.get__isDistinguishedIdentity() || matrix2.get__isDistinguishedIdentity()) {
    return (matrix1.get_isIdentity() === matrix2.get_isIdentity());
  }
  if ((((matrix1.get_m11() === matrix2.get_m11() && matrix1.get_m12() === matrix2.get_m12()) && (matrix1.get_m13() === matrix2.get_m13() && matrix1.get_m14() === matrix2.get_m14())) && ((matrix1.get_m21() === matrix2.get_m21() && matrix1.get_m22() === matrix2.get_m22()) && (matrix1.get_m23() === matrix2.get_m23() && matrix1.get_m24() === matrix2.get_m24()))) && (((matrix1.get_m31() === matrix2.get_m31() && matrix1.get_m32() === matrix2.get_m32()) && (matrix1.get_m33() === matrix2.get_m33() && matrix1.get_m34() === matrix2.get_m34())) && ((matrix1.get_offsetX() === matrix2.get_offsetX() && matrix1.get_offsetY() === matrix2.get_offsetY()) && matrix1.get_offsetZ() === matrix2.get_offsetZ()))) {
    return matrix1.get_m44() === matrix2.get_m44();
  }
  return false;
};
Matrix3d.fromMatrix2d = function (mat) {
  const mat3d = Matrix3d._createIdentity();
  mat3d.set_m11(mat.m11);
  mat3d.set_m12(mat.m12);
  mat3d.set_m13(mat.m13);
  mat3d.set_m21(mat.m21);
  mat3d.set_m22(mat.m22);
  mat3d.set_m23(mat.m23);
  mat3d.set_m31(mat.m31);
  mat3d.set_m32(mat.m32);
  mat3d.set_m33(mat.m33);
  mat3d._isNotKnownToBeIdentity = true;
  return mat3d;
};
Matrix3d.rotationYawPitchRoll = function (heading, pitch, roll) {
  const matX = Matrix3d._rotationX(pitch);
  const matY = Matrix3d._rotationY(heading);
  const matZ = Matrix3d._rotationZ(roll);
  return Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(matY, matX), matZ);
};
Matrix3d._rotationY = function (p) {
  const v = p;
  const matNew = Matrix3d.get_identity();
  matNew._m11 = Math.cos(v);
  matNew._m22 = 1;
  matNew._m31 = Math.sin(v);
  matNew._m13 = -Math.sin(v);
  matNew._m33 = Math.cos(v);
  matNew._isNotKnownToBeIdentity = true;
  return matNew;
};
Matrix3d._rotationX = function (p) {
  const v = p;
  const matNew = Matrix3d.get_identity();
  matNew._m11 = 1;
  matNew._m22 = Math.cos(v);
  matNew._m32 = -Math.sin(v);
  matNew._m23 = Math.sin(v);
  matNew._m33 = Math.cos(v);
  matNew._isNotKnownToBeIdentity = true;
  return matNew;
};
Matrix3d._rotationZ = function (p) {
  const v = p;
  const matNew = Matrix3d.get_identity();
  matNew._m11 = Math.cos(v);
  matNew._m21 = -Math.sin(v);
  matNew._m12 = Math.sin(v);
  matNew._m22 = Math.cos(v);
  matNew._m33 = 1;
  matNew._isNotKnownToBeIdentity = true;
  return matNew;
};
Matrix3d._scaling = function (x, y, z) {
  const matNew = Matrix3d.get_identity();
  matNew._m11 = x;
  matNew._m22 = y;
  matNew._m33 = z;
  matNew._isNotKnownToBeIdentity = true;
  return matNew;
};
Matrix3d._translationXYZ = function (x, y, z) {
  const matNew = Matrix3d.get_identity();
  matNew.set_offsetX(x);
  matNew.set_offsetY(y);
  matNew.set_offsetZ(z);
  matNew._isNotKnownToBeIdentity = true;
  return matNew;
};
Matrix3d.perspectiveFovLH = function (fieldOfViewY, aspectRatio, znearPlane, zfarPlane) {
  const h = 1 / Math.tan(fieldOfViewY / 2);
  const w = h / aspectRatio;
  return new Matrix3d(w, 0, 0, 0, 0, h, 0, 0, 0, 0, zfarPlane / (zfarPlane - znearPlane), 1, 0, 0, -znearPlane * zfarPlane / (zfarPlane - znearPlane), 0);
};
Matrix3d.perspectiveOffCenterLH = function (left, right, bottom, top, znearPlane, zfarPlane) {
  return new Matrix3d(2 * znearPlane / (right - left), 0, 0, 0, 0, 2 * znearPlane / (top - bottom), 0, 0, (left + right) / (left - right), (top + bottom) / (bottom - top), zfarPlane / (zfarPlane - znearPlane), 1, 0, 0, znearPlane * zfarPlane / (znearPlane - zfarPlane), 0);
};
Matrix3d.invertMatrix = function (matrix3d) {
  const mat = matrix3d.clone();
  mat.invert();
  return mat;
};
Matrix3d.translation = function (vector3d) {
  return Matrix3d._translationXYZ(vector3d.x, vector3d.y, vector3d.z);
};
Matrix3d.getMapMatrix = function (center, fieldWidth, fieldHeight, rotation) {
  let offsetX = 0;
  let offsetY = 0;
  offsetX = -((center.get_lng() + 180 - (fieldWidth / 2)) / 360);
  offsetY = -(1 - ((center.get_lat() + 90 + (fieldHeight / 2)) / 180));
  let mat = new Matrix2d();
  let scaleX = 0;
  let scaleY = 0;
  scaleX = 360 / fieldWidth;
  scaleY = 180 / fieldHeight;
  mat = Matrix2d.multiply(mat, Matrix2d.translation(offsetX, offsetY));
  mat = Matrix2d.multiply(mat, Matrix2d.scaling(scaleX, scaleY));
  if (!!rotation) {
    mat = Matrix2d.multiply(mat, Matrix2d.translation(-0.5, -0.5));
    mat = Matrix2d.multiply(mat, Matrix2d.rotation(rotation));
    mat = Matrix2d.multiply(mat, Matrix2d.translation(0.5, 0.5));
  }
  return Matrix3d.fromMatrix2d(mat);
};
export const Matrix3d$ = {
  clone: function () {
    const tmp = new Matrix3d();
    tmp.set(this);
    return tmp;
  },
  setIdentity: function () {
    this.set(Matrix3d._s_identity);
  },
  set: function (mat) {
    this._m11 = mat._m11;
    this._m12 = mat._m12;
    this._m13 = mat._m13;
    this._m14 = mat._m14;
    this._m21 = mat._m21;
    this._m22 = mat._m22;
    this._m23 = mat._m23;
    this._m24 = mat._m24;
    this._m31 = mat._m31;
    this._m32 = mat._m32;
    this._m33 = mat._m33;
    this._m34 = mat._m34;
    this._offsetX = mat._offsetX;
    this._offsetY = mat._offsetY;
    this._offsetZ = mat._offsetZ;
    this._m44 = mat._m44;
    this._isNotKnownToBeIdentity = true;
  },
  floatArray: function () {
    const array = new Array(16);
    array[0] = this._m11;
    array[1] = this._m12;
    array[2] = this._m13;
    array[3] = this._m14;
    array[4] = this._m21;
    array[5] = this._m22;
    array[6] = this._m23;
    array[7] = this._m24;
    array[8] = this._m31;
    array[9] = this._m32;
    array[10] = this._m33;
    array[11] = this._m34;
    array[12] = this._offsetX;
    array[13] = this._offsetY;
    array[14] = this._offsetZ;
    array[15] = this._m44;
    return array;
  },
  get_isIdentity: function () {
    if (this.get__isDistinguishedIdentity()) {
      return true;
    }
    if (((((this._m11 === 1) && (!this._m12)) && ((!this._m13) && (!this._m14))) && (((!this._m21) && (this._m22 === 1)) && ((!this._m23) && (!this._m24)))) && ((((!this._m31) && (!this._m32)) && ((this._m33 === 1) && (!this._m34))) && (((!this._offsetX) && (!this._offsetY)) && ((!this._offsetZ) && (this._m44 === 1))))) {
      this.set__isDistinguishedIdentity(true);
      return true;
    }
    return false;
  },
  prepend: function (matrix) {
    this.set(Matrix3d.multiplyMatrix(matrix, this));
  },
  append: function (matrix) {
    this._multiply(matrix);
  },
  scale: function (scale) {
    if (this.get__isDistinguishedIdentity()) {
      this._setScaleMatrix(scale);
    } else {
      this._m11 *= scale.x;
      this._m12 *= scale.y;
      this._m13 *= scale.z;
      this._m21 *= scale.x;
      this._m22 *= scale.y;
      this._m23 *= scale.z;
      this._m31 *= scale.x;
      this._m32 *= scale.y;
      this._m33 *= scale.z;
      this._offsetX *= scale.x;
      this._offsetY *= scale.y;
      this._offsetZ *= scale.z;
    }
  },
  scalePrepend: function (scale) {
    if (this.get__isDistinguishedIdentity()) {
      this._setScaleMatrix(scale);
    } else {
      this._m11 *= scale.x;
      this._m12 *= scale.x;
      this._m13 *= scale.x;
      this._m14 *= scale.x;
      this._m21 *= scale.y;
      this._m22 *= scale.y;
      this._m23 *= scale.y;
      this._m24 *= scale.y;
      this._m31 *= scale.z;
      this._m32 *= scale.z;
      this._m33 *= scale.z;
      this._m34 *= scale.z;
    }
  },
  scaleAt: function (scale, center) {
    if (this.get__isDistinguishedIdentity()) {
      this._setScaleMatrixCenter(scale, center);
    } else {
      let num = this._m14 * center.x;
      this._m11 = num + (scale.x * (this._m11 - num));
      num = this._m14 * center.y;
      this._m12 = num + (scale.y * (this._m12 - num));
      num = this._m14 * center.z;
      this._m13 = num + (scale.z * (this._m13 - num));
      num = this._m24 * center.x;
      this._m21 = num + (scale.x * (this._m21 - num));
      num = this._m24 * center.y;
      this._m22 = num + (scale.y * (this._m22 - num));
      num = this._m24 * center.z;
      this._m23 = num + (scale.z * (this._m23 - num));
      num = this._m34 * center.x;
      this._m31 = num + (scale.x * (this._m31 - num));
      num = this._m34 * center.y;
      this._m32 = num + (scale.y * (this._m32 - num));
      num = this._m34 * center.z;
      this._m33 = num + (scale.z * (this._m33 - num));
      num = this._m44 * center.x;
      this._offsetX = num + (scale.x * (this._offsetX - num));
      num = this._m44 * center.y;
      this._offsetY = num + (scale.y * (this._offsetY - num));
      num = this._m44 * center.z;
      this._offsetZ = num + (scale.z * (this._offsetZ - num));
    }
  },
  scaleAtPrepend: function (scale, center) {
    if (this.get__isDistinguishedIdentity()) {
      this._setScaleMatrixCenter(scale, center);
    } else {
      const num3 = center.x - (center.x * scale.x);
      const num2 = center.y - (center.y * scale.y);
      const num = center.z - (center.z * scale.z);
      this._offsetX += ((this._m11 * num3) + (this._m21 * num2)) + (this._m31 * num);
      this._offsetY += ((this._m12 * num3) + (this._m22 * num2)) + (this._m32 * num);
      this._offsetZ += ((this._m13 * num3) + (this._m23 * num2)) + (this._m33 * num);
      this._m44 += ((this._m14 * num3) + (this._m24 * num2)) + (this._m34 * num);
      this._m11 *= scale.x;
      this._m12 *= scale.x;
      this._m13 *= scale.x;
      this._m14 *= scale.x;
      this._m21 *= scale.y;
      this._m22 *= scale.y;
      this._m23 *= scale.y;
      this._m24 *= scale.y;
      this._m31 *= scale.z;
      this._m32 *= scale.z;
      this._m33 *= scale.z;
      this._m34 *= scale.z;
    }
  },
  translate: function (offset) {
    if (this.get__isDistinguishedIdentity()) {
      this._setTranslationMatrix(offset);
    } else {
      this._m11 += this._m14 * offset.x;
      this._m12 += this._m14 * offset.y;
      this._m13 += this._m14 * offset.z;
      this._m21 += this._m24 * offset.x;
      this._m22 += this._m24 * offset.y;
      this._m23 += this._m24 * offset.z;
      this._m31 += this._m34 * offset.x;
      this._m32 += this._m34 * offset.y;
      this._m33 += this._m34 * offset.z;
      this._offsetX += this._m44 * offset.x;
      this._offsetY += this._m44 * offset.y;
      this._offsetZ += this._m44 * offset.z;
    }
  },
  translatePrepend: function (offset) {
    if (this.get__isDistinguishedIdentity()) {
      this._setTranslationMatrix(offset);
    } else {
      this._offsetX += ((this._m11 * offset.x) + (this._m21 * offset.y)) + (this._m31 * offset.z);
      this._offsetY += ((this._m12 * offset.x) + (this._m22 * offset.y)) + (this._m32 * offset.z);
      this._offsetZ += ((this._m13 * offset.x) + (this._m23 * offset.y)) + (this._m33 * offset.z);
      this._m44 += ((this._m14 * offset.x) + (this._m24 * offset.y)) + (this._m34 * offset.z);
    }
  },
  transform: function (point) {
    const temp = new Vector3d();
    if (!this.get__isDistinguishedIdentity()) {
      const x = point.x;
      const y = point.y;
      const z = point.z;
      temp.x = (((x * this._m11) + (y * this._m21)) + (z * this._m31)) + this._offsetX;
      temp.y = (((x * this._m12) + (y * this._m22)) + (z * this._m32)) + this._offsetY;
      temp.z = (((x * this._m13) + (y * this._m23)) + (z * this._m33)) + this._offsetZ;
      if (!this.get_isAffine()) {
        const num4 = (((x * this._m14) + (y * this._m24)) + (z * this._m34)) + this._m44;
        temp.x /= num4;
        temp.y /= num4;
        temp.z /= num4;
      }
    }
    return temp;
  },
  _transformTo: function (input, output) {
    output.x = (((input.x * this._m11) + (input.y * this._m21)) + (input.z * this._m31)) + this._offsetX;
    output.y = (((input.x * this._m12) + (input.y * this._m22)) + (input.z * this._m32)) + this._offsetY;
    output.z = (((input.x * this._m13) + (input.y * this._m23)) + (input.z * this._m33)) + this._offsetZ;
    const num4 = (((input.x * this._m14) + (input.y * this._m24)) + (input.z * this._m34)) + this._m44;
    output.x /= num4;
    output.y /= num4;
    output.z /= num4;
  },
  transformArray: function (points) {
    if (points != null) {
      for (let i = 0; i < points.length; i++) {
        this._multiplyPoint(points[i]);
      }
    }
  },
  projectArrayToScreen: function (input, output) {
    if (input != null && output != null) {
      const affine = this.get_isAffine();
      for (let i = 0; i < input.length; i++) {
        const x = input[i].x;
        const y = input[i].y;
        const z = input[i].z;
        if (affine) {
          output[i].x = ((((x * this._m11) + (y * this._m21)) + (z * this._m31)) + this._offsetX);
          output[i].y = ((((x * this._m12) + (y * this._m22)) + (z * this._m32)) + this._offsetY);
          output[i].z = (((x * this._m13) + (y * this._m23)) + (z * this._m33)) + this._offsetZ;
        } else {
          const num4 = (((x * this._m14) + (y * this._m24)) + (z * this._m34)) + this._m44;
          output[i].x = (((((x * this._m11) + (y * this._m21)) + (z * this._m31)) + this._offsetX) / num4);
          output[i].y = (((((x * this._m12) + (y * this._m22)) + (z * this._m32)) + this._offsetY) / num4);
          output[i].z = ((((x * this._m13) + (y * this._m23)) + (z * this._m33)) + this._offsetZ) / num4;
        }
      }
    }
  },
  projectToScreen: function (input, width, height) {
    const output = new Vector3d();
    const x = input.x;
    const y = input.y;
    const z = input.z;
    if (this.get_isAffine()) {
      output.x = (((((x * this._m11) + (y * this._m21)) + (z * this._m31)) + this._offsetX) + 0.5) * width;
      output.y = (-((((x * this._m12) + (y * this._m22)) + (z * this._m32)) + this._offsetY) + 0.5) * height;
      output.z = (((x * this._m13) + (y * this._m23)) + (z * this._m33)) + this._offsetZ;
    } else {
      const num4 = (((x * this._m14) + (y * this._m24)) + (z * this._m34)) + this._m44;
      output.x = ((((((x * this._m11) + (y * this._m21)) + (z * this._m31)) + this._offsetX) / num4) + 0.5) * width;
      output.y = (-(((((x * this._m12) + (y * this._m22)) + (z * this._m32)) + this._offsetY) / num4) + 0.5) * height;
      output.z = ((((x * this._m13) + (y * this._m23)) + (z * this._m33)) + this._offsetZ) / num4;
    }
    return output;
  },
  get_isAffine: function () {
    if (this.get__isDistinguishedIdentity()) {
      return true;
    }
    if (((!this._m14) && (!this._m24)) && (!this._m34)) {
      return (this._m44 === 1);
    }
    return false;
  },
  get_determinant: function () {
    if (this.get__isDistinguishedIdentity()) {
      return 1;
    }
    if (this.get_isAffine()) {
      return this._getNormalizedAffineDeterminant();
    }
    const num6 = (this._m13 * this._m24) - (this._m23 * this._m14);
    const num5 = (this._m13 * this._m34) - (this._m33 * this._m14);
    const num4 = (this._m13 * this._m44) - (this._offsetZ * this._m14);
    const num3 = (this._m23 * this._m34) - (this._m33 * this._m24);
    const num2 = (this._m23 * this._m44) - (this._offsetZ * this._m24);
    const num = (this._m33 * this._m44) - (this._offsetZ * this._m34);
    const num10 = ((this._m22 * num5) - (this._m32 * num6)) - (this._m12 * num3);
    const num9 = ((this._m12 * num2) - (this._m22 * num4)) + (this._offsetY * num6);
    const num8 = ((this._m32 * num4) - (this._offsetY * num5)) - (this._m12 * num);
    const num7 = ((this._m22 * num) - (this._m32 * num2)) + (this._offsetY * num3);
    return ((((this._offsetX * num10) + (this._m31 * num9)) + (this._m21 * num8)) + (this._m11 * num7));
  },
  get_hasInverse: function () {
    return !DoubleUtilities.isZero(this.get_determinant());
  },
  invert: function () {
    if (!this._invertCore()) {
      return;
    }
  },
  transpose: function () {
    const that = new Matrix3d();
    that.set(this);
    this._m12 = that._m21;
    this._m13 = that._m31;
    this._m14 = that._offsetX;
    this._m23 = that._m32;
    this._m24 = that._offsetY;
    this._m34 = that._offsetZ;
    this._m21 = that._m12;
    this._m31 = that._m13;
    this._offsetX = that._m14;
    this._m32 = that._m23;
    this._offsetY = that._m24;
    this._offsetZ = that._m34;
  },
  get_m11: function () {
    if (this.get__isDistinguishedIdentity()) {
      return 1;
    }
    return this._m11;
  },
  set_m11: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m11 = value;
    return value;
  },
  get_m12: function () {
    return this._m12;
  },
  set_m12: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m12 = value;
    return value;
  },
  get_m13: function () {
    return this._m13;
  },
  set_m13: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m13 = value;
    return value;
  },
  get_m14: function () {
    return this._m14;
  },
  set_m14: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m14 = value;
    return value;
  },
  get_m21: function () {
    return this._m21;
  },
  set_m21: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m21 = value;
    return value;
  },
  get_m22: function () {
    if (this.get__isDistinguishedIdentity()) {
      return 1;
    }
    return this._m22;
  },
  set_m22: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m22 = value;
    return value;
  },
  get_m23: function () {
    return this._m23;
  },
  set_m23: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m23 = value;
    return value;
  },
  get_m24: function () {
    return this._m24;
  },
  set_m24: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m24 = value;
    return value;
  },
  get_m31: function () {
    return this._m31;
  },
  set_m31: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m31 = value;
    return value;
  },
  get_m32: function () {
    return this._m32;
  },
  set_m32: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m32 = value;
    return value;
  },
  get_m33: function () {
    if (this.get__isDistinguishedIdentity()) {
      return 1;
    }
    return this._m33;
  },
  set_m33: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m33 = value;
    return value;
  },
  get_m34: function () {
    return this._m34;
  },
  set_m34: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m34 = value;
    return value;
  },
  get_m41: function () {
    return this.get_offsetX();
  },
  set_m41: function (value) {
    this.set_offsetX(value);
    return value;
  },
  get_m42: function () {
    return this.get_offsetY();
  },
  set_m42: function (value) {
    this.set_offsetY(value);
    return value;
  },
  get_m43: function () {
    return this.get_offsetZ();
  },
  set_m43: function (value) {
    this.set_offsetZ(value);
    return value;
  },
  get_offsetX: function () {
    return this._offsetX;
  },
  set_offsetX: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._offsetX = value;
    return value;
  },
  get_offsetY: function () {
    return this._offsetY;
  },
  set_offsetY: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._offsetY = value;
    return value;
  },
  get_offsetZ: function () {
    return this._offsetZ;
  },
  set_offsetZ: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._offsetZ = value;
    return value;
  },
  get_m44: function () {
    if (this.get__isDistinguishedIdentity()) {
      return 1;
    }
    return this._m44;
  },
  set_m44: function (value) {
    if (this.get__isDistinguishedIdentity()) {
      this.set(Matrix3d._s_identity);
      this.set__isDistinguishedIdentity(false);
    }
    this._m44 = value;
    return value;
  },
  _setScaleMatrix: function (scale) {
    this._m11 = scale.x;
    this._m22 = scale.y;
    this._m33 = scale.z;
    this._m44 = 1;
    this.set__isDistinguishedIdentity(false);
  },
  _setScaleMatrixCenter: function (scale, center) {
    this._m11 = scale.x;
    this._m22 = scale.y;
    this._m33 = scale.z;
    this._m44 = 1;
    this._offsetX = center.x - (center.x * scale.x);
    this._offsetY = center.y - (center.y * scale.y);
    this._offsetZ = center.z - (center.z * scale.z);
    this.set__isDistinguishedIdentity(false);
  },
  _setTranslationMatrix: function (offset) {
    this._m11 = this._m22 = this._m33 = this._m44 = 1;
    this._offsetX = offset.x;
    this._offsetY = offset.y;
    this._offsetZ = offset.z;
    this.set__isDistinguishedIdentity(false);
  },
  _multiplyPoint: function (point) {
    if (!this.get__isDistinguishedIdentity()) {
      const x = point.x;
      const y = point.y;
      const z = point.z;
      point.x = (((x * this._m11) + (y * this._m21)) + (z * this._m31)) + this._offsetX;
      point.y = (((x * this._m12) + (y * this._m22)) + (z * this._m32)) + this._offsetY;
      point.z = (((x * this._m13) + (y * this._m23)) + (z * this._m33)) + this._offsetZ;
      if (!this.get_isAffine()) {
        const num4 = (((x * this._m14) + (y * this._m24)) + (z * this._m34)) + this._m44;
        point.x /= num4;
        point.y /= num4;
        point.z /= num4;
      }
    }
  },
  multiplyVector: function (vector) {
    if (!this.get__isDistinguishedIdentity()) {
      const x = vector.x;
      const y = vector.y;
      const z = vector.z;
      vector.x = ((x * this._m11) + (y * this._m21)) + (z * this._m31);
      vector.y = ((x * this._m12) + (y * this._m22)) + (z * this._m32);
      vector.z = ((x * this._m13) + (y * this._m23)) + (z * this._m33);
    }
  },
  _getNormalizedAffineDeterminant: function () {
    const num3 = (this._m12 * this._m23) - (this._m22 * this._m13);
    const num2 = (this._m32 * this._m13) - (this._m12 * this._m33);
    const num = (this._m22 * this._m33) - (this._m32 * this._m23);
    return (((this._m31 * num3) + (this._m21 * num2)) + (this._m11 * num));
  },
  _normalizedAffineInvert: function () {
    const num11 = (this._m12 * this._m23) - (this._m22 * this._m13);
    const num10 = (this._m32 * this._m13) - (this._m12 * this._m33);
    const num9 = (this._m22 * this._m33) - (this._m32 * this._m23);
    const num8 = ((this._m31 * num11) + (this._m21 * num10)) + (this._m11 * num9);
    if (DoubleUtilities.isZero(num8)) {
      return false;
    }
    const num20 = (this._m21 * this._m13) - (this._m11 * this._m23);
    const num19 = (this._m11 * this._m33) - (this._m31 * this._m13);
    const num18 = (this._m31 * this._m23) - (this._m21 * this._m33);
    const num7 = (this._m11 * this._m22) - (this._m21 * this._m12);
    const num6 = (this._m11 * this._m32) - (this._m31 * this._m12);
    const num5 = (this._m11 * this._offsetY) - (this._offsetX * this._m12);
    const num4 = (this._m21 * this._m32) - (this._m31 * this._m22);
    const num3 = (this._m21 * this._offsetY) - (this._offsetX * this._m22);
    const num2 = (this._m31 * this._offsetY) - (this._offsetX * this._m32);
    const num17 = ((this._m23 * num5) - (this._offsetZ * num7)) - (this._m13 * num3);
    const num16 = ((this._m13 * num2) - (this._m33 * num5)) + (this._offsetZ * num6);
    const num15 = ((this._m33 * num3) - (this._offsetZ * num4)) - (this._m23 * num2);
    const num14 = num7;
    const num13 = -num6;
    const num12 = num4;
    const num = 1 / num8;
    this._m11 = num9 * num;
    this._m12 = num10 * num;
    this._m13 = num11 * num;
    this._m21 = num18 * num;
    this._m22 = num19 * num;
    this._m23 = num20 * num;
    this._m31 = num12 * num;
    this._m32 = num13 * num;
    this._m33 = num14 * num;
    this._offsetX = num15 * num;
    this._offsetY = num16 * num;
    this._offsetZ = num17 * num;
    return true;
  },
  _invertCore: function () {
    if (!this.get__isDistinguishedIdentity()) {
      if (this.get_isAffine()) {
        return this._normalizedAffineInvert();
      }
      let num7 = (this._m13 * this._m24) - (this._m23 * this._m14);
      let num6 = (this._m13 * this._m34) - (this._m33 * this._m14);
      let num5 = (this._m13 * this._m44) - (this._offsetZ * this._m14);
      let num4 = (this._m23 * this._m34) - (this._m33 * this._m24);
      let num3 = (this._m23 * this._m44) - (this._offsetZ * this._m24);
      let num2 = (this._m33 * this._m44) - (this._offsetZ * this._m34);
      const num12 = ((this._m22 * num6) - (this._m32 * num7)) - (this._m12 * num4);
      const num11 = ((this._m12 * num3) - (this._m22 * num5)) + (this._offsetY * num7);
      const num10 = ((this._m32 * num5) - (this._offsetY * num6)) - (this._m12 * num2);
      const num9 = ((this._m22 * num2) - (this._m32 * num3)) + (this._offsetY * num4);
      const num8 = (((this._offsetX * num12) + (this._m31 * num11)) + (this._m21 * num10)) + (this._m11 * num9);
      if (DoubleUtilities.isZero(num8)) {
        return false;
      }
      const num24 = ((this._m11 * num4) - (this._m21 * num6)) + (this._m31 * num7);
      const num23 = ((this._m21 * num5) - (this._offsetX * num7)) - (this._m11 * num3);
      const num22 = ((this._m11 * num2) - (this._m31 * num5)) + (this._offsetX * num6);
      const num21 = ((this._m31 * num3) - (this._offsetX * num4)) - (this._m21 * num2);
      num7 = (this._m11 * this._m22) - (this._m21 * this._m12);
      num6 = (this._m11 * this._m32) - (this._m31 * this._m12);
      num5 = (this._m11 * this._offsetY) - (this._offsetX * this._m12);
      num4 = (this._m21 * this._m32) - (this._m31 * this._m22);
      num3 = (this._m21 * this._offsetY) - (this._offsetX * this._m22);
      num2 = (this._m31 * this._offsetY) - (this._offsetX * this._m32);
      const num20 = ((this._m13 * num4) - (this._m23 * num6)) + (this._m33 * num7);
      const num19 = ((this._m23 * num5) - (this._offsetZ * num7)) - (this._m13 * num3);
      const num18 = ((this._m13 * num2) - (this._m33 * num5)) + (this._offsetZ * num6);
      const num17 = ((this._m33 * num3) - (this._offsetZ * num4)) - (this._m23 * num2);
      const num16 = ((this._m24 * num6) - (this._m34 * num7)) - (this._m14 * num4);
      const num15 = ((this._m14 * num3) - (this._m24 * num5)) + (this._m44 * num7);
      const num14 = ((this._m34 * num5) - (this._m44 * num6)) - (this._m14 * num2);
      const num13 = ((this._m24 * num2) - (this._m34 * num3)) + (this._m44 * num4);
      const num = 1 / num8;
      this._m11 = num9 * num;
      this._m12 = num10 * num;
      this._m13 = num11 * num;
      this._m14 = num12 * num;
      this._m21 = num21 * num;
      this._m22 = num22 * num;
      this._m23 = num23 * num;
      this._m24 = num24 * num;
      this._m31 = num13 * num;
      this._m32 = num14 * num;
      this._m33 = num15 * num;
      this._m34 = num16 * num;
      this._offsetX = num17 * num;
      this._offsetY = num18 * num;
      this._offsetZ = num19 * num;
      this._m44 = num20 * num;
    }
    return true;
  },
  get__isDistinguishedIdentity: function () {
    return !this._isNotKnownToBeIdentity;
  },
  set__isDistinguishedIdentity: function (value) {
    this._isNotKnownToBeIdentity = !value;
    return value;
  },
  _multiply: function (mat) {
    this.set(Matrix3d.multiplyMatrix(this, mat));
  }
};


// wwtlib.Matrix2d

export function Matrix2d() {
  this.m11 = 1;
  this.m12 = 0;
  this.m13 = 0;
  this.m21 = 0;
  this.m22 = 1;
  this.m23 = 0;
  this.m31 = 0;
  this.m32 = 0;
  this.m33 = 1;
}

Matrix2d.create = function (m11, m12, m13, m21, m22, m23, m31, m32, m33) {
  const mat = new Matrix2d();
  mat.m11 = m11;
  mat.m12 = m12;
  mat.m13 = m13;
  mat.m21 = m21;
  mat.m22 = m22;
  mat.m23 = m23;
  mat.m31 = m31;
  mat.m32 = m32;
  mat.m33 = m33;
  return mat;
};
Matrix2d.rotation = function (angle) {
  const mat = new Matrix2d();
  mat.m11 = Math.cos(angle);
  mat.m21 = -Math.sin(angle);
  mat.m12 = Math.sin(angle);
  mat.m22 = Math.cos(angle);
  return mat;
};
Matrix2d.translation = function (x, y) {
  const mat = new Matrix2d();
  mat.m31 = x;
  mat.m32 = y;
  return mat;
};
Matrix2d.scaling = function (x, y) {
  const mat = new Matrix2d();
  mat.m11 = x;
  mat.m22 = y;
  return mat;
};
Matrix2d.multiply = function (matrix1, matrix2) {
  return Matrix2d.create((((matrix1.m11 * matrix2.m11) + (matrix1.m12 * matrix2.m21)) + (matrix1.m13 * matrix2.m31)), (((matrix1.m11 * matrix2.m12) + (matrix1.m12 * matrix2.m22)) + (matrix1.m13 * matrix2.m32)), (((matrix1.m11 * matrix2.m13) + (matrix1.m12 * matrix2.m23)) + (matrix1.m13 * matrix2.m33)), (((matrix1.m21 * matrix2.m11) + (matrix1.m22 * matrix2.m21)) + (matrix1.m23 * matrix2.m31)), (((matrix1.m21 * matrix2.m12) + (matrix1.m22 * matrix2.m22)) + (matrix1.m23 * matrix2.m32)), (((matrix1.m21 * matrix2.m13) + (matrix1.m22 * matrix2.m23)) + (matrix1.m23 * matrix2.m33)), (((matrix1.m31 * matrix2.m11) + (matrix1.m32 * matrix2.m21)) + (matrix1.m33 * matrix2.m31)), (((matrix1.m31 * matrix2.m12) + (matrix1.m32 * matrix2.m22)) + (matrix1.m33 * matrix2.m32)), (((matrix1.m31 * matrix2.m13) + (matrix1.m32 * matrix2.m23)) + (matrix1.m33 * matrix2.m33)));
};
Matrix2d.rotateAt = function (angle, pnt) {
  const matT0 = Matrix2d.translation(-pnt.x, -pnt.y);
  const matR = Matrix2d.rotation(angle);
  const matT1 = Matrix2d.translation(pnt.x, pnt.y);
  return Matrix2d.multiply(Matrix2d.multiply(matT0, matR), matT1);
};
export const Matrix2d$ = {
  _transformPoints: function (points) {
    const $enum1 = ss.enumerate(points);
    while ($enum1.moveNext()) {
      const pnt = $enum1.current;
      this.multiplyPoint(pnt);
    }
  },
  multiplyPoint: function (point) {
    const x = point.x;
    const y = point.y;
    point.x = (((x * this.m11) + (y * this.m21)) + this.m31);
    point.y = (((x * this.m12) + (y * this.m22)) + this.m32);
  }
};


// wwtlib.DoubleUtilities

export function DoubleUtilities() {
}

DoubleUtilities.isZero = function (value) {
  return (Math.abs(value) < 2.22044604925031E-50);
};
DoubleUtilities.isOne = function (value) {
  return (Math.abs(value - 1) < 2.22044604925031E-50);
};
DoubleUtilities.radiansToDegrees = function (radians) {
  return radians * 180 / Math.PI;
};
DoubleUtilities.degreesToRadians = function (degrees) {
  return degrees * Math.PI / 180;
};
DoubleUtilities.clamp = function (x, min, max) {
  return Math.max(min, Math.min(x, max));
};

export function PlaneD(valuePointA, valuePointB, valuePointC, valuePointD) {
  this.a = valuePointA;
  this.b = valuePointB;
  this.c = valuePointC;
  this.d = valuePointD;
}

export const PlaneD$ = {
  normalize: function () {
    const length = Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c);
    this.a /= length;
    this.b /= length;
    this.c /= length;
    this.d /= length;
  },
  dot: function (v) {
    return this.b * v.y + this.c * v.z + this.d * v.w + this.a * v.x;
  }
};


// wwtlib.Vector4d

export function Vector4d(valueX, valueY, valueZ, valueW) {

  this.x = valueX;
  this.y = valueY;
  this.z = valueZ;
  this.w = valueW;
}

export const Vector4d$ = {};


// wwtlib.PositionNormalTexturedX2

export function PositionNormalTexturedX2() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.nx = 0;
  this.ny = 0;
  this.nz = 0;
  this.tu = 0;
  this.tv = 0;
  this.tu1 = 0;
  this.tv1 = 0;
}

PositionNormalTexturedX2.create2UV = function (pos, nor, u, v, u1, v1) {
  const temp = new PositionNormalTexturedX2();
  temp.x = pos.x;
  temp.y = pos.y;
  temp.z = pos.z;
  temp.nx = nor.x;
  temp.ny = nor.y;
  temp.nz = nor.z;
  temp.tu = u;
  temp.tv = v;
  temp.tu1 = u1;
  temp.tv1 = v1;
  return temp;
};
PositionNormalTexturedX2.create = function (pos, nor, u, v) {
  const temp = new PositionNormalTexturedX2();
  temp.x = pos.x;
  temp.y = pos.y;
  temp.z = pos.z;
  temp.nx = nor.x;
  temp.ny = nor.y;
  temp.nz = nor.z;
  temp.tu = u;
  temp.tv = v;
  const result = Coordinates.cartesianToSpherical2(nor);
  temp.tu1 = ((result.get_lng() + 180) / 360);
  temp.tv1 = (1 - ((result.get_lat() + 90) / 180));
  return temp;
};
PositionNormalTexturedX2.createLong2UV = function (xvalue, yvalue, zvalue, nxvalue, nyvalue, nzvalue, u, v, u1, v1) {
  const temp = new PositionNormalTexturedX2();
  temp.x = xvalue;
  temp.y = yvalue;
  temp.z = zvalue;
  temp.nx = nxvalue;
  temp.ny = nyvalue;
  temp.nz = nzvalue;
  temp.tu = u;
  temp.tv = v;
  temp.tu1 = u1;
  temp.tv1 = v1;
  return temp;
};
PositionNormalTexturedX2.get_strideSize = function () {
  return 40;
};
export const PositionNormalTexturedX2$ = {
  get_lat: function () {
    return (1 - this.tv1) * 180 - 90;
  },
  set_lat: function (value) {
    this.tv1 = (1 - ((value + 90) / 180));
    return value;
  },
  get_lng: function () {
    return this.tu1 * 360 - 180;
  },
  set_lng: function (value) {
    this.tu1 = ((value + 180) / 360);
    return value;
  },
  createLong: function (xvalue, yvalue, zvalue, nxvalue, nyvalue, nzvalue, u, v) {
    const temp = new PositionNormalTexturedX2();
    temp.x = xvalue;
    temp.y = yvalue;
    temp.z = zvalue;
    temp.nx = nxvalue;
    temp.ny = nyvalue;
    temp.nz = nzvalue;
    temp.tu = u;
    temp.tv = v;
    const result = Coordinates.cartesianToSpherical2(new Vector3d(this.nx, this.ny, this.nz));
    temp.tu1 = ((result.get_lng() + 180) / 360);
    temp.tv1 = (1 - ((result.get_lat() + 90) / 180));
    return temp;
  },
  get_normal: function () {
    return new Vector3d(this.nx, this.ny, this.nz);
  },
  set_normal: function (value) {
    this.nx = value.x;
    this.ny = value.y;
    this.nz = value.z;
    return value;
  },
  get_position: function () {
    return new Vector3d(this.x, this.y, this.y);
  },
  set_position: function (value) {
    this.x = value.x;
    this.y = value.y;
    this.z = value.z;
    return value;
  },
  toString: function () {
    return ss.format('X={0}, Y={1}, Z={2}, Nx={3}, Ny={4}, Nz={5}, U={6}, V={7}, U1={8}, U2={9}', this.x, this.y, this.z, this.nx, this.ny, this.nz, this.tu, this.tv, this.tu1, this.tv1);
  }
};


// wwtlib.PositionNormalTextured

export function PositionNormalTextured() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.nx = 0;
  this.ny = 0;
  this.nz = 0;
  this.tu = 0;
  this.tv = 0;
}

PositionNormalTextured.createShort = function (pos, nor, u, v) {
  const temp = new PositionNormalTextured();
  temp.x = pos.x;
  temp.y = pos.y;
  temp.z = pos.z;
  temp.nx = nor.x;
  temp.ny = nor.y;
  temp.nz = nor.z;
  temp.tu = u;
  temp.tv = v;
  return temp;
};
PositionNormalTextured._create = function (x, y, z, nx, ny, nz, tu, tv) {
  const temp = new PositionNormalTextured();
  temp.x = x;
  temp.y = y;
  temp.z = z;
  temp.nx = nx;
  temp.ny = ny;
  temp.nz = nz;
  temp.tu = tu;
  temp.tv = tv;
  return temp;
};
PositionNormalTextured.createUV = function (pos, nor, uv) {
  const temp = new PositionNormalTextured();
  temp.x = pos.x;
  temp.y = pos.y;
  temp.z = pos.z;
  temp.nx = nor.x;
  temp.ny = nor.y;
  temp.nz = nor.z;
  temp.tu = uv.x;
  temp.tv = uv.y;
  return temp;
};
export const PositionNormalTextured$ = {
  createLong: function (xvalue, yvalue, zvalue, nxvalue, nyvalue, nzvalue, u, v) {
    const temp = new PositionNormalTexturedX2();
    temp.x = xvalue;
    temp.y = yvalue;
    temp.z = zvalue;
    temp.nx = nxvalue;
    temp.ny = nyvalue;
    temp.nz = nzvalue;
    temp.tu = u;
    temp.tv = v;
    return temp;
  },
  get_normal: function () {
    return new Vector3d(this.nx, this.ny, this.nz);
  },
  set_normal: function (value) {
    this.nx = value.x;
    this.ny = value.y;
    this.nz = value.z;
    return value;
  },
  get_position: function () {
    return new Vector3d(this.x, this.y, this.z);
  },
  set_position: function (value) {
    this.x = value.x;
    this.y = value.y;
    this.z = value.z;
    return value;
  },
  toString: function () {
    return ss.format('X={0}, Y={1}, Z={2}, Nx={3}, Ny={4}, Nz={5}, U={6}, V={7}, U1={8}, U2={9}', this.x, this.y, this.z, this.nx, this.ny, this.nz, this.tu, this.tv);
  }
};


// wwtlib.SphereHull

export function SphereHull() {
  this.radius = 0;
}

SphereHull._create = function (Center, Radius) {
  const temp = new SphereHull();
  temp.center = Center;
  temp.radius = Radius;
  return temp;
};
export const SphereHull$ = {};


// wwtlib.ConvexHull

export function ConvexHull() {
}

ConvexHull.findEnclosingSphereFast = function (points) {
  const result = new SphereHull();
  const count = points.length;
  const center = Vector3d.zero;
  for (let i = 0; i < count; ++i) {
    center.add(points[i]);
  }
  center.multiply(1 / count);
  let radius = 0;
  for (let i = 0; i < count; ++i) {
    const distance = Vector3d.getLengthSq(Vector3d.subtractVectors(points[i], center));
    if (distance > radius) {
      radius = distance;
    }
  }
  radius = Math.sqrt(radius);
  result.center = center;
  result.radius = radius;
  return result;
};
ConvexHull.findEnclosingSphere = function (list) {
  const Center = new Vector3d();
  let Radius = 0;
  const count = list.length;
  let i;
  let dx;
  let dy;
  let dz;
  let rad_sq;
  let xspan;
  let yspan;
  let zspan;
  let maxspan;
  let old_to_p;
  let old_to_p_sq;
  let old_to_new;
  let xmin = new Vector3d();
  let xmax = new Vector3d();
  let ymin = new Vector3d();
  let ymax = new Vector3d();
  let zmin = new Vector3d();
  let zmax = new Vector3d();
  let dia1 = new Vector3d();
  let dia2 = new Vector3d();
  xmin.x = ymin.y = zmin.z = 100000000;
  xmax.x = ymax.y = zmax.z = -1000000000;
  for (i = 0; i < count; i++) {
    let current = list[i];
    if (current.x < xmin.x) {
      xmin = current;
    }
    if (current.x > xmax.x) {
      xmax = current;
    }
    if (current.y < ymin.y) {
      ymin = current;
    }
    if (current.y > ymax.y) {
      ymax = current;
    }
    if (current.z < zmin.z) {
      zmin = current;
    }
    if (current.z > zmax.z) {
      zmax = current;
    }
  }
  dx = xmax.x - xmin.x;
  dy = xmax.y - xmin.y;
  dz = xmax.z - xmin.z;
  xspan = dx * dx + dy * dy + dz * dz;
  dx = ymax.x - ymin.x;
  dy = ymax.y - ymin.y;
  dz = ymax.z - ymin.z;
  yspan = dx * dx + dy * dy + dz * dz;
  dx = zmax.x - zmin.x;
  dy = zmax.y - zmin.y;
  dz = zmax.z - zmin.z;
  zspan = dx * dx + dy * dy + dz * dz;
  dia1 = xmin;
  dia2 = xmax;
  maxspan = xspan;
  if (yspan > maxspan) {
    maxspan = yspan;
    dia1 = ymin;
    dia2 = ymax;
  }
  if (zspan > maxspan) {
    dia1 = zmin;
    dia2 = zmax;
  }
  Center.x = (dia1.x + dia2.x) / 2;
  Center.y = (dia1.y + dia2.y) / 2;
  Center.z = (dia1.z + dia2.z) / 2;
  dx = dia2.x - Center.x;
  dy = dia2.y - Center.y;
  dz = dia2.z - Center.z;
  rad_sq = dx * dx + dy * dy + dz * dz;
  Radius = Math.sqrt(rad_sq);
  for (i = 0; i < count; i++) {
    let current = list[i];
    dx = current.x - Center.x;
    dy = current.y - Center.y;
    dz = current.z - Center.z;
    old_to_p_sq = dx * dx + dy * dy + dz * dz;
    if (old_to_p_sq > rad_sq) {
      old_to_p = Math.sqrt(old_to_p_sq);
      Radius = (Radius + old_to_p) / 2;
      rad_sq = Radius * Radius;
      old_to_new = old_to_p - Radius;
      Center.x = (Radius * Center.x + old_to_new * current.x) / old_to_p;
      Center.y = (Radius * Center.y + old_to_new * current.y) / old_to_p;
      Center.z = (Radius * Center.z + old_to_new * current.z) / old_to_p;
    }
  }
  return SphereHull._create(Center, Radius);
};
export const ConvexHull$ = {};