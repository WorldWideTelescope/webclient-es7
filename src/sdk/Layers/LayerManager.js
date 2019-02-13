
import ss from '../scriptsharp/ss';
import {Color} from '../Color';
import {Matrix3d, Vector2d, Vector3d} from '../Double3d';
import {Enums} from '../enums';
import {ELL} from '../astrocalc/AAElliptical';
import {SpaceTimeController} from '../SpaceTimeController';
import {WWTControl} from '../WWTControl';
import {WebFile} from '../WebFile';
import {ISSLayer} from '../Graphics/ISSLayer';
import {Language} from '../Language';
import {Settings} from '../settings';
import {VoTableLayer} from '../VOTable';
import {ImageSetLayer} from '../ImageSetLayer';
import {Histogram} from '../Histogram';
import {Planets} from '../Planets';
import {ReferenceFrame} from './ReferenceFrame';
import {TourPlayer} from '../Tours/TourPlayer';
import {Orbit} from '../Orbit';

export function LayerManager() {
}
LayerManager.get_version = function() {
  return LayerManager._version;
};
LayerManager.set_version = function(value) {
  LayerManager._version = value;
  return value;
};
LayerManager.get_frameWizardDialog = function() {
  return LayerManager._frameWizardDialog;
};
LayerManager.get_dataVizWizardDialog = function() {
  return LayerManager._dataVizWizardDialog;
};
LayerManager.get_referenceFramePropsDialog = function() {
  return LayerManager._referenceFramePropsDialog;
};
LayerManager.get_greatCircleDlg = function() {
  return LayerManager._greatCircleDialog;
};
LayerManager.get_tourLayers = function() {
  return LayerManager._tourLayers;
};
LayerManager.set_tourLayers = function(value) {
  if (LayerManager._tourLayers !== value && !value) {
    LayerManager._clearLayers();
    LayerManager._tourLayers = value;
    LayerManager.loadTree();
  }
  else if (LayerManager._tourLayers !== value && !!value) {
    LayerManager._tourLayers = value;
    LayerManager.initLayers();
  }
  return value;
};
LayerManager.loadTree = function() {
  if (WWTControl.scriptInterface != null) {
    WWTControl.scriptInterface.refreshLayerManagerNow();
  }
};
LayerManager.get_layerMaps = function() {
  if (LayerManager.get_tourLayers()) {
    return LayerManager._layerMapsTours;
  }
  else {
    return LayerManager._layerMaps;
  }
};
LayerManager.set_layerMaps = function(value) {
  if (LayerManager.get_tourLayers()) {
    LayerManager._layerMapsTours = value;
  }
  else {
    LayerManager._layerMaps = value;
  }
  return value;
};
LayerManager.get_allMaps = function() {
  if (LayerManager.get_tourLayers()) {
    return LayerManager._allMapsTours;
  }
  else {
    return LayerManager._allMaps;
  }
};
LayerManager.set_allMaps = function(value) {
  if (LayerManager.get_tourLayers()) {
    LayerManager._allMapsTours = value;
  }
  else {
    LayerManager._allMaps = value;
  }
  return value;
};
LayerManager.get_currentMap = function() {
  return LayerManager._currentMap;
};
LayerManager.set_currentMap = function(value) {
  LayerManager._currentMap = value;
  return value;
};
LayerManager.get_layerList = function() {
  if (LayerManager.get_tourLayers()) {
    return LayerManager._layerListTours;
  }
  else {
    return LayerManager._layerList;
  }
};
LayerManager.set_layerList = function(value) {
  if (LayerManager.get_tourLayers()) {
    LayerManager._layerListTours = value;
  }
  else {
    LayerManager._layerList = value;
  }
  return value;
};
LayerManager.initLayers = function() {
  LayerManager._clearLayers();
  let iss = null;
  if (!LayerManager.get_tourLayers()) {
    iss = new LayerMap('ISS', 18);
    iss.frame.epoch = SpaceTimeController._twoLineDateToJulian('10184.51609218');
    iss.frame.semiMajorAxis = 6728829.41;
    iss.frame.referenceFrameType = 1;
    iss.frame.inclination = 51.6442;
    iss.frame.longitudeOfAscendingNode = 147.0262;
    iss.frame.eccentricity = 0.0009909;
    iss.frame.meanAnomolyAtEpoch = 325.5563;
    iss.frame.meanDailyMotion = 360 * 15.72172655;
    iss.frame.argumentOfPeriapsis = 286.4623;
    iss.frame.scale = 1;
    iss.frame.semiMajorAxisUnits = 1;
    iss.frame.meanRadius = 130;
    iss.frame.oblateness = 0;
    iss.frame.showOrbitPath = true;
    let isstle = new Array(0);
    const url = 'http://worldwidetelescope.org/wwtweb/isstle.aspx';
    let webFile;
    webFile = new WebFile(url);
    webFile.onStateChange = function() {
      if (webFile.get_state() === 1) {
        const data = webFile.getText();
        isstle = data.split('\n');
        if (isstle.length > 1) {
          iss.frame.fromTLE(isstle[0], isstle[1], 398600441800000);
        }
      }
    };
    webFile.send();
    iss.enabled = true;
  }
  LayerManager.get_layerMaps()['Sun'] = new LayerMap('Sun', 3);
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Mercury', 4));
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Venus', 5));
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Earth', 6));
  LayerManager.get_layerMaps()['Sun'].childMaps['Earth'].addChild(new LayerMap('Moon', 13));
  if (!LayerManager.get_tourLayers()) {
    LayerManager.get_layerMaps()['Sun'].childMaps['Earth'].addChild(iss);
  }
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Mars', 7));
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Jupiter', 8));
  LayerManager.get_layerMaps()['Sun'].childMaps['Jupiter'].addChild(new LayerMap('Io', 14));
  LayerManager.get_layerMaps()['Sun'].childMaps['Jupiter'].addChild(new LayerMap('Europa', 15));
  LayerManager.get_layerMaps()['Sun'].childMaps['Jupiter'].addChild(new LayerMap('Ganymede', 16));
  LayerManager.get_layerMaps()['Sun'].childMaps['Jupiter'].addChild(new LayerMap('Callisto', 17));
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Saturn', 9));
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Uranus', 10));
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Neptune', 11));
  LayerManager.get_layerMaps()['Sun'].addChild(new LayerMap('Pluto', 12));
  LayerManager._addMoons(LayerManager._moonfile);
  LayerManager.get_layerMaps()['Sky'] = new LayerMap('Sky', 0);
  LayerManager.get_layerMaps()['Sun'].open = true;
  LayerManager._allMaps = {};
  LayerManager._addAllMaps(LayerManager.get_layerMaps(), null);
  if (!LayerManager.get_tourLayers()) {
    LayerManager._addIss();
  }
  LayerManager._version++;
  LayerManager.loadTree();
};

LayerManager._addIss = function() {
  const layer = new ISSLayer();
  layer.set_name(Language.getLocalizedText(1314, 'ISS Model  (Toshiyuki Takahei)'));
  layer.enabled = Settings.get_active().get_showISSModel();
  LayerManager.get_layerList()[layer.id] = layer;
  layer.set_referenceFrame('ISS');
  LayerManager.get_allMaps()['ISS'].layers.push(layer);
  LayerManager.get_allMaps()['ISS'].open = true;
};
LayerManager._addAllMaps = function(maps, parent) {
  const $enum1 = ss.enumerate(ss.keys(maps));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const map = maps[key];
    map.frame.parent = parent;
    LayerManager.get_allMaps()[map.get_name()] = map;
    LayerManager._addAllMaps(map.childMaps, map.get_name());
  }
};
LayerManager._clearLayers = function() {
  const $enum1 = ss.enumerate(ss.keys(LayerManager.get_layerList()));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const layer = LayerManager.get_layerList()[key];
    layer.cleanUp();
  }
  ss.clearKeys(LayerManager.get_layerList());
  ss.clearKeys(LayerManager.get_layerMaps());
};
LayerManager.getMoonFile = function(url) {
  LayerManager._webFileMoons = new WebFile(url);
  LayerManager._webFileMoons.onStateChange = LayerManager.moonFileStateChange;
  LayerManager._webFileMoons.send();
};
LayerManager.moonFileStateChange = function() {
  if (LayerManager._webFileMoons.get_state() === 2) {
    alert(LayerManager._webFileMoons.get_message());
  }
  else if (LayerManager._webFileMoons.get_state() === 1) {
    LayerManager._moonfile = LayerManager._webFileMoons.getText();
    LayerManager.initLayers();
  }
};
LayerManager._addMoons = function(file) {
  const data = file.split('\r\n');
  let first = true;
  const $enum1 = ss.enumerate(data);
  while ($enum1.moveNext()) {
    const line = $enum1.current;
    if (first) {
      first = false;
      continue;
    }
    const parts = line.split('\t');
    if (parts.length > 16) {
      const planet = parts[0];
      const frame = new LayerMap(parts[2], 18);
      frame.frame._systemGenerated = true;
      frame.frame.epoch = parseFloat(parts[1]);
      frame.frame.semiMajorAxis = parseFloat(parts[3]) * 1000;
      frame.frame.referenceFrameType = 1;
      frame.frame.inclination = parseFloat(parts[7]);
      frame.frame.longitudeOfAscendingNode = parseFloat(parts[8]);
      frame.frame.eccentricity = parseFloat(parts[4]);
      frame.frame.meanAnomolyAtEpoch = parseFloat(parts[6]);
      frame.frame.meanDailyMotion = parseFloat(parts[9]);
      frame.frame.argumentOfPeriapsis = parseFloat(parts[5]);
      frame.frame.scale = 1;
      frame.frame.semiMajorAxisUnits = 1;
      frame.frame.meanRadius = parseFloat(parts[16]) * 1000;
      frame.frame.rotationalPeriod = parseFloat(parts[17]);
      frame.frame.showAsPoint = false;
      frame.frame.showOrbitPath = true;
      frame.frame.set_representativeColor(Color.fromArgb(255, 175, 216, 230));
      frame.frame.oblateness = 0;
      LayerManager.get_layerMaps()['Sun'].childMaps[planet].addChild(frame);
    }
  }
};
LayerManager.addVoTableLayer = function(table, title) {
  const layer = VoTableLayer.create(table);
  layer.set_name(title);
  layer.set_astronomical(true);
  layer.set_referenceFrame('Sky');
  LayerManager.get_layerList()[layer.id] = layer;
  LayerManager.get_allMaps()['Sky'].layers.push(layer);
  LayerManager.get_allMaps()['Sky'].open = true;
  layer.enabled = true;
  LayerManager._version++;
  LayerManager.loadTree();
  return layer;
};
LayerManager.addImageSetLayer = function(imageset, title) {
  const layer = ImageSetLayer.create(imageset);
  layer.doneLoading(null);
  layer.set_name(title);
  layer.set_astronomical(true);
  layer.set_referenceFrame('Sky');
  LayerManager.get_layerList()[layer.id] = layer;
  LayerManager.get_allMaps()['Sky'].layers.push(layer);
  LayerManager.get_allMaps()['Sky'].open = true;
  layer.enabled = true;
  LayerManager._version++;
  LayerManager.loadTree();
  return layer;
};
LayerManager.addFitsImageSetLayer = function(layer, title) {
  layer.doneLoading(null);
  layer.set_name(title);
  layer.set_astronomical(true);
  layer.set_referenceFrame('Sky');
  LayerManager.get_layerList()[layer.id] = layer;
  LayerManager.get_allMaps()['Sky'].layers.push(layer);
  LayerManager.get_allMaps()['Sky'].open = true;
  layer.enabled = true;
  LayerManager._version++;
  LayerManager.loadTree();
  return layer;
};
LayerManager.getNextFitsName = function() {
  let currentNumber = 0;
  const $enum1 = ss.enumerate(LayerManager.get_allMaps()['Sky'].layers);
  while ($enum1.moveNext()) {
    const layer = $enum1.current;
    if (ss.startsWith(layer.get_name(), 'Fits Image ')) {
      const number = ss.replaceString(layer.get_name(), 'Fits Image ', '');
      try {
        const num = parseInt(number);
        if (num > currentNumber) {
          currentNumber = num;
        }
      }
      catch ($e2) {
      }
    }
  }
  return ss.format('Fits Image {0}', currentNumber + 1);
};
LayerManager._closeAllTourLoadedLayers = function() {
  const purgeTargets = [];
  const $enum1 = ss.enumerate(ss.keys(LayerManager.get_layerList()));
  while ($enum1.moveNext()) {
    let key = $enum1.current;
    const layer = LayerManager.get_layerList()[key];
    if (layer.loadedFromTour) {
      purgeTargets.push(layer.id);
    }
  }
  const $enum2 = ss.enumerate(purgeTargets);
  while ($enum2.moveNext()) {
    const guid = $enum2.current;
    LayerManager.deleteLayerByID(guid, true, false);
  }
  const purgeMapsNames = [];
  const $enum3 = ss.enumerate(ss.keys(LayerManager.get_allMaps()));
  while ($enum3.moveNext()) {
    let key = $enum3.current;
    const map = LayerManager.get_allMaps()[key];
    if (map.loadedFromTour && !map.layers.length) {
      purgeMapsNames.push(map.get_name());
    }
  }
  const $enum4 = ss.enumerate(purgeMapsNames);
  while ($enum4.moveNext()) {
    const name = $enum4.current;
    LayerManager.purgeLayerMapDeep(LayerManager.get_allMaps()[name], true);
  }
  LayerManager.set_version(LayerManager.get_version() + 1) - 1;
  LayerManager.loadTree();
};
LayerManager.purgeLayerMapDeep = function(target, topLevel) {
  const $enum1 = ss.enumerate(target.layers);
  while ($enum1.moveNext()) {
    const layer = $enum1.current;
    LayerManager.deleteLayerByID(layer.id, false, false);
  }
  target.layers.length = 0;
  const $enum2 = ss.enumerate(ss.keys(target.childMaps));
  while ($enum2.moveNext()) {
    const key = $enum2.current;
    const map = target.childMaps[key];
    LayerManager.purgeLayerMapDeep(map, false);
  }
  ss.clearKeys(target.childMaps);
  if (topLevel) {
    if (!ss.emptyString(target.frame.parent)) {
      if (ss.keyExists(LayerManager.get_allMaps(), target.frame.parent)) {
        delete LayerManager.get_allMaps()[target.frame.parent].childMaps[target.get_name()];
      }
    }
    else {
      if (ss.keyExists(LayerManager.get_layerMaps(), target.get_name())) {
        delete LayerManager.get_layerMaps()[target.get_name()];
      }
    }
  }
  delete LayerManager.get_allMaps()[target.get_name()];
  LayerManager._version++;
};
LayerManager._cleanAllTourLoadedLayers = function() {
  const $enum1 = ss.enumerate(ss.keys(LayerManager.get_layerList()));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const layer = LayerManager.get_layerList()[key];
    if (layer.loadedFromTour) {
      layer.loadedFromTour = false;
    }
  }
};
LayerManager.mergeToursLayers = function() {
  LayerManager._tourLayers = false;
  let OverWrite = false;
  let CollisionChecked = false;
  const $enum1 = ss.enumerate(ss.keys(LayerManager._allMapsTours));
  while ($enum1.moveNext()) {
    let key = $enum1.current;
    const map = LayerManager._allMapsTours[key];
    if (!ss.keyExists(LayerManager._allMaps, map.get_name())) {
      const newMap = new LayerMap(map.get_name(), 18);
      newMap.frame = map.frame;
      newMap.loadedFromTour = true;
      LayerManager.get_allMaps()[newMap.get_name()] = newMap;
    }
  }
  LayerManager.connectAllChildren();
  const $enum2 = ss.enumerate(ss.keys(LayerManager._layerListTours));
  while ($enum2.moveNext()) {
    let key = $enum2.current;
    const layer = LayerManager._layerListTours[key];
    if (ss.keyExists(LayerManager.get_layerList(), layer.id)) {
      if (!CollisionChecked) {
        if (true) {
          OverWrite = true;
        }
        else {
          OverWrite = false;
        }
        CollisionChecked = true;
      }
      if (OverWrite) {
        LayerManager.deleteLayerByID(layer.id, true, false);
      }
    }
    if (!ss.keyExists(LayerManager.get_layerList(), layer.id)) {
      if (ss.keyExists(LayerManager.get_allMaps(), layer.get_referenceFrame())) {
        LayerManager.get_layerList()[layer.id] = layer;
        LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.push(layer);
      }
    }
    else {
      layer.cleanUp();
    }
  }
  ss.clearKeys(LayerManager._layerListTours);
  ss.clearKeys(LayerManager._allMapsTours);
  ss.clearKeys(LayerManager._layerMapsTours);
  LayerManager.loadTree();
};
LayerManager.connectAllChildren = function() {
  const $enum1 = ss.enumerate(ss.keys(LayerManager.get_allMaps()));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const map = LayerManager.get_allMaps()[key];
    if (ss.emptyString(map.frame.parent) && !ss.keyExists(LayerManager.get_layerMaps(), map.frame.name)) {
      LayerManager.get_layerMaps()[map.get_name()] = map;
    }
    else if (!ss.emptyString(map.frame.parent) && ss.keyExists(LayerManager.get_allMaps(), map.frame.parent)) {
      if (!ss.keyExists(LayerManager.get_allMaps()[map.frame.parent].childMaps, map.frame.name)) {
        LayerManager.get_allMaps()[map.frame.parent].childMaps[map.frame.name] = map;
        map.parent = LayerManager.get_allMaps()[map.frame.parent];
      }
    }
  }
};
LayerManager.deleteLayerByID = function(ID, removeFromParent, updateTree) {
  if (ss.keyExists(LayerManager.get_layerList(), ID)) {
    const layer = LayerManager.get_layerList()[ID];
    layer.cleanUp();
    if (removeFromParent) {
      ss.remove(LayerManager.get_allMaps()[layer.get_referenceFrame()].layers, layer);
    }
    delete LayerManager.get_layerList()[ID];
    LayerManager._version++;
    if (updateTree) {
      LayerManager.loadTree();
    }
    return true;
  }
  else {
    return false;
  }
};
LayerManager._getFrameTarget = function(renderContext, TrackingFrame) {
  const target = new FrameTarget();
  let targetPoint = Vector3d.get_empty();
  target.target = Vector3d.get_empty();
  target.matrix = Matrix3d.get_identity();
  if (!ss.keyExists(LayerManager.get_allMaps(), TrackingFrame)) {
    return target;
  }
  const mapList = [];
  let current = LayerManager.get_allMaps()[TrackingFrame];
  mapList.push(current);
  while (current.frame.reference === 18) {
    current = current.parent;
    mapList.splice(0, 0, current);
  }
  const matOld = renderContext.get_world().clone();
  const matOldNonRotating = renderContext.get_worldBaseNonRotating();
  const matOldBase = renderContext.get_worldBase();
  const oldNominalRadius = renderContext.get_nominalRadius();
  const $enum1 = ss.enumerate(mapList);
  while ($enum1.moveNext()) {
    const map = $enum1.current;
    if (map.frame.reference !== 18 && map.frame.reference !== 20) {
      Planets.setupPlanetMatrix(renderContext, Enums.parse('SolarSystemObjects', map.frame.name), Vector3d.get_empty(), false);
    }
    else {
      map.computeFrame(renderContext);
      if (map.frame.useRotatingParentFrame()) {
        renderContext.set_world(Matrix3d.multiplyMatrix(map.frame.worldMatrix, renderContext.get_world()));
      }
      else {
        renderContext.set_world(Matrix3d.multiplyMatrix(map.frame.worldMatrix, renderContext.get_worldBaseNonRotating()));
      }
      if (map.frame.referenceFrameType === 3) {
        renderContext.set_worldBaseNonRotating(renderContext.get_world().clone());
      }
      renderContext.set_nominalRadius(map.frame.meanRadius);
    }
  }
  targetPoint = renderContext.get_world().transform(targetPoint);
  const lookAt = renderContext.get_world().transform(new Vector3d(0, 0, 1));
  const lookUp = Vector3d.subtractVectors(renderContext.get_world().transform(new Vector3d(0, 1, 0)), targetPoint);
  lookUp.normalize();
  target.matrix = Matrix3d.lookAtLH(new Vector3d(), Vector3d.subtractVectors(lookAt, targetPoint), lookUp);
  renderContext.set_nominalRadius(oldNominalRadius);
  renderContext.set_world(matOld);
  renderContext.set_worldBaseNonRotating(matOldNonRotating);
  renderContext.set_worldBase(matOldBase);
  target.target = targetPoint;
  return target;
};
LayerManager._prepTourLayers = function() {
  if (TourPlayer.get_playing()) {
    const player = WWTControl.singleton.uiController;
    if (player != null) {
      const tour = player.get_tour();
      if (tour.get_currentTourStop() != null) {
        player.updateTweenPosition(-1);
        if (!tour.get_currentTourStop().get_keyFramed()) {
          tour.get_currentTourStop()._updateLayerOpacity();
          const $enum1 = ss.enumerate(ss.keys(tour.get_currentTourStop().layers));
          while ($enum1.moveNext()) {
            const key = $enum1.current;
            const info = tour.get_currentTourStop().layers[key];
            if (ss.keyExists(LayerManager.get_layerList(), info.id)) {
              LayerManager.get_layerList()[info.id].set_opacity(info.frameOpacity);
              LayerManager.get_layerList()[info.id].setParams(info.frameParams);
            }
          }
        }
      }
    }
  }
};
LayerManager._draw = function(renderContext, opacity, astronomical, referenceFrame, nested, cosmos) {
  if (!ss.keyExists(LayerManager.get_allMaps(), referenceFrame)) {
    return;
  }
  const thisMap = LayerManager.get_allMaps()[referenceFrame];
  if (!thisMap.enabled || (!ss.keyCount(thisMap.childMaps) && !thisMap.layers.length && !(thisMap.frame.showAsPoint || thisMap.frame.showOrbitPath))) {
    return;
  }
  if (TourPlayer.get_playing()) {
    const player = WWTControl.singleton.uiController;
    if (player != null) {
      const tour = player.get_tour();
      if (tour.get_currentTourStop() != null) {
        player.updateTweenPosition(-1);
        tour.get_currentTourStop()._updateLayerOpacity();
        const $enum1 = ss.enumerate(ss.keys(tour.get_currentTourStop().layers));
        while ($enum1.moveNext()) {
          let key = $enum1.current;
          const info = tour.get_currentTourStop().layers[key];
          if (ss.keyExists(LayerManager.get_layerList(), info.id)) {
            LayerManager.get_layerList()[info.id].set_opacity(info.frameOpacity);
            LayerManager.get_layerList()[info.id].setParams(info.frameParams);
          }
        }
      }
    }
  }
  const matOld = renderContext.get_world();
  const matOldNonRotating = renderContext.get_worldBaseNonRotating();
  const oldNominalRadius = renderContext.get_nominalRadius();
  if ((thisMap.frame.reference === 18 | thisMap.frame.reference === 18) === 1) {
    thisMap.computeFrame(renderContext);
    if (thisMap.frame.referenceFrameType !== 1 && thisMap.frame.referenceFrameType !== 2) {
      renderContext.set_world(Matrix3d.multiplyMatrix(thisMap.frame.worldMatrix, renderContext.get_world()));
    }
    else {
      renderContext.set_world(Matrix3d.multiplyMatrix(thisMap.frame.worldMatrix, renderContext.get_worldBaseNonRotating()));
    }
    renderContext.set_nominalRadius(thisMap.frame.meanRadius);
  }
  if (thisMap.frame.showAsPoint) {
  }
  for (let pass = 0; pass < 2; pass++) {
    const $enum2 = ss.enumerate(LayerManager.get_allMaps()[referenceFrame].layers);
    while ($enum2.moveNext()) {
      const layer = $enum2.current;
      if ((!pass && ss.canCast(layer, ImageSetLayer)) || (pass === 1 && !(ss.canCast(layer, ImageSetLayer)))) {
        let skipLayer = false;
        if (!pass) {
          skipLayer = !astronomical && (layer).get_overrideDefaultLayer();
        }
        if (layer.enabled && !skipLayer) {
          const layerStart = SpaceTimeController.utcToJulian(layer.get_startTime());
          const layerEnd = SpaceTimeController.utcToJulian(layer.get_endTime());
          const fadeIn = SpaceTimeController.utcToJulian(layer.get_startTime()) - ((layer.get_fadeType() === 1 || layer.get_fadeType() === 3) ? (layer.get_fadeSpan() / 864000000) : 0);
          const fadeOut = SpaceTimeController.utcToJulian(layer.get_endTime()) + ((layer.get_fadeType() === 2 || layer.get_fadeType() === 3) ? (layer.get_fadeSpan() / 864000000) : 0);
          if (SpaceTimeController.get_jNow() > fadeIn && SpaceTimeController.get_jNow() < fadeOut) {
            let fadeOpacity = 1;
            if (SpaceTimeController.get_jNow() < layerStart) {
              fadeOpacity = ((SpaceTimeController.get_jNow() - fadeIn) / (layer.get_fadeSpan() / 864000000));
            }
            if (SpaceTimeController.get_jNow() > layerEnd) {
              fadeOpacity = ((fadeOut - SpaceTimeController.get_jNow()) / (layer.get_fadeSpan() / 864000000));
            }
            layer.set_astronomical(astronomical);
            if (ss.canCast(layer, SpreadSheetLayer)) {
              const tsl = ss.safeCast(layer, SpreadSheetLayer);
              tsl.draw(renderContext, opacity * fadeOpacity, cosmos);
            }
            else {
              layer.draw(renderContext, opacity * fadeOpacity, cosmos);
            }
          }
        }
      }
    }
  }
  if (nested) {
    const $enum3 = ss.enumerate(ss.keys(LayerManager.get_allMaps()[referenceFrame].childMaps));
    while ($enum3.moveNext()) {
      let key = $enum3.current;
      const map = LayerManager.get_allMaps()[referenceFrame].childMaps[key];
      if (!(ss.canCast(map, LayerMap))) {
        continue;
      }
      if (map.enabled && map.frame.showOrbitPath && Settings.get_active().get_solarSystemOrbits() && Settings.get_active().get_solarSystemMinorOrbits()) {
        if (map.frame.referenceFrameType === 1) {
          if (map.frame.get_orbit() == null) {
            map.frame.set_orbit(new Orbit(map.frame.get_elements(), 360, map.frame.get_representativeColor(), 1, map.parent.frame.meanRadius));
          }
          const matSaved = renderContext.get_world();
          renderContext.set_world(Matrix3d.multiplyMatrix(thisMap.frame.worldMatrix, renderContext.get_worldBaseNonRotating()));
          map.frame.get_orbit().draw3D(renderContext, 1 * 0.5, new Vector3d(0, 0, 0));
          renderContext.set_world(matSaved);
        }
        else if (map.frame.referenceFrameType === 2) {
        }
      }
      if ((map.frame.reference === 18 || map.frame.reference === 19)) {
        LayerManager._draw(renderContext, opacity, astronomical, map.get_name(), nested, cosmos);
      }
    }
  }
  renderContext.set_nominalRadius(oldNominalRadius);
  renderContext.set_world(matOld);
  renderContext.set_worldBaseNonRotating(matOldNonRotating);
};
LayerManager._getVisibleLayerList = function(previous) {
  const list = {};
  const $enum1 = ss.enumerate(ss.keys(LayerManager.get_layerList()));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const layer = LayerManager.get_layerList()[key];
    if (layer.enabled) {
      const info = new LayerInfo();
      info.startOpacity = info.endOpacity = layer.get_opacity();
      info.id = layer.id;
      info.startParams = layer.getParams();
      if (ss.keyExists(previous, info.id)) {
        info.endOpacity = previous[info.id].endOpacity;
        info.endParams = previous[info.id].endParams;
      }
      else {
        info.endParams = layer.getParams();
      }
      list[layer.id] = info;
    }
  }
  return list;
};
LayerManager.setVisibleLayerList = function(list) {
  const $enum1 = ss.enumerate(ss.keys(LayerManager.get_layerList()));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const layer = LayerManager.get_layerList()[key];
    layer.enabled = ss.keyExists(list, layer.id);
    try {
      if (layer.enabled) {
        layer.set_opacity(list[layer.id].frameOpacity);
        layer.setParams(list[layer.id].frameParams);
      }
    }
    catch ($e2) {
    }
  }
};
LayerManager._preDraw = function(renderContext, opacity, astronomical, referenceFrame, nested) {
  if (!ss.keyExists(LayerManager.get_allMaps(), referenceFrame)) {
    return;
  }
  const thisMap = LayerManager.get_allMaps()[referenceFrame];
  if (!ss.keyCount(thisMap.childMaps) && !thisMap.layers.length) {
    return;
  }
  if (TourPlayer.get_playing()) {
    const player = ss.safeCast(WWTControl.singleton.uiController, TourPlayer);
    if (player != null) {
      const tour = player.get_tour();
      if (tour.get_currentTourStop() != null) {
        player.updateTweenPosition(-1);
        tour.get_currentTourStop()._updateLayerOpacity();
        const $enum1 = ss.enumerate(ss.keys(tour.get_currentTourStop().layers));
        while ($enum1.moveNext()) {
          let key = $enum1.current;
          const info = tour.get_currentTourStop().layers[key];
          if (ss.keyExists(LayerManager.get_layerList(), info.id)) {
            LayerManager.get_layerList()[info.id].set_opacity(info.frameOpacity);
            LayerManager.get_layerList()[info.id].setParams(info.frameParams);
          }
        }
      }
    }
  }
  const matOld = renderContext.get_world();
  const matOldNonRotating = renderContext.get_worldBaseNonRotating();
  const oldNominalRadius = renderContext.get_nominalRadius();
  if (thisMap.frame.reference === 18) {
    thisMap.computeFrame(renderContext);
    if (thisMap.frame.referenceFrameType !== 1) {
      renderContext.set_world(Matrix3d.multiplyMatrix(thisMap.frame.worldMatrix, renderContext.get_world()));
    }
    else {
      renderContext.set_world(Matrix3d.multiplyMatrix(thisMap.frame.worldMatrix, renderContext.get_worldBaseNonRotating()));
    }
    renderContext.set_nominalRadius(thisMap.frame.meanRadius);
  }
  for (let pass = 0; pass < 2; pass++) {
    const $enum2 = ss.enumerate(LayerManager.get_allMaps()[referenceFrame].layers);
    while ($enum2.moveNext()) {
      const layer = $enum2.current;
      if ((!pass && ss.canCast(layer, ImageSetLayer)) || (pass === 1 && !(ss.canCast(layer, ImageSetLayer)))) {
        if (layer.enabled) {
          const layerStart = SpaceTimeController.utcToJulian(layer.get_startTime());
          const layerEnd = SpaceTimeController.utcToJulian(layer.get_endTime());
          const fadeIn = SpaceTimeController.utcToJulian(layer.get_startTime()) - ((layer.get_fadeType() === 1 || layer.get_fadeType() === 3) ? (layer.get_fadeSpan() / 864000000) : 0);
          const fadeOut = SpaceTimeController.utcToJulian(layer.get_endTime()) + ((layer.get_fadeType() === 2 || layer.get_fadeType() === 3) ? (layer.get_fadeSpan() / 864000000) : 0);
          if (SpaceTimeController.get_jNow() > fadeIn && SpaceTimeController.get_jNow() < fadeOut) {
            let fadeOpacity = 1;
            if (SpaceTimeController.get_jNow() < layerStart) {
              fadeOpacity = ((SpaceTimeController.get_jNow() - fadeIn) / (layer.get_fadeSpan() / 864000000));
            }
            if (SpaceTimeController.get_jNow() > layerEnd) {
              fadeOpacity = ((fadeOut - SpaceTimeController.get_jNow()) / (layer.get_fadeSpan() / 864000000));
            }
            if (!thisMap.frame.reference) {
              layer.set_astronomical(true);
            }
            layer.preDraw(renderContext, opacity * fadeOpacity);
          }
        }
      }
    }
  }
  if (nested) {
    const $enum3 = ss.enumerate(ss.keys(LayerManager.get_allMaps()[referenceFrame].childMaps));
    while ($enum3.moveNext()) {
      let key = $enum3.current;
      const map = LayerManager.get_allMaps()[referenceFrame].childMaps[key];
      if ((map.frame.reference === 18 || map.frame.reference === 19)) {
        LayerManager._preDraw(renderContext, opacity, astronomical, map.get_name(), nested);
      }
    }
  }
  renderContext.set_nominalRadius(oldNominalRadius);
  renderContext.set_world(matOld);
  renderContext.set_worldBaseNonRotating(matOldNonRotating);
};
LayerManager.add = function(layer, updateTree) {
  if (!ss.keyExists(LayerManager.get_layerList(), layer.id)) {
    if (ss.keyExists(LayerManager.get_allMaps(), layer.get_referenceFrame())) {
      LayerManager.get_layerList()[layer.id] = layer;
      LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.push(layer);
      LayerManager._version++;
      if (updateTree) {
        LayerManager.loadTree();
      }
    }
  }
};
LayerManager.layerSelectionChanged = function(selected) {
  LayerManager._selectedLayer = selected;
  if (LayerManager._selectedLayer != null) {
    if (ss.canCast(LayerManager._selectedLayer, LayerMap)) {
      const map = ss.safeCast(LayerManager._selectedLayer, LayerMap);
      if (map != null) {
        LayerManager.set_currentMap(map.get_name());
      }
    }
    else {
      const layer = ss.safeCast(LayerManager._selectedLayer, ImageSetLayer);
      if (layer != null && ss.canCast(layer.get_imageSet().get_wcsImage(), FitsImage)) {
        WWTControl.scriptInterface.setTimeSlider('left', '0');
        WWTControl.scriptInterface.setTimeSlider('right', (layer.getFitsImage().depth - 1).toString());
        WWTControl.scriptInterface.setTimeSlider('title', 'Velocity');
        return;
      }
    }
  }
  WWTControl.scriptInterface.setTimeSlider('left', '');
  WWTControl.scriptInterface.setTimeSlider('right', '');
  WWTControl.scriptInterface.setTimeSlider('title', Language.getLocalizedText(667, 'Time Scrubber'));
};
LayerManager.setTimeSliderValue = function(pos) {
  const layer = ss.safeCast(LayerManager._selectedLayer, ImageSetLayer);
  if (layer != null && ss.canCast(layer.get_imageSet().get_wcsImage(), FitsImage)) {
    Histogram.updateImage(layer, pos);
    WWTControl.scriptInterface.setTimeSlider('title', layer.getFitsImage().getZDescription());
  }
};
LayerManager.showLayerMenu = function(selected, x, y) {
  let saveMenu;
  let spacer1;
  let spacer2;
  LayerManager._lastMenuClick = new Vector2d(x, y);
  LayerManager._selectedLayer = selected;
  if (ss.canCast(selected, LayerMap)) {
    LayerManager.set_currentMap((selected).get_name());
  }
  else if (ss.canCast(selected, Layer)) {
    LayerManager.set_currentMap((selected).get_referenceFrame());
  }
  if (((ss.canCast(selected, Layer)) && !(ss.canCast(selected, SkyOverlays)))) {
    const selectedLayer = selected;
    LayerManager._contextMenu = new ContextMenuStrip();
    const renameMenu = ToolStripMenuItem.create(Language.getLocalizedText(225, 'Rename'));
    const Expand = ToolStripMenuItem.create(Language.getLocalizedText(981, 'Expand'));
    const Collapse = ToolStripMenuItem.create(Language.getLocalizedText(982, 'Collapse'));
    const copyMenu = ToolStripMenuItem.create(Language.getLocalizedText(428, 'Copy'));
    const deleteMenu = ToolStripMenuItem.create(Language.getLocalizedText(167, 'Delete'));
    saveMenu = ToolStripMenuItem.create(Language.getLocalizedText(960, 'Save...'));
    const publishMenu = ToolStripMenuItem.create(Language.getLocalizedText(983, 'Publish to Community...'));
    const colorMenu = ToolStripMenuItem.create(Language.getLocalizedText(458, 'Color/Opacity'));
    const opacityMenu = ToolStripMenuItem.create(Language.getLocalizedText(305, 'Opacity'));
    const propertiesMenu = ToolStripMenuItem.create(Language.getLocalizedText(20, 'Properties'));
    const scaleMenu = ToolStripMenuItem.create(Language.getLocalizedText(1291, 'Scale/Histogram'));
    const lifeTimeMenu = ToolStripMenuItem.create(Language.getLocalizedText(683, 'Lifetime'));
    spacer1 = new ToolStripSeparator();
    const top = ToolStripMenuItem.create(Language.getLocalizedText(684, 'Move to Top'));
    const up = ToolStripMenuItem.create(Language.getLocalizedText(685, 'Move Up'));
    const down = ToolStripMenuItem.create(Language.getLocalizedText(686, 'Move Down'));
    const bottom = ToolStripMenuItem.create(Language.getLocalizedText(687, 'Move to Bottom'));
    const showViewer = ToolStripMenuItem.create(Language.getLocalizedText(957, 'VO Table Viewer'));
    spacer2 = new ToolStripSeparator();
    const defaultImageset = ToolStripMenuItem.create(Language.getLocalizedText(1294, 'Background Image Set'));
    top.click = LayerManager._top_Click;
    up.click = LayerManager._up_Click;
    down.click = LayerManager._down_Click;
    bottom.click = LayerManager._bottom_Click;
    saveMenu.click = LayerManager._saveMenu_Click;
    publishMenu.click = LayerManager._publishMenu_Click;
    Expand.click = LayerManager._expand_Click;
    Collapse.click = LayerManager._collapse_Click;
    copyMenu.click = LayerManager._copyMenu_Click;
    colorMenu.click = LayerManager._colorMenu_Click;
    deleteMenu.click = LayerManager._deleteMenu_Click;
    renameMenu.click = LayerManager._renameMenu_Click;
    propertiesMenu.click = LayerManager._propertiesMenu_Click;
    scaleMenu.click = LayerManager.scaleMenu_click;
    defaultImageset.click = LayerManager._defaultImageset_Click;
    opacityMenu.click = LayerManager._opacityMenu_Click;
    lifeTimeMenu.click = LayerManager._lifeTimeMenu_Click;
    showViewer.click = LayerManager._showViewer_Click;
    LayerManager._contextMenu.items.push(renameMenu);
    if (!selectedLayer.get_opened() && selectedLayer.getPrimaryUI() != null && selectedLayer.getPrimaryUI().get_hasTreeViewNodes()) {
      LayerManager._contextMenu.items.push(Expand);
    }
    if (selectedLayer.get_opened()) {
      LayerManager._contextMenu.items.push(Collapse);
    }
    if (selectedLayer.canCopyToClipboard()) {
    }
    LayerManager._contextMenu.items.push(deleteMenu);
    LayerManager._contextMenu.items.push(spacer2);
    LayerManager._contextMenu.items.push(colorMenu);
    if (ss.canCast(selected, ImageSetLayer)) {
      LayerManager._contextMenu.items.push(defaultImageset);
      let isl = ss.safeCast(selected, ImageSetLayer);
      defaultImageset.checked = isl.get_overrideDefaultLayer();
    }
    if (ss.canCast(selected, SpreadSheetLayer) || ss.canCast(selected, GreatCirlceRouteLayer)) {
      LayerManager._contextMenu.items.push(propertiesMenu);
    }
    if (ss.canCast(selected, VoTableLayer)) {
      LayerManager._contextMenu.items.push(showViewer);
    }
    if (ss.canCast(selected, ImageSetLayer)) {
      let isl = ss.safeCast(selected, ImageSetLayer);
      LayerManager._contextMenu.items.push(scaleMenu);
    }
    if (LayerManager.get_allMaps()[selectedLayer.get_referenceFrame()].layers.length > 1) {
      LayerManager._contextMenu.items.push(spacer1);
      LayerManager._contextMenu.items.push(top);
      LayerManager._contextMenu.items.push(up);
      LayerManager._contextMenu.items.push(down);
      LayerManager._contextMenu.items.push(bottom);
    }
    LayerManager._contextMenu._show(new Vector2d(x, y));
  }
  else if (ss.canCast(selected, LayerMap)) {
    const map = ss.safeCast(selected, LayerMap);
    const sandbox = map.frame.reference.toString() === 'Sandbox';
    const Dome = map.frame.name === 'Dome';
    const Sky = map.frame.name === 'Sky';
    if (Dome) {
      return;
    }
    LayerManager._contextMenu = new ContextMenuStrip();
    const trackFrame = ToolStripMenuItem.create(Language.getLocalizedText(1298, 'Track this frame'));
    const goTo = ToolStripMenuItem.create(Language.getLocalizedText(1299, 'Fly Here'));
    const showOrbit = ToolStripMenuItem.create('Show Orbit');
    const newMenu = ToolStripMenuItem.create(Language.getLocalizedText(674, 'New Reference Frame'));
    const newLayerGroupMenu = ToolStripMenuItem.create(Language.getLocalizedText(675, 'New Layer Group'));
    const addMenu = ToolStripMenuItem.create(Language.getLocalizedText(166, 'Add'));
    const newLight = ToolStripMenuItem.create('Add Light');
    const addFeedMenu = ToolStripMenuItem.create(Language.getLocalizedText(956, 'Add OData/table feed as Layer'));
    const addWmsLayer = ToolStripMenuItem.create(Language.getLocalizedText(987, 'New WMS Layer'));
    const addGirdLayer = ToolStripMenuItem.create(Language.getLocalizedText(1300, 'New Lat/Lng Grid'));
    const addGreatCircle = ToolStripMenuItem.create(Language.getLocalizedText(988, 'New Great Circle'));
    const importTLE = ToolStripMenuItem.create(Language.getLocalizedText(989, 'Import Orbital Elements'));
    const addMpc = ToolStripMenuItem.create(Language.getLocalizedText(1301, 'Add Minor Planet'));
    const deleteFrameMenu = ToolStripMenuItem.create(Language.getLocalizedText(167, 'Delete'));
    const pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(425, 'Paste'));
    const addToTimeline = ToolStripMenuItem.create(Language.getLocalizedText(1290, 'Add to Timeline'));
    const addKeyframe = ToolStripMenuItem.create(Language.getLocalizedText(1280, 'Add Keyframe'));
    const popertiesMenu = ToolStripMenuItem.create(Language.getLocalizedText(20, 'Properties'));
    saveMenu = ToolStripMenuItem.create(Language.getLocalizedText(990, 'Save Layers'));
    const publishLayers = ToolStripMenuItem.create(Language.getLocalizedText(991, 'Publish Layers to Community'));
    spacer1 = new ToolStripSeparator();
    const spacer0 = new ToolStripSeparator();
    spacer2 = new ToolStripSeparator();
    const asReferenceFrame = ToolStripMenuItem.create('As Reference Frame');
    const asOrbitalLines = ToolStripMenuItem.create('As Orbital Line');
    trackFrame.click = LayerManager._trackFrame_Click;
    goTo.click = LayerManager._goTo_Click;
    asReferenceFrame.click = LayerManager._addMpc_Click;
    asOrbitalLines.click = LayerManager._asOrbitalLines_Click;
    addMpc.dropDownItems.push(asReferenceFrame);
    addMpc.dropDownItems.push(asOrbitalLines);
    addMenu.click = LayerManager._addMenu_Click;
    newLayerGroupMenu.click = LayerManager._newLayerGroupMenu_Click;
    pasteMenu.click = LayerManager._pasteLayer_Click;
    newMenu.click = LayerManager._newMenu_Click;
    deleteFrameMenu.click = LayerManager._deleteFrameMenu_Click;
    popertiesMenu.click = LayerManager._framePropertiesMenu_Click;
    addGreatCircle.click = LayerManager._addGreatCircle_Click;
    addGirdLayer.click = LayerManager._addGirdLayer_Click;
    const convertToOrbit = ToolStripMenuItem.create('Extract Orbit Layer');
    if (map.frame.reference !== 19) {
      if ((WWTControl.singleton.get_solarSystemMode() | WWTControl.singleton.sandboxMode) === 1) {
        let spacerNeeded = false;
        if (map.frame.reference !== 18 && !WWTControl.singleton.sandboxMode) {
          if (!Sky) {
          }
          try {
            const name = map.frame.reference.toString();
            if (name !== 'Sandbox') {
              const ssObj = Enums.parse('SolarSystemObjects', name);
              const id = ssObj;
              const bit = Math.pow(2, id);
              showOrbit.checked = !!(Settings.get_active().get_planetOrbitsFilter() & bit);
              showOrbit.click = LayerManager._showOrbitPlanet_Click;
              showOrbit.tag = bit.toString();
            }
          }
          catch ($e1) {
          }
        }
        else {
          if (!sandbox && !Sky) {
            LayerManager._contextMenu.items.push(trackFrame);
            spacerNeeded = true;
          }
          showOrbit.checked = map.frame.showOrbitPath;
          showOrbit.click = LayerManager._showOrbit_Click;
        }
        if (spacerNeeded) {
          LayerManager._contextMenu.items.push(spacer2);
        }
        if (!Sky && !sandbox) {
          LayerManager._contextMenu.items.push(showOrbit);
          LayerManager._contextMenu.items.push(spacer0);
        }
        if (map.frame.reference.toString() === 'Sandbox') {
          LayerManager._contextMenu.items.push(newLight);
        }
      }
      if (!Sky) {
        LayerManager._contextMenu.items.push(newMenu);
      }
    }
    if (!Sky) {
      LayerManager._contextMenu.items.push(addGreatCircle);
      LayerManager._contextMenu.items.push(addGirdLayer);
    }
    if ((map.frame.reference !== 19 && map.frame.name === 'Sun') || (map.frame.reference === 19 && map.parent != null && map.parent.frame.name === 'Sun')) {
      LayerManager._contextMenu.items.push(addMpc);
    }
    if (map.frame.reference === 18 && map.frame.referenceFrameType === 1 && map.parent != null && map.parent.frame.name === 'Sun') {
    }
    if (!Sky) {
    }
    LayerManager._contextMenu.items.push(pasteMenu);
    if (map.frame.reference === 19) {
      LayerManager._contextMenu.items.push(deleteFrameMenu);
    }
    if (map.frame.reference === 18) {
      LayerManager._contextMenu.items.push(deleteFrameMenu);
      LayerManager._contextMenu.items.push(popertiesMenu);
    }
    LayerManager._contextMenu.items.push(spacer1);
    LayerManager._contextMenu._show(new Vector2d(x, y));
  }
};
LayerManager._publishMenu_Click = function(sender, e) {
};
LayerManager._addGirdLayer_Click = function(sender, e) {
  const layer = new GridLayer();
  layer.enabled = true;
  layer.set_name('Lat-Lng Grid');
  LayerManager.get_layerList()[layer.id] = layer;
  layer.set_referenceFrame(LayerManager._currentMap);
  LayerManager.get_allMaps()[LayerManager._currentMap].layers.push(layer);
  LayerManager.get_allMaps()[LayerManager._currentMap].open = true;
  LayerManager._version++;
  LayerManager.loadTree();
};
LayerManager._trackFrame_Click = function(sender, e) {
  const target = LayerManager._selectedLayer;
  WWTControl.singleton.renderContext.set_solarSystemTrack(20);
  WWTControl.singleton.renderContext.set_trackingFrame(target.get_name());
  WWTControl.singleton.renderContext.viewCamera.zoom = WWTControl.singleton.renderContext.targetCamera.zoom = 1E-09;
};
LayerManager._goTo_Click = function(sender, e) {
};
LayerManager._saveMenu_Click = function(sender, e) {
};
LayerManager._expand_Click = function(sender, e) {
};
LayerManager._collapse_Click = function(sender, e) {
};
LayerManager._copyMenu_Click = function(sender, e) {
  if (LayerManager._selectedLayer != null && ss.canCast(LayerManager._selectedLayer, Layer)) {
    const node = LayerManager._selectedLayer;
    node.copyToClipboard();
  }
};
LayerManager._newLayerGroupMenu_Click = function(sender, e) {
};
LayerManager._importTLEFile = function(filename) {
};
LayerManager._makeLayerGroupNow = function(name) {
  const target = LayerManager._selectedLayer;
  LayerManager._makeLayerGroup(name, target);
};
LayerManager._makeLayerGroup = function(name, target) {
  const frame = new ReferenceFrame();
  frame.name = name;
  frame.reference = 19;
  const newMap = new LayerMap(frame.name, 19);
  newMap.frame = frame;
  newMap.frame._systemGenerated = false;
  target.addChild(newMap);
  newMap.frame.parent = target.get_name();
  LayerManager.get_allMaps()[frame.name] = newMap;
  LayerManager._version++;
};
LayerManager._lifeTimeMenu_Click = function(sender, e) {
};
LayerManager._deleteFrameMenu_Click = function(sender, e) {
};
LayerManager._framePropertiesMenu_Click = function(sender, e) {
  const target = LayerManager._selectedLayer;
  LayerManager.get_referenceFramePropsDialog().show(target.frame, e);
};
LayerManager._newMenu_Click = function(sender, e) {
  const frame = new ReferenceFrame();
  LayerManager.get_frameWizardDialog().show(frame, e);
};
LayerManager.referenceFrameWizardFinished = function(frame) {
  const target = LayerManager._selectedLayer;
  const newMap = new LayerMap(frame.name, 18);
  if (!ss.keyExists(LayerManager.get_allMaps(), frame.name)) {
    newMap.frame = frame;
    target.addChild(newMap);
    newMap.frame.parent = target.get_name();
    LayerManager.get_allMaps()[frame.name] = newMap;
    LayerManager._version++;
    LayerManager.loadTree();
  }
};
LayerManager.pasteFromTle = function(lines, frame) {
  let line1 = '';
  let line2 = '';
  for (let i = 0; i < lines.length; i++) {
    lines[i] = ss.trim(lines[i]);
    if (lines[i].length === 69 && ReferenceFrame.isTLECheckSumGood(lines[i])) {
      if (!line1.length && lines[i].substring(0, 1) === '1') {
        line1 = lines[i];
      }
      if (!line2.length && lines[i].substring(0, 1) === '2') {
        line2 = lines[i];
      }
    }
  }
  if (line1.length === 69 && line2.length === 69) {
    frame.fromTLE(line1, line2, 398600441800000);
    return true;
  }
  return false;
};
LayerManager._opacityMenu_Click = function(sender, e) {
};
LayerManager._defaultImageset_Click = function(sender, e) {
  const isl = ss.safeCast(LayerManager._selectedLayer, ImageSetLayer);
  isl.set_overrideDefaultLayer(!isl.get_overrideDefaultLayer());
};
LayerManager._propertiesMenu_Click = function(sender, e) {
  if (ss.canCast(LayerManager._selectedLayer, SpreadSheetLayer)) {
    const target = LayerManager._selectedLayer;
    LayerManager.get_dataVizWizardDialog().show(target, e);
  }
  if (ss.canCast(LayerManager._selectedLayer, GreatCirlceRouteLayer)) {
    LayerManager.get_greatCircleDlg().show(LayerManager._selectedLayer, new ss.EventArgs());
  }
};
LayerManager._renameMenu_Click = function(sender, e) {
  const layer = LayerManager._selectedLayer;
  const input = new SimpleInput(Language.getLocalizedText(225, 'Rename'), Language.getLocalizedText(228, 'New Name'), layer.get_name(), 32);
  input.show(LayerManager._lastMenuClick, function() {
    if (!ss.emptyString(input.text)) {
      layer.set_name(input.text);
      LayerManager._version++;
      LayerManager.loadTree();
    }
  });
};
LayerManager._colorMenu_Click = function(sender, e) {
  const layer = LayerManager._selectedLayer;
  const picker = new ColorPicker();
  if (layer.get_color() != null) {
    picker.color = layer.get_color();
  }
  picker.callBack = function() {
    layer.set_color(picker.color);
  };
  picker.show(e);
};
LayerManager._addMenu_Click = function(sender, e) {
};
LayerManager._deleteMenu_Click = function(sender, e) {
  LayerManager._deleteSelectedLayer();
};
LayerManager._deleteSelectedLayer = function() {
  if (LayerManager._selectedLayer != null && ss.canCast(LayerManager._selectedLayer, Layer)) {
    const node = LayerManager._selectedLayer;
    delete LayerManager.get_layerList()[node.id];
    ss.remove(LayerManager.get_allMaps()[LayerManager.get_currentMap()].layers, node);
    LayerManager.loadTree();
    LayerManager._version++;
  }
};
LayerManager.scaleMenu_click = function(sender, e) {
  const isl = ss.safeCast(LayerManager._selectedLayer, ImageSetLayer);
  if (isl != null) {
    const hist = new Histogram();
    hist.image = isl.getFitsImage();
    hist.layer = isl;
    hist.show(new Vector2d(200, 200));
  }
};
LayerManager._showViewer_Click = function(sender, e) {
  if (ss.canCast(LayerManager._selectedLayer, VoTableLayer)) {
    const layer = ss.safeCast(LayerManager._selectedLayer, VoTableLayer);
    WWTControl.scriptInterface.displayVoTableLayer(layer);
  }
};
LayerManager._bottom_Click = function(sender, e) {
  const layer = ss.safeCast(LayerManager._selectedLayer, Layer);
  if (layer != null) {
    ss.remove(LayerManager.get_allMaps()[layer.get_referenceFrame()].layers, layer);
    LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.push(layer);
  }
  LayerManager._version++;
  LayerManager.loadTree();
};
LayerManager._down_Click = function(sender, e) {
  const layer = ss.safeCast(LayerManager._selectedLayer, Layer);
  if (layer != null) {
    const index = LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.lastIndexOf(layer);
    if (index < (LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.length - 1)) {
      ss.remove(LayerManager.get_allMaps()[layer.get_referenceFrame()].layers, layer);
      LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.splice(index + 1, 0, layer);
    }
  }
  LayerManager._version++;
  LayerManager.loadTree();
};
LayerManager._up_Click = function(sender, e) {
  const layer = ss.safeCast(LayerManager._selectedLayer, Layer);
  if (layer != null) {
    const index = LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.lastIndexOf(layer);
    if (index > 0) {
      ss.remove(LayerManager.get_allMaps()[layer.get_referenceFrame()].layers, layer);
      LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.splice(index - 1, 0, layer);
    }
  }
  LayerManager._version++;
  LayerManager.loadTree();
};
LayerManager._top_Click = function(sender, e) {
  const layer = ss.safeCast(LayerManager._selectedLayer, Layer);
  if (layer != null) {
    ss.remove(LayerManager.get_allMaps()[layer.get_referenceFrame()].layers, layer);
    LayerManager.get_allMaps()[layer.get_referenceFrame()].layers.splice(0, 0, layer);
  }
  LayerManager._version++;
  LayerManager.loadTree();
};
LayerManager._pasteLayer_Click = function(sender, e) {
  LayerManager.get_dataVizWizardDialog().show(LayerManager.get_currentMap(), e);
};
LayerManager.createSpreadsheetLayer = function(frame, name, data) {
  const layer = new SpreadSheetLayer();
  layer.loadFromString(data, false, false, false, true);
  layer.enabled = true;
  layer.set_name(name);
  LayerManager.get_layerList()[layer.id] = layer;
  layer.set_referenceFrame(LayerManager.get_currentMap());
  LayerManager.get_allMaps()[frame].layers.push(layer);
  LayerManager.get_allMaps()[frame].open = true;
  LayerManager._version++;
  LayerManager.loadTree();
  return layer;
};
LayerManager._showOrbitPlanet_Click = function(sender, e) {
  try {
    const bit = parseInt((sender).tag.toString());
    if (!(Settings.get_globalSettings().get_planetOrbitsFilter() & bit)) {
      Settings.get_globalSettings().set_planetOrbitsFilter(Settings.get_globalSettings().get_planetOrbitsFilter() | bit);
    }
    else {
      Settings.get_globalSettings().set_planetOrbitsFilter(Settings.get_globalSettings().get_planetOrbitsFilter() & ~bit);
    }
  }
  catch ($e1) {
  }
};
LayerManager._showOrbit_Click = function(sender, e) {
  const map = ss.safeCast(LayerManager._selectedLayer, LayerMap);
  map.frame.showOrbitPath = !map.frame.showOrbitPath;
};
LayerManager._addGreatCircle_Click = function(sender, e) {
  LayerManager._addGreatCircleLayer();
};
LayerManager._addMpc_Click = function(sender, e) {
  const target = LayerManager._selectedLayer;
  const input = new SimpleInput(Language.getLocalizedText(1302, 'Minor planet name or designation'), Language.getLocalizedText(238, 'Name'), '', 32);
  let retry = false;
  do {
    if (input.showDialog() === 1) {
      if (ss.keyExists(target.childMaps, input.text)) {
        retry = true;
      }
      else {
        try {
          LayerManager._getMpc(input.text, target);
          retry = false;
        }
        catch ($e1) {
          retry = true;
        }
      }
    }
    else {
      retry = false;
    }
  } while (retry);
  return;
};
LayerManager._asOrbitalLines_Click = function(sender, e) {
  const target = LayerManager._selectedLayer;
  const input = new SimpleInput(Language.getLocalizedText(1302, 'Minor planet name or designation'), Language.getLocalizedText(238, 'Name'), '', 32);
  input.show(Cursor.get_position(), function() {
    if (ss.keyExists(target.childMaps, input.text)) {
    }
    else {
      LayerManager._getMpcAsTLE(input.text, target);
    }
  });
};
LayerManager._getMpcAsTLE = function(id, target) {
  const file = new WebFile('https://www.minorplanetcenter.net/db_search/show_object?object_id=' + id);
  file.onStateChange = function() {
    if (file.get_state() !== 1) {
      return;
    }
    const data = file.getText();
    const startform = data.indexOf('show-orbit-button');
    const lastForm = data.indexOf('/form', startform);
    const formpart = data.substring(startform, lastForm);
    const name = id;
    const frame = new ReferenceFrame();
    frame.oblateness = 0;
    frame.showOrbitPath = true;
    frame.showAsPoint = true;
    frame.epoch = SpaceTimeController.utcToJulian(ss.date(LayerManager._getValueByID(formpart, 'epoch').substring(0, 10)));
    frame.semiMajorAxis = parseFloat(LayerManager._getValueByID(formpart, 'a')) * 149598000 * 1000;
    frame.referenceFrameType = 1;
    frame.inclination = parseFloat(LayerManager._getValueByID(formpart, 'incl'));
    frame.longitudeOfAscendingNode = parseFloat(LayerManager._getValueByID(formpart, 'node'));
    frame.eccentricity = parseFloat(LayerManager._getValueByID(formpart, 'e'));
    frame.meanAnomolyAtEpoch = parseFloat(LayerManager._getValueByID(formpart, 'm'));
    frame.meanDailyMotion = ELL.meanMotionFromSemiMajorAxis(parseFloat(LayerManager._getValueByID(formpart, 'a')));
    frame.argumentOfPeriapsis = parseFloat(LayerManager._getValueByID(formpart, 'peri'));
    frame.scale = 1;
    frame.semiMajorAxisUnits = 1;
    frame.meanRadius = 10;
    frame.oblateness = 0;
    const TLE = name + '\n' + frame.toTLE();
    LayerManager._loadOrbitsFile(id, TLE, target.get_name());
    LayerManager.loadTree();
  };
  file.send();
};
LayerManager._getMpc = function(id, target) {
  const file = new WebFile('https://www.minorplanetcenter.net/db_search/show_object?object_id=' + id);
  file.onStateChange = function() {
    const data = file.getText();
    const startform = data.indexOf('show-orbit-button');
    const lastForm = data.indexOf('/form', startform);
    const formpart = data.substring(startform, lastForm);
    const name = id;
    const orbit = new LayerMap(ss.trim(name), 18);
    orbit.frame.oblateness = 0;
    orbit.frame.showOrbitPath = true;
    orbit.frame.showAsPoint = true;
    orbit.frame.epoch = SpaceTimeController.utcToJulian(ss.date(LayerManager._getValueByID(formpart, 'epoch').substring(0, 10)));
    orbit.frame.semiMajorAxis = parseFloat(LayerManager._getValueByID(formpart, 'a')) * 149598000 * 1000;
    orbit.frame.referenceFrameType = 1;
    orbit.frame.inclination = parseFloat(LayerManager._getValueByID(formpart, 'incl'));
    orbit.frame.longitudeOfAscendingNode = parseFloat(LayerManager._getValueByID(formpart, 'node'));
    orbit.frame.eccentricity = parseFloat(LayerManager._getValueByID(formpart, 'e'));
    orbit.frame.meanAnomolyAtEpoch = parseFloat(LayerManager._getValueByID(formpart, 'm'));
    orbit.frame.meanDailyMotion = ELL.meanMotionFromSemiMajorAxis(parseFloat(LayerManager._getValueByID(formpart, 'a')));
    orbit.frame.argumentOfPeriapsis = parseFloat(LayerManager._getValueByID(formpart, 'peri'));
    orbit.frame.scale = 1;
    orbit.frame.semiMajorAxisUnits = 1;
    orbit.frame.meanRadius = 10;
    orbit.frame.oblateness = 0;
    if (!ss.keyExists(LayerManager.get_allMaps()[target.get_name()].childMaps, ss.trim(name))) {
      LayerManager.get_allMaps()[target.get_name()].addChild(orbit);
    }
    LayerManager.get_allMaps()[orbit.get_name()] = orbit;
    orbit.frame.parent = target.get_name();
    LayerManager._makeLayerGroup('Minor Planet', orbit);
    LayerManager.loadTree();
  };
};
LayerManager._getValueByID = function(data, id) {
  let valStart = data.indexOf('id="' + id + '"');
  valStart = data.indexOf('value=', valStart) + 7;
  const valEnd = data.indexOf('"', valStart);
  return data.substr(valStart, valEnd - valStart);
};
LayerManager._addGreatCircleLayer = function() {
  const layer = new GreatCirlceRouteLayer();
  const camera = WWTControl.singleton.renderContext.viewCamera;
  layer.set_latStart(camera.lat);
  layer.set_latEnd(camera.lat - 5);
  layer.set_lngStart(camera.lng);
  layer.set_lngEnd(camera.lng + 5);
  layer.set_width(4);
  layer.enabled = true;
  layer.set_name(Language.getLocalizedText(1144, 'Great Circle Route'));
  LayerManager.get_layerList()[layer.id] = layer;
  layer.set_referenceFrame(LayerManager._currentMap);
  LayerManager.get_allMaps()[LayerManager._currentMap].layers.push(layer);
  LayerManager.get_allMaps()[LayerManager._currentMap].open = true;
  LayerManager._version++;
  LayerManager.loadTree();
  LayerManager.get_greatCircleDlg().show(layer, new ss.EventArgs());
};
LayerManager._loadOrbitsFile = function(name, data, currentMap) {
  const layer = new OrbitLayer();
  layer.loadString(data);
  layer.enabled = true;
  layer.set_name(name);
  LayerManager.get_layerList()[layer.id] = layer;
  layer.set_referenceFrame(currentMap);
  LayerManager.get_allMaps()[currentMap].layers.push(layer);
  LayerManager.get_allMaps()[currentMap].open = true;
  LayerManager._version++;
  LayerManager.loadTree();
  return layer;
};
export const LayerManager$ = {};


// wwtlib.LayerMap

export function LayerMap(name, reference) {
  this.childMaps = {};
  this.parent = null;
  this.layers = [];
  this.open = false;
  this.enabled = true;
  this.loadedFromTour = false;
  this.frame = new ReferenceFrame();
  this.set_name(name);
  this.frame.reference = reference;
  let radius = 6371000;
  switch (reference) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      radius = 696000000;
      break;
    case 4:
      radius = 2439700;
      break;
    case 5:
      radius = 6051800;
      break;
    case 6:
      radius = 6371000;
      break;
    case 7:
      radius = 3390000;
      break;
    case 8:
      radius = 69911000;
      break;
    case 9:
      radius = 58232000;
      break;
    case 10:
      radius = 25362000;
      break;
    case 11:
      radius = 24622000;
      break;
    case 12:
      radius = 1161000;
      break;
    case 13:
      radius = 1737100;
      break;
    case 14:
      radius = 1821500;
      break;
    case 15:
      radius = 1561000;
      break;
    case 16:
      radius = 2631200;
      break;
    case 17:
      radius = 2410300;
      break;
    case 18:
      break;
    case 19:
      break;
    default:
      break;
  }
  this.frame.meanRadius = radius;
}

export const LayerMap$ = {
  addChild: function (child) {
    child.parent = this;
    this.childMaps[child.get_name()] = child;
  },
  get_name: function () {
    return this.frame.name;
  },
  set_name: function (value) {
    this.frame.name = value;
    return value;
  },
  computeFrame: function (renderContext) {
    if (this.frame.reference === 18) {
      this.frame.computeFrame(renderContext);
    }
  },
  toString: function () {
    return this.get_name();
  }
};
