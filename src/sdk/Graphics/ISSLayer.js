// wwtlib.ISSLayer

import {Colors} from '../Color';
import {Matrix3d, Vector3d} from '../Double3d';
import ss from '../scriptsharp/ss';
import {Object3d, Object3dLayer} from '../Layers/Object3d';
import {Layer} from '../Layers/Layer';
import {TourDocument} from '../Tours/TourDocument';

export class ISSLayer extends Object3dLayer{
  constructor(){
    super();
    this.id = ISSLayer.issGuid;
  }

  static loadBackground () {
    if (ISSLayer._loading$2) {
      return;
    }
    ISSLayer._loading$2 = true;
    const url = 'http://www.worldwidetelescope.org/data/iss.wtt';
    ISSLayer._doc$2 = TourDocument.fromUrlRaw(url, function() {
      //console.log(arguments, this);
      ISSLayer.createSpaceStation();
    });
  }
  static createSpaceStation () {
    ISSLayer._doc$2.set_id('28016047-97a9-4b33-a226-cd820262a151');
    const filename = '0c10ae54-b6da-4282-bfda-f34562d403bc.3ds';
    const o3d = new Object3d(ISSLayer._doc$2, filename, true, false, true, Colors.get_white());
    if (o3d != null) {
      o3d.issLayer = true;
      ISSLayer._issmodel$2 = o3d;
    }
  }
  draw(renderContext, opacity, flat) {
    if (this.object3d == null && ISSLayer._issmodel$2 == null) {
      if (!ISSLayer._loading$2) {
        const worldView = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
        const v = worldView.transform(Vector3d.get_empty());
        const scaleFactor = Math.sqrt(worldView.get_m11() * worldView.get_m11() + worldView.get_m22() * worldView.get_m22() + worldView.get_m33() * worldView.get_m33());
        const dist = v.length();
        const radius = scaleFactor;
        const viewportHeight = ss.truncate(renderContext.height);
        const p11 = renderContext.get_projection().get_m11();
        const p34 = renderContext.get_projection().get_m34();
        const p44 = renderContext.get_projection().get_m44();
        const w = Math.abs(p34) * dist + p44;
        const pixelsPerUnit = (p11 / w) * viewportHeight;
        const radiusInPixels = (radius * pixelsPerUnit);
        if (radiusInPixels > 0.5) {
          ISSLayer.loadBackground();
        }
      }
    }
    this.object3d = ISSLayer._issmodel$2;
    return Layer.draw.call(this, renderContext, opacity, flat);
  }
  getPrimaryUI() {return null; }
  addFilesToCabinet(fc) {}
  loadData(doc, filename) {}
  cleanUp() {
  }
};