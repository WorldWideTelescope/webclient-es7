import {Sprite2d} from '../Graphics/Sprite2d';
import ss from '../scriptsharp/ss';
import {Texture} from '../Graphics/Texture';
import {Matrix2d, PositionColoredTextured, Vector2d} from '../Double3d';
import {Colors} from '../Color';
import {Rectangle} from '../Util';

export class Selection{
  constructor() {
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

  clearSelection() {
    this.selectionSet.length = 0;
  }
  addSelection(overlay) {
    if (overlay != null) {
      if (!(this.selectionSet.indexOf(overlay) >= 0)) {
        this.selectionSet.push(overlay);
      }
    }
  }
  addSelectionRange(overlays) {
    const $enum1 = ss.enumerate(overlays);
    while ($enum1.moveNext()) {
      const ov = $enum1.current;
      this.selectionSet.push(ov);
    }
  }
  isOverlaySelected(overlay) {
    return (this.selectionSet.indexOf(overlay) >= 0);
  }
  setSelection(overlay) {
    this.selectionSet.length = 0;
    if (overlay != null) {
      this.selectionSet.push(overlay);
    }
  }
  get_multiSelect() {
    return this.selectionSet.length > 1;
  }
  setSelectionRange(overlays) {
    this.selectionSet.length = 0;
    const $enum1 = ss.enumerate(overlays);
    while ($enum1.moveNext()) {
      const ov = $enum1.current;
      this.selectionSet.push(ov);
    }
  }
  get_focus() {
    return this._focus;
  }
  set_focus(value) {
    this._focus = value;
    return value;
  }
  draw3D(renderContext, transparancy) {
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
  }
  _drawSelectionHandles(renderContext, overlay, handleTexture) {
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
  }
  pointToSelectionSpace(pntIn) {
    const tempPoints = new Array(1);
    tempPoints[0] = new Vector2d(pntIn.x, pntIn.y);
    const mat = Matrix2d.rotateAt(-this.selectionSet[0].get_rotationAngle() / 180 * Math.PI, new Vector2d(this.selectionSet[0].get_x(), this.selectionSet[0].get_y()));
    mat._transformPoints(tempPoints);
    return tempPoints[0];
  }
  pointToScreenSpace(pntIn) {
    const tempPoints = new Array(1);
    tempPoints[0] = new Vector2d(pntIn.x, pntIn.y);
    const mat = Matrix2d.rotateAt(this.selectionSet[0].get_rotationAngle() / 180 * Math.PI, new Vector2d(this.selectionSet[0].get_x(), this.selectionSet[0].get_y()));
    mat._transformPoints(tempPoints);
    return tempPoints[0];
  }
  hitTest(position) {
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
  }
  makeHandles(overlay) {
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
