import ss from './scriptsharp/ss';
import {Coordinates} from './Coordinates';
import {Vector3d} from './Double3d';

export class VizLayer{
  constructor() {
    this.table = [];
    this.items = [];
    this._imageReady = false;
    this._dateColumn = 0;
    this._latColumn = 1;
    this._lngColumn = 2;
    this._depthColumn = 3;
    this._magColumn = 4;
  }

  load(data) {
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
  }
  prepare() {
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
  }
  draw(renderContext) {
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

export class DataItem{
  constructor() {
    this.size = 0;
  }
  getColor() {
    return 'Red';
  }
};