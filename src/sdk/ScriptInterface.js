

// wwtlib.ScriptInterface

import ss from './scriptsharp/ss';
import {LayerManager} from './Layers/LayerManager';
import {WWTControl} from './WWTControl';
import {ImageSetLayer} from './ImageSetLayer';
import {Imageset} from './Imageset';
import {Util} from './Util';
import {Folder} from './Folder';
import {Annotation, Circle, Poly, PolyLine} from './Annotation';
import {Wtml} from './WTML';
import {FitsImage} from './Layers/FitsImage';


export class ScriptInterface{
  constructor() {
    this._missedReady = false;
    this.hideTourFeedback = false;
    this._smoothAnimation = false;
    this._showCaptions = true;
  }
  add_ready(value) {
    this.__ready = ss.bindAdd(this.__ready, value);
  }
  remove_ready(value) {
    this.__ready = ss.bindSub(this.__ready, value);
  }
  _fireReady() {
    if (this.__ready != null) {
      this.__ready(this, new EventArgs());
    } else {
      this._missedReady = true;
    }
  }
  add_collectionLoaded(value) {
    this.__collectionLoaded = ss.bindAdd(this.__collectionLoaded, value);
  }
  remove_collectionLoaded(value) {
    this.__collectionLoaded = ss.bindSub(this.__collectionLoaded, value);
  }
  _fireCollectionLoaded(url) {
    if (this.__collectionLoaded != null) {
      this.__collectionLoaded(this, new CollectionLoadedEventArgs(url));
    }
  }
  add_colorPickerDisplay(value) {
    this.__colorPickerDisplay = ss.bindAdd(this.__colorPickerDisplay, value);
  }
  remove_colorPickerDisplay(value) {
    this.__colorPickerDisplay = ss.bindSub(this.__colorPickerDisplay, value);
  }
  add_voTableDisplay(value) {
    this.__voTableDisplay = ss.bindAdd(this.__voTableDisplay, value);
  }
  remove_voTableDisplay(value) {
    this.__voTableDisplay = ss.bindSub(this.__voTableDisplay, value);
  }
  add_refreshLayerManager(value) {
    this.__refreshLayerManager = ss.bindAdd(this.__refreshLayerManager, value);
  }
  remove_refreshLayerManager(value) {
    this.__refreshLayerManager = ss.bindSub(this.__refreshLayerManager, value);
  }
  add_arrived(value) {
    this.__arrived = ss.bindAdd(this.__arrived, value);
  }
  remove_arrived(value) {
    this.__arrived = ss.bindSub(this.__arrived, value);
  }
  add_clicked(value) {
    this.__clicked = ss.bindAdd(this.__clicked, value);
  }
  remove_clicked(value) {
    this.__clicked = ss.bindSub(this.__clicked, value);
  }
  add_annotationClicked(value) {
    this.__annotationClicked = ss.bindAdd(this.__annotationClicked, value);
  }
  remove_annotationClicked(value) {
    this.__annotationClicked = ss.bindSub(this.__annotationClicked, value);
  }
  add_imageryLoaded(value) {
    this.__imageryLoaded = ss.bindAdd(this.__imageryLoaded, value);
  }
  remove_imageryLoaded(value) {
    this.__imageryLoaded = ss.bindSub(this.__imageryLoaded, value);
  }
  add_tourReady(value) {
    this.__tourReady = ss.bindAdd(this.__tourReady, value);
  }
  remove_tourReady(value) {
    this.__tourReady = ss.bindSub(this.__tourReady, value);
  }
  add_tourPaused(value) {
    this.__tourPaused = ss.bindAdd(this.__tourPaused, value);
  }
  remove_tourPaused(value) {
    this.__tourPaused = ss.bindSub(this.__tourPaused, value);
  }
  add_tourResumed(value) {
    this.__tourResumed = ss.bindAdd(this.__tourResumed, value);
  }
  remove_tourResumed(value) {
    this.__tourResumed = ss.bindSub(this.__tourResumed, value);
  }
  add_tourEnded(value) {
    this.__tourEnded = ss.bindAdd(this.__tourEnded, value);
  }
  remove_tourEnded(value) {
    this.__tourEnded = ss.bindSub(this.__tourEnded, value);
  }
  add_slideChanged(value) {
    this.__slideChanged = ss.bindAdd(this.__slideChanged, value);
  }
  remove_slideChanged(value) {
    this.__slideChanged = ss.bindSub(this.__slideChanged, value);
  }
  add_timeScrubberHook(value) {
    this.__timeScrubberHook = ss.bindAdd(this.__timeScrubberHook, value);
  }
  remove_timeScrubberHook(value) {
    this.__timeScrubberHook = ss.bindSub(this.__timeScrubberHook, value);
  }
  setTimeScrubberPosition(posLeft) {
    LayerManager.setTimeSliderValue(posLeft);
  }
  setTimeSlider(name, value) {
    this.__timeScrubberHook(name, value);
  }
  showColorPicker(pickerInstance, e) {
    if (this.__colorPickerDisplay != null) {
      this.__colorPickerDisplay(pickerInstance, e);
    }
  }
  displayVoTableLayer(layer) {
    if (this.__voTableDisplay != null) {
      this.__voTableDisplay(layer, new EventArgs());
    }
  }
  refreshLayerManagerNow() {
    if (this.__refreshLayerManager != null) {
      this.__refreshLayerManager(null, new EventArgs());
    }
  }
  _fireTourReady() {
    if (this.__tourReady != null) {
      this.__tourReady(this, new EventArgs());
    }
  }
  _fireTourPaused() {
    if (this.__tourPaused != null) {
      this.__tourPaused(this, new EventArgs());
    }
  }
  _fireTourResume() {
    if (this.__tourResumed != null) {
      this.__tourResumed(this, new EventArgs());
    }
  }
  _fireTourEnded() {
    if (this.__tourEnded != null) {
      this.__tourEnded(this, new EventArgs());
    }
  }
  _fireImageryLoaded() {
    if (this.__imageryLoaded != null) {
      this.__imageryLoaded(this, new EventArgs());
    }
  }
  _fireClick(ra, dec) {
    if (this.__clicked != null) {
      this.__clicked(this, new ArrivedEventArgs(ra, dec, WWTControl.singleton.renderContext.viewCamera.zoom));
    }
  }
  _fireArrived(ra, dec, zoom) {
    if (this.__arrived != null) {
      this.__arrived(this, new ArrivedEventArgs(ra, dec, zoom));
    }
  }
  _fireAnnotationclicked(RA, Dec, id) {
    try {
      if (this.__annotationClicked != null) {
        this.__annotationClicked(this, new AnnotationClickEventArgs(RA, Dec, id));
      }
    } catch ($e1) {
    }
  }
  _fireSlideChanged(caption) {
    try {
      if (this.__slideChanged != null) {
        this.__slideChanged(this, new SlideChangedEventArgs(caption));
      }
    } catch ($e1) {
    }
  }
  endInit() {
    if (this._missedReady) {
      this._fireReady();
    }
  }
  gotoRaDecZoom(ra, dec, zoom, instant) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.gotoRADecZoom(ra / 15, dec, zoom * 6, instant);
    }
  }
  setBackgroundImageByName(name) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.setBackgroundImageByName(name);
    }
  }
  addVoTableLayer(table) {
    return LayerManager.addVoTableLayer(table, 'Vo Table');
  }
  setForegroundImageByName(name) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.setForegroundImageByName(name);
      WWTControl.singleton.renderContext.viewCamera.opacity = 100;
    }
  }
  setForegroundOpacity(opacity) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.renderContext.viewCamera.opacity = opacity;
    }
  }
  hideUI(hide) {
  }
  loadTour(url) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.playTour(url);
    }
  }
  loadFits(url) {
    return this.loadFitsLayer(url, '', true, null);
  }
  loadFitsLayer(url, name, gotoTarget, loaded) {
    if (ss.whitespace(name)) {
      name = LayerManager.getNextFitsName();
    }
    const imagesetLayer = new ImageSetLayer();
    const img = new FitsImage(url, null, function (wcsImage) {
      const width = ss.truncate(wcsImage.get_sizeX());
      const height = ss.truncate(wcsImage.get_sizeY());
      const imageset = Imageset.create(wcsImage.get_description(), Util.getHashCode(wcsImage.get_filename()).toString(), 2, 3, 5, Util.getHashCode(wcsImage.get_filename()), 0, 0, 256, wcsImage.get_scaleY(), '.tif', wcsImage.get_scaleX() > 0, '', wcsImage.get_centerX(), wcsImage.get_centerY(), wcsImage.get_rotation(), false, '', false, false, 1, wcsImage.get_referenceX(), wcsImage.get_referenceY(), wcsImage.get_copyright(), wcsImage.get_creditsUrl(), '', '', 0, '');
      imageset.set_wcsImage(wcsImage);
      imagesetLayer.set_imageSet(imageset);
      LayerManager.addFitsImageSetLayer(imagesetLayer, name);
      LayerManager.loadTree();
      if (gotoTarget) {
        WWTControl.singleton.gotoRADecZoom(wcsImage.get_centerX() / 15, wcsImage.get_centerY(), 10 * wcsImage.get_scaleY() * height, false);
      }
      if (loaded != null) {
        loaded(imagesetLayer);
      }
    });
    return imagesetLayer;
  }
  get_hideTourFeedback() {
    return this.hideTourFeedback;
  }
  set_hideTourFeedback(value) {
    this.hideTourFeedback = value;
    return value;
  }
  playTour() {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.playCurrentTour();
    }
  }
  stopTour() {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.stopCurrentTour();
    }
  }
  loadImageCollection(url) {
    const $this = this;

    this._imageUrl = url;
    this._imageFolder = new Folder();
    this._imageFolder.loadFromUrl(url, function () {
      Wtml.loadImagesets($this._imageFolder);
      $this._fireCollectionLoaded(url);
    });
  }
  _imageFileLoaded() {
    this._fireCollectionLoaded(this._imageUrl);
  }
  zoom(factor) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.zoom(factor);
    }
    return;
  }
  getRA() {
    if (WWTControl.singleton != null) {
      return WWTControl.singleton.renderContext.get_RA();
    }
    return 0;
  }
  getDec() {
    if (WWTControl.singleton != null) {
      return WWTControl.singleton.renderContext.get_dec();
    }
    return 0;
  }
  createFolder() {
    const folder = new Folder();
    return folder;
  }
  createPolygon(fill) {
    const p = new Poly();
    p.set_fill(fill);
    return p;
  }
  createPolyLine(fill) {
    return new PolyLine();
  }
  createCircle(fill) {
    const c = new Circle();
    c.set_fill(fill);
    return c;
  }
  addAnnotation(annotation) {
    if (annotation != null && ss.canCast(annotation, Annotation)) {
      if (WWTControl.singleton != null) {
        WWTControl.singleton._addAnnotation(annotation);
      }
    }
  }
  removeAnnotation(annotation) {
    if (annotation != null) {
      if (WWTControl.singleton != null) {
        WWTControl.singleton._removeAnnotation(annotation);
      }
    }
  }
  clearAnnotations() {
    if (WWTControl.singleton != null) {
      WWTControl.singleton._clearAnnotations();
    }
  }
  get_smoothAnimation() {
    return this._smoothAnimation;
  }
  set_smoothAnimation(value) {
    this._smoothAnimation = value;
    return value;
  }
  get_showCaptions() {
    return this._showCaptions;
  }
  set_showCaptions(value) {
    this._showCaptions = value;
    return value;
  }
  loadVOTable(url, useCurrentView) {
  }
  get_fov() {
    if (WWTControl.singleton != null) {
      return WWTControl.singleton.renderContext.viewCamera.zoom / 6;
    }
    return 60;
  }
};

export class EventArgs {
  constructor(){}
  static Empty() {
    return new EventArgs();
  }
}
export class  CancelEventArgs extends EventArgs {
  constructor() {
    super();
    this.cancel = false;
  }
}

export class SlideChangedEventArgs extends EventArgs{
  constructor(caption) {
    super();
    this.set_caption(caption);
  }
  get_caption() {
    return this._caption$2;
  }
  set_caption(value) {
    this._caption$2 = value;
    return value;
  }
}

export class ArrivedEventArgs extends EventArgs{
  constructor(ra, dec, zoom) {
    super();
    this._ra$2 = 0;
    this._dec$2 = 0;
    this._zoom$2 = 0;
    this.set_RA(ra * 15);
    this.set_dec(dec);
    this.set_zoom(zoom / 6);
  }
  get_RA() {
    return this._ra$2;
  }
  set_RA(value) {
    this._ra$2 = value;
    return value;
  }
  get_dec() {
    return this._dec$2;
  }
  set_dec(value) {
    this._dec$2 = value;
    return value;
  }
  get_zoom() {
    return this._zoom$2;
  }
  set_zoom(value) {
    this._zoom$2 = value;
    return value;
  }
}

export class AnnotationClickEventArgs extends EventArgs{
  constructor(ra, dec, id) {
    super();
    this._ra$2 = 0;
    this._dec$2 = 0;
    this.set_RA(ra * 15);
    this.set_dec(dec);
    this.set_id(id);
  }
  get_RA() {
    return this._ra$2;
  }
  set_RA(value) {
    this._ra$2 = value;
    return value;
  }
  get_dec() {
    return this._dec$2;
  }
  set_dec(value) {
    this._dec$2 = value;
    return value;
  }
  get_id() {
    return this._id$2;
  }
  set_id(value) {
    this._id$2 = value;
    return value;
  }
}

export class CollectionLoadedEventArgs extends EventArgs {
  constructor(url) {
    super();
    this._url$2 = url;
  }

  get_url() {
    return this._url$2;
  }

  set_url(value) {
    this._url$2 = value;
    return value;
  }
}

