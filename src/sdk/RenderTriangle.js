
import {PositionTexture, Vector2d, Vector3d} from './Double3d';

export function RenderTriangle() {
  this.a = new PositionTexture();
  this.b = new PositionTexture();
  this.c = new PositionTexture();
  this.normal = new Vector3d();
  this.opacity = 1;
  this.expansionInPixels = 0.6;
  this.tileLevel = 0;
  this._ta = new Vector3d();
  this._tb = new Vector3d();
  this._tc = new Vector3d();
  this._expandedS0 = new Vector2d();
  this._expandedS1 = new Vector2d();
  this._expandedS2 = new Vector2d();
  this.lighting = 1;
}
RenderTriangle.create = function(a, b, c, img, level) {
  const temp = new RenderTriangle();
  temp.a = a.copy();
  temp.b = b.copy();
  temp.c = c.copy();
  temp._texture = img;
  temp.tileLevel = level;
  temp.makeNormal();
  return temp;
};
RenderTriangle.createWithMiter = function(a, b, c, img, level, expansion) {
  const temp = new RenderTriangle();
  temp.expansionInPixels = expansion;
  temp.a = a.copy();
  temp.b = b.copy();
  temp.c = c.copy();
  temp._texture = img;
  temp.tileLevel = level;
  temp.makeNormal();
  return temp;
};
RenderTriangle._getMiterPoint = function(p1, p2, p3, edgeOffset) {
  const edge1 = Vector2d.subtract(p2, p1);
  const edge2 = Vector2d.subtract(p3, p1);
  edge1.normalize();
  edge2.normalize();
  const dir = new Vector2d(edge1.x + edge2.x, edge1.y + edge2.y);
  dir.normalize();
  const delta = new Vector2d(edge1.x - edge2.x, edge1.y - edge2.y);
  const sineHalfAngle = delta.get_length() / 2;
  const net = Math.min(2, edgeOffset / sineHalfAngle);
  dir.extend(net);
  return new Vector2d(p1.x - dir.x, p1.y - dir.y);
};
RenderTriangle._miterPoint = function(p1x, p1y, p2x, p2y, p3x, p3y, ExpansionInPixels) {
  let e1x = p2x - p1x;
  let e1y = p2y - p1y;
  let e2x = p3x - p1x;
  let e2y = p3y - p1y;
  let length = Math.sqrt(e1x * e1x + e1y * e1y);
  if (!!length) {
    e1x /= length;
    e1y /= length;
  }
  length = Math.sqrt(e2x * e2x + e2y * e2y);
  if (!!length) {
    e2x /= length;
    e2y /= length;
  }
  let dx = e1x + e2x;
  let dy = e1y + e2y;
  length = Math.sqrt(dx * dx + dy * dy);
  if (!!length) {
    dx /= length;
    dy /= length;
  }
  const deltax = e1x - e2x;
  const deltay = e1y - e2y;
  length = Math.sqrt(deltax * deltax + deltay * deltay);
  const sineHalfAngle = length / 2;
  const net = Math.min(2, ExpansionInPixels / sineHalfAngle);
  dx *= net;
  dy *= net;
  return new Vector2d(p1x - dx, p1y - dy);
};
RenderTriangle._miterPointOut = function(pntOut, p1x, p1y, p2x, p2y, p3x, p3y, ExpansionInPixels) {
  let e1x = p2x - p1x;
  let e1y = p2y - p1y;
  let e2x = p3x - p1x;
  let e2y = p3y - p1y;
  let length = Math.sqrt(e1x * e1x + e1y * e1y);
  if (!!length) {
    e1x /= length;
    e1y /= length;
  }
  length = Math.sqrt(e2x * e2x + e2y * e2y);
  if (!!length) {
    e2x /= length;
    e2y /= length;
  }
  let dx = e1x + e2x;
  let dy = e1y + e2y;
  length = Math.sqrt(dx * dx + dy * dy);
  if (!!length) {
    dx /= length;
    dy /= length;
  }
  const deltax = e1x - e2x;
  const deltay = e1y - e2y;
  length = Math.sqrt(deltax * deltax + deltay * deltay);
  const sineHalfAngle = length / 2;
  const net = Math.min(2, ExpansionInPixels / sineHalfAngle);
  dx *= net;
  dy *= net;
  pntOut.x = p1x - dx;
  pntOut.y = p1y - dy;
};
export const RenderTriangle$ = {
  makeNormal: function () {
    const a = this.a.position.copy();
    const b = this.b.position.copy();
    const c = this.c.position.copy();
    a.normalize();
    b.normalize();
    c.normalize();
    const x = a.x + b.x + c.x;
    const y = a.y + b.y + c.y;
    const z = a.z + b.z + c.z;
    this.normal = new Vector3d(x / 3, y / 3, z / 3);
    this.normal.normalize();
  },
  _checkBackface: function () {
    const ab = Vector3d.subtractVectors(this._ta, this._tb);
    const ac = Vector3d.subtractVectors(this._ta, this._tc);
    const cp = Vector3d.cross(ab, ac);
    cp.normalize();
    return cp.z >= 0;
  },
  draw: function (ctx, wvp) {
    if (ctx == null) {
      return;
    }
    wvp._transformTo(this.a.position, this._ta);
    wvp._transformTo(this.b.position, this._tb);
    wvp._transformTo(this.c.position, this._tc);
    if (this._checkBackface() === RenderTriangle.cullInside) {
      RenderTriangle.trianglesCulled++;
      return;
    }
    this._drawTriangle(ctx, this._texture, this._ta.x, this._ta.y, this._tb.x, this._tb.y, this._tc.x, this._tc.y, this.a.tu, this.a.tv, this.b.tu, this.b.tv, this.c.tu, this.c.tv);
  },
  _drawTriangle: function (ctx, im, x0, y0, x1, y1, x2, y2, sx0, sy0, sx1, sy1, sx2, sy2) {
    if (!this.intersects(0, RenderTriangle.width, 0, RenderTriangle.height, x0, y0, x1, y1, x2, y2)) {
      return false;
    }
    RenderTriangle._miterPointOut(this._expandedS0, x0, y0, x1, y1, x2, y2, this.expansionInPixels);
    RenderTriangle._miterPointOut(this._expandedS1, x1, y1, x0, y0, x2, y2, this.expansionInPixels);
    RenderTriangle._miterPointOut(this._expandedS2, x2, y2, x1, y1, x0, y0, this.expansionInPixels);
    x0 = this._expandedS0.x;
    y0 = this._expandedS0.y;
    x1 = this._expandedS1.x;
    y1 = this._expandedS1.y;
    x2 = this._expandedS2.x;
    y2 = this._expandedS2.y;
    ctx.save();
    if (RenderTriangle.renderingOn) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.clip();
    }
    const denom = sx0 * (sy2 - sy1) - sx1 * sy2 + sx2 * sy1 + (sx1 - sx2) * sy0;
    const m11 = -(sy0 * (x2 - x1) - sy1 * x2 + sy2 * x1 + (sy1 - sy2) * x0) / denom;
    const m12 = (sy1 * y2 + sy0 * (y1 - y2) - sy2 * y1 + (sy2 - sy1) * y0) / denom;
    const m21 = (sx0 * (x2 - x1) - sx1 * x2 + sx2 * x1 + (sx1 - sx2) * x0) / denom;
    const m22 = -(sx1 * y2 + sx0 * (y1 - y2) - sx2 * y1 + (sx2 - sx1) * y0) / denom;
    const dx = (sx0 * (sy2 * x1 - sy1 * x2) + sy0 * (sx1 * x2 - sx2 * x1) + (sx2 * sy1 - sx1 * sy2) * x0) / denom;
    const dy = (sx0 * (sy2 * y1 - sy1 * y2) + sy0 * (sx1 * y2 - sx2 * y1) + (sx2 * sy1 - sx1 * sy2) * y0) / denom;
    ctx.transform(m11, m12, m21, m22, dx, dy);
    if (RenderTriangle.renderingOn) {
      ctx.globalAlpha = this.opacity;
      if (this.lighting < 1) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'Black';
        ctx.fillRect(0, 0, RenderTriangle.width, RenderTriangle.height);
        ctx.globalAlpha = this.lighting * this.opacity;
      }
      ctx.drawImage(im, 0, 0);
    }
    ctx.restore();
    return true;
  },
  intersects: function (l, r, t, b, x0, y0, x1, y1, x2, y2) {
    if (x0 > l && x0 < r && y0 > t && y0 < b) {
      return true;
    }
    if (x1 > l && x1 < r && y1 > t && y1 < b) {
      return true;
    }
    if (x2 > l && x2 < r && y2 > t && y2 < b) {
      return true;
    }
    const h4 = RenderTriangle.height * 4;
    if (this.tileLevel < 4 && ((Math.abs(x0 - x1) > h4) || (Math.abs(y0 - y1) > h4) || (Math.abs(x2 - x1) > h4) || (Math.abs(y2 - y1) > h4) || (Math.abs(x0 - x2) > h4) || (Math.abs(y0 - y2) > h4))) {
      return false;
    }
    return this.lineRectangleIntersect(l, r, t, b, x0, y0, x1, y1) || this.lineRectangleIntersect(l, r, t, b, x1, y1, x2, y2) || this.lineRectangleIntersect(l, r, t, b, x2, y2, x0, y0);
  },
  lineRectangleIntersect: function (l, r, t, b, x0, y0, x1, y1) {
    let top_intersection;
    let bottom_intersection;
    let toptrianglepoint;
    let bottomtrianglepoint;
    let m;
    let c;
    m = (y1 - y0) / (x1 - x0);
    c = y0 - (m * x0);
    if (m > 0) {
      top_intersection = (m * l + c);
      bottom_intersection = (m * r + c);
    } else {
      top_intersection = (m * r + c);
      bottom_intersection = (m * l + c);
    }
    if (y0 < y1) {
      toptrianglepoint = y0;
      bottomtrianglepoint = y1;
    } else {
      toptrianglepoint = y1;
      bottomtrianglepoint = y0;
    }
    let topoverlap;
    let botoverlap;
    topoverlap = (top_intersection > toptrianglepoint) ? top_intersection : toptrianglepoint;
    botoverlap = (bottom_intersection < bottomtrianglepoint) ? bottom_intersection : bottomtrianglepoint;
    return (topoverlap < botoverlap) && (!((botoverlap < t) || (topoverlap > b)));
  }
};

