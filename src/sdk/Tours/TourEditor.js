import {ContextMenuStrip, ToolStripMenuItem, ToolStripSeparator} from '../Utilities/ContextMenuStrip';
import {Vector2d} from '../Double3d';
import {Colors} from '../Color';
import ss from '../scriptsharp/ss';
import {Settings} from '../settings';
import {WWTControl} from '../WWTControl';
import {Language} from '../Language';
import {Cursor, Cursors, Util} from '../Util';
import {AudioOverlay, BitmapOverlay, FlipbookOverlay, Overlay, ShapeOverlay, TextOverlay} from './Overlays';
import {SimpleInput} from '../Utilities/Dialog';
import {Imageset} from '../Imageset';
import {UiTools} from '../UITools';
import {EventArgs} from '../ScriptInterface';
import {Undo} from './Undo';

export class TourEditor{
  constructor() {
    this.selection = new Selection();
    this._contextMenu = new ContextMenuStrip();
    this._tour = null;
    this._mouseDown = false;
    this._selectionAction = 11;
    this._needUndoFrame = false;
    this._contextPoint = new Vector2d();
    this._dragCopying = false;
    this._brokeThreshold = false;
    this.nextSlideCallback = null;
    this.clipboardData = '';
    this.clipboardType = '';
    this.editTextCallback = null;
    this._defaultColor = Colors.get_white();
  }

  render(renderContext) {
    renderContext.setupMatricesOverlays();
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    const $enum1 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      if (overlay.get_animate() && this.get_tour().get_currentTourStop().get_keyFramed()) {
        overlay.set_tweenFactor(this._tour.get_currentTourStop().get_tweenPosition());
      } else if (!this.get_tour().get_currentTourStop().get_keyFramed()) {
        overlay.set_tweenFactor((this._tour.get_currentTourStop().get_tweenPosition() < 0.5) ? 0 : 1);
      }
      overlay.draw3D(renderContext, true);
    }
    this.selection.draw3D(renderContext, 1);
    if (TourEditor.currentEditor != null) {
      TourEditor.currentEditor.render(renderContext);
    }
    Settings.tourSettings = null;
  }
  get_tour() {
    return this._tour;
  }
  set_tour(value) {
    this._tour = value;
    return value;
  }
  close() {
    if (this._tour != null) {
      this._tour = null;
      this.set_focus(null);
    }
  }
  clearSelection() {
    this.selection.clearSelection();
    OverlayList._updateOverlayListSelection(this.selection);
    this.set_focus(null);
  }
  get_focus() {
    return this.selection.get_focus();
  }
  set_focus(value) {
    this.selection.set_focus(value);
    return value;
  }
  pointToView(pnt) {
    const clientHeight = WWTControl.singleton.renderContext.height;
    const clientWidth = WWTControl.singleton.renderContext.width;
    const viewWidth = (WWTControl.singleton.renderContext.width / WWTControl.singleton.renderContext.height) * 1116;
    const x = ((pnt.x) / (clientWidth) * viewWidth) - ((viewWidth - 1920) / 2);
    const y = (pnt.y) / clientHeight * 1116;
    return new Vector2d(x, y);
  }
  mouseDown(sender, e) {
    this._brokeThreshold = false;
    this._needUndoFrame = true;
    const location = this.pointToView(new Vector2d(e.offsetX, e.offsetY));
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      this._needUndoFrame = false;
      return false;
    }
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.mouseDown(sender, e)) {
        return true;
      }
    }
    if (this.get_focus() != null) {
      if (this.selection.get_multiSelect()) {
        const $enum1 = ss.enumerate(this.selection.selectionSet);
        while ($enum1.moveNext()) {
          const overlay = $enum1.current;
          if (overlay.hitTest(location)) {
            this._selectionAction = 9;
            this._mouseDown = true;
            this._pointDown = location;
            this.set_focus(overlay);
            if (e.ctrlKey) {
              this._dragCopying = true;
            }
            return true;
          }
        }
      } else {
        if (this.get_focus().hitTest(location)) {
          this._selectionAction = 9;
          this._mouseDown = true;
          this._pointDown = location;
          if (e.ctrlKey) {
            this._dragCopying = true;
          }
          return true;
        }
      }
      const hit = this.selection.hitTest(location);
      if (hit !== 11) {
        this._selectionAction = hit;
        this._mouseDown = true;
        if (hit === 8) {
          this._pointDown = location;
        } else {
          this._pointDown = this.selection.pointToSelectionSpace(location);
        }
        return true;
      }
    }
    for (let i = this._tour.get_currentTourStop().get_overlays().length - 1; i >= 0; i--) {
      if (this._tour.get_currentTourStop().get_overlays()[i].hitTest(location)) {
        this._selectionAction = 9;
        this.set_focus(this._tour.get_currentTourStop().get_overlays()[i]);
        if (e.ctrlKey || e.shiftKey) {
          this.selection.addSelection(this.get_focus());
        } else {
          this.selection.setSelection(this.get_focus());
        }
        OverlayList._updateOverlayListSelection(this.selection);
        this._mouseDown = true;
        this._pointDown = location;
        return true;
      }
    }
    this.set_focus(null);
    this.clearSelection();
    this._needUndoFrame = false;
    return false;
  }
  mouseUp(sender, e) {
    this._brokeThreshold = false;
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.mouseUp(sender, e)) {
        return true;
      }
    }
    this._contextPoint = new Vector2d(e.offsetX, e.offsetY);
    if (this._mouseDown) {
      this._mouseDown = false;
      if (e.button === 2) {
        if (this.get_focus() != null) {
          this.showSelectionContextMenu(new Vector2d(e.offsetX, e.offsetY));
        }
      }
      return true;
    }
    if (e.button === 2) {
      if (this.get_focus() == null) {
        this._showNoSelectionContextMenu(new Vector2d(e.offsetX, e.offsetY));
      }
      return true;
    }
    return false;
  }
  mouseMove(sender, e) {
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.mouseMove(sender, e)) {
        return true;
      }
    }
    const location = this.pointToView(new Vector2d(e.offsetX, e.offsetY));
    if (this._mouseDown && this.get_focus() != null) {
      let undoFrame = null;
      let actionText = Language.getLocalizedText(502, 'Edit');
      if (this._needUndoFrame) {
        undoFrame = new UndoTourStopChange(Language.getLocalizedText(502, 'Edit'), this._tour);
      }
      let moveX;
      let moveY;
      if (this._selectionAction !== 9 && this._selectionAction !== 8) {
        const newPoint = this.selection.pointToSelectionSpace(location);
        moveX = newPoint.x - this._pointDown.x;
        moveY = newPoint.y - this._pointDown.y;
        this._pointDown = newPoint;
      } else {
        moveX = location.x - this._pointDown.x;
        moveY = location.y - this._pointDown.y;
        if (this._selectionAction === 9 && !this._brokeThreshold) {
          if (Math.abs(moveX) > 3 || Math.abs(moveY) > 3) {
            this._brokeThreshold = true;
          } else {
            return true;
          }
        }
        this._pointDown = location;
      }
      if (this._dragCopying) {
        if (this.selection.get_multiSelect()) {
          const set = this.selection.selectionSet;
          this.clearSelection();
          const $enum1 = ss.enumerate(set);
          while ($enum1.moveNext()) {
            var overlay = $enum1.current;
            var newOverlay = this.addOverlay(overlay);
            newOverlay.set_x(overlay.get_x());
            newOverlay.set_y(overlay.get_y());
            this.set_focus(newOverlay);
            this.selection.addSelection(this.get_focus());
          }
          OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
          this._dragCopying = false;
        } else {
          var newOverlay = this.addOverlay(this.get_focus());
          newOverlay.set_x(this.get_focus().get_x());
          newOverlay.set_y(this.get_focus().get_y());
          this.set_focus(newOverlay);
          this.selection.setSelection(this.get_focus());
          OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
          this._dragCopying = false;
        }
      }
      const aspect = this.get_focus().get_width() / this.get_focus().get_height();
      let center = new Vector2d(this.get_focus().get_x(), this.get_focus().get_y());
      if (e.ctrlKey) {
        actionText = Language.getLocalizedText(537, 'Resize');
        switch (this._selectionAction) {
          case 0:
            this.get_focus().set_width(Math.max(2, this.get_focus().get_width() - moveX * 2));
            this.get_focus().set_height(Math.max(2, this.get_focus().get_height() - (moveX / aspect) * 2));
            break;
          case 1:
            this.get_focus().set_height(Math.max(2, this.get_focus().get_height() - moveY * 2));
            break;
          case 2:
            this.get_focus().set_width(Math.max(2, this.get_focus().get_width() + moveX * 2));
            this.get_focus().set_height(Math.max(2, this.get_focus().get_height() + (moveX / aspect) * 2));
            break;
          case 3:
            this.get_focus().set_width(Math.max(2, this.get_focus().get_width() + moveX * 2));
            break;
          case 4:
            this.get_focus().set_width(Math.max(2, this.get_focus().get_width() + moveX * 2));
            this.get_focus().set_height(Math.max(2, this.get_focus().get_height() + (moveX / aspect) * 2));
            break;
          case 5:
            this.get_focus().set_height(Math.max(2, this.get_focus().get_height() + moveY * 2));
            break;
          case 6:
            this.get_focus().set_width(Math.max(2, this.get_focus().get_width() - moveX * 2));
            this.get_focus().set_height(Math.max(2, this.get_focus().get_height() - (moveX / aspect) * 2));
            break;
          case 7:
            this.get_focus().set_width(Math.max(2, this.get_focus().get_width() - moveX * 2));
            break;
          case 8:
            actionText = Language.getLocalizedText(538, 'Rotate');
            this.get_focus().set_rotationAngle(this.get_focus().get_rotationAngle() + moveX / 10);
            break;
          case 9:
            actionText = Language.getLocalizedText(539, 'Drag Copy');
            center.x += moveX;
            center.y += moveY;
            break;
          case 10:
            break;
          case 11:
            break;
          default:
            break;
        }
      } else {
        if (this._selectionAction !== 8 && this._selectionAction !== 9) {
          if (moveX > (this.get_focus().get_width() - 2)) {
            moveX = 0;
          }
          if (moveY > (this.get_focus().get_height() - 2)) {
            moveY = 0;
          }
        }
        actionText = Language.getLocalizedText(537, 'Resize');
        switch (this._selectionAction) {
          case 0:
            this.get_focus().set_width(this.get_focus().get_width() - moveX);
            this.get_focus().set_height(this.get_focus().get_height() - (moveX / aspect));
            center.x += (moveX / 2);
            center.y += ((moveX / aspect) / 2);
            break;
          case 1:
            this.get_focus().set_height(this.get_focus().get_height() - moveY);
            center.y += (moveY / 2);
            break;
          case 2:
            this.get_focus().set_width(this.get_focus().get_width() + moveX);
            this.get_focus().set_height(this.get_focus().get_height() + (moveX / aspect));
            center.x += (moveX / 2);
            center.y -= ((moveX / aspect) / 2);
            break;
          case 3:
            this.get_focus().set_width(this.get_focus().get_width() + moveX);
            center.x += (moveX / 2);
            break;
          case 4:
            this.get_focus().set_width(this.get_focus().get_width() + moveX);
            this.get_focus().set_height(this.get_focus().get_height() + (moveX / aspect));
            center.x += (moveX / 2);
            center.y += ((moveX / aspect) / 2);
            break;
          case 5:
            this.get_focus().set_height(this.get_focus().get_height() + moveY);
            center.y += (moveY / 2);
            break;
          case 6:
            this.get_focus().set_width(this.get_focus().get_width() - moveX);
            this.get_focus().set_height(this.get_focus().get_height() - (moveX / aspect));
            center.x += (moveX / 2);
            center.y -= ((moveX / aspect) / 2);
            break;
          case 7:
            this.get_focus().set_width(this.get_focus().get_width() - moveX);
            center.x += (moveX / 2);
            break;
          case 8:
            actionText = Language.getLocalizedText(538, 'Rotate');
            this.get_focus().set_rotationAngle(this.get_focus().get_rotationAngle() + moveX);
            break;
          case 9:
            actionText = Language.getLocalizedText(540, 'Move');
            center.x += moveX;
            center.y += moveY;
            break;
          case 10:
            break;
          case 11:
            break;
          default:
            break;
        }
      }
      if (this._selectionAction !== 9 && this._selectionAction !== 8) {
        center = this.selection.pointToScreenSpace(center);
      }
      if (this.selection.get_multiSelect()) {
        const $enum2 = ss.enumerate(this.selection.selectionSet);
        while ($enum2.moveNext()) {
          var overlay = $enum2.current;
          overlay.set_x(overlay.get_x() + moveX);
          overlay.set_y(overlay.get_y() + moveY);
        }
      } else {
        this.get_focus().set_x(center.x);
        this.get_focus().set_y(center.y);
      }
      if (this._needUndoFrame) {
        this._needUndoFrame = false;
        undoFrame.set_actionText(actionText);
        Undo.push(undoFrame);
      }
    } else {
      if (this.get_focus() != null) {
        if (this.get_focus().hitTest(location)) {
          Cursor.set_current(Cursors.get_sizeAll());
          return false;
        }
        const hit = this.selection.hitTest(location);
        if (hit === 11) {
          return false;
        }
        switch (hit) {
          case 0:
            Cursor.set_current(Cursors.get_sizeNWSE());
            break;
          case 1:
            Cursor.set_current(Cursors.get_sizeNS());
            break;
          case 2:
            Cursor.set_current(Cursors.get_sizeNESW());
            break;
          case 3:
            Cursor.set_current(Cursors.get_sizeWE());
            break;
          case 4:
            Cursor.set_current(Cursors.get_sizeNWSE());
            break;
          case 5:
            Cursor.set_current(Cursors.get_sizeNS());
            break;
          case 6:
            Cursor.set_current(Cursors.get_sizeNESW());
            break;
          case 7:
            Cursor.set_current(Cursors.get_sizeWE());
            break;
          case 8:
            Cursor.set_current(Cursors.get_sizeWE());
            break;
          case 10:
            break;
          case 11:
            break;
          default:
            break;
        }
      }
    }
    return false;
  }
  _showNoSelectionContextMenu(position) {
    if (this._contextMenu != null) {
      this._contextMenu._dispose();
    }
    if (this._tour.get_currentTourStop() == null) {
      return;
    }
    this._contextMenu = new ContextMenuStrip();
    const pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(425, 'Paste'));
    pasteMenu.enabled = this.clipboardType === 'WorldWideTelescope.Overlay';
    pasteMenu.click = ss.bind('_pasteMenu_Click', this);
    this._contextMenu.items.push(pasteMenu);
    this._contextMenu._show(position);
  }
  _addOpenRectangle_Click(sender, e) {
    this.addShape('', 6);
  }
  _addStar_Click(sender, e) {
    this.addShape('', 2);
  }
  _insertShapeCircle_Click(sender, e) {
    this.addShape('', 0);
  }
  _insertShapeRectangle_Click(sender, e) {
    this.addShape('', 1);
  }
  _insertShapeLine_Click(sender, e) {
    this.addShape('', 5);
  }
  _insertDonut_Click(sender, e) {
    this.addShape('', 3);
  }
  _addArrow_Click(sender, e) {
    this.addShape('', 4);
  }
  showSelectionContextMenu(position) {
    if (this.get_focus() == null) {
      return;
    }
    const multiSelect = this.selection.get_multiSelect();
    if (this._contextMenu != null) {
      this._contextMenu._dispose();
    }
    this._contextMenu = new ContextMenuStrip();
    const cutMenu = ToolStripMenuItem.create(Language.getLocalizedText(427, 'Cut'));
    const copyMenu = ToolStripMenuItem.create(Language.getLocalizedText(428, 'Copy'));
    const pasteMenu = ToolStripMenuItem.create(Language.getLocalizedText(425, 'Paste'));
    const deleteMenu = ToolStripMenuItem.create(Language.getLocalizedText(167, 'Delete'));
    const sep1 = new ToolStripSeparator();
    const sep2 = new ToolStripSeparator();
    const sep3 = new ToolStripSeparator();
    const bringToFront = ToolStripMenuItem.create(Language.getLocalizedText(452, 'Bring to Front'));
    const sendToBack = ToolStripMenuItem.create(Language.getLocalizedText(453, 'Send to Back'));
    const bringForward = ToolStripMenuItem.create(Language.getLocalizedText(454, 'Bring Forward'));
    const sendBackward = ToolStripMenuItem.create(Language.getLocalizedText(455, 'Send Backward'));
    const properties = ToolStripMenuItem.create(Language.getLocalizedText(20, 'Properties'));
    const editText = ToolStripMenuItem.create(Language.getLocalizedText(502, 'Edit'));
    const url = ToolStripMenuItem.create(Language.getLocalizedText(587, 'Hyperlink'));
    let linkString = this.get_focus().get_linkID();
    switch (this.get_focus().get_linkID()) {
      case '':
      case null:
        linkString = ' (' + Language.getLocalizedText(609, 'No Link') + ')';
        break;
      case 'Next':
        linkString = ' (' + Language.getLocalizedText(610, 'Next Slide') + ')';
        break;
      case 'Return':
        linkString = ' (' + Language.getLocalizedText(602, 'Return to Caller') + ')';
        break;
      default:
        const index = this.get_tour().getTourStopIndexByID(this.get_focus().get_linkID());
        if (index > -1) {
          if (ss.emptyString(this._tour.get_tourStops()[index].get_description())) {
            linkString = ss.format(' (' + Language.getLocalizedText(1340, 'Slide') + ' {0})', index);
          } else {
            linkString = ' (' + this._tour.get_tourStops()[index].get_description() + ')';
          }
        }
        break;
    }
    const animateMenu = ToolStripMenuItem.create(Language.getLocalizedText(588, 'Animate'));
    const linkID = ToolStripMenuItem.create(Language.getLocalizedText(589, 'Link to Slide') + linkString);
    const pickColor = ToolStripMenuItem.create(Language.getLocalizedText(458, 'Color/Opacity'));
    const flipbookProperties = ToolStripMenuItem.create(Language.getLocalizedText(630, 'Flipbook Properties'));
    const interpolateMenu = ToolStripMenuItem.create(Language.getLocalizedText(1029, 'Animation Tween Type'));
    const Linear = ToolStripMenuItem.create(Language.getLocalizedText(1030, 'Linear'));
    const Ease = ToolStripMenuItem.create(Language.getLocalizedText(1031, 'Ease In/Out'));
    const EaseIn = ToolStripMenuItem.create(Language.getLocalizedText(1032, 'Ease In'));
    const EaseOut = ToolStripMenuItem.create(Language.getLocalizedText(1033, 'Ease Out'));
    const Exponential = ToolStripMenuItem.create(Language.getLocalizedText(1034, 'Exponential'));
    const Default = ToolStripMenuItem.create(Language.getLocalizedText(1035, 'Slide Default'));
    const Align = ToolStripMenuItem.create(Language.getLocalizedText(790, 'Align'));
    const AlignTop = ToolStripMenuItem.create(Language.getLocalizedText(1333, 'Top'));
    const AlignBottom = ToolStripMenuItem.create(Language.getLocalizedText(1334, 'Bottom'));
    const AlignLeft = ToolStripMenuItem.create(Language.getLocalizedText(1335, 'Left'));
    const AlignRight = ToolStripMenuItem.create(Language.getLocalizedText(1336, 'Right'));
    const AlignHorizon = ToolStripMenuItem.create(Language.getLocalizedText(1337, 'Horizontal'));
    const AlignVertical = ToolStripMenuItem.create(Language.getLocalizedText(1338, 'Vertical'));
    const AlignCenter = ToolStripMenuItem.create(Language.getLocalizedText(1339, 'Centered'));
    Align.dropDownItems.push(AlignTop);
    Align.dropDownItems.push(AlignBottom);
    Align.dropDownItems.push(AlignLeft);
    Align.dropDownItems.push(AlignRight);
    Align.dropDownItems.push(AlignHorizon);
    Align.dropDownItems.push(AlignVertical);
    Align.dropDownItems.push(AlignCenter);
    Linear.tag = 0;
    Ease.tag = 3;
    EaseIn.tag = 1;
    EaseOut.tag = 2;
    Exponential.tag = 4;
    Default.tag = 5;
    Linear.click = ss.bind('_interpolation_Click', this);
    Ease.click = ss.bind('_interpolation_Click', this);
    EaseIn.click = ss.bind('_interpolation_Click', this);
    EaseOut.click = ss.bind('_interpolation_Click', this);
    Exponential.click = ss.bind('_interpolation_Click', this);
    Default.click = ss.bind('_interpolation_Click', this);
    switch (this.get_focus().get_interpolationType()) {
      case 0:
        Linear.checked = true;
        break;
      case 1:
        EaseIn.checked = true;
        break;
      case 2:
        EaseOut.checked = true;
        break;
      case 3:
        Ease.checked = true;
        break;
      case 4:
        Exponential.checked = true;
        break;
      case 5:
        Default.checked = true;
        break;
      default:
        break;
    }
    interpolateMenu.dropDownItems.push(Default);
    interpolateMenu.dropDownItems.push(Linear);
    interpolateMenu.dropDownItems.push(Ease);
    interpolateMenu.dropDownItems.push(EaseIn);
    interpolateMenu.dropDownItems.push(EaseOut);
    interpolateMenu.dropDownItems.push(Exponential);
    cutMenu.click = ss.bind('_cutMenu_Click', this);
    copyMenu.click = ss.bind('_copyMenu_Click', this);
    deleteMenu.click = ss.bind('_deleteMenu_Click', this);
    bringToFront.click = ss.bind('_bringToFront_Click', this);
    sendToBack.click = ss.bind('_sendToBack_Click', this);
    sendBackward.click = ss.bind('_sendBackward_Click', this);
    bringForward.click = ss.bind('_bringForward_Click', this);
    properties.click = ss.bind('_properties_Click', this);
    editText.click = ss.bind('_editText_Click', this);
    url.click = ss.bind('_url_Click', this);
    pickColor.click = ss.bind('_pickColor_Click', this);
    pasteMenu.click = ss.bind('_pasteMenu_Click', this);
    animateMenu.click = ss.bind('_animateMenu_Click', this);
    flipbookProperties.click = ss.bind('_flipbookProperties_Click', this);
    linkID.click = ss.bind('_linkID_Click', this);
    AlignTop.click = ss.bind('_alignTop_Click', this);
    AlignBottom.click = ss.bind('_alignBottom_Click', this);
    AlignLeft.click = ss.bind('_alignLeft_Click', this);
    AlignRight.click = ss.bind('_alignRight_Click', this);
    AlignHorizon.click = ss.bind('_alignHorizon_Click', this);
    AlignVertical.click = ss.bind('_alignVertical_Click', this);
    AlignCenter.click = ss.bind('_alignCenter_Click', this);
    this._contextMenu.items.push(cutMenu);
    this._contextMenu.items.push(copyMenu);
    this._contextMenu.items.push(pasteMenu);
    this._contextMenu.items.push(deleteMenu);
    this._contextMenu.items.push(sep1);
    this._contextMenu.items.push(bringToFront);
    this._contextMenu.items.push(sendToBack);
    this._contextMenu.items.push(bringForward);
    this._contextMenu.items.push(sendBackward);
    this._contextMenu.items.push(Align);
    this._contextMenu.items.push(sep2);
    pasteMenu.enabled = false;
    this._contextMenu.items.push(pickColor);
    this._contextMenu.items.push(url);
    this._contextMenu.items.push(linkID);
    this._contextMenu.items.push(animateMenu);
    this._contextMenu.items.push(sep3);
    this._contextMenu.items.push(flipbookProperties);
    animateMenu.checked = this.get_focus().get_animate();
    this._contextMenu.items.push(interpolateMenu);
    interpolateMenu.enabled = this.get_focus().get_animate();
    flipbookProperties.visible = (ss.canCast(this.get_focus(), FlipbookOverlay));
    sep3.visible = (ss.canCast(this.get_focus(), FlipbookOverlay));
    if (multiSelect) {
      url.visible = false;
      linkID.visible = false;
      properties.visible = false;
      flipbookProperties.visible = false;
      bringForward.visible = false;
      sendBackward.visible = false;
    } else {
      Align.visible = false;
    }
    this._contextMenu.items.push(properties);
    if (this.get_focus() != null) {
      if (ss.typeOf(this.get_focus()) === TextOverlay) {
        this._contextMenu.items.push(editText);
      }
    }
    this._contextMenu._show(position);
  }
  _editText_Click(sender, e) {
    if (this.get_focus() != null) {
      if (ss.typeOf(this.get_focus()) === TextOverlay) {
        this._editText();
      }
    }
  }
  _alignVertical_Click(sender, e) {
    if (this.get_focus() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(1036, 'Vertical Align'), this._tour));
    const xCenter = this.get_focus().get_x();
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      overlay.set_x(xCenter);
    }
  }
  _alignHorizon_Click(sender, e) {
    if (this.get_focus() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(1037, 'Horizontal Align'), this._tour));
    const yCenter = this.get_focus().get_y();
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      overlay.set_y(yCenter);
    }
  }
  _alignCenter_Click(sender, e) {
    if (this.get_focus() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(1038, 'Align Centers'), this._tour));
    const yCenter = this.get_focus().get_y();
    const xCenter = this.get_focus().get_x();
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      overlay.set_y(yCenter);
      overlay.set_x(xCenter);
    }
  }
  _alignRight_Click(sender, e) {
    if (this.get_focus() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(1040, 'Align Right'), this._tour));
    const left = this.get_focus().get_x() + this.get_focus().get_width() / 2;
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      overlay.set_x(left - overlay.get_width() / 2);
    }
  }
  _alignLeft_Click(sender, e) {
    if (this.get_focus() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(1041, 'Align Left'), this._tour));
    const right = this.get_focus().get_x() - this.get_focus().get_width() / 2;
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      overlay.set_x(right + overlay.get_width() / 2);
    }
  }
  _alignBottom_Click(sender, e) {
    if (this.get_focus() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(1042, 'Align Bottoms'), this._tour));
    const top = this.get_focus().get_y() + this.get_focus().get_height() / 2;
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      overlay.set_y(top - overlay.get_height() / 2);
    }
  }
  _alignTop_Click(sender, e) {
    if (this.get_focus() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(1039, 'Align Tops'), this._tour));
    const top = this.get_focus().get_y() - this.get_focus().get_height() / 2;
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      overlay.set_y(top + overlay.get_height() / 2);
    }
  }
  _interpolation_Click(sender, e) {
    const item = sender;
    if (this.get_focus() != null) {
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_interpolationType(item.tag);
      }
    }
  }
  _linkSlideChosen() {
    if (this.selectDialog.get_OK()) {
      this.get_focus().set_linkID(this.selectDialog.get_id());
    }
  }
  _linkID_Click(sender, e) {
    this.selectDialog = new SelectLink(this.get_focus().get_linkID());
    this.nextSlideCallback(this.selectDialog, ss.bind('_linkSlideChosen', this));
  }
  _flipbookProperties_Click(sender, e) {  }
  _animateMenu_Click(sender, e) {
    if (this.get_focus() != null) {
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(588, 'Animate'), this._tour));
      const animate = !this.get_focus().get_animate();
      const $enum1 = ss.enumerate(this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_animate(animate);
      }
    }
  }
  _url_Click(sender, e) {
    const $this = this;

    if (this.get_focus() != null) {
      const input = new SimpleInput(Language.getLocalizedText(541, 'Edit Hyperlink'), Language.getLocalizedText(542, 'Url'), this.get_focus().get_url(), 2048);
      input.show(Cursor.get_position(), () => {
        Undo.push(new UndoTourStopChange(Language.getLocalizedText(541, 'Edit Hyperlink'), $this._tour));
        $this.get_focus().set_url(input.text);
      });
    }
  }
  _pickColor_Click(sender, e) {
    const $this = this;

    const picker = new ColorPicker();
    picker.color = this.get_focus().get_color();
    picker.callBack = () => {
      Undo.push(new UndoTourStopChange(Language.getLocalizedText(543, 'Edit Color'), $this._tour));
      const $enum1 = ss.enumerate($this.selection.selectionSet);
      while ($enum1.moveNext()) {
        const overlay = $enum1.current;
        overlay.set_color(picker.color);
      }
    };
    picker.show(e);
  }
  _volume_Click(sender, e) {
    const vol = new PopupVolume();
    vol.volume = (this.get_focus()).get_volume();
    vol.showDialog();
    (this.get_focus()).set_volume(vol.volume);
  }
  _deleteMenu_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(167, 'Delete'), this._tour));
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      this._tour.get_currentTourStop().removeOverlay(overlay);
    }
    this.set_focus(null);
    this.clearSelection();
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _properties_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(549, 'Properties Edit'), this._tour));
    const props = new OverlayProperties();
    props.overlay = this.get_focus();
    props.showDialog();
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _bringForward_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(454, 'Bring Forward'), this._tour));
    const $enum1 = ss.enumerate(this._getSortedSelection(false));
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      this._tour.get_currentTourStop().bringForward(overlay);
    }
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _sendBackward_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(455, 'Send Backward'), this._tour));
    const $enum1 = ss.enumerate(this._getSortedSelection(true));
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      this._tour.get_currentTourStop().sendBackward(overlay);
    }
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _sendToBack_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(453, 'Send to Back'), this._tour));
    const $enum1 = ss.enumerate(this._getSortedSelection(true));
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      this._tour.get_currentTourStop().sendToBack(overlay);
    }
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _bringToFront_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(452, 'Bring to Front'), this._tour));
    const $enum1 = ss.enumerate(this._getSortedSelection(false));
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      this._tour.get_currentTourStop().bringToFront(overlay);
    }
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _getSortedSelection(reverse) {
    const sorted = [];
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const ov = $enum1.current;
      sorted.push(ov);
    }
    if (reverse) {
      sorted.sort((p1, p2) => -Util.compare(p1.get_zOrder(), p2.get_zOrder()));
    } else {
      sorted.sort((p1, p2) => Util.compare(p1.get_zOrder(), p2.get_zOrder()));
    }
    return sorted;
  }
  _copyMenu_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    const writer = new XmlTextWriter();
    writer._writeProcessingInstruction('xml', 'version=\'1.0\' encoding=\'UTF-8\'');
    writer._writeStartElement('Overlays');
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      Imageset.saveToXml(writer, true);
    }
    writer._writeEndElement();
    this.clipboardData = writer.body;
    this.clipboardType = 'WorldWideTelescope.Overlay';
  }
  _cutMenu_Click(sender, e) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(427, 'Cut'), this._tour));
    this._copyMenu_Click(sender, e);
    const $enum1 = ss.enumerate(this.selection.selectionSet);
    while ($enum1.moveNext()) {
      const overlay = $enum1.current;
      this._tour.get_currentTourStop().removeOverlay(overlay);
    }
    this.set_focus(null);
    this.clearSelection();
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _pasteMenu_Click(sender, e) {
    Undo.push(new UndoTourSlidelistChange(Language.getLocalizedText(544, 'Paste Object'), this._tour));
    if (this.clipboardType === 'WorldWideTelescope.Overlay') {
      const xParser = new DOMParser();
      const doc = xParser.parseFromString(this.clipboardData, 'text/xml');
      this.clearSelection();
      const parent = Util.selectSingleNode(doc, 'Overlays');
      const $enum1 = ss.enumerate(parent.childNodes);
      while ($enum1.moveNext()) {
        const child = $enum1.current;
        if (child.nodeName === 'Overlay') {
          const copy = Overlay._fromXml(this._tour.get_currentTourStop(), child);
          let found = false;
          let maxX = 0;
          let maxY = 0;
          const $enum2 = ss.enumerate(this._tour.get_currentTourStop().get_overlays());
          while ($enum2.moveNext()) {
            const item = $enum2.current;
            if (item.id === copy.id && ss.typeOf(item) === ss.typeOf(copy)) {
              found = true;
              if (maxY < item.get_y() || maxX < item.get_x()) {
                maxX = item.get_x();
                maxY = item.get_y();
              }
            }
          }
          if (found) {
            copy.set_x(maxX + 20);
            copy.set_y(maxY + 20);
          }
          this._tour.get_currentTourStop().addOverlay(copy);
          this.set_focus(copy);
          this.selection.addSelection(this.get_focus());
          OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
        }
      }
    }
  }
  mouseClick(sender, e){
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.mouseClick(sender, e)) {
        return true;
      }
    }
    return false;
  }
  click(sender, e) {
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.click(sender, e)) {
        return true;
      }
    }
    return false;
  }
  mouseDoubleClick(sender, e) {
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.mouseDoubleClick(sender, e)) {
        return true;
      }
    }
    if (this.get_focus() != null) {
      if (ss.typeOf(this.get_focus()) === TextOverlay) {
        this._editText();
        return true;
      }
    }
    return true;
  }
  _doneEditing() {
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(545, 'Text Edit'), this._tour));
    (this.get_focus()).set_width(0);
    (this.get_focus()).set_height(0);
    this.get_focus().set_color((this.get_focus()).textObject.foregroundColor);
    this.get_focus().cleanUp();
  }
  _editText() {
    const textObj = (this.get_focus()).textObject;
    this.editTextCallback(textObj, ss.bind('_doneEditing', this));
  }
  keyDown(sender, e) {
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.keyDown(sender, e)) {
        return true;
      }
    }
    let increment = 1;
    if (e.ctrlKey) {
      increment = 10;
    }
    switch (e.keyCode) {
      case 65:
        if (e.ctrlKey) {
          this.clearSelection();
          this.selection.addSelectionRange(this._tour.get_currentTourStop().get_overlays());
          OverlayList._updateOverlayListSelection(this.selection);
          if (this._tour.get_currentTourStop().get_overlays().length > 0) {
            this.set_focus(this._tour.get_currentTourStop().get_overlays()[0]);
          }
        }
        break;
      case 90:
        if (e.ctrlKey) {
          if (Undo.peekAction()) {
            TourEdit._undoStep();
          } else {
            UiTools._beep();
          }
        }
        break;
      case 89:
        if (e.ctrlKey) {
          if (Undo.peekRedoAction()) {
            TourEdit._redoStep();
          } else {
            UiTools._beep();
          }
        }
        break;
      case 67:
        if (e.ctrlKey) {
          this._copyMenu_Click(this, new EventArgs());
        }
        break;
      case 86:
        if (e.ctrlKey) {
          this._pasteMenu_Click(this, new EventArgs());
        }
        break;
      case 88:
        if (e.ctrlKey) {
          this._cutMenu_Click(this, new EventArgs());
        }
        break;
      case 46:
        this._deleteMenu_Click(null, null);
        return true;
      case 9:
        if (e.shiftKey) {
          this._selectLast();
        } else {
          this._selectNext();
        }
        return true;
      case 37:
        if (this.get_focus() != null) {
          const $enum1 = ss.enumerate(this.selection.selectionSet);
          while ($enum1.moveNext()) {
            var overlay = $enum1.current;
            if (e.shiftKey) {
              if (e.altKey) {
                if (overlay.get_width() > increment) {
                  Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                  overlay.set_width(overlay.get_width() - increment);
                }
              } else {
                var aspect = overlay.get_width() / overlay.get_height();
                if (overlay.get_width() > increment && overlay.get_height() > (increment * aspect)) {
                  Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                  overlay.set_width(overlay.get_width() - increment);
                  overlay.set_height(overlay.get_height() - increment * aspect);
                }
              }
            } else if (e.altKey) {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(538, 'Rotate'), this._tour));
              overlay.set_rotationAngle(overlay.get_rotationAngle() - increment);
            } else {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
              overlay.set_x(overlay.get_x() - increment);
            }
          }
          return true;
        }
        break;
      case 39:
        if (this.get_focus() != null) {
          const $enum2 = ss.enumerate(this.selection.selectionSet);
          while ($enum2.moveNext()) {
            var overlay = $enum2.current;
            if (e.shiftKey) {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
              if (e.altKey) {
                overlay.set_width(overlay.get_width() + increment);
              } else {
                var aspect = overlay.get_width() / overlay.get_height();
                overlay.set_width(overlay.get_width() + increment);
                overlay.set_height(overlay.get_height() + increment * aspect);
              }
            } else if (e.altKey) {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(538, 'Rotate'), this._tour));
              overlay.set_rotationAngle(overlay.get_rotationAngle() + increment);
            } else {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
              overlay.set_x(overlay.get_x() + increment);
            }
          }
          return true;
        }
        break;
      case 38:
        if (this.get_focus() != null) {
          const $enum3 = ss.enumerate(this.selection.selectionSet);
          while ($enum3.moveNext()) {
            var overlay = $enum3.current;
            if (e.shiftKey) {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
              if (e.altKey) {
                overlay.set_height(overlay.get_height() + increment);
              } else {
                var aspect = overlay.get_width() / overlay.get_height();
                overlay.set_width(overlay.get_width() + increment);
                overlay.set_height(overlay.get_height() + increment * aspect);
              }
            } else if (!e.altKey) {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
              overlay.set_y(overlay.get_y() - increment);
            }
          }
          return true;
        }
        break;
      case 40:
        if (this.get_focus() != null) {
          const $enum4 = ss.enumerate(this.selection.selectionSet);
          while ($enum4.moveNext()) {
            var overlay = $enum4.current;
            if (e.shiftKey) {
              if (e.altKey) {
                if (overlay.get_height() > increment) {
                  Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                  overlay.set_height(overlay.get_height() - increment);
                }
              } else {
                var aspect = overlay.get_width() / overlay.get_height();
                if (overlay.get_width() > increment && overlay.get_height() > (increment * aspect)) {
                  Undo.push(new UndoTourStopChange(Language.getLocalizedText(537, 'Resize'), this._tour));
                  overlay.set_width(overlay.get_width() - increment);
                  overlay.set_height(overlay.get_height() - increment * aspect);
                }
              }
            } else if (!e.altKey) {
              Undo.push(new UndoTourStopChange(Language.getLocalizedText(540, 'Move'), this._tour));
              overlay.set_y(overlay.get_y() + increment);
            }
          }
          return true;
        }
        break;
      case 34:
        if (e.altKey) {
          if (this._tour.get_currentTourstopIndex() < (this._tour.get_tourStops().length - 1)) {
            this._tour.set_currentTourstopIndex(this._tour.get_currentTourstopIndex() + 1) - 1;
            TourEdit._selectCurrent();
            TourEdit._ensureSelectedVisible();
          }
          return true;
        }
        break;
      case 33:
        if (e.altKey) {
          if (this._tour.get_currentTourstopIndex() > 0) {
            this._tour.set_currentTourstopIndex(this._tour.get_currentTourstopIndex() - 1) + 1;
            TourEdit._selectCurrent();
            TourEdit._ensureSelectedVisible();
          }
          return true;
        }
        break;
    }
    return false;
  }
  _selectNext() {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    this.set_focus(this._tour.get_currentTourStop().getNextOverlay(this.get_focus()));
    this.selection.setSelection(this.get_focus());
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  _selectLast() {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    this.set_focus(this._tour.get_currentTourStop().getPerviousOverlay(this.get_focus()));
    this.selection.setSelection(this.get_focus());
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
  }
  keyUp (sender, e) {
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.keyUp(sender, e)) {
        return true;
      }
    }
    return false;
  }
  addPicture(file) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return false;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(546, 'Insert Picture'), this._tour));
    const bmp = BitmapOverlay.create(this._tour.get_currentTourStop(), file);
    bmp.set_x(960);
    bmp.set_y(600);
    this._tour.get_currentTourStop().addOverlay(bmp);
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    return true;
  }
  addFlipbook (filename){return false;}
  addAudio(file, music) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return false;
    }
    const audio = AudioOverlay.create(this._tour.get_currentTourStop(), file);
    audio.set_x(900);
    audio.set_y(600);
    if (music) {
      this._tour.get_currentTourStop().set_musicTrack(audio);
    } else {
      this._tour.get_currentTourStop().set_voiceTrack(audio);
    }
    return true;
  }
  addVideo(filename) {return true;}
  addText(p, textObject) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return false;
    }
    const text = TextOverlay.create(textObject);
    text.set_color(textObject.foregroundColor);
    text.set_x(960);
    text.set_y(600);
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(547, 'Insert Text'), this._tour));
    this._tour.get_currentTourStop().addOverlay(text);
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    return true;
  }
  addOverlay(ol) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return null;
    }
    if (ss.typeOf(ol) === ShapeOverlay) {
      const srcShapeOverlay = ol;
      if (srcShapeOverlay != null) {
        const shape = ShapeOverlay._create(this._tour.get_currentTourStop(), srcShapeOverlay.get_shapeType());
        shape.set_width(srcShapeOverlay.get_width());
        shape.set_height(srcShapeOverlay.get_height());
        shape.set_x(this._contextPoint.x);
        shape.set_y(this._contextPoint.y);
        shape.set_color(srcShapeOverlay.get_color());
        shape.set_rotationAngle(srcShapeOverlay.get_rotationAngle());
        this._tour.get_currentTourStop().addOverlay(shape);
        return shape;
      }
    } else if (ss.typeOf(ol) === TextOverlay) {
      const srcTxtOverlay = ol;
      if (srcTxtOverlay != null) {
        const text = TextOverlay.create(srcTxtOverlay.textObject);
        text.set_x(this._contextPoint.x);
        text.set_y(this._contextPoint.y);
        text.set_color(srcTxtOverlay.get_color());
        this._tour.get_currentTourStop().addOverlay(text);
        return text;
      }
    } else if (ss.typeOf(ol) === BitmapOverlay) {
      const srcBmpOverlay = ol;
      if (srcBmpOverlay != null) {
        var bitmap = srcBmpOverlay.copy(this._tour.get_currentTourStop());
        bitmap.set_x(this._contextPoint.x);
        bitmap.set_y(this._contextPoint.y);
        this._tour.get_currentTourStop().addOverlay(bitmap);
        return bitmap;
      }
    } else if (ss.typeOf(ol) === FlipbookOverlay) {
      const srcFlipbookOverlay = ol;
      if (srcFlipbookOverlay != null) {
        var bitmap = srcFlipbookOverlay.copy(this._tour.get_currentTourStop());
        bitmap.set_x(this._contextPoint.x);
        bitmap.set_y(this._contextPoint.y);
        this._tour.get_currentTourStop().addOverlay(bitmap);
        return bitmap;
      }
    }
    return null;
  }
  addShape(p, shapeType) {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return false;
    }
    Undo.push(new UndoTourStopChange(Language.getLocalizedText(548, 'Insert Shape'), this._tour));
    const shape = ShapeOverlay._create(this._tour.get_currentTourStop(), shapeType);
    shape.set_width(200);
    shape.set_height(200);
    if (shapeType === 4) {
      shape.set_height(shape.get_height() / 2);
    }
    if (shapeType === 5) {
      shape.set_height(12);
    }
    shape.set_x(960);
    shape.set_y(600);
    this._tour.get_currentTourStop().addOverlay(shape);
    this.set_focus(shape);
    this.selection.setSelection(this.get_focus());
    OverlayList._updateOverlayList(this._tour.get_currentTourStop(), this.selection);
    return true;
  }
  getCurrentColor() {
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return this._defaultColor;
    }
    if (this.get_focus() != null) {
      return this.get_focus().get_color();
    } else {
      return this._defaultColor;
    }
  }
  setCurrentColor(color) {
    this._defaultColor = color;
    if (this._tour == null || this._tour.get_currentTourStop() == null) {
      return;
    }
    if (this.get_focus() != null) {
      this.get_focus().set_color(color);
    }
  }
  dispose() {
    if (this._contextMenu != null) {
      this._contextMenu._dispose();
      this._contextMenu = null;
    }
  }
  hover(pnt) {
    if (TourEditor.currentEditor != null) {
      if (TourEditor.currentEditor.hover(pnt)) {
        return true;
      }
    }
    return true;
  }
}

export class OverlayList {
  _updateOverlayList(currentTourStop, selection){}
  _updateOverlayListSelection(selection){}
}

export class TourEdit{
  constructor() {
  }
  _ensureSelectedVisible () { };
  _selectCurrent ()  {  };
  static _undoStep () {
    if (Undo.peekAction()) {
      Undo.stepBack();
    }
  };
  static _redoStep ()  {
    if (Undo.peekRedoAction()) {
      Undo.stepForward();
    }
  };
}

export class SoundEditor{
  constructor() {
    this.target = null;
  }
}
export class TourStopList{
  constructor() {
    this.tour = null;
    this.showAddButton = false;
    this.selectedItems = null;
    this.selectedItem = -1;
    this.refreshCallback = null;
    this.multipleSelection = false;
    this.hitType = false;
  }

  selectAll() {
    this.selectedItems = {};
    for (let i = 0; i < this.tour.get_tourStops().length; i++) {
      this.selectedItems[i] = this.tour.get_tourStops()[i];
    }
  }
  refresh() {
    if (this.refreshCallback != null) {
      this.refreshCallback();
    }
  }
  findItem(ts){return -1;}
  ensureSelectedVisible () {}
  ensureAddVisible() {}
};

export class TimeLine{
  constructor() {
  }
  refreshUi(){}
}