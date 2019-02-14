import {WebFile} from '../WebFile';
import ss from '../scriptsharp/ss';
import {BinaryReader} from '../Utilities/BinaryReader';
import {Coordinates} from '../Coordinates';
import {WcsImage} from './WcsImage';
import {Bitmap} from '../Utilities/Bitmap';

export class FitsImage extends WcsImage {
  constructor(file, blob, callMeBack) {
    super();
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
    FitsImage.last = this;
    this._callBack$1 = callMeBack;
    this.filename = file;
    if (blob != null) {
      this._readFromBlob$1(blob);
    } else {
      this.getFile(file);
    }
  }

  static isGzip(br) {
    const line = br.readBytes(2);
    br.seek(0);
    return line[0] === 31 && line[1] === 139;
  }

  getFile(url) {
    this._webFile$1 = new WebFile(url);
    this._webFile$1.responseType = 'blob';
    this._webFile$1.onStateChange = ss.bind('fileStateChange', this);
    this._webFile$1.send();
  }

  fileStateChange() {
    if (this._webFile$1.get_state() === 2) {
      alert(this._webFile$1.get_message());
    } else if (this._webFile$1.get_state() === 1) {
      const mainBlob = this._webFile$1.getBlob();
      this._readFromBlob$1(mainBlob);
    }
  }

  _readFromBlob$1(blob) {
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
  }

  _readFromBin$1(br) {
    this.parseHeader(br);
  }

  parseHeader(br) {
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
  }

  getZDescription() {
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
  }

  _addKeyword$1(keyword, values) {
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
  }

  _computeWcs$1() {
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
  }

  getHistogramBitmap(max) {
    const bmp = Bitmap.create(this.histogram.length, 150);
    return bmp;
  }

  drawHistogram(ctx) {
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
  }

  computeHistogram(count) {
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
  }

  _computeHistogramDouble$1(histogram) {
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
  }

  _computeHistogramFloat$1(histogram) {
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
  }

  _computeHistogramInt32$1(histogram) {
    const buckets = histogram.length;
    const buf = this.dataBuffer;
    const factor = (this.maxVal - this.minVal) / buckets;
    const $enum1 = ss.enumerate(buf);
    while ($enum1.moveNext()) {
      const val = $enum1.current;
      histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
    }
  }

  _computeHistogramInt16$1(histogram) {
    const buckets = histogram.length;
    const buf = this.dataBuffer;
    const factor = (this.maxVal - this.minVal) / buckets;
    const $enum1 = ss.enumerate(buf);
    while ($enum1.moveNext()) {
      const val = $enum1.current;
      histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
    }
  }

  _computeHistogramByte$1(histogram) {
    const buckets = histogram.length;
    const buf = this.dataBuffer;
    const factor = (this.maxVal - this.minVal) / buckets;
    const $enum1 = ss.enumerate(buf);
    while ($enum1.moveNext()) {
      const val = $enum1.current;
      histogram[Math.min(buckets - 1, ss.truncate(((val - this.minVal) / factor)))]++;
    }
  }

  _initDataBytes$1(br) {
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
  }

  _initDataShort$1(br) {
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
  }

  _initDataUnsignedShort$1(br) {
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
  }

  _initDataInt$1(br) {
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
  }

  _initDataFloat$1(br) {
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
  }

  _initDataDouble$1(br) {
  }

  getBitmap() {
    if (!this.lastBitmapMax && !this.lastBitmapMin) {
      this.lastBitmapMin = this.minVal;
      this.lastBitmapMax = this.maxVal;
    }
    return this.getScaledBitmap(this.lastBitmapMin, this.lastBitmapMax, this.lastScale, this.lastBitmapZ);
  }

  getScaledBitmap(min, max, scaleType, z) {
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
  }
  _getBitmapByte$1(min, max, scale, z) {
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
  _getBitmapDouble$1(min, max, scale, z) {
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
  _getBitmapFloat$1(min, max, scale, z) {
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
  _getBitmapInt$1(min, max, scale, z) {
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
  getBitmapShort(min, max, scale, z) {
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
}

class ScaleMap {
  map() {
  }
}

class ScaleLinear extends ScaleMap {
  constructor(min, max) {
    super();
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._logFactor$1 = 0;
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
  }

  map(val) {
    return Math.min(255, Math.max(0, ss.truncate(((val - this._min$1) / this._factor$1 * 255))));
  }
}

class ScaleLog {
  constructor(min, max) {
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
  map(val) {
    return Math.min(255, Math.max(0, ss.truncate((Math.log((val - this._min$1) / this._factor$1 * 255) * this._logFactor$1))));
  }
}

class ScalePow extends ScaleMap {
  constructor(min, max) {
    super();
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._powFactor$1 = 0;
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
    this._powFactor$1 = 255 / Math.pow(255, 2);
  }
  map(val) {
    return Math.min(255, Math.max(0, ss.truncate((Math.pow((val - this._min$1) / this._factor$1 * 255, 2) * this._powFactor$1))));
  }
}

class ScaleSqrt extends ScaleMap {
  constructor(min, max) {
    super();
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._sqrtFactor$1 = 0;
    this._min$1 = min;
    this._max$1 = max;
    this._factor$1 = max - min;
    this._sqrtFactor$1 = 255 / Math.sqrt(255);
  }
  map(val) {
    return Math.min(255, Math.max(0, ss.truncate((Math.sqrt((val - this._min$1) / this._factor$1 * 255) * this._sqrtFactor$1))));
  }
}

class HistogramEqualization extends ScaleMap {
  constructor(image, min, max) {
    super();
    this._min$1 = 0;
    this._max$1 = 0;
    this._factor$1 = 0;
    this._maxHistogramValue$1 = 1;
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
  map(val) {
    return this._lookup$1[Math.min(10000 - 1, Math.max(0, ss.truncate(((val - this._min$1) / this._factor$1 * (10000 - 1)))))];
  }
}