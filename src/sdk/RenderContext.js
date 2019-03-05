import {Matrix3d, PlaneD, Vector3d} from './Double3d';
import {Colors} from './Color';
import ss from './scriptsharp/ss';
import {TileCache} from './TileCache';
import {Coordinates} from './Coordinates';
import {Settings} from './settings';
import {SpaceTimeController} from './SpaceTimeController';
import {Planets} from './Planets';
import {LayerManager} from './Layers/LayerManager';
import {Util} from './Util';
import {Tile} from './Tile';
import {TileShader} from './Graphics/Shaders';
import {CameraParameters} from './CameraParameters';
import {RenderTriangle} from './RenderTriangle';

export class RenderContext{
  constructor() {
    this.height = 0;
    this.width = 0;
    this.lighting = false;
    this._viewPoint = new Vector3d();
    this.space = false;
    this._fovAngle = 0;
    this._fovScale = 0;
    this._nominalRadius = 6378137;
    this._mainTexture = null;
    this.viewMover = null;
    this.viewCamera = new CameraParameters();
    this.targetCamera = new CameraParameters();
    this.alt = 0;
    this.az = 0;
    this.targetAlt = 0;
    this.targetAz = 0;
    this._targetHeight = 1;
    this.targetAltitude = 0;
    this._galactic = true;
    this._galacticMatrix = new Matrix3d(-0.4838350155, -0.0548755604, -0.8734370902, 0, 0.7469822445, 0.4941094279, -0.44482963, 0, 0.4559837762, -0.867666149, -0.1980763734, 0, 0, 0, 0, 1);
    this._firstTimeInit = false;
    this._useSolarSystemTilt = true;
    this.customTrackingParams = new CameraParameters();
    this._cameraOffset = new Vector3d();
    this._fovLocal = (Math.PI / 4);
    this.perspectiveFov = Math.PI / 4;
    this.nearPlane = 0;
    this._frustumDirty = true;
    this._frustum = new Array(6);
    this._ambientLightColor = Colors.get_black();
    this._hemiLightColor = Colors.get_black();
    this._hemiLightUp = new Vector3d();
    this._sunlightColor = Colors.get_white();
    this._sunPosition = new Vector3d();
    this._reflectedLightColor = Colors.get_black();
    this._reflectedLightPosition = new Vector3d();
    this._occludingPlanetRadius = 0;
    this._occludingPlanetPosition = new Vector3d();
    this._lightingStateDirty = true;
    this._twoSidedLighting = false;
    this.cameraPosition = new Vector3d();
    this._skyColor = 'Blue';
    for (let i = 0; i < 6; i++) {
      this._frustum[i] = new PlaneD(0, 0, 0, 0);
    }
  }

  static create (device) {
  const temp = new RenderContext();
  temp.device = device;
  temp.viewCamera.zoom = 700;
  temp.viewCamera.target = 65536;
  return temp;
  }
  static _getTilesYForLevel (layer, level) {
    let maxY = 1;
    switch (layer.get_projection()) {
      case 0:
        maxY = Math.pow(2, level);
        break;
      case 1:
        maxY = (Math.pow(2, level) * (180 / layer.get_baseTileDegrees()));
        break;
      case 2:
        maxY = Math.pow(2, level);
        break;
      case 4:
        maxY = 1;
        break;
      default:
        maxY = Math.pow(2, level);
        break;
    }
    if (maxY === Number.POSITIVE_INFINITY) {
      maxY = 1;
    }
    return maxY;
  }
  static _getTilesXForLevel (layer, level) {
    let maxX = 1;
    switch (layer.get_projection()) {
      case 6:
      case 3:
        maxX = Math.pow(2, level);
        break;
      case 0:
        maxX = Math.pow(2, level) * ss.truncate((layer.get_baseTileDegrees() / 360));
        break;
      case 1:
        maxX = Math.pow(2, level) * ss.truncate((360 / layer.get_baseTileDegrees()));
        break;
      case 2:
        if (layer.get_widthFactor() === 1) {
          maxX = Math.pow(2, level) * 2;
        }
        else {
          maxX = Math.pow(2, level);
        }
        break;
      case 5:
        maxX = 1;
        break;
      case 4:
        maxX = 1;
        break;
      default:
        maxX = Math.pow(2, level) * 2;
        break;
    }
    return maxX;
  }

  save () {
    if (this.gl != null) {
    } else {
      this.device.save();
    }
  }
  restore () {
    if (this.gl != null) {
    } else {
      this.device.restore();
    }
  }
  clear () {
    if (this.gl != null) {
      this.gl.viewport(0, 0, ss.truncate(this.width), ss.truncate(this.height));
      this.gl.clear(16384 | 256);
    } else {
      this.device.save();
      this.device.fillStyle = 'black';
      this.device.fillRect(0, 0, this.width, this.height);
      this.device.restore();
    }
  }
  get_viewPoint () {
    return this._viewPoint;
  }
  get_RA () {
    return ((((180 - (this.viewCamera.lng - 180)) / 15) % 24) + 48) % 24;
  }
  rAtoViewLng (ra) {
    return 180 - (ra / 24 * 360) - 180;
  }
  get_dec () {
    return this.viewCamera.lat;
  }
  get_fovAngle () {
    return this._fovAngle;
  }
  get_fovScale () {
    return this._fovScale;
  }
  set_fovScale (value) {
    this._fovScale = value;
    return value;
  }
  get_view () {
    return this._view;
  }
  set_view (value) {
    this._view = value;
    this._frustumDirty = true;
    return value;
  }
  get_viewBase () {
    return this._viewBase;
  }
  set_viewBase (value) {
    this._viewBase = value;
    return value;
  }
  get_projection () {
    return this._projection;
  }
  set_projection (value) {
    this._projection = value;
    this._frustumDirty = true;
    return value;
  }
  get_world () {
    return this._world;
  }
  set_world (value) {
    this._world = value;
    this._frustumDirty = true;
    return value;
  }
  _getScreenTexture () {
    const tex = null;
    return tex;
  }
  get_worldBase () {
    return this._worldBase;
  }
  set_worldBase (value) {
    this._worldBase = value;
    return value;
  }
  get_worldBaseNonRotating () {
    return this._worldBaseNonRotating;
  }
  set_worldBaseNonRotating (value) {
    this._worldBaseNonRotating = value;
    return value;
  }
  get_nominalRadius () {
    return this._nominalRadius;
  }
  set_nominalRadius (value) {
    this._nominalRadius = value;
    return value;
  }
  get_mainTexture () {
    return this._mainTexture;
  }
  set_mainTexture (value) {
    if (value != null) {
      this._mainTexture = value;
      this.gl.bindTexture(3553, this._mainTexture.texture2d);
    }
    return value;
  }
  onTarget (place) {
    return ((Math.abs(this.viewCamera.lat - this.targetCamera.lat) < 1E-12 && Math.abs(this.viewCamera.lng - this.targetCamera.lng) < 1E-12 && Math.abs(this.viewCamera.zoom - this.targetCamera.zoom) < 1E-12) && this.viewMover == null);
  }
  setTexture (texture) {
  }
  get_backgroundImageset () {
    return this._backgroundImageset;
  }
  set_backgroundImageset (value) {
    this._backgroundImageset = value;
    return value;
  }
  get_foregroundImageset () {
    return this._foregroundImageset;
  }
  set_foregroundImageset (value) {
    this._foregroundImageset = value;
    return value;
  }
  drawImageSet (imageset, opacity) {
    const maxX = RenderContext._getTilesXForLevel(imageset, imageset.get_baseLevel());
    const maxY = RenderContext._getTilesYForLevel(imageset, imageset.get_baseLevel());
    for (let x = 0; x < maxX; x++) {
      for (let y = 0; y < maxY; y++) {
        const tile = TileCache.getTile(imageset.get_baseLevel(), x, y, imageset, null);
        if (tile != null) {
          tile.draw3D(this, opacity);
        }
      }
    }
  }
  getScaledAltitudeForLatLong (viewLat, viewLong) {
    const layer = this.get_backgroundImageset();
    if (layer == null) {
      return 0;
    }
    const maxX = RenderContext._getTilesXForLevel(layer, layer.get_baseLevel());
    const maxY = RenderContext._getTilesYForLevel(layer, layer.get_baseLevel());
    for (let x = 0; x < maxX; x++) {
      for (let y = 0; y < maxY; y++) {
        const tile = TileCache.getTile(layer.get_baseLevel(), x, y, layer, null);
        if (tile != null) {
          if (Tile.isPointInTile(viewLat, viewLong)) {
            return Tile.getSurfacePointAltitude(viewLat, viewLong, false);
          }
        }
      }
    }
    return 0;
  }
  _setupMatricesLand3d () {
    this.lighting = false;
    this.space = false;
    RenderTriangle.cullInside = false;
    const WorldMatrix = Matrix3d._rotationY(((this.viewCamera.lng - 90) / 180 * Math.PI));
    WorldMatrix._multiply(Matrix3d._rotationX(((-this.viewCamera.lat) / 180 * Math.PI)));
    this.set_world(WorldMatrix);
    this.set_worldBase(WorldMatrix.clone());
    this._viewPoint = Coordinates.geoTo3d(this.viewCamera.lat, this.viewCamera.lng);
    let distance = 0;
    if (this._backgroundImageset.get_isMandelbrot()) {
      distance = (4 * (this.viewCamera.zoom / 180)) + 1E-41;
    } else {
      distance = (4 * (this.viewCamera.zoom / 180)) + 1E-06;
    }
    this._fovAngle = (this.viewCamera.zoom / 343.774) / Math.PI * 180;
    this._fovScale = (this._fovAngle / this.height) * 3600;
    if (this.gl != null) {
      this.targetAltitude = this.getScaledAltitudeForLatLong(this.viewCamera.lat, this.viewCamera.lng);
      const heightNow = 1 + this.targetAltitude;
      this.targetAltitude *= this.get_nominalRadius();
      if (this._targetHeight < heightNow) {
        this._targetHeight = (((this._targetHeight * 2) + heightNow) / 3);
      } else {
        this._targetHeight = (((this._targetHeight * 9) + heightNow) / 10);
      }
    } else {
      this.targetAltitude = 0;
      this._targetHeight = 1;
    }
    const rotLocal = this.viewCamera.rotation;
    this.cameraPosition = new Vector3d((Math.sin(rotLocal) * Math.sin(this.viewCamera.angle) * distance), (Math.cos(rotLocal) * Math.sin(this.viewCamera.angle) * distance), (-this._targetHeight - (Math.cos(this.viewCamera.angle) * distance)));
    const cameraTarget = new Vector3d(0, 0, -this._targetHeight);
    const camHeight = this.cameraPosition.length();
    const lookUp = new Vector3d(Math.sin(rotLocal) * Math.cos(this.viewCamera.angle), Math.cos(rotLocal) * Math.cos(this.viewCamera.angle), Math.sin(this.viewCamera.angle));
    this.set_view(Matrix3d.lookAtLH(this.cameraPosition, cameraTarget, lookUp));
    this.set_viewBase(this.get_view());
    let back = Math.sqrt((distance + 1) * (distance + 1) - 1);
    back = Math.max(0.5, back);
    let m_nearPlane = distance * 0.05;
    m_nearPlane = distance * 0.05;
    this.set_projection(Matrix3d.perspectiveFovLH((Math.PI / 4), this.width / this.height, m_nearPlane, back));
    this._setMatrixes();
    this.makeFrustum();
  }
  setupMatricesSpace3d (canvasWidth, canvasHeight) {
    this.lighting = false;
    if (!this._firstTimeInit) {
      this._galacticMatrix = Matrix3d.get_identity();
      this._galacticMatrix._multiply(Matrix3d._rotationY(-(270 - (17.7603329867975 * 15)) / 180 * Math.PI));
      this._galacticMatrix._multiply(Matrix3d._rotationX(-(-28.9361739586894) / 180 * Math.PI));
      this._galacticMatrix._multiply(Matrix3d._rotationZ(((31.422052860102) - 90) / 180 * Math.PI));
      this._firstTimeInit = true;
    }
    this.space = true;
    RenderTriangle.cullInside = true;
    let WorldMatrix = Matrix3d.get_identity();
    if (Settings.get_active().get_galacticMode()) {
      WorldMatrix._multiply(this._galacticMatrix);
      WorldMatrix._multiply(Matrix3d._rotationY(this.az / 180 * Math.PI));
      WorldMatrix._multiply(Matrix3d._rotationX(-this.alt / 180 * Math.PI));
      const gPoint = Coordinates.galactictoJ2000(this.az, this.alt);
      this._viewPoint = Coordinates.raDecTo3dAu(gPoint[0] / 15, gPoint[1], 1);
      this.targetCamera.lng = this.rAtoViewLng(gPoint[0] / 15);
      this.targetCamera.lat = gPoint[1];
      this.viewCamera.lat = this.targetCamera.lat;
      this.viewCamera.lng = this.targetCamera.lng;
    } else {
      WorldMatrix._multiply(Matrix3d._rotationY(-(this.viewCamera.lng - 90) / 180 * Math.PI));
      WorldMatrix._multiply(Matrix3d._rotationX(-this.viewCamera.lat / 180 * Math.PI));
      this._viewPoint = Coordinates.raDecTo3dAu(this.get_RA(), this.get_dec(), 1);
    }
    let camLocal = this.viewCamera.rotation;
    this._fovAngle = (this.viewCamera.zoom / 343.774) / Math.PI * 180;
    this._fovScale = (this._fovAngle / canvasHeight) * 3600;
    if (Settings.get_active().get_localHorizonMode() && this._backgroundImageset.get_dataSetType() === 2) {
      const zenithAltAz = new Coordinates(0, 0);
      zenithAltAz.set_az(0);
      zenithAltAz.set_alt(0);
      const zenith = Coordinates.horizonToEquitorial(zenithAltAz, SpaceTimeController.get_location(), SpaceTimeController.get_now());
      const raPart = -((zenith.get_RA() - 6) / 24 * (Math.PI * 2));
      const decPart = -(zenith.get_dec() / 360 * (Math.PI * 2));
      const raText = Coordinates.formatDMS(zenith.get_RA());
      WorldMatrix = Matrix3d._rotationY(-raPart - Math.PI);
      WorldMatrix._multiply(Matrix3d._rotationX(decPart));
      if (SpaceTimeController.get_location().get_lat() < 0) {
        WorldMatrix._multiply(Matrix3d._rotationY((this.az / 180 * Math.PI)));
        WorldMatrix._multiply(Matrix3d._rotationX((this.alt / 180 * Math.PI)));
        camLocal += Math.PI;
      } else {
        WorldMatrix._multiply(Matrix3d._rotationY(((-this.az) / 180 * Math.PI)));
        WorldMatrix._multiply(Matrix3d._rotationX(((-this.alt) / 180 * Math.PI)));
      }
      const currentRaDec = Coordinates.horizonToEquitorial(Coordinates.fromLatLng(this.alt, this.az), SpaceTimeController.get_location(), SpaceTimeController.get_now());
      this.viewCamera.lat = this.targetCamera.lat = currentRaDec.get_dec();
      this.viewCamera.lng = this.targetCamera.lng = this.rAtoViewLng(currentRaDec.get_RA());
    }
    this.set_world(WorldMatrix);
    this.set_worldBase(WorldMatrix.clone());
    const localZoomFactor = this.viewCamera.zoom;
    const FovAngle = (localZoomFactor / 343.774) / Math.PI * 180;
    this.cameraPosition = new Vector3d(0, 0, 0);
    this.set_view(Matrix3d.lookAtLH(this.cameraPosition, new Vector3d(0, 0, -1), new Vector3d(Math.sin(camLocal), Math.cos(camLocal), 0)));
    this.set_viewBase(this.get_view().clone());
    const m_nearPlane = 0.1;
    this.nearPlane = 0.1;
    this.set_projection(Matrix3d.perspectiveFovLH(localZoomFactor / 343.774, canvasWidth / canvasHeight, 0.1, -2));
    this._setMatrixes();
    this.makeFrustum();
  }
  get_solarSystemTrack () {
    return this.viewCamera.target;
  }
  set_solarSystemTrack (value) {
    this.viewCamera.target = value;
    return value;
  }
  get_solarSystemCameraDistance () {
    return (4 * (this.viewCamera.zoom / 9)) + 1E-06;
  }
  get_sandboxMode () {
    if (this._backgroundImageset == null) {
      return false;
    }
    return this._backgroundImageset.get_dataSetType() === 5;
  }
  get_trackingFrame () {
    return this.viewCamera.targetReferenceFrame;
  }
  set_trackingFrame (value) {
    this.viewCamera.targetReferenceFrame = value;
    return value;
  }
  get_fovLocal () {
    return this._fovLocal;
  }
  set_fovLocal (value) {
    this._fovLocal = value;
    return value;
  }
  setupMatricesOverlays () {
    this.set_world(Matrix3d.get_identity());
    const lookAtAdjust = Matrix3d.get_identity();
    const lookFrom = new Vector3d(0, 0, 0);
    const lookAt = new Vector3d(0, 0, 1);
    const lookUp = new Vector3d(0, 1, 0);
    let view;
    view = Matrix3d.lookAtLH(lookFrom, lookAt, lookUp);
    view._multiply(Matrix3d._scaling(1, -1, 1));
    this.set_view(view);
    const back = 10000;
    this.nearPlane = 0.1;
    this.set_projection(Matrix3d.perspectiveFovLH(this._fovLocal, this.width / this.height, this.nearPlane, back));
  }
  setupMatricesSolarSystem (forStars) {
    this.lighting = Settings.get_active().get_solarSystemLighting();
    this.space = false;
    if (this.get_solarSystemTrack() !== 20 && this.get_solarSystemTrack() !== 65536) {
      this.viewCamera.viewTarget = Planets.getPlanetTargetPoint(this.get_solarSystemTrack(), this.viewCamera.lat, this.viewCamera.lng, 0);
    }
    RenderTriangle.cullInside = false;
    let cameraDistance = this.get_solarSystemCameraDistance();
    let trackingMatrix = Matrix3d.get_identity();
    cameraDistance -= 1E-06;
    let activeTrackingFrame = false;
    if (this.get_solarSystemTrack() === 20 && !ss.emptyString(this.get_trackingFrame())) {
      activeTrackingFrame = true;
      const target = LayerManager._getFrameTarget(this, this.get_trackingFrame());
      this.viewCamera.viewTarget = target.target;
      trackingMatrix = target.matrix;
    } else if (!ss.emptyString(this.get_trackingFrame())) {
      this.set_trackingFrame('');
    }
    const center = this.viewCamera.viewTarget;
    const localZoom = this.viewCamera.zoom * 20;
    const lookAt = new Vector3d();
    const viewAdjust = Matrix3d.get_identity();
    viewAdjust._multiply(Matrix3d._rotationX(((-this.viewCamera.lat) / 180 * Math.PI)));
    viewAdjust._multiply(Matrix3d._rotationY(((-this.viewCamera.lng) / 180 * Math.PI)));
    const lookAtAdjust = Matrix3d.get_identity();
    const dome = false;
    let lookUp;
    if (this._useSolarSystemTilt && !this.get_sandboxMode()) {
      let angle = this.viewCamera.angle;
      if (cameraDistance > 0.0008) {
        angle = 0;
      } else if (cameraDistance > 1E-05) {
        const val = Math.min(1.903089987, Util.log10(cameraDistance) + 5) / 1.903089987;
        angle = angle * Math.max(0, 1 - val);
      }
      this.cameraPosition = new Vector3d((Math.sin(-this.viewCamera.rotation) * Math.sin(angle) * cameraDistance), (Math.cos(-this.viewCamera.rotation) * Math.sin(angle) * cameraDistance), (Math.cos(angle) * cameraDistance));
      lookUp = new Vector3d(Math.sin(-this.viewCamera.rotation), Math.cos(-this.viewCamera.rotation), 1E-05);
    } else {
      this.cameraPosition = new Vector3d(0, 0, cameraDistance);
      lookUp = new Vector3d(Math.sin(-this.viewCamera.rotation), Math.cos(-this.viewCamera.rotation), 0.0001);
    }
    this.cameraPosition = viewAdjust.transform(this.cameraPosition);
    this._cameraOffset = this.cameraPosition.copy();
    const tmp = trackingMatrix.clone();
    tmp.invert();
    this._cameraOffset = Vector3d._transformCoordinate(this._cameraOffset, tmp);
    lookUp = viewAdjust.transform(lookUp);
    this.set_world(Matrix3d.get_identity());
    this.set_worldBase(Matrix3d.get_identity());
    this.set_worldBaseNonRotating(Matrix3d.get_identity());
    this.set_view(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(trackingMatrix, Matrix3d.lookAtLH(this.cameraPosition, lookAt, lookUp)), lookAtAdjust));
    this.set_viewBase(this.get_view().clone());
    let temp = Vector3d.subtractVectors(lookAt, this.cameraPosition);
    temp.normalize();
    temp = Vector3d._transformCoordinate(temp, trackingMatrix);
    temp.normalize();
    this._viewPoint = temp;
    const radius = Planets.getAdjustedPlanetRadius(this.get_solarSystemTrack());
    if (cameraDistance < radius * 2 && !forStars) {
      this.nearPlane = cameraDistance * 0.03;
      this.nearPlane = Math.max(this.nearPlane, 1E-11);
      RenderContext.back = 1900;
    } else {
      if (forStars) {
        RenderContext.back = 900056;
        RenderContext.back = (cameraDistance > 900056) ? cameraDistance * 3 : 900056;
        this.nearPlane = 3E-05;
      } else {
        RenderContext.back = (cameraDistance > 1900) ? cameraDistance + 200 : 1900;
        if (Settings.get_active().get_solarSystemScale() < 13) {
          this.nearPlane = Math.min(cameraDistance * 0.03, 0.01);
        } else {
          this.nearPlane = 0.001;
        }
      }
    }
    this.set_projection(Matrix3d.perspectiveFovLH(this._fovLocal, this.width / this.height, this.nearPlane, RenderContext.back));
    this.perspectiveFov = this._fovLocal;
    this._fovAngle = (this.viewCamera.zoom / 343.774) / Math.PI * 180;
    this._fovScale = (this._fovAngle / this.height) * 3600;
    this._setMatrixes();
    this.makeFrustum();
  }
  _setMatrixes () {
  }
  get_frustum () {
    return this._frustum;
  }
  get_ambientLightColor () {
    return this._ambientLightColor;
  }
  set_ambientLightColor (value) {
    this._ambientLightColor = value;
    this._lightingStateDirty = true;
    return value;
  }
  get_hemisphereLightColor () {
    return this._hemiLightColor;
  }
  set_hemisphereLightColor (value) {
    this._hemiLightColor = value;
    this._lightingStateDirty = true;
    return value;
  }
  get_hemisphereLightUp () {
    return this._hemiLightUp;
  }
  set_hemisphereLightUp (value) {
    this._hemiLightUp = value;
    this._lightingStateDirty = true;
    return value;
  }
  get_sunlightColor () {
    return this._sunlightColor;
  }
  set_sunlightColor (value) {
    this._sunlightColor = value;
    this._lightingStateDirty = true;
    return value;
  }
  get_sunPosition () {
    return this._sunPosition;
  }
  set_sunPosition (value) {
    this._sunPosition = value;
    this._lightingStateDirty = true;
    return value;
  }
  get_reflectedLightColor () {
    return this._reflectedLightColor;
  }
  set_reflectedLightColor (value) {
    if (this._reflectedLightColor !== value) {
      this._reflectedLightColor = value;
      this._lightingStateDirty = true;
    }
    return value;
  }
  get_reflectedLightPosition () {
    return this._reflectedLightPosition;
  }
  set_reflectedLightPosition (value) {
    this._reflectedLightPosition = value;
    this._lightingStateDirty = true;
    return value;
  }
  get_occludingPlanetRadius () {
    return this._occludingPlanetRadius;
  }
  set_occludingPlanetRadius (value) {
    this._occludingPlanetRadius = value;
    return value;
  }
  get_occludingPlanetPosition () {
    return this._occludingPlanetPosition;
  }
  set_occludingPlanetPosition (value) {
    this._occludingPlanetPosition = value;
    return value;
  }
  get_twoSidedLighting () {
    return this._twoSidedLighting;
  }
  set_twoSidedLighting (value) {
    if (value !== this._twoSidedLighting) {
      this._twoSidedLighting = value;
      this._lightingStateDirty = true;
    }
    return value;
  }
  makeFrustum () {
    this.WV = Matrix3d.multiplyMatrix(this.get_world(), this.get_view());
    const viewProjection = Matrix3d.multiplyMatrix(this.WV, this.get_projection());
    this.WVP = viewProjection.clone();
    const inverseWorld = this.get_world().clone();
    inverseWorld.invert();
    this._frustum[0].a = viewProjection.get_m14() + viewProjection.get_m11();
    this._frustum[0].b = viewProjection.get_m24() + viewProjection.get_m21();
    this._frustum[0].c = viewProjection.get_m34() + viewProjection.get_m31();
    this._frustum[0].d = viewProjection.get_m44() + viewProjection.get_m41();
    this._frustum[1].a = viewProjection.get_m14() - viewProjection.get_m11();
    this._frustum[1].b = viewProjection.get_m24() - viewProjection.get_m21();
    this._frustum[1].c = viewProjection.get_m34() - viewProjection.get_m31();
    this._frustum[1].d = viewProjection.get_m44() - viewProjection.get_m41();
    this._frustum[2].a = viewProjection.get_m14() - viewProjection.get_m12();
    this._frustum[2].b = viewProjection.get_m24() - viewProjection.get_m22();
    this._frustum[2].c = viewProjection.get_m34() - viewProjection.get_m32();
    this._frustum[2].d = viewProjection.get_m44() - viewProjection.get_m42();
    this._frustum[3].a = viewProjection.get_m14() + viewProjection.get_m12();
    this._frustum[3].b = viewProjection.get_m24() + viewProjection.get_m22();
    this._frustum[3].c = viewProjection.get_m34() + viewProjection.get_m32();
    this._frustum[3].d = viewProjection.get_m44() + viewProjection.get_m42();
    this._frustum[4].a = viewProjection.get_m13();
    this._frustum[4].b = viewProjection.get_m23();
    this._frustum[4].c = viewProjection.get_m33();
    this._frustum[4].d = viewProjection.get_m43();
    this._frustum[5].a = viewProjection.get_m14() - viewProjection.get_m13();
    this._frustum[5].b = viewProjection.get_m24() - viewProjection.get_m23();
    this._frustum[5].c = viewProjection.get_m34() - viewProjection.get_m33();
    this._frustum[5].d = viewProjection.get_m44() - viewProjection.get_m43();
    for (let i = 0; i < 6; i++) {
      this._frustum[i].normalize();
    }
    this._frustumDirty = false;
    this.WVP.scale(new Vector3d(this.width / 2, -this.height / 2, 1));
    this.WVP.translate(new Vector3d(this.width / 2, this.height / 2, 0));
    this._setMatrixes();
  }
  _initGL () {
    if (this.gl == null) {
      return;
    }
    const uints_for_indices = this.gl.getExtension('OES_element_index_uint');
    Tile.uvMultiple = 1;
    Tile.demEnabled = true;
    TileShader.init(this);
  }
  freezeView () {
    this.targetAlt = this.alt;
    this.targetAz = this.az;
    this.targetCamera = this.viewCamera.copy();
  }
  _setVertexBuffer (vertexBuffer) {
  }
  _setIndexBuffer (indexBuffer) {
  }
  setMaterial (material, diffuseTex, specularTex, normalMap, opacity) {
    this.set_mainTexture(diffuseTex);
  }
  preDraw () {
  }
}

export function Material() {
  this.specularSharpness = 0;
  this.opacity = 0;
  this.isDefault = false;
}

