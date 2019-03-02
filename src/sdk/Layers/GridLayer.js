import {Layer} from './Layer';
import {Grids} from '../Grids';

export class GridLayer extends Layer{
  constructor(){
    super();
  }
  draw (renderContext, opacity, flat) {
    Grids.drawPlanetGrid(renderContext, opacity * this.get_opacity(), this.get_color());
    Grids.drawPlanetGridText(renderContext, opacity * this.get_opacity(), this.get_color());
    return true;
  }
}
Object.assign(GridLayer,Layer);