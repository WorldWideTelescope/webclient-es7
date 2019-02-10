// wwtlib.TileShader

import {Tile} from '../Tile';
import {Texture} from './Texture';
import {Matrix3d, Vector3d} from '../Double3d';

export function TileShader() {
}
TileShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                              \n' + '                                                                                       \n' + '   varying vec2 vTextureCoord;                                                         \n' + '   varying vec3 vNormal;                                                               \n' + '   varying vec3 vCamVector;                                                               \n' + '                                                                                       \n' + '   uniform sampler2D uSampler;                                                         \n' + '   uniform float opacity;                                                              \n' + '   uniform vec3 uSunPosition;                                                          \n' + '   uniform float uMinBrightness;                                                       \n' + '   uniform vec3 uAtmosphereColor;                                                       \n' + '                                                                                       \n' + '   void main(void) {                                                                   \n' + '     vec3 normal = normalize(vNormal);                                                 \n' + '     vec3 camVN = normalize(vCamVector);                                               \n' + '     vec3 cam = normalize(vec3(0.0,0.0,-1.0));                                                    \n' + '     float dt = uMinBrightness + pow(max(0.0,- dot(normal,uSunPosition)),0.5);                  \n' + '     float atm = max(0.0, 1.0 - 2.5 * dot(cam,camVN)) + 0.3 * dt;                             \n' + '     atm = (dt > uMinBrightness) ? atm : 0.0;                                          \n' + '     if ( uMinBrightness == 1.0 ) { dt = 1.0; atm= 0.0; }                                        \n' + '     vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));           \n' + '     gl_FragColor = col * opacity;                                                     \n' + '     gl_FragColor.rgb *= dt;                                                           \n' + '     gl_FragColor.rgb += atm * uAtmosphereColor;                                  \n' + '   }                                                                                   \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec2 aTextureCoord;                                                \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '     varying vec3 vNormal;                                                        \n' + '     varying vec3 vCamVector;                                                     \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vCamVector = normalize((mat3(uMVMatrix) * aVertexPosition).xyz);              \n' + '         vec3 normal = normalize(aVertexPosition);                                \n' + '         vec3 normalT = normalize(mat3(uMVMatrix) * normal);                      \n' + '         vTextureCoord = aTextureCoord;                                           \n' + '         vNormal = normalT;                                                       \n' + '     }                                                                            \n' + '                                                                                  \n';
  TileShader._frag = gl.createShader(35632);
  gl.shaderSource(TileShader._frag, fragShaderText);
  gl.compileShader(TileShader._frag);
  const stat = gl.getShaderParameter(TileShader._frag, 35713);
  if (!stat) {
    const errorF = gl.getShaderInfoLog(TileShader._frag);
  }
  TileShader._vert = gl.createShader(35633);
  gl.shaderSource(TileShader._vert, vertexShaderText);
  gl.compileShader(TileShader._vert);
  const stat1 = gl.getShaderParameter(TileShader._vert, 35713);
  if (!stat1) {
    const errorV = gl.getShaderInfoLog(TileShader._vert);
  }
  TileShader._prog = gl.createProgram();
  gl.attachShader(TileShader._prog, TileShader._vert);
  gl.attachShader(TileShader._prog, TileShader._frag);
  gl.linkProgram(TileShader._prog);
  const errcode = gl.getProgramParameter(TileShader._prog, 35714);
  gl.useProgram(TileShader._prog);
  TileShader.vertLoc = gl.getAttribLocation(TileShader._prog, 'aVertexPosition');
  TileShader.textureLoc = gl.getAttribLocation(TileShader._prog, 'aTextureCoord');
  TileShader.projMatLoc = gl.getUniformLocation(TileShader._prog, 'uPMatrix');
  TileShader.mvMatLoc = gl.getUniformLocation(TileShader._prog, 'uMVMatrix');
  TileShader.sampLoc = gl.getUniformLocation(TileShader._prog, 'uSampler');
  TileShader.sunLoc = gl.getUniformLocation(TileShader._prog, 'uSunPosition');
  TileShader.minBrightnessLoc = gl.getUniformLocation(TileShader._prog, 'uMinBrightness');
  TileShader.opacityLoc = gl.getUniformLocation(TileShader._prog, 'opacity');
  TileShader.atmosphereColorLoc = gl.getUniformLocation(TileShader._prog, 'uAtmosphereColor');
  Tile.uvMultiple = 1;
  Tile.demEnabled = true;
  gl.enable(3042);
  gl.blendFunc(770, 771);
  TileShader.initialized = true;
};
TileShader.use = function(renderContext, vertex, index, texture, opacity, noDepth) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!TileShader.initialized) {
      TileShader.init(renderContext);
    }
    gl.useProgram(TileShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniform1f(TileShader.opacityLoc, opacity);
    gl.uniform1f(TileShader.minBrightnessLoc, (renderContext.lighting) ? TileShader.minLightingBrightness : 1);
    if (renderContext.lighting) {
      gl.uniform3f(TileShader.atmosphereColorLoc, TileShader.atmosphereColor.r / 255, TileShader.atmosphereColor.g / 255, TileShader.atmosphereColor.b / 255);
    }
    else {
      gl.uniform3f(TileShader.atmosphereColorLoc, 0, 0, 0);
    }
    gl.uniformMatrix4fv(TileShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(TileShader.projMatLoc, false, renderContext.get_projection().floatArray());
    TileShader.sunPosition.normalize();
    const mvInv = renderContext.get_view().clone();
    mvInv.set_m41(0);
    mvInv.set_m42(0);
    mvInv.set_m43(0);
    mvInv.set_m44(1);
    const sp = Vector3d._transformCoordinate(TileShader.sunPosition, mvInv);
    sp.normalize();
    gl.uniform3f(TileShader.sunLoc, -sp.x, -sp.y, -sp.z);
    gl.uniform1i(TileShader.sampLoc, 0);
    if (renderContext.space || noDepth) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(TileShader.vertLoc);
    gl.enableVertexAttribArray(TileShader.textureLoc);
    gl.vertexAttribPointer(TileShader.vertLoc, 3, 5126, false, 20, 0);
    gl.vertexAttribPointer(TileShader.textureLoc, 2, 5126, false, 20, 12);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.bindBuffer(34963, index);
    gl.enable(3042);
    if (noDepth) {
      gl.blendFunc(770, 1);
    }
    else {
      gl.blendFunc(770, 771);
    }
  }
};
export const TileShader$ = {};


export function SpriteShader() {
}
SpriteShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                                \n' + '                                                                                         \n' + '   varying vec2 vTextureCoord;                                                           \n' + '   varying lowp vec4 vColor;                                                             \n' + '   uniform sampler2D uSampler;                                                           \n' + '                                                                                         \n' + '   void main(void) {                                                                     \n' + '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)) * vColor;  \n' + '   }                                                                                     \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec2 aTextureCoord;                                                \n' + '     attribute lowp vec4 aColor;                                                  \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '     varying vec4 vColor;                                                         \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vTextureCoord = aTextureCoord;                                           \n' + '         vColor = aColor;                                                         \n' + '     }                                                                            \n' + '                                                                                  \n';
  SpriteShader._frag = gl.createShader(35632);
  gl.shaderSource(SpriteShader._frag, fragShaderText);
  gl.compileShader(SpriteShader._frag);
  const stat = gl.getShaderParameter(SpriteShader._frag, 35713);
  SpriteShader._vert = gl.createShader(35633);
  gl.shaderSource(SpriteShader._vert, vertexShaderText);
  gl.compileShader(SpriteShader._vert);
  const stat1 = gl.getShaderParameter(SpriteShader._vert, 35713);
  SpriteShader._prog = gl.createProgram();
  gl.attachShader(SpriteShader._prog, SpriteShader._vert);
  gl.attachShader(SpriteShader._prog, SpriteShader._frag);
  gl.linkProgram(SpriteShader._prog);
  const errcode = gl.getProgramParameter(SpriteShader._prog, 35714);
  gl.useProgram(SpriteShader._prog);
  SpriteShader.vertLoc = gl.getAttribLocation(SpriteShader._prog, 'aVertexPosition');
  SpriteShader.textureLoc = gl.getAttribLocation(SpriteShader._prog, 'aTextureCoord');
  SpriteShader.colorLoc = gl.getAttribLocation(SpriteShader._prog, 'aColor');
  SpriteShader.projMatLoc = gl.getUniformLocation(SpriteShader._prog, 'uPMatrix');
  SpriteShader.mvMatLoc = gl.getUniformLocation(SpriteShader._prog, 'uMVMatrix');
  SpriteShader.sampLoc = gl.getUniformLocation(SpriteShader._prog, 'uSampler');
  Tile.uvMultiple = 1;
  Tile.demEnabled = true;
  gl.enable(3042);
  gl.blendFunc(770, 771);
  SpriteShader.initialized = true;
};
SpriteShader.use = function(renderContext, vertex, texture) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!SpriteShader.initialized) {
      SpriteShader.init(renderContext);
    }
    gl.useProgram(SpriteShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniformMatrix4fv(SpriteShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(SpriteShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform1i(SpriteShader.sampLoc, 0);
    gl.disable(2929);
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(SpriteShader.vertLoc);
    gl.enableVertexAttribArray(SpriteShader.textureLoc);
    gl.enableVertexAttribArray(SpriteShader.colorLoc);
    gl.vertexAttribPointer(SpriteShader.vertLoc, 3, 5126, false, 36, 0);
    gl.vertexAttribPointer(SpriteShader.colorLoc, 4, 5126, false, 36, 12);
    gl.vertexAttribPointer(SpriteShader.textureLoc, 2, 5126, false, 36, 28);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.bindBuffer(34963, null);
    gl.enable(3042);
    gl.blendFunc(770, 771);
  }
};
export const SpriteShader$ = {};

export function SimpleLineShader() {
}
SimpleLineShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = '   precision highp float;                                                          \n' + '   uniform vec4 lineColor;                                                         \n' + '                                                                                   \n' + '   void main(void) {                                                               \n' + '       gl_FragColor = lineColor;                                                   \n' + '   }                                                                               \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '     }                                                                            \n' + '                                                                                  \n';
  SimpleLineShader._frag = gl.createShader(35632);
  gl.shaderSource(SimpleLineShader._frag, fragShaderText);
  gl.compileShader(SimpleLineShader._frag);
  const stat = gl.getShaderParameter(SimpleLineShader._frag, 35713);
  SimpleLineShader._vert = gl.createShader(35633);
  gl.shaderSource(SimpleLineShader._vert, vertexShaderText);
  gl.compileShader(SimpleLineShader._vert);
  const stat1 = gl.getShaderParameter(SimpleLineShader._vert, 35713);
  SimpleLineShader._prog = gl.createProgram();
  gl.attachShader(SimpleLineShader._prog, SimpleLineShader._vert);
  gl.attachShader(SimpleLineShader._prog, SimpleLineShader._frag);
  gl.linkProgram(SimpleLineShader._prog);
  const errcode = gl.getProgramParameter(SimpleLineShader._prog, 35714);
  gl.useProgram(SimpleLineShader._prog);
  SimpleLineShader.vertLoc = gl.getAttribLocation(SimpleLineShader._prog, 'aVertexPosition');
  SimpleLineShader.lineColorLoc = gl.getUniformLocation(SimpleLineShader._prog, 'lineColor');
  SimpleLineShader.projMatLoc = gl.getUniformLocation(SimpleLineShader._prog, 'uPMatrix');
  SimpleLineShader.mvMatLoc = gl.getUniformLocation(SimpleLineShader._prog, 'uMVMatrix');
  gl.enable(3042);
  gl.blendFunc(770, 771);
  SimpleLineShader.initialized = true;
};
SimpleLineShader.use = function(renderContext, vertex, lineColor, useDepth) {
  const gl = renderContext.gl;
  if (gl != null) {
    if (!SimpleLineShader.initialized) {
      SimpleLineShader.init(renderContext);
    }
    gl.useProgram(SimpleLineShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniformMatrix4fv(SimpleLineShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(SimpleLineShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform4f(SimpleLineShader.lineColorLoc, lineColor.r / 255, lineColor.g / 255, lineColor.b / 255, lineColor.a);
    if (renderContext.space || !useDepth) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.enableVertexAttribArray(SimpleLineShader.vertLoc);
    gl.bindBuffer(34962, vertex);
    gl.bindBuffer(34963, null);
    gl.vertexAttribPointer(SimpleLineShader.vertLoc, 3, 5126, false, 0, 0);
    gl.lineWidth(1);
    gl.enable(3042);
    gl.blendFunc(770, 771);
  }
};
export const SimpleLineShader$ = {};

export function SimpleLineShader2D() {
}
SimpleLineShader2D.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = '   precision highp float;                                                          \n' + '   uniform vec4 lineColor;                                                         \n' + '                                                                                   \n' + '   void main(void) {                                                               \n' + '       gl_FragColor = lineColor;                                                   \n' + '   }                                                                               \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = vec4(aVertexPosition, 1.0);                                \n' + '     }                                                                            \n' + '                                                                                  \n';
  SimpleLineShader2D._frag = gl.createShader(35632);
  gl.shaderSource(SimpleLineShader2D._frag, fragShaderText);
  gl.compileShader(SimpleLineShader2D._frag);
  const stat = gl.getShaderParameter(SimpleLineShader2D._frag, 35713);
  SimpleLineShader2D._vert = gl.createShader(35633);
  gl.shaderSource(SimpleLineShader2D._vert, vertexShaderText);
  gl.compileShader(SimpleLineShader2D._vert);
  const stat1 = gl.getShaderParameter(SimpleLineShader2D._vert, 35713);
  SimpleLineShader2D._prog = gl.createProgram();
  gl.attachShader(SimpleLineShader2D._prog, SimpleLineShader2D._vert);
  gl.attachShader(SimpleLineShader2D._prog, SimpleLineShader2D._frag);
  gl.linkProgram(SimpleLineShader2D._prog);
  const errcode = gl.getProgramParameter(SimpleLineShader2D._prog, 35714);
  gl.useProgram(SimpleLineShader2D._prog);
  SimpleLineShader2D.vertLoc = gl.getAttribLocation(SimpleLineShader2D._prog, 'aVertexPosition');
  SimpleLineShader2D.lineColorLoc = gl.getUniformLocation(SimpleLineShader2D._prog, 'lineColor');
  gl.enable(3042);
  gl.blendFunc(770, 771);
  SimpleLineShader2D.initialized = true;
};
SimpleLineShader2D.use = function(renderContext, vertex, lineColor, useDepth) {
  const gl = renderContext.gl;
  if (gl != null) {
    if (!SimpleLineShader2D.initialized) {
      SimpleLineShader2D.init(renderContext);
    }
    gl.useProgram(SimpleLineShader2D._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniform4f(SimpleLineShader2D.lineColorLoc, lineColor.r / 255, lineColor.g / 255, lineColor.b / 255, 1);
    if (renderContext.space || !useDepth) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.enableVertexAttribArray(SimpleLineShader2D.vertLoc);
    gl.bindBuffer(34962, vertex);
    gl.bindBuffer(34963, null);
    gl.vertexAttribPointer(SimpleLineShader2D.vertLoc, 3, 5126, false, 0, 0);
    gl.lineWidth(1);
    gl.enable(3042);
    gl.blendFunc(770, 771);
  }
};
export const SimpleLineShader2D$ = {};

export function OrbitLineShader() {
}
OrbitLineShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = '    precision highp float;                                                        \n' + '    uniform vec4 lineColor;                                                       \n' + '    varying lowp vec4 vColor;                                                     \n' + '                                                                                  \n' + '    void main(void) {                                                             \n' + '        gl_FragColor = lineColor * vColor;                                        \n' + '    }                                                                             \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec4 aVertexColor;                                                 \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '     varying lowp vec4 vColor;                                                    \n' + '                                                                                  \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vColor = aVertexColor;                                                   \n' + '     }                                                                            \n' + '                                                                                  \n';
  OrbitLineShader._frag = gl.createShader(35632);
  gl.shaderSource(OrbitLineShader._frag, fragShaderText);
  gl.compileShader(OrbitLineShader._frag);
  const stat = gl.getShaderParameter(OrbitLineShader._frag, 35713);
  OrbitLineShader._vert = gl.createShader(35633);
  gl.shaderSource(OrbitLineShader._vert, vertexShaderText);
  gl.compileShader(OrbitLineShader._vert);
  const stat1 = gl.getShaderParameter(OrbitLineShader._vert, 35713);
  OrbitLineShader._prog = gl.createProgram();
  gl.attachShader(OrbitLineShader._prog, OrbitLineShader._vert);
  gl.attachShader(OrbitLineShader._prog, OrbitLineShader._frag);
  gl.linkProgram(OrbitLineShader._prog);
  const errcode = gl.getProgramParameter(OrbitLineShader._prog, 35714);
  gl.useProgram(OrbitLineShader._prog);
  OrbitLineShader.vertLoc = gl.getAttribLocation(OrbitLineShader._prog, 'aVertexPosition');
  OrbitLineShader.colorLoc = gl.getAttribLocation(OrbitLineShader._prog, 'aVertexColor');
  OrbitLineShader.lineColorLoc = gl.getUniformLocation(OrbitLineShader._prog, 'lineColor');
  OrbitLineShader.projMatLoc = gl.getUniformLocation(OrbitLineShader._prog, 'uPMatrix');
  OrbitLineShader.mvMatLoc = gl.getUniformLocation(OrbitLineShader._prog, 'uMVMatrix');
  gl.enable(3042);
  gl.blendFunc(770, 771);
  OrbitLineShader.initialized = true;
};
OrbitLineShader.use = function(renderContext, vertex, lineColor) {
  const gl = renderContext.gl;
  if (gl != null) {
    if (!OrbitLineShader.initialized) {
      OrbitLineShader.init(renderContext);
    }
    gl.useProgram(OrbitLineShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniformMatrix4fv(OrbitLineShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(OrbitLineShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform4f(OrbitLineShader.lineColorLoc, lineColor.r / 255, lineColor.g / 255, lineColor.b / 255, 1);
    if (renderContext.space) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.bindBuffer(34963, null);
    gl.enableVertexAttribArray(OrbitLineShader.vertLoc);
    gl.enableVertexAttribArray(OrbitLineShader.colorLoc);
    gl.vertexAttribPointer(OrbitLineShader.vertLoc, 3, 5126, false, 28, 0);
    gl.vertexAttribPointer(OrbitLineShader.colorLoc, 4, 5126, false, 28, 12);
    gl.lineWidth(1);
    gl.enable(3042);
    gl.blendFunc(770, 771);
  }
};
export const OrbitLineShader$ = {};

export function LineShaderNormalDates() {
}
LineShaderNormalDates.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = '    precision highp float;                                                              \n' + '    uniform vec4 lineColor;                                                             \n' + '    varying lowp vec4 vColor;                                                           \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '        gl_FragColor = lineColor * vColor;                                              \n' + '    }                                                                                   \n';
  const vertexShaderText = '    attribute vec3 aVertexPosition;                                                     \n' + '    attribute vec4 aVertexColor;                                                        \n' + '    attribute vec2 aTime;                                                               \n' + '    uniform mat4 uMVMatrix;                                                             \n' + '    uniform mat4 uPMatrix;                                                              \n' + '    uniform float jNow;                                                                 \n' + '    uniform float decay;                                                                \n' + '                                                                                        \n' + '    varying lowp vec4 vColor;                                                           \n' + '                                                                                        \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);                \n' + '        float dAlpha = 1.0;                                                             \n' + '        if ( decay > 0.0)                                                               \n' + '        {                                                                               \n' + '             dAlpha = 1.0 - ((jNow - aTime.y) / decay);                                 \n ' + '             if (dAlpha > 1.0 )                                                         \n' + '             {                                                                          \n' + '                  dAlpha = 1.0;                                                         \n' + '             }                                                                          \n' + '        }                                                                               \n' + '        if (jNow < aTime.x && decay > 0.0)                                              \n' + '        {                                                                               \n' + '            vColor = vec4(1, 1, 1, 1);                                                  \n' + '        }                                                                               \n' + '        else                                                                            \n' + '        {                                                                               \n' + '           vColor = vec4(aVertexColor.r, aVertexColor.g, aVertexColor.b, dAlpha * aVertexColor.a);          \n' + '        }                                                                                \n' + '    }                                                                                    \n' + '                                                                                         \n';
  LineShaderNormalDates._frag = gl.createShader(35632);
  gl.shaderSource(LineShaderNormalDates._frag, fragShaderText);
  gl.compileShader(LineShaderNormalDates._frag);
  const stat = gl.getShaderParameter(LineShaderNormalDates._frag, 35713);
  LineShaderNormalDates._vert = gl.createShader(35633);
  gl.shaderSource(LineShaderNormalDates._vert, vertexShaderText);
  gl.compileShader(LineShaderNormalDates._vert);
  const stat1 = gl.getShaderParameter(LineShaderNormalDates._vert, 35713);
  LineShaderNormalDates._prog = gl.createProgram();
  gl.attachShader(LineShaderNormalDates._prog, LineShaderNormalDates._vert);
  gl.attachShader(LineShaderNormalDates._prog, LineShaderNormalDates._frag);
  gl.linkProgram(LineShaderNormalDates._prog);
  const errcode = gl.getProgramParameter(LineShaderNormalDates._prog, 35714);
  gl.useProgram(LineShaderNormalDates._prog);
  LineShaderNormalDates.vertLoc = gl.getAttribLocation(LineShaderNormalDates._prog, 'aVertexPosition');
  LineShaderNormalDates.colorLoc = gl.getAttribLocation(LineShaderNormalDates._prog, 'aVertexColor');
  LineShaderNormalDates.timeLoc = gl.getAttribLocation(LineShaderNormalDates._prog, 'aTime');
  LineShaderNormalDates.lineColorLoc = gl.getUniformLocation(LineShaderNormalDates._prog, 'lineColor');
  LineShaderNormalDates.projMatLoc = gl.getUniformLocation(LineShaderNormalDates._prog, 'uPMatrix');
  LineShaderNormalDates.mvMatLoc = gl.getUniformLocation(LineShaderNormalDates._prog, 'uMVMatrix');
  LineShaderNormalDates.jNowLoc = gl.getUniformLocation(LineShaderNormalDates._prog, 'jNow');
  LineShaderNormalDates.decayLoc = gl.getUniformLocation(LineShaderNormalDates._prog, 'decay');
  gl.enable(3042);
  gl.blendFunc(770, 771);
  LineShaderNormalDates.initialized = true;
};
LineShaderNormalDates.use = function(renderContext, vertex, lineColor, zBuffer, jNow, decay) {
  const gl = renderContext.gl;
  if (gl != null) {
    if (!LineShaderNormalDates.initialized) {
      LineShaderNormalDates.init(renderContext);
    }
    gl.useProgram(LineShaderNormalDates._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniformMatrix4fv(LineShaderNormalDates.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(LineShaderNormalDates.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform4f(LineShaderNormalDates.lineColorLoc, lineColor.r / 255, lineColor.g / 255, lineColor.b / 255, 1);
    gl.uniform1f(LineShaderNormalDates.jNowLoc, jNow);
    gl.uniform1f(LineShaderNormalDates.decayLoc, decay);
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
    gl.enableVertexAttribArray(LineShaderNormalDates.vertLoc);
    gl.enableVertexAttribArray(LineShaderNormalDates.colorLoc);
    gl.vertexAttribPointer(LineShaderNormalDates.vertLoc, 3, 5126, false, 36, 0);
    gl.vertexAttribPointer(LineShaderNormalDates.colorLoc, 4, 5126, false, 36, 12);
    gl.vertexAttribPointer(LineShaderNormalDates.timeLoc, 2, 5126, false, 36, 28);
    gl.lineWidth(1);
    gl.enable(3042);
    gl.blendFunc(770, 771);
  }
};
export const LineShaderNormalDates$ = {};

export function KeplerPointSpriteShader() {
}
KeplerPointSpriteShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = '    precision mediump float;                                                            \n' + '    uniform vec4 lineColor;                                                             \n' + '    varying lowp vec4 vColor;                                                           \n' + '    uniform sampler2D uSampler;                                                         \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '        vec4 texColor;                                                                  \n' + '        texColor = texture2D(uSampler, gl_PointCoord);                                  \n' + '                                                                                        \n' + '                                                                                        \n' + '        gl_FragColor = lineColor * vColor * texColor;                                   \n' + '    }                                                                                   \n';
  const vertexShaderText = '    attribute vec3 ABC;                                                                 \n' + '    attribute vec3 abc;                                                                 \n' + '    attribute float PointSize;                                                          \n' + '    attribute vec4 Color;                                                               \n' + '    attribute vec2 we;                                                                  \n' + '    attribute vec2 nT;                                                                  \n' + '    attribute vec2 az;                                                                  \n' + '    attribute vec2 orbit;                                                               \n' + '    uniform mat4 uMVMatrix;                                                             \n' + '    uniform mat4 uPMatrix;                                                              \n' + '    uniform float jNow;                                                                 \n' + '    uniform vec3 cameraPosition;                                                        \n' + '    uniform float MM;                                                                   \n' + '    uniform float scaling;                                                              \n' + '    uniform float minSize;                                                              \n' + '    uniform float opacity;                                                              \n' + '    varying lowp vec4 vColor;                                                           \n' + '                                                                                        \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '     float M = nT.x * (jNow - nT.y) * 0.01745329251994;                                 \n' + '     float e = we.y;                                                                    \n' + '     float a = az.x;                                                                    \n' + '     float PI = 3.1415926535897932384;                                                  \n' + '     float w = we.x* 0.01745329251994;                                                  \n' + '     float F = 1.0;                                                                     \n' + '     if (M < 0.0)                                                                       \n' + '       F = -1.0;                                                                        \n' + '     M = abs(M) / (2.0 * PI);                                                           \n' + '     M = (M - float(int(M)))*2.0 *PI *F;                                                \n' + '     if (MM != 0.0)                                                                     \n' + '     {                                                                                  \n' + '       M = MM + (1.0- orbit.x) *2.0 *PI;                                                \n' + '       if (M > (2.0*PI))                                                                \n' + '           M = M - (2.0*PI);                                                            \n' + '     }                                                                                  \n' + '                                                                                        \n' + '     if (M < 0.0)                                                                       \n' + '       M += 2.0 *PI;                                                                    \n' + '     F = 1.0;                                                                           \n' + '     if (M > PI)                                                                        \n' + '        F = -1.0;                                                                       \n' + '     if (M > PI)                                                                        \n' + '       M = 2.0 *PI - M;                                                                 \n' + '                                                                                        \n' + '     float E = PI / 2.0;                                                                \n' + '     float scale = PI / 4.0;                                                            \n' + '     for (int i =0; i<23; i++)                                                          \n' + '     {                                                                                  \n' + '       float R = E - e *sin(E);                                                         \n' + '       if (M > R)                                                                       \n' + '      \tE += scale;                                                                      \n' + '       else                                                                             \n' + '     \tE -= scale;                                                                      \n' + '       scale /= 2.0;                                                                    \n' + '     }                                                                                  \n' + '      E = E * F;                                                                        \n' + '                                                                                        \n' + '     float v = 2.0 * atan(sqrt((1.0 + e) / (1.0 -e )) * tan(E/2.0));                    \n' + '     float r = a * (1.0-e * cos(E));                                                    \n' + '                                                                                        \n' + '     vec4 pnt;                                                                          \n' + '     pnt.x = r * abc.x * sin(ABC.x + w + v);                                            \n' + '     pnt.z = r * abc.y * sin(ABC.y + w + v);                                            \n' + '     pnt.y = r * abc.z * sin(ABC.z + w + v);                                            \n' + '     pnt.w = 1.0;                                                                       \n' + '                                                                                        \n' + '     float dist = distance(pnt.xyz, cameraPosition.xyz);                                \n' + '     gl_Position = uPMatrix * uMVMatrix * pnt;                                          \n' + '     vColor.a = opacity * (1.0-(orbit.x));                                              \n' + '     vColor.r = Color.r;                                                                \n' + '     vColor.g = Color.g;                                                                \n' + '     vColor.b = Color.b;                                                                \n' + '     gl_PointSize = max(minSize, scaling * (PointSize / dist));                         \n' + ' }                                                                                      \n';
  KeplerPointSpriteShader._frag = gl.createShader(35632);
  gl.shaderSource(KeplerPointSpriteShader._frag, fragShaderText);
  gl.compileShader(KeplerPointSpriteShader._frag);
  const stat = gl.getShaderParameter(KeplerPointSpriteShader._frag, 35713);
  KeplerPointSpriteShader._vert = gl.createShader(35633);
  gl.shaderSource(KeplerPointSpriteShader._vert, vertexShaderText);
  gl.compileShader(KeplerPointSpriteShader._vert);
  const stat1 = gl.getShaderParameter(KeplerPointSpriteShader._vert, 35713);
  const compilationLog = gl.getShaderInfoLog(KeplerPointSpriteShader._vert);
  KeplerPointSpriteShader._prog = gl.createProgram();
  gl.attachShader(KeplerPointSpriteShader._prog, KeplerPointSpriteShader._vert);
  gl.attachShader(KeplerPointSpriteShader._prog, KeplerPointSpriteShader._frag);
  gl.linkProgram(KeplerPointSpriteShader._prog);
  const errcode = gl.getProgramParameter(KeplerPointSpriteShader._prog, 35714);
  gl.useProgram(KeplerPointSpriteShader._prog);
  KeplerPointSpriteShader.abcLoc1 = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'abc');
  KeplerPointSpriteShader.abcLoc = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'ABC');
  KeplerPointSpriteShader.pointSizeLoc = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'PointSize');
  KeplerPointSpriteShader.colorLoc = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'Color');
  KeplerPointSpriteShader.weLoc = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'we');
  KeplerPointSpriteShader.nTLoc = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'nT');
  KeplerPointSpriteShader.azLoc = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'az');
  KeplerPointSpriteShader.orbitLoc = gl.getAttribLocation(KeplerPointSpriteShader._prog, 'orbit');
  KeplerPointSpriteShader.projMatLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'uPMatrix');
  KeplerPointSpriteShader.mvMatLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'uMVMatrix');
  KeplerPointSpriteShader.jNowLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'jNow');
  KeplerPointSpriteShader.cameraPosLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'cameraPosition');
  KeplerPointSpriteShader.mmLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'MM');
  KeplerPointSpriteShader.scaleLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'scaling');
  KeplerPointSpriteShader.minSizeLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'minSize');
  KeplerPointSpriteShader.lineColorLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'lineColor');
  KeplerPointSpriteShader.opacityLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'opacity');
  KeplerPointSpriteShader.sampLoc = gl.getUniformLocation(KeplerPointSpriteShader._prog, 'uSampler');
  gl.enable(3042);
  KeplerPointSpriteShader.initialized = true;
};
KeplerPointSpriteShader.use = function(renderContext, worldView, vertex, texture, lineColor, opacity, zBuffer, jNow, MM, camera, scale, minSize) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!KeplerPointSpriteShader.initialized) {
      KeplerPointSpriteShader.init(renderContext);
    }
    gl.useProgram(KeplerPointSpriteShader._prog);
    gl.uniformMatrix4fv(KeplerPointSpriteShader.mvMatLoc, false, worldView.floatArray());
    gl.uniformMatrix4fv(KeplerPointSpriteShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform1i(KeplerPointSpriteShader.sampLoc, 0);
    gl.uniform1f(KeplerPointSpriteShader.jNowLoc, jNow);
    gl.uniform1f(KeplerPointSpriteShader.mmLoc, MM);
    gl.uniform4f(KeplerPointSpriteShader.lineColorLoc, lineColor.r / 255, lineColor.g / 255, lineColor.b / 255, lineColor.a / 255);
    gl.uniform1f(KeplerPointSpriteShader.opacityLoc, opacity);
    gl.uniform3f(KeplerPointSpriteShader.cameraPosLoc, camera.x, camera.y, camera.z);
    gl.uniform1f(KeplerPointSpriteShader.scaleLoc, scale);
    gl.uniform1f(KeplerPointSpriteShader.minSizeLoc, minSize);
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
    gl.enableVertexAttribArray(KeplerPointSpriteShader.abcLoc);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.abcLoc1);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.colorLoc);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.pointSizeLoc);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.weLoc);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.nTLoc);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.azLoc);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.orbitLoc);
    gl.enableVertexAttribArray(KeplerPointSpriteShader.weLoc);
    gl.vertexAttribPointer(KeplerPointSpriteShader.abcLoc, 3, 5126, false, 76, 0);
    gl.vertexAttribPointer(KeplerPointSpriteShader.abcLoc1, 3, 5126, false, 76, 12);
    gl.vertexAttribPointer(KeplerPointSpriteShader.pointSizeLoc, 1, 5126, false, 76, 24);
    gl.vertexAttribPointer(KeplerPointSpriteShader.colorLoc, 4, 5126, false, 76, 28);
    gl.vertexAttribPointer(KeplerPointSpriteShader.weLoc, 2, 5126, false, 76, 44);
    gl.vertexAttribPointer(KeplerPointSpriteShader.nTLoc, 2, 5126, false, 76, 52);
    gl.vertexAttribPointer(KeplerPointSpriteShader.azLoc, 2, 5126, false, 76, 60);
    gl.vertexAttribPointer(KeplerPointSpriteShader.orbitLoc, 2, 5126, false, 76, 68);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.lineWidth(1);
    gl.enable(3042);
    gl.blendFunc(770, 1);
  }
};
export const KeplerPointSpriteShader$ = {};

export function EllipseShader() {
}
EllipseShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = '    precision mediump float;                                                            \n' + '    varying lowp vec4 vColor;                                                           \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '        gl_FragColor = vColor;                                          \n' + '    }                                                                                   \n';
  const vertexShaderText = '    attribute vec3 Angle;                                                               \n' + '    uniform mat4 matWVP;                                                             \n' + '    uniform mat4 matPosition;                                                              \n' + '    uniform vec3 positionNow;                                                        \n' + '    uniform float semiMajorAxis;                                                                   \n' + '    uniform float eccentricity;                                                              \n' + '    uniform vec4 color;                                                             \n' + '    uniform float eccentricAnomaly;                                                              \n' + '    varying lowp vec4 vColor;                                                           \n' + '                                                                                        \n' + '    void main(void)                                                                     \n' + '    {                                                                                   \n' + '        float fade = (1.0 - Angle.x);                                                    \n' + '        float PI = 3.1415927;                                                          \n' + '        float E = eccentricAnomaly - Angle.x * 2.0 * PI;                                   \n' + '        vec2 semiAxes = vec2(1.0, sqrt(1.0 - eccentricity * eccentricity)) * semiMajorAxis;   \n' + '        vec2 planePos = semiAxes * vec2(cos(E) - eccentricity, sin(E));              \n' + '        if (Angle.x == 0.0)                                                         \n' + '           gl_Position =  matPosition * vec4(positionNow, 1.0);                                \n' + '        else                                                                           \n' + '           gl_Position = matWVP * vec4(planePos.x, planePos.y, 0.0, 1.0);              \n' + '        vColor = vec4(color.rgb, fade * color.a);                                      \n' + '    }                                                                                  \n';
  EllipseShader._frag = gl.createShader(35632);
  gl.shaderSource(EllipseShader._frag, fragShaderText);
  gl.compileShader(EllipseShader._frag);
  const stat = gl.getShaderParameter(EllipseShader._frag, 35713);
  EllipseShader._vert = gl.createShader(35633);
  gl.shaderSource(EllipseShader._vert, vertexShaderText);
  gl.compileShader(EllipseShader._vert);
  const stat1 = gl.getShaderParameter(EllipseShader._vert, 35713);
  const compilationLog = gl.getShaderInfoLog(EllipseShader._vert);
  EllipseShader._prog = gl.createProgram();
  gl.attachShader(EllipseShader._prog, EllipseShader._vert);
  gl.attachShader(EllipseShader._prog, EllipseShader._frag);
  gl.linkProgram(EllipseShader._prog);
  const errcode = gl.getProgramParameter(EllipseShader._prog, 35714);
  gl.useProgram(EllipseShader._prog);
  EllipseShader.angleLoc = gl.getAttribLocation(EllipseShader._prog, 'Angle');
  EllipseShader.matWVPLoc = gl.getUniformLocation(EllipseShader._prog, 'matWVP');
  EllipseShader.matPositionLoc = gl.getUniformLocation(EllipseShader._prog, 'matPosition');
  EllipseShader.positionNowLoc = gl.getUniformLocation(EllipseShader._prog, 'positionNow');
  EllipseShader.colorLoc = gl.getUniformLocation(EllipseShader._prog, 'color');
  EllipseShader.semiMajorAxisLoc = gl.getUniformLocation(EllipseShader._prog, 'semiMajorAxis');
  EllipseShader.eccentricityLoc = gl.getUniformLocation(EllipseShader._prog, 'eccentricity');
  EllipseShader.eccentricAnomalyLoc = gl.getUniformLocation(EllipseShader._prog, 'eccentricAnomaly');
  gl.enable(3042);
  EllipseShader.initialized = true;
};
EllipseShader.use = function(renderContext, semiMajorAxis, eccentricity, eccentricAnomaly, lineColor, opacity, world, positionNow) {
  const gl = renderContext.gl;
  if (gl != null) {
    if (!EllipseShader.initialized) {
      EllipseShader.init(renderContext);
    }
    gl.useProgram(EllipseShader._prog);
    const WVPPos = Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(world, renderContext.get_view()), renderContext.get_projection());
    const WVP = Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view()), renderContext.get_projection());
    gl.uniformMatrix4fv(EllipseShader.matWVPLoc, false, WVP.floatArray());
    gl.uniformMatrix4fv(EllipseShader.matPositionLoc, false, WVPPos.floatArray());
    gl.uniform3f(EllipseShader.positionNowLoc, positionNow.x, positionNow.y, positionNow.z);
    gl.uniform4f(EllipseShader.colorLoc, lineColor.r / 255, lineColor.g / 255, lineColor.b / 255, lineColor.a / 255);
    gl.uniform1f(EllipseShader.semiMajorAxisLoc, semiMajorAxis);
    gl.uniform1f(EllipseShader.eccentricityLoc, eccentricity);
    gl.uniform1f(EllipseShader.eccentricAnomalyLoc, eccentricAnomaly);
    gl.disable(2929);
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.enableVertexAttribArray(EllipseShader.angleLoc);
    gl.vertexAttribPointer(EllipseShader.angleLoc, 3, 5126, false, 0, 0);
    gl.lineWidth(1);
    gl.enable(3042);
    gl.blendFunc(770, 1);
  }
};
export const EllipseShader$ = {};

export function ModelShader() {
}
ModelShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                              \n' + '                                                                                       \n' + '   varying vec2 vTextureCoord;                                                         \n' + '   varying vec3 vNormal;                                                               \n' + '   varying vec3 vCamVector;                                                               \n' + '                                                                                       \n' + '   uniform sampler2D uSampler;                                                         \n' + '   uniform float opacity;                                                              \n' + '   uniform vec3 uSunPosition;                                                          \n' + '   uniform float uMinBrightness;                                                       \n' + '   uniform vec3 uAtmosphereColor;                                                       \n' + '                                                                                       \n' + '   void main(void) {                                                                   \n' + '     vec3 normal = normalize(vNormal);                                                 \n' + '     vec3 camVN = normalize(vCamVector);                                               \n' + '     vec3 cam = normalize(vec3(0.0,0.0,-1.0));                                                    \n' + '     float dt = uMinBrightness + pow(max(0.0,- dot(normal,uSunPosition)),0.5);                  \n' + '     float atm = max(0.0, 1.0 - 2.5 * dot(cam,camVN)) + 0.3 * dt;                             \n' + '     atm = (dt > uMinBrightness) ? atm : 0.0;                                          \n' + '     if ( uMinBrightness == 1.0 ) { dt = 1.0; atm= 0.0; }                                        \n' + '     vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));           \n' + '     gl_FragColor = col * opacity;                                                     \n' + '     gl_FragColor.rgb *= dt;                                                           \n' + '     gl_FragColor.rgb += atm * uAtmosphereColor;                                  \n' + '   }                                                                                   \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec3 aNormal;                                                     \n' + '     attribute vec2 aTextureCoord;                                                \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '     varying vec3 vNormal;                                                        \n' + '     varying vec3 vCamVector;                                                     \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vCamVector = normalize((mat3(uMVMatrix) * aVertexPosition).xyz);              \n' + '         vec3 normalT = normalize(mat3(uMVMatrix) * aNormal);                      \n' + '         vTextureCoord = aTextureCoord;                                           \n' + '         vNormal = normalT;                                                       \n' + '     }                                                                            \n' + '                                                                                  \n';
  ModelShader._frag = gl.createShader(35632);
  gl.shaderSource(ModelShader._frag, fragShaderText);
  gl.compileShader(ModelShader._frag);
  const stat = gl.getShaderParameter(ModelShader._frag, 35713);
  if (!stat) {
    const errorF = gl.getShaderInfoLog(ModelShader._frag);
  }
  ModelShader._vert = gl.createShader(35633);
  gl.shaderSource(ModelShader._vert, vertexShaderText);
  gl.compileShader(ModelShader._vert);
  const stat1 = gl.getShaderParameter(ModelShader._vert, 35713);
  if (!stat1) {
    const errorV = gl.getShaderInfoLog(ModelShader._vert);
  }
  ModelShader._prog = gl.createProgram();
  gl.attachShader(ModelShader._prog, ModelShader._vert);
  gl.attachShader(ModelShader._prog, ModelShader._frag);
  gl.linkProgram(ModelShader._prog);
  const errcode = gl.getProgramParameter(ModelShader._prog, 35714);
  gl.useProgram(ModelShader._prog);
  ModelShader.vertLoc = gl.getAttribLocation(ModelShader._prog, 'aVertexPosition');
  ModelShader.normalLoc = gl.getAttribLocation(ModelShader._prog, 'aNormal');
  ModelShader.textureLoc = gl.getAttribLocation(ModelShader._prog, 'aTextureCoord');
  ModelShader.projMatLoc = gl.getUniformLocation(ModelShader._prog, 'uPMatrix');
  ModelShader.mvMatLoc = gl.getUniformLocation(ModelShader._prog, 'uMVMatrix');
  ModelShader.sampLoc = gl.getUniformLocation(ModelShader._prog, 'uSampler');
  ModelShader.sunLoc = gl.getUniformLocation(ModelShader._prog, 'uSunPosition');
  ModelShader.minBrightnessLoc = gl.getUniformLocation(ModelShader._prog, 'uMinBrightness');
  ModelShader.opacityLoc = gl.getUniformLocation(ModelShader._prog, 'opacity');
  ModelShader.atmosphereColorLoc = gl.getUniformLocation(ModelShader._prog, 'uAtmosphereColor');
  Tile.uvMultiple = 1;
  Tile.demEnabled = true;
  gl.enable(3042);
  gl.blendFunc(770, 771);
  ModelShader.initialized = true;
};
ModelShader.use = function(renderContext, vertex, index, texture, opacity, noDepth, stride) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!ModelShader.initialized) {
      ModelShader.init(renderContext);
    }
    gl.useProgram(ModelShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniform1f(ModelShader.opacityLoc, opacity);
    gl.uniform1f(ModelShader.minBrightnessLoc, (renderContext.lighting) ? ModelShader.minLightingBrightness : 1);
    if (renderContext.lighting) {
      gl.uniform3f(ModelShader.atmosphereColorLoc, ModelShader.atmosphereColor.r / 255, ModelShader.atmosphereColor.g / 255, ModelShader.atmosphereColor.b / 255);
    }
    else {
      gl.uniform3f(ModelShader.atmosphereColorLoc, 0, 0, 0);
    }
    gl.uniformMatrix4fv(ModelShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(ModelShader.projMatLoc, false, renderContext.get_projection().floatArray());
    ModelShader.sunPosition.normalize();
    const mvInv = renderContext.get_view().clone();
    mvInv.set_m41(0);
    mvInv.set_m42(0);
    mvInv.set_m43(0);
    mvInv.set_m44(1);
    const sp = Vector3d._transformCoordinate(ModelShader.sunPosition, mvInv);
    sp.normalize();
    gl.uniform3f(ModelShader.sunLoc, sp.x, sp.y, sp.z);
    gl.uniform1i(ModelShader.sampLoc, 0);
    if (renderContext.space || noDepth) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(ModelShader.vertLoc);
    gl.enableVertexAttribArray(ModelShader.normalLoc);
    gl.enableVertexAttribArray(ModelShader.textureLoc);
    gl.vertexAttribPointer(ModelShader.vertLoc, 3, 5126, false, stride, 0);
    gl.vertexAttribPointer(ModelShader.normalLoc, 3, 5126, false, stride, 12);
    gl.vertexAttribPointer(ModelShader.textureLoc, 2, 5126, false, stride, stride - 8);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.bindBuffer(34963, index);
    gl.enable(3042);
    if (noDepth) {
      gl.blendFunc(770, 1);
    }
    else {
      gl.blendFunc(770, 771);
    }
  }
};
export const ModelShader$ = {};


export function ModelShaderTan() {
}
ModelShaderTan.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                              \n' + '                                                                                       \n' + '   varying vec2 vTextureCoord;                                                         \n' + '   varying vec3 vNormal;                                                               \n' + '   varying vec3 vCamVector;                                                               \n' + '                                                                                       \n' + '   uniform sampler2D uSampler;                                                         \n' + '   uniform float opacity;                                                              \n' + '   uniform vec3 uSunPosition;                                                          \n' + '   uniform float uMinBrightness;                                                       \n' + '   uniform vec3 uAtmosphereColor;                                                       \n' + '                                                                                       \n' + '   void main(void) {                                                                   \n' + '     vec3 normal = normalize(vNormal);                                                 \n' + '     vec3 camVN = normalize(vCamVector);                                               \n' + '     vec3 cam = normalize(vec3(0.0,0.0,-1.0));                                                    \n' + '     float dt = uMinBrightness + pow(max(0.0,- dot(normal,uSunPosition)),0.5);                  \n' + '     float atm = max(0.0, 1.0 - 2.5 * dot(cam,camVN)) + 0.3 * dt;                             \n' + '     atm = (dt > uMinBrightness) ? atm : 0.0;                                          \n' + '     if ( uMinBrightness == 1.0 ) { dt = 1.0; atm= 0.0; }                                        \n' + '     vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));           \n' + '     gl_FragColor = col * opacity;                                                     \n' + '     gl_FragColor.rgb *= dt;                                                           \n' + '     gl_FragColor.rgb += atm * uAtmosphereColor;                                  \n' + '   }                                                                                   \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec3 aNormal;                                                     \n' + '     attribute vec2 aTextureCoord;                                                \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '     varying vec3 vNormal;                                                        \n' + '     varying vec3 vCamVector;                                                     \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vCamVector = normalize((mat3(uMVMatrix) * aVertexPosition).xyz);              \n' + '         vec3 normalT = normalize(mat3(uMVMatrix) * aNormal);                      \n' + '         vTextureCoord = aTextureCoord;                                           \n' + '         vNormal = normalT;                                                       \n' + '     }                                                                            \n' + '                                                                                  \n';
  ModelShaderTan._frag = gl.createShader(35632);
  gl.shaderSource(ModelShaderTan._frag, fragShaderText);
  gl.compileShader(ModelShaderTan._frag);
  const stat = gl.getShaderParameter(ModelShaderTan._frag, 35713);
  if (!stat) {
    const errorF = gl.getShaderInfoLog(ModelShaderTan._frag);
  }
  ModelShaderTan._vert = gl.createShader(35633);
  gl.shaderSource(ModelShaderTan._vert, vertexShaderText);
  gl.compileShader(ModelShaderTan._vert);
  const stat1 = gl.getShaderParameter(ModelShaderTan._vert, 35713);
  if (!stat1) {
    const errorV = gl.getShaderInfoLog(ModelShaderTan._vert);
  }
  ModelShaderTan._prog = gl.createProgram();
  gl.attachShader(ModelShaderTan._prog, ModelShaderTan._vert);
  gl.attachShader(ModelShaderTan._prog, ModelShaderTan._frag);
  gl.linkProgram(ModelShaderTan._prog);
  const errcode = gl.getProgramParameter(ModelShaderTan._prog, 35714);
  gl.useProgram(ModelShaderTan._prog);
  ModelShaderTan.vertLoc = gl.getAttribLocation(ModelShaderTan._prog, 'aVertexPosition');
  ModelShaderTan.normalLoc = gl.getAttribLocation(ModelShaderTan._prog, 'aNormal');
  ModelShaderTan.textureLoc = gl.getAttribLocation(ModelShaderTan._prog, 'aTextureCoord');
  ModelShaderTan.projMatLoc = gl.getUniformLocation(ModelShaderTan._prog, 'uPMatrix');
  ModelShaderTan.mvMatLoc = gl.getUniformLocation(ModelShaderTan._prog, 'uMVMatrix');
  ModelShaderTan.sampLoc = gl.getUniformLocation(ModelShaderTan._prog, 'uSampler');
  ModelShaderTan.sunLoc = gl.getUniformLocation(ModelShaderTan._prog, 'uSunPosition');
  ModelShaderTan.minBrightnessLoc = gl.getUniformLocation(ModelShaderTan._prog, 'uMinBrightness');
  ModelShaderTan.opacityLoc = gl.getUniformLocation(ModelShaderTan._prog, 'opacity');
  ModelShaderTan.atmosphereColorLoc = gl.getUniformLocation(ModelShaderTan._prog, 'uAtmosphereColor');
  Tile.uvMultiple = 1;
  Tile.demEnabled = true;
  gl.enable(3042);
  gl.blendFunc(770, 771);
  ModelShaderTan.initialized = true;
};
ModelShaderTan.use = function(renderContext, vertex, index, texture, opacity, noDepth, stride) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!ModelShaderTan.initialized) {
      ModelShaderTan.init(renderContext);
    }
    gl.useProgram(ModelShaderTan._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniform1f(ModelShaderTan.opacityLoc, opacity);
    gl.uniform1f(ModelShaderTan.minBrightnessLoc, (renderContext.lighting) ? ModelShaderTan.minLightingBrightness : 1);
    if (renderContext.lighting) {
      gl.uniform3f(ModelShaderTan.atmosphereColorLoc, ModelShaderTan.atmosphereColor.r / 255, ModelShaderTan.atmosphereColor.g / 255, ModelShaderTan.atmosphereColor.b / 255);
    }
    else {
      gl.uniform3f(ModelShaderTan.atmosphereColorLoc, 0, 0, 0);
    }
    gl.uniformMatrix4fv(ModelShaderTan.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(ModelShaderTan.projMatLoc, false, renderContext.get_projection().floatArray());
    ModelShaderTan.sunPosition.normalize();
    const mvInv = renderContext.get_view().clone();
    mvInv.set_m41(0);
    mvInv.set_m42(0);
    mvInv.set_m43(0);
    mvInv.set_m44(1);
    const sp = Vector3d._transformCoordinate(ModelShaderTan.sunPosition, mvInv);
    sp.normalize();
    gl.uniform3f(ModelShaderTan.sunLoc, -sp.x, -sp.y, -sp.z);
    gl.uniform1i(ModelShaderTan.sampLoc, 0);
    if (renderContext.space || noDepth) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(ModelShaderTan.vertLoc);
    gl.enableVertexAttribArray(ModelShaderTan.normalLoc);
    gl.enableVertexAttribArray(ModelShaderTan.textureLoc);
    gl.vertexAttribPointer(ModelShaderTan.vertLoc, 3, 5126, false, stride, 0);
    gl.vertexAttribPointer(ModelShaderTan.normalLoc, 3, 5126, false, stride, 12);
    gl.vertexAttribPointer(ModelShaderTan.textureLoc, 2, 5126, false, stride, stride - 8);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.bindBuffer(34963, index);
    gl.enable(3042);
    if (noDepth) {
      gl.blendFunc(770, 1);
    }
    else {
      gl.blendFunc(770, 771);
    }
  }
};
export const ModelShaderTan$ = {};

export function ImageShader() {
}
ImageShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                              \n' + '                                                                                       \n' + '   varying vec2 vTextureCoord;                                                         \n' + '                                                                                       \n' + '   uniform sampler2D uSampler;                                                         \n' + '   uniform float opacity;                                                              \n' + '                                                                                       \n' + '   void main(void) {                                                                   \n' + '     vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));           \n' + '     gl_FragColor = col * opacity;                                                     \n' + '   }                                                                                   \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec2 aTextureCoord;                                                \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '     varying vec3 vNormal;                                                        \n' + '     varying vec3 vCamVector;                                                     \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vTextureCoord = aTextureCoord;                                           \n' + '     }                                                                            \n' + '                                                                                  \n';
  ImageShader._frag = gl.createShader(35632);
  gl.shaderSource(ImageShader._frag, fragShaderText);
  gl.compileShader(ImageShader._frag);
  const stat = gl.getShaderParameter(ImageShader._frag, 35713);
  if (!stat) {
    const errorF = gl.getShaderInfoLog(ImageShader._frag);
  }
  ImageShader._vert = gl.createShader(35633);
  gl.shaderSource(ImageShader._vert, vertexShaderText);
  gl.compileShader(ImageShader._vert);
  const stat1 = gl.getShaderParameter(ImageShader._vert, 35713);
  if (!stat1) {
    const errorV = gl.getShaderInfoLog(ImageShader._vert);
  }
  ImageShader._prog = gl.createProgram();
  gl.attachShader(ImageShader._prog, ImageShader._vert);
  gl.attachShader(ImageShader._prog, ImageShader._frag);
  gl.linkProgram(ImageShader._prog);
  const errcode = gl.getProgramParameter(ImageShader._prog, 35714);
  gl.useProgram(ImageShader._prog);
  ImageShader.vertLoc = gl.getAttribLocation(ImageShader._prog, 'aVertexPosition');
  ImageShader.textureLoc = gl.getAttribLocation(ImageShader._prog, 'aTextureCoord');
  ImageShader.projMatLoc = gl.getUniformLocation(ImageShader._prog, 'uPMatrix');
  ImageShader.mvMatLoc = gl.getUniformLocation(ImageShader._prog, 'uMVMatrix');
  ImageShader.sampLoc = gl.getUniformLocation(ImageShader._prog, 'uSampler');
  ImageShader.opacityLoc = gl.getUniformLocation(ImageShader._prog, 'opacity');
  Tile.uvMultiple = 1;
  Tile.demEnabled = true;
  gl.enable(3042);
  gl.blendFunc(770, 771);
  ImageShader.initialized = true;
};
ImageShader.use = function(renderContext, vertex, index, texture, opacity, noDepth) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!ImageShader.initialized) {
      ImageShader.init(renderContext);
    }
    gl.useProgram(ImageShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniform1f(ImageShader.opacityLoc, opacity);
    gl.uniformMatrix4fv(ImageShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(ImageShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform1i(ImageShader.sampLoc, 0);
    if (renderContext.space || noDepth) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(ImageShader.vertLoc);
    gl.enableVertexAttribArray(ImageShader.textureLoc);
    gl.vertexAttribPointer(ImageShader.vertLoc, 3, 5126, false, 20, 0);
    gl.vertexAttribPointer(ImageShader.textureLoc, 2, 5126, false, 20, 12);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.bindBuffer(34963, index);
    gl.enable(3042);
    if (noDepth) {
      gl.blendFunc(770, 1);
    }
    else {
      gl.blendFunc(770, 771);
    }
  }
};
export const ImageShader$ = {};

export function ImageShader2() {
}
ImageShader2.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                              \n' + '                                                                                       \n' + '   varying vec2 vTextureCoord;                                                         \n' + '                                                                                       \n' + '   uniform sampler2D uSampler;                                                         \n' + '   uniform float opacity;                                                              \n' + '                                                                                       \n' + '   void main(void) {                                                                   \n' + '     vec4 col = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));           \n' + '     gl_FragColor = col * opacity;                                                     \n' + '   }                                                                                   \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec2 aTextureCoord;                                                \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '     varying vec3 vNormal;                                                        \n' + '     varying vec3 vCamVector;                                                     \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vTextureCoord = aTextureCoord;                                           \n' + '     }                                                                            \n' + '                                                                                  \n';
  ImageShader2._frag = gl.createShader(35632);
  gl.shaderSource(ImageShader2._frag, fragShaderText);
  gl.compileShader(ImageShader2._frag);
  const stat = gl.getShaderParameter(ImageShader2._frag, 35713);
  if (!stat) {
    const errorF = gl.getShaderInfoLog(ImageShader2._frag);
  }
  ImageShader2._vert = gl.createShader(35633);
  gl.shaderSource(ImageShader2._vert, vertexShaderText);
  gl.compileShader(ImageShader2._vert);
  const stat1 = gl.getShaderParameter(ImageShader2._vert, 35713);
  if (!stat1) {
    const errorV = gl.getShaderInfoLog(ImageShader2._vert);
  }
  ImageShader2._prog = gl.createProgram();
  gl.attachShader(ImageShader2._prog, ImageShader2._vert);
  gl.attachShader(ImageShader2._prog, ImageShader2._frag);
  gl.linkProgram(ImageShader2._prog);
  const errcode = gl.getProgramParameter(ImageShader2._prog, 35714);
  gl.useProgram(ImageShader2._prog);
  ImageShader2.vertLoc = gl.getAttribLocation(ImageShader2._prog, 'aVertexPosition');
  ImageShader2.textureLoc = gl.getAttribLocation(ImageShader2._prog, 'aTextureCoord');
  ImageShader2.projMatLoc = gl.getUniformLocation(ImageShader2._prog, 'uPMatrix');
  ImageShader2.mvMatLoc = gl.getUniformLocation(ImageShader2._prog, 'uMVMatrix');
  ImageShader2.sampLoc = gl.getUniformLocation(ImageShader2._prog, 'uSampler');
  ImageShader2.opacityLoc = gl.getUniformLocation(ImageShader2._prog, 'opacity');
  Tile.uvMultiple = 1;
  Tile.demEnabled = true;
  gl.enable(3042);
  gl.blendFunc(770, 771);
  ImageShader2.initialized = true;
};
ImageShader2.use = function(renderContext, vertex, index, texture, opacity, noDepth) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!ImageShader2.initialized) {
      ImageShader2.init(renderContext);
    }
    gl.useProgram(ImageShader2._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniform1f(ImageShader2.opacityLoc, opacity);
    gl.uniformMatrix4fv(ImageShader2.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(ImageShader2.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform1i(ImageShader2.sampLoc, 0);
    if (renderContext.space || noDepth) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(ImageShader2.vertLoc);
    gl.enableVertexAttribArray(ImageShader2.textureLoc);
    gl.vertexAttribPointer(ImageShader2.vertLoc, 3, 5126, false, 32, 0);
    gl.vertexAttribPointer(ImageShader2.textureLoc, 2, 5126, false, 32, 24);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.bindBuffer(34963, index);
    gl.enable(3042);
    if (noDepth) {
      gl.blendFunc(770, 1);
    }
    else {
      gl.blendFunc(770, 771);
    }
  }
};
export const ImageShader2$ = {};

export function ShapeSpriteShader() {
}
ShapeSpriteShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                                \n' + '                                                                                         \n' + '   varying lowp vec4 vColor;                                                             \n' + '                                                                                         \n' + '   void main(void) {                                                                     \n' + '   gl_FragColor =  vColor;                                                               \n' + '   }                                                                                     \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute lowp vec4 aColor;                                                  \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '     varying vec4 vColor;                                                         \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vColor = aColor;                                                         \n' + '     }                                                                            \n' + '                                                                                  \n';
  ShapeSpriteShader._frag = gl.createShader(35632);
  gl.shaderSource(ShapeSpriteShader._frag, fragShaderText);
  gl.compileShader(ShapeSpriteShader._frag);
  const stat = gl.getShaderParameter(ShapeSpriteShader._frag, 35713);
  ShapeSpriteShader._vert = gl.createShader(35633);
  gl.shaderSource(ShapeSpriteShader._vert, vertexShaderText);
  gl.compileShader(ShapeSpriteShader._vert);
  const stat1 = gl.getShaderParameter(ShapeSpriteShader._vert, 35713);
  ShapeSpriteShader._prog = gl.createProgram();
  gl.attachShader(ShapeSpriteShader._prog, ShapeSpriteShader._vert);
  gl.attachShader(ShapeSpriteShader._prog, ShapeSpriteShader._frag);
  gl.linkProgram(ShapeSpriteShader._prog);
  const errcode = gl.getProgramParameter(ShapeSpriteShader._prog, 35714);
  gl.useProgram(ShapeSpriteShader._prog);
  ShapeSpriteShader.vertLoc = gl.getAttribLocation(ShapeSpriteShader._prog, 'aVertexPosition');
  ShapeSpriteShader.colorLoc = gl.getAttribLocation(ShapeSpriteShader._prog, 'aColor');
  ShapeSpriteShader.projMatLoc = gl.getUniformLocation(ShapeSpriteShader._prog, 'uPMatrix');
  ShapeSpriteShader.mvMatLoc = gl.getUniformLocation(ShapeSpriteShader._prog, 'uMVMatrix');
  gl.disable(2929);
  gl.enable(3042);
  gl.blendFunc(770, 771);
  ShapeSpriteShader.initialized = true;
};
ShapeSpriteShader.use = function(renderContext, vertex) {
  const gl = renderContext.gl;
  if (gl != null) {
    if (!ShapeSpriteShader.initialized) {
      ShapeSpriteShader.init(renderContext);
    }
    gl.useProgram(ShapeSpriteShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniformMatrix4fv(ShapeSpriteShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(ShapeSpriteShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform1i(ShapeSpriteShader.sampLoc, 0);
    gl.disable(2929);
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(ShapeSpriteShader.vertLoc);
    gl.enableVertexAttribArray(ShapeSpriteShader.textureLoc);
    gl.enableVertexAttribArray(ShapeSpriteShader.colorLoc);
    gl.vertexAttribPointer(ShapeSpriteShader.vertLoc, 3, 5126, false, 36, 0);
    gl.vertexAttribPointer(ShapeSpriteShader.colorLoc, 4, 5126, false, 36, 12);
    gl.bindBuffer(34963, null);
    gl.enable(3042);
    gl.blendFunc(770, 771);
  }
};
export const ShapeSpriteShader$ = {};

export function TextShader() {
}
TextShader.init = function(renderContext) {
  const gl = renderContext.gl;
  const fragShaderText = ' precision mediump float;                                                              \n' + '                                                                                       \n' + '   varying vec2 vTextureCoord;                                                         \n' + '                                                                                       \n' + '   uniform sampler2D uSampler;                                                         \n' + '                                                                                       \n' + '   void main(void) {                                                                   \n' + '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));         \n' + '   }                                                                                   \n';
  const vertexShaderText = '     attribute vec3 aVertexPosition;                                              \n' + '     attribute vec2 aTextureCoord;                                                \n' + '                                                                                  \n' + '     uniform mat4 uMVMatrix;                                                      \n' + '     uniform mat4 uPMatrix;                                                       \n' + '                                                                                  \n' + '     varying vec2 vTextureCoord;                                                  \n' + '                                                                                  \n' + '                                                                                  \n' + '     void main(void) {                                                            \n' + '         gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);         \n' + '         vTextureCoord = aTextureCoord;                                           \n' + '     }                                                                            \n' + '                                                                                  \n';
  TextShader._frag = gl.createShader(35632);
  gl.shaderSource(TextShader._frag, fragShaderText);
  gl.compileShader(TextShader._frag);
  const stat = gl.getShaderParameter(TextShader._frag, 35713);
  TextShader._vert = gl.createShader(35633);
  gl.shaderSource(TextShader._vert, vertexShaderText);
  gl.compileShader(TextShader._vert);
  const stat1 = gl.getShaderParameter(TextShader._vert, 35713);
  TextShader._prog = gl.createProgram();
  gl.attachShader(TextShader._prog, TextShader._vert);
  gl.attachShader(TextShader._prog, TextShader._frag);
  gl.linkProgram(TextShader._prog);
  const errcode = gl.getProgramParameter(TextShader._prog, 35714);
  gl.useProgram(TextShader._prog);
  TextShader.vertLoc = gl.getAttribLocation(TextShader._prog, 'aVertexPosition');
  TextShader.textureLoc = gl.getAttribLocation(TextShader._prog, 'aTextureCoord');
  TextShader.projMatLoc = gl.getUniformLocation(TextShader._prog, 'uPMatrix');
  TextShader.mvMatLoc = gl.getUniformLocation(TextShader._prog, 'uMVMatrix');
  TextShader.sampLoc = gl.getUniformLocation(TextShader._prog, 'uSampler');
  Tile.uvMultiple = 1;
  Tile.demEnabled = true;
  gl.enable(3042);
  gl.blendFunc(770, 771);
  TextShader.initialized = true;
};
TextShader.use = function(renderContext, vertex, texture) {
  if (texture == null) {
    texture = Texture.getEmpty();
  }
  const gl = renderContext.gl;
  if (gl != null) {
    if (!TextShader.initialized) {
      TextShader.init(renderContext);
    }
    gl.useProgram(TextShader._prog);
    const mvMat = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    gl.uniformMatrix4fv(TextShader.mvMatLoc, false, mvMat.floatArray());
    gl.uniformMatrix4fv(TextShader.projMatLoc, false, renderContext.get_projection().floatArray());
    gl.uniform1i(TextShader.sampLoc, 0);
    if (renderContext.space) {
      gl.disable(2929);
    }
    else {
      gl.enable(2929);
    }
    gl.disableVertexAttribArray(0);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.disableVertexAttribArray(3);
    gl.bindBuffer(34962, vertex);
    gl.enableVertexAttribArray(TextShader.vertLoc);
    gl.enableVertexAttribArray(TextShader.textureLoc);
    gl.vertexAttribPointer(TextShader.vertLoc, 3, 5126, false, 20, 0);
    gl.vertexAttribPointer(TextShader.textureLoc, 2, 5126, false, 20, 12);
    gl.activeTexture(33984);
    gl.bindTexture(3553, texture);
    gl.enable(3042);
    gl.blendFunc(770, 771);
  }
};
export const TextShader$ = {};

