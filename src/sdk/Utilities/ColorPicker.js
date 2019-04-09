import {Color, Colors} from '../Color';
import {WWTControl} from '../WWTControl';

export class ColorPicker{
  constructor() {
    this.callBack = null;
    this.color = Colors.get_white();
  }
  nonMenuClick(){}
  show(e) {
    WWTControl.scriptInterface.showColorPicker(this, e);
  }
  getColorFromClick(e) {
    const image = document.getElementById('colorhex');
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const pixels = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    this.color = Color.fromArgb(pixels[3], pixels[0], pixels[1], pixels[2]);
    return this.color;
  }
  pickColor(e) {
    this.callBack(this.color);
  }
};