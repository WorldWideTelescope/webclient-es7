import {Texture} from '../Graphics/Texture';
import {Tile} from '../Tile';

/*function Bitmap
Bitmap.;*/
export class Bitmap {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  static create(width, height) {
    height = Texture.fitPowerOfTwo(height);
    width = Texture.fitPowerOfTwo(width);
    const bmp = new Bitmap();
    bmp.height = height;
    bmp.width = width;
    bmp._buffer = new Uint8Array(width * height * 4);
    return bmp;
  }

  setPixel(x, y, r, g, b, a) {
    let index = (x + y * this.width) * 4;
    this._buffer[index++] = r;
    this._buffer[index++] = g;
    this._buffer[index++] = b;
    this._buffer[index++] = a;
  }

  getTexture() {
    const tex = Tile.prepDevice.createTexture();
    Tile.prepDevice.bindTexture(3553, tex);
    Tile.prepDevice.texParameteri(3553, 10242, 33071);
    Tile.prepDevice.texParameteri(3553, 10243, 33071);
    Tile.prepDevice.texImage2D(3553, 0, 6408, this.width, this.height, 0, 6408, 5121, this._buffer);
    Tile.prepDevice.texParameteri(3553, 10241, 9985);
    Tile.prepDevice.generateMipmap(3553);
    Tile.prepDevice.bindTexture(3553, null);
    return tex;
  }
};