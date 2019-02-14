
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

export function Imageset() {
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
Imageset.getTileKey = function(imageset, level, x, y) {
  return imageset.get_imageSetID().toString() + '\\' + level.toString() + '\\' + y.toString() + '_' + x.toString();
};
Imageset.getNewTile = function(){
  console.warn({getNewTile:arguments});
};
Imageset.fromXMLNode = function(node) {
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
};
Imageset.saveToXml = function(xmlWriter, imageset, alternateUrl) {
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
};
Imageset.createGeneric = function(dataSetType, bandPass) {
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
};
Imageset.create = function(name, url, dataSetType, bandPass, projection, imageSetID, baseLevel, levels, tileSize, baseTileDegrees, extension, bottomsUp, quadTreeMap, centerX, centerY, rotation, sparse, thumbnailUrl, defaultSet, elevationModel, wf, offsetX, offsetY, credits, creditsUrl, demUrlIn, alturl, meanRadius, referenceFrame) {
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
};
export const Imageset$ = {
  get_wcsImage: function () {
    return this._wcsImage;
  },
  set_wcsImage: function (value) {
    this._wcsImage = value;
    return value;
  },
  get_projection: function () {
    return this._projection;
  },
  set_projection: function (value) {
    this._projection = value;
    return value;
  },
  get_referenceFrame: function () {
    return this._referenceFrame;
  },
  set_referenceFrame: function (value) {
    this._referenceFrame = value;
    return value;
  },
  get_imageSetID: function () {
    return this._imageSetID;
  },
  set_imageSetID: function (value) {
    this._imageSetID = value;
    return value;
  },
  get_baseTileDegrees: function () {
    return this._baseTileDegrees;
  },
  set_baseTileDegrees: function (value) {
    this._baseTileDegrees = value;
    return value;
  },
  get_widthFactor: function () {
    return this._widthFactor;
  },
  set_widthFactor: function (value) {
    this._widthFactor = value;
    return value;
  },
  getHashCode: function () {
    return Util.getHashCode(this.get_url());
  },
  get_url: function () {
    return this.url;
  },
  set_url: function (value) {
    this.url = value;
    return value;
  },
  get_demUrl: function () {
    if (ss.emptyString(this.demUrl) && !this._projection) {
      return '//worldwidetelescope.org/wwtweb/BingDemTile.aspx?Q={0},{1},{2}';
    }
    return this.demUrl;
  },
  set_demUrl: function (value) {
    this.demUrl = value;
    return value;
  },
  get_extension: function () {
    return this._extension;
  },
  set_extension: function (value) {
    this._extension = value;
    return value;
  },
  get_levels: function () {
    return this._levels;
  },
  set_levels: function (value) {
    this._levels = value;
    return value;
  },
  get_bottomsUp: function () {
    return this._bottomsUp;
  },
  set_bottomsUp: function (value) {
    this._bottomsUp = value;
    return value;
  },
  get_mercator: function () {
    return this._mercator;
  },
  set_mercator: function (value) {
    this._mercator = value;
    return value;
  },
  get_baseLevel: function () {
    return this._baseLevel;
  },
  set_baseLevel: function (value) {
    this._baseLevel = value;
    return value;
  },
  get_quadTreeTileMap: function () {
    return this._quadTreeTileMap;
  },
  set_quadTreeTileMap: function (value) {
    this._quadTreeTileMap = value;
    return value;
  },
  get_centerX: function () {
    return this._centerX;
  },
  set_centerX: function (value) {
    if (this._centerX !== value) {
      this._centerX = value;
      this._computeMatrix();
    }
    return value;
  },
  get_centerY: function () {
    return this._centerY;
  },
  set_centerY: function (value) {
    if (this._centerY !== value) {
      this._centerY = value;
      this._computeMatrix();
    }
    return value;
  },
  get_rotation: function () {
    return this._rotation;
  },
  set_rotation: function (value) {
    if (this._rotation !== value) {
      this._rotation = value;
      this._computeMatrix();
    }
    return value;
  },
  get_meanRadius: function () {
    return this._meanRadius;
  },
  set_meanRadius: function (value) {
    this._meanRadius = value;
    return value;
  },
  get_bandPass: function () {
    return this._bandPass;
  },
  set_bandPass: function (value) {
    this._bandPass = value;
    return value;
  },
  get_dataSetType: function () {
    return this._dataSetType;
  },
  set_dataSetType: function (value) {
    this._dataSetType = value;
    return value;
  },
  get_altUrl: function () {
    return this._altUrl;
  },
  set_altUrl: function (value) {
    this._altUrl = value;
    return value;
  },
  get_singleImage: function () {
    return this._singleImage;
  },
  set_singleImage: function (value) {
    this._singleImage = value;
    return value;
  },
  toString: function () {
    if (this.get_defaultSet()) {
      return this._name + ' *';
    } else {
      return this._name;
    }
  },
  get_stockImageSet: function () {
    if (this._generic || !this._defaultSet) {
      return this;
    } else {
      return Imageset.createGeneric(this.get_dataSetType(), this.get_bandPass());
    }
  },
  equals: function (obj) {
    if (obj == null) {
      return false;
    }
    if (!(ss.canCast(obj, Imageset))) {
      return false;
    }
    const b = obj;
    return (Util.getHashCode(b.get_url()) === Util.getHashCode(this.get_url()) && b.get_dataSetType() === this.get_dataSetType() && b.get_bandPass() === this.get_bandPass() && b.get_generic() === this.get_generic());
  },
  get_matrix: function () {
    if (!this._matrixComputed) {
      this._computeMatrix();
    }
    return this._matrix;
  },
  set_matrix: function (value) {
    this._matrix = value;
    return value;
  },
  _computeMatrix: function () {
    this._matrixComputed = true;
    this._matrix = Matrix3d.get_identity();
    this._matrix._multiply(Matrix3d._rotationX((this.get_rotation() / 180 * Math.PI)));
    this._matrix._multiply(Matrix3d._rotationZ((this.get_centerY() / 180 * Math.PI)));
    this._matrix._multiply(Matrix3d._rotationY(((360 - this.get_centerX()) / 180 * Math.PI)));
  },
  get_name: function () {
    return this._name;
  },
  set_name: function (value) {
    this._name = value;
    return value;
  },
  get_sparse: function () {
    return this._sparse;
  },
  set_sparse: function (value) {
    this._sparse = value;
    return value;
  },
  get_thumbnailUrl: function () {
    return this._thumbnailUrl;
  },
  set_thumbnailUrl: function (value) {
    this._thumbnailUrl = value;
    return value;
  },
  get_generic: function () {
    return this._generic;
  },
  set_generic: function (value) {
    this._generic = value;
    return value;
  },
  get_elevationModel: function () {
    return this._elevationModel;
  },
  set_elevationModel: function (value) {
    this._elevationModel = value;
    return value;
  },
  get_defaultSet: function () {
    return this._defaultSet;
  },
  set_defaultSet: function (value) {
    this._defaultSet = value;
    return value;
  },
  get_offsetX: function () {
    return this._offsetX;
  },
  set_offsetX: function (value) {
    this._offsetX = value;
    return value;
  },
  get_offsetY: function () {
    return this._offsetY;
  },
  set_offsetY: function (value) {
    this._offsetY = value;
    return value;
  },
  get_creditsText: function () {
    return this._creditsText;
  },
  set_creditsText: function (value) {
    this._creditsText = value;
    return value;
  },
  get_creditsUrl: function () {
    return this._creditsUrl;
  },
  set_creditsUrl: function (value) {
    this._creditsUrl = value;
    return value;
  },
  get_isMandelbrot: function () {
    return false;
  },
  get_thumbnail: function () {
    return this._thumbnail;
  },
  set_thumbnail: function (value) {
    this._thumbnail = value;
    return value;
  },
  get_bounds: function () {
    return this._bounds;
  },
  set_bounds: function (value) {
    this._bounds = value;
    return value;
  },
  get_isImage: function () {
    return true;
  },
  get_isTour: function () {
    return false;
  },
  get_isFolder: function () {
    return false;
  },
  get_isCloudCommunityItem: function () {
    return false;
  },
  get_readOnly: function () {
    return false;
  },
  get_children: function () {
    return [];
  }
};