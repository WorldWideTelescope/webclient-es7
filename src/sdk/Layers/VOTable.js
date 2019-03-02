import {WebFile} from '../WebFile';
import {Util} from '../Util';
import ss from '../scriptsharp/ss';



export class VoTable{
  constructor() {
    this.columns = {};
    this.column = [];
    this.rows = [];
    this.loadFilename = '';
    this.sampId = '';
    this.selectedRow = null;
    this.error = false;
    this.errorText = '';
  }
  static loadFromUrl (url, complete) {
    const temp = new VoTable();
    temp._onComplete = complete;
    temp._webFile = new WebFile(Util.getProxiedUrl(url));
    temp._webFile.onStateChange = ss.bind('_loadData', temp);
    temp._webFile.send();
    return temp;
  }
  static loadFromString  (data ){
    const xParser = new DOMParser();
    const doc = xParser.parseFromString(data, 'text/xml');
    const table = new VoTable();
    table.loadFromXML(doc);
    return table;
  }
  _loadData(){
    if (this._webFile.get_state() === 2) {
      alert(this._webFile.get_message());
    } else if (this._webFile.get_state() === 1) {
      this.loadFromXML(this._webFile.getXml());
      if (this._onComplete != null) {
        this._onComplete();
      }
    }
  }
  loadFromXML(xml) {
    const voTable = Util.selectSingleNode(xml, 'VOTABLE');
    if (voTable == null) {
      return;
    }
    let index = 0;
    try {
      const table = Util.selectSingleNode(Util.selectSingleNode(voTable, 'RESOURCE'), 'TABLE');
      if (table != null) {
        const $enum1 = ss.enumerate(table.childNodes);
        while ($enum1.moveNext()) {
          let node = $enum1.current;
          if (node.nodeName === 'FIELD') {
            const col = new VoColumn(node, index++);
            this.columns[col.name] = col;
            this.column.push(col);
          }
        }
      }
    } catch ($e2) {
      this.error = true;
      this.errorText = Util.selectSingleNode(voTable, 'DESCRIPTION').text;
    }
    try {
      const tableData = Util.selectSingleNode(Util.selectSingleNode(Util.selectSingleNode(Util.selectSingleNode(voTable, 'RESOURCE'), 'TABLE'), 'DATA'), 'TABLEDATA');
      if (tableData != null) {
        const $enum3 = ss.enumerate(tableData.childNodes);
        while ($enum3.moveNext()) {
          let node = $enum3.current;
          if (node.nodeName === 'TR') {
            const row = new VoRow(this);
            row.columnData = new Array(ss.keyCount(this.columns));
            index = 0;
            const $enum4 = ss.enumerate(node.childNodes);
            while ($enum4.moveNext()) {
              const child = $enum4.current;
              if (child.nodeName === 'TD') {
                row.columnData[index++] = ss.trim(Util.getInnerText(child));
              }
            }
            this.rows.push(row);
          }
        }
      }
    } catch ($e5) {
    }
  }
  save(filename){return true;}
  getColumnByUcd(ucd) {
    const $enum1 = ss.enumerate(ss.keys(this.columns));
    while ($enum1.moveNext()) {
      const key = $enum1.current;
      const col = this.columns[key];
      if (ss.replaceString(col.ucd, '_', '.').toLocaleLowerCase().indexOf(ucd.toLocaleLowerCase()) > -1) {
        return col;
      }
    }
    return null;
  }
  getRAColumn() {
    const $enum1 = ss.enumerate(ss.keys(this.columns));
    while ($enum1.moveNext()) {
      let key = $enum1.current;
      let col = this.columns[key];
      if (col.ucd.toLocaleLowerCase().indexOf('pos.eq.ra') > -1 || col.ucd.toLocaleLowerCase().indexOf('pos_eq_ra') > -1) {
        return col;
      }
    }
    const $enum2 = ss.enumerate(ss.keys(this.columns));
    while ($enum2.moveNext()) {
      let key = $enum2.current;
      let col = this.columns[key];
      if (col.name.toLocaleLowerCase().indexOf('ra') > -1) {
        return col;
      }
    }
    return null;
  }
  getDecColumn() {
    const $enum1 = ss.enumerate(ss.keys(this.columns));
    while ($enum1.moveNext()) {
      let key = $enum1.current;
      let col = this.columns[key];
      if (col.ucd.toLowerCase().indexOf('pos.eq.dec') > -1 || col.ucd.toLowerCase().indexOf('pos_eq_dec') > -1) {
        return col;
      }
    }
    const $enum2 = ss.enumerate(ss.keys(this.columns));
    while ($enum2.moveNext()) {
      let key = $enum2.current;
      let col = this.columns[key];
      if (col.name.toLowerCase().indexOf('dec') > -1) {
        return col;
      }
    }
    return null;
  }
  getDistanceColumn() {
    const $enum1 = ss.enumerate(ss.keys(this.columns));
    while ($enum1.moveNext()) {
      const key = $enum1.current;
      const col = this.columns[key];
      if (col.ucd.toLowerCase().indexOf('pos.distance') > -1 || col.ucd.toLowerCase().indexOf('pos_distance') > -1) {
        return col;
      }
    }
    return null;
  }
  toString() {
    const sb = new ss.StringBuilder();
    let first = true;
    const $enum1 = ss.enumerate(ss.keys(this.columns));
    while ($enum1.moveNext()) {
      const key = $enum1.current;
      let col = this.columns[key];
      if (first) {
        first = false;
      } else {
        sb.append('\t');
      }
      sb.append(col.name);
    }
    sb.appendLine('');
    const $enum2 = ss.enumerate(this.rows);
    while ($enum2.moveNext()) {
      const row = $enum2.current;
      first = true;
      const $enum3 = ss.enumerate(row.columnData);
      while ($enum3.moveNext()) {
        let col = $enum3.current;
        if (first) {
          first = false;
        } else {
          sb.append('\t');
        }
        sb.append(col.toString());
      }
      sb.appendLine('');
    }
    return sb.toString();
  }
};



export class VoRow {
  constructor(owner) {
    this.selected = false;
    this.owner = owner;
  }
  getColumnData(key) {
    if (this.owner.columns[key] != null) {
      return this.columnData[this.owner.columns[key].index];
    }
    return null;
  }
  get_item(index) {
    if (index < 0 || index >= this.columnData.length) {
      return null;
    }
    return this.columnData[index];
  }
}



export class VoColumn {
  constructor(node, index) {
    this.id = '';
    this.type = 0;
    this.precision = 0;
    this.dimentions = 0;
    this.sizes = null;
    this.ucd = '';
    this.unit = '';
    this.name = '';
    this.index = 0;
    this.index = index;
    if (node.attributes.getNamedItem('datatype') != null) {
      this.type = VoColumn.getType(node.attributes.getNamedItem('datatype').nodeValue);
    }
    if (node.attributes.getNamedItem('ucd') != null) {
      this.ucd = node.attributes.getNamedItem('ucd').nodeValue;
    }
    if (node.attributes.getNamedItem('precision') != null) {
      try {
        this.precision = parseInt(node.attributes.getNamedItem('precision').nodeValue);
      } catch ($e1) {
      }
    }
    if (node.attributes.getNamedItem('ID') != null) {
      this.id = node.attributes.getNamedItem('ID').nodeValue;
    }
    if (node.attributes.getNamedItem('name') != null) {
      this.name = node.attributes.getNamedItem('name').nodeValue;
    } else {
      this.name = this.id;
    }
    if (node.attributes.getNamedItem('unit') != null) {
      this.unit = node.attributes.getNamedItem('unit').nodeValue;
    }
    if (node.attributes.getNamedItem('arraysize') != null) {
      const split = node.attributes.getNamedItem('arraysize').nodeValue.split('x');
      this.dimentions = split.length;
      this.sizes = new Array(split.length);
      let indexer = 0;
      const $enum2 = ss.enumerate(split);
      while ($enum2.moveNext()) {
        const dim = $enum2.current;
        if (!(dim.indexOf('*') > -1)) {
          this.sizes[indexer++] = parseInt(dim);
        } else {
          let len = 9999;
          const lenString = ss.replaceString(dim, '*', '');
          if (lenString.length > 0) {
            len = parseInt(lenString);
          }
          this.sizes[indexer++] = len;
        }
      }
    }
  }

  static getType (type) {
    let Type = 13;
    switch (type) {
      case 'boolean':
        Type = 1;
        break;
      case 'bit':
        Type = 2;
        break;
      case 'unsignedByte':
        Type = 3;
        break;
      case 'short':
        Type = 4;
        break;
      case 'int':
        Type = 5;
        break;
      case 'long':
        Type = 6;
        break;
      case 'char':
        Type = 7;
        break;
      case 'unicodeChar':
        Type = 8;
        break;
      case 'float':
        Type = 9;
        break;
      case 'double':
        Type = 10;
        break;
      case 'floatComplex':
        Type = 11;
        break;
      case 'doubleComplex':
        Type = 12;
        break;
      default:
        Type = 13;
        break;
    }
    return Type;
  }
  toString() {
    return this.name;
  }
};

