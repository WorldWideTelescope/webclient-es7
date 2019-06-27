export class BinaryReader{
  constructor(arraybuf) {
    this.position = 0;
    //this._data = null;
    this._data = arraybuf;
  }
  get_position() {
    return this.position;
  }
  seek(pos) {
    this.position = pos;
  }
  seekRelative(pos) {
    this.position += pos;
  }
  get_length() {
    return this._data.length;
  }
  readByte() {
    let result;
    result = this._data[this.position];
    this.position += 1;
    return result;
  }
  readSByte() {
    let result;
    result = this._data[this.position];
    this.position += 1;
    return result;
  }
  readBytes(count) {
    const buf = new Array(count);
    for (let i = 0; i < count; i++) {
      buf[i] = this._data[this.position + i];
    }
    this.position += count;
    return buf;
  }
  readByteString(count) {
    let data = '';
    for (let i = 0; i < count; i++) {
      data += String.fromCharCode(this._data[this.position + i]);
    }
    this.position += count;
    return data;
  }
  readSingle() {
    const tmp = new Uint8Array(4);
    tmp[0] = this._data[this.position];
    tmp[1] = this._data[this.position + 1];
    tmp[2] = this._data[this.position + 2];
    tmp[3] = this._data[this.position + 3];
    const result = new Float32Array(tmp.buffer, 0, 1)[0];
    this.position += 4;
    return result;
  }
  readUInt32() {
    const result = (this._data[this.position] + (this._data[this.position + 1] << 8) + (this._data[this.position + 2] << 16) + (this._data[this.position + 3] << 24));
    this.position += 4;
    return result;
  }
  readUInt16() {
    const result = (this._data[this.position] + (this._data[this.position + 1] << 8));
    this.position += 2;
    return result;
  }
  readInt32() {
    const result = this.readUInt32();
    if (!!(result & 2147483648)) {
      return (-((result - 1) ^ 4294967295));
    }
    return result;
  }
  readInt64() {
    this.position += 8;
    return BinaryReader.id++;
  }
  close(){}
};
