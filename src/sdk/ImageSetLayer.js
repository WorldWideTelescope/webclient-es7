

// wwtlib.ImageSetLayer

import ss from './scriptsharp/ss';
import {Util} from './Util';
import {Imageset} from './Imageset';
import {Enums} from './enums';
import {Layer} from './Layers/Layer';
import {FitsImage} from './Layers/FitsImage';



export class ImageSetLayer extends Layer{
  constructor() {
    super();
    this._imageSet$1 = null;
    this._lastScale$1 = 0;
    this._min$1 = 0;
    this._max$1 = 0;
    this._extension$1 = '.txt';
    this._overrideDefaultLayer$1 = false;
    this._loaded$1 = false;
  }
  static create(set) {
    const isl = new ImageSetLayer();
    isl._imageSet$1 = set;
    return isl;
  }
  get_imageSet() {
    return this._imageSet$1;
  }
  set_imageSet(value) {
    this._imageSet$1 = value;
    return value;
  }
  get_overrideDefaultLayer() {
    return this._overrideDefaultLayer$1;
  }
  set_overrideDefaultLayer(value) {
    this._overrideDefaultLayer$1 = value;
    return value;
  }
  getFitsImage() {
    return ss.safeCast(this._imageSet$1.get_wcsImage(), FitsImage);
  }
  initializeFromXml(node) {
    const imageSetNode = Util.selectSingleNode(node, 'ImageSet');
    this._imageSet$1 = Imageset.fromXMLNode(imageSetNode);
    if (node.attributes.getNamedItem('Extension') != null) {
      this._extension$1 = node.attributes.getNamedItem('Extension').nodeValue;
    }
    if (node.attributes.getNamedItem('ScaleType') != null) {
      this._lastScale$1 = Enums.parse('ScaleTypes', node.attributes.getNamedItem('ScaleType').nodeValue);
    }
    if (node.attributes.getNamedItem('MinValue') != null) {
      this._min$1 = parseFloat(node.attributes.getNamedItem('MinValue').nodeValue);
    }
    if (node.attributes.getNamedItem('MaxValue') != null) {
      this._max$1 = parseFloat(node.attributes.getNamedItem('MaxValue').nodeValue);
    }
    if (node.attributes.getNamedItem('OverrideDefault') != null) {
      this._overrideDefaultLayer$1 = ss.boolean(node.attributes.getNamedItem('OverrideDefault').nodeValue);
    }
  }
  draw(renderContext, opacity, flat) {
    if (!this._loaded$1) {
      return false;
    }
    renderContext.set_worldBase(renderContext.get_world());
    renderContext.set_viewBase(renderContext.get_view());
    renderContext.makeFrustum();
    renderContext.drawImageSet(this._imageSet$1, this.get_opacity() * opacity * 100);
    return true;
  }
  writeLayerProperties(xmlWriter) {
    if (this._imageSet$1.get_wcsImage() != null) {
      if (ss.canCast(this._imageSet$1.get_wcsImage(), FitsImage)) {
        this._extension$1 = '.fit';
      } else {
        this._extension$1 = '.png';
      }
      xmlWriter._writeAttributeString('Extension', this._extension$1);
    }
    if (ss.canCast(this._imageSet$1.get_wcsImage(), FitsImage)) {
      const fi = ss.safeCast(this._imageSet$1.get_wcsImage(), FitsImage);
      xmlWriter._writeAttributeString('ScaleType', fi.lastScale.toString());
      xmlWriter._writeAttributeString('MinValue', fi.lastBitmapMin.toString());
      xmlWriter._writeAttributeString('MaxValue', fi.lastBitmapMax.toString());
    }
    xmlWriter._writeAttributeString('OverrideDefault', this._overrideDefaultLayer$1.toString());
    Imageset.saveToXml(xmlWriter, this._imageSet$1, '');
    Layer.writeLayerProperties.call(this, xmlWriter);
  }
  static getTypeName() {
    return 'TerraViewer.ImageSetLayer';
  }

  addFilesToCabinet(fc) {
    if (ss.canCast(this._imageSet$1.get_wcsImage(), FitsImage)) {
      const fName = (this._imageSet$1.get_wcsImage()).get_filename();
      const fileName = fc.tempDirectory + ss.format('{0}\\{1}{2}', fc.get_packageID(), this.id.toString(), this._extension$1);
      fc.addFile(fileName, (this._imageSet$1.get_wcsImage()).sourceBlob);
    }
  }
  setImageScale(scaleType, min, max) {
    this._min$1 = min;
    this._max$1 = max;
    this._lastScale$1 = scaleType;
    if (ss.canCast(this._imageSet$1.get_wcsImage(), FitsImage)) {
      Histogram.updateScale(this, scaleType, min, max);
    }
  }
  setImageZ(z) {
    if (ss.canCast(this._imageSet$1.get_wcsImage(), FitsImage)) {
      Histogram.updateImage(this, z);
    }
  }
  loadData(tourDoc, filename) {
    if (ss.startsWith(this._extension$1.toLowerCase(), '.fit')) {
      const blob = tourDoc.getFileBlob(ss.replaceString(filename, '.txt', this._extension$1));
      const fi = new FitsImage('image.fit', blob, ss.bind('doneLoading', this));
      this._imageSet$1.set_wcsImage(fi);
      if (this._max$1 > 0 || this._min$1 > 0) {
        fi.lastBitmapMax = this._max$1;
        fi.lastBitmapMin = this._min$1;
        fi.lastScale = this._lastScale$1;
      }
    } else {
      this._loaded$1 = true;
    }
  }
  doneLoading(wcsImage) {
    this._loaded$1 = true;
  }
}

