import {Tile} from './Tile';
import {PositionTexture, Vector3d} from './Double3d';
import {RenderTriangle} from './RenderTriangle';


export class TangentTile extends Tile {
  constructor() {
    super();
    this._topDown$1 = true;
  }
  static create(level, x, y, dataset, parent){
    const temp = new TangentTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = x;
    temp.tileY = y;
    temp.dataset = dataset;
    temp._topDown$1 = !dataset.get_bottomsUp();
    temp.computeBoundingSphere();
    return temp;
  }
  computeBoundingSphere() {
    if (!this._topDown$1) {
      this.computeBoundingSphereBottomsUp();
      return;
    }
    let tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
    const latMin = ((this.dataset.get_baseTileDegrees() / 2 - ((this.tileY) * tileDegrees)) + this.dataset.get_offsetY());
    const latMax = ((this.dataset.get_baseTileDegrees() / 2 - (((this.tileY + 1)) * tileDegrees)) + this.dataset.get_offsetY());
    const lngMin = (((this.tileX * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
    const lngMax = (((((this.tileX + 1)) * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
    const latCenter = (latMin + latMax) / 2;
    const lngCenter = (lngMin + lngMax) / 2;
    this.sphereCenter = this.geoTo3dTan(latCenter, lngCenter);
    this.topLeft = this.geoTo3dTan(latMin, lngMin);
    this.bottomRight = this.geoTo3dTan(latMax, lngMax);
    this.topRight = this.geoTo3dTan(latMin, lngMax);
    this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
    const distVect = this.geoTo3dTan(latMin, lngMin);
    tileDegrees = lngMax - lngMin;
    distVect.subtract(this.sphereCenter);
    this.sphereRadius = distVect.length();
  }
  geoTo3dTan(lat, lng) {
    lng = -lng;
    const fac1 = this.dataset.get_baseTileDegrees() / 2;
    const factor = Math.tan(fac1 * Tile.RC);
    return this.dataset.get_matrix().transform(new Vector3d(1, (lat / fac1 * factor), (lng / fac1 * factor)));
  }
  computeBoundingSphereBottomsUp() {
    let tileDegrees = this.dataset.get_baseTileDegrees() / (Math.pow(2, this.level));
    const latMin = (this.dataset.get_baseTileDegrees() / 2 + (((this.tileY + 1)) * tileDegrees)) + this.dataset.get_offsetY();
    const latMax = (this.dataset.get_baseTileDegrees() / 2 + ((this.tileY) * tileDegrees)) + this.dataset.get_offsetY();
    const lngMin = ((this.tileX * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX();
    const lngMax = ((((this.tileX + 1)) * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX();
    const latCenter = (latMin + latMax) / 2;
    const lngCenter = (lngMin + lngMax) / 2;
    this.topLeft = this.geoTo3dTan(latMin, lngMin);
    this.bottomRight = this.geoTo3dTan(latMax, lngMax);
    this.topRight = this.geoTo3dTan(latMin, lngMax);
    this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
    const distVect = this.topLeft;
    tileDegrees = lngMax - lngMin;
  }
  createGeometry(renderContext) {
    Tile.prototype.createGeometry.call(this, renderContext);
    if (this.geometryCreated) {
      return true;
    }
    this.geometryCreated = true;
    for (let i = 0; i < 4; i++) {
      this._renderTriangleLists[i] = [];
    }
    const tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
    const latMin = ((this.dataset.get_baseTileDegrees() / 2 - ((this.tileY) * tileDegrees)) + this.dataset.get_offsetY());
    const latMax = ((this.dataset.get_baseTileDegrees() / 2 - (((this.tileY + 1)) * tileDegrees)) + this.dataset.get_offsetY());
    const lngMin = (((this.tileX * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
    const lngMax = (((((this.tileX + 1)) * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
    const tileDegreesX = lngMax - lngMin;
    const tileDegreesY = latMax - latMin;
    this.topLeft = this.geoTo3dTan(latMin, lngMin);
    this.bottomRight = this.geoTo3dTan(latMax, lngMax);
    this.topRight = this.geoTo3dTan(latMin, lngMax);
    this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
    const latCenter = (latMin + latMax) / 2;
    const lngCenter = (lngMin + lngMax) / 2;
    const center = Vector3d.midPoint(this.topLeft, this.bottomRight);
    const leftCenter = Vector3d.midPoint(this.topLeft, this.bottomLeft);
    const rightCenter = Vector3d.midPoint(this.topRight, this.bottomRight);
    const topCenter = Vector3d.midPoint(this.topLeft, this.topRight);
    const bottomCenter = Vector3d.midPoint(this.bottomLeft, this.bottomRight);
    if (renderContext.gl == null) {
      this._renderTriangleLists[0].push(RenderTriangle.create(PositionTexture.createPos(this.topLeft, 0, 0), PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(topCenter, 0.5, 0), this.texture, this.level));
      this._renderTriangleLists[0].push(RenderTriangle.create(PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(topCenter, 0.5, 0), this.texture, this.level));
      this._renderTriangleLists[1].push(RenderTriangle.create(PositionTexture.createPos(topCenter, 0.5, 0), PositionTexture.createPos(rightCenter, 1, 0.5), PositionTexture.createPos(this.topRight, 1, 0), this.texture, this.level));
      this._renderTriangleLists[1].push(RenderTriangle.create(PositionTexture.createPos(topCenter, 0.5, 0), PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(rightCenter, 1, 0.5), this.texture, this.level));
      this._renderTriangleLists[2].push(RenderTriangle.create(PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(bottomCenter, 0.5, 1), PositionTexture.createPos(center, 0.5, 0.5), this.texture, this.level));
      this._renderTriangleLists[2].push(RenderTriangle.create(PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(this.bottomLeft, 0, 1), PositionTexture.createPos(bottomCenter, 0.5, 1), this.texture, this.level));
      this._renderTriangleLists[3].push(RenderTriangle.create(PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(this.bottomRight, 1, 1), PositionTexture.createPos(rightCenter, 1, 0.5), this.texture, this.level));
      this._renderTriangleLists[3].push(RenderTriangle.create(PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(bottomCenter, 0.5, 1), PositionTexture.createPos(this.bottomRight, 1, 1), this.texture, this.level));
    } else {
      this._vertexBuffer = Tile.prepDevice.createBuffer();
      Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
      const f32array = new Float32Array(9 * 5);
      const buffer = f32array;
      let index = 0;
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(bottomCenter, 0.5, 1));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(this.bottomLeft, 0, 1));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(this.bottomRight, 1, 1));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(center, 0.5, 0.5));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(leftCenter, 0, 0.5));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(rightCenter, 1, 0.5));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(topCenter, 0.5, 0));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(this.topLeft, 0, 0));
      index = Tile.addVertex(buffer, index, PositionTexture.createPos(this.topRight, 1, 0));
      Tile.prepDevice.bufferData(34962, f32array, 35044);
      for (let i = 0; i < 4; i++) {
        index = 0;
        this.triangleCount = 2;
        const ui16array = new Uint16Array(this.triangleCount * 3);
        const indexArray = ui16array;
        switch (i) {
          case 0:
            indexArray[index++] = 7;
            indexArray[index++] = 4;
            indexArray[index++] = 6;
            indexArray[index++] = 4;
            indexArray[index++] = 3;
            indexArray[index++] = 6;
            break;
          case 1:
            indexArray[index++] = 6;
            indexArray[index++] = 5;
            indexArray[index++] = 8;
            indexArray[index++] = 6;
            indexArray[index++] = 3;
            indexArray[index++] = 5;
            break;
          case 2:
            indexArray[index++] = 4;
            indexArray[index++] = 0;
            indexArray[index++] = 3;
            indexArray[index++] = 4;
            indexArray[index++] = 1;
            indexArray[index++] = 0;
            break;
          case 3:
            indexArray[index++] = 3;
            indexArray[index++] = 2;
            indexArray[index++] = 5;
            indexArray[index++] = 3;
            indexArray[index++] = 0;
            indexArray[index++] = 2;
            break;
        }
        this._indexBuffers[i] = Tile.prepDevice.createBuffer();
        Tile.prepDevice.bindBuffer(34963, this._indexBuffers[i]);
        Tile.prepDevice.bufferData(34963, ui16array, 35044);
      }
    }
    return true;
  }
};