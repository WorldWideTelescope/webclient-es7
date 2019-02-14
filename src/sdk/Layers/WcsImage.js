
export class WcsImage  {
  constructor() {
    this.copyright = '';
    this.creditsUrl = '';
    this._validWcs = false;
    this.keywords = [];
    this.description = '';
    this.scaleX = 0;
    this.scaleY = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.rotation = 0;
    this.referenceX = 0;
    this.referenceY = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    this.cd1_1 = 0;
    this.cd1_2 = 0;
    this.cd2_1 = 0;
    this.cd2_2 = 0;
    this.hasRotation = false;
    this.hasSize = false;
    this.hasScale = false;
    this.hasLocation = false;
    this.hasPixel = false;
    this.filename = '';
    this._colorCombine = false;
  }
  get_copyright() {
    return this.copyright;
  }
  set_copyright(value) {
    this.copyright = value;
    return value;
  }
  get_creditsUrl() {
    return this.creditsUrl;
  }
  set_creditsUrl(value) {
    this.creditsUrl = value;
    return value;
  }
  get_validWcs() {
    return this._validWcs;
  }
  set_validWcs(value) {
    this._validWcs = value;
    return value;
  }
  get_keywords() {
    if (!this.keywords.length) {
      this.keywords.push('Image File');
    }
    return this.keywords;
  }
  set_keywords(value) {
    this.keywords = value;
    return value;
  }
  get_description() {
    return this.description;
  }
  set_description(value) {
    this.description = value;
    return value;
  }
  get_scaleX() {
    return this.scaleX;
  }
  set_scaleX(value) {
    this.scaleX = value;
    return value;
  }
  get_scaleY() {
    return this.scaleY;
  }
  set_scaleY(value) {
    this.scaleY = value;
    return value;
  }
  get_centerX() {
    return this.centerX;
  }
  set_centerX(value) {
    this.centerX = value;
    return value;
  }
  get_centerY() {
    return this.centerY;
  }
  set_centerY(value) {
    this.centerY = value;
    return value;
  }
  get_rotation() {
    return this.rotation;
  }
  set_rotation(value) {
    this.rotation = value;
    return value;
  }
  get_referenceX() {
    return this.referenceX;
  }
  set_referenceX(value) {
    this.referenceX = value;
    return value;
  }
  get_referenceY() {
    return this.referenceY;
  }
  set_referenceY(value) {
    this.referenceY = value;
    return value;
  }
  get_sizeX() {
    return this.sizeX;
  }
  set_sizeX(value) {
    this.sizeX = value;
    return value;
  }
  get_sizeY() {
    return this.sizeY;
  }
  set_sizeY(value) {
    this.sizeY = value;
    return value;
  }
  get_cd1_1() {
    return this.cd1_1;
  }
  set_cd1_1(value) {
    this.cd1_1 = value;
    return value;
  }
  get_cd1_2() {
    return this.cd1_2;
  }
  set_cd1_2(value) {
    this.cd1_2 = value;
    return value;
  }
  get_cd2_1() {
    return this.cd2_1;
  }
  set_cd2_1(value) {
    this.cd2_1 = value;
    return value;
  }
  get_cd2_2() {
    return this.cd2_2;
  }
  set_cd2_2(value) {
    this.cd2_2 = value;
    return value;
  }
  adjustScale(width, height) {
    if (width !== this.sizeX) {
      this.scaleX *= (this.sizeX / width);
      this.referenceX /= (this.sizeX / width);
      this.sizeX = width;
    }
    if (height !== this.sizeY) {
      this.scaleY *= (this.sizeY / height);
      this.referenceY /= (this.sizeY / height);
      this.sizeY = height;
    }
  }
  calculateScaleFromCD() {
    this.scaleX = (Math.sqrt(this.cd1_1 * this.cd1_1 + this.cd2_1 * this.cd2_1) * (this.cd1_1 * this.cd2_2 - this.cd1_2 * this.cd2_1) < 0) ? -1 : 1;
    this.scaleY = Math.sqrt(this.cd1_2 * this.cd1_2 + this.cd2_2 * this.cd2_2);
  }
  calculateRotationFromCD() {
    const sign = ((this.cd1_1 * this.cd2_2 - this.cd1_2 * this.cd2_1) < 0) ? -1 : 1;
    const rot2 = Math.atan2((-sign * this.cd1_2), this.cd2_2);
    this.rotation = rot2 / Math.PI * 180;
  }
  get_filename() {
    return this.filename;
  }
  set_filename(value) {
    this.filename = value;
    return value;
  }
  get_colorCombine() {
    return this._colorCombine;
  }
  set_colorCombine(value) {
    this._colorCombine = value;
    return value;
  }
};