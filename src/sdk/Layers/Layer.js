import ss from '../scriptsharp/ss';
import {Color, Colors} from '../Color';
import {ImageSetLayer} from '../ImageSetLayer';
import {IUiController} from '../interface';
import {Guid, Util} from '../Util';
import pako from 'pako';

let OrbitLayer,SpreadSheetLayer,GreatCirlceRouteLayer,Object3dLayer,GridLayer;
import('./Orbit').then((module) => OrbitLayer = module.OrbitLayer);
import('./SpreadsheetLayer').then((module) => SpreadSheetLayer = module.SpreadSheetLayer);
import('./GridLayer').then((module) => GridLayer = module.GridLayer);
import('./GreatCircleRouteLayer').then((module) => GreatCirlceRouteLayer = module.GreatCirlceRouteLayer);
import('./Object3d').then((module) => Object3dLayer = module.Object3dLayer);

export class Layer {
  constructor(obj) {
    this.id = Guid.newGuid();
    this.loadedFromTour = false;
    this.tourDocument = null;
    this.opacity = 1;
    this.opened = false;
    this._startTime = ss.date('01/01/1900');
    this._endTime = ss.date('01/01/2100');
    this._fadeSpan = 0;
    this._fadeType = 4;
    this.version = 0;
    this.color = Colors.get_white();
    this.enabled = true;
    this.astronomical = false;
    Object.assign(this,obj);
  }
  static fromXml(layerNode, someFlag) {
    const layerClassName = layerNode.attributes.getNamedItem('Type').nodeValue;
    const overLayType = ss.replaceString(layerClassName, 'TerraViewer.', '');
    if (overLayType == null) {
      return null;
    }
    let newLayer = null;
    switch (overLayType) {
      case 'SpreadSheetLayer':
        newLayer = new SpreadSheetLayer();
        break;
      case 'GreatCirlceRouteLayer':
        newLayer = new GreatCirlceRouteLayer();
        break;
      case 'GridLayer':
        newLayer = new GridLayer();
        break;
      case 'ImageSetLayer':
        newLayer = new ImageSetLayer();
        break;
      case 'Object3dLayer':
        newLayer = new Object3dLayer();
        break;
      case 'OrbitLayer':
        newLayer = new OrbitLayer();
        break;
      default:
        return null;
    }
    newLayer.initFromXml(layerNode);
    return newLayer;
  }
  static getPrimaryUI() {
    return null;
  }
  getFileStreamUrl(filename) {
    if (this.tourDocument != null) {
      return this.tourDocument.getFileStream(filename);
    }
    return null;
  }
  get_opacity() {
    return this.opacity;
  }
  set_opacity(value) {
    if (this.opacity !== value) {
      this.version++;
      this.opacity = value;
    }
    return value;
  }
  get_opened() {
    return this.opened;
  }
  set_opened(value) {
    if (this.opened !== value) {
      this.version++;
      this.opened = value;
    }
    return value;
  }
  get_startTime() {
    return this._startTime;
  }
  set_startTime(value) {
    if (!ss.compareDates(this._startTime, value)) {
      this.version++;
      this._startTime = value;
    }
    return value;
  }
  get_endTime() {
    return this._endTime;
  }
  set_endTime(value) {
    if (!ss.compareDates(this._endTime, value)) {
      this.version++;
      this._endTime = value;
    }
    return value;
  }
  get_fadeSpan() {
    return this._fadeSpan;
  }
  set_fadeSpan(value) {
    this.version++;
    this._fadeSpan = value;
    return value;
  }
  get_fadeType() {
    return this._fadeType;
  }
  set_fadeType(value) {
    if (this._fadeType !== value) {
      this.set_version(this.get_version() + 1) - 1;
      this._fadeType = value;
    }
    return value;
  }
  get_version() {
    return this.version;
  }
  set_version(value) {
    this.version = value;
    return value;
  }
  static findClosest(target, distance, closestPlace, astronomical) {
    return closestPlace;
  }
  static hoverCheckScreenSpace(cursor) {
    return false;
  }
  static clickCheckScreenSpace(cursor) {
    return false;
  }
  static draw(renderContext, opacity, flat) {
    return true;
  }
  static preDraw(renderContext, opacity) {
    return true;
  }
  static upadteData(data, purgeOld, purgeAll, hasHeader) {
    return true;
  }
  static canCopyToClipboard() {
    return false;
  }
  static copyToClipboard() {
    return;
  }
  getParams() {
    const paramList = new Array(5);
    paramList[0] = this.color.r / 255;
    paramList[1] = this.color.g / 255;
    paramList[2] = this.color.b / 255;
    paramList[3] = this.color.a / 255;
    paramList[4] = this.opacity;
    return paramList;
  }
  setParams(paramList) {
    if (paramList.length === 5) {
      this.opacity = paramList[4];
      this.color = Color.fromArgb((paramList[3] * 255), (paramList[0] * 255), (paramList[1] * 255), (paramList[2] * 255));
    }
  }
  static getParamNames() {
    return ['Color.Red', 'Color.Green', 'Color.Blue', 'Color.Alpha', 'Opacity'];
  }
  getEditUI() {
    return ss.safeCast(this, IUiController);
  }
  cleanUp() {
  }
  get_name() {
    return this._name;
  }
  set_name(value) {
    if (this._name !== value) {
      this.version++;
      this._name = value;
    }
    return value;
  }
  toString() {
    return this._name;
  }
  get_referenceFrame() {
    return this.referenceFrame;
  }
  set_referenceFrame(value) {
    this.referenceFrame = value;
    return value;
  }
  static getProps() {
    return '';
  }
  get_color() {
    return this.color;
  }
  set_color(value) {
    if (this.color !== value) {
      this.color = value;
      this.version++;
      this.cleanUp();
    }
    return value;
  }
  colorChanged() {
    this.cleanUp();
  }
  get_colorValue() {
    return this.get_color().toString();
  }
  set_colorValue(value) {
    this.set_color(Color.fromName(value));
    return value;
  }
  get_astronomical() {
    return this.astronomical;
  }
  set_astronomical(value) {
    if (this.astronomical !== value) {
      this.version++;
      this.astronomical = value;
    }
    return value;
  }
  static getTypeName() {
    return 'TerraViewer.Layer';
  }
  saveToXml(xmlWriter) {
    xmlWriter._writeStartElement('Layer');
    xmlWriter._writeAttributeString('Id', this.id.toString());
    xmlWriter._writeAttributeString('Type', Layer.getTypeName());
    xmlWriter._writeAttributeString('Name', this.get_name());
    xmlWriter._writeAttributeString('ReferenceFrame', this.referenceFrame);
    xmlWriter._writeAttributeString('Color', this.color.save());
    xmlWriter._writeAttributeString('Opacity', this.opacity.toString());
    xmlWriter._writeAttributeString('StartTime', Util.xmlDate(this.get_startTime()));
    xmlWriter._writeAttributeString('EndTime', Util.xmlDate(this.get_endTime()));
    xmlWriter._writeAttributeString('FadeSpan', this.get_fadeSpan().toString());
    xmlWriter._writeAttributeString('FadeType', this.get_fadeType().toString());
    Layer.writeLayerProperties(xmlWriter);
    xmlWriter._writeEndElement();
  }
  static writeLayerProperties(xmlWriter) {
    return;
  }
  initializeFromXml(node) {
  }
  initFromXml(node) {
    this.id = Guid.fromString(node.attributes.getNamedItem('Id').nodeValue);
    this.set_name(node.attributes.getNamedItem('Name').nodeValue);
    this.referenceFrame = node.attributes.getNamedItem('ReferenceFrame').nodeValue;
    this.color = Color.load(node.attributes.getNamedItem('Color').nodeValue);
    this.opacity = parseFloat(node.attributes.getNamedItem('Opacity').nodeValue);
    if (node.attributes.getNamedItem('StartTime') != null) {
      this.set_startTime(new Date(node.attributes.getNamedItem('StartTime').nodeValue));
    }
    if (node.attributes.getNamedItem('EndTime') != null) {
      this.set_endTime(new Date(node.attributes.getNamedItem('EndTime').nodeValue));
    }
    if (node.attributes.getNamedItem('FadeSpan') != null) {
      this.set_fadeSpan(Util.parseTimeSpan(node.attributes.getNamedItem('FadeSpan').nodeValue));
    }
    if (node.attributes.getNamedItem('FadeType') != null) {
      switch (node.attributes.getNamedItem('FadeType').nodeValue) {
        case 'In':
          this.set_fadeType(1);
          break;
        case 'Out':
          this.set_fadeType(2);
          break;
        case 'Both':
          this.set_fadeType(3);
          break;
        case 'None':
          this.set_fadeType(4);
          break;
        default:
          break;
      }
    }
    this.initializeFromXml(node);
  }
  static loadData(doc, filename) {
    return;
  }
  static addFilesToCabinet(fc) {
    return;
  }
  getStringFromGzipBlob(blob, dataReady) {
    const reader = new FileReader();
    reader.onloadend = function (e) {
      const result = pako.inflate(e.target.result, {to: 'string'});
      dataReady(result);
    };
    reader.readAsArrayBuffer(blob);
  }
};

export class LayerCollection extends Layer{
  constructor() {
    super();
  }
  draw(renderContext, opacity, flat) {
    return Layer.draw.call(this, renderContext, opacity, false);
  }
}

export function DomainValue(text, markerIndex) {
  this.markerIndex = 4;
  this.customMarker = null;
  this.text = text;
  this.markerIndex = markerIndex;
}
