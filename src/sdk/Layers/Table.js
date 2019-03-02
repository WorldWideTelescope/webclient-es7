import {Guid} from '../Util';
import ss from '../scriptsharp/ss';
import {UiTools} from '../UITools';

export class Table {
  constructor() {
    this.guid = new Guid();
    this.header = [];
    this.rows = [];
    this.delimiter = '\t';
    this.locked = false;
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

  save() {
    let data = '';
    let first = true;
    const $enum1 = ss.enumerate(this.header);
    while ($enum1.moveNext()) {
      let col = $enum1.current;
      if (!first) {
        data += '\t';
      } else {
        first = false;
      }
      data += col;
    }
    data += '\r\n';
    const $enum2 = ss.enumerate(this.rows);
    while ($enum2.moveNext()) {
      const row = $enum2.current;
      first = true;
      const $enum3 = ss.enumerate(row);
      while ($enum3.moveNext()) {
        let col = $enum3.current;
        if (!first) {
          data += '\t';
        } else {
          first = false;
        }
        data += col;
      }
      data += '\r\n';
    }
    return data;
  }

  loadFromString(data, isUpdate, purge, hasHeader) {
    let count = 0;
    const lines = data.split('\r\n');
    if (!isUpdate || hasHeader) {
      if (lines.length > 0) {
        const headerLine = lines[0];
        count++;
        if (headerLine.indexOf('\t') === -1 && headerLine.indexOf(',') > -1) {
          this.delimiter = ',';
        }
        if (!isUpdate) {
          this.rows.length = 0;
        }
        this.header = UiTools.splitString(headerLine, this.delimiter);
      } else {
        this.header = [];
      }
    }
    let temp = [];
    if (!purge) {
      temp = this.rows;
    }
    while (count < lines.length) {
      const line = lines[count];
      const rowData = UiTools.splitString(line, this.delimiter);
      if (rowData.length < 1) {
        break;
      }
      temp.push(rowData);
      count++;
    }
    if (purge) {
      this.rows = temp;
    }
  }
}