
export class XmlTextWriter{
  constructor() {
    this.body = '<?xml version=\'1.0\' encoding=\'UTF-8\'?>\r\n';
    this.formatting = 1;
    this._elementStack = new ss.Stack();
    this._pending = false;
    this._currentName = '';
    this._attributes = {};
    this._value = '';
  }
  _pushNewElement(name) {
    this._writePending(false);
    this._elementStack.push(name);
    this._pending = true;
    this._currentName = name;
  }
  _writePending(fullClose) {
    let closed = true;
    if (this._pending) {
      for (let i = 1; i < this._elementStack.count; i++) {
        this.body += '  ';
      }
      this.body += '<' + this._currentName;
      if (ss.keyCount(this._attributes) > 0) {
        const $enum1 = ss.enumerate(ss.keys(this._attributes));
        while ($enum1.moveNext()) {
          const key = $enum1.current;
          this.body += ss.format(' {0}="{1}"', key, this._attributes[key]);
        }
      }
      if (!ss.emptyString(this._value)) {
        this.body += '>';
        closed = false;
        if (!ss.emptyString(this._value)) {
          this.body += this._value;
        }
      } else {
        if (fullClose) {
          this.body += ' />\r\n';
          closed = true;
        } else {
          this.body += '>\r\n';
        }
      }
      this._pending = false;
      this._currentName = '';
      this._value = '';
      this._attributes = {};
      return closed;
    }
    return false;
  }
  _writeProcessingInstruction(v1, v2)  {}
  _writeStartElement(name) {
    this._pushNewElement(name);
  }
  _writeAttributeString(key, value) {
    if (value != null) {
      this._attributes[key] = ss.replaceString(value.toString(), '&', '&amp;');
    } else {
      this._attributes[key] = '';
    }
  }
  _writeEndElement() {
    if (!this._writePending(true)) {
      for (let i = 1; i < this._elementStack.count; i++) {
        this.body += '  ';
      }
      this.body += ss.format('</{0}>\r\n', this._elementStack.pop());
    } else {
      this._elementStack.pop();
    }
  }
  _writeString(text) {
    this._value = ss.replaceString(text, '&', '&amp;');
  }
  _writeFullEndElement() {
    this._writePending(false);
    for (let i = 1; i < this._elementStack.count; i++) {
      this.body += '  ';
    }
    this.body += ss.format('</{0}>\r\n', this._elementStack.pop());
  }
  _close(){
  }
  _writeElementString(name, value) {
    this._writeStartElement(name);
    this._writeValue(ss.replaceString(value, '&', '&amp;'));
    this._writeEndElement();
  }
  _writeValue(val) {
    this._value = ss.replaceString(val, '&', '&amp;');
  }
  _writeCData(htmlDescription) {
    this._value = ss.format('<![CDATA[{0}]]>', htmlDescription);
  }
};