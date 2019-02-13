// wwtlib.Histogram

export function Histogram() {
  this.image = null;
  this.layer = null;
  this.tile = null;
  this._dropDown = null;
  this._downPosition = 0;
  this._lowPosition = 0;
  this._highPosition = 255;
  this._center = 127;
  this._ignoreNextClick = false;
  this._dragType = 4;
  this._updated = false;
  this.selectedCurveStyle = 0;
}
Histogram.updateImage = function(isl, z) {
  const image = ss.safeCast(isl.get_imageSet().get_wcsImage(), FitsImage);
  const Tile = TileCache.getTile(0, 0, 0, isl.get_imageSet(), null);
  const low = image.lastBitmapMin;
  const hi = image.lastBitmapMax;
  Tile.texture2d = image.getScaledBitmap(low, hi, image.lastScale, Math.floor(z * (image.depth - 1))).getTexture();
};
Histogram.updateScale = function(isl, scale, low, hi) {
  const image = ss.safeCast(isl.get_imageSet().get_wcsImage(), FitsImage);
  const Tile = TileCache.getTile(0, 0, 0, isl.get_imageSet(), null);
  const z = image.lastBitmapZ;
  Tile.texture2d = image.getScaledBitmap(low, hi, scale, z).getTexture();
};
export const Histogram$ = {
  close: function (e) {
    const menu = document.getElementById('histogram');
    const closeBtn = document.getElementById('histogramClose');
    menu.style.display = 'none';
    window.removeEventListener('click', ss.bind('close', this), true);
    const image = document.getElementById('graph');
    image.removeEventListener('mousedown', ss.bind('mouseDown', this), false);
    image.removeEventListener('mousemove', ss.bind('mousemove', this), false);
    image.removeEventListener('mouseup', ss.bind('mouseup', this), false);
    this._dropDown.removeEventListener('change', ss.bind('curveStyleSelected', this), false);
    this._dropDown.removeEventListener('click', ss.bind('ignoreMe', this), true);
  },
  show: function (position) {
    this.tile = TileCache.getTile(0, 0, 0, this.layer.get_imageSet(), null);
    const picker = document.getElementById('histogram');
    const closeBtn = document.getElementById('histogramClose');
    picker.style.display = 'block';
    picker.style.left = position.x.toString() + 'px';
    picker.style.top = position.y.toString() + 'px';
    this.selectedCurveStyle = this.image.lastScale;
    this._dropDown = document.getElementById('ScaleTypePicker');
    this._dropDown.addEventListener('change', ss.bind('curveStyleSelected', this), false);
    this._dropDown.addEventListener('click', ss.bind('ignoreMe', this), true);
    const canvas = document.getElementById('graph');
    canvas.addEventListener('mousedown', ss.bind('mouseDown', this), false);
    canvas.addEventListener('mousemove', ss.bind('mousemove', this), false);
    canvas.addEventListener('mouseup', ss.bind('mouseup', this), false);
    closeBtn.addEventListener('click', ss.bind('close', this), true);
    this.draw();
  },
  ignoreMe: function (e) {
    this._ignoreNextClick = true;
  },
  curveStyleSelected: function (e) {
    this.selectedCurveStyle = this._dropDown.selectedIndex;
    this.setUpdateTimer();
    this.draw();
    this._ignoreNextClick = true;
  },
  mouseDown: function (e) {
    const canvas = document.getElementById('graph');
    const x = Mouse.offsetX(canvas, e);
    const y = Mouse.offsetY(canvas, e);
    if ((Math.abs(x - this._center) < 10) && Math.abs(y - 75) < 10) {
      this._dragType = 3;
    } else if (Math.abs(x - this._lowPosition) < 3) {
      this._dragType = 0;
    } else if (Math.abs(x - this._highPosition) < 3) {
      this._dragType = 1;
    } else {
      this._dragType = 2;
      this._downPosition = Math.min(255, Math.max(0, x));
      this.draw();
    }
    e.cancelBubble = true;
  },
  mousemove: function (e) {
    const canvas = document.getElementById('graph');
    const x = Mouse.offsetX(canvas, e);
    const y = Mouse.offsetY(canvas, e);
    switch (this._dragType) {
      case 0:
        this._lowPosition = Math.min(255, Math.max(0, x));
        break;
      case 1:
        this._highPosition = Math.min(255, Math.max(0, x));
        break;
      case 2:
        this._lowPosition = this._downPosition;
        this._highPosition = Math.min(255, Math.max(0, x));
        break;
      case 3:
        const hWidth = Math.abs(this._highPosition - this._lowPosition) / 2;
        const adCenter = Math.min(255 - hWidth, Math.max(hWidth, x));
        const moved = this._center - adCenter;
        this._lowPosition -= moved;
        this._highPosition -= moved;
        break;
      case 4:
        return;
      default:
        break;
    }
    this._center = (this._lowPosition + this._highPosition) / 2;
    this.draw();
    const factor = (this.image.maxVal - this.image.minVal) / 256;
    const low = this.image.minVal + (this._lowPosition * factor);
    const hi = this.image.minVal + (this._highPosition * factor);
    this.setUpdateTimer();
    this.image.lastMax = this._highPosition;
    this.image.lastMin = this._lowPosition;
    e.cancelBubble = true;
  },
  mouseup: function (e) {
    if (this._dragType !== 4) {
      this._dragType = 4;
      this.setUpdateTimer();
      this._ignoreNextClick = true;
    }
    e.cancelBubble = true;
  },
  setUpdateTimer: function () {
    const $this = this;

    setTimeout(function () {
      $this.update();
    }, 500);
    this._updated = false;
  },
  update: function () {
    if (this._updated) {
      return;
    }
    if (this.image != null) {
      const factor = (this.image.maxVal - this.image.minVal) / 256;
      const low = this.image.minVal + (this._lowPosition * factor);
      const hi = this.image.minVal + (this._highPosition * factor);
      const z = this.image.lastBitmapZ;
      this.tile.texture2d = this.image.getScaledBitmap(low, hi, this.selectedCurveStyle, z).getTexture();
    }
    this._updated = true;
  },
  draw: function () {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');
    if (this.image != null) {
      this.image.drawHistogram(ctx);
    }
    const red = 'rgba(255,0,0,255)';
    const green = 'rgba(0,255,0,255)';
    const blue = 'rgba(0,0,255,255)';
    ctx.strokeStyle = red;
    ctx.beginPath();
    ctx.moveTo(this._lowPosition, 0);
    ctx.lineTo(this._lowPosition, 150);
    ctx.stroke();
    ctx.strokeStyle = green;
    ctx.beginPath();
    ctx.moveTo(this._highPosition, 0);
    ctx.lineTo(this._highPosition, 150);
    ctx.stroke();
    ctx.strokeStyle = blue;
    ctx.beginPath();
    ctx.arc(this._center, 75, 10, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    const Curve = [];
    let factor,diff,jump,step,val,i;
    switch (this.selectedCurveStyle) {
      case 0:
        Curve.length = 0;
        Curve.push(new Vector2d(this._lowPosition, 150));
        Curve.push(new Vector2d(this._highPosition, 0));
        break;
      case 1:
        Curve.length = 0;
        factor = 150 / Math.log(255);
        diff = (this._highPosition - this._lowPosition);
        jump = (diff < 0) ? -1 : 1;
        step = Math.abs(256 / ((!diff) ? 1E-06 : diff));
        val = 1E-06;
        for (i = this._lowPosition; i !== this._highPosition; i += jump) {
          Curve.push(new Vector2d(i, (150 - (Math.log(val) * factor))));
          val += step;
        }
        break;
      case 2:
        Curve.length = 0;
        factor = 150 / Math.pow(255, 2);
        diff = (this._highPosition - this._lowPosition);
        jump = (diff < 0) ? -1 : 1;
        step = Math.abs(256 / ((!diff) ? 1E-06 : diff));
        val = 1E-06;
        for (i = this._lowPosition; i !== this._highPosition; i += jump) {
          Curve.push(new Vector2d(i, (150 - (Math.pow(val, 2) * factor))));
          val += step;
        }
        break;
      case 3:
        Curve.length = 0;
        factor = 150 / Math.sqrt(255);
        diff = (this._highPosition - this._lowPosition);
        jump = (diff < 0) ? -1 : 1;
        step = Math.abs(256 / ((!diff) ? 1E-06 : diff));
        val = 1E-06;
        for (i = this._lowPosition; i !== this._highPosition; i += jump) {
          Curve.push(new Vector2d(i, (150 - (Math.sqrt(val) * factor))));
          val += step;
        }
        break;
    }
    if (Curve.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = blue;
      ctx.moveTo(Curve[0].x, Curve[0].y);
      for (i = 1; i < Curve.length; i++) {
        ctx.lineTo(Curve[i].x, Curve[i].y);
      }
      ctx.stroke();
    }
  }
};