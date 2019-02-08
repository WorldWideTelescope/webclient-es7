import {CT} from './AACoordinateTransformation';
import ss from '../scriptsharp/ss';

export const CAAKepler = {
  calculate: (M, e) => CAAKepler.calculateIter(M, e, 53),
  calculateIter: (M, e, nIterations) => {
    M = CT.d2R(M);
    const PI = CT.PI();
    let F = 1;
    if (M < 0) {
      F = -1;
    }
    M = Math.abs(M) / (2 * PI);
    M = (M - ss.truncate(M)) * 2 * PI * F;
    if (M < 0) {
      M += 2 * PI;
    }
    F = 1;
    if (M > PI) {
      F = -1;
    }
    if (M > PI) {
      M = 2 * PI - M;
    }
    let E = PI / 2;
    let scale = PI / 4;
    for (let i = 0; i < nIterations; i++) {
      const R = E - e * Math.sin(E);
      if (M > R) {
        E += scale;
      } else {
        E -= scale;
      }
      scale /= 2;
    }
    return CT.r2D(E) * F;
  }
};
