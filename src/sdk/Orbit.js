import {EllipseShader} from './Graphics/Shaders';
import {Matrix3d, Vector3d} from './Double3d';
import {PositionVertexBuffer} from './Graphics/GIBuffer';
import {Color, Colors} from './Color';
import {Coordinates} from './Coordinates';
import {SpaceTimeController} from './SpaceTimeController';
import ss from './scriptsharp/ss';

export function EllipseRenderer() {}
EllipseRenderer.drawEllipseWithPosition = (renderContext, semiMajorAxis, eccentricity, eccentricAnomaly, color, worldMatrix, positionNow) => {
  if (EllipseRenderer._ellipseShader == null) {
    EllipseRenderer._ellipseShader = new EllipseShader();
  }
  if (EllipseRenderer._ellipseVertexBuffer == null) {
    EllipseRenderer._ellipseVertexBuffer = EllipseRenderer.createEllipseVertexBuffer(500);
  }
  const savedWorld = renderContext.get_world();
  renderContext.set_world(worldMatrix);
  renderContext.gl.bindBuffer(34962, EllipseRenderer._ellipseVertexBuffer.vertexBuffer);
  renderContext.gl.bindBuffer(34963, null);
  EllipseShader.use(renderContext, semiMajorAxis, eccentricity, eccentricAnomaly, color, 1, savedWorld, positionNow);
  renderContext.gl.drawArrays(3, 0, EllipseRenderer._ellipseVertexBuffer.count);
  renderContext.set_world(savedWorld);
};
EllipseRenderer.drawEllipse = (renderContext, semiMajorAxis, eccentricity, eccentricAnomaly, color, worldMatrix) => {
  if (EllipseRenderer._ellipseShader == null) {
    EllipseRenderer._ellipseShader = new EllipseShader();
  }
  if (EllipseRenderer._ellipseWithoutStartPointVertexBuffer == null) {
    EllipseRenderer._ellipseWithoutStartPointVertexBuffer = EllipseRenderer.createEllipseVertexBufferWithoutStartPoint(360);
  }
  const savedWorld = renderContext.get_world();
  renderContext.set_world(worldMatrix);
  renderContext.gl.bindBuffer(34962, EllipseRenderer._ellipseWithoutStartPointVertexBuffer.vertexBuffer);
  renderContext.gl.bindBuffer(34963, null);
  EllipseShader.use(renderContext, semiMajorAxis, eccentricity, eccentricAnomaly, color, 1, savedWorld, Vector3d.create(0, 0, 0));
  renderContext.gl.drawArrays(3, 0, EllipseRenderer._ellipseWithoutStartPointVertexBuffer.count - 1);
  renderContext.set_world(savedWorld);
};
EllipseRenderer.createEllipseVertexBuffer = vertexCount => {
  const vb = new PositionVertexBuffer(vertexCount);
  const verts = vb.lock();
  let index = 0;
  for (let i = 0; i < vertexCount / 2; ++i) {
    verts[index++] = Vector3d.create(2 * i / vertexCount * 0.05, 0, 0);
  }
  for (let i = 0; i < vertexCount / 2; ++i) {
    verts[index++] = Vector3d.create(2 * i / vertexCount * 0.95 + 0.05, 0, 0);
  }
  vb.unlock();
  return vb;
};
EllipseRenderer.createEllipseVertexBufferWithoutStartPoint = vertexCount => {
  const vb = new PositionVertexBuffer(vertexCount);
  const verts = vb.lock();
  verts[0] = Vector3d.create(1E-06, 0, 0);
  for (let i = 1; i < vertexCount; ++i) {
    verts[i] = Vector3d.create(2 * i / vertexCount, 0, 0);
  }
  vb.unlock();
  return vb;
};
export const EllipseRenderer$ = {};


export function Orbit(elements, segments, color, thickness, scale) {
  this._elements = null;
  this._orbitColor = Colors.get_white();
  this._scale = 0;
  this._segmentCount = 0;
  this._elements = elements;
  this._segmentCount = segments;
  this._orbitColor = color;
  this._scale = scale;
}
export const Orbit$ = {
  cleanUp: () => {
  },
  get_boundingRadius: function () {
    if (this._elements != null) {
      return (this._elements.a * (1 + this._elements.e)) / this._scale;
    } else {
      return 0;
    }
  },
  draw3D: function (renderContext, opacity, centerPoint) {
    let orbitalPlaneOrientation = Matrix3d.multiplyMatrix(Matrix3d._rotationZ(Coordinates.degreesToRadians(this._elements.w)), Matrix3d.multiplyMatrix(Matrix3d._rotationX(Coordinates.degreesToRadians(this._elements.i)), Matrix3d._rotationZ(Coordinates.degreesToRadians(this._elements.omega))));
    orbitalPlaneOrientation = Matrix3d.multiplyMatrix(orbitalPlaneOrientation, Orbit._orbitalToWwt);
    const worldMatrix = Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(orbitalPlaneOrientation, Matrix3d.translation(centerPoint)), renderContext.get_world());
    let M = this._elements.n * (SpaceTimeController.get_jNow() - this._elements.t);
    let F = 1;
    if (M < 0) {
      F = -1;
    }
    M = Math.abs(M) / 360;
    M = (M - ss.truncate(M)) * 360 * F;
    const color = Color._fromArgbColor(ss.truncate((opacity * 255)), this._orbitColor);
    M = Coordinates.degreesToRadians(M);
    let E = M;
    for (let i = 0; i < 5; i++) {
      E += (M - E + this._elements.e * Math.sin(E)) / (1 - this._elements.e * Math.cos(E));
    }
    EllipseRenderer.drawEllipse(renderContext, this._elements.a / this._scale, this._elements.e, E, color, worldMatrix);
  }
};

