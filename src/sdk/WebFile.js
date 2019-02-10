
// wwtlib.WebFile

import ss from './scriptsharp/ss';
import {Util} from './Util';

export function WebFile(url) {
  this._state = 0;
  this.responseType = '';
  this._triedOnce = false;
  this._url = url;
}

export const WebFile$ = {
  send: function () {
    const version = navigator.appVersion;
    if (version.indexOf('MSIE 8') > -1 || version.indexOf('MSIE 9') > -1) {
      this._ieCrossDomain();
    } else {
      this._CORS();
    }
    this.set_state(0);
  },
  get_message: function () {
    return this._message;
  },
  get_state: function () {
    return this._state;
  },
  set_state: function (value) {
    this._state = value;
    if (this.onStateChange != null) {
      this.onStateChange();
    }
    return value;
  },
  _loadData: function (textReceived) {
    this._data = textReceived;
    this.set_state(1);
  },
  _loadBlob: function (blob) {
    this._blobdata = blob;
    this.set_state(1);
  },
  _error: function () {
    this._message = ss.format('Error encountered loading {0}', this._url);
    this.set_state(2);
  },
  _timeOut: function () {
    this._message = ss.format('Timeout encountered loading {0}', this._url);
    this.set_state(2);
  },
  _ieCrossDomain: function () {
    const $this = this;

    this._xdr = new XDomainRequest();
    this._xdr.onload = function () {
      $this._loadData($this._xdr.responseText);
    };
    this._xdr.onTimeout = ss.bind('_error', this);
    this._xdr.onError = ss.bind('_timeOut', this);
    this._xdr.open('get', this._url);
    this._xdr.send();
  },
  _CORS: function () {
    const $this = this;

    this._xhr = new XMLHttpRequest();
    try {
      this._xhr.open('GET', this._url);
      if (this.responseType != null) {
        this._xhr.responseType = this.responseType;
      }
      this._xhr.onreadystatechange = function () {
        if ($this._xhr.readyState === 4) {
          if (!$this._xhr.status) {
            if (!$this._triedOnce) {
              $this._triedOnce = true;
              $this._xhr.onreadystatechange = null;
              $this._url = Util.getProxiedUrl($this._url);
              $this._CORS();
            }
          } else {
            if (!$this.responseType) {
              $this._loadData($this._xhr.responseText);
            } else {
              $this._loadBlob($this._xhr.response);
            }
          }
        }
      };
      this._xhr.send();
    } catch (err) {
      this._message = err.message;
      this.set_state(2);
      throw err;
    }
  },
  getText: function () {
    return this._data;
  },
  getBlob: function () {
    return this._blobdata;
  },
  getXml: function () {
    const xParser = new DOMParser();
    return xParser.parseFromString(this._data, 'text/xml');
  }
};

