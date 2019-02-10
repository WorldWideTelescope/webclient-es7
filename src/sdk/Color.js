// wwtlib.Color

import {Util} from './Util';

export class Color {
  constructor() {
    this.a = 255;
    this.b = 255;
    this.g = 255;
    this.r = 255;
    this.name = '';
  }

  static fromArgb(a, r, g, b) {
    const temp = new Color();
    temp.a = a;
    temp.r = r;
    temp.g = g;
    temp.b = b;
    return temp;
  }

  static _fromArgbColor(a, col) {
    const temp = new Color();
    temp.a = a;
    temp.r = col.r;
    temp.g = col.g;
    temp.b = col.b;
    return temp;
  }

  static fromName(name) {
    const temp = Color.load(name);
    return temp;
  }

  static load(color) {
    let a = 255, r = 255, g = 255, b = 255;
    const pieces = color.split(':');
    if (pieces.length === 5) {
      a = parseInt(pieces[1]);
      r = parseInt(pieces[2]);
      g = parseInt(pieces[3]);
      b = parseInt(pieces[4]);
    } else if (pieces.length === 2) {
      return Color.fromName(pieces[1].toLowerCase());
    } else if (pieces.length === 1 && ss.startsWith(pieces[0], '#')) {
      return Color.fromHex(pieces[0]);
    } else if (pieces.length === 1 && pieces[0].length === 8) {
      return Color.fromSimpleHex(pieces[0]);
    } else if (pieces.length === 1) {
      return Color._fromWindowsNamedColor(pieces[0]);
    }
    return Color.fromArgb(a, r, g, b);
  }

  static _fromWindowsNamedColor(color) {
    return Color.fromArgb(...(colorDict[color.toLowerCase()] || colorDict.white));
  }

  static fromHex(data) {
    const r = Util.fromHex(data.substr(1, 2));
    const g = Util.fromHex(data.substr(3, 2));
    const b = Util.fromHex(data.substr(5, 2));
    const a = 255;
    return Color.fromArgb(a, r, g, b);
  }

  static fromSimpleHex(data) {
    const a = Util.fromHex(data.substr(0, 2));
    const r = Util.fromHex(data.substr(2, 2));
    const g = Util.fromHex(data.substr(4, 2));
    const b = Util.fromHex(data.substr(6, 2));
    return Color.fromArgb(a, r, g, b);
  }

  static fromInt(color) {
    const r = (color & 4278190080) >>> 24;
    const g = (color & 16711680) >>> 16;
    const b = (color & 65280) >>> 8;
    const a = (color & 255);
    return Color.fromArgb(a, r, g, b);
  };
  toFormat() {
    if (ss.emptyString(this.name)) {
      return ss.format('rgb({0},{1},{2})', this.r.toString(), this.g.toString(), this.b.toString());
    } else {
      return this.name;
    }
  }
  save() {
    if (!ss.emptyString(this.name)) {
      return ss.format('{0}:{1}', 0, this.name);
    } else {
      return ss.format('{0}:{1}:{2}:{3}:{4}', 1, this.a, this.r, this.g, this.b);
    }
  }
  toString() {
    if (ss.emptyString(this.name)) {
      return ss.format('#{0}{1}{2}', Util.toHex(this.r), Util.toHex(this.g), Util.toHex(this.b));
    } else {
      return this.name;
    }
  }
  _clone() {
    return Color.fromArgb(this.a, this.r, this.g, this.b);
  }
}


export function Colors() {
}

Colors.get_black = function () {
  return Color.fromArgb(255, 0, 0, 0);
};
Colors.get_blue = function () {
  return Color.fromArgb(255, 0, 0, 255);
};
Colors.get_brown = function () {
  return Color.fromArgb(255, 165, 42, 42);
};
Colors.get_cyan = function () {
  return Color.fromArgb(255, 0, 255, 255);
};
Colors.get_darkGray = function () {
  return Color.fromArgb(255, 169, 169, 169);
};
Colors.get_gray = function () {
  return Color.fromArgb(255, 128, 128, 128);
};
Colors.get_green = function () {
  return Color.fromArgb(255, 0, 255, 0);
};
Colors.get_lightGray = function () {
  return Color.fromArgb(255, 211, 211, 211);
};
Colors.get_magenta = function () {
  return Color.fromArgb(255, 255, 0, 255);
};
Colors.get_orange = function () {
  return Color.fromArgb(255, 255, 165, 0);
};
Colors.get_purple = function () {
  return Color.fromArgb(255, 128, 0, 128);
};
Colors.get_red = function () {
  return Color.fromArgb(255, 255, 0, 0);
};
Colors.get_transparent = function () {
  return Color.fromArgb(0, 255, 255, 255);
};
Colors.get_white = function () {
  return Color.fromArgb(255, 255, 255, 255);
};
Colors.get_yellow = function () {
  return Color.fromArgb(255, 255, 255, 0);
};


let colorDict =  {
  activeborder:[180, 180, 180],
  activecaption:[153, 180, 209],
  activecaptiontext:[0, 0, 0],
  appworkspace:[171, 171, 171],
  control:[240, 240, 240],
  controldark:[160, 160, 160],
  controldarkdark:[105, 105, 105],
  controllight:[227, 227, 227],
  controllightlight:[255, 255, 255],
  controltext:[0, 0, 0],
  desktop:[255, 255, 255],
  graytext:[109, 109, 109],
  highlight:[51, 153, 255],
  highlighttext:[255, 255, 255],
  hottrack:[0, 102, 204],
  inactiveborder:[244, 247, 252],
  inactivecaption:[191, 205, 219],
  inactivecaptiontext:[0, 0, 0],
  info:[255, 255, 225],
  infotext:[0, 0, 0],
  menu:[240, 240, 240],
  menutext:[0, 0, 0],
  scrollbar:[200, 200, 200],
  window:[255, 255, 255],
  windowframe:[100, 100, 100],
  windowtext:[0, 0, 0],
  transparent:[0, 255, 255, 255],
  aliceblue:[240, 248, 255],
  antiquewhite:[250, 235, 215],
  aqua:[0, 255, 255],
  aquamarine:[127, 255, 212],
  azure:[240, 255, 255],
  beige:[245, 245, 220],
  bisque:[255, 228, 196],
  black:[0, 0, 0],
  blanchedalmond:[255, 235, 205],
  blue:[0, 0, 255],
  blueviolet:[138, 43, 226],
  brown:[165, 42, 42],
  burlywood:[222, 184, 135],
  cadetblue:[95, 158, 160],
  chartreuse:[127, 255, 0],
  chocolate:[210, 105, 30],
  coral:[255, 127, 80],
  cornflowerblue:[100, 149, 237],
  cornsilk:[255, 248, 220],
  crimson:[220, 20, 60],
  cyan:[0, 255, 255],
  darkblue:[0, 0, 139],
  darkcyan:[0, 139, 139],
  darkgoldenrod:[184, 134, 11],
  darkgray:[169, 169, 169],
  darkgreen:[0, 100, 0],
  darkkhaki:[189, 183, 107],
  darkmagenta:[139, 0, 139],
  darkolivegreen:[85, 107, 47],
  darkorange:[255, 140, 0],
  darkorchid:[153, 50, 204],
  darkred:[139, 0, 0],
  darksalmon:[233, 150, 122],
  darkseagreen:[143, 188, 139],
  darkslateblue:[72, 61, 139],
  darkslategray:[47, 79, 79],
  darkturquoise:[0, 206, 209],
  darkviolet:[148, 0, 211],
  deeppink:[255, 20, 147],
  deepskyblue:[0, 191, 255],
  dimgray:[105, 105, 105],
  dodgerblue:[30, 144, 255],
  firebrick:[178, 34, 34],
  floralwhite:[255, 250, 240],
  forestgreen:[34, 139, 34],
  fuchsia:[255, 0, 255],
  gainsboro:[220, 220, 220],
  ghostwhite:[248, 248, 255],
  gold:[255, 215, 0],
  goldenrod:[218, 165, 32],
  gray:[128, 128, 128],
  green:[0, 128, 0],
  greenyellow:[173, 255, 47],
  honeydew:[240, 255, 240],
  hotpink:[255, 105, 180],
  indianred:[205, 92, 92],
  indigo:[75, 0, 130],
  ivory:[255, 255, 240],
  khaki:[240, 230, 140],
  lavender:[230, 230, 250],
  lavenderblush:[255, 240, 245],
  lawngreen:[124, 252, 0],
  lemonchiffon:[255, 250, 205],
  lightblue:[173, 216, 230],
  lightcoral:[240, 128, 128],
  lightcyan:[224, 255, 255],
  lightgoldenrodyellow:[250, 250, 210],
  lightgray:[211, 211, 211],
  lightgreen:[144, 238, 144],
  lightpink:[255, 182, 193],
  lightsalmon:[255, 160, 122],
  lightseagreen:[32, 178, 170],
  lightskyblue:[135, 206, 250],
  lightslategray:[119, 136, 153],
  lightsteelblue:[176, 196, 222],
  lightyellow:[255, 255, 224],
  lime:[0, 255, 0],
  limegreen:[50, 205, 50],
  linen:[250, 240, 230],
  magenta:[255, 0, 255],
  maroon:[128, 0, 0],
  mediumaquamarine:[102, 205, 170],
  mediumblue:[0, 0, 205],
  mediumorchid:[186, 85, 211],
  mediumpurple:[147, 112, 219],
  mediumseagreen:[60, 179, 113],
  mediumslateblue:[123, 104, 238],
  mediumspringgreen:[0, 250, 154],
  mediumturquoise:[72, 209, 204],
  mediumvioletred:[199, 21, 133],
  midnightblue:[25, 25, 112],
  mintcream:[245, 255, 250],
  mistyrose:[255, 228, 225],
  moccasin:[255, 228, 181],
  navajowhite:[255, 222, 173],
  navy:[0, 0, 128],
  oldlace:[253, 245, 230],
  olive:[128, 128, 0],
  olivedrab:[107, 142, 35],
  orange:[255, 165, 0],
  orangered:[255, 69, 0],
  orchid:[218, 112, 214],
  palegoldenrod:[238, 232, 170],
  palegreen:[152, 251, 152],
  paleturquoise:[175, 238, 238],
  palevioletred:[219, 112, 147],
  papayawhip:[255, 239, 213],
  peachpuff:[255, 218, 185],
  peru:[205, 133, 63],
  pink:[255, 192, 203],
  plum:[221, 160, 221],
  powderblue:[176, 224, 230],
  purple:[128, 0, 128],
  red:[255, 0, 0],
  rosybrown:[188, 143, 143],
  royalblue:[65, 105, 225],
  saddlebrown:[139, 69, 19],
  salmon:[250, 128, 114],
  sandybrown:[244, 164, 96],
  seagreen:[46, 139, 87],
  seashell:[255, 245, 238],
  sienna:[160, 82, 45],
  silver:[192, 192, 192],
  skyblue:[135, 206, 235],
  slateblue:[106, 90, 205],
  slategray:[112, 128, 144],
  snow:[255, 250, 250],
  springgreen:[0, 255, 127],
  steelblue:[70, 130, 180],
  tan:[210, 180, 140],
  teal:[0, 128, 128],
  thistle:[216, 191, 216],
  tomato:[255, 99, 71],
  turquoise:[64, 224, 208],
  violet:[238, 130, 238],
  wheat:[245, 222, 179],
  white:[255, 255, 255],
  whitesmoke:[245, 245, 245],
  yellow:[255, 255, 0],
  yellowgreen:[154, 205, 50],
  buttonface:[240, 240, 240],
  buttonhighlight:[255, 255, 255],
  buttonshadow:[160, 160, 160],
  gradientactivecaption:[185, 209, 234],
  gradientinactivecaption:[215, 228, 242],
  menubar:[240, 240, 240],
  menuhighlight:[51, 153, 255]
};
Object.keys(colorDict).forEach(c=>{
  if(colorDict[c].length === 3){
    colorDict[c].splice(0,0,255);
  }
});
