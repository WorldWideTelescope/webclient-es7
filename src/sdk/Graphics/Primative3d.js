// wwtlib.PointList

import ss from '../scriptsharp/ss';
import {Matrix3d, PositionColored, Vector3d} from '../Double3d';
import {Planets} from '../Planets';
import {Color} from '../Color';
import {
  PositionColoredVertexBuffer,
  PositionVertexBuffer, TimeSeriesLineVertexBuffer,
  TimeSeriesPointSpriteShader,
  TimeSeriesPointVertex,
  TimeSeriesPointVertexBuffer
} from './GIBuffer';
import {LineShaderNormalDates, OrbitLineShader, SimpleLineShader, SimpleLineShader2D} from './Shaders';

export class PointList {
  constructor(device) {
    this._points = [];
    this._colors = [];
    this._dates = [];
    this._sizes = [];
    this.timeSeries = false;
    this.showFarSide = false;
    this.sky = false;
    this.depthBuffered = true;
    this.decay = 0;
    this.scale = 1;
    this.autoTime = true;
    this.jNow = 0;
    this._dataToDraw = false;
    this.items = [];
    this._imageReady = false;
    this._init = false;
    this.minSize = 2;
    this._pointBuffers = [];
    this._pointBufferCounts = [];
    this._device = device;
  }

  addPoint(v1, color, date, size) {
    this._points.push(v1);
    this._colors.push(color._clone());
    this._dates.push(date);
    this._sizes.push(size);
    this._emptyPointBuffer();
  }

  clear() {
    this._colors.length = 0;
    this._points.length = 0;
    this._dates.length = 0;
    this._sizes.length = 0;
    this._emptyPointBuffer();
  }

  _emptyPointBuffer() {
    const $enum1 = ss.enumerate(this._pointBuffers);
    while ($enum1.moveNext()) {
      const pointBuffer = $enum1.current;
      pointBuffer.dispose();
    }
    this._pointBuffers.length = 0;
    this._init = false;
  }

  _initBuffer(renderContext) {
    const $this = this;

    if (!this._init) {
      let index;
      if (renderContext.gl == null) {

        this._starProfile = document.createElement('img');
        this._starProfile.addEventListener('load', function (e) {
          $this._imageReady = true;
        }, false);
        this._starProfile.src = '/webclient/images/StarProfileAlpha.png';
        this._worldList = new Array(this._points.length);
        this._transformedList = new Array(this._points.length);
        index = 0;
        const $enum1 = ss.enumerate(this._points);
        while ($enum1.moveNext()) {
          const pnt = $enum1.current;
          const item = new DataItem();
          item.location = pnt;
          item.tranformed = new Vector3d();
          item.size = this._sizes[index];
          item.color = this._colors[index];
          this._worldList[index] = item.location;
          this._transformedList[index] = item.tranformed;
          this.items.push(item);
          index++;
        }
      } else {
        if (!this._pointBuffers.length) {
          if (PointList.starTexture == null) {
            PointList.starTexture = Planets.loadPlanetTexture('//cdn.worldwidetelescope.org/webclient/images/StarProfileAlpha.png');
          }
          const count = this._points.length;
          let pointBuffer = null;
          let pointList = null;
          let countLeft = count;
          index = 0;
          let counter = 0;
          const $enum2 = ss.enumerate(this._points);
          while ($enum2.moveNext()) {
            const point = $enum2.current;
            if (counter >= 100000 || pointList == null) {
              if (pointBuffer != null) {
                pointBuffer.unlock();
              }
              const thisCount = Math.min(100000, countLeft);
              countLeft -= thisCount;
              pointBuffer = new TimeSeriesPointVertexBuffer(thisCount);
              pointList = pointBuffer.lock();
              this._pointBuffers.push(pointBuffer);
              this._pointBufferCounts.push(thisCount);
              counter = 0;
            }
            pointList[counter] = new TimeSeriesPointVertex();
            pointList[counter].position = point;
            pointList[counter].pointSize = this._sizes[index];
            pointList[counter].tu = this._dates[index].startDate;
            pointList[counter].tv = this._dates[index].endDate;
            pointList[counter].set_color(this._colors[index]);
            index++;
            counter++;
          }
          if (pointBuffer != null) {
            pointBuffer.unlock();
          }
        }
      }
      this._init = true;
    }
  }

  draw(renderContext, opacity, cull) {
    this._initBuffer(renderContext);
    if (renderContext.gl == null) {
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
          const size = 0.1 * item.size / scaleFactor;
          const half = size / 2;
          if (x > -half && x < width + half && y > -half && y < height + half) {
            ctx.beginPath();
            ctx.fillStyle = item.color.toFormat();
            ctx.arc(x, y, size, 0, Math.PI * 2, true);
            ctx.fill();
          }
        }
      }
      renderContext.device.restore();
    } else {
      const zero = new Vector3d();
      const matInv = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
      matInv.invert();
      const cam = Vector3d._transformCoordinate(zero, matInv);
      const $enum2 = ss.enumerate(this._pointBuffers);
      while ($enum2.moveNext()) {
        const pointBuffer = $enum2.current;
        TimeSeriesPointSpriteShader.use(renderContext, pointBuffer.vertexBuffer, PointList.starTexture.texture2d, Color.fromArgb(255 * opacity, 255, 255, 255), this.depthBuffered, this.jNow, (this.timeSeries) ? this.decay : 0, cam, (this.scale * (renderContext.height / 960)), this.minSize, this.showFarSide, this.sky);
        renderContext.gl.drawArrays(0, 0, pointBuffer.count);
      }
    }
  }

  drawTextured(renderContext, texture, opacity) {
    this._initBuffer(renderContext);
    const zero = new Vector3d();
    const matInv = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    matInv.invert();
    const cam = Vector3d._transformCoordinate(zero, matInv);
    const $enum1 = ss.enumerate(this._pointBuffers);
    while ($enum1.moveNext()) {
      const pointBuffer = $enum1.current;
      TimeSeriesPointSpriteShader.use(renderContext, pointBuffer.vertexBuffer, texture, Color.fromArgb(255 * opacity, 255, 255, 255), this.depthBuffered, this.jNow, this.decay, cam, (this.scale * (renderContext.height / 960)), this.minSize, this.showFarSide, this.sky);
      renderContext.gl.drawArrays(0, 0, pointBuffer.count);
    }
  }
}

// wwtlib.Dates




export class Dates {
  constructor(start, end) {
    this.startDate = 0;
    this.endDate = 0;
    this.startDate = start;
    this.endDate = end;
  }
  static empty () {
    return new Dates(0, 0);
  }
  copy(){
    return new Dates(this.startDate, this.endDate);
  }
}

export class SimpleLineList {
  constructor() {
    this._zBuffer = true;
    this._linePoints = [];
    this._usingLocalCenter = false;
    this.sky = true;
    this.aaFix = true;
    this.pure2D = false;
    this.viewTransform = Matrix3d.get_identity();
    this._lineBuffers = [];
    this._lineBufferCounts = [];
    this.useLocalCenters = false;
  }
  get_depthBuffered() {
    return this._zBuffer;
  }
  set_depthBuffered(value) {
    this._zBuffer = value;
    return value;
  }
  addLine(v1, v2) {
    this._linePoints.push(v1);
    this._linePoints.push(v2);
    this._emptyLineBuffer();
  }
  clear() {
    this._linePoints.length = 0;
    this._emptyLineBuffer();
  }
  drawLines(renderContext, opacity, color) {
    if (this._linePoints.length < 2) {
      return;
    }
    this._initLineBuffer(renderContext);
    const count = this._linePoints.length;
    if (renderContext.gl == null) {
      const viewPoint = Vector3d._transformCoordinate(renderContext.get_viewPoint(), this.viewTransform);
      const ctx = renderContext.device;
      ctx.save();
      ctx.strokeStyle = color.toString();
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.25;
      let firstPoint = new Vector3d();
      let secondPoint = new Vector3d();
      for (let i = 0; i < count; i += 2) {
        firstPoint = renderContext.WVP.transform(this._linePoints[i]);
        secondPoint = renderContext.WVP.transform(this._linePoints[i + 1]);
        if (Vector3d.dot(this._linePoints[i], viewPoint) > 0.6) {
          ctx.beginPath();
          ctx.moveTo(firstPoint.x, firstPoint.y);
          ctx.lineTo(secondPoint.x, secondPoint.y);
          ctx.stroke();
        }
      }
      ctx.restore();
    } else {

      const $enum1 = ss.enumerate(this._lineBuffers);
      while ($enum1.moveNext()) {
        const lineBuffer = $enum1.current;
        if (this.pure2D) {
          SimpleLineShader2D.use(renderContext, lineBuffer.vertexBuffer, color, this._zBuffer);
        } else {
          color.a = opacity;
          SimpleLineShader.use(renderContext, lineBuffer.vertexBuffer, color, this._zBuffer);
        }
        renderContext.gl.drawArrays(1, 0, lineBuffer.count);
      }
    }
  }
  _initLineBuffer(renderContext) {
    if (renderContext.gl != null) {
      if (!this._lineBuffers.length) {
        let point;
        const count = this._linePoints.length;
        let lineBuffer = null;
        let linePointList = null;
        this._localCenter = new Vector3d();
        if (this.get_depthBuffered()) {
          const $enum1 = ss.enumerate(this._linePoints);
          while ($enum1.moveNext()) {
            point = $enum1.current;
            this._localCenter.add(point);
          }
          this._localCenter.x /= count;
          this._localCenter.y /= count;
          this._localCenter.z /= count;
        }
        let countLeft = count;
        let index = 0;
        let counter = 0;
        let temp;
        const $enum2 = ss.enumerate(this._linePoints);
        while ($enum2.moveNext()) {
          point = $enum2.current;
          if (counter >= 100000 || linePointList == null) {
            if (lineBuffer != null) {
              lineBuffer.unlock();
            }
            const thisCount = Math.min(100000, countLeft);
            countLeft -= thisCount;
            lineBuffer = new PositionVertexBuffer(thisCount);
            linePointList = lineBuffer.lock();
            this._lineBuffers.push(lineBuffer);
            this._lineBufferCounts.push(thisCount);
            counter = 0;
          }
          if (this.useLocalCenters) {
            temp = Vector3d.subtractVectors(point, this._localCenter);
            linePointList[counter] = temp;
          } else {
            linePointList[counter] = point;
          }
          index++;
          counter++;
        }
        if (lineBuffer != null) {
          lineBuffer.unlock();
        }
      }
    }
  }
  _emptyLineBuffer() {}
}

export class LineList  {
  constructor() {
    this._zBuffer = true;
    this.timeSeries = false;
    this.showFarSide = true;
    this.sky = false;
    this.decay = 0;
    this.useNonRotatingFrame = false;
    this.jNow = 0;
    this._linePoints = [];
    this._lineColors = [];
    this._lineDates = [];
    this._usingLocalCenter = true;
    this._lineBuffers = [];
    this._lineBufferCounts = [];
  }
  get_depthBuffered() {
    return this._zBuffer;
  }
  set_depthBuffered(value) {
    this._zBuffer = value;
    return value;
  }
  addLine(v1, v2, color, date) {
    this._linePoints.push(v1);
    this._linePoints.push(v2);
    this._lineColors.push(color);
    this._lineDates.push(date);
    this._emptyLineBuffer();
  }
  addLineNoDate(v1, v2, color) {
    this._linePoints.push(v1);
    this._linePoints.push(v2);
    this._lineColors.push(color);
    this._lineDates.push(new Dates(0, 0));
    this._emptyLineBuffer();
  }
  clear() {
    this._linePoints.length = 0;
    this._lineColors.length = 0;
    this._lineDates.length = 0;
  }
  drawLines(renderContext, opacity) {
    if (this._linePoints.length < 2 || opacity <= 0) {
      return;
    }
    if (renderContext.gl == null) {
    } else {
      this._initLineBuffer();
      const $enum1 = ss.enumerate(this._lineBuffers);
      while ($enum1.moveNext()) {
        const lineBuffer = $enum1.current;
        LineShaderNormalDates.use(renderContext, lineBuffer.vertexBuffer, Color.fromArgb(255, 255, 255, 255), this._zBuffer, this.jNow, (this.timeSeries) ? this.decay : 0);
        renderContext.gl.drawArrays(1, 0, lineBuffer.count);
      }
    }
  }
  _initLineBuffer() {
    if (!this._lineBuffers.length) {
      const count = this._linePoints.length;
      let lineBuffer = null;
      let linePointList = null;
      let countLeft = count;
      let index = 0;
      let counter = 0;
      let temp;
      const $enum1 = ss.enumerate(this._linePoints);
      while ($enum1.moveNext()) {
        const point = $enum1.current;
        if (counter >= 100000 || linePointList == null) {
          if (lineBuffer != null) {
            lineBuffer.unlock();
          }
          const thisCount = Math.min(100000, countLeft);
          countLeft -= thisCount;
          lineBuffer = new TimeSeriesLineVertexBuffer(thisCount);
          linePointList = lineBuffer.lock();
          this._lineBuffers.push(lineBuffer);
          this._lineBufferCounts.push(thisCount);
          counter = 0;
        }
        const div2 = ss.truncate((index / 2));
        temp = point;
        linePointList[counter] = new TimeSeriesLineVertex();
        linePointList[counter].position = temp;
        linePointList[counter].normal = point;
        linePointList[counter].tu = this._lineDates[div2].startDate;
        linePointList[counter].tv = this._lineDates[div2].endDate;
        linePointList[counter].set_color(this._lineColors[div2]);
        index++;
        counter++;
      }
      if (lineBuffer != null) {
        lineBuffer.unlock();
      }
    }
  }
  _emptyLineBuffer() {
  }
}


export class TriangleList {
  constructor() {
    this._trianglePoints = [];
    this._triangleColors = [];
    this._triangleDates = [];
    this.timeSeries = false;
    this.showFarSide = false;
    this.sky = false;
    this.depthBuffered = true;
    this.writeZbuffer = false;
    this.decay = 0;
    this.autoTime = true;
    this.jNow = 0;
    this._dataToDraw = false;
    this._triangleBuffers = [];
    this._triangleBufferCounts = [];
  }
  addTriangle(v1, v2, v3, color, date) {
    this._trianglePoints.push(v1);
    this._trianglePoints.push(v2);
    this._trianglePoints.push(v3);
    this._triangleColors.push(color);
    this._triangleDates.push(date);
    this._emptyTriangleBuffer();
  }
  addSubdividedTriangles(v1, v2, v3, color, date, subdivisions) {
    subdivisions--;
    if (subdivisions < 0) {
      this.addTriangle(v1, v2, v3, color, date);
    } else {
      let v12;
      let v23;
      let v31;
      v12 = Vector3d.midPointByLength(v1, v2);
      v23 = Vector3d.midPointByLength(v2, v3);
      v31 = Vector3d.midPointByLength(v3, v1);
      this.addSubdividedTriangles(v1, v12, v31, color, date, subdivisions);
      this.addSubdividedTriangles(v12, v23, v31, color, date, subdivisions);
      this.addSubdividedTriangles(v12, v2, v23, color, date, subdivisions);
      this.addSubdividedTriangles(v23, v3, v31, color, date, subdivisions);
    }
  }
  addQuad(v1, v2, v3, v4, color, date) {
    this._trianglePoints.push(v1);
    this._trianglePoints.push(v3);
    this._trianglePoints.push(v2);
    this._trianglePoints.push(v2);
    this._trianglePoints.push(v3);
    this._trianglePoints.push(v4);
    this._triangleColors.push(color);
    this._triangleDates.push(date);
    this._triangleColors.push(color);
    this._triangleDates.push(date);
    this._emptyTriangleBuffer();
  }
  clear() {
    this._triangleColors.length = 0;
    this._trianglePoints.length = 0;
    this._triangleDates.length = 0;
    this._emptyTriangleBuffer();
  }
  _emptyTriangleBuffer() {
  }
  _initTriangleBuffer() {
    if (!this._triangleBuffers.length) {
      const count = this._trianglePoints.length;
      let triangleBuffer = null;
      let triPointList = null;
      let countLeft = count;
      let index = 0;
      let counter = 0;
      const $enum1 = ss.enumerate(this._trianglePoints);
      while ($enum1.moveNext()) {
        const point = $enum1.current;
        if (counter >= 90000 || triangleBuffer == null) {
          if (triangleBuffer != null) {
            triangleBuffer.unlock();
          }
          const thisCount = Math.min(90000, countLeft);
          countLeft -= thisCount;
          triangleBuffer = new TimeSeriesLineVertexBuffer(thisCount);
          this._triangleBuffers.push(triangleBuffer);
          this._triangleBufferCounts.push(thisCount);
          triPointList = triangleBuffer.lock();
          counter = 0;
        }
        triPointList[counter] = new TimeSeriesLineVertex();
        triPointList[counter].position = point;
        triPointList[counter].normal = point;
        const div3 = ss.truncate((index / 3));
        triPointList[counter].set_color(this._triangleColors[div3]);
        triPointList[counter].tu = this._triangleDates[div3].startDate;
        triPointList[counter].tv = this._triangleDates[div3].endDate;
        index++;
        counter++;
      }
      if (triangleBuffer != null) {
        triangleBuffer.unlock();
      }
      this._triangleColors.length = 0;
      this._triangleDates.length = 0;
      this._trianglePoints.length = 0;
      this._dataToDraw = true;
    }
  }
  draw(renderContext, opacity, cull) {
    if (this._trianglePoints.length < 1 && !this._dataToDraw) {
      return;
    }
    if (renderContext.gl == null) {
    } else {
      this._initTriangleBuffer();
      const $enum1 = ss.enumerate(this._triangleBuffers);
      while ($enum1.moveNext()) {
        const triBuffer = $enum1.current;
        LineShaderNormalDates.use(renderContext, triBuffer.vertexBuffer, Color.fromArgb(255, 255, 255, 255), this.depthBuffered, this.jNow, (this.timeSeries) ? this.decay : 0);
        renderContext.gl.drawArrays(4, 0, triBuffer.count);
      }
    }
  }
}

export class OrbitLineList {
  constructor() {
    this._zBuffer = true;
    this._linePoints = [];
    this._lineColors = [];
    this.sky = true;
    this.aaFix = true;
    this.viewTransform = Matrix3d.get_identity();
    this._lineBuffers = [];
    this._lineBufferCounts = [];
    this.useLocalCenters = false;
  }
  get_depthBuffered() {
    return this._zBuffer;
  }
  set_depthBuffered(value) {
    this._zBuffer = value;
    return value;
  }
  addLine(v1, v2, c1, c2) {
    this._linePoints.push(v1);
    this._lineColors.push(c1);
    this._linePoints.push(v2);
    this._lineColors.push(c2);
    this._emptyLineBuffer();
  }
  clear() {
    this._linePoints.length = 0;
    this._emptyLineBuffer();
  }
  drawLines(renderContext, opacity, color) {
    if (this._linePoints.length < 2) {
      return;
    }
    this._initLineBuffer(renderContext);
    const count = this._linePoints.length;
    const $enum1 = ss.enumerate(this._lineBuffers);
    while ($enum1.moveNext()) {
      const lineBuffer = $enum1.current;
      OrbitLineShader.use(renderContext, lineBuffer.vertexBuffer, color);
      renderContext.gl.drawArrays(1, 0, lineBuffer.count);
    }
  }
  _initLineBuffer(renderContext) {
    if (renderContext.gl != null) {
      if (!this._lineBuffers.length) {
        const count = this._linePoints.length;
        let lineBuffer = null;
        let linePointList = null;
        this._localCenter = new Vector3d();
        let point;
        if (this.get_depthBuffered()) {
          const $enum1 = ss.enumerate(this._linePoints);
          while ($enum1.moveNext()) {
            point = $enum1.current;
            this._localCenter.add(point);
          }
          this._localCenter.x /= count;
          this._localCenter.y /= count;
          this._localCenter.z /= count;
        }
        let countLeft = count;
        let index = 0;
        let counter = 0;
        let temp;
        const $enum2 = ss.enumerate(this._linePoints);
        while ($enum2.moveNext()) {
          point = $enum2.current;
          if (counter >= 100000 || linePointList == null) {
            if (lineBuffer != null) {
              lineBuffer.unlock();
            }
            const thisCount = Math.min(100000, countLeft);
            countLeft -= thisCount;
            lineBuffer = new PositionColoredVertexBuffer(thisCount);
            linePointList = lineBuffer.lock();
            this._lineBuffers.push(lineBuffer);
            this._lineBufferCounts.push(thisCount);
            counter = 0;
          }
          if (this.useLocalCenters) {
            temp = Vector3d.subtractVectors(point, this._localCenter);
            linePointList[counter] = new PositionColored(temp, this._lineColors[index]);
          } else {
            linePointList[counter] = new PositionColored(point, this._lineColors[index]);
          }
          index++;
          counter++;
        }
        if (lineBuffer != null) {
          lineBuffer.unlock();
        }
      }
    }
  }
  _emptyLineBuffer() {
    const $enum1 = ss.enumerate(this._lineBuffers);
    while ($enum1.moveNext()) {
      const lineBuffer = $enum1.current;
      lineBuffer.dispose();
    }
    this._lineBuffers.length = 0;
  }
}

export class TimeSeriesLineVertex {
  constructor() {
    this.position = new Vector3d();
    this.normal = new Vector3d();
    this.tu = 0;
    this.tv = 0;
  }

  static create(position, normal, time, color) {
    const temp = new TimeSeriesLineVertex();
    temp.position = position;
    temp.normal = normal;
    temp.tu = time;
    temp.tv = 0;
    temp.color = color;
    return temp;
  }

  get_color() {
    return this.color;
  }

  set_color(value) {
    this.color = value;
    return value;
  }
}
