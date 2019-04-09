import ss from './scriptsharp/ss';
import {Vector2d} from './Double3d';
import {Color} from './Color';


const splitString = function(target, split) {
  const parts = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < target.length; i++) {
    let found = false;
    for (let j = 0; j < split.length; j++) {
      if (target[i] === split[j]) {
        parts.push(target.substring(start, end - start));
        found = true;
        continue;
      }
      start = i + 1;
      end = i + 1;
    }
    if (!found) {
      end++;
    }
  }
  if (end > start) {
    parts.push(target.substring(start, end - start));
  }
  return parts;
};
const stringContains = function(target, chars) {
  for (let i = 0; i < chars.length; i++) {
    if (target.indexOf(chars[i]) > -1) {
      return true;
    }
  }
  return false;
};
const getHashCode = function(target) {
  let hash = 0;
  if (!target.length) {
    return hash;
  }
  for (let i = 0; i < target.length; i++) {
    const c = target.charCodeAt(i);
    hash = ((hash << 5) - hash) + c;
  }
  return hash;
};
const compare = function(l, r) {
  if (l === r) {
    return 0;
  }
  if (l > r) {
    return 1;
  }
  return -1;
};
const logN = function(num, b) {
  return Math.log(num) / Math.log(b);
};
const getUrlParam = function(name) {
  return '';
};
const getProxiedUrl = function(url) {
  if (ss.startsWith(url.toLowerCase(), '//worldwidetelescope.org') || ss.startsWith(url.toLowerCase(), '//worldwidetelescope.org')) {
    if (url.toLowerCase().indexOf('worldwidetelescope.org/wwtweb/') < 12) {
      return url;
    }
    return url.split('worldwidetelescope.org')[1];
  }
  if (ss.startsWith(url.toLowerCase(), '//wwtstaging.azurewebsites.net') || ss.startsWith(url.toLowerCase(), '//wwtstaging.azurewebsites.net')) {
    if (url.toLowerCase().indexOf('wwtstaging.azurewebsites.net/wwtweb/') < 12) {
      return url;
    }
    return url.split('wwtstaging.azurewebsites.net')[1];
  }
  if (ss.startsWith(url.toLowerCase(), 'http')) {
    return '//worldwidetelescope.org/webserviceproxy.aspx?targeturl=' + encodeURIComponent(url);
  }
  return url;
};
const parseTimeSpan = function(timespan) {
  let val = 0;
  const parts = timespan.split(':');
  if (parts.length === 3) {
    val += parseInt(parts[0]) * 36000000;
    val += parseInt(parts[1]) * 600000;
    val += ss.truncate((parseFloat(parts[2]) * 1000));
  }
  return val;
};
const xmlDuration = function(duration) {
  const s = duration / 1000;
  const hours = Math.floor(s / 3600);
  const min = Math.floor(s / 60) - (hours * 60);
  const sec = s - ((hours * 3600) + min * 60);
  return ss.format('{0}:{1}:{2}', hours, min, sec);
};
const getTourComponent = function(url, name) {
  return '//worldwidetelescope.org/GetTourFile.aspx?targeturl=' + encodeURIComponent(url) + '&filename=' + name;
};
const xmlDate = function(d) {
  let hours = d.getHours();
  let amPm = 'AM';
  if (hours > 12) {
    hours -= 12;
    amPm = 'PM';
  }
  return (d.getMonth() + 1).toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString() + ' ' + hours.toString() + ':' + d.getMinutes().toString() + ':' + d.getSeconds().toString() + ' ' + amPm;
};
const selectSingleNode = function(parent, name) {
  let node = null;
  const $enum1 = ss.enumerate(parent.childNodes);
  while ($enum1.moveNext()) {
    const child = $enum1.current;
    if (child.nodeName === name) {
      node = child;
      break;
    }
  }
  return node;
};
const getInnerText = function(node) {
  if (ss.emptyString(node.text)) {
    const cn = node;
    return cn.textContent;
  }
  else {
    return node.text;
  }
};
const getWrappedText = function(ctx, text, width) {
  const lines = [];
  lines.push(text);
  return lines;
};
const toHex = function(number) {
  const num = Math.max(0, Math.min(ss.truncate(number), 255));
  return '0123456789ABCDEF'.substr((num - num % 16) / 16, 1) + '0123456789ABCDEF'.substr(num % 16, 1);
};
const fromHex = function(data) {
  let val = 0;
  switch (data.substr(1, 1).toUpperCase()) {
    case 'A':
      val += 10;
      break;
    case 'B':
      val += 11;
      break;
    case 'C':
      val += 12;
      break;
    case 'D':
      val += 13;
      break;
    case 'E':
      val += 14;
      break;
    case 'F':
      val += 15;
      break;
    default:
      val += parseInt(data.substr(1, 1));
      break;
  }
  switch (data.substr(0, 1).toUpperCase()) {
    case 'A':
      val += 10 * 16;
      break;
    case 'B':
      val += 11 * 16;
      break;
    case 'C':
      val += 12 * 16;
      break;
    case 'D':
      val += 13 * 16;
      break;
    case 'E':
      val += 14 * 16;
      break;
    case 'F':
      val += 15 * 16;
      break;
    default:
      val += parseInt(data.substr(0, 1)) * 16;
      break;
  }
  return val;
};
const _openUrl = function(p, p_2) {
};
const log10 = function(num) {
  return Math.log(num) / 2.30258509299405;
};
const sign = function(num) {
  if (num < 0) {
    return -1;
  }
  return 1;
};
export const Util = {
  splitString,
  stringContains,
  getHashCode,
  compare,
  logN,
  getUrlParam,
  getProxiedUrl,
  parseTimeSpan,
  xmlDuration,
  getTourComponent,
  xmlDate,
  selectSingleNode,
  getInnerText,
  getWrappedText,
  toHex,
  fromHex,
  _openUrl,
  log10,
  sign
};

// wwtlib.Guid

export class Guid{
  constructor() {
    this._guid = Guid.create();
  }
  static newGuid(){return new Guid();}
  static fromString(id){
    const temp = new Guid();
    temp._guid = ss.trim(id);
    return temp;
  }
  static create(){
    return  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  toString() {
    return this._guid;
  }
};


export function Mouse() {  }
Mouse.offsetX = (canvas, e) => {
  let x = 0;
  let element = canvas;
  const me = e;
  if (element.offsetParent != null) {
    do {
      x += element.offsetLeft;
    } while ((element = element.offsetParent) != null);
  }
  return me.pageX - x;
};
Mouse.offsetY = (canvas, e) => {
  let y = 0;
  let element = canvas;
  const me = e;
  if (element.offsetParent != null) {
    do {
      y += element.offsetTop;
    } while ((element = element.offsetParent) != null);
  }
  return me.pageY - y;
};

export function Cursor() {
}

Cursor.get_position = function () {
  return new Vector2d();
};
Cursor.get_current = function () {
  return document.body.style.cursor;
};
Cursor.set_current = function (value) {
  document.body.style.cursor = value;
  return value;
};


export function Cursors() {}

Cursors.get_arrow = () => 'default';
Cursors.get_cross = () => 'crosshair';
Cursors.get_defaultV = () => 'default';
Cursors.get_hand = () => 'grab';
Cursors.get_help = () => 'help';
Cursors.get_hSplit = () => 'row-resize';
Cursors.get_iBeam = () => 'text';
Cursors.get_no = () => 'not-allowed';
Cursors.get_sizeAll = () => 'help';
Cursors.get_sizeNESW = () => 'nwse-resize';
Cursors.get_sizeNS = () => 'ns-resize';
Cursors.get_sizeNWSE = () => 'nwse-resize';
Cursors.get_sizeWE = () => 'ew-resize';
Cursors.get_upArrow = () => 'help';
Cursors.get_vSplit = () => 'col-resize';
Cursors.get_waitCursor = () => 'wait';

export class Rectangle{
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }
  static create(x, y, width, height){
    const temp = new Rectangle();
    temp.x = x;
    temp.y = y;
    temp.width = width;
    temp.height = height;
    return temp;
  }

  get_left() {
    return this.x;
  }
  get_right() {
    return this.x + this.width;
  }
  get_top() {
    return this.y;
  }
  get_bottom() {
    return this.y + this.height;
  }
  contains(point) {
    return (this._between(point.x, this.x, this.x + this.width) && this._between(point.y, this.y, this.y + this.height));
  }
  _between (n, n1, n2) {
    if (n1 > n2) {
      return !(n > n1) && !(n < n2);
    } else {
      return !(n < n1) && !(n > n2);
    }
  }
  copy() {
    const temp = new Rectangle();
    temp.x = this.x;
    temp.y = this.y;
    temp.width = this.width;
    temp.height = this.height;
    return temp;
  }
};

export class SelectLink{
  constructor(id) {
    this._return = false;
    this._next = true;
    this._linkSlide = false;
    this._slide = null;
    this._ok = false;
    if (id != null) {
      this.set_id(id);
    } else {
      this.set_next(true);
    }
  }

  get_returnCaller() {
    return this._return;
  }
  set_returnCaller(value) {
    if (value) {
      this._slide = 'Return';
    }
    this._return = value;
    return value;
  }
  get_next() {
    return this._next;
  }
  set_next(value) {
    if (value) {
      this._slide = 'Next';
    }
    this._next = value;
    return value;
  }
  get_linkToSlide() {
    return this._linkSlide;
  }
  set_linkToSlide(value) {
    if (value) {
      this._slide = 'Next';
    }
    this._linkSlide = value;
    return value;
  }
  get_id() {
    return this._slide;
  }
  set_id(value) {
    this._return = false;
    this._next = false;
    this._linkSlide = true;
    this._slide = value;
    return value;
  }
  get_OK() {
    return this._ok;
  }
  set_OK(value) {
    this._ok = value;
    return value;
  }
};

export class PopupVolume{
  constructor() {
    this.volume = 0;
  }
  showDialog() {return 1;}
};

export class PopupColorPicker{
  constructor() {
    this.volume = 0;
    this.location = new Vector2d();
    this.color = new Color();
  }
  showDialog() {return 1;}
};

export class OverlayProperties{
  constructor() {
    this.volume = 0;
    this.location = new Vector2d();
    this.overlay = null;
  }
  showDialog() {return 1;}
}
