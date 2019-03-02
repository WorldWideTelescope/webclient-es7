
// wwtlib.Object3d

import {Color, Colors} from '../Color';
import ss from '../scriptsharp/ss';
import {
  ConvexHull,
  Matrix3d,
  PositionNormalTextured,
  PositionNormalTexturedTangent,
  SphereHull,
  Vector2d,
  Vector3d
} from '../Double3d';
import {Settings} from '../settings';
import {Layer} from './Layer';
import {IUiController} from '../interface';
import {Planets} from '../Planets';
import {WWTControl} from '../WWTControl';
import {
  IndexBuffer,
  PositionNormalTexturedTangentVertexBuffer,
  PositionNormalTexturedVertexBuffer
} from '../Graphics/GIBuffer';
import {Dates, LineList, TriangleList} from '../Graphics/Primative3d';
import {ModelShader} from '../Graphics/Shaders';
import {BinaryReader} from '../Utilities/BinaryReader';
import {Object3dLayerUI} from './LayerUI';
import {Material} from '../RenderContext';

export class Object3dLayer extends Layer{
  constructor(){
    super();
    this._primaryUI$1 = null;
    this._heading$1 = 0;
    this._flipV$1 = true;
    this._flipHandedness$1 = false;
    this._smooth$1 = true;
    this._twoSidedGeometry$1 = false;
    this._pitch$1 = 0;
    this._roll$1 = 0;
    this._scale$1 = new Vector3d(1, 1, 1);
    this._translate$1 = new Vector3d(0, 0, 0);
    this._lightID$1 = 0;
    this._dirty$1 = false;
    this.objType = false;
    this._xHandle$1 = new Vector2d();
    this._yHandle$1 = new Vector2d();
    this._zHandle$1 = new Vector2d();
    this._hprHandles$1 = new Array(6);
    this._uiScale$1 = 1;
    this._showEditUi$1 = false;
    this._dragMode$1 = 0;
    this._pntDown$1 = new Vector2d();
    this._valueOnDown$1 = 0;
    this._valueOnDown2$1 = 0;
    this._hitDist$1 = 20;
    this._lockPreferedAxis$1 = false;
    this._preferY$1 = false;
  }
  static _initTranslateUI$1 () {
    Object3dLayer._translateUILines$1 = new LineList();
    Object3dLayer._translateUILines$1.timeSeries = false;
    Object3dLayer._translateUILines$1.set_depthBuffered(false);
    Object3dLayer._translateUILines$1.showFarSide = true;
    Object3dLayer._translateUI$1 = new TriangleList();
    Object3dLayer._translateUI$1.depthBuffered = false;
    Object3dLayer._translateUI$1.timeSeries = false;
    Object3dLayer._translateUI$1.writeZbuffer = false;
    const twoPi = Math.PI * 2;
    const step = twoPi / 45;
    const rad = 0.05;
    let a,pnt1,pnt2,pnt3;
    for (a = 0; a < twoPi; a += step) {
      pnt1 = new Vector3d(1 - rad * 4, 0, 0);
      pnt2 = new Vector3d(1 - rad * 4, Math.cos(a) * rad, Math.sin(a) * rad);
      pnt3 = new Vector3d(1 - rad * 4, Math.cos(a + step) * rad, Math.sin(a + step) * rad);
      Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Colors.get_red(), Dates.empty());
    }
    for (a = 0; a < twoPi; a += step) {
      pnt1 = new Vector3d(1, 0, 0);
      pnt3 = new Vector3d(1 - rad * 4, Math.cos(a) * rad, Math.sin(a) * rad);
      pnt2 = new Vector3d(1 - rad * 4, Math.cos(a + step) * rad, Math.sin(a + step) * rad);
      Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Color.fromArgb(255, 255, Math.max(0, (Math.sin(a) * 128)), Math.max(0, (Math.sin(a) * 128))), Dates.empty());
    }
    Object3dLayer._translateUILines$1.addLine(new Vector3d(0, 0, 0), new Vector3d(1, 0, 0), Colors.get_red(), Dates.empty());
    for (a = 0; a < twoPi; a += step) {
      pnt1 = new Vector3d(0, 1 - rad * 4, 0);
      pnt3 = new Vector3d(Math.cos(a) * rad, 1 - rad * 4, Math.sin(a) * rad);
      pnt2 = new Vector3d(Math.cos(a + step) * rad, 1 - rad * 4, Math.sin(a + step) * rad);
      Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Colors.get_green(), Dates.empty());
    }
    for (a = 0; a < twoPi; a += step) {
      pnt1 = new Vector3d(0, 1, 0);
      pnt2 = new Vector3d(Math.cos(a) * rad, 1 - rad * 4, Math.sin(a) * rad);
      pnt3 = new Vector3d(Math.cos(a + step) * rad, 1 - rad * 4, Math.sin(a + step) * rad);
      Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Color.fromArgb(255, Math.max(0, (Math.sin(a) * 128)), 255, Math.max(0, (Math.sin(a) * 128))), Dates.empty());
    }
    Object3dLayer._translateUILines$1.addLine(new Vector3d(0, 0, 0), new Vector3d(0, 1, 0), Colors.get_green(), Dates.empty());
    for (a = 0; a < twoPi; a += step) {
      pnt1 = new Vector3d(0, 0, 1 - rad * 4);
      pnt2 = new Vector3d(Math.cos(a) * rad, Math.sin(a) * rad, 1 - rad * 4);
      pnt3 = new Vector3d(Math.cos(a + step) * rad, Math.sin(a + step) * rad, 1 - rad * 4);
      Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Colors.get_blue(), Dates.empty());
    }
    for (a = 0; a < twoPi; a += step) {
      pnt1 = new Vector3d(0, 0, 1);
      pnt3 = new Vector3d(Math.cos(a) * rad, Math.sin(a) * rad, 1 - rad * 4);
      pnt2 = new Vector3d(Math.cos(a + step) * rad, Math.sin(a + step) * rad, 1 - rad * 4);
      Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Color.fromArgb(255, Math.max(0, (Math.sin(a) * 128)), Math.max(0, (Math.sin(a) * 128)), 255), Dates.empty());
    }
    Object3dLayer._translateUILines$1.addLine(new Vector3d(0, 0, 0), new Vector3d(0, 0, 1), Colors.get_blue(), Dates.empty());
    Object3dLayer._initRotateUI$1();
    Object3dLayer._initScaleUI$1();
  }
  static _initScaleUI$1() {
    Object3dLayer._scaleUI$1 = new TriangleList();
    Object3dLayer._scaleUI$1.depthBuffered = false;
    Object3dLayer._scaleUI$1.timeSeries = false;
    Object3dLayer._scaleUI$1.writeZbuffer = false;
    const twoPi = Math.PI * 2;
    const step = twoPi / 45;
    const rad = 0.05;
    Object3dLayer._makeCube$1(Object3dLayer._scaleUI$1, new Vector3d(1 - rad * 2, 0, 0), rad * 2, Colors.get_red());
    Object3dLayer._makeCube$1(Object3dLayer._scaleUI$1, new Vector3d(0, 1 - rad * 2, 0), rad * 2, Colors.get_green());
    Object3dLayer._makeCube$1(Object3dLayer._scaleUI$1, new Vector3d(0, 0, 1 - rad * 2), rad * 2, Colors.get_blue());
  }
  static _makeCube$1 (tl, center, size, color) {
    const dark = Color.fromArgb(255, ss.truncate((color.r * 0.6)), color.g, ss.truncate((color.b * 0.6)));
    const med = Color.fromArgb(255, ss.truncate((color.r * 0.8)), ss.truncate((color.g * 0.8)), ss.truncate((color.b * 0.8)));
    tl.addQuad(new Vector3d(center.x + size, center.y + size, center.z + size), new Vector3d(center.x + size, center.y + size, center.z - size), new Vector3d(center.x - size, center.y + size, center.z + size), new Vector3d(center.x - size, center.y + size, center.z - size), color, Dates.empty());
    tl.addQuad(new Vector3d(center.x + size, center.y - size, center.z + size), new Vector3d(center.x - size, center.y - size, center.z + size), new Vector3d(center.x + size, center.y - size, center.z - size), new Vector3d(center.x - size, center.y - size, center.z - size), color, Dates.empty());
    tl.addQuad(new Vector3d(center.x - size, center.y + size, center.z + size), new Vector3d(center.x - size, center.y + size, center.z - size), new Vector3d(center.x - size, center.y - size, center.z + size), new Vector3d(center.x - size, center.y - size, center.z - size), dark, Dates.empty());
    tl.addQuad(new Vector3d(center.x + size, center.y + size, center.z + size), new Vector3d(center.x + size, center.y - size, center.z + size), new Vector3d(center.x + size, center.y + size, center.z - size), new Vector3d(center.x + size, center.y - size, center.z - size), dark, Dates.empty());
    tl.addQuad(new Vector3d(center.x + size, center.y + size, center.z + size), new Vector3d(center.x - size, center.y + size, center.z + size), new Vector3d(center.x + size, center.y - size, center.z + size), new Vector3d(center.x - size, center.y - size, center.z + size), med, Dates.empty());
    tl.addQuad(new Vector3d(center.x + size, center.y + size, center.z - size), new Vector3d(center.x + size, center.y - size, center.z - size), new Vector3d(center.x - size, center.y + size, center.z - size), new Vector3d(center.x - size, center.y - size, center.z - size), med, Dates.empty());
  }
  static _initRotateUI$1 () {
    Object3dLayer._rotateUi$1 = new TriangleList();
    Object3dLayer._rotateUi$1.depthBuffered = false;
    Object3dLayer._rotateUi$1.timeSeries = false;
    Object3dLayer._rotateUi$1.writeZbuffer = false;
    const twoPi = Math.PI * 2;
    const step = twoPi / 40;
    const rad = 0.05;
    let index = 0;
    let a,start,end,pnt1,pnt2,pnt3,pnt4;
    for (a = 0; a < twoPi; a += step) {
      start = !(index % 10);
      end = !((index + 1) % 10);
      pnt1 = new Vector3d(rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
      pnt2 = new Vector3d(-rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
      pnt3 = new Vector3d(rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
      pnt4 = new Vector3d(-rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
      Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Color._fromArgbColor(192, Colors.get_red()), Dates.empty());
      index++;
    }
    index = 0;
    for (a = 0; a < twoPi; a += step) {
      start = !(index % 10);
      end = !((index + 1) % 10);
      pnt1 = new Vector3d(Math.cos(a), Math.sin(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
      pnt2 = new Vector3d(Math.cos(a), Math.sin(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
      pnt3 = new Vector3d(Math.cos(a + step), Math.sin(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
      pnt4 = new Vector3d(Math.cos(a + step), Math.sin(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
      Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Color._fromArgbColor(192, Colors.get_blue()), Dates.empty());
      index++;
    }
    index = 0;
    for (a = 0; a < twoPi; a += step) {
      start = !(index % 10);
      end = !((index + 1) % 10);
      pnt1 = new Vector3d(Math.cos(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
      pnt2 = new Vector3d(Math.cos(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
      pnt3 = new Vector3d(Math.cos(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
      pnt4 = new Vector3d(Math.cos(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
      Object3dLayer._rotateUi$1.addQuad(pnt1, pnt2, pnt3, pnt4, Color._fromArgbColor(192, Colors.get_green()), Dates.empty());
      index++;
    }
    index = 0;
    for (a = 0; a < twoPi; a += step) {
      start = !(index % 10);
      end = !((index + 1) % 10);
      pnt1 = new Vector3d(-rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
      pnt2 = new Vector3d(rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
      pnt3 = new Vector3d(-rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
      pnt4 = new Vector3d(rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
      Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Colors.get_red(), Dates.empty());
      index++;
    }
    index = 0;
    for (a = 0; a < twoPi; a += step) {
      start = !(index % 10);
      end = !((index + 1) % 10);
      pnt1 = new Vector3d(Math.cos(a), Math.sin(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
      pnt2 = new Vector3d(Math.cos(a), Math.sin(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
      pnt3 = new Vector3d(Math.cos(a + step), Math.sin(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
      pnt4 = new Vector3d(Math.cos(a + step), Math.sin(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
      Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Colors.get_blue(), Dates.empty());
      index++;
    }
    index = 0;
    for (a = 0; a < twoPi; a += step) {
      start = !(index % 10);
      end = !((index + 1) % 10);
      pnt1 = new Vector3d(Math.cos(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
      pnt2 = new Vector3d(Math.cos(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
      pnt3 = new Vector3d(Math.cos(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
      pnt4 = new Vector3d(Math.cos(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
      Object3dLayer._rotateUi$1.addQuad(pnt1, pnt2, pnt3, pnt4, Colors.get_green(), Dates.empty());
      index++;
    }
  }
  getPrimaryUI() {
    if (this._primaryUI$1 == null) {
      this._primaryUI$1 = new Object3dLayerUI(this);
    }
    return this._primaryUI$1;
  }
  get_flipV() {
    return this._flipV$1;
  }
  set_flipV(value) {
    if (this._flipV$1 !== value) {
      this._flipV$1 = value;
      if (this.object3d != null) {
        this.object3d.flipV = this._flipV$1;
        this.object3d._reload();
      }
      this.version++;
    }
    return value;
  }
  get_flipHandedness() {
    return this._flipHandedness$1;
  }
  set_flipHandedness(value) {
    if (this._flipHandedness$1 !== value) {
      this._flipHandedness$1 = value;
      if (this.object3d != null) {
        this.object3d.flipHandedness = this._flipHandedness$1;
        this.object3d._reload();
      }
      this.version++;
    }
    return value;
  }
  get_smooth() {
    return this._smooth$1;
  }
  set_smooth(value) {
    if (this._smooth$1 !== value) {
      this._smooth$1 = value;
      if (this.object3d != null) {
        this.object3d.smooth = this._smooth$1;
        this.object3d._reload();
      }
      this.version++;
    }
    return value;
  }
  get_twoSidedGeometry() {
    return this._twoSidedGeometry$1;
  }
  set_twoSidedGeometry(value) {
    if (this._twoSidedGeometry$1 !== value) {
      this._twoSidedGeometry$1 = value;
      this.version++;
    }
    return value;
  }
  get_heading() {
    return this._heading$1;
  }
  set_heading(value) {
    if (this._heading$1 !== value) {
      this.version++;
      this._heading$1 = value;
    }
    return value;
  }
  get_pitch() {
    return this._pitch$1;
  }
  set_pitch(value) {
    if (this._pitch$1 !== value) {
      this.version++;
      this._pitch$1 = value;
    }
    return value;
  }
  get_roll() {
    return this._roll$1;
  }
  set_roll(value) {
    if (this._roll$1 !== value) {
      this.version++;
      this._roll$1 = value;
    }
    return value;
  }
  get_scale() {
    return this._scale$1;
  }
  set_scale(value) {
    if (this._scale$1 !== value) {
      this.version++;
      this._scale$1 = value;
    }
    return value;
  }
  get_translate() {
    return this._translate$1;
  }
  set_translate(value) {
    if (this._translate$1 !== value) {
      this.version++;
      this._translate$1 = value;
    }
    return value;
  }
  get_lightID() {
    return this._lightID$1;
  }
  set_lightID(value) {
    this._lightID$1 = value;
    return value;
  }
  cleanUp() {
    this._dirty$1 = true;
  }
  colorChanged() {
    if (this.object3d != null) {
      this.object3d.color = this.get_color();
    }
  }
  writeLayerProperties(xmlWriter) {
    xmlWriter._writeAttributeString('FlipV', this.get_flipV().toString());
    xmlWriter._writeAttributeString('FlipHandedness', this.get_flipHandedness().toString());
    xmlWriter._writeAttributeString('Smooth', this.get_smooth().toString());
    xmlWriter._writeAttributeString('TwoSidedGeometry', this.get_twoSidedGeometry().toString());
    xmlWriter._writeAttributeString('Heading', this.get_heading().toString());
    xmlWriter._writeAttributeString('Pitch', this.get_pitch().toString());
    xmlWriter._writeAttributeString('Roll', this.get_roll().toString());
    xmlWriter._writeAttributeString('Scale', this.get_scale().toString());
    xmlWriter._writeAttributeString('Translate', this.get_translate().toString());
    xmlWriter._writeAttributeString('LightID', this.get_lightID().toString());
    xmlWriter._writeAttributeString('Obj', this.objType.toString());
  }
  getParams() {
    const paramList = new Array(14);
    paramList[0] = this._heading$1;
    paramList[1] = this._pitch$1;
    paramList[2] = this._roll$1;
    paramList[3] = this._scale$1.x;
    paramList[4] = this._scale$1.y;
    paramList[5] = this._scale$1.z;
    paramList[6] = this._translate$1.x;
    paramList[7] = this._translate$1.y;
    paramList[8] = this._translate$1.z;
    paramList[9] = this.get_color().r / 255;
    paramList[10] = this.get_color().g / 255;
    paramList[11] = this.get_color().b / 255;
    paramList[12] = this.get_color().a / 255;
    paramList[13] = this.get_opacity();
    return paramList;
  }
  getParamNames() {
    return ['Heading', 'Pitch', 'Roll', 'Scale.X', 'Scale.Y', 'Scale.Z', 'Translate.X', 'Translate.Y', 'Translate.Z', 'Colors.Red', 'Colors.Green', 'Colors.Blue', 'Colors.Alpha', 'Opacity'];
  }
  setParams(paramList) {
    if (paramList.length === 14) {
      this._heading$1 = paramList[0];
      this._pitch$1 = paramList[1];
      this._roll$1 = paramList[2];
      this._scale$1.x = paramList[3];
      this._scale$1.y = paramList[4];
      this._scale$1.z = paramList[5];
      this._translate$1.x = paramList[6];
      this._translate$1.y = paramList[7];
      this._translate$1.z = paramList[8];
      this.set_opacity(paramList[13]);
      const color = Color.fromArgb(ss.truncate((paramList[12] * 255)), ss.truncate((paramList[9] * 255)), ss.truncate((paramList[10] * 255)), ss.truncate((paramList[11] * 255)));
      this.set_color(color);
    }
  }
  add_propertiesChanged(value) {
    this.__propertiesChanged$1 = ss.bindAdd(this.__propertiesChanged$1, value);
  }
  remove_propertiesChanged(value) {
    this.__propertiesChanged$1 = ss.bindSub(this.__propertiesChanged$1, value);
  }
  fireChanged() {
    if (this.__propertiesChanged$1 != null) {
      this.__propertiesChanged$1(this, new EventArgs());
    }
  }
  getEditUI() {
    return ss.safeCast(this, IUiController);
  }
  initializeFromXml(node) {
    this.set_flipV(ss.boolean(node.attributes.getNamedItem('FlipV').nodeValue));
    if (node.attributes.getNamedItem('FlipHandedness') != null) {
      this.set_flipHandedness(ss.boolean(node.attributes.getNamedItem('FlipHandedness').nodeValue));
    } else {
      this.set_flipHandedness(false);
    }
    if (node.attributes.getNamedItem('Smooth') != null) {
      this.set_smooth(ss.boolean(node.attributes.getNamedItem('Smooth').nodeValue));
    } else {
      this.set_smooth(true);
    }
    if (node.attributes.getNamedItem('TwoSidedGeometry') != null) {
      this.set_twoSidedGeometry(ss.boolean(node.attributes.getNamedItem('TwoSidedGeometry').nodeValue));
    } else {
      this.set_twoSidedGeometry(false);
    }
    if (node.attributes.getNamedItem('Obj') != null) {
      this.objType = ss.boolean(node.attributes.getNamedItem('Obj').nodeValue);
    } else {
      this.objType = false;
    }
    this.set_heading(parseFloat(node.attributes.getNamedItem('Heading').nodeValue));
    this.set_pitch(parseFloat(node.attributes.getNamedItem('Pitch').nodeValue));
    this.set_roll(parseFloat(node.attributes.getNamedItem('Roll').nodeValue));
    this.set_scale(Vector3d.parse(node.attributes.getNamedItem('Scale').nodeValue));
    this.set_translate(Vector3d.parse(node.attributes.getNamedItem('Translate').nodeValue));
    if (node.attributes.getNamedItem('LightID') != null) {
      this.set_lightID(parseInt(node.attributes.getNamedItem('LightID').nodeValue));
    }
  }
  draw(renderContext, opacity, flat) {
    const oldWorld = renderContext.get_world();
    const rotation = Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d._rotationZ(-this._roll$1 / 180 * Math.PI), Matrix3d._rotationX(-this._pitch$1 / 180 * Math.PI)), Matrix3d._rotationY(this._heading$1 / 180 * Math.PI));
    renderContext.set_world(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(rotation, Matrix3d._scaling(this._scale$1.x, this._scale$1.y, this._scale$1.z)), Matrix3d.translation(this._translate$1)), oldWorld));
    renderContext.set_twoSidedLighting(this.get_twoSidedGeometry());
    Planets.drawPointPlanet(renderContext, new Vector3d(), 1, Colors.get_red(), false);
    if (this._lightID$1 > 0) {
    } else {
      if (this.object3d != null) {
        this.object3d.color = this.get_color();
        this.object3d.render(renderContext, opacity * this.get_opacity());
      }
    }
    renderContext.set_twoSidedLighting(false);
    renderContext.set_world(oldWorld);
    return true;
  }
  addFilesToCabinet(fc) {
  }
  loadData(doc, filename) {
    if (ss.endsWith(filename.toLowerCase(), '.obj')) {
      this.objType = true;
    }
    if (!this._lightID$1) {
      if (this.objType) {
        this.object3d = new Object3d(doc, ss.replaceString(filename, '.txt', '.obj'), this.get_flipV(), this._flipHandedness$1, true, this.get_color());
      } else {
        this.object3d = new Object3d(doc, ss.replaceString(filename, '.txt', '.3ds'), this.get_flipV(), this._flipHandedness$1, true, this.get_color());
      }
    }
  }
  static pointToView(pnt) {
    const clientHeight = WWTControl.singleton.renderContext.height;
    const clientWidth = WWTControl.singleton.renderContext.width;
    const viewWidth = (WWTControl.singleton.renderContext.width / WWTControl.singleton.renderContext.height) * 1116;
    const x = ((pnt.x) / (clientWidth) * viewWidth) - ((viewWidth - 1920) / 2);
    const y = (pnt.y) / clientHeight * 1116;
    return new Vector2d(x, y);
  }
  render(renderEngine) {
    this._showEditUi$1 = true;
    return;
  }
  preRender(renderEngine) {
    this._showEditUi$1 = true;
    return;
  }
  mouseDown(sender, e) {
    const location = Object3dLayer.pointToView(new Vector2d(e.offsetX, e.offsetY));
    this._pntDown$1 = location;
    const pnt = location;
    if (e.shiftKey) {
      if (Vector2d.subtract(pnt, this._xHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 10;
        this._valueOnDown$1 = this._scale$1.x;
        return true;
      }
      if (Vector2d.subtract(pnt, this._yHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 10;
        this._valueOnDown$1 = this._scale$1.y;
        return true;
      }
      if (Vector2d.subtract(pnt, this._zHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 10;
        this._valueOnDown$1 = this._scale$1.z;
        return true;
      }
    } else {
      if (Vector2d.subtract(pnt, this._xHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 1;
        this._valueOnDown$1 = this._translate$1.x;
        return true;
      }
      if (Vector2d.subtract(pnt, this._yHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 2;
        this._valueOnDown$1 = this._translate$1.y;
        return true;
      }
      if (Vector2d.subtract(pnt, this._zHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 3;
        this._valueOnDown$1 = this._translate$1.z;
        return true;
      }
    }
    for (let i = 0; i < this._hprHandles$1.length; i++) {
      if (Vector2d.subtract(pnt, this._hprHandles$1[i]).get_length() < this._hitDist$1) {
        switch (i) {
          case 0:
            this._dragMode$1 = 4;
            this._valueOnDown$1 = this._heading$1;
            this._valueOnDown2$1 = this._pitch$1;
            return true;
          case 1:
            this._dragMode$1 = 7;
            this._valueOnDown$1 = this._heading$1;
            this._valueOnDown2$1 = this._pitch$1;
            return true;
          case 2:
            this._dragMode$1 = 5;
            this._valueOnDown$1 = this._pitch$1;
            this._valueOnDown2$1 = this._roll$1;
            return true;
          case 3:
            this._dragMode$1 = 8;
            this._valueOnDown$1 = this._pitch$1;
            this._valueOnDown2$1 = this._roll$1;
            return true;
          case 4:
            this._dragMode$1 = 6;
            this._valueOnDown$1 = this._roll$1;
            this._valueOnDown2$1 = this._heading$1;
            return true;
          case 5:
            this._dragMode$1 = 9;
            this._valueOnDown$1 = this._roll$1;
            this._valueOnDown2$1 = this._heading$1;
            return true;
          default:
            break;
        }
      }
    }
    return false;
  }
  mouseUp(sender, e) {
    if (!!this._dragMode$1) {
      this._dragMode$1 = 0;
      this._lockPreferedAxis$1 = false;
      return true;
    }
    return false;
  }
  mouseMove(sender, e) {
    const location = Object3dLayer.pointToView(new Vector2d(e.offsetX, e.offsetY));
    if (!!this._dragMode$1) {
      let dist = 0;
      const distX = location.x - this._pntDown$1.x;
      const distY = -(location.y - this._pntDown$1.y);
      if (this._lockPreferedAxis$1) {
        if (this._preferY$1) {
          dist = distY;
          this._preferY$1 = true;
          Cursor.set_current(Cursors.get_sizeNS());
        } else {
          dist = distX;
          this._preferY$1 = false;
          Cursor.set_current(Cursors.get_sizeWE());
        }
      } else {
        if (Math.abs(distX) > Math.abs(distY)) {
          dist = distX;
          this._preferY$1 = false;
        } else {
          dist = distY;
          this._preferY$1 = true;
        }
        if (dist > 5) {
          this._lockPreferedAxis$1 = true;
        }
      }
      switch (this._dragMode$1) {
        case 0:
          break;
        case 1:
          this._translate$1.x = this._valueOnDown$1 + (12 * this._uiScale$1 * (dist / WWTControl.singleton.renderContext.width));
          break;
        case 2:
          this._translate$1.y = this._valueOnDown$1 + (12 * this._uiScale$1 * (dist / WWTControl.singleton.renderContext.width));
          break;
        case 3:
          this._translate$1.z = this._valueOnDown$1 + (12 * this._uiScale$1 * (dist / WWTControl.singleton.renderContext.width));
          break;
        case 4:
          this._heading$1 = this._valueOnDown$1 - distX / 4;
          this._pitch$1 = this._valueOnDown2$1 + distY / 4;
          break;
        case 5:
          this._pitch$1 = this._valueOnDown$1 + distY / 4;
          this._roll$1 = this._valueOnDown2$1 - distX / 4;
          break;
        case 6:
          this._roll$1 = this._valueOnDown$1 + distY / 4;
          this._heading$1 = this._valueOnDown2$1 - distX / 4;
          break;
        case 7:
          this._heading$1 = this._valueOnDown$1 - distX / 4;
          this._pitch$1 = this._valueOnDown2$1 - distY / 4;
          break;
        case 8:
          this._pitch$1 = this._valueOnDown$1 + distY / 4;
          this._roll$1 = this._valueOnDown2$1 + distX / 4;
          break;
        case 9:
          this._roll$1 = this._valueOnDown$1 - distY / 4;
          this._heading$1 = this._valueOnDown2$1 - distX / 4;
          break;
        case 10:
          this._scale$1.x = this._scale$1.y = this._scale$1.z = this._valueOnDown$1 * Math.pow(2, (dist / 100));
          break;
        default:
          break;
      }
      this.fireChanged();
      return true;
    } else {
      const pnt = location;
      if (Vector2d.subtract(pnt, this._xHandle$1).get_length() < this._hitDist$1) {
        Cursor.set_current(Cursors.get_sizeAll());
        return true;
      }
      if (Vector2d.subtract(pnt, this._yHandle$1).get_length() < this._hitDist$1) {
        Cursor.set_current(Cursors.get_sizeAll());
        return true;
      }
      if (Vector2d.subtract(pnt, this._zHandle$1).get_length() < this._hitDist$1) {
        Cursor.set_current(Cursors.get_sizeAll());
        return true;
      }
      for (let i = 0; i < this._hprHandles$1.length; i++) {
        if (Vector2d.subtract(pnt, this._hprHandles$1[i]).get_length() < this._hitDist$1) {
          Cursor.set_current(Cursors.get_sizeAll());
          return true;
        }
      }
    }
    return false;
  }
  mouseClick(sender, e) {
    return false;
  }
  click(sender, e) {
    return false;
  }
  mouseDoubleClick(sender, e) {
    return false;
  }
  keyDown(sender, e) {
    return false;
  }
  keyUp(sender, e) {
    return false;
  }
  hover(pnt) {
    return false;
  }
};
Object.assign(Object3dLayer,Layer);

export class Group {
  constructor() {
    this.startIndex = 0;
    this.indexCount = 0;
    this.materialIndex = 0;
  }
}

export class Mesh {
  constructor(){
    this.boundingSphere = new SphereHull();
  }
  dispose() {
    if (this.vertexBuffer != null) {
      this.vertexBuffer.dispose();
      this.vertexBuffer = null;
    }
    if (this.tangentVertexBuffer != null) {
      this.tangentVertexBuffer.dispose();
      this.tangentVertexBuffer = null;
    }
    if (this.indexBuffer != null) {
      this.indexBuffer.dispose();
      this.indexBuffer = null;
    }
  }
  setObjects(objects) {
    this._objects = objects;
  }
  commitToDevice() {
    if (this.vertices != null) {
      this.vertexBuffer = PositionNormalTexturedVertexBuffer.create(this.vertices);
    } else if (this.tangentVertices != null) {
      this.tangentVertexBuffer = PositionNormalTexturedTangentVertexBuffer.create(this.tangentVertices);
    }
    this.indexBuffer = new IndexBuffer(new Uint32Array(this.indices));
  }
  beginDrawing(renderContext) {
    if (this.vertexBuffer != null) {
      renderContext._setVertexBuffer(this.vertexBuffer);
    } else if (this.tangentVertexBuffer != null) {
      renderContext._setVertexBuffer(this.tangentVertexBuffer);
    }
    if (this.indexBuffer != null) {
      renderContext._setIndexBuffer(this.indexBuffer);
    }
  }
  drawSubset(renderContext, materialIndex) {
    if (this.indexBuffer == null || this._objects == null) {
      return;
    }
    this.drawHierarchy(this._objects, materialIndex, renderContext, 0);
  }
  drawHierarchy(nodes, materialIndex, renderContext, depth) {
    if (depth > 1212) {
      return;
    }
    const $enum1 = ss.enumerate(nodes);
    while ($enum1.moveNext()) {
      const node = $enum1.current;
      if (node.drawGroup != null && node.enabled) {
        const $enum2 = ss.enumerate(node.drawGroup);
        while ($enum2.moveNext()) {
          const group = $enum2.current;
          if (group.materialIndex === materialIndex) {
            renderContext.gl.drawElements(4, group.indexCount, 5125, group.startIndex * 4);
          }
        }
      }
      this.drawHierarchy(node.children, materialIndex, renderContext, depth + 1);
    }
  }
  get_objects() {
    return this._objects;
  }
  set_objects(value) {
    this._objects = value;
    return value;
  }
  static create (vertices, indices) {
    const mesh = new Mesh();
    mesh.vertices = vertices;
    mesh.indices = indices;
    const points = new Array(vertices.length);
    for (let i = 0; i < vertices.length; ++i) {
      points[i] = vertices[i].get_position();
    }
    mesh.boundingSphere = ConvexHull.findEnclosingSphereFast(points);
    return mesh;
  }
  static createTangent (vertices, indices)  {
    const mesh = new Mesh();
    mesh.tangentVertices = vertices;
    mesh.indices = indices;
    const points = new Array(mesh.tangentVertices.length);
    for (let i = 0; i < mesh.tangentVertices.length; ++i) {
      points[i] = mesh.tangentVertices[i].get_position();
    }
    mesh.boundingSphere = ConvexHull.findEnclosingSphereFast(points);
    return mesh;
  }
}

export class Object3d {
  constructor(tourDoc, filename, flipV, flipHandedness, smooth, color) {
    this.flipHandedness = false;
    this.flipV = true;
    this.smooth = true;
    this._mesh = null;
    this._meshMaterials = [];
    this._meshTextures = [];
    this._meshSpecularTextures = [];
    this._meshNormalMaps = [];
    this.meshFilenames = [];
    this.color = Colors.get_white();
    this._textureCache = {};
    this._matFiles = new Array(0);
    this._matFileIndex = 0;
    this.objects = [];
    this._matLib = {};
    this._textureLib = {};
    this._tourDocument = null;
    this.issLayer = false;
    this._readyToRender = false;
    this.useCurrentAmbient = false;
    this._dirty = true;
    this.color = color;
    this.smooth = smooth;
    this.flipV = flipV;
    this.flipHandedness = flipHandedness;
    this.filename = filename;
    if (ss.endsWith(this.filename.toLowerCase(), '.obj')) {
      this._loadMeshFromObj(tourDoc, this.filename);
    }
    else {
      this._loadMeshFrom3ds(tourDoc, this.filename, 1);
    }
  }
  static _compareVector3(v0, v1) {
    if (v0.x < v1.x) {
      return -1;
    }
    else if (v0.x > v1.x) {
      return 1;
    }
    else if (v0.y < v1.y) {
      return -1;
    }
    else if (v0.y > v1.y) {
      return 1;
    }
    else if (v0.z < v1.z) {
      return -1;
    }
    else if (v0.z > v1.z) {
      return 1;
    }
    else {
      return 0;
    }
  };
  static _compareVector (v0, v1) {
    if (v0.x < v1.x) {
      return -1;
    }
    else if (v0.x > v1.x) {
      return 1;
    }
    else if (v0.y < v1.y) {
      return -1;
    }
    else if (v0.y > v1.y) {
      return 1;

    }
    else {
      return 0;
    }
  }
  static _getMaterialID (material, materialNames) {
    let index = 0;
    const $enum1 = ss.enumerate(materialNames);
    while ($enum1.moveNext()) {
      const mat = $enum1.current;
      if (mat === material) {
        return index;
      }
      index++;
    }
    return -1;
  }
  static _disposeTextureList (textures) {
    if (textures != null) {
      for (let i = 0; i < textures.length; ++i) {
        if (textures[i] != null) {
          textures[i].dispose();
          textures[i] = null;
        }
      }
      textures.length = 0;
    }
  }
  _reload() {
    if (!this.issLayer) {
      this.dispose();
      if (ss.endsWith(this.filename.toLowerCase(), '.obj')) {
        this._loadMeshFromObj(this._tourDocument, this.filename);
      } else {
        this._loadMeshFrom3ds(this._tourDocument, this.filename, 1);
      }
    }
  }
  _calculateVertexNormalsMerged(vertexList, indexList, creaseAngleRad) {
    if (!vertexList.length) {
      return null;
    }
    const vertexCount = vertexList.length;
    const triangleCount = Math.floor(indexList.length / 3);
    const vertexPositions = [];
    for (let vertexIndex = 0; vertexIndex < vertexList.length; ++vertexIndex) {
      const vp = new VertexPosition();
      vp.position = vertexList[vertexIndex].get_position();
      vp.index = vertexIndex;
      vertexPositions.push(vp);
    }
    vertexPositions.sort(function (v0, v1) {
      return Object3d._compareVector3(v0.position, v1.position);
    });
    const vertexMap = new Array(vertexPositions.length);
    let uniqueVertexCount = 0;
    for (let vertexIndex = 0; vertexIndex < vertexPositions.length; vertexIndex++) {
      if (!vertexIndex || !!Object3d._compareVector3(vertexPositions[vertexIndex].position, vertexPositions[vertexIndex - 1].position)) {
        ++uniqueVertexCount;
      }
      vertexMap[vertexPositions[vertexIndex].index] = uniqueVertexCount - 1;
    }
    const vertexInstanceCounts = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; i++) {
      vertexInstanceCounts[i] = 0;
    }
    const $enum1 = ss.enumerate(indexList);
    while ($enum1.moveNext()) {
      let vertexIndex = $enum1.current;
      let uniqueIndex = vertexMap[vertexIndex];
      vertexInstanceCounts[uniqueIndex]++;
    }
    const vertexInstances = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; ++i) {
      const count = vertexInstanceCounts[i];
      if (count > 0) {
        vertexInstances[i] = new Array(count);
        for (let j = 0; j < count; j++) {
          vertexInstances[i][j] = 0;
        }
      }
    }
    for (let i = 0; i < indexList.length; ++i) {
      let faceIndex = Math.floor(i / 3);
      let uniqueIndex = vertexMap[indexList[i]];
      vertexInstances[uniqueIndex][--vertexInstanceCounts[uniqueIndex]] = faceIndex;
    }
    const faceNormals = new Array(triangleCount);
    for (let i = 0; i < triangleCount; ++i) {
      const i0 = indexList[i * 3 + 0];
      const i1 = indexList[i * 3 + 1];
      const i2 = indexList[i * 3 + 2];
      const edge0 = Vector3d.subtractVectors(vertexList[i1].get_position(), vertexList[i0].get_position());
      const edge1 = Vector3d.subtractVectors(vertexList[i2].get_position(), vertexList[i1].get_position());
      faceNormals[i] = Vector3d.cross(edge0, edge1);
      faceNormals[i].normalize();
    }
    const newVertexCount = triangleCount * 3;
    const vertexNormals = new Array(newVertexCount);
    const cosCreaseAngle = Math.min(0.9999, Math.cos(creaseAngleRad));
    for (let i = 0; i < newVertexCount; ++i) {
      let vertexIndex = indexList[i];
      let uniqueIndex = vertexMap[vertexIndex];
      const faceNormal = faceNormals[Math.floor(i / 3)];
      const sum = new Vector3d();
      const $enum2 = ss.enumerate(vertexInstances[uniqueIndex]);
      while ($enum2.moveNext()) {
        let faceIndex = $enum2.current;
        const n = faceNormals[faceIndex];
        if (Vector3d.dot(faceNormal, n) > cosCreaseAngle) {
          sum.add(n);
        }
      }
      vertexNormals[i] = sum;
      vertexNormals[i].normalize();
    }
    return vertexNormals;
  }
  _calculateVertexTangents(vertexList, indexList, creaseAngleRad) {
    if (!vertexList.length) {
      return null;
    }
    const vertexCount = vertexList.length;
    const triangleCount = Math.floor(indexList.length / 3);
    const vertexPositions = [];
    for (let vertexIndex = 0; vertexIndex < vertexList.length; ++vertexIndex) {
      const vp = new VertexPosition();
      vp.position = vertexList[vertexIndex].get_position();
      vp.index = vertexIndex;
      vertexPositions.push(vp);
    }
    vertexPositions.sort(function (v0, v1) {
      return Object3d._compareVector3(v0.position, v1.position);
    });
    const vertexMap = new Array(vertexPositions.length);
    let uniqueVertexCount = 0;
    for (let vertexIndex = 0; vertexIndex < vertexPositions.length; vertexIndex++) {
      if (!vertexIndex || !!Object3d._compareVector3(vertexPositions[vertexIndex].position, vertexPositions[vertexIndex - 1].position)) {
        ++uniqueVertexCount;
      }
      vertexMap[vertexPositions[vertexIndex].index] = (uniqueVertexCount - 1);
    }
    const vertexInstanceCounts = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; i++) {
      vertexInstanceCounts[i] = 0;
    }
    const $enum1 = ss.enumerate(indexList);
    while ($enum1.moveNext()) {
      let vertexIndex = $enum1.current;
      let uniqueIndex = vertexMap[vertexIndex];
      vertexInstanceCounts[uniqueIndex]++;
    }
    const vertexInstances = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; ++i) {
      const count = vertexInstanceCounts[i];
      if (count > 0) {
        vertexInstances[i] = new Array(count);
        for (let j = 0; j < count; j++) {
          vertexInstances[i][j] = 0;
        }
      }
    }
    for (let i = 0; i < indexList.length; ++i) {
      let faceIndex = Math.floor(i / 3);
      let uniqueIndex = vertexMap[indexList[i]];
      vertexInstances[uniqueIndex][--vertexInstanceCounts[uniqueIndex]] = faceIndex;
    }
    const partials = new Array(triangleCount);
    for (let i = 0; i < triangleCount; ++i) {
      let v0 = vertexList[indexList[i * 3 + 0]];
      let v1 = vertexList[indexList[i * 3 + 1]];
      const v2 = vertexList[indexList[i * 3 + 2]];
      const edge0 = Vector3d.subtractVectors(v1.get_position(), v0.get_position());
      const edge1 = Vector3d.subtractVectors(v2.get_position(), v0.get_position());
      const m00 = v1.tu - v0.tu;
      const m01 = v1.tv - v0.tv;
      const m10 = v2.tu - v0.tu;
      const m11 = v2.tv - v0.tv;
      const determinant = m00 * m11 - m01 * m10;
      if (Math.abs(determinant) < 1E-06) {
        if (edge0.lengthSq() > 0) {
          partials[i] = edge0;
          partials[i].normalize();
        } else {
          partials[i] = new Vector3d(1, 0, 0);
        }
      } else {
        const invDeterminant = 1 / determinant;
        const n00 = m11 * invDeterminant;
        const n01 = -m01 * invDeterminant;
        const n10 = -m10 * invDeterminant;
        const n11 = m00 * invDeterminant;
        partials[i] = Vector3d.addVectors(Vector3d.multiplyScalar(edge0, n00), Vector3d.multiplyScalar(edge1, n01));
        partials[i].normalize();
      }
    }
    const newVertexCount = triangleCount * 3;
    const tangents = new Array(newVertexCount);
    const cosCreaseAngle = Math.min(0.9999, Math.cos(creaseAngleRad));
    for (let i = 0; i < newVertexCount; ++i) {
      let vertexIndex = indexList[i];
      let uniqueIndex = vertexMap[vertexIndex];
      const du = partials[Math.floor(i / 3)];
      const sum = new Vector3d();
      const $enum2 = ss.enumerate(vertexInstances[uniqueIndex]);
      while ($enum2.moveNext()) {
        let faceIndex = $enum2.current;
        const T = partials[faceIndex];
        if (Vector3d.dot(du, T) > cosCreaseAngle) {
          sum.add(T);
        }
      }
      const N = vertexList[vertexIndex].get_normal();
      tangents[i] = Vector3d.subtractVectors(sum, Vector3d.multiplyScalar(N, Vector3d.dot(N, sum)));
      tangents[i].normalize();
    }
    return tangents;
  }
  _calculateVertexNormals(vertexList, indexList, creaseAngleRad) {
    const vertexCount = vertexList.length;
    const triangleCount = Math.floor(indexList.length / 3);
    const vertexInstanceCounts = new Array(vertexCount);
    const $enum1 = ss.enumerate(indexList);
    while ($enum1.moveNext()) {
      let vertexIndex = $enum1.current;
      vertexInstanceCounts[vertexIndex]++;
    }
    const vertexInstances = new Array(vertexCount);
    for (let i = 0; i < vertexCount; ++i) {
      const count = vertexInstanceCounts[i];
      if (count > 0) {
        vertexInstances[i] = new Array(count);
      }
    }
    for (let i = 0; i < indexList.length; ++i) {
      let faceIndex = Math.floor(i / 3);
      let vertexIndex = indexList[i];
      vertexInstances[vertexIndex][--vertexInstanceCounts[vertexIndex]] = faceIndex;
    }
    const faceNormals = new Array(triangleCount);
    for (let i = 0; i < triangleCount; ++i) {
      const i0 = indexList[i * 3 + 0];
      const i1 = indexList[i * 3 + 1];
      const i2 = indexList[i * 3 + 2];
      const edge0 = Vector3d.subtractVectors(vertexList[i1].get_position(), vertexList[i0].get_position());
      const edge1 = Vector3d.subtractVectors(vertexList[i2].get_position(), vertexList[i1].get_position());
      faceNormals[i] = Vector3d.cross(edge0, edge1);
      faceNormals[i].normalize();
    }
    const newVertexCount = triangleCount * 3;
    const vertexNormals = new Array(newVertexCount);
    const cosCreaseAngle = Math.min(0.9999, Math.cos(creaseAngleRad));
    for (let i = 0; i < newVertexCount; ++i) {
      let vertexIndex = indexList[i];
      const faceNormal = faceNormals[Math.floor(i / 3)];
      const sum = new Vector3d();
      const $enum2 = ss.enumerate(vertexInstances[vertexIndex]);
      while ($enum2.moveNext()) {
        let faceIndex = $enum2.current;
        const n = faceNormals[faceIndex];
        if (Vector3d.dot(faceNormal, n) > cosCreaseAngle) {
          sum.add(n);
        }
      }
      vertexNormals[i] = sum;
      vertexNormals[i].normalize();
    }
    return vertexNormals;
  }
  _addMaterial(material) {
    this._meshMaterials.push(material);
    while (this._meshTextures.length < this._meshMaterials.length) {
      this._meshTextures.push(null);
    }
    while (this._meshSpecularTextures.length < this._meshMaterials.length) {
      this._meshSpecularTextures.push(null);
    }
    while (this._meshNormalMaps.length < this._meshMaterials.length) {
      this._meshNormalMaps.push(null);
    }
  }
  _loadColorChunk(br) {
    const chunkID = br.readUInt16();
    const chunkLength = br.readUInt32();
    let color = Colors.get_black();
    if ((chunkID === 16 || chunkID === 19) && chunkLength === 18) {
      const r = Math.max(0, Math.min(1, br.readSingle()));
      const g = Math.max(0, Math.min(1, br.readSingle()));
      const b = Math.max(0, Math.min(1, br.readSingle()));
      color = Color.fromArgb(255, ss.truncate((255 * r)), ss.truncate((255 * g)), ss.truncate((255 * b)));
    } else if ((chunkID === 17 || chunkID === 18) && chunkLength === 9) {
      color = Color.fromArgb(255, br.readByte(), br.readByte(), br.readByte());
    } else {
      br.readBytes(chunkLength - 6);
    }
    return color;
  }
  _loadPercentageChunk(br) {
    const chunkID = br.readUInt16();
    const chunkLength = br.readUInt32();
    let percentage = 0;
    if (chunkID === 48 && chunkLength === 8) {
      percentage = br.readUInt16();
    } else if (chunkID === 49 && chunkLength === 10) {
      percentage = br.readSingle();
    } else {
      br.readBytes(chunkLength - 6);
    }
    return percentage;
  }
  _loadMeshFromObj(doc, filename) {
    const $this = this;

    this.filename = filename;
    this._tourDocument = doc;
    const blob = doc.getFileBlob(filename);
    const chunck = new FileReader();
    chunck.onloadend = function (e) {
      $this._matFiles = $this._readObjMaterialsFromBin(ss.safeCast(chunck.result, String));
      $this._matFileIndex = 0;
      $this._loadMatLib(ss.safeCast(chunck.result, String));
    };
    chunck.readAsText(blob);
  }
  _readObjMaterialsFromBin(data) {
    const matFiles = [];
    const lines = data.split('\n');
    const $enum1 = ss.enumerate(lines);
    while ($enum1.moveNext()) {
      const lineraw = $enum1.current;
      const line = ss.replaceString(lineraw, '  ', ' ');
      const parts = ss.trim(line).split(' ');
      if (parts.length > 0) {
        switch (parts[0]) {
          case 'mtllib':
            const path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
            const matFile = path + parts[1];
            matFiles.push(matFile);
            break;
        }
      }
    }
    return matFiles;
  }
  _readObjFromBin(data) {
    let objectFound = false;
    const objects = [];
    let currentObject = new ObjectNode();
    currentObject.name = 'Default';
    let triangleCount = 0;
    let vertexCount = 0;
    let vertexList = [];
    const vertList = [];
    const normList = [];
    const uvList = [];
    vertList.push(new Vector3d());
    normList.push(new Vector3d());
    uvList.push(new Vector2d());
    const indexList = [];
    const attribList = [];
    const applyLists = [];
    const applyListsIndex = [];
    const materialNames = [];
    let currentMaterialIndex = -1;
    let currentMaterial = new Material();
    let currentGroup = new Group();
    let currentIndex = 0;
    currentMaterial = new Material();
    currentMaterial.diffuse = this.color;
    currentMaterial.ambient = this.color;
    currentMaterial.specular = Colors.get_white();
    currentMaterial.specularSharpness = 30;
    currentMaterial.opacity = 1;
    currentMaterial.isDefault = true;
    currentGroup.startIndex = 0;
    currentGroup.indexCount = 0;
    currentGroup.materialIndex = 0;
    const lines = data.split('\n');
    const $enum1 = ss.enumerate(lines);
    while ($enum1.moveNext()) {
      const lineraw = $enum1.current;
      const line = ss.replaceString(lineraw, '  ', ' ');
      const parts = ss.trim(line).split(' ');
      if (parts.length > 0) {
        switch (parts[0]) {
          case 'mtllib':
            break;
          case 'usemtl':
            const materialName = parts[1];
            if (ss.keyExists(this._matLib, materialName)) {
              if (currentMaterialIndex === -1 && currentIndex > 0) {
                this._addMaterial(currentMaterial);
                currentMaterialIndex++;
              }
              if (currentMaterialIndex > -1) {
                currentGroup.indexCount = currentIndex - currentGroup.startIndex;
                currentObject.drawGroup.push(currentGroup);
              }
              currentMaterialIndex++;
              if (ss.keyExists(this._matLib, materialName)) {
                currentMaterial = this._matLib[materialName];
                if (ss.keyExists(this._textureLib, materialName)) {
                  try {
                    if (!ss.keyExists(this._textureCache, this._textureLib[materialName])) {
                      const path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
                      const tex = this._tourDocument.getCachedTexture2d(path + this._textureLib[materialName]);
                      if (tex != null) {
                        this.meshFilenames.push(this._textureLib[materialName]);
                        this._textureCache[this._textureLib[materialName]] = tex;
                      }
                    }
                    this._meshTextures.push(this._textureCache[this._textureLib[materialName]]);
                  } catch ($e2) {
                  }
                }
                this._addMaterial(currentMaterial);
                currentGroup = new Group();
                currentGroup.startIndex = currentIndex;
                currentGroup.indexCount = 0;
                currentGroup.materialIndex = currentMaterialIndex;
              }
            }
            break;
          case 'v':
            vertexCount++;
            if (this.flipHandedness) {
              vertList.push(new Vector3d(-parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            } else {
              vertList.push(new Vector3d(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            }
            break;
          case 'vn':
            if (this.flipHandedness) {
              normList.push(new Vector3d(-parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            } else {
              normList.push(new Vector3d(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            }
            break;
          case 'vt':
            uvList.push(new Vector2d(parseFloat(parts[1]), (this.flipV) ? (1 - parseFloat(parts[2])) : parseFloat(parts[2])));
            break;
          case 'g':
          case 'o':
            if (objectFound) {
              if (currentMaterialIndex > -1) {
                currentGroup.indexCount = currentIndex - currentGroup.startIndex;
                currentObject.drawGroup.push(currentGroup);
                currentGroup = new Group();
                currentGroup.startIndex = currentIndex;
                currentGroup.indexCount = 0;
                currentGroup.materialIndex = currentMaterialIndex;
              }
              currentObject = new ObjectNode();
            }
            objectFound = true;
            if (parts.length > 1) {
              currentObject.name = parts[1];
            } else {
              currentObject.name = 'Unnamed';
            }
            objects.push(currentObject);
            break;
          case 'f':
            let indexiesA = Object3d._getIndexies(parts[1]);
            let indexiesB = Object3d._getIndexies(parts[2]);
            let indexiesC = Object3d._getIndexies(parts[3]);
            vertexList.push(PositionNormalTextured.createUV(vertList[indexiesA[0]], normList[indexiesA[2]], uvList[indexiesA[1]]));
            vertexList.push(PositionNormalTextured.createUV(vertList[indexiesB[0]], normList[indexiesB[2]], uvList[indexiesB[1]]));
            vertexList.push(PositionNormalTextured.createUV(vertList[indexiesC[0]], normList[indexiesC[2]], uvList[indexiesC[1]]));
            if (this.flipHandedness) {
              indexList.push(currentIndex);
              indexList.push(currentIndex + 2);
              indexList.push(currentIndex + 1);
            } else {
              indexList.push(currentIndex);
              indexList.push(currentIndex + 1);
              indexList.push(currentIndex + 2);
            }
            triangleCount++;
            currentIndex += 3;
            if (parts.length > 4) {
              let partIndex = 4;
              while (partIndex < parts.length) {
                if (this.flipHandedness) {
                  indexiesA = Object3d._getIndexies(parts[1]);
                  indexiesC = Object3d._getIndexies(parts[partIndex]);
                  indexiesB = Object3d._getIndexies(parts[partIndex - 1]);
                } else {
                  indexiesA = Object3d._getIndexies(parts[1]);
                  indexiesB = Object3d._getIndexies(parts[partIndex - 1]);
                  indexiesC = Object3d._getIndexies(parts[partIndex]);
                }
                vertexList.push(PositionNormalTextured.createUV(vertList[indexiesA[0]], normList[indexiesA[2]], uvList[indexiesA[1]]));
                vertexList.push(PositionNormalTextured.createUV(vertList[indexiesB[0]], normList[indexiesB[2]], uvList[indexiesB[1]]));
                vertexList.push(PositionNormalTextured.createUV(vertList[indexiesC[0]], normList[indexiesC[2]], uvList[indexiesC[1]]));
                indexList.push(currentIndex);
                indexList.push(currentIndex + 1);
                indexList.push(currentIndex + 2);
                triangleCount++;
                currentIndex += 3;
                partIndex++;
              }
            }
            break;
        }
      }
    }
    if (!objectFound) {
      objects.push(currentObject);
    }
    if (currentMaterialIndex === -1 && currentIndex > 0) {
      this._addMaterial(currentMaterial);
      currentMaterialIndex++;
    }
    if (currentMaterialIndex > -1) {
      currentGroup.indexCount = (currentIndex - currentGroup.startIndex);
      currentObject.drawGroup.push(currentGroup);
    }
    if (normList.length < 2) {
      const degtorag = Math.PI / 180;
      const creaseAngleRad = ((this.smooth) ? 170 * degtorag : 45 * degtorag);
      const vertexNormals = this._calculateVertexNormalsMerged(vertexList, indexList, creaseAngleRad);
      const newVertexList = [];
      const newVertexCount = indexList.length;
      for (let vertexIndex = 0; vertexIndex < newVertexCount; ++vertexIndex) {
        const v = vertexList[indexList[vertexIndex]];
        v.set_normal(vertexNormals[vertexIndex]);
        newVertexList.push(v);
      }
      vertexList = newVertexList;
    }
    this._mesh = Mesh.create(vertexList, indexList);
    const rootDummy = new ObjectNode();
    rootDummy.name = 'Root';
    rootDummy.parent = null;
    rootDummy.level = -1;
    rootDummy.drawGroup = null;
    rootDummy.children = objects;
    this.objects = [];
    this.objects.push(rootDummy);
    this._mesh.setObjects(this.objects);
    this._mesh.commitToDevice();
    this._dirty = false;
    this._readyToRender = true;
  }
  _loadMatLib(data) {
    const $this = this;

    if (this._matFileIndex < this._matFiles.length) {
      const filename = this._matFiles[this._matFileIndex++];
      const blob = this._tourDocument.getFileBlob(filename);
      const chunck = new FileReader();
      chunck.onloadend = function (e) {
        $this._readMatLibFromBin(ss.safeCast(chunck.result, String));
        $this._loadMatLib(data);
      };
      chunck.readAsText(blob);
    } else {
      this._readObjFromBin(data);
    }
  }
  _readMatLibFromBin(data) {
    try {
      let currentMaterial = new Material();
      let materialName = '';
      this._matLib = {};
      this._textureLib = {};
      const lines = data.split('\n');
      const $enum1 = ss.enumerate(lines);
      while ($enum1.moveNext()) {
        const lineraw = $enum1.current;
        const line = lineraw;
        const parts = ss.trim(line).split(' ');
        if (parts.length > 0) {
          switch (parts[0]) {
            case 'newmtl':
              if (!ss.emptyString(materialName)) {
                this._matLib[materialName] = currentMaterial;
              }
              currentMaterial = new Material();
              currentMaterial.diffuse = Colors.get_white();
              currentMaterial.ambient = Colors.get_white();
              currentMaterial.specular = Colors.get_black();
              currentMaterial.specularSharpness = 30;
              currentMaterial.opacity = 1;
              materialName = parts[1];
              break;
            case 'Ka':
              currentMaterial.ambient = Color.fromArgb(255, Math.min(parseFloat(parts[1]) * 255, 255), Math.min(parseFloat(parts[2]) * 255, 255), Math.min(parseFloat(parts[3]) * 255, 255));
              break;
            case 'map_Kd':
              currentMaterial.diffuse = Colors.get_white();
              let textureFilename = parts[1];
              for (let i = 2; i < parts.length; i++) {
                textureFilename += ' ' + parts[i];
              }
              const path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
              textureFilename = ss.replaceString(textureFilename, '/', '\\');
              if (textureFilename.indexOf('\\') !== -1) {
                textureFilename = textureFilename.substring(textureFilename.lastIndexOf('\\') + 1);
              }
              this._textureLib[materialName] = textureFilename;
              break;
            case 'Kd':
              currentMaterial.diffuse = Color.fromArgb(255, Math.min(parseFloat(parts[1]) * 255, 255), Math.min(parseFloat(parts[2]) * 255, 255), Math.min(parseFloat(parts[3]) * 255, 255));
              break;
            case 'Ks':
              currentMaterial.specular = Color.fromArgb(255, Math.min(parseFloat(parts[1]) * 255, 255), Math.min(parseFloat(parts[2]) * 255, 255), Math.min(parseFloat(parts[3]) * 255, 255));
              break;
            case 'd':
              currentMaterial.opacity = parseFloat(parts[1]);
              break;
            case 'Tr':
              currentMaterial.opacity = 1 - parseFloat(parts[1]);
              break;
            case 'illum':
              const illuminationMode = parseInt(parts[1]);
              break;
            case 'sharpness':
              currentMaterial.specularSharpness = parseFloat(parts[1]);
              break;
            case 'Ns':
              currentMaterial.specularSharpness = 1 + 2 * parseFloat(parts[1]);
              currentMaterial.specularSharpness = Math.max(10, currentMaterial.specularSharpness);
              break;
          }
        }
      }
      if (!ss.emptyString(materialName)) {
        this._matLib[materialName] = currentMaterial;
      }
    } catch ($e2) {
    }
  }
  _getIndexies(data) {
    const parts = ss.trim(data).split('/');
    const indecies = new Array(3);
    if (ss.emptyString(data)) {
      return indecies;
    }
    if (parts.length > 0) {
      indecies[0] = parseInt(parts[0]);
    }
    if (parts.length > 1) {
      if (ss.emptyString(parts[1])) {
        indecies[1] = 0;
      } else {
        indecies[1] = parseInt(parts[1]);
      }
    }
    if (parts.length > 2) {
      indecies[2] = parseInt(parts[2]);
    }
    return indecies;
  }
  _loadMeshFrom3ds(doc, filename, scale) {
    const $this = this;

    this._tourDocument = doc;
    const blob = doc.getFileBlob(filename);
    const chunck = new FileReader();
    chunck.onloadend = function (e) {
      $this._read3dsFromBin(new BinaryReader(new Uint8Array(chunck.result)), scale);
    };
    chunck.readAsArrayBuffer(blob);
  }
  _read3dsFromBin(br, scale) {
    var i;
    var sectionID;
    var sectionLength;
    var name = '';
    var material = '';
    var triangleCount = 0;
    var vertexCount = 0;
    var vertexList = [];
    var indexList = [];
    var attribList = [];
    var materialNames = [];
    var currentMaterialIndex = -1;
    var currentMaterial = new Material();
    var attributeID = 0;
    var count = 0;
    var lastID = 0;
    var exit = false;
    var normalMapFound = false;
    var offsetX = 0;
    var offsetY = 0;
    var offsetZ = 0;
    var objects = [];
    var currentObject = null;
    var objHierarchy = [];
    var objNames = [];
    var objectTable = {};
    var dummyCount = 0;
    var length = br.get_length() - 1;
    var startMapIndex = 0;
    var startTriangleIndex = 0;
    while (br.get_position() < length && !exit) {
      sectionID = br.readUInt16();
      sectionLength = br.readUInt32();
      switch (sectionID) {
        case 19789:
          break;
        case 15677:
          break;
        case 16384:
          name = '';
          var b;
          do {
            b = br.readByte();
            if (b > 0) {
              name += String.fromCharCode(b);
            }
          } while (!!b);
          currentObject = new ObjectNode();
          currentObject.name = name;
          objects.push(currentObject);
          if (!ss.keyExists(objectTable, currentObject.name)) {
            objectTable[currentObject.name] = currentObject;
          }
          break;
        case 16640:
          startMapIndex = vertexList.length;
          startTriangleIndex = Math.floor(indexList.length / 3);
          break;
        case 16656:
          vertexCount = br.readUInt16();
          for (i = 0; i < vertexCount; i++) {
            var x = br.readSingle() - offsetX;
            var y = br.readSingle() - offsetY;
            var z = br.readSingle() - offsetZ;
            var vert = PositionNormalTextured._create(x * scale, z * scale, y * scale, 0, 0, 0, 0, 0);
            vertexList.push(vert);
          }
          break;
        case 16672:
          var triCount = br.readUInt16();
          triangleCount += triCount;
          for (i = 0; i < triCount; i++) {
            var aa = br.readUInt16() + startMapIndex;
            var bb = br.readUInt16() + startMapIndex;
            var cc = br.readUInt16() + startMapIndex;
            indexList.push(cc);
            indexList.push(bb);
            indexList.push(aa);
            var flags = br.readUInt16();
          }
          break;
        case 16688:
          material = '';
          i = 0;
          var b1;
          do {
            b1 = br.readByte();
            if (b1 > 0) {
              material += String.fromCharCode(b1);
            }
            i++;
          } while (!!b1);
          var triCount = br.readUInt16();
          var applyList = new Array(triCount);
          attributeID = Object3d._getMaterialID(material, materialNames);
          for (i = 0; i < triCount; i++) {
            applyList[i] = br.readUInt16() + startTriangleIndex;
          }
          currentObject.applyLists.push(applyList);
          currentObject.applyListsIndex.push(attributeID);
          break;
        case 16704:
          count = br.readUInt16();
          for (i = 0; i < count; i++) {
            var vert = vertexList[startMapIndex + i];
            var texCoord = new Vector2d(br.readSingle(), (this.flipV) ? (1 - br.readSingle()) : br.readSingle());
            vertexList[startMapIndex + i] = PositionNormalTextured.createUV(vert.get_position(), new Vector3d(), texCoord);
          }
          break;
        case 16736:
          var mat = new Array(12);
          for (i = 0; i < 12; i++) {
            mat[i] = br.readSingle();
          }
          if (ss.keyExists(objectTable, name)) {
            objectTable[name].localMat = new Matrix3d(mat[0], mat[1], mat[2], 0, mat[3], mat[4], mat[5], 0, mat[6], mat[7], mat[8], 0, mat[9], mat[10], mat[11], 1);
            objectTable[name].localMat.invert();
          }
          break;
        case 45055:
          break;
        case 40960:
          var matName = '';
          i = 0;
          var b2;
          do {
            b2 = br.readByte();
            if (b2 > 0) {
              matName += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          materialNames.push(matName);
          if (currentMaterialIndex > -1) {
            this._addMaterial(currentMaterial);
          }
          currentMaterialIndex++;
          currentMaterial = new Material();
          currentMaterial.diffuse = Colors.get_white();
          currentMaterial.ambient = Colors.get_white();
          currentMaterial.specular = Colors.get_black();
          currentMaterial.specularSharpness = 30;
          currentMaterial.opacity = 1;
          break;
        case 40976:
          currentMaterial.ambient = this._loadColorChunk(br);
          break;
        case 40992:
          currentMaterial.diffuse = this._loadColorChunk(br);
          break;
        case 41008:
          currentMaterial.specular = this._loadColorChunk(br);
          break;
        case 41024:
          currentMaterial.specularSharpness = 1 + 2 * this._loadPercentageChunk(br);
          currentMaterial.specularSharpness = Math.max(10, currentMaterial.specularSharpness);
          break;
        case 41472:
          break;
        case 41728:
          var textureFilename = '';
          i = 0;
          var b2;
          do {
            b2 = br.readByte();
            if (b2 > 0) {
              textureFilename += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          var path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
          try {
            var tex = this._tourDocument.getCachedTexture2d(path + textureFilename);
            if (tex != null) {
              this._meshTextures.push(tex);
              this.meshFilenames.push(textureFilename);
              currentMaterial.diffuse = Colors.get_white();
            }
            else {
              this._meshTextures.push(null);
            }
          }
          catch ($e1) {
            this._meshTextures.push(null);
          }
          break;
        case 41520:
          var percentage = this._loadPercentageChunk(br);
          var nameId = br.readUInt16();
          var nameBlockLength = br.readUInt32();
          var textureFilename = '';
          i = 0;
          var b2;
          do {
            b2 = br.readByte();
            if (b2 > 0) {
              textureFilename += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          var path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
          try {
            var tex = this._tourDocument.getCachedTexture2d(path + textureFilename);
            if (tex != null) {
              this._meshNormalMaps.push(tex);
              this.meshFilenames.push(textureFilename);
              normalMapFound = true;
            }
            else {
              this._meshNormalMaps.push(null);
            }
          }
          catch ($e2) {
            this._meshNormalMaps.push(null);
          }
          break;
        case 41476:
          var strength = this._loadPercentageChunk(br);
          var nameId = br.readUInt16();
          var nameBlockLength = br.readUInt32();
          var textureFilename = '';
          i = 0;
          var b2;
          do {
            b2 = br.readByte();
            if (b2 > 0) {
              textureFilename += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          var path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
          try {
            var tex = this._tourDocument.getCachedTexture2d(path + textureFilename);
            if (tex != null) {
              this._meshSpecularTextures.push(tex);
              this.meshFilenames.push(textureFilename);
              var gray = ss.truncate((255.99 * strength / 100));
              currentMaterial.specular = Color.fromArgb(255, gray, gray, gray);
            }
            else {
              this._meshSpecularTextures.push(null);
            }
          }
          catch ($e3) {
            this._meshSpecularTextures.push(null);
          }
          break;
        case 45056:
          break;
        case 45058:
          break;
        case 45072:
          name = '';
          i = 0;
          var b1;
          do {
            b1 = br.readByte();
            if (b1 > 0) {
              name += String.fromCharCode(b1);
            }
            i++;
          } while (!!b1);
          var dum1 = br.readUInt16();
          var dum2 = br.readUInt16();
          var level = br.readUInt16();
          if (level === 65535) {
            level = -1;
          }
          if (ss.startsWith(name, '$')) {
            dummyCount++;
          }
          else {
            objNames.push(name);
          }
          objHierarchy.push(level);
          if (ss.keyExists(objectTable, name)) {
            objectTable[name].level = level;
          }
          break;
        case 45073:
          name = '';
          i = 0;
          var b1;
          do {
            b1 = br.readByte();
            if (b1 > 0) {
              name += String.fromCharCode(b1);
            }
            i++;
          } while (!!b1);
          objNames.push('$$$' + name);
          break;
        case 45075:
          var points = new Array(3);
          for (i = 0; i < 3; i++) {
            points[i] = br.readSingle();
          }
          if (ss.keyExists(objectTable, name)) {
            objectTable[name].pivotPoint = new Vector3d(-points[0], -points[1], -points[2]);
          }
          break;
        case 45088:
          var pos = new Array(8);
          for (i = 0; i < 8; i++) {
            pos[i] = br.readSingle();
          }
          break;
        default:
          br.seekRelative((sectionLength - 6));
          break;
      }
      lastID = sectionID;
    }
    br.close();
    if (currentMaterialIndex > -1) {
      this._addMaterial(currentMaterial);
    }
    var degtorag = Math.PI / 180;
    var creaseAngleRad = ((this.smooth) ? 70 * degtorag : 45 * degtorag);
    var vertexNormals = this._calculateVertexNormalsMerged(vertexList, indexList, creaseAngleRad);
    var newVertexList = [];
    var newVertexCount = triangleCount * 3;
    for (var vertexIndex = 0; vertexIndex < newVertexCount; ++vertexIndex) {
      var v = vertexList[indexList[vertexIndex]];
      v.set_normal(vertexNormals[vertexIndex]);
      newVertexList.push(v);
    }
    var newIndexList = [];
    var $enum4 = ss.enumerate(objects);
    while ($enum4.moveNext()) {
      var node = $enum4.current;
      var materialGroups = [];
      for (i = 0; i < node.applyLists.length; i++) {
        var matId = node.applyListsIndex[i];
        var startIndex = newIndexList.length;
        var $enum5 = ss.enumerate(node.applyLists[i]);
        while ($enum5.moveNext()) {
          var triangleIndex = $enum5.current;
          newIndexList.push((triangleIndex * 3));
          newIndexList.push((triangleIndex * 3 + 1));
          newIndexList.push((triangleIndex * 3 + 2));
        }
        var group = new Group();
        group.startIndex = startIndex;
        group.indexCount = node.applyLists[i].length * 3;
        group.materialIndex = matId;
        materialGroups.push(group);
      }
      node.drawGroup = materialGroups;
    }
    var nodeStack = new ss.Stack();
    var nodeTreeRoot = [];
    var rootDummy = new ObjectNode();
    rootDummy.name = 'Root';
    rootDummy.parent = null;
    rootDummy.level = -1;
    rootDummy.drawGroup = null;
    var currentLevel = -1;
    nodeStack.push(rootDummy);
    nodeTreeRoot.push(rootDummy);
    for (i = 0; i < objHierarchy.length; i++) {
      var level = objHierarchy[i];
      if (level <= currentLevel) {
        while (level <= nodeStack.peek().level && nodeStack.count > 1) {
          nodeStack.pop();
        }
        currentLevel = level;
      }
      if (ss.startsWith(objNames[i], '$$$')) {
        var dummy = new ObjectNode();
        dummy.name = ss.replaceString(objNames[i], '$$$', '');
        dummy.parent = nodeStack.peek();
        dummy.parent.children.push(dummy);
        dummy.level = currentLevel = level;
        dummy.drawGroup = null;
        nodeStack.push(dummy);
      }
      else {
        objectTable[objNames[i]].level = currentLevel = level;
        objectTable[objNames[i]].parent = nodeStack.peek();
        objectTable[objNames[i]].parent.children.push(objectTable[objNames[i]]);
        nodeStack.push(objectTable[objNames[i]]);
      }
    }
    if (!objHierarchy.length) {
      var $enum6 = ss.enumerate(objects);
      while ($enum6.moveNext()) {
        var node = $enum6.current;
        rootDummy.children.push(node);
        node.parent = rootDummy;
      }
    }
    if (normalMapFound) {
      var tangentIndexList = [];
      for (var tangentIndex = 0; tangentIndex < newVertexCount; ++tangentIndex) {
        tangentIndexList.push(tangentIndex);
      }
      var tangents = this._calculateVertexTangents(newVertexList, tangentIndexList, creaseAngleRad);
      var vertices = new Array(newVertexList.length);
      var vertexIndex = 0;
      var $enum7 = ss.enumerate(newVertexList);
      while ($enum7.moveNext()) {
        var v = $enum7.current;
        var tvertex = new PositionNormalTexturedTangent(v.get_position(), v.get_normal(), new Vector2d(v.tu, v.tv), tangents[vertexIndex]);
        vertices[vertexIndex] = tvertex;
        ++vertexIndex;
      }
      this._mesh = Mesh.createTangent(vertices, newIndexList);
    }
    else {
      this._mesh = Mesh.create(newVertexList, newIndexList);
    }
    this.objects = nodeTreeRoot;
    this._mesh.setObjects(nodeTreeRoot);
    this._mesh.commitToDevice();
    this._dirty = false;
    this._readyToRender = true;
  }
  _offsetObjects(vertList, objects, offsetMat, offsetPoint) {
    const $enum1 = ss.enumerate(objects);
    while ($enum1.moveNext()) {
      const node = $enum1.current;
      const matLoc = node.localMat;
      this._offsetObjects(vertList, node.children, matLoc, Vector3d.addVectors(node.pivotPoint, offsetPoint));
      const $enum2 = ss.enumerate(node.drawGroup);
      while ($enum2.moveNext()) {
        const group = $enum2.current;
        const end = group.startIndex + group.indexCount;
        for (let i = group.startIndex; i < end; i++) {
          const vert = vertList[i];
          vert.set_position(Vector3d.addVectors(vert.get_position(), Vector3d.addVectors(node.pivotPoint, offsetPoint)));
          vertList[i] = vert;
        }
      }
    }
  }
  setupLighting(renderContext) {
    var objPosition = new Vector3d(renderContext.get_world().get_offsetX(), renderContext.get_world().get_offsetY(), renderContext.get_world().get_offsetZ());
    var objToLight = Vector3d.subtractVectors(objPosition, renderContext.get_reflectedLightPosition());
    var sunPosition = Vector3d.subtractVectors(renderContext.get_sunPosition(), renderContext.get_reflectedLightPosition());
    var cosPhaseAngle = (sunPosition.length() <= 0) ? 1 : Vector3d.dot(objToLight, sunPosition) / (objToLight.length() * sunPosition.length());
    var reflectedLightFactor = Math.max(0, cosPhaseAngle);
    reflectedLightFactor = Math.sqrt(reflectedLightFactor);
    var hemiLightFactor = 0;
    var sunlightFactor = 1;
    if (renderContext.get_occludingPlanetRadius() > 0) {
      var objAltitude = Vector3d.subtractVectors(objPosition, renderContext.get_occludingPlanetPosition()).length() - renderContext.get_occludingPlanetRadius();
      hemiLightFactor = Math.max(0, Math.min(1, 1 - (objAltitude / renderContext.get_occludingPlanetRadius()) * 300));
      reflectedLightFactor *= (1 - hemiLightFactor);
      var sunToPlanet = Vector3d.subtractVectors(renderContext.get_occludingPlanetPosition(), renderContext.get_sunPosition());
      var objToPlanet = Vector3d.subtractVectors(renderContext.get_occludingPlanetPosition(), objPosition);
      var hemiLightDirection = new Vector3d(-objToPlanet.x, -objToPlanet.y, -objToPlanet.z);
      hemiLightDirection.normalize();
      renderContext.set_hemisphereLightUp(hemiLightDirection);
      var objToSun = Vector3d.subtractVectors(renderContext.get_sunPosition(), objPosition);
      var sunPlanetDistance = sunToPlanet.length();
      var t = -Vector3d.dot(objToSun, sunToPlanet) / (sunPlanetDistance * sunPlanetDistance);
      if (t > 1) {
        var shadowAxisPoint = Vector3d.addVectors(renderContext.get_sunPosition(), Vector3d.multiplyScalar(sunToPlanet, t));
        var d = Vector3d.subtractVectors(shadowAxisPoint, objPosition).length();
        var s = Vector3d.subtractVectors(shadowAxisPoint, renderContext.get_sunPosition()).length();
        var solarRadius = 0.004645784;
        var penumbraRadius = renderContext.get_occludingPlanetRadius() + (t - 1) * (renderContext.get_occludingPlanetRadius() + solarRadius);
        var umbraRadius = renderContext.get_occludingPlanetRadius() + (t - 1) * (renderContext.get_occludingPlanetRadius() - solarRadius);
        if (d < penumbraRadius) {
          var minimumShadow = 0;
          if (umbraRadius < 0) {
            var occlusion = Math.pow(1 / (1 - umbraRadius), 2);
            umbraRadius = 0;
            minimumShadow = 1 - occlusion;
          }
          var u = Math.max(0, umbraRadius);
          sunlightFactor = Math.max(minimumShadow, (d - u) / (penumbraRadius - u));
          var gray = ss.truncate((255.99 * sunlightFactor));
          renderContext.set_sunlightColor(Color.fromArgb(255, gray, gray, gray));
          hemiLightFactor *= sunlightFactor;
        }
      }
    }
    renderContext.set_reflectedLightColor(Color.fromArgb(255, ss.truncate((renderContext.get_reflectedLightColor().r * reflectedLightFactor)), ss.truncate((renderContext.get_reflectedLightColor().g * reflectedLightFactor)), ss.truncate((renderContext.get_reflectedLightColor().b * reflectedLightFactor))));
    renderContext.set_hemisphereLightColor(Color.fromArgb(255, ss.truncate((renderContext.get_hemisphereLightColor().r * hemiLightFactor)), ss.truncate((renderContext.get_hemisphereLightColor().g * hemiLightFactor)), ss.truncate((renderContext.get_hemisphereLightColor().b * hemiLightFactor))));
  }
  render(renderContext, opacity) {
    if (!this._readyToRender) {
      return;
    }
    if (this._dirty && !this.issLayer) {
      this._reload();
    }
    var oldWorld = renderContext.get_world();
    var offset = this._mesh.boundingSphere.center;
    var unitScale = 1;
    if (this._mesh.boundingSphere.radius > 0) {
      unitScale = 1 / this._mesh.boundingSphere.radius;
    }
    renderContext.set_world(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d.translation(new Vector3d(-offset.x, -offset.y, -offset.z)), Matrix3d._scaling(unitScale, unitScale, unitScale)), oldWorld));
    var worldView = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    var v = worldView.transform(Vector3d.get_empty());
    var scaleFactor = Math.sqrt(worldView.get_m11() * worldView.get_m11() + worldView.get_m22() * worldView.get_m22() + worldView.get_m33() * worldView.get_m33()) / unitScale;
    var dist = v.length();
    var radius = scaleFactor;
    var viewportHeight = ss.truncate(renderContext.height);
    var p11 = renderContext.get_projection().get_m11();
    var p34 = renderContext.get_projection().get_m34();
    var p44 = renderContext.get_projection().get_m44();
    var w = Math.abs(p34) * dist + p44;
    var pixelsPerUnit = (p11 / w) * viewportHeight;
    var radiusInPixels = (radius * pixelsPerUnit);
    if (radiusInPixels < 0.5) {
      return;
    }
    var savedSunlightColor = renderContext.get_sunlightColor();
    var savedReflectedColor = renderContext.get_reflectedLightColor();
    var savedHemiColor = renderContext.get_hemisphereLightColor();
    if (Settings.get_current().get_solarSystemLighting()) {
      this.setupLighting(renderContext);
      if (!this.useCurrentAmbient) {
        renderContext.set_ambientLightColor(Color.fromArgb(255, 11, 11, 11));
      }
    }
    else {
      renderContext.set_sunlightColor(Colors.get_black());
      renderContext.set_reflectedLightColor(Colors.get_black());
      renderContext.set_hemisphereLightColor(Colors.get_black());
      renderContext.set_ambientLightColor(Colors.get_white());
    }
    if (this._mesh == null) {
      return;
    }
    ModelShader.minLightingBrightness = 0.1;
    var count = this._meshMaterials.length;
    this._mesh.beginDrawing(renderContext);
    if (count > 0) {
      for (var i = 0; i < this._meshMaterials.length; i++) {
        if (this._meshMaterials[i].isDefault) {
          var mat = this._meshMaterials[i];
          mat.diffuse = this.color;
          mat.ambient = this.color;
          this._meshMaterials[i] = mat;
        }
        renderContext.setMaterial(this._meshMaterials[i], this._meshTextures[i], this._meshSpecularTextures[i], this._meshNormalMaps[i], opacity);
        if (this._mesh.vertexBuffer != null) {
          ModelShader.use(renderContext, this._mesh.vertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 32);
        }
        else {
          ModelShader.use(renderContext, this._mesh.tangentVertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 44);
        }
        Layer.preDraw();
        this._mesh.drawSubset(renderContext, i);
      }
    }
    else {
      Layer.preDraw();
      for (var i = 0; i < this._meshTextures.length; i++) {
        if (this._meshTextures[i] != null) {
          renderContext.set_mainTexture(this._meshTextures[i]);
          if (this._mesh.vertexBuffer != null) {
            ModelShader.use(renderContext, this._mesh.vertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 32);
          }
          else {
            ModelShader.use(renderContext, this._mesh.tangentVertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 44);
          }
        }
        Layer.preDraw();
        this._mesh.drawSubset(renderContext, i);
      }
    }
    renderContext.set_world(oldWorld);
    renderContext.set_sunlightColor(savedSunlightColor);
    renderContext.set_reflectedLightColor(savedReflectedColor);
    renderContext.set_hemisphereLightColor(savedHemiColor);
    renderContext.set_ambientLightColor(Colors.get_black());
  }
  dispose() {
    if (this._mesh != null) {
      this._mesh.dispose();
      this._mesh = null;
    }
    const $enum1 = ss.enumerate(ss.keys(this._textureCache));
    while ($enum1.moveNext()) {
      const key = $enum1.current;
      const tex = this._textureCache[key];
      if (tex != null) {
        tex.dispose();
      }
    }
    ss.clearKeys(this._textureCache);
    Object3d._disposeTextureList(this._meshTextures);
    Object3d._disposeTextureList(this._meshSpecularTextures);
    Object3d._disposeTextureList(this._meshNormalMaps);
    this._meshMaterials.length = 0;
    this._dirty = true;
  }
};

function ObjectNode() {
  this.level = -1;
  this.children = [];
  this.enabled = true;
  this.drawGroup = [];
  this.applyLists = [];
  this.applyListsIndex = [];
}

const ObjectNode$ = {};

export function VertexPosition() {
  this.index = 0;
}