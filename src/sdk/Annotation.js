

// wwtlib.Annotation

import {Dates, LineList, PointList, TriangleList} from './Graphics/Primative3d';
import {Color, Colors} from './Color';
import {Coordinates} from './Coordinates';
import {Vector3d} from './Double3d';
import {Tessellator} from './Graphics/Tessellator';
import ss from './scriptsharp/ss';



export class Annotation {
  constructor() {
    this.addedToPrimitives = false;
    this.annotationDirty = true;
    this._opacity = 1;
    this._showHoverLabel = false;
  }
  static prepBatch (renderContext) {
    if (Annotation.pointList == null || Annotation.batchDirty) {
      Annotation.pointList = new PointList(renderContext);
      Annotation.lineList = new LineList();
      Annotation.triangleList = new TriangleList();
      Annotation.lineList.set_depthBuffered(false);
      Annotation.triangleList.depthBuffered = false;
    }
  }
  static drawBatch (renderContext) {
    Annotation.batchDirty = false;
    if (renderContext.gl == null) {
      return;
    }
    if (Annotation.pointList != null) {
      Annotation.pointList.draw(renderContext, 1, false);
    }
    if (Annotation.lineList != null) {
      Annotation.lineList.drawLines(renderContext, 1);
    }
    if (Annotation.triangleList != null) {
      Annotation.triangleList.draw(renderContext, 1, 0);
    }
  }
  static separation(Alpha1, Delta1, Alpha2, Delta2) {
    Delta1 = Delta1 / 180 * Math.PI;
    Delta2 = Delta2 / 180 * Math.PI;
    Alpha1 = Alpha1 / 12 * Math.PI;
    Alpha2 = Alpha2 / 12 * Math.PI;
    const x = Math.cos(Delta1) * Math.sin(Delta2) - Math.sin(Delta1) * Math.cos(Delta2) * Math.cos(Alpha2 - Alpha1);
    const y = Math.cos(Delta2) * Math.sin(Alpha2 - Alpha1);
    const z = Math.sin(Delta1) * Math.sin(Delta2) + Math.cos(Delta1) * Math.cos(Delta2) * Math.cos(Alpha2 - Alpha1);
    let vvalue = Math.atan2(Math.sqrt(x * x + y * y), z);
    vvalue = vvalue / Math.PI * 180;
    if (vvalue < 0) {
      vvalue += 180;
    }
    return vvalue;
  }
  static colorToUint(col) {
    return (col.a) << 24 | (col.r << 16) | (col.g) << 8 | col.b;
  }
  static colorToUintAlpha(col, opacity) {
    return opacity << 24 | col.r << 16 | col.g << 8 | col.b;
  }
  draw(renderContext) {
  }
  get_opacity() {
    return this._opacity;
  }
  set_opacity(value) {
    this._opacity = value;
    return value;
  }
  get_id() {
    return this._id;
  }
  set_id(value) {
    this._id = value;
    return value;
  }
  get_tag() {
    return this._tag;
  }
  set_tag(value) {
    this._tag = value;
    return value;
  }
  get_label() {
    return this._label;
  }
  set_label(value) {
    this._label = value;
    return value;
  }
  get_showHoverLabel() {
    return this._showHoverLabel;
  }
  set_showHoverLabel(value) {
    this._showHoverLabel = value;
    return value;
  }
  hitTest(renderContext, RA, dec, x, y) {
    return false;
  }
  get_center() {
    return this.center;
  }
  set_center(value) {
    this.center = value;
    return value;
  }
}

export class Circle extends Annotation{
  constructor() {
    super();
    this._fill$1 = false;
    this._skyRelative$1 = false;
    this._strokeWidth$1 = 1;
    this._radius$1 = 10;
    this._lineColor$1 = Colors.get_white();
    this._fillColor$1 = Colors.get_white();
    this._ra$1 = 0;
    this._dec$1 = 0;
  }
  get_fill() {
    return this._fill$1;
  }
  set_fill(value) {
    Annotation.batchDirty = true;
    this._fill$1 = value;
    return value;
  }
  get_skyRelative() {
    return this._skyRelative$1;
  }
  set_skyRelative(value) {
    Annotation.batchDirty = true;
    this._skyRelative$1 = value;
    return value;
  }
  get_lineWidth() {
    return this._strokeWidth$1;
  }
  set_lineWidth(value) {
    Annotation.batchDirty = true;
    this._strokeWidth$1 = value;
    return value;
  }
  get_radius() {
    return this._radius$1;
  }
  set_radius(value) {
    Annotation.batchDirty = true;
    this._radius$1 = value;
    return value;
  }
  get_lineColor() {
    return this._lineColor$1.toString();
  }
  set_lineColor(value) {
    Annotation.batchDirty = true;
    this._lineColor$1 = Color.load(value);
    return value;
  }
  get_fillColor() {
    return this._fillColor$1.toString();
  }
  set_fillColor(value) {
    Annotation.batchDirty = true;
    this._fillColor$1 = Color.fromName(value);
    return value;
  }
  setCenter(ra, dec) {
    Annotation.batchDirty = true;
    this._ra$1 = ra / 15;
    this._dec$1 = dec;
    this.center = Coordinates.raDecTo3d(this._ra$1, this._dec$1);
  }
  draw(renderContext) {
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
        const up = new Vector3d(0, 1, 0);
        const xNormal = Vector3d.cross(this.center, up);
        const yNormal = Vector3d.cross(this.center, xNormal);
        const r = this._radius$1 / 44;
        const segments = 72;
        const radiansPerSegment = Math.PI * 2 / segments;
        const vertexList = [];
        for (let j = 0; j <= segments; j++) {
          const x = Math.cos(j * radiansPerSegment) * r;
          const y = Math.sin(j * radiansPerSegment) * r;
          vertexList.push(new Vector3d(this.center.x + x * xNormal.x + y * yNormal.x, this.center.y + x * xNormal.y + y * yNormal.y, this.center.z + x * xNormal.z + y * yNormal.z));
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
  }
  hitTest(renderContext, RA, dec, x, y) {
    if (ss.emptyString(this.get_id())) {
      return false;
    }
    let rad = this._radius$1;
    if (!this._skyRelative$1) {
      rad *= renderContext.get_fovScale() / 3600;
    }
    return Annotation.separation(RA, dec, this._ra$1, this._dec$1) < rad;
  }
}
Object.assign(Circle,Annotation);


export class Poly extends Annotation{
  constructor() {
    super();
    this._points$1 = [];
    this._fill$1 = false;
    this._strokeWidth$1 = 1;
    this._lineColor$1 = Colors.get_white();
    this._fillColor$1 = Colors.get_white();

  }
  addPoint(x, y) {
    Annotation.batchDirty = true;
    this._points$1.push(Coordinates.raDecTo3d(x / 15, y));
  }
  get_fill() {
    return this._fill$1;
  }
  set_fill(value) {
    Annotation.batchDirty = true;
    this._fill$1 = value;
    return value;
  }
  get_lineWidth() {
    return this._strokeWidth$1;
  }
  set_lineWidth(value) {
    Annotation.batchDirty = true;
    this._strokeWidth$1 = value;
    return value;
  }
  get_lineColor() {
    return this._lineColor$1.toString();
  }
  set_lineColor(value) {
    Annotation.batchDirty = true;
    this._lineColor$1 = Color.fromName(value);
    return value;
  }
  get_fillColor() {
    return this._fillColor$1.toString();
  }
  set_fillColor(value) {
    Annotation.batchDirty = true;
    this._fillColor$1 = Color.fromName(value);
    return value;
  }
  draw(renderContext) {
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
}
Object.assign(Poly,Annotation);


export class PolyLine  extends Annotation{
  constructor() {
    super();
    this._points$1 = [];
    this._strokeWidth$1 = 1;
    this._lineColor$1 = Colors.get_white();

  }

  addPoint(x, y) {
    Annotation.batchDirty = true;
    this._points$1.push(Coordinates.raDecTo3d(x / 15, y));
  }
  get_lineWidth() {
    return this._strokeWidth$1;
  }
  set_lineWidth(value) {
    Annotation.batchDirty = true;
    this._strokeWidth$1 = value;
    return value;
  }
  get_lineColor() {
    return this._lineColor$1.toString();
  }
  set_lineColor(value) {
    Annotation.batchDirty = true;
    this._lineColor$1 = Color.fromName(value);
    return value;
  }
  draw(renderContext) {
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
}
Object.assign(PolyLine,Annotation);