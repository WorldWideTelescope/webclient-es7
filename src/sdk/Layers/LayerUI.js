import {Colors} from '../Color';
import ss from '../scriptsharp/ss';

export class LayerUI {
  get_hasTreeViewNodes() {
    return false;
  }

  getTreeNodes() {
    return null;
  }

  getNodeContextMenu() {
    return null;
  }

  setUICallbacks(callbacks) {
  }
}

export class LayerUIMenuItem {
  constructor() {
    this._tag = null;
    this._isChecked = false;
    this._isEnabled = true;
    this._subMenus = null;
  }

  get_name() {
    return this._name;
  }

  set_name(value) {
    this._name = value;
    return value;
  }

  get_tag() {
    return this._tag;
  }

  set_tag(value) {
    this._tag = value;
    return value;
  }

  get_checked() {
    return this._isChecked;
  }

  set_checked(value) {
    this._isChecked = value;
    return value;
  }

  get_enabled() {
    return this._isEnabled;
  }

  set_enabled(value) {
    this._isEnabled = value;
    return value;
  }

  add_menuItemSelected(value) {
    this.__menuItemSelected = ss.bindAdd(this.__menuItemSelected, value);
  }

  remove_menuItemSelected(value) {
    this.__menuItemSelected = ss.bindSub(this.__menuItemSelected, value);
  }

  fireMenuItemSelected() {
    if (this.__menuItemSelected != null) {
      this.__menuItemSelected(this);
    }
  }

  get_subMenus() {
    if (this._subMenus == null) {
      this._subMenus = [];
    }
    return this._subMenus;
  }
}

export class LayerUITreeNode {
  constructor() {
    this._parent = null;
    this._level = 0;
    this._open = false;
    this._isChecked = false;
    this._bold = false;
    this._color = Colors.get_white();
    this._nodes = null;
  }

  add_nodeChecked(value) {
    this.__nodeChecked = ss.bindAdd(this.__nodeChecked, value);
  }

  remove_nodeChecked(value) {
    this.__nodeChecked = ss.bindSub(this.__nodeChecked, value);
  }

  fireNodeChecked(newState) {
    if (this.__nodeChecked != null) {
      this.__nodeChecked(this, newState);
    }
  }

  add_nodeUpdated(value) {
    this.__nodeUpdated = ss.bindAdd(this.__nodeUpdated, value);
  }

  remove_nodeUpdated(value) {
    this.__nodeUpdated = ss.bindSub(this.__nodeUpdated, value);
  }

  fireNodeUpdated() {
    if (this.__nodeUpdated != null) {
      this.__nodeUpdated(this);
    }
  }

  add_nodeSelected(value) {
    this.__nodeSelected = ss.bindAdd(this.__nodeSelected, value);
  }

  remove_nodeSelected(value) {
    this.__nodeSelected = ss.bindSub(this.__nodeSelected, value);
  }

  fireNodeSelected() {
    if (this.__nodeSelected != null) {
      this.__nodeSelected(this);
    }
  }

  add_nodeActivated(value) {
    this.__nodeActivated = ss.bindAdd(this.__nodeActivated, value);
  }

  remove_nodeActivated(value) {
    this.__nodeActivated = ss.bindSub(this.__nodeActivated, value);
  }

  fireNodeActivated() {
    if (this.__nodeActivated != null) {
      this.__nodeActivated(this);
    }
  }

  get_name() {
    return this._name;
  }

  set_name(value) {
    if (this._name !== value) {
      this._name = value;
      this.fireNodeUpdated();
    }
    return value;
  }

  get_parent() {
    return this._parent;
  }

  set_parent(value) {
    this._parent = value;
    return value;
  }

  get_level() {
    return this._level;
  }

  set_level(value) {
    this._level = value;
    return value;
  }

  get_tag() {
    return this._tag;
  }

  set_tag(value) {
    this._tag = value;
    return value;
  }

  get_referenceTag() {
    return this._referenceTag;
  }

  set_referenceTag(value) {
    this._referenceTag = value;
    return value;
  }

  get_opened() {
    return this._open;
  }

  set_opened(value) {
    if (this._open !== value) {
      this._open = value;
      this.fireNodeUpdated();
    }
    return value;
  }

  get_checked() {
    return this._isChecked;
  }

  set_checked(value) {
    if (this._isChecked !== value) {
      this._isChecked = value;
      this.fireNodeUpdated();
    }
    return value;
  }

  get_bold() {
    return this._bold;
  }

  set_bold(value) {
    if (this._bold !== value) {
      this._bold = value;
      this.fireNodeUpdated();
    }
    return value;
  }

  get_color() {
    return this._color;
  }

  set_color(value) {
    if (this._color !== value) {
      this._color = value;
      this.fireNodeUpdated();
    }
    return value;
  }

  add(name) {
    const node = new LayerUITreeNode();
    node.set_name(name);
    node.set_parent(this);
    node.set_level(this.get_level() + 1);
    this.get_nodes().push(node);
    return node;
  }

  get_nodes() {
    if (this._nodes == null) {
      this._nodes = [];
    }
    return this._nodes;
  }
}


export class Object3dLayerUI {
  constructor(layer) {
    this._layer$1 = null;
    this._opened$1 = true;
    this._callbacks$1 = null;
    this._layer$1 = layer;
    //return new Layer(this);
  }

  setUICallbacks(callbacks) {
    this._callbacks$1 = callbacks;
  }

  get_hasTreeViewNodes() {
    return true;
  }

  getTreeNodes() {
    const nodes = [];
    if (this._layer$1.object3d.objects.length > 0 && this._layer$1.object3d.objects[0].children != null) {
      this._loadTree$1(nodes, this._layer$1.object3d.objects[0].children);
    }
    return nodes;
  }

  _loadTree$1(nodes, children) {
    const $enum1 = ss.enumerate(children);
    while ($enum1.moveNext()) {
      const child = $enum1.current;
      const node = new LayerUITreeNode();
      node.set_name(child.name);
      node.set_tag(child);
      node.set_checked(child.enabled);
      node.add_nodeSelected(ss.bind('_node_NodeSelected$1', this));
      node.add_nodeChecked(ss.bind('_node_NodeChecked$1', this));
      nodes.push(node);
      this._loadTree$1(node.get_nodes(), child.children);
    }
  }

  static _node_NodeChecked$1(node, newState) {
    const child = node.get_tag();
    if (child != null) {
      child.enabled = newState;
    }
  }

  _node_NodeSelected$1(node) {
    if (this._callbacks$1 != null) {
      const child = node.get_tag();
      const rowData = {};
      rowData['Name'] = child.name;
      rowData['Pivot.X'] = child.pivotPoint.x.toString();
      rowData['Pivot.Y'] = child.pivotPoint.y.toString();
      rowData['Pivot.Z'] = child.pivotPoint.z.toString();
      this._callbacks$1.showRowData(rowData);
    }
  }

  getNodeContextMenu(node) {
    return LayerUI.prototype.getNodeContextMenu.call(this, node);
  }
}