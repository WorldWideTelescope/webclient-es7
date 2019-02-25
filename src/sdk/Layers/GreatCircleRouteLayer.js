import {Layer} from './Layer';
import {Dates, TriangleList} from '../Graphics/Primative3d';
import {Coordinates} from '../Coordinates';
import {Vector3d} from '../Double3d';


export class GreatCirlceRouteLayer extends Layer{
  constructor() {
    super();
    this._triangleList$1 = null;
    this._latStart$1 = 0;
    this._lngStart$1 = 0;
    this._latEnd$1 = 0;
    this._lngEnd$1 = 0;
    this._width$1 = 4;
    this._percentComplete$1 = 100;
    return new Layer(this);
  }

  static getTypeName () {return 'TerraViewer.GreatCirlceRouteLayer';}
  cleanUp() {
    if (this._triangleList$1 != null) {
      this._triangleList$1.clear();
    }
    this._triangleList$1 = null;
    Layer.cleanUp.call(this);
  }
  draw(renderContext, opacity, flat) {
    if (this._triangleList$1 == null) {
      this._initializeRoute$1(renderContext);
    }
    this._triangleList$1.jNow = this._percentComplete$1 / 100;
    this._triangleList$1.draw(renderContext, opacity * this.get_opacity(), 2);
    return true;
  }
  _initializeRoute$1(renderContext) {
    this._triangleList$1 = new TriangleList();
    this._triangleList$1.decay = 1000;
    this._triangleList$1.sky = this.get_astronomical();
    this._triangleList$1.timeSeries = true;
    this._triangleList$1.depthBuffered = false;
    this._triangleList$1.autoTime = false;
    const steps = 500;
    const start = Coordinates.geoTo3dDouble(this._latStart$1, this._lngStart$1);
    const end = Coordinates.geoTo3dDouble(this._latEnd$1, this._lngEnd$1);
    const dir = Vector3d.subtractVectors(end, start);
    dir.normalize();
    const startNormal = start;
    startNormal.normalize();
    const left = Vector3d.cross(startNormal, dir);
    const right = Vector3d.cross(dir, startNormal);
    left.normalize();
    right.normalize();
    left.multiply(0.001 * this._width$1);
    right.multiply(0.001 * this._width$1);
    let lastLeft = new Vector3d();
    let lastRight = new Vector3d();
    let firstTime = true;
    for (let i = 0; i <= steps; i++) {
      const v = Vector3d.lerp(start, end, i / steps);
      v.normalize();
      const cl = v;
      const cr = v;
      cl.add(left);
      cr.add(right);
      if (!firstTime) {
        this._triangleList$1.addQuad(lastRight, lastLeft, cr, cl, this.get_color(), new Dates(i / steps, 2));
      } else {
        firstTime = false;
      }
      lastLeft = cl;
      lastRight = cr;
    }
  }
  getParams() {
    return [this._percentComplete$1];
  }
  static getParamNames (){return ['Percentage'];}
  setParams(paramList) {
    if (paramList.length > 0) {
      this._percentComplete$1 = paramList[0];
    }
  }
  get_latStart() {
    return this._latStart$1;
  }
  set_latStart(value) {
    if (this._latStart$1 !== value) {
      this._latStart$1 = value;
      this.version++;
    }
    return value;
  }
  get_lngStart() {
    return this._lngStart$1;
  }
  set_lngStart(value) {
    if (this._lngStart$1 !== value) {
      this._lngStart$1 = value;
      this.version++;
    }
    return value;
  }
  get_latEnd() {
    return this._latEnd$1;
  }
  set_latEnd(value) {
    if (this._latEnd$1 !== value) {
      this._latEnd$1 = value;
      this.version++;
    }
    return value;
  }
  get_lngEnd() {
    return this._lngEnd$1;
  }
  set_lngEnd(value) {
    if (this._lngEnd$1 !== value) {
      this._lngEnd$1 = value;
      this.version++;
    }
    return value;
  }
  get_width() {
    return this._width$1;
  }
  set_width(value) {
    if (this._width$1 !== value) {
      this._width$1 = value;
      this.version++;
    }
    return value;
  }
  get_percentComplete() {
    return this._percentComplete$1;
  }
  set_percentComplete(value) {
    if (this._percentComplete$1 !== value) {
      this._percentComplete$1 = value;
      this.version++;
    }
    return value;
  }
  writeLayerProperties(xmlWriter) {
    xmlWriter._writeAttributeString('LatStart', this.get_latStart().toString());
    xmlWriter._writeAttributeString('LngStart', this.get_lngStart().toString());
    xmlWriter._writeAttributeString('LatEnd', this.get_latEnd().toString());
    xmlWriter._writeAttributeString('LngEnd', this.get_lngEnd().toString());
    xmlWriter._writeAttributeString('Width', this.get_width().toString());
    xmlWriter._writeAttributeString('PercentComplete', this.get_percentComplete().toString());
  }
  initializeFromXml(node) {
    this._latStart$1 = parseFloat(node.attributes.getNamedItem('LatStart').nodeValue);
    this._lngStart$1 = parseFloat(node.attributes.getNamedItem('LngStart').nodeValue);
    this._latEnd$1 = parseFloat(node.attributes.getNamedItem('LatEnd').nodeValue);
    this._lngEnd$1 = parseFloat(node.attributes.getNamedItem('LngEnd').nodeValue);
    this._width$1 = parseFloat(node.attributes.getNamedItem('Width').nodeValue);
    this._percentComplete$1 = parseFloat(node.attributes.getNamedItem('PercentComplete').nodeValue);
  }
}