import ss from './scriptsharp/ss';
import GFX from './astrocalc/GFX';
import {ABR,ACFT} from './astrocalc/AAAberration';
import {ASEP} from './astrocalc/AAAngularSeparation';
import {C3D, COR, CT } from './astrocalc/AACoordinateTransformation';
import {CalD, DT} from './astrocalc/AADate';
import {DYT} from './astrocalc/AADynamicalTime';
import { CAAEarth, VSC } from './astrocalc/AAEarth';
import { CAAEclipticalElementDetails, CAAEclipticalElements } from './astrocalc/AAEclipticalElements';
import {ELL,EOE,EPD,EOD} from './astrocalc/AAElliptical';
import {EOT} from './astrocalc/AAEquationOfTime';
import {CAAFK5} from './astrocalc/AAFK5';
import {GM,GMD,GMDS} from './astrocalc/AAGalileanMoons';
import {CAAGlobe} from './astrocalc/AAGlobe';
import {CAAMercury} from './astrocalc/AAMercury';
import {CAAMoonPerigeeApogee, MPAC} from './astrocalc/AAMoonPerigeeApogee';
import {CAAMoon, MoonCoefficient1, MoonCoefficient2} from './astrocalc/AAMoon';
import {CAAMoonPhases} from './astrocalc/AAMoonPhases';
import {CAANeptune} from './astrocalc/AANeptune';
import {CAANutation, NUC} from './astrocalc/AANutation';
import {CAASun} from './astrocalc/AASun';
import {CAAPluto, PlutoCoefficient1, PlutoCoefficient2} from './astrocalc/AAPluto';
import {CAAVenus} from './astrocalc/AAVenus';
import {CAAUranus} from './astrocalc/AAUranus';
import {CAAJupiter} from './astrocalc/AAJupiter';
import {CAASaturn, CAASaturnRingDetails, CAASaturnRings} from './astrocalc/AASaturn';
import {EPO} from './astrocalc/AAElementsPlanetaryOrbit';
import {CAAKepler} from './astrocalc/AAKepler';
import {CAAMars} from './astrocalc/AAMars';
import {CAAMoonNodes} from './astrocalc/AAMoonNodes';
import {IFR} from './astrocalc/AAIlluminatedFraction';
import {INTP} from './astrocalc/AAInterpolate';
import {MIFR} from './astrocalc/AAMoonIlluminatedFraction';
import {CAAParallax,CAATopocentricEclipticDetails} from './astrocalc/AAParallax';
import {CAASidereal} from './astrocalc/CAASidereal';
import {CAAPhysicalJupiter, CAAPhysicalJupiterDetails} from './astrocalc/AAPhysicalJupiter';
import {CAAPhysicalMars, CAAPhysicalMarsDetails} from './astrocalc/AAPhysicalMars';
import {CAAPhysicalSunDetails,CAAPhysicalSun} from './astrocalc/AAPhysicalSun';
import {CAAPrecession} from './astrocalc/AAPrecession';
import {CAARiseTransitSet,CAARiseTransitSetDetails} from './astrocalc/AARiseTransitSet';

import {Util, Guid, Guid$, Mouse} from './Util';


import {
  IFolder,
  IPlace,
  ISettings,
  IThumbnail,
  IUiController,
  IUIServicesCallbacks,
  IUndoStep,
  IViewMover
} from './interface';
import {
  DAY_OF_WEEK, EO, CullMode,
  Classification, BandPass, ImageSetType,
  ProjectionType, ThumbnailSize, FolderType,
  FolderRefreshType, FolderGroup, LocationHint,
  PointType, InterpolationType, SolarSystemObjects,
  StateType, Formatting, DialogResult,
  Keys, TransitionType, UserLevel,
  TextBorderStyle, SelectionAnchor, LoopTypes,
  ShapeType, AudioType, OverlayAnchor,
  StockSkyOverlayTypes, Alignment, Primitives,
  RAUnits, MarkerScales, PlotTypes,
  ColorMaps, MarkerMixes, AltTypes,
  CoordinatesTypes, ReferenceFrameTypes, ReferenceFrames,
  FadeType, AltUnits, ScaleTypes, DataTypes, PointScaleTypes,
  Enums,Enums$
} from './enums.js';
import {AstroCalc,RiseSetDetails, AstroRaDec} from './astrocalc/AstroCalc';
import {CAAStellarMagnitudes} from './astrocalc/AAStellarMagnitudes';
import {
  ConvexHull,
  ConvexHull$, DoubleUtilities, Matrix2d,Matrix2d$,
  Matrix3d, Matrix3d$, PlaneD, PlaneD$,
  PositionColored,
  PositionColoredTextured, PositionNormalTextured, PositionNormalTextured$,
  PositionNormalTexturedTangent, PositionNormalTexturedX2, PositionNormalTexturedX2$,
  PositionTexture, SphereHull, SphereHull$,
  Vector2d,
  Vector3d, Vector4d, Vector4d$
} from './Double3d';
import {Tile, Tile$} from './Tile';
import {TileCache, TileCache$} from './TileCache';
import {Color,Colors} from './Color';
import {Coordinates,Coordinates$} from './Coordinates';
import {BlendState} from './BlendState';
import {Texture, Texture$} from './Graphics/Texture';
import {Imageset, Imageset$} from './Imageset';
import {ToastTile, ToastTile$,DistanceCalc,DistanceCalc$} from './ToastTile';
import {Triangle, Triangle$} from './Triangle';
import {
  TileShader,
  TileShader$,
  SpriteShader,
  SpriteShader$,
  TextShader$,
  TextShader,
  ShapeSpriteShader$,
  ShapeSpriteShader,
  ImageShader2$,
  ImageShader2,
  ImageShader,ImageShader$,
  ModelShaderTan$,
  ModelShaderTan,
  ModelShader$,
  ModelShader,
  EllipseShader$,
  EllipseShader,
  KeplerPointSpriteShader$,
  KeplerPointSpriteShader,
  LineShaderNormalDates$,
  LineShaderNormalDates,
  OrbitLineShader$,
  OrbitLineShader,
  SimpleLineShader2D$,
  SimpleLineShader2D, SimpleLineShader$, SimpleLineShader
} from './Graphics/Shaders';
import {LayerManager,LayerManager$,LayerMap,LayerMap$} from './Layers/LayerManager';
import {WWTControl,WWTControl$} from './WWTControl';
import {SpaceTimeController,SpaceTimeController$} from './SpaceTimeController';
import {WebFile,WebFile$} from './WebFile';
import {ISSLayer,ISSLayer$} from './Graphics/ISSLayer';
import {Language} from './Language';
import {Settings,Settings$, SettingParameter, SettingParameter$} from './settings';
import {VoTableLayer, VoTableLayer$} from './VOTable';
import {ImageSetLayer, ImageSetLayer$} from './ImageSetLayer';
import {Layer,Layer$} from './Layers/Layer';
import {Histogram,Histogram$} from './Histogram';
import {KeplerianElements, KeplerianElements$, Planets, Planets$} from './Planets';
import {Constellations,Constellations$,ConstellationFilter,ConstellationFilter$} from './Constellation';
import {Sprite2d} from './Graphics/Sprite2d';
import {ScriptInterface,ScriptInterface$} from './ScriptInterface';
import {RenderContext,RenderContext$} from './RenderContext';
import {ReferenceFrame,ReferenceFrame$} from './Layers/ReferenceFrame';
import {CameraParameters,CameraParameters$} from './CameraParameters';
import {Folder} from './Folder';
import {Object3d,Object3d$,Object3dLayer,Object3dLayer$} from './Layers/Object3d';
import {RenderTriangle,RenderTriangle$} from './RenderTriangle';
import {
  PointList, PointList$,
  SimpleLineList, SimpleLineList$,
  Dates, Dates$,
  LineList, LineList$,
  TriangleList, TriangleList$, TimeSeriesLineVertex$, TimeSeriesLineVertex, OrbitLineList$, OrbitLineList
} from './Graphics/Primative3d';
import {Place,Place$} from './Place';
import {
  TimeSeriesPointVertex,
  TimeSeriesPointVertex$,
  IndexBuffer,
  IndexBuffer$,
  PositionColoredTexturedVertexBuffer,
  PositionColoredTexturedVertexBuffer$,
  PositionColoredVertexBuffer,
  PositionColoredVertexBuffer$,
  ShortIndexBuffer,
  ShortIndexBuffer$,
  TimeSeriesPointVertexBuffer,
  TimeSeriesPointVertexBuffer$,
  VertexBufferBase,
  VertexBufferBase$,
  TimeSeriesPointSpriteShader,
  TimeSeriesPointSpriteShader$,
  PositionNormalTexturedTangentVertexBuffer$,
  PositionNormalTexturedTangentVertexBuffer,
  PositionNormalTexturedVertexBuffer$,
  PositionNormalTexturedVertexBuffer,
  PositionVertexBuffer$,
  PositionVertexBuffer,
  TimeSeriesLineVertexBuffer$,
  TimeSeriesLineVertexBuffer,
  KeplerVertexBuffer$,
  KeplerVertexBuffer,
  PositionTextureVertexBuffer$, PositionTextureVertexBuffer
} from './Graphics/GIBuffer';
import {Annotation, Annotation$} from './Annotation';
import {Wtml,Wtml$} from './WTML';
import {TourPlayer, TourPlayer$} from './Tours/TourPlayer';
import {Grids,Grids$} from './Grids';
import {MinorPlanets,MinorPlanets$} from './MinorPlanets';
import {UiTools, UiTools$} from './UITools';
import {EllipseRenderer, EllipseRenderer$, Orbit, Orbit$} from './Orbit';
import {BinaryReader,BinaryReader$} from './Utilities/BinaryReader';
import {Star, Star$} from './Star';
import {KeplerVertex, KeplerVertex$} from './KeplerVertex';

const wwtlib = (() => {

  function Tessellator() {}
  Tessellator.tesselateSimplePoly = inputList => {
    const results = [];
    const tess = new Tessellator();
    tess.process(inputList, results);
    return results;
  };
  const Tessellator$ = {
    _isLeftOfHalfSpace: (pntA, pntB, pntTest) => {
      pntA.normalize();
      pntB.normalize();
      const cross = Vector3d.cross(pntA, pntB);
      const dot = Vector3d.dot(cross, pntTest);
      return dot > 0;
    },
    _insideTriangle: function (pntA, pntB, pntC, pntTest) {
      if (!this._isLeftOfHalfSpace(pntA, pntB, pntTest)) {
        return false;
      }
      if (!this._isLeftOfHalfSpace(pntB, pntC, pntTest)) {
        return false;
      }
      if (!this._isLeftOfHalfSpace(pntC, pntA, pntTest)) {
        return false;
      }
      return true;
    },
    _canClipEar: function (poly, u, v, w, n, verts) {
      let p;
      const a = poly[verts[u]].copy();
      const b = poly[verts[v]].copy();
      const c = poly[verts[w]].copy();
      let P;
      const d = Vector3d.subtractVectors(b, a);
      d.normalize();
      const e = Vector3d.subtractVectors(b, c);
      e.normalize();
      const g = Vector3d.cross(d, e);
      const bn = b.copy();
      bn.normalize();
      if (Vector3d.dot(g, bn) > 0) {
        return false;
      }
      for (p = 0; p < n; p++) {
        if ((p === u) || (p === v) || (p === w)) {
          continue;
        }
        P = poly[verts[p]].copy();
        if (this._insideTriangle(a, b, c, P)) {
          return false;
        }
      }
      return true;
    },
    process: function (poly, result) {
      const n = poly.length;
      if (poly.length < 3) {
        return false;
      }
      const verts = new Array(poly.length);
      for (let i = 0; i < n; i++) {
        verts[i] = i;
      }
      let nv = n;
      let count = 2 * nv;
      let m = 0, v = nv - 1;
      for (; nv > 2;) {
        if (0 >= (count--)) {
          return false;
        }
        let u = v;
        if (nv <= u) {
          u = 0;
        }
        v = u + 1;
        if (nv <= v) {
          v = 0;
        }
        let w = v + 1;
        if (nv <= w) {
          w = 0;
        }
        if (this._canClipEar(poly, u, v, w, nv, verts)) {
          let s, t;
          result.push(verts[u]);
          result.push(verts[v]);
          result.push(verts[w]);
          m++;
          for (s = v, t = v + 1; t < nv; s++, t++) {
            verts[s] = verts[t];
          }
          nv--;
          count = 2 * nv;
        }
      }
      return true;
    }
  };


  function ScaleMap() {}
  const ScaleMap$ = {};

  function DomainValue(text, markerIndex) {
    this.markerIndex = 4;
    this.customMarker = null;
    this.text = text;
    this.markerIndex = markerIndex;
  }
  const DomainValue$ = {};

  function SkyOverlays() {}
  const SkyOverlays$ = {};

  function GroundOverlayLayer() {}
  const GroundOverlayLayer$ = {};

  function FrameTarget() {}
  const FrameTarget$ = {};

  function LayerUI() {}
  const LayerUI$ = {
    get_hasTreeViewNodes: () => false,
    getTreeNodes: () => null,
    getNodeContextMenu: node => null,
    setUICallbacks: callbacks => {
    }
  };

  function LayerUIMenuItem() {
    this._tag = null;
    this._isChecked = false;
    this._isEnabled = true;
    this._subMenus = null;
  }
  const LayerUIMenuItem$ = {
    get_name: function () {
      return this._name;
    },
    set_name: function (value) {
      this._name = value;
      return value;
    },
    get_tag: function () {
      return this._tag;
    },
    set_tag: function (value) {
      this._tag = value;
      return value;
    },
    get_checked: function () {
      return this._isChecked;
    },
    set_checked: function (value) {
      this._isChecked = value;
      return value;
    },
    get_enabled: function () {
      return this._isEnabled;
    },
    set_enabled: function (value) {
      this._isEnabled = value;
      return value;
    },
    add_menuItemSelected: function (value) {
      this.__menuItemSelected = ss.bindAdd(this.__menuItemSelected, value);
    },
    remove_menuItemSelected: function (value) {
      this.__menuItemSelected = ss.bindSub(this.__menuItemSelected, value);
    },
    fireMenuItemSelected: function () {
      if (this.__menuItemSelected != null) {
        this.__menuItemSelected(this);
      }
    },
    get_subMenus: function () {
      if (this._subMenus == null) {
        this._subMenus = [];
      }
      return this._subMenus;
    }
  };

  function LayerUITreeNode() {
    this._parent = null;
    this._level = 0;
    this._open = false;
    this._isChecked = false;
    this._bold = false;
    this._color = Colors.get_white();
    this._nodes = null;
  }
  const LayerUITreeNode$ = {
    add_nodeChecked: function (value) {
      this.__nodeChecked = ss.bindAdd(this.__nodeChecked, value);
    },
    remove_nodeChecked: function (value) {
      this.__nodeChecked = ss.bindSub(this.__nodeChecked, value);
    },
    fireNodeChecked: function (newState) {
      if (this.__nodeChecked != null) {
        this.__nodeChecked(this, newState);
      }
    },
    add_nodeUpdated: function (value) {
      this.__nodeUpdated = ss.bindAdd(this.__nodeUpdated, value);
    },
    remove_nodeUpdated: function (value) {
      this.__nodeUpdated = ss.bindSub(this.__nodeUpdated, value);
    },
    fireNodeUpdated: function () {
      if (this.__nodeUpdated != null) {
        this.__nodeUpdated(this);
      }
    },
    add_nodeSelected: function (value) {
      this.__nodeSelected = ss.bindAdd(this.__nodeSelected, value);
    },
    remove_nodeSelected: function (value) {
      this.__nodeSelected = ss.bindSub(this.__nodeSelected, value);
    },
    fireNodeSelected: function () {
      if (this.__nodeSelected != null) {
        this.__nodeSelected(this);
      }
    },
    add_nodeActivated: function (value) {
      this.__nodeActivated = ss.bindAdd(this.__nodeActivated, value);
    },
    remove_nodeActivated: function (value) {
      this.__nodeActivated = ss.bindSub(this.__nodeActivated, value);
    },
    fireNodeActivated: function () {
      if (this.__nodeActivated != null) {
        this.__nodeActivated(this);
      }
    },
    get_name: function () {
      return this._name;
    },
    set_name: function (value) {
      if (this._name !== value) {
        this._name = value;
        this.fireNodeUpdated();
      }
      return value;
    },
    get_parent: function () {
      return this._parent;
    },
    set_parent: function (value) {
      this._parent = value;
      return value;
    },
    get_level: function () {
      return this._level;
    },
    set_level: function (value) {
      this._level = value;
      return value;
    },
    get_tag: function () {
      return this._tag;
    },
    set_tag: function (value) {
      this._tag = value;
      return value;
    },
    get_referenceTag: function () {
      return this._referenceTag;
    },
    set_referenceTag: function (value) {
      this._referenceTag = value;
      return value;
    },
    get_opened: function () {
      return this._open;
    },
    set_opened: function (value) {
      if (this._open !== value) {
        this._open = value;
        this.fireNodeUpdated();
      }
      return value;
    },
    get_checked: function () {
      return this._isChecked;
    },
    set_checked: function (value) {
      if (this._isChecked !== value) {
        this._isChecked = value;
        this.fireNodeUpdated();
      }
      return value;
    },
    get_bold: function () {
      return this._bold;
    },
    set_bold: function (value) {
      if (this._bold !== value) {
        this._bold = value;
        this.fireNodeUpdated();
      }
      return value;
    },
    get_color: function () {
      return this._color;
    },
    set_color: function (value) {
      if (this._color !== value) {
        this._color = value;
        this.fireNodeUpdated();
      }
      return value;
    },
    add: function (name) {
      const node = new LayerUITreeNode();
      node.set_name(name);
      node.set_parent(this);
      node.set_level(this.get_level() + 1);
      this.get_nodes().push(node);
      return node;
    },
    get_nodes: function () {
      if (this._nodes == null) {
        this._nodes = [];
      }
      return this._nodes;
    }
  };

  function Group() {
    this.startIndex = 0;
    this.indexCount = 0;
    this.materialIndex = 0;
  }
  const Group$ = {};

  function Mesh() {
    this.boundingSphere = new SphereHull();
  }
  Mesh.create = (vertices, indices) => {
    const mesh = new Mesh();
    mesh.vertices = vertices;
    mesh.indices = indices;
    const points = new Array(vertices.length);
    for (let i = 0; i < vertices.length; ++i) {
      points[i] = vertices[i].get_position();
    }
    mesh.boundingSphere = ConvexHull.findEnclosingSphereFast(points);
    return mesh;
  };
  Mesh.createTangent = (vertices, indices) => {
    const mesh = new Mesh();
    mesh.tangentVertices = vertices;
    mesh.indices = indices;
    const points = new Array(mesh.tangentVertices.length);
    for (let i = 0; i < mesh.tangentVertices.length; ++i) {
      points[i] = mesh.tangentVertices[i].get_position();
    }
    mesh.boundingSphere = ConvexHull.findEnclosingSphereFast(points);
    return mesh;
  };
  const Mesh$ = {
    dispose: function () {
      if (this.vertexBuffer != null) {
        this.vertexBuffer.dispose();
        this.vertexBuffer = null;
      }
      if (this.tangentVertexBuffer != null) {
        this.tangentVertexBuffer.dispose();
        this.tangentVertexBuffer = null;
      }
      if (this.indexBuffer != null) {
        this.indexBuffer.dispose();
        this.indexBuffer = null;
      }
    },
    setObjects: function (objects) {
      this._objects = objects;
    },
    commitToDevice: function () {
      if (this.vertices != null) {
        this.vertexBuffer = PositionNormalTexturedVertexBuffer.create(this.vertices);
      } else if (this.tangentVertices != null) {
        this.tangentVertexBuffer = PositionNormalTexturedTangentVertexBuffer.create(this.tangentVertices);
      }
      this.indexBuffer = new IndexBuffer(new Uint32Array(this.indices));
    },
    beginDrawing: function (renderContext) {
      if (this.vertexBuffer != null) {
        renderContext._setVertexBuffer(this.vertexBuffer);
      } else if (this.tangentVertexBuffer != null) {
        renderContext._setVertexBuffer(this.tangentVertexBuffer);
      }
      if (this.indexBuffer != null) {
        renderContext._setIndexBuffer(this.indexBuffer);
      }
    },
    drawSubset: function (renderContext, materialIndex) {
      if (this.indexBuffer == null || this._objects == null) {
        return;
      }
      this.drawHierarchy(this._objects, materialIndex, renderContext, 0);
    },
    drawHierarchy: function (nodes, materialIndex, renderContext, depth) {
      if (depth > 1212) {
        return;
      }
      const $enum1 = ss.enumerate(nodes);
      while ($enum1.moveNext()) {
        const node = $enum1.current;
        if (node.drawGroup != null && node.enabled) {
          const $enum2 = ss.enumerate(node.drawGroup);
          while ($enum2.moveNext()) {
            const group = $enum2.current;
            if (group.materialIndex === materialIndex) {
              renderContext.gl.drawElements(4, group.indexCount, 5125, group.startIndex * 4);
            }
          }
        }
        this.drawHierarchy(node.children, materialIndex, renderContext, depth + 1);
      }
    },
    get_objects: function () {
      return this._objects;
    },
    set_objects: function (value) {
      this._objects = value;
      return value;
    }
  };

  function VertexPosition() {
    this.index = 0;
  }

  function ObjectNode() {
    this.level = -1;
    this.children = [];
    this.enabled = true;
    this.drawGroup = [];
    this.applyLists = [];
    this.applyListsIndex = [];
  }
  const ObjectNode$ = {};

  function KmlCoordinate() {
    this.lat = 0;
    this.lng = 0;
    this.alt = 0;
  }
  const KmlCoordinate$ = {};

  function KmlLineList() {
    this.extrude = false;
    this.astronomical = false;
    this.meanRadius = 6371000;
    this.pointList = [];
  }
  const KmlLineList$ = {
    parseWkt: function (geoText, option, alt, date) {
      const parts = UiTools.split(geoText, '(,)');
      const $enum1 = ss.enumerate(parts);
      while ($enum1.moveNext()) {
        const part = $enum1.current;
        const coordinates = ss.trim(part).split(' ');
        if (coordinates.length > 1) {
          const pnt = new KmlCoordinate();
          pnt.lng = parseFloat(coordinates[0]);
          if (this.astronomical) {
            pnt.lng -= 180;
          }
          pnt.lat = parseFloat(coordinates[1]);
          if (coordinates.length > 2 && !alt) {
            pnt.alt = parseFloat(coordinates[2]);
          } else {
            pnt.alt = alt;
          }
          pnt.date = date;
          this.pointList.push(pnt);
        }
      }
    },
    getCenterPoint: function () {
      const point = new KmlCoordinate();
      point.lat = 0;
      point.lng = 0;
      point.alt = 0;
      const $enum1 = ss.enumerate(this.pointList);
      while ($enum1.moveNext()) {
        const pnt = $enum1.current;
        point.lat += pnt.lat;
        point.lng += pnt.lng;
        point.alt += pnt.alt;
      }
      point.lat /= this.pointList.length;
      point.lng /= this.pointList.length;
      point.alt /= this.pointList.length;
      return point;
    }
  };

  function PushPin() {
  }
  PushPin.getPushPinTexture = pinId => {
    let texture = null;
    if (ss.keyExists(PushPin._pinTextureCache, pinId)) {
      return PushPin._pinTextureCache[pinId];
    }
    try {
      texture = Tile.prepDevice.createTexture();
      Tile.prepDevice.bindTexture(3553, texture);
      const row = Math.floor(pinId / 16);
      const col = pinId % 16;
      const temp = document.createElement('canvas');
      temp.height = 32;
      temp.width = 32;
      const ctx = temp.getContext('2d');
      ctx.drawImage(PushPin._pins.imageElement, (col * 32), (row * 32), 32, 32, 0, 0, 32, 32);
      const image = temp;
      Tile.prepDevice.texParameteri(3553, 10242, 33071);
      Tile.prepDevice.texParameteri(3553, 10243, 33071);
      Tile.prepDevice.texImage2D(3553, 0, 6408, 6408, 5121, image);
      Tile.prepDevice.texParameteri(3553, 10241, 9985);
      Tile.prepDevice.generateMipmap(3553);
      Tile.prepDevice.bindTexture(3553, null);
      PushPin._pinTextureCache[pinId] = texture;
    }
    catch ($e1) {
    }
    return texture;
  };
  const PushPin$ = {};

  class Table{
    constructor() {
      this.guid = new Guid();
      this.header = [];
      this.rows = [];
      this.delimiter = '\t';
      this.locked = false;
    }
    lock() {
      this.locked = true;
    }
    unlock() {
      this.locked = false;
    }
    save() {
      let data = '';
      let first = true;
      const $enum1 = ss.enumerate(this.header);
      while ($enum1.moveNext()) {
        let col = $enum1.current;
        if (!first) {
          data += '\t';
        } else {
          first = false;
        }
        data += col;
      }
      data += '\r\n';
      const $enum2 = ss.enumerate(this.rows);
      while ($enum2.moveNext()) {
        const row = $enum2.current;
        first = true;
        const $enum3 = ss.enumerate(row);
        while ($enum3.moveNext()) {
          let col = $enum3.current;
          if (!first) {
            data += '\t';
          } else {
            first = false;
          }
          data += col;
        }
        data += '\r\n';
      }
      return data;
    }
    loadFromString(data, isUpdate, purge, hasHeader) {
      let count = 0;
      const lines = data.split('\r\n');
      if (!isUpdate || hasHeader) {
        if (lines.length > 0) {
          const headerLine = lines[0];
          count++;
          if (headerLine.indexOf('\t') === -1 && headerLine.indexOf(',') > -1) {
            this.delimiter = ',';
          }
          if (!isUpdate) {
            this.rows.length = 0;
          }
          this.header = UiTools.splitString(headerLine, this.delimiter);
        } else {
          this.header = [];
        }
      }
      let temp = [];
      if (!purge) {
        temp = this.rows;
      }
      while (count < lines.length) {
        const line = lines[count];
        const rowData = UiTools.splitString(line, this.delimiter);
        if (rowData.length < 1) {
          break;
        }
        temp.push(rowData);
        count++;
      }
      if (purge) {
        this.rows = temp;
      }
    }
  }


  function VoTable() {
    this.columns = {};
    this.column = [];
    this.rows = [];
    this.loadFilename = '';
    this.sampId = '';
    this.selectedRow = null;
    this.error = false;
    this.errorText = '';
  }
  VoTable.loadFromUrl = (url, complete) => {
    const temp = new VoTable();
    temp._onComplete = complete;
    temp._webFile = new WebFile(Util.getProxiedUrl(url));
    temp._webFile.onStateChange = ss.bind('_loadData', temp);
    temp._webFile.send();
    return temp;
  };
  VoTable.loadFromString = data => {
    const xParser = new DOMParser();
    const doc = xParser.parseFromString(data, 'text/xml');
    const table = new VoTable();
    table.loadFromXML(doc);
    return table;
  };
  const VoTable$ = {
    _loadData: function () {
      if (this._webFile.get_state() === 2) {
        alert(this._webFile.get_message());
      } else if (this._webFile.get_state() === 1) {
        this.loadFromXML(this._webFile.getXml());
        if (this._onComplete != null) {
          this._onComplete();
        }
      }
    },
    loadFromXML: function (xml) {
      const voTable = Util.selectSingleNode(xml, 'VOTABLE');
      if (voTable == null) {
        return;
      }
      let index = 0;
      try {
        const table = Util.selectSingleNode(Util.selectSingleNode(voTable, 'RESOURCE'), 'TABLE');
        if (table != null) {
          const $enum1 = ss.enumerate(table.childNodes);
          while ($enum1.moveNext()) {
            let node = $enum1.current;
            if (node.nodeName === 'FIELD') {
              const col = new VoColumn(node, index++);
              this.columns[col.name] = col;
              this.column.push(col);
            }
          }
        }
      } catch ($e2) {
        this.error = true;
        this.errorText = Util.selectSingleNode(voTable, 'DESCRIPTION').text;
      }
      try {
        const tableData = Util.selectSingleNode(Util.selectSingleNode(Util.selectSingleNode(Util.selectSingleNode(voTable, 'RESOURCE'), 'TABLE'), 'DATA'), 'TABLEDATA');
        if (tableData != null) {
          const $enum3 = ss.enumerate(tableData.childNodes);
          while ($enum3.moveNext()) {
            let node = $enum3.current;
            if (node.nodeName === 'TR') {
              const row = new VoRow(this);
              row.columnData = new Array(ss.keyCount(this.columns));
              index = 0;
              const $enum4 = ss.enumerate(node.childNodes);
              while ($enum4.moveNext()) {
                const child = $enum4.current;
                if (child.nodeName === 'TD') {
                  row.columnData[index++] = ss.trim(Util.getInnerText(child));
                }
              }
              this.rows.push(row);
            }
          }
        }
      } catch ($e5) {
      }
    },
    save: filename => true,
    getColumnByUcd: function (ucd) {
      const $enum1 = ss.enumerate(ss.keys(this.columns));
      while ($enum1.moveNext()) {
        const key = $enum1.current;
        const col = this.columns[key];
        if (ss.replaceString(col.ucd, '_', '.').toLocaleLowerCase().indexOf(ucd.toLocaleLowerCase()) > -1) {
          return col;
        }
      }
      return null;
    },
    getRAColumn: function () {
      const $enum1 = ss.enumerate(ss.keys(this.columns));
      while ($enum1.moveNext()) {
        let key = $enum1.current;
        let col = this.columns[key];
        if (col.ucd.toLocaleLowerCase().indexOf('pos.eq.ra') > -1 || col.ucd.toLocaleLowerCase().indexOf('pos_eq_ra') > -1) {
          return col;
        }
      }
      const $enum2 = ss.enumerate(ss.keys(this.columns));
      while ($enum2.moveNext()) {
        let key = $enum2.current;
        let col = this.columns[key];
        if (col.name.toLocaleLowerCase().indexOf('ra') > -1) {
          return col;
        }
      }
      return null;
    },
    getDecColumn: function () {
      const $enum1 = ss.enumerate(ss.keys(this.columns));
      while ($enum1.moveNext()) {
        let key = $enum1.current;
        let col = this.columns[key];
        if (col.ucd.toLowerCase().indexOf('pos.eq.dec') > -1 || col.ucd.toLowerCase().indexOf('pos_eq_dec') > -1) {
          return col;
        }
      }
      const $enum2 = ss.enumerate(ss.keys(this.columns));
      while ($enum2.moveNext()) {
        let key = $enum2.current;
        let col = this.columns[key];
        if (col.name.toLowerCase().indexOf('dec') > -1) {
          return col;
        }
      }
      return null;
    },
    getDistanceColumn: function () {
      const $enum1 = ss.enumerate(ss.keys(this.columns));
      while ($enum1.moveNext()) {
        const key = $enum1.current;
        const col = this.columns[key];
        if (col.ucd.toLowerCase().indexOf('pos.distance') > -1 || col.ucd.toLowerCase().indexOf('pos_distance') > -1) {
          return col;
        }
      }
      return null;
    },
    toString: function () {
      const sb = new ss.StringBuilder();
      let first = true;
      const $enum1 = ss.enumerate(ss.keys(this.columns));
      while ($enum1.moveNext()) {
        const key = $enum1.current;
        let col = this.columns[key];
        if (first) {
          first = false;
        } else {
          sb.append('\t');
        }
        sb.append(col.name);
      }
      sb.appendLine('');
      const $enum2 = ss.enumerate(this.rows);
      while ($enum2.moveNext()) {
        const row = $enum2.current;
        first = true;
        const $enum3 = ss.enumerate(row.columnData);
        while ($enum3.moveNext()) {
          let col = $enum3.current;
          if (first) {
            first = false;
          } else {
            sb.append('\t');
          }
          sb.append(col.toString());
        }
        sb.appendLine('');
      }
      return sb.toString();
    }
  };

  function VoRow(owner) {
    this.selected = false;
    this.owner = owner;
  }
  const VoRow$ = {
    getColumnData: function (key) {
      if (this.owner.columns[key] != null) {
        return this.columnData[this.owner.columns[key].index];
      }
      return null;
    },
    get_item: function (index) {
      if (index < 0 || index >= this.columnData.length) {
        return null;
      }
      return this.columnData[index];
    }
  };

  function VoColumn(node, index) {
    this.id = '';
    this.type = 0;
    this.precision = 0;
    this.dimentions = 0;
    this.sizes = null;
    this.ucd = '';
    this.unit = '';
    this.name = '';
    this.index = 0;
    this.index = index;
    if (node.attributes.getNamedItem('datatype') != null) {
      this.type = VoColumn.getType(node.attributes.getNamedItem('datatype').nodeValue);
    }
    if (node.attributes.getNamedItem('ucd') != null) {
      this.ucd = node.attributes.getNamedItem('ucd').nodeValue;
    }
    if (node.attributes.getNamedItem('precision') != null) {
      try {
        this.precision = parseInt(node.attributes.getNamedItem('precision').nodeValue);
      }
      catch ($e1) {
      }
    }
    if (node.attributes.getNamedItem('ID') != null) {
      this.id = node.attributes.getNamedItem('ID').nodeValue;
    }
    if (node.attributes.getNamedItem('name') != null) {
      this.name = node.attributes.getNamedItem('name').nodeValue;
    }
    else {
      this.name = this.id;
    }
    if (node.attributes.getNamedItem('unit') != null) {
      this.unit = node.attributes.getNamedItem('unit').nodeValue;
    }
    if (node.attributes.getNamedItem('arraysize') != null) {
      const split = node.attributes.getNamedItem('arraysize').nodeValue.split('x');
      this.dimentions = split.length;
      this.sizes = new Array(split.length);
      let indexer = 0;
      const $enum2 = ss.enumerate(split);
      while ($enum2.moveNext()) {
        const dim = $enum2.current;
        if (!(dim.indexOf('*') > -1)) {
          this.sizes[indexer++] = parseInt(dim);
        }
        else {
          let len = 9999;
          const lenString = ss.replaceString(dim, '*', '');
          if (lenString.length > 0) {
            len = parseInt(lenString);
          }
          this.sizes[indexer++] = len;
        }
      }
    }
  }
  VoColumn.getType = type => {
    let Type = 13;
    switch (type) {
      case 'boolean':
        Type = 1;
        break;
      case 'bit':
        Type = 2;
        break;
      case 'unsignedByte':
        Type = 3;
        break;
      case 'short':
        Type = 4;
        break;
      case 'int':
        Type = 5;
        break;
      case 'long':
        Type = 6;
        break;
      case 'char':
        Type = 7;
        break;
      case 'unicodeChar':
        Type = 8;
        break;
      case 'float':
        Type = 9;
        break;
      case 'double':
        Type = 10;
        break;
      case 'floatComplex':
        Type = 11;
        break;
      case 'doubleComplex':
        Type = 12;
        break;
      default:
        Type = 13;
        break;
    }
    return Type;
  };
  const VoColumn$ = {
    toString: function () {
      return this.name;
    }
  };

  function WcsImage() {
    this.copyright = '';
    this.creditsUrl = '';
    this._validWcs = false;
    this.keywords = [];
    this.description = '';
    this.scaleX = 0;
    this.scaleY = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.rotation = 0;
    this.referenceX = 0;
    this.referenceY = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    this.cd1_1 = 0;
    this.cd1_2 = 0;
    this.cd2_1 = 0;
    this.cd2_2 = 0;
    this.hasRotation = false;
    this.hasSize = false;
    this.hasScale = false;
    this.hasLocation = false;
    this.hasPixel = false;
    this.filename = '';
    this._colorCombine = false;
  }
  const WcsImage$ = {
    get_copyright: function () {
      return this.copyright;
    },
    set_copyright: function (value) {
      this.copyright = value;
      return value;
    },
    get_creditsUrl: function () {
      return this.creditsUrl;
    },
    set_creditsUrl: function (value) {
      this.creditsUrl = value;
      return value;
    },
    get_validWcs: function () {
      return this._validWcs;
    },
    set_validWcs: function (value) {
      this._validWcs = value;
      return value;
    },
    get_keywords: function () {
      if (!this.keywords.length) {
        this.keywords.push('Image File');
      }
      return this.keywords;
    },
    set_keywords: function (value) {
      this.keywords = value;
      return value;
    },
    get_description: function () {
      return this.description;
    },
    set_description: function (value) {
      this.description = value;
      return value;
    },
    get_scaleX: function () {
      return this.scaleX;
    },
    set_scaleX: function (value) {
      this.scaleX = value;
      return value;
    },
    get_scaleY: function () {
      return this.scaleY;
    },
    set_scaleY: function (value) {
      this.scaleY = value;
      return value;
    },
    get_centerX: function () {
      return this.centerX;
    },
    set_centerX: function (value) {
      this.centerX = value;
      return value;
    },
    get_centerY: function () {
      return this.centerY;
    },
    set_centerY: function (value) {
      this.centerY = value;
      return value;
    },
    get_rotation: function () {
      return this.rotation;
    },
    set_rotation: function (value) {
      this.rotation = value;
      return value;
    },
    get_referenceX: function () {
      return this.referenceX;
    },
    set_referenceX: function (value) {
      this.referenceX = value;
      return value;
    },
    get_referenceY: function () {
      return this.referenceY;
    },
    set_referenceY: function (value) {
      this.referenceY = value;
      return value;
    },
    get_sizeX: function () {
      return this.sizeX;
    },
    set_sizeX: function (value) {
      this.sizeX = value;
      return value;
    },
    get_sizeY: function () {
      return this.sizeY;
    },
    set_sizeY: function (value) {
      this.sizeY = value;
      return value;
    },
    get_cd1_1: function () {
      return this.cd1_1;
    },
    set_cd1_1: function (value) {
      this.cd1_1 = value;
      return value;
    },
    get_cd1_2: function () {
      return this.cd1_2;
    },
    set_cd1_2: function (value) {
      this.cd1_2 = value;
      return value;
    },
    get_cd2_1: function () {
      return this.cd2_1;
    },
    set_cd2_1: function (value) {
      this.cd2_1 = value;
      return value;
    },
    get_cd2_2: function () {
      return this.cd2_2;
    },
    set_cd2_2: function (value) {
      this.cd2_2 = value;
      return value;
    },
    adjustScale: function (width, height) {
      if (width !== this.sizeX) {
        this.scaleX *= (this.sizeX / width);
        this.referenceX /= (this.sizeX / width);
        this.sizeX = width;
      }
      if (height !== this.sizeY) {
        this.scaleY *= (this.sizeY / height);
        this.referenceY /= (this.sizeY / height);
        this.sizeY = height;
      }
    },
    calculateScaleFromCD: function () {
      this.scaleX = (Math.sqrt(this.cd1_1 * this.cd1_1 + this.cd2_1 * this.cd2_1) * (this.cd1_1 * this.cd2_2 - this.cd1_2 * this.cd2_1) < 0) ? -1 : 1;
      this.scaleY = Math.sqrt(this.cd1_2 * this.cd1_2 + this.cd2_2 * this.cd2_2);
    },
    calculateRotationFromCD: function () {
      const sign = ((this.cd1_1 * this.cd2_2 - this.cd1_2 * this.cd2_1) < 0) ? -1 : 1;
      const rot2 = Math.atan2((-sign * this.cd1_2), this.cd2_2);
      this.rotation = rot2 / Math.PI * 180;
    },
    get_filename: function () {
      return this.filename;
    },
    set_filename: function (value) {
      this.filename = value;
      return value;
    },
    get_colorCombine: function () {
      return this._colorCombine;
    },
    set_colorCombine: function (value) {
      this._colorCombine = value;
      return value;
    }
  };

  function BodyAngles(poleRa, poleDec, primeMeridian, rotationRate) {
    this.poleDec = 0;
    this.poleRa = 0;
    this.primeMeridian = 0;
    this.rotationRate = 0;
    this.poleDec = poleDec;
    this.poleRa = poleRa;
    this.primeMeridian = primeMeridian;
    this.rotationRate = rotationRate;
  }
  const BodyAngles$ = {};

  function Material() {
    this.specularSharpness = 0;
    this.opacity = 0;
    this.isDefault = false;
  }
  const Material$ = {};

  function Text3dBatch(height) {
    this.height = 128;
    this.items = [];
    this._glyphVersion = -1;
    this.viewTransform = Matrix3d.get_identity();
    this._textObject = new TextObject();
    this._vertCount = 0;
    this.height = (height * 3);
  }
  const Text3dBatch$ = {
    add: function (newItem) {
      this.items.push(newItem);
    },
    draw: function (renderContext, opacity, color) {
      if (renderContext.gl == null) {
        const viewPoint = Vector3d._transformCoordinate(renderContext.get_viewPoint(), this.viewTransform);
        const drawHeight = (this.height / renderContext.get_fovAngle()) * renderContext.height / 180;
        const $enum1 = ss.enumerate(this.items);
        while ($enum1.moveNext()) {
          const t3d = $enum1.current;
          const screenSpacePnt = renderContext.WVP.transform(t3d.center);
          if (screenSpacePnt.z < 0) {
            continue;
          }
          if (Vector3d.dot(viewPoint, t3d.center) < 0.55) {
            continue;
          }
          const screenSpaceTop = renderContext.WVP.transform(t3d.top);
          const rotation = Math.atan2(screenSpacePnt.x - screenSpaceTop.x, screenSpacePnt.y - screenSpaceTop.y);
          const ctx = renderContext.device;
          ctx.save();
          ctx.translate(screenSpacePnt.x, screenSpacePnt.y);
          ctx.rotate(-rotation);
          ctx.globalAlpha = opacity;
          ctx.fillStyle = color.toString();
          ctx.font = 'normal' + ' ' + ((false) ? 'bold' : 'normal') + ' ' + Math.round(drawHeight * 1.2).toString() + 'px ' + 'Arial';
          ctx.textBaseline = 'top';
          const tm = ctx.measureText(t3d.text);
          ctx.fillText(t3d.text, -tm.width / 2, -drawHeight / 2);
          ctx.restore();
        }
      } else {
        if (this._glyphCache == null || this._glyphCache.get_version() > this._glyphVersion) {
          this.prepareBatch();
        }
        if (!this._glyphCache.ready) {
          return;
        }
        TextShader.use(renderContext, this._vertexBuffer.vertexBuffer, this._glyphCache.get_texture().texture2d);
        renderContext.gl.drawArrays(4, 0, this._vertexBuffer.count);
      }
    },
    prepareBatch: function () {
      if (this._glyphCache == null) {
        this._glyphCache = GlyphCache.getCache(this.height);
      }
      if (!this._glyphCache.ready) {
        return;
      }
      this._textObject.text = '';
      this._textObject.fontSize = this.height * 0.5;
      const verts = [];
      const $enum1 = ss.enumerate(this.items);
      while ($enum1.moveNext()) {
        const t3d = $enum1.current;
        const text = t3d.text;
        let left = 0;
        const top = 0;
        const fntAdjust = this._textObject.fontSize / 128;
        const factor = 0.6666;
        let width = 0;
        let height = 0;
        for (let i = 0; i < text.length; i++) {
          var item = this._glyphCache.getGlyphItem(text.substr(i, 1));
          if (item != null) {
            width += item.extents.x;
            height = Math.max(item.extents.y, height);
          }
        }
        const size = Vector2d.create(width, height);
        t3d.width = size.x * t3d.scale * factor * fntAdjust;
        t3d.height = size.y * t3d.scale * factor * fntAdjust;
        const charsLeft = text.length;
        for (let i = 0; i < charsLeft; i++) {
          var item = this._glyphCache.getGlyphItem(text.substr(i, 1));
          if (item != null) {
            const position = Rectangle.create(left * t3d.scale * factor, 0 * t3d.scale * factor, item.extents.x * fntAdjust * t3d.scale * factor, item.extents.y * fntAdjust * t3d.scale * factor);
            left += (item.extents.x * fntAdjust);
            t3d.addGlyphPoints(verts, item.size, position, item.uvRect);
          }
        }
      }
      this._vertCount = verts.length;
      this._vertexBuffer = new PositionTextureVertexBuffer(this._vertCount);
      const vertBuf = this._vertexBuffer.lock();
      for (let i = 0; i < this._vertCount; i++) {
        vertBuf[i] = verts[i];
      }
      this._vertexBuffer.unlock();
      this._glyphVersion = this._glyphCache.get_version();
    },
    cleanUp: function () {
      if (this._vertexBuffer != null) {
        this._vertexBuffer = null;
      }
      this.items.length = 0;
    }
  };

  function GlyphItem(glyph) {
    this.referenceCount = 0;
    this.glyph = glyph;
    this.uvRect = new Rectangle();
    this.size = new Vector2d();
    this.referenceCount = 1;
  }
  GlyphItem.create = (glyph, uv, size, extents) => {
    const temp = new GlyphItem(glyph);
    temp.glyph = glyph;
    temp.uvRect = uv;
    temp.size = size;
    temp.extents = extents;
    temp.referenceCount = 1;
    return temp;
  };
  GlyphItem._fromXML = node => {
    const glyph = node.attributes.getNamedItem('Glyph').nodeValue;
    const item = new GlyphItem(glyph);
    item.uvRect = Rectangle.create(parseFloat(node.attributes.getNamedItem('UVLeft').nodeValue), parseFloat(node.attributes.getNamedItem('UVTop').nodeValue), parseFloat(node.attributes.getNamedItem('UVWidth').nodeValue), parseFloat(node.attributes.getNamedItem('UVHeight').nodeValue));
    item.size = Vector2d.create(parseFloat(node.attributes.getNamedItem('SizeWidth').nodeValue), parseFloat(node.attributes.getNamedItem('SizeHeight').nodeValue));
    item.extents = Vector2d.create(parseFloat(node.attributes.getNamedItem('ExtentsWidth').nodeValue), parseFloat(node.attributes.getNamedItem('ExtentsHeight').nodeValue));
    return item;
  };
  const GlyphItem$ = {
    addRef: function () {
      this.referenceCount++;
    },
    release: function () {
      this.referenceCount--;
    }
  };

  function GlyphCache(height) {
    this._cellHeight = 128;
    this._gridSize = 8;
    this.ready = false;
    this._glyphItems = {};
    this.textObject = new TextObject();
    this._dirty = true;
    this._textureDirty = true;
    this._version = 0;
    this._cellHeight = height;
    this._texture = Planets.loadPlanetTexture('//cdn.worldwidetelescope.org/webclient/images/glyphs1.png');
    this._webFile = new WebFile('//cdn.worldwidetelescope.org/webclient/images/glyphs1.xml');
    this._webFile.onStateChange = ss.bind('_glyphXmlReady', this);
    this._webFile.send();
  }
  GlyphCache.getCache = height => {
    if (!ss.keyExists(GlyphCache._caches, height)) {
      GlyphCache._caches[height] = new GlyphCache(height);
    }
    return GlyphCache._caches[height];
  };
  GlyphCache.cleanUpAll = () => {
    ss.clearKeys(GlyphCache._caches);
  };
  const GlyphCache$ = {
    get_height: function () {
      return this._cellHeight;
    },
    _glyphXmlReady: function () {
      if (this._webFile.get_state() === 2) {
        alert(this._webFile.get_message());
      } else if (this._webFile.get_state() === 1) {
        this._loadXmlGlyph(this._webFile.getXml());
      }
    },
    _loadXmlGlyph: function (xml) {
      const nodes = Util.selectSingleNode(xml, 'GlyphItems');
      const $enum1 = ss.enumerate(nodes.childNodes);
      while ($enum1.moveNext()) {
        const glyphItem = $enum1.current;
        if (glyphItem.nodeName === 'GlyphItem') {
          const item = GlyphItem._fromXML(glyphItem);
          this._glyphItems[item.glyph] = item;
          GlyphCache._allGlyphs = GlyphCache._allGlyphs + item.glyph;
        }
      }
      this.ready = true;
    },
    get_texture: function () {
      return this._texture;
    },
    _makeTexture: function () {
      this._calcOrMake(true);
    },
    getGlyphItem: function (glyph) {
      if (this._dirty) {
        this._calculateGlyphDetails();
      }
      return this._glyphItems[glyph];
    },
    _calculateGlyphDetails: function () {
      this._calcOrMake(false);
    },
    _calcOrMake: makeTexture => {
    },
    get_version: function () {
      return this._version;
    },
    set_version: function (value) {
      this._version = value;
      return value;
    },
    addGlyph: function (glyph) {
      if (!ss.keyExists(this._glyphItems, glyph)) {
        const item = new GlyphItem(glyph);
        this._glyphItems[glyph] = item;
        this._dirty = true;
        this._textureDirty = true;
        this._version++;
        GlyphCache._allGlyphs = GlyphCache._allGlyphs + glyph;
      } else {
        this._glyphItems[glyph].addRef();
      }
    },
    cleanUp: function () {
      this._dirty = true;
      this._texture = null;
    },
    dispose: function () {
      this.cleanUp();
    },
    get_dirty: function () {
      return this._dirty;
    },
    set_dirty: function (value) {
      this._dirty = value;
      return value;
    }
  };

  function Text3d(center, up, text, fontsize, scale) {
    this.rotation = 0;
    this.tilt = 0;
    this.bank = 0;
    this._matInit = false;
    this.color = Colors.get_white();
    this.sky = true;
    this.scale = 0;
    this.opacity = 1;
    this.text = '';
    this.width = 1;
    this.height = 1;
    this.alignment = 0;
    this.text = text;
    this.up = up;
    this.center = center;
    this.scale = scale;
    this.top = Vector3d.addVectors(center, Vector3d.scale(up, scale));
    if (fontsize < 0) {
      this.sky = false;
    }
  }
  const Text3d$ = {
    addGlyphPoints: function (pointList, size, position, uv) {
      const points = new Array(6);
      for (let i = 0; i < 6; i++) {
        points[i] = new PositionTexture();
      }
      const left = Vector3d.cross(this.center, this.up);
      const right = Vector3d.cross(this.up, this.center);
      left.normalize();
      right.normalize();
      this.up.normalize();
      const upTan = Vector3d.cross(this.center, right);
      upTan.normalize();
      if (!this.alignment) {
        left.multiply(this.width - position.get_left() * 2);
        right.multiply(this.width - ((this.width * 2) - position.get_right() * 2));
      } else if (this.alignment === 1) {
        left.multiply(-position.get_left() * 2);
        right.multiply(position.get_right() * 2);
      }
      const top = upTan.copy();
      const bottom = Vector3d.subtractVectors(Vector3d.get_empty(), upTan);
      top.multiply(this.height - position.get_top() * 2);
      bottom.multiply(this.height - ((this.height * 2) - position.get_bottom() * 2));
      const ul = this.center.copy();
      ul.add(top);
      if (this.sky) {
        ul.add(left);
      } else {
        ul.subtract(left);
      }
      const ur = this.center.copy();
      ur.add(top);
      if (this.sky) {
        ur.add(right);
      } else {
        ur.subtract(right);
      }
      const ll = this.center.copy();
      if (this.sky) {
        ll.add(left);
      } else {
        ll.subtract(left);
      }
      ll.add(bottom);
      const lr = this.center.copy();
      if (this.sky) {
        lr.add(right);
      } else {
        lr.subtract(right);
      }
      lr.add(bottom);
      points[0].position = ul.copy();
      points[0].tu = uv.get_left();
      points[0].tv = uv.get_top();
      points[2].tu = uv.get_left();
      points[2].tv = uv.get_bottom();
      points[2].position = ll.copy();
      points[1].tu = uv.get_right();
      points[1].tv = uv.get_top();
      points[1].position = ur.copy();
      points[3].tu = uv.get_right();
      points[3].tv = uv.get_bottom();
      points[3].position = lr.copy();
      points[5].tu = uv.get_right();
      points[5].tv = uv.get_top();
      points[5].position = ur.copy();
      points[4].tu = uv.get_left();
      points[4].tv = uv.get_bottom();
      points[4].position = ll.copy();
      if (!!this.rotation || !!this.tilt || !!this.bank) {
        if (!this._matInit) {
          const lookAt = Matrix3d.lookAtLH(this.center, new Vector3d(), this.up);
          const lookAtInv = lookAt.clone();
          lookAtInv.invert();
          this._rtbMat = Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(lookAt, Matrix3d._rotationZ(-this.rotation / 180 * Math.PI)), Matrix3d._rotationX(-this.tilt / 180 * Math.PI)), Matrix3d._rotationY(-this.bank / 180 * Math.PI)), lookAtInv);
          this._matInit = true;
        }
        for (let i = 0; i < 6; i++) {
          points[i].position = Vector3d._transformCoordinate(points[i].position, this._rtbMat);
        }
      }
      const $enum1 = ss.enumerate(points);
      while ($enum1.moveNext()) {
        const pnt = $enum1.current;
        pointList.push(pnt);
      }
    }
  };

  function Galaxy(br) {
    this.RA = 0;
    this.dec = 0;
    this.distance = 0;
    this.type = 0;
    this.eTypeBucket = 0;
    this.size = 5;
    this.sdssID = 0;
    this.sdssID = br.readInt64();
    this.RA = br.readSingle();
    this.dec = br.readSingle();
    this.distance = br.readSingle();
    this.eTypeBucket = br.readByte();
    this.size = br.readSingle();
  }
  Galaxy.getEType = value => {
    let a = 0;
    let b = Galaxy._eTypeBuckets.length - 1;
    while (b - a > 1) {
      const m = (a + b) / 2;
      if (value > Galaxy._eTypeBuckets[m]) {
        a = m;
      }
      else {
        b = m;
      }
    }
    return a;
  };
  const Galaxy$ = {};

  function Tour() {
    this.userLevel = 0;
    this.classification = 0;
    this.averageRating = 0;
    this.lengthInSecs = 0;
    this._thumbnailUrlField = '';
  }
  Tour._fromXml = child => {
    const temp = new Tour();
    if (child.attributes.getNamedItem('ID') != null) {
      temp.id = child.attributes.getNamedItem('ID').nodeValue;
    }
    if (child.attributes.getNamedItem('TourUrl') != null) {
      temp._tourUrl = child.attributes.getNamedItem('TourUrl').nodeValue;
    }
    if (child.attributes.getNamedItem('Title') != null) {
      temp.title = child.attributes.getNamedItem('Title').nodeValue;
    }
    if (child.attributes.getNamedItem('Description') != null) {
      temp.description = child.attributes.getNamedItem('Description').nodeValue;
    }
    if (child.attributes.getNamedItem('Classification') != null) {
      temp.classification = Enums.parse('Classification', child.attributes.getNamedItem('Classification').nodeValue);
    }
    if (child.attributes.getNamedItem('AuthorEmail') != null) {
      temp.authorEmail = child.attributes.getNamedItem('AuthorEmail').nodeValue;
    }
    if (child.attributes.getNamedItem('Author') != null) {
      temp.author = child.attributes.getNamedItem('Author').nodeValue;
    }
    if (child.attributes.getNamedItem('AuthorURL') != null) {
      temp.authorURL = child.attributes.getNamedItem('AuthorURL').nodeValue;
    }
    if (child.attributes.getNamedItem('AuthorImageUrl') != null) {
      temp.authorImageUrl = child.attributes.getNamedItem('AuthorImageUrl').nodeValue;
    }
    if (child.attributes.getNamedItem('AverageRating') != null) {
      temp.averageRating = parseFloat(child.attributes.getNamedItem('AverageRating').nodeValue);
    }
    if (child.attributes.getNamedItem('LengthInSecs') != null) {
      temp.lengthInSecs = parseFloat(child.attributes.getNamedItem('LengthInSecs').nodeValue);
    }
    if (child.attributes.getNamedItem('OrganizationUrl') != null) {
      temp.organizationUrl = child.attributes.getNamedItem('OrganizationUrl').nodeValue;
    }
    if (child.attributes.getNamedItem('OrganizationName') != null) {
      temp.organizationName = child.attributes.getNamedItem('OrganizationName').nodeValue;
    }
    if (child.attributes.getNamedItem('RelatedTours') != null) {
      temp.relatedTours = child.attributes.getNamedItem('RelatedTours').nodeValue;
    }
    if (child.attributes.getNamedItem('Keywords') != null) {
      temp.keywords = child.attributes.getNamedItem('Keywords').nodeValue;
    }
    if (child.attributes.getNamedItem('ThumbnailUrl') != null) {
      temp.set_thumbnailUrl(child.attributes.getNamedItem('ThumbnailUrl').nodeValue);
    }
    return temp;
  };
  const Tour$ = {
    get_name: function () {
      return this.title;
    },
    get_thumbnail: function () {
      return this._thumbnail;
    },
    set_thumbnail: function (value) {
      this._thumbnail = value;
      return value;
    },
    get_thumbnailUrl: function () {
      if (!ss.emptyString(this._thumbnailUrlField)) {
        return this._thumbnailUrlField;
      } else {
        return ss.format('//worldwidetelescope.org/wwtweb/GetTourThumbnail.aspx?GUID={0}', this.id);
      }
    },
    set_thumbnailUrl: function (value) {
      this._thumbnailUrlField = value;
      return value;
    },
    get_tourUrl: function () {
      if (ss.emptyString(this._tourUrl)) {
        return ss.format('//cdn.worldwidetelescope.org/wwtweb/GetTour.aspx?GUID={0}', this.id);
      } else {
        return this._tourUrl;
      }
    },
    set_tourUrl: function (value) {
      this._tourUrl = value;
      return value;
    },
    get_bounds: function () {
      return this._bounds;
    },
    set_bounds: function (value) {
      this._bounds = value;
      return value;
    },
    get_isImage: () => false,
    get_isTour: () => true,
    get_isFolder: () => false,
    get_isCloudCommunityItem: () => false,
    get_readOnly: () => false,
    get_children: () => []
  };

  function FileEntry(filename, size) {
    this.size = 0;
    this.offset = 0;
    this.filename = filename;
    this.size = size;
  }
  const FileEntry$ = {
    toString: function () {
      return this.filename;
    }
  };

  function FileCabinet() {
    this.tempDirectory = '';
    this._currentOffset = 0;
    this._packageID = '';
    this.url = '';
    this.clearFileList();
  }
  FileCabinet.fromUrl = (url, callMe) => {
    const temp = new FileCabinet();
    temp.url = url;
    temp._callMe = callMe;
    temp._webFile = new WebFile(url);
    temp._webFile.responseType = 'blob';
    temp._webFile.onStateChange = ss.bind('_loadCabinet', temp);
    temp._webFile.send();
    return temp;
  };
  const FileCabinet$ = {
    get_packageID: function () {
      return this._packageID;
    },
    set_packageID: function (value) {
      this._packageID = value;
      return value;
    },
    addFile: function (filename, data) {
      if (data == null) {
        return;
      }
      if (!ss.keyExists(this._fileDirectory, filename)) {
        const fe = new FileEntry(filename, data.size);
        fe.offset = this._currentOffset;
        fe.blob = data;
        this.fileList.push(fe);
        this._fileDirectory[filename] = fe;
        this._currentOffset += fe.size;
      }
    },
    clearFileList: function () {
      if (this.fileList == null) {
        this.fileList = [];
      }
      if (this._fileDirectory == null) {
        this._fileDirectory = {};
      }
      this.fileList.length = 0;
      ss.clearKeys(this._fileDirectory);
      this._currentOffset = 0;
    },
    packageFiles: function () {
      const xmlWriter = new XmlTextWriter();
      xmlWriter.formatting = 1;
      xmlWriter._writeProcessingInstruction('xml', 'version=\'1.0\' encoding=\'UTF-8\'');
      xmlWriter._writeStartElement('FileCabinet');
      xmlWriter._writeAttributeString('HeaderSize', '0x0BADFOOD');
      xmlWriter._writeStartElement('Files');
      const $enum1 = ss.enumerate(this.fileList);
      while ($enum1.moveNext()) {
        var entry = $enum1.current;
        xmlWriter._writeStartElement('File');
        xmlWriter._writeAttributeString('Name', entry.filename);
        xmlWriter._writeAttributeString('Size', entry.size.toString());
        xmlWriter._writeAttributeString('Offset', entry.offset.toString());
        xmlWriter._writeEndElement();
      }
      xmlWriter._writeEndElement();
      xmlWriter._writeFullEndElement();
      xmlWriter._close();
      let data = xmlWriter.body;
      let blob = new Blob([data]);
      const sizeText = ss.format('0x{0:x8}', blob.size);
      data = ss.replaceString(data, '0x0BADFOOD', sizeText);
      blob = new Blob([data]);
      const blobs = [];
      blobs.push(blob);
      const $enum2 = ss.enumerate(this.fileList);
      while ($enum2.moveNext()) {
        var entry = $enum2.current;
        blobs.push(entry.blob);
      }
      const cabBlob = new Blob(blobs, {type: 'application/x-wtt'});
      ;
      return cabBlob;
    },
    _loadCabinet: function () {
      const $this = this;

      if (this._webFile.get_state() === 2) {
        alert(this._webFile.get_message());
      } else if (this._webFile.get_state() === 1) {
        this._mainBlob = this._webFile.getBlob();
        const chunck = new FileReader();
        chunck.onloadend = e => {
          const offset = $this._getSize(chunck.result);
          const header = new FileReader();
          header.onloadend = ee => {
            const data = ss.safeCast(header.result, String);
            const xParser = new DOMParser();
            $this.extract(xParser.parseFromString(data, 'text/xml'), offset);
            $this._callMe();
          };
          header.readAsText($this._mainBlob.slice(0, offset));
        };
        chunck.readAsText(this._mainBlob.slice(0, 255));
      }
    },
    _getSize: data => {
      const start = data.indexOf('0x');
      if (start === -1) {
        return 0;
      }
      return parseInt(data.substring(start, start + 10), 16);
    },
    extract: function (doc, offset) {
      try {
        const cab = Util.selectSingleNode(doc, 'FileCabinet');
        const files = Util.selectSingleNode(cab, 'Files');
        this.fileList.length = 0;
        const $enum1 = ss.enumerate(files.childNodes);
        while ($enum1.moveNext()) {
          const child = $enum1.current;
          if (child.nodeName === 'File') {
            const fe = new FileEntry(child.attributes.getNamedItem('Name').nodeValue, parseInt(child.attributes.getNamedItem('Size').nodeValue));
            fe.offset = offset;
            offset += fe.size;
            this.fileList.push(fe);
          }
        }
      } catch ($e2) {
      }
    },
    getFileBlob: function (filename) {
      const fe = this.getFileEntry(filename);
      if (fe != null) {
        const ext = filename.substr(filename.lastIndexOf('.')).toLowerCase();
        let type = null;
        switch (ext) {
          case '.png':
            type = 'image/png';
            break;
          case '.jpg':
          case '.jpeg':
            type = 'image/jpeg';
            break;
          case '.mp3':
            type = 'audio/mpeg3';
            break;
          case '.txt':
            type = 'text/plain';
            break;
          case '.fit':
          case '.fits':
            type = 'application/octet-stream';
            break;
        }
        return this._mainBlob.slice(fe.offset, fe.offset + fe.size, type);
      }
      return null;
    },
    getFileEntry: function (filename) {
      const $enum1 = ss.enumerate(this.fileList);
      while ($enum1.moveNext()) {
        const entry = $enum1.current;
        if (entry.filename === filename) {
          return entry;
        }
      }
      return null;
    },
    get_masterFile: function () {
      if (this.fileList.length > 0) {
        return this.fileList[0].filename;
      } else {
        return null;
      }
    },
    clearTempFiles: function () {
      const $enum1 = ss.enumerate(this.fileList);
      while ($enum1.moveNext()) {
        const entry = $enum1.current;
      }
    }
  };

  function Overlay() {
    this.isDynamic = false;
    this.isDesignTimeOnly = false;
    this._name = '';
    this.id = (Overlay.nextId++).toString();
    this._owner = null;
    this._url = '';
    this._linkID = '';
    this._domeMatrix = Matrix3d.get_identity();
    this._domeMatX = 0;
    this._domeMatY = 0;
    this._domeAngle = 0;
    this.points = null;
    this._animate = false;
    this._tweenFactor = 0;
    this._endX = 0;
    this._endY = 0;
    this._endOpacity = 0;
    this._endColor = new Color();
    this._endWidth = 0;
    this._endHeight = 0;
    this._endRotationAngle = 0;
    this._anchor = 1;
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    this._color = Colors.get_white();
    this._opacity = 0.5;
    this._rotationAngle = 0;
    this.currentRotation = 0;
    this.texture = null;
    this.texture2d = null;
    this._interpolationType = 5;
  }
  Overlay._fromXml = (owner, overlay) => {
    if (overlay.attributes == null) {
      return null;
    }
    if (overlay.attributes.getNamedItem('Type') == null) {
      return null;
    }
    const overlayClassName = overlay.attributes.getNamedItem('Type').nodeValue;
    const overLayType = ss.replaceString(overlayClassName, 'TerraViewer.', '');
    let newOverlay = null;
    switch (overLayType) {
      case 'AudioOverlay':
        newOverlay = new AudioOverlay();
        break;
      case 'BitmapOverlay':
        newOverlay = new BitmapOverlay();
        break;
      case 'FlipBookOverlay':
        newOverlay = new FlipbookOverlay();
        break;
      case 'ShapeOverlay':
        newOverlay = new ShapeOverlay();
        break;
      case 'TextOverlay':
        newOverlay = new TextOverlay();
        break;
      default:
        return null;
    }
    newOverlay._owner = owner;
    newOverlay._initOverlayFromXml(overlay);
    return newOverlay;
  };
  const Overlay$ = {
    get_name: function () {
      return this._name;
    },
    set_name: function (value) {
      this._name = value;
      return value;
    },
    get_owner: function () {
      return this._owner;
    },
    set_owner: function (value) {
      this._owner = value;
      return value;
    },
    get_zOrder: function () {
      let index = 0;
      const $enum1 = ss.enumerate(this._owner.get_overlays());
      while ($enum1.moveNext()) {
        const item = $enum1.current;
        if (item === this) {
          break;
        }
        index++;
      }
      return index;
    },
    get_url: function () {
      return this._url;
    },
    set_url: function (value) {
      this._url = value;
      return value;
    },
    get_linkID: function () {
      return this._linkID;
    },
    set_linkID: function (value) {
      this._linkID = value;
      return value;
    },
    play: () => {
    },
    pause: () => {
    },
    stop: () => {
    },
    seek: time => {
    },
    makePosition: function (centerX, centerY, offsetX, offsetY, angle) {
      centerX -= 960;
      centerY -= 558;
      let point = Vector3d.create(centerX + offsetX, centerY + offsetY, 1347);
      if (!!this._domeMatX || !!this._domeMatY || this._domeAngle !== angle) {
        this._domeMatX = centerX;
        this._domeMatY = centerY;
        this._domeMatrix = Matrix3d.translation(Vector3d.create(-centerX, -centerY, 0));
        this._domeMatrix._multiply(Matrix3d._rotationZ((angle / 180 * Math.PI)));
        this._domeMatrix._multiply(Matrix3d.translation(Vector3d.create(centerX, centerY, 0)));
      }
      point = Vector3d._transformCoordinate(point, this._domeMatrix);
      return point;
    },
    draw3D: function (renderContext, designTime) {
      if (RenderContext.useGl) {
        if (this.texture == null || this.isDynamic) {
          this.initializeTexture();
        }
        if (!this.isDesignTimeOnly || designTime) {
          this.initiaizeGeometry();
          this.updateRotation();
        }
      } else {
      }
    },
    cleanUp: function () {
      if (this.texture != null) {
        this.texture = null;
      }
      this.texture2d = null;
    },
    initializeTexture: () => {
    },
    cleanUpGeometry: function () {
      this.currentRotation = 0;
      this.points = null;
    },
    initiaizeGeometry: function () {
      if (this.points == null) {
        this.currentRotation = 0;
        this.points = new Array(4);
        this.points[0] = new PositionColoredTextured();
        this.points[0].position = this.makePosition(this.get_x(), this.get_y(), -this.get_width() / 2, -this.get_height() / 2, this.get_rotationAngle());
        this.points[0].tu = 0;
        this.points[0].tv = 0;
        this.points[0].color = this.get_color();
        this.points[1] = new PositionColoredTextured();
        this.points[1].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 2, -this.get_height() / 2, this.get_rotationAngle());
        this.points[1].tu = 1;
        this.points[1].tv = 0;
        this.points[1].color = this.get_color();
        this.points[2] = new PositionColoredTextured();
        this.points[2].position = this.makePosition(this.get_x(), this.get_y(), -this.get_width() / 2, this.get_height() / 2, this.get_rotationAngle());
        this.points[2].tu = 0;
        this.points[2].tv = 1;
        this.points[2].color = this.get_color();
        this.points[3] = new PositionColoredTextured();
        this.points[3].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 2, this.get_height() / 2, this.get_rotationAngle());
        this.points[3].tu = 1;
        this.points[3].tv = 1;
        this.points[3].color = this.get_color();
      }
    },
    updateRotation: () => {
    },
    get_animate: function () {
      return this._animate;
    },
    set_animate: function (value) {
      if (this._animate !== value) {
        this._animate = value;
        if (this._animate) {
          this._endX = this._x;
          this._endY = this._y;
          this._endRotationAngle = this._rotationAngle;
          this._endColor = this._color;
          this._endWidth = this._width;
          this._endHeight = this._height;
          this.cleanUpGeometry();
        } else {
          this._endX = this._x = this.get_x();
          this._endY = this._y = this.get_y();
          this._endRotationAngle = this._rotationAngle = this.get_rotationAngle();
          this._endColor = this._color = this.get_color();
          this._endWidth = this._width = this.get_width();
          this._endHeight = this._height = this.get_height();
          this.cleanUpGeometry();
          this._tweenFactor = 0;
        }
      }
      return value;
    },
    get_tweenFactor: function () {
      return this._tweenFactor;
    },
    set_tweenFactor: function (value) {
      if (!this._animate) {
        this._tweenFactor = 0;
      } else {
        if (this._tweenFactor !== value) {
          this._tweenFactor = value;
          this.cleanUpGeometry();
        }
      }
      return value;
    },
    get_anchor: function () {
      return this._anchor;
    },
    set_anchor: function (value) {
      this._anchor = value;
      return value;
    },
    get_position: function () {
      return Vector2d.create(this.get_x(), this.get_y());
    },
    set_position: function (value) {
      this.set_x(value.x);
      this.set_y(value.y);
      return value;
    },
    get_x: function () {
      return (this._x * (1 - this._tweenFactor)) + (this._endX * this._tweenFactor);
    },
    set_x: function (value) {
      if (this._tweenFactor < 0.5) {
        if (this._x !== value) {
          this._x = value;
          this.cleanUpGeometry();
        }
      } else {
        if (this._endX !== value) {
          this._endX = value;
          this.cleanUpGeometry();
        }
      }
      return value;
    },
    get_y: function () {
      return (this._y * (1 - this._tweenFactor)) + (this._endY * this._tweenFactor);
    },
    set_y: function (value) {
      if (this._tweenFactor < 0.5) {
        if (this._y !== value) {
          this._y = value;
          this.cleanUpGeometry();
        }
      } else {
        if (this._endY !== value) {
          this._endY = value;
          this.cleanUpGeometry();
        }
      }
      return value;
    },
    get_width: function () {
      return (this._width * (1 - this._tweenFactor)) + (this._endWidth * this._tweenFactor);
    },
    set_width: function (value) {
      if (value < 5 && !!value) {
        value = 5;
      }
      if (this._tweenFactor < 0.5) {
        if (this._width !== value) {
          this._width = value;
          this.cleanUpGeometry();
        }
      } else {
        if (this._endWidth !== value) {
          this._endWidth = value;
          this.cleanUpGeometry();
        }
      }
      return value;
    },
    get_height: function () {
      return (this._height * (1 - this._tweenFactor)) + (this._endHeight * this._tweenFactor);
    },
    set_height: function (value) {
      if (value < 5 && !!value) {
        value = 5;
      }
      if (this._tweenFactor < 0.5) {
        if (this._height !== value) {
          this._height = value;
          this.cleanUpGeometry();
        }
      } else {
        if (this._endHeight !== value) {
          this._endHeight = value;
          this.cleanUpGeometry();
        }
      }
      return value;
    },
    get_color: function () {
      const red = ss.truncate(((this._color.r * (1 - this._tweenFactor)) + (this._endColor.r * this._tweenFactor)));
      const green = ss.truncate(((this._color.g * (1 - this._tweenFactor)) + (this._endColor.g * this._tweenFactor)));
      const blue = ss.truncate(((this._color.b * (1 - this._tweenFactor)) + (this._endColor.b * this._tweenFactor)));
      const alpha = ss.truncate(((this._color.a * (1 - this._tweenFactor)) + (this._endColor.a * this._tweenFactor)));
      return Color.fromArgb(Math.max(0, Math.min(255, alpha)), Math.max(0, Math.min(255, red)), Math.max(0, Math.min(255, green)), Math.max(0, Math.min(255, blue)));
    },
    set_color: function (value) {
      if (this._tweenFactor < 0.5) {
        if (this._color !== value) {
          this._color = value;
          this.cleanUpGeometry();
        }
      } else {
        if (this._endColor !== value) {
          this._endColor = value;
          this.cleanUpGeometry();
        }
      }
      return value;
    },
    get_opacity: function () {
      return this.get_color().a / 255;
    },
    set_opacity: function (value) {
      const col = this.get_color();
      this.set_color(Color.fromArgb(Math.min(255, ss.truncate((value * 255))), col.r, col.g, col.b));
      this._opacity = value;
      return value;
    },
    get_rotationAngle: function () {
      return (this._rotationAngle * (1 - this._tweenFactor)) + (this._endRotationAngle * this._tweenFactor);
    },
    set_rotationAngle: function (value) {
      if (this._tweenFactor < 0.5) {
        if (this._rotationAngle !== value) {
          this._rotationAngle = value;
          this.cleanUpGeometry();
        }
      } else {
        if (this._endRotationAngle !== value) {
          this._endRotationAngle = value;
          this.cleanUpGeometry();
        }
      }
      return value;
    },
    hitTest: function (pntTest) {
      const tempPoints = new Array(1);
      tempPoints[0] = Vector2d.create(pntTest.x, pntTest.y);
      const mat = Matrix2d.rotateAt(-this.get_rotationAngle() / 180 * Math.PI, Vector2d.create(this.get_x(), this.get_y()));
      mat._transformPoints(tempPoints);
      const rect = Rectangle.create((this.get_x() - (this.get_width() / 2)), (this.get_y() - (this.get_height() / 2)), this.get_width(), this.get_height());
      return rect.contains(tempPoints[0]);
    },
    get_bounds: function () {
      return this._bounds;
    },
    set_bounds: function (value) {
      this._bounds = value;
      return value;
    },
    get_interpolationType: function () {
      return this._interpolationType;
    },
    set_interpolationType: function (value) {
      this._interpolationType = value;
      return value;
    },
    saveToXml: function (xmlWriter, saveKeys) {
      xmlWriter._writeStartElement('Overlay');
      xmlWriter._writeAttributeString('Id', this.id);
      xmlWriter._writeAttributeString('Type', this.getTypeName());
      xmlWriter._writeAttributeString('Name', this.get_name());
      xmlWriter._writeAttributeString('X', this._x.toString());
      xmlWriter._writeAttributeString('Y', this._y.toString());
      xmlWriter._writeAttributeString('Width', this._width.toString());
      xmlWriter._writeAttributeString('Height', this._height.toString());
      xmlWriter._writeAttributeString('Rotation', this._rotationAngle.toString());
      xmlWriter._writeAttributeString('Color', this._color.save());
      xmlWriter._writeAttributeString('Url', this._url);
      xmlWriter._writeAttributeString('LinkID', this._linkID);
      xmlWriter._writeAttributeString('Animate', this._animate.toString());
      if (this._animate) {
        xmlWriter._writeAttributeString('EndX', this._endX.toString());
        xmlWriter._writeAttributeString('EndY', this._endY.toString());
        xmlWriter._writeAttributeString('EndWidth', this._endWidth.toString());
        xmlWriter._writeAttributeString('EndHeight', this._endHeight.toString());
        xmlWriter._writeAttributeString('EndRotation', this._endRotationAngle.toString());
        xmlWriter._writeAttributeString('EndColor', this._endColor.save());
        xmlWriter._writeAttributeString('InterpolationType', Enums.toXml('InterpolationType', this._interpolationType));
      }
      xmlWriter._writeAttributeString('Anchor', Enums.toXml('OverlayAnchor', this._anchor));
      this.writeOverlayProperties(xmlWriter);
      xmlWriter._writeEndElement();
    },
    getTypeName: () => 'TerraViewer.Overlay',
    addFilesToCabinet: fc => {
    },
    writeOverlayProperties: xmlWriter => {
    },
    _initOverlayFromXml: function (node) {
      this.id = node.attributes.getNamedItem('Id').nodeValue;
      this.set_name(node.attributes.getNamedItem('Name').nodeValue);
      this._x = parseFloat(node.attributes.getNamedItem('X').nodeValue);
      this._y = parseFloat(node.attributes.getNamedItem('Y').nodeValue);
      this._width = parseFloat(node.attributes.getNamedItem('Width').nodeValue);
      this._height = parseFloat(node.attributes.getNamedItem('Height').nodeValue);
      this._rotationAngle = parseFloat(node.attributes.getNamedItem('Rotation').nodeValue);
      this._color = Color.load(node.attributes.getNamedItem('Color').nodeValue);
      if (node.attributes.getNamedItem('Url') != null) {
        this.set_url(node.attributes.getNamedItem('Url').nodeValue);
      }
      if (node.attributes.getNamedItem('LinkID') != null) {
        this.set_linkID(node.attributes.getNamedItem('LinkID').nodeValue);
      }
      if (node.attributes.getNamedItem('Animate') != null) {
        this._animate = ss.boolean(node.attributes.getNamedItem('Animate').nodeValue);
        if (this._animate) {
          this._endX = parseFloat(node.attributes.getNamedItem('EndX').nodeValue);
          this._endY = parseFloat(node.attributes.getNamedItem('EndY').nodeValue);
          this._endColor = Color.load(node.attributes.getNamedItem('EndColor').nodeValue);
          this._endWidth = parseFloat(node.attributes.getNamedItem('EndWidth').nodeValue);
          this._endHeight = parseFloat(node.attributes.getNamedItem('EndHeight').nodeValue);
          this._endRotationAngle = parseFloat(node.attributes.getNamedItem('EndRotation').nodeValue);
          if (node.attributes.getNamedItem('InterpolationType') != null) {
            this.set_interpolationType(Enums.parse('InterpolationType', node.attributes.getNamedItem('InterpolationType').nodeValue));
          }
        }
      }
      this.initializeFromXml(node);
    },
    initializeFromXml: node => {
    },
    toString: function () {
      return this.get_name();
    }
  };

  function Selection() {
    this._singleSelectHandles = null;
    this._multiSelectHandles = null;
    this._focusHandles = null;
    this.selectionSet = [];
    this._focus = null;
    this._ratio = 1;
    this._sprite = new Sprite2d();
    this._centerX = 0;
    this._centerY = 0;
  }
  const Selection$ = {
    clearSelection: function () {
      this.selectionSet.length = 0;
    },
    addSelection: function (overlay) {
      if (overlay != null) {
        if (!(this.selectionSet.indexOf(overlay) >= 0)) {
          this.selectionSet.push(overlay);
        }
      }
    },
    addSelectionRange: function (overlays) {
      const $enum1 = ss.enumerate(overlays);
      while ($enum1.moveNext()) {
        const ov = $enum1.current;
        this.selectionSet.push(ov);
      }
    },
    isOverlaySelected: function (overlay) {
      return (this.selectionSet.indexOf(overlay) >= 0);
    },
    setSelection: function (overlay) {
      this.selectionSet.length = 0;
      if (overlay != null) {
        this.selectionSet.push(overlay);
      }
    },
    get_multiSelect: function () {
      return this.selectionSet.length > 1;
    },
    setSelectionRange: function (overlays) {
      this.selectionSet.length = 0;
      const $enum1 = ss.enumerate(overlays);
      while ($enum1.moveNext()) {
        const ov = $enum1.current;
        this.selectionSet.push(ov);
      }
    },
    get_focus: function () {
      return this._focus;
    },
    set_focus: function (value) {
      this._focus = value;
      return value;
    },
    draw3D: function (renderContext, transparancy) {
      this._ratio = 1116 / renderContext.height;
      if (this._singleSelectHandles == null) {
        this._singleSelectHandles = Texture.fromUrl('images/Selhand.bmp');
      }
      if (this._multiSelectHandles == null) {
        this._multiSelectHandles = Texture.fromUrl('images/multiSelhand.bmp');
      }
      if (this._focusHandles == null) {
        this._focusHandles = Texture.fromUrl('images/FocusHandles.png');
      }
      if (this.selectionSet.length > 1) {
        const $enum1 = ss.enumerate(this.selectionSet);
        while ($enum1.moveNext()) {
          var overlay = $enum1.current;
          if (overlay === this._focus) {
            this._drawSelectionHandles(renderContext, overlay, this._focusHandles);
          } else {
            this._drawSelectionHandles(renderContext, overlay, this._multiSelectHandles);
          }
        }
      } else {
        const $enum2 = ss.enumerate(this.selectionSet);
        while ($enum2.moveNext()) {
          var overlay = $enum2.current;
          this._drawSelectionHandles(renderContext, overlay, this._singleSelectHandles);
        }
      }
    },
    _drawSelectionHandles: function (renderContext, overlay, handleTexture) {
      const handles = this.makeHandles(overlay);
      const angle = overlay.get_rotationAngle();
      let i = 0;
      let j = 0;
      const $enum1 = ss.enumerate(handles);
      while ($enum1.moveNext()) {
        const handle = $enum1.current;
        Selection._points[i + 0] = new PositionColoredTextured();
        Selection._points[i + 0].position = overlay.makePosition(this._centerX, this._centerY, handle.get_left() - this._centerX, handle.get_top() - this._centerY, angle);
        Selection._points[i + 0].tu = j * (1 / 9);
        Selection._points[i + 0].tv = 0;
        Selection._points[i + 0].color = Colors.get_white();
        Selection._points[i + 1] = new PositionColoredTextured();
        Selection._points[i + 1].position = overlay.makePosition(this._centerX, this._centerY, handle.get_right() - this._centerX, handle.get_top() - this._centerY, angle);
        Selection._points[i + 1].tu = (j + 1) * (1 / 9);
        Selection._points[i + 1].tv = 0;
        Selection._points[i + 1].color = Colors.get_white();
        Selection._points[i + 2] = new PositionColoredTextured();
        Selection._points[i + 2].position = overlay.makePosition(this._centerX, this._centerY, handle.get_left() - this._centerX, handle.get_bottom() - this._centerY, angle);
        Selection._points[i + 2].tu = j * (1 / 9);
        Selection._points[i + 2].tv = 1;
        Selection._points[i + 2].color = Colors.get_white();
        Selection._points[i + 3] = new PositionColoredTextured();
        Selection._points[i + 3].position = overlay.makePosition(this._centerX, this._centerY, handle.get_right() - this._centerX, handle.get_top() - this._centerY, angle);
        Selection._points[i + 3].tu = (j + 1) * (1 / 9);
        Selection._points[i + 3].tv = 0;
        Selection._points[i + 3].color = Colors.get_white();
        Selection._points[i + 4] = new PositionColoredTextured();
        Selection._points[i + 4].position = overlay.makePosition(this._centerX, this._centerY, handle.get_right() - this._centerX, handle.get_bottom() - this._centerY, angle);
        Selection._points[i + 4].tu = (j + 1) * (1 / 9);
        Selection._points[i + 4].tv = 1;
        Selection._points[i + 4].color = Colors.get_white();
        Selection._points[i + 5] = new PositionColoredTextured();
        Selection._points[i + 5].position = overlay.makePosition(this._centerX, this._centerY, handle.get_left() - this._centerX, handle.get_bottom() - this._centerY, angle);
        Selection._points[i + 5].tu = j * (1 / 9);
        Selection._points[i + 5].tv = 1;
        Selection._points[i + 5].color = Colors.get_white();
        i += 6;
        j++;
      }
      if (this.get_multiSelect()) {
        this._sprite.draw(renderContext, Selection._points, Selection._points.length - 6, handleTexture, false, 1);
      } else {
        this._sprite.draw(renderContext, Selection._points, Selection._points.length, handleTexture, false, 1);
      }
    },
    pointToSelectionSpace: function (pntIn) {
      const tempPoints = new Array(1);
      tempPoints[0] = Vector2d.create(pntIn.x, pntIn.y);
      const mat = Matrix2d.rotateAt(-this.selectionSet[0].get_rotationAngle() / 180 * Math.PI, Vector2d.create(this.selectionSet[0].get_x(), this.selectionSet[0].get_y()));
      mat._transformPoints(tempPoints);
      return tempPoints[0];
    },
    pointToScreenSpace: function (pntIn) {
      const tempPoints = new Array(1);
      tempPoints[0] = Vector2d.create(pntIn.x, pntIn.y);
      const mat = Matrix2d.rotateAt(this.selectionSet[0].get_rotationAngle() / 180 * Math.PI, Vector2d.create(this.selectionSet[0].get_x(), this.selectionSet[0].get_y()));
      mat._transformPoints(tempPoints);
      return tempPoints[0];
    },
    hitTest: function (position) {
      if (this.selectionSet.length === 1) {
        const $enum1 = ss.enumerate(this.selectionSet);
        while ($enum1.moveNext()) {
          const overlay = $enum1.current;
          const handles = this.makeHandles(overlay);
          let index = 0;
          const testPoint = this.pointToSelectionSpace(position);
          const $enum2 = ss.enumerate(handles);
          while ($enum2.moveNext()) {
            const rectf = $enum2.current;
            if (rectf.contains(testPoint)) {
              return index;
            }
            index++;
          }
        }
      }
      return 11;
    },
    makeHandles: function (overlay) {
      const x = ss.truncate((overlay.get_x() - (overlay.get_width() / 2))) + 0.5;
      const y = (ss.truncate(overlay.get_y()) - (overlay.get_height() / 2)) + 0.5;
      this._centerX = overlay.get_x();
      this._centerY = overlay.get_y();
      const width = overlay.get_width();
      const height = overlay.get_height();
      const handleSize = 12 * this._ratio;
      const handles = new Array(9);
      handles[0] = Rectangle.create(x - handleSize, y - handleSize, handleSize, handleSize);
      handles[1] = Rectangle.create((x + (width / 2)) - (handleSize / 2), y - handleSize, handleSize, handleSize);
      handles[2] = Rectangle.create(x + width, y - handleSize, handleSize, handleSize);
      handles[3] = Rectangle.create(x + width, (y + (height / 2)) - (handleSize / 2), handleSize, handleSize);
      handles[4] = Rectangle.create(x + width, (y + height), handleSize, handleSize);
      handles[5] = Rectangle.create((x + (width / 2)) - (handleSize / 2), (y + height), handleSize, handleSize);
      handles[6] = Rectangle.create(x - handleSize, (y + height), handleSize, handleSize);
      handles[7] = Rectangle.create(x - handleSize, (y + (height / 2)) - (handleSize / 2), handleSize, handleSize);
      handles[8] = Rectangle.create((x + (width / 2)) - (handleSize / 2), y - 30 * this._ratio, handleSize, handleSize);
      return handles;
    }
  };

  function TextObject() {
    this.bold = false;
    this.italic = false;
    this.underline = false;
    this.fontSize = 0;
    this.borderStyle = 0;
  }
  TextObject.create = (text, bold, italic, underline, fontSize, fontName, forgroundColor, backgroundColor, borderStyle) => {
    const temp = new TextObject();
    temp.text = text;
    temp.bold = bold;
    temp.italic = italic;
    temp.underline = underline;
    temp.fontSize = fontSize;
    temp.fontName = fontName;
    temp.foregroundColor = forgroundColor;
    temp.backgroundColor = backgroundColor;
    temp.borderStyle = borderStyle;
    return temp;
  };
  TextObject._fromXml = node => {
    const newTextObject = new TextObject();
    newTextObject.text = Util.getInnerText(node);
    newTextObject.borderStyle = 0;
    newTextObject.bold = ss.boolean(node.attributes.getNamedItem('Bold').nodeValue);
    newTextObject.italic = ss.boolean(node.attributes.getNamedItem('Italic').nodeValue);
    newTextObject.underline = ss.boolean(node.attributes.getNamedItem('Underline').nodeValue);
    newTextObject.fontSize = parseFloat(node.attributes.getNamedItem('FontSize').nodeValue);
    newTextObject.fontName = node.attributes.getNamedItem('FontName').nodeValue;
    newTextObject.foregroundColor = Color.load(node.attributes.getNamedItem('ForgroundColor').nodeValue);
    newTextObject.backgroundColor = Color.load(node.attributes.getNamedItem('BackgroundColor').nodeValue);
    if (node.attributes.getNamedItem('BorderStyle') != null) {
      newTextObject.borderStyle = Enums.parse('TextBorderStyle', node.attributes.getNamedItem('BorderStyle').nodeValue);
    }
    return newTextObject;
  };
  const TextObject$ = {
    toString: function () {
      return this.text;
    },
    _saveToXml: function (xmlWriter) {
      xmlWriter._writeStartElement('TextObject');
      xmlWriter._writeAttributeString('Bold', this.bold.toString());
      xmlWriter._writeAttributeString('Italic', this.italic.toString());
      xmlWriter._writeAttributeString('Underline', this.underline.toString());
      xmlWriter._writeAttributeString('FontSize', this.fontSize.toString());
      xmlWriter._writeAttributeString('FontName', this.fontName);
      xmlWriter._writeAttributeString('ForgroundColor', this.foregroundColor.save());
      xmlWriter._writeAttributeString('BackgroundColor', this.backgroundColor.save());
      xmlWriter._writeAttributeString('BorderStyle', Enums.toXml('TextBorderStyle', this.borderStyle));
      xmlWriter._writeString(this.text);
      xmlWriter._writeEndElement();
    }
  };

  function TourDocument() {
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
  TourDocument.get_baseWorkingDirectory = () => '';
  TourDocument.fromUrl = (url, callMe) => {
    const temp = new TourDocument();
    temp.url = url;
    temp._callMe = callMe;
    temp._cabinet = FileCabinet.fromUrl(url, ss.bind('_loadXmlDocument', temp));
    return temp;
  };
  TourDocument.fromUrlRaw = (url, callMe) => {
    const temp = new TourDocument();
    temp.url = url;
    temp._callMe = callMe;
    temp._cabinet = FileCabinet.fromUrl(url, callMe);
    return temp;
  };
  const TourDocument$ = {
    get_tourDirty: function () {
      return this._tourDirty > 0;
    },
    set_tourDirty: function (value) {
      if (value) {
        this._tourDirty++;
      } else {
        this._tourDirty = 0;
      }
      return value;
    },
    get_workingDirectory: function () {
      if (ss.emptyString(this._workingDirectory)) {
        this._workingDirectory = TourDocument.get_baseWorkingDirectory() + this._id + '\\';
      }
      return this._workingDirectory;
    },
    set_workingDirectory: function (value) {
      this._workingDirectory = value;
      return value;
    },
    _loadXmlDocument: function () {
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
    },
    fromXml: function (doc) {
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
          this.addTourStop(TourStop._fromXml(this, tourStop));
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
                newLayer.loadData(this, fileName);
                LayerManager.add(newLayer, false);
              } catch ($e4) {
              }
            }
          }
        }
        LayerManager.loadTree();
      }
      this._tourDirty = 0;
    },
    saveToDataUrl: function () {
      return URL.createObjectURL(this.saveToBlob());
      ;
    },
    saveToBlob: function () {
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
    },
    getTourXML: function () {
      const xmlWriter = new XmlTextWriter();
      xmlWriter.formatting = 1;
      xmlWriter._writeProcessingInstruction('xml', 'version=\'1.0\' encoding=\'UTF-8\'');
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
      const timeLineTour = this._isTimelineTour();
      xmlWriter._writeAttributeString('TimeLineTour', timeLineTour.toString());
      xmlWriter._writeStartElement('TourStops');
      const $enum1 = ss.enumerate(this.get_tourStops());
      while ($enum1.moveNext()) {
        const stop = $enum1.current;
        stop._saveToXml(xmlWriter, true);
      }
      xmlWriter._writeEndElement();
      const masterList = this._createLayerMasterList();
      const referencedFrames = this._getReferenceFrameList();
      xmlWriter._writeStartElement('ReferenceFrames');
      const $enum2 = ss.enumerate(referencedFrames);
      while ($enum2.moveNext()) {
        const item = $enum2.current;
        item.saveToXml(xmlWriter);
      }
      xmlWriter._writeEndElement();
      xmlWriter._writeStartElement('Layers');
      const $enum3 = ss.enumerate(masterList);
      while ($enum3.moveNext()) {
        const id = $enum3.current;
        if (ss.keyExists(LayerManager.get_layerList(), id)) {
          LayerManager.get_layerList()[id].saveToXml(xmlWriter);
        }
      }
      xmlWriter._writeEndElement();
      xmlWriter._writeFullEndElement();
      xmlWriter._close();
      return xmlWriter.body;
    },
    _getReferenceFrameList: () => {
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
    },
    _createLayerMasterList: function () {
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
    },
    _isTimelineTour: () => false,
    get_tagId: function () {
      return this._tagId;
    },
    set_tagId: function (value) {
      this._tagId = value;
      return value;
    },
    get_authorThumbnailFilename: () => 'Author.Png',
    get_tourThumbnailFilename: function () {
      if (this._representativeThumbnailTourstop < this._tourStops.length) {
        return this._tourStops[this._representativeThumbnailTourstop].get_tourStopThumbnailFilename();
      } else {
        return null;
      }
    },
    get_id: function () {
      return this._id;
    },
    set_id: function (value) {
      this._id = value;
      return value;
    },
    get_title: function () {
      return this._title;
    },
    set_title: function (value) {
      this._title = value;
      this.set_tourDirty(true);
      return value;
    },
    get_runTime: function () {
      if (!this._runTime || this._lastDirtyCheck !== this._tourDirty) {
        this._runTime = this._calculateRunTime();
        this._lastDirtyCheck = this._tourDirty;
      }
      return this._runTime;
    },
    get_description: function () {
      return this._description;
    },
    set_description: function (value) {
      this._description = value;
      this.set_tourDirty(true);
      return value;
    },
    get_attributesAndCredits: function () {
      return this._attributesAndCredits;
    },
    set_attributesAndCredits: function (value) {
      this._attributesAndCredits = value;
      this.set_tourDirty(true);
      return value;
    },
    get_authorEmailOther: function () {
      return this._authorEmailOther;
    },
    set_authorEmailOther: function (value) {
      this._authorEmailOther = value;
      this.set_tourDirty(true);
      return value;
    },
    get_authorEmail: function () {
      return this._authorEmail;
    },
    set_authorEmail: function (value) {
      this._authorEmail = value;
      this.set_tourDirty(true);
      return value;
    },
    get_authorUrl: function () {
      return this._authorUrl;
    },
    set_authorUrl: function (value) {
      this._authorUrl = value;
      this.set_tourDirty(true);
      return value;
    },
    get_authorPhone: function () {
      return this._authorPhone;
    },
    set_authorPhone: function (value) {
      this._authorPhone = value;
      this.set_tourDirty(true);
      return value;
    },
    get_authorContactText: function () {
      return this._authorContactText;
    },
    set_authorContactText: function (value) {
      this._authorContactText = value;
      this.set_tourDirty(true);
      return value;
    },
    get_orgName: function () {
      return this._orgName;
    },
    set_orgName: function (value) {
      this._orgName = value;
      this.set_tourDirty(true);
      return value;
    },
    get_orgUrl: function () {
      return this._orgUrl;
    },
    set_orgUrl: function (value) {
      this._orgUrl = value;
      this.set_tourDirty(true);
      return value;
    },
    get_author: function () {
      return this._author;
    },
    set_author: function (value) {
      this._author = value;
      this.set_tourDirty(true);
      return value;
    },
    get_authorImageUrl: function () {
      return this._authorImageUrl;
    },
    set_authorImageUrl: function (value) {
      this._authorImageUrl = value;
      this.set_tourDirty(true);
      return value;
    },
    get_authorImage: function () {
      return this._authorImage;
    },
    set_authorImage: function (value) {
      this._authorImage = value;
      this.set_tourDirty(true);
      return value;
    },
    get_organizationUrl: function () {
      return this._organizationUrl;
    },
    set_organizationUrl: function (value) {
      this._organizationUrl = value;
      this.set_tourDirty(true);
      return value;
    },
    get_fileName: function () {
      return this._filename;
    },
    set_fileName: function (value) {
      this._filename = value;
      return value;
    },
    get_level: function () {
      return this._level;
    },
    set_level: function (value) {
      this._level = value;
      this.set_tourDirty(true);
      return value;
    },
    get_type: function () {
      return this._type;
    },
    set_type: function (value) {
      this._type = value;
      this.set_tourDirty(true);
      return value;
    },
    get_taxonomy: function () {
      return this._taxonomy;
    },
    set_taxonomy: function (value) {
      this._taxonomy = value;
      this.set_tourDirty(true);
      return value;
    },
    get_keywords: function () {
      return this._keywords;
    },
    set_keywords: function (value) {
      this._keywords = value;
      this.set_tourDirty(true);
      return value;
    },
    get_objects: function () {
      return this._objects;
    },
    set_objects: function (value) {
      this._objects = value;
      this.set_tourDirty(true);
      return value;
    },
    get_editMode: function () {
      return this._editMode;
    },
    set_editMode: function (value) {
      this._editMode = value;
      return value;
    },
    get_tourStops: function () {
      return this._tourStops;
    },
    set_tourStops: function (value) {
      this._tourStops = value;
      return value;
    },
    get_currentTourstopIndex: function () {
      return this._currentTourstopIndex;
    },
    set_currentTourstopIndex: function (value) {
      this._currentTourstopIndex = value;
      return value;
    },
    addTourStop: function (ts) {
      ts.set_owner(this);
      this.get_tourStops().push(ts);
      this._currentTourstopIndex = this._tourStops.length - 1;
      this.set_tourDirty(true);
    },
    insertTourStop: function (ts) {
      ts.set_owner(this);
      if (this._currentTourstopIndex > -1) {
        this.get_tourStops().splice(this._currentTourstopIndex, 0, ts);
      } else {
        this.get_tourStops().push(ts);
        this._currentTourstopIndex = this._tourStops.length - 1;
      }
      this.set_tourDirty(true);
    },
    insertAfterTourStop: function (ts) {
      ts.set_owner(this);
      if (this._currentTourstopIndex > -1 || this._currentTourstopIndex < this.get_tourStops().length) {
        this.get_tourStops().splice(this._currentTourstopIndex + 1, 0, ts);
      } else {
        this.get_tourStops().push(ts);
        this._currentTourstopIndex = this._tourStops.length - 1;
      }
      this.set_tourDirty(true);
    },
    removeTourStop: function (ts) {
      ss.remove(this._tourStops, ts);
      if (this._currentTourstopIndex > this._tourStops.length - 1) {
        this._currentTourstopIndex--;
      }
      this.set_tourDirty(true);
    },
    _calculateRunTime: function () {
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
    },
    elapsedTimeTillTourstop: function (index) {
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
    },
    elapsedTimeSinceLastMaster: function (index) {
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
    },
    getMasterSlideForIndex: function (index) {
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
    },
    getTourStopIndexByID: function (id) {
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
    },
    cleanUp: () => {
    },
    getCachedTexture: function (filename, callMe) {
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
    },
    getCachedTexture2d: function (filename) {
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
    },
    addCachedFile: function (filename, file) {
      this._fileCache[filename] = file;
      if (ss.keyExists(this._textureList2d, filename)) {
        delete this._textureList2d[filename];
      }
      if (ss.keyExists(this._textureList, filename)) {
        delete this._textureList[filename];
      }
    },
    getFileStream: function (filename) {
      const blob = this.getFileBlob(filename);
      if (blob == null) {
        return null;
      }
      return URL.createObjectURL(blob);
      ;
    },
    getFileBlob: function (filename) {
      if (ss.keyExists(this._fileCache, filename)) {
        return this._fileCache[filename];
      } else if (this._cabinet != null) {
        return this._cabinet.getFileBlob(this.get_workingDirectory() + filename);
      } else {
        return null;
      }
    },
    get_currentTourStop: function () {
      if (this._currentTourstopIndex > -1) {
        return this.get_tourStops()[this._currentTourstopIndex];
      } else {
        return null;
      }
    },
    set_currentTourStop: function (value) {
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
    },
    clearTempFiles: () => {
    }
  };

  function TourEditTab() {
    this.musicTrack = new SoundEditor();
    this.voiceTrack = new SoundEditor();
    this._tour = null;
    this.tourStopList = new TourStopList();
    this.tourEditorUI = new TourEditor();
    this._contextMenu = new ContextMenuStrip();
    this.nextSlideCallback = null;
    this.playing = false;
    this._player = null;
    this._defultColor = Colors.get_white();
  }
  const TourEditTab$ = {
    setUiStrings: () => {
    },
    get_tour: function () {
      return this._tour;
    },
    set_tour: function (value) {
      this._tour = value;
      this.tourEditorUI.set_tour(this._tour);
      this.tourStopList.tour = this._tour;
      Overlay.defaultAnchor = 1;
      if (this._tour.get_tourStops().length > 0) {
        WWTControl.singleton.gotoTarget(this._tour.get_tourStops()[0].get_target(), false, true, false);
        this._tour.set_currentTourstopIndex(0);
        this.tourStopList.selectedItem = this._tour.get_currentTourstopIndex();
        this.musicTrack.target = this._tour.get_currentTourStop();
        this.voiceTrack.target = this._tour.get_currentTourStop();
        LayerManager.setVisibleLayerList(this._tour.get_currentTourStop().layers);
      }
      this.setEditMode(this._tour.get_editMode());
      return value;
    },
    tour_CurrentTourstopChanged: function () {
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.tourEditorUI.selection);
      if (this.tourEditorUI != null) {
        this.tourEditorUI.clearSelection();
      }
      this.tourStopList.refresh();
    },
    setFocusedChild: () => {
    },
    selectCurrent: function () {
      this.tourStopList.selectedItem = this._tour.get_currentTourstopIndex();
      this.tourStopList.refresh();
    },
    tourEdit_Load: (sender, e) => {
    },
    playNow: function (fromStart) {
      this.playing = true;
      if (this.get_tour().get_editMode() || fromStart) {
        this.get_tour().set_currentTourstopIndex(-1);
      }
      this.setPlayPauseMode();
    },
    _tourPlayer_TourEnded: (sender, e) => {
    },
    _endTour_CloseTour: (sender, e) => {
    },
    _endTour_LaunchTour: function (sender, e) {
      this.playNow(true);
    },
    setEditMode: visible => {
    },
    tourStopList_ItemClicked: function (sender, e) {
      if (this._tour.get_currentTourStop() !== e) {
        this._tour.set_currentTourStop(e);
        if (e != null) {
          this.musicTrack.target = this._tour.get_currentTourStop();
          this.voiceTrack.target = this._tour.get_currentTourStop();
        } else {
          this.musicTrack.target = null;
          this.voiceTrack.target = null;
        }
        this.tourEditorUI.clearSelection();
      }
      if (this.playing) {
        this._playFromHere_Click(sender, new ss.EventArgs());
      }
    },
    tourStopList_ItemDoubleClicked: function (sender, e) {
      this.showSlideStartPosition(e);
    },
    showSlideStartPosition: function (ts) {
      this._tour.set_currentTourStop(ts);
      if (ts != null) {
        this.musicTrack.target = this._tour.get_currentTourStop();
        this.voiceTrack.target = this._tour.get_currentTourStop();
      } else {
        this.musicTrack.target = null;
        this.voiceTrack.target = null;
      }
      this.tourEditorUI.clearSelection();
      if (this._tour.get_currentTourStop() != null) {
        this._tour.get_currentTourStop().syncSettings();
        SpaceTimeController.set_now(this._tour.get_currentTourStop().get_startTime());
        SpaceTimeController.set_syncToClock(false);
        WWTControl.singleton.gotoTarget(ts.get_target(), false, true, false);
        this._tour.get_currentTourStop().set_tweenPosition(0);
        this._tour.get_currentTourStop()._updateLayerOpacity();
        LayerManager.setVisibleLayerList(this._tour.get_currentTourStop().layers);
      }
    },
    tourStopList_MouseClick: function (sender, e) {
      if (!this._tour.get_editMode()) {
      }
      if (this.tourStopList.multipleSelection) {
        if (this._contextMenu != null) {
          this._contextMenu._dispose();
        }
        this._contextMenu = new ContextMenuStrip();
        var selectAllMenu = ToolStripMenuItem.create(Language.getLocalizedText(1345, 'Select All'));
        var cutMenu = ToolStripMenuItem.create(Language.getLocalizedText(427, 'Cut'));
        var copyMenu = ToolStripMenuItem.create(Language.getLocalizedText(428, 'Copy'));
        var pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(429, 'Paste'));
        var deleteMenu = ToolStripMenuItem.create(Language.getLocalizedText(167, 'Delete'));
        cutMenu.click = ss.bind('_cutMenu_Click', this);
        copyMenu.click = ss.bind('_copyMenu_Click', this);
        pasteMenu.click = ss.bind('_pasteMenu_Click', this);
        deleteMenu.click = ss.bind('_deleteMenu_Click', this);
        selectAllMenu.click = ss.bind('_selectAllMenu_Click', this);
        var sep1 = new ToolStripSeparator();
        this._contextMenu.items.push(selectAllMenu);
        this._contextMenu.items.push(sep1);
        this._contextMenu.items.push(cutMenu);
        this._contextMenu.items.push(copyMenu);
        pasteMenu.enabled = this.tourEditorUI.clipboardType === 'WorldWideTelescope.Slide';
        this._contextMenu.items.push(pasteMenu);
        this._contextMenu.items.push(deleteMenu);
        this._contextMenu._show(Cursor.get_position());
      } else if (this._tour.get_currentTourStop() == null) {
        if (this._contextMenu != null) {
          this._contextMenu._dispose();
        }
        this._contextMenu = new ContextMenuStrip();
        var selectAllMenu = ToolStripMenuItem.create(Language.getLocalizedText(1345, 'Select All'));
        var pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(425, 'Paste'));
        var sep1 = new ToolStripSeparator();
        var sep2 = new ToolStripSeparator();
        var insertSlide = ToolStripMenuItem.create(Language.getLocalizedText(426, 'Add New Slide'));
        pasteMenu.click = ss.bind('_pasteMenu_Click', this);
        selectAllMenu.click = ss.bind('_selectAllMenu_Click', this);
        insertSlide.click = ss.bind('_addNewSlide_Click', this);
        pasteMenu.enabled = this.tourEditorUI.clipboardType === 'WorldWideTelescope.Slide';
        this._contextMenu.items.push(selectAllMenu);
        this._contextMenu.items.push(sep1);
        this._contextMenu.items.push(pasteMenu);
        this._contextMenu.items.push(sep2);
        this._contextMenu.items.push(insertSlide);
        this._contextMenu._show(Cursor.get_position());
      } else {
        if (this._contextMenu != null) {
          this._contextMenu._dispose();
        }
        this._contextMenu = new ContextMenuStrip();
        var selectAllMenu = ToolStripMenuItem.create(Language.getLocalizedText(1345, 'Select All'));
        var cutMenu = ToolStripMenuItem.create(Language.getLocalizedText(427, 'Cut'));
        var copyMenu = ToolStripMenuItem.create(Language.getLocalizedText(428, 'Copy'));
        var pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(429, 'Paste'));
        var deleteMenu = ToolStripMenuItem.create(Language.getLocalizedText(167, 'Delete'));
        var sep1 = new ToolStripSeparator();
        const sep3 = new ToolStripSeparator();
        const sep4 = new ToolStripSeparator();
        const sep5 = new ToolStripSeparator();
        const sep6 = new ToolStripSeparator();
        const sep7 = new ToolStripSeparator();
        var insertSlide = ToolStripMenuItem.create(Language.getLocalizedText(431, 'Insert New Slide'));
        const insertDuplicate = ToolStripMenuItem.create(Language.getLocalizedText(627, 'Duplicate Slide at End Position'));
        const insertSlideshow = ToolStripMenuItem.create(Language.getLocalizedText(628, 'Merge Tour after slide...'));
        const playFromHere = ToolStripMenuItem.create(Language.getLocalizedText(432, 'Preview Tour From Here'));
        var sep2 = new ToolStripSeparator();
        const captureThumbnail = ToolStripMenuItem.create(Language.getLocalizedText(433, 'Capture New Thumbnail'));
        const setSkyPosition = ToolStripMenuItem.create(Language.getLocalizedText(434, 'Set Start Camera Position'));
        const setEndSkyPosition = ToolStripMenuItem.create(Language.getLocalizedText(435, 'Set End Camera Position'));
        const showSkyPosition = ToolStripMenuItem.create(Language.getLocalizedText(436, 'Show Start Camera Position'));
        const showEndSkyPosition = ToolStripMenuItem.create(Language.getLocalizedText(437, 'Show End Camera Position'));
        const masterSlide = ToolStripMenuItem.create(Language.getLocalizedText(438, 'Master Slide'));
        const makeTimeline = ToolStripMenuItem.create(Language.getLocalizedText(1346, 'Create Timeline'));
        const showTimeline = ToolStripMenuItem.create(Language.getLocalizedText(1347, 'Show Timeline'));
        let linkString = this._tour.get_currentTourStop().get_nextSlide();
        switch (linkString) {
          case '':
          case null:
          case 'Next':
            linkString = ' (' + Language.getLocalizedText(610, 'Next Slide') + ')';
            break;
          case 'Return':
            linkString = ' (' + Language.getLocalizedText(602, 'Return to Caller') + ')';
            break;
          default:
            const index = this.get_tour().getTourStopIndexByID(linkString);
            if (index > -1) {
              if (ss.emptyString(this._tour.get_tourStops()[index].get_description())) {
                linkString = ss.format(' (Slide {0})', index);
              } else {
                linkString = ' (' + this._tour.get_tourStops()[index].get_description() + ')';
              }
            }
            break;
        }
        const setNextSlide = ToolStripMenuItem.create(Language.getLocalizedText(590, 'Set Next Slide') + linkString);
        const trackSpaceTime = ToolStripMenuItem.create(Language.getLocalizedText(439, 'Track Date/Time/Location'));
        const fadeInOverlays = ToolStripMenuItem.create(Language.getLocalizedText(629, 'Fade In Slide Elements'));
        const properties = ToolStripMenuItem.create(Language.getLocalizedText(20, 'Properties'));
        const interpolation = ToolStripMenuItem.create(Language.getLocalizedText(1029, 'Animation Tween Type'));
        const Linear = ToolStripMenuItem.create(Language.getLocalizedText(1030, 'Linear'));
        const Ease = ToolStripMenuItem.create(Language.getLocalizedText(1031, 'Ease In/Out'));
        const EaseIn = ToolStripMenuItem.create(Language.getLocalizedText(1032, 'Ease In'));
        const EaseOut = ToolStripMenuItem.create(Language.getLocalizedText(1033, 'Ease Out'));
        const Exponential = ToolStripMenuItem.create(Language.getLocalizedText(1034, 'Exponential'));
        Linear.tag = 0;
        Ease.tag = 3;
        EaseIn.tag = 1;
        EaseOut.tag = 2;
        Exponential.tag = 4;
        Linear.click = ss.bind('_interpolation_Click', this);
        Ease.click = ss.bind('_interpolation_Click', this);
        EaseIn.click = ss.bind('_interpolation_Click', this);
        EaseOut.click = ss.bind('_interpolation_Click', this);
        Exponential.click = ss.bind('_interpolation_Click', this);
        switch (this._tour.get_currentTourStop().get_interpolationType()) {
          case 0:
            Linear.checked = true;
            break;
          case 1:
            EaseIn.checked = true;
            break;
          case 2:
            EaseOut.checked = true;
            break;
          case 3:
            Ease.checked = true;
            break;
          case 4:
            Exponential.checked = true;
            break;
          default:
            break;
        }
        interpolation.dropDownItems.push(Linear);
        interpolation.dropDownItems.push(Ease);
        interpolation.dropDownItems.push(EaseIn);
        interpolation.dropDownItems.push(EaseOut);
        interpolation.dropDownItems.push(Exponential);
        selectAllMenu.click = ss.bind('_selectAllMenu_Click', this);
        insertDuplicate.click = ss.bind('_insertDuplicate_Click', this);
        cutMenu.click = ss.bind('_cutMenu_Click', this);
        copyMenu.click = ss.bind('_copyMenu_Click', this);
        pasteMenu.click = ss.bind('_pasteMenu_Click', this);
        deleteMenu.click = ss.bind('_deleteMenu_Click', this);
        insertSlide.click = ss.bind('_insertNewSlide_Click', this);
        properties.click = ss.bind('_properties_Click', this);
        captureThumbnail.click = ss.bind('_captureThumbnail_Click', this);
        setSkyPosition.click = ss.bind('_setSkyPosition_Click', this);
        setEndSkyPosition.click = ss.bind('_setEndSkyPosition_Click', this);
        showEndSkyPosition.click = ss.bind('_showEndSkyPosition_Click', this);
        showSkyPosition.click = ss.bind('_showSkyPosition_Click', this);
        playFromHere.click = ss.bind('_playFromHere_Click', this);
        masterSlide.click = ss.bind('_masterSlide_Click', this);
        setNextSlide.click = ss.bind('_setNextSlide_Click', this);
        trackSpaceTime.click = ss.bind('_trackSpaceTime_Click', this);
        insertSlideshow.click = ss.bind('_insertSlideshow_Click', this);
        fadeInOverlays.click = ss.bind('_fadeInOverlays_Click', this);
        if (this._tour.get_currentTourStop().get_masterSlide()) {
          masterSlide.checked = true;
        }
        if (this._tour.get_currentTourStop().get_hasTime()) {
          trackSpaceTime.checked = true;
        }
        fadeInOverlays.checked = this._tour.get_currentTourStop().get_fadeInOverlays();
        this._contextMenu.items.push(selectAllMenu);
        this._contextMenu.items.push(sep7);
        this._contextMenu.items.push(cutMenu);
        this._contextMenu.items.push(copyMenu);
        pasteMenu.enabled = this.tourEditorUI.clipboardType === 'WorldWideTelescope.Slide';
        this._contextMenu.items.push(pasteMenu);
        this._contextMenu.items.push(deleteMenu);
        this._contextMenu.items.push(sep1);
        this._contextMenu.items.push(insertSlide);
        this._contextMenu.items.push(insertDuplicate);
        this._contextMenu.items.push(insertSlideshow);
        this._contextMenu.items.push(sep2);
        this._contextMenu.items.push(playFromHere);
        this._contextMenu.items.push(sep3);
        this._contextMenu.items.push(setSkyPosition);
        this._contextMenu.items.push(setEndSkyPosition);
        this._contextMenu.items.push(sep4);
        this._contextMenu.items.push(showSkyPosition);
        this._contextMenu.items.push(showEndSkyPosition);
        this._contextMenu.items.push(sep5);
        this._contextMenu.items.push(captureThumbnail);
        this._contextMenu.items.push(sep6);
        this._contextMenu.items.push(masterSlide);
        this._contextMenu.items.push(setNextSlide);
        this._contextMenu.items.push(fadeInOverlays);
        this._contextMenu.items.push(trackSpaceTime);
        this._contextMenu.items.push(interpolation);
        this._contextMenu._show(Vector2d.create(e.clientX, e.clientY));
      }
    },
    _selectAllMenu_Click: function (sender, e) {
      this.tourStopList.selectAll();
    },
    _interpolation_Click: function (sender, e) {
      const item = sender;
      this._tour.get_currentTourStop().set_interpolationType(item.tag);
    },
    _nextSlideChosen: function () {
      if (this._selectDialog.get_OK()) {
        this._tour.get_currentTourStop().set_nextSlide(this._selectDialog.get_id());
      }
    },
    _setNextSlide_Click: function (sender, e) {
      this._selectDialog = new SelectLink(null);
      this.nextSlideCallback(this._selectDialog, ss.bind('_nextSlideChosen', this));
    },
    _insertDuplicate_Click: function (sender, e) {
      Undo.push(new UndoTourSlidelistChange(Language.getLocalizedText(530, 'Duplicate Slide at End Position'), this._tour));
      const ts = this._tour.get_currentTourStop().copy();
      if (ts == null) {
        return;
      }
      if (ts.get_endTarget() != null) {
        ts.get_endTarget().set_backgroundImageset(ts.get_target().get_backgroundImageset());
        ts.get_endTarget().set_studyImageset(ts.get_target().get_studyImageset());
        ts.set_target(ts.get_endTarget());
        ts.set_startTime(ts.get_endTime());
        ts.set_endTarget(null);
      }
      const $enum1 = ss.enumerate(ts.get_overlays());
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_tweenFactor(1);
        overlay.set_animate(!overlay.get_animate());
        overlay.set_animate(!overlay.get_animate());
      }
      ts.set_tweenPosition(0);
      ts.set_fadeInOverlays(false);
      this._tour.insertAfterTourStop(ts);
      this.tourStopList.refresh();
    },
    _fadeInOverlays_Click: function (sender, e) {
      this._tour.get_currentTourStop().set_fadeInOverlays(!this._tour.get_currentTourStop().get_fadeInOverlays());
    },
    _insertSlideshow_Click: (sender, e) => {
    },
    _trackSpaceTime_Click: function (sender, e) {
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(532, 'Track Time Edit'), this._tour));
      this._tour.get_currentTourStop().set_hasTime(!this._tour.get_currentTourStop().get_hasTime());
    },
    _masterSlide_Click: function (sender, e) {
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(533, 'Master Slide State Edit'), this._tour));
      this._tour.get_currentTourStop().set_masterSlide(!this._tour.get_currentTourStop().get_masterSlide());
      this.tourStopList.refresh();
    },
    _playFromHere_Click: function (sender, e) {
      this.playFromCurrentTourstop();
    },
    playFromCurrentTourstop: function () {
      this.playing = true;
      WWTControl.singleton.gotoTarget(this._tour.get_currentTourStop().get_target(), false, true, false);
      SpaceTimeController.set_now(this._tour.get_currentTourStop().get_startTime());
      SpaceTimeController.set_syncToClock(false);
      this.setPlayPauseMode();
    },
    playFromTourstop: function (ts) {
      this._tour.set_currentTourStop(ts);
      this.playFromCurrentTourstop();
    },
    _showSkyPosition_Click: function (sender, e) {
      if (this._tour.get_currentTourStop() != null) {
        WWTControl.singleton.gotoTarget(this._tour.get_currentTourStop().get_target(), false, true, false);
        this._tour.get_currentTourStop().syncSettings();
        SpaceTimeController.set_now(this._tour.get_currentTourStop().get_startTime());
        SpaceTimeController.set_syncToClock(false);
        this._tour.get_currentTourStop().set_tweenPosition(0);
        LayerManager.setVisibleLayerList(this._tour.get_currentTourStop().layers);
        this.tourStopList.refresh();
      }
    },
    _showEndSkyPosition_Click: function (sender, e) {
      this._tour.get_currentTourStop().set_tweenPosition(1);
      this._tour.get_currentTourStop()._updateLayerOpacity();
      if (this._tour.get_currentTourStop() != null && this._tour.get_currentTourStop().get_endTarget() != null) {
        WWTControl.singleton.gotoTargetFull(false, true, this._tour.get_currentTourStop().get_endTarget().get_camParams(), this._tour.get_currentTourStop().get_target().get_studyImageset(), this._tour.get_currentTourStop().get_target().get_backgroundImageset());
        WWTControl.singleton.renderContext.set_solarSystemTrack(this._tour.get_currentTourStop().get_endTarget().get_target());
        SpaceTimeController.set_now(this._tour.get_currentTourStop().get_endTime());
        this._tour.get_currentTourStop().syncSettings();
        LayerManager.setVisibleLayerList(this._tour.get_currentTourStop().layers);
        SpaceTimeController.set_syncToClock(false);
        this.tourStopList.refresh();
        this.tourEditorUI.clearSelection();
      }
    },
    _setEndSkyPosition_Click: function (sender, e) {
      if (this._tour.get_currentTourStop() != null) {
        Undo.push(new UndoTourStopChange(Language.getLocalizedText(435, 'Set End Camera Position'), this._tour));
        const newPlace = Place.createCameraParams('End Place', WWTControl.singleton.renderContext.viewCamera.copy(), 268435456, WWTControl.singleton.constellation, WWTControl.singleton.renderContext.get_backgroundImageset().get_dataSetType(), WWTControl.singleton.renderContext.get_solarSystemTrack());
        this._tour.get_currentTourStop().set_endTarget(newPlace);
        this._tour.get_currentTourStop().get_endTarget().set_constellation(WWTControl.singleton.constellation);
        this._tour.get_currentTourStop().set_endTime(SpaceTimeController.get_now());
        this._tour.get_currentTourStop().set_tweenPosition(1);
        const $enum1 = ss.enumerate(ss.keys(this._tour.get_currentTourStop().layers));
        while ($enum1.moveNext()) {
          const key = $enum1.current;
          const info = this._tour.get_currentTourStop().layers[key];
          if (ss.keyExists(LayerManager.get_layerList(), info.id)) {
            info.endOpacity = LayerManager.get_layerList()[info.id].get_opacity();
            info.endParams = LayerManager.get_layerList()[info.id].getParams();
          }
        }
        this._tour.get_currentTourStop()._updateLayerOpacity();
        this.tourStopList.refresh();
        TimeLine.refreshUi();
        this.tourEditorUI.clearSelection();
      }
    },
    _setSkyPosition_Click: function (sender, e) {
      if (this._tour.get_currentTourStop() != null) {
        Undo.push(new UndoTourStopChange(Language.getLocalizedText(434, 'Set Start Camera Position'), this._tour));
        this._tour.get_currentTourStop().get_target().set_target(WWTControl.singleton.renderContext.get_solarSystemTrack());
        this._tour.get_currentTourStop().get_target().set_type(WWTControl.singleton.renderContext.get_backgroundImageset().get_dataSetType());
        this._tour.get_currentTourStop().get_target().set_camParams(WWTControl.singleton.renderContext.viewCamera.copy());
        this._tour.get_currentTourStop().get_target().set_constellation(WWTControl.singleton.constellation);
        this._tour.get_currentTourStop().get_target().set_studyImageset(WWTControl.singleton.renderContext.get_foregroundImageset());
        this._tour.get_currentTourStop().get_target().set_type(WWTControl.singleton.renderContext.get_backgroundImageset().get_dataSetType());
        this._tour.get_currentTourStop().get_target().set_backgroundImageset(WWTControl.singleton.renderContext.get_backgroundImageset().get_stockImageSet());
        this._tour.get_currentTourStop().captureSettings();
        this._tour.get_currentTourStop().layers = LayerManager._getVisibleLayerList(this._tour.get_currentTourStop().layers);
        this._tour.get_currentTourStop().set_tweenPosition(0);
        this.tourStopList.refresh();
        TimeLine.refreshUi();
        this.tourEditorUI.clearSelection();
      }
    },
    _captureThumbnail_Click: function (sender, e) {
      if (this._tour.get_currentTourStop() != null) {
        this._captureThumbnail(this._tour.get_currentTourStop());
      }
    },
    _captureThumbnail: function (tourStop) {
      const $this = this;

      WWTControl.singleton.captureThumbnail(blob => {
        const filename = ss.format('{0}.thumb.png', tourStop.get_id());
        $this._tour.addCachedFile(filename, blob);
        tourStop.set_thumbnail($this._tour.getCachedTexture(filename, () => {
          $this.tourStopList.refresh();
        }));
      });
    },
    _properties_Click: (sender, e) => {
      throw new Error('The method or operation is not implemented.');
    },
    tourStopList_AddNewSlide: function (sender, e) {
      this.addSlide(false);
      this.tourStopList.ensureAddVisible();
    },
    _addNewSlide_Click: function (sender, e) {
      this.addSlide(false);
      this.tourStopList.ensureAddVisible();
    },
    _insertNewSlide_Click: function (sender, e) {
      this.addSlide(true);
    },
    addSlide: function (insert) {
      Undo.push(new UndoTourSlidelistChange(Language.getLocalizedText(426, 'Add New Slide'), this._tour));
      Cursor.set_current(Cursors.get_waitCursor());
      const placeName = 'Current Screen';
      const newPlace = Place.createCameraParams(placeName, WWTControl.singleton.renderContext.viewCamera.copy(), 268435456, WWTControl.singleton.constellation, WWTControl.singleton.renderContext.get_backgroundImageset().get_dataSetType(), WWTControl.singleton.renderContext.get_solarSystemTrack());
      newPlace.set_studyImageset(WWTControl.singleton.renderContext.get_foregroundImageset());
      newPlace.set_backgroundImageset(WWTControl.singleton.renderContext.get_backgroundImageset().get_stockImageSet());
      const newTourStop = TourStop.create(newPlace);
      if (insert) {
        this._tour.insertTourStop(newTourStop);
      } else {
        this._tour.addTourStop(newTourStop);
      }
      if (this._tour.get_currentTourStop() != null) {
        this.musicTrack.target = this._tour.get_currentTourStop();
        this.voiceTrack.target = this._tour.get_currentTourStop();
      } else {
        this.musicTrack.target = null;
        this.voiceTrack.target = null;
      }
      this._tour.get_currentTourStop().layers = LayerManager._getVisibleLayerList(this._tour.get_currentTourStop().layers);
      this._captureThumbnail(newTourStop);
      this.tourStopList.selectedItem = this.tourStopList.findItem(newTourStop);
      this.tourStopList.refresh();
      this.tourEditorUI.clearSelection();
      Cursor.set_current(Cursors.get_defaultV());
      TimeLine.refreshUi();
    },
    _deleteMenu_Click: function (sender, e) {
      Undo.push(new UndoTourSlidelistChange(Language.getLocalizedText(534, 'Delete Slide'), this._tour));
      const $enum1 = ss.enumerate(ss.keys(this.tourStopList.selectedItems));
      while ($enum1.moveNext()) {
        const key = $enum1.current;
        const item = this.tourStopList.selectedItems[key];
        this._tour.removeTourStop(item);
      }
      ss.clearKeys(this.tourStopList.selectedItems);
      this.tourStopList.selectedItem = -1;
      this._tour.set_currentTourStop(null);
      this.musicTrack.target = null;
      this.voiceTrack.target = null;
      this.tourStopList.refresh();
      this.tourEditorUI.clearSelection();
    },
    _pasteMenu_Click: function (sender, e) {
      if (this.tourEditorUI.clipboardType === 'WorldWideTelescope.Slide') {
        Undo.push(new UndoTourSlidelistChange(Language.getLocalizedText(535, 'Paste Slide'), this._tour));
        const xParser = new DOMParser();
        const doc = xParser.parseFromString(this.tourEditorUI.clipboardData, 'text/xml');
        const node = Util.selectSingleNode(doc, 'TourStops');
        const pasteStack = new ss.Stack();
        const $enum1 = ss.enumerate(node.childNodes);
        while ($enum1.moveNext()) {
          const child = $enum1.current;
          if (child.nodeName === 'TourStop') {
            var ts = TourStop._fromXml(this._tour, child);
            ts.set_id(Guid.newGuid().toString());
            pasteStack.push(ts);
          }
        }
        ss.clearKeys(this.tourStopList.selectedItems);
        let curIndex = this.tourStopList.selectedItem + pasteStack.count - 1;
        while (pasteStack.count > 0) {
          var ts = pasteStack.pop();
          this._tour.insertTourStop(ts);
          this.tourStopList.selectedItems[curIndex--] = ts;
        }
        this.tourStopList.refresh();
        this.tourEditorUI.clearSelection();
      }
    },
    _copyMenu_Click: function (sender, e) {
      const writer = new XmlTextWriter();
      writer._writeProcessingInstruction('xml', 'version=\'1.0\' encoding=\'UTF-8\'');
      writer._writeStartElement('TourStops');
      const $enum1 = ss.enumerate(ss.keys(this.tourStopList.selectedItems));
      while ($enum1.moveNext()) {
        const key = $enum1.current;
        const item = this.tourStopList.selectedItems[key];
        item._saveToXml(writer, true);
      }
      writer._writeEndElement();
      this.tourEditorUI.clipboardType = 'WorldWideTelescope.Slide';
      this.tourEditorUI.clipboardData = writer.body;
    },
    _cutMenu_Click: function (sender, e) {
      Undo.push(new UndoTourSlidelistChange(Language.getLocalizedText(536, 'Cut Slide'), this._tour));
      this._copyMenu_Click(sender, e);
      const $enum1 = ss.enumerate(ss.keys(this.tourStopList.selectedItems));
      while ($enum1.moveNext()) {
        const key = $enum1.current;
        const item = this.tourStopList.selectedItems[key];
        this._tour.removeTourStop(item);
      }
      ss.clearKeys(this.tourStopList.selectedItems);
      this.tourStopList.refresh();
      this.tourEditorUI.clearSelection();
    },
    pauseTour: function () {
      if (this.playing) {
        this.playing = false;
      }
      this.setPlayPauseMode();
    },
    preview_Click: function (sender, e) {
      this.playing = !this.playing;
      if (this.playing && this._tour.get_editMode()) {
        this.get_tour().set_currentTourstopIndex(-1);
      }
      this.setPlayPauseMode();
    },
    setPlayPauseMode: function () {
      if (this._tour.get_editMode()) {
        if (this.playing) {
          if (this._player == null) {
            this._player = new TourPlayer();
          }
          this._player.set_tour(this._tour);
          WWTControl.singleton.uiController = this._player;
          this._player.play();
          this.tourStopList.showAddButton = false;
        } else {
          WWTControl.singleton.uiController = this.tourEditorUI;
          if (this._player != null) {
            this._player.stop(false);
          }
          this._player = null;
          WWTControl.singleton.set__mover(null);
          this.tourStopList.showAddButton = this._tour.get_editMode();
        }
      } else {
        if (this.playing) {
          if (this._player == null) {
            this._player = new TourPlayer();
          }
          this._player.set_tour(this._tour);
          WWTControl.singleton.uiController = this._player;
          this._player.play();
          this.tourStopList.showAddButton = false;
        } else {
          WWTControl.singleton.uiController = null;
          WWTControl.singleton.renderContext.freezeView();
          if (this._player != null) {
            this._player.stop(false);
          }
          this._player = null;
          WWTControl.singleton.uiController = null;
          WWTControl.singleton.set__mover(null);
          this.tourStopList.showAddButton = this._tour.get_editMode();
        }
      }
      this.tourStopList.refresh();
    },
    playerTimer_Tick: function (sender, e) {
      if (this.playing) {
        if (this._player != null) {
          if (!TourPlayer.get_playing()) {
            this.playing = false;
            this.setPlayPauseMode();
          } else {
            if (this.tourStopList.selectedItem !== this._tour.get_currentTourstopIndex()) {
              this.tourStopList.selectedItem = this._tour.get_currentTourstopIndex();
            }
          }
        }
      }
    },
    insertShapeCircle_Click: function (sender, e) {
      this.tourEditorUI.addShape('', 0);
    },
    insertShapeRectangle_Click: function (sender, e) {
      this.tourEditorUI.addShape('', 1);
    },
    insertShapeLine_Click: function (sender, e) {
      this.tourEditorUI.addShape('', 5);
    },
    insertDonut_Click: function (sender, e) {
      this.tourEditorUI.addShape('', 3);
    },
    _addArrow_Click: function (sender, e) {
      this.tourEditorUI.addShape('', 4);
    },
    insertVideo_Click: (sender, e) => {
    },
    insertAudio_Click: (sender, e) => {
    },
    insertHyperlink_Click: (sender, e) => {
    },
    colorPicker_Click: (sender, e) => {
    },
    tourEditTab_Leave: (sender, e) => {
    },
    editTourProperties_Click: (sender, e) => {
    },
    saveTour_Click: function (sender, e) {
      this.save(false);
    },
    save: saveAs => true,
    addVideo_Click: (sender, e) => {
    },
    addPicture_Click: (sender, e) => {
    },
    addShape_Click: (sender, e) => {
    },
    _addOpenRectangle_Click: function (sender, e) {
      this.tourEditorUI.addShape('', 6);
    },
    _addStar_Click: function (sender, e) {
      this.tourEditorUI.addShape('', 2);
    },
    addText_Click: (sender, e) => {
    },
    preview_EnabledChanged: function (sender, e) {
      if (this.playing) {
      } else {
      }
    },
    preview_MouseEnter: (sender, e) => {
    },
    preview_MouseLeave: (sender, e) => {
    },
    preview_MouseUp: (sender, e) => {
    },
    preview_MouseDown: (sender, e) => {
    },
    tourStopList_ItemHover: (sender, e) => {
    },
    refresh: () => {
    },
    undoStep: function () {
      if (Undo.peekAction()) {
        Undo.stepBack();
        this.tourStopList.refresh();
        this.tourStopList.selectedItem = this._tour.get_currentTourstopIndex();
        this.showSlideStartPosition(this._tour.get_currentTourStop());
        this.refresh();
        OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.tourEditorUI.selection);
      }
    },
    redoStep: function () {
      if (Undo.peekRedoAction()) {
        Undo.stepForward();
        this.tourStopList.refresh();
        this.tourStopList.selectedItem = this._tour.get_currentTourstopIndex();
        this.showSlideStartPosition(this._tour.get_currentTourStop());
        this.refresh();
        OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.tourEditorUI.selection);
      }
    },
    tourStopList_ShowEndPosition: function (sender, e) {
      this._showEndSkyPosition_Click(this, new ss.EventArgs());
    },
    tourStopList_ShowStartPosition: function (sender, e) {
      this.showSlideStartPosition(this.get_tour().get_currentTourStop());
      this.tourEditorUI.clearSelection();
    },
    tourStopList_KeyDown: function (sender, e) {
      if (e.ctrlKey) {
        switch (e.keyCode) {
          case 67:
            this._copyMenu_Click(null, new ss.EventArgs());
            break;
          case 86:
            this._pasteMenu_Click(null, new ss.EventArgs());
            break;
          case 88:
            this._cutMenu_Click(null, new ss.EventArgs());
            break;
          case 90:
            if (Undo.peekAction()) {
              TourEdit._undoStep();
            } else {
              UiTools._beep();
            }
            break;
          case 89:
            if (Undo.peekRedoAction()) {
              TourEdit._redoStep();
            } else {
              UiTools._beep();
            }
            break;
        }
      }
      if (e.keyCode === 46) {
        this._deleteMenu_Click(null, new ss.EventArgs());
      }
    },
    _ensureSelectedVisible: function () {
      this.tourStopList.ensureSelectedVisible();
    }
  };

  function TourEditor() {
    this.selection = new Selection();
    this._contextMenu = new ContextMenuStrip();
    this._tour = null;
    this._mouseDown = false;
    this._selectionAction = 11;
    this._needUndoFrame = false;
    this._contextPoint = new Vector2d();
    this._dragCopying = false;
    this._brokeThreshold = false;
    this.nextSlideCallback = null;
    this.clipboardData = '';
    this.clipboardType = '';
    this.editTextCallback = null;
    this._defaultColor = Colors.get_white();
  }
  const TourEditor$ = {
    render: function (renderContext) {
      renderContext.setupMatricesOverlays();
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      const $enum1 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        if (overlay.get_animate() && this.get_tour().get_currentTourStop().get_keyFramed()) {
          overlay.set_tweenFactor(this._tour.get_currentTourStop().get_tweenPosition());
        } else if (!this.get_tour().get_currentTourStop().get_keyFramed()) {
          overlay.set_tweenFactor((this._tour.get_currentTourStop().get_tweenPosition() < 0.5) ? 0 : 1);
        }
        overlay.draw3D(renderContext, true);
      }
      this.selection.draw3D(renderContext, 1);
      if (TourEditor.currentEditor != null) {
        TourEditor.currentEditor.render(renderContext);
      }
      Settings.tourSettings = null;
    },
    get_tour: function () {
      return this._tour;
    },
    set_tour: function (value) {
      this._tour = value;
      return value;
    },
    close: function () {
      if (this._tour != null) {
        this._tour = null;
        this.set_focus(null);
      }
    },
    clearSelection: function () {
      this.selection.clearSelection();
      OverlayList._updateOverlayListSelection(this.selection);
      this.set_focus(null);
    },
    get_focus: function () {
      return this.selection.get_focus();
    },
    set_focus: function (value) {
      this.selection.set_focus(value);
      return value;
    },
    pointToView: pnt => {
      const clientHeight = WWTControl.singleton.renderContext.height;
      const clientWidth = WWTControl.singleton.renderContext.width;
      const viewWidth = (WWTControl.singleton.renderContext.width / WWTControl.singleton.renderContext.height) * 1116;
      const x = ((pnt.x) / (clientWidth) * viewWidth) - ((viewWidth - 1920) / 2);
      const y = (pnt.y) / clientHeight * 1116;
      return Vector2d.create(x, y);
    },
    mouseDown: function (sender, e) {
      this._brokeThreshold = false;
      this._needUndoFrame = true;
      const location = this.pointToView(Vector2d.create(e.offsetX, e.offsetY));
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        this._needUndoFrame = false;
        return false;
      }
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.mouseDown(sender, e)) {
          return true;
        }
      }
      if (this.get_focus() != null) {
        if (this.selection.get_multiSelect()) {
          const $enum1 = ss.enumerate(this.selection.selectionSet);
          while ($enum1.moveNext()) {
            const overlay = $enum1.current;
            if (overlay.hitTest(location)) {
              this._selectionAction = 9;
              this._mouseDown = true;
              this._pointDown = location;
              this.set_focus(overlay);
              if (e.ctrlKey) {
                this._dragCopying = true;
              }
              return true;
            }
          }
        } else {
          if (this.get_focus().hitTest(location)) {
            this._selectionAction = 9;
            this._mouseDown = true;
            this._pointDown = location;
            if (e.ctrlKey) {
              this._dragCopying = true;
            }
            return true;
          }
        }
        const hit = this.selection.hitTest(location);
        if (hit !== 11) {
          this._selectionAction = hit;
          this._mouseDown = true;
          if (hit === 8) {
            this._pointDown = location;
          } else {
            this._pointDown = this.selection.pointToSelectionSpace(location);
          }
          return true;
        }
      }
      for (let i = this._tour.get_currentTourStop().get_overlays().length - 1; i >= 0; i--) {
        if (this._tour.get_currentTourStop().get_overlays()[i].hitTest(location)) {
          this._selectionAction = 9;
          this.set_focus(this._tour.get_currentTourStop().get_overlays()[i]);
          if (e.ctrlKey || e.shiftKey) {
            this.selection.addSelection(this.get_focus());
          } else {
            this.selection.setSelection(this.get_focus());
          }
          OverlayList._updateOverlayListSelection(this.selection);
          this._mouseDown = true;
          this._pointDown = location;
          return true;
        }
      }
      this.set_focus(null);
      this.clearSelection();
      this._needUndoFrame = false;
      return false;
    },
    mouseUp: function (sender, e) {
      this._brokeThreshold = false;
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.mouseUp(sender, e)) {
          return true;
        }
      }
      this._contextPoint = Vector2d.create(e.offsetX, e.offsetY);
      if (this._mouseDown) {
        this._mouseDown = false;
        if (e.button === 2) {
          if (this.get_focus() != null) {
            this.showSelectionContextMenu(Vector2d.create(e.offsetX, e.offsetY));
          }
        }
        return true;
      }
      if (e.button === 2) {
        if (this.get_focus() == null) {
          this._showNoSelectionContextMenu(Vector2d.create(e.offsetX, e.offsetY));
        }
        return true;
      }
      return false;
    },
    mouseMove: function (sender, e) {
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.mouseMove(sender, e)) {
          return true;
        }
      }
      const location = this.pointToView(Vector2d.create(e.offsetX, e.offsetY));
      if (this._mouseDown && this.get_focus() != null) {
        let undoFrame = null;
        let actionText = Language.getLocalizedText(502, 'Edit');
        if (this._needUndoFrame) {
          undoFrame = new UndoTourStopChange(Language.getLocalizedText(502, 'Edit'), this._tour);
        }
        let moveX;
        let moveY;
        if (this._selectionAction !== 9 && this._selectionAction !== 8) {
          const newPoint = this.selection.pointToSelectionSpace(location);
          moveX = newPoint.x - this._pointDown.x;
          moveY = newPoint.y - this._pointDown.y;
          this._pointDown = newPoint;
        } else {
          moveX = location.x - this._pointDown.x;
          moveY = location.y - this._pointDown.y;
          if (this._selectionAction === 9 && !this._brokeThreshold) {
            if (Math.abs(moveX) > 3 || Math.abs(moveY) > 3) {
              this._brokeThreshold = true;
            } else {
              return true;
            }
          }
          this._pointDown = location;
        }
        if (this._dragCopying) {
          if (this.selection.get_multiSelect()) {
            const set = this.selection.selectionSet;
            this.clearSelection();
            const $enum1 = ss.enumerate(set);
            while ($enum1.moveNext()) {
              var overlay = $enum1.current;
              var newOverlay = this.addOverlay(overlay);
              newOverlay.set_x(overlay.get_x());
              newOverlay.set_y(overlay.get_y());
              this.set_focus(newOverlay);
              this.selection.addSelection(this.get_focus());
            }
            OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
            this._dragCopying = false;
          } else {
            var newOverlay = this.addOverlay(this.get_focus());
            newOverlay.set_x(this.get_focus().get_x());
            newOverlay.set_y(this.get_focus().get_y());
            this.set_focus(newOverlay);
            this.selection.setSelection(this.get_focus());
            OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
            this._dragCopying = false;
          }
        }
        const aspect = this.get_focus().get_width() / this.get_focus().get_height();
        let center = Vector2d.create(this.get_focus().get_x(), this.get_focus().get_y());
        if (e.ctrlKey) {
          actionText = Language.getLocalizedText(537, 'Resize');
          switch (this._selectionAction) {
            case 0:
              this.get_focus().set_width(Math.max(2, this.get_focus().get_width() - moveX * 2));
              this.get_focus().set_height(Math.max(2, this.get_focus().get_height() - (moveX / aspect) * 2));
              break;
            case 1:
              this.get_focus().set_height(Math.max(2, this.get_focus().get_height() - moveY * 2));
              break;
            case 2:
              this.get_focus().set_width(Math.max(2, this.get_focus().get_width() + moveX * 2));
              this.get_focus().set_height(Math.max(2, this.get_focus().get_height() + (moveX / aspect) * 2));
              break;
            case 3:
              this.get_focus().set_width(Math.max(2, this.get_focus().get_width() + moveX * 2));
              break;
            case 4:
              this.get_focus().set_width(Math.max(2, this.get_focus().get_width() + moveX * 2));
              this.get_focus().set_height(Math.max(2, this.get_focus().get_height() + (moveX / aspect) * 2));
              break;
            case 5:
              this.get_focus().set_height(Math.max(2, this.get_focus().get_height() + moveY * 2));
              break;
            case 6:
              this.get_focus().set_width(Math.max(2, this.get_focus().get_width() - moveX * 2));
              this.get_focus().set_height(Math.max(2, this.get_focus().get_height() - (moveX / aspect) * 2));
              break;
            case 7:
              this.get_focus().set_width(Math.max(2, this.get_focus().get_width() - moveX * 2));
              break;
            case 8:
              actionText = Language.getLocalizedText(538, 'Rotate');
              this.get_focus().set_rotationAngle(this.get_focus().get_rotationAngle() + moveX / 10);
              break;
            case 9:
              actionText = Language.getLocalizedText(539, 'Drag Copy');
              center.x += moveX;
              center.y += moveY;
              break;
            case 10:
              break;
            case 11:
              break;
            default:
              break;
          }
        } else {
          if (this._selectionAction !== 8 && this._selectionAction !== 9) {
            if (moveX > (this.get_focus().get_width() - 2)) {
              moveX = 0;
            }
            if (moveY > (this.get_focus().get_height() - 2)) {
              moveY = 0;
            }
          }
          actionText = Language.getLocalizedText(537, 'Resize');
          switch (this._selectionAction) {
            case 0:
              this.get_focus().set_width(this.get_focus().get_width() - moveX);
              this.get_focus().set_height(this.get_focus().get_height() - (moveX / aspect));
              center.x += (moveX / 2);
              center.y += ((moveX / aspect) / 2);
              break;
            case 1:
              this.get_focus().set_height(this.get_focus().get_height() - moveY);
              center.y += (moveY / 2);
              break;
            case 2:
              this.get_focus().set_width(this.get_focus().get_width() + moveX);
              this.get_focus().set_height(this.get_focus().get_height() + (moveX / aspect));
              center.x += (moveX / 2);
              center.y -= ((moveX / aspect) / 2);
              break;
            case 3:
              this.get_focus().set_width(this.get_focus().get_width() + moveX);
              center.x += (moveX / 2);
              break;
            case 4:
              this.get_focus().set_width(this.get_focus().get_width() + moveX);
              this.get_focus().set_height(this.get_focus().get_height() + (moveX / aspect));
              center.x += (moveX / 2);
              center.y += ((moveX / aspect) / 2);
              break;
            case 5:
              this.get_focus().set_height(this.get_focus().get_height() + moveY);
              center.y += (moveY / 2);
              break;
            case 6:
              this.get_focus().set_width(this.get_focus().get_width() - moveX);
              this.get_focus().set_height(this.get_focus().get_height() - (moveX / aspect));
              center.x += (moveX / 2);
              center.y -= ((moveX / aspect) / 2);
              break;
            case 7:
              this.get_focus().set_width(this.get_focus().get_width() - moveX);
              center.x += (moveX / 2);
              break;
            case 8:
              actionText = Language.getLocalizedText(538, 'Rotate');
              this.get_focus().set_rotationAngle(this.get_focus().get_rotationAngle() + moveX);
              break;
            case 9:
              actionText = Language.getLocalizedText(540, 'Move');
              center.x += moveX;
              center.y += moveY;
              break;
            case 10:
              break;
            case 11:
              break;
            default:
              break;
          }
        }
        if (this._selectionAction !== 9 && this._selectionAction !== 8) {
          center = this.selection.pointToScreenSpace(center);
        }
        if (this.selection.get_multiSelect()) {
          const $enum2 = ss.enumerate(this.selection.selectionSet);
          while ($enum2.moveNext()) {
            var overlay = $enum2.current;
            overlay.set_x(overlay.get_x() + moveX);
            overlay.set_y(overlay.get_y() + moveY);
          }
        } else {
          this.get_focus().set_x(center.x);
          this.get_focus().set_y(center.y);
        }
        if (this._needUndoFrame) {
          this._needUndoFrame = false;
          undoFrame.set_actionText(actionText);
          Undo.push(undoFrame);
        }
      } else {
        if (this.get_focus() != null) {
          if (this.get_focus().hitTest(location)) {
            Cursor.set_current(Cursors.get_sizeAll());
            return false;
          }
          const hit = this.selection.hitTest(location);
          if (hit === 11) {
            return false;
          }
          switch (hit) {
            case 0:
              Cursor.set_current(Cursors.get_sizeNWSE());
              break;
            case 1:
              Cursor.set_current(Cursors.get_sizeNS());
              break;
            case 2:
              Cursor.set_current(Cursors.get_sizeNESW());
              break;
            case 3:
              Cursor.set_current(Cursors.get_sizeWE());
              break;
            case 4:
              Cursor.set_current(Cursors.get_sizeNWSE());
              break;
            case 5:
              Cursor.set_current(Cursors.get_sizeNS());
              break;
            case 6:
              Cursor.set_current(Cursors.get_sizeNESW());
              break;
            case 7:
              Cursor.set_current(Cursors.get_sizeWE());
              break;
            case 8:
              Cursor.set_current(Cursors.get_sizeWE());
              break;
            case 10:
              break;
            case 11:
              break;
            default:
              break;
          }
        }
      }
      return false;
    },
    _showNoSelectionContextMenu: function (position) {
      if (this._contextMenu != null) {
        this._contextMenu._dispose();
      }
      if (this._tour.get_currentTourStop() == null) {
        return;
      }
      this._contextMenu = new ContextMenuStrip();
      const pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(425, 'Paste'));
      pasteMenu.enabled = this.clipboardType === 'WorldWideTelescope.Overlay';
      pasteMenu.click = ss.bind('_pasteMenu_Click', this);
      this._contextMenu.items.push(pasteMenu);
      this._contextMenu._show(position);
    },
    _addOpenRectangle_Click: function (sender, e) {
      this.addShape('', 6);
    },
    _addStar_Click: function (sender, e) {
      this.addShape('', 2);
    },
    _insertShapeCircle_Click: function (sender, e) {
      this.addShape('', 0);
    },
    _insertShapeRectangle_Click: function (sender, e) {
      this.addShape('', 1);
    },
    _insertShapeLine_Click: function (sender, e) {
      this.addShape('', 5);
    },
    _insertDonut_Click: function (sender, e) {
      this.addShape('', 3);
    },
    _addArrow_Click: function (sender, e) {
      this.addShape('', 4);
    },
    showSelectionContextMenu: function (position) {
      if (this.get_focus() == null) {
        return;
      }
      const multiSelect = this.selection.get_multiSelect();
      if (this._contextMenu != null) {
        this._contextMenu._dispose();
      }
      this._contextMenu = new ContextMenuStrip();
      const cutMenu = ToolStripMenuItem.create(Language.getLocalizedText(427, 'Cut'));
      const copyMenu = ToolStripMenuItem.create(Language.getLocalizedText(428, 'Copy'));
      const pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(425, 'Paste'));
      const deleteMenu = ToolStripMenuItem.create(Language.getLocalizedText(167, 'Delete'));
      const sep1 = new ToolStripSeparator();
      const sep2 = new ToolStripSeparator();
      const sep3 = new ToolStripSeparator();
      const bringToFront = ToolStripMenuItem.create(Language.getLocalizedText(452, 'Bring to Front'));
      const sendToBack = ToolStripMenuItem.create(Language.getLocalizedText(453, 'Send to Back'));
      const bringForward = ToolStripMenuItem.create(Language.getLocalizedText(454, 'Bring Forward'));
      const sendBackward = ToolStripMenuItem.create(Language.getLocalizedText(455, 'Send Backward'));
      const properties = ToolStripMenuItem.create(Language.getLocalizedText(20, 'Properties'));
      const editText = ToolStripMenuItem.create(Language.getLocalizedText(502, 'Edit'));
      const url = ToolStripMenuItem.create(Language.getLocalizedText(587, 'Hyperlink'));
      let linkString = this.get_focus().get_linkID();
      switch (this.get_focus().get_linkID()) {
        case '':
        case null:
          linkString = ' (' + Language.getLocalizedText(609, 'No Link') + ')';
          break;
        case 'Next':
          linkString = ' (' + Language.getLocalizedText(610, 'Next Slide') + ')';
          break;
        case 'Return':
          linkString = ' (' + Language.getLocalizedText(602, 'Return to Caller') + ')';
          break;
        default:
          const index = this.get_tour().getTourStopIndexByID(this.get_focus().get_linkID());
          if (index > -1) {
            if (ss.emptyString(this._tour.get_tourStops()[index].get_description())) {
              linkString = ss.format(' (' + Language.getLocalizedText(1340, 'Slide') + ' {0})', index);
            } else {
              linkString = ' (' + this._tour.get_tourStops()[index].get_description() + ')';
            }
          }
          break;
      }
      const animateMenu = ToolStripMenuItem.create(Language.getLocalizedText(588, 'Animate'));
      const linkID = ToolStripMenuItem.create(Language.getLocalizedText(589, 'Link to Slide') + linkString);
      const pickColor = ToolStripMenuItem.create(Language.getLocalizedText(458, 'Color/Opacity'));
      const flipbookProperties = ToolStripMenuItem.create(Language.getLocalizedText(630, 'Flipbook Properties'));
      const interpolateMenu = ToolStripMenuItem.create(Language.getLocalizedText(1029, 'Animation Tween Type'));
      const Linear = ToolStripMenuItem.create(Language.getLocalizedText(1030, 'Linear'));
      const Ease = ToolStripMenuItem.create(Language.getLocalizedText(1031, 'Ease In/Out'));
      const EaseIn = ToolStripMenuItem.create(Language.getLocalizedText(1032, 'Ease In'));
      const EaseOut = ToolStripMenuItem.create(Language.getLocalizedText(1033, 'Ease Out'));
      const Exponential = ToolStripMenuItem.create(Language.getLocalizedText(1034, 'Exponential'));
      const Default = ToolStripMenuItem.create(Language.getLocalizedText(1035, 'Slide Default'));
      const Align = ToolStripMenuItem.create(Language.getLocalizedText(790, 'Align'));
      const AlignTop = ToolStripMenuItem.create(Language.getLocalizedText(1333, 'Top'));
      const AlignBottom = ToolStripMenuItem.create(Language.getLocalizedText(1334, 'Bottom'));
      const AlignLeft = ToolStripMenuItem.create(Language.getLocalizedText(1335, 'Left'));
      const AlignRight = ToolStripMenuItem.create(Language.getLocalizedText(1336, 'Right'));
      const AlignHorizon = ToolStripMenuItem.create(Language.getLocalizedText(1337, 'Horizontal'));
      const AlignVertical = ToolStripMenuItem.create(Language.getLocalizedText(1338, 'Vertical'));
      const AlignCenter = ToolStripMenuItem.create(Language.getLocalizedText(1339, 'Centered'));
      Align.dropDownItems.push(AlignTop);
      Align.dropDownItems.push(AlignBottom);
      Align.dropDownItems.push(AlignLeft);
      Align.dropDownItems.push(AlignRight);
      Align.dropDownItems.push(AlignHorizon);
      Align.dropDownItems.push(AlignVertical);
      Align.dropDownItems.push(AlignCenter);
      Linear.tag = 0;
      Ease.tag = 3;
      EaseIn.tag = 1;
      EaseOut.tag = 2;
      Exponential.tag = 4;
      Default.tag = 5;
      Linear.click = ss.bind('_interpolation_Click', this);
      Ease.click = ss.bind('_interpolation_Click', this);
      EaseIn.click = ss.bind('_interpolation_Click', this);
      EaseOut.click = ss.bind('_interpolation_Click', this);
      Exponential.click = ss.bind('_interpolation_Click', this);
      Default.click = ss.bind('_interpolation_Click', this);
      switch (this.get_focus().get_interpolationType()) {
        case 0:
          Linear.checked = true;
          break;
        case 1:
          EaseIn.checked = true;
          break;
        case 2:
          EaseOut.checked = true;
          break;
        case 3:
          Ease.checked = true;
          break;
        case 4:
          Exponential.checked = true;
          break;
        case 5:
          Default.checked = true;
          break;
        default:
          break;
      }
      interpolateMenu.dropDownItems.push(Default);
      interpolateMenu.dropDownItems.push(Linear);
      interpolateMenu.dropDownItems.push(Ease);
      interpolateMenu.dropDownItems.push(EaseIn);
      interpolateMenu.dropDownItems.push(EaseOut);
      interpolateMenu.dropDownItems.push(Exponential);
      cutMenu.click = ss.bind('_cutMenu_Click', this);
      copyMenu.click = ss.bind('_copyMenu_Click', this);
      deleteMenu.click = ss.bind('_deleteMenu_Click', this);
      bringToFront.click = ss.bind('_bringToFront_Click', this);
      sendToBack.click = ss.bind('_sendToBack_Click', this);
      sendBackward.click = ss.bind('_sendBackward_Click', this);
      bringForward.click = ss.bind('_bringForward_Click', this);
      properties.click = ss.bind('_properties_Click', this);
      editText.click = ss.bind('_editText_Click', this);
      url.click = ss.bind('_url_Click', this);
      pickColor.click = ss.bind('_pickColor_Click', this);
      pasteMenu.click = ss.bind('_pasteMenu_Click', this);
      animateMenu.click = ss.bind('_animateMenu_Click', this);
      flipbookProperties.click = ss.bind('_flipbookProperties_Click', this);
      linkID.click = ss.bind('_linkID_Click', this);
      AlignTop.click = ss.bind('_alignTop_Click', this);
      AlignBottom.click = ss.bind('_alignBottom_Click', this);
      AlignLeft.click = ss.bind('_alignLeft_Click', this);
      AlignRight.click = ss.bind('_alignRight_Click', this);
      AlignHorizon.click = ss.bind('_alignHorizon_Click', this);
      AlignVertical.click = ss.bind('_alignVertical_Click', this);
      AlignCenter.click = ss.bind('_alignCenter_Click', this);
      this._contextMenu.items.push(cutMenu);
      this._contextMenu.items.push(copyMenu);
      this._contextMenu.items.push(pasteMenu);
      this._contextMenu.items.push(deleteMenu);
      this._contextMenu.items.push(sep1);
      this._contextMenu.items.push(bringToFront);
      this._contextMenu.items.push(sendToBack);
      this._contextMenu.items.push(bringForward);
      this._contextMenu.items.push(sendBackward);
      this._contextMenu.items.push(Align);
      this._contextMenu.items.push(sep2);
      pasteMenu.enabled = false;
      this._contextMenu.items.push(pickColor);
      this._contextMenu.items.push(url);
      this._contextMenu.items.push(linkID);
      this._contextMenu.items.push(animateMenu);
      this._contextMenu.items.push(sep3);
      this._contextMenu.items.push(flipbookProperties);
      animateMenu.checked = this.get_focus().get_animate();
      this._contextMenu.items.push(interpolateMenu);
      interpolateMenu.enabled = this.get_focus().get_animate();
      flipbookProperties.visible = (ss.canCast(this.get_focus(), FlipbookOverlay));
      sep3.visible = (ss.canCast(this.get_focus(), FlipbookOverlay));
      if (multiSelect) {
        url.visible = false;
        linkID.visible = false;
        properties.visible = false;
        flipbookProperties.visible = false;
        bringForward.visible = false;
        sendBackward.visible = false;
      } else {
        Align.visible = false;
      }
      this._contextMenu.items.push(properties);
      if (this.get_focus() != null) {
        if (ss.typeOf(this.get_focus()) === TextOverlay) {
          this._contextMenu.items.push(editText);
        }
      }
      this._contextMenu._show(position);
    },
    _editText_Click: function (sender, e) {
      if (this.get_focus() != null) {
        if (ss.typeOf(this.get_focus()) === TextOverlay) {
          this._editText();
        }
      }
    },
    _alignVertical_Click: function (sender, e) {
      if (this.get_focus() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(1036, 'Vertical Align'), this._tour));
      const xCenter = this.get_focus().get_x();
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_x(xCenter);
      }
    },
    _alignHorizon_Click: function (sender, e) {
      if (this.get_focus() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(1037, 'Horizontal Align'), this._tour));
      const yCenter = this.get_focus().get_y();
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_y(yCenter);
      }
    },
    _alignCenter_Click: function (sender, e) {
      if (this.get_focus() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(1038, 'Align Centers'), this._tour));
      const yCenter = this.get_focus().get_y();
      const xCenter = this.get_focus().get_x();
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_y(yCenter);
        overlay.set_x(xCenter);
      }
    },
    _alignRight_Click: function (sender, e) {
      if (this.get_focus() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(1040, 'Align Right'), this._tour));
      const left = this.get_focus().get_x() + this.get_focus().get_width() / 2;
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_x(left - overlay.get_width() / 2);
      }
    },
    _alignLeft_Click: function (sender, e) {
      if (this.get_focus() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(1041, 'Align Left'), this._tour));
      const right = this.get_focus().get_x() - this.get_focus().get_width() / 2;
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_x(right + overlay.get_width() / 2);
      }
    },
    _alignBottom_Click: function (sender, e) {
      if (this.get_focus() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(1042, 'Align Bottoms'), this._tour));
      const top = this.get_focus().get_y() + this.get_focus().get_height() / 2;
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_y(top - overlay.get_height() / 2);
      }
    },
    _alignTop_Click: function (sender, e) {
      if (this.get_focus() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(1039, 'Align Tops'), this._tour));
      const top = this.get_focus().get_y() - this.get_focus().get_height() / 2;
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_y(top + overlay.get_height() / 2);
      }
    },
    _interpolation_Click: function (sender, e) {
      const item = sender;
      if (this.get_focus() != null) {
        const $enum1 = ss.enumerate(this.selection.selectionSet);
        while ($enum1.moveNext()) {
          const overlay = $enum1.current;
          overlay.set_interpolationType(item.tag);
        }
      }
    },
    _linkSlideChosen: function () {
      if (this.selectDialog.get_OK()) {
        this.get_focus().set_linkID(this.selectDialog.get_id());
      }
    },
    _linkID_Click: function (sender, e) {
      this.selectDialog = new SelectLink(this.get_focus().get_linkID());
      this.nextSlideCallback(this.selectDialog, ss.bind('_linkSlideChosen', this));
    },
    _flipbookProperties_Click: (sender, e) => {
    },
    _animateMenu_Click: function (sender, e) {
      if (this.get_focus() != null) {
        Undo.push(new UndoTourStopChange(Language.getLocalizedText(588, 'Animate'), this._tour));
        const animate = !this.get_focus().get_animate();
        const $enum1 = ss.enumerate(this.selection.selectionSet);
        while ($enum1.moveNext()) {
          const overlay = $enum1.current;
          overlay.set_animate(animate);
        }
      }
    },
    _url_Click: function (sender, e) {
      const $this = this;

      if (this.get_focus() != null) {
        const input = new SimpleInput(Language.getLocalizedText(541, 'Edit Hyperlink'), Language.getLocalizedText(542, 'Url'), this.get_focus().get_url(), 2048);
        input.show(Cursor.get_position(), () => {
          Undo.push(new UndoTourStopChange(Language.getLocalizedText(541, 'Edit Hyperlink'), $this._tour));
          $this.get_focus().set_url(input.text);
        });
      }
    },
    _pickColor_Click: function (sender, e) {
      const $this = this;

      const picker = new ColorPicker();
      picker.color = this.get_focus().get_color();
      picker.callBack = () => {
        Undo.push(new UndoTourStopChange(Language.getLocalizedText(543, 'Edit Color'), $this._tour));
        const $enum1 = ss.enumerate($this.selection.selectionSet);
        while ($enum1.moveNext()) {
          const overlay = $enum1.current;
          overlay.set_color(picker.color);
        }
      };
      picker.show(e);
    },
    _volume_Click: function (sender, e) {
      const vol = new PopupVolume();
      vol.volume = (this.get_focus()).get_volume();
      vol.showDialog();
      (this.get_focus()).set_volume(vol.volume);
    },
    _deleteMenu_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(167, 'Delete'), this._tour));
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        this._tour.get_currentTourStop().removeOverlay(overlay);
      }
      this.set_focus(null);
      this.clearSelection();
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _properties_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(549, 'Properties Edit'), this._tour));
      const props = new OverlayProperties();
      props.overlay = this.get_focus();
      props.showDialog();
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _bringForward_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(454, 'Bring Forward'), this._tour));
      const $enum1 = ss.enumerate(this._getSortedSelection(false));
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        this._tour.get_currentTourStop().bringForward(overlay);
      }
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _sendBackward_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(455, 'Send Backward'), this._tour));
      const $enum1 = ss.enumerate(this._getSortedSelection(true));
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        this._tour.get_currentTourStop().sendBackward(overlay);
      }
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _sendToBack_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(453, 'Send to Back'), this._tour));
      const $enum1 = ss.enumerate(this._getSortedSelection(true));
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        this._tour.get_currentTourStop().sendToBack(overlay);
      }
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _bringToFront_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(452, 'Bring to Front'), this._tour));
      const $enum1 = ss.enumerate(this._getSortedSelection(false));
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        this._tour.get_currentTourStop().bringToFront(overlay);
      }
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _getSortedSelection: function (reverse) {
      const sorted = [];
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const ov = $enum1.current;
        sorted.push(ov);
      }
      if (reverse) {
        sorted.sort((p1, p2) => -Util.compare(p1.get_zOrder(), p2.get_zOrder()));
      } else {
        sorted.sort((p1, p2) => Util.compare(p1.get_zOrder(), p2.get_zOrder()));
      }
      return sorted;
    },
    _copyMenu_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      const writer = new XmlTextWriter();
      writer._writeProcessingInstruction('xml', 'version=\'1.0\' encoding=\'UTF-8\'');
      writer._writeStartElement('Overlays');
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.saveToXml(writer, true);
      }
      writer._writeEndElement();
      this.clipboardData = writer.body;
      this.clipboardType = 'WorldWideTelescope.Overlay';
    },
    _cutMenu_Click: function (sender, e) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(427, 'Cut'), this._tour));
      this._copyMenu_Click(sender, e);
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        this._tour.get_currentTourStop().removeOverlay(overlay);
      }
      this.set_focus(null);
      this.clearSelection();
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _pasteMenu_Click: function (sender, e) {
      Undo.push(new UndoTourSlidelistChange(Language.getLocalizedText(544, 'Paste Object'), this._tour));
      if (this.clipboardType === 'WorldWideTelescope.Overlay') {
        const xParser = new DOMParser();
        const doc = xParser.parseFromString(this.clipboardData, 'text/xml');
        this.clearSelection();
        const parent = Util.selectSingleNode(doc, 'Overlays');
        const $enum1 = ss.enumerate(parent.childNodes);
        while ($enum1.moveNext()) {
          const child = $enum1.current;
          if (child.nodeName === 'Overlay') {
            const copy = Overlay._fromXml(this._tour.get_currentTourStop(), child);
            let found = false;
            let maxX = 0;
            let maxY = 0;
            const $enum2 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
            while ($enum2.moveNext()) {
              const item = $enum2.current;
              if (item.id === copy.id && ss.typeOf(item) === ss.typeOf(copy)) {
                found = true;
                if (maxY < item.get_y() || maxX < item.get_x()) {
                  maxX = item.get_x();
                  maxY = item.get_y();
                }
              }
            }
            if (found) {
              copy.set_x(maxX + 20);
              copy.set_y(maxY + 20);
            }
            this._tour.get_currentTourStop().addOverlay(copy);
            this.set_focus(copy);
            this.selection.addSelection(this.get_focus());
            OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
          }
        }
      }
    },
    mouseClick: (sender, e) => {
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.mouseClick(sender, e)) {
          return true;
        }
      }
      return false;
    },
    click: (sender, e) => {
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.click(sender, e)) {
          return true;
        }
      }
      return false;
    },
    mouseDoubleClick: function (sender, e) {
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.mouseDoubleClick(sender, e)) {
          return true;
        }
      }
      if (this.get_focus() != null) {
        if (ss.typeOf(this.get_focus()) === TextOverlay) {
          this._editText();
          return true;
        }
      }
      return true;
    },
    _doneEditing: function () {
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(545, 'Text Edit'), this._tour));
      (this.get_focus()).set_width(0);
      (this.get_focus()).set_height(0);
      this.get_focus().set_color((this.get_focus()).textObject.foregroundColor);
      this.get_focus().cleanUp();
    },
    _editText: function () {
      const textObj = (this.get_focus()).textObject;
      this.editTextCallback(textObj, ss.bind('_doneEditing', this));
    },
    keyDown: function (sender, e) {
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.keyDown(sender, e)) {
          return true;
        }
      }
      let increment = 1;
      if (e.ctrlKey) {
        increment = 10;
      }
      switch (e.keyCode) {
        case 65:
          if (e.ctrlKey) {
            this.clearSelection();
            this.selection.addSelectionRange(this._tour.get_currentTourStop().get_overlays());
            OverlayList._updateOverlayListSelection(this.selection);
            if (this._tour.get_currentTourStop().get_overlays().length > 0) {
              this.set_focus(this._tour.get_currentTourStop().get_overlays()[0]);
            }
          }
          break;
        case 90:
          if (e.ctrlKey) {
            if (Undo.peekAction()) {
              TourEdit._undoStep();
            } else {
              UiTools._beep();
            }
          }
          break;
        case 89:
          if (e.ctrlKey) {
            if (Undo.peekRedoAction()) {
              TourEdit._redoStep();
            } else {
              UiTools._beep();
            }
          }
          break;
        case 67:
          if (e.ctrlKey) {
            this._copyMenu_Click(this, new ss.EventArgs());
          }
          break;
        case 86:
          if (e.ctrlKey) {
            this._pasteMenu_Click(this, new ss.EventArgs());
          }
          break;
        case 88:
          if (e.ctrlKey) {
            this._cutMenu_Click(this, new ss.EventArgs());
          }
          break;
        case 46:
          this._deleteMenu_Click(null, null);
          return true;
        case 9:
          if (e.shiftKey) {
            this._selectLast();
          } else {
            this._selectNext();
          }
          return true;
        case 37:
          if (this.get_focus() != null) {
            const $enum1 = ss.enumerate(this.selection.selectionSet);
            while ($enum1.moveNext()) {
              var overlay = $enum1.current;
              if (e.shiftKey) {
                if (e.altKey) {
                  if (overlay.get_width() > increment) {
                    Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                    overlay.set_width(overlay.get_width() - increment);
                  }
                } else {
                  var aspect = overlay.get_width() / overlay.get_height();
                  if (overlay.get_width() > increment && overlay.get_height() > (increment * aspect)) {
                    Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                    overlay.set_width(overlay.get_width() - increment);
                    overlay.set_height(overlay.get_height() - increment * aspect);
                  }
                }
              } else if (e.altKey) {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(538, 'Rotate'), this._tour));
                overlay.set_rotationAngle(overlay.get_rotationAngle() - increment);
              } else {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
                overlay.set_x(overlay.get_x() - increment);
              }
            }
            return true;
          }
          break;
        case 39:
          if (this.get_focus() != null) {
            const $enum2 = ss.enumerate(this.selection.selectionSet);
            while ($enum2.moveNext()) {
              var overlay = $enum2.current;
              if (e.shiftKey) {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                if (e.altKey) {
                  overlay.set_width(overlay.get_width() + increment);
                } else {
                  var aspect = overlay.get_width() / overlay.get_height();
                  overlay.set_width(overlay.get_width() + increment);
                  overlay.set_height(overlay.get_height() + increment * aspect);
                }
              } else if (e.altKey) {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(538, 'Rotate'), this._tour));
                overlay.set_rotationAngle(overlay.get_rotationAngle() + increment);
              } else {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
                overlay.set_x(overlay.get_x() + increment);
              }
            }
            return true;
          }
          break;
        case 38:
          if (this.get_focus() != null) {
            const $enum3 = ss.enumerate(this.selection.selectionSet);
            while ($enum3.moveNext()) {
              var overlay = $enum3.current;
              if (e.shiftKey) {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                if (e.altKey) {
                  overlay.set_height(overlay.get_height() + increment);
                } else {
                  var aspect = overlay.get_width() / overlay.get_height();
                  overlay.set_width(overlay.get_width() + increment);
                  overlay.set_height(overlay.get_height() + increment * aspect);
                }
              } else if (!e.altKey) {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
                overlay.set_y(overlay.get_y() - increment);
              }
            }
            return true;
          }
          break;
        case 40:
          if (this.get_focus() != null) {
            const $enum4 = ss.enumerate(this.selection.selectionSet);
            while ($enum4.moveNext()) {
              var overlay = $enum4.current;
              if (e.shiftKey) {
                if (e.altKey) {
                  if (overlay.get_height() > increment) {
                    Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                    overlay.set_height(overlay.get_height() - increment);
                  }
                } else {
                  var aspect = overlay.get_width() / overlay.get_height();
                  if (overlay.get_width() > increment && overlay.get_height() > (increment * aspect)) {
                    Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                    overlay.set_width(overlay.get_width() - increment);
                    overlay.set_height(overlay.get_height() - increment * aspect);
                  }
                }
              } else if (!e.altKey) {
                Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
                overlay.set_y(overlay.get_y() + increment);
              }
            }
            return true;
          }
          break;
        case 34:
          if (e.altKey) {
            if (this._tour.get_currentTourstopIndex() < (this._tour.get_tourStops().length - 1)) {
              this._tour.set_currentTourstopIndex(this._tour.get_currentTourstopIndex() + 1) - 1;
              TourEdit._selectCurrent();
              TourEdit._ensureSelectedVisible();
            }
            return true;
          }
          break;
        case 33:
          if (e.altKey) {
            if (this._tour.get_currentTourstopIndex() > 0) {
              this._tour.set_currentTourstopIndex(this._tour.get_currentTourstopIndex() - 1) + 1;
              TourEdit._selectCurrent();
              TourEdit._ensureSelectedVisible();
            }
            return true;
          }
          break;
      }
      return false;
    },
    _selectNext: function () {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      this.set_focus(this._tour.get_currentTourStop().getNextOverlay(this.get_focus()));
      this.selection.setSelection(this.get_focus());
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    _selectLast: function () {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      this.set_focus(this._tour.get_currentTourStop().getPerviousOverlay(this.get_focus()));
      this.selection.setSelection(this.get_focus());
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    },
    keyUp: (sender, e) => {
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.keyUp(sender, e)) {
          return true;
        }
      }
      return false;
    },
    addPicture: function (file) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return false;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(546, 'Insert Picture'), this._tour));
      const bmp = BitmapOverlay.create(this._tour.get_currentTourStop(), file);
      bmp.set_x(960);
      bmp.set_y(600);
      this._tour.get_currentTourStop().addOverlay(bmp);
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
      return true;
    },
    addFlipbook: filename => false,
    addAudio: function (file, music) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return false;
      }
      const audio = AudioOverlay.create(this._tour.get_currentTourStop(), file);
      audio.set_x(900);
      audio.set_y(600);
      if (music) {
        this._tour.get_currentTourStop().set_musicTrack(audio);
      } else {
        this._tour.get_currentTourStop().set_voiceTrack(audio);
      }
      return true;
    },
    addVideo: filename => true,
    addText: function (p, textObject) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return false;
      }
      const text = TextOverlay.create(textObject);
      text.set_color(textObject.foregroundColor);
      text.set_x(960);
      text.set_y(600);
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(547, 'Insert Text'), this._tour));
      this._tour.get_currentTourStop().addOverlay(text);
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
      return true;
    },
    addOverlay: function (ol) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return null;
      }
      if (ss.typeOf(ol) === ShapeOverlay) {
        const srcShapeOverlay = ol;
        if (srcShapeOverlay != null) {
          const shape = ShapeOverlay._create(this._tour.get_currentTourStop(), srcShapeOverlay.get_shapeType());
          shape.set_width(srcShapeOverlay.get_width());
          shape.set_height(srcShapeOverlay.get_height());
          shape.set_x(this._contextPoint.x);
          shape.set_y(this._contextPoint.y);
          shape.set_color(srcShapeOverlay.get_color());
          shape.set_rotationAngle(srcShapeOverlay.get_rotationAngle());
          this._tour.get_currentTourStop().addOverlay(shape);
          return shape;
        }
      } else if (ss.typeOf(ol) === TextOverlay) {
        const srcTxtOverlay = ol;
        if (srcTxtOverlay != null) {
          const text = TextOverlay.create(srcTxtOverlay.textObject);
          text.set_x(this._contextPoint.x);
          text.set_y(this._contextPoint.y);
          text.set_color(srcTxtOverlay.get_color());
          this._tour.get_currentTourStop().addOverlay(text);
          return text;
        }
      } else if (ss.typeOf(ol) === BitmapOverlay) {
        const srcBmpOverlay = ol;
        if (srcBmpOverlay != null) {
          var bitmap = srcBmpOverlay.copy(this._tour.get_currentTourStop());
          bitmap.set_x(this._contextPoint.x);
          bitmap.set_y(this._contextPoint.y);
          this._tour.get_currentTourStop().addOverlay(bitmap);
          return bitmap;
        }
      } else if (ss.typeOf(ol) === FlipbookOverlay) {
        const srcFlipbookOverlay = ol;
        if (srcFlipbookOverlay != null) {
          var bitmap = srcFlipbookOverlay.copy(this._tour.get_currentTourStop());
          bitmap.set_x(this._contextPoint.x);
          bitmap.set_y(this._contextPoint.y);
          this._tour.get_currentTourStop().addOverlay(bitmap);
          return bitmap;
        }
      }
      return null;
    },
    addShape: function (p, shapeType) {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return false;
      }
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(548, 'Insert Shape'), this._tour));
      const shape = ShapeOverlay._create(this._tour.get_currentTourStop(), shapeType);
      shape.set_width(200);
      shape.set_height(200);
      if (shapeType === 4) {
        shape.set_height(shape.get_height() / 2);
      }
      if (shapeType === 5) {
        shape.set_height(12);
      }
      shape.set_x(960);
      shape.set_y(600);
      this._tour.get_currentTourStop().addOverlay(shape);
      this.set_focus(shape);
      this.selection.setSelection(this.get_focus());
      OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
      return true;
    },
    getCurrentColor: function () {
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return this._defaultColor;
      }
      if (this.get_focus() != null) {
        return this.get_focus().get_color();
      } else {
        return this._defaultColor;
      }
    },
    setCurrentColor: function (color) {
      this._defaultColor = color;
      if (this._tour == null || this._tour.get_currentTourStop() == null) {
        return;
      }
      if (this.get_focus() != null) {
        this.get_focus().set_color(color);
      }
    },
    dispose: function () {
      if (this._contextMenu != null) {
        this._contextMenu._dispose();
        this._contextMenu = null;
      }
    },
    hover: pnt => {
      if (TourEditor.currentEditor != null) {
        if (TourEditor.currentEditor.hover(pnt)) {
          return true;
        }
      }
      return true;
    }
  };

  function OverlayList() {}
  OverlayList._updateOverlayList = (currentTourStop, selection) => {};
  OverlayList._updateOverlayListSelection = selection => {  };
  const OverlayList$ = {};

  function TourEdit() {}
  TourEdit._ensureSelectedVisible = () => {};
  TourEdit._selectCurrent = () => {  };
  TourEdit._undoStep = () => {
    if (Undo.peekAction()) {
      Undo.stepBack();
    }
  };
  TourEdit._redoStep = () => {
    if (Undo.peekRedoAction()) {
      Undo.stepForward();
    }
  };
  const TourEdit$ = {};

  function SoundEditor() {
    this.target = null;
  }
  const SoundEditor$ = {};

  function TourStopList() {
    this.tour = null;
    this.showAddButton = false;
    this.selectedItems = null;
    this.selectedItem = -1;
    this.refreshCallback = null;
    this.multipleSelection = false;
    this.hitType = false;
  }
  const TourStopList$ = {
    selectAll: function () {
      this.selectedItems = {};
      for (let i = 0; i < this.tour.get_tourStops().length; i++) {
        this.selectedItems[i] = this.tour.get_tourStops()[i];
      }
    },
    refresh: function () {
      if (this.refreshCallback != null) {
        this.refreshCallback();
      }
    },
    findItem: ts => -1,
    ensureSelectedVisible: () => {
    },
    ensureAddVisible: () => {
    }
  };

  function TimeLine() {}
  TimeLine.refreshUi = () => {};
  const TimeLine$ = {};

  function MasterTime(master, durration) {
    this.durration = 0;
    this.master = master;
    this.durration = durration;
  }
  const MasterTime$ = {};

  function TourStop() {
    this._tourStopType = 0;
    this._keyFramed = false;
    this._tweenPosition = 0;
    this.faderOpacity = 0;
    this._owner = null;
    this._transition = 0;
    this._transitionTime = 2;
    this._transitionHoldTime = 4;
    this._transitionOutTime = 2;
    this._nextSlide = 'Next';
    this._fadeInOverlays = false;
    this._masterSlide = false;
    this._id = '';
    this._description = '';
    this._name = '';
    this._duration = 10000;
    this._interpolationType = 0;
    this._hasLocation = true;
    this._hasTime = true;
    this._startTime = SpaceTimeController.get_now();
    this._endTime = SpaceTimeController.get_now();
    this._actualPlanetScale = Settings.get_current().get_actualPlanetScale();
    this._locationAltitude = Settings.get_current().get_locationAltitude();
    this._locationLat = Settings.get_current().get_locationLat();
    this._locationLng = Settings.get_current().get_locationLng();
    this._showClouds = Settings.get_current().get_showClouds();
    this._showConstellationBoundries = Settings.get_current().get_showConstellationBoundries();
    this._showConstellationFigures = Settings.get_current().get_showConstellationFigures();
    this._showConstellationSelection = Settings.get_current().get_showConstellationSelection();
    this._showEcliptic = Settings.get_current().get_showEcliptic();
    this._showElevationModel = Settings.get_current().get_showElevationModel();
    this._showFieldOfView = Settings.get_current().get_showFieldOfView();
    this._showGrid = Settings.get_current().get_showGrid();
    this._showHorizon = Settings.get_current().get_showHorizon();
    this._showHorizonPanorama = Settings.get_current().get_showHorizonPanorama();
    this._showMoonsAsPointSource = Settings.get_current().get_showMoonsAsPointSource();
    this._showSolarSystem = Settings.get_current().get_showSolarSystem();
    this._fovTelescope = Settings.get_current().get_fovTelescope();
    this._fovEyepiece = Settings.get_current().get_fovEyepiece();
    this._fovCamera = Settings.get_current().get_fovCamera();
    this._localHorizonMode = Settings.get_current().get_localHorizonMode();
    this._galacticMode = Settings.get_current().get_galacticMode();
    this._solarSystemStars = Settings.get_current().get_solarSystemStars();
    this._solarSystemMilkyWay = Settings.get_current().get_solarSystemMilkyWay();
    this._solarSystemCosmos = Settings.get_current().get_solarSystemCosmos();
    this._solarSystemOrbits = Settings.get_current().get_solarSystemOrbits();
    this._solarSystemOverlays = Settings.get_current().get_solarSystemOverlays();
    this._solarSystemLighting = Settings.get_current().get_solarSystemLighting();
    this._solarSystemScale = Settings.get_current().get_solarSystemScale();
    this._solarSystemMultiRes = Settings.get_current().get_solarSystemMultiRes();
    this._showEquatorialGridText = Settings.get_current().get_showEquatorialGridText();
    this._showGalacticGrid = Settings.get_current().get_showGalacticGrid();
    this._showGalacticGridText = Settings.get_current().get_showGalacticGridText();
    this._showEclipticGrid = Settings.get_current().get_showEclipticGrid();
    this._showEclipticGridText = Settings.get_current().get_showEclipticGridText();
    this._showEclipticOverviewText = Settings.get_current().get_showEclipticOverviewText();
    this._showAltAzGrid = Settings.get_current().get_showAltAzGrid();
    this._showAltAzGridText = Settings.get_current().get_showAltAzGridText();
    this._showPrecessionChart = Settings.get_current().get_showPrecessionChart();
    this._showConstellationPictures = Settings.get_current().get_showConstellationPictures();
    this._showConstellationLabels = Settings.get_current().get_showConstellationLabels();
    this._solarSystemCMB = Settings.get_current().get_solarSystemCMB();
    this._solarSystemMinorPlanets = Settings.get_current().get_solarSystemMinorPlanets();
    this._solarSystemPlanets = Settings.get_current().get_solarSystemPlanets();
    this._showEarthSky = Settings.get_current().get_showEarthSky();
    this._solarSystemMinorOrbits = Settings.get_current().get_solarSystemMinorOrbits();
    this._constellationsEnabled = '';
    this._constellationFiguresFilter = Settings.get_current().get_constellationFiguresFilter().clone();
    this._constellationBoundariesFilter = Settings.get_current().get_constellationBoundariesFilter().clone();
    this._constellationNamesFilter = Settings.get_current().get_constellationNamesFilter().clone();
    this._constellationArtFilter = Settings.get_current().get_constellationArtFilter().clone();
    this._showSkyOverlays = Settings.get_current().get_showSkyOverlays();
    this._showConstellations = Settings.get_current().get_showConstellations();
    this._showSkyNode = Settings.get_current().get_showSkyNode();
    this._showSkyGrids = Settings.get_current().get_showSkyGrids();
    this._showSkyOverlaysIn3d = Settings.get_current().get_showSkyOverlaysIn3d();
    this._earthCutawayView = Settings.get_current().get_earthCutawayView();
    this._showISSModel = Settings.get_current().get_showISSModel();
    this._milkyWayModel = Settings.get_current().get_milkyWayModel();
    this._minorPlanetsFilter = Settings.get_current().get_minorPlanetsFilter();
    this._planetOrbitsFilter = Settings.get_current().get_planetOrbitsFilter();
    this._thumbnailString = '';
    this._thumbnail = null;
    this.layers = {};
    this._overlays = [];
    this._musicTrack = null;
    this._voiceTrack = null;
    this._id = Guid.newGuid().toString();
  }
  TourStop.create = target => {
    const ts = new TourStop();
    ts._target = target;
    return ts;
  };
  TourStop.getXmlText = ts => {
    const writer = new XmlTextWriter();
    writer._writeProcessingInstruction('xml', `version="1.0" encoding="UTF-8"`);
    ts._saveToXml(writer, true);
    writer._close();
    return writer.body;
  };
  TourStop._fromXml = (owner, tourStop) => {
    const newTourStop = new TourStop();
    newTourStop._owner = owner;
    newTourStop.set_id(tourStop.attributes.getNamedItem('Id').nodeValue);
    newTourStop.set_name(tourStop.attributes.getNamedItem('Name').nodeValue);
    newTourStop.set_description(tourStop.attributes.getNamedItem('Description').nodeValue);
    newTourStop._thumbnailString = tourStop.attributes.getNamedItem('Thumbnail').nodeValue;
    newTourStop._duration = Util.parseTimeSpan(tourStop.attributes.getNamedItem('Duration').nodeValue);
    if (tourStop.attributes.getNamedItem('Master') != null) {
      newTourStop._masterSlide = ss.boolean(tourStop.attributes.getNamedItem('Master').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('NextSlide') != null) {
      newTourStop._nextSlide = tourStop.attributes.getNamedItem('NextSlide').nodeValue;
    }
    if (tourStop.attributes.getNamedItem('InterpolationType') != null) {
      newTourStop.set_interpolationType(Enums.parse('InterpolationType', tourStop.attributes.getNamedItem('InterpolationType').nodeValue));
    }
    newTourStop._fadeInOverlays = true;
    if (tourStop.attributes.getNamedItem('FadeInOverlays') != null) {
      newTourStop._fadeInOverlays = ss.boolean(tourStop.attributes.getNamedItem('FadeInOverlays').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('Transition') != null) {
      newTourStop._transition = Enums.parse('TransitionType', tourStop.attributes.getNamedItem('Transition').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('HasLocation') != null) {
      newTourStop._hasLocation = ss.boolean(tourStop.attributes.getNamedItem('HasLocation').nodeValue);
    }
    if (newTourStop._hasLocation) {
      if (tourStop.attributes.getNamedItem('LocationAltitude') != null) {
        newTourStop._locationAltitude = parseFloat(tourStop.attributes.getNamedItem('LocationAltitude').nodeValue);
      }
      if (tourStop.attributes.getNamedItem('LocationLat') != null) {
        newTourStop._locationLat = parseFloat(tourStop.attributes.getNamedItem('LocationLat').nodeValue);
      }
      if (tourStop.attributes.getNamedItem('LocationLng') != null) {
        newTourStop._locationLng = parseFloat(tourStop.attributes.getNamedItem('LocationLng').nodeValue);
      }
    }
    if (tourStop.attributes.getNamedItem('HasTime') != null) {
      newTourStop._hasTime = ss.boolean(tourStop.attributes.getNamedItem('HasTime').nodeValue);
      if (newTourStop._hasTime) {
        if (tourStop.attributes.getNamedItem('StartTime') != null) {
          newTourStop._startTime = ss.date(tourStop.attributes.getNamedItem('StartTime').nodeValue + ' UTC');
        }
        if (tourStop.attributes.getNamedItem('EndTime') != null) {
          newTourStop._endTime = ss.date(tourStop.attributes.getNamedItem('EndTime').nodeValue + ' UTC');
        }
      }
    }
    if (tourStop.attributes.getNamedItem('ActualPlanetScale') != null) {
      newTourStop._actualPlanetScale = ss.boolean(tourStop.attributes.getNamedItem('ActualPlanetScale').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowClouds') != null) {
      newTourStop._showClouds = ss.boolean(tourStop.attributes.getNamedItem('ShowClouds').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowConstellationBoundries') != null) {
      newTourStop._showConstellationBoundries = ss.boolean(tourStop.attributes.getNamedItem('ShowConstellationBoundries').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowConstellationFigures') != null) {
      newTourStop._showConstellationFigures = ss.boolean(tourStop.attributes.getNamedItem('ShowConstellationFigures').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowConstellationSelection') != null) {
      newTourStop._showConstellationSelection = ss.boolean(tourStop.attributes.getNamedItem('ShowConstellationSelection').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowEcliptic') != null) {
      newTourStop._showEcliptic = ss.boolean(tourStop.attributes.getNamedItem('ShowEcliptic').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowElevationModel') != null) {
      newTourStop._showElevationModel = ss.boolean(tourStop.attributes.getNamedItem('ShowElevationModel').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowFieldOfView') != null) {
      newTourStop._showFieldOfView = ss.boolean(tourStop.attributes.getNamedItem('ShowFieldOfView').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowGrid') != null) {
      newTourStop._showGrid = ss.boolean(tourStop.attributes.getNamedItem('ShowGrid').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowHorizon') != null) {
      newTourStop._showHorizon = ss.boolean(tourStop.attributes.getNamedItem('ShowHorizon').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowHorizonPanorama') != null) {
      newTourStop._showHorizonPanorama = ss.boolean(tourStop.attributes.getNamedItem('ShowHorizonPanorama').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowMoonsAsPointSource') != null) {
      newTourStop._showMoonsAsPointSource = ss.boolean(tourStop.attributes.getNamedItem('ShowMoonsAsPointSource').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowSolarSystem') != null) {
      newTourStop._showSolarSystem = ss.boolean(tourStop.attributes.getNamedItem('ShowSolarSystem').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('FovTelescope') != null) {
      newTourStop._fovTelescope = parseInt(tourStop.attributes.getNamedItem('FovTelescope').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('FovEyepiece') != null) {
      newTourStop._fovEyepiece = parseInt(tourStop.attributes.getNamedItem('FovEyepiece').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('FovCamera') != null) {
      newTourStop._fovCamera = parseInt(tourStop.attributes.getNamedItem('FovCamera').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('LocalHorizonMode') != null) {
      newTourStop._localHorizonMode = ss.boolean(tourStop.attributes.getNamedItem('LocalHorizonMode').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('GalacticMode') != null) {
      newTourStop._galacticMode = ss.boolean(tourStop.attributes.getNamedItem('GalacticMode').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemStars') != null) {
      newTourStop._solarSystemStars = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemStars').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemMilkyWay') != null) {
      newTourStop._solarSystemMilkyWay = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemMilkyWay').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemCosmos') != null) {
      newTourStop._solarSystemCosmos = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemCosmos').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemOrbits') != null) {
      newTourStop._solarSystemOrbits = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemOrbits').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemOverlays') != null) {
      newTourStop._solarSystemOverlays = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemOverlays').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemLighting') != null) {
      newTourStop._solarSystemLighting = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemLighting').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemScale') != null) {
      newTourStop._solarSystemScale = parseInt(tourStop.attributes.getNamedItem('SolarSystemScale').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemMultiRes') != null) {
      newTourStop._solarSystemMultiRes = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemMultiRes').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowEquatorialGridText') != null) {
      newTourStop._showEquatorialGridText = ss.boolean(tourStop.attributes.getNamedItem('ShowEquatorialGridText').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowGalacticGrid') != null) {
      newTourStop._showGalacticGrid = ss.boolean(tourStop.attributes.getNamedItem('ShowGalacticGrid').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowGalacticGridText') != null) {
      newTourStop._showGalacticGridText = ss.boolean(tourStop.attributes.getNamedItem('ShowGalacticGridText').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowEclipticGrid') != null) {
      newTourStop._showEclipticGrid = ss.boolean(tourStop.attributes.getNamedItem('ShowEclipticGrid').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowEclipticGridText') != null) {
      newTourStop._showEclipticGridText = ss.boolean(tourStop.attributes.getNamedItem('ShowEclipticGridText').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowEclipticOverviewText') != null) {
      newTourStop._showEclipticOverviewText = ss.boolean(tourStop.attributes.getNamedItem('ShowEclipticOverviewText').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowAltAzGrid') != null) {
      newTourStop._showAltAzGrid = ss.boolean(tourStop.attributes.getNamedItem('ShowAltAzGrid').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowAltAzGridText') != null) {
      newTourStop._showAltAzGridText = ss.boolean(tourStop.attributes.getNamedItem('ShowAltAzGridText').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowPrecessionChart') != null) {
      newTourStop._showPrecessionChart = ss.boolean(tourStop.attributes.getNamedItem('ShowPrecessionChart').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowConstellationPictures') != null) {
      newTourStop._showConstellationPictures = ss.boolean(tourStop.attributes.getNamedItem('ShowConstellationPictures').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowConstellationLabels') != null) {
      newTourStop._showConstellationLabels = ss.boolean(tourStop.attributes.getNamedItem('ShowConstellationLabels').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemCMB') != null) {
      newTourStop._solarSystemCMB = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemCMB').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemMinorPlanets') != null) {
      newTourStop._solarSystemMinorPlanets = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemMinorPlanets').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemPlanets') != null) {
      newTourStop._solarSystemPlanets = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemPlanets').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowEarthSky') != null) {
      newTourStop._showEarthSky = ss.boolean(tourStop.attributes.getNamedItem('ShowEarthSky').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('SolarSystemMinorOrbits') != null) {
      newTourStop._solarSystemMinorOrbits = ss.boolean(tourStop.attributes.getNamedItem('SolarSystemMinorOrbits').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowSkyOverlays') != null) {
      newTourStop._showSkyOverlays = ss.boolean(tourStop.attributes.getNamedItem('ShowSkyOverlays').nodeValue);
    }
    else {
      newTourStop._showSkyOverlays = true;
    }
    if (tourStop.attributes.getNamedItem('ShowConstellations') != null) {
      newTourStop._showConstellations = ss.boolean(tourStop.attributes.getNamedItem('ShowConstellations').nodeValue);
    }
    else {
      newTourStop._showConstellations = true;
    }
    if (tourStop.attributes.getNamedItem('ShowSkyNode') != null) {
      newTourStop._showSkyNode = ss.boolean(tourStop.attributes.getNamedItem('ShowSkyNode').nodeValue);
    }
    else {
      newTourStop._showSkyNode = true;
    }
    if (tourStop.attributes.getNamedItem('ShowSkyGrids') != null) {
      newTourStop._showSkyGrids = ss.boolean(tourStop.attributes.getNamedItem('ShowSkyGrids').nodeValue);
    }
    else {
      newTourStop._showSkyGrids = true;
    }
    if (tourStop.attributes.getNamedItem('ShowSkyOverlaysIn3d') != null) {
      newTourStop._showSkyOverlaysIn3d = ss.boolean(tourStop.attributes.getNamedItem('ShowSkyOverlaysIn3d').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('EarthCutawayView') != null) {
      newTourStop._earthCutawayView = ss.boolean(tourStop.attributes.getNamedItem('EarthCutawayView').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ShowISSModel') != null) {
      newTourStop._showISSModel = ss.boolean(tourStop.attributes.getNamedItem('ShowISSModel').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('MilkyWayModel') != null) {
      newTourStop._milkyWayModel = ss.boolean(tourStop.attributes.getNamedItem('MilkyWayModel').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('ConstellationBoundariesFilter') != null) {
      newTourStop._constellationBoundariesFilter = ConstellationFilter.parse(tourStop.attributes.getNamedItem('ConstellationBoundariesFilter').nodeValue);
    }
    else {
      newTourStop._constellationBoundariesFilter = ConstellationFilter.get_allConstellation();
    }
    if (tourStop.attributes.getNamedItem('ConstellationBoundariesFilter') != null) {
      newTourStop._constellationFiguresFilter = ConstellationFilter.parse(tourStop.attributes.getNamedItem('ConstellationBoundariesFilter').nodeValue);
    }
    else {
      newTourStop._constellationFiguresFilter = new ConstellationFilter();
    }
    if (tourStop.attributes.getNamedItem('ConstellationNamesFilter') != null) {
      newTourStop._constellationNamesFilter = ConstellationFilter.parse(tourStop.attributes.getNamedItem('ConstellationNamesFilter').nodeValue);
    }
    else {
      newTourStop._constellationNamesFilter = new ConstellationFilter();
    }
    if (tourStop.attributes.getNamedItem('ConstellationArtFilter') != null) {
      newTourStop._constellationArtFilter = ConstellationFilter.parse(tourStop.attributes.getNamedItem('ConstellationArtFilter').nodeValue);
    }
    else {
      newTourStop._constellationArtFilter = new ConstellationFilter();
    }
    if (tourStop.attributes.getNamedItem('MinorPlanetsFilter') != null) {
      newTourStop._minorPlanetsFilter = parseInt(tourStop.attributes.getNamedItem('MinorPlanetsFilter').nodeValue);
    }
    if (tourStop.attributes.getNamedItem('PlanetOrbitsFilter') != null) {
      newTourStop._planetOrbitsFilter = parseInt(tourStop.attributes.getNamedItem('PlanetOrbitsFilter').nodeValue);
    }
    const place = Util.selectSingleNode(tourStop, 'Place');
    newTourStop._target = Place._fromXml(place);
    const endTarget = Util.selectSingleNode(tourStop, 'EndTarget');
    if (endTarget != null) {
      newTourStop._endTarget = Place._fromXml(endTarget);
    }
    const overlays = Util.selectSingleNode(tourStop, 'Overlays');
    const $enum1 = ss.enumerate(overlays.childNodes);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      if (overlay.nodeName === 'Overlay') {
        newTourStop.addOverlay(Overlay._fromXml(newTourStop, overlay));
      }
    }
    const musicNode = Util.selectSingleNode(tourStop, 'MusicTrack');
    if (musicNode != null) {
      newTourStop._musicTrack = Overlay._fromXml(newTourStop, Util.selectSingleNode(musicNode, 'Overlay'));
    }
    const voiceNode = Util.selectSingleNode(tourStop, 'VoiceTrack');
    if (voiceNode != null) {
      newTourStop._voiceTrack = Overlay._fromXml(newTourStop, Util.selectSingleNode(voiceNode, 'Overlay'));
    }
    const layerNode = Util.selectSingleNode(tourStop, 'VisibleLayers');
    if (layerNode != null) {
      newTourStop._loadLayerList(layerNode);
    }
    newTourStop._thumbnail = owner.getCachedTexture(ss.format('{0}.thumb.png', newTourStop._id), () => {
      const c = 0;
    });
    return newTourStop;
  };
  const TourStop$ = {
    get_keyFramed: function () {
      return this._keyFramed;
    },
    get_tourStopType: function () {
      if (this._target.get_backgroundImageset() != null) {
        return this._target.get_backgroundImageset().get_dataSetType();
      } else {
        return this._tourStopType;
      }
    },
    set_tourStopType: function (value) {
      if (this._target.get_backgroundImageset() != null) {
        if (this._target.get_backgroundImageset().get_dataSetType() !== value) {
          this._target.set_backgroundImageset(null);
        }
      }
      this._tourStopType = value;
      return value;
    },
    get_tweenPosition: function () {
      return this._tweenPosition;
    },
    set_tweenPosition: function (value) {
      if (this._tweenPosition !== value) {
        this._tweenPosition = Math.max(0, Math.min(1, value));
        this.updateTweenPosition();
      }
      return value;
    },
    updateTweenPosition: function () {
      if (this.get_keyFramed()) {
      }
    },
    copy: function () {
      const writer = new XmlTextWriter();
      writer._writeProcessingInstruction('xml', 'version=\'1.0\' encoding=\'UTF-8\'');
      this._saveToXml(writer, true);
      try {
        const xParser = new DOMParser();
        const doc = xParser.parseFromString(writer.body, 'text/xml');
        const node = Util.selectSingleNode(doc, 'TourStop');
        const ts = TourStop._fromXml(this.get_owner(), node);
        ts.set_id(Guid.newGuid().toString());
        return ts;
      } catch ($e1) {
      }
      return null;
    },
    get_owner: function () {
      return this._owner;
    },
    set_owner: function (value) {
      this._owner = value;
      return value;
    },
    get__transition: function () {
      return this._transition;
    },
    set__transition: function (value) {
      if (this._transition !== value) {
        this._transition = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get__transitionTime: function () {
      return this._transitionTime;
    },
    set__transitionTime: function (value) {
      if (this._transitionTime !== value) {
        this._transitionTime = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get__transitionHoldTime: function () {
      return this._transitionHoldTime;
    },
    set__transitionHoldTime: function (value) {
      if (this._transitionHoldTime !== value) {
        this._transitionHoldTime = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get__transitionOutTime: function () {
      return this._transitionOutTime;
    },
    set__transitionOutTime: function (value) {
      if (this._transitionOutTime !== value) {
        this._transitionOutTime = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_nextSlide: function () {
      return this._nextSlide;
    },
    set_nextSlide: function (value) {
      this._nextSlide = value;
      return value;
    },
    get_isLinked: function () {
      if (this._nextSlide == null || this._nextSlide === 'Next' || !this._nextSlide) {
        return false;
      }
      return true;
    },
    get_fadeInOverlays: function () {
      return this._fadeInOverlays;
    },
    set_fadeInOverlays: function (value) {
      this._fadeInOverlays = value;
      return value;
    },
    get_masterSlide: function () {
      return this._masterSlide;
    },
    set_masterSlide: function (value) {
      if (this._masterSlide !== value) {
        this._masterSlide = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_id: function () {
      return this._id;
    },
    set_id: function (value) {
      this._id = value;
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
      return value;
    },
    toString: function () {
      if (this._target != null) {
        return this.get_target().get_name();
      } else {
        return this._description;
      }
    },
    get_description: function () {
      return this._description;
    },
    set_description: function (value) {
      if (this._description !== value) {
        this._description = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_name: function () {
      if (this._target != null) {
        return this._target.get_name();
      }
      return this._name;
    },
    set_name: function (value) {
      if (this._name !== value) {
        this._name = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_duration: function () {
      return this._duration;
    },
    set_duration: function (value) {
      if (this._duration !== value) {
        this._duration = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_target: function () {
      return this._target;
    },
    set_target: function (value) {
      if (this._target !== value) {
        this._target = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_endTarget: function () {
      return this._endTarget;
    },
    set_endTarget: function (value) {
      if (this._endTarget !== value) {
        this._endTarget = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_interpolationType: function () {
      return this._interpolationType;
    },
    set_interpolationType: function (value) {
      this._interpolationType = value;
      return value;
    },
    get_hasLocation: function () {
      return this._hasTime;
    },
    set_hasLocation: function (value) {
      if (this._hasLocation !== value) {
        this._hasLocation = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_hasTime: function () {
      return this._hasTime;
    },
    set_hasTime: function (value) {
      if (this._hasTime !== value) {
        this._hasTime = this._hasLocation = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_startTime: function () {
      return this._startTime;
    },
    set_startTime: function (value) {
      this._startTime = value;
      if (!ss.compareDates(this._startTime, value)) {
        this._startTime = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_endTime: function () {
      return this._endTime;
    },
    set_endTime: function (value) {
      if (!ss.compareDates(this._endTime, value)) {
        this._endTime = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    captureSettings: function () {
      this._startTime = SpaceTimeController.get_now();
      this._actualPlanetScale = Settings.get_current().get_actualPlanetScale();
      this._locationAltitude = Settings.get_current().get_locationAltitude();
      this._locationLat = Settings.get_current().get_locationLat();
      this._locationLng = Settings.get_current().get_locationLng();
      this._showClouds = Settings.get_current().get_showClouds();
      this._showConstellationBoundries = Settings.get_current().get_showConstellationBoundries();
      this._showConstellationFigures = Settings.get_current().get_showConstellationFigures();
      this._showConstellationSelection = Settings.get_current().get_showConstellationSelection();
      this._showEcliptic = Settings.get_current().get_showEcliptic();
      this._showElevationModel = Settings.get_current().get_showElevationModel();
      this._showFieldOfView = Settings.get_current().get_showFieldOfView();
      this._showGrid = Settings.get_current().get_showGrid();
      this._showHorizon = Settings.get_current().get_showHorizon();
      this._showHorizonPanorama = Settings.get_current().get_showHorizonPanorama();
      this._showMoonsAsPointSource = Settings.get_current().get_showMoonsAsPointSource();
      this._showSolarSystem = Settings.get_current().get_showSolarSystem();
      this._fovTelescope = Settings.get_current().get_fovTelescope();
      this._fovEyepiece = Settings.get_current().get_fovEyepiece();
      this._fovCamera = Settings.get_current().get_fovCamera();
      this._localHorizonMode = Settings.get_current().get_localHorizonMode();
      this._galacticMode = Settings.get_current().get_galacticMode();
      this._solarSystemStars = Settings.get_current().get_solarSystemStars();
      this._solarSystemMilkyWay = Settings.get_current().get_solarSystemMilkyWay();
      this._solarSystemCosmos = Settings.get_current().get_solarSystemCosmos();
      this._solarSystemOrbits = Settings.get_current().get_solarSystemOrbits();
      this._solarSystemOverlays = Settings.get_current().get_solarSystemOverlays();
      this._solarSystemLighting = Settings.get_current().get_solarSystemLighting();
      this._solarSystemScale = Settings.get_current().get_solarSystemScale();
      this._solarSystemMultiRes = Settings.get_current().get_solarSystemMultiRes();
      this._showEquatorialGridText = Settings.get_current().get_showEquatorialGridText();
      this._showGalacticGrid = Settings.get_current().get_showGalacticGrid();
      this._showGalacticGridText = Settings.get_current().get_showGalacticGridText();
      this._showEclipticGrid = Settings.get_current().get_showEclipticGrid();
      this._showEclipticGridText = Settings.get_current().get_showEclipticGridText();
      this._showEclipticOverviewText = Settings.get_current().get_showEclipticOverviewText();
      this._showAltAzGrid = Settings.get_current().get_showAltAzGrid();
      this._showAltAzGridText = Settings.get_current().get_showAltAzGridText();
      this._showPrecessionChart = Settings.get_current().get_showPrecessionChart();
      this._showConstellationPictures = Settings.get_current().get_showConstellationPictures();
      this._showConstellationLabels = Settings.get_current().get_showConstellationLabels();
      this._solarSystemCMB = Settings.get_current().get_solarSystemCMB();
      this._solarSystemMinorPlanets = Settings.get_current().get_solarSystemMinorPlanets();
      this._solarSystemPlanets = Settings.get_current().get_solarSystemPlanets();
      this._showEarthSky = Settings.get_current().get_showEarthSky();
      this._solarSystemMinorOrbits = Settings.get_current().get_solarSystemMinorOrbits();
      this._constellationFiguresFilter = Settings.get_current().get_constellationFiguresFilter().clone();
      this._constellationBoundariesFilter = Settings.get_current().get_constellationBoundariesFilter().clone();
      this._constellationNamesFilter = Settings.get_current().get_constellationNamesFilter().clone();
      this._constellationArtFilter = Settings.get_current().get_constellationArtFilter().clone();
      this._showSkyOverlays = Settings.get_current().get_showSkyOverlays();
      this._showConstellations = Settings.get_current().get_showConstellations();
      this._showSkyNode = Settings.get_current().get_showSkyNode();
      this._showSkyGrids = Settings.get_current().get_showSkyGrids();
      this._showSkyOverlaysIn3d = Settings.get_current().get_showSkyOverlaysIn3d();
      this._earthCutawayView = Settings.get_current().get_earthCutawayView();
      this._showISSModel = Settings.get_current().get_showISSModel();
      this._milkyWayModel = Settings.get_current().get_milkyWayModel();
      this._minorPlanetsFilter = Settings.get_current().get_minorPlanetsFilter();
      this._planetOrbitsFilter = Settings.get_current().get_planetOrbitsFilter();
    },
    syncSettings: function () {
      Settings.get_globalSettings().set_actualPlanetScale(this._actualPlanetScale);
      Settings.get_globalSettings().set_locationAltitude(this._locationAltitude);
      Settings.get_globalSettings().set_locationLat(this._locationLat);
      Settings.get_globalSettings().set_locationLng(this._locationLng);
      Settings.get_globalSettings().set_earthCutawayView(this._earthCutawayView);
      Settings.get_globalSettings().set_showConstellationBoundries(this._showConstellationBoundries);
      Settings.get_globalSettings().set_showConstellationFigures(this._showConstellationFigures);
      Settings.get_globalSettings().set_showConstellationSelection(this._showConstellationSelection);
      Settings.get_globalSettings().set_showEcliptic(this._showEcliptic);
      Settings.get_globalSettings().set_showElevationModel(this._showElevationModel);
      Settings.get_globalSettings().set_showGrid(this._showGrid);
      Settings.get_globalSettings().set_showHorizon(this._showHorizon);
      Settings.get_globalSettings().set_showSolarSystem(this._showSolarSystem);
      Settings.get_globalSettings().set_localHorizonMode(this._localHorizonMode);
      Settings.get_globalSettings().set_galacticMode(this._galacticMode);
      Settings.get_globalSettings().set_solarSystemStars(this._solarSystemStars);
      Settings.get_globalSettings().set_solarSystemMilkyWay(this._solarSystemMilkyWay);
      Settings.get_globalSettings().set_solarSystemCosmos(this._solarSystemCosmos);
      Settings.get_globalSettings().set_solarSystemCMB(this._solarSystemCMB);
      Settings.get_globalSettings().set_solarSystemOrbits(this._solarSystemOrbits);
      Settings.get_globalSettings().set_solarSystemMinorOrbits(this._solarSystemMinorOrbits);
      Settings.get_globalSettings().set_solarSystemMinorPlanets(this._solarSystemMinorPlanets);
      Settings.get_globalSettings().set_solarSystemOverlays(this._solarSystemOverlays);
      Settings.get_globalSettings().set_solarSystemLighting(this._solarSystemLighting);
      Settings.get_globalSettings().set_showISSModel(this._showISSModel);
      Settings.get_globalSettings().set_solarSystemScale(this._solarSystemScale);
      Settings.get_globalSettings().set_solarSystemMultiRes(this._solarSystemMultiRes);
      Settings.get_globalSettings().set_showEarthSky(this._showEarthSky);
      Settings.get_globalSettings().set_minorPlanetsFilter(this._minorPlanetsFilter);
      Settings.get_globalSettings().set_planetOrbitsFilter(this._planetOrbitsFilter);
      Settings.get_globalSettings().set_showEquatorialGridText(this._showEquatorialGridText);
      Settings.get_globalSettings().set_showGalacticGrid(this._showGalacticGrid);
      Settings.get_globalSettings().set_showGalacticGridText(this._showGalacticGridText);
      Settings.get_globalSettings().set_showEclipticGrid(this._showEclipticGrid);
      Settings.get_globalSettings().set_showEclipticGridText(this._showEclipticGridText);
      Settings.get_globalSettings().set_showEclipticOverviewText(this._showEclipticOverviewText);
      Settings.get_globalSettings().set_showAltAzGrid(this._showAltAzGrid);
      Settings.get_globalSettings().set_showAltAzGridText(this._showAltAzGridText);
      Settings.get_globalSettings().set_showPrecessionChart(this._showPrecessionChart);
      Settings.get_globalSettings().set_showConstellationPictures(this._showConstellationPictures);
      Settings.get_globalSettings().set_constellationsEnabled(this._constellationsEnabled);
      Settings.get_globalSettings().set_showSkyOverlays(this._showSkyOverlays);
      Settings.get_globalSettings().set_constellations(this._showConstellations);
      Settings.get_globalSettings().set_showSkyNode(this._showSkyNode);
      Settings.get_globalSettings().set_showSkyGrids(this._showSkyGrids);
      Settings.get_globalSettings().set_constellationFiguresFilter(this._constellationFiguresFilter.clone());
      Settings.get_globalSettings().set_constellationBoundariesFilter(this._constellationBoundariesFilter.clone());
      Settings.get_globalSettings().set_constellationNamesFilter(this._constellationNamesFilter.clone());
      Settings.get_globalSettings().set_constellationArtFilter(this._constellationArtFilter.clone());
    },
    get_solarSystemStars: function () {
      return this._solarSystemStars;
    },
    get_solarSystemMultiRes: function () {
      return this._solarSystemMultiRes;
    },
    get_solarSystemMilkyWay: function () {
      return this._solarSystemMilkyWay;
    },
    get_solarSystemCosmos: function () {
      return this._solarSystemCosmos;
    },
    get_solarSystemOrbits: function () {
      return this._solarSystemOrbits;
    },
    get_solarSystemOverlays: function () {
      return this._solarSystemOverlays;
    },
    get_solarSystemLighting: function () {
      return this._solarSystemLighting;
    },
    get_solarSystemScale: function () {
      return this._solarSystemScale;
    },
    get_actualPlanetScale: function () {
      return this._actualPlanetScale;
    },
    get_fovCamera: function () {
      return this._fovCamera;
    },
    get_fovEyepiece: function () {
      return this._fovEyepiece;
    },
    get_fovTelescope: function () {
      return this._fovTelescope;
    },
    get_locationAltitude: function () {
      if (this._hasLocation) {
        return this._locationAltitude;
      } else {
        return Settings.get_current().get_locationAltitude();
      }
    },
    get_locationLat: function () {
      if (this._hasLocation) {
        return this._locationLat;
      } else {
        return Settings.get_current().get_locationLat();
      }
    },
    get_locationLng: function () {
      if (this._hasLocation) {
        return this._locationLng;
      } else {
        return Settings.get_current().get_locationLng();
      }
    },
    get_showClouds: function () {
      return this._showClouds;
    },
    get_showConstellationBoundries: function () {
      return this._showConstellationBoundries;
    },
    get_showConstellationFigures: function () {
      return this._showConstellationFigures;
    },
    get_showConstellationSelection: function () {
      return this._showConstellationSelection;
    },
    get_showEcliptic: function () {
      return this._showEcliptic;
    },
    get_showElevationModel: function () {
      return this._showElevationModel;
    },
    get_showFieldOfView: function () {
      return this._showFieldOfView;
    },
    get_showGrid: function () {
      return this._showGrid;
    },
    get_showHorizon: function () {
      return this._showHorizon;
    },
    get_showHorizonPanorama: function () {
      return this._showHorizonPanorama;
    },
    get_showMoonsAsPointSource: function () {
      return this._showMoonsAsPointSource;
    },
    get_showSolarSystem: function () {
      return this._showSolarSystem;
    },
    get_localHorizonMode: function () {
      return this._localHorizonMode;
    },
    get_galacticMode: function () {
      return this._galacticMode;
    },
    get_thumbnail: function () {
      if (this._target != null && this._thumbnail == null) {
        return null;
      }
      return this._thumbnail;
    },
    set_thumbnail: function (value) {
      this._thumbnail = value;
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
      return value;
    },
    get_overlays: function () {
      return this._overlays;
    },
    get_musicTrack: function () {
      return this._musicTrack;
    },
    set_musicTrack: function (value) {
      if (this._musicTrack !== value) {
        this._musicTrack = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    get_voiceTrack: function () {
      return this._voiceTrack;
    },
    set_voiceTrack: function (value) {
      if (this._voiceTrack !== value) {
        this._voiceTrack = value;
        if (this._owner != null) {
          this._owner.set_tourDirty(true);
        }
      }
      return value;
    },
    addOverlay: function (overlay) {
      if (overlay == null) {
        return;
      }
      overlay.set_owner(this);
      this._overlays.push(overlay);
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
    },
    removeOverlay: function (overlay) {
      ss.remove(this._overlays, overlay);
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
    },
    cleanUp: function () {
      const $enum1 = ss.enumerate(this.get_overlays());
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.cleanUp();
      }
      if (this._voiceTrack != null) {
        this._voiceTrack.cleanUp();
      }
      if (this._musicTrack != null) {
        this._musicTrack.cleanUp();
      }
    },
    sendToBack: function (target) {
      ss.remove(this._overlays, target);
      this._overlays.splice(0, 0, target);
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
    },
    bringToFront: function (target) {
      ss.remove(this._overlays, target);
      this._overlays.push(target);
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
    },
    bringForward: function (target) {
      const index = this._overlays.indexOf(target);
      if (index < this._overlays.length - 1) {
        ss.remove(this._overlays, target);
        this._overlays.splice(index + 1, 0, target);
      }
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
    },
    sendBackward: function (target) {
      const index = this._overlays.indexOf(target);
      if (index > 0) {
        ss.remove(this._overlays, target);
        this._overlays.splice(index - 1, 0, target);
      }
      if (this._owner != null) {
        this._owner.set_tourDirty(true);
      }
    },
    getNextOverlay: function (current) {
      if (current == null) {
        if (this._overlays.length > 0) {
          return this._overlays[0];
        } else {
          return null;
        }
      }
      const index = this._overlays.indexOf(current);
      if (index < this._overlays.length - 1) {
        return this._overlays[index + 1];
      } else {
        return this._overlays[0];
      }
    },
    getPerviousOverlay: function (current) {
      if (current == null) {
        if (this._overlays.length > 0) {
          return this._overlays[0];
        } else {
          return null;
        }
      }
      const index = this._overlays.indexOf(current);
      if (index > 0) {
        return this._overlays[index - 1];
      } else {
        return this._overlays[this._overlays.length - 1];
      }
    },
    getOverlayById: function (id) {
      const $enum1 = ss.enumerate(this._overlays);
      while ($enum1.moveNext()) {
        const ol = $enum1.current;
        if (ol.id === id) {
          return ol;
        }
      }
      return null;
    },
    get_tourStopThumbnailFilename: function () {
      return ss.format('{0}.thumb.png', this._id);
    },
    _saveToXml: function (xmlWriter, saveContent) {
      if (saveContent) {
        if (this._thumbnail != null) {
        }
      }
      xmlWriter._writeStartElement('TourStop');
      xmlWriter._writeAttributeString('Id', this._id);
      xmlWriter._writeAttributeString('Name', this._name);
      xmlWriter._writeAttributeString('Description', this._description);
      xmlWriter._writeAttributeString('Thumbnail', this._thumbnailString);
      xmlWriter._writeAttributeString('Duration', Util.xmlDuration(this._duration));
      xmlWriter._writeAttributeString('Master', this._masterSlide.toString());
      xmlWriter._writeAttributeString('TransitionType', Enums.toXml('TransitionType', this._transition));
      xmlWriter._writeAttributeString('TransitionTime', this._transitionTime.toString());
      xmlWriter._writeAttributeString('TransitionOutTime', this._transitionOutTime.toString());
      xmlWriter._writeAttributeString('TransitionHoldTime', this._transitionHoldTime.toString());
      xmlWriter._writeAttributeString('NextSlide', this._nextSlide);
      xmlWriter._writeAttributeString('InterpolationType', Enums.toXml('InterpolationType', this._interpolationType));
      xmlWriter._writeAttributeString('HasLocation', this._hasLocation.toString());
      if (this._hasLocation) {
        xmlWriter._writeAttributeString('LocationAltitude', this._locationAltitude.toString());
        xmlWriter._writeAttributeString('LocationLat', this._locationLat.toString());
        xmlWriter._writeAttributeString('LocationLng', this._locationLng.toString());
      }
      xmlWriter._writeAttributeString('HasTime', this._hasTime.toString());
      if (this._hasTime) {
        xmlWriter._writeAttributeString('StartTime', Util.xmlDate(this._startTime));
        xmlWriter._writeAttributeString('EndTime', Util.xmlDate(this._endTime));
      }
      xmlWriter._writeAttributeString('ActualPlanetScale', this._actualPlanetScale.toString());
      xmlWriter._writeAttributeString('ShowClouds', this._showClouds.toString());
      xmlWriter._writeAttributeString('EarthCutawayView', this._earthCutawayView.toString());
      xmlWriter._writeAttributeString('ShowConstellationBoundries', this._showConstellationBoundries.toString());
      xmlWriter._writeAttributeString('ShowConstellationFigures', this._showConstellationFigures.toString());
      xmlWriter._writeAttributeString('ShowConstellationSelection', this._showConstellationSelection.toString());
      xmlWriter._writeAttributeString('ShowEcliptic', this._showEcliptic.toString());
      xmlWriter._writeAttributeString('ShowElevationModel', this._showElevationModel.toString());
      this._showFieldOfView = false;
      xmlWriter._writeAttributeString('ShowFieldOfView', this._showFieldOfView.toString());
      xmlWriter._writeAttributeString('ShowGrid', this._showGrid.toString());
      xmlWriter._writeAttributeString('ShowHorizon', this._showHorizon.toString());
      xmlWriter._writeAttributeString('ShowHorizonPanorama', this._showHorizonPanorama.toString());
      xmlWriter._writeAttributeString('ShowMoonsAsPointSource', this._showMoonsAsPointSource.toString());
      xmlWriter._writeAttributeString('ShowSolarSystem', this._showSolarSystem.toString());
      xmlWriter._writeAttributeString('FovTelescope', this._fovTelescope.toString());
      xmlWriter._writeAttributeString('FovEyepiece', this._fovEyepiece.toString());
      xmlWriter._writeAttributeString('FovCamera', this._fovCamera.toString());
      xmlWriter._writeAttributeString('LocalHorizonMode', this._localHorizonMode.toString());
      xmlWriter._writeAttributeString('GalacticMode', this._galacticMode.toString());
      xmlWriter._writeAttributeString('FadeInOverlays', this._fadeInOverlays.toString());
      xmlWriter._writeAttributeString('SolarSystemStars', this._solarSystemStars.toString());
      xmlWriter._writeAttributeString('SolarSystemMilkyWay', this._solarSystemMilkyWay.toString());
      xmlWriter._writeAttributeString('SolarSystemCosmos', this._solarSystemCosmos.toString());
      xmlWriter._writeAttributeString('SolarSystemCMB', this._solarSystemCMB.toString());
      xmlWriter._writeAttributeString('SolarSystemOrbits', this._solarSystemOrbits.toString());
      xmlWriter._writeAttributeString('SolarSystemMinorOrbits', this._solarSystemMinorOrbits.toString());
      xmlWriter._writeAttributeString('SolarSystemOverlays', this._solarSystemOverlays.toString());
      xmlWriter._writeAttributeString('SolarSystemLighting', this._solarSystemLighting.toString());
      xmlWriter._writeAttributeString('ShowISSModel', this._showISSModel.toString());
      xmlWriter._writeAttributeString('SolarSystemScale', this._solarSystemScale.toString());
      xmlWriter._writeAttributeString('MinorPlanetsFilter', this._minorPlanetsFilter.toString());
      xmlWriter._writeAttributeString('PlanetOrbitsFilter', this._planetOrbitsFilter.toString());
      xmlWriter._writeAttributeString('SolarSystemMultiRes', this._solarSystemMultiRes.toString());
      xmlWriter._writeAttributeString('SolarSystemMinorPlanets', this._solarSystemMinorPlanets.toString());
      xmlWriter._writeAttributeString('SolarSystemPlanets', this._solarSystemPlanets.toString());
      xmlWriter._writeAttributeString('ShowEarthSky', this._showEarthSky.toString());
      xmlWriter._writeAttributeString('ShowEquatorialGridText', this.get_showEquatorialGridText().toString());
      xmlWriter._writeAttributeString('ShowGalacticGrid', this.get_showGalacticGrid().toString());
      xmlWriter._writeAttributeString('ShowGalacticGridText', this.get_showGalacticGridText().toString());
      xmlWriter._writeAttributeString('ShowEclipticGrid', this.get_showEclipticGrid().toString());
      xmlWriter._writeAttributeString('ShowEclipticGridText', this.get_showEclipticGridText().toString());
      xmlWriter._writeAttributeString('ShowEclipticOverviewText', this.get_showEclipticOverviewText().toString());
      xmlWriter._writeAttributeString('ShowAltAzGrid', this.get_showAltAzGrid().toString());
      xmlWriter._writeAttributeString('ShowAltAzGridText', this.get_showAltAzGridText().toString());
      xmlWriter._writeAttributeString('ShowPrecessionChart', this.get_showPrecessionChart().toString());
      xmlWriter._writeAttributeString('ConstellationPictures', this.get_showConstellationPictures().toString());
      xmlWriter._writeAttributeString('ConstellationsEnabled', this.get_constellationsEnabled());
      xmlWriter._writeAttributeString('ShowConstellationLabels', this.get_showConstellationLabels().toString());
      xmlWriter._writeAttributeString('ShowSkyOverlays', this.get_showSkyOverlays().toString());
      xmlWriter._writeAttributeString('ShowConstellations', this.get_showConstellations().toString());
      xmlWriter._writeAttributeString('ShowSkyNode', this.get_showSkyNode().toString());
      xmlWriter._writeAttributeString('ShowSkyGrids', this.get_showSkyGrids().toString());
      xmlWriter._writeAttributeString('SkyOverlaysIn3d', this.get_showSkyOverlaysIn3d().toString());
      xmlWriter._writeAttributeString('ConstellationFiguresFilter', this._constellationFiguresFilter.toString());
      xmlWriter._writeAttributeString('ConstellationBoundariesFilter', this._constellationBoundariesFilter.toString());
      xmlWriter._writeAttributeString('ConstellationNamesFilter', this._constellationNamesFilter.toString());
      xmlWriter._writeAttributeString('ConstellationArtFilter', this._constellationArtFilter.toString());
      this._target._saveToXml(xmlWriter, 'Place');
      if (this._endTarget != null) {
        this._endTarget._saveToXml(xmlWriter, 'EndTarget');
      }
      xmlWriter._writeStartElement('Overlays');
      const $enum1 = ss.enumerate(this._overlays);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.saveToXml(xmlWriter, false);
      }
      xmlWriter._writeEndElement();
      if (this._musicTrack != null) {
        xmlWriter._writeStartElement('MusicTrack');
        this._musicTrack.saveToXml(xmlWriter, false);
        xmlWriter._writeEndElement();
      }
      if (this._voiceTrack != null) {
        xmlWriter._writeStartElement('VoiceTrack');
        this._voiceTrack.saveToXml(xmlWriter, false);
        xmlWriter._writeEndElement();
      }
      this._writeLayerList(xmlWriter);
      xmlWriter._writeEndElement();
    },
    _writeLayerList: function (xmlWriter) {
      if (ss.keyCount(this.layers) > 0) {
        xmlWriter._writeStartElement('VisibleLayers');
        const $enum1 = ss.enumerate(ss.keys(this.layers));
        while ($enum1.moveNext()) {
          const key = $enum1.current;
          const info = this.layers[key];
          xmlWriter._writeStartElement('Layer');
          xmlWriter._writeAttributeString('StartOpacity', info.startOpacity.toString());
          xmlWriter._writeAttributeString('EndOpacity', info.endOpacity.toString());
          const len = info.startParams.length;
          xmlWriter._writeAttributeString('ParamCount', len.toString());
          for (let i = 0; i < len; i++) {
            xmlWriter._writeAttributeString(ss.format('StartParam{0}', i), info.startParams[i].toString());
            xmlWriter._writeAttributeString(ss.format('EndParam{0}', i), info.endParams[i].toString());
          }
          xmlWriter._writeValue(info.id.toString());
          xmlWriter._writeEndElement();
        }
        xmlWriter._writeEndElement();
      }
    },
    _addFilesToCabinet: function (fc, excludeAudio) {
      if (this._thumbnail != null) {
        const filename = ss.format('{0}.thumb.png', this._id);
        const blob = this._owner.getFileBlob(filename);
        fc.addFile(this._owner.get_workingDirectory() + filename, blob);
      }
      if (!excludeAudio) {
        if (this._musicTrack != null) {
          this._musicTrack.addFilesToCabinet(fc);
        }
        if (this._voiceTrack != null) {
          this._voiceTrack.addFilesToCabinet(fc);
        }
      }
      const $enum1 = ss.enumerate(this._overlays);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.addFilesToCabinet(fc);
      }
    },
    getNextDefaultName: function (baseName) {
      let suffixId = 1;
      const $enum1 = ss.enumerate(this._overlays);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        if (ss.startsWith(overlay.get_name(), baseName)) {
          let id = 0;
          try {
            id = parseInt(overlay.get_name().substr(baseName.length));
          } catch ($e2) {
          }
          if (id >= suffixId) {
            suffixId = id + 1;
          }
        }
      }
      return ss.format('{0} {1}', baseName, suffixId);
    },
    _loadLayerList: function (layersNode) {
      const $enum1 = ss.enumerate(layersNode.childNodes);
      while ($enum1.moveNext()) {
        const layer = $enum1.current;
        if (layer.nodeName === 'Layer') {
          const info = new LayerInfo();
          const id = layer.innerHTML;
          info.id = Guid.fromString(id);
          info.startOpacity = parseFloat(layer.attributes.getNamedItem('StartOpacity').nodeValue);
          info.endOpacity = parseFloat(layer.attributes.getNamedItem('EndOpacity').nodeValue);
          let len = 0;
          if (layer.attributes.getNamedItem('ParamCount') != null) {
            len = parseInt(layer.attributes.getNamedItem('ParamCount').nodeValue);
          }
          info.startParams = new Array(len);
          info.endParams = new Array(len);
          info.frameParams = new Array(len);
          for (let i = 0; i < len; i++) {
            info.startParams[i] = parseFloat(layer.attributes.getNamedItem(ss.format('StartParam{0}', i)).nodeValue);
            info.endParams[i] = parseFloat(layer.attributes.getNamedItem(ss.format('EndParam{0}', i)).nodeValue);
            info.frameParams[i] = info.startParams[i];
          }
          this.layers[info.id] = info;
        }
      }
    },
    _updateLayerOpacity: function () {
      if (!this.get_keyFramed()) {
      } else {
        this.updateTweenPosition();
      }
    },
    get_showEquatorialGridText: function () {
      return this._showEquatorialGridText;
    },
    set_showEquatorialGridText: function (value) {
      this._showEquatorialGridText = value;
      return value;
    },
    get_showGalacticGrid: function () {
      return this._showGalacticGrid;
    },
    set_showGalacticGrid: function (value) {
      this._showGalacticGrid = value;
      return value;
    },
    get_showGalacticGridText: function () {
      return this._showGalacticGridText;
    },
    set_showGalacticGridText: function (value) {
      this._showGalacticGridText = value;
      return value;
    },
    get_showEclipticGrid: function () {
      return this._showEclipticGrid;
    },
    set_showEclipticGrid: function (value) {
      this._showEclipticGrid = value;
      return value;
    },
    get_showEclipticGridText: function () {
      return this._showEclipticGridText;
    },
    set_showEclipticGridText: function (value) {
      this._showEclipticGridText = value;
      return value;
    },
    get_showEclipticOverviewText: function () {
      return this._showEclipticOverviewText;
    },
    set_showEclipticOverviewText: function (value) {
      this._showEclipticOverviewText = value;
      return value;
    },
    get_showAltAzGrid: function () {
      return this._showAltAzGrid;
    },
    set_showAltAzGrid: function (value) {
      this._showAltAzGrid = value;
      return value;
    },
    get_showAltAzGridText: function () {
      return this._showAltAzGridText;
    },
    set_showAltAzGridText: function (value) {
      this._showAltAzGridText = value;
      return value;
    },
    get_showPrecessionChart: function () {
      return this._showPrecessionChart;
    },
    set_showPrecessionChart: function (value) {
      this._showPrecessionChart = value;
      return value;
    },
    get_showConstellationPictures: function () {
      return this._showConstellationPictures;
    },
    set_showConstellationPictures: function (value) {
      this._showConstellationPictures = value;
      return value;
    },
    get_showConstellationLabels: function () {
      return this._showConstellationLabels;
    },
    set_showConstellationLabels: function (value) {
      this._showConstellationLabels = value;
      return value;
    },
    get_solarSystemCMB: function () {
      return this._solarSystemCMB;
    },
    set_solarSystemCMB: function (value) {
      this._solarSystemCMB = value;
      return value;
    },
    get_solarSystemMinorPlanets: function () {
      return this._solarSystemMinorPlanets;
    },
    set_solarSystemMinorPlanets: function (value) {
      this._solarSystemMinorPlanets = value;
      return value;
    },
    get_solarSystemPlanets: function () {
      return this._solarSystemPlanets;
    },
    set_solarSystemPlanets: function (value) {
      this._solarSystemPlanets = value;
      return value;
    },
    get_showEarthSky: function () {
      return this._showEarthSky;
    },
    set_showEarthSky: function (value) {
      this._showEarthSky = value;
      return value;
    },
    get_solarSystemMinorOrbits: function () {
      return this._solarSystemMinorOrbits;
    },
    set_solarSystemMinorOrbits: function (value) {
      this._solarSystemMinorOrbits = value;
      return value;
    },
    get_constellationsEnabled: function () {
      return this._constellationsEnabled;
    },
    set_constellationsEnabled: function (value) {
      this._constellationsEnabled = value;
      return value;
    },
    get_constellationFiguresFilter: function () {
      return this._constellationFiguresFilter;
    },
    set_constellationFiguresFilter: function (value) {
      this._constellationFiguresFilter = value;
      return value;
    },
    get_constellationBoundariesFilter: function () {
      return this._constellationBoundariesFilter;
    },
    set_constellationBoundariesFilter: function (value) {
      this._constellationBoundariesFilter = value;
      return value;
    },
    get_constellationNamesFilter: function () {
      return this._constellationNamesFilter;
    },
    set_constellationNamesFilter: function (value) {
      this._constellationNamesFilter = value;
      return value;
    },
    get_constellationArtFilter: function () {
      return this._constellationArtFilter;
    },
    set_constellationArtFilter: function (value) {
      this._constellationArtFilter = value;
      return value;
    },
    get_showSkyOverlays: function () {
      return this._showSkyOverlays;
    },
    set_showSkyOverlays: function (value) {
      this._showSkyOverlays = value;
      return value;
    },
    get_showConstellations: function () {
      return this._showConstellations;
    },
    set_showConstellations: function (value) {
      this._showConstellations = value;
      return value;
    },
    get_showSkyNode: function () {
      return this._showSkyNode;
    },
    set_showSkyNode: function (value) {
      this._showSkyNode = value;
      return value;
    },
    get_showSkyGrids: function () {
      return this._showSkyGrids;
    },
    set_showSkyGrids: function (value) {
      this._showSkyGrids = value;
      return value;
    },
    get_showSkyOverlaysIn3d: function () {
      return this._showSkyOverlaysIn3d;
    },
    set_showSkyOverlaysIn3d: function (value) {
      this._showSkyOverlaysIn3d = value;
      return value;
    },
    get_earthCutawayView: function () {
      return this._earthCutawayView;
    },
    set_earthCutawayView: function (value) {
      this._earthCutawayView = value;
      return value;
    },
    get_showISSModel: function () {
      return this._showISSModel;
    },
    set_showISSModel: function (value) {
      this._showISSModel = value;
      return value;
    },
    get_milkyWayModel: function () {
      return this._milkyWayModel;
    },
    set_milkyWayModel: function (value) {
      this._milkyWayModel = value;
      return value;
    },
    get_minorPlanetsFilter: function () {
      return this._minorPlanetsFilter;
    },
    set_minorPlanetsFilter: function (value) {
      this._minorPlanetsFilter = value;
      return value;
    },
    get_planetOrbitsFilter: function () {
      return this._planetOrbitsFilter;
    },
    set_planetOrbitsFilter: function (value) {
      this._planetOrbitsFilter = value;
      return value;
    },
    getSetting: function (type) {
      if (type === 17) {
        return new SettingParameter(true, this.faderOpacity, !!this.faderOpacity, null);
      }
      return new SettingParameter(false, 1, false, null);
    }
  };

  function LayerInfo() {
    this.id = Guid.newGuid();
    this.startOpacity = 1;
    this.endOpacity = 1;
    this.frameOpacity = 1;
    this.startParams = new Array(0);
    this.endParams = new Array(0);
    this.frameParams = new Array(0);
  }
  const LayerInfo$ = {};

  function UndoTourStopChange(text, tour) {
    this._undoXml = '';
    this._redoXml = '';
    this._currentIndex = 0;
    this._actionText = '';
    this._targetTour = null;
    this._currentIndex = tour.get_currentTourstopIndex();
    this._actionText = text;
    this._targetTour = tour;
    this._undoXml = TourStop.getXmlText(tour.get_currentTourStop());
    this._targetTour.set_tourDirty(true);
  }
  const UndoTourStopChange$ = {
    get_actionText: function () {
      return this._actionText;
    },
    set_actionText: function (value) {
      this._actionText = value;
      return value;
    },
    undo: function () {
      const tsRedo = this._targetTour.get_tourStops()[this._currentIndex];
      const parser = new DOMParser();
      const doc = parser.parseFromString(this._undoXml, 'text/xml');
      const node = Util.selectSingleNode(doc, 'TourStop');
      this._targetTour.get_tourStops()[this._currentIndex] = TourStop._fromXml(this._targetTour, node);
      this._targetTour.set_currentTourstopIndex(this._currentIndex);
      if (ss.emptyString(this._redoXml)) {
        this._redoXml = TourStop.getXmlText(tsRedo);
      }
      this._targetTour.set_tourDirty(true);
    },
    redo: function () {
      const parser = new DOMParser();
      const doc = parser.parseFromString(this._redoXml, 'text/xml');
      const node = Util.selectSingleNode(doc, 'TourStop');
      this._targetTour.get_tourStops()[this._currentIndex] = TourStop._fromXml(this._targetTour, node);
      this._targetTour.set_currentTourstopIndex(this._currentIndex);
      this._targetTour.set_tourDirty(true);
    },
    toString: function () {
      return this._actionText;
    }
  };

  function Undo() {}
  Undo.clear = () => {
    Undo._undoStack = new ss.Stack();
    Undo._redoStack = new ss.Stack();
  };
  Undo.push = step => {
    Undo._undoStack.push(step);
    Undo._redoStack = new ss.Stack();
  };
  Undo.peekActionString = () => {
    if (Undo._undoStack.count > 0) {
      return Undo._undoStack.peek().toString();
    }
    else {
      return Language.getLocalizedText(551, 'Nothing to Undo');
    }
  };
  Undo.peekRedoActionString = () => {
    if (Undo._redoStack.count > 0) {
      return Undo._redoStack.peek().toString();
    }
    else {
      return '';
    }
  };
  Undo.peekAction = () => (Undo._undoStack.count > 0);
  Undo.peekRedoAction = () => (Undo._redoStack.count > 0);
  Undo.stepBack = () => {
    const step = Undo._undoStack.pop();
    step.undo();
    Undo._redoStack.push(step);
  };
  Undo.stepForward = () => {
    const step = Undo._redoStack.pop();
    step.redo();
    Undo._undoStack.push(step);
  };
  const Undo$ = {};

  function UndoStep() {}
  const UndoStep$ = {
    undo: () => {
    },
    redo: () => {
    },
    toString: () => Language.getLocalizedText(551, 'Nothing to Undo')
  };

  function UndoTourSlidelistChange(text, tour) {
    this._currentIndex = 0;
    this._actionText = '';
    this._targetTour = null;
    this._undoList = [];
    for (let i = 0; i < tour.get_tourStops().length; i++) {
      this._undoList.push(tour.get_tourStops()[i]);
    }
    this._currentIndex = tour.get_currentTourstopIndex();
    this._actionText = text;
    this._targetTour = tour;
    this._targetTour.set_tourDirty(true);
  }
  const UndoTourSlidelistChange$ = {
    get_actionText: function () {
      return this._actionText;
    },
    set_actionText: function (value) {
      this._actionText = value;
      return value;
    },
    undo: function () {
      this._redoList = this._targetTour.get_tourStops();
      this._targetTour.set_tourStops(this._undoList);
      this._targetTour.set_currentTourstopIndex(this._currentIndex);
      this._targetTour.set_tourDirty(true);
    },
    redo: function () {
      this._undoList = this._targetTour.get_tourStops();
      this._targetTour.set_tourStops(this._redoList);
      this._targetTour.set_currentTourstopIndex(this._currentIndex);
      this._targetTour.set_tourDirty(true);
    },
    toString: function () {
      return this._actionText;
    }
  };

  function UndoTourPropertiesChange(text, tour) {
    this._actionText = '';
    this._targetTour = null;
    this._undoDomeMode = false;
    this._undoLevel = 0;
    this._redoDomeMode = false;
    this._redoLevel = 0;
    this._undoTitle = tour.get_title();
    this._undoAuthor = tour.get_author();
    this._undoAuthorEmail = tour.get_authorEmail();
    this._undoDescription = tour.get_description();
    this._undoAuthorImage = tour.get_authorImage();
    this._undoOrganizationUrl = tour.get_organizationUrl();
    this._undoOrgName = tour.get_orgName();
    this._undoKeywords = tour.get_keywords();
    this._undoTaxonomy = tour.get_taxonomy();
    this._undoLevel = tour.get_level();
    this._actionText = text;
    this._targetTour = tour;
    this._targetTour.set_tourDirty(true);
  }
  const UndoTourPropertiesChange$ = {
    get_actionText: function () {
      return this._actionText;
    },
    set_actionText: function (value) {
      this._actionText = value;
      return value;
    },
    undo: function () {
      this._redoTitle = this._targetTour.get_title();
      this._redoAuthor = this._targetTour.get_author();
      this._redoAuthorEmail = this._targetTour.get_authorEmail();
      this._redoDescription = this._targetTour.get_description();
      this._redoAuthorImage = this._targetTour.get_authorImage();
      this._redoOrganizationUrl = this._targetTour.get_organizationUrl();
      this._redoOrgName = this._targetTour.get_orgName();
      this._redoKeywords = this._targetTour.get_keywords();
      this._redoTaxonomy = this._targetTour.get_taxonomy();
      this._redoLevel = this._targetTour.get_level();
      this._targetTour.set_title(this._undoTitle);
      this._targetTour.set_author(this._undoAuthor);
      this._targetTour.set_authorEmail(this._undoAuthorEmail);
      this._targetTour.set_description(this._undoDescription);
      this._targetTour.set_authorImage(this._undoAuthorImage);
      this._targetTour.set_organizationUrl(this._undoOrganizationUrl);
      this._targetTour.set_orgName(this._undoOrgName);
      this._targetTour.set_keywords(this._undoKeywords);
      this._targetTour.set_taxonomy(this._undoTaxonomy);
      this._targetTour.set_level(this._undoLevel);
      this._targetTour.set_tourDirty(true);
    },
    redo: function () {
      this._targetTour.set_title(this._redoTitle);
      this._targetTour.set_author(this._redoAuthor);
      this._targetTour.set_authorEmail(this._redoAuthorEmail);
      this._targetTour.set_description(this._redoDescription);
      this._targetTour.set_authorImage(this._redoAuthorImage);
      this._targetTour.set_organizationUrl(this._redoOrganizationUrl);
      this._targetTour.set_orgName(this._redoOrgName);
      this._targetTour.set_keywords(this._redoKeywords);
      this._targetTour.set_taxonomy(this._redoTaxonomy);
      this._targetTour.set_level(this._redoLevel);
      this._targetTour.set_tourDirty(true);
    },
    toString: function () {
      return this._actionText;
    }
  };


  function Rectangle() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }
  Rectangle.create = (x, y, width, height) => {
    const temp = new Rectangle();
    temp.x = x;
    temp.y = y;
    temp.width = width;
    temp.height = height;
    return temp;
  };
  const Rectangle$ = {
    get_left: function () {
      return this.x;
    },
    get_right: function () {
      return this.x + this.width;
    },
    get_top: function () {
      return this.y;
    },
    get_bottom: function () {
      return this.y + this.height;
    },
    contains: function (point) {
      return (this._between(point.x, this.x, this.x + this.width) && this._between(point.y, this.y, this.y + this.height));
    },
    _between: (n, n1, n2) => {
      if (n1 > n2) {
        return !(n > n1) && !(n < n2);
      } else {
        return !(n < n1) && !(n > n2);
      }
    },
    copy: function () {
      const temp = new Rectangle();
      temp.x = this.x;
      temp.y = this.y;
      temp.width = this.width;
      temp.height = this.height;
      return temp;
    }
  };

  function Cursor() {}
  Cursor.get_position = () => new Vector2d();
  Cursor.get_current = () => document.body.style.cursor;
  Cursor.set_current = value => {
    document.body.style.cursor = value;
    return value;
  };
  const Cursor$ = {};

  function Cursors() {
  }
  Cursors.get_arrow = () => 'default';
  Cursors.get_cross = () => 'crosshair';
  Cursors.get_defaultV = () => 'default';
  Cursors.get_hand = () => 'grab';
  Cursors.get_help = () => 'help';
  Cursors.get_hSplit = () => 'row-resize';
  Cursors.get_iBeam = () => 'text';
  Cursors.get_no = () => 'not-allowed';
  Cursors.get_sizeAll = () => 'help';
  Cursors.get_sizeNESW = () => 'nwse-resize';
  Cursors.get_sizeNS = () => 'ns-resize';
  Cursors.get_sizeNWSE = () => 'nwse-resize';
  Cursors.get_sizeWE = () => 'ew-resize';
  Cursors.get_upArrow = () => 'help';
  Cursors.get_vSplit = () => 'col-resize';
  Cursors.get_waitCursor = () => 'wait';
  const Cursors$ = {};

  function SelectLink(id) {
    this._return = false;
    this._next = true;
    this._linkSlide = false;
    this._slide = null;
    this._ok = false;
    if (id != null) {
      this.set_id(id);
    }
    else {
      this.set_next(true);
    }
  }
  const SelectLink$ = {
    get_returnCaller: function () {
      return this._return;
    },
    set_returnCaller: function (value) {
      if (value) {
        this._slide = 'Return';
      }
      this._return = value;
      return value;
    },
    get_next: function () {
      return this._next;
    },
    set_next: function (value) {
      if (value) {
        this._slide = 'Next';
      }
      this._next = value;
      return value;
    },
    get_linkToSlide: function () {
      return this._linkSlide;
    },
    set_linkToSlide: function (value) {
      if (value) {
        this._slide = 'Next';
      }
      this._linkSlide = value;
      return value;
    },
    get_id: function () {
      return this._slide;
    },
    set_id: function (value) {
      this._return = false;
      this._next = false;
      this._linkSlide = true;
      this._slide = value;
      return value;
    },
    get_OK: function () {
      return this._ok;
    },
    set_OK: function (value) {
      this._ok = value;
      return value;
    }
  };

  function PopupVolume() {
    this.volume = 0;
  }
  const PopupVolume$ = {
    showDialog: () => 1
  };

  function PopupColorPicker() {
    this.volume = 0;
    this.location = new Vector2d();
    this.color = new Color();
  }
  const PopupColorPicker$ = {
    showDialog: () => 1
  };

  function OverlayProperties() {
    this.volume = 0;
    this.location = new Vector2d();
    this.overlay = null;
  }
  const OverlayProperties$ = {
    showDialog: () => 1
  };


  function Bitmap() {
    this.width = 0;
    this.height = 0;
  }
  Bitmap.create = (width, height) => {
    height = Texture.fitPowerOfTwo(height);
    width = Texture.fitPowerOfTwo(width);
    const bmp = new Bitmap();
    bmp.height = height;
    bmp.width = width;
    bmp._buffer = new Uint8Array(width * height * 4);
    return bmp;
  };
  const Bitmap$ = {
    setPixel: function (x, y, r, g, b, a) {
      let index = (x + y * this.width) * 4;
      this._buffer[index++] = r;
      this._buffer[index++] = g;
      this._buffer[index++] = b;
      this._buffer[index++] = a;
    },
    getTexture: function () {
      const tex = Tile.prepDevice.createTexture();
      Tile.prepDevice.bindTexture(3553, tex);
      Tile.prepDevice.texParameteri(3553, 10242, 33071);
      Tile.prepDevice.texParameteri(3553, 10243, 33071);
      Tile.prepDevice.texImage2D(3553, 0, 6408, this.width, this.height, 0, 6408, 5121, this._buffer);
      Tile.prepDevice.texParameteri(3553, 10241, 9985);
      Tile.prepDevice.generateMipmap(3553);
      Tile.prepDevice.bindTexture(3553, null);
      return tex;
    }
  };

  function ColorPicker() {
    this.callBack = null;
    this.color = Colors.get_white();
  }
  const ColorPicker$ = {
    nonMenuClick: e => {
    },
    show: function (e) {
      WWTControl.scriptInterface.showColorPicker(this, e);
    },
    getColorFromClick: function (e) {
      const image = document.getElementById('colorhex');
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
      this.color = Color.fromArgb(pixels[3], pixels[0], pixels[1], pixels[2]);
      return this.color;
    },
    pickColor: function (e) {
      this.callBack(this.color);
    }
  };

  function ContextMenuStrip() {
    this.items = [];
  }
  const ContextMenuStrip$ = {
    _dispose: () => {
    },
    _nonMenuClick: function (e) {
      const menu = document.getElementById('contextmenu');
      menu.style.display = 'none';
      window.removeEventListener('click', ss.bind('_nonMenuClick', this), false);
      const popup = document.getElementById('popoutmenu');
      while (popup.firstChild != null) {
        popup.removeChild(popup.firstChild);
      }
      popup.style.display = 'none';
    },
    _menuItemClicked: e => {
      const me = e.currentTarget;
      me.itemTag.click(me.itemTag, new ss.EventArgs());
    },
    _show: function (position) {
      const menu = document.getElementById('contextmenu');
      while (menu.firstChild != null) {
        menu.removeChild(menu.firstChild);
      }
      menu.className = 'contextmenu';
      menu.style.display = 'block';
      menu.style.left = position.x.toString() + 'px';
      menu.style.top = position.y.toString() + 'px';
      window.addEventListener('click', ss.bind('_nonMenuClick', this), true);
      const $enum1 = ss.enumerate(this.items);
      while ($enum1.moveNext()) {
        const item = $enum1.current;
        if (item.visible) {
          const md = document.createElement('div');
          if (item.dropDownItems.length > 0) {
            md.className = 'contextmenuitem submenu';
          } else {
            if (item.checked) {
              md.className = 'contextmenuitem checkedmenu';
            } else {
              md.className = 'contextmenuitem';
            }
          }
          md.innerText = item.name;
          const it = md;
          it.itemTag = item;
          md.addEventListener('mouseover', ss.bind('_openSubMenu', this), false);
          if (item.click != null) {
            md.addEventListener('click', ss.bind('_menuItemClicked', this), false);
          }
          menu.appendChild(md);
        }
      }
    },
    _openSubMenu: function (e) {
      const me = e.currentTarget;
      const child = me.itemTag;
      const menu = document.getElementById('popoutmenu');
      while (menu.firstChild != null) {
        menu.removeChild(menu.firstChild);
      }
      menu.style.display = 'none';
      if (!child.dropDownItems.length) {
        return;
      }
      const position = new Vector2d();
      position.x = e.currentTarget.parentNode.offsetLeft + e.currentTarget.parentNode.clientWidth;
      position.y = e.currentTarget.parentNode.offsetTop + e.currentTarget.offsetTop;
      menu.className = 'contextmenu';
      menu.style.display = 'block';
      menu.style.left = position.x.toString() + 'px';
      menu.style.top = position.y.toString() + 'px';
      window.addEventListener('click', ss.bind('_nonMenuClick', this), true);
      const $enum1 = ss.enumerate(child.dropDownItems);
      while ($enum1.moveNext()) {
        const item = $enum1.current;
        if (item.visible) {
          const md = document.createElement('div');
          md.className = (item.checked) ? 'contextmenuitem checkedmenu' : 'contextmenuitem';
          md.innerText = item.name;
          const it = md;
          it.itemTag = item;
          md.addEventListener('click', ss.bind('_menuItemClicked', this), false);
          menu.appendChild(md);
        }
      }
    }
  };

  function ToolStripMenuItem() {
    this.tag = null;
    this.dropDownItems = [];
    this.checked = false;
    this.enabled = true;
    this.visible = true;
  }
  ToolStripMenuItem.create = name => {
    const tsmi = new ToolStripMenuItem();
    tsmi.name = name;
    return tsmi;
  };
  const ToolStripMenuItem$ = {};

  function TagMe() { }
  const TagMe$ = {};

  function Dialog() {}
  const Dialog$ = {
    add_showDialogHook: function (value) {
      this.__showDialogHook = ss.bindAdd(this.__showDialogHook, value);
    },
    remove_showDialogHook: function (value) {
      this.__showDialogHook = ss.bindSub(this.__showDialogHook, value);
    },
    show: function (dialogArgs, e) {
      if (this.__showDialogHook != null) {
        this.__showDialogHook(dialogArgs, e);
      }
    }
  };

  function SimpleInput(title, label, text, v3) {
    this.title = 'Tile';
    this.label = 'Enter Text Below';
    this.text = '';
    this._textElement = null;
    this._ignoreNextClick = false;
    this.title = title;
    this.label = label;
    this.text = text;
  }
  const SimpleInput$ = {
    showDialog: () => 1,
    nonMenuClick: function (e) {
      if (!this._ignoreNextClick) {
        this._close();
      }
      this._ignoreNextClick = false;
    },
    show: function (position, callback) {
      const simpleInputElement = document.getElementById('simpleinput');
      const modalElement = document.getElementById('simplemodal');
      modalElement.style.display = 'block';
      simpleInputElement.style.display = 'block';
      simpleInputElement.style.marginLeft = position.x.toString() + 'px';
      simpleInputElement.style.marginTop = position.y.toString() + 'px';
      this._textElement = document.getElementById('inputtext');
      this._textElement.value = this.text;
      const titleDiv = document.getElementById('simpletitle');
      const labelDiv = document.getElementById('inputlabel');
      titleDiv.innerText = this.title;
      labelDiv.innerText = this.label;
      this._textElement.addEventListener('change', ss.bind('textChanged', this), false);
      this._textElement.addEventListener('click', ss.bind('ignoreMe', this), true);
      const okButton = document.getElementById('simpleinputok');
      const cancelButton = document.getElementById('simpleinputcancel');
      okButton.addEventListener('click', ss.bind('okClicked', this), false);
      cancelButton.addEventListener('click', ss.bind('cancelClicked', this), false);
      this._okCallback = callback;
    },
    okClicked: function (e) {
      this._close();
      if (this._okCallback != null) {
        this._okCallback();
      }
    },
    cancelClicked: function (e) {
      this._close();
    },
    _close: function () {
      const simpleInputElement = document.getElementById('simplemodal');
      simpleInputElement.style.display = 'none';
      this._textElement.removeEventListener('change', ss.bind('textChanged', this), false);
      const okButton = document.getElementById('simpleinputok');
      const cancelButton = document.getElementById('simpleinputcancel');
      okButton.removeEventListener('click', ss.bind('okClicked', this), false);
      cancelButton.removeEventListener('click', ss.bind('cancelClicked', this), false);
    },
    ignoreMe: function (e) {
      this._ignoreNextClick = true;
    },
    textChanged: function (e) {
      this.text = this._textElement.value;
      this._ignoreNextClick = true;
    }
  };

  function XmlTextWriter() {
    this.body = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\r\n';
    this.formatting = 1;
    this._elementStack = new ss.Stack();
    this._pending = false;
    this._currentName = '';
    this._attributes = {};
    this._value = '';
  }
  const XmlTextWriter$ = {
    _pushNewElement: function (name) {
      this._writePending(false);
      this._elementStack.push(name);
      this._pending = true;
      this._currentName = name;
    },
    _writePending: function (fullClose) {
      let closed = true;
      if (this._pending) {
        for (let i = 1; i < this._elementStack.count; i++) {
          this.body += '  ';
        }
        this.body += '<' + this._currentName;
        if (ss.keyCount(this._attributes) > 0) {
          const $enum1 = ss.enumerate(ss.keys(this._attributes));
          while ($enum1.moveNext()) {
            const key = $enum1.current;
            this.body += ss.format(' {0}="{1}"', key, this._attributes[key]);
          }
        }
        if (!ss.emptyString(this._value)) {
          this.body += '>';
          closed = false;
          if (!ss.emptyString(this._value)) {
            this.body += this._value;
          }
        } else {
          if (fullClose) {
            this.body += ' />\r\n';
            closed = true;
          } else {
            this.body += '>\r\n';
          }
        }
        this._pending = false;
        this._currentName = '';
        this._value = '';
        this._attributes = {};
        return closed;
      }
      return false;
    },
    _writeProcessingInstruction: (v1, v2) => {
    },
    _writeStartElement: function (name) {
      this._pushNewElement(name);
    },
    _writeAttributeString: function (key, value) {
      if (value != null) {
        this._attributes[key] = ss.replaceString(value.toString(), '&', '&amp;');
      } else {
        this._attributes[key] = '';
      }
    },
    _writeEndElement: function () {
      if (!this._writePending(true)) {
        for (let i = 1; i < this._elementStack.count; i++) {
          this.body += '  ';
        }
        this.body += ss.format('</{0}>\r\n', this._elementStack.pop());
      } else {
        this._elementStack.pop();
      }
    },
    _writeString: function (text) {
      this._value = ss.replaceString(text, '&', '&amp;');
    },
    _writeFullEndElement: function () {
      this._writePending(false);
      for (let i = 1; i < this._elementStack.count; i++) {
        this.body += '  ';
      }
      this.body += ss.format('</{0}>\r\n', this._elementStack.pop());
    },
    _close: () => {
    },
    _writeElementString: function (name, value) {
      this._writeStartElement(name);
      this._writeValue(ss.replaceString(value, '&', '&amp;'));
      this._writeEndElement();
    },
    _writeValue: function (val) {
      this._value = ss.replaceString(val, '&', '&amp;');
    },
    _writeCData: function (htmlDescription) {
      this._value = ss.format('<![CDATA[{0}]]>', htmlDescription);
    }
  };

  function VizLayer() {
    this.table = [];
    this.items = [];
    this._imageReady = false;
    this._dateColumn = 0;
    this._latColumn = 1;
    this._lngColumn = 2;
    this._depthColumn = 3;
    this._magColumn = 4;
  }
  const VizLayer$ = {
    load: function (data) {
      const $this = this;

      const lines = data.split('\r\n');
      this._starProfile = document.createElement('img');
      this._starProfile.addEventListener('load', e => {
        $this._imageReady = true;
      }, false);
      this._starProfile.src = 'images/StarProfileAlpha.png';
      let gotHeader = false;
      const $enum1 = ss.enumerate(lines);
      while ($enum1.moveNext()) {
        const line = $enum1.current;
        if (gotHeader) {
          this.table.push(line.split('\t'));
        } else {
          this.header = line.split('\t');
          gotHeader = true;
        }
      }
    },
    prepare: function () {
      this._worldList = new Array(this.table.length);
      this._transformedList = new Array(this.table.length);
      let index = 0;
      const $enum1 = ss.enumerate(this.table);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        const item = new DataItem();
        item.eventTime = ss.date(row[this._dateColumn]);
        const radius = (6371000 - parseFloat(row[this._depthColumn]) * 1000) / 6371000;
        item.location = Coordinates.geoTo3dRad(parseFloat(row[this._latColumn]), parseFloat(row[this._lngColumn]) + 180, radius);
        item.tranformed = new Vector3d();
        item.size = Math.pow(2, parseFloat(row[this._magColumn])) / 50;
        this._worldList[index] = item.location;
        this._transformedList[index] = item.tranformed;
        this.items.push(item);
        index++;
      }
    },
    draw: function (renderContext) {
      if (!this._imageReady) {
        return;
      }
      renderContext.device.save();
      renderContext.WVP.projectArrayToScreen(this._worldList, this._transformedList);
      const ctx = renderContext.device;
      ctx.globalAlpha = 0.4;
      const width = renderContext.width;
      const height = renderContext.height;
      const viewPoint = Vector3d.makeCopy(renderContext.get_viewPoint());
      const scaleFactor = renderContext.get_fovScale() / 100;
      const $enum1 = ss.enumerate(this.items);
      while ($enum1.moveNext()) {
        const item = $enum1.current;
        if (item.tranformed.z < 1) {
          const x = item.tranformed.x;
          const y = item.tranformed.y;
          const size = 4 * item.size / scaleFactor;
          const half = size / 2;
          if (x > -half && x < width + half && y > -half && y < height + half) {
            ctx.drawImage(this._starProfile, x - size / 2, y - size / 2, size, size);
          }
        }
      }
      renderContext.device.restore();
    }
  };

  function DataItem() {
    this.size = 0;
  }
  const DataItem$ = {
    getColor: () => 'Red'
  };


  function WWTElementEvent(x, y) {
    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetX = x;
    this.offsetY = y;
  }
  const WWTElementEvent$ = {};

  function Lineset(name) {
    this._name = name;
    this.points = [];
  }
  const Lineset$ = {
    get_name: function () {
      return this._name;
    },
    set_name: function (value) {
      this._name = value;
      return value;
    },
    add: function (ra, dec, pointType, name) {
      this.points.push(new Linepoint(ra, dec, pointType, name));
    }
  };

  function Linepoint(ra, dec, type, name) {
    this.RA = 0;
    this.dec = 0;
    this.pointType = 0;
    this.name = null;
    this.RA = ra;
    this.dec = dec;
    this.pointType = type;
    this.name = name;
  }
  const Linepoint$ = {
    toString: function () {
      if (ss.emptyString(this.name)) {
        return Coordinates.formatDMS((((this.RA / 360) * 24 + 12) % 24)) + ', ' + Coordinates.formatDMS(this.dec) + ', ' + this.pointType.toString();
      } else {
        return this.name + ', ' + this.pointType.toString();
      }
    }
  };

  function FolderBrowser() {
    this._items = [];
    this.top = 10;
    this.left = 10;
    this._indexTouchDown = -1;
    this._mouseDown = false;
    this._lastX = 0;
    this._lastY = 0;
    this._ignoreClick = false;
    this._thumbnailSize = 0;
    this._horzSpacing = 110;
    this._vertSpacing = 75;
    this._thumbHeight = 65;
    this._thumbWidth = 110;
    this._horzMultiple = 110;
    this._rowCount = 1;
    this._colCount = 6;
    this._dragging = false;
    this._startIndex = 0;
    this._startOffset = 0;
    this._selectedItem = -1;
    this._hoverItem = -1;
    this.showAddButton = false;
    this.width = 0;
    this.height = 0;
    this._addButtonHover = false;
    this.imageClicked = false;
  }
  FolderBrowser.create = () => {
    const temp = new FolderBrowser();
    temp.height = 85;
    temp.width = 1920;
    temp.canvas = document.createElement('canvas');
    temp.canvas.width = temp.width;
    temp.canvas.height = temp.height;
    temp.setup();
    temp.loadImages();
    return temp;
  };
  const FolderBrowser$ = {
    setup: function () {
      this.canvas.addEventListener('click', ss.bind('onClick', this), false);
      this.canvas.addEventListener('dblclick', ss.bind('onDoubleClick', this), false);
      this.canvas.addEventListener('mousemove', ss.bind('onMouseMove', this), false);
      this.canvas.addEventListener('mouseup', ss.bind('onMouseUp', this), false);
      this.canvas.addEventListener('mousedown', ss.bind('onMouseDown', this), false);
      this.canvas.addEventListener('mousewheel', ss.bind('onMouseWheel', this), false);
      this.canvas.addEventListener('touchstart', ss.bind('onTouchStart', this), false);
      this.canvas.addEventListener('touchmove', ss.bind('onTouchMove', this), false);
      this.canvas.addEventListener('touchend', ss.bind('onTouchEnd', this), false);
      this.canvas.addEventListener('mouseout', ss.bind('onMouseUp', this), false);
    },
    onTouchStart: function (e) {
      const ev = e;
      ev.preventDefault();
      this._mouseDown = true;
      this._lastX = ev.targetTouches[0].pageX;
      this._lastY = ev.targetTouches[0].pageY;
      this._indexTouchDown = this._getItemIndexFromCursor(Vector2d.create(ev.targetTouches[0].pageX, ev.targetTouches[0].pageY));
    },
    onTouchMove: function (e) {
      const ev = e;
      ev.preventDefault();
      if (this._mouseDown) {
        const curX = ev.targetTouches[0].pageX - this._lastX;
        const curY = ev.targetTouches[0].pageY - this._lastY;
        if (this._mouseDown) {
          this._dragging = true;
        }
        if (!this._dragging) {
          const newHover = this._getItemIndexFromCursor(Vector2d.create(ev.targetTouches[0].pageX, ev.targetTouches[0].pageY));
          if (this._hoverItem !== newHover) {
            this._hoverItem = newHover;
          }
        } else {
          const tiles = Math.round(((ev.targetTouches[0].pageX - this._lastX) + this._startOffset) / this._horzSpacing);
          const offset = Math.round(((ev.targetTouches[0].pageX - this._lastX) + this._startOffset) - (tiles * this._horzSpacing));
          this._startOffset = offset;
          this._startIndex -= tiles;
          if (this._startIndex < 0) {
            this._startOffset -= (this._horzSpacing * this._startIndex);
            this._startIndex = 0;
          }
          this._lastX = ev.targetTouches[0].pageX;
          this._lastY = ev.targetTouches[0].pageY;
        }
        this.refresh();
      }
    },
    onTouchEnd: function (e) {
      const ev = e;
      ev.preventDefault();
      if (this._dragging) {
        this._dragging = false;
        this._ignoreClick = true;
      } else if (this._indexTouchDown > -1 && this._mouseDown) {
        this._handleClick(this._indexTouchDown);
      }
      this._startOffset = 0;
      this._mouseDown = false;
      this.refresh();
    },
    onClick: function (e) {
      if (!this._ignoreClick) {
        const index = this._getItemIndexFromCursor(Vector2d.create(e.offsetX, e.offsetY));
        this._handleClick(index);
      } else {
        this._ignoreClick = false;
      }
    },
    _handleClick: function (index) {
      const $this = this;

      if (index > -1) {
        if (ss.canCast(this._items[index], Place)) {
          const place = this._items[index];
          WWTControl.singleton.gotoTarget(place, false, false, true);
          return;
        }
        if (ss.canCast(this._items[index], Imageset)) {
          const imageset = this._items[index];
          WWTControl.singleton.renderContext.set_backgroundImageset(imageset);
          return;
        }
        if (ss.canCast(this._items[index], Tour)) {
          const tour = this._items[index];
          WWTControl.singleton.playTour(tour.get_tourUrl());
          return;
        }
        if (ss.canCast(this._items[index], Folder)) {
          const folder = this._items[index];
          this._startIndex = 0;
          folder.childLoadCallback(() => {
            $this._items = folder.get_children();
            $this.refresh();
          });
          return;
        }
        if (ss.canCast(this._items[index], FolderUp)) {
          const folderUp = this._items[index];
          if (folderUp.parent != null) {
            this._startIndex = 0;
            folderUp.parent.childLoadCallback(() => {
              $this._items = folderUp.parent.get_children();
              $this.refresh();
            });
          }
          return;
        }
      }
      return;
    },
    onDoubleClick: e => {
      RenderTriangle.renderingOn = !RenderTriangle.renderingOn;
    },
    onGestureChange: function (e) {
      const g = e;
      this._mouseDown = false;
      const delta = g.scale;
    },
    onMouseDown: function (e) {
      this._mouseDown = true;
      this._lastX = Mouse.offsetX(this.canvas, e);
      this._lastY = Mouse.offsetY(this.canvas, e);
    },
    onMouseMove: function (e) {
      if (this._mouseDown) {
        this._dragging = true;
      }
      if (!this._dragging) {
        const newHover = this._getItemIndexFromCursor(Vector2d.create(Mouse.offsetX(this.canvas, e), Mouse.offsetY(this.canvas, e)));
        if (this._hoverItem !== newHover) {
          this._hoverItem = newHover;
        }
      } else {
        const tiles = Math.round(((Mouse.offsetX(this.canvas, e) - this._lastX) + this._startOffset) / this._horzSpacing);
        const offset = Math.round(((Mouse.offsetX(this.canvas, e) - this._lastX) + this._startOffset) - (tiles * this._horzSpacing));
        this._startOffset = offset;
        this._startIndex -= tiles;
        if (this._startIndex < 0) {
          this._startOffset -= (this._horzSpacing * this._startIndex);
          this._startIndex = 0;
        }
        this._lastX = Mouse.offsetX(this.canvas, e);
        this._lastY = Mouse.offsetY(this.canvas, e);
      }
      this.refresh();
    },
    onMouseUp: function (e) {
      if (this._dragging) {
        this._startOffset = 0;
        this._dragging = false;
        this._ignoreClick = true;
      }
      this._mouseDown = false;
      this.refresh();
    },
    onMouseWheel: e => {
      const ev = e;
      const delta = ev.wheelDelta;
    },
    loadImages: function () {
      const $this = this;

      if (!FolderBrowser._imagesLoaded && !FolderBrowser._downloading) {
        FolderBrowser._imageLoadCount = 0;
        FolderBrowser._imagesLoaded = false;
        FolderBrowser._downloading = true;
        FolderBrowser._bmpBackground = document.createElement('img');
        FolderBrowser._bmpBackground.src = 'images/thumbBackground.png';
        FolderBrowser._bmpBackground.addEventListener('load', e => {
          FolderBrowser._imageLoadCount++;
          if (FolderBrowser._imageLoadCount === 5) {
            FolderBrowser._downloading = false;
            FolderBrowser._imagesLoaded = true;
            $this.refresh();
          }
        }, false);
        FolderBrowser._bmpBackgroundHover = document.createElement('img');
        FolderBrowser._bmpBackgroundHover.src = 'images/thumbBackgroundHover.png';
        FolderBrowser._bmpBackgroundHover.addEventListener('load', e => {
          FolderBrowser._imageLoadCount++;
          if (FolderBrowser._imageLoadCount === 5) {
            FolderBrowser._downloading = false;
            FolderBrowser._imagesLoaded = true;
            $this.refresh();
          }
        }, false);
        FolderBrowser._bmpBackgroundWide = document.createElement('img');
        FolderBrowser._bmpBackgroundWide.src = 'images/thumbBackgroundWide.png';
        FolderBrowser._bmpBackgroundWide.addEventListener('load', e => {
          FolderBrowser._imageLoadCount++;
          if (FolderBrowser._imageLoadCount === 5) {
            FolderBrowser._downloading = false;
            FolderBrowser._imagesLoaded = true;
            $this.refresh();
          }
        }, false);
        FolderBrowser._bmpBackgroundWideHover = document.createElement('img');
        FolderBrowser._bmpBackgroundWideHover.src = 'images/thumbBackgroundWideHover.png';
        FolderBrowser._bmpBackgroundWideHover.addEventListener('load', e => {
          FolderBrowser._imageLoadCount++;
          if (FolderBrowser._imageLoadCount === 5) {
            FolderBrowser._downloading = false;
            FolderBrowser._imagesLoaded = true;
            $this.refresh();
          }
        }, false);
        FolderBrowser._bmpDropInsertMarker = document.createElement('img');
        FolderBrowser._bmpDropInsertMarker.src = 'images/dragInsertMarker.png';
        FolderBrowser._bmpDropInsertMarker.addEventListener('load', e => {
          FolderBrowser._imageLoadCount++;
          if (FolderBrowser._imageLoadCount === 5) {
            FolderBrowser._downloading = false;
            FolderBrowser._imagesLoaded = true;
            $this.refresh();
          }
        }, false);
      }
    },
    get_thumbnailSize: function () {
      return this._thumbnailSize;
    },
    set_thumbnailSize: function (value) {
      this._thumbnailSize = value;
      switch (value) {
        case 1:
          this._horzSpacing = 180;
          this._vertSpacing = 75;
          this._thumbHeight = 65;
          this._thumbWidth = 180;
          break;
        case 0:
          this._horzSpacing = 110;
          this._vertSpacing = 75;
          this._thumbHeight = 65;
          this._thumbWidth = 110;
          break;
      }
      this._updatePaginator();
      this.refresh();
      return value;
    },
    refresh: function () {
      if (this.width !== window.innerWidth) {
        this.width = window.innerWidth;
        this.canvas.width = this.canvas.width;
      }
      this.paint();
    },
    get_rowCount: function () {
      return this._rowCount;
    },
    set_rowCount: function (value) {
      if (this._rowCount !== value) {
        this._rowCount = value;
        this._updatePaginator();
      }
      return value;
    },
    _updatePaginator: () => {
    },
    get_colCount: function () {
      return this._colCount;
    },
    set_colCount: function (value) {
      if (this._colCount !== value) {
        this._colCount = value;
        this._updatePaginator();
      }
      return value;
    },
    get_itemsPerPage: function () {
      return this._rowCount * this._colCount;
    },
    get_currentPage: function () {
      return this._startIndex / this.get_itemsPerPage();
    },
    get_pageCount: function () {
      return Math.max(1, ((this._items.length + this.get_itemsPerPage() - 1) + ((this.showAddButton) ? 1 : 0)) / this.get_itemsPerPage());
    },
    paint: function () {
      const $this = this;

      const g = this.canvas.getContext('2d');
      g.fillStyle = 'rgb(20, 22, 31)';
      g.fillRect(0, 0, this.width, this.height);
      if (!FolderBrowser._imagesLoaded) {
        return;
      }
      const netHeight = (this.height - 10 * 2);
      const netWidth = (this.width - 10 * 2);
      this.set_rowCount(Math.round(Math.max(netHeight / this._thumbHeight, 1)));
      this.set_colCount(Math.round(Math.max(netWidth / this._horzSpacing, 1)));
      this._horzMultiple = (netWidth + 13) / this.get_colCount();
      this._startIndex = Math.round((this._startIndex / this.get_itemsPerPage()) * this.get_itemsPerPage());
      let rectf;
      let index = this._startIndex;
      for (let y = 0; y < this._rowCount; y++) {
        for (let x = 0; x < this._colCount; x++) {
          if (index >= this._items.length) {
            if (!this._items.length || this.showAddButton) {
              rectf = Rectangle.create(this.left + x * this._horzMultiple + 3 + this._startOffset, this.top + y * this._vertSpacing, this._thumbWidth - 10, 60);
              g.drawImage((this._thumbnailSize === 1) ? FolderBrowser._bmpBackgroundWide : FolderBrowser._bmpBackground, ss.truncate((x * this._horzMultiple)) + this._startOffset, y * this._vertSpacing);
            }
            break;
          }
          rectf = Rectangle.create(this.left + x * this._horzMultiple + 3 + this._startOffset, this.top + y * this._vertSpacing, this._thumbWidth - 14, 60);
          let textBrush = 'white';
          if (index === this._hoverItem || (index === this._selectedItem && this._hoverItem === -1)) {
            g.drawImage((this._thumbnailSize === 1) ? FolderBrowser._bmpBackgroundWideHover : FolderBrowser._bmpBackgroundHover, this.left + ss.truncate((x * this._horzMultiple)) + this._startOffset, this.top + y * this._vertSpacing);
            textBrush = 'yellow';
          } else {
            g.drawImage((this._thumbnailSize === 1) ? FolderBrowser._bmpBackgroundWide : FolderBrowser._bmpBackground, this.left + ss.truncate((x * this._horzMultiple)) + this._startOffset, this.top + y * this._vertSpacing);
          }
          this._items[index].set_bounds(Rectangle.create((this.left + x * this._horzMultiple) + this._startOffset, this.top + (y * this._vertSpacing), ss.truncate(this._horzMultiple), this._vertSpacing));
          try {
            const bmpThumb = this._items[index].get_thumbnail();
            if (bmpThumb != null) {
              g.drawImage(bmpThumb, this.left + (x * this._horzMultiple) + 2 + this._startOffset, this.top + y * this._vertSpacing + 3);
              g.strokeStyle = 'rgb(0,0,0)';
              g.rect(this.left + ss.truncate((x * this._horzMultiple)) + 2 + this._startOffset, this.top + y * this._vertSpacing + 3, this._items[index].get_thumbnail().width, this._items[index].get_thumbnail().height);
            } else {
              this._items[index].set_thumbnail(document.createElement('img'));
              this._items[index].get_thumbnail().src = this._items[index].get_thumbnailUrl();
              this._items[index].get_thumbnail().addEventListener('load', e => {
                $this.refresh();
              }, false);
            }
          } catch ($e1) {
          }
          g.fillStyle = textBrush;
          g.strokeStyle = textBrush;
          g.lineWidth = 1;
          g.font = 'normal 8pt Arial';
          g.fillText(this._items[index].get_name(), rectf.x, rectf.y + rectf.height, rectf.width);
          index++;
        }
        if (index >= this._items.length) {
          break;
        }
      }
    },
    _getItemIndexFromCursor: function (testPointIn) {
      const testPoint = Vector2d.create(testPointIn.x + this.left, testPointIn.y + this.top);
      this.imageClicked = false;
      let index = -1;
      const xpos = ss.truncate((testPoint.x / this._horzMultiple));
      const xPart = ss.truncate((testPoint.x % this._horzMultiple));
      if (xpos >= this._colCount) {
        return -1;
      }
      if (xpos < 0) {
        return -1;
      }
      const ypos = ss.truncate((testPoint.y / this._vertSpacing));
      const yPart = ss.truncate((testPoint.y % this._vertSpacing));
      if (ypos >= this._rowCount) {
        return -1;
      }
      if (ypos < 0) {
        return -1;
      }
      index = this._startIndex + ypos * this._colCount + xpos;
      if (index === this._items.length) {
        this._addButtonHover = true;
      } else {
        this._addButtonHover = false;
      }
      if (index > this._items.length - 1) {
        return -1;
      }
      if ((this._items[index]).get_isImage() && yPart < 16 && xPart > 78) {
        this.imageClicked = true;
      }
      return index;
    },
    _addItems: function (list) {
      this._items = list;
    }
  };

  class FolderUp{
    constructor(){
      this.parent = null;
      this._bounds = new Rectangle();
    }
    static get_name(){return 'Up Level'}
    get_thumbnail() {
      return this._thumbnail;
    }
    set_thumbnail(value) {
      this._thumbnail = value;
      return value;
    }
    static get_thumbnailUrl() {
      return '//worldwidetelescope.org/wwtweb/thumbnail.aspx?Name=folderup';
    }
    static set_thumbnailUrl(){
      return;
    }
    get_bounds() {
      return this._bounds;
    }
    set_bounds(value) {
      this._bounds = value;
      return value;
    }
    static get_isImage(){return false}
    static get_isTour(){return false}
    static get_isFolder(){return false}
    static get_isCloudCommunityItem(){return false}
    static get_readOnly(){return false}
    get_children() {
      if (this.parent == null) {
        return [];
      } else {
        return this.parent.get_children();
      }
    }
  }


  function ViewMoverKenBurnsStyle(from, to, time, fromDateTime, toDateTime, type) {
    this.interpolationType = 0;
    this.fastDirectionMove = false;
    this._toTargetTime = 0;
    this._dateTimeSpan = 0;
    this._complete = false;
    this._midpointFired = false;
    this.interpolationType = type;
    if (Math.abs(from.lng - to.lng) > 180) {
      if (from.lng > to.lng) {
        from.lng -= 360;
      }
      else {
        from.lng += 360;
      }
    }
    this._fromDateTime = fromDateTime;
    this._toDateTime = toDateTime;
    this._dateTimeSpan = toDateTime - fromDateTime;
    this._from = from.copy();
    this._to = to.copy();
    this._fromTime = ss.now();
    this._toTargetTime = time;
  }
  const ViewMoverKenBurnsStyle$ = {
    get_complete: function () {
      return this._complete;
    },
    get_currentPosition: function () {
      const elapsed = ss.now() - this._fromTime;
      const elapsedSeconds = (elapsed) / 1000;
      let alpha = elapsedSeconds / this._toTargetTime;
      if (!this._midpointFired && alpha >= 0.5) {
        this._midpointFired = true;
        if (this._midpoint != null) {
          this._midpoint();
        }
      }
      if (alpha >= 1) {
        alpha = 1;
        this._complete = true;
        return this._to.copy();
      }
      if (Settings.get_active().get_galacticMode() && WWTControl.singleton.renderContext.space) {
        return CameraParameters.interpolateGreatCircle(this._from, this._to, alpha, this.interpolationType, this.fastDirectionMove);
      }
      return CameraParameters.interpolate(this._from, this._to, alpha, this.interpolationType, this.fastDirectionMove);
    },
    get_currentDateTime: function () {
      const elapsed = ss.now() - this._fromTime;
      const elapsedSeconds = (elapsed) / 1000;
      const alpha = elapsedSeconds / this._toTargetTime;
      const delta = this._dateTimeSpan * alpha;
      const retDate = new Date(this._fromDateTime.getTime() + ss.truncate(delta));
      return retDate;
    },
    get_midpoint: function () {
      return this._midpoint;
    },
    set_midpoint: function (value) {
      this._midpoint = value;
      return value;
    },
    get_moveTime: function () {
      return this._toTargetTime;
    }
  };

  function ViewMoverSlew() {
    this._upTargetTime = 0;
    this._downTargetTime = 0;
    this._toTargetTime = 0;
    this._upTimeFactor = 0.6;
    this._downTimeFactor = 0.6;
    this._travelTimeFactor = 7;
    this._midpointFired = false;
    this._complete = false;
  }
  ViewMoverSlew.create = (from, to) => {
    const temp = new ViewMoverSlew();
    temp.init(from, to);
    return temp;
  };
  ViewMoverSlew.createUpDown = (from, to, upDowFactor) => {
    const temp = new ViewMoverSlew();
    temp._upTimeFactor = temp._downTimeFactor = upDowFactor;
    temp.init(from.copy(), to.copy());
    return temp;
  };
  const ViewMoverSlew$ = {
    init: function (from, to) {
      if (Math.abs(from.lng - to.lng) > 180) {
        if (from.lng > to.lng) {
          from.lng -= 360;
        } else {
          from.lng += 360;
        }
      }
      if (to.zoom <= 0) {
        to.zoom = 360;
      }
      if (from.zoom <= 0) {
        from.zoom = 360;
      }
      this._from = from;
      this._to = to;
      this._fromTime = ss.now();
      let zoomUpTarget = 360;
      let travelTime;
      const lngDist = Math.abs(from.lng - to.lng);
      const latDist = Math.abs(from.lat - to.lat);
      const distance = Math.sqrt(latDist * latDist + lngDist * lngDist);
      zoomUpTarget = (distance / 3) * 20;
      if (zoomUpTarget > 360) {
        zoomUpTarget = 360;
      }
      if (zoomUpTarget < from.zoom) {
        zoomUpTarget = from.zoom;
      }
      travelTime = (distance / 180) * (360 / zoomUpTarget) * this._travelTimeFactor;
      const rotateTime = Math.max(Math.abs(from.angle - to.angle), Math.abs(from.rotation - to.rotation));
      const logDistUp = Math.max(Math.abs(Util.logN(zoomUpTarget, 2) - Util.logN(from.zoom, 2)), rotateTime);
      this._upTargetTime = this._upTimeFactor * logDistUp;
      this._downTargetTime = this._upTargetTime + travelTime;
      const logDistDown = Math.abs(Util.logN(zoomUpTarget, 2) - Util.logN(to.zoom, 2));
      this._toTargetTime = this._downTargetTime + Math.max((this._downTimeFactor * logDistDown), rotateTime);
      this._fromTop = from.copy();
      this._fromTop.zoom = zoomUpTarget;
      this._fromTop.angle = (from.angle + to.angle) / 2;
      this._fromTop.rotation = (from.rotation + to.rotation) / 2;
      this._toTop = to.copy();
      this._toTop.zoom = this._fromTop.zoom;
      this._toTop.angle = this._fromTop.angle;
      this._toTop.rotation = this._fromTop.rotation;
    },
    get_complete: function () {
      return this._complete;
    },
    get_currentPosition: function () {
      const elapsed = ss.now() - this._fromTime;
      let elapsedSeconds = (elapsed) / 1000;
      if (elapsedSeconds < this._upTargetTime) {
        return CameraParameters.interpolate(this._from, this._fromTop, elapsedSeconds / this._upTargetTime, 3, false);
      } else if (elapsedSeconds < this._downTargetTime) {
        elapsedSeconds -= this._upTargetTime;
        if (Settings.get_active().get_galacticMode() && WWTControl.singleton.renderContext.space) {
          return CameraParameters.interpolateGreatCircle(this._fromTop, this._toTop, elapsedSeconds / (this._downTargetTime - this._upTargetTime), 3, false);
        }
        return CameraParameters.interpolate(this._fromTop, this._toTop, elapsedSeconds / (this._downTargetTime - this._upTargetTime), 3, false);
      } else {
        if (!this._midpointFired) {
          this._midpointFired = true;
          if (this._midpoint != null) {
            this._midpoint();
          }
        }
        elapsedSeconds -= this._downTargetTime;
        let alpha = elapsedSeconds / (this._toTargetTime - this._downTargetTime);
        if (alpha > 1) {
          alpha = 1;
          this._complete = true;
          return this._to.copy();
        }
        return CameraParameters.interpolate(this._toTop, this._to, alpha, 3, false);
      }
    },
    get_currentDateTime: () => {
      SpaceTimeController.updateClock();
      return SpaceTimeController.get_now();
    },
    get_midpoint: function () {
      return this._midpoint;
    },
    set_midpoint: function (value) {
      this._midpoint = value;
      return value;
    },
    get_moveTime: function () {
      return this._toTargetTime;
    }
  };

  function MainView() {
  }
  MainView._drawTest = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(80,0,0)';
    ctx.fillRect(120, 120, 165, 160);
    ctx.fillStyle = 'rgba(0, 0, 160, 0.5)';
    ctx.fillRect(140, 140, 165, 160);
  };

  function Class1() {}
  const Class1$ = {};

  function FitsImage(file, blob, callMeBack) {
    this._header$1 = {};
    this.sourceBlob = null;
    this.histogramMaxCount = 0;
    this.width = 0;
    this.height = 0;
    this.numAxis = 0;
    this.bZero = 0;
    this.dataType = 5;
    this.containsBlanks = false;
    this.blankValue = Number.MIN_VALUE;
    this.maxVal = Number.MIN_VALUE;
    this.minVal = Number.MAX_VALUE;
    this.transparentBlack = true;
    this.lastMin = 0;
    this.lastMax = 255;
    this._color$1 = false;
    this._sizeZ$1 = 1;
    this.depth = 1;
    this._bufferSize$1 = 1;
    this.lastScale = 0;
    this.lastBitmapMin = 0;
    this.lastBitmapMax = 0;
    this.lastBitmapZ = 0;
    WcsImage.call(this);
    FitsImage.last = this;
    this._callBack$1 = callMeBack;
    this.filename = file;
    if (blob != null) {
      this._readFromBlob$1(blob);
    }
    else {
      this.getFile(file);
    }
  }
  FitsImage.isGzip = br => {
    const line = br.readBytes(2);
    br.seek(0);
    if (line[0] === 31 && line[1] === 139) {
      return true;
    }
    else {
      return false;
    }
  };
  const FitsImage$ = {
    getFile: function (url) {
      this._webFile$1 = new WebFile(url);
      this._webFile$1.responseType = 'blob';
      this._webFile$1.onStateChange = ss.bind('fileStateChange', this);
      this._webFile$1.send();
    },
    fileStateChange: function () {
      if (this._webFile$1.get_state() === 2) {
        alert(this._webFile$1.get_message());
      } else if (this._webFile$1.get_state() === 1) {
        const mainBlob = this._webFile$1.getBlob();
        this._readFromBlob$1(mainBlob);
      }
    },
    _readFromBlob$1: function (blob) {
      const $this = this;

      this.sourceBlob = blob;
      const chunck = new FileReader();
      chunck.onloadend = e => {
        $this._readFromBin$1(new BinaryReader(new Uint8Array(chunck.result)));
        if ($this._callBack$1 != null) {
          $this._callBack$1($this);
        }
      };
      chunck.readAsArrayBuffer(blob);
    },
    _readFromBin$1: function (br) {
      this.parseHeader(br);
    },
    parseHeader: function (br) {
      let foundEnd = false;
      while (!foundEnd) {
        for (let i = 0; i < 36; i++) {
          let data = br.readByteString(80);
          if (!foundEnd) {
            let keyword = ss.trimEnd(data.substring(0, 8));
            let values = data.substring(10).split('/');
            if (keyword.toUpperCase() === 'END') {
              foundEnd = true;
              i++;
              data = br.readByteString(80);
              while (ss.whitespace(data)) {
                i++;
                data = br.readByteString(80);
              }
              keyword = ss.trimEnd(data.substring(0, 8));
              values = data.substring(10).split('/');
              if (keyword.toUpperCase() === 'XTENSION') {
                foundEnd = false;
              } else {
                br.seekRelative(-80);
              }
            } else {
              this._addKeyword$1(keyword, values);
            }
          }
        }
      }
      this.numAxis = parseInt(this._header$1['NAXIS']);
      this.containsBlanks = ss.keyExists(this._header$1, 'BLANK');
      if (this.containsBlanks) {
        this.blankValue = parseFloat(this._header$1['BLANK']);
      }
      if (ss.keyExists(this._header$1, 'BZERO')) {
        this.bZero = parseFloat(this._header$1['BZERO']);
      }
      this.axisSize = new Array(this.numAxis);
      for (let axis = 0; axis < this.numAxis; axis++) {
        this.axisSize[axis] = parseInt(this._header$1[ss.format('NAXIS{0}', axis + 1)]);
        this._bufferSize$1 *= this.axisSize[axis];
      }
      const bitsPix = parseInt(this._header$1['BITPIX']);
      switch (bitsPix) {
        case 8:
          this.dataType = 0;
          this._initDataBytes$1(br);
          break;
        case 16:
          this.dataType = 1;
          this._initDataShort$1(br);
          break;
        case 32:
          this.dataType = 2;
          this._initDataInt$1(br);
          break;
        case -32:
          this.dataType = 3;
          this._initDataFloat$1(br);
          break;
        case -64:
          this.dataType = 4;
          this._initDataDouble$1(br);
          break;
        default:
          this.dataType = 5;
          break;
      }
      if (this.numAxis > 1) {
        if (this.numAxis === 3) {
          if (this.axisSize[2] === 3) {
            this._color$1 = true;
          }
        }
        if (this.numAxis > 2) {
          this._sizeZ$1 = this.depth = this.axisSize[2];
          this.lastBitmapZ = ss.truncate((this._sizeZ$1 / 2));
        }
        this.sizeX = this.width = this.axisSize[0];
        this.sizeY = this.height = this.axisSize[1];
        this._computeWcs$1();
        this.histogram = this.computeHistogram(256);
        this.histogramMaxCount = this.histogram[256];
      }
    },
    getZDescription: function () {
      let description = '';
      if (this._header$1['RESTFREQ'] != null && this._header$1['CRPIX3'] != null && this._header$1['CDELT3'] != null && this._header$1['CRVAL3'] != null) {
        const c = 299792.458;
        const f0 = parseFloat(this._header$1['RESTFREQ']);
        const crpix3 = parseFloat(this._header$1['CRPIX3']);
        const cdelt3 = parseFloat(this._header$1['CDELT3']);
        const crval3 = parseFloat(this._header$1['CRVAL3']);
        const f = ((this.lastBitmapZ + 1) - crpix3) * cdelt3 + crval3;
        const fval = ((f0 - f) / f0) * c;
        description = ss.format('Velocity {0} km/s', ss.truncate(fval));
      }
      return description;
    },
    _addKeyword$1: function (keyword, values) {
      if (keyword !== 'CONTINUE' && keyword !== 'COMMENT' && keyword !== 'HISTORY' && !ss.emptyString(keyword)) {
        try {
          if (ss.keyExists(this._header$1, keyword)) {
            this._header$1[keyword] = ss.trim(values[0]);
          } else {
            this._header$1[keyword.toUpperCase()] = ss.trim(values[0]);
          }
        } catch ($e1) {
        }
      }
    },
    _computeWcs$1: function () {
      if (ss.keyExists(this._header$1, 'CROTA2')) {
        this.rotation = parseFloat(ss.trim(this._header$1['CROTA2']));
        this.hasRotation = true;
      }
      if (ss.keyExists(this._header$1, 'CDELT1')) {
        this.scaleX = parseFloat(ss.trim(this._header$1['CDELT1']));
        if (ss.keyExists(this._header$1, 'CDELT2')) {
          this.scaleY = parseFloat(ss.trim(this._header$1['CDELT2']));
          this.hasScale = true;
        }
      }
      if (ss.keyExists(this._header$1, 'CRPIX1')) {
        this.referenceX = parseFloat(ss.trim(this._header$1['CRPIX1'])) - 1;
        if (ss.keyExists(this._header$1, 'CRPIX2')) {
          this.referenceY = parseFloat(ss.trim(this._header$1['CRPIX2'])) - 1;
          this.hasPixel = true;
        }
      }
      let galactic = false;
      let tan = false;
      if (ss.keyExists(this._header$1, 'CTYPE1')) {
        if (this._header$1['CTYPE1'].indexOf('GLON-') > -1) {
          galactic = true;
          tan = true;
        }
        if (this._header$1['CTYPE2'].indexOf('GLAT-') > -1) {
          galactic = true;
          tan = true;
        }
        if (this._header$1['CTYPE1'].indexOf('-TAN') > -1) {
          tan = true;
        }
        if (this._header$1['CTYPE1'].indexOf('-SIN') > -1) {
          tan = true;
        }
      }
      if (!tan) {
        throw new Error('Only TAN projected images are supported: ');
      }
      this.hasSize = true;
      if (ss.keyExists(this._header$1, 'CRVAL1')) {
        this.centerX = parseFloat(ss.trim(this._header$1['CRVAL1']));
        if (ss.keyExists(this._header$1, 'CRVAL2')) {
          this.centerY = parseFloat(ss.trim(this._header$1['CRVAL2']));
          this.hasLocation = true;
        }
      }
      if (galactic) {
        const result = Coordinates.galactictoJ2000(this.centerX, this.centerY);
        this.centerX = result[0];
        this.centerY = result[1];
      }
      if (ss.keyExists(this._header$1, 'CD1_1') && ss.keyExists(this._header$1, 'CD1_2') && ss.keyExists(this._header$1, 'CD2_1') && ss.keyExists(this._header$1, 'CD2_2')) {
        this.cd1_1 = parseFloat(ss.trim(this._header$1['CD1_1']));
        this.cd1_2 = parseFloat(ss.trim(this._header$1['CD1_2']));
        this.cd2_1 = parseFloat(ss.trim(this._header$1['CD2_1']));
        this.cd2_2 = parseFloat(ss.trim(this._header$1['CD2_2']));
        if (!this.hasRotation) {
          this.calculateRotationFromCD();
        }
        if (!this.hasScale) {
          this.calculateScaleFromCD();
        }
        this.hasScale = true;
        this.hasRotation = true;
      }
      this.set_validWcs(this.hasScale && this.hasRotation && this.hasPixel && this.hasLocation);
    },
    getHistogramBitmap: function (max) {
      const bmp = Bitmap.create(this.histogram.length, 150);
      return bmp;
    },
    drawHistogram: function (ctx) {
      ctx.clearRect(0, 0, 255, 150);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,255)';
      const logMax = Math.log(this.histogramMaxCount);
      for (let i = 0; i < this.histogram.length; i++) {
        let height = Math.log(this.histogram[i]) / logMax;
        if (height < 0) {
          height = 0;
        }
        ctx.moveTo(i, 150);
        ctx.lineTo(i, 150 - (height * 150));
        ctx.stroke();
      }
    },
    computeHistogram: function (count) {
      const histogram = new Array(count + 1);
      for (let i = 0; i < count + 1; i++) {
        histogram[i] = 0;
      }
      switch (this.dataType) {
        case 0:
          this._computeHistogramByte$1(histogram);
          break;
        case 1:
          this._computeHistogramInt16$1(histogram);
          break;
        case 2:
          this._computeHistogramInt32$1(histogram);
          break;
        case 3:
          this._computeHistogramFloat$1(histogram);
          break;
        case 4:
          this._computeHistogramDouble$1(histogram);
          break;
        case 5:
        default:
          break;
      }
      let maxCounter = 1;
      const $enum1 = ss.enumerate(histogram);
      while ($enum1.moveNext()) {
        const val = $enum1.current;
        if (val > maxCounter) {
          maxCounter = val;
        }
      }
      histogram[count] = maxCounter;
      return histogram;
    },
    _computeHistogramDouble$1: function (histogram) {
      const buckets = histogram.length;
      const buf = this.dataBuffer;
      const factor = (this.maxVal - this.minVal) / buckets;
      const $enum1 = ss.enumerate(buf);
      while ($enum1.moveNext()) {
        const val = $enum1.current;
        if (!(val === Number.NaN)) {
          histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
        }
      }
    },
    _computeHistogramFloat$1: function (histogram) {
      const buckets = histogram.length;
      const buf = this.dataBuffer;
      const factor = (this.maxVal - this.minVal) / buckets;
      const $enum1 = ss.enumerate(buf);
      while ($enum1.moveNext()) {
        const val = $enum1.current;
        if (!(val === FitsImage._naN$1)) {
          histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
        }
      }
    },
    _computeHistogramInt32$1: function (histogram) {
      const buckets = histogram.length;
      const buf = this.dataBuffer;
      const factor = (this.maxVal - this.minVal) / buckets;
      const $enum1 = ss.enumerate(buf);
      while ($enum1.moveNext()) {
        const val = $enum1.current;
        histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
      }
    },
    _computeHistogramInt16$1: function (histogram) {
      const buckets = histogram.length;
      const buf = this.dataBuffer;
      const factor = (this.maxVal - this.minVal) / buckets;
      const $enum1 = ss.enumerate(buf);
      while ($enum1.moveNext()) {
        const val = $enum1.current;
        histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
      }
    },
    _computeHistogramByte$1: function (histogram) {
      const buckets = histogram.length;
      const buf = this.dataBuffer;
      const factor = (this.maxVal - this.minVal) / buckets;
      const $enum1 = ss.enumerate(buf);
      while ($enum1.moveNext()) {
        const val = $enum1.current;
        histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
      }
    },
    _initDataBytes$1: function (br) {
      const buffer = new Array(this._bufferSize$1);
      this.dataBuffer = buffer;
      for (let i = 0; i < this._bufferSize$1; i++) {
        buffer[i] = br.readByte();
        if (this.minVal > buffer[i]) {
          this.minVal = buffer[i];
        }
        if (this.maxVal < buffer[i]) {
          this.maxVal = buffer[i];
        }
      }
    },
    _initDataShort$1: function (br) {
      const buffer = new Array(this._bufferSize$1);
      this.dataBuffer = buffer;
      for (let i = 0; i < this._bufferSize$1; i++) {
        buffer[i] = ((br.readSByte() * 256) + br.readByte());
        if (this.minVal > buffer[i]) {
          this.minVal = buffer[i];
        }
        if (this.maxVal < buffer[i]) {
          this.maxVal = buffer[i];
        }
      }
    },
    _initDataUnsignedShort$1: function (br) {
      const buffer = new Array(this._bufferSize$1);
      this.dataBuffer = buffer;
      for (let i = 0; i < this._bufferSize$1; i++) {
        buffer[i] = (((br.readSByte() * 256) + br.readByte()) + 32768);
        if (this.minVal > buffer[i]) {
          this.minVal = buffer[i];
        }
        if (this.maxVal < buffer[i]) {
          this.maxVal = buffer[i];
        }
      }
    },
    _initDataInt$1: function (br) {
      const buffer = new Array(this._bufferSize$1);
      this.dataBuffer = buffer;
      for (let i = 0; i < this._bufferSize$1; i++) {
        buffer[i] = (br.readSByte() << 24) + (br.readSByte() << 16) + (br.readSByte() << 8) + br.readByte();
        if (this.minVal > buffer[i]) {
          this.minVal = buffer[i];
        }
        if (this.maxVal < buffer[i]) {
          this.maxVal = buffer[i];
        }
      }
    },
    _initDataFloat$1: function (br) {
      const buffer = new Array(this._bufferSize$1);
      this.dataBuffer = buffer;
      const part = new Uint8Array(4);
      for (let i = 0; i < this._bufferSize$1; i++) {
        part[3] = br.readByte();
        part[2] = br.readByte();
        part[1] = br.readByte();
        part[0] = br.readByte();
        buffer[i] = new Float32Array(part.buffer, 0, 1)[0];
        if (this.minVal > buffer[i]) {
          this.minVal = buffer[i];
        }
        if (this.maxVal < buffer[i]) {
          this.maxVal = buffer[i];
        }
      }
    },
    _initDataDouble$1: br => {
    },
    getBitmap: function () {
      if (!this.lastBitmapMax && !this.lastBitmapMin) {
        this.lastBitmapMin = this.minVal;
        this.lastBitmapMax = this.maxVal;
      }
      return this.getScaledBitmap(this.lastBitmapMin, this.lastBitmapMax, this.lastScale, this.lastBitmapZ);
    },
    getScaledBitmap: function (min, max, scaleType, z) {
      z = Math.min(z, this._sizeZ$1);
      let scale;
      this.lastScale = scaleType;
      this.lastBitmapMin = min;
      this.lastBitmapMax = max;
      this.lastBitmapZ = z;
      switch (scaleType) {
        case 0:
        default:
          scale = new ScaleLinear(min, max);
          break;
        case 1:
          scale = new ScaleLog(min, max);
          break;
        case 2:
          scale = new ScalePow(min, max);
          break;
        case 3:
          scale = new ScaleSqrt(min, max);
          break;
        case 4:
          scale = new HistogramEqualization(this, min, max);
          break;
      }
      try {
        switch (this.dataType) {
          case 0:
            return this._getBitmapByte$1(min, max, scale, this.lastBitmapZ);
          case 1:
            return this.getBitmapShort(min, max, scale, this.lastBitmapZ);
          case 2:
            return this._getBitmapInt$1(min, max, scale, this.lastBitmapZ);
          case 3:
            return this._getBitmapFloat$1(min, max, scale, this.lastBitmapZ);
          case 4:
            return this._getBitmapDouble$1(min, max, scale, this.lastBitmapZ);
          case 5:
          default:
            return Bitmap.create(100, 100);
        }
      } catch ($e1) {
        return Bitmap.create(10, 10);
      }
    },
    _getBitmapByte$1: function (min, max, scale, z) {
      const buf = this.dataBuffer;
      const factor = max - min;
      const stride = this.axisSize[0];
      const page = this.axisSize[0] * this.axisSize[1] * z;
      const bmp = Bitmap.create(this.axisSize[0], this.axisSize[1]);
      for (let y = 0; y < this.axisSize[1]; y++) {
        const indexY = ((this.axisSize[1] - 1) - y);
        for (let x = 0; x < this.axisSize[0]; x++) {
          if (this._color$1) {
            const datR = buf[(x + indexY * stride)];
            const datG = buf[(x + indexY * stride) + page];
            const datB = buf[(x + indexY * stride) + page * 2];
            if (this.containsBlanks && datR === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const r = scale.map(datR);
              const g = scale.map(datG);
              const b = scale.map(datB);
              bmp.setPixel(x, y, r, g, b, 255);
            }
          } else {
            const dataValue = buf[x + indexY * stride + page];
            if (this.containsBlanks && dataValue === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const val = scale.map(dataValue);
              bmp.setPixel(x, y, val, val, val, (this.transparentBlack && !val) ? 0 : 255);
            }
          }
        }
      }
      return bmp;
    },
    _getBitmapDouble$1: function (min, max, scale, z) {
      const buf = this.dataBuffer;
      const factor = max - min;
      const stride = this.axisSize[0];
      const page = this.axisSize[0] * this.axisSize[1] * z;
      const bmp = Bitmap.create(this.axisSize[0], this.axisSize[1]);
      for (let y = 0; y < this.axisSize[1]; y++) {
        const indexY = ((this.axisSize[1] - 1) - y);
        for (let x = 0; x < this.axisSize[0]; x++) {
          if (this._color$1) {
            const datR = buf[(x + indexY * stride)];
            const datG = buf[(x + indexY * stride) + page];
            const datB = buf[(x + indexY * stride) + page * 2];
            if (this.containsBlanks && datR === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const r = scale.map(datR);
              const g = scale.map(datG);
              const b = scale.map(datB);
              bmp.setPixel(x, y, r, g, b, 255);
            }
          } else {
            const dataValue = buf[x + indexY * stride + page];
            if (this.containsBlanks && dataValue === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const val = scale.map(dataValue);
              bmp.setPixel(x, y, val, val, val, (this.transparentBlack && !val) ? 0 : 255);
            }
          }
        }
      }
      return bmp;
    },
    _getBitmapFloat$1: function (min, max, scale, z) {
      const buf = this.dataBuffer;
      const factor = max - min;
      const stride = this.axisSize[0];
      const page = this.axisSize[0] * this.axisSize[1] * z;
      const bmp = Bitmap.create(this.axisSize[0], this.axisSize[1]);
      for (let y = 0; y < this.axisSize[1]; y++) {
        const indexY = ((this.axisSize[1] - 1) - y);
        for (let x = 0; x < this.axisSize[0]; x++) {
          if (this._color$1) {
            const datR = buf[(x + indexY * stride)];
            const datG = buf[(x + indexY * stride) + page];
            const datB = buf[(x + indexY * stride) + page * 2];
            if (this.containsBlanks && datR === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const r = scale.map(datR);
              const g = scale.map(datG);
              const b = scale.map(datB);
              bmp.setPixel(x, y, r, g, b, 255);
            }
          } else {
            const dataValue = buf[x + indexY * stride + page];
            if (this.containsBlanks && dataValue === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const val = scale.map(dataValue);
              bmp.setPixel(x, y, val, val, val, (this.transparentBlack && !val) ? 0 : 255);
            }
          }
        }
      }
      return bmp;
    },
    _getBitmapInt$1: function (min, max, scale, z) {
      const buf = this.dataBuffer;
      const factor = max - min;
      const stride = this.axisSize[0];
      const page = this.axisSize[0] * this.axisSize[1] * z;
      const bmp = Bitmap.create(this.axisSize[0], this.axisSize[1]);
      for (let y = 0; y < this.axisSize[1]; y++) {
        const indexY = ((this.axisSize[1] - 1) - y);
        for (let x = 0; x < this.axisSize[0]; x++) {
          if (this._color$1) {
            const datR = buf[(x + indexY * stride)];
            const datG = buf[(x + indexY * stride) + page];
            const datB = buf[(x + indexY * stride) + page * 2];
            if (this.containsBlanks && datR === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const r = scale.map(datR);
              const g = scale.map(datG);
              const b = scale.map(datB);
              bmp.setPixel(x, y, r, g, b, 255);
            }
          } else {
            const dataValue = buf[x + indexY * stride + page];
            if (this.containsBlanks && dataValue === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const val = scale.map(dataValue);
              bmp.setPixel(x, y, val, val, val, (this.transparentBlack && !val) ? 0 : 255);
            }
          }
        }
      }
      return bmp;
    },
    getBitmapShort: function (min, max, scale, z) {
      const buf = this.dataBuffer;
      const factor = max - min;
      const stride = this.axisSize[0];
      const page = this.axisSize[0] * this.axisSize[1] * z;
      const bmp = Bitmap.create(this.axisSize[0], this.axisSize[1]);
      for (let y = 0; y < this.axisSize[1]; y++) {
        const indexY = ((this.axisSize[1] - 1) - y);
        for (let x = 0; x < this.axisSize[0]; x++) {
          if (this._color$1) {
            const datR = buf[(x + indexY * stride)];
            const datG = buf[(x + indexY * stride) + page];
            const datB = buf[(x + indexY * stride) + page * 2];
            if (this.containsBlanks && datR === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const r = scale.map(datR);
              const g = scale.map(datG);
              const b = scale.map(datB);
              bmp.setPixel(x, y, r, g, b, 255);
            }
          } else {
            const dataValue = buf[x + indexY * stride + page];
            if (this.containsBlanks && dataValue === this.blankValue) {
              bmp.setPixel(x, y, 0, 0, 0, 0);
            } else {
              const val = scale.map(dataValue);
              bmp.setPixel(x, y, val, val, val, (this.transparentBlack && !val) ? 0 : 255);
            }
          }
        }
      }
      return bmp;
    }
  };

  function ScaleLinear(min, max) {
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._logFactor$1 = 0;
    ScaleMap.call(this);
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
  }
  const ScaleLinear$ = {
    map: function (val) {
      return Math.min(255, Math.max(0, ss.truncate(((val - this._min$1) / this._factor$1 * 255))));
    }
  };

  function ScaleLog(min, max) {
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._logFactor$1 = 0;
    ScaleMap.call(this);
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
    this._logFactor$1 = 255 / Math.log(255);
  }
  const ScaleLog$ = {
    map: function (val) {
      return Math.min(255, Math.max(0, ss.truncate((Math.log((val - this._min$1) / this._factor$1 * 255) * this._logFactor$1))));
    }
  };

  function ScalePow(min, max) {
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._powFactor$1 = 0;
    ScaleMap.call(this);
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
    this._powFactor$1 = 255 / Math.pow(255, 2);
  }
  const ScalePow$ = {
    map: function (val) {
      return Math.min(255, Math.max(0, ss.truncate((Math.pow((val - this._min$1) / this._factor$1 * 255, 2) * this._powFactor$1))));
    }
  };

  function ScaleSqrt(min, max) {
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._sqrtFactor$1 = 0;
    ScaleMap.call(this);
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
    this._sqrtFactor$1 = 255 / Math.sqrt(255);
  }
  const ScaleSqrt$ = {
    map: function (val) {
      return Math.min(255, Math.max(0, ss.truncate((Math.sqrt((val - this._min$1) / this._factor$1 * 255) * this._sqrtFactor$1))));
    }
  };

  function HistogramEqualization(image, min, max) {
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._maxHistogramValue$1 = 1;
    ScaleMap.call(this);
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
    this._histogram$1 = image.computeHistogram(10000);
    this._maxHistogramValue$1 = this._histogram$1[10000];
    this._lookup$1 = new Array(10000);
    const totalCounts = image.width * image.height;
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      sum += this._histogram$1[i];
      this._lookup$1[i] = (Math.min(255, (sum * 255) / totalCounts) + 0.5);
    }
  }
  const HistogramEqualization$ = {
    map: function (val) {
      return this._lookup$1[Math.min(10000 - 1, Math.max(0, ss.truncate(((val - this._min$1) / this._factor$1 * (10000 - 1)))))];
    }
  };

  function GreatCirlceRouteLayer() {
    this._triangleList$1 = null;
    this._latStart$1 = 0;
    this._lngStart$1 = 0;
    this._latEnd$1 = 0;
    this._lngEnd$1 = 0;
    this._width$1 = 4;
    this._percentComplete$1 = 100;
    Layer.call(this);
  }
  const GreatCirlceRouteLayer$ = {
    getTypeName: () => 'TerraViewer.GreatCirlceRouteLayer',
    cleanUp: function () {
      if (this._triangleList$1 != null) {
        this._triangleList$1.clear();
      }
      this._triangleList$1 = null;
      Layer.prototype.cleanUp.call(this);
    },
    draw: function (renderContext, opacity, flat) {
      if (this._triangleList$1 == null) {
        this._initializeRoute$1(renderContext);
      }
      this._triangleList$1.jNow = this._percentComplete$1 / 100;
      this._triangleList$1.draw(renderContext, opacity * this.get_opacity(), 2);
      return true;
    },
    _initializeRoute$1: function (renderContext) {
      this._triangleList$1 = new TriangleList();
      this._triangleList$1.decay = 1000;
      this._triangleList$1.sky = this.get_astronomical();
      this._triangleList$1.timeSeries = true;
      this._triangleList$1.depthBuffered = false;
      this._triangleList$1.autoTime = false;
      const steps = 500;
      const start = Coordinates.geoTo3dDouble(this._latStart$1, this._lngStart$1);
      const end = Coordinates.geoTo3dDouble(this._latEnd$1, this._lngEnd$1);
      const dir = Vector3d.subtractVectors(end, start);
      dir.normalize();
      const startNormal = start;
      startNormal.normalize();
      const left = Vector3d.cross(startNormal, dir);
      const right = Vector3d.cross(dir, startNormal);
      left.normalize();
      right.normalize();
      left.multiply(0.001 * this._width$1);
      right.multiply(0.001 * this._width$1);
      let lastLeft = new Vector3d();
      let lastRight = new Vector3d();
      let firstTime = true;
      for (let i = 0; i <= steps; i++) {
        const v = Vector3d.lerp(start, end, i / steps);
        v.normalize();
        const cl = v;
        const cr = v;
        cl.add(left);
        cr.add(right);
        if (!firstTime) {
          this._triangleList$1.addQuad(lastRight, lastLeft, cr, cl, this.get_color(), new Dates(i / steps, 2));
        } else {
          firstTime = false;
        }
        lastLeft = cl;
        lastRight = cr;
      }
    },
    getParams: function () {
      return [this._percentComplete$1];
    },
    getParamNames: () => ['Percentage'],
    setParams: function (paramList) {
      if (paramList.length > 0) {
        this._percentComplete$1 = paramList[0];
      }
    },
    get_latStart: function () {
      return this._latStart$1;
    },
    set_latStart: function (value) {
      if (this._latStart$1 !== value) {
        this._latStart$1 = value;
        this.version++;
      }
      return value;
    },
    get_lngStart: function () {
      return this._lngStart$1;
    },
    set_lngStart: function (value) {
      if (this._lngStart$1 !== value) {
        this._lngStart$1 = value;
        this.version++;
      }
      return value;
    },
    get_latEnd: function () {
      return this._latEnd$1;
    },
    set_latEnd: function (value) {
      if (this._latEnd$1 !== value) {
        this._latEnd$1 = value;
        this.version++;
      }
      return value;
    },
    get_lngEnd: function () {
      return this._lngEnd$1;
    },
    set_lngEnd: function (value) {
      if (this._lngEnd$1 !== value) {
        this._lngEnd$1 = value;
        this.version++;
      }
      return value;
    },
    get_width: function () {
      return this._width$1;
    },
    set_width: function (value) {
      if (this._width$1 !== value) {
        this._width$1 = value;
        this.version++;
      }
      return value;
    },
    get_percentComplete: function () {
      return this._percentComplete$1;
    },
    set_percentComplete: function (value) {
      if (this._percentComplete$1 !== value) {
        this._percentComplete$1 = value;
        this.version++;
      }
      return value;
    },
    writeLayerProperties: function (xmlWriter) {
      xmlWriter._writeAttributeString('LatStart', this.get_latStart().toString());
      xmlWriter._writeAttributeString('LngStart', this.get_lngStart().toString());
      xmlWriter._writeAttributeString('LatEnd', this.get_latEnd().toString());
      xmlWriter._writeAttributeString('LngEnd', this.get_lngEnd().toString());
      xmlWriter._writeAttributeString('Width', this.get_width().toString());
      xmlWriter._writeAttributeString('PercentComplete', this.get_percentComplete().toString());
    },
    initializeFromXml: function (node) {
      this._latStart$1 = parseFloat(node.attributes.getNamedItem('LatStart').nodeValue);
      this._lngStart$1 = parseFloat(node.attributes.getNamedItem('LngStart').nodeValue);
      this._latEnd$1 = parseFloat(node.attributes.getNamedItem('LatEnd').nodeValue);
      this._lngEnd$1 = parseFloat(node.attributes.getNamedItem('LngEnd').nodeValue);
      this._width$1 = parseFloat(node.attributes.getNamedItem('Width').nodeValue);
      this._percentComplete$1 = parseFloat(node.attributes.getNamedItem('PercentComplete').nodeValue);
    }
  };

  function GridLayer() {
    Layer.call(this);
  }
  const GridLayer$ = {
    draw: function (renderContext, opacity, flat) {
      Grids.drawPlanetGrid(renderContext, opacity * this.get_opacity(), this.get_color());
      Grids.drawPlanetGridText(renderContext, opacity * this.get_opacity(), this.get_color());
      return true;
    }
  };

  function LayerCollection() {
    Layer.call(this);
  }
  const LayerCollection$ = {
    draw: function (renderContext, opacity, flat) {
      return Layer.prototype.draw.call(this, renderContext, opacity, false);
    }
  };

  function Object3dLayerUI(layer) {
    this._layer$1 = null;
    this._opened$1 = true;
    this._callbacks$1 = null;
    LayerUI.call(this);
    this._layer$1 = layer;
  }
  const Object3dLayerUI$ = {
    setUICallbacks: function (callbacks) {
      this._callbacks$1 = callbacks;
    },
    get_hasTreeViewNodes: () => true,
    getTreeNodes: function () {
      const nodes = [];
      if (this._layer$1.object3d.objects.length > 0 && this._layer$1.object3d.objects[0].children != null) {
        this._loadTree$1(nodes, this._layer$1.object3d.objects[0].children);
      }
      return nodes;
    },
    _loadTree$1: function (nodes, children) {
      const $enum1 = ss.enumerate(children);
      while ($enum1.moveNext()) {
        const child = $enum1.current;
        const node = new LayerUITreeNode();
        node.set_name(child.name);
        node.set_tag(child);
        node.set_checked(child.enabled);
        node.add_nodeSelected(ss.bind('_node_NodeSelected$1', this));
        node.add_nodeChecked(ss.bind('_node_NodeChecked$1', this));
        nodes.push(node);
        this._loadTree$1(node.get_nodes(), child.children);
      }
    },
    _node_NodeChecked$1: (node, newState) => {
      const child = node.get_tag();
      if (child != null) {
        child.enabled = newState;
      }
    },
    _node_NodeSelected$1: function (node) {
      if (this._callbacks$1 != null) {
        const child = node.get_tag();
        const rowData = {};
        rowData['Name'] = child.name;
        rowData['Pivot.X'] = child.pivotPoint.x.toString();
        rowData['Pivot.Y'] = child.pivotPoint.y.toString();
        rowData['Pivot.Z'] = child.pivotPoint.z.toString();
        this._callbacks$1.showRowData(rowData);
      }
    },
    getNodeContextMenu: function (node) {
      return LayerUI.prototype.getNodeContextMenu.call(this, node);
    }
  };

  function OrbitLayer() {
    this._frames$1 = [];
    this._primaryUI$1 = null;
    this._pointOpacity$1 = 1;
    this._pointColor$1 = Colors.get_yellow();
    this._filename$1 = '';
    this._dataFile$1 = '';
    Layer.call(this);
  }
  const OrbitLayer$ = {
    get_frames: function () {
      return this._frames$1;
    },
    set_frames: function (value) {
      this._frames$1 = value;
      return value;
    },
    getPrimaryUI: function () {
      if (this._primaryUI$1 == null) {
        this._primaryUI$1 = new OrbitLayerUI(this);
      }
      return this._primaryUI$1;
    },
    cleanUp: function () {
      const $enum1 = ss.enumerate(this._frames$1);
      while ($enum1.moveNext()) {
        const frame = $enum1.current;
        if (frame.get_orbit() != null) {
          frame.get_orbit().cleanUp();
          frame.set_orbit(null);
        }
      }
    },
    writeLayerProperties: function (xmlWriter) {
      xmlWriter._writeAttributeString('PointOpacity', this.get_pointOpacity().toString());
      xmlWriter._writeAttributeString('PointColor', this._pointColor$1.save());
    },
    get_pointOpacity: function () {
      return this._pointOpacity$1;
    },
    set_pointOpacity: function (value) {
      if (this._pointOpacity$1 !== value) {
        this.version++;
        this._pointOpacity$1 = value;
      }
      return value;
    },
    get_pointColor: function () {
      return this._pointColor$1;
    },
    set_pointColor: function (value) {
      if (this._pointColor$1 !== value) {
        this.version++;
        this._pointColor$1 = value;
      }
      return value;
    },
    getParams: function () {
      const paramList = new Array(6);
      paramList[0] = this._pointOpacity$1;
      paramList[1] = this.get_color().r / 255;
      paramList[2] = this.get_color().g / 255;
      paramList[3] = this.get_color().b / 255;
      paramList[4] = this.get_color().a / 255;
      paramList[5] = this.get_opacity();
      return paramList;
    },
    getParamNames: () => ['PointOpacity', 'Color.Red', 'Color.Green', 'Color.Blue', 'Color.Alpha', 'Opacity'],
    setParams: function (paramList) {
      if (paramList.length === 6) {
        this._pointOpacity$1 = paramList[0];
        this.set_opacity(paramList[5]);
        const color = Color.fromArgb(ss.truncate((paramList[4] * 255)), ss.truncate((paramList[1] * 255)), ss.truncate((paramList[2] * 255)), ss.truncate((paramList[3] * 255)));
        this.set_color(color);
      }
    },
    initializeFromXml: function (node) {
      this.set_pointOpacity(parseFloat(node.attributes.getNamedItem('PointOpacity').nodeValue));
      this.set_pointColor(Color.load(node.attributes.getNamedItem('PointColor').nodeValue));
    },
    draw: function (renderContext, opacity, flat) {
      const matSaved = renderContext.get_world();
      renderContext.set_world(renderContext.get_worldBaseNonRotating());
      const $enum1 = ss.enumerate(this._frames$1);
      while ($enum1.moveNext()) {
        const frame = $enum1.current;
        if (frame.showOrbitPath) {
          if (frame.get_orbit() == null) {
            frame.set_orbit(new Orbit(frame.get_elements(), 360, this.get_color(), 1, renderContext.get_nominalRadius()));
          }
          frame.get_orbit().draw3D(renderContext, opacity * this.get_opacity(), new Vector3d());
        }
      }
      renderContext.set_world(matSaved);
      return true;
    },
    addFilesToCabinet: function (fc) {
      this._filename$1 = fc.tempDirectory + ss.format('{0}\\{1}.txt', fc.get_packageID(), this.id.toString());
      const dir = this._filename$1.substring(0, this._filename$1.lastIndexOf('\\'));
      const blob = new Blob([this._dataFile$1]);
      fc.addFile(this._filename$1, blob);
      Layer.prototype.addFilesToCabinet.call(this, fc);
    },
    loadData: function (tourDoc, filename) {
      const $this = this;

      const blob = tourDoc.getFileBlob(filename);
      const doc = new FileReader();
      doc.onloadend = ee => {
        $this._dataFile$1 = ss.safeCast(doc.result, String);
        $this.loadString($this._dataFile$1);
      };
      doc.readAsText(blob);
    },
    loadString: function (dataFile) {
      const data = dataFile.split('\n');
      this._frames$1.length = 0;
      for (let i = 0; i < data.length; i += 2) {
        let line1 = i;
        let line2 = i + 1;
        if (data[i].length > 0) {
          const frame = new ReferenceFrame();
          if (data[i].substring(0, 1) !== '1') {
            line1++;
            line2++;
            frame.name = ss.trim(data[i]);
            i++;
          } else if (data[i].substring(0, 1) === '1') {
            frame.name = data[i].substring(2, 5);
          } else {
            i -= 2;
            continue;
          }
          frame.reference = 18;
          frame.oblateness = 0;
          frame.showOrbitPath = true;
          frame.showAsPoint = true;
          frame.referenceFrameType = 1;
          frame.scale = 1;
          frame.semiMajorAxisUnits = 1;
          frame.meanRadius = 10;
          frame.oblateness = 0;
          frame.fromTLE(data[line1], data[line2], 398600441800000);
          this._frames$1.push(frame);
        } else {
          i -= 1;
        }
      }
    }
  };

  function OrbitLayerUI(layer) {
    this._layer$1 = null;
    this._opened$1 = true;
    this._callbacks$1 = null;
    LayerUI.call(this);
    this._layer$1 = layer;
  }
  const OrbitLayerUI$ = {
    setUICallbacks: function (callbacks) {
      this._callbacks$1 = callbacks;
    },
    get_hasTreeViewNodes: () => true,
    getTreeNodes: function () {
      const nodes = [];
      const $enum1 = ss.enumerate(this._layer$1.get_frames());
      while ($enum1.moveNext()) {
        const frame = $enum1.current;
        const node = new LayerUITreeNode();
        node.set_name(frame.name);
        node.set_tag(frame);
        node.set_checked(frame.showOrbitPath);
        node.add_nodeSelected(ss.bind('_node_NodeSelected$1', this));
        node.add_nodeChecked(ss.bind('_node_NodeChecked$1', this));
        nodes.push(node);
      }
      return nodes;
    },
    _node_NodeChecked$1: (node, newState) => {
      const frame = node.get_tag();
      if (frame != null) {
        frame.showOrbitPath = newState;
      }
    },
    _node_NodeSelected$1: function (node) {
      if (this._callbacks$1 != null) {
        const frame = node.get_tag();
        const rowData = {};
        rowData['Name'] = frame.name;
        rowData['SemiMajor Axis'] = frame.semiMajorAxis.toString();
        rowData['SMA Units'] = frame.semiMajorAxisUnits.toString();
        rowData['Inclination'] = frame.inclination.toString();
        rowData['Eccentricity'] = frame.eccentricity.toString();
        rowData['Long of Asc. Node'] = frame.longitudeOfAscendingNode.toString();
        rowData['Argument Of Periapsis'] = frame.argumentOfPeriapsis.toString();
        rowData['Epoch'] = frame.epoch.toString();
        rowData['Mean Daily Motion'] = frame.meanDailyMotion.toString();
        rowData['Mean Anomoly at Epoch'] = frame.meanAnomolyAtEpoch.toString();
        this._callbacks$1.showRowData(rowData);
      }
    },
    getNodeContextMenu: function (node) {
      return LayerUI.prototype.getNodeContextMenu.call(this, node);
    }
  };

  function SpreadSheetLayer() {
    this._dataDirty$1 = false;
    this._barChartBitmask$1 = 0;
    this._barScaleFactor$1 = 20;
    this._meanRadius$1 = 6371000;
    this._table$1 = new Table();
    this.isLongIndex = false;
    this.shapeVertexCount = 0;
    this.lines = false;
    this.latColumn = -1;
    this.fixedSize = 1;
    this.decay = 16;
    this.timeSeries = false;
    this._dynamicData$1 = false;
    this._autoUpdate$1 = false;
    this._dataSourceUrl$1 = '';
    this._beginRange$1 = new Date('1/1/2100');
    this._endRange$1 = new Date('01/01/1800');
    this.markerDomainValues = {};
    this.colorDomainValues = {};
    this._coordinatesType$1 = 0;
    this.lngColumn = -1;
    this.geometryColumn = -1;
    this._xAxisColumn$1 = -1;
    this._yAxisColumn$1 = -1;
    this._zAxisColumn$1 = -1;
    this._xAxisReverse$1 = false;
    this._yAxisReverse$1 = false;
    this._zAxisReverse$1 = false;
    this._altType$1 = 3;
    this._markerMix$1 = 0;
    this._raUnits$1 = 0;
    this._colorMap$1 = 3;
    this._markerColumn$1 = -1;
    this._colorMapColumn$1 = -1;
    this._plotType$1 = 0;
    this._markerIndex$1 = 0;
    this._showFarSide$1 = false;
    this._markerScale$1 = 1;
    this._altUnit$1 = 1;
    this._cartesianScale$1 = 1;
    this._cartesianCustomScale$1 = 1;
    this.altColumn = -1;
    this.startDateColumn = -1;
    this.endDateColumn = -1;
    this.sizeColumn = -1;
    this.nameColumn = 0;
    this._hyperlinkFormat$1 = '';
    this._hyperlinkColumn$1 = -1;
    this.scaleFactor = 1;
    this.pointScaleType = 1;
    this.positions = [];
    this.bufferIsFlat = false;
    this.baseDate = new Date(2010, 0, 1, 12, 0, 0);
    this.dirty = true;
    this.lastVersion = 0;
    Layer.call(this);
  }
  SpreadSheetLayer._getDatafromFeed$1 = url => '';
  SpreadSheetLayer._executeQuery$1 = url => '';
  SpreadSheetLayer.parseDate = date => {
    let dt = ss.now();
    try {
      dt = new Date(date);
    }
    catch ($e1) {
      try {
        return SpreadSheetLayer.execlToDateTime(parseFloat(date));
      }
      catch ($e2) {
      }
    }
    return dt;
  };
  SpreadSheetLayer.execlToDateTime = excelDate => {
    if (excelDate > 59) {
      excelDate -= 1;
    }
    if (excelDate > 730000) {
      excelDate = 730000;
    }
    const es = new Date(1899, 12, 31);
    return new Date(es.getDate() + ss.truncate((excelDate * 24 * 60 * 60 * 1000)));
  };
  SpreadSheetLayer.get__circleTexture$1 = () => SpreadSheetLayer._circleTexture$1;
  const SpreadSheetLayer$ = {
    getTypeName: () => 'TerraViewer.SpreadSheetLayer',
    get_header: function () {
      return this._table$1.header;
    },
    canCopyToClipboard: () => true,
    copyToClipboard: () => {
    },
    dynamicUpdate: function () {
      const data = SpreadSheetLayer._getDatafromFeed$1(this.get_dataSourceUrl());
      if (data != null) {
        this.upadteData(data, false, true, true);
        this.guessHeaderAssignments();
        return true;
      }
      return false;
    },
    upadteData: function (data, purgeOld, purgeAll, hasHeader) {
      this.loadFromString(ss.safeCast(data, String), true, purgeOld, purgeAll, hasHeader);
      this.computeDateDomainRange(-1, -1);
      this._dataDirty$1 = true;
      return true;
    },
    loadData: function (tourDoc, filename) {
      const $this = this;

      this._table$1 = new Table();
      const blob = tourDoc.getFileBlob(filename);
      this.getStringFromGzipBlob(blob, data => {
        $this._table$1.loadFromString(data, false, true, true);
        $this.computeDateDomainRange(-1, -1);
        if ($this.get_dynamicData() && $this.get_autoUpdate()) {
          $this.dynamicUpdate();
        }
        $this._dataDirty$1 = true;
        $this.dirty = true;
      });
    },
    addFilesToCabinet: function (fc) {
      this._fileName$1 = fc.tempDirectory + ss.format('{0}\\{1}.txt', fc.get_packageID(), this.id.toString());
      const dir = this._fileName$1.substring(0, this._fileName$1.lastIndexOf('\\'));
      const data = this._table$1.save();
      const blob = new Blob([data]);
      fc.addFile(this._fileName$1, blob);
      Layer.prototype.addFilesToCabinet.call(this, fc);
    },
    guessHeaderAssignments: function () {
      let index = 0;
      const $enum1 = ss.enumerate(this._table$1.header);
      while ($enum1.moveNext()) {
        const headerName = $enum1.current;
        const name = headerName.toLowerCase();
        if (name.indexOf('lat') > -1 && this.latColumn === -1) {
          this.latColumn = index;
        }
        if ((name.indexOf('lon') > -1 || name.indexOf('lng') > -1) && this.lngColumn === -1) {
          this.lngColumn = index;
        }
        if (name.indexOf('dec') > -1 && this.latColumn === -1) {
          this.latColumn = index;
          this.astronomical = true;
        }
        if ((name.indexOf('ra') > -1 || name.indexOf('ascen') > -1) && this.lngColumn === -1) {
          this.lngColumn = index;
          this.astronomical = true;
          this.pointScaleType = 4;
        }
        if ((name.indexOf('mag') > -1 || name.indexOf('size') > -1) && this.sizeColumn === -1) {
          this.sizeColumn = index;
        }
        if ((name.indexOf('date') > -1 || name.indexOf('time') > -1 || name.indexOf('dt') > -1 || name.indexOf('tm') > -1)) {
          if (name.indexOf('end') > -1 && this.endDateColumn === -1) {
            this.endDateColumn = index;
          } else if (this.startDateColumn === -1) {
            this.startDateColumn = index;
          }
        }
        if ((name.indexOf('altitude') > -1 || name.indexOf('alt') > -1) && this.altColumn === -1) {
          this.altColumn = index;
          this.set_altType(1);
          this.set_altUnit(1);
        }
        if (name.indexOf('depth') > -1 && this.altColumn === -1) {
          this.altColumn = index;
          this.set_altType(0);
          this.set_altUnit(5);
        }
        if (ss.startsWith(name, 'x') && this.get_xAxisColumn() === -1) {
          this.set_xAxisColumn(index);
        }
        if (ss.startsWith(name, 'y') && this.get_yAxisColumn() === -1) {
          this.set_yAxisColumn(index);
        }
        if (ss.startsWith(name, 'z') && this.get_zAxisColumn() === -1) {
          this.set_zAxisColumn(index);
        }
        if (name.indexOf('color') > -1 && this.get_colorMapColumn() === -1) {
          this.set_colorMapColumn(index);
        }
        if ((name.indexOf('geometry') > -1 || name.indexOf('geography') > -1) && this.geometryColumn === -1) {
          this.geometryColumn = index;
        }
        index++;
      }
      if (this._table$1.header.length > 0) {
        this.nameColumn = 0;
      }
    },
    computeDateDomainRange: function (columnStart, columnEnd) {
      if (columnStart === -1) {
        columnStart = this.startDateColumn;
      }
      if (columnEnd === -1) {
        columnEnd = this.endDateColumn;
      }
      if (columnEnd === -1) {
        columnEnd = columnStart;
      }
      this.set_beginRange(new Date('12/31/2100'));
      this.set_endRange(new Date('12/31/1890'));
      const $enum1 = ss.enumerate(this._table$1.rows);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        try {
          if (columnStart > -1) {
            const sucsess = false;
            let dateTimeStart = new Date('12/31/2100');
            try {
              dateTimeStart = new Date(row[columnStart]);
              if (dateTimeStart < this.get_beginRange()) {
                this.set_beginRange(dateTimeStart);
              }
            } catch ($e2) {
            }
            try {
              let dateTimeEnd = new Date('12/31/1890');
              if (columnEnd > -1) {
                dateTimeEnd = new Date(row[columnEnd]);
                if (sucsess && dateTimeEnd > this.get_endRange()) {
                  this.set_endRange(dateTimeEnd);
                }
              }
            } catch ($e3) {
            }
          }
        } catch ($e4) {
        }
      }
    },
    checkState: () => {
    },
    getMaxValue: function (column) {
      let max = 0;
      this._table$1.lock();
      const $enum1 = ss.enumerate(this._table$1.rows);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        try {
          if (column > -1) {
            const sucsess = false;
            try {
              const val = parseFloat(row[column]);
              if (sucsess && val > max) {
                max = val;
              }
            } catch ($e2) {
            }
          }
        } catch ($e3) {
        }
      }
      this._table$1.unlock();
      return max;
    },
    getDomainValues: function (column) {
      const domainValues = [];
      this._table$1.lock();
      const $enum1 = ss.enumerate(this._table$1.rows);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        try {
          if (column > -1) {
            if (!(domainValues.indexOf(row[column]) >= 0)) {
              domainValues.push(row[column]);
            }
          }
        } catch ($e2) {
        }
      }
      domainValues.sort();
      this._table$1.unlock();
      return domainValues;
    },
    get_barChartBitmask: function () {
      return this._barChartBitmask$1;
    },
    set_barChartBitmask: function (value) {
      this._barChartBitmask$1 = value;
      return value;
    },
    prepVertexBuffer: function (renderContext, opacity) {
      this._table$1.lock();
      if (this.lineList != null) {
        this.lineList.clear();
      }
      if (this.lineList2d != null) {
        this.lineList2d.clear();
      }
      if (this.triangleList != null) {
        this.triangleList.clear();
      }
      if (this.pointList != null) {
        this.pointList.clear();
      }
      if (this.triangleList2d != null) {
        this.triangleList2d.clear();
      }
      if (this.lineList == null) {
        this.lineList = new LineList();
      }
      if (this.pointList == null) {
        this.pointList = new PointList(renderContext);
      }
      this.lineList.timeSeries = this.timeSeries;
      if (this.lineList2d == null) {
        this.lineList2d = new LineList();
        this.lineList2d.set_depthBuffered(false);
      }
      this.lineList.timeSeries = this.timeSeries;
      if (this.triangleList == null) {
        this.triangleList = new TriangleList();
      }
      if (this.triangleList2d == null) {
        this.triangleList2d = new TriangleList();
        this.triangleList2d.depthBuffered = false;
      }
      this.positions.length = 0;
      let currentIndex = 0;
      const colorLocal = this.get_color();
      const ecliptic = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow()) / 180 * Math.PI;
      const selectDomain = {};
      const mr = 0;
      if (!!mr) {
        this._meanRadius$1 = mr;
      }
      let position = new Vector3d();
      let pointSize = 0.0002;
      let pointColor = Colors.get_white();
      let pointStartTime = 0;
      let pointEndTime = 0;
      const $enum1 = ss.enumerate(this._table$1.rows);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        try {
          const selected = false;
          if (this.geometryColumn > -1 || (!this.get_coordinatesType() && (this.lngColumn > -1 && this.latColumn > -1)) || ((this.get_coordinatesType() === 1) && (this.get_xAxisColumn() > -1 && this.get_yAxisColumn() > -1))) {
            let Xcoord = 0;
            let Ycoord = 0;
            let Zcoord = 0;
            let alt = 1;
            let altitude = 0;
            let distParces = 0;
            let factor = this.getScaleFactor(this.get_altUnit(), 1);
            if (this.altColumn === -1 || this.get_altType() === 3 || this.bufferIsFlat) {
              alt = 1;
              if ((this.astronomical & !this.bufferIsFlat) === 1) {
                alt = 63239.6717 * 100;
              }
            } else {
              if (!this.get_altType()) {
                factor = -factor;
              }
              alt = 0;
              try {
                alt = parseFloat(row[this.altColumn]);
              } catch ($e2) {
              }
              if (this.astronomical) {
                factor = factor / (1000 * 149598000);
                distParces = (alt * factor) / 206264.806;
                altitude = (factor * alt);
                alt = (factor * alt);
              } else if (this.get_altType() === 2) {
                altitude = (factor * alt);
                alt = (factor * alt / this._meanRadius$1);
              } else {
                altitude = (factor * alt);
                alt = 1 + (factor * alt / this._meanRadius$1);
              }
            }
            if (!this.get_coordinatesType() && this.lngColumn > -1 && this.latColumn > -1) {
              Xcoord = parseFloat(row[this.lngColumn]);
              Ycoord = parseFloat(row[this.latColumn]);
              if (this.astronomical) {
                if (!this.get_raUnits()) {
                  Xcoord *= 15;
                }
                if (this.bufferIsFlat) {
                  Xcoord += 180;
                }
              }
              const offset = 0;
              const pos = Coordinates.geoTo3dDoubleRad(Ycoord, Xcoord, alt);
              if (this.astronomical && !this.bufferIsFlat) {
                pos.rotateX(ecliptic);
              }
              position = pos;
              this.positions.push(position);
            } else if (this.get_coordinatesType() === 1) {
              const xyzScale = this.getScaleFactor(this.get_cartesianScale(), this.get_cartesianCustomScale()) / this._meanRadius$1;
              if (this.get_zAxisColumn() > -1) {
                Zcoord = parseFloat(row[this.get_zAxisColumn()]);
              }
              Xcoord = parseFloat(row[this.get_xAxisColumn()]);
              Ycoord = parseFloat(row[this.get_yAxisColumn()]);
              if (this.get_xAxisReverse()) {
                Xcoord = -Xcoord;
              }
              if (this.get_yAxisReverse()) {
                Ycoord = -Ycoord;
              }
              if (this.get_zAxisReverse()) {
                Zcoord = -Zcoord;
              }
              position = Vector3d.create((Xcoord * xyzScale), (Zcoord * xyzScale), (Ycoord * xyzScale));
              this.positions.push(position);
            }
            switch (this.get__colorMap()) {
              case 0:
                pointColor = colorLocal;
                break;
              case 3:
                if (this.get_colorMapColumn() > -1) {
                  pointColor = this._parseColor$1(row[this.get_colorMapColumn()], colorLocal);
                } else {
                  pointColor = colorLocal;
                }
                break;
              default:
                break;
            }
            if (this.sizeColumn > -1) {
              switch (this.pointScaleType) {
                case 0:
                  pointSize = parseFloat(row[this.sizeColumn]);
                  break;
                case 2:
                  pointSize = Math.log(parseFloat(row[this.sizeColumn]));
                  break;
                case 1:
                  var size = 0;
                  try {
                    pointSize = parseFloat(row[this.sizeColumn]);
                    pointSize = Math.pow(2, pointSize);
                  } catch ($e3) {
                    pointSize = 0;
                  }
                  break;
                case 4:
                  var size = 0;
                  try {
                    size = parseFloat(row[this.sizeColumn]);
                    if (!this.bufferIsFlat) {
                      size = size - 5 * (Util.logN(distParces, 10) - 1);
                      pointSize = (120000000 / Math.pow(1.6, size));
                    } else {
                      pointSize = (40 / Math.pow(1.6, size));
                    }
                  } catch ($e4) {
                    pointSize = 0;
                  }
                  break;
                case 3:
                  pointSize = 1;
                  break;
                default:
                  break;
              }
            } else {
              pointSize = 0.2;
            }
            if (this.get_plotType() === 1) {
              pointSize = 1;
            }
            if ((this.astronomical & !this.bufferIsFlat) === 1) {
            }
            if (this.startDateColumn > -1) {
              let dateTime = new Date(row[this.startDateColumn]);
              pointStartTime = (SpaceTimeController.utcToJulian(dateTime) - SpaceTimeController.utcToJulian(this.baseDate));
              if (this.endDateColumn > -1) {
                dateTime = new Date(row[this.endDateColumn]);
                pointEndTime = (SpaceTimeController.utcToJulian(dateTime) - SpaceTimeController.utcToJulian(this.baseDate));
              } else {
                pointEndTime = pointStartTime;
              }
            }
            this.pointList.addPoint(position, pointColor, new Dates(pointStartTime, pointEndTime), pointSize);
            if (this.geometryColumn > -1) {
              this._parseGeometry$1(row[this.geometryColumn], pointColor, pointColor, altitude, new Dates(pointStartTime, pointEndTime));
            }
            currentIndex++;
          }
        } catch ($e5) {
        }
        this.lines = false;
      }
      this._table$1.unlock();
      this._dataDirty$1 = false;
      this.dirty = false;
      return false;
    },
    _parseGeometry$1: function (gs, lineColor, polyColor, alt, date) {
      gs = ss.trim(gs).toLowerCase();
      const index = gs.indexOf('(');
      if (index < 0) {
        return;
      }
      if (!ss.endsWith(gs, ')')) {
        return;
      }
      const commandPart = ss.trim(gs.substring(0, index));
      let parens = gs.substr(index);
      const parts = commandPart.split(' ');
      let command = null;
      let mods = null;
      if (parts.length > 0) {
        const $enum1 = ss.enumerate(parts);
        while ($enum1.moveNext()) {
          const item = $enum1.current;
          if (ss.emptyString(command)) {
            command = item;
          } else if (ss.emptyString(mods)) {
            mods = item;
          }
        }
      }
      switch (command) {
        case 'multipolygon':
        case 'polygon':
          this._parsePolygon$1(parens, mods, lineColor, polyColor, alt, date);
          break;
        case 'multilinestring':
          this._parseLineString$1(parens, mods, lineColor, alt, false, date);
          break;
        case 'linestring':
          this._parseLineString$1(parens, mods, lineColor, alt, true, date);
          break;
        case 'geometrycollection':
          parens = parens.substring(1, parens.length - 2);
          const shapes = UiTools.splitString(parens, ',');
          const $enum2 = ss.enumerate(shapes);
          while ($enum2.moveNext()) {
            const shape = $enum2.current;
            this._parseGeometry$1(shape, lineColor, polyColor, alt, date);
          }
          break;
        default:
          break;
      }
    },
    _parsePolygon$1: function (parens, mods, lineColor, polyColor, alt, date) {
      if (!ss.startsWith(parens, '(') && ss.endsWith(parens, ')')) {
        return;
      }
      parens = parens.substring(1, parens.length - 2);
      const shapes = UiTools.splitString(parens, ',');
      const $enum1 = ss.enumerate(shapes);
      while ($enum1.moveNext()) {
        const shape = $enum1.current;
        const lineList = new KmlLineList();
        lineList.astronomical = this.astronomical;
        lineList.meanRadius = this._meanRadius$1;
        lineList.parseWkt(shape, mods, alt, date);
        if (!alt) {
          this._addPolygonFlat$1(false, lineList, 1, polyColor, lineColor, true, true, date);
        } else {
          this._addPolygon$1(false, lineList, 1, polyColor, lineColor, true, true, date);
        }
      }
    },
    _parseLineString$1: function (parens, mods, lineColor, alt, single, date) {
      if (!ss.startsWith(parens, '(') && ss.endsWith(parens, ')')) {
        return;
      }
      if (!single) {
        parens = parens.substring(1, parens.length - 2);
      }
      const shapes = UiTools.splitString(parens, ',');
      const $enum1 = ss.enumerate(shapes);
      while ($enum1.moveNext()) {
        const shape = $enum1.current;
        const lineList = new KmlLineList();
        lineList.astronomical = this.astronomical;
        lineList.meanRadius = this._meanRadius$1;
        lineList.parseWkt(shape, mods, alt, date);
        this._addPolygon$1(false, lineList, 1, Colors.get_white(), lineColor, false, false, date);
      }
    },
    _splitShapes$1: shapes => {
      const shapeList = [];
      let nesting = 0;
      const current = 0;
      while (current < shapes.length) {
        if (shapes.substr(current, 1) === '(') {
          nesting++;
        }
      }
      return shapeList;
    },
    _addPolygon$1: function (sky, geo, lineWidth, polyColor, lineColor, extrude, fill, date) {
      const vertexList = [];
      const vertexListGround = [];
      for (let i = 0; i < geo.pointList.length; i++) {
        vertexList.push(Coordinates.geoTo3dDoubleRad(geo.pointList[i].lat, geo.pointList[i].lng, 1 + (geo.pointList[i].alt / this._meanRadius$1)));
        vertexListGround.push(Coordinates.geoTo3dDoubleRad(geo.pointList[i].lat, geo.pointList[i].lng, 1));
      }
      for (let i = 0; i < (geo.pointList.length - 1); i++) {
        if (sky) {
        } else {
          if (extrude) {
            this.triangleList.addQuad(vertexList[i], vertexList[i + 1], vertexListGround[i], vertexListGround[i + 1], polyColor, date);
          }
          if (lineWidth > 0) {
            if (extrude) {
              this.lineList.addLine(vertexList[i], vertexList[i + 1], lineColor, date);
            } else {
              this.lineList2d.addLine(vertexList[i], vertexList[i + 1], lineColor, date);
            }
            if (extrude) {
              this.lineList.addLine(vertexListGround[i], vertexListGround[i + 1], lineColor, date);
              this.lineList.addLine(vertexList[i], vertexListGround[i], lineColor, date);
              this.lineList.addLine(vertexList[i + 1], vertexListGround[i + 1], lineColor, date);
            }
          }
        }
      }
      if (fill) {
        const indexes = Tessellator.tesselateSimplePoly(vertexList);
        for (let i = 0; i < indexes.length; i += 3) {
          this.triangleList.addTriangle(vertexList[indexes[i]], vertexList[indexes[i + 1]], vertexList[indexes[i + 2]], polyColor, date);
        }
      }
    },
    _addPolygonFlat$1: function (sky, geo, lineWidth, polyColor, lineColor, extrude, fill, date) {
      const vertexList = [];
      for (let i = 0; i < geo.pointList.length; i++) {
        vertexList.push(Coordinates.geoTo3dDoubleRad(geo.pointList[i].lat, geo.pointList[i].lng, 1 + (geo.pointList[i].alt / this._meanRadius$1)));
      }
      for (let i = 0; i < (geo.pointList.length - 1); i++) {
        if (sky) {
        } else {
          if (lineWidth > 0) {
            this.lineList2d.addLine(vertexList[i], vertexList[i + 1], lineColor, date);
          }
        }
      }
      if (fill) {
        const indexes = Tessellator.tesselateSimplePoly(vertexList);
        for (let i = 0; i < indexes.length; i += 3) {
          this.triangleList2d.addSubdividedTriangles(vertexList[indexes[i]], vertexList[indexes[i + 1]], vertexList[indexes[i + 2]], polyColor, date, 2);
        }
      }
    },
    _parseColor$1: (colorText, defaultColor) => Color.load(colorText),
    getScaleFactor: (AltUnit, custom) => {
      let factor = 1;
      switch (AltUnit) {
        case 1:
          factor = 1;
          break;
        case 2:
          factor = 1 * 0.3048;
          break;
        case 3:
          factor = (1 / 12) * 0.3048;
          break;
        case 4:
          factor = 5280 * 0.3048;
          break;
        case 5:
          factor = 1000;
          break;
        case 6:
          factor = 1000 * 149598000;
          break;
        case 7:
          factor = 1000 * 149598000 * 63239.6717;
          break;
        case 8:
          factor = 1000 * 149598000 * 206264.806;
          break;
        case 9:
          factor = 1000 * 149598000 * 206264.806 * 1000000;
          break;
        case 10:
          factor = custom;
          break;
        default:
          break;
      }
      return factor;
    },
    get__table: function () {
      return this._table$1;
    },
    set__table: function (value) {
      this._table$1 = value;
      return value;
    },
    loadFromString: function (data, isUpdate, purgeOld, purgeAll, hasHeader) {
      if (!isUpdate) {
        this._table$1 = new Table();
      }
      this._table$1.lock();
      this._table$1.loadFromString(data, isUpdate, purgeAll, hasHeader);
      if (!isUpdate) {
        this.guessHeaderAssignments();
        if (this.astronomical && this.lngColumn > -1) {
          const max = this.getMaxValue(this.lngColumn);
          if (max > 24) {
            this.set_raUnits(1);
          }
        }
      }
      if (purgeOld) {
        this.purgeByTime();
      }
      this._table$1.unlock();
    },
    purgeByTime: function () {
      if (this.startDateColumn < 0) {
        return;
      }
      let columnToUse = this.startDateColumn;
      if (this.endDateColumn > -1) {
        columnToUse = this.endDateColumn;
      }
      let threasholdTime = SpaceTimeController.get_now();
      const ts = ss.truncate(this.decay) * 24 * 60 * 60 * 1000;
      threasholdTime = new Date(threasholdTime.getDate() - ts);
      let count = this._table$1.rows.length;
      for (let i = 0; i < count; i++) {
        try {
          const row = this._table$1.rows[i];
          const colDate = new Date(row[columnToUse]);
          if (colDate < threasholdTime) {
            this._table$1.rows.splice(i, 1);
            count--;
            i--;
          }
        } catch ($e1) {
        }
      }
    },
    cleanUp: function () {
      this.cleanUpBase();
      this._table$1.lock();
      Layer.prototype.cleanUp.call(this);
      this._table$1.unlock();
      this.dirty = true;
    },
    writeLayerProperties: function (xmlWriter) {
      xmlWriter._writeAttributeString('TimeSeries', this.get_timeSeries().toString());
      xmlWriter._writeAttributeString('BeginRange', Util.xmlDate(this.get_beginRange()));
      xmlWriter._writeAttributeString('EndRange', Util.xmlDate(this.get_endRange()));
      xmlWriter._writeAttributeString('Decay', this.get_decay().toString());
      xmlWriter._writeAttributeString('CoordinatesType', Enums.toXml('CoordinatesTypes', this.get_coordinatesType()));
      xmlWriter._writeAttributeString('LatColumn', this.get_latColumn().toString());
      xmlWriter._writeAttributeString('LngColumn', this.get_lngColumn().toString());
      xmlWriter._writeAttributeString('GeometryColumn', this.get_geometryColumn().toString());
      xmlWriter._writeAttributeString('AltType', Enums.toXml('AltTypes', this.get_altType()));
      xmlWriter._writeAttributeString('MarkerMix', Enums.toXml('MarkerMixes', this.get_markerMix()));
      xmlWriter._writeAttributeString('ColorMap', Enums.toXml('ColorMaps', this.get__colorMap()));
      xmlWriter._writeAttributeString('MarkerColumn', this.get_markerColumn().toString());
      xmlWriter._writeAttributeString('ColorMapColumn', this.get_colorMapColumn().toString());
      xmlWriter._writeAttributeString('PlotType', Enums.toXml('PlotTypes', this.get_plotType()));
      xmlWriter._writeAttributeString('MarkerIndex', this.get_markerIndex().toString());
      xmlWriter._writeAttributeString('MarkerScale', Enums.toXml('MarkerScales', this.get_markerScale()));
      xmlWriter._writeAttributeString('AltUnit', this.get_altUnit().toString());
      xmlWriter._writeAttributeString('AltColumn', this.get_altColumn().toString());
      xmlWriter._writeAttributeString('StartDateColumn', this.get_startDateColumn().toString());
      xmlWriter._writeAttributeString('EndDateColumn', this.get_endDateColumn().toString());
      xmlWriter._writeAttributeString('SizeColumn', this.get_sizeColumn().toString());
      xmlWriter._writeAttributeString('HyperlinkFormat', this.get_hyperlinkFormat());
      xmlWriter._writeAttributeString('HyperlinkColumn', this.get_hyperlinkColumn().toString());
      xmlWriter._writeAttributeString('ScaleFactor', this.get_scaleFactor().toString());
      xmlWriter._writeAttributeString('PointScaleType', Enums.toXml('PointScaleTypes', this.get_pointScaleType()));
      xmlWriter._writeAttributeString('ShowFarSide', this.get_showFarSide().toString());
      xmlWriter._writeAttributeString('RaUnits', Enums.toXml('RAUnits', this.get_raUnits()));
      xmlWriter._writeAttributeString('HoverTextColumn', this.get_nameColumn().toString());
      xmlWriter._writeAttributeString('XAxisColumn', this.get_xAxisColumn().toString());
      xmlWriter._writeAttributeString('XAxisReverse', this.get_xAxisReverse().toString());
      xmlWriter._writeAttributeString('YAxisColumn', this.get_yAxisColumn().toString());
      xmlWriter._writeAttributeString('YAxisReverse', this.get_yAxisReverse().toString());
      xmlWriter._writeAttributeString('ZAxisColumn', this.get_zAxisColumn().toString());
      xmlWriter._writeAttributeString('ZAxisReverse', this.get_zAxisReverse().toString());
      xmlWriter._writeAttributeString('CartesianScale', Enums.toXml('AltUnits', this.get_cartesianScale()));
      xmlWriter._writeAttributeString('CartesianCustomScale', this.get_cartesianCustomScale().toString());
      xmlWriter._writeAttributeString('DynamicData', this.get_dynamicData().toString());
      xmlWriter._writeAttributeString('AutoUpdate', this.get_autoUpdate().toString());
      xmlWriter._writeAttributeString('DataSourceUrl', this.get_dataSourceUrl());
    },
    get_dynamicData: function () {
      return this._dynamicData$1;
    },
    set_dynamicData: function (value) {
      this._dynamicData$1 = value;
      return value;
    },
    get_autoUpdate: function () {
      return this._autoUpdate$1;
    },
    set_autoUpdate: function (value) {
      this._autoUpdate$1 = value;
      return value;
    },
    get_dataSourceUrl: function () {
      return this._dataSourceUrl$1;
    },
    set_dataSourceUrl: function (value) {
      this._dataSourceUrl$1 = value;
      return value;
    },
    get_timeSeries: function () {
      return this.timeSeries;
    },
    set_timeSeries: function (value) {
      if (this.timeSeries !== value) {
        this.version++;
        this.timeSeries = value;
      }
      return value;
    },
    get_beginRange: function () {
      return this._beginRange$1;
    },
    set_beginRange: function (value) {
      if (!ss.compareDates(this._beginRange$1, value)) {
        this.version++;
        this._beginRange$1 = value;
      }
      return value;
    },
    get_endRange: function () {
      return this._endRange$1;
    },
    set_endRange: function (value) {
      if (!ss.compareDates(this._endRange$1, value)) {
        this.version++;
        this._endRange$1 = value;
      }
      return value;
    },
    initializeFromXml: function (node) {
      this.set_timeSeries(ss.boolean(node.attributes.getNamedItem('TimeSeries').nodeValue));
      this.set_beginRange(new Date(node.attributes.getNamedItem('BeginRange').nodeValue));
      this.set_endRange(new Date(node.attributes.getNamedItem('EndRange').nodeValue));
      this.set_decay(parseFloat(node.attributes.getNamedItem('Decay').nodeValue));
      this.set_coordinatesType(Enums.parse('CoordinatesTypes', node.attributes.getNamedItem('CoordinatesType').nodeValue));
      if (this.get_coordinatesType() < 0) {
        this.set_coordinatesType(0);
      }
      this.set_latColumn(parseInt(node.attributes.getNamedItem('LatColumn').nodeValue));
      this.set_lngColumn(parseInt(node.attributes.getNamedItem('LngColumn').nodeValue));
      if (node.attributes.getNamedItem('GeometryColumn') != null) {
        this.set_geometryColumn(parseInt(node.attributes.getNamedItem('GeometryColumn').nodeValue));
      }
      this.set_altType(Enums.parse('AltTypes', node.attributes.getNamedItem('AltType').nodeValue));
      this.set_markerMix(0);
      this.set__colorMap(Enums.parse('ColorMaps', node.attributes.getNamedItem('ColorMap').nodeValue));
      this.set_markerColumn(parseInt(node.attributes.getNamedItem('MarkerColumn').nodeValue));
      this.set_colorMapColumn(parseInt(node.attributes.getNamedItem('ColorMapColumn').nodeValue));
      this.set_plotType(Enums.parse('PlotTypes', node.attributes.getNamedItem('PlotType').nodeValue));
      this.set_markerIndex(parseInt(node.attributes.getNamedItem('MarkerIndex').nodeValue));
      this.set_markerScale(Enums.parse('MarkerScales', node.attributes.getNamedItem('MarkerScale').nodeValue));
      this.set_altUnit(Enums.parse('AltUnits', node.attributes.getNamedItem('AltUnit').nodeValue));
      this.set_altColumn(parseInt(node.attributes.getNamedItem('AltColumn').nodeValue));
      this.set_startDateColumn(parseInt(node.attributes.getNamedItem('StartDateColumn').nodeValue));
      this.set_endDateColumn(parseInt(node.attributes.getNamedItem('EndDateColumn').nodeValue));
      this.set_sizeColumn(parseInt(node.attributes.getNamedItem('SizeColumn').nodeValue));
      this.set_hyperlinkFormat(node.attributes.getNamedItem('HyperlinkFormat').nodeValue);
      this.set_hyperlinkColumn(parseInt(node.attributes.getNamedItem('HyperlinkColumn').nodeValue));
      this.set_scaleFactor(parseFloat(node.attributes.getNamedItem('ScaleFactor').nodeValue));
      this.set_pointScaleType(Enums.parse('PointScaleTypes', node.attributes.getNamedItem('PointScaleType').nodeValue));
      if (node.attributes.getNamedItem('ShowFarSide') != null) {
        this.set_showFarSide(ss.boolean(node.attributes.getNamedItem('ShowFarSide').nodeValue));
      }
      if (node.attributes.getNamedItem('RaUnits') != null) {
        this.set_raUnits(Enums.parse('RAUnits', node.attributes.getNamedItem('RaUnits').nodeValue));
      }
      if (node.attributes.getNamedItem('HoverTextColumn') != null) {
        this.set_nameColumn(parseInt(node.attributes.getNamedItem('HoverTextColumn').nodeValue));
      }
      if (node.attributes.getNamedItem('XAxisColumn') != null) {
        this.set_xAxisColumn(parseInt(node.attributes.getNamedItem('XAxisColumn').nodeValue));
        this.set_xAxisReverse(ss.boolean(node.attributes.getNamedItem('XAxisReverse').nodeValue));
        this.set_yAxisColumn(parseInt(node.attributes.getNamedItem('YAxisColumn').nodeValue));
        this.set_yAxisReverse(ss.boolean(node.attributes.getNamedItem('YAxisReverse').nodeValue));
        this.set_zAxisColumn(parseInt(node.attributes.getNamedItem('ZAxisColumn').nodeValue));
        this.set_zAxisReverse(ss.boolean(node.attributes.getNamedItem('ZAxisReverse').nodeValue));
        this.set_cartesianScale(Enums.parse('AltUnits', node.attributes.getNamedItem('CartesianScale').nodeValue));
        this.set_cartesianCustomScale(parseFloat(node.attributes.getNamedItem('CartesianCustomScale').nodeValue));
      }
      if (node.attributes.getNamedItem('DynamicData') != null) {
        this.set_dynamicData(ss.boolean(node.attributes.getNamedItem('DynamicData').nodeValue));
        this.set_autoUpdate(ss.boolean(node.attributes.getNamedItem('AutoUpdate').nodeValue));
        this.set_dataSourceUrl(node.attributes.getNamedItem('DataSourceUrl').nodeValue);
      }
    },
    get_decay: function () {
      return this.decay;
    },
    set_decay: function (value) {
      if (this.decay !== value) {
        this.version++;
        this.decay = value;
      }
      return value;
    },
    get_coordinatesType: function () {
      return this._coordinatesType$1;
    },
    set_coordinatesType: function (value) {
      if (this._coordinatesType$1 !== value) {
        this.version++;
        this._coordinatesType$1 = value;
      }
      return value;
    },
    get_latColumn: function () {
      return this.latColumn;
    },
    set_latColumn: function (value) {
      if (this.latColumn !== value) {
        this.version++;
        this.latColumn = value;
      }
      return value;
    },
    get_lngColumn: function () {
      return this.lngColumn;
    },
    set_lngColumn: function (value) {
      if (this.lngColumn !== value) {
        this.version++;
        this.lngColumn = value;
      }
      return value;
    },
    get_geometryColumn: function () {
      return this.geometryColumn;
    },
    set_geometryColumn: function (value) {
      if (this.geometryColumn !== value) {
        this.version++;
        this.geometryColumn = value;
      }
      return value;
    },
    get_xAxisColumn: function () {
      return this._xAxisColumn$1;
    },
    set_xAxisColumn: function (value) {
      if (this._xAxisColumn$1 !== value) {
        this.version++;
        this._xAxisColumn$1 = value;
      }
      return value;
    },
    get_yAxisColumn: function () {
      return this._yAxisColumn$1;
    },
    set_yAxisColumn: function (value) {
      if (this._yAxisColumn$1 !== value) {
        this.version++;
        this._yAxisColumn$1 = value;
      }
      return value;
    },
    get_zAxisColumn: function () {
      return this._zAxisColumn$1;
    },
    set_zAxisColumn: function (value) {
      if (this._zAxisColumn$1 !== value) {
        this.version++;
        this._zAxisColumn$1 = value;
      }
      return value;
    },
    get_xAxisReverse: function () {
      return this._xAxisReverse$1;
    },
    set_xAxisReverse: function (value) {
      if (this._xAxisReverse$1 !== value) {
        this.version++;
        this._xAxisReverse$1 = value;
      }
      return value;
    },
    get_yAxisReverse: function () {
      return this._yAxisReverse$1;
    },
    set_yAxisReverse: function (value) {
      if (this._yAxisReverse$1 !== value) {
        this.version++;
        this._yAxisReverse$1 = value;
      }
      return value;
    },
    get_zAxisReverse: function () {
      return this._zAxisReverse$1;
    },
    set_zAxisReverse: function (value) {
      if (this._zAxisReverse$1 !== value) {
        this.version++;
        this._zAxisReverse$1 = value;
      }
      return value;
    },
    get_altType: function () {
      return this._altType$1;
    },
    set_altType: function (value) {
      if (this._altType$1 !== value) {
        this.version++;
        this._altType$1 = value;
      }
      return value;
    },
    get_markerMix: function () {
      return this._markerMix$1;
    },
    set_markerMix: function (value) {
      if (this._markerMix$1 !== value) {
        this.version++;
        this._markerMix$1 = value;
      }
      return value;
    },
    get_raUnits: function () {
      return this._raUnits$1;
    },
    set_raUnits: function (value) {
      if (this._raUnits$1 !== value) {
        this.version++;
        this._raUnits$1 = value;
      }
      return value;
    },
    get__colorMap: function () {
      return this._colorMap$1;
    },
    set__colorMap: function (value) {
      if (this._colorMap$1 !== value) {
        this.version++;
        this._colorMap$1 = value;
      }
      return value;
    },
    get_markerColumn: function () {
      return this._markerColumn$1;
    },
    set_markerColumn: function (value) {
      if (this._markerColumn$1 !== value) {
        this.version++;
        this._markerColumn$1 = value;
      }
      return value;
    },
    get_colorMapColumn: function () {
      return this._colorMapColumn$1;
    },
    set_colorMapColumn: function (value) {
      if (this._colorMapColumn$1 !== value) {
        this.version++;
        this._colorMapColumn$1 = value;
      }
      return value;
    },
    get_plotType: function () {
      return this._plotType$1;
    },
    set_plotType: function (value) {
      if (this._plotType$1 !== value) {
        this.version++;
        this._plotType$1 = value;
      }
      return value;
    },
    get_markerIndex: function () {
      return this._markerIndex$1;
    },
    set_markerIndex: function (value) {
      if (this._markerIndex$1 !== value) {
        this.version++;
        this._markerIndex$1 = value;
      }
      return value;
    },
    get_showFarSide: function () {
      return this._showFarSide$1;
    },
    set_showFarSide: function (value) {
      if (this._showFarSide$1 !== value) {
        this.version++;
        this._showFarSide$1 = value;
      }
      return value;
    },
    get_markerScale: function () {
      return this._markerScale$1;
    },
    set_markerScale: function (value) {
      if (this._markerScale$1 !== value) {
        this.version++;
        this._markerScale$1 = value;
      }
      return value;
    },
    get_altUnit: function () {
      return this._altUnit$1;
    },
    set_altUnit: function (value) {
      if (this._altUnit$1 !== value) {
        this.version++;
        this._altUnit$1 = value;
      }
      return value;
    },
    get_cartesianScale: function () {
      return this._cartesianScale$1;
    },
    set_cartesianScale: function (value) {
      if (this._cartesianScale$1 !== value) {
        this.version++;
        this._cartesianScale$1 = value;
      }
      return value;
    },
    get_cartesianCustomScale: function () {
      return this._cartesianCustomScale$1;
    },
    set_cartesianCustomScale: function (value) {
      if (this._cartesianCustomScale$1 !== value) {
        this.version++;
        this._cartesianCustomScale$1 = value;
      }
      return value;
    },
    get_altColumn: function () {
      return this.altColumn;
    },
    set_altColumn: function (value) {
      if (this.altColumn !== value) {
        this.version++;
        this.altColumn = value;
      }
      return value;
    },
    get_startDateColumn: function () {
      return this.startDateColumn;
    },
    set_startDateColumn: function (value) {
      if (this.startDateColumn !== value) {
        this.version++;
        this.startDateColumn = value;
      }
      return value;
    },
    get_endDateColumn: function () {
      return this.endDateColumn;
    },
    set_endDateColumn: function (value) {
      if (this.endDateColumn !== value) {
        this.version++;
        this.endDateColumn = value;
      }
      return value;
    },
    get_sizeColumn: function () {
      return this.sizeColumn;
    },
    set_sizeColumn: function (value) {
      if (this.sizeColumn !== value) {
        this.version++;
        this.sizeColumn = value;
      }
      return value;
    },
    get_nameColumn: function () {
      return this.nameColumn;
    },
    set_nameColumn: function (value) {
      if (this.nameColumn !== value) {
        this.version++;
        this.nameColumn = value;
      }
      return value;
    },
    get_hyperlinkFormat: function () {
      return this._hyperlinkFormat$1;
    },
    set_hyperlinkFormat: function (value) {
      if (this._hyperlinkFormat$1 !== value) {
        this.version++;
        this._hyperlinkFormat$1 = value;
      }
      return value;
    },
    get_hyperlinkColumn: function () {
      return this._hyperlinkColumn$1;
    },
    set_hyperlinkColumn: function (value) {
      if (this._hyperlinkColumn$1 !== value) {
        this.version++;
        this._hyperlinkColumn$1 = value;
      }
      return value;
    },
    get_scaleFactor: function () {
      return this.scaleFactor;
    },
    set_scaleFactor: function (value) {
      if (this.scaleFactor !== value) {
        this.version++;
        this.scaleFactor = value;
      }
      return value;
    },
    get_pointScaleType: function () {
      return this.pointScaleType;
    },
    set_pointScaleType: function (value) {
      if (this.pointScaleType !== value) {
        this.version++;
        this.pointScaleType = value;
      }
      return value;
    },
    draw: function (renderContext, opacity, flat) {
      const device = renderContext;
      if (this.version !== this.lastVersion) {
        this.cleanUp();
      }
      this.lastVersion = this.version;
      if (this.bufferIsFlat !== flat) {
        this.cleanUp();
        this.bufferIsFlat = flat;
      }
      if (this.dirty) {
        this.prepVertexBuffer(device, opacity);
      }
      const jNow = SpaceTimeController.get_jNow() - SpaceTimeController.utcToJulian(this.baseDate);
      let adjustedScale = this.scaleFactor * 3;
      if (flat && this.astronomical && (this._markerScale$1 === 1)) {
        adjustedScale = (this.scaleFactor / (renderContext.viewCamera.zoom / 360));
      }
      if (this.triangleList2d != null) {
        this.triangleList2d.decay = this.decay;
        this.triangleList2d.sky = this.get_astronomical();
        this.triangleList2d.timeSeries = this.timeSeries;
        this.triangleList2d.jNow = jNow;
        this.triangleList2d.draw(renderContext, opacity * this.get_opacity(), 1);
      }
      if (this.triangleList != null) {
        this.triangleList.decay = this.decay;
        this.triangleList.sky = this.get_astronomical();
        this.triangleList.timeSeries = this.timeSeries;
        this.triangleList.jNow = jNow;
        this.triangleList.draw(renderContext, opacity * this.get_opacity(), 1);
      }
      if (this.pointList != null) {
        this.pointList.depthBuffered = false;
        this.pointList.showFarSide = this.get_showFarSide();
        this.pointList.decay = (this.timeSeries) ? this.decay : 0;
        this.pointList.sky = this.get_astronomical();
        this.pointList.timeSeries = this.timeSeries;
        this.pointList.jNow = jNow;
        this.pointList.scale = (this._markerScale$1 === 1) ? adjustedScale : -adjustedScale;
        switch (this._plotType$1) {
          case 0:
            this.pointList.draw(renderContext, opacity * this.get_opacity(), false);
            break;
          case 2:
          case 1:
            this.pointList.drawTextured(renderContext, PushPin.getPushPinTexture(35), opacity * this.get_opacity());
            break;
          case 3:
            this.pointList.drawTextured(renderContext, PushPin.getPushPinTexture(67), opacity * this.get_opacity());
            break;
          case 5:
          case 4:
            this.pointList.drawTextured(renderContext, PushPin.getPushPinTexture(this._markerIndex$1), opacity * this.get_opacity());
            break;
          default:
            break;
        }
        this.pointList.draw(renderContext, opacity * this.get_opacity(), false);
      }
      if (this.lineList != null) {
        this.lineList.sky = this.get_astronomical();
        this.lineList.decay = this.decay;
        this.lineList.timeSeries = this.timeSeries;
        this.lineList.jNow = jNow;
        this.lineList.drawLines(renderContext, opacity * this.get_opacity());
      }
      if (this.lineList2d != null) {
        this.lineList2d.sky = this.get_astronomical();
        this.lineList2d.decay = this.decay;
        this.lineList2d.timeSeries = this.timeSeries;
        this.lineList2d.showFarSide = this.get_showFarSide();
        this.lineList2d.jNow = jNow;
        this.lineList2d.drawLines(renderContext, opacity * this.get_opacity());
      }
      return true;
    },
    cleanUpBase: function () {
      if (this.lineList != null) {
        this.lineList.clear();
      }
      if (this.lineList2d != null) {
        this.lineList2d.clear();
      }
      if (this.triangleList2d != null) {
        this.triangleList2d.clear();
      }
      if (this.pointList != null) {
        this.pointList.clear();
      }
      if (this.triangleList != null) {
        this.triangleList.clear();
      }
    }
  };

  function TimeSeriesLayer() {
    this.isLongIndex = false;
    this.shapeVertexCount = 0;
    this.lines = false;
    this.latColumn = -1;
    this.fixedSize = 1;
    this.decay = 16;
    this.timeSeries = false;
    this._dynamicData$1 = false;
    this._autoUpdate$1 = false;
    this._dataSourceUrl$1 = '';
    this._beginRange$1 = new Date('1/1/2100');
    this._endRange$1 = new Date('01/01/1800');
    this.markerDomainValues = {};
    this.colorDomainValues = {};
    this._coordinatesType$1 = 0;
    this.lngColumn = -1;
    this.geometryColumn = -1;
    this._xAxisColumn$1 = -1;
    this._yAxisColumn$1 = -1;
    this._zAxisColumn$1 = -1;
    this._xAxisReverse$1 = false;
    this._yAxisReverse$1 = false;
    this._zAxisReverse$1 = false;
    this._altType$1 = 3;
    this._markerMix$1 = 0;
    this._raUnits$1 = 0;
    this._colorMap$1 = 3;
    this._markerColumn$1 = -1;
    this._colorMapColumn$1 = -1;
    this._plotType$1 = 0;
    this._markerIndex$1 = 0;
    this._showFarSide$1 = false;
    this._markerScale$1 = 1;
    this._altUnit$1 = 1;
    this._cartesianScale$1 = 1;
    this._cartesianCustomScale$1 = 1;
    this.altColumn = -1;
    this.startDateColumn = -1;
    this.endDateColumn = -1;
    this.sizeColumn = -1;
    this.nameColumn = 0;
    this._hyperlinkFormat$1 = '';
    this._hyperlinkColumn$1 = -1;
    this.scaleFactor = 1;
    this.pointScaleType = 1;
    this.positions = [];
    this.bufferIsFlat = false;
    this.baseDate = new Date(2010, 0, 1, 12, 0, 0);
    this.dirty = true;
    this.lastVersion = 0;
    Layer.call(this);
  }
  TimeSeriesLayer.get__circleTexture$1 = () => TimeSeriesLayer._circleTexture$1;
  const TimeSeriesLayer$ = {
    get_dynamicData: function () {
      return this._dynamicData$1;
    },
    set_dynamicData: function (value) {
      this._dynamicData$1 = value;
      return value;
    },
    get_autoUpdate: function () {
      return this._autoUpdate$1;
    },
    set_autoUpdate: function (value) {
      this._autoUpdate$1 = value;
      return value;
    },
    get_dataSourceUrl: function () {
      return this._dataSourceUrl$1;
    },
    set_dataSourceUrl: function (value) {
      this._dataSourceUrl$1 = value;
      return value;
    },
    get_timeSeries: function () {
      return this.timeSeries;
    },
    set_timeSeries: function (value) {
      if (this.timeSeries !== value) {
        this.version++;
        this.timeSeries = value;
      }
      return value;
    },
    get_header: () => null,
    get_beginRange: function () {
      return this._beginRange$1;
    },
    set_beginRange: function (value) {
      if (!ss.compareDates(this._beginRange$1, value)) {
        this.version++;
        this._beginRange$1 = value;
      }
      return value;
    },
    get_endRange: function () {
      return this._endRange$1;
    },
    set_endRange: function (value) {
      if (!ss.compareDates(this._endRange$1, value)) {
        this.version++;
        this._endRange$1 = value;
      }
      return value;
    },
    initializeFromXml: function (node) {
      this.set_timeSeries(ss.boolean(node.attributes.getNamedItem('TimeSeries').nodeValue));
      this.set_beginRange(new Date(node.attributes.getNamedItem('BeginRange').nodeValue));
      this.set_endRange(new Date(node.attributes.getNamedItem('EndRange').nodeValue));
      this.set_decay(parseFloat(node.attributes.getNamedItem('Decay').nodeValue));
      this.set_coordinatesType(Enums.parse('CoordinatesTypes', node.attributes.getNamedItem('CoordinatesType').nodeValue));
      if (this.get_coordinatesType() < 0) {
        this.set_coordinatesType(0);
      }
      this.set_latColumn(parseInt(node.attributes.getNamedItem('LatColumn').nodeValue));
      this.set_lngColumn(parseInt(node.attributes.getNamedItem('LngColumn').nodeValue));
      if (node.attributes.getNamedItem('GeometryColumn') != null) {
        this.set_geometryColumn(parseInt(node.attributes.getNamedItem('GeometryColumn').nodeValue));
      }
      switch (node.attributes.getNamedItem('AltType').nodeValue) {
        case 'Depth':
          this.set_altType(0);
          break;
        case 'Altitude':
          this.set_altType(1);
          break;
        case 'Distance':
          this.set_altType(2);
          break;
        case 'SeaLevel':
          this.set_altType(3);
          break;
        case 'Terrain':
          this.set_altType(4);
          break;
        default:
          break;
      }
      this.set_markerMix(0);
      switch (node.attributes.getNamedItem('ColorMap').nodeValue) {
        case 'Same_For_All':
          this.set__colorMap(0);
          break;
        case 'Group_by_Values':
          this.set__colorMap(2);
          break;
        case 'Per_Column_Literal':
          this.set__colorMap(3);
          break;
        default:
          break;
      }
      this.set_markerColumn(parseInt(node.attributes.getNamedItem('MarkerColumn').nodeValue));
      this.set_colorMapColumn(parseInt(node.attributes.getNamedItem('ColorMapColumn').nodeValue));
      switch (node.attributes.getNamedItem('PlotType').nodeValue) {
        case 'Gaussian':
          this.set_plotType(0);
          break;
        case 'Point':
          this.set_plotType(1);
          break;
        case 'Circle':
          this.set_plotType(2);
          break;
        case 'PushPin':
          this.set_plotType(4);
          break;
        default:
          break;
      }
      this.set_markerIndex(parseInt(node.attributes.getNamedItem('MarkerIndex').nodeValue));
      switch (node.attributes.getNamedItem('MarkerScale').nodeValue) {
        case 'Screen':
          this.set_markerScale(0);
          break;
        case 'World':
          this.set_markerScale(1);
          break;
        default:
          break;
      }
      switch (node.attributes.getNamedItem('AltUnit').nodeValue) {
        case 'Meters':
          this.set_altUnit(1);
          break;
        case 'Feet':
          this.set_altUnit(2);
          break;
        case 'Inches':
          this.set_altUnit(3);
          break;
        case 'Miles':
          this.set_altUnit(4);
          break;
        case 'Kilometers':
          this.set_altUnit(5);
          break;
        case 'AstronomicalUnits':
          this.set_altUnit(6);
          break;
        case 'LightYears':
          this.set_altUnit(7);
          break;
        case 'Parsecs':
          this.set_altUnit(8);
          break;
        case 'MegaParsecs':
          this.set_altUnit(9);
          break;
        case 'Custom':
          this.set_altUnit(10);
          break;
        default:
          break;
      }
      this.set_altColumn(parseInt(node.attributes.getNamedItem('AltColumn').nodeValue));
      this.set_startDateColumn(parseInt(node.attributes.getNamedItem('StartDateColumn').nodeValue));
      this.set_endDateColumn(parseInt(node.attributes.getNamedItem('EndDateColumn').nodeValue));
      this.set_sizeColumn(parseInt(node.attributes.getNamedItem('SizeColumn').nodeValue));
      this.set_hyperlinkFormat(node.attributes.getNamedItem('HyperlinkFormat').nodeValue);
      this.set_hyperlinkColumn(parseInt(node.attributes.getNamedItem('HyperlinkColumn').nodeValue));
      this.set_scaleFactor(parseFloat(node.attributes.getNamedItem('ScaleFactor').nodeValue));
      switch (node.attributes.getNamedItem('PointScaleType').nodeValue) {
        case 'Linear':
          this.set_pointScaleType(0);
          break;
        case 'Power':
          this.set_pointScaleType(1);
          break;
        case 'Log':
          this.set_pointScaleType(2);
          break;
        case 'Constant':
          this.set_pointScaleType(3);
          break;
        case 'StellarMagnitude':
          this.set_pointScaleType(4);
          break;
        default:
          break;
      }
      if (node.attributes.getNamedItem('ShowFarSide') != null) {
        this.set_showFarSide(ss.boolean(node.attributes.getNamedItem('ShowFarSide').nodeValue));
      }
      if (node.attributes.getNamedItem('RaUnits') != null) {
        switch (node.attributes.getNamedItem('RaUnits').nodeValue) {
          case 'Hours':
            this.set_raUnits(0);
            break;
          case 'Degrees':
            this.set_raUnits(1);
            break;
        }
      }
      if (node.attributes.getNamedItem('HoverTextColumn') != null) {
        this.set_nameColumn(parseInt(node.attributes.getNamedItem('HoverTextColumn').nodeValue));
      }
      if (node.attributes.getNamedItem('XAxisColumn') != null) {
        this.set_xAxisColumn(parseInt(node.attributes.getNamedItem('XAxisColumn').nodeValue));
        this.set_xAxisReverse(ss.boolean(node.attributes.getNamedItem('XAxisReverse').nodeValue));
        this.set_yAxisColumn(parseInt(node.attributes.getNamedItem('YAxisColumn').nodeValue));
        this.set_yAxisReverse(ss.boolean(node.attributes.getNamedItem('YAxisReverse').nodeValue));
        this.set_zAxisColumn(parseInt(node.attributes.getNamedItem('ZAxisColumn').nodeValue));
        this.set_zAxisReverse(ss.boolean(node.attributes.getNamedItem('ZAxisReverse').nodeValue));
        switch (node.attributes.getNamedItem('CartesianScale').nodeValue) {
          case 'Meters':
            this.set_cartesianScale(1);
            break;
          case 'Feet':
            this.set_cartesianScale(2);
            break;
          case 'Inches':
            this.set_cartesianScale(3);
            break;
          case 'Miles':
            this.set_cartesianScale(4);
            break;
          case 'Kilometers':
            this.set_cartesianScale(5);
            break;
          case 'AstronomicalUnits':
            this.set_cartesianScale(6);
            break;
          case 'LightYears':
            this.set_cartesianScale(7);
            break;
          case 'Parsecs':
            this.set_cartesianScale(8);
            break;
          case 'MegaParsecs':
            this.set_cartesianScale(9);
            break;
          case 'Custom':
            this.set_cartesianScale(10);
            break;
          default:
            break;
        }
        this.set_cartesianCustomScale(parseFloat(node.attributes.getNamedItem('CartesianCustomScale').nodeValue));
      }
      if (node.attributes.getNamedItem('DynamicData') != null) {
        this.set_dynamicData(ss.boolean(node.attributes.getNamedItem('DynamicData').nodeValue));
        this.set_autoUpdate(ss.boolean(node.attributes.getNamedItem('AutoUpdate').nodeValue));
        this.set_dataSourceUrl(node.attributes.getNamedItem('DataSourceUrl').nodeValue);
      }
    },
    computeDateDomainRange: (columnStart, columnEnd) => {
    },
    getDomainValues: column => [],
    get_decay: function () {
      return this.decay;
    },
    set_decay: function (value) {
      if (this.decay !== value) {
        this.version++;
        this.decay = value;
      }
      return value;
    },
    get_coordinatesType: function () {
      return this._coordinatesType$1;
    },
    set_coordinatesType: function (value) {
      if (this._coordinatesType$1 !== value) {
        this.version++;
        this._coordinatesType$1 = value;
      }
      return value;
    },
    get_latColumn: function () {
      return this.latColumn;
    },
    set_latColumn: function (value) {
      if (this.latColumn !== value) {
        this.version++;
        this.latColumn = value;
      }
      return value;
    },
    get_lngColumn: function () {
      return this.lngColumn;
    },
    set_lngColumn: function (value) {
      if (this.lngColumn !== value) {
        this.version++;
        this.lngColumn = value;
      }
      return value;
    },
    get_geometryColumn: function () {
      return this.geometryColumn;
    },
    set_geometryColumn: function (value) {
      if (this.geometryColumn !== value) {
        this.version++;
        this.geometryColumn = value;
      }
      return value;
    },
    get_xAxisColumn: function () {
      return this._xAxisColumn$1;
    },
    set_xAxisColumn: function (value) {
      if (this._xAxisColumn$1 !== value) {
        this.version++;
        this._xAxisColumn$1 = value;
      }
      return value;
    },
    get_yAxisColumn: function () {
      return this._yAxisColumn$1;
    },
    set_yAxisColumn: function (value) {
      if (this._yAxisColumn$1 !== value) {
        this.version++;
        this._yAxisColumn$1 = value;
      }
      return value;
    },
    get_zAxisColumn: function () {
      return this._zAxisColumn$1;
    },
    set_zAxisColumn: function (value) {
      if (this._zAxisColumn$1 !== value) {
        this.version++;
        this._zAxisColumn$1 = value;
      }
      return value;
    },
    get_xAxisReverse: function () {
      return this._xAxisReverse$1;
    },
    set_xAxisReverse: function (value) {
      if (this._xAxisReverse$1 !== value) {
        this.version++;
        this._xAxisReverse$1 = value;
      }
      return value;
    },
    get_yAxisReverse: function () {
      return this._yAxisReverse$1;
    },
    set_yAxisReverse: function (value) {
      if (this._yAxisReverse$1 !== value) {
        this.version++;
        this._yAxisReverse$1 = value;
      }
      return value;
    },
    get_zAxisReverse: function () {
      return this._zAxisReverse$1;
    },
    set_zAxisReverse: function (value) {
      if (this._zAxisReverse$1 !== value) {
        this.version++;
        this._zAxisReverse$1 = value;
      }
      return value;
    },
    get_altType: function () {
      return this._altType$1;
    },
    set_altType: function (value) {
      if (this._altType$1 !== value) {
        this.version++;
        this._altType$1 = value;
      }
      return value;
    },
    get_markerMix: function () {
      return this._markerMix$1;
    },
    set_markerMix: function (value) {
      if (this._markerMix$1 !== value) {
        this.version++;
        this._markerMix$1 = value;
      }
      return value;
    },
    get_raUnits: function () {
      return this._raUnits$1;
    },
    set_raUnits: function (value) {
      if (this._raUnits$1 !== value) {
        this.version++;
        this._raUnits$1 = value;
      }
      return value;
    },
    get__colorMap: function () {
      return this._colorMap$1;
    },
    set__colorMap: function (value) {
      if (this._colorMap$1 !== value) {
        this.version++;
        this._colorMap$1 = value;
      }
      return value;
    },
    get_markerColumn: function () {
      return this._markerColumn$1;
    },
    set_markerColumn: function (value) {
      if (this._markerColumn$1 !== value) {
        this.version++;
        this._markerColumn$1 = value;
      }
      return value;
    },
    get_colorMapColumn: function () {
      return this._colorMapColumn$1;
    },
    set_colorMapColumn: function (value) {
      if (this._colorMapColumn$1 !== value) {
        this.version++;
        this._colorMapColumn$1 = value;
      }
      return value;
    },
    get_plotType: function () {
      return this._plotType$1;
    },
    set_plotType: function (value) {
      if (this._plotType$1 !== value) {
        this.version++;
        this._plotType$1 = value;
      }
      return value;
    },
    get_markerIndex: function () {
      return this._markerIndex$1;
    },
    set_markerIndex: function (value) {
      if (this._markerIndex$1 !== value) {
        this.version++;
        this._markerIndex$1 = value;
      }
      return value;
    },
    get_showFarSide: function () {
      return this._showFarSide$1;
    },
    set_showFarSide: function (value) {
      if (this._showFarSide$1 !== value) {
        this.version++;
        this._showFarSide$1 = value;
      }
      return value;
    },
    get_markerScale: function () {
      return this._markerScale$1;
    },
    set_markerScale: function (value) {
      if (this._markerScale$1 !== value) {
        this.version++;
        this._markerScale$1 = value;
      }
      return value;
    },
    get_altUnit: function () {
      return this._altUnit$1;
    },
    set_altUnit: function (value) {
      if (this._altUnit$1 !== value) {
        this.version++;
        this._altUnit$1 = value;
      }
      return value;
    },
    get_cartesianScale: function () {
      return this._cartesianScale$1;
    },
    set_cartesianScale: function (value) {
      if (this._cartesianScale$1 !== value) {
        this.version++;
        this._cartesianScale$1 = value;
      }
      return value;
    },
    get_cartesianCustomScale: function () {
      return this._cartesianCustomScale$1;
    },
    set_cartesianCustomScale: function (value) {
      if (this._cartesianCustomScale$1 !== value) {
        this.version++;
        this._cartesianCustomScale$1 = value;
      }
      return value;
    },
    get_altColumn: function () {
      return this.altColumn;
    },
    set_altColumn: function (value) {
      if (this.altColumn !== value) {
        this.version++;
        this.altColumn = value;
      }
      return value;
    },
    get_startDateColumn: function () {
      return this.startDateColumn;
    },
    set_startDateColumn: function (value) {
      if (this.startDateColumn !== value) {
        this.version++;
        this.startDateColumn = value;
      }
      return value;
    },
    get_endDateColumn: function () {
      return this.endDateColumn;
    },
    set_endDateColumn: function (value) {
      if (this.endDateColumn !== value) {
        this.version++;
        this.endDateColumn = value;
      }
      return value;
    },
    get_sizeColumn: function () {
      return this.sizeColumn;
    },
    set_sizeColumn: function (value) {
      if (this.sizeColumn !== value) {
        this.version++;
        this.sizeColumn = value;
      }
      return value;
    },
    get_nameColumn: function () {
      return this.nameColumn;
    },
    set_nameColumn: function (value) {
      if (this.nameColumn !== value) {
        this.version++;
        this.nameColumn = value;
      }
      return value;
    },
    get_hyperlinkFormat: function () {
      return this._hyperlinkFormat$1;
    },
    set_hyperlinkFormat: function (value) {
      if (this._hyperlinkFormat$1 !== value) {
        this.version++;
        this._hyperlinkFormat$1 = value;
      }
      return value;
    },
    get_hyperlinkColumn: function () {
      return this._hyperlinkColumn$1;
    },
    set_hyperlinkColumn: function (value) {
      if (this._hyperlinkColumn$1 !== value) {
        this.version++;
        this._hyperlinkColumn$1 = value;
      }
      return value;
    },
    get_scaleFactor: function () {
      return this.scaleFactor;
    },
    set_scaleFactor: function (value) {
      if (this.scaleFactor !== value) {
        this.version++;
        this.scaleFactor = value;
      }
      return value;
    },
    get_pointScaleType: function () {
      return this.pointScaleType;
    },
    set_pointScaleType: function (value) {
      if (this.pointScaleType !== value) {
        this.version++;
        this.pointScaleType = value;
      }
      return value;
    },
    prepVertexBuffer: (renderContext, opacity) => true,
    draw: function (renderContext, opacity, flat) {
      const device = renderContext;
      if (this.version !== this.lastVersion) {
        this.cleanUp();
      }
      if (this.bufferIsFlat !== flat) {
        this.cleanUp();
        this.bufferIsFlat = flat;
      }
      if (this.dirty) {
        this.prepVertexBuffer(device, opacity);
      }
      const jNow = SpaceTimeController.get_jNow() - SpaceTimeController.utcToJulian(this.baseDate);
      let adjustedScale = this.scaleFactor;
      if (flat && this.astronomical && (this._markerScale$1 === 1)) {
        adjustedScale = (this.scaleFactor / (renderContext.viewCamera.zoom / 360));
      }
      if (this.triangleList2d != null) {
        this.triangleList2d.decay = this.decay;
        this.triangleList2d.sky = this.get_astronomical();
        this.triangleList2d.timeSeries = this.timeSeries;
        this.triangleList2d.jNow = jNow;
        this.triangleList2d.draw(renderContext, opacity * this.get_opacity(), 1);
      }
      if (this.triangleList != null) {
        this.triangleList.decay = this.decay;
        this.triangleList.sky = this.get_astronomical();
        this.triangleList.timeSeries = this.timeSeries;
        this.triangleList.jNow = jNow;
        this.triangleList.draw(renderContext, opacity * this.get_opacity(), 1);
      }
      if (this.pointList != null) {
        this.pointList.depthBuffered = false;
        this.pointList.decay = this.decay;
        this.pointList.sky = this.get_astronomical();
        this.pointList.timeSeries = this.timeSeries;
        this.pointList.jNow = jNow;
        this.pointList.scale = (this._markerScale$1 === 1) ? adjustedScale : -adjustedScale;
        this.pointList.draw(renderContext, opacity * this.get_opacity(), false);
      }
      if (this.lineList != null) {
        this.lineList.sky = this.get_astronomical();
        this.lineList.decay = this.decay;
        this.lineList.timeSeries = this.timeSeries;
        this.lineList.jNow = jNow;
        this.lineList.drawLines(renderContext, opacity * this.get_opacity());
      }
      if (this.lineList2d != null) {
        this.lineList2d.sky = this.get_astronomical();
        this.lineList2d.decay = this.decay;
        this.lineList2d.timeSeries = this.timeSeries;
        this.lineList2d.showFarSide = this.get_showFarSide();
        this.lineList2d.jNow = jNow;
        this.lineList2d.drawLines(renderContext, opacity * this.get_opacity());
      }
      return true;
    },
    initFromXml: function (node) {
      Layer.prototype.initFromXml.call(this, node);
    },
    cleanUp: function () {
      if (this.lineList != null) {
        this.lineList.clear();
      }
      if (this.lineList2d != null) {
        this.lineList2d.clear();
      }
      if (this.triangleList2d != null) {
        this.triangleList2d.clear();
      }
      if (this.pointList != null) {
        this.pointList.clear();
      }
      if (this.triangleList != null) {
        this.triangleList.clear();
      }
    },
    dynamicUpdate: () => false
  };

  function PlotTile() {
    this._topDown$1 = true;
    this.backslash = false;
    this._vertexList$1 = null;
    this._childTriangleList$1 = null;
    this._stars$1 = [];
    this._subDivisionLevel$1 = 4;
    this._subDivided$1 = false;
    Tile.call(this);
  }
  PlotTile.create = (level, xc, yc, dataset, parent) => {
    const temp = new PlotTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = xc;
    temp.tileY = yc;
    temp.dataset = dataset;
    temp._topDown$1 = !dataset.get_bottomsUp();
    if (temp.tileX !== xc) {
      alert('bad');
    }
    if (!!dataset.get_meanRadius()) {
      temp.set__demScaleFactor(dataset.get_meanRadius());
    }
    else {
      if (!dataset.get_dataSetType()) {
        temp.set__demScaleFactor(6371000);
      }
      else {
        temp.set__demScaleFactor(3396010);
      }
    }
    temp.computeBoundingSphere();
    return temp;
  };
  const PlotTile$ = {
    computeBoundingSphere: function () {
      this._initializeGrids$1();
      this.topLeft = this.bounds[0 + 3 * 0].position.copy();
      this.bottomRight = this.bounds[2 + 3 * 2].position.copy();
      this.topRight = this.bounds[2 + 3 * 0].position.copy();
      this.bottomLeft = this.bounds[0 + 3 * 2].position.copy();
      this.calcSphere();
    },
    renderPart: function (renderContext, part, opacity, combine) {
      if (renderContext.gl != null) {
      } else {
        if (!part) {
          const $enum1 = ss.enumerate(this._stars$1);
          while ($enum1.moveNext()) {
            const star = $enum1.current;
            const radDec = 25 / Math.pow(1.6, star.magnitude);
            Planets.drawPointPlanet(renderContext, star.position, radDec, star.col, false);
          }
        }
      }
    },
    requestImage: function () {
      if (!this.downloading && !this.readyToRender) {
        this.downloading = true;
        this._webFile$1 = new WebFile(Util.getProxiedUrl(this.get_URL()));
        this._webFile$1.onStateChange = ss.bind('fileStateChange', this);
        this._webFile$1.send();
      }
    },
    fileStateChange: function () {
      if (this._webFile$1.get_state() === 2) {
        this.downloading = false;
        this.readyToRender = false;
        this.errored = true;
        this.requestPending = false;
        TileCache.removeFromQueue(this.get_key(), true);
      } else if (this._webFile$1.get_state() === 1) {
        this.texReady = true;
        this.downloading = false;
        this.errored = false;
        this.readyToRender = this.texReady && (this.demReady || !this.demTile);
        this.requestPending = false;
        TileCache.removeFromQueue(this.get_key(), true);
        this._loadData$1(this._webFile$1.getText());
      }
    },
    _loadData$1: function (data) {
      const rows = ss.replaceString(data, '\r\n', '\n').split('\n');
      let firstRow = true;
      const type = 0;
      let star = null;
      const $enum1 = ss.enumerate(rows);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        if (firstRow) {
          firstRow = false;
          continue;
        }
        if (ss.trim(row).length > 5) {
          star = new Star(row);
          star.position = Coordinates.raDecTo3dAu(star.RA, star.dec, 1);
          this._stars$1.push(star);
        }
      }
    },
    isPointInTile: function (lat, lng) {
      if (!this.level) {
        return true;
      }
      if (this.level === 1) {
        if ((lng >= 0 && lng <= 90) && (!this.tileX && this.tileY === 1)) {
          return true;
        }
        if ((lng > 90 && lng <= 180) && (this.tileX === 1 && this.tileY === 1)) {
          return true;
        }
        if ((lng < 0 && lng >= -90) && (!this.tileX && !this.tileY)) {
          return true;
        }
        if ((lng < -90 && lng >= -180) && (this.tileX === 1 && !this.tileY)) {
          return true;
        }
        return false;
      }
      if (!this.demReady || this.demData == null) {
        return false;
      }
      const testPoint = Coordinates.geoTo3dDouble(-lat, lng);
      const top = this._isLeftOfHalfSpace$1(this.topLeft.copy(), this.topRight.copy(), testPoint);
      const right = this._isLeftOfHalfSpace$1(this.topRight.copy(), this.bottomRight.copy(), testPoint);
      const bottom = this._isLeftOfHalfSpace$1(this.bottomRight.copy(), this.bottomLeft.copy(), testPoint);
      const left = this._isLeftOfHalfSpace$1(this.bottomLeft.copy(), this.topLeft.copy(), testPoint);
      if (top && right && bottom && left) {
        return true;
      }
      return false;
    },
    _isLeftOfHalfSpace$1: (pntA, pntB, pntTest) => {
      pntA.normalize();
      pntB.normalize();
      const cross = Vector3d.cross(pntA, pntB);
      const dot = Vector3d.dot(cross, pntTest);
      return dot < 0;
    },
    _initializeGrids$1: function () {
      this._vertexList$1 = [];
      this._childTriangleList$1 = new Array(4);
      this._childTriangleList$1[0] = [];
      this._childTriangleList$1[1] = [];
      this._childTriangleList$1[2] = [];
      this._childTriangleList$1[3] = [];
      this.bounds = new Array(9);
      if (this.level > 0) {
        if (this.parent == null) {
          this.parent = TileCache.getTile(this.level - 1, this.tileX / 2, this.tileY / 2, this.dataset, null);
        }
        const parent = this.parent;
        const xIndex = this.tileX % 2;
        const yIndex = this.tileY % 2;
        if (this.level > 1) {
          this.backslash = parent.backslash;
        } else {
          this.backslash = (xIndex === 1 ^ yIndex === 1) === 1;
        }
        this.bounds[0 + 3 * 0] = parent.bounds[xIndex + 3 * yIndex].copy();
        this.bounds[1 + 3 * 0] = this._midpoint$1(parent.bounds[xIndex + 3 * yIndex], parent.bounds[xIndex + 1 + 3 * yIndex]);
        this.bounds[2 + 3 * 0] = parent.bounds[xIndex + 1 + 3 * yIndex].copy();
        this.bounds[0 + 3 * 1] = this._midpoint$1(parent.bounds[xIndex + 3 * yIndex], parent.bounds[xIndex + 3 * (yIndex + 1)]);
        if (this.backslash) {
          this.bounds[1 + 3 * 1] = this._midpoint$1(parent.bounds[xIndex + 3 * yIndex], parent.bounds[xIndex + 1 + 3 * (yIndex + 1)]);
        } else {
          this.bounds[1 + 3 * 1] = this._midpoint$1(parent.bounds[xIndex + 1 + 3 * yIndex], parent.bounds[xIndex + 3 * (yIndex + 1)]);
        }
        this.bounds[2 + 3 * 1] = this._midpoint$1(parent.bounds[xIndex + 1 + 3 * yIndex], parent.bounds[xIndex + 1 + 3 * (yIndex + 1)]);
        this.bounds[0 + 3 * 2] = parent.bounds[xIndex + 3 * (yIndex + 1)].copy();
        this.bounds[1 + 3 * 2] = this._midpoint$1(parent.bounds[xIndex + 3 * (yIndex + 1)], parent.bounds[xIndex + 1 + 3 * (yIndex + 1)]);
        this.bounds[2 + 3 * 2] = parent.bounds[xIndex + 1 + 3 * (yIndex + 1)].copy();
        this.bounds[0 + 3 * 0].tu = 0 * Tile.uvMultiple;
        this.bounds[0 + 3 * 0].tv = 0 * Tile.uvMultiple;
        this.bounds[1 + 3 * 0].tu = 0.5 * Tile.uvMultiple;
        this.bounds[1 + 3 * 0].tv = 0 * Tile.uvMultiple;
        this.bounds[2 + 3 * 0].tu = 1 * Tile.uvMultiple;
        this.bounds[2 + 3 * 0].tv = 0 * Tile.uvMultiple;
        this.bounds[0 + 3 * 1].tu = 0 * Tile.uvMultiple;
        this.bounds[0 + 3 * 1].tv = 0.5 * Tile.uvMultiple;
        this.bounds[1 + 3 * 1].tu = 0.5 * Tile.uvMultiple;
        this.bounds[1 + 3 * 1].tv = 0.5 * Tile.uvMultiple;
        this.bounds[2 + 3 * 1].tu = 1 * Tile.uvMultiple;
        this.bounds[2 + 3 * 1].tv = 0.5 * Tile.uvMultiple;
        this.bounds[0 + 3 * 2].tu = 0 * Tile.uvMultiple;
        this.bounds[0 + 3 * 2].tv = 1 * Tile.uvMultiple;
        this.bounds[1 + 3 * 2].tu = 0.5 * Tile.uvMultiple;
        this.bounds[1 + 3 * 2].tv = 1 * Tile.uvMultiple;
        this.bounds[2 + 3 * 2].tu = 1 * Tile.uvMultiple;
        this.bounds[2 + 3 * 2].tv = 1 * Tile.uvMultiple;
      } else {
        this.bounds[0 + 3 * 0] = PositionTexture.create(0, -1, 0, 0, 0);
        this.bounds[1 + 3 * 0] = PositionTexture.create(0, 0, 1, 0.5, 0);
        this.bounds[2 + 3 * 0] = PositionTexture.create(0, -1, 0, 1, 0);
        this.bounds[0 + 3 * 1] = PositionTexture.create(-1, 0, 0, 0, 0.5);
        this.bounds[1 + 3 * 1] = PositionTexture.create(0, 1, 0, 0.5, 0.5);
        this.bounds[2 + 3 * 1] = PositionTexture.create(1, 0, 0, 1, 0.5);
        this.bounds[0 + 3 * 2] = PositionTexture.create(0, -1, 0, 0, 1);
        this.bounds[1 + 3 * 2] = PositionTexture.create(0, 0, -1, 0.5, 1);
        this.bounds[2 + 3 * 2] = PositionTexture.create(0, -1, 0, 1, 1);
      }
    },
    _midpoint$1: (positionNormalTextured, positionNormalTextured_2) => {
      const a1 = Vector3d.lerp(positionNormalTextured.position, positionNormalTextured_2.position, 0.5);
      const a1uv = Vector2d.lerp(Vector2d.create(positionNormalTextured.tu, positionNormalTextured.tv), Vector2d.create(positionNormalTextured_2.tu, positionNormalTextured_2.tv), 0.5);
      a1.normalize();
      return PositionTexture.createPos(a1, a1uv.x, a1uv.y);
    },
    createGeometry: function (renderContext) {
      if (this.geometryCreated) {
        return true;
      }
      this.geometryCreated = true;
      Tile.prototype.createGeometry.call(this, renderContext);
      return true;
    },
    cleanUp: function (removeFromParent) {
      Tile.prototype.cleanUp.call(this, removeFromParent);
      if (this._vertexList$1 != null) {
        this._vertexList$1 = null;
      }
      if (this._childTriangleList$1 != null) {
        this._childTriangleList$1 = null;
      }
      this._subDivided$1 = false;
      this.demArray = null;
    }
  };

  function SkyImageTile() {
    this.pixelCenterX = 0;
    this.pixelCenterY = 0;
    this.latCenter = 0;
    this.lngCenter = 0;
    this.rotation = 0;
    this.scaleX = 0.01;
    this.scaleY = 0.01;
    this.height = 0;
    this.width = 0;
    this._vertexList$1 = null;
    this._childTriangleList$1 = null;
    Tile.call(this);
  }
  SkyImageTile.create = (level, x, y, dataset, parent) => {
    const temp = new SkyImageTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = x;
    temp.tileY = y;
    temp.dataset = dataset;
    temp._getParameters$1();
    temp.computeMatrix();
    temp.sphereCenter = temp.geoTo3dTan(0, 0);
    temp.radius = 1.25;
    return temp;
  };
  const SkyImageTile$ = {
    computeMatrix: function () {
      this.matrix = Matrix3d.get_identity();
      this.matrix._multiply(Matrix3d._rotationX((this.rotation / 180 * Math.PI)));
      this.matrix._multiply(Matrix3d._rotationZ((this.latCenter / 180 * Math.PI)));
      this.matrix._multiply(Matrix3d._rotationY(((360 - this.lngCenter) / 180 * Math.PI)));
    },
    _getParameters$1: function () {
      this.pixelCenterX = this.dataset.get_offsetX();
      this.pixelCenterY = this.dataset.get_offsetY();
      this.latCenter = this.dataset.get_centerY();
      this.lngCenter = this.dataset.get_centerX();
      this.rotation = this.dataset.get_rotation();
      this.scaleX = -(this.scaleY = this.dataset.get_baseTileDegrees());
      if (this.dataset.get_bottomsUp()) {
        this.scaleX = -this.scaleX;
        this.rotation = 360 - this.rotation;
      }
    },
    geoTo3dTan: function (lat, lng) {
      lng = -lng;
      const fac1 = this.dataset.get_baseTileDegrees();
      const factor = Math.tan(fac1 * Tile.RC);
      return this.matrix.transform(Vector3d.create(1, (lat / fac1 * factor), (lng / fac1 * factor)));
    },
    createGeometry: function (renderContext) {
      Tile.prototype.createGeometry.call(this, renderContext);
      if (this.geometryCreated) {
        return true;
      }
      let bmp = null;
      if (this.dataset.get_wcsImage() != null) {
        const wcsImage = ss.safeCast(this.dataset.get_wcsImage(), WcsImage);
        bmp = wcsImage.getBitmap();
        this.texture2d = bmp.getTexture();
        if (bmp.height !== wcsImage.get_sizeY()) {
          this.pixelCenterY += bmp.height - wcsImage.get_sizeY();
        }
      }
      this.geometryCreated = true;
      for (let i = 0; i < 4; i++) {
        this._renderTriangleLists[i] = [];
      }
      this.computeMatrix();
      if (bmp != null && renderContext.gl != null) {
        this.height = bmp.height;
        this.width = bmp.width;
      } else {
        this.height = this.texture.naturalHeight;
        this.width = this.texture.naturalWidth;
      }
      const latMin = 0 + (this.scaleY * (this.height - this.pixelCenterY));
      const latMax = 0 - (this.scaleY * this.pixelCenterY);
      const lngMin = 0 + (this.scaleX * this.pixelCenterX);
      const lngMax = 0 - (this.scaleX * (this.width - this.pixelCenterX));
      this.topLeft = this.geoTo3dTan(latMin, lngMin);
      this.bottomRight = this.geoTo3dTan(latMax, lngMax);
      this.topRight = this.geoTo3dTan(latMin, lngMax);
      this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
      const topCenter = Vector3d.lerp(this.topLeft, this.topRight, 0.5);
      const bottomCenter = Vector3d.lerp(this.bottomLeft, this.bottomRight, 0.5);
      const center = Vector3d.lerp(topCenter, bottomCenter, 0.5);
      const rightCenter = Vector3d.lerp(this.topRight, this.bottomRight, 0.5);
      const leftCenter = Vector3d.lerp(this.topLeft, this.bottomLeft, 0.5);
      if (renderContext.gl == null) {
        this._vertexList$1 = [];
        this._vertexList$1.push(PositionTexture.createPosSize(this.topLeft, 0, 0, this.width, this.height));
        this._vertexList$1.push(PositionTexture.createPosSize(this.topRight, 1, 0, this.width, this.height));
        this._vertexList$1.push(PositionTexture.createPosSize(this.bottomLeft, 0, 1, this.width, this.height));
        this._vertexList$1.push(PositionTexture.createPosSize(this.bottomRight, 1, 1, this.width, this.height));
        this._childTriangleList$1 = [];
        if (this.dataset.get_bottomsUp()) {
          this._childTriangleList$1.push(Triangle.create(0, 1, 2));
          this._childTriangleList$1.push(Triangle.create(2, 1, 3));
        } else {
          this._childTriangleList$1.push(Triangle.create(0, 2, 1));
          this._childTriangleList$1.push(Triangle.create(2, 3, 1));
        }
        let count = 3;
        while (count-- > 1) {
          const newList = [];
          const $enum1 = ss.enumerate(this._childTriangleList$1);
          while ($enum1.moveNext()) {
            var tri = $enum1.current;
            tri.subDivide(newList, this._vertexList$1);
          }
          this._childTriangleList$1 = newList;
        }
        const miter = 0.6 / (this.width / 256);
        const $enum2 = ss.enumerate(this._childTriangleList$1);
        while ($enum2.moveNext()) {
          var tri = $enum2.current;
          const p1 = this._vertexList$1[tri.a];
          const p2 = this._vertexList$1[tri.b];
          const p3 = this._vertexList$1[tri.c];
          this._renderTriangleLists[0].push(RenderTriangle.createWithMiter(p1, p2, p3, this.texture, this.level, miter));
        }
      } else {
        this._vertexBuffer = Tile.prepDevice.createBuffer();
        Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
        const f32array = new Float32Array(9 * 5);
        const buffer = f32array;
        let index = 0;
        index = this.addVertex(buffer, index, PositionTexture.createPos(bottomCenter, 0.5, 1));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.bottomLeft, 0, 1));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.bottomRight, 1, 1));
        index = this.addVertex(buffer, index, PositionTexture.createPos(center, 0.5, 0.5));
        index = this.addVertex(buffer, index, PositionTexture.createPos(leftCenter, 0, 0.5));
        index = this.addVertex(buffer, index, PositionTexture.createPos(rightCenter, 1, 0.5));
        index = this.addVertex(buffer, index, PositionTexture.createPos(topCenter, 0.5, 0));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.topLeft, 0, 0));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.topRight, 1, 0));
        Tile.prepDevice.bufferData(34962, f32array, 35044);
        for (let i = 0; i < 4; i++) {
          index = 0;
          this.triangleCount = 2;
          const ui16array = new Uint16Array(this.triangleCount * 3);
          const indexArray = ui16array;
          switch (i) {
            case 0:
              indexArray[index++] = 7;
              indexArray[index++] = 4;
              indexArray[index++] = 6;
              indexArray[index++] = 4;
              indexArray[index++] = 3;
              indexArray[index++] = 6;
              break;
            case 1:
              indexArray[index++] = 6;
              indexArray[index++] = 5;
              indexArray[index++] = 8;
              indexArray[index++] = 6;
              indexArray[index++] = 3;
              indexArray[index++] = 5;
              break;
            case 2:
              indexArray[index++] = 4;
              indexArray[index++] = 0;
              indexArray[index++] = 3;
              indexArray[index++] = 4;
              indexArray[index++] = 1;
              indexArray[index++] = 0;
              break;
            case 3:
              indexArray[index++] = 3;
              indexArray[index++] = 2;
              indexArray[index++] = 5;
              indexArray[index++] = 3;
              indexArray[index++] = 0;
              indexArray[index++] = 2;
              break;
          }
          this._indexBuffers[i] = Tile.prepDevice.createBuffer();
          Tile.prepDevice.bindBuffer(34963, this._indexBuffers[i]);
          Tile.prepDevice.bufferData(34963, ui16array, 35044);
        }
      }
      return true;
    }
  };

  function TangentTile() {
    this._topDown$1 = true;
    Tile.call(this);
  }
  TangentTile.create = (level, x, y, dataset, parent) => {
    const temp = new TangentTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = x;
    temp.tileY = y;
    temp.dataset = dataset;
    temp._topDown$1 = !dataset.get_bottomsUp();
    temp.computeBoundingSphere();
    return temp;
  };
  const TangentTile$ = {
    computeBoundingSphere: function () {
      if (!this._topDown$1) {
        this.computeBoundingSphereBottomsUp();
        return;
      }
      let tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
      const latMin = ((this.dataset.get_baseTileDegrees() / 2 - ((this.tileY) * tileDegrees)) + this.dataset.get_offsetY());
      const latMax = ((this.dataset.get_baseTileDegrees() / 2 - (((this.tileY + 1)) * tileDegrees)) + this.dataset.get_offsetY());
      const lngMin = (((this.tileX * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
      const lngMax = (((((this.tileX + 1)) * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
      const latCenter = (latMin + latMax) / 2;
      const lngCenter = (lngMin + lngMax) / 2;
      this.sphereCenter = this.geoTo3dTan(latCenter, lngCenter);
      this.topLeft = this.geoTo3dTan(latMin, lngMin);
      this.bottomRight = this.geoTo3dTan(latMax, lngMax);
      this.topRight = this.geoTo3dTan(latMin, lngMax);
      this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
      const distVect = this.geoTo3dTan(latMin, lngMin);
      tileDegrees = lngMax - lngMin;
      distVect.subtract(this.sphereCenter);
      this.sphereRadius = distVect.length();
    },
    geoTo3dTan: function (lat, lng) {
      lng = -lng;
      const fac1 = this.dataset.get_baseTileDegrees() / 2;
      const factor = Math.tan(fac1 * Tile.RC);
      return this.dataset.get_matrix().transform(Vector3d.create(1, (lat / fac1 * factor), (lng / fac1 * factor)));
    },
    computeBoundingSphereBottomsUp: function () {
      let tileDegrees = this.dataset.get_baseTileDegrees() / (Math.pow(2, this.level));
      const latMin = (this.dataset.get_baseTileDegrees() / 2 + (((this.tileY + 1)) * tileDegrees)) + this.dataset.get_offsetY();
      const latMax = (this.dataset.get_baseTileDegrees() / 2 + ((this.tileY) * tileDegrees)) + this.dataset.get_offsetY();
      const lngMin = ((this.tileX * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX();
      const lngMax = ((((this.tileX + 1)) * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX();
      const latCenter = (latMin + latMax) / 2;
      const lngCenter = (lngMin + lngMax) / 2;
      this.topLeft = this.geoTo3dTan(latMin, lngMin);
      this.bottomRight = this.geoTo3dTan(latMax, lngMax);
      this.topRight = this.geoTo3dTan(latMin, lngMax);
      this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
      const distVect = this.topLeft;
      tileDegrees = lngMax - lngMin;
    },
    createGeometry: function (renderContext) {
      Tile.prototype.createGeometry.call(this, renderContext);
      if (this.geometryCreated) {
        return true;
      }
      this.geometryCreated = true;
      for (let i = 0; i < 4; i++) {
        this._renderTriangleLists[i] = [];
      }
      const tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
      const latMin = ((this.dataset.get_baseTileDegrees() / 2 - ((this.tileY) * tileDegrees)) + this.dataset.get_offsetY());
      const latMax = ((this.dataset.get_baseTileDegrees() / 2 - (((this.tileY + 1)) * tileDegrees)) + this.dataset.get_offsetY());
      const lngMin = (((this.tileX * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
      const lngMax = (((((this.tileX + 1)) * tileDegrees) - this.dataset.get_baseTileDegrees() / this.dataset.get_widthFactor()) + this.dataset.get_offsetX());
      const tileDegreesX = lngMax - lngMin;
      const tileDegreesY = latMax - latMin;
      this.topLeft = this.geoTo3dTan(latMin, lngMin);
      this.bottomRight = this.geoTo3dTan(latMax, lngMax);
      this.topRight = this.geoTo3dTan(latMin, lngMax);
      this.bottomLeft = this.geoTo3dTan(latMax, lngMin);
      const latCenter = (latMin + latMax) / 2;
      const lngCenter = (lngMin + lngMax) / 2;
      const center = Vector3d.midPoint(this.topLeft, this.bottomRight);
      const leftCenter = Vector3d.midPoint(this.topLeft, this.bottomLeft);
      const rightCenter = Vector3d.midPoint(this.topRight, this.bottomRight);
      const topCenter = Vector3d.midPoint(this.topLeft, this.topRight);
      const bottomCenter = Vector3d.midPoint(this.bottomLeft, this.bottomRight);
      if (renderContext.gl == null) {
        this._renderTriangleLists[0].push(RenderTriangle.create(PositionTexture.createPos(this.topLeft, 0, 0), PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(topCenter, 0.5, 0), this.texture, this.level));
        this._renderTriangleLists[0].push(RenderTriangle.create(PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(topCenter, 0.5, 0), this.texture, this.level));
        this._renderTriangleLists[1].push(RenderTriangle.create(PositionTexture.createPos(topCenter, 0.5, 0), PositionTexture.createPos(rightCenter, 1, 0.5), PositionTexture.createPos(this.topRight, 1, 0), this.texture, this.level));
        this._renderTriangleLists[1].push(RenderTriangle.create(PositionTexture.createPos(topCenter, 0.5, 0), PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(rightCenter, 1, 0.5), this.texture, this.level));
        this._renderTriangleLists[2].push(RenderTriangle.create(PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(bottomCenter, 0.5, 1), PositionTexture.createPos(center, 0.5, 0.5), this.texture, this.level));
        this._renderTriangleLists[2].push(RenderTriangle.create(PositionTexture.createPos(leftCenter, 0, 0.5), PositionTexture.createPos(this.bottomLeft, 0, 1), PositionTexture.createPos(bottomCenter, 0.5, 1), this.texture, this.level));
        this._renderTriangleLists[3].push(RenderTriangle.create(PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(this.bottomRight, 1, 1), PositionTexture.createPos(rightCenter, 1, 0.5), this.texture, this.level));
        this._renderTriangleLists[3].push(RenderTriangle.create(PositionTexture.createPos(center, 0.5, 0.5), PositionTexture.createPos(bottomCenter, 0.5, 1), PositionTexture.createPos(this.bottomRight, 1, 1), this.texture, this.level));
      } else {
        this._vertexBuffer = Tile.prepDevice.createBuffer();
        Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
        const f32array = new Float32Array(9 * 5);
        const buffer = f32array;
        let index = 0;
        index = this.addVertex(buffer, index, PositionTexture.createPos(bottomCenter, 0.5, 1));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.bottomLeft, 0, 1));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.bottomRight, 1, 1));
        index = this.addVertex(buffer, index, PositionTexture.createPos(center, 0.5, 0.5));
        index = this.addVertex(buffer, index, PositionTexture.createPos(leftCenter, 0, 0.5));
        index = this.addVertex(buffer, index, PositionTexture.createPos(rightCenter, 1, 0.5));
        index = this.addVertex(buffer, index, PositionTexture.createPos(topCenter, 0.5, 0));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.topLeft, 0, 0));
        index = this.addVertex(buffer, index, PositionTexture.createPos(this.topRight, 1, 0));
        Tile.prepDevice.bufferData(34962, f32array, 35044);
        for (let i = 0; i < 4; i++) {
          index = 0;
          this.triangleCount = 2;
          const ui16array = new Uint16Array(this.triangleCount * 3);
          const indexArray = ui16array;
          switch (i) {
            case 0:
              indexArray[index++] = 7;
              indexArray[index++] = 4;
              indexArray[index++] = 6;
              indexArray[index++] = 4;
              indexArray[index++] = 3;
              indexArray[index++] = 6;
              break;
            case 1:
              indexArray[index++] = 6;
              indexArray[index++] = 5;
              indexArray[index++] = 8;
              indexArray[index++] = 6;
              indexArray[index++] = 3;
              indexArray[index++] = 5;
              break;
            case 2:
              indexArray[index++] = 4;
              indexArray[index++] = 0;
              indexArray[index++] = 3;
              indexArray[index++] = 4;
              indexArray[index++] = 1;
              indexArray[index++] = 0;
              break;
            case 3:
              indexArray[index++] = 3;
              indexArray[index++] = 2;
              indexArray[index++] = 5;
              indexArray[index++] = 3;
              indexArray[index++] = 0;
              indexArray[index++] = 2;
              break;
          }
          this._indexBuffers[i] = Tile.prepDevice.createBuffer();
          Tile.prepDevice.bindBuffer(34963, this._indexBuffers[i]);
          Tile.prepDevice.bufferData(34963, ui16array, 35044);
        }
      }
      return true;
    }
  };

  function BitmapOverlay() {
    this._textureReady$1 = false;
    this._sprite$1 = new Sprite2d();
    Overlay.call(this);
  }
  BitmapOverlay.create = (owner, file) => {
    const temp = new BitmapOverlay();
    temp.set_owner(owner);
    temp._filename$1 = file.name;
    temp.set_name(owner.getNextDefaultName('Image'));
    temp.set_x(0);
    temp.set_y(0);
    owner.get_owner().addCachedFile(file.name, file);
    return temp;
  };
  const BitmapOverlay$ = {
    getTypeName: () => 'TerraViewer.BitmapOverlay',
    copy: function (owner) {
      const newBmpOverlay = new BitmapOverlay();
      newBmpOverlay.set_owner(owner);
      newBmpOverlay._filename$1 = this._filename$1;
      newBmpOverlay.set_x(this.get_x());
      newBmpOverlay.set_y(this.get_y());
      newBmpOverlay.set_width(this.get_width());
      newBmpOverlay.set_height(this.get_height());
      newBmpOverlay.set_color(this.get_color());
      newBmpOverlay.set_opacity(this.get_opacity());
      newBmpOverlay.set_rotationAngle(this.get_rotationAngle());
      newBmpOverlay.set_name(this.get_name() + ' - Copy');
      return newBmpOverlay;
    },
    cleanUp: function () {
      this.texture = null;
      if (this.texture2d != null) {
        this.texture2d.cleanUp();
        this.texture2d = null;
      }
    },
    initializeTexture: function () {
      const $this = this;

      try {
        if (RenderContext.useGl) {
          this.texture2d = this.get_owner().get_owner().getCachedTexture2d(this._filename$1);
          this._textureReady$1 = true;
        } else {
          this.texture = this.get_owner().get_owner().getCachedTexture(this._filename$1, () => {
            $this._textureReady$1 = true;
          });
        }
      } catch ($e1) {
      }
    },
    draw3D: function (renderContext, designTime) {
      if (RenderContext.useGl) {
        if (this.texture2d == null) {
          this.initializeTexture();
        }
        if (!this.get_width() && !this.get_height()) {
          this.set_width(this.texture2d.imageElement.width);
          this.set_height(this.texture2d.imageElement.height);
        }
        this.initiaizeGeometry();
        this.updateRotation();
        this._sprite$1.draw(renderContext, this.points, this.points.length, this.texture2d, true, 1);
      } else {
        if (this.texture == null) {
          this.initializeTexture();
        }
        if (!this._textureReady$1) {
          return;
        }
        if (!this.get_width() && !this.get_height()) {
          this.set_width(this.texture.width);
          this.set_height(this.texture.height);
        }
        const ctx = renderContext.device;
        ctx.save();
        ctx.translate(this.get_x(), this.get_y());
        ctx.rotate(this.get_rotationAngle() * Overlay.RC);
        ctx.globalAlpha = this.get_opacity();
        ctx.drawImage(this.texture, -this.get_width() / 2, -this.get_height() / 2, this.get_width(), this.get_height());
        ctx.restore();
      }
    },
    addFilesToCabinet: function (fc) {
      fc.addFile(this.get_owner().get_owner().get_workingDirectory() + this._filename$1, this.get_owner().get_owner().getFileBlob(this._filename$1));
    },
    writeOverlayProperties: function (xmlWriter) {
      xmlWriter._writeStartElement('Bitmap');
      xmlWriter._writeAttributeString('Filename', this._filename$1);
      xmlWriter._writeEndElement();
    },
    initializeFromXml: function (node) {
      const bitmap = Util.selectSingleNode(node, 'Bitmap');
      this._filename$1 = bitmap.attributes.getNamedItem('Filename').nodeValue;
    }
  };

  function TextOverlay() {
    this._sprite$1 = new Sprite2d();
    this._ctx$1 = null;
    this._ce$1 = null;
    Overlay.call(this);
  }
  TextOverlay.create = textObject => {
    const to = new TextOverlay();
    to.textObject = textObject;
    to._calculateTextSize$1();
    return to;
  };
  const TextOverlay$ = {
    getTypeName: () => 'TerraViewer.TextOverlay',
    get_color: function () {
      return Overlay.prototype.get_color.call(this);
    },
    set_color: function (value) {
      if (this.textObject.foregroundColor !== value) {
        this.textObject.foregroundColor = value;
        Overlay.prototype.set_color.call(this, value);
        this.cleanUp();
      }
      return value;
    },
    draw3D: function (renderContext, designTime) {
      if (RenderContext.useGl) {
        this.initializeTexture();
        this.initiaizeGeometry();
        this.updateRotation();
        this._sprite$1.draw(renderContext, this.points, this.points.length, this.texture2d, true, 1);
      } else {
        const ctx = renderContext.device;
        ctx.save();
        ctx.translate(this.get_x(), this.get_y());
        ctx.rotate(this.get_rotationAngle() * Overlay.RC);
        ctx.globalAlpha = this.get_opacity();
        this._drawCanvasText$1(ctx);
        ctx.restore();
      }
    },
    _drawCanvasText$1: function (ctx) {
      ctx.fillStyle = this.textObject.foregroundColor.toString();
      ctx.font = ((this.textObject.italic) ? 'italic' : 'normal') + ' ' + ((this.textObject.bold) ? 'bold' : 'normal') + ' ' + Math.round(this.textObject.fontSize * 1.2).toString() + 'px ' + this.textObject.fontName;
      ctx.textBaseline = 'top';
      let text = this.textObject.text;
      if (text.indexOf('{$') > -1) {
        if (text.indexOf('{$DATE}') > -1) {
          const date = ss.format('{0:yyyy/MM/dd}', SpaceTimeController.get_now());
          text = ss.replaceString(text, '{$DATE}', date);
        }
        if (text.indexOf('{$TIME}') > -1) {
          const time = ss.format('{0:HH:mm:ss}', SpaceTimeController.get_now());
          text = ss.replaceString(text, '{$TIME}', time);
        }
        text = ss.replaceString(text, '{$DIST}', UiTools.formatDistance(WWTControl.singleton.renderContext.get_solarSystemCameraDistance()));
        text = ss.replaceString(text, '{$LAT}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.lat));
        text = ss.replaceString(text, '{$LNG}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.lat));
        text = ss.replaceString(text, '{$RA}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.get_RA()));
        text = ss.replaceString(text, '{$DEC}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.get_dec()));
        text = ss.replaceString(text, '{$FOV}', Coordinates.formatDMS(WWTControl.singleton.renderContext.get_fovAngle()));
      }
      const lines = text.split('\n');
      let baseline = -(this.get_height() / 2);
      const lineSpace = this.textObject.fontSize * 1.7;
      const $enum1 = ss.enumerate(lines);
      while ($enum1.moveNext()) {
        const line = $enum1.current;
        const parts = Util.getWrappedText(ctx, line, this.get_width());
        const $enum2 = ss.enumerate(parts);
        while ($enum2.moveNext()) {
          const part = $enum2.current;
          ctx.fillText(part, -this.get_width() / 2, baseline);
          baseline += lineSpace;
        }
      }
    },
    _calculateTextSize$1: function () {
      if (this._ctx$1 == null || this._ce$1 == null) {
        this._ce$1 = document.createElement('canvas');
        this._ce$1.height = 100;
        this._ce$1.width = 100;
        this._ctx$1 = this._ce$1.getContext('2d');
      }
      this._ctx$1.fillStyle = this.textObject.foregroundColor.toString();
      this._ctx$1.font = ((this.textObject.italic) ? 'italic' : 'normal') + ' ' + ((this.textObject.bold) ? 'bold' : 'normal') + ' ' + Math.round(this.textObject.fontSize * 1.2).toString() + 'px ' + this.textObject.fontName;
      this._ctx$1.textBaseline = 'top';
      let text = this.textObject.text;
      if (text.indexOf('{$') > -1) {
        if (text.indexOf('{$DATE}') > -1) {
          const date = ss.format('{0:yyyy/MM/dd}', SpaceTimeController.get_now());
          text = ss.replaceString(text, '{$DATE}', date);
        }
        if (text.indexOf('{$TIME}') > -1) {
          const time = ss.format('{0:HH:mm:ss}', SpaceTimeController.get_now());
          text = ss.replaceString(text, '{$TIME}', time);
        }
        text = ss.replaceString(text, '{$DIST}', UiTools.formatDistance(WWTControl.singleton.renderContext.get_solarSystemCameraDistance()));
        text = ss.replaceString(text, '{$LAT}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.lat));
        text = ss.replaceString(text, '{$LNG}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.lat));
        text = ss.replaceString(text, '{$RA}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.get_RA()));
        text = ss.replaceString(text, '{$DEC}', Coordinates.formatDMS(WWTControl.singleton.renderContext.viewCamera.get_dec()));
        text = ss.replaceString(text, '{$FOV}', Coordinates.formatDMS(WWTControl.singleton.renderContext.get_fovAngle()));
      }
      const lines = text.split('\n');
      let baseline = 0;
      const lineSpace = this.textObject.fontSize * 1.7;
      let maxWidth = 0;
      const $enum1 = ss.enumerate(lines);
      while ($enum1.moveNext()) {
        const line = $enum1.current;
        const width = this._ctx$1.measureText(line).width;
        maxWidth = Math.max(width, maxWidth);
        baseline += lineSpace;
      }
      this.set_width(maxWidth * 1.01);
      this.set_height(baseline);
      this._ce$1 = null;
      this._ctx$1 = null;
    },
    initializeTexture: function () {
      if (this.texture2d == null || (this.textObject.text.indexOf('{$') > -1)) {
        if (!this.get_height() || !this.get_width()) {
          this._calculateTextSize$1();
        }
        if (this._ctx$1 == null || this._ce$1 == null) {
          this._ce$1 = document.createElement('canvas');
          this._ce$1.height = ss.truncate(this.get_height());
          this._ce$1.width = ss.truncate(this.get_width());
          this._ctx$1 = this._ce$1.getContext('2d');
        }
        this._ctx$1.translate(this.get_width() / 2, this.get_height() / 2);
        this._ctx$1.clearRect(0, 0, this.get_width(), this.get_height());
        this._drawCanvasText$1(this._ctx$1);
        this.texture2d = new Texture();
        this.texture2d.imageElement = this._ce$1;
        this.texture2d.makeTexture();
        this._ce$1 = null;
        this._ctx$1 = null;
      }
    },
    writeOverlayProperties: function (xmlWriter) {
      xmlWriter._writeStartElement('Text');
      this.textObject._saveToXml(xmlWriter);
      xmlWriter._writeEndElement();
    },
    initializeFromXml: function (node) {
      const text = Util.selectSingleNode(node, 'Text');
      this.textObject = TextObject._fromXml(Util.selectSingleNode(text, 'TextObject'));
    },
    initiaizeGeometry: function () {
      if (RenderContext.useGl) {
        Overlay.prototype.initiaizeGeometry.call(this);
      }
    }
  };

  function ShapeOverlay() {
    this._shapeType$1 = 1;
    this._sprite$1 = new Sprite2d();
    this._triangleStrip$1 = true;
    Overlay.call(this);
  }
  ShapeOverlay._create = (currentTourStop, shapeType) => {
    const overlay = new ShapeOverlay();
    overlay._shapeType$1 = shapeType;
    overlay.set_owner(currentTourStop);
    return overlay;
  };
  const ShapeOverlay$ = {
    getTypeName: () => 'TerraViewer.ShapeOverlay',
    get_shapeType: function () {
      return this._shapeType$1;
    },
    set_shapeType: function (value) {
      this._shapeType$1 = value;
      this.cleanUpGeometry();
      return value;
    },
    draw3D: function (renderContext, designTime) {
      if (RenderContext.useGl) {
        this.initiaizeGeometry();
        this._sprite$1.draw(renderContext, this.points, this.points.length, null, this._triangleStrip$1, this.get_opacity());
      } else {
        switch (this._shapeType$1) {
          case 0:
            this._drawCircleGeometry$1(renderContext);
            break;
          case 1:
            this._drawRectGeometry$1(renderContext);
            break;
          case 6:
            this._drawOpenRectGeometry$1(renderContext);
            break;
          case 2:
            this._drawStarGeometry$1(renderContext);
            break;
          case 3:
            this._drawDonutGeometry$1(renderContext);
            break;
          case 4:
            this._drawArrowGeometry$1(renderContext);
            break;
          case 5:
            this._drawLineGeometry$1(renderContext);
            break;
          default:
            break;
        }
      }
    },
    initiaizeGeometry: function () {
      if (this.points == null) {
        switch (this._shapeType$1) {
          case 0:
            this._createCircleGeometry$1();
            break;
          case 1:
            Overlay.prototype.initiaizeGeometry.call(this);
            break;
          case 6:
            this._createOpenRectGeometry$1();
            break;
          case 2:
            this._createStarGeometry$1();
            break;
          case 3:
            this._createDonutGeometry$1();
            break;
          case 4:
            this._createArrowGeometry$1();
            break;
          case 5:
            this._createLineGeometry$1();
            break;
          default:
            break;
        }
      }
    },
    _createLineGeometry$1: function () {
      const centerX = this.get_x();
      const centerY = this.get_y();
      const radius = this.get_width() / 2;
      const length = this.get_width();
      const segments = ss.truncate((length / 12)) + 1;
      const radiansPerSegment = (Math.PI * 2) / segments;
      if (this.points == null) {
        this.points = new Array(segments * 2 + 2);
      }
      for (let j = 0; j <= segments; j++) {
        const i = j * 2;
        this.points[i] = new PositionColoredTextured();
        this.points[i].position = this.makePosition(this.get_x(), this.get_y(), ((j / segments) * this.get_width() - (this.get_width() / 2)), 6, this.get_rotationAngle());
        this.points[i].tu = (j % 2);
        this.points[i].tv = 0;
        this.points[i].color = this.get_color();
        this.points[i + 1] = new PositionColoredTextured();
        this.points[i + 1].position = this.makePosition(this.get_x(), this.get_y(), ((j / segments) * this.get_width() - (this.get_width() / 2)), -6, this.get_rotationAngle());
        this.points[i + 1].tu = (j % 2);
        this.points[i + 1].tv = 1;
        this.points[i + 1].color = this.get_color();
      }
    },
    _createOpenRectGeometry$1: function () {
      const centerX = this.get_x();
      const centerY = this.get_y();
      const radius = this.get_width() / 2;
      const length = this.get_width();
      const segments = ss.truncate((length / 12)) + 1;
      const segmentsHigh = ss.truncate((this.get_height() / 12)) + 1;
      const totalPoints = (((segments + 1) * 2) + ((segmentsHigh + 1) * 2)) * 2;
      if (this.points == null) {
        this.points = new Array(totalPoints);
      }
      for (var j = 0; j <= segments; j++) {
        var i = j * 2;
        this.points[i] = new PositionColoredTextured();
        this.points[i].position = this.makePosition(centerX, centerY, (j / segments) * this.get_width() - (this.get_width() / 2), (this.get_height() / 2), this.get_rotationAngle());
        this.points[i].tu = (j % 2);
        this.points[i].tv = 0;
        this.points[i].color = this.get_color();
        this.points[i + 1] = new PositionColoredTextured();
        this.points[i + 1].position = this.makePosition(centerX, centerY, (j / segments) * this.get_width() - (this.get_width() / 2), ((this.get_height() / 2) - 12), this.get_rotationAngle());
        this.points[i + 1].tu = (j % 2);
        this.points[i + 1].tv = 1;
        this.points[i + 1].color = this.get_color();
        var k = (((segments + 1) * 4) + ((segmentsHigh + 1) * 2) - 2) - i;
        this.points[k] = new PositionColoredTextured();
        this.points[k].position = this.makePosition(centerX, centerY, (j / segments) * this.get_width() - (this.get_width() / 2), (-(this.get_height() / 2)) + 12, this.get_rotationAngle());
        this.points[k].tu = (j % 2);
        this.points[k].tv = 0;
        this.points[k].color = this.get_color();
        this.points[k + 1] = new PositionColoredTextured();
        this.points[k + 1].position = this.makePosition(centerX, centerY, (j / segments) * this.get_width() - (this.get_width() / 2), (-(this.get_height() / 2)), this.get_rotationAngle());
        this.points[k + 1].tu = (j % 2);
        this.points[k + 1].tv = 1;
        this.points[k + 1].color = this.get_color();
      }
      const offset = ((segments + 1) * 2);
      for (var j = 0; j <= segmentsHigh; j++) {
        const top = ((segmentsHigh + 1) * 2) + offset - 2;
        var i = j * 2;
        this.points[top - i] = new PositionColoredTextured();
        this.points[top - i].position = this.makePosition(centerX, centerY, (this.get_width() / 2), ((j / segmentsHigh) * this.get_height() - (this.get_height() / 2)), this.get_rotationAngle());
        this.points[top - i].tu = (j % 2);
        this.points[top - i].tv = 0;
        this.points[top - i].color = this.get_color();
        this.points[top - i + 1] = new PositionColoredTextured();
        this.points[top - i + 1].position = this.makePosition(centerX, centerY, ((this.get_width() / 2) - 12), ((j / segmentsHigh) * this.get_height() - (this.get_height() / 2)), this.get_rotationAngle());
        this.points[top - i + 1].tu = (j % 2);
        this.points[top - i + 1].tv = 1;
        this.points[top - i + 1].color = this.get_color();
        var k = i + ((segments + 1) * 4) + ((segmentsHigh + 1) * 2);
        this.points[k] = new PositionColoredTextured();
        this.points[k].position = this.makePosition(centerX, centerY, (-(this.get_width() / 2) + 12), ((j / segmentsHigh) * this.get_height() - (this.get_height() / 2)), this.get_rotationAngle());
        this.points[k].tu = (j % 2);
        this.points[k].tv = 0;
        this.points[k].color = this.get_color();
        this.points[k + 1] = new PositionColoredTextured();
        this.points[k + 1].position = this.makePosition(centerX, centerY, (-(this.get_width() / 2)), ((j / segmentsHigh) * this.get_height() - (this.get_height() / 2)), this.get_rotationAngle());
        this.points[k + 1].tu = (j % 2);
        this.points[k + 1].tv = 1;
        this.points[k + 1].color = this.get_color();
      }
    },
    _createStarGeometry$1: function () {
      const centerX = this.get_x();
      const centerY = this.get_y();
      const radius = this.get_width() / 2;
      const radiansPerSegment = (Math.PI * 2) / 5;
      if (this.points == null) {
        this.points = new Array(12);
      }
      if (this._pnts$1 == null) {
        this._pnts$1 = new Array(10);
      }
      for (let i = 0; i < 5; i++) {
        var rads = i * radiansPerSegment - (Math.PI / 2);
        this._pnts$1[i] = new PositionColoredTextured();
        this._pnts$1[i].position = this.makePosition(centerX, centerY, (Math.cos(rads) * (this.get_width() / 2)), (Math.sin(rads) * (this.get_height() / 2)), this.get_rotationAngle());
        this._pnts$1[i].tu = 0;
        this._pnts$1[i].tv = 0;
        this._pnts$1[i].color = this.get_color();
      }
      for (let i = 5; i < 10; i++) {
        var rads = i * radiansPerSegment + (radiansPerSegment / 2) - (Math.PI / 2);
        this._pnts$1[i] = new PositionColoredTextured();
        this._pnts$1[i].position = this.makePosition(centerX, centerY, (Math.cos(rads) * (this.get_width() / 5.3)), (Math.sin(rads) * (this.get_height() / 5.3)), this.get_rotationAngle());
        this._pnts$1[i].tu = 0;
        this._pnts$1[i].tv = 0;
        this._pnts$1[i].color = this.get_color();
      }
      this.points[0] = this._pnts$1[0];
      this.points[1] = this._pnts$1[5];
      this.points[2] = this._pnts$1[9];
      this.points[3] = this._pnts$1[1];
      this.points[4] = this._pnts$1[7];
      this.points[5] = this._pnts$1[4];
      this.points[6] = this._pnts$1[6];
      this.points[7] = this._pnts$1[2];
      this.points[8] = this._pnts$1[7];
      this.points[9] = this._pnts$1[7];
      this.points[10] = this._pnts$1[3];
      this.points[11] = this._pnts$1[8];
      this._triangleStrip$1 = false;
    },
    _createArrowGeometry$1: function () {
      if (this.points == null) {
        this.points = new Array(9);
      }
      this.points[0] = new PositionColoredTextured();
      this.points[0].position = this.makePosition(this.get_x(), this.get_y(), -this.get_width() / 2, -this.get_height() / 4, this.get_rotationAngle());
      this.points[0].tu = 0;
      this.points[0].tv = 0;
      this.points[0].color = this.get_color();
      this.points[1] = new PositionColoredTextured();
      this.points[1].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 4, -this.get_height() / 4, this.get_rotationAngle());
      this.points[1].tu = 1;
      this.points[1].tv = 0;
      this.points[1].color = this.get_color();
      this.points[2] = new PositionColoredTextured();
      this.points[2].position = this.makePosition(this.get_x(), this.get_y(), -this.get_width() / 2, this.get_height() / 4, this.get_rotationAngle());
      this.points[2].tu = 0;
      this.points[2].tv = 1;
      this.points[2].color = this.get_color();
      this.points[3] = new PositionColoredTextured();
      this.points[3].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 4, -this.get_height() / 4, this.get_rotationAngle());
      this.points[3].tu = 1;
      this.points[3].tv = 0;
      this.points[3].color = this.get_color();
      this.points[4] = new PositionColoredTextured();
      this.points[4].position = this.makePosition(this.get_x(), this.get_y(), -this.get_width() / 2, this.get_height() / 4, this.get_rotationAngle());
      this.points[4].tu = 0;
      this.points[4].tv = 1;
      this.points[4].color = this.get_color();
      this.points[5] = new PositionColoredTextured();
      this.points[5].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 4, this.get_height() / 4, this.get_rotationAngle());
      this.points[5].tu = 1;
      this.points[5].tv = 1;
      this.points[5].color = this.get_color();
      this.points[6] = new PositionColoredTextured();
      this.points[6].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 4, -this.get_height() / 2, this.get_rotationAngle());
      this.points[6].tu = 1;
      this.points[6].tv = 1;
      this.points[6].color = this.get_color();
      this.points[7] = new PositionColoredTextured();
      this.points[7].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 2, 0, this.get_rotationAngle());
      this.points[7].tu = 1;
      this.points[7].tv = 0.5;
      this.points[7].color = this.get_color();
      this.points[8] = new PositionColoredTextured();
      this.points[8].position = this.makePosition(this.get_x(), this.get_y(), this.get_width() / 4, this.get_height() / 2, this.get_rotationAngle());
      this.points[8].tu = 1;
      this.points[8].tv = 1;
      this.points[8].color = this.get_color();
      this._triangleStrip$1 = false;
    },
    _createDonutGeometry$1: function () {
      const centerX = this.get_x();
      const centerY = this.get_y();
      const radius = this.get_width() / 2;
      const circumference = Math.PI * 2 * radius;
      const segments = ss.truncate((circumference / 12)) + 1;
      const radiansPerSegment = (Math.PI * 2) / segments;
      if (this.points == null) {
        this.points = new Array(segments * 2 + 2);
      }
      for (let j = 0; j <= segments; j++) {
        const i = j * 2;
        this.points[i] = new PositionColoredTextured();
        this.points[i].position = this.makePosition(centerX, centerY, (Math.cos(j * radiansPerSegment) * (this.get_width() / 2)), (Math.sin(j * radiansPerSegment) * (this.get_height() / 2)), this.get_rotationAngle());
        this.points[i].tu = (j % 2);
        this.points[i].tv = 0;
        this.points[i].color = this.get_color();
        this.points[i + 1] = new PositionColoredTextured();
        this.points[i + 1].position = this.makePosition(centerX, centerY, (Math.cos(j * radiansPerSegment) * ((this.get_width() / 2) - 10)), (Math.sin(j * radiansPerSegment) * ((this.get_height() / 2) - 10)), this.get_rotationAngle());
        this.points[i + 1].tu = (j % 2);
        this.points[i + 1].tv = 1;
        this.points[i + 1].color = this.get_color();
      }
    },
    _createCircleGeometry$1: function () {
      const centerX = this.get_x();
      const centerY = this.get_y();
      const radius = this.get_width() / 2;
      const circumference = Math.PI * 2 * radius;
      const segments = ss.truncate((circumference / 12)) + 1;
      const radiansPerSegment = (Math.PI * 2) / segments;
      if (this.points == null) {
        this.points = new Array(segments * 2 + 2);
      }
      for (let j = 0; j <= segments; j++) {
        const i = j * 2;
        this.points[i] = new PositionColoredTextured();
        this.points[i].position = this.makePosition(centerX, centerY, (Math.cos(j * radiansPerSegment) * (this.get_width() / 2)), (Math.sin(j * radiansPerSegment) * (this.get_height() / 2)), this.get_rotationAngle());
        this.points[i].tu = (j % 2);
        this.points[i].tv = 0;
        this.points[i].color = this.get_color();
        this.points[i + 1] = new PositionColoredTextured();
        this.points[i + 1].position = this.makePosition(centerX, centerY, 0, 0, this.get_rotationAngle());
        this.points[i + 1].tu = (j % 2);
        this.points[i + 1].tv = 1;
        this.points[i + 1].color = this.get_color();
      }
    },
    initializeTexture: function () {
      switch (this.get_shapeType()) {
        case 5:
        case 3:
        case 6:
          break;
        case 0:
        case 1:
        case 2:
        case 4:
        default:
          this.texture = null;
          break;
      }
    },
    _drawLineGeometry$1: function (renderContext) {
      const ctx = renderContext.device;
      ctx.save();
      const radius = this.get_width() / 2;
      ctx.translate(this.get_x(), this.get_y());
      ctx.rotate(this.get_rotationAngle() * Overlay.RC);
      ctx.moveTo(-radius, 0);
      ctx.lineTo(radius, 0);
      ctx.lineWidth = 9;
      ctx.strokeStyle = this.get_color().toString();
      ctx.globalAlpha = this.get_opacity();
      ctx.stroke();
      ctx.restore();
    },
    _drawOpenRectGeometry$1: function (renderContext) {
      const ctx = renderContext.device;
      ctx.save();
      ctx.translate(this.get_x(), this.get_y());
      ctx.rotate(this.get_rotationAngle() * Overlay.RC);
      ctx.beginPath();
      ctx.moveTo(-this.get_width() / 2, -this.get_height() / 2);
      ctx.lineTo(this.get_width() / 2, -this.get_height() / 2);
      ctx.lineTo(this.get_width() / 2, this.get_height() / 2);
      ctx.lineTo(-this.get_width() / 2, this.get_height() / 2);
      ctx.closePath();
      ctx.lineWidth = 9;
      ctx.strokeStyle = this.get_color().toString();
      ctx.globalAlpha = this.get_opacity();
      ctx.stroke();
      ctx.restore();
    },
    _drawRectGeometry$1: function (renderContext) {
      const ctx = renderContext.device;
      ctx.save();
      ctx.translate(this.get_x(), this.get_y());
      ctx.rotate(this.get_rotationAngle() * Overlay.RC);
      ctx.beginPath();
      ctx.moveTo(-this.get_width() / 2, -this.get_height() / 2);
      ctx.lineTo(this.get_width() / 2, -this.get_height() / 2);
      ctx.lineTo(this.get_width() / 2, this.get_height() / 2);
      ctx.lineTo(-this.get_width() / 2, this.get_height() / 2);
      ctx.closePath();
      ctx.lineWidth = 0;
      ctx.fillStyle = this.get_color().toString();
      ctx.globalAlpha = this.get_opacity();
      ctx.fill();
      ctx.restore();
    },
    _drawStarGeometry$1: function (renderContext) {
      const ctx = renderContext.device;
      ctx.save();
      ctx.translate(this.get_x(), this.get_y());
      ctx.rotate(this.get_rotationAngle() * Overlay.RC);
      ctx.beginPath();
      const centerX = 0;
      const centerY = 0;
      const radius = this.get_width() / 2;
      const radiansPerSegment = (Math.PI * 2) / 5;
      let first = true;
      for (let i = 0; i < 5; i++) {
        const rads = i * radiansPerSegment - (Math.PI / 2);
        if (first) {
          first = false;
          ctx.moveTo(centerX + Math.cos(rads) * (this.get_width() / 2), centerY + Math.sin(rads) * (this.get_height() / 2));
        } else {
          ctx.lineTo(centerX + Math.cos(rads) * (this.get_width() / 2), centerY + Math.sin(rads) * (this.get_height() / 2));
        }
        const rads2 = i * radiansPerSegment + (radiansPerSegment / 2) - (Math.PI / 2);
        ctx.lineTo(centerX + Math.cos(rads2) * (this.get_width() / 5.3), centerY + Math.sin(rads2) * (this.get_height() / 5.3));
      }
      ctx.closePath();
      ctx.lineWidth = 0;
      ctx.fillStyle = this.get_color().toString();
      ctx.globalAlpha = this.get_opacity();
      ctx.fill();
      ctx.restore();
    },
    _drawArrowGeometry$1: function (renderContext) {
      const ctx = renderContext.device;
      ctx.save();
      ctx.translate(this.get_x(), this.get_y());
      ctx.rotate(this.get_rotationAngle() * Overlay.RC);
      ctx.beginPath();
      ctx.moveTo((-(this.get_width() / 2)), (-(this.get_height() / 4)));
      ctx.lineTo((this.get_width() / 4), (-(this.get_height() / 4)));
      ctx.lineTo((this.get_width() / 4), (-(this.get_height() / 2)));
      ctx.lineTo((this.get_width() / 2), 0);
      ctx.lineTo((this.get_width() / 4), (this.get_height() / 2));
      ctx.lineTo((this.get_width() / 4), (this.get_height() / 4));
      ctx.lineTo((-(this.get_width() / 2)), (this.get_height() / 4));
      ctx.closePath();
      ctx.lineWidth = 0;
      ctx.fillStyle = this.get_color().toString();
      ctx.globalAlpha = this.get_opacity();
      ctx.fill();
      ctx.restore();
    },
    _drawDonutGeometry$1: function (renderContext) {
      const ctx = renderContext.device;
      ctx.save();
      ctx.translate(this.get_x(), this.get_y());
      ctx.scale(1, this.get_height() / this.get_width());
      ctx.rotate(this.get_rotationAngle() * Overlay.RC);
      ctx.beginPath();
      ctx.arc(0, 0, this.get_width() / 2, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.lineWidth = 9;
      ctx.strokeStyle = this.get_color().toString();
      ctx.globalAlpha = this.get_opacity();
      ctx.stroke();
      ctx.restore();
    },
    _drawCircleGeometry$1: function (renderContext) {
      const ctx = renderContext.device;
      ctx.save();
      ctx.scale(1, this.get_width() / this.get_height());
      ctx.translate(this.get_x(), this.get_y());
      ctx.rotate(this.get_rotationAngle() * Overlay.RC);
      ctx.beginPath();
      ctx.arc(0, 0, this.get_width(), 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.lineWidth = 0;
      ctx.fillStyle = this.get_color().toString();
      ctx.globalAlpha = this.get_opacity();
      ctx.fill();
      ctx.restore();
    },
    cleanUpGeometry: function () {
      Overlay.prototype.cleanUpGeometry.call(this);
      this.cleanUp();
    },
    writeOverlayProperties: function (xmlWriter) {
      xmlWriter._writeStartElement('Shape');
      xmlWriter._writeAttributeString('ShapeType', Enums.toXml('ShapeType', this._shapeType$1));
      xmlWriter._writeEndElement();
    },
    initializeFromXml: function (node) {
      const shape = Util.selectSingleNode(node, 'Shape');
      this._shapeType$1 = Enums.parse('ShapeType', shape.attributes.getNamedItem('ShapeType').nodeValue);
    }
  };

  function AudioOverlay() {
    this._audio$1 = null;
    this._volume$1 = 100;
    this._mute$1 = false;
    this._position$1 = 0;
    this._audioReady$1 = false;
    this._trackType$1 = 0;
    Overlay.call(this);
    this.isDesignTimeOnly = true;
  }
  AudioOverlay.create = (currentTourStop, file) => {
    const ao = new AudioOverlay();
    ao.set_owner(currentTourStop);
    ao._filename$1 = file.name;
    ao.get_owner().get_owner().addCachedFile(file.name, file);
    return ao;
  };
  const AudioOverlay$ = {
    getTypeName: () => 'TerraViewer.AudioOverlay',
    get_mute: function () {
      return this._mute$1;
    },
    set_mute: function (value) {
      this._mute$1 = value;
      this.set_volume(this.get_volume());
      return value;
    },
    get_volume: function () {
      return this._volume$1;
    },
    set_volume: function (value) {
      this._volume$1 = value;
      if (this._audio$1 != null) {
        this._audio$1.volume = (this._mute$1) ? 0 : (this._volume$1 / 100);
      }
      return value;
    },
    addFilesToCabinet: function (fc) {
      fc.addFile(this.get_owner().get_owner().get_workingDirectory() + this._filename$1, this.get_owner().get_owner().getFileBlob(this._filename$1));
    },
    play: function () {
      if (this._audio$1 == null) {
        this.initializeTexture();
      }
      if (this._audio$1 != null && this._audioReady$1) {
        this._audio$1.play();
        this.set_volume(this.get_volume());
        this._audio$1.currentTime = this._position$1;
      }
    },
    pause: function () {
      if (this._audio$1 == null) {
        this.initializeTexture();
      }
      if (this._audio$1 != null && this._audioReady$1) {
        this._audio$1.pause();
      }
    },
    stop: function () {
      if (this._audio$1 == null) {
        this.initializeTexture();
      }
      if (this._audio$1 != null && this._audioReady$1) {
        this._audio$1.pause();
      }
    },
    seek: function (time) {
      this._position$1 = time;
      if (this._audio$1 == null) {
        this.initializeTexture();
      }
      if (this._audioReady$1) {
        if (this._audio$1.duration < time) {
          this._audio$1.pause();
        } else {
          this._audio$1.currentTime = this._position$1;
        }
      }
    },
    initializeTexture: function () {
      const $this = this;

      if (this._audio$1 == null) {
        this._audio$1 = document.createElement('audio');
        this._audio$1.src = this.get_owner().get_owner().getFileStream(this._filename$1);
        this._audio$1.addEventListener('canplaythrough', () => {
          if (!$this._audioReady$1) {
            $this._audioReady$1 = true;
            $this._audio_MediaOpened$1();
            $this._audio$1.play();
          }
        }, false);
      }
    },
    cleanUp: function () {
      Overlay.prototype.cleanUp.call(this);
      if (this._audio$1 != null) {
        this._audio$1.pause();
        this._audio$1.src = null;
        this._audio$1 = null;
      }
    },
    _audio_MediaOpened$1: function () {
      this._audio$1.currentTime = this._position$1;
      this._audio$1.volume = (this._mute$1) ? 0 : (this._volume$1 / 100);
    },
    get_trackType: function () {
      return this._trackType$1;
    },
    set_trackType: function (value) {
      this._trackType$1 = value;
      return value;
    },
    writeOverlayProperties: function (xmlWriter) {
      xmlWriter._writeStartElement('Audio');
      xmlWriter._writeAttributeString('Filename', this._filename$1);
      xmlWriter._writeAttributeString('Volume', this._volume$1.toString());
      xmlWriter._writeAttributeString('Mute', this._mute$1.toString());
      xmlWriter._writeAttributeString('TrackType', Enums.toXml('AudioType', this._trackType$1));
      xmlWriter._writeEndElement();
    },
    initializeFromXml: function (node) {
      const audio = Util.selectSingleNode(node, 'Audio');
      this._filename$1 = audio.attributes.getNamedItem('Filename').nodeValue;
      if (audio.attributes.getNamedItem('Volume') != null) {
        this._volume$1 = parseInt(audio.attributes.getNamedItem('Volume').nodeValue);
      }
      if (audio.attributes.getNamedItem('Mute') != null) {
        this._mute$1 = ss.boolean(audio.attributes.getNamedItem('Mute').nodeValue);
      }
      if (audio.attributes.getNamedItem('TrackType') != null) {
        this._trackType$1 = Enums.parse('AudioType', audio.attributes.getNamedItem('TrackType').nodeValue);
      }
    }
  };

  function FlipbookOverlay() {
    this._loopType$1 = 1;
    this._startFrame$1 = 0;
    this._framesList$1 = [];
    this._frames$1 = 1;
    this._framesX$1 = 8;
    this._framesY$1 = 8;
    this._textureReady$1 = false;
    this._currentFrame$1 = 0;
    this._cellHeight$1 = 256;
    this._cellWidth$1 = 256;
    this._timeStart$1 = ss.now();
    this._playing$1 = true;
    Overlay.call(this);
  }
  const FlipbookOverlay$ = {
    getTypeName: () => 'TerraViewer.FlipbookOverlay',
    get_loopType: function () {
      return this._loopType$1;
    },
    set_loopType: function (value) {
      this._loopType$1 = value;
      return value;
    },
    get_startFrame: function () {
      return this._startFrame$1;
    },
    set_startFrame: function (value) {
      this._startFrame$1 = value;
      return value;
    },
    get_frameSequence: function () {
      return this._frameSequence$1;
    },
    set_frameSequence: function (value) {
      if (this._frameSequence$1 !== value) {
        this._frameSequence$1 = value;
        this._framesList$1 = [];
        if (!ss.emptyString(this._frameSequence$1)) {
          try {
            const parts = this._frameSequence$1.split(',');
            const $enum1 = ss.enumerate(parts);
            while ($enum1.moveNext()) {
              const part = $enum1.current;
              const x = parseInt(ss.trim(part));
              this._framesList$1.push(x);
            }
          } catch ($e2) {
          }
        }
      }
      return value;
    },
    get_frames: function () {
      return this._frames$1;
    },
    set_frames: function (value) {
      this._frames$1 = value;
      return value;
    },
    get_framesX: function () {
      return this._framesX$1;
    },
    set_framesX: function (value) {
      this._framesX$1 = value;
      return value;
    },
    get_framesY: function () {
      return this._framesY$1;
    },
    set_framesY: function (value) {
      this._framesY$1 = value;
      return value;
    },
    copy: function (owner) {
      const newFlipbookOverlay = new FlipbookOverlay();
      newFlipbookOverlay.set_owner(owner);
      newFlipbookOverlay._filename$1 = this._filename$1;
      newFlipbookOverlay.set_x(this.get_x());
      newFlipbookOverlay.set_y(this.get_y());
      newFlipbookOverlay.set_width(this.get_width());
      newFlipbookOverlay.set_height(this.get_height());
      newFlipbookOverlay.set_color(this.get_color());
      newFlipbookOverlay.set_opacity(this.get_opacity());
      newFlipbookOverlay.set_rotationAngle(this.get_rotationAngle());
      newFlipbookOverlay.set_name(this.get_name() + ' - Copy');
      newFlipbookOverlay.set_startFrame(this.get_startFrame());
      newFlipbookOverlay.set_frames(this.get_frames());
      newFlipbookOverlay.set_loopType(this.get_loopType());
      newFlipbookOverlay.set_frameSequence(this.get_frameSequence());
      newFlipbookOverlay.set_framesX(this.get_framesX());
      newFlipbookOverlay.set_framesY(this.get_framesY());
      return newFlipbookOverlay;
    },
    cleanUp: function () {
      this.texture = null;
    },
    initializeTexture: function () {
      const $this = this;

      try {
        const colorKey = ss.endsWith(this._filename$1.toLowerCase(), '.jpg');
        this.texture = this.get_owner().get_owner().getCachedTexture(this._filename$1, () => {
          $this._textureReady$1 = true;
        });
      } catch ($e1) {
      }
    },
    addFilesToCabinet: function (fc) {
      fc.addFile(this.get_owner().get_owner().get_workingDirectory() + this._filename$1, this.get_owner().get_owner().getFileBlob(this._filename$1));
    },
    writeOverlayProperties: function (xmlWriter) {
      xmlWriter._writeStartElement('Flipbook');
      xmlWriter._writeAttributeString('Filename', this._filename$1);
      xmlWriter._writeAttributeString('Frames', this._frames$1.toString());
      xmlWriter._writeAttributeString('Loop', Enums.toXml('LoopTypes', this._loopType$1));
      xmlWriter._writeAttributeString('FramesX', this._framesX$1.toString());
      xmlWriter._writeAttributeString('FramesY', this._framesY$1.toString());
      xmlWriter._writeAttributeString('StartFrame', this._startFrame$1.toString());
      if (!ss.emptyString(this._frameSequence$1)) {
        xmlWriter._writeAttributeString('FrameSequence', this._frameSequence$1);
      }
      xmlWriter._writeEndElement();
    },
    initializeFromXml: function (node) {
      const flipbook = Util.selectSingleNode(node, 'Flipbook');
      this._filename$1 = flipbook.attributes.getNamedItem('Filename').nodeValue;
      this._frames$1 = parseInt(flipbook.attributes.getNamedItem('Frames').nodeValue);
      this._loopType$1 = Enums.parse('LoopTypes', flipbook.attributes.getNamedItem('Loop').nodeValue);
      if (flipbook.attributes.getNamedItem('FramesX') != null) {
        this.set_framesX(parseInt(flipbook.attributes.getNamedItem('FramesX').nodeValue));
      }
      if (flipbook.attributes.getNamedItem('FramesY') != null) {
        this.set_framesY(parseInt(flipbook.attributes.getNamedItem('FramesY').nodeValue));
      }
      if (flipbook.attributes.getNamedItem('StartFrame') != null) {
        this.set_startFrame(parseInt(flipbook.attributes.getNamedItem('StartFrame').nodeValue));
      }
      if (flipbook.attributes.getNamedItem('FrameSequence') != null) {
        this.set_frameSequence(flipbook.attributes.getNamedItem('FrameSequence').nodeValue);
      }
    },
    play: function () {
      this._playing$1 = true;
      this._timeStart$1 = ss.now();
    },
    pause: function () {
      this._playing$1 = false;
    },
    stop: function () {
      this._playing$1 = false;
      this._currentFrame$1 = 0;
    },
    initiaizeGeometry: function () {
      let frameCount = this._frames$1;
      if (!ss.emptyString(this._frameSequence$1)) {
        frameCount = this._framesList$1.length;
      }
      if (this._playing$1) {
        const ts = ss.now() - this._timeStart$1;
        switch (this._loopType$1) {
          case 0:
            this._currentFrame$1 = ss.truncate(((ts / 1000 * 24) % frameCount)) + this._startFrame$1;
            break;
          case 1:
            this._currentFrame$1 = Math.abs(ss.truncate(((ts / 1000 * 24 + frameCount) % (frameCount * 2 - 1))) - (frameCount - 1)) + this._startFrame$1;
            if (this._currentFrame$1 < 0 || this._currentFrame$1 > frameCount - 1) {
              const p = 0;
            }
            break;
          case 2:
            this._currentFrame$1 = Math.max(0, frameCount - ss.truncate(((ts / 1000 * 24) % frameCount))) + this._startFrame$1;
            break;
          case 3:
            const temp = Math.min(ts / 1000 * 24, frameCount * 2 + 1) + frameCount;
            this._currentFrame$1 = Math.abs((temp % (frameCount * 2 - 1)) - (frameCount - 1)) + this._startFrame$1;
            break;
          case 4:
            this._currentFrame$1 = Math.min(frameCount - 1, ss.truncate((ts / 1000 * 24)));
            break;
          case 5:
            this._currentFrame$1 = this._startFrame$1;
            break;
          case 6:
            this._currentFrame$1 = (frameCount - 1) + this._startFrame$1;
            break;
          default:
            this._currentFrame$1 = this._startFrame$1;
            break;
        }
      }
      if (!ss.emptyString(this._frameSequence$1)) {
        if (this._currentFrame$1 < this._framesList$1.length && this._currentFrame$1 > -1) {
          this._currentFrame$1 = this._framesList$1[this._currentFrame$1];
        } else {
          this._currentFrame$1 = 0;
        }
      }
      this.currentRotation = 0;
    }
  };

  function ToolStripSeparator() {
    ToolStripMenuItem.call(this);
    this.name = '--------------------------------------';
  }
  const ToolStripSeparator$ = {};

  function FrameWizard() {
    Dialog.call(this);
  }
  const FrameWizard$ = {
    OK: frame => {
      LayerManager.referenceFrameWizardFinished(frame);
    }
  };

  function ReferenceFrameProps() {
    Dialog.call(this);
  }
  const ReferenceFrameProps$ = {
    OK: frame => {
      LayerManager.loadTree();
    }
  };

  function GreatCircleDialog() {
    Dialog.call(this);
  }
  const GreatCircleDialog$ = {
    OK: frame => {
    }
  };

  function DataVizWizard() {
    Dialog.call(this);
  }
  const DataVizWizard$ = {
    OK: () => {
    }
  };

  function Circle() {
    this._fill$1 = false;
    this._skyRelative$1 = false;
    this._strokeWidth$1 = 1;
    this._radius$1 = 10;
    this._lineColor$1 = Colors.get_white();
    this._fillColor$1 = Colors.get_white();
    this._ra$1 = 0;
    this._dec$1 = 0;
    Annotation.call(this);
  }
  const Circle$ = {
    get_fill: function () {
      return this._fill$1;
    },
    set_fill: function (value) {
      Annotation.batchDirty = true;
      this._fill$1 = value;
      return value;
    },
    get_skyRelative: function () {
      return this._skyRelative$1;
    },
    set_skyRelative: function (value) {
      Annotation.batchDirty = true;
      this._skyRelative$1 = value;
      return value;
    },
    get_lineWidth: function () {
      return this._strokeWidth$1;
    },
    set_lineWidth: function (value) {
      Annotation.batchDirty = true;
      this._strokeWidth$1 = value;
      return value;
    },
    get_radius: function () {
      return this._radius$1;
    },
    set_radius: function (value) {
      Annotation.batchDirty = true;
      this._radius$1 = value;
      return value;
    },
    get_lineColor: function () {
      return this._lineColor$1.toString();
    },
    set_lineColor: function (value) {
      Annotation.batchDirty = true;
      this._lineColor$1 = Color.load(value);
      return value;
    },
    get_fillColor: function () {
      return this._fillColor$1.toString();
    },
    set_fillColor: function (value) {
      Annotation.batchDirty = true;
      this._fillColor$1 = Color.fromName(value);
      return value;
    },
    setCenter: function (ra, dec) {
      Annotation.batchDirty = true;
      this._ra$1 = ra / 15;
      this._dec$1 = dec;
      this.center = Coordinates.raDecTo3d(this._ra$1, this._dec$1);
    },
    draw: function (renderContext) {
      let onScreen = true;
      let rad = this._radius$1;
      if (this._skyRelative$1) {
        rad /= renderContext.get_fovScale() / 3600;
      }
      const screenSpacePnt = renderContext.WVP.transform(this.center);
      if (screenSpacePnt.z < 0) {
        onScreen = false;
      }
      if (Vector3d.dot(renderContext.get_viewPoint(), this.center) < 0.55) {
        onScreen = false;
      }
      if (renderContext.gl != null) {
        if (Annotation.batchDirty || this.annotationDirty) {
          const up = Vector3d.create(0, 1, 0);
          const xNormal = Vector3d.cross(this.center, up);
          const yNormal = Vector3d.cross(this.center, xNormal);
          const r = this._radius$1 / 44;
          const segments = 72;
          const radiansPerSegment = Math.PI * 2 / segments;
          const vertexList = [];
          for (let j = 0; j <= segments; j++) {
            const x = Math.cos(j * radiansPerSegment) * r;
            const y = Math.sin(j * radiansPerSegment) * r;
            vertexList.push(Vector3d.create(this.center.x + x * xNormal.x + y * yNormal.x, this.center.y + x * xNormal.y + y * yNormal.y, this.center.z + x * xNormal.z + y * yNormal.z));
          }
          if (this._strokeWidth$1 > 0 && vertexList.length > 1) {
            for (let i = 0; i < (vertexList.length - 1); i++) {
              Annotation.lineList.addLine(vertexList[i], vertexList[i + 1], this._lineColor$1, new Dates(0, 1));
            }
            Annotation.lineList.addLine(vertexList[vertexList.length - 1], vertexList[0], this._lineColor$1, new Dates(0, 1));
          }
          if (this._fill$1) {
            const indexes = Tessellator.tesselateSimplePoly(vertexList);
            for (let i = 0; i < indexes.length; i += 3) {
              Annotation.triangleList.addSubdividedTriangles(vertexList[indexes[i]], vertexList[indexes[i + 1]], vertexList[indexes[i + 2]], this._fillColor$1, new Dates(0, 1), 2);
            }
          }
          this.annotationDirty = false;
        }
      } else {
        if (onScreen) {
          const ctx = renderContext.device;
          ctx.save();
          ctx.globalAlpha = this.get_opacity();
          ctx.beginPath();
          ctx.arc(screenSpacePnt.x, screenSpacePnt.y, rad, 0, Math.PI * 2, true);
          ctx.lineWidth = this._strokeWidth$1;
          ctx.fillStyle = this._fillColor$1.toString();
          if (this._fill$1) {
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          ctx.strokeStyle = this._lineColor$1.toString();
          ctx.stroke();
          ctx.restore();
        }
      }
    },
    hitTest: function (renderContext, RA, dec, x, y) {
      if (ss.emptyString(this.get_id())) {
        return false;
      }
      let rad = this._radius$1;
      if (!this._skyRelative$1) {
        rad *= renderContext.get_fovScale() / 3600;
      }
      return Annotation.separation(RA, dec, this._ra$1, this._dec$1) < rad;
    }
  };

  function Poly() {
    this._points$1 = [];
    this._fill$1 = false;
    this._strokeWidth$1 = 1;
    this._lineColor$1 = Colors.get_white();
    this._fillColor$1 = Colors.get_white();
    Annotation.call(this);
  }
  const Poly$ = {
    addPoint: function (x, y) {
      Annotation.batchDirty = true;
      this._points$1.push(Coordinates.raDecTo3d(x / 15, y));
    },
    get_fill: function () {
      return this._fill$1;
    },
    set_fill: function (value) {
      Annotation.batchDirty = true;
      this._fill$1 = value;
      return value;
    },
    get_lineWidth: function () {
      return this._strokeWidth$1;
    },
    set_lineWidth: function (value) {
      Annotation.batchDirty = true;
      this._strokeWidth$1 = value;
      return value;
    },
    get_lineColor: function () {
      return this._lineColor$1.toString();
    },
    set_lineColor: function (value) {
      Annotation.batchDirty = true;
      this._lineColor$1 = Color.fromName(value);
      return value;
    },
    get_fillColor: function () {
      return this._fillColor$1.toString();
    },
    set_fillColor: function (value) {
      Annotation.batchDirty = true;
      this._fillColor$1 = Color.fromName(value);
      return value;
    },
    draw: function (renderContext) {
      if (renderContext.gl != null) {
        if (Annotation.batchDirty || this.annotationDirty) {
          const vertexList = this._points$1;
          if (this._strokeWidth$1 > 0 && this._points$1.length > 1) {
            for (let i = 0; i < (this._points$1.length - 1); i++) {
              Annotation.lineList.addLine(vertexList[i], vertexList[i + 1], this._lineColor$1, new Dates(0, 1));
            }
            Annotation.lineList.addLine(vertexList[this._points$1.length - 1], vertexList[0], this._lineColor$1, new Dates(0, 1));
          }
          if (this._fill$1) {
            const indexes = Tessellator.tesselateSimplePoly(vertexList);
            for (let i = 0; i < indexes.length; i += 3) {
              Annotation.triangleList.addSubdividedTriangles(vertexList[indexes[i]], vertexList[indexes[i + 1]], vertexList[indexes[i + 2]], this._fillColor$1, new Dates(0, 1), 2);
            }
          }
          this.annotationDirty = false;
        }
      } else {
        const ctx = renderContext.device;
        ctx.save();
        ctx.globalAlpha = this.get_opacity();
        ctx.beginPath();
        let first = true;
        const $enum1 = ss.enumerate(this._points$1);
        while ($enum1.moveNext()) {
          const pnt = $enum1.current;
          const screenSpacePnt = renderContext.WVP.transform(pnt);
          if (screenSpacePnt.z < 0) {
            ctx.restore();
            return;
          }
          if (Vector3d.dot(renderContext.get_viewPoint(), pnt) < 0.75) {
            ctx.restore();
            return;
          }
          if (first) {
            first = false;
            ctx.moveTo(screenSpacePnt.x, screenSpacePnt.y);
          } else {
            ctx.lineTo(screenSpacePnt.x, screenSpacePnt.y);
          }
        }
        ctx.closePath();
        ctx.lineWidth = this._strokeWidth$1;
        if (this._fill$1) {
          ctx.fillStyle = this._fillColor$1.toString();
          ctx.fill();
        }
        ctx.strokeStyle = this._lineColor$1.toString();
        ctx.globalAlpha = 1;
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  function PolyLine() {
    this._points$1 = [];
    this._strokeWidth$1 = 1;
    this._lineColor$1 = Colors.get_white();
    Annotation.call(this);
  }
  const PolyLine$ = {
    addPoint: function (x, y) {
      Annotation.batchDirty = true;
      this._points$1.push(Coordinates.raDecTo3d(x / 15, y));
    },
    get_lineWidth: function () {
      return this._strokeWidth$1;
    },
    set_lineWidth: function (value) {
      Annotation.batchDirty = true;
      this._strokeWidth$1 = value;
      return value;
    },
    get_lineColor: function () {
      return this._lineColor$1.toString();
    },
    set_lineColor: function (value) {
      Annotation.batchDirty = true;
      this._lineColor$1 = Color.fromName(value);
      return value;
    },
    draw: function (renderContext) {
      if (renderContext.gl != null) {
        if (Annotation.batchDirty || this.annotationDirty) {
          const vertexList = this._points$1;
          if (this._strokeWidth$1 > 0) {
            for (let i = 0; i < (this._points$1.length - 1); i++) {
              Annotation.lineList.addLine(vertexList[i], vertexList[i + 1], this._lineColor$1, new Dates(0, 1));
            }
          }
          this.annotationDirty = false;
        }
      } else {
        const ctx = renderContext.device;
        ctx.save();
        ctx.globalAlpha = this.get_opacity();
        let first = true;
        const $enum1 = ss.enumerate(this._points$1);
        while ($enum1.moveNext()) {
          const pnt = $enum1.current;
          const screenSpacePnt = renderContext.WVP.transform(pnt);
          if (screenSpacePnt.z < 0) {
            ctx.restore();
            return;
          }
          if (Vector3d.dot(renderContext.get_viewPoint(), pnt) < 0.75) {
            ctx.restore();
            return;
          }
          if (first) {
            first = false;
            ctx.beginPath();
            ctx.moveTo(screenSpacePnt.x, screenSpacePnt.y);
          } else {
            ctx.lineTo(screenSpacePnt.x, screenSpacePnt.y);
          }
        }
        ctx.lineWidth = this._strokeWidth$1;
        ctx.strokeStyle = this._lineColor$1.toString();
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  function EquirectangularTile() {
    this._tileDegrees$1 = 0;
    this._topDown$1 = true;
    this._subDivisionLevel$1 = 1;
    Tile.call(this);
  }
  EquirectangularTile.create = (level, x, y, dataset, parent) => {
    const temp = new EquirectangularTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = x;
    temp.tileY = y;
    temp.dataset = dataset;
    temp._topDown$1 = !dataset.get_bottomsUp();
    temp.computeBoundingSphere();
    return temp;
  };
  const EquirectangularTile$ = {
    computeBoundingSphere: function () {
      if (!this._topDown$1) {
        this.computeBoundingSphereBottomsUp();
        return;
      }
      this._tileDegrees$1 = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
      const latMin = (90 - ((this.tileY) * this._tileDegrees$1));
      const latMax = (90 - (((this.tileY + 1)) * this._tileDegrees$1));
      const lngMin = ((this.tileX * this._tileDegrees$1) - 180);
      const lngMax = ((((this.tileX + 1)) * this._tileDegrees$1) - 180);
      const latCenter = (latMin + latMax) / 2;
      const lngCenter = (lngMin + lngMax) / 2;
      this.sphereCenter = this.geoTo3d(latCenter, lngCenter, false);
      this.topLeft = this.geoTo3d(latMin, lngMin, false);
      this.bottomRight = this.geoTo3d(latMax, lngMax, false);
      this.topRight = this.geoTo3d(latMin, lngMax, false);
      this.bottomLeft = this.geoTo3d(latMax, lngMin, false);
      const distVect = this.geoTo3d(latMin, lngMin, false);
      distVect.subtract(this.sphereCenter);
      this.sphereRadius = distVect.length();
      this._tileDegrees$1 = lngMax - lngMin;
    },
    computeBoundingSphereBottomsUp: function () {
      let tileDegrees = this.dataset.get_baseTileDegrees() / (Math.pow(2, this.level));
      const latMin = (-90 + (((this.tileY + 1)) * tileDegrees));
      const latMax = (-90 + ((this.tileY) * tileDegrees));
      const lngMin = ((this.tileX * tileDegrees) - 180);
      const lngMax = ((((this.tileX + 1)) * tileDegrees) - 180);
      const latCenter = (latMin + latMax) / 2;
      const lngCenter = (lngMin + lngMax) / 2;
      this.sphereCenter = this.geoTo3d(latCenter, lngCenter, false);
      this.topLeft = this.geoTo3d(latMin, lngMin, false);
      this.bottomRight = this.geoTo3d(latMax, lngMax, false);
      this.topRight = this.geoTo3d(latMin, lngMax, false);
      this.bottomLeft = this.geoTo3d(latMax, lngMin, false);
      const distVect = this.topLeft;
      distVect.subtract(this.sphereCenter);
      this.sphereRadius = distVect.length();
      tileDegrees = lngMax - lngMin;
    },
    createGeometry: function (renderContext) {
      Tile.prototype.createGeometry.call(this, renderContext);
      if (renderContext.gl == null) {
        if (!this.dataset.get_dataSetType() || this.dataset.get_dataSetType() === 1) {
          this._subDivisionLevel$1 = Math.max(2, (4 - this.level) * 2);
        }
      } else {
        this._subDivisionLevel$1 = 32;
      }
      try {
        for (let i = 0; i < 4; i++) {
          this._renderTriangleLists[i] = [];
        }
        if (!this._topDown$1) {
          return this._createGeometryBottomsUp$1(renderContext);
        }
        let lat, lng;
        let index = 0;
        const tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
        const latMin = (90 - ((this.tileY) * tileDegrees));
        const latMax = (90 - (((this.tileY + 1)) * tileDegrees));
        const lngMin = ((this.tileX * tileDegrees) - 180);
        const lngMax = ((((this.tileX + 1)) * tileDegrees) - 180);
        const tileDegreesX = lngMax - lngMin;
        const tileDegreesY = latMax - latMin;
        this.topLeft = this.geoTo3d(latMin, lngMin, false);
        this.bottomRight = this.geoTo3d(latMax, lngMax, false);
        this.topRight = this.geoTo3d(latMin, lngMax, false);
        this.bottomLeft = this.geoTo3d(latMax, lngMin, false);
        const verts = new Array((this._subDivisionLevel$1 + 1) * (this._subDivisionLevel$1 + 1));
        let x, y;
        const textureStep = 1 / this._subDivisionLevel$1;
        for (y = 0; y <= this._subDivisionLevel$1; y++) {
          if (y !== this._subDivisionLevel$1) {
            lat = latMin + (textureStep * tileDegreesY * y);
          } else {
            lat = latMax;
          }
          for (x = 0; x <= this._subDivisionLevel$1; x++) {
            if (x !== this._subDivisionLevel$1) {
              lng = lngMin + (textureStep * tileDegreesX * x);
            } else {
              lng = lngMax;
            }
            index = y * (this._subDivisionLevel$1 + 1) + x;
            verts[index] = PositionTexture.createPos(this.geoTo3d(lat, lng, false), x * textureStep, y * textureStep);
          }
        }
        this.triangleCount = this._subDivisionLevel$1 * this._subDivisionLevel$1 * 2;
        const quarterDivisions = this._subDivisionLevel$1 / 2;
        let part = 0;
        if (renderContext.gl == null) {
          for (let y2 = 0; y2 < 2; y2++) {
            for (let x2 = 0; x2 < 2; x2++) {
              index = 0;
              for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
                for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                  let p1;
                  let p2;
                  let p3;
                  p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + x1)];
                  p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                  p3 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                  this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
                  p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                  p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                  p3 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                  this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
                }
              }
              part++;
            }
          }
        } else {
          this._vertexBuffer = Tile.prepDevice.createBuffer();
          Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
          const f32array = new Float32Array(verts.length * 5);
          const buffer = f32array;
          index = 0;
          const $enum1 = ss.enumerate(verts);
          while ($enum1.moveNext()) {
            const pt = $enum1.current;
            index = this.addVertex(buffer, index, pt);
          }
          Tile.prepDevice.bufferData(34962, f32array, 35044);
          for (let y2 = 0; y2 < 2; y2++) {
            for (let x2 = 0; x2 < 2; x2++) {
              const ui16array = new Uint16Array(this.triangleCount * 3);
              const indexArray = ui16array;
              index = 0;
              for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
                for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                  indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + x1);
                  indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                  indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                  indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                  indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                  indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                }
              }
              this._indexBuffers[part] = Tile.prepDevice.createBuffer();
              Tile.prepDevice.bindBuffer(34963, this._indexBuffers[part]);
              Tile.prepDevice.bufferData(34963, ui16array, 35044);
              part++;
            }
          }
        }
      } catch ($e2) {
      }
      return true;
    },
    _createGeometryBottomsUp$1: function (renderContext) {
      let lat, lng;
      let index = 0;
      const tileDegrees = this.dataset.get_baseTileDegrees() / Math.pow(2, this.level);
      const latMin = (-90 + (((this.tileY + 1)) * tileDegrees));
      const latMax = (-90 + ((this.tileY) * tileDegrees));
      const lngMin = ((this.tileX * tileDegrees) - 180);
      const lngMax = ((((this.tileX + 1)) * tileDegrees) - 180);
      const tileDegreesX = lngMax - lngMin;
      const tileDegreesY = latMax - latMin;
      const verts = new Array((this._subDivisionLevel$1 + 1) * (this._subDivisionLevel$1 + 1));
      let x, y;
      const textureStep = 1 / this._subDivisionLevel$1;
      for (y = 0; y <= this._subDivisionLevel$1; y++) {
        if (y !== this._subDivisionLevel$1) {
          lat = latMin + (textureStep * tileDegreesY * y);
        } else {
          lat = latMax;
        }
        for (x = 0; x <= this._subDivisionLevel$1; x++) {
          if (x !== this._subDivisionLevel$1) {
            lng = lngMin + (textureStep * tileDegreesX * x);
          } else {
            lng = lngMax;
          }
          index = y * (this._subDivisionLevel$1 + 1) + x;
          verts[index] = PositionTexture.createPos(this.geoTo3d(lat, lng, false), x * textureStep, y * textureStep);
        }
      }
      this.triangleCount = this._subDivisionLevel$1 * this._subDivisionLevel$1 * 2;
      const quarterDivisions = this._subDivisionLevel$1 / 2;
      let part = 0;
      if (renderContext.gl == null) {
        for (let y2 = 0; y2 < 2; y2++) {
          for (let x2 = 0; x2 < 2; x2++) {
            index = 0;
            for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
              for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                let p1;
                let p2;
                let p3;
                p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + x1)];
                p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                p3 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
                p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                p3 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                this._renderTriangleLists[part].push(RenderTriangle.create(p1, p3, p2, this.texture, this.level));
              }
            }
            part++;
          }
        }
      } else {
        this._vertexBuffer = Tile.prepDevice.createBuffer();
        Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
        const f32array = new Float32Array(verts.length * 5);
        const buffer = f32array;
        index = 0;
        const $enum1 = ss.enumerate(verts);
        while ($enum1.moveNext()) {
          const pt = $enum1.current;
          index = this.addVertex(buffer, index, pt);
        }
        Tile.prepDevice.bufferData(34962, f32array, 35044);
        for (let y2 = 0; y2 < 2; y2++) {
          for (let x2 = 0; x2 < 2; x2++) {
            const ui16array = new Uint16Array(this.triangleCount * 3);
            const indexArray = ui16array;
            index = 0;
            for (let y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
              for (let x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1));
              }
            }
            this._indexBuffers[part] = Tile.prepDevice.createBuffer();
            Tile.prepDevice.bindBuffer(34963, this._indexBuffers[part]);
            Tile.prepDevice.bufferData(34963, ui16array, 35044);
            part++;
          }
        }
      }
      return true;
    }
  };

  function MercatorTile() {
    this._tileDegrees$1 = 0;
    this._latMin$1 = 0;
    this._latMax$1 = 0;
    this._lngMin$1 = 0;
    this._lngMax$1 = 0;
    this._subDivisionLevel$1 = 32;
    Tile.call(this);
  }
  MercatorTile.create = (level, X, Y, dataset, parent) => {
    const temp = new MercatorTile();
    temp.parent = parent;
    temp.level = level;
    temp.tileX = X;
    temp.tileY = Y;
    temp.dataset = dataset;
    temp.computeBoundingSphere();
    return temp;
  };
  MercatorTile.getCentrePointOffsetAsTileRatio = (lat, lon, zoom) => {
    const metersX = MercatorTile.absoluteLonToMetersAtZoom(lon, zoom);
    const relativeXIntoCell = (metersX / 256) - Math.floor(metersX / 256);
    const metersY = MercatorTile.absoluteLatToMetersAtZoom(lat, zoom);
    const relativeYIntoCell = (metersY / 256) - Math.floor(metersY / 256);
    return Vector2d.create(relativeXIntoCell, relativeYIntoCell);
  };
  MercatorTile.relativeMetersToLatAtZoom = (Y, zoom) => {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersY = Y * metersPerPixel;
    return MercatorTile._radToDeg$1(Math.PI / 2 - 2 * Math.atan(Math.exp(0 - metersY / 6378137)));
  };
  MercatorTile.relativeMetersToLonAtZoom = (X, zoom) => {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersX = X * metersPerPixel;
    return MercatorTile._radToDeg$1(metersX / 6378137);
  };
  MercatorTile.absoluteLatToMetersAtZoom = (latitude, zoom) => {
    const sinLat = Math.sin(MercatorTile._degToRad$1(latitude));
    const metersY = 6378137 / 2 * Math.log((1 + sinLat) / (1 - sinLat));
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate((Math.round(20037508 - metersY) / metersPerPixel));
  };
  MercatorTile.absoluteMetersToLatAtZoom = (Y, zoom) => {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersY = 20037508 - Y * metersPerPixel;
    return MercatorTile._radToDeg$1(Math.PI / 2 - 2 * Math.atan(Math.exp(0 - metersY / 6378137)));
  };
  MercatorTile.absoluteLonToMetersAtZoom = (longitude, zoom) => {
    const metersX = 6378137 * MercatorTile._degToRad$1(longitude);
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate(((metersX + 20037508) / metersPerPixel));
  };
  MercatorTile.absoluteMetersToLonAtZoom = (X, zoom) => {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersX = X * metersPerPixel - 20037508;
    return MercatorTile._radToDeg$1(metersX / 6378137);
  };
  MercatorTile.absoluteLonToMetersAtZoomTile = (longitude, zoom, tileX) => {
    const metersX = 6378137 * MercatorTile._degToRad$1(longitude);
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate(((metersX + 20037508) / metersPerPixel));
  };
  MercatorTile.absoluteLatToMetersAtZoomTile = (latitude, zoom, tileX) => {
    const sinLat = Math.sin(MercatorTile._degToRad$1(latitude));
    const metersY = 6378137 / 2 * Math.log((1 + sinLat) / (1 - sinLat));
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    return ss.truncate((Math.round(20037508 - metersY) / metersPerPixel));
  };
  MercatorTile.absoluteMetersToLonAtZoomByTileY = (X, zoom, tileY) => {
    const metersPerPixel = MercatorTile.metersPerPixel2(zoom);
    const metersX = X * metersPerPixel - 20037508;
    return MercatorTile._radToDeg$1(metersX / 6378137);
  };
  MercatorTile._degToRad$1 = deg => (deg * Math.PI / 180);
  MercatorTile.metersPerPixel2 = zoom => (156543 / (1 << zoom));
  MercatorTile._radToDeg$1 = rad => (rad * 180 / Math.PI);
  const MercatorTile$ = {
    computeBoundingSphere: function () {
      this._tileDegrees$1 = 360 / Math.pow(2, this.level);
      this._latMin$1 = MercatorTile.absoluteMetersToLatAtZoom(this.tileY * 256, this.level);
      this._latMax$1 = MercatorTile.absoluteMetersToLatAtZoom((this.tileY + 1) * 256, this.level);
      this._lngMin$1 = ((this.tileX * this._tileDegrees$1) - 180);
      this._lngMax$1 = ((((this.tileX + 1)) * this._tileDegrees$1) - 180);
      const latCenter = (this._latMin$1 + this._latMax$1) / 2;
      const lngCenter = (this._lngMin$1 + this._lngMax$1) / 2;
      this.sphereCenter = this.geoTo3d(latCenter, lngCenter, false);
      this.topLeft = this.geoTo3d(this._latMin$1, this._lngMin$1, false);
      this.bottomRight = this.geoTo3d(this._latMax$1, this._lngMax$1, false);
      this.topRight = this.geoTo3d(this._latMin$1, this._lngMax$1, false);
      this.bottomLeft = this.geoTo3d(this._latMax$1, this._lngMin$1, false);
      if (!this.tileY) {
        this.topLeft = Vector3d.create(0, 1, 0);
        this.topRight = Vector3d.create(0, 1, 0);
      }
      if (this.tileY === Math.pow(2, this.level) - 1) {
        this.bottomRight = Vector3d.create(0, -1, 0);
        this.bottomLeft = Vector3d.create(0, -1, 0);
      }
      let distVect = this.topLeft;
      distVect.subtract(this.sphereCenter);
      this.sphereRadius = distVect.length();
      distVect = this.bottomRight;
      distVect.subtract(this.sphereCenter);
      const len = distVect.length();
      if (this.sphereRadius < len) {
        this.sphereRadius = len;
      }
      this._tileDegrees$1 = Math.abs(this._latMax$1 - this._latMin$1);
    },
    isPointInTile: function (lat, lng) {
      if (!this.demReady || this.demData == null || lat < Math.min(this._latMin$1, this._latMax$1) || lat > Math.max(this._latMax$1, this._latMin$1) || lng < Math.min(this._lngMin$1, this._lngMax$1) || lng > Math.max(this._lngMin$1, this._lngMax$1)) {
        return false;
      }
      return true;
    },
    getSurfacePointAltitude: function (lat, lng, meters) {
      if (this.level < Tile.lastDeepestLevel) {
        const $enum1 = ss.enumerate(this.children);
        while ($enum1.moveNext()) {
          const child = $enum1.current;
          if (child != null) {
            if (child.isPointInTile(lat, lng)) {
              const retVal = child.getSurfacePointAltitude(lat, lng, meters);
              if (!!retVal) {
                return retVal;
              } else {
                break;
              }
            }
          }
        }
      }
      const alt = this._getAltitudeAtLatLng$1(lat, lng, (meters) ? 1 : this.get__demScaleFactor());
      return alt;
    },
    _getAltitudeAtLatLng$1: function (lat, lng, scaleFactor) {
      const height = Math.abs(this._latMax$1 - this._latMin$1);
      const width = Math.abs(this._lngMax$1 - this._lngMin$1);
      const yy = ((lat - Math.min(this._latMax$1, this._latMin$1)) / height * 32);
      const xx = ((lng - Math.min(this._lngMax$1, this._lngMin$1)) / width * 32);
      const indexY = Math.min(31, ss.truncate(yy));
      const indexX = Math.min(31, ss.truncate(xx));
      const ha = xx - indexX;
      const va = yy - indexY;
      const ul = this.demData[indexY * 33 + indexX];
      const ur = this.demData[indexY * 33 + (indexX + 1)];
      const ll = this.demData[(indexY + 1) * 33 + indexX];
      const lr = this.demData[(indexY + 1) * 33 + (indexX + 1)];
      const top = ul * (1 - ha) + ha * ur;
      const bottom = ll * (1 - ha) + ha * lr;
      const val = top * (1 - va) + va * bottom;
      return val / scaleFactor;
    },
    createGeometry: function (renderContext) {
      Tile.prototype.createGeometry.call(this, renderContext);
      if (this.geometryCreated) {
        return true;
      }
      this.geometryCreated = true;
      if (Tile.uvMultiple === 256) {
        if (!this.dataset.get_dataSetType() || this.dataset.get_dataSetType() === 1) {
          this._subDivisionLevel$1 = Math.max(2, (6 - this.level) * 2);
        }
      }
      for (let i = 0; i < 4; i++) {
        this._renderTriangleLists[i] = [];
      }
      let lat, lng;
      let index = 0;
      let tileDegrees = 360 / Math.pow(2, this.level);
      this._latMin$1 = MercatorTile.absoluteMetersToLatAtZoom(this.tileY * 256, this.level);
      this._latMax$1 = MercatorTile.absoluteMetersToLatAtZoom((this.tileY + 1) * 256, this.level);
      this._lngMin$1 = ((this.tileX * tileDegrees) - 180);
      this._lngMax$1 = ((((this.tileX + 1)) * tileDegrees) - 180);
      const latCenter = MercatorTile.absoluteMetersToLatAtZoom(((this.tileY * 2) + 1) * 256, this.level + 1);
      this.topLeft = this.geoTo3d(this._latMin$1, this._lngMin$1, false);
      this.bottomRight = this.geoTo3d(this._latMax$1, this._lngMax$1, false);
      this.topRight = this.geoTo3d(this._latMin$1, this._lngMax$1, false);
      this.bottomLeft = this.geoTo3d(this._latMax$1, this._lngMin$1, false);
      const verts = new Array((this._subDivisionLevel$1 + 1) * (this._subDivisionLevel$1 + 1));
      tileDegrees = this._lngMax$1 - this._lngMin$1;
      const dGrid = (tileDegrees / this._subDivisionLevel$1);
      let x1, y1;
      const textureStep = 1 / this._subDivisionLevel$1;
      let latDegrees = this._latMax$1 - latCenter;
      for (y1 = 0; y1 < this._subDivisionLevel$1 / 2; y1++) {
        if (y1 !== this._subDivisionLevel$1 / 2) {
          lat = this._latMax$1 - (2 * textureStep * latDegrees * y1);
        } else {
          lat = latCenter;
        }
        for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
          if (x1 !== this._subDivisionLevel$1) {
            lng = this._lngMin$1 + (textureStep * tileDegrees * x1);
          } else {
            lng = this._lngMax$1;
          }
          index = y1 * (this._subDivisionLevel$1 + 1) + x1;
          verts[index] = new PositionTexture();
          verts[index].position = this.geoTo3dWithAlt(lat, lng, false, true);
          verts[index].tu = (x1 * textureStep) * Tile.uvMultiple;
          verts[index].tv = ((MercatorTile.absoluteLatToMetersAtZoom(lat, this.level) - (this.tileY * 256)) / 256) * Tile.uvMultiple;
          this.demIndex++;
        }
      }
      latDegrees = this._latMin$1 - latCenter;
      for (y1 = this._subDivisionLevel$1 / 2; y1 <= this._subDivisionLevel$1; y1++) {
        if (y1 !== this._subDivisionLevel$1) {
          lat = latCenter + (2 * textureStep * latDegrees * (y1 - (this._subDivisionLevel$1 / 2)));
        } else {
          lat = this._latMin$1;
        }
        for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
          if (x1 !== this._subDivisionLevel$1) {
            lng = this._lngMin$1 + (textureStep * tileDegrees * x1);
          } else {
            lng = this._lngMax$1;
          }
          index = y1 * (this._subDivisionLevel$1 + 1) + x1;
          verts[index] = new PositionTexture();
          verts[index].position = this.geoTo3dWithAlt(lat, lng, false, true);
          verts[index].tu = (x1 * textureStep) * Tile.uvMultiple;
          verts[index].tv = ((MercatorTile.absoluteLatToMetersAtZoom(lat, this.level) - (this.tileY * 256)) / 256) * Tile.uvMultiple;
          this.demIndex++;
        }
      }
      if (!this.tileY) {
        y1 = this._subDivisionLevel$1;
        for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
          index = y1 * (this._subDivisionLevel$1 + 1) + x1;
          verts[index].position = Vector3d.create(0, 1, 0);
        }
      }
      if (this.tileY === Math.pow(2, this.level) - 1) {
        y1 = 0;
        for (x1 = 0; x1 <= this._subDivisionLevel$1; x1++) {
          index = y1 * (this._subDivisionLevel$1 + 1) + x1;
          verts[index].position = Vector3d.create(0, -1, 0);
        }
      }
      this.triangleCount = this._subDivisionLevel$1 * this._subDivisionLevel$1 * 2;
      const quarterDivisions = this._subDivisionLevel$1 / 2;
      let part = 0;
      if (renderContext.gl == null) {
        for (let y2 = 0; y2 < 2; y2++) {
          for (let x2 = 0; x2 < 2; x2++) {
            index = 0;
            for (y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
              for (x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                let p1;
                let p2;
                let p3;
                p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + x1)];
                p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                p3 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                let tri = RenderTriangle.create(p1, p2, p3, this.texture, this.level);
                this._renderTriangleLists[part].push(tri);
                p1 = verts[(y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                p2 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1)];
                p3 = verts[((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1))];
                tri = RenderTriangle.create(p1, p2, p3, this.texture, this.level);
                this._renderTriangleLists[part].push(tri);
              }
            }
            part++;
          }
        }
      } else {
        this._vertexBuffer = Tile.prepDevice.createBuffer();
        Tile.prepDevice.bindBuffer(34962, this._vertexBuffer);
        const f32array = new Float32Array(verts.length * 5);
        const buffer = f32array;
        index = 0;
        const $enum1 = ss.enumerate(verts);
        while ($enum1.moveNext()) {
          const pt = $enum1.current;
          index = this.addVertex(buffer, index, pt);
        }
        Tile.prepDevice.bufferData(34962, f32array, 35044);
        for (let y2 = 0; y2 < 2; y2++) {
          for (let x2 = 0; x2 < 2; x2++) {
            const ui16array = new Uint16Array(this.triangleCount * 3);
            const indexArray = ui16array;
            index = 0;
            for (y1 = (quarterDivisions * y2); y1 < (quarterDivisions * (y2 + 1)); y1++) {
              for (x1 = (quarterDivisions * x2); x1 < (quarterDivisions * (x2 + 1)); x1++) {
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                indexArray[index++] = (y1 * (this._subDivisionLevel$1 + 1) + (x1 + 1));
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + x1);
                indexArray[index++] = ((y1 + 1) * (this._subDivisionLevel$1 + 1) + (x1 + 1));
              }
            }
            this._indexBuffers[part] = Tile.prepDevice.createBuffer();
            Tile.prepDevice.bindBuffer(34963, this._indexBuffers[part]);
            Tile.prepDevice.bufferData(34963, ui16array, 35044);
            part++;
          }
        }
      }
      return true;
    },
    _getDemSample$1: function (x, y) {
      return this.demData[(32 - y) * 33 + x];
    },
    createDemFromParent: function () {
      const parent = ss.safeCast(this.parent, MercatorTile);
      if (parent == null || parent.demData == null) {
        return false;
      }
      const offsetX = (((this.tileX % 2) === 1) ? 16 : 0);
      const offsetY = (((this.tileY % 2) === 1) ? 16 : 0);
      this.demData = new Array(this.demSize);
      for (let y = 0; y < 33; y += 2) {
        let copy = true;
        for (let x = 0; x < 33; x++) {
          if (copy) {
            this.demData[(32 - y) * 33 + x] = parent._getDemSample$1((x / 2) + offsetX, (y / 2) + offsetY);
          } else {
            this.demData[(32 - y) * 33 + x] = ((parent._getDemSample$1((x / 2) + offsetX, (y / 2) + offsetY) + parent._getDemSample$1(((x / 2) + offsetX) + 1, (y / 2) + offsetY)) / 2);
          }
          copy = !copy;
        }
      }
      for (let y = 1; y < 33; y += 2) {
        for (let x = 0; x < 33; x++) {
          this.demData[(32 - y) * 33 + x] = ((this._getDemSample$1(x, y - 1) + this._getDemSample$1(x, y + 1)) / 2);
        }
      }
      const $enum1 = ss.enumerate(this.demData);
      while ($enum1.moveNext()) {
        const sample = $enum1.current;
        this.demAverage += sample;
      }
      this.demAverage /= this.demData.length;
      this.demReady = true;
      return true;
    }
  };

  function SlideChangedEventArgs(caption) {
    ss.EventArgs.call(this);
    this.set_caption(caption);
  }
  const SlideChangedEventArgs$ = {
    get_caption: function () {
      return this._caption$2;
    },
    set_caption: function (value) {
      this._caption$2 = value;
      return value;
    }
  };

  function ArrivedEventArgs(ra, dec, zoom) {
    this._ra$2 = 0;
    this._dec$2 = 0;
    this._zoom$2 = 0;
    ss.EventArgs.call(this);
    this.set_RA(ra * 15);
    this.set_dec(dec);
    this.set_zoom(zoom / 6);
  }
  const ArrivedEventArgs$ = {
    get_RA: function () {
      return this._ra$2;
    },
    set_RA: function (value) {
      this._ra$2 = value;
      return value;
    },
    get_dec: function () {
      return this._dec$2;
    },
    set_dec: function (value) {
      this._dec$2 = value;
      return value;
    },
    get_zoom: function () {
      return this._zoom$2;
    },
    set_zoom: function (value) {
      this._zoom$2 = value;
      return value;
    }
  };

  function AnnotationClickEventArgs(ra, dec, id) {
    this._ra$2 = 0;
    this._dec$2 = 0;
    ss.EventArgs.call(this);
    this.set_RA(ra * 15);
    this.set_dec(dec);
    this.set_id(id);
  }
  const AnnotationClickEventArgs$ = {
    get_RA: function () {
      return this._ra$2;
    },
    set_RA: function (value) {
      this._ra$2 = value;
      return value;
    },
    get_dec: function () {
      return this._dec$2;
    },
    set_dec: function (value) {
      this._dec$2 = value;
      return value;
    },
    get_id: function () {
      return this._id$2;
    },
    set_id: function (value) {
      this._id$2 = value;
      return value;
    }
  };

  function CollectionLoadedEventArgs(url) {
    ss.EventArgs.call(this);
    this._url$2 = url;
  }
  const CollectionLoadedEventArgs$ = {
    get_url: function () {
      return this._url$2;
    },
    set_url: function (value) {
      this._url$2 = value;
      return value;
    }
  };


  const $exports = ss.module('wwtlib',
    {
      IFolder: [IFolder],
      Sprite2d,
      VertexPosition,
      Table,
      MinorPlanets,
      TileCache,
      DistanceCalc,
      Triangle,
      Util,
      Wtml,
      FolderUp: [FolderUp, {}, null, IThumbnail],
      ViewMoverSlew: [ViewMoverSlew, ViewMoverSlew$, null, IViewMover],
      MainView: [MainView, null, null],
      PositionTextureVertexBuffer: [PositionTextureVertexBuffer, PositionTextureVertexBuffer$, VertexBufferBase],
      KeplerVertexBuffer: [KeplerVertexBuffer, KeplerVertexBuffer$, VertexBufferBase],
      TimeSeriesLineVertexBuffer: [TimeSeriesLineVertexBuffer, TimeSeriesLineVertexBuffer$, VertexBufferBase],
      TimeSeriesPointVertexBuffer: [TimeSeriesPointVertexBuffer, TimeSeriesPointVertexBuffer$, VertexBufferBase],
      PositionColoredVertexBuffer: [PositionColoredVertexBuffer, PositionColoredVertexBuffer$, VertexBufferBase],
      PositionColoredTexturedVertexBuffer: [PositionColoredTexturedVertexBuffer, PositionColoredTexturedVertexBuffer$, VertexBufferBase],
      LayerCollection: [LayerCollection, LayerCollection$, Layer]
    },
    {
      DAY_OF_WEEK,
      EO,
      CullMode,
      PointScaleTypes,
      DataTypes,
      ScaleTypes,
      AltUnits,
      FadeType,
      ReferenceFrames,
      ReferenceFrameTypes,
      CoordinatesTypes,
      AltTypes,
      MarkerMixes,
      ColorMaps,
      PlotTypes,
      MarkerScales,
      RAUnits,
      Primitives,
      Alignment,
      StockSkyOverlayTypes,
      OverlayAnchor,
      AudioType,
      ShapeType,
      LoopTypes,
      SelectionAnchor,
      TextBorderStyle,
      UserLevel,
      TransitionType,
      Keys,
      DialogResult,
      Formatting,
      StateType,
      SolarSystemObjects,
      InterpolationType,
      PointType,
      LocationHint,
      FolderGroup,
      FolderRefreshType,
      FolderType,
      ThumbnailSize,
      ProjectionType,
      ImageSetType,
      BandPass,
      Classification,
      GFX: [GFX, null, null],
      ABR,
      ACFT,
      ASEP,
      COR: [COR, {}, null],
      C3D: [C3D, {}, null],
      CT: [CT, {}, null],
      CalD,
      DT,
      DYT: [DYT, {}, null],
      CAAEarth: [CAAEarth, {}, null],
      VSC: [VSC, {}, null],
      CAAEclipticalElementDetails,
      CAAEclipticalElements,
      EPO,
      EOE,
      EPD,
      EOD,
      ELL: [ELL, {}, null],
      EOT: [EOT, {}, null],
      CAAFK5: [CAAFK5, {}, null],
      GMD: [GMD, {}, null],
      GMDS: [GMDS, {}, null],
      GM: [GM, {}, null],
      CAAGlobe: [CAAGlobe, {}, null],
      IFR: [IFR, {}, null],
      INTP: [INTP, {}, null],
      CAAJupiter: [CAAJupiter, {}, null],
      CAAKepler: [CAAKepler, {}, null],
      CAAMars: [CAAMars, {}, null],
      CAAMercury: [CAAMercury, {}, null],
      CAAMoon: [CAAMoon, {}, null],
      MoonCoefficient1,
      MoonCoefficient2,
      MIFR,
      CAAMoonNodes: [CAAMoonNodes, {}, null],
      CAAMoonPerigeeApogee: [CAAMoonPerigeeApogee, {}, null],
      MPAC: [MPAC, {}, null],
      CAAMoonPhases: [CAAMoonPhases, {}, null],
      CAANeptune: [CAANeptune, {}, null],
      CAANutation: [CAANutation, {}, null],
      NUC: [NUC, {}, null],
      CAATopocentricEclipticDetails: [CAATopocentricEclipticDetails, {}, null],
      CAAParallax: [CAAParallax, {}, null],
      CAAPhysicalJupiterDetails: [CAAPhysicalJupiterDetails, {}, null],
      CAAPhysicalJupiter: [CAAPhysicalJupiter, {}, null],
      CAAPhysicalMarsDetails: [CAAPhysicalMarsDetails, {}, null],
      CAAPhysicalMars: [CAAPhysicalMars, {}, null],
      CAAPhysicalSunDetails: [CAAPhysicalSunDetails, {}, null],
      CAAPhysicalSun: [CAAPhysicalSun, {}, null],
      CAAPluto: [CAAPluto, {}, null],
      PlutoCoefficient1: [PlutoCoefficient1, {}, null],
      PlutoCoefficient2: [PlutoCoefficient2, {}, null],
      CAAPrecession: [CAAPrecession, {}, null],
      CAARiseTransitSetDetails: [CAARiseTransitSetDetails, {}, null],
      CAARiseTransitSet: [CAARiseTransitSet, {}, null],
      CAASaturn: [CAASaturn, {}, null],
      CAASaturnRingDetails: [CAASaturnRingDetails, {}, null],
      CAASaturnRings: [CAASaturnRings, {}, null],
      CAASidereal: [CAASidereal, {}, null],
      CAAStellarMagnitudes: [CAAStellarMagnitudes, {}, null],
      CAASun: [CAASun, {}, null],
      CAAUranus: [CAAUranus, {}, null],
      CAAVenus: [CAAVenus, {}, null],
      AstroRaDec: [AstroRaDec, {}, null],
      RiseSetDetails: [RiseSetDetails, {}, null],
      AstroCalc: [AstroCalc, {}, null],
      ShortIndexBuffer: [ShortIndexBuffer, ShortIndexBuffer$, null],
      IndexBuffer: [IndexBuffer, IndexBuffer$, null, ss.IDisposable],
      VertexBufferBase: [VertexBufferBase, VertexBufferBase$, null, ss.IDisposable],
      Dates: [Dates, Dates$, null],
      SimpleLineList: [SimpleLineList, SimpleLineList$, null],
      OrbitLineList: [OrbitLineList, OrbitLineList$, null],
      LineList: [LineList, LineList$, null],
      TriangleList: [TriangleList, TriangleList$, null],
      PointList: [PointList, PointList$, null],
      TimeSeriesLineVertex: [TimeSeriesLineVertex, TimeSeriesLineVertex$, null],
      TimeSeriesPointVertex: [TimeSeriesPointVertex, TimeSeriesPointVertex$, null],
      SimpleLineShader: [SimpleLineShader, SimpleLineShader$, null],
      SimpleLineShader2D: [SimpleLineShader2D, SimpleLineShader2D$, null],
      OrbitLineShader: [OrbitLineShader, OrbitLineShader$, null],
      LineShaderNormalDates: [LineShaderNormalDates, LineShaderNormalDates$, null],
      TimeSeriesPointSpriteShader: [TimeSeriesPointSpriteShader, TimeSeriesPointSpriteShader$, null],
      KeplerPointSpriteShader: [KeplerPointSpriteShader, KeplerPointSpriteShader$, null],
      EllipseShader: [EllipseShader, EllipseShader$, null],
      ModelShader: [ModelShader, ModelShader$, null],
      ModelShaderTan: [ModelShaderTan, ModelShaderTan$, null],
      TileShader: [TileShader, TileShader$, null],
      ImageShader: [ImageShader, ImageShader$, null],
      ImageShader2: [ImageShader2, ImageShader2$, null],
      SpriteShader: [SpriteShader, SpriteShader$, null],
      ShapeSpriteShader: [ShapeSpriteShader, ShapeSpriteShader$, null],
      TextShader: [TextShader, TextShader$, null],
      Tessellator: [Tessellator, Tessellator$, null],
      Texture: [Texture, Texture$, null, ss.IDisposable],
      Grids: [Grids, Grids$, null],
      KeplerVertex: [KeplerVertex, KeplerVertex$, null],
      ScaleMap: [ScaleMap, ScaleMap$, null],
      Layer: [Layer, Layer$, null],
      DomainValue: [DomainValue, DomainValue$, null],
      LayerManager: [LayerManager, LayerManager$, null],
      LayerMap: [LayerMap, LayerMap$, null],
      SkyOverlays: [SkyOverlays, SkyOverlays$, null],
      GroundOverlayLayer: [GroundOverlayLayer, GroundOverlayLayer$, null],
      FrameTarget: [FrameTarget, FrameTarget$, null],
      LayerUI: [LayerUI, LayerUI$, null],
      LayerUIMenuItem: [LayerUIMenuItem, LayerUIMenuItem$, null],
      LayerUITreeNode: [LayerUITreeNode, LayerUITreeNode$, null],
      Group: [Group, Group$, null],
      Mesh: [Mesh, Mesh$, null, ss.IDisposable],
      Object3d: [Object3d, Object3d$, null],
      ObjectNode: [ObjectNode, ObjectNode$, null],
      Orbit: [Orbit, Orbit$, null],
      EllipseRenderer: [EllipseRenderer, EllipseRenderer$, null],
      ReferenceFrame: [ReferenceFrame, ReferenceFrame$, null],
      KmlCoordinate: [KmlCoordinate, KmlCoordinate$, null],
      KmlLineList: [KmlLineList, KmlLineList$, null],
      PushPin: [PushPin, PushPin$, null],
      VoTable: [VoTable, VoTable$, null],
      VoRow: [VoRow, VoRow$, null],
      VoColumn: [VoColumn, VoColumn$, null],
      WcsImage: [WcsImage, WcsImage$, null],
      KeplerianElements: [KeplerianElements, KeplerianElements$, null],
      BodyAngles: [BodyAngles, BodyAngles$, null],
      Planets: [Planets, Planets$, null],
      Material: [Material, Material$, null],
      RenderContext: [RenderContext, RenderContext$, null],
      RenderTriangle: [RenderTriangle, RenderTriangle$, null],
      ScriptInterface: [ScriptInterface, ScriptInterface$, null],
      Settings: [Settings, Settings$, null, ISettings],
      Text3dBatch: [Text3dBatch, Text3dBatch$, null],
      GlyphItem: [GlyphItem, GlyphItem$, null],
      GlyphCache: [GlyphCache, GlyphCache$, null, ss.IDisposable],
      Text3d: [Text3d, Text3d$, null],
      SpaceTimeController: [SpaceTimeController, SpaceTimeController$, null],
      Star: [Star, Star$, null],
      Galaxy: [Galaxy, Galaxy$, null],
      Tile: [Tile, Tile$, null],
      Tour: [Tour, Tour$, null, IThumbnail],
      FileEntry: [FileEntry, FileEntry$, null],
      FileCabinet: [FileCabinet, FileCabinet$, null],
      SettingParameter: [SettingParameter, SettingParameter$, null],
      Overlay: [Overlay, Overlay$, null],
      Selection: [Selection, Selection$, null],
      TextObject: [TextObject, TextObject$, null],
      TourDocument: [TourDocument, TourDocument$, null],
      TourEditTab: [TourEditTab, TourEditTab$, null],
      TourEditor: [TourEditor, TourEditor$, null, IUiController],
      OverlayList: [OverlayList, OverlayList$, null],
      TourEdit: [TourEdit, TourEdit$, null],
      SoundEditor: [SoundEditor, SoundEditor$, null],
      TourStopList: [TourStopList, TourStopList$, null],
      TimeLine: [TimeLine, TimeLine$, null],
      TourPlayer: [TourPlayer, TourPlayer$, null, IUiController],
      MasterTime: [MasterTime, MasterTime$, null],
      TourStop: [TourStop, TourStop$, null, ISettings],
      LayerInfo: [LayerInfo, LayerInfo$, null],
      UndoTourStopChange: [UndoTourStopChange, UndoTourStopChange$, null],
      Undo: [Undo, Undo$, null],
      UndoStep: [UndoStep, UndoStep$, null],
      UndoTourSlidelistChange: [UndoTourSlidelistChange, UndoTourSlidelistChange$, null],
      UndoTourPropertiesChange: [UndoTourPropertiesChange, UndoTourPropertiesChange$, null],
      UiTools: [UiTools, UiTools$, null],
      Rectangle: [Rectangle, Rectangle$, null],
      Guid: [Guid, Guid$, null],
      Enums: [Enums, Enums$, null],
      Mouse: [Mouse, null, null],
      Language,
      Cursor: [Cursor, Cursor$, null],
      Cursors: [Cursors, Cursors$, null],
      SelectLink: [SelectLink, SelectLink$, null],
      PopupVolume: [PopupVolume, PopupVolume$, null],
      PopupColorPicker: [PopupColorPicker, PopupColorPicker$, null],
      OverlayProperties: [OverlayProperties, OverlayProperties$, null],
      BinaryReader: [BinaryReader, BinaryReader$, null],
      Bitmap: [Bitmap, Bitmap$, null],
      ColorPicker: [ColorPicker, ColorPicker$, null],
      ContextMenuStrip: [ContextMenuStrip, ContextMenuStrip$, null],
      ToolStripMenuItem: [ToolStripMenuItem, ToolStripMenuItem$, null],
      TagMe: [TagMe, TagMe$, null],
      Dialog: [Dialog, Dialog$, null],
      Histogram: [Histogram, Histogram$, null],
      SimpleInput: [SimpleInput, SimpleInput$, null],
      XmlTextWriter: [XmlTextWriter, XmlTextWriter$, null],
      VizLayer: [VizLayer, VizLayer$, null],
      DataItem: [DataItem, DataItem$, null],
      WebFile: [WebFile, WebFile$, null],
      WWTControl: [WWTControl, WWTControl$, null],
      WWTElementEvent: [WWTElementEvent, WWTElementEvent$, null],
      Annotation: [Annotation, Annotation$, null],
      BlendState,
      CameraParameters: [CameraParameters, CameraParameters$, null],
      Color,
      Colors,
      Constellations: [Constellations, Constellations$, null],
      Lineset: [Lineset, Lineset$, null],
      Linepoint: [Linepoint, Linepoint$, null],
      ConstellationFilter: [ConstellationFilter, ConstellationFilter$, null],
      Coordinates: [Coordinates, Coordinates$, null],
      PositionTexture: PositionTexture,
      PositionColoredTextured: PositionColoredTextured,
      PositionColored: PositionColored,
      PositionNormalTexturedTangent: PositionNormalTexturedTangent,
      Vector3d: Vector3d,
      Vector2d: Vector2d,
      Matrix3d: [Matrix3d, Matrix3d$, null],
      Matrix2d: [Matrix2d, Matrix2d$, null],
      DoubleUtilities: [DoubleUtilities, null, null],
      PlaneD: [PlaneD, PlaneD$, null],
      Vector4d: [Vector4d, Vector4d$, null],
      PositionNormalTexturedX2: [PositionNormalTexturedX2, PositionNormalTexturedX2$, null],
      PositionNormalTextured: [PositionNormalTextured, PositionNormalTextured$, null],
      SphereHull: [SphereHull, SphereHull$, null],
      ConvexHull: [ConvexHull, ConvexHull$, null],
      Folder,
      FolderBrowser: [FolderBrowser, FolderBrowser$, null],
      Imageset: [Imageset, Imageset$, null],
      ViewMoverKenBurnsStyle: [ViewMoverKenBurnsStyle, ViewMoverKenBurnsStyle$, null],
      Place: [Place, Place$, null],
      Class1: [Class1, Class1$, null],
      PositionVertexBuffer: [PositionVertexBuffer, PositionVertexBuffer$, VertexBufferBase],
      PositionNormalTexturedVertexBuffer: [PositionNormalTexturedVertexBuffer, PositionNormalTexturedVertexBuffer$, VertexBufferBase],
      PositionNormalTexturedTangentVertexBuffer: [PositionNormalTexturedTangentVertexBuffer, PositionNormalTexturedTangentVertexBuffer$, VertexBufferBase],
      FitsImage: [FitsImage, FitsImage$, WcsImage],
      ScaleLinear: [ScaleLinear, ScaleLinear$, ScaleMap],
      ScaleLog: [ScaleLog, ScaleLog$, ScaleMap],
      ScalePow: [ScalePow, ScalePow$, ScaleMap],
      ScaleSqrt: [ScaleSqrt, ScaleSqrt$, ScaleMap],
      HistogramEqualization: [HistogramEqualization, HistogramEqualization$, ScaleMap],
      GreatCirlceRouteLayer: [GreatCirlceRouteLayer, GreatCirlceRouteLayer$, Layer],
      GridLayer: [GridLayer, GridLayer$, Layer],
      ImageSetLayer: [ImageSetLayer, ImageSetLayer$, Layer],
      Object3dLayer: [Object3dLayer, Object3dLayer$, Layer],
      Object3dLayerUI: [Object3dLayerUI, Object3dLayerUI$, LayerUI],
      OrbitLayer: [OrbitLayer, OrbitLayer$, Layer],
      OrbitLayerUI: [OrbitLayerUI, OrbitLayerUI$, LayerUI],
      SpreadSheetLayer: [SpreadSheetLayer, SpreadSheetLayer$, Layer],
      TimeSeriesLayer: [TimeSeriesLayer, TimeSeriesLayer$, Layer],
      VoTableLayer: [VoTableLayer, VoTableLayer$, Layer],
      PlotTile: [PlotTile, PlotTile$, Tile],
      SkyImageTile: [SkyImageTile, SkyImageTile$, Tile],
      TangentTile: [TangentTile, TangentTile$, Tile],
      ToastTile: [ToastTile, ToastTile$, Tile],
      BitmapOverlay: [BitmapOverlay, BitmapOverlay$, Overlay],
      TextOverlay: [TextOverlay, TextOverlay$, Overlay],
      ShapeOverlay: [ShapeOverlay, ShapeOverlay$, Overlay],
      AudioOverlay: [AudioOverlay, AudioOverlay$, Overlay],
      FlipbookOverlay: [FlipbookOverlay, FlipbookOverlay$, Overlay],
      ToolStripSeparator: [ToolStripSeparator, ToolStripSeparator$, ToolStripMenuItem],
      FrameWizard: [FrameWizard, FrameWizard$, Dialog],
      ReferenceFrameProps: [ReferenceFrameProps, ReferenceFrameProps$, Dialog],
      GreatCircleDialog: [GreatCircleDialog, GreatCircleDialog$, Dialog],
      DataVizWizard: [DataVizWizard, DataVizWizard$, Dialog],
      Circle: [Circle, Circle$, Annotation],
      Poly: [Poly, Poly$, Annotation],
      PolyLine: [PolyLine, PolyLine$, Annotation],
      EquirectangularTile: [EquirectangularTile, EquirectangularTile$, Tile],
      MercatorTile: [MercatorTile, MercatorTile$, Tile],
      ISSLayer: [ISSLayer, ISSLayer$, Object3dLayer],
      SlideChangedEventArgs: [SlideChangedEventArgs, SlideChangedEventArgs$, ss.EventArgs],
      ArrivedEventArgs: [ArrivedEventArgs, ArrivedEventArgs$, ss.EventArgs],
      AnnotationClickEventArgs: [AnnotationClickEventArgs, AnnotationClickEventArgs$, ss.EventArgs],
      CollectionLoadedEventArgs: [CollectionLoadedEventArgs, CollectionLoadedEventArgs$, ss.EventArgs]
    });

  //region members
  AstroCalc._galDetails = new GMDS();
  AstroCalc._jupDetails = new EPD();
  AstroCalc._jupPhisical = new CAAPhysicalJupiterDetails();
  AstroCalc._jDateLast = 0;
  PointList.starTexture = null;
  SimpleLineShader.vertLoc = 0;
  SimpleLineShader.initialized = false;
  SimpleLineShader._prog = null;
  SimpleLineShader2D.vertLoc = 0;
  SimpleLineShader2D.initialized = false;
  SimpleLineShader2D._prog = null;
  OrbitLineShader.vertLoc = 0;
  OrbitLineShader.colorLoc = 0;
  OrbitLineShader.initialized = false;
  OrbitLineShader._prog = null;
  LineShaderNormalDates.vertLoc = 0;
  LineShaderNormalDates.colorLoc = 0;
  LineShaderNormalDates.timeLoc = 0;
  LineShaderNormalDates.initialized = false;
  LineShaderNormalDates._prog = null;
  TimeSeriesPointSpriteShader.vertLoc = 0;
  TimeSeriesPointSpriteShader.colorLoc = 0;
  TimeSeriesPointSpriteShader.pointSizeLoc = 0;
  TimeSeriesPointSpriteShader.timeLoc = 0;
  TimeSeriesPointSpriteShader.initialized = false;
  TimeSeriesPointSpriteShader._prog = null;
  KeplerPointSpriteShader.abcLoc = 0;
  KeplerPointSpriteShader.abcLoc1 = 0;
  KeplerPointSpriteShader.pointSizeLoc = 0;
  KeplerPointSpriteShader.colorLoc = 0;
  KeplerPointSpriteShader.weLoc = 0;
  KeplerPointSpriteShader.nTLoc = 0;
  KeplerPointSpriteShader.azLoc = 0;
  KeplerPointSpriteShader.orbitLoc = 0;
  KeplerPointSpriteShader.initialized = false;
  KeplerPointSpriteShader._prog = null;
  EllipseShader.angleLoc = 0;
  EllipseShader.initialized = false;
  EllipseShader._prog = null;
  ModelShader.vertLoc = 0;
  ModelShader.normalLoc = 0;
  ModelShader.textureLoc = 0;
  ModelShader.initialized = false;
  ModelShader._prog = null;
  ModelShader.sunPosition = Vector3d.create(-1, -1, -1);
  ModelShader.minLightingBrightness = 1;
  ModelShader.atmosphereColor = Color.fromArgb(0, 0, 0, 0);
  ModelShaderTan.vertLoc = 0;
  ModelShaderTan.normalLoc = 0;
  ModelShaderTan.textureLoc = 0;
  ModelShaderTan.initialized = false;
  ModelShaderTan._prog = null;
  ModelShaderTan.sunPosition = Vector3d.create(-1, -1, -1);
  ModelShaderTan.minLightingBrightness = 1;
  ModelShaderTan.atmosphereColor = Color.fromArgb(0, 0, 0, 0);
  TileShader.vertLoc = 0;
  TileShader.textureLoc = 0;
  TileShader.initialized = false;
  TileShader._prog = null;
  TileShader.sunPosition = Vector3d.create(-1, -1, -1);
  TileShader.minLightingBrightness = 1;
  TileShader.atmosphereColor = Color.fromArgb(0, 0, 0, 0);
  ImageShader.vertLoc = 0;
  ImageShader.textureLoc = 0;
  ImageShader.initialized = false;
  ImageShader._prog = null;
  ImageShader2.vertLoc = 0;
  ImageShader2.textureLoc = 0;
  ImageShader2.initialized = false;
  ImageShader2._prog = null;
  SpriteShader.vertLoc = 0;
  SpriteShader.textureLoc = 0;
  SpriteShader.colorLoc = 0;
  SpriteShader.initialized = false;
  SpriteShader._prog = null;
  ShapeSpriteShader.vertLoc = 0;
  ShapeSpriteShader.textureLoc = 0;
  ShapeSpriteShader.colorLoc = 0;
  ShapeSpriteShader.initialized = false;
  ShapeSpriteShader._prog = null;
  TextShader.vertLoc = 0;
  TextShader.textureLoc = 0;
  TextShader.initialized = false;
  TextShader._prog = null;
  Texture.empty = null;
  Grids._galaxyImageIndexBuffer = null;
  Grids._galaxyImageTriangleCount = 0;
  Grids._milkyWayImage = null;
  Grids._starSprites = null;
  Grids._starCount = 0;
  Grids._starsDownloading = false;
  Grids._stars = null;
  Grids._hipparcosIndex = {};
  Grids._limitingMagnitude = 16;
  Grids._galaxyTextures = null;
  Grids._galaxyVertexCounts = null;
  Grids._largeSet = true;
  Grids._cosmosReady = false;
  Grids._cosmos = null;
  Grids._downloadingGalaxy = false;
  Grids._eclipticCount = 0;
  Grids._eclipticYear = 0;
  Grids._monthDays = [ 31, 28.2421, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  Grids._monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  Grids._eclipticTextYear = 0;
  KeplerVertex._sine = 0;
  KeplerVertex._cose = 1;
  KeplerVertex._degrad = Math.PI / 180;
  KeplerVertex.baseDate = ss.truncate(SpaceTimeController.utcToJulian(ss.now()));
  LayerManager._version = 0;
  LayerManager._frameWizardDialog = new FrameWizard();
  LayerManager._dataVizWizardDialog = new DataVizWizard();
  LayerManager._referenceFramePropsDialog = new ReferenceFrameProps();
  LayerManager._greatCircleDialog = new GreatCircleDialog();
  LayerManager._tourLayers = false;
  LayerManager._layerMaps = {};
  LayerManager._layerMapsTours = {};
  LayerManager._allMaps = {};
  LayerManager._allMapsTours = {};
  LayerManager._currentMap = 'Earth';
  LayerManager._layerList = {};
  LayerManager._layerListTours = {};
  LayerManager._moonfile = '';
  LayerManager._selectedLayer = null;
  LayerManager._lastMenuClick = new Vector2d();
  LayerManager.getMoonFile('//worldwidetelescope.org/wwtweb/catalog.aspx?Q=moons');
  LayerUI._type = null;
  Object3d.maX_VERTICES = 8000;
  Object3d.maX_POLYGONS = 8000;
  Orbit._orbitalToWwt = Matrix3d.create(1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
  Orbit._initBegun = false;
  PushPin._pinTextureCache = {};
  PushPin._pins = Planets.loadPlanetTexture('//cdn.worldwidetelescope.org/webclient/images/pins.png');
  MinorPlanets.mpcList = [];
  MinorPlanets._initBegun = false;
  MinorPlanets._mpcBlendStates = new Array(7);
  MinorPlanets.starTexture = null;
  MinorPlanets._mpcVertexBuffer = null;
  MinorPlanets._mpcCount = 0;
  Planets.highPercision = true;
  Planets.showActualSize = Settings.get_active().get_actualPlanetScale();
  Planets.RC = (Math.PI / 180);
  Planets._jNow = 0;
  Planets._planetAngles = [ new BodyAngles(286.13, 63.87, 84.176, 14.1844), new BodyAngles(281.0097, 61.4143, 329.548, 6.1385025), new BodyAngles(272.76, 67.16, 160.2, -1.4813688), new BodyAngles(317.68143, 52.8865, 176.63, 350.89198226), new BodyAngles(268.056595, 64.495303, 284.95, 870.536), new BodyAngles(40.589, 83.537, 38.9, 810.7939024), new BodyAngles(257.311, -15.175, 203.81, 501.1600928), new BodyAngles(299.36, 43.46, 253.18, 536.3128492), new BodyAngles(132.993, -6.163, 302.695, 56.3625225), new BodyAngles(269.9949, 66.5392, 38.3213, 13.17635815), new BodyAngles(268.05, 64.5, 200.39, 203.4889538), new BodyAngles(268.08, 64.51, 36.022, 101.3747235), new BodyAngles(268.2, 64.57, 44.064, 50.3176081), new BodyAngles(268.72, 64.83, 259.51, 21.5710715), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 90, 190.147, 360.9856235) ];
  Planets._lastPlanetCenterID = -2;
  Planets._orbitalSampleRate = 256;
  Planets._obliquity = 23.5 * Planets.RC;
  Planets._drawOrder = {};
  Planets.earthMatrix = new Matrix3d();
  Planets.earthMatrixInv = new Matrix3d();
  Planets._lastUpdate = new Date();
  Planets._ringsTriangleLists = new Array(2);
  Planets._ringImage = null;
  Planets._triangleCountRings = 192 + 1 * 2;
  Planets._ringsVertexBuffer = null;
  Planets._planetSprite = new Sprite2d();
  Planets._planetPoints = null;
  RenderContext.useGl = false;
  RenderContext.back = 0;
  RenderTriangle.width = 1024;
  RenderTriangle.height = 768;
  RenderTriangle._contractionInPixels = -0.5;
  RenderTriangle.trianglesRendered = 0;
  RenderTriangle.trianglesCulled = 0;
  RenderTriangle.renderingOn = true;
  RenderTriangle._factor = 1;
  RenderTriangle.cullInside = true;
  RenderTriangle._hw = 0;
  RenderTriangle._qw = 0;
  RenderTriangle._hh = 0;
  RenderTriangle._qh = 0;
  Settings._active = null;
  Settings.tourSettings = null;
  GlyphCache._caches = {};
  GlyphCache._allGlyphs = '';
  SpaceTimeController.last = ss.now();
  SpaceTimeController._offset = 0;
  SpaceTimeController._now = ss.now();
  SpaceTimeController._syncToClock = true;
  SpaceTimeController._timeRate = 1;
  SpaceTimeController._altitude = 0;
  Galaxy._eTypeBuckets = [ -3, -0.186, -0.168, -0.158, -0.15, -0.143, -0.137, -0.13, -0.123, -0.115, -0.104, -0.089, -0.068, -0.042, -0.011, 0.024, 0.064, 0.111, 0.169, 0.252, 3 ];
  Tile.currentRenderGeneration = 0;
  Tile.tileTargetX = -1;
  Tile.tileTargetY = -1;
  Tile.tileTargetLevel = -1;
  Tile.tilesInView = 0;
  Tile.trianglesRendered = 0;
  Tile.tilesTouched = 0;
  Tile.frustumList = null;
  Tile.prepDevice = null;
  Tile.uvMultiple = 256;
  Tile.callCount = 0;
  Tile.useAccomidation = true;
  Tile.demEnabled = false;
  Tile.maxLevel = 20;
  Tile.meshComplexity = 50;
  Tile.imageQuality = 50;
  Tile.lastDeepestLevel = 0;
  Tile.deepestLevel = 0;
  Tile.RC = (3.1415927 / 180);
  TileCache._queue = {};
  TileCache._tiles = {};
  TileCache.openThreads = 8;
  TileCache.readyToRenderCount = 0;
  TileCache.maxTileCacheSize = 800;
  TileCache.maxReadyToRenderSize = 200;
  TileCache.accessID = 0;
  TileCache._maxTotalToPurge = 0;
  Overlay.defaultAnchor = 1;
  Overlay.clipboardFormat = 'WorldWideTelescope.Overlay';
  Overlay.nextId = 11231;
  Overlay.RC = 3.1415927 / 180;
  Selection._points = new Array(9 * 3 * 2);
  TourEditor.capturing = false;
  TourEditor.currentEditor = null;
  TourPlayer._playing = false;
  TourPlayer._switchedToFullScreen = false;
  TourPlayer.noRestoreUIOnStop = false;
  TourStop.clipboardFormat = 'WorldWideTelescope.Slide';
  Undo._undoStack = new ss.Stack();
  Undo._redoStack = new ss.Stack();
  UiTools.kilometersPerAu = 149598000;
  UiTools.auPerParsec = 206264.806;
  UiTools.auPerLightYear = 63239.6717;
  UiTools.ssmUnitConversion = 370;
  BinaryReader.id = 1;
  VizLayer.earthRadius = 6371000;
  WWTControl.imageSets = [];
  WWTControl.exploreRoot = new Folder();
  WWTControl.startLat = 0;
  WWTControl.startLng = 0;
  WWTControl.startZoom = 360;
  WWTControl.startMode = 'Sky';
  WWTControl.imageSetName = '';
  WWTControl.showDataLayers = false;
  WWTControl._renderNeeded = false;
  WWTControl.constellationsFigures = null;
  WWTControl.constellationsBoundries = null;
  WWTControl.solarSystemObjectsNames = [ 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Moon', 'Io', 'Europa', 'Ganymede', 'Callisto', 'IoShadow', 'EuropaShadow', 'GanymedeShadow', 'CallistoShadow', 'SunEclipsed', 'Earth', 'Custom', 'Undefined' ];
  WWTControl.singleton = new WWTControl();
  WWTControl.singleton.renderContext = new RenderContext();
  SpaceTimeController.last = ss.now();
  SpaceTimeController.updateClock();
  Annotation.pointList = null;
  Annotation.lineList = null;
  Annotation.triangleList = null;
  Annotation.batchDirty = true;
  Constellations.RC = 0.017453292519943;
  Constellations._maxSeperation = 0.745;
  Constellations.containment = Constellations.create('Constellations', '//worldwidetelescope.org/data/constellations.txt', true, true, true);
  Constellations._constToDraw = '';
  Constellations.selectedSegment = null;
  Constellations._artFile = null;
  Constellations.artwork = null;
  Constellations.boundries = null;
  Constellations.pictureBlendStates = {};
  (() => {
    const url = '//worldwidetelescope.org/wwtweb/catalog.aspx?q=ConstellationNamePositions_EN';
    Constellations._webFileConstNames = new WebFile(url);
    Constellations._webFileConstNames.onStateChange = Constellations._loadNames;
    Constellations._webFileConstNames.send();
  })();
  ConstellationFilter.families = {};
  Coordinates.RC = (3.1415927 / 180);
  Coordinates.RCRA = (3.1415927 / 12);
  Coordinates.radius = 1;
  Coordinates._rotationMatrix = null;
  Vector3d.zero = new Vector3d();
  Matrix3d._s_identity = Matrix3d._createIdentity();
  FolderBrowser._downloading = false;
  FolderBrowser._imagesLoaded = false;
  FolderBrowser._imageLoadCount = 0;
  (() => {
    const canvas = document.getElementById('canvas');
  })();
  FitsImage.last = null;
  FitsImage._naN$1 = 0 / 0;
  Object3dLayer._translateUI$1 = null;
  Object3dLayer._translateUILines$1 = null;
  Object3dLayer._scaleUI$1 = null;
  Object3dLayer._rotateUi$1 = null;
  SpreadSheetLayer._circleTexture$1 = null;
  TimeSeriesLayer._circleTexture$1 = null;
  VoTableLayer._circleTexture$1 = null;
  ToastTile.slashIndexBuffer = new Array(64);
  ToastTile.backSlashIndexBuffer = new Array(64);
  ToastTile.rootIndexBuffer = new Array(4);
  ISSLayer.issGuid = Guid.fromString('00000001-0002-0003-0405-060708090a0b');
  ISSLayer._loading$2 = false;
  ISSLayer._issmodel$2 = null;
  ISSLayer._doc$2 = null;
  //endregion
  return $exports;
})();
window.wwtlib = wwtlib;
export default wwtlib;