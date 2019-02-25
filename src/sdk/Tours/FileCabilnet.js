import {WebFile} from '../WebFile';
import ss from '../scriptsharp/ss';
import {Util} from '../Util';


export class FileCabinet {
  constructor() {
    this.tempDirectory = '';
    this._currentOffset = 0;
    this._packageID = '';
    this.url = '';
    this.clearFileList();
  }

  static fromUrl(url, callMe) {
    const temp = new FileCabinet();
    temp.url = url;
    temp._callMe = callMe;
    temp._webFile = new WebFile(url);
    temp._webFile.responseType = 'blob';
    temp._webFile.onStateChange = ss.bind('_loadCabinet', temp);
    temp._webFile.send();
    return temp;
  }

  get_packageID() {
    return this._packageID;
  }

  set_packageID(value) {
    this._packageID = value;
    return value;
  }

  addFile(filename, data) {
    if (data == null) {
      return;
    }
    if (!ss.keyExists(this._fileDirectory, filename)) {
      const fe = new FileEntry(filename, data.size);
      fe.offset = this._currentOffset;
      fe.blob = data;
      this.fileList.push(fe);
      this._fileDirectory[filename] = fe;
      this._currentOffset += fe.size;
    }
  }

  clearFileList() {
    if (this.fileList == null) {
      this.fileList = [];
    }
    if (this._fileDirectory == null) {
      this._fileDirectory = {};
    }
    this.fileList.length = 0;
    ss.clearKeys(this._fileDirectory);
    this._currentOffset = 0;
  }

  packageFiles() {
    const xmlWriter = new XmlTextWriter();
    xmlWriter.formatting = 1;
    xmlWriter._writeProcessingInstruction('xml', 'version=\'1.0\' encoding=\'UTF-8\'');
    xmlWriter._writeStartElement('FileCabinet');
    xmlWriter._writeAttributeString('HeaderSize', '0x0BADFOOD');
    xmlWriter._writeStartElement('Files');
    const $enum1 = ss.enumerate(this.fileList);
    while ($enum1.moveNext()) {
      var entry = $enum1.current;
      xmlWriter._writeStartElement('File');
      xmlWriter._writeAttributeString('Name', entry.filename);
      xmlWriter._writeAttributeString('Size', entry.size.toString());
      xmlWriter._writeAttributeString('Offset', entry.offset.toString());
      xmlWriter._writeEndElement();
    }
    xmlWriter._writeEndElement();
    xmlWriter._writeFullEndElement();
    xmlWriter._close();
    let data = xmlWriter.body;
    let blob = new Blob([data]);
    const sizeText = ss.format('0x{0:x8}', blob.size);
    data = ss.replaceString(data, '0x0BADFOOD', sizeText);
    blob = new Blob([data]);
    const blobs = [];
    blobs.push(blob);
    const $enum2 = ss.enumerate(this.fileList);
    while ($enum2.moveNext()) {
      var entry = $enum2.current;
      blobs.push(entry.blob);
    }
    const cabBlob = new Blob(blobs, {type: 'application/x-wtt'});
    ;
    return cabBlob;
  }

  _loadCabinet() {
    const $this = this;

    if (this._webFile.get_state() === 2) {
      alert(this._webFile.get_message());
    } else if (this._webFile.get_state() === 1) {
      this._mainBlob = this._webFile.getBlob();
      const chunck = new FileReader();
      chunck.onloadend = e => {
        const offset = FileCabinet._getSize(chunck.result);
        const header = new FileReader();
        header.onloadend = ee => {
          const data = ss.safeCast(header.result, String);
          const xParser = new DOMParser();
          $this.extract(xParser.parseFromString(data, 'text/xml'), offset);
          $this._callMe();
        };
        header.readAsText($this._mainBlob.slice(0, offset));
      };
      chunck.readAsText(this._mainBlob.slice(0, 255));
    }
  }

  static _getSize(data) {
    const start = data.indexOf('0x');
    if (start === -1) {
      return 0;
    }
    return parseInt(data.substring(start, start + 10), 16);
  }

  extract(doc, offset) {
    try {
      const cab = Util.selectSingleNode(doc, 'FileCabinet');
      const files = Util.selectSingleNode(cab, 'Files');
      this.fileList.length = 0;
      const $enum1 = ss.enumerate(files.childNodes);
      while ($enum1.moveNext()) {
        const child = $enum1.current;
        if (child.nodeName === 'File') {
          const fe = new FileEntry(child.attributes.getNamedItem('Name').nodeValue, parseInt(child.attributes.getNamedItem('Size').nodeValue));
          fe.offset = offset;
          offset += fe.size;
          this.fileList.push(fe);
        }
      }
    } catch ($e2) {
    }
  }

  getFileBlob(filename) {
    const fe = this.getFileEntry(filename);
    if (fe != null) {
      const ext = filename.substr(filename.lastIndexOf('.')).toLowerCase();
      let type = null;
      switch (ext) {
        case '.png':
          type = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          type = 'image/jpeg';
          break;
        case '.mp3':
          type = 'audio/mpeg3';
          break;
        case '.txt':
          type = 'text/plain';
          break;
        case '.fit':
        case '.fits':
          type = 'application/octet-stream';
          break;
      }
      return this._mainBlob.slice(fe.offset, fe.offset + fe.size, type);
    }
    return null;
  }

  getFileEntry(filename) {
    const $enum1 = ss.enumerate(this.fileList);
    while ($enum1.moveNext()) {
      const entry = $enum1.current;
      if (entry.filename === filename) {
        return entry;
      }
    }
    return null;
  }

  get_masterFile() {
    if (this.fileList.length > 0) {
      return this.fileList[0].filename;
    } else {
      return null;
    }
  }

  clearTempFiles() {
    const $enum1 = ss.enumerate(this.fileList);
    while ($enum1.moveNext()) {
      const entry = $enum1.current;
    }
  }
};


class FileEntry {
  constructor(filename, size) {
    this.size = 0;
    this.offset = 0;
    this.filename = filename;
    this.size = size;
  }

  toString() {
    return this.filename;
  }
}