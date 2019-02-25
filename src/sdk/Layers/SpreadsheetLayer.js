import {Layer} from './Layer';
import ss from '../scriptsharp/ss';
import {Dates, LineList, PointList, TriangleList} from '../Graphics/Primative3d';
import {Coordinates} from '../Coordinates';
import {SpaceTimeController} from '../SpaceTimeController';
import {Vector3d} from '../Double3d';
import {Color, Colors} from '../Color';
import {Util} from '../Util';
import {UiTools} from '../UITools';
import {Tessellator} from '../Graphics/Tessellator';
import {Enums} from '../enums';


export class SpreadSheetLayer extends Layer {
  constructor() {
    super();
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
    return new Layer(this);
  }

  static _getDatafromFeed$1() {
    return '';
  }

  static _executeQuery$1() {
    return '';
  }

  static parseDate(date) {
    let dt = ss.now();
    try {
      dt = new Date(date);
    } catch ($e1) {
      try {
        return SpreadSheetLayer.execlToDateTime(parseFloat(date));
      } catch ($e2) {
      }
    }
    return dt;
  }

  get__circleTexture$1() {
    return this._circleTexture$1;
  }

  static getTypeName() {
    return 'TerraViewer.SpreadSheetLayer';
  }

  static execlToDateTime(excelDate) {
    if (excelDate > 59) {
      excelDate -= 1;
    }
    if (excelDate > 730000) {
      excelDate = 730000;
    }
    const es = new Date(1899, 12, 31);
    return new Date(es.getDate() + ss.truncate((excelDate * 24 * 60 * 60 * 1000)));
  }

  get_header() {
    return this._table$1.header;
  }

  static canCopyToClipboard() {
    return true;
  }

  copyToClipboard() {
  }

  dynamicUpdate() {
    const data = SpreadSheetLayer._getDatafromFeed$1(this.get_dataSourceUrl());
    if (data != null) {
      this.upadteData(data, false, true, true);
      this.guessHeaderAssignments();
      return true;
    }
    return false;
  }

  upadteData(data, purgeOld, purgeAll, hasHeader) {
    this.loadFromString(ss.safeCast(data, String), true, purgeOld, purgeAll, hasHeader);
    this.computeDateDomainRange(-1, -1);
    this._dataDirty$1 = true;
    return true;
  }

  loadData(tourDoc, filename) {
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
  }

  addFilesToCabinet(fc) {
    this._fileName$1 = fc.tempDirectory + ss.format('{0}\\{1}.txt', fc.get_packageID(), this.id.toString());
    const dir = this._fileName$1.substring(0, this._fileName$1.lastIndexOf('\\'));
    const data = this._table$1.save();
    const blob = new Blob([data]);
    fc.addFile(this._fileName$1, blob);
    Layer.addFilesToCabinet.call(this, fc);
  }

  guessHeaderAssignments() {
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
  }

  computeDateDomainRange(columnStart, columnEnd) {
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
  }

  checkState() {
  }

  getMaxValue(column) {
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
  }

  getDomainValues(column) {
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
  }

  get_barChartBitmask() {
    return this._barChartBitmask$1;
  }

  set_barChartBitmask(value) {
    this._barChartBitmask$1 = value;
    return value;
  }

  prepVertexBuffer(renderContext, opacity) {
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
            position = new Vector3d((Xcoord * xyzScale), (Zcoord * xyzScale), (Ycoord * xyzScale));
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
  }

  _parseGeometry$1(gs, lineColor, polyColor, alt, date) {
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
  }

  _parsePolygon$1(parens, mods, lineColor, polyColor, alt, date) {
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
  }

  static _splitShapes$1(shapes) {
    const shapeList = [];
    let nesting = 0;
    const current = 0;
    while (current < shapes.length) {
      if (shapes.substr(current, 1) === '(') {
        nesting++;
      }
    }
    return shapeList;
  }

  _parseLineString$1(parens, mods, lineColor, alt, single, date) {
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
  }

  _addPolygon$1(sky, geo, lineWidth, polyColor, lineColor, extrude, fill, date) {
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
  }

  _addPolygonFlat$1(sky, geo, lineWidth, polyColor, lineColor, extrude, fill, date) {
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
  }

  _parseColor$1(colorText, defaultColor) {
    return Color.load(colorText);
  }

  getScaleFactor(AltUnit, custom) {
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
  }

  get__table() {
    return this._table$1;
  }

  set__table(value) {
    this._table$1 = value;
    return value;
  }

  loadFromString(data, isUpdate, purgeOld, purgeAll, hasHeader) {
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
  }

  purgeByTime() {
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
  }

  cleanUp() {
    this.cleanUpBase();
    this._table$1.lock();
    Layer.prototype.cleanUp.call(this);
    this._table$1.unlock();
    this.dirty = true;
  }

  writeLayerProperties(xmlWriter) {
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
  }

  get_dynamicData() {
    return this._dynamicData$1;
  }

  set_dynamicData(value) {
    this._dynamicData$1 = value;
    return value;
  }

  get_autoUpdate() {
    return this._autoUpdate$1;
  }

  set_autoUpdate(value) {
    this._autoUpdate$1 = value;
    return value;
  }

  get_dataSourceUrl() {
    return this._dataSourceUrl$1;
  }

  set_dataSourceUrl(value) {
    this._dataSourceUrl$1 = value;
    return value;
  }

  get_timeSeries() {
    return this.timeSeries;
  }

  set_timeSeries(value) {
    if (this.timeSeries !== value) {
      this.version++;
      this.timeSeries = value;
    }
    return value;
  }

  get_beginRange() {
    return this._beginRange$1;
  }

  set_beginRange(value) {
    if (!ss.compareDates(this._beginRange$1, value)) {
      this.version++;
      this._beginRange$1 = value;
    }
    return value;
  }

  get_endRange() {
    return this._endRange$1;
  }

  set_endRange(value) {
    if (!ss.compareDates(this._endRange$1, value)) {
      this.version++;
      this._endRange$1 = value;
    }
    return value;
  }

  initializeFromXml(node) {
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
  }

  get_decay() {
    return this.decay;
  }

  set_decay(value) {
    if (this.decay !== value) {
      this.version++;
      this.decay = value;
    }
    return value;
  }

  get_coordinatesType() {
    return this._coordinatesType$1;
  }

  set_coordinatesType(value) {
    if (this._coordinatesType$1 !== value) {
      this.version++;
      this._coordinatesType$1 = value;
    }
    return value;
  }

  get_latColumn() {
    return this.latColumn;
  }

  set_latColumn(value) {
    if (this.latColumn !== value) {
      this.version++;
      this.latColumn = value;
    }
    return value;
  }

  get_lngColumn() {
    return this.lngColumn;
  }

  set_lngColumn(value) {
    if (this.lngColumn !== value) {
      this.version++;
      this.lngColumn = value;
    }
    return value;
  }

  get_geometryColumn() {
    return this.geometryColumn;
  }

  set_geometryColumn(value) {
    if (this.geometryColumn !== value) {
      this.version++;
      this.geometryColumn = value;
    }
    return value;
  }

  get_xAxisColumn() {
    return this._xAxisColumn$1;
  }

  set_xAxisColumn(value) {
    if (this._xAxisColumn$1 !== value) {
      this.version++;
      this._xAxisColumn$1 = value;
    }
    return value;
  }

  get_yAxisColumn() {
    return this._yAxisColumn$1;
  }

  set_yAxisColumn(value) {
    if (this._yAxisColumn$1 !== value) {
      this.version++;
      this._yAxisColumn$1 = value;
    }
    return value;
  }

  get_zAxisColumn() {
    return this._zAxisColumn$1;
  }

  set_zAxisColumn(value) {
    if (this._zAxisColumn$1 !== value) {
      this.version++;
      this._zAxisColumn$1 = value;
    }
    return value;
  }

  get_xAxisReverse() {
    return this._xAxisReverse$1;
  }

  set_xAxisReverse(value) {
    if (this._xAxisReverse$1 !== value) {
      this.version++;
      this._xAxisReverse$1 = value;
    }
    return value;
  }

  get_yAxisReverse() {
    return this._yAxisReverse$1;
  }

  set_yAxisReverse(value) {
    if (this._yAxisReverse$1 !== value) {
      this.version++;
      this._yAxisReverse$1 = value;
    }
    return value;
  }

  get_zAxisReverse() {
    return this._zAxisReverse$1;
  }

  set_zAxisReverse(value) {
    if (this._zAxisReverse$1 !== value) {
      this.version++;
      this._zAxisReverse$1 = value;
    }
    return value;
  }

  get_altType() {
    return this._altType$1;
  }

  set_altType(value) {
    if (this._altType$1 !== value) {
      this.version++;
      this._altType$1 = value;
    }
    return value;
  }

  get_markerMix() {
    return this._markerMix$1;
  }

  set_markerMix(value) {
    if (this._markerMix$1 !== value) {
      this.version++;
      this._markerMix$1 = value;
    }
    return value;
  }

  get_raUnits() {
    return this._raUnits$1;
  }

  set_raUnits(value) {
    if (this._raUnits$1 !== value) {
      this.version++;
      this._raUnits$1 = value;
    }
    return value;
  }

  get__colorMap() {
    return this._colorMap$1;
  }

  set__colorMap(value) {
    if (this._colorMap$1 !== value) {
      this.version++;
      this._colorMap$1 = value;
    }
    return value;
  }

  get_markerColumn() {
    return this._markerColumn$1;
  }

  set_markerColumn(value) {
    if (this._markerColumn$1 !== value) {
      this.version++;
      this._markerColumn$1 = value;
    }
    return value;
  }

  get_colorMapColumn() {
    return this._colorMapColumn$1;
  }

  set_colorMapColumn(value) {
    if (this._colorMapColumn$1 !== value) {
      this.version++;
      this._colorMapColumn$1 = value;
    }
    return value;
  }

  get_plotType() {
    return this._plotType$1;
  }

  set_plotType(value) {
    if (this._plotType$1 !== value) {
      this.version++;
      this._plotType$1 = value;
    }
    return value;
  }

  get_markerIndex() {
    return this._markerIndex$1;
  }

  set_markerIndex(value) {
    if (this._markerIndex$1 !== value) {
      this.version++;
      this._markerIndex$1 = value;
    }
    return value;
  }

  get_showFarSide() {
    return this._showFarSide$1;
  }

  set_showFarSide(value) {
    if (this._showFarSide$1 !== value) {
      this.version++;
      this._showFarSide$1 = value;
    }
    return value;
  }

  get_markerScale() {
    return this._markerScale$1;
  }

  set_markerScale(value) {
    if (this._markerScale$1 !== value) {
      this.version++;
      this._markerScale$1 = value;
    }
    return value;
  }

  get_altUnit() {
    return this._altUnit$1;
  }

  set_altUnit(value) {
    if (this._altUnit$1 !== value) {
      this.version++;
      this._altUnit$1 = value;
    }
    return value;
  }

  get_cartesianScale() {
    return this._cartesianScale$1;
  }

  set_cartesianScale(value) {
    if (this._cartesianScale$1 !== value) {
      this.version++;
      this._cartesianScale$1 = value;
    }
    return value;
  }

  get_cartesianCustomScale() {
    return this._cartesianCustomScale$1;
  }

  set_cartesianCustomScale(value) {
    if (this._cartesianCustomScale$1 !== value) {
      this.version++;
      this._cartesianCustomScale$1 = value;
    }
    return value;
  }

  get_altColumn() {
    return this.altColumn;
  }

  set_altColumn(value) {
    if (this.altColumn !== value) {
      this.version++;
      this.altColumn = value;
    }
    return value;
  }

  get_startDateColumn() {
    return this.startDateColumn;
  }

  set_startDateColumn(value) {
    if (this.startDateColumn !== value) {
      this.version++;
      this.startDateColumn = value;
    }
    return value;
  }

  get_endDateColumn() {
    return this.endDateColumn;
  }

  set_endDateColumn(value) {
    if (this.endDateColumn !== value) {
      this.version++;
      this.endDateColumn = value;
    }
    return value;
  }

  get_sizeColumn() {
    return this.sizeColumn;
  }

  set_sizeColumn(value) {
    if (this.sizeColumn !== value) {
      this.version++;
      this.sizeColumn = value;
    }
    return value;
  }

  get_nameColumn() {
    return this.nameColumn;
  }

  set_nameColumn(value) {
    if (this.nameColumn !== value) {
      this.version++;
      this.nameColumn = value;
    }
    return value;
  }

  get_hyperlinkFormat() {
    return this._hyperlinkFormat$1;
  }

  set_hyperlinkFormat(value) {
    if (this._hyperlinkFormat$1 !== value) {
      this.version++;
      this._hyperlinkFormat$1 = value;
    }
    return value;
  }

  get_hyperlinkColumn() {
    return this._hyperlinkColumn$1;
  }

  set_hyperlinkColumn(value) {
    if (this._hyperlinkColumn$1 !== value) {
      this.version++;
      this._hyperlinkColumn$1 = value;
    }
    return value;
  }

  get_scaleFactor() {
    return this.scaleFactor;
  }

  set_scaleFactor(value) {
    if (this.scaleFactor !== value) {
      this.version++;
      this.scaleFactor = value;
    }
    return value;
  }

  get_pointScaleType() {
    return this.pointScaleType;
  }

  set_pointScaleType(value) {
    if (this.pointScaleType !== value) {
      this.version++;
      this.pointScaleType = value;
    }
    return value;
  }

  draw(renderContext, opacity, flat) {
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
  }

  cleanUpBase() {
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
}

function KmlCoordinate() {
  this.lat = 0;
  this.lng = 0;
  this.alt = 0;
}
class KmlLineList {
  constructor(props) {
    this.extrude = false;
    this.astronomical = false;
    this.meanRadius = 6371000;
    this.pointList = [];
  }

  parseWkt (geoText, option, alt, date) {
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
  }
  getCenterPoint() {
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