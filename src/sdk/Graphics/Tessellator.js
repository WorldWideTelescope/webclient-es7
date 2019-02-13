import {Vector3d} from '../Double3d';

export class Tessellator {
  static tesselateSimplePoly( inputList ) {
    const results = [];
    const tess = new Tessellator();
    tess.process(inputList, results);
    return results;
  }
  _isLeftOfHalfSpace(pntA, pntB, pntTest) {
    pntA.normalize();
    pntB.normalize();
    const cross = Vector3d.cross(pntA, pntB);
    const dot = Vector3d.dot(cross, pntTest);
    return dot > 0;
  }
  _insideTriangle(pntA, pntB, pntC, pntTest) {
    if (!this._isLeftOfHalfSpace(pntA, pntB, pntTest)) {
      return false;
    }
    if (!this._isLeftOfHalfSpace(pntB, pntC, pntTest)) {
      return false;
    }
    if (!this._isLeftOfHalfSpace(pntC, pntA, pntTest)) {
      return false;
    }
    return true;
  }
  _canClipEar(poly, u, v, w, n, verts) {
    let p;
    const a = poly[verts[u]].copy();
    const b = poly[verts[v]].copy();
    const c = poly[verts[w]].copy();
    let P;
    const d = Vector3d.subtractVectors(b, a);
    d.normalize();
    const e = Vector3d.subtractVectors(b, c);
    e.normalize();
    const g = Vector3d.cross(d, e);
    const bn = b.copy();
    bn.normalize();
    if (Vector3d.dot(g, bn) > 0) {
      return false;
    }
    for (p = 0; p < n; p++) {
      if ((p === u) || (p === v) || (p === w)) {
        continue;
      }
      P = poly[verts[p]].copy();
      if (this._insideTriangle(a, b, c, P)) {
        return false;
      }
    }
    return true;
  }
  process(poly, result) {
    const n = poly.length;
    if (poly.length < 3) {
      return false;
    }
    const verts = new Array(poly.length);
    for (let i = 0; i < n; i++) {
      verts[i] = i;
    }
    let nv = n;
    let count = 2 * nv;
    let m = 0, v = nv - 1;
    for (; nv > 2;) {
      if (0 >= (count--)) {
        return false;
      }
      let u = v;
      if (nv <= u) {
        u = 0;
      }
      v = u + 1;
      if (nv <= v) {
        v = 0;
      }
      let w = v + 1;
      if (nv <= w) {
        w = 0;
      }
      if (this._canClipEar(poly, u, v, w, nv, verts)) {
        let s, t;
        result.push(verts[u]);
        result.push(verts[v]);
        result.push(verts[w]);
        m++;
        for (s = v, t = v + 1; t < nv; s++, t++) {
          verts[s] = verts[t];
        }
        nv--;
        count = 2 * nv;
      }
    }
    return true;
  }
}
