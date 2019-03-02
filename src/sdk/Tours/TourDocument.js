import {Guid, Util} from '../Util';
import ss from '../scriptsharp/ss';
import {Enums} from '../enums';
import {ReferenceFrame} from '../Layers/ReferenceFrame';
import {LayerManager, LayerMap} from '../Layers/LayerManager';
import {Layer} from '../Layers/Layer';
import {Texture} from '../Graphics/Texture';
import {ViewMoverSlew} from '../ViewMover';
import {FileCabinet} from './FileCabilnet';
import {Imageset} from '../Imageset';


export class TourDocument {
  constructor() {
    this._tourDirty = 0;
    this._workingDirectory = '';
    this.url = '';
    this._tagId = '';
    this._representativeThumbnailTourstop = 0;
    this._id = '';
    this._title = '';
    this._runTime = 0;
    this._lastDirtyCheck = 0;
    this._description = '';
    this._attributesAndCredits = '';
    this._authorEmailOther = '';
    this._authorEmail = '';
    this._authorUrl = '';
    this._authorPhone = '';
    this._authorContactText = '';
    this._orgName = 'None';
    this._orgUrl = '';
    this._author = '';
    this._authorImageUrl = '';
    this._authorImage = null;
    this._organizationUrl = '';
    this._filename = '';
    this._level = 0;
    this._type = 268435456;
    this._taxonomy = '';
    this._keywords = '';
    this._objects = '';
    this._editMode = false;
    this.explicitTourLinks = [];
    this.implicitTourLinks = [];
    this._tourStops = [];
    this._currentTourstopIndex = -1;
    this._textureList = {};
    this._textureList2d = {};
    this._fileCache = {};
    this.dontCleanUpTempFiles = false;
    this._id = Guid.newGuid().toString();
  }

  static get_baseWorkingDirectory() {
    return '';
  }

  fromUrl(url, callMe) {
    const temp = new TourDocument();
    temp.url = url;
    temp._callMe = callMe;
    temp._cabinet = FileCabinet.fromUrl(url, ss.bind('_loadXmlDocument', temp));
    return temp;
  }

  static fromUrlRaw(url, callMe) {
    const temp = new TourDocument();
    temp.url = url;
    temp._callMe = callMe;
    temp._cabinet = FileCabinet.fromUrl(url, callMe);
    return temp;
  }

  get_tourDirty() {
    return this._tourDirty > 0;
  }

  set_tourDirty(value) {
    if (value) {
      this._tourDirty++;
    } else {
      this._tourDirty = 0;
    }
    return value;
  }

  get_workingDirectory() {
    if (ss.emptyString(this._workingDirectory)) {
      this._workingDirectory = TourDocument.get_baseWorkingDirectory() + this._id + '\\';
    }
    return this._workingDirectory;
  }

  set_workingDirectory(value) {
    this._workingDirectory = value;
    return value;
  }

  _loadXmlDocument() {
    const $this = this;

    const master = this._cabinet.get_masterFile();
    const doc = new FileReader();
    doc.onloadend = ee => {
      const data = ss.safeCast(doc.result, String);
      const xParser = new DOMParser();
      $this.fromXml(xParser.parseFromString(data, 'text/xml'));
      $this._callMe();
    };
    doc.readAsText(this._cabinet.getFileBlob(master));
  }

  fromXml(doc) {
    const root = Util.selectSingleNode(doc, 'Tour');
    this._id = root.attributes.getNamedItem('ID').nodeValue;
    this.set_title(root.attributes.getNamedItem('Title').nodeValue);
    this.set_author(root.attributes.getNamedItem('Author').nodeValue);
    if (root.attributes.getNamedItem('Descirption') != null) {
      this.set_description(root.attributes.getNamedItem('Descirption').nodeValue);
    }
    if (root.attributes.getNamedItem('AuthorEmail') != null) {
      this._authorEmail = root.attributes.getNamedItem('AuthorEmail').nodeValue;
    }
    if (root.attributes.getNamedItem('Keywords') != null) {
      this.set_keywords(root.attributes.getNamedItem('Keywords').nodeValue);
    }
    if (root.attributes.getNamedItem('OrganizationName') != null) {
      this.set_orgName(root.attributes.getNamedItem('OrganizationName').nodeValue);
    }
    this._organizationUrl = root.attributes.getNamedItem('OrganizationUrl').nodeValue;
    this._level = Enums.parse('UserLevel', root.attributes.getNamedItem('UserLevel').nodeValue);
    this._type = Enums.parse('Classification', root.attributes.getNamedItem('Classification').nodeValue);
    this._taxonomy = root.attributes.getNamedItem('Taxonomy').nodeValue;
    const TourStops = Util.selectSingleNode(root, 'TourStops');
    const $enum1 = ss.enumerate(TourStops.childNodes);
    while ($enum1.moveNext()) {
      const tourStop = $enum1.current;
      if (tourStop.nodeName === 'TourStop') {
        this.addTourStop(Overlay._fromXml(this, tourStop));
      }
    }
    const Frames = Util.selectSingleNode(root, 'ReferenceFrames');
    if (Frames != null) {
      const $enum2 = ss.enumerate(Frames.childNodes);
      while ($enum2.moveNext()) {
        const frame = $enum2.current;
        if (frame.nodeName === 'ReferenceFrame') {
          const newFrame = new ReferenceFrame();
          newFrame.initializeFromXml(frame);
          if (!ss.keyExists(LayerManager.get_allMaps(), newFrame.name)) {
            const map = new LayerMap(newFrame.name, 18);
            map.frame = newFrame;
            map.loadedFromTour = true;
            LayerManager.get_allMaps()[newFrame.name] = map;
          }
        }
      }
      LayerManager.connectAllChildren();
      LayerManager.loadTree();
    }
    const Layers = Util.selectSingleNode(root, 'Layers');
    if (Layers != null) {
      const $enum3 = ss.enumerate(Layers.childNodes);
      while ($enum3.moveNext()) {
        const layer = $enum3.current;
        if (layer.nodeName === 'Layer') {
          const newLayer = Layer.fromXml(layer, true);
          if (newLayer != null) {
            const fileName = ss.format('{0}.txt', newLayer.id.toString());
            if (ss.keyExists(LayerManager.get_layerList(), newLayer.id)) {
              LayerManager.deleteLayerByID(newLayer.id, true, false);
            }
            try {
              newLayer.loadedFromTour = true;
              Layer.loadData(this, fileName);
              LayerManager.add(newLayer, false);
            } catch ($e4) {
            }
          }
        }
      }
      LayerManager.loadTree();
    }
    this._tourDirty = 0;
  }

  saveToDataUrl() {
    return URL.createObjectURL(this.saveToBlob());
    ;
  }

  saveToBlob() {
    const excludeAudio = false;
    this.cleanUp();
    const tourXml = this.getTourXML();
    const fc = new FileCabinet();
    fc.set_packageID(this.get_id());
    fc.addFile('Tour.wwtxml', new Blob([tourXml]));
    if (this._authorImage != null) {
    }
    const $enum1 = ss.enumerate(this.get_tourStops());
    while ($enum1.moveNext()) {
      const stop = $enum1.current;
      stop._addFilesToCabinet(fc, excludeAudio);
    }
    const masterList = this._createLayerMasterList();
    const $enum2 = ss.enumerate(masterList);
    while ($enum2.moveNext()) {
      const id = $enum2.current;
      if (ss.keyExists(LayerManager.get_layerList(), id)) {
        LayerManager.get_layerList()[id].addFilesToCabinet(fc);
      }
    }
    this.set_tourDirty(false);
    return fc.packageFiles();
  }

  getTourXML() {
    const xmlWriter = new XmlTextWriter();
    xmlWriter.formatting = 1;
    xmlWriter._writeProcessingInstruction('xml', `version='1.0' encoding='UTF-8'`);
    xmlWriter._writeStartElement('Tour');
    xmlWriter._writeAttributeString('ID', this._id);
    xmlWriter._writeAttributeString('Title', this._title);
    xmlWriter._writeAttributeString('Descirption', this.get_description());
    xmlWriter._writeAttributeString('Description', this.get_description());
    xmlWriter._writeAttributeString('RunTime', (this.get_runTime() / 1000).toString());
    xmlWriter._writeAttributeString('Author', this._author);
    xmlWriter._writeAttributeString('AuthorEmail', this._authorEmail);
    xmlWriter._writeAttributeString('OrganizationUrl', this._organizationUrl);
    xmlWriter._writeAttributeString('OrganizationName', this.get_orgName());
    xmlWriter._writeAttributeString('Keywords', this.get_keywords());
    xmlWriter._writeAttributeString('UserLevel', Enums.toXml('UserLevel', this._level));
    xmlWriter._writeAttributeString('Classification', Enums.toXml('Classification', this._type));
    xmlWriter._writeAttributeString('Taxonomy', this._taxonomy);
    const timeLineTour = TourDocument._isTimelineTour();
    xmlWriter._writeAttributeString('TimeLineTour', timeLineTour.toString());
    xmlWriter._writeStartElement('TourStops');
    const $enum1 = ss.enumerate(this.get_tourStops());
    while ($enum1.moveNext()) {
      const stop = $enum1.current;
      stop._saveToXml(xmlWriter, true);
    }
    xmlWriter._writeEndElement();
    const masterList = this._createLayerMasterList();
    const referencedFrames = TourDocument._getReferenceFrameList();
    xmlWriter._writeStartElement('ReferenceFrames');
    const $enum2 = ss.enumerate(referencedFrames);
    while ($enum2.moveNext()) {
      const item = $enum2.current;
      Imageset.saveToXml(xmlWriter);
    }
    xmlWriter._writeEndElement();
    xmlWriter._writeStartElement('Layers');
    const $enum3 = ss.enumerate(masterList);
    while ($enum3.moveNext()) {
      const id = $enum3.current;
      if (ss.keyExists(LayerManager.get_layerList(), id)) {
        Imageset.saveToXml(xmlWriter);
      }
    }
    xmlWriter._writeEndElement();
    xmlWriter._writeFullEndElement();
    xmlWriter._close();
    return xmlWriter.body;
  }

  static _getReferenceFrameList() {
    const list = [];
    const $enum1 = ss.enumerate(ss.keys(LayerManager.get_allMaps()));
    while ($enum1.moveNext()) {
      const key = $enum1.current;
      const lm = LayerManager.get_allMaps()[key];
      if ((lm.frame.reference === 18 || lm.frame.reference === 19) && !(list.indexOf(lm.frame) >= 0) && !lm.frame._systemGenerated) {
        list.push(lm.frame);
      }
    }
    return list;
  }

  _createLayerMasterList() {
    const masterList = [];
    const $enum1 = ss.enumerate(this.get_tourStops());
    while ($enum1.moveNext()) {
      const stop = $enum1.current;
      const $enum2 = ss.enumerate(ss.keys(stop.layers));
      while ($enum2.moveNext()) {
        const id = $enum2.current;
        if (!(masterList.indexOf(id) >= 0)) {
          if (ss.keyExists(LayerManager.get_layerList(), id)) {
            masterList.push(id);
          }
        }
      }
    }
    return masterList;
  }

  static _isTimelineTour() {
    return false;
  }

  get_tagId() {
    return this._tagId;
  }

  set_tagId(value) {
    this._tagId = value;
    return value;
  }

  static get_authorThumbnailFilename() {
    return 'Author.Png';
  }

  get_tourThumbnailFilename() {
    if (this._representativeThumbnailTourstop < this._tourStops.length) {
      return this._tourStops[this._representativeThumbnailTourstop].get_tourStopThumbnailFilename();
    } else {
      return null;
    }
  }

  get_id() {
    return this._id;
  }

  set_id(value) {
    this._id = value;
    return value;
  }

  get_title() {
    return this._title;
  }

  set_title(value) {
    this._title = value;
    this.set_tourDirty(true);
    return value;
  }

  get_runTime() {
    if (!this._runTime || this._lastDirtyCheck !== this._tourDirty) {
      this._runTime = this._calculateRunTime();
      this._lastDirtyCheck = this._tourDirty;
    }
    return this._runTime;
  }

  get_description() {
    return this._description;
  }

  set_description(value) {
    this._description = value;
    this.set_tourDirty(true);
    return value;
  }

  get_attributesAndCredits() {
    return this._attributesAndCredits;
  }

  set_attributesAndCredits(value) {
    this._attributesAndCredits = value;
    this.set_tourDirty(true);
    return value;
  }

  get_authorEmailOther() {
    return this._authorEmailOther;
  }

  set_authorEmailOther(value) {
    this._authorEmailOther = value;
    this.set_tourDirty(true);
    return value;
  }

  get_authorEmail() {
    return this._authorEmail;
  }

  set_authorEmail(value) {
    this._authorEmail = value;
    this.set_tourDirty(true);
    return value;
  }

  get_authorUrl() {
    return this._authorUrl;
  }

  set_authorUrl(value) {
    this._authorUrl = value;
    this.set_tourDirty(true);
    return value;
  }

  get_authorPhone() {
    return this._authorPhone;
  }

  set_authorPhone(value) {
    this._authorPhone = value;
    this.set_tourDirty(true);
    return value;
  }

  get_authorContactText() {
    return this._authorContactText;
  }

  set_authorContactText(value) {
    this._authorContactText = value;
    this.set_tourDirty(true);
    return value;
  }

  get_orgName() {
    return this._orgName;
  }

  set_orgName(value) {
    this._orgName = value;
    this.set_tourDirty(true);
    return value;
  }

  get_orgUrl() {
    return this._orgUrl;
  }

  set_orgUrl(value) {
    this._orgUrl = value;
    this.set_tourDirty(true);
    return value;
  }

  get_author() {
    return this._author;
  }

  set_author(value) {
    this._author = value;
    this.set_tourDirty(true);
    return value;
  }

  get_authorImageUrl() {
    return this._authorImageUrl;
  }

  set_authorImageUrl(value) {
    this._authorImageUrl = value;
    this.set_tourDirty(true);
    return value;
  }

  get_authorImage() {
    return this._authorImage;
  }

  set_authorImage(value) {
    this._authorImage = value;
    this.set_tourDirty(true);
    return value;
  }

  get_organizationUrl() {
    return this._organizationUrl;
  }

  set_organizationUrl(value) {
    this._organizationUrl = value;
    this.set_tourDirty(true);
    return value;
  }

  get_fileName() {
    return this._filename;
  }

  set_fileName(value) {
    this._filename = value;
    return value;
  }

  get_level() {
    return this._level;
  }

  set_level(value) {
    this._level = value;
    this.set_tourDirty(true);
    return value;
  }

  get_type() {
    return this._type;
  }

  set_type(value) {
    this._type = value;
    this.set_tourDirty(true);
    return value;
  }

  get_taxonomy() {
    return this._taxonomy;
  }

  set_taxonomy(value) {
    this._taxonomy = value;
    this.set_tourDirty(true);
    return value;
  }

  get_keywords() {
    return this._keywords;
  }

  set_keywords(value) {
    this._keywords = value;
    this.set_tourDirty(true);
    return value;
  }

  get_objects() {
    return this._objects;
  }

  set_objects(value) {
    this._objects = value;
    this.set_tourDirty(true);
    return value;
  }

  get_editMode() {
    return this._editMode;
  }

  set_editMode(value) {
    this._editMode = value;
    return value;
  }

  get_tourStops() {
    return this._tourStops;
  }

  set_tourStops(value) {
    this._tourStops = value;
    return value;
  }

  get_currentTourstopIndex() {
    return this._currentTourstopIndex;
  }

  set_currentTourstopIndex(value) {
    this._currentTourstopIndex = value;
    return value;
  }

  addTourStop(ts) {
    ts.set_owner(this);
    this.get_tourStops().push(ts);
    this._currentTourstopIndex = this._tourStops.length - 1;
    this.set_tourDirty(true);
  }

  insertTourStop(ts) {
    ts.set_owner(this);
    if (this._currentTourstopIndex > -1) {
      this.get_tourStops().splice(this._currentTourstopIndex, 0, ts);
    } else {
      this.get_tourStops().push(ts);
      this._currentTourstopIndex = this._tourStops.length - 1;
    }
    this.set_tourDirty(true);
  }

  insertAfterTourStop(ts) {
    ts.set_owner(this);
    if (this._currentTourstopIndex > -1 || this._currentTourstopIndex < this.get_tourStops().length) {
      this.get_tourStops().splice(this._currentTourstopIndex + 1, 0, ts);
    } else {
      this.get_tourStops().push(ts);
      this._currentTourstopIndex = this._tourStops.length - 1;
    }
    this.set_tourDirty(true);
  }

  removeTourStop(ts) {
    ss.remove(this._tourStops, ts);
    if (this._currentTourstopIndex > this._tourStops.length - 1) {
      this._currentTourstopIndex--;
    }
    this.set_tourDirty(true);
  }

  _calculateRunTime() {
    let totalTime = 0;
    for (let i = 0; i < this._tourStops.length; i++) {
      totalTime += this._tourStops[i].get_duration();
      if (i > 0) {
        switch (this._tourStops[i].get__transition()) {
          case 0:
            if (this._tourStops[i].get_target().get_backgroundImageset() == null || (this._tourStops[i - 1].get_target().get_backgroundImageset().get_dataSetType() === this._tourStops[i].get_target().get_backgroundImageset().get_dataSetType() && ((this._tourStops[i - 1].get_target().get_backgroundImageset().get_dataSetType() !== 4) || (this._tourStops[i - 1].get_target().get_target() === this._tourStops[i].get_target().get_target())))) {
              const start = (this._tourStops[i - 1].get_endTarget() == null) ? this._tourStops[i - 1].get_target().get_camParams() : this._tourStops[i - 1].get_endTarget().get_camParams();
              const slew = ViewMoverSlew.create(start, this._tourStops[i].get_target().get_camParams());
              totalTime += slew.get_moveTime() * 1000;
            }
            break;
          case 2:
            break;
          case 1:
            break;
          case 5:
            break;
          default:
            break;
        }
      }
    }
    return ss.truncate(totalTime);
  }

  elapsedTimeTillTourstop(index) {
    if (!index && index >= this._tourStops.length) {
      return 0;
    }
    let totalTime = 0;
    for (let i = 0; i < index; i++) {
      totalTime += this._tourStops[i].get_duration();
      if (i > 0) {
        switch (this._tourStops[i].get__transition()) {
          case 0:
            const start = (this._tourStops[i - 1].get_endTarget() == null) ? this._tourStops[i - 1].get_target().get_camParams() : this._tourStops[i - 1].get_endTarget().get_camParams();
            if (this._tourStops[i - 1].get_target().get_backgroundImageset().get_dataSetType() === this._tourStops[i].get_target().get_backgroundImageset().get_dataSetType() && ((this._tourStops[i - 1].get_target().get_backgroundImageset().get_dataSetType() !== 4) || (this._tourStops[i - 1].get_target().get_target() === this._tourStops[i].get_target().get_target()))) {
              const slew = ViewMoverSlew.create(start, this._tourStops[i].get_target().get_camParams());
              totalTime += slew.get_moveTime() * 1000;
            }
            break;
          case 2:
            break;
          case 1:
            break;
          case 5:
            break;
          default:
            break;
        }
      }
    }
    return totalTime / 1000;
  }

  elapsedTimeSinceLastMaster(index) {
    let masterOut = null;
    if (!index && index >= this._tourStops.length) {
      return null;
    }
    let totalTime = 0;
    for (let i = 0; i < index; i++) {
      if (this._tourStops[i].get_masterSlide()) {
        totalTime = 0;
        masterOut = this._tourStops[i];
      }
      totalTime += this._tourStops[i].get_duration();
      if (i > 0) {
        switch (this._tourStops[i].get__transition()) {
          case 0:
            const start = (this._tourStops[i - 1].get_endTarget() == null) ? this._tourStops[i - 1].get_target().get_camParams() : this._tourStops[i - 1].get_endTarget().get_camParams();
            if (this._tourStops[i - 1].get_target().get_backgroundImageset().get_dataSetType() === this._tourStops[i].get_target().get_backgroundImageset().get_dataSetType() && ((this._tourStops[i - 1].get_target().get_backgroundImageset().get_dataSetType() !== 4) || (this._tourStops[i - 1].get_target().get_target() === this._tourStops[i].get_target().get_target()))) {
              const slew = ViewMoverSlew.create(start, this._tourStops[i].get_target().get_camParams());
              totalTime += slew.get_moveTime() * 1000;
            }
            break;
          case 2:
            break;
          case 1:
            break;
          case 5:
            break;
          default:
            break;
        }
      }
    }
    return new MasterTime(masterOut, totalTime / 1000);
  }

  getMasterSlideForIndex(index) {
    let master = -1;
    for (let i = 0; i < index; i++) {
      if (this._tourStops[i].get_masterSlide()) {
        master = i;
      }
    }
    if (master === -1) {
      return null;
    }
    return this._tourStops[master];
  }

  getTourStopIndexByID(id) {
    if (!id || id === 'Next') {
      return this._currentTourstopIndex++;
    }
    let index = 0;
    const $enum1 = ss.enumerate(this._tourStops);
    while ($enum1.moveNext()) {
      const stop = $enum1.current;
      if (stop.get_id() === id) {
        return index;
      }
      index++;
    }
    return -1;
  }

  cleanUp() {
  }

  getCachedTexture(filename, callMe) {
    if (this._textureList == null) {
      this._textureList = {};
    }
    if (ss.keyExists(this._textureList, filename)) {
      callMe();
      return this._textureList[filename];
    }
    const url = this.getFileStream(filename);
    if (!ss.whitespace(url)) {
      const texture = document.createElement('img');
      texture.src = this.getFileStream(filename);
      texture.addEventListener('load', () => {
        callMe();
      }, false);
      this._textureList[filename] = texture;
      return texture;
    } else {
      return null;
    }
  }

  getCachedTexture2d(filename) {
    if (this._textureList2d == null) {
      this._textureList2d = {};
    }
    if (ss.keyExists(this._textureList2d, filename)) {
      return this._textureList2d[filename];
    }
    const texture = new Texture();
    texture.load(this.getFileStream(filename));
    this._textureList2d[filename] = texture;
    return texture;
  }

  addCachedFile(filename, file) {
    this._fileCache[filename] = file;
    if (ss.keyExists(this._textureList2d, filename)) {
      delete this._textureList2d[filename];
    }
    if (ss.keyExists(this._textureList, filename)) {
      delete this._textureList[filename];
    }
  }

  getFileStream(filename) {
    const blob = this.getFileBlob(filename);
    if (blob == null) {
      return null;
    }
    return URL.createObjectURL(blob);
    ;
  }

  getFileBlob(filename) {
    if (ss.keyExists(this._fileCache, filename)) {
      return this._fileCache[filename];
    } else if (this._cabinet != null) {
      return this._cabinet.getFileBlob(this.get_workingDirectory() + filename);
    } else {
      return null;
    }
  }

  get_currentTourStop() {
    if (this._currentTourstopIndex > -1) {
      return this.get_tourStops()[this._currentTourstopIndex];
    } else {
      return null;
    }
  }

  set_currentTourStop(value) {
    let i = 0;
    const $enum1 = ss.enumerate(this.get_tourStops());
    while ($enum1.moveNext()) {
      const stop = $enum1.current;
      if (stop === value) {
        if (this._currentTourstopIndex > -1) {
        }
        this._currentTourstopIndex = i;
        break;
      }
      i++;
    }
    return value;
  }

  clearTempFiles() {
  }
};