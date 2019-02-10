

// wwtlib.Annotation

import {LineList, PointList, TriangleList} from './Graphics/Primative3d';

export function Annotation() {
  this.addedToPrimitives = false;
  this.annotationDirty = true;
  this._opacity = 1;
  this._showHoverLabel = false;
}
Annotation.prepBatch = function(renderContext) {
  if (Annotation.pointList == null || Annotation.batchDirty) {
    Annotation.pointList = new PointList(renderContext);
    Annotation.lineList = new LineList();
    Annotation.triangleList = new TriangleList();
    Annotation.lineList.set_depthBuffered(false);
    Annotation.triangleList.depthBuffered = false;
  }
};
Annotation.drawBatch = function(renderContext) {
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
};
Annotation.separation = function(Alpha1, Delta1, Alpha2, Delta2) {
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
};
Annotation.colorToUint = function(col) {
  return (col.a) << 24 | (col.r << 16) | (col.g) << 8 | col.b;
};
Annotation.colorToUintAlpha = function(col, opacity) {
  return opacity << 24 | col.r << 16 | col.g << 8 | col.b;
};
export const Annotation$ = {
  draw: function (renderContext) {
  },
  get_opacity: function () {
    return this._opacity;
  },
  set_opacity: function (value) {
    this._opacity = value;
    return value;
  },
  get_id: function () {
    return this._id;
  },
  set_id: function (value) {
    this._id = value;
    return value;
  },
  get_tag: function () {
    return this._tag;
  },
  set_tag: function (value) {
    this._tag = value;
    return value;
  },
  get_label: function () {
    return this._label;
  },
  set_label: function (value) {
    this._label = value;
    return value;
  },
  get_showHoverLabel: function () {
    return this._showHoverLabel;
  },
  set_showHoverLabel: function (value) {
    this._showHoverLabel = value;
    return value;
  },
  hitTest: function (renderContext, RA, dec, x, y) {
    return false;
  },
  get_center: function () {
    return this.center;
  },
  set_center: function (value) {
    this.center = value;
    return value;
  }
};
