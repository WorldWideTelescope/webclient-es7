import {Tile} from '../Tile';
import {Util} from '../Util';

export class Texture{
  constructor() {
    this.imageElement = null;
    this.texture2d = null;
    this._downloading = false;
    this._ready = false;
    this._errored = false;
    this.URL = '';
  }

  static getEmpty () {
    if (Texture.empty == null) {
      Texture.empty = Tile.prepDevice.createTexture();
      Tile.prepDevice.bindTexture(3553, Texture.empty);
      Tile.prepDevice.texImage2D(3553, 0, 6408, 1, 1, 0, 6408, 5121, new Uint8Array([ 0, 0, 0, 0 ]));
      Tile.prepDevice.bindTexture(3553, null);
    }
    return Texture.empty;
  }
  static fromUrl (url) {
    const tex = new Texture();
    tex.load(url);
    return tex;
  }
  static isPowerOfTwo (val) {
    return !(val & (val - 1));
  }
  static fitPowerOfTwo (val) {
    val--;
    for (let i = 1; i < 32; i <<= 1) {
      val = val | val >> i;
    }
    return val + 1;
  }

  cleanUp() {
    this.imageElement = null;
    Tile.prepDevice.deleteTexture(this.texture2d);
  }
  dispose() {
    this.cleanUp();
  }
  load(url) {
    const $this = this;

    this.URL = url;
    if (!this._downloading) {
      this._downloading = true;
      this.imageElement = document.createElement('img');
      const xdomimg = this.imageElement;
      this.imageElement.addEventListener('load', function (e) {
        $this._ready = true;
        $this._downloading = false;
        $this._errored = false;
        $this.makeTexture();
      }, false);
      this.imageElement.addEventListener('error', function (e) {
        if (!$this.imageElement.hasAttribute('proxyattempt')) {
          $this.imageElement.src = Util.getProxiedUrl($this.URL);
          $this.imageElement.setAttribute('proxyattempt', true);
        } else {
          $this._downloading = false;
          $this._ready = false;
          $this._errored = true;
        }
      }, false);
      xdomimg.crossOrigin = 'anonymous';
      this.imageElement.src = this.URL;
    }
  }
  makeTexture() {
    if (Tile.prepDevice != null) {
      try {
        this.texture2d = Tile.prepDevice.createTexture();
        Tile.prepDevice.bindTexture(3553, this.texture2d);
        let image = this.imageElement;
        if ((!Texture.isPowerOfTwo(this.imageElement.height) | !Texture.isPowerOfTwo(this.imageElement.width)) === 1) {
          const temp = document.createElement('canvas');
          temp.height = Texture.fitPowerOfTwo(image.height);
          temp.width = Texture.fitPowerOfTwo(image.width);
          const ctx = temp.getContext('2d');
          ctx.drawImage(image, 0, 0, temp.width, temp.height);
          image = temp;
        }
        Tile.prepDevice.texParameteri(3553, 10242, 33071);
        Tile.prepDevice.texParameteri(3553, 10243, 33071);
        Tile.prepDevice.texImage2D(3553, 0, 6408, 6408, 5121, image);
        Tile.prepDevice.texParameteri(3553, 10241, 9985);
        Tile.prepDevice.generateMipmap(3553);
        Tile.prepDevice.bindTexture(3553, null);
      } catch ($e1) {
        this._errored = true;
      }
    }
  }
};
