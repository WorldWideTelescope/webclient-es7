
// wwtlib.Imageset

import ss from './scriptsharp/ss';
import {Util} from './Util';
import {Matrix3d} from './Double3d';
let ToastTile,MercatorTile,EquirectangularTile,SkyImageTile,PlotTile,TangentTile;
let allTiles = ['ToastTile','MercatorTile','EquirectangularTile','SkyImageTile','PlotTile','TangentTile'];
let allImports = allTiles.map(t => import(`./${t}`));
export let tilesReady = new Promise((res,rej) => {
  Promise.all(allImports).then(tileModules => {
    onTilesReady(tileModules);
    res();
  });
});
let onTilesReady = tileModules => {
  ToastTile = tileModules[0].ToastTile;
  MercatorTile = tileModules[1].MercatorTile;
  EquirectangularTile = tileModules[2].EquirectangularTile;
  SkyImageTile = tileModules[3].SkyImageTile;
  PlotTile = tileModules[4].PlotTile;
  TangentTile = tileModules[5].TangentTile;
  Imageset.getNewTile = function(imageset, level, x, y, parent) {
    let newTile;
    switch (imageset.get_projection()) {
      case 0:
        newTile = MercatorTile.create(level, x, y, imageset, parent);
        return newTile;
      case 1:
        return EquirectangularTile.create(level, x, y, imageset, parent);
      case 3:
      default:
        return ToastTile.create(level, x, y, imageset, parent);
      case 5:
        return SkyImageTile.create(level, x, y, imageset, parent);
      case 6:
        return PlotTile.create(level, x, y, imageset, parent);
      case 2:
        newTile = TangentTile.create(level, x, y, imageset, parent);
        return newTile;
    }
  };
};
import {
  BandPass,
  ImageSetType,
  ProjectionType,
  Enums
} from './enums.js';



export class Imageset{
  constructor() {
    this._projection = 0;
    this._imageSetID = 0;
    this._baseTileDegrees = 0;
    this._widthFactor = 1;
    this.demUrl = '';
    this._levels = 0;
    this._mercator = false;
    this._bottomsUp = false;
    this._baseLevel = 1;
    this._quadTreeTileMap = '0123';
    this._centerX = 0;
    this._centerY = 0;
    this._rotation = 0;
    this._meanRadius = 0;
    this._dataSetType = 0;
    this._bandPass = 3;
    this._altUrl = '';
    this._singleImage = false;
    this._matrixComputed = false;
    this._name = '';
    this._sparse = false;
    this._thumbnailUrl = '';
    this._generic = false;
    this._defaultSet = false;
    this._elevationModel = false;
    this._offsetX = 0;
    this._offsetY = 0;
  }
  static getTileKey (imageset, level, x, y) {
    return imageset.get_imageSetID().toString() + '\\' + level.toString() + '\\' + y.toString() + '_' + x.toString();
  }
  static getNewTile (){
    console.warn({getNewTile:arguments});
  }
  static fromXMLNode(node) {
    try {
      let type = 2;
      let projection = 2;
      if (node.attributes.getNamedItem('DataSetType') != null) {
        type = Enums.parse('ImageSetType', node.attributes.getNamedItem('DataSetType').nodeValue);
      }
      let bandPass = 3;
      bandPass = Enums.parse('BandPass', node.attributes.getNamedItem('BandPass').nodeValue);
      let wf = 1;
      if (node.attributes.getNamedItem('WidthFactor') != null) {
        wf = parseInt(node.attributes.getNamedItem('WidthFactor').nodeValue);
      }
      if (node.attributes.getNamedItem('Generic') == null || !ss.boolean(node.attributes.getNamedItem('Generic').nodeValue)) {
        projection = Enums.parse('ProjectionType', node.attributes.getNamedItem('Projection').nodeValue);
        let fileType = node.attributes.getNamedItem('FileType').nodeValue;
        if (!ss.startsWith(fileType, '.')) {
          fileType = '.' + fileType;
        }
        let thumbnailUrl = '';
        const thumbUrl = Util.selectSingleNode(node, 'ThumbnailUrl');
        if (thumbUrl != null) {
          if (ss.emptyString(thumbUrl.text)) {
            const cn = thumbUrl;
            thumbnailUrl = cn.textContent;
          }
          else {
            thumbnailUrl = thumbUrl.text;
          }
        }
        let stockSet = false;
        let elevationModel = false;
        if (node.attributes.getNamedItem('StockSet') != null) {
          stockSet = ss.boolean(node.attributes.getNamedItem('StockSet').nodeValue);
        }
        if (node.attributes.getNamedItem('ElevationModel') != null) {
          elevationModel = ss.boolean(node.attributes.getNamedItem('ElevationModel').nodeValue);
        }
        let demUrl = '';
        if (node.attributes.getNamedItem('DemUrl') != null) {
          demUrl = node.attributes.getNamedItem('DemUrl').nodeValue;
        }
        let alturl = '';
        if (node.attributes.getNamedItem('AltUrl') != null) {
          alturl = node.attributes.getNamedItem('AltUrl').nodeValue;
        }
        let offsetX = 0;
        if (node.attributes.getNamedItem('OffsetX') != null) {
          offsetX = parseFloat(node.attributes.getNamedItem('OffsetX').nodeValue);
        }
        let offsetY = 0;
        if (node.attributes.getNamedItem('OffsetY') != null) {
          offsetY = parseFloat(node.attributes.getNamedItem('OffsetY').nodeValue);
        }
        let creditText = '';
        let credits = Util.selectSingleNode(node, 'Credits');
        if (credits != null) {
          creditText = Util.getInnerText(credits);
        }
        let creditsUrl = '';
        credits = Util.selectSingleNode(node, 'CreditsUrl');
        if (credits != null) {
          creditsUrl = Util.getInnerText(credits);
        }
        let meanRadius = 0;
        if (node.attributes.getNamedItem('MeanRadius') != null) {
          meanRadius = parseFloat(node.attributes.getNamedItem('MeanRadius').nodeValue);
        }
        let referenceFrame = null;
        if (node.attributes.getNamedItem('ReferenceFrame') != null) {
          referenceFrame = node.attributes.getNamedItem('ReferenceFrame').nodeValue;
        }
        let name = '';
        if (node.attributes.getNamedItem('Name') != null) {
          name = node.attributes.getNamedItem('Name').nodeValue;
        }
        let url = '';
        if (node.attributes.getNamedItem('Url') != null) {
          url = node.attributes.getNamedItem('Url').nodeValue;
        }
        let baseTileLevel = 0;
        if (node.attributes.getNamedItem('BaseTileLevel') != null) {
          baseTileLevel = parseInt(node.attributes.getNamedItem('BaseTileLevel').nodeValue);
        }
        let tileLevels = 0;
        if (node.attributes.getNamedItem('TileLevels') != null) {
          tileLevels = parseInt(node.attributes.getNamedItem('TileLevels').nodeValue);
        }
        let baseDegreesPerTile = 0;
        if (node.attributes.getNamedItem('BaseDegreesPerTile') != null) {
          baseDegreesPerTile = parseFloat(node.attributes.getNamedItem('BaseDegreesPerTile').nodeValue);
        }
        let bottomsUp = false;
        if (node.attributes.getNamedItem('BottomsUp') != null) {
          bottomsUp = ss.boolean(node.attributes.getNamedItem('BottomsUp').nodeValue);
        }
        let quadTreeMap = '';
        if (node.attributes.getNamedItem('QuadTreeMap') != null) {
          quadTreeMap = node.attributes.getNamedItem('QuadTreeMap').nodeValue;
        }
        let centerX = 0;
        if (node.attributes.getNamedItem('CenterX') != null) {
          centerX = parseFloat(node.attributes.getNamedItem('CenterX').nodeValue);
        }
        let centerY = 0;
        if (node.attributes.getNamedItem('CenterY') != null) {
          centerY = parseFloat(node.attributes.getNamedItem('CenterY').nodeValue);
        }
        let rotation = 0;
        if (node.attributes.getNamedItem('Rotation') != null) {
          rotation = parseFloat(node.attributes.getNamedItem('Rotation').nodeValue);
        }
        let sparse = false;
        if (node.attributes.getNamedItem('Sparse') != null) {
          sparse = ss.boolean(node.attributes.getNamedItem('Sparse').nodeValue);
        }
        return Imageset.create(name, url, type, bandPass, projection, Math.abs(Util.getHashCode(url)), baseTileLevel, tileLevels, 256, baseDegreesPerTile, fileType, bottomsUp, quadTreeMap, centerX, centerY, rotation, sparse, thumbnailUrl, stockSet, elevationModel, wf, offsetX, offsetY, creditText, creditsUrl, demUrl, alturl, meanRadius, referenceFrame);
      }
      else {
        return Imageset.createGeneric(type, bandPass);
      }
    }
    catch ($e1) {
      return null;
    }
  }
  static saveToXml (xmlWriter, imageset, alternateUrl) {
    xmlWriter._writeStartElement('ImageSet');
    xmlWriter._writeAttributeString('Generic', imageset.get_generic().toString());
    xmlWriter._writeAttributeString('DataSetType', Enums.toXml('ImageSetType', imageset.get_dataSetType()));
    xmlWriter._writeAttributeString('BandPass', Enums.toXml('BandPass', imageset.get_bandPass()));
    if (!imageset.get_generic()) {
      xmlWriter._writeAttributeString('Name', imageset.get_name());
      if (ss.emptyString(alternateUrl)) {
        xmlWriter._writeAttributeString('Url', imageset.get_url());
      }
      else {
        xmlWriter._writeAttributeString('Url', alternateUrl);
      }
      xmlWriter._writeAttributeString('DemUrl', imageset.get_demUrl());
      xmlWriter._writeAttributeString('BaseTileLevel', imageset.get_baseLevel().toString());
      xmlWriter._writeAttributeString('TileLevels', imageset.get_levels().toString());
      xmlWriter._writeAttributeString('BaseDegreesPerTile', imageset.get_baseTileDegrees().toString());
      xmlWriter._writeAttributeString('FileType', imageset.get_extension());
      xmlWriter._writeAttributeString('BottomsUp', imageset.get_bottomsUp().toString());
      xmlWriter._writeAttributeString('Projection', Enums.toXml('ProjectionType', imageset.get_projection()));
      xmlWriter._writeAttributeString('QuadTreeMap', imageset.get_quadTreeTileMap());
      xmlWriter._writeAttributeString('CenterX', imageset.get_centerX().toString());
      xmlWriter._writeAttributeString('CenterY', imageset.get_centerY().toString());
      xmlWriter._writeAttributeString('OffsetX', imageset.get_offsetX().toString());
      xmlWriter._writeAttributeString('OffsetY', imageset.get_offsetY().toString());
      xmlWriter._writeAttributeString('Rotation', imageset.get_rotation().toString());
      xmlWriter._writeAttributeString('Sparse', imageset.get_sparse().toString());
      xmlWriter._writeAttributeString('ElevationModel', imageset.get_elevationModel().toString());
      xmlWriter._writeAttributeString('StockSet', imageset.get_defaultSet().toString());
      xmlWriter._writeAttributeString('WidthFactor', imageset.get_widthFactor().toString());
      xmlWriter._writeAttributeString('MeanRadius', imageset.get_meanRadius().toString());
      xmlWriter._writeAttributeString('ReferenceFrame', imageset.get_referenceFrame());
      if (ss.emptyString(alternateUrl)) {
        xmlWriter._writeElementString('ThumbnailUrl', imageset.get_thumbnailUrl());
      }
      else {
        xmlWriter._writeElementString('ThumbnailUrl', imageset.get_url());
      }
    }
    xmlWriter._writeEndElement();
  }
  static createGeneric(dataSetType, bandPass) {
    const temp = new Imageset();
    temp._generic = true;
    temp._name = 'Generic';
    temp._sparse = false;
    temp._dataSetType = dataSetType;
    temp._bandPass = bandPass;
    temp._quadTreeTileMap = '';
    temp.url = '';
    temp._levels = 0;
    temp._baseTileDegrees = 0;
    temp._imageSetID = 0;
    temp._extension = '';
    temp._projection = 1;
    temp._bottomsUp = false;
    temp._baseLevel = 0;
    temp._mercator = (!temp._projection);
    temp._centerX = 0;
    temp._centerY = 0;
    temp._rotation = 0;
    temp._thumbnailUrl = '';
    temp._matrix = Matrix3d.get_identity();
    temp._matrix._multiply(Matrix3d._rotationX((temp.get_rotation() / 180 * Math.PI)));
    temp._matrix._multiply(Matrix3d._rotationZ((temp.get_centerY() / 180 * Math.PI)));
    temp._matrix._multiply(Matrix3d._rotationY((((360 - temp.get_centerX()) + 180) / 180 * Math.PI)));
    return temp;
  }
  static create (name, url, dataSetType, bandPass, projection, imageSetID, baseLevel, levels, tileSize, baseTileDegrees, extension, bottomsUp, quadTreeMap, centerX, centerY, rotation, sparse, thumbnailUrl, defaultSet, elevationModel, wf, offsetX, offsetY, credits, creditsUrl, demUrlIn, alturl, meanRadius, referenceFrame) {
    const temp = new Imageset();
    temp.set_referenceFrame(referenceFrame);
    temp.set_meanRadius(meanRadius);
    temp._altUrl = alturl;
    temp.demUrl = demUrlIn;
    temp._creditsText = credits;
    temp._creditsUrl = creditsUrl;
    temp._offsetY = offsetY;
    temp._offsetX = offsetX;
    temp._widthFactor = wf;
    temp._elevationModel = elevationModel;
    temp._defaultSet = defaultSet;
    temp._name = name;
    temp._sparse = sparse;
    temp._dataSetType = dataSetType;
    temp._bandPass = bandPass;
    temp._quadTreeTileMap = quadTreeMap;
    temp.url = url;
    temp._levels = levels;
    temp._baseTileDegrees = baseTileDegrees;
    temp._imageSetID = imageSetID;
    temp._extension = extension;
    temp._projection = projection;
    temp._bottomsUp = bottomsUp;
    temp._baseLevel = baseLevel;
    temp._mercator = (!projection);
    temp._centerX = centerX;
    temp._centerY = centerY;
    temp._rotation = rotation;
    temp._thumbnailUrl = thumbnailUrl;
    temp._computeMatrix();
    return temp;
  }
  get_wcsImage () {
    return this._wcsImage;
  }
  set_wcsImage (value) {
    this._wcsImage = value;
    return value;
  }
  get_projection () {
    return this._projection;
  }
  set_projection (value) {
    this._projection = value;
    return value;
  }
  get_referenceFrame () {
    return this._referenceFrame;
  }
  set_referenceFrame (value) {
    this._referenceFrame = value;
    return value;
  }
  get_imageSetID () {
    return this._imageSetID;
  }
  set_imageSetID (value) {
    this._imageSetID = value;
    return value;
  }
  get_baseTileDegrees () {
    return this._baseTileDegrees;
  }
  set_baseTileDegrees (value) {
    this._baseTileDegrees = value;
    return value;
  }
  get_widthFactor () {
    return this._widthFactor;
  }
  set_widthFactor (value) {
    this._widthFactor = value;
    return value;
  }
  getHashCode () {
    return Util.getHashCode(this.get_url());
  }
  get_url () {
    return this.url;
  }
  set_url (value) {
    this.url = value;
    return value;
  }
  get_demUrl () {
    if (ss.emptyString(this.demUrl) && !this._projection) {
      return '//worldwidetelescope.org/wwtweb/BingDemTile.aspx?Q={0},{1},{2}';
    }
    return this.demUrl;
  }
  set_demUrl (value) {
    this.demUrl = value;
    return value;
  }
  get_extension () {
    return this._extension;
  }
  set_extension (value) {
    this._extension = value;
    return value;
  }
  get_levels () {
    return this._levels;
  }
  set_levels (value) {
    this._levels = value;
    return value;
  }
  get_bottomsUp () {
    return this._bottomsUp;
  }
  set_bottomsUp (value) {
    this._bottomsUp = value;
    return value;
  }
  get_mercator () {
    return this._mercator;
  }
  set_mercator (value) {
    this._mercator = value;
    return value;
  }
  get_baseLevel () {
    return this._baseLevel;
  }
  set_baseLevel (value) {
    this._baseLevel = value;
    return value;
  }
  get_quadTreeTileMap () {
    return this._quadTreeTileMap;
  }
  set_quadTreeTileMap (value) {
    this._quadTreeTileMap = value;
    return value;
  }
  get_centerX () {
    return this._centerX;
  }
  set_centerX (value) {
    if (this._centerX !== value) {
      this._centerX = value;
      this._computeMatrix();
    }
    return value;
  }
  get_centerY () {
    return this._centerY;
  }
  set_centerY (value) {
    if (this._centerY !== value) {
      this._centerY = value;
      this._computeMatrix();
    }
    return value;
  }
  get_rotation () {
    return this._rotation;
  }
  set_rotation (value) {
    if (this._rotation !== value) {
      this._rotation = value;
      this._computeMatrix();
    }
    return value;
  }
  get_meanRadius () {
    return this._meanRadius;
  }
  set_meanRadius (value) {
    this._meanRadius = value;
    return value;
  }
  get_bandPass () {
    return this._bandPass;
  }
  set_bandPass (value) {
    this._bandPass = value;
    return value;
  }
  get_dataSetType () {
    return this._dataSetType;
  }
  set_dataSetType (value) {
    this._dataSetType = value;
    return value;
  }
  get_altUrl () {
    return this._altUrl;
  }
  set_altUrl (value) {
    this._altUrl = value;
    return value;
  }
  get_singleImage () {
    return this._singleImage;
  }
  set_singleImage (value) {
    this._singleImage = value;
    return value;
  }
  toString () {
    if (this.get_defaultSet()) {
      return this._name + ' *';
    } else {
      return this._name;
    }
  }
  get_stockImageSet () {
    if (this._generic || !this._defaultSet) {
      return this;
    } else {
      return Imageset.createGeneric(this.get_dataSetType(), this.get_bandPass());
    }
  }
  equals (obj) {
    if (obj == null) {
      return false;
    }
    if (!(ss.canCast(obj, Imageset))) {
      return false;
    }
    const b = obj;
    return (Util.getHashCode(b.get_url()) === Util.getHashCode(this.get_url()) && b.get_dataSetType() === this.get_dataSetType() && b.get_bandPass() === this.get_bandPass() && b.get_generic() === this.get_generic());
  }
  get_matrix () {
    if (!this._matrixComputed) {
      this._computeMatrix();
    }
    return this._matrix;
  }
  set_matrix (value) {
    this._matrix = value;
    return value;
  }
  _computeMatrix () {
    this._matrixComputed = true;
    this._matrix = Matrix3d.get_identity();
    this._matrix._multiply(Matrix3d._rotationX((this.get_rotation() / 180 * Math.PI)));
    this._matrix._multiply(Matrix3d._rotationZ((this.get_centerY() / 180 * Math.PI)));
    this._matrix._multiply(Matrix3d._rotationY(((360 - this.get_centerX()) / 180 * Math.PI)));
  }
  get_name () {
    return this._name;
  }
  set_name (value) {
    this._name = value;
    return value;
  }
  get_sparse () {
    return this._sparse;
  }
  set_sparse (value) {
    this._sparse = value;
    return value;
  }
  get_thumbnailUrl () {
    return this._thumbnailUrl;
  }
  set_thumbnailUrl (value) {
    this._thumbnailUrl = value;
    return value;
  }
  get_generic () {
    return this._generic;
  }
  set_generic (value) {
    this._generic = value;
    return value;
  }
  get_elevationModel () {
    return this._elevationModel;
  }
  set_elevationModel (value) {
    this._elevationModel = value;
    return value;
  }
  get_defaultSet () {
    return this._defaultSet;
  }
  set_defaultSet (value) {
    this._defaultSet = value;
    return value;
  }
  get_offsetX () {
    return this._offsetX;
  }
  set_offsetX (value) {
    this._offsetX = value;
    return value;
  }
  get_offsetY () {
    return this._offsetY;
  }
  set_offsetY (value) {
    this._offsetY = value;
    return value;
  }
  get_creditsText () {
    return this._creditsText;
  }
  set_creditsText (value) {
    this._creditsText = value;
    return value;
  }
  get_creditsUrl () {
    return this._creditsUrl;
  }
  set_creditsUrl (value) {
    this._creditsUrl = value;
    return value;
  }
  get_isMandelbrot () {
    return false;
  }
  get_thumbnail () {
    return this._thumbnail;
  }
  set_thumbnail (value) {
    this._thumbnail = value;
    return value;
  }
  get_bounds () {
    return this._bounds;
  }
  set_bounds (value) {
    this._bounds = value;
    return value;
  }
  get_isImage () {
    return true;
  }
  get_isTour () {
    return false;
  }
  get_isFolder () {
    return false;
  }
  get_isCloudCommunityItem () {
    return false;
  }
  get_readOnly () {
    return false;
  }
  get_children () {
    return [];
  }
};