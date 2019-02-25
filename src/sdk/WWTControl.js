import {BlendState} from './BlendState';
import {DoubleUtilities, Matrix3d, PositionColoredTextured, Vector2d, Vector3d} from './Double3d';
import {Tile} from './Tile';
import {Imageset,tilesReady} from './Imageset';
import ss from './scriptsharp/ss';
import {Color, Colors} from './Color';
import {Coordinates} from './Coordinates';
import {LayerManager} from './Layers/LayerManager';
import {TileCache} from './TileCache';
import {Sprite2d} from './Graphics/Sprite2d';
import {ScriptInterface} from './ScriptInterface';
import {Settings} from './settings';
import {RenderContext} from './RenderContext';
import {Folder} from './Folder';
import {WebFile} from './WebFile';
import {RenderTriangle} from './RenderTriangle';
import {SpaceTimeController} from './SpaceTimeController';
import {Planets} from './Planets';
import {Constellations} from './Constellation';
import {SimpleLineList} from './Graphics/Primative3d';
import {Annotation} from './Annotation';
import {Wtml} from './WTML';
import {TourPlayer} from './Tours/TourPlayer';
import {Grids} from './Grids';
import {MinorPlanets} from './MinorPlanets';
import {Mouse} from './Util';
import {CameraParameters} from './CameraParameters';
import {ViewMoverKenBurnsStyle, ViewMoverSlew} from './ViewMover';


export function WWTControl() {
  this.uiController = null;
  this._annotations = [];
  this.layers = [];
  this._frameCount = 0;
  this._zoomMax = 360;
  this._zoomMaxSolarSystem = 10000000000000000;
  this._zoomMin = 0.001373291015625;
  this._zoomMinSolarSystem = 0.0001;
  this.constellation = 'UMA';
  this._fadePoints = null;
  this.fader = BlendState.create(true, 2000);
  this._crossFadeFrame = false;
  this._crossFadeTexture = null;
  this._sprite = new Sprite2d();
  this.renderType = 2;
  this._milkyWayBackground = null;
  this._foregroundCanvas = null;
  this._fgDevice = null;
  this._beginZoom = 1;
  this._hoverText = '';
  this._hoverTextPoint = new Vector2d();
  this._lastMouseMove = new Date(1900, 1, 0, 0, 0, 0, 0);
  this._isPintching = false;
  this._pointerIds = new Array(2);
  this._dragging = false;
  this._rect = new Array(2);
  this._mouseDown = false;
  this._lastX = 0;
  this._lastY = 0;
  this._moved = false;
  this._tracking = false;
  this._trackingObject = null;
  this.sandboxMode = false;
  this._solarSystemTrack = 65536;
  this._moving = false;
  this._targetStudyImageset = null;
  this._targetBackgroundImageset = null;
  this.tour = null;
  this.tourEdit = null;
  this._crossHarirs = null;
}
WWTControl.get_renderNeeded = function() {
  return WWTControl._renderNeeded;
};
WWTControl.set_renderNeeded = function(value) {
  WWTControl._renderNeeded = true;
  return value;
};
WWTControl.showExplorerUI = function() {
  if (WWTControl.singleton != null) {
    WWTControl.singleton.createExplorerUI();
  }
};
WWTControl.initControl = function(DivId) {
  return WWTControl.initControlParam(DivId, false);
};
WWTControl.initControlParam = function(DivId, webGL) {

  if (WWTControl.singleton.renderContext.device == null) {
    WWTControl.scriptInterface = new ScriptInterface();
    WWTControl.scriptInterface.settings = Settings.get_current();
    const canvas = WWTControl._createCanvasElement(DivId);
    let webgltext = 'webgl';
    let gl = null;
    webGL = true;
    if (webGL) {
      gl = canvas.getContext(webgltext);
    }
    if (gl == null) {
      webgltext = 'experimental-webgl';
      gl = canvas.getContext(webgltext);
    }
    if (gl == null) {
      const ctx = canvas.getContext('2d');
      WWTControl.singleton.renderContext.device = ctx;
    }
    else {
      Tile.prepDevice = gl;
      WWTControl.singleton.renderContext.gl = gl;
      RenderContext.useGl = true;
    }
    WWTControl.singleton.canvas = canvas;
    WWTControl.singleton.renderContext.width = canvas.width;
    WWTControl.singleton.renderContext.height = canvas.height;
    WWTControl.singleton.setup(canvas);
    //console.time('tiles');
    tilesReady.then(() => {
      //console.timeEnd('tiles');
      WWTControl.singleton.renderContext.set_backgroundImageset(Imageset.create('DSS', '//cdn.worldwidetelescope.org/wwtweb/dss.aspx?q={1},{2},{3}', 2, 3, 3, 100, 0, 12, 256, 180, '.png', false, '', 0, 0, 0, false, '//worldwidetelescope.org/thumbnails/DSS.png', true, false, 0, 0, 0, '', '', '', '', 1, 'Sky'));
      if (WWTControl.startMode === 'earth') {
        WWTControl.singleton.renderContext.set_backgroundImageset(Imageset.create('Blue Marble', '//worldwidetelescope.org/wwtweb/tiles.aspx?q={1},{2},{3},bm200407', 0, 3, 3, 101, 0, 7, 256, 180, '.png', false, '', 0, 0, 0, false, '//worldwidetelescope.org/wwtweb/thumbnail.aspx?name=bm200407', true, false, 0, 0, 0, '', '', '', '', 6371000, 'Earth'));
      }
      if (WWTControl.startMode === 'bing') {
        WWTControl.singleton.renderContext.set_backgroundImageset(Imageset.create('Virtual Earth Aerial', '//a{0}.ortho.tiles.virtualearth.net/tiles/a{1}.jpeg?g=15', 0, 3, 0, 102, 1, 20, 256, 360, '.png', false, '0123', 0, 0, 0, false, '//worldwidetelescope.org/wwtweb/thumbnail.aspx?name=earth', true, false, 0, 0, 0, '', '', '', '', 6371000, 'Earth'));
      }
      WWTControl.singleton.render();
    });
  }
  WWTControl.singleton.renderContext.viewCamera.lng += 0;
  WWTControl.singleton.renderContext._initGL();

  return WWTControl.scriptInterface;
};
WWTControl.useUserLocation = function() {
  navigator.geolocation.getCurrentPosition(WWTControl._getLocation, WWTControl._getLocationError);
};
WWTControl._getLocation = function(pos) {
  if (!!pos.coords.latitude) {
    Settings.get_globalSettings().set_locationLat(pos.coords.latitude);
  }
  if (!!pos.coords.longitude) {
    Settings.get_globalSettings().set_locationLng(pos.coords.longitude);
  }
  if (!!pos.coords.altitude) {
    Settings.get_globalSettings().set_locationAltitude(pos.coords.altitude);
  }
};
WWTControl._getLocationError = function(pos) {
  if (pos != null && pos.coords != null) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
  }
};
WWTControl._createCanvasElement = function(DivId) {
  let canvas = null;
  const div = document.getElementById(DivId);
  const style = div.attributes.getNamedItem('style');
  canvas = document.createElement('canvas');
  canvas.height = parseInt(div.style.height);
  canvas.width = parseInt(div.style.width);
  div.appendChild(canvas);
  return canvas;
};
WWTControl.showFolderUI = function() {
  WWTControl.singleton.createExplorerUI();
};
WWTControl.go = function(mode, lat, lng, zoom) {
  if (mode != null && mode.length > 0) {
    WWTControl.startMode = mode;
  }
  if (!!zoom) {
    WWTControl.startLat = lat;
    WWTControl.startLng = lng;
    WWTControl.startZoom = zoom * 6;
  }
};
WWTControl.setBackgroundImageName = function(name) {
  WWTControl.imageSetName = name;
};
WWTControl.setForegroundImageName = function(name) {
  WWTControl.imageSetName = name;
};
WWTControl.showLayers = function(show) {
  WWTControl.showDataLayers = show;
};
export const WWTControl$ = {
  _addAnnotation: function (annotation) {
    this._annotations.push(annotation);
    Annotation.batchDirty = true;
  },
  _removeAnnotation: function (annotation) {
    ss.remove(this._annotations, annotation);
    Annotation.batchDirty = true;
  },
  _clearAnnotations: function () {
    this._annotations.length = 0;
    Annotation.batchDirty = true;
  },
  get__zoomMax: function () {
    if (this.renderContext.get_backgroundImageset() != null && this.renderContext.get_backgroundImageset().get_dataSetType() === 4) {
      return this._zoomMaxSolarSystem;
    } else {
      return this._zoomMax;
    }
  },
  get_zoomMin: function () {
    if (this.renderContext.get_backgroundImageset() != null && this.renderContext.get_backgroundImageset().get_dataSetType() === 4) {
      return this._zoomMinSolarSystem / 10000;
    } else {
      return this._zoomMin;
    }
  },
  set_zoomMin: function (value) {
    this._zoomMin = value;
    return value;
  },
  _notifyMoveComplete: function () {
  },
  get_crossFadeFrame: function () {
    return this._crossFadeFrame;
  },
  set_crossFadeFrame: function (value) {
    if (value && this._crossFadeFrame !== value) {
      if (this._crossFadeTexture != null) {
      }
      this._crossFadeTexture = this.renderContext._getScreenTexture();
    }
    this._crossFadeFrame = value;
    if (!value) {
      if (this._crossFadeTexture != null) {
        this._crossFadeTexture = null;
      }
    }
    return value;
  },
  _fadeFrame: function () {
    if (this.renderContext.gl != null) {
      const sp = Settings.get_active().getSetting(17);
      if ((sp.opacity > 0)) {
        let color = Color._fromArgbColor(255 - UiTools.gamma(255 - ss.truncate((sp.opacity * 255)), 1 / 2.2), Colors.get_black());
        if (!(sp.opacity > 0)) {
          color = Color._fromArgbColor(255 - UiTools.gamma(255 - ss.truncate((sp.opacity * 255)), 1 / 2.2), Colors.get_black());
        }
        if (this._crossFadeFrame) {
          color = Color._fromArgbColor(UiTools.gamma(ss.truncate((sp.opacity * 255)), 1 / 2.2), Colors.get_white());
        } else {
          if (this._crossFadeTexture != null) {
            this._crossFadeTexture = null;
          }
        }
        if (this._fadePoints == null) {
          this._fadePoints = new Array(4);
          for (let i = 0; i < 4; i++) {
            this._fadePoints[i] = new PositionColoredTextured();
          }
        }
        this._fadePoints[0].position.x = -this.renderContext.width / 2;
        this._fadePoints[0].position.y = this.renderContext.height / 2;
        this._fadePoints[0].position.z = 1347;
        this._fadePoints[0].tu = 0;
        this._fadePoints[0].tv = 1;
        this._fadePoints[0].color = color;
        this._fadePoints[1].position.x = -this.renderContext.width / 2;
        this._fadePoints[1].position.y = -this.renderContext.height / 2;
        this._fadePoints[1].position.z = 1347;
        this._fadePoints[1].tu = 0;
        this._fadePoints[1].tv = 0;
        this._fadePoints[1].color = color;
        this._fadePoints[2].position.x = this.renderContext.width / 2;
        this._fadePoints[2].position.y = this.renderContext.height / 2;
        this._fadePoints[2].position.z = 1347;
        this._fadePoints[2].tu = 1;
        this._fadePoints[2].tv = 1;
        this._fadePoints[2].color = color;
        this._fadePoints[3].position.x = this.renderContext.width / 2;
        this._fadePoints[3].position.y = -this.renderContext.height / 2;
        this._fadePoints[3].position.z = 1347;
        this._fadePoints[3].tu = 1;
        this._fadePoints[3].tv = 0;
        this._fadePoints[3].color = color;
        this._sprite.draw(this.renderContext, this._fadePoints, 4, this._crossFadeTexture, true, 1);
      }
    }
  },
  render: function () {
    const $this = this;

    if (this.renderContext.get_backgroundImageset() != null) {
      this.renderType = this.renderContext.get_backgroundImageset().get_dataSetType();
    } else {
      this.renderType = 2;
    }
    let sizeChange = false;
    if (this.canvas.width !== parseInt(this.canvas.parentNode.style.width)) {
      this.canvas.width = parseInt(this.canvas.parentNode.style.width);
      sizeChange = true;
    }
    if (this.canvas.height !== parseInt(this.canvas.parentNode.style.height)) {
      this.canvas.height = parseInt(this.canvas.parentNode.style.height);
      sizeChange = true;
    }
    if (sizeChange) {
      if (this.explorer != null) {
        this.explorer.refresh();
      }
    }
    Tile.lastDeepestLevel = Tile.deepestLevel;
    RenderTriangle.width = this.renderContext.width = this.canvas.width;
    RenderTriangle.height = this.renderContext.height = this.canvas.height;
    Tile.tilesInView = 0;
    Tile.tilesTouched = 0;
    Tile.deepestLevel = 0;
    if (this.get__mover() != null) {
      SpaceTimeController.set_now(this.get__mover().get_currentDateTime());
      Planets.updatePlanetLocations(this.get_solarSystemMode());
      if (this.get__mover() != null) {
        const newCam = this.get__mover().get_currentPosition();
        this.renderContext.targetCamera = newCam.copy();
        this.renderContext.viewCamera = newCam.copy();
        if (this.renderContext.space && Settings.get_active().get_galacticMode()) {
          const gPoint = Coordinates.j2000toGalactic(newCam.get_RA() * 15, newCam.get_dec());
          this.renderContext.targetAlt = this.renderContext.alt = gPoint[1];
          this.renderContext.targetAz = this.renderContext.az = gPoint[0];
        } else if (this.renderContext.space && Settings.get_active().get_localHorizonMode()) {
          const currentAltAz = Coordinates.equitorialToHorizon(Coordinates.fromRaDec(newCam.get_RA(), newCam.get_dec()), SpaceTimeController.get_location(), SpaceTimeController.get_now());
          this.renderContext.targetAlt = this.renderContext.alt = currentAltAz.get_alt();
          this.renderContext.targetAz = this.renderContext.az = currentAltAz.get_az();
        }
        if (this.get__mover().get_complete()) {
          WWTControl.scriptInterface._fireArrived(this.get__mover().get_currentPosition().get_RA(), this.get__mover().get_currentPosition().get_dec(), WWTControl.singleton.renderContext.viewCamera.zoom);
          this.set__mover(null);
          this._notifyMoveComplete();
        }
      }
    } else {
      SpaceTimeController.updateClock();
      Planets.updatePlanetLocations(this.get_solarSystemMode());
      this._updateViewParameters();
    }
    this.renderContext.clear();
    if (this.renderType === 4) {
      if (this._solarSystemTrack < 20) {
        const radius = Planets.getAdjustedPlanetRadius(this._solarSystemTrack);
        const distance = this.renderContext.get_solarSystemCameraDistance();
        const camAngle = this.renderContext.get_fovLocal();
      }
      if (this._trackingObject == null) {
      }
      this.renderContext.setupMatricesSolarSystem(true);
      const zoom = this.renderContext.viewCamera.zoom;
      const milkyWayBlend = Math.min(1, Math.max(0, (Math.log(zoom) - 8.4)) / 4.2);
      const milkyWayBlendIn = Math.min(1, Math.max(0, (Math.log(zoom) - 17.9)) / 2.3);
      const matOldMW = this.renderContext.get_world();
      const matLocalMW = this.renderContext.get_world().clone();
      matLocalMW._multiply(Matrix3d._scaling(100000, 100000, 100000));
      matLocalMW._multiply(Matrix3d._rotationX(23.5 / 180 * Math.PI));
      matLocalMW._multiply(Matrix3d.translation(this.renderContext.cameraPosition));
      this.renderContext.set_world(matLocalMW);
      this.renderContext.set_worldBase(matLocalMW);
      this.renderContext.space = true;
      this.renderContext.makeFrustum();
      const lighting = this.renderContext.lighting;
      this.renderContext.lighting = false;
      if (Settings.get_active().get_solarSystemMilkyWay()) {
        if (milkyWayBlend < 1) {
          if (this._milkyWayBackground == null) {
            this._milkyWayBackground = this.getImagesetByName('Digitized Sky Survey (Color)');
          }
          if (this._milkyWayBackground != null) {
            RenderTriangle.cullInside = true;
            const c = (1 - milkyWayBlend) / 2;
            this.renderContext.drawImageSet(this._milkyWayBackground, c * 100);
            RenderTriangle.cullInside = false;
          }
        }
      }
      this._drawSkyOverlays();
      this.renderContext.lighting = lighting;
      this.renderContext.space = false;
      this.renderContext.set_world(matOldMW);
      this.renderContext.set_worldBase(matOldMW);
      this.renderContext.makeFrustum();
      const oldCamera = this.renderContext.cameraPosition;
      const matOld = this.renderContext.get_world();
      let matLocal = this.renderContext.get_world();
      matLocal._multiply(Matrix3d.translation(this.renderContext.viewCamera.viewTarget));
      this.renderContext.cameraPosition = Vector3d.subtractVectors(this.renderContext.cameraPosition, this.renderContext.viewCamera.viewTarget);
      this.renderContext.set_world(matLocal);
      this.renderContext.makeFrustum();
      if (Settings.get_active().get_solarSystemCosmos()) {
        Grids.drawCosmos3D(this.renderContext, 1);
      }
      if (Settings.get_active().get_solarSystemMilkyWay() && milkyWayBlendIn > 0) {
        Grids.drawGalaxyImage(this.renderContext, milkyWayBlendIn);
      }
      if (Settings.get_active().get_solarSystemStars()) {
        Grids.drawStars3D(this.renderContext, 1);
      }
      matLocal = matOld;
      const pnt = this.renderContext.viewCamera.viewTarget;
      const vt = new Vector3d(-pnt.x, -pnt.y, -pnt.z);
      this.renderContext.cameraPosition = oldCamera;
      matLocal._multiply(Matrix3d.translation(vt));
      this.renderContext.set_world(matLocal);
      this.renderContext.makeFrustum();
      LayerManager._draw(this.renderContext, 1, true, 'Sky', true, false);
      this.renderContext.set_world(matOld);
      this.renderContext.makeFrustum();
      if (this.renderContext.get_solarSystemCameraDistance() < 15000) {
        this.renderContext.setupMatricesSolarSystem(false);
        if (Settings.get_active().get_solarSystemMinorPlanets()) {
          MinorPlanets.drawMPC3D(this.renderContext, 1, this.renderContext.viewCamera.viewTarget);
        }
        if (Settings.get_active().get_solarSystemPlanets()) {
          Planets.drawPlanets3D(this.renderContext, 1, this.renderContext.viewCamera.viewTarget);
        }
      }
    } else {
      if (!this.renderType || this.renderType === 1) {
        this.renderContext._setupMatricesLand3d();
      } else {
        this.renderContext.setupMatricesSpace3d(this.renderContext.width, this.renderContext.height);
      }
      this.renderContext.drawImageSet(this.renderContext.get_backgroundImageset(), 100);
      if (this.renderContext.get_foregroundImageset() != null) {
        if (this.renderContext.viewCamera.opacity !== 100 && this.renderContext.gl == null) {
          if (this._foregroundCanvas.width !== this.renderContext.width || this._foregroundCanvas.height !== this.renderContext.height) {
            this._foregroundCanvas.width = ss.truncate(this.renderContext.width);
            this._foregroundCanvas.height = ss.truncate(this.renderContext.height);
          }
          var saveDevice = this.renderContext.device;
          this._fgDevice.clearRect(0, 0, this.renderContext.width, this.renderContext.height);
          this.renderContext.device = this._fgDevice;
          this.renderContext.drawImageSet(this.renderContext.get_foregroundImageset(), 100);
          this.renderContext.device = saveDevice;
          this.renderContext.device.save();
          this.renderContext.device.globalAlpha = this.renderContext.viewCamera.opacity / 100;
          this.renderContext.device.drawImage(this._foregroundCanvas, 0, 0);
          this.renderContext.device.restore();
        } else {
          this.renderContext.drawImageSet(this.renderContext.get_foregroundImageset(), this.renderContext.viewCamera.opacity);
        }
      }
    }
    if (this.renderType === 2 && Settings.get_active().get_showSolarSystem()) {
      Planets.drawPlanets(this.renderContext, 1);
      this.constellation = Constellations.containment.findConstellationForPoint(this.renderContext.viewCamera.get_RA(), this.renderContext.viewCamera.get_dec());
      this._drawSkyOverlays();
    }
    if (this.get_planetLike() || this.get_space()) {
      if (!this.get_space()) {
        const angle = Coordinates.mstFromUTC2(SpaceTimeController.get_now(), 0) / 180 * Math.PI;
        this.renderContext.set_worldBaseNonRotating(Matrix3d.multiplyMatrix(Matrix3d._rotationY(angle), this.renderContext.get_worldBase()));
        if (this._targetBackgroundImageset != null) {
          this.renderContext.set_nominalRadius(this._targetBackgroundImageset.get_meanRadius());
        }
      } else {
        this.renderContext.set_worldBaseNonRotating(this.renderContext.get_world());
        if (this._targetBackgroundImageset != null) {
          this.renderContext.set_nominalRadius(this._targetBackgroundImageset.get_meanRadius());
        }
      }
      const referenceFrame = this._getCurrentReferenceFrame();
      LayerManager._draw(this.renderContext, 1, this.get_space(), referenceFrame, true, this.get_space());
    }
    
    const worldSave = this.renderContext.get_world();
    const viewSave = this.renderContext.get_view();
    const projSave = this.renderContext.get_projection();
    const raDecDownDown = this.getCoordinatesForScreenPoint(this.renderContext.width / 2, this.renderContext.height / 2);
    if (Settings.get_current().get_showCrosshairs()) {
      this._drawCrosshairs(this.renderContext);
    }
    if (this.uiController != null) {
      this.uiController.render(this.renderContext);
    } else {
      let index = 0;
      Annotation.prepBatch(this.renderContext);
      const $enum1 = ss.enumerate(this._annotations);
      while ($enum1.moveNext()) {
        const item = $enum1.current;
        item.draw(this.renderContext);
        index++;
      }
      Annotation.drawBatch(this.renderContext);
      if ((ss.now() - this._lastMouseMove) > 400) {
        const raDecDown = this.getCoordinatesForScreenPoint(this._hoverTextPoint.x, this._hoverTextPoint.y);
        this._annotationHover(raDecDown.x, raDecDown.y, this._hoverTextPoint.x, this._hoverTextPoint.y);
        this._lastMouseMove = new Date(2100, 1, 1);
      }
      if (!ss.emptyString(this._hoverText)) {
        this._drawHoverText(this.renderContext);
      }
    }
    this.renderContext.setupMatricesOverlays();
    this._fadeFrame();
    this._frameCount++;
    TileCache.decimateQueue();
    TileCache.processQueue(this.renderContext);
    Tile.currentRenderGeneration++;
    if (!TourPlayer.get_playing()) {
      this.set_crossFadeFrame(false);
    }
    this.renderContext.set_world(worldSave);
    this.renderContext.set_view(viewSave);
    this.renderContext.set_projection(projSave);
    const now = ss.now();
    const ms = now - this._lastUpdate;
    if (ms > 1000) {
      this._lastUpdate = now;
      this._frameCount = 0;
      RenderTriangle.trianglesRendered = 0;
      RenderTriangle.trianglesCulled = 0;
    }
    setTimeout(function () {
      $this.render();
    }, 10);
  },
  _getCurrentReferenceFrame: function () {
    if (this.renderContext.get_backgroundImageset() == null) {
      return 'Sun';
    }
    if (!ss.emptyString(this.renderContext.get_backgroundImageset().get_referenceFrame())) {
      return this.renderContext.get_backgroundImageset().get_referenceFrame();
    }
    if (!this.renderContext.get_backgroundImageset().get_dataSetType()) {
      return 'Earth';
    }
    if (this.renderContext.get_backgroundImageset().get_name() === 'Visible Imagery' && this.renderContext.get_backgroundImageset().get_url().toLowerCase().indexOf('mars') > -1) {
      this.renderContext.get_backgroundImageset().set_referenceFrame('Mars');
      return this.renderContext.get_backgroundImageset().get_referenceFrame();
    }
    if (this.renderContext.get_backgroundImageset().get_dataSetType() === 1) {
      const $enum1 = ss.enumerate(WWTControl.solarSystemObjectsNames);
      while ($enum1.moveNext()) {
        const name = $enum1.current;
        if (this.renderContext.get_backgroundImageset().get_name().toLowerCase().indexOf(name.toLowerCase()) > -1) {
          this.renderContext.get_backgroundImageset().set_referenceFrame(name);
          return name;
        }
      }
    }
    if (this.renderContext.get_backgroundImageset().get_dataSetType() === 2) {
      return 'Sky';
    }
    return '';
  },
  get_planetLike: function () {
    if (this.renderContext.get_backgroundImageset() != null) {
      return !this.renderContext.get_backgroundImageset().get_dataSetType() || this.renderContext.get_backgroundImageset().get_dataSetType() === 1;
    } else {
      return true;
    }
  },
  get_space: function () {
    if (this.renderContext.get_backgroundImageset() != null) {
      return this.renderContext.get_backgroundImageset().get_dataSetType() === 2;
    } else {
      return true;
    }
  },
  _drawSkyOverlays: function () {
    if (Settings.get_active().get_showConstellationPictures()) {
      Constellations.drawArtwork(this.renderContext);
    }
    if (Settings.get_active().get_showConstellationFigures()) {
      if (WWTControl.constellationsFigures == null) {
        WWTControl.constellationsFigures = Constellations.create('Constellations', '//worldwidetelescope.org/data/figures.txt', false, false, false);
      }
      WWTControl.constellationsFigures.draw(this.renderContext, false, 'UMA', false);
    }
    if (Settings.get_active().get_showEclipticGrid()) {
      Grids.drawEclipticGrid(this.renderContext, 1, Colors.get_green());
      if (Settings.get_active().get_showEclipticGridText()) {
        Grids.drawEclipticGridText(this.renderContext, 1, Colors.get_green());
      }
    }
    if (Settings.get_active().get_showGalacticGrid()) {
      Grids.drawGalacticGrid(this.renderContext, 1, Colors.get_cyan());
      if (Settings.get_active().get_showGalacticGridText()) {
        Grids.drawGalacticGridText(this.renderContext, 1, Colors.get_cyan());
      }
    }
    if (Settings.get_active().get_showAltAzGrid()) {
      Grids.drawAltAzGrid(this.renderContext, 1, Colors.get_magenta());
      if (Settings.get_active().get_showAltAzGridText()) {
        Grids.drawAltAzGridText(this.renderContext, 1, Colors.get_magenta());
      }
    }
    if (Settings.get_active().get_showPrecessionChart()) {
      Grids.drawPrecessionChart(this.renderContext, 1, Colors.get_orange());
    }
    if (Settings.get_active().get_showEcliptic()) {
      Grids.drawEcliptic(this.renderContext, 1, Colors.get_blue());
      if (Settings.get_active().get_showEclipticOverviewText()) {
        Grids.drawEclipticText(this.renderContext, 1, Colors.get_blue());
      }
    }
    if (Settings.get_active().get_showGrid()) {
      Grids.drawEquitorialGrid(this.renderContext, 1, Colors.get_white());
      if (Settings.get_active().get_showEquatorialGridText()) {
        Grids.drawEquitorialGridText(this.renderContext, 1, Colors.get_white());
      }
    }
    if (Settings.get_active().get_showConstellationBoundries()) {
      if (WWTControl.constellationsBoundries == null) {
        WWTControl.constellationsBoundries = Constellations.create('Constellations', '//worldwidetelescope.org/data/constellations.txt', true, false, false);
      }
      WWTControl.constellationsBoundries.draw(this.renderContext, Settings.get_active().get_showConstellationSelection(), this.constellation, false);
    }
    if (Settings.get_active().get_showConstellationLabels()) {
      Constellations.drawConstellationNames(this.renderContext, 1, Colors.get_yellow());
    }
  },
  _drawHoverText: function (RenderContext) {
    if (RenderContext.gl == null) {
      const ctx = RenderContext.device;
      ctx.save();
      ctx.fillStyle = 'White';
      ctx.font = '15px Arial';
      ctx.fillText(this._hoverText, this._hoverTextPoint.x, this._hoverTextPoint.y);
      ctx.restore();
    }
  },
  rAtoViewLng: function (ra) {
    return (((180 - (ra / 24 * 360) - 180) + 540) % 360) - 180;
  },
  _updateViewParameters: function () {
    if (this.renderContext.space && this._tracking && this._trackingObject != null) {
      if (Settings.get_active().get_galacticMode() && this.renderContext.space) {
        const gPoint = Coordinates.j2000toGalactic(this._trackingObject.get_RA() * 15, this._trackingObject.get_dec());
        this.renderContext.targetAlt = this.renderContext.alt = gPoint[1];
        this.renderContext.targetAz = this.renderContext.az = gPoint[0];
      } else if (this.renderContext.space && Settings.get_active().get_localHorizonMode()) {
        const currentAltAz = Coordinates.equitorialToHorizon(Coordinates.fromRaDec(this._trackingObject.get_RA(), this._trackingObject.get_dec()), SpaceTimeController.get_location(), SpaceTimeController.get_now());
        this.renderContext.targetAlt = currentAltAz.get_alt();
        this.renderContext.targetAz = currentAltAz.get_az();
      } else {
        this.renderContext.viewCamera.lng = this.renderContext.targetCamera.lng = this.rAtoViewLng(this._trackingObject.get_RA());
        this.renderContext.viewCamera.lat = this.renderContext.targetCamera.lat = this._trackingObject.get_dec();
      }
    } else if (!this.get_solarSystemMode()) {
      this._tracking = false;
      this._trackingObject = null;
    }
    const oneMinusDragCoefficient = 1 - 0.8;
    const dc = 0.8;
    if (!this._tracking) {
      let minDelta = (this.renderContext.viewCamera.zoom / 4000);
      if (this.renderContext.viewCamera.zoom > 360) {
        minDelta = (360 / 40000);
      }
      if (this.renderContext.space && (Settings.get_active().get_localHorizonMode() || Settings.get_active().get_galacticMode())) {
        if ((((Math.abs(this.renderContext.targetAlt - this.renderContext.alt) >= minDelta) | (Math.abs(this.renderContext.targetAz - this.renderContext.az) >= minDelta)) === 1)) {
          this.renderContext.alt += (this.renderContext.targetAlt - this.renderContext.alt) / 10;
          if (Math.abs(this.renderContext.targetAz - this.renderContext.az) > 170) {
            if (this.renderContext.targetAz > this.renderContext.az) {
              this.renderContext.az += (this.renderContext.targetAz - (360 + this.renderContext.az)) / 10;
            } else {
              this.renderContext.az += ((360 + this.renderContext.targetAz) - this.renderContext.az) / 10;
            }
          } else {
            this.renderContext.az += (this.renderContext.targetAz - this.renderContext.az) / 10;
          }
          this.renderContext.az = ((this.renderContext.az + 720) % 360);
        }
      } else {
        if ((((Math.abs(this.renderContext.targetCamera.lat - this.renderContext.viewCamera.lat) >= minDelta) | (Math.abs(this.renderContext.targetCamera.lng - this.renderContext.viewCamera.lng) >= minDelta)) === 1)) {
          this.renderContext.viewCamera.lat += (this.renderContext.targetCamera.lat - this.renderContext.viewCamera.lat) / 10;
          if (Math.abs(this.renderContext.targetCamera.lng - this.renderContext.viewCamera.lng) > 170) {
            if (this.renderContext.targetCamera.lng > this.renderContext.viewCamera.lng) {
              this.renderContext.viewCamera.lng += (this.renderContext.targetCamera.lng - (360 + this.renderContext.viewCamera.lng)) / 10;
            } else {
              this.renderContext.viewCamera.lng += ((360 + this.renderContext.targetCamera.lng) - this.renderContext.viewCamera.lng) / 10;
            }
          } else {
            this.renderContext.viewCamera.lng += (this.renderContext.targetCamera.lng - this.renderContext.viewCamera.lng) / 10;
          }
          this.renderContext.viewCamera.lng = ((this.renderContext.viewCamera.lng + 720) % 360);
        } else {
          if (this.renderContext.viewCamera.lat !== this.renderContext.targetCamera.lat || this.renderContext.viewCamera.lng !== this.renderContext.targetCamera.lng) {
            this.renderContext.viewCamera.lat = this.renderContext.targetCamera.lat;
            this.renderContext.viewCamera.lng = this.renderContext.targetCamera.lng;
          }
        }
      }
    }
    this.renderContext.viewCamera.zoom = dc * this.renderContext.viewCamera.zoom + oneMinusDragCoefficient * this.renderContext.targetCamera.zoom;
    this.renderContext.viewCamera.rotation = dc * this.renderContext.viewCamera.rotation + oneMinusDragCoefficient * this.renderContext.targetCamera.rotation;
    this.renderContext.viewCamera.angle = dc * this.renderContext.viewCamera.angle + oneMinusDragCoefficient * this.renderContext.targetCamera.angle;
  },
  move: function (x, y) {
    let scaleY = this.renderContext.get_fovScale() / (3600);
    if (this.renderContext.get_backgroundImageset().get_dataSetType() === 4) {
      scaleY = 0.06;
    }
    let scaleX = scaleY / Math.max(0.2, Math.cos(this.renderContext.viewCamera.lat / 180 * Math.PI));
    if (!this.renderContext.get_backgroundImageset().get_dataSetType() || this.renderContext.get_backgroundImageset().get_dataSetType() === 1 || this.renderContext.get_backgroundImageset().get_dataSetType() === 4) {
      scaleX = scaleX * 6.3;
      scaleY = scaleY * 6.3;
    }
    if (this.renderContext.space && (Settings.get_active().get_galacticMode() || Settings.get_active().get_localHorizonMode())) {
      x = (Settings.get_active().get_localHorizonMode()) ? -x : x;
      this.renderContext.targetAz += x * scaleX;
      this.renderContext.targetAz = ((this.renderContext.targetAz + 720) % 360);
      this.renderContext.targetAlt += y * scaleY;
      if (this.renderContext.targetAlt > 90) {
        this.renderContext.targetAlt = 90;
      }
      if (this.renderContext.targetAlt < -90) {
        this.renderContext.targetAlt = -90;
      }
    } else {
      this.renderContext.targetCamera.lng -= x * scaleX;
      this.renderContext.targetCamera.lng = ((this.renderContext.targetCamera.lng + 720) % 360);
      this.renderContext.targetCamera.lat += y * scaleY;
      if (this.renderContext.targetCamera.lat > 90) {
        this.renderContext.targetCamera.lat = 90;
      }
      if (this.renderContext.targetCamera.lat < -90) {
        this.renderContext.targetCamera.lat = -90;
      }
    }
    if (!Settings.get_globalSettings().get_smoothPan()) {
      this.renderContext.viewCamera = this.renderContext.targetCamera.copy();
    }
    if (!!x && !!y) {
      this._tracking = false;
      this._trackingObject = null;
    }
  },
  zoom: function (factor) {
    this.renderContext.targetCamera.zoom *= factor;
    if (this.renderContext.targetCamera.zoom > this.get__zoomMax()) {
      this.renderContext.targetCamera.zoom = this.get__zoomMax();
    }
    if (!Settings.get_globalSettings().get_smoothPan()) {
      this.renderContext.viewCamera = this.renderContext.targetCamera.copy();
    }
  },
  setup: function (canvas) {
    window.addEventListener('contextmenu', ss.bind('onContextMenu', this), false);
    canvas.addEventListener('dblclick', ss.bind('onDoubleClick', this), false);
    canvas.addEventListener('mousedown', ss.bind('onMouseDown', this), false);
    canvas.addEventListener('mousewheel', ss.bind('onMouseWheel', this), false);
    canvas.addEventListener('DOMMouseScroll', ss.bind('onMouseWheel', this), false);
    canvas.addEventListener('touchstart', ss.bind('onTouchStart', this), false);
    canvas.addEventListener('touchmove', ss.bind('onTouchMove', this), false);
    canvas.addEventListener('touchend', ss.bind('onTouchEnd', this), false);
    canvas.addEventListener('gesturechange', ss.bind('onGestureChange', this), false);
    canvas.addEventListener('gesturestart', ss.bind('onGestureStart', this), false);
    canvas.addEventListener('gestureend', ss.bind('onGestureEnd', this), false);
    document.body.addEventListener('keydown', ss.bind('onKeyDown', this), false);
    canvas.addEventListener('pointerdown', ss.bind('onPointerDown', this), false);
    canvas.addEventListener('pointermove', ss.bind('onPointerMove', this), false);
    canvas.addEventListener('pointerup', ss.bind('onPointerUp', this), false);
    this.renderContext.viewCamera.lat = WWTControl.startLat;
    this.renderContext.viewCamera.lng = WWTControl.startLng;
    this.renderContext.viewCamera.zoom = WWTControl.startZoom;
    this.renderContext.targetCamera = this.renderContext.viewCamera.copy();
    if (this.renderContext.gl == null) {
      this._foregroundCanvas = document.createElement('canvas');
      this._foregroundCanvas.width = canvas.width;
      this._foregroundCanvas.height = canvas.height;
      this._fgDevice = this._foregroundCanvas.getContext('2d');
    }
    this._webFolder = new Folder();
    this._webFolder.loadFromUrl('//worldwidetelescope.org/wwtweb/catalog.aspx?X=ImageSets5', (args) => {

      this.setupComplete();
    });
    const webFile = new WebFile('//worldwidetelescope.org/wwtweb/weblogin.aspx?user=12345678-03D2-4935-8D0F-DCE54C9113E5&Version=HTML5&webkey=AX2011Gqqu&platform=web');
    webFile.send();
  },
  setupComplete: function () {
    Wtml.loadImagesets(this._webFolder);
    WWTControl.scriptInterface._fireReady();
  },
  createExplorerUI: function () {
    const $this = this;

    if (this.explorer == null) {
      this.explorer = FolderBrowser.create();
      const div = document.getElementById('UI');
      div.insertBefore(this.explorer.canvas);
      WWTControl.exploreRoot = new Folder();
      WWTControl.exploreRoot.loadFromUrl('//worldwidetelescope.org/wwtweb/catalog.aspx?W=NewExploreRoot', function () {
        $this.explorer._addItems(WWTControl.exploreRoot.get_children());
        $this.explorer.refresh();
      });
    }
  },
  onKeyDown: function (e) {
    if (this.uiController != null) {
      this.uiController.keyDown(this, e);
    }
  },
  onDoubleClick: function (e) {
    WWTControl.showDataLayers = true;
  },
  onGestureStart: function (e) {
    this._mouseDown = false;
    this._beginZoom = this.renderContext.viewCamera.zoom;
  },
  onGestureChange: function (e) {
    const g = e;
    this._mouseDown = false;
    this.renderContext.targetCamera.zoom = this.renderContext.viewCamera.zoom = Math.min(360, this._beginZoom * (1 / g.scale));
  },
  onGestureEnd: function (e) {
    const g = e;
    this._mouseDown = false;
  },
  _annotationclicked: function (ra, dec, x, y) {
    if (this._annotations != null && this._annotations.length > 0) {
      let index = 0;
      const $enum1 = ss.enumerate(this._annotations);
      while ($enum1.moveNext()) {
        const note = $enum1.current;
        if (note.hitTest(this.renderContext, ra, dec, x, y)) {
          WWTControl.scriptInterface._fireAnnotationclicked(ra, dec, note.get_id());
          return true;
        }
        index++;
      }
    }
    return false;
  },
  _annotationHover: function (ra, dec, x, y) {
    if (this._annotations != null && this._annotations.length > 0) {
      let index = 0;
      const $enum1 = ss.enumerate(this._annotations);
      while ($enum1.moveNext()) {
        const note = $enum1.current;
        if (note.hitTest(this.renderContext, ra, dec, x, y)) {
          this._hoverText = note.get_label();
          this._hoverTextPoint = new Vector2d(x, y);
          return true;
        }
        index++;
      }
    }
    return false;
  },
  onTouchStart: function (e) {
    const ev = e;
    ev.preventDefault();
    ev.stopPropagation();
    this._lastX = ev.targetTouches[0].pageX;
    this._lastY = ev.targetTouches[0].pageY;
    if (ev.targetTouches.length === 2) {
      this._isPintching = true;
      return;
    } else if (this.uiController != null) {
      const ee = new WWTElementEvent(this._lastX, this._lastY);
      if (this.uiController.mouseDown(this, ee)) {
        this._mouseDown = false;
        this._dragging = false;
        return;
      }
    }
    this._mouseDown = true;
  },
  onPointerDown: function (e) {
    const pe = e;
    let index = 0;
    const evt = arguments[0], cnv = arguments[0].target;
    if (cnv.setPointerCapture) {
      cnv.setPointerCapture(evt.pointerId);
    } else if (cnv.msSetPointerCapture) {
      cnv.msSetPointerCapture(evt.pointerId);
    }
    ;
    if (!this._pointerIds[0]) {
      this._pointerIds[0] = pe.pointerId;
      index = 0;
    } else {
      if (!this._pointerIds[1]) {
        this._pointerIds[1] = pe.pointerId;
        index = 1;
      } else {
        return;
      }
    }
    this._rect[index] = new Vector2d(e.offsetX, e.offsetY);
  },
  onPointerMove: function (e) {
    const pe = e;
    let index = 0;
    if (this._pointerIds[0] === pe.pointerId) {
      index = 0;
    } else {
      if (this._pointerIds[1] === pe.pointerId) {
        index = 1;
      } else {
        return;
      }
    }
    if (!!this._pointerIds[0] && !!this._pointerIds[1]) {
      if (this._rect[0] != null) {
        const oldDist = this.getDistance(this._rect[0], this._rect[1]);
        this._rect[index] = new Vector2d(e.offsetX, e.offsetY);
        const newDist = this.getDistance(this._rect[0], this._rect[1]);
        const ratio = oldDist / newDist;
        this.zoom(ratio);
      }
      e.stopPropagation();
      e.preventDefault();
    }
    this._rect[index] = new Vector2d(e.offsetX, e.offsetY);
  },
  onPointerUp: function (e) {
    const pe = e;
    if (this._pointerIds[0] === pe.pointerId) {
      this._pointerIds[0] = 0;
    } else {
      if (this._pointerIds[1] === pe.pointerId) {
        this._pointerIds[1] = 0;
      } else {
        return;
      }
    }
  },
  onTouchMove: function (e) {
    const ev = e;
    if (this._isPintching) {
      this.pinchMove(ev);
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
    if (this._mouseDown) {
      this._dragging = true;
      const curX = ev.targetTouches[0].pageX - this._lastX;
      const curY = ev.targetTouches[0].pageY - this._lastY;
      this.move(curX, curY);
      this._lastX = ev.targetTouches[0].pageX;
      this._lastY = ev.targetTouches[0].pageY;
    } else {
      if (this.uiController != null) {
        if (this.uiController.mouseMove(this, e)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    }
  },
  onTouchEnd: function (e) {
    const ev = e;
    ev.preventDefault();
    ev.stopPropagation();
    this._rect = new Array(2);
    if (this._isPintching) {
      if (ev.touches.length < 2) {
        this._isPintching = false;
      }
      return;
    }
    if (this.uiController != null) {
      const ee = new WWTElementEvent(this._lastX, this._lastY);
      if (this.uiController.mouseUp(this, ee)) {
        this._mouseDown = false;
        this._dragging = false;
        return;
      }
    }
    this._mouseDown = false;
    this._dragging = false;
  },
  pinchStart: function (ev) {
    const t0 = ev.touches[0];
    const t1 = ev.touches[1];
    this._rect[0] = new Vector2d(t0.pageX, t0.pageY);
    this._rect[1] = new Vector2d(t1.pageX, t1.pageY);
    ev.stopPropagation();
    ev.preventDefault();
  },
  pinchMove: function (ev) {
    const t0 = ev.touches[0];
    const t1 = ev.touches[1];
    const newRect = new Array(2);
    newRect[0] = new Vector2d(t0.pageX, t0.pageY);
    newRect[1] = new Vector2d(t1.pageX, t1.pageY);
    if (this._rect[0] != null) {
      const oldDist = this.getDistance(this._rect[0], this._rect[1]);
      const newDist = this.getDistance(newRect[0], newRect[1]);
      const ratio = oldDist / newDist;
      this.zoom(ratio);
    }
    this._rect = newRect;
    ev.stopPropagation();
    ev.preventDefault();
  },
  getDistance: function (a, b) {
    let x;
    let y;
    x = a.x - b.x;
    y = a.y - b.y;
    return Math.sqrt(x * x + y * y);
  },
  onMouseDown: function (e) {
    document.addEventListener('mousemove', ss.bind('onMouseMove', this), false);
    document.addEventListener('mouseup', ss.bind('onMouseUp', this), false);
    if (this.uiController != null) {
      if (this.uiController.mouseDown(this, e)) {
        return;
      }
    }
    this._mouseDown = true;
    this._lastX = Mouse.offsetX(this.canvas, e);
    this._lastY = Mouse.offsetY(this.canvas, e);
  },
  onContextMenu: function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  onMouseMove: function (e) {
    this._lastMouseMove = ss.now();
    this._hoverTextPoint = new Vector2d(Mouse.offsetX(this.canvas, e), Mouse.offsetY(this.canvas, e));
    this._hoverText = '';
    if (this._mouseDown) {
      e.preventDefault();
      e.stopPropagation();
      this._moved = true;
      if (e.ctrlKey) {
        this._tilt(Mouse.offsetX(this.canvas, e) - this._lastX, Mouse.offsetY(this.canvas, e) - this._lastY);
      } else {
        this.move(Mouse.offsetX(this.canvas, e) - this._lastX, Mouse.offsetY(this.canvas, e) - this._lastY);
      }
      this._lastX = Mouse.offsetX(this.canvas, e);
      this._lastY = Mouse.offsetY(this.canvas, e);
    } else {
      if (this.uiController != null) {
        if (this.uiController.mouseMove(this, e)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    }
  },
  _tilt: function (x, y) {
    this.renderContext.targetCamera.rotation += x * 0.001;
    this.renderContext.targetCamera.angle += y * 0.001;
    if (this.renderContext.targetCamera.angle < -1.52) {
      this.renderContext.targetCamera.angle = -1.52;
    }
    if (this.renderContext.targetCamera.angle > 0) {
      this.renderContext.targetCamera.angle = 0;
    }
  },
  onMouseUp: function (e) {
    document.removeEventListener('mousemove', ss.bind('onMouseMove', this), false);
    document.removeEventListener('mouseup', ss.bind('onMouseUp', this), false);
    if (this.uiController != null) {
      if (this.uiController.mouseUp(this, e)) {
        this._mouseDown = false;
        e.preventDefault();
        return;
      }
    }
    if (this._mouseDown && !this._moved) {
      const raDecDown = this.getCoordinatesForScreenPoint(Mouse.offsetX(this.canvas, e), Mouse.offsetY(this.canvas, e));
      if (!this._annotationclicked(raDecDown.x, raDecDown.y, Mouse.offsetX(this.canvas, e), Mouse.offsetY(this.canvas, e))) {
        WWTControl.scriptInterface._fireClick(raDecDown.x, raDecDown.y);
      }
    }
    this._mouseDown = false;
    this._moved = false;
  },
  getCoordinatesForScreenPoint: function (x, y) {
    let result;
    let PickRayOrig;
    let PickRayDir;
    const pt = new Vector2d(x, y);
    PickRayDir = this.transformPickPointToWorldSpace(pt, this.renderContext.width, this.renderContext.height);
    result = Coordinates.cartesianToSphericalSky(PickRayDir);
    return result;
  },
  transformPickPointToWorldSpace: function (ptCursor, backBufferWidth, backBufferHeight) {
    let vPickRayOrig;
    let vPickRayDir;
    const v = new Vector3d();
    v.x = (((2 * ptCursor.x) / backBufferWidth) - 1) / this.renderContext.get_projection().get_m11();
    v.y = (((2 * ptCursor.y) / backBufferHeight) - 1) / this.renderContext.get_projection().get_m22();
    v.z = 1;
    const m = Matrix3d.multiplyMatrix(this.renderContext.get_view(), this.renderContext.get_world());
    m.invert();
    vPickRayDir = new Vector3d();
    vPickRayOrig = new Vector3d();
    vPickRayDir.x = v.x * m.get_m11() + v.y * m.get_m21() + v.z * m.get_m31();
    vPickRayDir.y = v.x * m.get_m12() + v.y * m.get_m22() + v.z * m.get_m32();
    vPickRayDir.z = v.x * m.get_m13() + v.y * m.get_m23() + v.z * m.get_m33();
    vPickRayDir.normalize();
    return vPickRayDir;
  },
  onMouseWheel: function (e) {
    const ev = e;
    let delta;
    if (!!ev.detail) {
      delta = ev.detail * -1;
    } else {
      delta = ev.wheelDelta / 40;
    }
    if (delta > 0) {
      this.zoom(0.9);
    } else {
      this.zoom(1.1);
    }
  },
  gotoRADecZoom: function (ra, dec, zoom, instant) {
    ra = DoubleUtilities.clamp(ra, 0, 24);
    dec = DoubleUtilities.clamp(dec, -90, 90);
    zoom = DoubleUtilities.clamp(zoom, this.get_zoomMin(), this.get__zoomMax());
    this._tracking = false;
    this._trackingObject = null;
    this.gotoTargetFull(false, instant, CameraParameters.create(dec, WWTControl.singleton.renderContext.rAtoViewLng(ra), zoom, WWTControl.singleton.renderContext.viewCamera.rotation, WWTControl.singleton.renderContext.viewCamera.angle, WWTControl.singleton.renderContext.viewCamera.opacity), WWTControl.singleton.renderContext.get_foregroundImageset(), WWTControl.singleton.renderContext.get_backgroundImageset());
  },
  get_solarSystemMode: function () {
    if (this.renderContext.get_backgroundImageset() == null) {
      return false;
    }
    return this.renderContext.get_backgroundImageset().get_dataSetType() === 4;
  },
  gotoTarget: function (place, noZoom, instant, trackObject) {
    if (place == null) {
      return;
    }
    if ((trackObject && this.get_solarSystemMode())) {
      if ((place.get_classification() === 536870912 && place.get_type() !== 4) || (place.get_classification() === 1) || (place.get_classification() === 1048576) && place.get_distance() > 0) {
        let target = 65536;
        if (place.get_classification() === 1 || place.get_classification() === 1048576) {
          target = 20;
        } else {
          try {
            if (place.get_target() !== 65536) {
              target = place.get_target();
            } else {
              target = Planets.getPlanetIDFromName(place.get_name());
            }
          } catch ($e1) {
          }
        }
        if (target !== 65536) {
          this._trackingObject = place;
          if (target === this._solarSystemTrack && !(place.get_classification() === 1 || place.get_classification() === 1048576)) {
            this.gotoTarget3(place.get_camParams(), noZoom, instant);
            return;
          }
          let jumpTime = 4;
          if (target === 20) {
            jumpTime = 17;
          } else {
            jumpTime += 13 * (101 - Settings.get_active().get_solarSystemScale()) / 100;
          }
          if (instant) {
            jumpTime = 1;
          }
          const camTo = this.renderContext.viewCamera.copy();
          camTo.targetReferenceFrame = '';
          camTo.target = target;
          let zoom = 10;
          if (target === 20) {
            if (place.get_classification() === 1048576) {
              zoom = 1404946007758;
            } else {
              zoom = 63239.6717 * 100;
            }
            const vect = Coordinates.raDecTo3dAu(place.get_RA(), place.get_dec(), place.get_distance());
            const ecliptic = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow()) / 180 * Math.PI;
            vect.rotateX(ecliptic);
            camTo.viewTarget = Vector3d.negate(camTo.viewTarget);
          } else {
            camTo.viewTarget = Planets.getPlanet3dLocationJD(target, SpaceTimeController.getJNowForFutureTime(jumpTime));
            switch (target) {
              case 0:
                zoom = 0.6;
                break;
              case 1:
                zoom = 0.0004;
                break;
              case 2:
                zoom = 0.0004;
                break;
              case 3:
                zoom = 0.0004;
                break;
              case 4:
                zoom = 0.007;
                break;
              case 5:
                zoom = 0.007;
                break;
              case 6:
                zoom = 0.004;
                break;
              case 7:
                zoom = 0.004;
                break;
              case 8:
                zoom = 0.0004;
                break;
              case 9:
                zoom = 0.0004;
                break;
              case 10:
                zoom = 0.0004;
                break;
              case 11:
                zoom = 0.0004;
                break;
              case 12:
                zoom = 0.0004;
                break;
              case 13:
                zoom = 0.0004;
                break;
              case 19:
                zoom = 0.0004;
                break;
              case 20:
                zoom = 10;
                break;
              default:
                break;
            }
            zoom = zoom * Settings.get_active().get_solarSystemScale();
          }
          let fromParams = this.renderContext.viewCamera.copy();
          if (this._solarSystemTrack === 20 && !ss.emptyString(this.renderContext.get_trackingFrame())) {
            fromParams = this.renderContext.customTrackingParams;
            this.renderContext.set_trackingFrame('');
          }
          camTo.zoom = zoom;
          let toVector = camTo.viewTarget;
          toVector.subtract(fromParams.viewTarget);
          if (place.get_classification() === 1) {
            toVector = Vector3d.negate(toVector);
          }
          if (!!toVector.length()) {
            const raDec = toVector.toRaDec();
            if (target === 20) {
              camTo.lat = -raDec.y;
            } else {
              camTo.lat = raDec.y;
            }
            camTo.lng = raDec.x * 15 - 90;
          } else {
            camTo.lat = this.renderContext.viewCamera.lat;
            camTo.lng = this.renderContext.viewCamera.lng;
          }
          if (target !== 20) {
            camTo.viewTarget = Planets.getPlanetTargetPoint(target, camTo.lat, camTo.lng, SpaceTimeController.getJNowForFutureTime(jumpTime));
          }
          const solarMover = new ViewMoverKenBurnsStyle(fromParams, camTo, jumpTime, SpaceTimeController.get_now(), SpaceTimeController.getTimeForFutureTime(jumpTime), 3);
          solarMover.fastDirectionMove = true;
          this.set__mover(solarMover);
          return;
        }
      }
    }
    this._tracking = false;
    this._trackingObject = null;
    const camParams = place.get_camParams().copy();
    if (this.renderContext.get_backgroundImageset() != null && place.get_type() !== this.renderContext.get_backgroundImageset().get_dataSetType()) {
      this.renderContext.targetCamera = place.get_camParams().copy();
      this.renderContext.viewCamera = this.renderContext.targetCamera.copy();
      this.renderContext.set_backgroundImageset(this.getDefaultImageset(place.get_type(), 3));
      instant = true;
    } else if (this.get_solarSystemMode() && place.get_target() !== this._solarSystemTrack) {
      this.renderContext.targetCamera = place.get_camParams().copy();
      this.renderContext.viewCamera = this.renderContext.targetCamera.copy();
      this._solarSystemTrack = place.get_target();
      instant = true;
    }
    if (place.get_classification() === 128) {
      camParams.zoom = this.get__zoomMax();
      this.gotoTargetFull(false, instant, camParams, null, null);
    } else {
      this._solarSystemTrack = place.get_target();
      this.gotoTargetFull(noZoom, instant, camParams, place.get_studyImageset(), place.get_backgroundImageset());
      if (trackObject) {
        this._tracking = true;
        this._trackingObject = place;
      }
    }
  },
  gotoTarget3: function (camParams, noZoom, instant) {
    this._tracking = false;
    this._trackingObject = null;
    this.gotoTargetFull(noZoom, instant, camParams, this.renderContext.get_foregroundImageset(), this.renderContext.get_backgroundImageset());
  },
  gotoTargetFull: function (noZoom, instant, cameraParams, studyImageSet, backgroundImageSet) {
    WWTControl.set_renderNeeded(true);
    this._tracking = false;
    this._trackingObject = null;
    this._targetStudyImageset = studyImageSet;
    this._targetBackgroundImageset = backgroundImageSet;
    if (noZoom) {
      cameraParams.zoom = this.renderContext.viewCamera.zoom;
      cameraParams.angle = this.renderContext.viewCamera.angle;
      cameraParams.rotation = this.renderContext.viewCamera.rotation;
    } else {
      if (cameraParams.zoom === -1 || !cameraParams.zoom) {
        if (this.renderContext.space) {
          cameraParams.zoom = 1.40625;
        } else {
          cameraParams.zoom = 0.09;
        }
      }
    }
    if (instant || (Math.abs(this.renderContext.viewCamera.lat - cameraParams.lat) < 1E-12 && Math.abs(this.renderContext.viewCamera.lng - cameraParams.lng) < 1E-12 && Math.abs(this.renderContext.viewCamera.zoom - cameraParams.zoom) < 1E-12)) {
      this.set__mover(null);
      this.renderContext.targetCamera = cameraParams.copy();
      if (this.renderContext.space && Settings.get_active().get_galacticMode()) {
        const gPoint = Coordinates.j2000toGalactic(this.renderContext.viewCamera.get_RA() * 15, this.renderContext.viewCamera.get_dec());
        this.renderContext.targetAlt = this.renderContext.alt = gPoint[1];
        this.renderContext.targetAz = this.renderContext.az = gPoint[0];
      }
      else if (this.renderContext.space && Settings.get_active().get_localHorizonMode()) {
        const currentAltAz = Coordinates.equitorialToHorizon(Coordinates.fromRaDec(this.renderContext.viewCamera.get_RA(), this.renderContext.viewCamera.get_dec()), SpaceTimeController.get_location(), SpaceTimeController.get_now());
        this.renderContext.targetAlt = this.renderContext.alt = currentAltAz.get_alt();
        this.renderContext.targetAz = this.renderContext.az = currentAltAz.get_az();
      }
      if (this.renderContext.space && Settings.get_active().get_galacticMode()) {
        const gPoint = Coordinates.j2000toGalactic(this.renderContext.viewCamera.get_RA() * 15, this.renderContext.viewCamera.get_dec());
        this.renderContext.targetAlt = this.renderContext.alt = gPoint[1];
        this.renderContext.targetAz = this.renderContext.az = gPoint[0];
      } else if (this.renderContext.space && Settings.get_active().get_localHorizonMode()) {
        const currentAltAz = Coordinates.equitorialToHorizon(Coordinates.fromRaDec(this.renderContext.viewCamera.get_RA(), this.renderContext.viewCamera.get_dec()), SpaceTimeController.get_location(), SpaceTimeController.get_now());
        this.renderContext.targetAlt = this.renderContext.alt = currentAltAz.get_alt();
        this.renderContext.targetAz = this.renderContext.az = currentAltAz.get_az();
      }
      this._mover_Midpoint();
    } else {
      this.set__mover(ViewMoverSlew.create(this.renderContext.viewCamera, cameraParams));
      WWTControl.set_renderNeeded(true);
      this.get__mover().set_midpoint(ss.bind('_mover_Midpoint', this));
    }
  },
  _freezeView: function () {
    this.renderContext.viewCamera = this.renderContext.targetCamera.copy();
    this.set__mover(null);
  },
  get__mover: function () {
    return this.renderContext.viewMover;
  },
  set__mover: function (value) {
    this.renderContext.viewMover = value;
    WWTControl.set_renderNeeded(true);
    return value;
  },
  fadeInImageSet: function (newImageSet) {
    if (this.renderContext.get_backgroundImageset() != null && newImageSet.get_dataSetType() !== this.renderContext.get_backgroundImageset().get_dataSetType()) {
      TileCache.purgeQueue();
      TileCache.clearCache();
    }
    this.renderContext.set_backgroundImageset(newImageSet);
  },
  _mover_Midpoint: function () {
    if ((this._targetStudyImageset != null && this.renderContext.get_foregroundImageset() == null) || (this.renderContext.get_foregroundImageset() != null && !this.renderContext.get_foregroundImageset().equals(this._targetStudyImageset))) {
      this.renderContext.set_foregroundImageset(this._targetStudyImageset);
    }
    if (this.renderContext.get_backgroundImageset() != null && (this._targetBackgroundImageset != null && !this.renderContext.get_backgroundImageset().equals(this._targetBackgroundImageset))) {
      if (this._targetBackgroundImageset != null && this._targetBackgroundImageset.get_generic()) {
        this.fadeInImageSet(this._getRealImagesetFromGeneric(this._targetBackgroundImageset));
      } else {
        this.fadeInImageSet(this._targetBackgroundImageset);
      }
    }
  },
  getDefaultImageset: function (imageSetType, bandPass) {
    const $enum1 = ss.enumerate(WWTControl.imageSets);
    while ($enum1.moveNext()) {
      let imageset = $enum1.current;
      if (imageset.get_defaultSet() && imageset.get_bandPass() === bandPass && imageset.get_dataSetType() === imageSetType) {
        return imageset;
      }
    }
    const $enum2 = ss.enumerate(WWTControl.imageSets);
    while ($enum2.moveNext()) {
      let imageset = $enum2.current;
      if (imageset.get_bandPass() === bandPass && imageset.get_dataSetType() === imageSetType) {
        return imageset;
      }
    }
    const $enum3 = ss.enumerate(WWTControl.imageSets);
    while ($enum3.moveNext()) {
      let imageset = $enum3.current;
      if (imageset.get_dataSetType() === imageSetType) {
        return imageset;
      }
    }
    return WWTControl.imageSets[0];
  },
  _getRealImagesetFromGeneric: function (generic) {
    const $enum1 = ss.enumerate(WWTControl.imageSets);
    while ($enum1.moveNext()) {
      let imageset = $enum1.current;
      if (imageset.get_defaultSet() && imageset.get_bandPass() === generic.get_bandPass() && imageset.get_dataSetType() === generic.get_dataSetType()) {
        return imageset;
      }
    }
    const $enum2 = ss.enumerate(WWTControl.imageSets);
    while ($enum2.moveNext()) {
      let imageset = $enum2.current;
      if (imageset.get_bandPass() === generic.get_bandPass() && imageset.get_dataSetType() === generic.get_dataSetType()) {
        return imageset;
      }
    }
    return WWTControl.imageSets[0];
  },
  _hideUI: function (p) {
  },
  _closeTour: function () {
  },
  createTour: function (name) {
    if (ss.canCast(this.uiController, TourPlayer)) {
      const player = this.uiController;
      player.stop(false);
    }
    this.tour = new TourDocument();
    this.tour.set_title(name);
    this.setupTour();
    this.tour.set_editMode(true);
    return this.tour;
  },
  setupTour: function () {
    this.tourEdit = new TourEditTab();
    this.tourEdit.set_tour(this.tour);
    this.tour.set_currentTourstopIndex(0);
    this.tour.set_editMode(false);
    this.uiController = this.tourEdit.tourEditorUI;
  },
  playTour: function (url) {
    const $this = this;

    if (ss.canCast(this.uiController, TourPlayer)) {
      const player = this.uiController;
      player.stop(false);
    }
    this.tour = TourDocument.fromUrl(url, function () {
      $this.setupTour();
      $this.tourEdit.playNow(true);
      WWTControl.scriptInterface._fireTourReady();
    });
  },
  playCurrentTour: function () {
    if (ss.canCast(this.uiController, TourPlayer)) {
      const player = this.uiController;
      player.play();
    }
  },
  pauseCurrentTour: function () {
    if (ss.canCast(this.uiController, TourPlayer)) {
      const player = this.uiController;
      player.pauseTour();
    }
  },
  stopCurrentTour: function () {
    if (ss.canCast(this.uiController, TourPlayer)) {
      const player = this.uiController;
      player.stop(false);
    }
  },
  getImagesetByName: function (name) {
    const $enum1 = ss.enumerate(WWTControl.imageSets);
    while ($enum1.moveNext()) {
      const imageset = $enum1.current;
      if (imageset.get_name().toLowerCase().indexOf(name.toLowerCase()) > -1) {
        return imageset;
      }
    }
    return null;
  },
  setBackgroundImageByName: function (name) {
    const newBackground = this.getImagesetByName(name);
    if (newBackground != null) {
      this.renderContext.set_backgroundImageset(newBackground);
    }
  },
  setForegroundImageByName: function (name) {
    const newForeground = this.getImagesetByName(name);
    if (newForeground != null) {
      this.renderContext.set_foregroundImageset(newForeground);
    }
  },
  _drawCrosshairs: function (context) {
    if (context.gl == null) {
      const ctx = context.device;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = Settings.get_current().get_crosshairsColor();
      ctx.lineWidth = 2;
      const x = context.width / 2, y = context.height / 2;
      const halfLength = 5;
      ctx.moveTo(x, y + halfLength);
      ctx.lineTo(x, y - halfLength);
      ctx.moveTo(x + halfLength, y);
      ctx.lineTo(x - halfLength, y);
      ctx.stroke();
      ctx.restore();
    } else {
      if (this._crossHarirs == null) {
        this._crossHarirs = new SimpleLineList();
        this._crossHarirs.set_depthBuffered(false);
        this._crossHarirs.pure2D = true;
        this._crossHarirs.addLine(new Vector3d(-0.02, 0, 0), new Vector3d(0.02, 0, 0));
        this._crossHarirs.addLine(new Vector3d(0, -0.03, 0), new Vector3d(0, 0.03, 0));
      }
      this._crossHarirs.drawLines(context, 1, Colors.get_white());
    }
  },
  captureThumbnail: function (blobReady) {
    this.render();
    const image = document.createElement('img');
    image.addEventListener('load', function (e) {
      const imageAspect = (image.width) / image.height;
      const clientAspect = 96 / 45;
      let cw = 96;
      let ch = 45;
      if (imageAspect < clientAspect) {
        ch = ss.truncate((cw / imageAspect));
      } else {
        cw = ss.truncate((ch * imageAspect));
      }
      const cx = (96 - cw) / 2;
      const cy = (45 - ch) / 2;
      const temp = document.createElement('canvas');
      temp.height = 45;
      temp.width = 96;
      const ctx = temp.getContext('2d');
      ctx.drawImage(image, cx, cy, cw, ch);
      if (typeof temp.msToBlob == 'function') {
        const blob = temp.msToBlob();
        blobReady(blob);
      } else {
        temp.toBlob(blobReady, 'image/jpeg');
      }
      ;
    }, false);
    image.src = WWTControl.singleton.canvas.toDataURL();
  }
};