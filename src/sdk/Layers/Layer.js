import ss from '../scriptsharp/ss';
import {Color, Colors} from '../Color';
import {ImageSetLayer} from '../ImageSetLayer';
import {IUiController} from '../interface';
import {Guid, Util} from '../Util';

export function Layer() {
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
}
Layer.fromXml = function(layerNode, someFlag) {
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
};
export const Layer$ = {
  getPrimaryUI: function () {
    return null;
  },
  getFileStreamUrl: function (filename) {
    if (this.tourDocument != null) {
      return this.tourDocument.getFileStream(filename);
    }
    return null;
  },
  get_opacity: function () {
    return this.opacity;
  },
  set_opacity: function (value) {
    if (this.opacity !== value) {
      this.version++;
      this.opacity = value;
    }
    return value;
  },
  get_opened: function () {
    return this.opened;
  },
  set_opened: function (value) {
    if (this.opened !== value) {
      this.version++;
      this.opened = value;
    }
    return value;
  },
  get_startTime: function () {
    return this._startTime;
  },
  set_startTime: function (value) {
    if (!ss.compareDates(this._startTime, value)) {
      this.version++;
      this._startTime = value;
    }
    return value;
  },
  get_endTime: function () {
    return this._endTime;
  },
  set_endTime: function (value) {
    if (!ss.compareDates(this._endTime, value)) {
      this.version++;
      this._endTime = value;
    }
    return value;
  },
  get_fadeSpan: function () {
    return this._fadeSpan;
  },
  set_fadeSpan: function (value) {
    this.version++;
    this._fadeSpan = value;
    return value;
  },
  get_fadeType: function () {
    return this._fadeType;
  },
  set_fadeType: function (value) {
    if (this._fadeType !== value) {
      this.set_version(this.get_version() + 1) - 1;
      this._fadeType = value;
    }
    return value;
  },
  get_version: function () {
    return this.version;
  },
  set_version: function (value) {
    this.version = value;
    return value;
  },
  findClosest: function (target, distance, closestPlace, astronomical) {
    return closestPlace;
  },
  hoverCheckScreenSpace: function (cursor) {
    return false;
  },
  clickCheckScreenSpace: function (cursor) {
    return false;
  },
  draw: function (renderContext, opacity, flat) {
    return true;
  },
  preDraw: function (renderContext, opacity) {
    return true;
  },
  upadteData: function (data, purgeOld, purgeAll, hasHeader) {
    return true;
  },
  canCopyToClipboard: function () {
    return false;
  },
  copyToClipboard: function () {
    return;
  },
  getParams: function () {
    const paramList = new Array(5);
    paramList[0] = this.color.r / 255;
    paramList[1] = this.color.g / 255;
    paramList[2] = this.color.b / 255;
    paramList[3] = this.color.a / 255;
    paramList[4] = this.opacity;
    return paramList;
  },
  setParams: function (paramList) {
    if (paramList.length === 5) {
      this.opacity = paramList[4];
      this.color = Color.fromArgb((paramList[3] * 255), (paramList[0] * 255), (paramList[1] * 255), (paramList[2] * 255));
    }
  },
  getParamNames: function () {
    return ['Color.Red', 'Color.Green', 'Color.Blue', 'Color.Alpha', 'Opacity'];
  },
  getEditUI: function () {
    return ss.safeCast(this, IUiController);
  },
  cleanUp: function () {
  },
  get_name: function () {
    return this._name;
  },
  set_name: function (value) {
    if (this._name !== value) {
      this.version++;
      this._name = value;
    }
    return value;
  },
  toString: function () {
    return this._name;
  },
  get_referenceFrame: function () {
    return this.referenceFrame;
  },
  set_referenceFrame: function (value) {
    this.referenceFrame = value;
    return value;
  },
  getProps: function () {
    return '';
  },
  get_color: function () {
    return this.color;
  },
  set_color: function (value) {
    if (this.color !== value) {
      this.color = value;
      this.version++;
      this.cleanUp();
    }
    return value;
  },
  colorChanged: function () {
    this.cleanUp();
  },
  get_colorValue: function () {
    return this.get_color().toString();
  },
  set_colorValue: function (value) {
    this.set_color(Color.fromName(value));
    return value;
  },
  get_astronomical: function () {
    return this.astronomical;
  },
  set_astronomical: function (value) {
    if (this.astronomical !== value) {
      this.version++;
      this.astronomical = value;
    }
    return value;
  },
  getTypeName: function () {
    return 'TerraViewer.Layer';
  },
  saveToXml: function (xmlWriter) {
    xmlWriter._writeStartElement('Layer');
    xmlWriter._writeAttributeString('Id', this.id.toString());
    xmlWriter._writeAttributeString('Type', this.getTypeName());
    xmlWriter._writeAttributeString('Name', this.get_name());
    xmlWriter._writeAttributeString('ReferenceFrame', this.referenceFrame);
    xmlWriter._writeAttributeString('Color', this.color.save());
    xmlWriter._writeAttributeString('Opacity', this.opacity.toString());
    xmlWriter._writeAttributeString('StartTime', Util.xmlDate(this.get_startTime()));
    xmlWriter._writeAttributeString('EndTime', Util.xmlDate(this.get_endTime()));
    xmlWriter._writeAttributeString('FadeSpan', this.get_fadeSpan().toString());
    xmlWriter._writeAttributeString('FadeType', this.get_fadeType().toString());
    this.writeLayerProperties(xmlWriter);
    xmlWriter._writeEndElement();
  },
  writeLayerProperties: function (xmlWriter) {
    return;
  },
  initializeFromXml: function (node) {
  },
  initFromXml: function (node) {
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
  },
  loadData: function (doc, filename) {
    return;
  },
  addFilesToCabinet: function (fc) {
    return;
  },
  getStringFromGzipBlob: function (blob, dataReady) {
    const reader = new FileReader();
    reader.onloadend = function (e) {
      const result = pako.inflate(e.target.result, {to: 'string'});
      dataReady(result);
    };
    reader.readAsArrayBuffer(blob);
  }
};