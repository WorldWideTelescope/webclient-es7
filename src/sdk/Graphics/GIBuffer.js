
// wwtlib.TimeSeriesPointVertexBuffer

import {Tile} from '../Tile';
import ss from '../scriptsharp/ss';
import {Texture} from './Texture';
import {Matrix3d} from '../Double3d';

export function TimeSeriesPointVertex() {
  this.pointSize = 0;
  this.tu = 0;
  this.tv = 0;
}
TimeSeriesPointVertex.create = function(position, size, time, color) {
  const tmp = new TimeSeriesPointVertex();
  tmp.position = position;
  tmp.pointSize = size;
  tmp.tu = time;
  tmp.tv = 0;
  tmp.color = color;
  return tmp;
};
export const TimeSeriesPointVertex$ = {
  get_color: function () {
    return this.color;
  },
  set_color: function (value) {
    this.color = value;
    return value;
  }
};

export function TimeSeriesPointVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}

export const TimeSeriesPointVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 10);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.position.x;
      buffer[index++] = pt.position.y;
      buffer[index++] = pt.position.z;
      buffer[index++] = pt.get_color().r / 255;
      buffer[index++] = pt.get_color().g / 255;
      buffer[index++] = pt.get_color().b / 255;
      buffer[index++] = pt.get_color().a / 255;
      buffer[index++] = pt.tu;
      buffer[index++] = pt.tv;
      buffer[index++] = pt.pointSize;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  },
  dispose: function () {
    Tile.prepDevice.bindBuffer(34962, null);
    Tile.prepDevice.deleteBuffer(this.vertexBuffer);
    this.vertexBuffer = null;
  }
};

export function PositionColoredVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}

export const PositionColoredVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 7);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.position.x;
      buffer[index++] = pt.position.y;
      buffer[index++] = pt.position.z;
      buffer[index++] = pt.color.r / 255;
      buffer[index++] = pt.color.g / 255;
      buffer[index++] = pt.color.b / 255;
      buffer[index++] = pt.color.a / 255;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};

export function PositionColoredTexturedVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}

export const PositionColoredTexturedVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 9);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
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
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};

export function ShortIndexBuffer(indexes) {
  this.buffer = Tile.prepDevice.createBuffer();
  Tile.prepDevice.bindBuffer(34963, this.buffer);
  Tile.prepDevice.bufferData(34963, indexes, 35044);
}

export const ShortIndexBuffer$ = {};

export function IndexBuffer(indexes) {
  this.buffer = Tile.prepDevice.createBuffer();
  Tile.prepDevice.bindBuffer(34963, this.buffer);
  Tile.prepDevice.bufferData(34963, indexes, 35044);
}

export const IndexBuffer$ = {
  dispose: function () {
    Tile.prepDevice.bindBuffer(34963, null);
    Tile.prepDevice.deleteBuffer(this.buffer);
    this.buffer = null;
  }
};


// wwtlib.VertexBufferBase

export function VertexBufferBase() {
}

export const VertexBufferBase$ = {
  dispose: function () {
    Tile.prepDevice.bindBuffer(34962, null);
    Tile.prepDevice.deleteBuffer(this.vertexBuffer);
    this.vertexBuffer = null;
  }
};



// wwtlib.TimeSeriesPointSpriteShader

export function TimeSeriesPointSpriteShader() {
}
TimeSeriesPointSpriteShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = '    precision mediump float;                                                            \n' + '    uniform vec4 lineColor;                                                             \n' + '    varying lowp vec4 vColor;                                                           \n' + '    uniform sampler2D uSampler;                                                         \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '        vec4 texColor;                                                                  \n' + '        texColor = texture2D(uSampler, gl_PointCoord);                                  \n' + '                                                                                        \n' + '                                                                                        \n' + '        gl_FragColor = lineColor * vColor * texColor;                                   \n' + '    }                                                                                   \n';
  const vertexShaderText = '    attribute vec3 aVertexPosition;                                                     \n' + '    attribute vec4 aVertexColor;                                                        \n' + '    attribute vec2 aTime;                                                               \n' + '    attribute float aPointSize;                                                         \n' + '    uniform mat4 uMVMatrix;                                                             \n' + '    uniform mat4 uPMatrix;                                                              \n' + '    uniform float jNow;                                                                 \n' + '    uniform vec3 cameraPosition;                                                        \n' + '    uniform float decay;                                                                \n' + '    uniform float scale;                                                                \n' + '    uniform float minSize;                                                              \n' + '    uniform float sky;                                                                  \n' + '    uniform float showFarSide;                                                          \n' + '                                                                                        \n' + '    varying lowp vec4 vColor;                                                           \n' + '                                                                                        \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '        float dotCam = dot( normalize(cameraPosition-aVertexPosition), normalize(aVertexPosition));                                  \n' + '        float dist = distance(aVertexPosition, cameraPosition);                         \n' + '        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);                \n' + '        float dAlpha = 1.0;                                                             \n' + '        if ( decay > 0.0)                                                               \n' + '        {                                                                               \n' + '             dAlpha = 1.0 - ((jNow - aTime.y) / decay);                                 \n ' + '             if (dAlpha > 1.0 )                                                         \n' + '             {                                                                          \n' + '                  dAlpha = 1.0;                                                         \n' + '             }                                                                          \n' + '        }                                                                               \n' + '        if ( showFarSide == 0.0 && (dotCam * sky) < 0.0 || (jNow < aTime.x && decay > 0.0))                                              \n' + '        {                                                                               \n' + '            vColor = vec4(0.0, 0.0, 0.0, 0.0);                                          \n' + '        }                                                                               \n' + '        else                                                                            \n' + '        {                                                                               \n' + '           vColor = vec4(aVertexColor.r, aVertexColor.g, aVertexColor.b, dAlpha);       \n' + '        }                                                                               \n' + '        float lSize = scale;                                                            \n' + '        if (scale < 0.0)                                                                \n' + '        {                                                                               \n' + '           lSize = -scale;                                                              \n' + '           dist = 1.0;                                                                  \n' + '        }                                                                               \n' + '        gl_PointSize = max(minSize, (lSize * ( aPointSize ) / dist));                   \n' + '    }                                                                                   \n' + '                                                                                        \n';
  TimeSeriesPointSpriteShader._frag = gl.createShader(35632);
  gl.shaderSource(TimeSeriesPointSpriteShader._frag, fragShaderText);
  gl.compileShader(TimeSeriesPointSpriteShader._frag);
  const stat = gl.getShaderParameter(TimeSeriesPointSpriteShader._frag, 35713);
  TimeSeriesPointSpriteShader._vert = gl.createShader(35633);
  gl.shaderSource(TimeSeriesPointSpriteShader._vert, vertexShaderText);
  gl.compileShader(TimeSeriesPointSpriteShader._vert);
  const stat1 = gl.getShaderParameter(TimeSeriesPointSpriteShader._vert, 35713);
  const compilationLog = gl.getShaderInfoLog(TimeSeriesPointSpriteShader._vert);
  TimeSeriesPointSpriteShader._prog = gl.createProgram();
  gl.attachShader(TimeSeriesPointSpriteShader._prog, TimeSeriesPointSpriteShader._vert);
  gl.attachShader(TimeSeriesPointSpriteShader._prog, TimeSeriesPointSpriteShader._frag);
  gl.linkProgram(TimeSeriesPointSpriteShader._prog);
  const errcode = gl.getProgramParameter(TimeSeriesPointSpriteShader._prog, 35714);
  gl.useProgram(TimeSeriesPointSpriteShader._prog);
  TimeSeriesPointSpriteShader.vertLoc = gl.getAttribLocation(TimeSeriesPointSpriteShader._prog, 'aVertexPosition');
  TimeSeriesPointSpriteShader.colorLoc = gl.getAttribLocation(TimeSeriesPointSpriteShader._prog, 'aVertexColor');
  TimeSeriesPointSpriteShader.pointSizeLoc = gl.getAttribLocation(TimeSeriesPointSpriteShader._prog, 'aPointSize');
  TimeSeriesPointSpriteShader.timeLoc = gl.getAttribLocation(TimeSeriesPointSpriteShader._prog, 'aTime');
  TimeSeriesPointSpriteShader.projMatLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'uPMatrix');
  TimeSeriesPointSpriteShader.mvMatLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'uMVMatrix');
  TimeSeriesPointSpriteShader.sampLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'uSampler');
  TimeSeriesPointSpriteShader.jNowLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'jNow');
  TimeSeriesPointSpriteShader.decayLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'decay');
  TimeSeriesPointSpriteShader.lineColorLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'lineColor');
  TimeSeriesPointSpriteShader.cameraPosLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'cameraPosition');
  TimeSeriesPointSpriteShader.scaleLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'scale');
  TimeSeriesPointSpriteShader.skyLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'sky');
  TimeSeriesPointSpriteShader.showFarSideLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'showFarSide');
  TimeSeriesPointSpriteShader.minSizeLoc = gl.getUniformLocation(TimeSeriesPointSpriteShader._prog, 'minSize');
  gl.enable(3042);
  TimeSeriesPointSpriteShader.initialized = true;
};
TimeSeriesPointSpriteShader.use = function(renderContext, vertex, texture, lineColor, zBuffer, jNow, decay, camera, scale, minSize, showFarSide, sky) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!TimeSeriesPointSpriteShader.initialized) {
      TimeSeriesPointSpriteShader.init(renderContext);
    }
    gl.useProgram(TimeSeriesPointSpriteShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniformMatrix4fv(TimeSeriesPointSpriteShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(TimeSeriesPointSpriteShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform1i(TimeSeriesPointSpriteShader.sampLoc, 0);
    gl.uniform1f(TimeSeriesPointSpriteShader.jNowLoc, jNow);
    gl.uniform1f(TimeSeriesPointSpriteShader.decayLoc, decay);
    gl.uniform4f(TimeSeriesPointSpriteShader.lineColorLoc, lineColor.r / 255, lineColor.g / 255, lineColor.b / 255, lineColor.a / 255);
    gl.uniform3f(TimeSeriesPointSpriteShader.cameraPosLoc, camera.x, camera.y, camera.z);
    gl.uniform1f(TimeSeriesPointSpriteShader.scaleLoc, scale);
    gl.uniform1f(TimeSeriesPointSpriteShader.minSizeLoc, minSize);
    gl.uniform1f(TimeSeriesPointSpriteShader.showFarSideLoc, (showFarSide) ? 1 : 0);
    gl.uniform1f(TimeSeriesPointSpriteShader.skyLoc, (sky) ? -1 : 1);
    if (zBuffer) {
      gl.enable(2929);
    }
    else {
      gl.disable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.bindBuffer(34963, null);
    gl.enableVertexAttribArray(TimeSeriesPointSpriteShader.vertLoc);
    gl.enableVertexAttribArray(TimeSeriesPointSpriteShader.colorLoc);
    gl.enableVertexAttribArray(TimeSeriesPointSpriteShader.pointSizeLoc);
    gl.enableVertexAttribArray(TimeSeriesPointSpriteShader.timeLoc);
    gl.vertexAttribPointer(TimeSeriesPointSpriteShader.vertLoc, 3, 5126, false, 40, 0);
    gl.vertexAttribPointer(TimeSeriesPointSpriteShader.colorLoc, 4, 5126, false, 40, 12);
    gl.vertexAttribPointer(TimeSeriesPointSpriteShader.pointSizeLoc, 1, 5126, false, 40, 36);
    gl.vertexAttribPointer(TimeSeriesPointSpriteShader.timeLoc, 2, 5126, false, 40, 28);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.lineWidth(1);
    gl.enable(3042);
    gl.blendFunc(770, 1);
  }
};
export const TimeSeriesPointSpriteShader$ = {};



// wwtlib.PositionVertexBuffer

export function PositionVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}

export const PositionVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 3);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.x;
      buffer[index++] = pt.y;
      buffer[index++] = pt.z;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};


// wwtlib.PositionTextureVertexBuffer

export function PositionTextureVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}
PositionTextureVertexBuffer.create = function(data) {
  const buffer = new PositionTextureVertexBuffer(data.length);
  buffer._verts$1 = data;
  buffer.unlock();
  return buffer;
};
export const PositionTextureVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 5);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.position.x;
      buffer[index++] = pt.position.y;
      buffer[index++] = pt.position.z;
      buffer[index++] = pt.tu;
      buffer[index++] = pt.tv;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};


// wwtlib.PositionNormalTexturedVertexBuffer

export function PositionNormalTexturedVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}
PositionNormalTexturedVertexBuffer.create = function(data) {
  const buffer = new PositionNormalTexturedVertexBuffer(data.length);
  buffer._verts$1 = data;
  buffer.unlock();
  return buffer;
};
export const PositionNormalTexturedVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 8);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.x;
      buffer[index++] = pt.y;
      buffer[index++] = pt.z;
      buffer[index++] = pt.nx;
      buffer[index++] = pt.ny;
      buffer[index++] = pt.nz;
      buffer[index++] = pt.tu;
      buffer[index++] = pt.tv;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};


// wwtlib.PositionNormalTexturedTangentVertexBuffer

export function PositionNormalTexturedTangentVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}
PositionNormalTexturedTangentVertexBuffer.create = function(data) {
  const buffer = new PositionNormalTexturedTangentVertexBuffer(data.length);
  buffer._verts$1 = data;
  buffer.unlock();
  return buffer;
};
export const PositionNormalTexturedTangentVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 11);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.x;
      buffer[index++] = pt.y;
      buffer[index++] = pt.z;
      buffer[index++] = pt.nx;
      buffer[index++] = pt.ny;
      buffer[index++] = pt.nz;
      buffer[index++] = pt.tanx;
      buffer[index++] = pt.tany;
      buffer[index++] = pt.tanz;
      buffer[index++] = pt.tu;
      buffer[index++] = pt.tv;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};


// wwtlib.KeplerVertexBuffer

export function KeplerVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}
KeplerVertexBuffer.create = function(items) {
  const tmp = new KeplerVertexBuffer(items.length);
  tmp._verts$1 = items;
  return tmp;
};
export const KeplerVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 19);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.ABC.x;
      buffer[index++] = pt.ABC.y;
      buffer[index++] = pt.ABC.z;
      buffer[index++] = pt.abc1.x;
      buffer[index++] = pt.abc1.y;
      buffer[index++] = pt.abc1.z;
      buffer[index++] = pt.pointSize;
      buffer[index++] = pt.color.r / 255;
      buffer[index++] = pt.color.g / 255;
      buffer[index++] = pt.color.b / 255;
      buffer[index++] = pt.color.a / 255;
      buffer[index++] = pt.w;
      buffer[index++] = pt.e;
      buffer[index++] = pt.n;
      buffer[index++] = pt.t;
      buffer[index++] = pt.a;
      buffer[index++] = pt.z;
      buffer[index++] = pt.orbitPos;
      buffer[index++] = pt.orbits;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};


// wwtlib.TimeSeriesLineVertexBuffer

export function TimeSeriesLineVertexBuffer(count) {
  this.count = 0;
  this._verts$1 = null;
  VertexBufferBase.call(this);
  this.count = count;
}

export const TimeSeriesLineVertexBuffer$ = {
  lock: function () {
    this._verts$1 = new Array(this.count);
    return this._verts$1;
  },
  unlock: function () {
    this.vertexBuffer = Tile.prepDevice.createBuffer();
    Tile.prepDevice.bindBuffer(34962, this.vertexBuffer);
    const f32array = new Float32Array(this.count * 9);
    const buffer = f32array;
    let index = 0;
    const $enum1 = ss.enumerate(this._verts$1);
    while ($enum1.moveNext()) {
      const pt = $enum1.current;
      buffer[index++] = pt.position.x;
      buffer[index++] = pt.position.y;
      buffer[index++] = pt.position.z;
      buffer[index++] = pt.get_color().r / 255;
      buffer[index++] = pt.get_color().g / 255;
      buffer[index++] = pt.get_color().b / 255;
      buffer[index++] = pt.get_color().a / 255;
      buffer[index++] = pt.tu;
      buffer[index++] = pt.tv;
    }
    Tile.prepDevice.bufferData(34962, f32array, 35044);
  }
};

