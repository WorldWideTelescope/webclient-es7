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
import {Util, Guid, Guid$, Mouse, Cursors, Cursor} from './Util';
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
import {Texture, Texture$} from './Graphics/Texture';
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
import {LayerManager, LayerMap, LayerMap$} from './Layers/LayerManager';
import {WWTControl, WWTControl$} from './WWTControl';
import {SpaceTimeController, SpaceTimeController$} from './SpaceTimeController';
import {WebFile, WebFile$} from './WebFile';
import {ISSLayer} from './Graphics/ISSLayer';
import {Language} from './Language';
import {Settings, Settings$, SettingParameter, SettingParameter$} from './settings';
import {VoTableLayer, VoTableLayer$} from './VOTable';
import {ImageSetLayer} from './ImageSetLayer';
import {DomainValue, Layer,  LayerCollection} from './Layers/Layer';
import {Histogram, Histogram$} from './Histogram';
import {BodyAngles, KeplerianElements, Planets} from './Planets';
import {Constellations, ConstellationFilter} from './Constellation';
import {Sprite2d} from './Graphics/Sprite2d';
import {
  AnnotationClickEventArgs, ArrivedEventArgs,
  CollectionLoadedEventArgs,
  EventArgs,
  ScriptInterface,
  ScriptInterface$, SlideChangedEventArgs
} from './ScriptInterface';
import {RenderContext, RenderContext$} from './RenderContext';
import {ReferenceFrame} from './Layers/ReferenceFrame';
import { CameraParameters,  CameraParameters$ } from './CameraParameters';
import {Folder} from './Folder';
import {Group, Mesh, Object3d, Object3dLayer} from './Layers/Object3d';
import {RenderTriangle, RenderTriangle$} from './RenderTriangle';
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
import {TourPlayer, TourPlayer$} from './Tours/TourPlayer';
import {Grids, Grids$} from './Grids';
import {MinorPlanets} from './MinorPlanets';
import {UiTools, UiTools$} from './UITools';
import {EllipseRenderer, Orbit} from './Orbit';
import {BinaryReader, BinaryReader$} from './Utilities/BinaryReader';
import {Galaxy, Star, Star$} from './Star';
import {KeplerVertex, KeplerVertex$} from './KeplerVertex';
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
import {ContextMenuStrip, ToolStripMenuItem, ToolStripSeparator} from './Utilities/ContextMenuStrip';
import {ViewMoverKenBurnsStyle, ViewMoverKenBurnsStyle$, ViewMoverSlew} from './ViewMover';
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
import {GlyphCache, GlyphCache$, GlyphItem, GlyphItem$, Text3d, Text3d$, Text3dBatch, Text3dBatch$} from './SkyText';
import {TextObject, TextObject$} from './Tours/TextObject';
import {TimeSeriesLayer, TimeSeriesLayer$} from './Layers/TimeSeriesLayer';
import {FolderBrowser, FolderBrowser$} from './FolderBrowser';
import {FolderUp} from './FolderUp';
import {Tour} from './Tour';

let wwtlib = (() => {

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
      tempPoints[0] = new Vector2d(pntIn.x, pntIn.y);
      const mat = Matrix2d.rotateAt(-this.selectionSet[0].get_rotationAngle() / 180 * Math.PI, new Vector2d(this.selectionSet[0].get_x(), this.selectionSet[0].get_y()));
      mat._transformPoints(tempPoints);
      return tempPoints[0];
    },
    pointToScreenSpace: function (pntIn) {
      const tempPoints = new Array(1);
      tempPoints[0] = new Vector2d(pntIn.x, pntIn.y);
      const mat = Matrix2d.rotateAt(this.selectionSet[0].get_rotationAngle() / 180 * Math.PI, new Vector2d(this.selectionSet[0].get_x(), this.selectionSet[0].get_y()));
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
        this._playFromHere_Click(sender, new EventArgs());
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
        this._contextMenu._show(new Vector2d(e.clientX, e.clientY));
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
            this._copyMenu_Click(null, new EventArgs());
            break;
          case 86:
            this._pasteMenu_Click(null, new EventArgs());
            break;
          case 88:
            this._cutMenu_Click(null, new EventArgs());
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
        this._deleteMenu_Click(null, new EventArgs());
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
      return new Vector2d(x, y);
    },
    mouseDown: function (sender, e) {
      this._brokeThreshold = false;
      this._needUndoFrame = true;
      const location = this.pointToView(new Vector2d(e.offsetX, e.offsetY));
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
      this._contextPoint = new Vector2d(e.offsetX, e.offsetY);
      if (this._mouseDown) {
        this._mouseDown = false;
        if (e.button === 2) {
          if (this.get_focus() != null) {
            this.showSelectionContextMenu(new Vector2d(e.offsetX, e.offsetY));
          }
        }
        return true;
      }
      if (e.button === 2) {
        if (this.get_focus() == null) {
          this._showNoSelectionContextMenu(new Vector2d(e.offsetX, e.offsetY));
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
      const location = this.pointToView(new Vector2d(e.offsetX, e.offsetY));
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
        let center = new Vector2d(this.get_focus().get_x(), this.get_focus().get_y());
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
        Imageset.saveToXml(writer, true);
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
            this._copyMenu_Click(this, new EventArgs());
          }
          break;
        case 86:
          if (e.ctrlKey) {
            this._pasteMenu_Click(this, new EventArgs());
          }
          break;
        case 88:
          if (e.ctrlKey) {
            this._cutMenu_Click(this, new EventArgs());
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

  function OverlayList() {
  }
  OverlayList._updateOverlayList = (currentTourStop, selection) => {
  };
  OverlayList._updateOverlayListSelection = selection => {
  };
  const OverlayList$ = {};

  function TourEdit() {
  }
  TourEdit._ensureSelectedVisible = () => {
  };
  TourEdit._selectCurrent = () => {
  };
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

  function TimeLine() {
  }
  TimeLine.refreshUi = () => {
  };
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
    } else {
      newTourStop._showSkyOverlays = true;
    }
    if (tourStop.attributes.getNamedItem('ShowConstellations') != null) {
      newTourStop._showConstellations = ss.boolean(tourStop.attributes.getNamedItem('ShowConstellations').nodeValue);
    } else {
      newTourStop._showConstellations = true;
    }
    if (tourStop.attributes.getNamedItem('ShowSkyNode') != null) {
      newTourStop._showSkyNode = ss.boolean(tourStop.attributes.getNamedItem('ShowSkyNode').nodeValue);
    } else {
      newTourStop._showSkyNode = true;
    }
    if (tourStop.attributes.getNamedItem('ShowSkyGrids') != null) {
      newTourStop._showSkyGrids = ss.boolean(tourStop.attributes.getNamedItem('ShowSkyGrids').nodeValue);
    } else {
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
    } else {
      newTourStop._constellationBoundariesFilter = ConstellationFilter.get_allConstellation();
    }
    if (tourStop.attributes.getNamedItem('ConstellationBoundariesFilter') != null) {
      newTourStop._constellationFiguresFilter = ConstellationFilter.parse(tourStop.attributes.getNamedItem('ConstellationBoundariesFilter').nodeValue);
    } else {
      newTourStop._constellationFiguresFilter = new ConstellationFilter();
    }
    if (tourStop.attributes.getNamedItem('ConstellationNamesFilter') != null) {
      newTourStop._constellationNamesFilter = ConstellationFilter.parse(tourStop.attributes.getNamedItem('ConstellationNamesFilter').nodeValue);
    } else {
      newTourStop._constellationNamesFilter = new ConstellationFilter();
    }
    if (tourStop.attributes.getNamedItem('ConstellationArtFilter') != null) {
      newTourStop._constellationArtFilter = ConstellationFilter.parse(tourStop.attributes.getNamedItem('ConstellationArtFilter').nodeValue);
    } else {
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
        Imageset.saveToXml(xmlWriter, false);
      }
      xmlWriter._writeEndElement();
      if (this._musicTrack != null) {
        xmlWriter._writeStartElement('MusicTrack');
        Imageset.saveToXml(xmlWriter, false);
        xmlWriter._writeEndElement();
      }
      if (this._voiceTrack != null) {
        xmlWriter._writeStartElement('VoiceTrack');
        Imageset.saveToXml(xmlWriter, false);
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

  function Undo() {
  }

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
    } else {
      return Language.getLocalizedText(551, 'Nothing to Undo');
    }
  };
  Undo.peekRedoActionString = () => {
    if (Undo._redoStack.count > 0) {
      return Undo._redoStack.peek().toString();
    } else {
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

  function UndoStep() {
  }

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

  function SelectLink(id) {
    this._return = false;
    this._next = true;
    this._linkSlide = false;
    this._slide = null;
    this._ok = false;
    if (id != null) {
      this.set_id(id);
    } else {
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

  function TagMe() {
  }

  const TagMe$ = {};

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
    Texture: [Texture, Texture$, null, ss.IDisposable],
    Grids: [Grids, Grids$, null],
    KeplerVertex: [KeplerVertex, KeplerVertex$, null],
    Layer,
    DomainValue,
    LayerManager,
    LayerMap: [LayerMap, LayerMap$, null],
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
    RenderTriangle: [RenderTriangle, RenderTriangle$, null],
    ScriptInterface: [ScriptInterface, ScriptInterface$, null],
    Settings: [Settings, Settings$, null, function () {
    }],
    Text3dBatch: [Text3dBatch, Text3dBatch$, null],
    GlyphItem: [GlyphItem, GlyphItem$, null],
    GlyphCache: [GlyphCache, GlyphCache$, null, ss.IDisposable],
    Text3d: [Text3d, Text3d$, null],
    SpaceTimeController: [SpaceTimeController, SpaceTimeController$, null],
    Star,
    Galaxy,
    Tour,
    FileCabinet,
    SettingParameter: [SettingParameter, SettingParameter$, null],
    Overlay,
    Selection: [Selection, Selection$, null],
    TextObject: [TextObject, TextObject$, null],
    TourDocument,
    TourEditTab: [TourEditTab, TourEditTab$, null],
    TourEditor: [TourEditor, TourEditor$, null, function () {
    }],
    OverlayList: [OverlayList, OverlayList$, null],
    TourEdit: [TourEdit, TourEdit$, null],
    SoundEditor: [SoundEditor, SoundEditor$, null],
    TourStopList: [TourStopList, TourStopList$, null],
    TimeLine: [TimeLine, TimeLine$, null],
    TourPlayer: [TourPlayer, TourPlayer$, null, function () {
    }],
    MasterTime: [MasterTime, MasterTime$, null],
    TourStop: [TourStop, TourStop$, null, function () {
    }],
    LayerInfo: [LayerInfo, LayerInfo$, null],
    UndoTourStopChange: [UndoTourStopChange, UndoTourStopChange$, null],
    Undo: [Undo, Undo$, null],
    UndoStep: [UndoStep, UndoStep$, null],
    UndoTourSlidelistChange: [UndoTourSlidelistChange, UndoTourSlidelistChange$, null],
    UndoTourPropertiesChange: [UndoTourPropertiesChange, UndoTourPropertiesChange$, null],
    UiTools: [UiTools, UiTools$, null],
    Rectangle: [Rectangle, Rectangle$, null],
    Guid: [Guid, Guid$, null],
    Enums,
    Mouse: [Mouse, null, null],
    Language,
    Cursor,
    Cursors,
    SelectLink: [SelectLink, SelectLink$, null],
    PopupVolume: [PopupVolume, PopupVolume$, null],
    PopupColorPicker: [PopupColorPicker, PopupColorPicker$, null],
    OverlayProperties: [OverlayProperties, OverlayProperties$, null],
    BinaryReader: [BinaryReader, BinaryReader$, null],
    Bitmap,
    ColorPicker: [ColorPicker, ColorPicker$, null],
    ContextMenuStrip,
    ToolStripMenuItem,
    TagMe: [TagMe, TagMe$, null],
    Dialog,
    Histogram: [Histogram, Histogram$, null],
    SimpleInput,
    XmlTextWriter: [XmlTextWriter, XmlTextWriter$, null],
    VizLayer: [VizLayer, VizLayer$, null],
    DataItem: [DataItem, DataItem$, null],
    WebFile: [WebFile, WebFile$, null],
    WWTControl: [WWTControl, WWTControl$, null],
    WWTElementEvent: [WWTElementEvent, WWTElementEvent$, null],
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
    ViewMoverKenBurnsStyle: [ViewMoverKenBurnsStyle, ViewMoverKenBurnsStyle$, null],
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