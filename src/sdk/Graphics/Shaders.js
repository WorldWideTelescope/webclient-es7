// wwtlib.TileShader

import {Tile} from '../Tile';
import {Texture} from '../Texture';
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