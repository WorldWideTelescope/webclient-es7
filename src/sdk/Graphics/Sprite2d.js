import {Tile} from '../Tile';
import ss from '../scriptsharp/ss';
import {SpriteShader} from './Shaders';

export class Sprite2d {
  constructor() {
    this.vertCount = 0;
  }

  draw(renderContext, points, count, texture, triangleStrips, opacity) {
    if (this.vertexBuffer == null) {
      this.create(points);
    } else {
      this.update(points);
    }
    if (texture == null) {
      ShapeSpriteShader.use(renderContext, this.vertexBuffer);
      renderContext.gl.drawArrays((triangleStrips) ? 5 : 4, 0, points.length);
    } else {
      SpriteShader.use(renderContext, this.vertexBuffer, (texture != null) ? texture.texture2d : null);
      renderContext.gl.drawArrays((triangleStrips) ? 5 : 4, 0, points.length);
    }
  }

  create(verts) {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(verts.length * 9);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(verts);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.position.x;
      buffer[index++] = pt.position.y;
      buffer[index++] = pt.position.z;
      buffer[index++] = pt.color.r / 255;
      buffer[index++] = pt.color.g / 255;
      buffer[index++] = pt.color.b / 255;
      buffer[index++] = pt.color.a / 255;
      buffer[index++] = pt.tu;
      buffer[index++] = pt.tv;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35048);
  }

  update(verts) {
    if (this.vertCount < verts.length) {
      Tile.prepDevice.deleteBuffer(this.vertexBuffer);
      this.create(verts);
      return;
    }
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(verts.length * 9);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(verts);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.position.x;
      buffer[index++] = pt.position.y;
      buffer[index++] = pt.position.z;
      buffer[index++] = pt.color.r / 255;
      buffer[index++] = pt.color.g / 255;
      buffer[index++] = pt.color.b / 255;
      buffer[index++] = pt.color.a / 255;
      buffer[index++] = pt.tu;
      buffer[index++] = pt.tv;
    }
    Tile.prepDevice.bufferSubData(34962, 0, f32array);
  }

}