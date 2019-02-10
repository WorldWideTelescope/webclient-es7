import {BlendState} from './BlendState';
import ss from './scriptsharp/ss';
import {Coordinates} from './Coordinates';
import {Vector3d} from './Double3d';
import {Folder} from './Folder';
import {Settings} from './settings';
import {WWTControl} from './WWTControl';
import {WebFile} from './WebFile';
import {Color} from './Color';
import {Place} from './Place';

export function Constellations() {
  this._pointCount = 0;
  this._boundry = false;
  this._noInterpollation = false;
  this.readOnly = false;
  this.radius = 1;
  this._drawCount = 0;
  this._constellationVertexBuffers = {};
}
Constellations.createBasic = function(name) {
  const temp = new Constellations();
  temp._name = name;
  temp._url = null;
  temp.lines = [];
  const $enum1 = ss.enumerate(ss.keys(Constellations.fullNames));
  while ($enum1.moveNext()) {
    const abbrv = $enum1.current;
    temp.lines.push(new Lineset(abbrv));
  }
  return temp;
};
Constellations.create = function(name, url, boundry, noInterpollation, resource) {
  const temp = new Constellations();
  temp._noInterpollation = noInterpollation;
  temp._boundry = boundry;
  temp._name = name;
  temp._url = url;
  temp.getFile();
  return temp;
};
Constellations.drawConstellationNames = function(renderContext, opacity, drawColor) {
  if (Constellations._namesBatch == null) {
    Constellations.initializeConstellationNames();
    if (Constellations._namesBatch == null) {
      return;
    }
  }
  Constellations._namesBatch.draw(renderContext, opacity, drawColor);
};
Constellations.initializeConstellationNames = function() {
  if (Constellations.constellationCentroids == null) {
    return;
  }
  Constellations._namesBatch = new Text3dBatch(80);
  const $enum1 = ss.enumerate(ss.keys(Constellations.constellationCentroids));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const centroid = Constellations.constellationCentroids[key];
    const center = Coordinates.raDecTo3dAu(centroid.get_RA(), centroid.get_dec(), 1);
    const up = Vector3d.create(0, 1, 0);
    let name = centroid.get_name();
    if (centroid.get_name() === 'Triangulum Australe') {
      name = ss.replaceString(name, ' ', '\n   ');
    }
    Constellations._namesBatch.add(new Text3d(center, up, name, 80, 0.000125));
  }
};
Constellations.drawArtwork = function(renderContext) {
  if (Constellations.artwork == null) {
    if (Constellations._artFile == null) {
      Constellations._artFile = new Folder();
      Constellations._artFile.loadFromUrl('//worldwidetelescope.org/wwtweb/catalog.aspx?W=hevelius', Constellations._onArtReady);
    }
    return;
  }
  Constellations._maxSeperation = Math.max(0.5, Math.cos((renderContext.get_fovAngle() * 2) / 180 * Math.PI));
  const $enum1 = ss.enumerate(Constellations.artwork);
  while ($enum1.moveNext()) {
    const place = $enum1.current;
    const bs = Constellations.pictureBlendStates[place.get_constellation()];
    bs.set_targetState(Settings.get_active().get_constellationArtFilter().isSet(place.get_constellation()));
    if (bs.get_state()) {
      const reverse = false;
      const centroid = Constellations.constellationCentroids[place.get_constellation()];
      if (centroid != null) {
        const pos = Coordinates.raDecTo3d((reverse) ? -centroid.get_RA() - 6 : centroid.get_RA(), (reverse) ? centroid.get_dec() : centroid.get_dec());
        if (Vector3d.dot(renderContext.get_viewPoint(), pos) > Constellations._maxSeperation) {
          renderContext.drawImageSet(place.get_studyImageset(), 100);
        }
      }
    }
  }
};
Constellations._onArtReady = function() {
  Constellations._artFile.childLoadCallback(Constellations._loadArtList);
};
Constellations._loadArtList = function() {
  Constellations.artwork = Constellations._artFile.get_places();
};
Constellations._loadNames = function() {
  if (Constellations._webFileConstNames.get_state() === 2) {
    alert(Constellations._webFileConstNames.get_message());
  }
  else if (Constellations._webFileConstNames.get_state() === 1) {
    Constellations._centroidsReady(Constellations._webFileConstNames.getText());
  }
};
Constellations._centroidsReady = function(file) {
  Constellations.constellationCentroids = {};
  Constellations.fullNames = {};
  Constellations.abbreviations = {};
  Constellations.bitIDs = {};
  const rows = file.split('\r\n');
  let id = 0;
  let line;
  const $enum1 = ss.enumerate(rows);
  while ($enum1.moveNext()) {
    const row = $enum1.current;
    line = row;
    const data = line.split(',');
    Constellations.fullNames[data[1]] = data[0];
    Constellations.abbreviations[data[0]] = data[1];
    Constellations.bitIDs[data[1]] = id++;
    Constellations.pictureBlendStates[data[1]] = BlendState.create(true, 1000);
    Constellations.constellationCentroids[data[1]] = Place.create(data[0], parseFloat(data[3]), parseFloat(data[2]), 128, data[1], 2, 360);
  }
  WWTControl.set_renderNeeded(true);
  ConstellationFilter.buildConstellationFilters();
};
Constellations.fullName = function(name) {
  if (ss.keyExists(Constellations.fullNames, name)) {
    return Constellations.fullNames[name];
  }
  return name;
};
Constellations.abbreviation = function(name) {
  if (Constellations.abbreviations != null && !ss.emptyString(name) && ss.keyExists(Constellations.abbreviations, name)) {
    return Constellations.abbreviations[name];
  }
  return name;
};
export const Constellations$ = {
  get_name: function () {
    return this._name;
  },
  set_name: function (value) {
    this._name = value;
    return value;
  },
  getFile: function () {
    this._webFile = new WebFile(this._url);
    this._webFile.onStateChange = ss.bind('fileStateChange', this);
    this._webFile.send();
  },
  fileStateChange: function () {
    if (this._webFile.get_state() === 2) {
      alert(this._webFile.get_message());
    } else if (this._webFile.get_state() === 1) {
      this._loadConstellationData(this._webFile.getText());
    }
  },
  _loadConstellationData: function (data) {
    if (this._boundry && !this._noInterpollation) {
      Constellations.boundries = {};
    }
    this.lines = [];
    let lineSet = null;
    try {
      const rows = data.split('\r\n');
      let abrv;
      let abrvOld = '';
      let ra;
      let dec;
      let lastRa = 0;
      let type = 0;
      const $enum1 = ss.enumerate(rows);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        let line = row;
        if (line.substr(11, 2) === '- ') {
          line = line.substr(0, 11) + ' -' + line.substr(13, (line.length - 13));
        }
        if (line.substr(11, 2) === '+ ') {
          line = line.substr(0, 11) + ' +' + line.substr(13, (line.length - 13));
        }
        dec = parseFloat(line.substr(11, 10));
        if (this._noInterpollation) {
          ra = parseFloat(line.substr(0, 10));
        } else {
          ra = parseFloat(line.substr(0, 10));
        }
        abrv = ss.trim(line.substr(23, 4));
        if (!this._boundry) {
          if (!!ss.trim(line.substr(28, 1))) {
            type = parseInt(line.substr(28, 1));
          }
        } else {
          if (this._noInterpollation && line.substr(28, 1) !== 'O') {
            continue;
          }
        }
        if (abrv !== abrvOld) {
          type = 3;
          lineSet = new Lineset(abrv);
          this.lines.push(lineSet);
          if (this._boundry && !this._noInterpollation) {
            Constellations.boundries[abrv] = lineSet;
          }
          abrvOld = abrv;
          lastRa = 0;
        }
        if (this._noInterpollation) {
          if (Math.abs(ra - lastRa) > 12) {
            ra = ra - (24 * (((ra - lastRa) < 0) ? -1 : 1));
          }
          lastRa = ra;
        }
        let starName = null;
        if (line.length > 30) {
          starName = ss.trim(line.substr(30));
        }
        if (starName == null || starName !== 'Empty') {
          lineSet.add(ra, dec, type, starName);
        }
        this._pointCount++;
        type = 1;
      }
    } catch ($e2) {
      const i = 0;
    }
    WWTControl.set_renderNeeded(true);
  },
  draw: function (renderContext, showOnlySelected, focusConsteallation, clearExisting) {
    Constellations._maxSeperation = Math.max(0.6, Math.cos((renderContext.get_fovAngle() * 2) / 180 * Math.PI));
    this._drawCount = 0;
    let lsSelected = null;
    if (this.lines == null || Constellations.constellationCentroids == null) {
      return;
    }
    Constellations._constToDraw = focusConsteallation;
    const $enum1 = ss.enumerate(this.lines);
    while ($enum1.moveNext()) {
      const ls = $enum1.current;
      if (Constellations._constToDraw === ls.get_name() && this._boundry) {
        lsSelected = ls;
      } else if (!showOnlySelected || !this._boundry) {
        this._drawSingleConstellation(renderContext, ls, 1);
      }
    }
    if (lsSelected != null) {
      this._drawSingleConstellation(renderContext, lsSelected, .2);
    }
  },
  _drawSingleConstellation: function (renderContext, ls, opacity) {
    const reverse = false;
    const centroid = Constellations.constellationCentroids[ls.get_name()];
    if (centroid != null) {
      const pos = Coordinates.raDecTo3d((reverse) ? -centroid.get_RA() - 6 : centroid.get_RA(), (reverse) ? centroid.get_dec() : centroid.get_dec());
      if (Vector3d.dot(renderContext.get_viewPoint(), pos) < Constellations._maxSeperation) {
        return;
      }
    }
    if (!ss.keyExists(this._constellationVertexBuffers, ls.get_name())) {
      const count = ls.points.length;
      const linelist = new SimpleLineList();
      linelist.set_depthBuffered(false);
      this._constellationVertexBuffers[ls.get_name()] = linelist;
      let currentPoint = new Vector3d();
      let temp;
      for (let i = 0; i < count; i++) {
        if (!ls.points[i].pointType || !i) {
          currentPoint = Coordinates.raDecTo3d(ls.points[i].RA, ls.points[i].dec);
        } else {
          temp = Coordinates.raDecTo3d(ls.points[i].RA, ls.points[i].dec);
          linelist.addLine(currentPoint, temp);
          currentPoint = temp;
        }
      }
      if (this._boundry) {
        temp = Coordinates.raDecTo3d(ls.points[0].RA, ls.points[0].dec);
        linelist.addLine(currentPoint, temp);
      }
    }
    let col = 'red';
    if (this._boundry) {
      if (Constellations._constToDraw !== ls.get_name()) {
        col = Settings.get_globalSettings().get_constellationBoundryColor();
      } else {
        col = Settings.get_globalSettings().get_constellationSelectionColor();
      }
    } else {
      col = Settings.get_globalSettings().get_constellationFigureColor();
    }
    this._constellationVertexBuffers[ls.get_name()].drawLines(renderContext, .35, Color.load(col));
  },
  _drawSingleConstellationOld: function (renderContext, ls) {
    const reverse = false;
    const centroid = Constellations.constellationCentroids[ls.get_name()];
    if (centroid != null) {
      const pos = Coordinates.raDecTo3d((reverse) ? -centroid.get_RA() - 6 : centroid.get_RA(), (reverse) ? centroid.get_dec() : centroid.get_dec());
      if (Vector3d.dot(renderContext.get_viewPoint(), pos) < Constellations._maxSeperation) {
        return;
      }
    }
    this._drawCount++;
    let col;
    if (this._boundry) {
      if (Constellations._constToDraw !== ls.get_name()) {
        col = Settings.get_globalSettings().get_constellationBoundryColor();
      } else {
        col = Settings.get_globalSettings().get_constellationSelectionColor();
      }
    } else {
      col = Settings.get_globalSettings().get_constellationFigureColor();
    }
    if (renderContext.gl == null) {
      const ctx = renderContext.device;
      const count = ls.points.length;
      let lastPoint = new Vector3d();
      ctx.save();
      let linePending = false;
      ctx.beginPath();
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.25;
      for (let i = 0; i < count; i++) {
        if (!ls.points[i].pointType || !i) {
          if (linePending) {
            ctx.stroke();
          }
          lastPoint = renderContext.WVP.transform(Coordinates.raDecTo3d(ls.points[i].RA, ls.points[i].dec));
          ctx.moveTo(lastPoint.x, lastPoint.y);
        } else {
          const newPoint = renderContext.WVP.transform(Coordinates.raDecTo3d(ls.points[i].RA, ls.points[i].dec));
          ctx.lineTo(newPoint.x, newPoint.y);
          linePending = true;
        }
      }
      if (this._boundry) {
        ctx.closePath();
      }
      ctx.stroke();
      ctx.restore();
    } else {
    }
  },
  findConstellationForPoint: function (ra, dec) {
    if (dec > 88.402 || this.lines == null) {
      return 'UMI';
    }
    const $enum1 = ss.enumerate(this.lines);
    while ($enum1.moveNext()) {
      const ls = $enum1.current;
      const count = ls.points.length;
      let i;
      let j;
      let inside = false;
      for (i = 0, j = count - 1; i < count; j = i++) {
        if ((((ls.points[i].dec <= dec) && (dec < ls.points[j].dec)) || ((ls.points[j].dec <= dec) && (dec < ls.points[i].dec))) && (ra < (ls.points[j].RA - ls.points[i].RA) * (dec - ls.points[i].dec) / (ls.points[j].dec - ls.points[i].dec) + ls.points[i].RA)) {
          inside = !inside;
        }
      }
      if (inside) {
        return ls.get_name();
      }
    }
    if (ra > 0) {
      return this.findConstellationForPoint(ra - 24, dec);
    }
    if (dec > 65.5) {
      return 'UMI';
    }
    if (dec < -65.5) {
      return 'OCT';
    }
    return 'Error';
  }
};



export function ConstellationFilter() {
  this.bits = new Array(3);
  this.oldBits = new Array(3);
  this.blendState = BlendState.create(false, 1000);
  this.internal = false;
  this.settingsOwned = false;
  for (let i = 0; i < 3; i++) {
    this.bits[i] = ~this.bits[i];
    this.oldBits[i] = this.bits[i];
  }
}
ConstellationFilter.buildConstellationFilters = function() {
  const all = ConstellationFilter.get_allConstellation();
  all.internal = true;
  ConstellationFilter.families['AllConstellation'] = all;
  ConstellationFilter.families['Zodiacal'] = ConstellationFilter.get_zodiacal();
  ConstellationFilter.families['Ursa Major Family'] = ConstellationFilter.get_ursaMajorFamily();
  ConstellationFilter.families['Perseus Family'] = ConstellationFilter.get_perseusFamily();
  ConstellationFilter.families['Hercules Family'] = ConstellationFilter.get_herculesFamily();
  ConstellationFilter.families['Orion Family'] = ConstellationFilter.get_orionFamily();
  ConstellationFilter.families['Heavenly Waters'] = ConstellationFilter.get_heavenlyWaters();
  ConstellationFilter.families['Bayer Family'] = ConstellationFilter.get_bayerFamily();
  ConstellationFilter.families['La Caille Family'] = ConstellationFilter.get_laCaileFamily();
};
ConstellationFilter.saveCustomFilters = function() {
  const sb = new ss.StringBuilder();
  const $dict1 = ConstellationFilter.families;
  for (let $key2 in $dict1) {
    const kv = {key: $key2, value: $dict1[$key2]};
    if (!kv.value.internal) {
      sb.append(kv.key);
      sb.append(';');
      sb.appendLine(kv.value.toString());
    }
  }
};
ConstellationFilter.get_allConstellation = function() {
  const all = new ConstellationFilter();
  all.setAll(true);
  return all;
};
ConstellationFilter.get_zodiacal = function() {
  const zodiacal = new ConstellationFilter();
  zodiacal.set('ARI', true);
  zodiacal.set('TAU', true);
  zodiacal.set('GEM', true);
  zodiacal.set('CNC', true);
  zodiacal.set('LEO', true);
  zodiacal.set('VIR', true);
  zodiacal.set('LIB', true);
  zodiacal.set('SCO', true);
  zodiacal.set('SGR', true);
  zodiacal.set('CAP', true);
  zodiacal.set('AQR', true);
  zodiacal.set('PSC', true);
  zodiacal.internal = true;
  return zodiacal;
};
ConstellationFilter.get_ursaMajorFamily = function() {
  const uma = new ConstellationFilter();
  uma.set('UMA', true);
  uma.set('UMI', true);
  uma.set('DRA', true);
  uma.set('CVN', true);
  uma.set('BOO', true);
  uma.set('COM', true);
  uma.set('CRB', true);
  uma.set('CAM', true);
  uma.set('LYN', true);
  uma.set('LMI', true);
  uma.internal = true;
  return uma;
};
ConstellationFilter.get_perseusFamily = function() {
  const Perseus = new ConstellationFilter();
  Perseus.set('CAS', true);
  Perseus.set('CEP', true);
  Perseus.set('AND', true);
  Perseus.set('PER', true);
  Perseus.set('PEG', true);
  Perseus.set('CET', true);
  Perseus.set('AUR', true);
  Perseus.set('LAC', true);
  Perseus.set('TRI', true);
  Perseus.internal = true;
  return Perseus;
};
ConstellationFilter.get_herculesFamily = function() {
  const hercules = new ConstellationFilter();
  hercules.set('HER', true);
  hercules.set('SGE', true);
  hercules.set('AQL', true);
  hercules.set('LYR', true);
  hercules.set('CYG', true);
  hercules.set('VUL', true);
  hercules.set('HYA', true);
  hercules.set('SEX', true);
  hercules.set('CRT', true);
  hercules.set('CRV', true);
  hercules.set('OPH', true);
  hercules.set('SER1', true);
  hercules.set('SER2', true);
  hercules.set('SCT', true);
  hercules.set('CEN', true);
  hercules.set('LUP', true);
  hercules.set('CRA', true);
  hercules.set('ARA', true);
  hercules.set('TRA', true);
  hercules.set('CRU', true);
  hercules.internal = true;
  return hercules;
};
ConstellationFilter.get_orionFamily = function() {
  const orion = new ConstellationFilter();
  orion.set('ORI', true);
  orion.set('CMA', true);
  orion.set('CMI', true);
  orion.set('MON', true);
  orion.set('LEP', true);
  orion.internal = true;
  return orion;
};
ConstellationFilter.get_heavenlyWaters = function() {
  const waters = new ConstellationFilter();
  waters.set('DEL', true);
  waters.set('EQU', true);
  waters.set('ERI', true);
  waters.set('PSA', true);
  waters.set('CAR', true);
  waters.set('PUP', true);
  waters.set('VEL', true);
  waters.set('PYX', true);
  waters.set('COL', true);
  waters.internal = true;
  return waters;
};
ConstellationFilter.get_bayerFamily = function() {
  const bayer = new ConstellationFilter();
  bayer.set('HYA', true);
  bayer.set('DOR', true);
  bayer.set('VOL', true);
  bayer.set('APS', true);
  bayer.set('PAV', true);
  bayer.set('GRU', true);
  bayer.set('PHE', true);
  bayer.set('TUC', true);
  bayer.set('IND', true);
  bayer.set('CHA', true);
  bayer.set('MUS', true);
  bayer.internal = true;
  return bayer;
};
ConstellationFilter.get_laCaileFamily = function() {
  const LaCaile = new ConstellationFilter();
  LaCaile.set('NOR', true);
  LaCaile.set('CIR', true);
  LaCaile.set('TEL', true);
  LaCaile.set('MIC', true);
  LaCaile.set('SCL', true);
  LaCaile.set('FOR', true);
  LaCaile.set('CAE', true);
  LaCaile.set('HOR', true);
  LaCaile.set('OCT', true);
  LaCaile.set('MEN', true);
  LaCaile.set('RET', true);
  LaCaile.set('PIC', true);
  LaCaile.set('ANT', true);
  LaCaile.internal = true;
  return LaCaile;
};
ConstellationFilter.parse = function(val) {
  const parts = (val).split(',');
  const cf = new ConstellationFilter();
  try {
    for (let i = 0; i < 3; i++) {
      cf.bits[i] = parseInt(parts[i]);
    }
  }
  catch ($e1) {
  }
  return cf;
};
export const ConstellationFilter$ = {
  _saveBits: function () {
    for (let i = 0; i < 3; i++) {
      this.oldBits[i] = this.bits[i];
    }
  },
  _isChanged: function () {
    for (let i = 0; i < 3; i++) {
      if (this.oldBits[i] !== this.bits[i]) {
        return true;
      }
    }
    return false;
  },
  _checkChanged: function () {
    if (this._isChanged()) {
      this._fireChanged();
    }
  },
  isEnabled: function (abbrev) {
    let bitID = Constellations.bitIDs[abbrev];
    const index = bitID / 32;
    bitID = bitID % 32;
    return this.blendState.get_state() && !!((1 << bitID) & this.bits[index]);
  },
  isSet: function (abbrev) {
    this._saveBits();
    let bitID = Constellations.bitIDs[abbrev];
    const index = ss.truncate((bitID / 32));
    bitID = bitID % 32;
    return !!((1 << bitID) & this.bits[index]);
  },
  set: function (abbrev, state) {
    this._saveBits();
    let bitID = Constellations.bitIDs[abbrev];
    const index = bitID / 32;
    bitID = bitID % 32;
    if (state) {
      this.bits[index] = this.bits[index] | (1 << bitID);
    } else {
      this.bits[index] = this.bits[index] ^ (1 << bitID);
    }
    this._checkChanged();
  },
  setAll: function (state) {
    this._saveBits();
    for (let bitID = 0; bitID < 89; bitID++) {
      const index = bitID / 32;
      const bit = bitID % 32;
      if (state) {
        this.bits[index] = this.bits[index] | (1 << bit);
      } else {
        this.bits[index] = this.bits[index] ^ (1 << bit);
      }
    }
    this._checkChanged();
  },
  setBits: function (bits) {
    this._saveBits();
    for (let i = 0; i < 3; i++) {
      this.bits[i] = (bits[i * 4]) + ((bits[i * 4 + 1]) << 8) + ((bits[i * 4 + 2]) << 16) + ((bits[i * 4 + 3]) << 24);
    }
    this._checkChanged();
  },
  getBits: function () {
    const bits = new Array(12);
    let index = 0;
    for (let i = 0; i < 3; i++) {
      bits[index++] = this.bits[i];
      bits[index++] = (this.bits[i] >> 8);
      bits[index++] = (this.bits[i] >> 16);
      bits[index++] = (this.bits[i] >> 24);
    }
    return bits;
  },
  cloneFilter: function (filter) {
    this._saveBits();
    for (let i = 0; i < 3; i++) {
      this.bits[i] = filter.bits[i];
    }
    this._checkChanged();
  },
  clone: function () {
    const newFilter = new ConstellationFilter();
    newFilter.cloneFilter(this);
    return newFilter;
  },
  combine: function (filter) {
    this._saveBits();
    for (let i = 0; i < 3; i++) {
      this.bits[i] = this.bits[i] | filter.bits[i];
    }
    this._checkChanged();
  },
  remove: function (filter) {
    this._saveBits();
    for (let i = 0; i < 3; i++) {
      this.bits[i] = this.bits[i] & ~filter.bits[i];
    }
    this._checkChanged();
  },
  _fireChanged: function () {
    if (this.settingsOwned) {
    }
  },
  toString: function () {
    return ss.format('{0},{1},{2}', this.bits[0], this.bits[1], this.bits[2]);
  }
};
