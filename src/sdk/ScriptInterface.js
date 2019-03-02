

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


export function ScriptInterface() {
  this._missedReady = false;
  this.hideTourFeedback = false;
  this._smoothAnimation = false;
  this._showCaptions = true;
}

export const ScriptInterface$ = {
  add_ready: function (value) {
    this.__ready = ss.bindAdd(this.__ready, value);
  },
  remove_ready: function (value) {
    this.__ready = ss.bindSub(this.__ready, value);
  },
  _fireReady: function () {
    if (this.__ready != null) {
      this.__ready(this, new EventArgs());
    } else {
      this._missedReady = true;
    }
  },
  add_collectionLoaded: function (value) {
    this.__collectionLoaded = ss.bindAdd(this.__collectionLoaded, value);
  },
  remove_collectionLoaded: function (value) {
    this.__collectionLoaded = ss.bindSub(this.__collectionLoaded, value);
  },
  _fireCollectionLoaded: function (url) {
    if (this.__collectionLoaded != null) {
      this.__collectionLoaded(this, new CollectionLoadedEventArgs(url));
    }
  },
  add_colorPickerDisplay: function (value) {
    this.__colorPickerDisplay = ss.bindAdd(this.__colorPickerDisplay, value);
  },
  remove_colorPickerDisplay: function (value) {
    this.__colorPickerDisplay = ss.bindSub(this.__colorPickerDisplay, value);
  },
  add_voTableDisplay: function (value) {
    this.__voTableDisplay = ss.bindAdd(this.__voTableDisplay, value);
  },
  remove_voTableDisplay: function (value) {
    this.__voTableDisplay = ss.bindSub(this.__voTableDisplay, value);
  },
  add_refreshLayerManager: function (value) {
    this.__refreshLayerManager = ss.bindAdd(this.__refreshLayerManager, value);
  },
  remove_refreshLayerManager: function (value) {
    this.__refreshLayerManager = ss.bindSub(this.__refreshLayerManager, value);
  },
  add_arrived: function (value) {
    this.__arrived = ss.bindAdd(this.__arrived, value);
  },
  remove_arrived: function (value) {
    this.__arrived = ss.bindSub(this.__arrived, value);
  },
  add_clicked: function (value) {
    this.__clicked = ss.bindAdd(this.__clicked, value);
  },
  remove_clicked: function (value) {
    this.__clicked = ss.bindSub(this.__clicked, value);
  },
  add_annotationClicked: function (value) {
    this.__annotationClicked = ss.bindAdd(this.__annotationClicked, value);
  },
  remove_annotationClicked: function (value) {
    this.__annotationClicked = ss.bindSub(this.__annotationClicked, value);
  },
  add_imageryLoaded: function (value) {
    this.__imageryLoaded = ss.bindAdd(this.__imageryLoaded, value);
  },
  remove_imageryLoaded: function (value) {
    this.__imageryLoaded = ss.bindSub(this.__imageryLoaded, value);
  },
  add_tourReady: function (value) {
    this.__tourReady = ss.bindAdd(this.__tourReady, value);
  },
  remove_tourReady: function (value) {
    this.__tourReady = ss.bindSub(this.__tourReady, value);
  },
  add_tourPaused: function (value) {
    this.__tourPaused = ss.bindAdd(this.__tourPaused, value);
  },
  remove_tourPaused: function (value) {
    this.__tourPaused = ss.bindSub(this.__tourPaused, value);
  },
  add_tourResumed: function (value) {
    this.__tourResumed = ss.bindAdd(this.__tourResumed, value);
  },
  remove_tourResumed: function (value) {
    this.__tourResumed = ss.bindSub(this.__tourResumed, value);
  },
  add_tourEnded: function (value) {
    this.__tourEnded = ss.bindAdd(this.__tourEnded, value);
  },
  remove_tourEnded: function (value) {
    this.__tourEnded = ss.bindSub(this.__tourEnded, value);
  },
  add_slideChanged: function (value) {
    this.__slideChanged = ss.bindAdd(this.__slideChanged, value);
  },
  remove_slideChanged: function (value) {
    this.__slideChanged = ss.bindSub(this.__slideChanged, value);
  },
  add_timeScrubberHook: function (value) {
    this.__timeScrubberHook = ss.bindAdd(this.__timeScrubberHook, value);
  },
  remove_timeScrubberHook: function (value) {
    this.__timeScrubberHook = ss.bindSub(this.__timeScrubberHook, value);
  },
  setTimeScrubberPosition: function (posLeft) {
    LayerManager.setTimeSliderValue(posLeft);
  },
  setTimeSlider: function (name, value) {
    this.__timeScrubberHook(name, value);
  },
  showColorPicker: function (pickerInstance, e) {
    if (this.__colorPickerDisplay != null) {
      this.__colorPickerDisplay(pickerInstance, e);
    }
  },
  displayVoTableLayer: function (layer) {
    if (this.__voTableDisplay != null) {
      this.__voTableDisplay(layer, new EventArgs());
    }
  },
  refreshLayerManagerNow: function () {
    if (this.__refreshLayerManager != null) {
      this.__refreshLayerManager(null, new EventArgs());
    }
  },
  _fireTourReady: function () {
    if (this.__tourReady != null) {
      this.__tourReady(this, new EventArgs());
    }
  },
  _fireTourPaused: function () {
    if (this.__tourPaused != null) {
      this.__tourPaused(this, new EventArgs());
    }
  },
  _fireTourResume: function () {
    if (this.__tourResumed != null) {
      this.__tourResumed(this, new EventArgs());
    }
  },
  _fireTourEnded: function () {
    if (this.__tourEnded != null) {
      this.__tourEnded(this, new EventArgs());
    }
  },
  _fireImageryLoaded: function () {
    if (this.__imageryLoaded != null) {
      this.__imageryLoaded(this, new EventArgs());
    }
  },
  _fireClick: function (ra, dec) {
    if (this.__clicked != null) {
      this.__clicked(this, new ArrivedEventArgs(ra, dec, WWTControl.singleton.renderContext.viewCamera.zoom));
    }
  },
  _fireArrived: function (ra, dec, zoom) {
    if (this.__arrived != null) {
      this.__arrived(this, new ArrivedEventArgs(ra, dec, zoom));
    }
  },
  _fireAnnotationclicked: function (RA, Dec, id) {
    try {
      if (this.__annotationClicked != null) {
        this.__annotationClicked(this, new AnnotationClickEventArgs(RA, Dec, id));
      }
    } catch ($e1) {
    }
  },
  _fireSlideChanged: function (caption) {
    try {
      if (this.__slideChanged != null) {
        this.__slideChanged(this, new SlideChangedEventArgs(caption));
      }
    } catch ($e1) {
    }
  },
  endInit: function () {
    if (this._missedReady) {
      this._fireReady();
    }
  },
  gotoRaDecZoom: function (ra, dec, zoom, instant) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.gotoRADecZoom(ra / 15, dec, zoom * 6, instant);
    }
  },
  setBackgroundImageByName: function (name) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.setBackgroundImageByName(name);
    }
  },
  addVoTableLayer: function (table) {
    return LayerManager.addVoTableLayer(table, 'Vo Table');
  },
  setForegroundImageByName: function (name) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.setForegroundImageByName(name);
      WWTControl.singleton.renderContext.viewCamera.opacity = 100;
    }
  },
  setForegroundOpacity: function (opacity) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.renderContext.viewCamera.opacity = opacity;
    }
  },
  hideUI: function (hide) {
  },
  loadTour: function (url) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.playTour(url);
    }
  },
  loadFits: function (url) {
    return this.loadFitsLayer(url, '', true, null);
  },
  loadFitsLayer: function (url, name, gotoTarget, loaded) {
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
  },
  get_hideTourFeedback: function () {
    return this.hideTourFeedback;
  },
  set_hideTourFeedback: function (value) {
    this.hideTourFeedback = value;
    return value;
  },
  playTour: function () {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.playCurrentTour();
    }
  },
  stopTour: function () {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.stopCurrentTour();
    }
  },
  loadImageCollection: function (url) {
    const $this = this;

    this._imageUrl = url;
    this._imageFolder = new Folder();
    this._imageFolder.loadFromUrl(url, function () {
      Wtml.loadImagesets($this._imageFolder);
      $this._fireCollectionLoaded(url);
    });
  },
  _imageFileLoaded: function () {
    this._fireCollectionLoaded(this._imageUrl);
  },
  zoom: function (factor) {
    if (WWTControl.singleton != null) {
      WWTControl.singleton.zoom(factor);
    }
    return;
  },
  getRA: function () {
    if (WWTControl.singleton != null) {
      return WWTControl.singleton.renderContext.get_RA();
    }
    return 0;
  },
  getDec: function () {
    if (WWTControl.singleton != null) {
      return WWTControl.singleton.renderContext.get_dec();
    }
    return 0;
  },
  createFolder: function () {
    const folder = new Folder();
    return folder;
  },
  createPolygon: function (fill) {
    const p = new Poly();
    p.set_fill(fill);
    return p;
  },
  createPolyLine: function (fill) {
    return new PolyLine();
  },
  createCircle: function (fill) {
    const c = new Circle();
    c.set_fill(fill);
    return c;
  },
  addAnnotation: function (annotation) {
    if (annotation != null && ss.canCast(annotation, Annotation)) {
      if (WWTControl.singleton != null) {
        WWTControl.singleton._addAnnotation(annotation);
      }
    }
  },
  removeAnnotation: function (annotation) {
    if (annotation != null) {
      if (WWTControl.singleton != null) {
        WWTControl.singleton._removeAnnotation(annotation);
      }
    }
  },
  clearAnnotations: function () {
    if (WWTControl.singleton != null) {
      WWTControl.singleton._clearAnnotations();
    }
  },
  get_smoothAnimation: function () {
    return this._smoothAnimation;
  },
  set_smoothAnimation: function (value) {
    this._smoothAnimation = value;
    return value;
  },
  get_showCaptions: function () {
    return this._showCaptions;
  },
  set_showCaptions: function (value) {
    this._showCaptions = value;
    return value;
  },
  loadVOTable: function (url, useCurrentView) {
  },
  get_fov: function () {
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
class  CancelEventArgs {
  constructor() {
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

