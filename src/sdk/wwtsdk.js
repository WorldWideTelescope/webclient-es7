import ss from './scriptsharp/ss';
import GFX from './astrocalc/GFX';
import {ABR, ACFT} from './astrocalc/AAAberration';
import {ASEP} from './astrocalc/AAAngularSeparation';
import {C3D, COR, CT} from './astrocalc/AACoordinateTransformation';
import {CalD, DT} from './astrocalc/AADate';
import {DYT} from './astrocalc/AADynamicalTime';
import {CAAEarth, VSC} from './astrocalc/AAEarth';
import {CAAEclipticalElementDetails, CAAEclipticalElements} from './astrocalc/AAEclipticalElements';
import {ELL, EOE, EPD, EOD} from './astrocalc/AAElliptical';
import {EOT} from './astrocalc/AAEquationOfTime';
import {CAAFK5} from './astrocalc/AAFK5';
import {GM, GMD, GMDS} from './astrocalc/AAGalileanMoons';
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
import {CAAParallax, CAATopocentricEclipticDetails} from './astrocalc/AAParallax';
import {CAASidereal} from './astrocalc/AASidereal';
import {CAAPhysicalJupiter, CAAPhysicalJupiterDetails} from './astrocalc/AAPhysicalJupiter';
import {CAAPhysicalMars, CAAPhysicalMarsDetails} from './astrocalc/AAPhysicalMars';
import {CAAPhysicalSunDetails, CAAPhysicalSun} from './astrocalc/AAPhysicalSun';
import {CAAPrecession} from './astrocalc/AAPrecession';
import {CAARiseTransitSet, CAARiseTransitSetDetails} from './astrocalc/AARiseTransitSet';
import {
  Util,
  Guid,
  Mouse,
  Cursors,
  Cursor,
  Rectangle,
  OverlayProperties,
  PopupColorPicker,
  PopupVolume, SelectLink
} from './Util';
import {Tile} from './Tile';
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
  Enums
} from './enums.js';
import {AstroCalc, RiseSetDetails, AstroRaDec} from './astrocalc/AstroCalc';
import {CAAStellarMagnitudes} from './astrocalc/AAStellarMagnitudes';
import {
  ConvexHull,
  ConvexHull$,
  DoubleUtilities,
  Matrix2d,
  Matrix2d$,
  Matrix3d,
  Matrix3d$,
  PlaneD,
  PlaneD$,
  PositionColored,
  PositionColoredTextured,
  PositionNormalTextured,
  PositionNormalTextured$,
  PositionNormalTexturedTangent,
  PositionNormalTexturedX2,
  PositionNormalTexturedX2$,
  PositionTexture,
  SphereHull,
  SphereHull$,
  Vector2d,
  Vector3d,
  Vector4d,
  Vector4d$
} from './Double3d';
import {TileCache} from './TileCache';
import {Color, Colors} from './Color';
import {Coordinates, Coordinates$} from './Coordinates';
import {BlendState} from './BlendState';
import {Texture} from './Graphics/Texture';
import {Imageset} from './Imageset';
import {Triangle} from './Triangle';
import {
  TileShader,
  SpriteShader,
  TextShader,
  ShapeSpriteShader,
  ImageShader2,
  ImageShader,
  ModelShaderTan,
  ModelShader,
  EllipseShader,
  KeplerPointSpriteShader,
  LineShaderNormalDates,
  OrbitLineShader,
  SimpleLineShader2D,
  SimpleLineShader
} from './Graphics/Shaders';
import {DomainValue, Layer, LayerCollection} from './Layers/Layer';
import {LayerManager, LayerMap} from './Layers/LayerManager';
import {WWTControl, WWTControl$, WWTElementEvent} from './WWTControl';
import {SpaceTimeController} from './SpaceTimeController';
import {WebFile, WebFile$} from './WebFile';
import {ISSLayer} from './Graphics/ISSLayer';
import {Language} from './Language';
import {Settings, Settings$, SettingParameter, SettingParameter$} from './settings';
import {VoTableLayer, VoTableLayer$} from './VOTable';
import {ImageSetLayer} from './ImageSetLayer';

import {Histogram, Histogram$} from './Histogram';
import {BodyAngles, KeplerianElements, Planets} from './Planets';
import {Constellations, ConstellationFilter} from './Constellation';
import {Sprite2d} from './Graphics/Sprite2d';
import {
  AnnotationClickEventArgs, ArrivedEventArgs,
  CollectionLoadedEventArgs,
  ScriptInterface,
  SlideChangedEventArgs
} from './ScriptInterface';
import {RenderContext} from './RenderContext';
import {ReferenceFrame} from './Layers/ReferenceFrame';
import { CameraParameters,  CameraParameters$ } from './CameraParameters';
import {Folder} from './Folder';
import {Group, Mesh, Object3d, Object3dLayer} from './Layers/Object3d';
import {RenderTriangle} from './RenderTriangle';
import {
  PointList,
  SimpleLineList,
  Dates,
  LineList,
  TriangleList,
  TimeSeriesLineVertex,
  OrbitLineList
} from './Graphics/Primative3d';
import {Place, Place$} from './Place';
import {
  TimeSeriesPointVertex,
  IndexBuffer,
  PositionColoredTexturedVertexBuffer,
  PositionColoredVertexBuffer,
  ShortIndexBuffer,
  TimeSeriesPointVertexBuffer,
  TimeSeriesPointSpriteShader,
  PositionNormalTexturedTangentVertexBuffer,
  PositionNormalTexturedVertexBuffer,
  PositionVertexBuffer,
  TimeSeriesLineVertexBuffer,
  KeplerVertexBuffer,
  PositionTextureVertexBuffer
} from './Graphics/GIBuffer';
import {Annotation, Circle, Poly, PolyLine} from './Annotation';
import {Wtml} from './WTML';
import {MasterTime, TourPlayer} from './Tours/TourPlayer';
import {Grids} from './Grids';
import {MinorPlanets} from './MinorPlanets';
import {UiTools} from './UITools';
import {EllipseRenderer, Orbit} from './Orbit';
import {BinaryReader} from './Utilities/BinaryReader';
import {Galaxy, Star} from './Star';
import {KeplerVertex} from './KeplerVertex';
import {Tessellator} from './Graphics/Tessellator';
import {FitsImage} from './Layers/FitsImage';
import {WcsImage} from './Layers/WcsImage';
import {Bitmap} from './Utilities/Bitmap';
import {TangentTile} from './TangentTile';
import {MercatorTile} from './MercatorTile';
import {EquirectangularTile} from './EquirectangularTile';
import {SkyImageTile} from './SkyImageTile';
import {PlotTile} from './PlotTile';
import {ToastTile, DistanceCalc} from './ToastTile';
import {LayerUI, LayerUIMenuItem, LayerUITreeNode, Object3dLayerUI} from './Layers/LayerUI';
import {TourDocument} from './Tours/TourDocument';
import {FileCabinet} from './Tours/FileCabilnet';
import {PushPin, SpreadSheetLayer} from './Layers/SpreadsheetLayer';
import {ContextMenuStrip, TagMe, ToolStripMenuItem, ToolStripSeparator} from './Utilities/ContextMenuStrip';
import {ViewMoverKenBurnsStyle,  ViewMoverSlew} from './ViewMover';
import {OrbitLayer, OrbitLayerUI} from './Layers/Orbit';
import {GridLayer} from './Layers/GridLayer';
import {Table} from './Layers/Table';
import {VoColumn, VoRow, VoTable} from './Layers/VOTable';
import {
  DataVizWizard,
  Dialog,
  FrameWizard,
  GreatCircleDialog,
  ReferenceFrameProps,
  SimpleInput
} from './Utilities/Dialog';
import {AudioOverlay, BitmapOverlay, FlipbookOverlay, Overlay, ShapeOverlay, TextOverlay} from './Tours/Overlays';
import {GlyphCache, GlyphCache$, GlyphItem, Text3d, Text3d$, Text3dBatch} from './SkyText';
import {TextObject, TextObject$} from './Tours/TextObject';
import {TimeSeriesLayer, TimeSeriesLayer$} from './Layers/TimeSeriesLayer';
import {FolderBrowser, FolderBrowser$} from './FolderBrowser';
import {FolderUp} from './FolderUp';
import {Tour} from './Tour';
import {TourEditTab} from './Tours/TourEditTab';
import {OverlayList, SoundEditor, TimeLine, TourEdit, TourEditor, TourStopList} from './Tours/TourEditor';
import {Undo, UndoStep, UndoTourPropertiesChange, UndoTourSlidelistChange} from './Tours/Undo';
import {LayerInfo, TourStop, UndoTourStopChange} from './Tours/TourStop';
import {XmlTextWriter} from './Utilities/XmlTextWriter';
import {ColorPicker} from './Utilities/ColorPicker';
import {DataItem, VizLayer} from './VizLayer';

let wwtlib = (() => {
  const $exports = ss.module('wwtlib', null, {
    Sprite2d,
    Table,
    MinorPlanets,
    TileCache,
    DistanceCalc,
    Triangle,
    Util,
    Wtml,
    FolderUp,
    ViewMoverSlew,
    PositionTextureVertexBuffer,
    KeplerVertexBuffer,
    TimeSeriesLineVertexBuffer,
    TimeSeriesPointVertexBuffer,
    PositionColoredVertexBuffer,
    PositionColoredTexturedVertexBuffer,
    LayerCollection,
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
    GFX,
    ABR,
    ACFT,
    ASEP,
    COR,
    C3D,
    CT,
    CalD,
    DT,
    DYT,
    CAAEarth,
    VSC,
    CAAEclipticalElementDetails,
    CAAEclipticalElements,
    EPO,
    EOE,
    EPD,
    EOD,
    ELL,
    EOT,
    CAAFK5,
    GMD,
    GMDS,
    GM,
    CAAGlobe,
    IFR,
    INTP,
    CAAJupiter,
    CAAKepler,
    CAAMars,
    CAAMercury,
    CAAMoon,
    MoonCoefficient1,
    MoonCoefficient2,
    MIFR,
    CAAMoonNodes,
    CAAMoonPerigeeApogee,
    MPAC,
    CAAMoonPhases,
    CAANeptune,
    CAANutation,
    NUC,
    CAATopocentricEclipticDetails,
    CAAParallax,
    CAAPhysicalJupiterDetails,
    CAAPhysicalJupiter,
    CAAPhysicalMarsDetails,
    CAAPhysicalMars,
    CAAPhysicalSunDetails,
    CAAPhysicalSun,
    CAAPluto,
    PlutoCoefficient1,
    PlutoCoefficient2,
    CAAPrecession,
    CAARiseTransitSetDetails,
    CAARiseTransitSet,
    CAASaturn,
    CAASaturnRingDetails,
    CAASaturnRings,
    CAASidereal,
    CAAStellarMagnitudes,
    CAASun,
    CAAUranus,
    CAAVenus,
    AstroRaDec,
    RiseSetDetails,
    AstroCalc,
    ShortIndexBuffer,
    IndexBuffer,
    Dates,
    SimpleLineList,
    OrbitLineList,
    LineList,
    TriangleList,
    PointList,
    TimeSeriesLineVertex,
    TimeSeriesPointVertex,
    SimpleLineShader,
    SimpleLineShader2D,
    OrbitLineShader,
    LineShaderNormalDates,
    TimeSeriesPointSpriteShader,
    KeplerPointSpriteShader,
    EllipseShader,
    ModelShader,
    ModelShaderTan,
    TileShader,
    ImageShader,
    ImageShader2,
    SpriteShader,
    ShapeSpriteShader,
    TextShader,
    Tessellator,
    Texture,
    Grids,
    KeplerVertex,
    Layer,
    DomainValue,
    LayerManager,
    LayerMap,
    LayerUI,
    LayerUIMenuItem,
    LayerUITreeNode,
    Group,
    Mesh,
    Object3d,
    Orbit,
    EllipseRenderer,
    ReferenceFrame,
    PushPin,
    VoTable,
    VoRow,
    VoColumn,
    WcsImage,
    KeplerianElements,
    BodyAngles,
    Planets,
    RenderContext,
    RenderTriangle,
    ScriptInterface,
    Settings: [Settings, Settings$, null, function () {
    }],
    Text3dBatch,
    GlyphItem,
    GlyphCache: [GlyphCache, GlyphCache$, null, ss.IDisposable],
    Text3d: [Text3d, Text3d$, null],
    SpaceTimeController,
    Star,
    Galaxy,
    Tour,
    FileCabinet,
    SettingParameter: [SettingParameter, SettingParameter$, null],
    Overlay,
    Selection,
    TextObject: [TextObject, TextObject$, null],
    TourDocument,
    TourEditTab,
    TourEditor,
    OverlayList,
    TourEdit,
    SoundEditor,
    TourStopList,
    TimeLine,
    TourPlayer,
    MasterTime,
    TourStop,
    LayerInfo,
    UndoTourStopChange,
    Undo,
    UndoStep,
    UndoTourSlidelistChange,
    UndoTourPropertiesChange,
    UiTools,
    Rectangle,
    Guid,
    Enums,
    Mouse: [Mouse, null, null],
    Language,
    Cursor,
    Cursors,
    SelectLink,
    PopupVolume,
    PopupColorPicker,
    OverlayProperties,
    BinaryReader,
    Bitmap,
    ColorPicker,
    ContextMenuStrip,
    ToolStripMenuItem,
    TagMe,
    Dialog,
    Histogram: [Histogram, Histogram$, null],
    SimpleInput,
    XmlTextWriter,
    VizLayer,
    DataItem,
    WebFile: [WebFile, WebFile$, null],
    WWTControl: [WWTControl, WWTControl$, null],
    WWTElementEvent,
    Annotation,
    BlendState,
    CameraParameters: [CameraParameters, CameraParameters$, null],
    Color,
    Colors,
    Constellations,
    ConstellationFilter,
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
    Imageset,
    ViewMoverKenBurnsStyle,
    Place: [Place, Place$, null],
    PositionVertexBuffer,
    PositionNormalTexturedVertexBuffer,
    PositionNormalTexturedTangentVertexBuffer,
    FitsImage,
    GridLayer,
    ImageSetLayer,
    Object3dLayer,
    Object3dLayerUI,
    OrbitLayer,
    OrbitLayerUI,
    SpreadSheetLayer,
    TimeSeriesLayer: [TimeSeriesLayer, TimeSeriesLayer$, Layer],
    VoTableLayer: [VoTableLayer, VoTableLayer$, Layer],
    Tile,
    PlotTile,
    SkyImageTile,
    TangentTile,
    ToastTile,
    BitmapOverlay,
    TextOverlay,
    ShapeOverlay,
    AudioOverlay,
    FlipbookOverlay,
    ToolStripSeparator,
    FrameWizard,
    ReferenceFrameProps,
    GreatCircleDialog,
    DataVizWizard,
    Circle,
    Poly,
    PolyLine,
    EquirectangularTile,
    MercatorTile,
    ISSLayer,
    SlideChangedEventArgs,
    ArrivedEventArgs,
    AnnotationClickEventArgs,
    CollectionLoadedEventArgs
  });

  //region members

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
  ModelShader.sunPosition = new Vector3d(-1, -1, -1);
  ModelShader.minLightingBrightness = 1;
  ModelShader.atmosphereColor = Color.fromArgb(0, 0, 0, 0);
  ModelShaderTan.vertLoc = 0;
  ModelShaderTan.normalLoc = 0;
  ModelShaderTan.textureLoc = 0;
  ModelShaderTan.initialized = false;
  ModelShaderTan._prog = null;
  ModelShaderTan.sunPosition = new Vector3d(-1, -1, -1);
  ModelShaderTan.minLightingBrightness = 1;
  ModelShaderTan.atmosphereColor = Color.fromArgb(0, 0, 0, 0);
  TileShader.vertLoc = 0;
  TileShader.textureLoc = 0;
  TileShader.initialized = false;
  TileShader._prog = null;
  TileShader.sunPosition = new Vector3d(-1, -1, -1);
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
  Grids._monthDays = [31, 28.2421, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  Grids._monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
  Orbit._orbitalToWwt = new Matrix3d(1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
  Orbit._initBegun = false;
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
  Planets._planetAngles = [new BodyAngles(286.13, 63.87, 84.176, 14.1844), new BodyAngles(281.0097, 61.4143, 329.548, 6.1385025), new BodyAngles(272.76, 67.16, 160.2, -1.4813688), new BodyAngles(317.68143, 52.8865, 176.63, 350.89198226), new BodyAngles(268.056595, 64.495303, 284.95, 870.536), new BodyAngles(40.589, 83.537, 38.9, 810.7939024), new BodyAngles(257.311, -15.175, 203.81, 501.1600928), new BodyAngles(299.36, 43.46, 253.18, 536.3128492), new BodyAngles(132.993, -6.163, 302.695, 56.3625225), new BodyAngles(269.9949, 66.5392, 38.3213, 13.17635815), new BodyAngles(268.05, 64.5, 200.39, 203.4889538), new BodyAngles(268.08, 64.51, 36.022, 101.3747235), new BodyAngles(268.2, 64.57, 44.064, 50.3176081), new BodyAngles(268.72, 64.83, 259.51, 21.5710715), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 0, 0, 0), new BodyAngles(0, 90, 190.147, 360.9856235)];
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
  Galaxy._eTypeBuckets = [-3, -0.186, -0.168, -0.158, -0.15, -0.143, -0.137, -0.13, -0.123, -0.115, -0.104, -0.089, -0.068, -0.042, -0.011, 0.024, 0.064, 0.111, 0.169, 0.252, 3];

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
  WWTControl.solarSystemObjectsNames = ['Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Moon', 'Io', 'Europa', 'Ganymede', 'Callisto', 'IoShadow', 'EuropaShadow', 'GanymedeShadow', 'CallistoShadow', 'SunEclipsed', 'Earth', 'Custom', 'Undefined'];
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

  //endregion
  return $exports;
})();
const init = (lib) => {
  //console.log('initing');
  window.wwtlib = wwtlib;
};
init(wwtlib);
export default wwtlib;