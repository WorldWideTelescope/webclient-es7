import {Color, Colors} from '../Color';
import {Layer} from './Layer';
import ss from '../scriptsharp/ss';
import {Orbit} from '../Orbit';
import {Vector3d} from '../Double3d';
import {ReferenceFrame} from './ReferenceFrame';
import {LayerUI, LayerUITreeNode} from './LayerUI';

/**/

export class OrbitLayer extends Layer{
  constructor() {
    super();
    this._frames$1 = [];
    this._primaryUI$1 = null;
    this._pointOpacity$1 = 1;
    this._pointColor$1 = Colors.get_yellow();
    this._filename$1 = '';
    this._dataFile$1 = '';
    return new Layer(this);
  }
  get_frames() {
    return this._frames$1;
  }
  set_frames(value) {
    this._frames$1 = value;
    return value;
  }
  getPrimaryUI() {
    if (this._primaryUI$1 == null) {
      this._primaryUI$1 = new OrbitLayerUI(this);
    }
    return this._primaryUI$1;
  }
  cleanUp() {
    const $enum1 = ss.enumerate(this._frames$1);
    while ($enum1.moveNext()) {
      const frame = $enum1.current;
      if (frame.get_orbit() != null) {
        frame.get_orbit().cleanUp();
        frame.set_orbit(null);
      }
    }
  }
  writeLayerProperties(xmlWriter) {
    xmlWriter._writeAttributeString('PointOpacity', this.get_pointOpacity().toString());
    xmlWriter._writeAttributeString('PointColor', this._pointColor$1.save());
  }
  get_pointOpacity() {
    return this._pointOpacity$1;
  }
  set_pointOpacity(value) {
    if (this._pointOpacity$1 !== value) {
      this.version++;
      this._pointOpacity$1 = value;
    }
    return value;
  }
  get_pointColor() {
    return this._pointColor$1;
  }
  set_pointColor(value) {
    if (this._pointColor$1 !== value) {
      this.version++;
      this._pointColor$1 = value;
    }
    return value;
  }
  getParams() {
    const paramList = new Array(6);
    paramList[0] = this._pointOpacity$1;
    paramList[1] = this.get_color().r / 255;
    paramList[2] = this.get_color().g / 255;
    paramList[3] = this.get_color().b / 255;
    paramList[4] = this.get_color().a / 255;
    paramList[5] = this.get_opacity();
    return paramList;
  }
  setParams(paramList) {
    if (paramList.length === 6) {
      this._pointOpacity$1 = paramList[0];
      this.set_opacity(paramList[5]);
      const color = Color.fromArgb(ss.truncate((paramList[4] * 255)), ss.truncate((paramList[1] * 255)), ss.truncate((paramList[2] * 255)), ss.truncate((paramList[3] * 255)));
      this.set_color(color);
    }
  }
  initializeFromXml(node) {
    this.set_pointOpacity(parseFloat(node.attributes.getNamedItem('PointOpacity').nodeValue));
    this.set_pointColor(Color.load(node.attributes.getNamedItem('PointColor').nodeValue));
  }
  draw(renderContext, opacity, flat) {
    const matSaved = renderContext.get_world();
    renderContext.set_world(renderContext.get_worldBaseNonRotating());
    const $enum1 = ss.enumerate(this._frames$1);
    while ($enum1.moveNext()) {
      const frame = $enum1.current;
      if (frame.showOrbitPath) {
        if (frame.get_orbit() == null) {
          frame.set_orbit(new Orbit(frame.get_elements(), 360, this.get_color(), 1, renderContext.get_nominalRadius()));
        }
        frame.get_orbit().draw3D(renderContext, opacity * this.get_opacity(), new Vector3d());
      }
    }
    renderContext.set_world(matSaved);
    return true;
  }
  addFilesToCabinet(fc) {
    this._filename$1 = fc.tempDirectory + ss.format('{0}\\{1}.txt', fc.get_packageID(), this.id.toString());
    const dir = this._filename$1.substring(0, this._filename$1.lastIndexOf('\\'));
    const blob = new Blob([this._dataFile$1]);
    fc.addFile(this._filename$1, blob);
    Layer.addFilesToCabinet.call(this, fc);
  }
  loadData(tourDoc, filename) {
    const $this = this;

    const blob = tourDoc.getFileBlob(filename);
    const doc = new FileReader();
    doc.onloadend = ee => {
      $this._dataFile$1 = ss.safeCast(doc.result, String);
      $this.loadString($this._dataFile$1);
    };
    doc.readAsText(blob);
  }
  loadString(dataFile) {
    const data = dataFile.split('\n');
    this._frames$1.length = 0;
    for (let i = 0; i < data.length; i += 2) {
      let line1 = i;
      let line2 = i + 1;
      if (data[i].length > 0) {
        const frame = new ReferenceFrame();
        if (data[i].substring(0, 1) !== '1') {
          line1++;
          line2++;
          frame.name = ss.trim(data[i]);
          i++;
        } else if (data[i].substring(0, 1) === '1') {
          frame.name = data[i].substring(2, 5);
        } else {
          i -= 2;
          continue;
        }
        frame.reference = 18;
        frame.oblateness = 0;
        frame.showOrbitPath = true;
        frame.showAsPoint = true;
        frame.referenceFrameType = 1;
        frame.scale = 1;
        frame.semiMajorAxisUnits = 1;
        frame.meanRadius = 10;
        frame.oblateness = 0;
        frame.fromTLE(data[line1], data[line2], 398600441800000);
        this._frames$1.push(frame);
      } else {
        i -= 1;
      }
    }
  }
}
Object.assign(OrbitLayer,Layer);


export class OrbitLayerUI{
  constructor(layer) {
    this._layer$1 = null;
    this._opened$1 = true;
    this._callbacks$1 = null;
    //LayerUI.call(this);
    this._layer$1 = layer;
  }
  setUICallbacks(callbacks) {
    this._callbacks$1 = callbacks;
  }
  static get_hasTreeViewNodes(){return true;}
  getTreeNodes() {
    const nodes = [];
    const $enum1 = ss.enumerate(this._layer$1.get_frames());
    while ($enum1.moveNext()) {
      const frame = $enum1.current;
      const node = new LayerUITreeNode();
      node.set_name(frame.name);
      node.set_tag(frame);
      node.set_checked(frame.showOrbitPath);
      node.add_nodeSelected(ss.bind('_node_NodeSelected$1', this));
      node.add_nodeChecked(ss.bind('_node_NodeChecked$1', this));
      nodes.push(node);
    }
    return nodes;
  }
  static _node_NodeChecked$1(node, newState) {
    const frame = node.get_tag();
    if (frame != null) {
      frame.showOrbitPath = newState;
    }
  }
  _node_NodeSelected$1(node) {
    if (this._callbacks$1 != null) {
      const frame = node.get_tag();
      const rowData = {};
      rowData['Name'] = frame.name;
      rowData['SemiMajor Axis'] = frame.semiMajorAxis.toString();
      rowData['SMA Units'] = frame.semiMajorAxisUnits.toString();
      rowData['Inclination'] = frame.inclination.toString();
      rowData['Eccentricity'] = frame.eccentricity.toString();
      rowData['Long of Asc. Node'] = frame.longitudeOfAscendingNode.toString();
      rowData['Argument Of Periapsis'] = frame.argumentOfPeriapsis.toString();
      rowData['Epoch'] = frame.epoch.toString();
      rowData['Mean Daily Motion'] = frame.meanDailyMotion.toString();
      rowData['Mean Anomoly at Epoch'] = frame.meanAnomolyAtEpoch.toString();
      this._callbacks$1.showRowData(rowData);
    }
  }
  getNodeContextMenu (node) {
    return LayerUI.prototype.getNodeContextMenu.call(this, node);
  }
}