import {Util} from './Util';
import ss from './scriptsharp/ss';
import {BlendState} from './BlendState';
import {Texture} from './Graphics/Texture';
import {TileCache} from './TileCache';
import {TileShader} from './Graphics/Shaders';
import {ConvexHull, Vector3d, Vector4d} from './Double3d';

export class Tile {
  constructor() {
    this._renderTriangleLists = new Array(4);
    this._indexBuffers = new Array(4);
    this.level = 0;
    this.tileX = 0;
    this.tileY = 0;
    this.texture = null;
    this.texture2d = null;
    this.readyToRender = false;
    this.inViewFrustum = true;
    this.children = [null, null, null, null];
    this.parent = null;
    this.localCenter = new Vector3d();
    this.renderedAtOrBelowGeneration = 0;
    this._demScaleFactor = 6371000;
    this.demIndex = 0;
    this.demAverage = 0;
    this.demReady = false;
    this.texReady = false;
    this.demTile = false;
    this.demDownloading = false;
    this.renderedGeneration = 0;
    this.accomidation = 0;
    this.accessCount = 0;
    this.downloading = false;
    this.geometryCreated = false;
    this._isHdTile = false;
    this.demSize = 33 * 33;
    this._topLeftScreen = new Vector3d();
    this._bottomRightScreen = new Vector3d();
    this._topRightScreen = new Vector3d();
    this._bottomLeftScreen = new Vector3d();
    this.sphereRadius = 0;
    this.sphereCenter = new Vector3d();
    this.radius = 1;
    this.triangleCount = 0;
    this.requestHits = 0;
    this.requestPending = false;
    this.errored = false;
    this._tileId = null;
    this._vertexCount = 0;
    this._renderChildPart = null;
    this._renderChildPart = new Array(4);
    for (let i = 0; i < 4; i++) {
      this._renderChildPart[i] = BlendState.create(false, 500);
    }
  }

  static getFrustumList() {
    try {
      return Tile.frustumList;
    } catch ($e1) {
      return null;
    }
  }

  static get_subDivisions() {
    return 32;
  }

  getIndexBuffer(index, accomidation) {
    return this._indexBuffers[index];
  }

  static isPointInTile(lat, lng) {
    return false;
  }

  static getSurfacePointAltitude(lat, lng, meters) {
    return 0;
  }

  makeTexture() {
    if (Tile.prepDevice != null) {
      try {
        this.texture2d = Tile.prepDevice.createTexture();
        let image = this.texture;
        if ((!Texture.isPowerOfTwo(this.texture.height) | !Texture.isPowerOfTwo(this.texture.width)) === 1) {
          const temp = document.createElement('canvas');
          temp.height = Texture.fitPowerOfTwo(image.height);
          temp.width = Texture.fitPowerOfTwo(image.width);
          const ctx = temp.getContext('2d');
          ctx.drawImage(image, 0, 0, temp.width, temp.height);
          image = temp;
        }
        Tile.prepDevice.bindTexture(3553, this.texture2d);
        Tile.prepDevice.texParameteri(3553, 10242, 33071);
        Tile.prepDevice.texParameteri(3553, 10243, 33071);
        Tile.prepDevice.texImage2D(3553, 0, 6408, 6408, 5121, image);
        Tile.prepDevice.texParameteri(3553, 10241, 9985);
        Tile.prepDevice.generateMipmap(3553);
        Tile.prepDevice.bindTexture(3553, null);
      } catch ($e1) {
        this.errored = true;
      }
    }
  }

  static addVertex(buffer, index, p) {
    buffer[index++] = p.position.x;
    buffer[index++] = p.position.y;
    buffer[index++] = p.position.z;
    buffer[index++] = p.tu;
    buffer[index++] = p.tv;
    return index;
  }

  geoTo3dWithAlt(lat, lng, useLocalCenter, rev) {
    lat = Math.max(Math.min(90, lat), -90);
    lng = Math.max(Math.min(180, lng), -180);
    if (!Tile.demEnabled || this.demData == null) {
      return this.geoTo3d(lat, lng, useLocalCenter);
    }
    if (rev) {
      lng -= 180;
    }
    const altitude = this.demData[this.demIndex];
    return this.geoTo3dWithAltitude(lat, lng, altitude, useLocalCenter);
  }

  geoTo3dWithAltitude(lat, lng, altitude, useLocalCenter) {
    const radius = 1 + (altitude / this.get__demScaleFactor());
    const retVal = new Vector3d((Math.cos(lng * Tile.RC) * Math.cos(lat * Tile.RC) * radius), (Math.sin(lat * Tile.RC) * radius), (Math.sin(lng * Tile.RC) * Math.cos(lat * Tile.RC) * radius));
    if (useLocalCenter) {
      retVal.subtract(this.localCenter);
    }
    return retVal;
  }

  get__demScaleFactor() {
    return this._demScaleFactor;
  }

  set__demScaleFactor(value) {
    this._demScaleFactor = value;
    return value;
  }

  requestImage() {
    const $this = this;

    if (this.get_dataset().get_wcsImage() != null) {
      this.texReady = true;
      this.downloading = false;
      this.errored = false;
      this.readyToRender = true;
      this.requestPending = false;
      TileCache.removeFromQueue(this.get_key(), true);
      return;
    }
    if (!this.downloading && !this.readyToRender) {
      this.downloading = true;
      this.texture = document.createElement('img');
      const xdomimg = this.texture;
      this.texture.addEventListener('load', function (e) {
        $this.texReady = true;
        $this.downloading = false;
        $this.errored = false;
        $this.readyToRender = $this.texReady && ($this.demReady || !$this.demTile);
        $this.requestPending = false;
        TileCache.removeFromQueue($this.get_key(), true);
        $this.makeTexture();
      }, false);
      this.texture.addEventListener('error', function (e) {
        if (!$this.texture.hasAttribute('proxyattempt')) {
          $this.texture.src = Util.getProxiedUrl($this.get_URL());
          $this.texture.setAttribute('proxyattempt', true);
        } else {
          $this.downloading = false;
          $this.readyToRender = false;
          $this.errored = true;
          $this.requestPending = false;
          TileCache.removeFromQueue($this.get_key(), true);
        }
      }, false);
      xdomimg.crossOrigin = 'anonymous';
      this.texture.src = ss.replaceString(this.get_URL(), 'cdn.', 'www.');
    }
  }

  createDemFromParent() {
    return false;
  }

  _loadDemData() {
    if (this.demFile == null) {
      return this.createDemFromParent();
    }
    this.demData = this.demFile;
    if (this.demFile.length !== 1089 && this.demFile.length !== 513) {
      return this.createDemFromParent();
    }
    let total = 0;
    const $enum1 = ss.enumerate(this.demData);
    while ($enum1.moveNext()) {
      const fv = $enum1.current;
      total += fv;
    }
    this.demAverage /= this.demData.length;
    return true;
  }

  requestDem() {
    const $this = this;

    if (!this.readyToRender && !this.demDownloading) {
      this.demTile = true;
      this.demDownloading = true;
      Tile.callCount++;
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function (e) {
        $this.demReady = true;
        $this.demDownloading = false;
        $this.readyToRender = $this.texReady && ($this.demReady || !$this.demTile);
        $this.requestPending = false;
        try {
          $this.demFile = new Float32Array(xhr.response);
        } catch ($e1) {
        }
        TileCache.removeFromQueue($this.get_key(), true);
      }, false);
      xhr.addEventListener('error', function (e) {
        $this.demDownloading = false;
        $this.demReady = false;
        $this.readyToRender = false;
        $this.errored = true;
        $this.requestPending = false;
        TileCache.removeFromQueue($this.get_key(), true);
      }, false);
      xhr.open('GET', this.get_demURL(), true);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    }
  }

  draw3D(renderContext, opacity) {
    this.renderedGeneration = Tile.currentRenderGeneration;
    Tile.tilesTouched++;
    this.accessCount = TileCache.accessID++;
    if (this.errored) {
      return false;
    }
    const xMax = 2;
    this.inViewFrustum = true;
    if (!this.readyToRender) {
      TileCache.addTileToQueue(this);
      return false;
    }
    let transitioning = false;
    let childIndex = 0;
    let yOffset = 0;
    if (this.dataset.get_mercator() || this.dataset.get_bottomsUp()) {
      yOffset = 1;
    }
    const xOffset = 0;
    let anythingToRender = false;
    let childRendered = false;
    for (let y1 = 0; y1 < 2; y1++) {
      for (let x1 = 0; x1 < xMax; x1++) {
        if (this.level < this.dataset.get_levels()) {
          if (this.children[childIndex] == null) {
            this.children[childIndex] = TileCache.getTile(this.level + 1, this.tileX * 2 + ((x1 + xOffset) % 2), this.tileY * 2 + ((y1 + yOffset) % 2), this.dataset, this);
          }
          if (this.children[childIndex].isTileInFrustum(renderContext.get_frustum())) {
            this.inViewFrustum = true;
            if (this.children[childIndex].isTileBigEnough(renderContext)) {
              this._renderChildPart[childIndex].set_targetState(!this.children[childIndex].draw3D(renderContext, opacity));
              if (this._renderChildPart[childIndex].get_targetState()) {
                childRendered = true;
              }
            } else {
              this._renderChildPart[childIndex].set_targetState(true);
            }
          } else {
            this._renderChildPart[childIndex].set_targetState(this._renderChildPart[childIndex].set_state(false));
          }
          if (this._renderChildPart[childIndex].get_targetState() !== this._renderChildPart[childIndex].get_state()) {
            transitioning = true;
          }
        } else {
          this._renderChildPart[childIndex].set_state(true);
        }
        if (!!this._renderChildPart[childIndex].get_state()) {
          anythingToRender = true;
        }
        childIndex++;
      }
    }
    if (childRendered || anythingToRender) {
      this.renderedAtOrBelowGeneration = Tile.currentRenderGeneration;
      if (this.parent != null) {
        this.parent.renderedAtOrBelowGeneration = this.renderedAtOrBelowGeneration;
      }
    }
    if (!anythingToRender) {
      return true;
    }
    if (!this.createGeometry(renderContext)) {
      return false;
    }
    Tile.tilesInView++;
    this.accomidation = this._computeAccomidation();
    for (let i = 0; i < 4; i++) {
      if (this._renderChildPart[i].get_targetState()) {
        this.renderPart(renderContext, i, (opacity / 100), false);
      }
    }
    return true;
  }

  _computeAccomidation() {
    let accVal = 0;
    if (!Tile.useAccomidation) {
      return 0;
    }
    const top = TileCache.getCachedTile(this.level, this.tileX, this.tileY + 1, this.dataset, this);
    if (top == null || top.renderedAtOrBelowGeneration < Tile.currentRenderGeneration - 2) {
      accVal += 1;
    }
    const right = TileCache.getCachedTile(this.level, this.tileX + 1, this.tileY, this.dataset, this);
    if (right == null || right.renderedAtOrBelowGeneration < Tile.currentRenderGeneration - 2) {
      accVal += 2;
    }
    const bottom = TileCache.getCachedTile(this.level, this.tileX, this.tileY - 1, this.dataset, this);
    if (bottom == null || bottom.renderedAtOrBelowGeneration < Tile.currentRenderGeneration - 2) {
      accVal += 4;
    }
    const left = TileCache.getCachedTile(this.level, this.tileX - 1, this.tileY, this.dataset, this);
    if (left == null || left.renderedAtOrBelowGeneration < Tile.currentRenderGeneration - 2) {
      accVal += 8;
    }
    return accVal;
  }

  renderPart(renderContext, part, opacity, combine) {
    if (Tile.prepDevice == null) {
      const lighting = renderContext.lighting && renderContext.get_sunPosition() != null;
      const $enum1 = ss.enumerate(this._renderTriangleLists[part]);
      while ($enum1.moveNext()) {
        const tri = $enum1.current;
        tri.opacity = opacity;
        if (lighting) {
          const norm = tri.normal.copy();
          renderContext.get_world().multiplyVector(norm);
          norm.normalize();
          let light = Vector3d.dot(norm, renderContext.get_sunPosition());
          if (light < 0) {
            light = 0;
          } else {
            light = Math.min(1, (light * 1));
          }
          tri.lighting = light;
        } else {
          tri.lighting = 1;
        }
        tri.draw(renderContext.device, renderContext.WVP);
      }
    } else {
      TileShader.use(renderContext, this._vertexBuffer, this.getIndexBuffer(part, this.accomidation), this.texture2d, opacity, false);
      renderContext.gl.drawElements(4, this.triangleCount * 3, 5123, 0);
    }
  }

  cleanUp(removeFromParent) {
    this.readyToRender = false;
    this.demData = null;
    this.demFile = null;
    this.demDownloading = false;
    this.texReady = false;
    this.demReady = false;
    this.errored = false;
    if (this.texture != null) {
      this.texture = null;
    }
    this._renderTriangleLists = new Array(4);
    this.geometryCreated = false;
    if (removeFromParent && this.parent != null) {
      this.parent.removeChild(this);
      this.parent = null;
    }
    if (Tile.prepDevice != null) {
      const $enum1 = ss.enumerate(this._indexBuffers);
      while ($enum1.moveNext()) {
        const buf = $enum1.current;
        Tile.prepDevice.deleteBuffer(buf);
      }
      this._indexBuffers = new Array(4);
      if (this._vertexBuffer != null) {
        Tile.prepDevice.deleteBuffer(this._vertexBuffer);
        this._vertexBuffer = null;
      }
      if (this.texture2d != null) {
        Tile.prepDevice.deleteTexture(this.texture2d);
        this.texture2d = null;
      }
    }
  }

  removeChild(child) {
    for (let i = 0; i < 4; i++) {
      if (this.children[i] === child) {
        this.children[i] = null;
        return;
      }
    }
  }

  createGeometry(renderContext) {
    if (Tile.demEnabled && this.demReady && this.demData == null) {
      if (!this._loadDemData()) {
        return false;
      }
    }
    if (Tile.demEnabled && this.demData == null) {
      return false;
    }
    this.readyToRender = true;
    return true;
  }

  calcSphere() {
    const corners = new Array(4);
    corners[0] = this.topLeft;
    corners[1] = this.bottomRight;
    corners[2] = this.topRight;
    corners[3] = this.bottomLeft;
    const result = ConvexHull.findEnclosingSphere(corners);
    this.sphereCenter = result.center;
    this.sphereRadius = result.radius;
  }

  isTileBigEnough(renderContext) {
    if (this.level > 1) {
      const wvp = renderContext.WVP;
      wvp._transformTo(this.topLeft, this._topLeftScreen);
      wvp._transformTo(this.bottomRight, this._bottomRightScreen);
      wvp._transformTo(this.topRight, this._topRightScreen);
      wvp._transformTo(this.bottomLeft, this._bottomLeftScreen);
      const top = this._topLeftScreen;
      top.subtract(this._topRightScreen);
      const topLength = top.length();
      const bottom = this._bottomLeftScreen;
      bottom.subtract(this._bottomRightScreen);
      const bottomLength = bottom.length();
      const left = this._bottomLeftScreen;
      left.subtract(this._topLeftScreen);
      const leftLength = left.length();
      const right = this._bottomRightScreen;
      right.subtract(this._topRightScreen);
      const rightLength = right.length();
      const lengthMax = Math.max(Math.max(rightLength, leftLength), Math.max(bottomLength, topLength));
      if (lengthMax < 300) {
        return false;
      } else {
        Tile.deepestLevel = (this.level > Tile.deepestLevel) ? this.level : Tile.deepestLevel;
      }
    }
    return true;
  }

  isTileInFrustum(frustum) {
    if (this.level < 2 && (!this.dataset.get_projection() || this.dataset.get_projection() === 3)) {
    }
    this.inViewFrustum = false;
    const centerV4 = new Vector4d(this.sphereCenter.x, this.sphereCenter.y, this.sphereCenter.z, 1);
    for (let i = 0; i < 6; i++) {
      if (frustum[i].dot(centerV4) < -this.sphereRadius) {
        return false;
      }
    }
    this.inViewFrustum = true;
    return true;
  }

  get_sphereRadius() {
    return this.sphereRadius;
  }

  get_sphereCenter() {
    return this.sphereCenter;
  }

  geoTo3d(lat, lng, useLocalCenter) {
    if (this.dataset.get_dataSetType() === 3) {
      var retVal = new Vector3d(-(Math.cos(lng * Tile.RC) * Math.cos(lat * Tile.RC) * this.radius), (Math.sin(lat * Tile.RC) * this.radius), (Math.sin(lng * Tile.RC) * Math.cos(lat * Tile.RC) * this.radius));
      return retVal;
    } else {
      lng -= 180;
      var retVal = new Vector3d((Math.cos(lng * Tile.RC) * Math.cos(lat * Tile.RC) * this.radius), (Math.sin(lat * Tile.RC) * this.radius), (Math.sin(lng * Tile.RC) * Math.cos(lat * Tile.RC) * this.radius));
      return retVal;
    }
  }

  onCreateVertexBuffer(sender, e) {
  }

  get_dataset() {
    return this.dataset;
  }

  set_dataset(value) {
    this.dataset = value;
    return value;
  }

  get_key() {
    return this.dataset.get_imageSetID().toString() + '\\' + this.level.toString() + '\\' + this.tileY.toString() + '_' + this.tileX.toString();
  }

  get_URL() {
    let returnUrl = this.dataset.get_url();
    if (this.dataset.get_url().indexOf('{1}') > -1) {
      if (!this.dataset.get_projection() && !ss.emptyString(this.dataset.get_quadTreeTileMap())) {
        returnUrl = ss.format(this.dataset.get_url(), this.getServerID(), this.getTileID());
        if (returnUrl.indexOf('virtualearth.net') > -1) {
          returnUrl += '&n=z';
        }
        return returnUrl;
      } else {
        return ss.format(this.dataset.get_url(), this.dataset.get_imageSetID(), this.level, this.tileX, this.tileY);
      }
    }
    returnUrl = ss.replaceString(returnUrl, '{X}', this.tileX.toString());
    returnUrl = ss.replaceString(returnUrl, '{Y}', this.tileY.toString());
    returnUrl = ss.replaceString(returnUrl, '{L}', this.level.toString());
    let hash = 0;
    if (returnUrl.indexOf('{S:0}') > -1) {
      hash = 0;
      returnUrl = ss.replaceString(returnUrl, '{S:0}', '{S}');
    }
    if (returnUrl.indexOf('{S:1}') > -1) {
      hash = 1;
      returnUrl = ss.replaceString(returnUrl, '{S:1}', '{S}');
    }
    if (returnUrl.indexOf('{S:2}') > -1) {
      hash = 2;
      returnUrl = ss.replaceString(returnUrl, '{S:2}', '{S}');
    }
    if (returnUrl.indexOf('{S:3}') > -1) {
      hash = 3;
      returnUrl = ss.replaceString(returnUrl, '{S:3}', '{S}');
    }
    if (returnUrl.indexOf('a{S}') > -1) {
      returnUrl = ss.replaceString(returnUrl, 'a{S}', 'r{S}');
    }
    if (returnUrl.indexOf('h{S}') > -1) {
      returnUrl = ss.replaceString(returnUrl, 'h{S}', 'r{S}');
    }
    if (returnUrl.indexOf('//r{S}.ortho.tiles.virtualearth.net') > -1) {
      returnUrl = ss.replaceString(returnUrl, '//r{S}.ortho.tiles.virtualearth.net', '//ecn.t{S}.tiles.virtualearth.net');
    }
    const id = this.getTileID();
    let server = '';
    if (!id.length) {
      server = hash.toString();
    } else {
      server = id.substr(id.length - 1, 1);
    }
    returnUrl = ss.replaceString(returnUrl, '{Q}', id);
    returnUrl = ss.replaceString(returnUrl, '{S}', server);
    if (returnUrl.indexOf('virtualearth.net') > -1) {
      returnUrl += '&n=z';
    }
    return returnUrl;
  }

  get_demURL() {
    if (!this.dataset.get_projection()) {
      let baseUrl = '//cdn.worldwidetelescope.org/wwtweb/demtile.aspx?q={0},{1},{2},M';
      if (!ss.emptyString(this.dataset.get_demUrl())) {
        baseUrl = this.dataset.get_demUrl();
      }
    }
    if (this.dataset.get_demUrl().indexOf('{1}') > -1) {
      return ss.format(this.dataset.get_demUrl() + '&new', this.level, this.tileX, this.tileY);
    }
    let returnUrl = this.dataset.get_demUrl();
    returnUrl = ss.replaceString(returnUrl, '{X}', this.tileX.toString());
    returnUrl = ss.replaceString(returnUrl, '{Y}', this.tileY.toString());
    returnUrl = ss.replaceString(returnUrl, '{L}', this.level.toString());
    let hash = 0;
    if (returnUrl.indexOf('{S:0}') > -1) {
      hash = 0;
      returnUrl = ss.replaceString(returnUrl, '{S:0}', '{S}');
    }
    if (returnUrl.indexOf('{S:1}') > -1) {
      hash = 1;
      returnUrl = ss.replaceString(returnUrl, '{S:1}', '{S}');
    }
    if (returnUrl.indexOf('{S:2}') > -1) {
      hash = 2;
      returnUrl = ss.replaceString(returnUrl, '{S:2}', '{S}');
    }
    if (returnUrl.indexOf('{S:3}') > -1) {
      hash = 3;
      returnUrl = ss.replaceString(returnUrl, '{S:3}', '{S}');
    }
    const id = this.getTileID();
    let server = '';
    if (!id.length) {
      server = hash.toString();
    } else {
      server = id.substr(id.length - 1, 1);
    }
    returnUrl = ss.replaceString(returnUrl, '{Q}', id);
    returnUrl = ss.replaceString(returnUrl, '{S}', server);
    return returnUrl;
  }

  getServerID() {
    return (this.tileX & 1) + ((this.tileY & 1) << 1);
  }

  getTileID() {
    if (this._tileId != null) {
      return this._tileId;
    }
    let netLevel = this.level;
    const netX = this.tileX;
    const netY = this.tileY;
    if (this.dataset.get_projection() === 1) {
      netLevel++;
    }
    const tileMap = this.dataset.get_quadTreeTileMap();
    if (!ss.emptyString(tileMap)) {
      const sb = new ss.StringBuilder();
      for (let i = netLevel; i > 0; --i) {
        const mask = 1 << (i - 1);
        let val = 0;
        if (!!(netX & mask)) {
          val = 1;
        }
        if (!!(netY & mask)) {
          val += 2;
        }
        sb.append(tileMap.substr(val, 1));
      }
      this._tileId = sb.toString();
      return this._tileId;
    } else {
      this._tileId = '0';
      return this._tileId;
    }
  }

  get_vertexCount() {
    return this._vertexCount;
  }

  set_vertexCount(value) {
    this._vertexCount = value;
    return value;
  }
}

const init = (() => {
  //console.log({Tile});
  Tile.currentRenderGeneration = 0;
  Tile.tileTargetX = -1;
  Tile.tileTargetY = -1;
  Tile.tileTargetLevel = -1;
  Tile.tilesInView = 0;
  Tile.trianglesRendered = 0;
  Tile.tilesTouched = 0;
  Tile.frustumList = null;
  Tile.prepDevice = null;
  Tile.uvMultiple = 256;
  Tile.callCount = 0;
  Tile.useAccomidation = true;
  Tile.demEnabled = false;
  Tile.maxLevel = 20;
  Tile.meshComplexity = 50;
  Tile.imageQuality = 50;
  Tile.lastDeepestLevel = 0;
  Tile.deepestLevel = 0;
  Tile.RC = (3.1415927 / 180);
})();