import {Tile} from './Tile';
import {Matrix3d, PositionTexture, Vector3d} from './Double3d';
import ss from './scriptsharp/ss';
import {WcsImage} from './Layers/WcsImage';
import {Triangle} from './Triangle';
import {RenderTriangle} from './RenderTriangle';



export class SkyImageTile extends Tile{
  constructor(){
    super();
    this.pixelCenterX = 0;
    this.pixelCenterY = 0;
    this.latCenter = 0;
    this.lngCenter = 0;
    this.rotation = 0;
    this.scaleX = 0.01;
    this.scaleY = 0.01;
    this.height = 0;
    this.width = 0;
    this._vertexList$1 = null;
    this._childTriangleList$1 = null;
  }
  static create(level, x, y, dataset, parent){
    const temp = new SkyImageTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = x;
    temp.tileY = y;
    temp.dataset = dataset;
    temp._getParameters$1();
    temp.computeMatrix();
    temp.sphereCenter = temp.geoTo3dTan(0, 0);
    temp.radius = 1.25;
    return temp;
  }
  computeMatrix() {
    this.matrix = Matrix3d.get_identity();
    this.matrix._multiply(Matrix3d._rotationX((this.rotation / 180 * Math.PI)));
    this.matrix._multiply(Matrix3d._rotationZ((this.latCenter / 180 * Math.PI)));
    this.matrix._multiply(Matrix3d._rotationY(((360 - this.lngCenter) / 180 * Math.PI)));
  }
  _getParameters$1() {
    this.pixelCenterX = this.dataset.get_offsetX();
    this.pixelCenterY = this.dataset.get_offsetY();
    this.latCenter = this.dataset.get_centerY();
    this.lngCenter = this.dataset.get_centerX();
    this.rotation = this.dataset.get_rotation();
    this.scaleX = -(this.scaleY = this.dataset.get_baseTileDegrees());
    if (this.dataset.get_bottomsUp()) {
      this.scaleX = -this.scaleX;
      this.rotation = 360 - this.rotation;
    }
  }
  geoTo3dTan(lat, lng) {
    lng = -lng;
    const fac1 = this.dataset.get_baseTileDegrees();
    const factor = Math.tan(fac1 * Tile.RC);
    return this.matrix.transform(new Vector3d(1, (lat / fac1 * factor), (lng / fac1 * factor)));
  }
  createGeometry(renderContext) {
    Tile.prototype.createGeometry.call(this, renderContext);
    if (this.geometryCreated) {
      return true;
    }
    let bmp = null;
    if (this.dataset.get_wcsImage() != null) {
      const wcsImage = ss.safeCast(this.dataset.get_wcsImage(), WcsImage);
      bmp = wcsImage.getBitmap();
      this.texture2d = bmp.getTexture();
      if (bmp.height !== wcsImage.get_sizeY()) {
        this.pixelCenterY += bmp.height - wcsImage.get_sizeY();
      }
    }
    this.geometryCreated = true;
    for (let i = 0; i < 4; i++) {
      this._renderTriangleLists[i] = [];
    }
    this.computeMatrix();
    if (bmp != null && renderContext.gl != null) {
      this.height = bmp.height;
      this.width = bmp.width;
    } else {
      this.height = this.texture.naturalHeight;
      this.width = this.texture.naturalWidth;
    }
    const latMin = (this.scaleY * (this.height - this.pixelCenterY));
    const latMax = 0 - (this.scaleY * this.pixelCenterY);
    const lngMin = (this.scaleX * this.pixelCenterX);
    const lngMax = 0 - (this.scaleX * (this.width - this.pixelCenterX));
    this.topLeft = this.geoTo3dTan(latMin, lngMin);
    this.bottomRight = this.geoTo3dTan(latMax, lngMax);
    this.topRight = this.geoTo3dTan(latMin, lngMax);
    this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
    const topCenter = Vector3d.lerp(this.topLeft, this.topRight, 0.5);
    const bottomCenter = Vector3d.lerp(this.bottomLeft, this.bottomRight, 0.5);
    const center = Vector3d.lerp(topCenter, bottomCenter, 0.5);
    const rightCenter = Vector3d.lerp(this.topRight, this.bottomRight, 0.5);
    const leftCenter = Vector3d.lerp(this.topLeft, this.bottomLeft, 0.5);
    if (renderContext.gl == null) {
      this._vertexList$1 = [];
      this._vertexList$1.push(PositionTexture.createPosSize(this.topLeft, 0, 0, this.width, this.height));
      this._vertexList$1.push(PositionTexture.createPosSize(this.topRight, 1, 0, this.width, this.height));
      this._vertexList$1.push(PositionTexture.createPosSize(this.bottomLeft, 0, 1, this.width, this.height));
      this._vertexList$1.push(PositionTexture.createPosSize(this.bottomRight, 1, 1, this.width, this.height));
      this._childTriangleList$1 = [];
      if (this.dataset.get_bottomsUp()) {
        this._childTriangleList$1.push(Triangle.create(0, 1, 2));
        this._childTriangleList$1.push(Triangle.create(2, 1, 3));
      } else {
        this._childTriangleList$1.push(Triangle.create(0, 2, 1));
        this._childTriangleList$1.push(Triangle.create(2, 3, 1));
      }
      let count = 3;
      while (count-- > 1) {
        const newList = [];
        const $enum1 = ss.enumerate(this._childTriangleList$1);
        while ($enum1.moveNext()) {
          let tri = $enum1.current;
          tri.subDivide(newList, this._vertexList$1);
        }
        this._childTriangleList$1 = newList;
      }
      const miter = 0.6 / (this.width / 256);
      const $enum2 = ss.enumerate(this._childTriangleList$1);
      while ($enum2.moveNext()) {
        var tri = $enum2.current;
        const p1 = this._vertexList$1[tri.a];
        const p2 = this._vertexList$1[tri.b];
        const p3 = this._vertexList$1[tri.c];
        this._renderTriangleLists[0].push(RenderTriangle.createWithMiter(p1, p2, p3, this.texture, this.level, miter));
      }
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