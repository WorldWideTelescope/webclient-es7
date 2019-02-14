import {Tile} from './Tile';
import ss from './scriptsharp/ss';
import {Planets} from './Planets';
import {WebFile} from './WebFile';
import {Util} from './Util';
import {TileCache} from './TileCache';
import {Star} from './Star';
import {Coordinates} from './Coordinates';
import {PositionTexture, Vector2d, Vector3d} from './Double3d';

export class PlotTile extends Tile{
  constructor() {
    super();
    this._topDown$1 = true;
    this.backslash = false;
    this._vertexList$1 = null;
    this._childTriangleList$1 = null;
    this._stars$1 = [];
    this._subDivisionLevel$1 = 4;
    this._subDivided$1 = false;
  }
  static create(level, xc, yc, dataset, parent){
    const temp = new PlotTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = xc;
    temp.tileY = yc;
    temp.dataset = dataset;
    temp._topDown$1 = !dataset.get_bottomsUp();
    if (temp.tileX !== xc) {
      alert('bad');
    }
    if (!!dataset.get_meanRadius()) {
      temp.set__demScaleFactor(dataset.get_meanRadius());
    }
    else {
      if (!dataset.get_dataSetType()) {
        temp.set__demScaleFactor(6371000);
      }
      else {
        temp.set__demScaleFactor(3396010);
      }
    }
    temp.computeBoundingSphere();
    return temp;
  }
  computeBoundingSphere() {
    this._initializeGrids$1();
    this.topLeft = this.bounds[0 + 3 * 0].position.copy();
    this.bottomRight = this.bounds[2 + 3 * 2].position.copy();
    this.topRight = this.bounds[2 + 3 * 0].position.copy();
    this.bottomLeft = this.bounds[0 + 3 * 2].position.copy();
    this.calcSphere();
  }
  renderPart(renderContext, part, opacity, combine) {
    if (renderContext.gl != null) {
    } else {
      if (!part) {
        const $enum1 = ss.enumerate(this._stars$1);
        while ($enum1.moveNext()) {
          const star = $enum1.current;
          const radDec = 25 / Math.pow(1.6, star.magnitude);
          Planets.drawPointPlanet(renderContext, star.position, radDec, star.col, false);
        }
      }
    }
  }
  requestImage() {
    if (!this.downloading && !this.readyToRender) {
      this.downloading = true;
      this._webFile$1 = new WebFile(Util.getProxiedUrl(this.get_URL()));
      this._webFile$1.onStateChange = ss.bind('fileStateChange', this);
      this._webFile$1.send();
    }
  }
  fileStateChange() {
    if (this._webFile$1.get_state() === 2) {
      this.downloading = false;
      this.readyToRender = false;
      this.errored = true;
      this.requestPending = false;
      TileCache.removeFromQueue(this.get_key(), true);
    } else if (this._webFile$1.get_state() === 1) {
      this.texReady = true;
      this.downloading = false;
      this.errored = false;
      this.readyToRender = this.texReady && (this.demReady || !this.demTile);
      this.requestPending = false;
      TileCache.removeFromQueue(this.get_key(), true);
      this._loadData$1(this._webFile$1.getText());
    }
  }
  _loadData$1(data) {
    const rows = ss.replaceString(data, '\r\n', '\n').split('\n');
    let firstRow = true;
    const type = 0;
    let star = null;
    const $enum1 = ss.enumerate(rows);
    while ($enum1.moveNext()) {
      const row = $enum1.current;
      if (firstRow) {
        firstRow = false;
        continue;
      }
      if (ss.trim(row).length > 5) {
        star = new Star(row);
        star.position = Coordinates.raDecTo3dAu(star.RA, star.dec, 1);
        this._stars$1.push(star);
      }
    }
  }
  isPointInTile(lat, lng) {
    if (!this.level) {
      return true;
    }
    if (this.level === 1) {
      if ((lng >= 0 && lng <= 90) && (!this.tileX && this.tileY === 1)) {
        return true;
      }
      if ((lng > 90 && lng <= 180) && (this.tileX === 1 && this.tileY === 1)) {
        return true;
      }
      if ((lng < 0 && lng >= -90) && (!this.tileX && !this.tileY)) {
        return true;
      }
      if ((lng < -90 && lng >= -180) && (this.tileX === 1 && !this.tileY)) {
        return true;
      }
      return false;
    }
    if (!this.demReady || this.demData == null) {
      return false;
    }
    const testPoint = Coordinates.geoTo3dDouble(-lat, lng);
    const top = PlotTile._isLeftOfHalfSpace$1(this.topLeft.copy(), this.topRight.copy(), testPoint);
    const right = PlotTile._isLeftOfHalfSpace$1(this.topRight.copy(), this.bottomRight.copy(), testPoint);
    const bottom = PlotTile._isLeftOfHalfSpace$1(this.bottomRight.copy(), this.bottomLeft.copy(), testPoint);
    const left = PlotTile._isLeftOfHalfSpace$1(this.bottomLeft.copy(), this.topLeft.copy(), testPoint);
    if (top && right && bottom && left) {
      return true;
    }
    return false;
  }
  static _isLeftOfHalfSpace$1(pntA, pntB, pntTest) {
    pntA.normalize();
    pntB.normalize();
    const cross = Vector3d.cross(pntA, pntB);
    const dot = Vector3d.dot(cross, pntTest);
    return dot < 0;
  }
  _initializeGrids$1() {
    this._vertexList$1 = [];
    this._childTriangleList$1 = new Array(4);
    this._childTriangleList$1[0] = [];
    this._childTriangleList$1[1] = [];
    this._childTriangleList$1[2] = [];
    this._childTriangleList$1[3] = [];
    this.bounds = new Array(9);
    if (this.level > 0) {
      if (this.parent == null) {
        this.parent = TileCache.getTile(this.level - 1, this.tileX / 2, this.tileY / 2, this.dataset, null);
      }
      const parent = this.parent;
      const xIndex = this.tileX % 2;
      const yIndex = this.tileY % 2;
      if (this.level > 1) {
        this.backslash = parent.backslash;
      } else {
        this.backslash = (xIndex === 1 ^ yIndex === 1) === 1;
      }
      this.bounds[0 + 3 * 0] = parent.bounds[xIndex + 3 * yIndex].copy();
      this.bounds[1 + 3 * 0] = PlotTile._midpoint$1(parent.bounds[xIndex + 3 * yIndex], parent.bounds[xIndex + 1 + 3 * yIndex]);
      this.bounds[2 + 3 * 0] = parent.bounds[xIndex + 1 + 3 * yIndex].copy();
      this.bounds[0 + 3 * 1] = PlotTile._midpoint$1(parent.bounds[xIndex + 3 * yIndex], parent.bounds[xIndex + 3 * (yIndex + 1)]);
      if (this.backslash) {
        this.bounds[1 + 3 * 1] = PlotTile._midpoint$1(parent.bounds[xIndex + 3 * yIndex], parent.bounds[xIndex + 1 + 3 * (yIndex + 1)]);
      } else {
        this.bounds[1 + 3 * 1] = PlotTile._midpoint$1(parent.bounds[xIndex + 1 + 3 * yIndex], parent.bounds[xIndex + 3 * (yIndex + 1)]);
      }
      this.bounds[2 + 3 * 1] = PlotTile._midpoint$1(parent.bounds[xIndex + 1 + 3 * yIndex], parent.bounds[xIndex + 1 + 3 * (yIndex + 1)]);
      this.bounds[0 + 3 * 2] = parent.bounds[xIndex + 3 * (yIndex + 1)].copy();
      this.bounds[1 + 3 * 2] = PlotTile._midpoint$1(parent.bounds[xIndex + 3 * (yIndex + 1)], parent.bounds[xIndex + 1 + 3 * (yIndex + 1)]);
      this.bounds[2 + 3 * 2] = parent.bounds[xIndex + 1 + 3 * (yIndex + 1)].copy();
      this.bounds[0 + 3 * 0].tu = 0 * Tile.uvMultiple;
      this.bounds[0 + 3 * 0].tv = 0 * Tile.uvMultiple;
      this.bounds[1 + 3 * 0].tu = 0.5 * Tile.uvMultiple;
      this.bounds[1 + 3 * 0].tv = 0 * Tile.uvMultiple;
      this.bounds[2 + 3 * 0].tu = 1 * Tile.uvMultiple;
      this.bounds[2 + 3 * 0].tv = 0 * Tile.uvMultiple;
      this.bounds[0 + 3 * 1].tu = 0 * Tile.uvMultiple;
      this.bounds[0 + 3 * 1].tv = 0.5 * Tile.uvMultiple;
      this.bounds[1 + 3 * 1].tu = 0.5 * Tile.uvMultiple;
      this.bounds[1 + 3 * 1].tv = 0.5 * Tile.uvMultiple;
      this.bounds[2 + 3 * 1].tu = 1 * Tile.uvMultiple;
      this.bounds[2 + 3 * 1].tv = 0.5 * Tile.uvMultiple;
      this.bounds[0 + 3 * 2].tu = 0 * Tile.uvMultiple;
      this.bounds[0 + 3 * 2].tv = 1 * Tile.uvMultiple;
      this.bounds[1 + 3 * 2].tu = 0.5 * Tile.uvMultiple;
      this.bounds[1 + 3 * 2].tv = 1 * Tile.uvMultiple;
      this.bounds[2 + 3 * 2].tu = 1 * Tile.uvMultiple;
      this.bounds[2 + 3 * 2].tv = 1 * Tile.uvMultiple;
    } else {
      this.bounds[0 + 3 * 0] = PositionTexture.create(0, -1, 0, 0, 0);
      this.bounds[1 + 3 * 0] = PositionTexture.create(0, 0, 1, 0.5, 0);
      this.bounds[2 + 3 * 0] = PositionTexture.create(0, -1, 0, 1, 0);
      this.bounds[0 + 3 * 1] = PositionTexture.create(-1, 0, 0, 0, 0.5);
      this.bounds[1 + 3 * 1] = PositionTexture.create(0, 1, 0, 0.5, 0.5);
      this.bounds[2 + 3 * 1] = PositionTexture.create(1, 0, 0, 1, 0.5);
      this.bounds[0 + 3 * 2] = PositionTexture.create(0, -1, 0, 0, 1);
      this.bounds[1 + 3 * 2] = PositionTexture.create(0, 0, -1, 0.5, 1);
      this.bounds[2 + 3 * 2] = PositionTexture.create(0, -1, 0, 1, 1);
    }
  }
  static _midpoint$1 (positionNormalTextured, positionNormalTextured_2) {
    const a1 = Vector3d.lerp(positionNormalTextured.position, positionNormalTextured_2.position, 0.5);
    const a1uv = Vector2d.lerp(new Vector2d(positionNormalTextured.tu, positionNormalTextured.tv), new Vector2d(positionNormalTextured_2.tu, positionNormalTextured_2.tv), 0.5);
    a1.normalize();
    return PositionTexture.createPos(a1, a1uv.x, a1uv.y);
  }
  createGeometry(renderContext) {
    if (this.geometryCreated) {
      return true;
    }
    this.geometryCreated = true;
    Tile.prototype.createGeometry.call(this, renderContext);
    return true;
  }
  cleanUp(removeFromParent) {
    Tile.prototype.cleanUp.call(this, removeFromParent);
    if (this._vertexList$1 != null) {
      this._vertexList$1 = null;
    }
    if (this._childTriangleList$1 != null) {
      this._childTriangleList$1 = null;
    }
    this._subDivided$1 = false;
    this.demArray = null;
  }
};