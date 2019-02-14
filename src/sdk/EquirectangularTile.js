import {Tile} from './Tile';
import {PositionTexture} from './Double3d';
import {RenderTriangle} from './RenderTriangle';
import ss from './scriptsharp/ss';

;
export class EquirectangularTile extends Tile{
  constructor(){
    super();
    this._tileDegrees$1 = 0;
    this._topDown$1 = true;
    this._subDivisionLevel$1 = 1;
  }
  static create(level, x, y, dataset, parent){
    const temp = new EquirectangularTile();
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
    this._tileDegrees$1 = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
    const latMin = (90 - ((this.tileY) * this._tileDegrees$1));
    const latMax = (90 - (((this.tileY + 1)) * this._tileDegrees$1));
    const lngMin = ((this.tileX * this._tileDegrees$1) - 180);
    const lngMax = ((((this.tileX + 1)) * this._tileDegrees$1) - 180);
    const latCenter = (latMin + latMax) / 2;
    const lngCenter = (lngMin + lngMax) / 2;
    this.sphereCenter = this.geoTo3d(latCenter, lngCenter, false);
    this.topLeft = this.geoTo3d(latMin, lngMin, false);
    this.bottomRight = this.geoTo3d(latMax, lngMax, false);
    this.topRight = this.geoTo3d(latMin, lngMax, false);
    this.bottomLeft = this.geoTo3d(latMax, lngMin, false);
    const distVect = this.geoTo3d(latMin, lngMin, false);
    distVect.subtract(this.sphereCenter);
    this.sphereRadius = distVect.length();
    this._tileDegrees$1 = lngMax - lngMin;
  }
  computeBoundingSphereBottomsUp() {
    let tileDegrees = this.dataset.get_baseTileDegrees() / (Math.pow(2, this.level));
    const latMin = (-90 + (((this.tileY + 1)) * tileDegrees));
    const latMax = (-90 + ((this.tileY) * tileDegrees));
    const lngMin = ((this.tileX * tileDegrees) - 180);
    const lngMax = ((((this.tileX + 1)) * tileDegrees) - 180);
    const latCenter = (latMin + latMax) / 2;
    const lngCenter = (lngMin + lngMax) / 2;
    this.sphereCenter = this.geoTo3d(latCenter, lngCenter, false);
    this.topLeft = this.geoTo3d(latMin, lngMin, false);
    this.bottomRight = this.geoTo3d(latMax, lngMax, false);
    this.topRight = this.geoTo3d(latMin, lngMax, false);
    this.bottomLeft = this.geoTo3d(latMax, lngMin, false);
    const distVect = this.topLeft;
    distVect.subtract(this.sphereCenter);
    this.sphereRadius = distVect.length();
    tileDegrees = lngMax - lngMin;
  }
  createGeometry(renderContext) {
    Tile.prototype.createGeometry.call(this, renderContext);
    if (renderContext.gl == null) {
      if (!this.dataset.get_dataSetType() || this.dataset.get_dataSetType() === 1) {
        this._subDivisionLevel$1 = Math.max(2, (4 - this.level) * 2);
      }
    } else {
      this._subDivisionLevel$1 = 32;
    }
    try {
      for (let i = 0; i < 4; i++) {
        this._renderTriangleLists[i] = [];
      }
      if (!this._topDown$1) {
        return this._createGeometryBottomsUp$1(renderContext);
      }
      let lat, lng;
      let index = 0;
      const tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
      const latMin = (90 - ((this.tileY) * tileDegrees));
      const latMax = (90 - (((this.tileY + 1)) * tileDegrees));
      const lngMin = ((this.tileX * tileDegrees) - 180);
      const lngMax = ((((this.tileX + 1)) * tileDegrees) - 180);
      const tileDegreesX = lngMax - lngMin;
      const tileDegreesY = latMax - latMin;
      this.topLeft = this.geoTo3d(latMin, lngMin, false);
      this.bottomRight = this.geoTo3d(latMax, lngMax, false);
      this.topRight = this.geoTo3d(latMin, lngMax, false);
      this.bottomLeft = this.geoTo3d(latMax, lngMin, false);
      const verts = new Array((this._subDivisionLevel$1 + 1) * (this._subDivisionLevel$1 + 1));
      let x, y;
      const textureStep = 1 / this._subDivisionLevel$1;
      for (y = 0; y <= this._subDivisionLevel$1; y++) {
        if (y !== this._subDivisionLevel$1) {
          lat = latMin + (textureStep * tileDegreesY * y);
        } else {
          lat = latMax;
        }
        for (x = 0; x <= this._subDivisionLevel$1; x++) {
          if (x !== this._subDivisionLevel$1) {
            lng = lngMin + (textureStep * tileDegreesX * x);
          } else {
            lng = lngMax;
          }
          index = y * (this._subDivisionLevel$1 + 1) + x;
          verts[index] = PositionTexture.createPos(this.geoTo3d(lat, lng, false), x * textureStep, y * textureStep);
        }
      }
      this.triangleCount = this._subDivisionLevel$1 * this._subDivisionLevel$1 * 2;
      const quarterDivisions = this._subDivisionLevel$1 / 2;
      let part = 0;
      if (renderContext.gl == null) {
        for (let y2 = 0; y2 < 2; y2++) {
          for (let x2 = 0; x2 < 2; x2++) {
            index = 0;
            for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
              for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                let p1;
                let p2;
                let p3;
                p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + x1)];
                p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                p3 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
                p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                p3 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
              }
            }
            part++;
          }
        }
      } else {
        this._vertexBuffer = Tile.prepDevice.createBuffer();
        Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
        const f32array = new Float32Array(verts.length * 5);
        const buffer = f32array;
        index = 0;
        const $enum1 = ss.enumerate(verts);
        while ($enum1.moveNext()) {
          const pt = $enum1.current;
          index = Tile.addVertex(buffer, index, pt);
        }
        Tile.prepDevice.bufferData(34962, f32array, 35044);
        for (let y2 = 0; y2 < 2; y2++) {
          for (let x2 = 0; x2 < 2; x2++) {
            const ui16array = new Uint16Array(this.triangleCount * 3);
            const indexArray = ui16array;
            index = 0;
            for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
              for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1));
              }
            }
            this._indexBuffers[part] = Tile.prepDevice.createBuffer();
            Tile.prepDevice.bindBuffer(34963, this._indexBuffers[part]);
            Tile.prepDevice.bufferData(34963, ui16array, 35044);
            part++;
          }
        }
      }
    } catch ($e2) {
    }
    return true;
  }
  _createGeometryBottomsUp$1(renderContext) {
    let lat, lng;
    let index = 0;
    const tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
    const latMin = (-90 + (((this.tileY + 1)) * tileDegrees));
    const latMax = (-90 + ((this.tileY) * tileDegrees));
    const lngMin = ((this.tileX * tileDegrees) - 180);
    const lngMax = ((((this.tileX + 1)) * tileDegrees) - 180);
    const tileDegreesX = lngMax - lngMin;
    const tileDegreesY = latMax - latMin;
    const verts = new Array((this._subDivisionLevel$1 + 1) * (this._subDivisionLevel$1 + 1));
    let x, y;
    const textureStep = 1 / this._subDivisionLevel$1;
    for (y = 0; y <= this._subDivisionLevel$1; y++) {
      if (y !== this._subDivisionLevel$1) {
        lat = latMin + (textureStep * tileDegreesY * y);
      } else {
        lat = latMax;
      }
      for (x = 0; x <= this._subDivisionLevel$1; x++) {
        if (x !== this._subDivisionLevel$1) {
          lng = lngMin + (textureStep * tileDegreesX * x);
        } else {
          lng = lngMax;
        }
        index = y * (this._subDivisionLevel$1 + 1) + x;
        verts[index] = PositionTexture.createPos(this.geoTo3d(lat, lng, false), x * textureStep, y * textureStep);
      }
    }
    this.triangleCount = this._subDivisionLevel$1 * this._subDivisionLevel$1 * 2;
    const quarterDivisions = this._subDivisionLevel$1 / 2;
    let part = 0;
    if (renderContext.gl == null) {
      for (let y2 = 0; y2 < 2; y2++) {
        for (let x2 = 0; x2 < 2; x2++) {
          index = 0;
          for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
            for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
              let p1;
              let p2;
              let p3;
              p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + x1)];
              p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
              p3 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
              this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
              p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
              p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
              p3 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
              this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
            }
          }
          part++;
        }
      }
    } else {
      this._vertexBuffer = Tile.prepDevice.createBuffer();
      Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
      const f32array = new Float32Array(verts.length * 5);
      const buffer = f32array;
      index = 0;
      const $enum1 = ss.enumerate(verts);
      while ($enum1.moveNext()) {
        const pt = $enum1.current;
        index = Tile.addVertex(buffer, index, pt);
      }
      Tile.prepDevice.bufferData(34962, f32array, 35044);
      for (let y2 = 0; y2 < 2; y2++) {
        for (let x2 = 0; x2 < 2; x2++) {
          const ui16array = new Uint16Array(this.triangleCount * 3);
          const indexArray = ui16array;
          index = 0;
          for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
            for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
              indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + x1);
              indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
              indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
              indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
              indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
              indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1));
            }
          }
          this._indexBuffers[part] = Tile.prepDevice.createBuffer();
          Tile.prepDevice.bindBuffer(34963, this._indexBuffers[part]);
          Tile.prepDevice.bufferData(34963, ui16array, 35044);
          part++;
        }
      }
    }
    return true;
  }
}