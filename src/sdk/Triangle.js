import {PositionTexture, Vector2d, Vector3d} from './Double3d';

export function Triangle() {
  this.a = -1;
  this.b = -1;
  this.c = -1;
}
Triangle.create = function(a, b, c) {
  const temp = new Triangle();
  temp.a = a;
  temp.b = b;
  temp.c = c;
  return temp;
};
export const Triangle$ = {
  subDivide: function (triList, vertexList) {
    const a1 = Vector3d.lerp(vertexList[this.b].position, vertexList[this.c].position, 0.5);
    const b1 = Vector3d.lerp(vertexList[this.c].position, vertexList[this.a].position, 0.5);
    const c1 = Vector3d.lerp(vertexList[this.a].position, vertexList[this.b].position, 0.5);
    const a1uv = Vector2d.lerp(Vector2d.create(vertexList[this.b].tu, vertexList[this.b].tv), Vector2d.create(vertexList[this.c].tu, vertexList[this.c].tv), 0.5);
    const b1uv = Vector2d.lerp(Vector2d.create(vertexList[this.c].tu, vertexList[this.c].tv), Vector2d.create(vertexList[this.a].tu, vertexList[this.a].tv), 0.5);
    const c1uv = Vector2d.lerp(Vector2d.create(vertexList[this.a].tu, vertexList[this.a].tv), Vector2d.create(vertexList[this.b].tu, vertexList[this.b].tv), 0.5);
    a1.normalize();
    b1.normalize();
    c1.normalize();
    const aIndex = vertexList.length;
    const bIndex = vertexList.length + 1;
    const cIndex = vertexList.length + 2;
    vertexList.push(PositionTexture.createPosRaw(a1, a1uv.x, a1uv.y));
    vertexList.push(PositionTexture.createPosRaw(b1, b1uv.x, b1uv.y));
    vertexList.push(PositionTexture.createPosRaw(c1, c1uv.x, c1uv.y));
    triList.push(Triangle.create(this.a, cIndex, bIndex));
    triList.push(Triangle.create(this.b, aIndex, cIndex));
    triList.push(Triangle.create(this.c, bIndex, aIndex));
    triList.push(Triangle.create(aIndex, bIndex, cIndex));
  },
  subDivideNoNormalize: function (triList, vertexList) {
    const a1 = Vector3d.lerp(vertexList[this.b].position, vertexList[this.c].position, 0.5);
    const b1 = Vector3d.lerp(vertexList[this.c].position, vertexList[this.a].position, 0.5);
    const c1 = Vector3d.lerp(vertexList[this.a].position, vertexList[this.b].position, 0.5);
    const a1uv = Vector2d.lerp(Vector2d.create(vertexList[this.b].tu, vertexList[this.b].tv), Vector2d.create(vertexList[this.c].tu, vertexList[this.c].tv), 0.5);
    const b1uv = Vector2d.lerp(Vector2d.create(vertexList[this.c].tu, vertexList[this.c].tv), Vector2d.create(vertexList[this.a].tu, vertexList[this.a].tv), 0.5);
    const c1uv = Vector2d.lerp(Vector2d.create(vertexList[this.a].tu, vertexList[this.a].tv), Vector2d.create(vertexList[this.b].tu, vertexList[this.b].tv), 0.5);
    const aIndex = vertexList.length;
    const bIndex = vertexList.length + 1;
    const cIndex = vertexList.length + 2;
    vertexList.push(PositionTexture.createPosRaw(a1, a1uv.x, a1uv.y));
    vertexList.push(PositionTexture.createPosRaw(b1, b1uv.x, b1uv.y));
    vertexList.push(PositionTexture.createPosRaw(c1, c1uv.x, c1uv.y));
    triList.push(Triangle.create(this.a, cIndex, bIndex));
    triList.push(Triangle.create(this.b, aIndex, cIndex));
    triList.push(Triangle.create(this.c, bIndex, aIndex));
    triList.push(Triangle.create(aIndex, bIndex, cIndex));
  }
};
