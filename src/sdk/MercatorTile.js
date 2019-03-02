import {Tile} from './Tile';
import {PositionTexture, Vector2d, Vector3d} from './Double3d';
import ss from './scriptsharp/ss';
import {RenderTriangle} from './RenderTriangle';


export class MercatorTile extends Tile {
  constructor() {
    super();
    this._tileDegrees$1 = 0;
    this._latMin$1 = 0;
    this._latMax$1 = 0;
    this._lngMin$1 = 0;
    this._lngMax$1 = 0;
    this._subDivisionLevel$1 = 32;
  }

  static create(level, X, Y, dataset, parent) {
    const temp = new MercatorTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = X;
    temp.tileY = Y;
    temp.dataset = dataset;
    temp.computeBoundingSphere();
    return temp;
  }

  static getCentrePointOffsetAsTileRatio(lat, lon, zoom) {
    const metersX = MercatorTile.absoluteLonToMetersAtZoom(lon, zoom);
    const relativeXIntoCell = (metersX / 256) - Math.floor(metersX / 256);
    const metersY = MercatorTile.absoluteLatToMetersAtZoom(lat, zoom);
    const relativeYIntoCell = (metersY / 256) - Math.floor(metersY / 256);
    return new Vector2d(relativeXIntoCell, relativeYIntoCell);
  };

  static relativeMetersToLatAtZoom(Y, zoom) {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersY = Y * metersPerPixel;
    return MercatorTile._radToDeg$1(Math.PI / 2 - 2 * Math.atan(Math.exp(0 - metersY / 6378137)));
  };

  static relativeMetersToLonAtZoom(X, zoom) {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersX = X * metersPerPixel;
    return MercatorTile._radToDeg$1(metersX / 6378137);
  };

  static absoluteLatToMetersAtZoom(latitude, zoom) {
    const sinLat = Math.sin(MercatorTile._degToRad$1(latitude));
    const metersY = 6378137 / 2 * Math.log((1 + sinLat) / (1 - sinLat));
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate((Math.round(20037508 - metersY) / metersPerPixel));
  };

  static absoluteMetersToLatAtZoom(Y, zoom) {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersY = 20037508 - Y * metersPerPixel;
    return MercatorTile._radToDeg$1(Math.PI / 2 - 2 * Math.atan(Math.exp(0 - metersY / 6378137)));
  };

  static absoluteLonToMetersAtZoom(longitude, zoom) {
    const metersX = 6378137 * MercatorTile._degToRad$1(longitude);
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate(((metersX + 20037508) / metersPerPixel));
  };

  static absoluteMetersToLonAtZoom(X, zoom) {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersX = X * metersPerPixel - 20037508;
    return MercatorTile._radToDeg$1(metersX / 6378137);
  };

  static absoluteLonToMetersAtZoomTile(longitude, zoom, tileX) {
    const metersX = 6378137 * MercatorTile._degToRad$1(longitude);
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate(((metersX + 20037508) / metersPerPixel));
  };

  static absoluteLatToMetersAtZoomTile(latitude, zoom, tileX) {
    const sinLat = Math.sin(MercatorTile._degToRad$1(latitude));
    const metersY = 6378137 / 2 * Math.log((1 + sinLat) / (1 - sinLat));
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate((Math.round(20037508 - metersY) / metersPerPixel));
  };

  static absoluteMetersToLonAtZoomByTileY(X, zoom, tileY) {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersX = X * metersPerPixel - 20037508;
    return MercatorTile._radToDeg$1(metersX / 6378137);
  };

  static _degToRad$1(deg) {
    return deg * Math.PI / 180;
  };

  static metersPerPixel2(zoom) {
    return (156543 / (1 << zoom));
  };

  static _radToDeg$1(rad) {
    return (rad * 180 / Math.PI);
  }

  computeBoundingSphere() {
    this._tileDegrees$1 = 360 / Math.pow(2, this.level);
    this._latMin$1 = MercatorTile.absoluteMetersToLatAtZoom(this.tileY * 256, this.level);
    this._latMax$1 = MercatorTile.absoluteMetersToLatAtZoom((this.tileY + 1) * 256, this.level);
    this._lngMin$1 = ((this.tileX * this._tileDegrees$1) - 180);
    this._lngMax$1 = ((((this.tileX + 1)) * this._tileDegrees$1) - 180);
    const latCenter = (this._latMin$1 + this._latMax$1) / 2;
    const lngCenter = (this._lngMin$1 + this._lngMax$1) / 2;
    this.sphereCenter = this.geoTo3d(latCenter, lngCenter, false);
    this.topLeft = this.geoTo3d(this._latMin$1, this._lngMin$1, false);
    this.bottomRight = this.geoTo3d(this._latMax$1, this._lngMax$1, false);
    this.topRight = this.geoTo3d(this._latMin$1, this._lngMax$1, false);
    this.bottomLeft = this.geoTo3d(this._latMax$1, this._lngMin$1, false);
    if (!this.tileY) {
      this.topLeft = new Vector3d(0, 1, 0);
      this.topRight = new Vector3d(0, 1, 0);
    }
    if (this.tileY === Math.pow(2, this.level) - 1) {
      this.bottomRight = new Vector3d(0, -1, 0);
      this.bottomLeft = new Vector3d(0, -1, 0);
    }
    let distVect = this.topLeft;
    distVect.subtract(this.sphereCenter);
    this.sphereRadius = distVect.length();
    distVect = this.bottomRight;
    distVect.subtract(this.sphereCenter);
    const len = distVect.length();
    if (this.sphereRadius < len) {
      this.sphereRadius = len;
    }
    this._tileDegrees$1 = Math.abs(this._latMax$1 - this._latMin$1);
  }

  isPointInTile(lat, lng) {
    if (!this.demReady || this.demData == null || lat < Math.min(this._latMin$1, this._latMax$1) || lat > Math.max(this._latMax$1, this._latMin$1) || lng < Math.min(this._lngMin$1, this._lngMax$1) || lng > Math.max(this._lngMin$1, this._lngMax$1)) {
      return false;
    }
    return true;
  }

  getSurfacePointAltitude(lat, lng, meters) {
    if (this.level < Tile.lastDeepestLevel) {
      const $enum1 = ss.enumerate(this.children);
      while ($enum1.moveNext()) {
        const child = $enum1.current;
        if (child != null) {
          if (Tile.isPointInTile(lat, lng)) {
            const retVal = Tile.getSurfacePointAltitude(lat, lng, meters);
            if (!!retVal) {
              return retVal;
            } else {
              break;
            }
          }
        }
      }
    }
    const alt = this._getAltitudeAtLatLng$1(lat, lng, (meters) ? 1 : this.get__demScaleFactor());
    return alt;
  }

  _getAltitudeAtLatLng$1(lat, lng, scaleFactor) {
    const height = Math.abs(this._latMax$1 - this._latMin$1);
    const width = Math.abs(this._lngMax$1 - this._lngMin$1);
    const yy = ((lat - Math.min(this._latMax$1, this._latMin$1)) / height * 32);
    const xx = ((lng - Math.min(this._lngMax$1, this._lngMin$1)) / width * 32);
    const indexY = Math.min(31, ss.truncate(yy));
    const indexX = Math.min(31, ss.truncate(xx));
    const ha = xx - indexX;
    const va = yy - indexY;
    const ul = this.demData[indexY * 33 + indexX];
    const ur = this.demData[indexY * 33 + (indexX + 1)];
    const ll = this.demData[(indexY + 1) * 33 + indexX];
    const lr = this.demData[(indexY + 1) * 33 + (indexX + 1)];
    const top = ul * (1 - ha) + ha * ur;
    const bottom = ll * (1 - ha) + ha * lr;
    const val = top * (1 - va) + va * bottom;
    return val / scaleFactor;
  }

  createGeometry(renderContext) {
    Tile.prototype.createGeometry.call(this, renderContext);
    if (this.geometryCreated) {
      return true;
    }
    this.geometryCreated = true;
    if (Tile.uvMultiple === 256) {
      if (!this.dataset.get_dataSetType() || this.dataset.get_dataSetType() === 1) {
        this._subDivisionLevel$1 = Math.max(2, (6 - this.level) * 2);
      }
    }
    for (let i = 0; i < 4; i++) {
      this._renderTriangleLists[i] = [];
    }
    let lat, lng;
    let index = 0;
    let tileDegrees = 360 / Math.pow(2, this.level);
    this._latMin$1 = MercatorTile.absoluteMetersToLatAtZoom(this.tileY * 256, this.level);
    this._latMax$1 = MercatorTile.absoluteMetersToLatAtZoom((this.tileY + 1) * 256, this.level);
    this._lngMin$1 = ((this.tileX * tileDegrees) - 180);
    this._lngMax$1 = ((((this.tileX + 1)) * tileDegrees) - 180);
    const latCenter = MercatorTile.absoluteMetersToLatAtZoom(((this.tileY * 2) + 1) * 256, this.level + 1);
    this.topLeft = this.geoTo3d(this._latMin$1, this._lngMin$1, false);
    this.bottomRight = this.geoTo3d(this._latMax$1, this._lngMax$1, false);
    this.topRight = this.geoTo3d(this._latMin$1, this._lngMax$1, false);
    this.bottomLeft = this.geoTo3d(this._latMax$1, this._lngMin$1, false);
    const verts = new Array((this._subDivisionLevel$1 + 1) * (this._subDivisionLevel$1 + 1));
    tileDegrees = this._lngMax$1 - this._lngMin$1;
    const dGrid = (tileDegrees / this._subDivisionLevel$1);
    let x1, y1;
    const textureStep = 1 / this._subDivisionLevel$1;
    let latDegrees = this._latMax$1 - latCenter;
    for (y1 = 0; y1 < this._subDivisionLevel$1 / 2; y1++) {
      if (y1 !== this._subDivisionLevel$1 / 2) {
        lat = this._latMax$1 - (2 * textureStep * latDegrees * y1);
      } else {
        lat = latCenter;
      }
      for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
        if (x1 !== this._subDivisionLevel$1) {
          lng = this._lngMin$1 + (textureStep * tileDegrees * x1);
        } else {
          lng = this._lngMax$1;
        }
        index = y1 * (this._subDivisionLevel$1 + 1) + x1;
        verts[index] = new PositionTexture();
        verts[index].position = this.geoTo3dWithAlt(lat, lng, false, true);
        verts[index].tu = (x1 * textureStep) * Tile.uvMultiple;
        verts[index].tv = ((MercatorTile.absoluteLatToMetersAtZoom(lat, this.level) - (this.tileY * 256)) / 256) * Tile.uvMultiple;
        this.demIndex++;
      }
    }
    latDegrees = this._latMin$1 - latCenter;
    for (y1 = this._subDivisionLevel$1 / 2; y1 <= this._subDivisionLevel$1; y1++) {
      if (y1 !== this._subDivisionLevel$1) {
        lat = latCenter + (2 * textureStep * latDegrees * (y1 - (this._subDivisionLevel$1 / 2)));
      } else {
        lat = this._latMin$1;
      }
      for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
        if (x1 !== this._subDivisionLevel$1) {
          lng = this._lngMin$1 + (textureStep * tileDegrees * x1);
        } else {
          lng = this._lngMax$1;
        }
        index = y1 * (this._subDivisionLevel$1 + 1) + x1;
        verts[index] = new PositionTexture();
        verts[index].position = this.geoTo3dWithAlt(lat, lng, false, true);
        verts[index].tu = (x1 * textureStep) * Tile.uvMultiple;
        verts[index].tv = ((MercatorTile.absoluteLatToMetersAtZoom(lat, this.level) - (this.tileY * 256)) / 256) * Tile.uvMultiple;
        this.demIndex++;
      }
    }
    if (!this.tileY) {
      y1 = this._subDivisionLevel$1;
      for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
        index = y1 * (this._subDivisionLevel$1 + 1) + x1;
        verts[index].position = new Vector3d(0, 1, 0);
      }
    }
    if (this.tileY === Math.pow(2, this.level) - 1) {
      y1 = 0;
      for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
        index = y1 * (this._subDivisionLevel$1 + 1) + x1;
        verts[index].position = new Vector3d(0, -1, 0);
      }
    }
    this.triangleCount = this._subDivisionLevel$1 * this._subDivisionLevel$1 * 2;
    const quarterDivisions = this._subDivisionLevel$1 / 2;
    let part = 0;
    if (renderContext.gl == null) {
      for (let y2 = 0; y2 < 2; y2++) {
        for (let x2 = 0; x2 < 2; x2++) {
          index = 0;
          for (y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
            for (x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
              let p1;
              let p2;
              let p3;
              p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + x1)];
              p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
              p3 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
              let tri = RenderTriangle.create(p1, p2, p3, this.texture, this.level);
              this._renderTriangleLists[part].push(tri);
              p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
              p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
              p3 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
              tri = RenderTriangle.create(p1, p2, p3, this.texture, this.level);
              this._renderTriangleLists[part].push(tri);
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
          for (y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
            for (x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
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

  _getDemSample$1(x, y) {
    return this.demData[(32 - y) * 33 + x];
  }

  createDemFromParent() {
    const parent = ss.safeCast(this.parent, MercatorTile);
    if (parent == null || parent.demData == null) {
      return false;
    }
    const offsetX = (((this.tileX % 2) === 1) ? 16 : 0);
    const offsetY = (((this.tileY % 2) === 1) ? 16 : 0);
    this.demData = new Array(this.demSize);
    for (let y = 0; y < 33; y += 2) {
      let copy = true;
      for (let x = 0; x < 33; x++) {
        if (copy) {
          this.demData[(32 - y) * 33 + x] = parent._getDemSample$1((x / 2) + offsetX, (y / 2) + offsetY);
        } else {
          this.demData[(32 - y) * 33 + x] = ((parent._getDemSample$1((x / 2) + offsetX, (y / 2) + offsetY) + parent._getDemSample$1(((x / 2) + offsetX) + 1, (y / 2) + offsetY)) / 2);
        }
        copy = !copy;
      }
    }
    for (let y = 1; y < 33; y += 2) {
      for (let x = 0; x < 33; x++) {
        this.demData[(32 - y) * 33 + x] = ((this._getDemSample$1(x, y - 1) + this._getDemSample$1(x, y + 1)) / 2);
      }
    }
    const $enum1 = ss.enumerate(this.demData);
    while ($enum1.moveNext()) {
      const sample = $enum1.current;
      this.demAverage += sample;
    }
    this.demAverage /= this.demData.length;
    this.demReady = true;
    return true;
  }
}
Object.assign(MercatorTile,Tile);