
// wwtlib.Object3d

import {Color, Colors} from '../Color';
import ss from '../scriptsharp/ss';
import {Matrix3d, PositionNormalTextured, PositionNormalTexturedTangent, Vector2d, Vector3d} from '../Double3d';
import {Settings} from '../settings';
import {Layer} from './Layer';
import {IUiController} from '../interface';
import {Planets} from '../Planets';
import {WWTControl} from '../WWTControl';

export function Object3d(tourDoc, filename, flipV, flipHandedness, smooth, color) {
  this.flipHandedness = false;
  this.flipV = true;
  this.smooth = true;
  this._mesh = null;
  this._meshMaterials = [];
  this._meshTextures = [];
  this._meshSpecularTextures = [];
  this._meshNormalMaps = [];
  this.meshFilenames = [];
  this.color = Colors.get_white();
  this._textureCache = {};
  this._matFiles = new Array(0);
  this._matFileIndex = 0;
  this.objects = [];
  this._matLib = {};
  this._textureLib = {};
  this._tourDocument = null;
  this.issLayer = false;
  this._readyToRender = false;
  this.useCurrentAmbient = false;
  this._dirty = true;
  this.color = color;
  this.smooth = smooth;
  this.flipV = flipV;
  this.flipHandedness = flipHandedness;
  this.filename = filename;
  if (ss.endsWith(this.filename.toLowerCase(), '.obj')) {
    this._loadMeshFromObj(tourDoc, this.filename);
  }
  else {
    this._loadMeshFrom3ds(tourDoc, this.filename, 1);
  }
}
Object3d._compareVector3 = function(v0, v1) {
  if (v0.x < v1.x) {
    return -1;
  }
  else if (v0.x > v1.x) {
    return 1;
  }
  else if (v0.y < v1.y) {
    return -1;
  }
  else if (v0.y > v1.y) {
    return 1;
  }
  else if (v0.z < v1.z) {
    return -1;
  }
  else if (v0.z > v1.z) {
    return 1;
  }
  else {
    return 0;
  }
};
Object3d._compareVector = function(v0, v1) {
  if (v0.x < v1.x) {
    return -1;
  }
  else if (v0.x > v1.x) {
    return 1;
  }
  else if (v0.y < v1.y) {
    return -1;
  }
  else if (v0.y > v1.y) {
    return 1;
  }
  else {
    return 0;
  }
};
Object3d._getMaterialID = function(material, materialNames) {
  let index = 0;
  const $enum1 = ss.enumerate(materialNames);
  while ($enum1.moveNext()) {
    const mat = $enum1.current;
    if (mat === material) {
      return index;
    }
    index++;
  }
  return -1;
};
Object3d._disposeTextureList = function(textures) {
  if (textures != null) {
    for (let i = 0; i < textures.length; ++i) {
      if (textures[i] != null) {
        textures[i].dispose();
        textures[i] = null;
      }
    }
    textures.length = 0;
  }
};
export const Object3d$ = {
  _reload: function () {
    if (!this.issLayer) {
      this.dispose();
      if (ss.endsWith(this.filename.toLowerCase(), '.obj')) {
        this._loadMeshFromObj(this._tourDocument, this.filename);
      } else {
        this._loadMeshFrom3ds(this._tourDocument, this.filename, 1);
      }
    }
  },
  _calculateVertexNormalsMerged: function (vertexList, indexList, creaseAngleRad) {
    if (!vertexList.length) {
      return null;
    }
    const vertexCount = vertexList.length;
    const triangleCount = Math.floor(indexList.length / 3);
    const vertexPositions = [];
    for (let vertexIndex = 0; vertexIndex < vertexList.length; ++vertexIndex) {
      const vp = new VertexPosition();
      vp.position = vertexList[vertexIndex].get_position();
      vp.index = vertexIndex;
      vertexPositions.push(vp);
    }
    vertexPositions.sort(function (v0, v1) {
      return Object3d._compareVector3(v0.position, v1.position);
    });
    const vertexMap = new Array(vertexPositions.length);
    let uniqueVertexCount = 0;
    for (let vertexIndex = 0; vertexIndex < vertexPositions.length; vertexIndex++) {
      if (!vertexIndex || !!Object3d._compareVector3(vertexPositions[vertexIndex].position, vertexPositions[vertexIndex - 1].position)) {
        ++uniqueVertexCount;
      }
      vertexMap[vertexPositions[vertexIndex].index] = uniqueVertexCount - 1;
    }
    const vertexInstanceCounts = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; i++) {
      vertexInstanceCounts[i] = 0;
    }
    const $enum1 = ss.enumerate(indexList);
    while ($enum1.moveNext()) {
      let vertexIndex = $enum1.current;
      let uniqueIndex = vertexMap[vertexIndex];
      vertexInstanceCounts[uniqueIndex]++;
    }
    const vertexInstances = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; ++i) {
      const count = vertexInstanceCounts[i];
      if (count > 0) {
        vertexInstances[i] = new Array(count);
        for (let j = 0; j < count; j++) {
          vertexInstances[i][j] = 0;
        }
      }
    }
    for (let i = 0; i < indexList.length; ++i) {
      let faceIndex = Math.floor(i / 3);
      let uniqueIndex = vertexMap[indexList[i]];
      vertexInstances[uniqueIndex][--vertexInstanceCounts[uniqueIndex]] = faceIndex;
    }
    const faceNormals = new Array(triangleCount);
    for (let i = 0; i < triangleCount; ++i) {
      const i0 = indexList[i * 3 + 0];
      const i1 = indexList[i * 3 + 1];
      const i2 = indexList[i * 3 + 2];
      const edge0 = Vector3d.subtractVectors(vertexList[i1].get_position(), vertexList[i0].get_position());
      const edge1 = Vector3d.subtractVectors(vertexList[i2].get_position(), vertexList[i1].get_position());
      faceNormals[i] = Vector3d.cross(edge0, edge1);
      faceNormals[i].normalize();
    }
    const newVertexCount = triangleCount * 3;
    const vertexNormals = new Array(newVertexCount);
    const cosCreaseAngle = Math.min(0.9999, Math.cos(creaseAngleRad));
    for (let i = 0; i < newVertexCount; ++i) {
      let vertexIndex = indexList[i];
      let uniqueIndex = vertexMap[vertexIndex];
      const faceNormal = faceNormals[Math.floor(i / 3)];
      const sum = new Vector3d();
      const $enum2 = ss.enumerate(vertexInstances[uniqueIndex]);
      while ($enum2.moveNext()) {
        let faceIndex = $enum2.current;
        const n = faceNormals[faceIndex];
        if (Vector3d.dot(faceNormal, n) > cosCreaseAngle) {
          sum.add(n);
        }
      }
      vertexNormals[i] = sum;
      vertexNormals[i].normalize();
    }
    return vertexNormals;
  },
  _calculateVertexTangents: function (vertexList, indexList, creaseAngleRad) {
    if (!vertexList.length) {
      return null;
    }
    const vertexCount = vertexList.length;
    const triangleCount = Math.floor(indexList.length / 3);
    const vertexPositions = [];
    for (let vertexIndex = 0; vertexIndex < vertexList.length; ++vertexIndex) {
      const vp = new VertexPosition();
      vp.position = vertexList[vertexIndex].get_position();
      vp.index = vertexIndex;
      vertexPositions.push(vp);
    }
    vertexPositions.sort(function (v0, v1) {
      return Object3d._compareVector3(v0.position, v1.position);
    });
    const vertexMap = new Array(vertexPositions.length);
    let uniqueVertexCount = 0;
    for (let vertexIndex = 0; vertexIndex < vertexPositions.length; vertexIndex++) {
      if (!vertexIndex || !!Object3d._compareVector3(vertexPositions[vertexIndex].position, vertexPositions[vertexIndex - 1].position)) {
        ++uniqueVertexCount;
      }
      vertexMap[vertexPositions[vertexIndex].index] = (uniqueVertexCount - 1);
    }
    const vertexInstanceCounts = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; i++) {
      vertexInstanceCounts[i] = 0;
    }
    const $enum1 = ss.enumerate(indexList);
    while ($enum1.moveNext()) {
      let vertexIndex = $enum1.current;
      let uniqueIndex = vertexMap[vertexIndex];
      vertexInstanceCounts[uniqueIndex]++;
    }
    const vertexInstances = new Array(uniqueVertexCount);
    for (let i = 0; i < uniqueVertexCount; ++i) {
      const count = vertexInstanceCounts[i];
      if (count > 0) {
        vertexInstances[i] = new Array(count);
        for (let j = 0; j < count; j++) {
          vertexInstances[i][j] = 0;
        }
      }
    }
    for (let i = 0; i < indexList.length; ++i) {
      let faceIndex = Math.floor(i / 3);
      let uniqueIndex = vertexMap[indexList[i]];
      vertexInstances[uniqueIndex][--vertexInstanceCounts[uniqueIndex]] = faceIndex;
    }
    const partials = new Array(triangleCount);
    for (let i = 0; i < triangleCount; ++i) {
      let v0 = vertexList[indexList[i * 3 + 0]];
      let v1 = vertexList[indexList[i * 3 + 1]];
      const v2 = vertexList[indexList[i * 3 + 2]];
      const edge0 = Vector3d.subtractVectors(v1.get_position(), v0.get_position());
      const edge1 = Vector3d.subtractVectors(v2.get_position(), v0.get_position());
      const m00 = v1.tu - v0.tu;
      const m01 = v1.tv - v0.tv;
      const m10 = v2.tu - v0.tu;
      const m11 = v2.tv - v0.tv;
      const determinant = m00 * m11 - m01 * m10;
      if (Math.abs(determinant) < 1E-06) {
        if (edge0.lengthSq() > 0) {
          partials[i] = edge0;
          partials[i].normalize();
        } else {
          partials[i] = Vector3d.create(1, 0, 0);
        }
      } else {
        const invDeterminant = 1 / determinant;
        const n00 = m11 * invDeterminant;
        const n01 = -m01 * invDeterminant;
        const n10 = -m10 * invDeterminant;
        const n11 = m00 * invDeterminant;
        partials[i] = Vector3d.addVectors(Vector3d.multiplyScalar(edge0, n00), Vector3d.multiplyScalar(edge1, n01));
        partials[i].normalize();
      }
    }
    const newVertexCount = triangleCount * 3;
    const tangents = new Array(newVertexCount);
    const cosCreaseAngle = Math.min(0.9999, Math.cos(creaseAngleRad));
    for (let i = 0; i < newVertexCount; ++i) {
      let vertexIndex = indexList[i];
      let uniqueIndex = vertexMap[vertexIndex];
      const du = partials[Math.floor(i / 3)];
      const sum = new Vector3d();
      const $enum2 = ss.enumerate(vertexInstances[uniqueIndex]);
      while ($enum2.moveNext()) {
        let faceIndex = $enum2.current;
        const T = partials[faceIndex];
        if (Vector3d.dot(du, T) > cosCreaseAngle) {
          sum.add(T);
        }
      }
      const N = vertexList[vertexIndex].get_normal();
      tangents[i] = Vector3d.subtractVectors(sum, Vector3d.multiplyScalar(N, Vector3d.dot(N, sum)));
      tangents[i].normalize();
    }
    return tangents;
  },
  _calculateVertexNormals: function (vertexList, indexList, creaseAngleRad) {
    const vertexCount = vertexList.length;
    const triangleCount = Math.floor(indexList.length / 3);
    const vertexInstanceCounts = new Array(vertexCount);
    const $enum1 = ss.enumerate(indexList);
    while ($enum1.moveNext()) {
      let vertexIndex = $enum1.current;
      vertexInstanceCounts[vertexIndex]++;
    }
    const vertexInstances = new Array(vertexCount);
    for (let i = 0; i < vertexCount; ++i) {
      const count = vertexInstanceCounts[i];
      if (count > 0) {
        vertexInstances[i] = new Array(count);
      }
    }
    for (let i = 0; i < indexList.length; ++i) {
      let faceIndex = Math.floor(i / 3);
      let vertexIndex = indexList[i];
      vertexInstances[vertexIndex][--vertexInstanceCounts[vertexIndex]] = faceIndex;
    }
    const faceNormals = new Array(triangleCount);
    for (let i = 0; i < triangleCount; ++i) {
      const i0 = indexList[i * 3 + 0];
      const i1 = indexList[i * 3 + 1];
      const i2 = indexList[i * 3 + 2];
      const edge0 = Vector3d.subtractVectors(vertexList[i1].get_position(), vertexList[i0].get_position());
      const edge1 = Vector3d.subtractVectors(vertexList[i2].get_position(), vertexList[i1].get_position());
      faceNormals[i] = Vector3d.cross(edge0, edge1);
      faceNormals[i].normalize();
    }
    const newVertexCount = triangleCount * 3;
    const vertexNormals = new Array(newVertexCount);
    const cosCreaseAngle = Math.min(0.9999, Math.cos(creaseAngleRad));
    for (let i = 0; i < newVertexCount; ++i) {
      let vertexIndex = indexList[i];
      const faceNormal = faceNormals[Math.floor(i / 3)];
      const sum = new Vector3d();
      const $enum2 = ss.enumerate(vertexInstances[vertexIndex]);
      while ($enum2.moveNext()) {
        let faceIndex = $enum2.current;
        const n = faceNormals[faceIndex];
        if (Vector3d.dot(faceNormal, n) > cosCreaseAngle) {
          sum.add(n);
        }
      }
      vertexNormals[i] = sum;
      vertexNormals[i].normalize();
    }
    return vertexNormals;
  },
  _addMaterial: function (material) {
    this._meshMaterials.push(material);
    while (this._meshTextures.length < this._meshMaterials.length) {
      this._meshTextures.push(null);
    }
    while (this._meshSpecularTextures.length < this._meshMaterials.length) {
      this._meshSpecularTextures.push(null);
    }
    while (this._meshNormalMaps.length < this._meshMaterials.length) {
      this._meshNormalMaps.push(null);
    }
  },
  _loadColorChunk: function (br) {
    const chunkID = br.readUInt16();
    const chunkLength = br.readUInt32();
    let color = Colors.get_black();
    if ((chunkID === 16 || chunkID === 19) && chunkLength === 18) {
      const r = Math.max(0, Math.min(1, br.readSingle()));
      const g = Math.max(0, Math.min(1, br.readSingle()));
      const b = Math.max(0, Math.min(1, br.readSingle()));
      color = Color.fromArgb(255, ss.truncate((255 * r)), ss.truncate((255 * g)), ss.truncate((255 * b)));
    } else if ((chunkID === 17 || chunkID === 18) && chunkLength === 9) {
      color = Color.fromArgb(255, br.readByte(), br.readByte(), br.readByte());
    } else {
      br.readBytes(chunkLength - 6);
    }
    return color;
  },
  _loadPercentageChunk: function (br) {
    const chunkID = br.readUInt16();
    const chunkLength = br.readUInt32();
    let percentage = 0;
    if (chunkID === 48 && chunkLength === 8) {
      percentage = br.readUInt16();
    } else if (chunkID === 49 && chunkLength === 10) {
      percentage = br.readSingle();
    } else {
      br.readBytes(chunkLength - 6);
    }
    return percentage;
  },
  _loadMeshFromObj: function (doc, filename) {
    const $this = this;

    this.filename = filename;
    this._tourDocument = doc;
    const blob = doc.getFileBlob(filename);
    const chunck = new FileReader();
    chunck.onloadend = function (e) {
      $this._matFiles = $this._readObjMaterialsFromBin(ss.safeCast(chunck.result, String));
      $this._matFileIndex = 0;
      $this._loadMatLib(ss.safeCast(chunck.result, String));
    };
    chunck.readAsText(blob);
  },
  _readObjMaterialsFromBin: function (data) {
    const matFiles = [];
    const lines = data.split('\n');
    const $enum1 = ss.enumerate(lines);
    while ($enum1.moveNext()) {
      const lineraw = $enum1.current;
      const line = ss.replaceString(lineraw, '  ', ' ');
      const parts = ss.trim(line).split(' ');
      if (parts.length > 0) {
        switch (parts[0]) {
          case 'mtllib':
            const path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
            const matFile = path + parts[1];
            matFiles.push(matFile);
            break;
        }
      }
    }
    return matFiles;
  },
  _readObjFromBin: function (data) {
    let objectFound = false;
    const objects = [];
    let currentObject = new ObjectNode();
    currentObject.name = 'Default';
    let triangleCount = 0;
    let vertexCount = 0;
    let vertexList = [];
    const vertList = [];
    const normList = [];
    const uvList = [];
    vertList.push(new Vector3d());
    normList.push(new Vector3d());
    uvList.push(new Vector2d());
    const indexList = [];
    const attribList = [];
    const applyLists = [];
    const applyListsIndex = [];
    const materialNames = [];
    let currentMaterialIndex = -1;
    let currentMaterial = new Material();
    let currentGroup = new Group();
    let currentIndex = 0;
    currentMaterial = new Material();
    currentMaterial.diffuse = this.color;
    currentMaterial.ambient = this.color;
    currentMaterial.specular = Colors.get_white();
    currentMaterial.specularSharpness = 30;
    currentMaterial.opacity = 1;
    currentMaterial.isDefault = true;
    currentGroup.startIndex = 0;
    currentGroup.indexCount = 0;
    currentGroup.materialIndex = 0;
    const lines = data.split('\n');
    const $enum1 = ss.enumerate(lines);
    while ($enum1.moveNext()) {
      const lineraw = $enum1.current;
      const line = ss.replaceString(lineraw, '  ', ' ');
      const parts = ss.trim(line).split(' ');
      if (parts.length > 0) {
        switch (parts[0]) {
          case 'mtllib':
            break;
          case 'usemtl':
            const materialName = parts[1];
            if (ss.keyExists(this._matLib, materialName)) {
              if (currentMaterialIndex === -1 && currentIndex > 0) {
                this._addMaterial(currentMaterial);
                currentMaterialIndex++;
              }
              if (currentMaterialIndex > -1) {
                currentGroup.indexCount = currentIndex - currentGroup.startIndex;
                currentObject.drawGroup.push(currentGroup);
              }
              currentMaterialIndex++;
              if (ss.keyExists(this._matLib, materialName)) {
                currentMaterial = this._matLib[materialName];
                if (ss.keyExists(this._textureLib, materialName)) {
                  try {
                    if (!ss.keyExists(this._textureCache, this._textureLib[materialName])) {
                      const path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
                      const tex = this._tourDocument.getCachedTexture2d(path + this._textureLib[materialName]);
                      if (tex != null) {
                        this.meshFilenames.push(this._textureLib[materialName]);
                        this._textureCache[this._textureLib[materialName]] = tex;
                      }
                    }
                    this._meshTextures.push(this._textureCache[this._textureLib[materialName]]);
                  } catch ($e2) {
                  }
                }
                this._addMaterial(currentMaterial);
                currentGroup = new Group();
                currentGroup.startIndex = currentIndex;
                currentGroup.indexCount = 0;
                currentGroup.materialIndex = currentMaterialIndex;
              }
            }
            break;
          case 'v':
            vertexCount++;
            if (this.flipHandedness) {
              vertList.push(Vector3d.create(-parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            } else {
              vertList.push(Vector3d.create(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            }
            break;
          case 'vn':
            if (this.flipHandedness) {
              normList.push(Vector3d.create(-parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            } else {
              normList.push(Vector3d.create(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            }
            break;
          case 'vt':
            uvList.push(Vector2d.create(parseFloat(parts[1]), (this.flipV) ? (1 - parseFloat(parts[2])) : parseFloat(parts[2])));
            break;
          case 'g':
          case 'o':
            if (objectFound) {
              if (currentMaterialIndex > -1) {
                currentGroup.indexCount = currentIndex - currentGroup.startIndex;
                currentObject.drawGroup.push(currentGroup);
                currentGroup = new Group();
                currentGroup.startIndex = currentIndex;
                currentGroup.indexCount = 0;
                currentGroup.materialIndex = currentMaterialIndex;
              }
              currentObject = new ObjectNode();
            }
            objectFound = true;
            if (parts.length > 1) {
              currentObject.name = parts[1];
            } else {
              currentObject.name = 'Unnamed';
            }
            objects.push(currentObject);
            break;
          case 'f':
            let indexiesA = this._getIndexies(parts[1]);
            let indexiesB = this._getIndexies(parts[2]);
            let indexiesC = this._getIndexies(parts[3]);
            vertexList.push(PositionNormalTextured.createUV(vertList[indexiesA[0]], normList[indexiesA[2]], uvList[indexiesA[1]]));
            vertexList.push(PositionNormalTextured.createUV(vertList[indexiesB[0]], normList[indexiesB[2]], uvList[indexiesB[1]]));
            vertexList.push(PositionNormalTextured.createUV(vertList[indexiesC[0]], normList[indexiesC[2]], uvList[indexiesC[1]]));
            if (this.flipHandedness) {
              indexList.push(currentIndex);
              indexList.push(currentIndex + 2);
              indexList.push(currentIndex + 1);
            } else {
              indexList.push(currentIndex);
              indexList.push(currentIndex + 1);
              indexList.push(currentIndex + 2);
            }
            triangleCount++;
            currentIndex += 3;
            if (parts.length > 4) {
              let partIndex = 4;
              while (partIndex < parts.length) {
                if (this.flipHandedness) {
                  indexiesA = this._getIndexies(parts[1]);
                  indexiesC = this._getIndexies(parts[partIndex]);
                  indexiesB = this._getIndexies(parts[partIndex - 1]);
                } else {
                  indexiesA = this._getIndexies(parts[1]);
                  indexiesB = this._getIndexies(parts[partIndex - 1]);
                  indexiesC = this._getIndexies(parts[partIndex]);
                }
                vertexList.push(PositionNormalTextured.createUV(vertList[indexiesA[0]], normList[indexiesA[2]], uvList[indexiesA[1]]));
                vertexList.push(PositionNormalTextured.createUV(vertList[indexiesB[0]], normList[indexiesB[2]], uvList[indexiesB[1]]));
                vertexList.push(PositionNormalTextured.createUV(vertList[indexiesC[0]], normList[indexiesC[2]], uvList[indexiesC[1]]));
                indexList.push(currentIndex);
                indexList.push(currentIndex + 1);
                indexList.push(currentIndex + 2);
                triangleCount++;
                currentIndex += 3;
                partIndex++;
              }
            }
            break;
        }
      }
    }
    if (!objectFound) {
      objects.push(currentObject);
    }
    if (currentMaterialIndex === -1 && currentIndex > 0) {
      this._addMaterial(currentMaterial);
      currentMaterialIndex++;
    }
    if (currentMaterialIndex > -1) {
      currentGroup.indexCount = (currentIndex - currentGroup.startIndex);
      currentObject.drawGroup.push(currentGroup);
    }
    if (normList.length < 2) {
      const degtorag = Math.PI / 180;
      const creaseAngleRad = ((this.smooth) ? 170 * degtorag : 45 * degtorag);
      const vertexNormals = this._calculateVertexNormalsMerged(vertexList, indexList, creaseAngleRad);
      const newVertexList = [];
      const newVertexCount = indexList.length;
      for (let vertexIndex = 0; vertexIndex < newVertexCount; ++vertexIndex) {
        const v = vertexList[indexList[vertexIndex]];
        v.set_normal(vertexNormals[vertexIndex]);
        newVertexList.push(v);
      }
      vertexList = newVertexList;
    }
    this._mesh = Mesh.create(vertexList, indexList);
    const rootDummy = new ObjectNode();
    rootDummy.name = 'Root';
    rootDummy.parent = null;
    rootDummy.level = -1;
    rootDummy.drawGroup = null;
    rootDummy.children = objects;
    this.objects = [];
    this.objects.push(rootDummy);
    this._mesh.setObjects(this.objects);
    this._mesh.commitToDevice();
    this._dirty = false;
    this._readyToRender = true;
  },
  _loadMatLib: function (data) {
    const $this = this;

    if (this._matFileIndex < this._matFiles.length) {
      const filename = this._matFiles[this._matFileIndex++];
      const blob = this._tourDocument.getFileBlob(filename);
      const chunck = new FileReader();
      chunck.onloadend = function (e) {
        $this._readMatLibFromBin(ss.safeCast(chunck.result, String));
        $this._loadMatLib(data);
      };
      chunck.readAsText(blob);
    } else {
      this._readObjFromBin(data);
    }
  },
  _readMatLibFromBin: function (data) {
    try {
      let currentMaterial = new Material();
      let materialName = '';
      this._matLib = {};
      this._textureLib = {};
      const lines = data.split('\n');
      const $enum1 = ss.enumerate(lines);
      while ($enum1.moveNext()) {
        const lineraw = $enum1.current;
        const line = lineraw;
        const parts = ss.trim(line).split(' ');
        if (parts.length > 0) {
          switch (parts[0]) {
            case 'newmtl':
              if (!ss.emptyString(materialName)) {
                this._matLib[materialName] = currentMaterial;
              }
              currentMaterial = new Material();
              currentMaterial.diffuse = Colors.get_white();
              currentMaterial.ambient = Colors.get_white();
              currentMaterial.specular = Colors.get_black();
              currentMaterial.specularSharpness = 30;
              currentMaterial.opacity = 1;
              materialName = parts[1];
              break;
            case 'Ka':
              currentMaterial.ambient = Color.fromArgb(255, Math.min(parseFloat(parts[1]) * 255, 255), Math.min(parseFloat(parts[2]) * 255, 255), Math.min(parseFloat(parts[3]) * 255, 255));
              break;
            case 'map_Kd':
              currentMaterial.diffuse = Colors.get_white();
              let textureFilename = parts[1];
              for (let i = 2; i < parts.length; i++) {
                textureFilename += ' ' + parts[i];
              }
              const path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
              textureFilename = ss.replaceString(textureFilename, '/', '\\');
              if (textureFilename.indexOf('\\') !== -1) {
                textureFilename = textureFilename.substring(textureFilename.lastIndexOf('\\') + 1);
              }
              this._textureLib[materialName] = textureFilename;
              break;
            case 'Kd':
              currentMaterial.diffuse = Color.fromArgb(255, Math.min(parseFloat(parts[1]) * 255, 255), Math.min(parseFloat(parts[2]) * 255, 255), Math.min(parseFloat(parts[3]) * 255, 255));
              break;
            case 'Ks':
              currentMaterial.specular = Color.fromArgb(255, Math.min(parseFloat(parts[1]) * 255, 255), Math.min(parseFloat(parts[2]) * 255, 255), Math.min(parseFloat(parts[3]) * 255, 255));
              break;
            case 'd':
              currentMaterial.opacity = parseFloat(parts[1]);
              break;
            case 'Tr':
              currentMaterial.opacity = 1 - parseFloat(parts[1]);
              break;
            case 'illum':
              const illuminationMode = parseInt(parts[1]);
              break;
            case 'sharpness':
              currentMaterial.specularSharpness = parseFloat(parts[1]);
              break;
            case 'Ns':
              currentMaterial.specularSharpness = 1 + 2 * parseFloat(parts[1]);
              currentMaterial.specularSharpness = Math.max(10, currentMaterial.specularSharpness);
              break;
          }
        }
      }
      if (!ss.emptyString(materialName)) {
        this._matLib[materialName] = currentMaterial;
      }
    } catch ($e2) {
    }
  },
  _getIndexies: function (data) {
    const parts = ss.trim(data).split('/');
    const indecies = new Array(3);
    if (ss.emptyString(data)) {
      return indecies;
    }
    if (parts.length > 0) {
      indecies[0] = parseInt(parts[0]);
    }
    if (parts.length > 1) {
      if (ss.emptyString(parts[1])) {
        indecies[1] = 0;
      } else {
        indecies[1] = parseInt(parts[1]);
      }
    }
    if (parts.length > 2) {
      indecies[2] = parseInt(parts[2]);
    }
    return indecies;
  },
  _loadMeshFrom3ds: function (doc, filename, scale) {
    const $this = this;

    this._tourDocument = doc;
    const blob = doc.getFileBlob(filename);
    const chunck = new FileReader();
    chunck.onloadend = function (e) {
      $this._read3dsFromBin(new BinaryReader(new Uint8Array(chunck.result)), scale);
    };
    chunck.readAsArrayBuffer(blob);
  },
  _read3dsFromBin: function (br, scale) {
    let i;
    let sectionID;
    let sectionLength;
    let name = '';
    let material = '';
    let triangleCount = 0;
    let vertexCount = 0;
    const vertexList = [];
    const indexList = [];
    const attribList = [];
    const materialNames = [];
    let currentMaterialIndex = -1;
    let currentMaterial = new Material();
    let attributeID = 0;
    let count = 0;
    let lastID = 0;
    const exit = false;
    let normalMapFound = false;
    const offsetX = 0;
    const offsetY = 0;
    const offsetZ = 0;
    const objects = [];
    let currentObject = null;
    const objHierarchy = [];
    const objNames = [];
    const objectTable = {};
    let dummyCount = 0;
    const length = br.get_length() - 1;
    let startMapIndex = 0;
    let startTriangleIndex = 0;
    while (br.get_position() < length && !exit) {
      sectionID = br.readUInt16();
      sectionLength = br.readUInt32();
      let triCount;
      let textureFilename;
      let nameId;
      let nameBlockLength;
      let b1,b2;
      let path;
      let level;
      switch (sectionID) {
        case 19789:
          break;
        case 15677:
          break;
        case 16384:
          name = '';
          let b;
          do {
            b = br.readByte();
            if (b > 0) {
              name += String.fromCharCode(b);
            }
          } while (!!b);
          currentObject = new ObjectNode();
          currentObject.name = name;
          objects.push(currentObject);
          if (!ss.keyExists(objectTable, currentObject.name)) {
            objectTable[currentObject.name] = currentObject;
          }
          break;
        case 16640:
          startMapIndex = vertexList.length;
          startTriangleIndex = Math.floor(indexList.length / 3);
          break;
        case 16656:
          vertexCount = br.readUInt16();
          for (i = 0; i < vertexCount; i++) {
            const x = br.readSingle() - offsetX;
            const y = br.readSingle() - offsetY;
            const z = br.readSingle() - offsetZ;
            let vert = PositionNormalTextured._create(x * scale, z * scale, y * scale, 0, 0, 0, 0, 0);
            vertexList.push(vert);
          }
          break;
        case 16672:
          triCount = br.readUInt16();
          triangleCount += triCount;
          for (i = 0; i < triCount; i++) {
            const aa = br.readUInt16() + startMapIndex;
            const bb = br.readUInt16() + startMapIndex;
            const cc = br.readUInt16() + startMapIndex;
            indexList.push(cc);
            indexList.push(bb);
            indexList.push(aa);
            const flags = br.readUInt16();
          }
          break;
        case 16688:
          material = '';
          i = 0;

          do {
            b1 = br.readByte();
            if (b1 > 0) {
              material += String.fromCharCode(b1);
            }
            i++;
          } while (!!b1);
          triCount = br.readUInt16();
          const applyList = new Array(triCount);
          attributeID = Object3d._getMaterialID(material, materialNames);
          for (i = 0; i < triCount; i++) {
            applyList[i] = br.readUInt16() + startTriangleIndex;
          }
          currentObject.applyLists.push(applyList);
          currentObject.applyListsIndex.push(attributeID);
          break;
        case 16704:
          count = br.readUInt16();
          for (let i = 0; i < count; i++) {
            let vert = vertexList[startMapIndex + i];
            const texCoord = Vector2d.create(br.readSingle(), (this.flipV) ? (1 - br.readSingle()) : br.readSingle());
            vertexList[startMapIndex + i] = PositionNormalTextured.createUV(vert.get_position(), new Vector3d(), texCoord);
          }
          break;
        case 16736:
          const mat = new Array(12);
          for (i = 0; i < 12; i++) {
            mat[i] = br.readSingle();
          }
          if (ss.keyExists(objectTable, name)) {
            objectTable[name].localMat = Matrix3d.create(mat[0], mat[1], mat[2], 0, mat[3], mat[4], mat[5], 0, mat[6], mat[7], mat[8], 0, mat[9], mat[10], mat[11], 1);
            objectTable[name].localMat.invert();
          }
          break;
        case 45055:
          break;
        case 40960:
          let matName = '';
          i = 0;
          do {
            b2 = br.readByte();
            if (b2 > 0) {
              matName += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          materialNames.push(matName);
          if (currentMaterialIndex > -1) {
            this._addMaterial(currentMaterial);
          }
          currentMaterialIndex++;
          currentMaterial = new Material();
          currentMaterial.diffuse = Colors.get_white();
          currentMaterial.ambient = Colors.get_white();
          currentMaterial.specular = Colors.get_black();
          currentMaterial.specularSharpness = 30;
          currentMaterial.opacity = 1;
          break;
        case 40976:
          currentMaterial.ambient = this._loadColorChunk(br);
          break;
        case 40992:
          currentMaterial.diffuse = this._loadColorChunk(br);
          break;
        case 41008:
          currentMaterial.specular = this._loadColorChunk(br);
          break;
        case 41024:
          currentMaterial.specularSharpness = 1 + 2 * this._loadPercentageChunk(br);
          currentMaterial.specularSharpness = Math.max(10, currentMaterial.specularSharpness);
          break;
        case 41472:
          break;
        case 41728:
          textureFilename = '';
          i = 0;
          do {
            b2 = br.readByte();
            if (b2 > 0) {
              textureFilename += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
          try {
            let tex = this._tourDocument.getCachedTexture2d(path + textureFilename);
            if (tex != null) {
              this._meshTextures.push(tex);
              this.meshFilenames.push(textureFilename);
              currentMaterial.diffuse = Colors.get_white();
            } else {
              this._meshTextures.push(null);
            }
          } catch ($e1) {
            this._meshTextures.push(null);
          }
          break;
        case 41520:
          const percentage = this._loadPercentageChunk(br);
          nameId = br.readUInt16();
          nameBlockLength = br.readUInt32();
          textureFilename = '';
          i = 0;
          do {
            b2 = br.readByte();
            if (b2 > 0) {
              textureFilename += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
          try {
            let tex = this._tourDocument.getCachedTexture2d(path + textureFilename);
            if (tex != null) {
              this._meshNormalMaps.push(tex);
              this.meshFilenames.push(textureFilename);
              normalMapFound = true;
            } else {
              this._meshNormalMaps.push(null);
            }
          } catch ($e2) {
            this._meshNormalMaps.push(null);
          }
          break;
        case 41476:
          const strength = this._loadPercentageChunk(br);
          nameId = br.readUInt16();
          nameBlockLength = br.readUInt32();
          textureFilename = '';
          i = 0;

          do {
            b2 = br.readByte();
            if (b2 > 0) {
              textureFilename += String.fromCharCode(b2);
            }
            i++;
          } while (!!b2);
          path = this.filename.substring(0, this.filename.lastIndexOf('\\') + 1);
          try {
            let tex = this._tourDocument.getCachedTexture2d(path + textureFilename);
            if (tex != null) {
              this._meshSpecularTextures.push(tex);
              this.meshFilenames.push(textureFilename);
              const gray = ss.truncate((255.99 * strength / 100));
              currentMaterial.specular = Color.fromArgb(255, gray, gray, gray);
            } else {
              this._meshSpecularTextures.push(null);
            }
          } catch ($e3) {
            this._meshSpecularTextures.push(null);
          }
          break;
        case 45056:
          break;
        case 45058:
          break;
        case 45072:
          name = '';
          i = 0;

          do {
            b1 = br.readByte();
            if (b1 > 0) {
              name += String.fromCharCode(b1);
            }
            i++;
          } while (!!b1);
          const dum1 = br.readUInt16();
          const dum2 = br.readUInt16();
          level = br.readUInt16();
          if (level === 65535) {
            level = -1;
          }
          if (ss.startsWith(name, '$')) {
            dummyCount++;
          } else {
            objNames.push(name);
          }
          objHierarchy.push(level);
          if (ss.keyExists(objectTable, name)) {
            objectTable[name].level = level;
          }
          break;
        case 45073:
          name = '';
          i = 0;

          do {
            b1 = br.readByte();
            if (b1 > 0) {
              name += String.fromCharCode(b1);
            }
            i++;
          } while (!!b1);
          objNames.push('$$$' + name);
          break;
        case 45075:
          const points = new Array(3);
          for (i = 0; i < 3; i++) {
            points[i] = br.readSingle();
          }
          if (ss.keyExists(objectTable, name)) {
            objectTable[name].pivotPoint = Vector3d.create(-points[0], -points[1], -points[2]);
          }
          break;
        case 45088:
          const pos = new Array(8);
          for (i = 0; i < 8; i++) {
            pos[i] = br.readSingle();
          }
          break;
        default:
          br.seekRelative((sectionLength - 6));
          break;
      }
      lastID = sectionID;
    }
    br.close();
    if (currentMaterialIndex > -1) {
      this._addMaterial(currentMaterial);
    }
    const degtorag = Math.PI / 180;
    const creaseAngleRad = ((this.smooth) ? 70 * degtorag : 45 * degtorag);
    const vertexNormals = this._calculateVertexNormalsMerged(vertexList, indexList, creaseAngleRad);
    const newVertexList = [];
    const newVertexCount = triangleCount * 3;
    for (let vertexIndex = 0; vertexIndex < newVertexCount; ++vertexIndex) {
      let v = vertexList[indexList[vertexIndex]];
      v.set_normal(vertexNormals[vertexIndex]);
      newVertexList.push(v);
    }
    const newIndexList = [];
    const $enum4 = ss.enumerate(objects);
    while ($enum4.moveNext()) {
      let node = $enum4.current;
      const materialGroups = [];
      for (i = 0; i < node.applyLists.length; i++) {
        const matId = node.applyListsIndex[i];
        const startIndex = newIndexList.length;
        const $enum5 = ss.enumerate(node.applyLists[i]);
        while ($enum5.moveNext()) {
          const triangleIndex = $enum5.current;
          newIndexList.push((triangleIndex * 3));
          newIndexList.push((triangleIndex * 3 + 1));
          newIndexList.push((triangleIndex * 3 + 2));
        }
        const group = new Group();
        group.startIndex = startIndex;
        group.indexCount = node.applyLists[i].length * 3;
        group.materialIndex = matId;
        materialGroups.push(group);
      }
      node.drawGroup = materialGroups;
    }
    const nodeStack = new ss.Stack();
    const nodeTreeRoot = [];
    const rootDummy = new ObjectNode();
    rootDummy.name = 'Root';
    rootDummy.parent = null;
    rootDummy.level = -1;
    rootDummy.drawGroup = null;
    let currentLevel = -1;
    nodeStack.push(rootDummy);
    nodeTreeRoot.push(rootDummy);
    for (i = 0; i < objHierarchy.length; i++) {
      let level = objHierarchy[i];
      if (level <= currentLevel) {
        while (level <= nodeStack.peek().level && nodeStack.count > 1) {
          nodeStack.pop();
        }
        currentLevel = level;
      }
      if (ss.startsWith(objNames[i], '$$$')) {
        const dummy = new ObjectNode();
        dummy.name = ss.replaceString(objNames[i], '$$$', '');
        dummy.parent = nodeStack.peek();
        dummy.parent.children.push(dummy);
        dummy.level = currentLevel = level;
        dummy.drawGroup = null;
        nodeStack.push(dummy);
      } else {
        objectTable[objNames[i]].level = currentLevel = level;
        objectTable[objNames[i]].parent = nodeStack.peek();
        objectTable[objNames[i]].parent.children.push(objectTable[objNames[i]]);
        nodeStack.push(objectTable[objNames[i]]);
      }
    }
    if (!objHierarchy.length) {
      const $enum6 = ss.enumerate(objects);
      while ($enum6.moveNext()) {
        let node = $enum6.current;
        rootDummy.children.push(node);
        node.parent = rootDummy;
      }
    }
    if (normalMapFound) {
      const tangentIndexList = [];
      for (let tangentIndex = 0; tangentIndex < newVertexCount; ++tangentIndex) {
        tangentIndexList.push(tangentIndex);
      }
      const tangents = this._calculateVertexTangents(newVertexList, tangentIndexList, creaseAngleRad);
      const vertices = new Array(newVertexList.length);
      let vertexIndex = 0;
      const $enum7 = ss.enumerate(newVertexList);
      while ($enum7.moveNext()) {
        let v = $enum7.current;
        const tvertex = new PositionNormalTexturedTangent(v.get_position(), v.get_normal(), Vector2d.create(v.tu, v.tv), tangents[vertexIndex]);
        vertices[vertexIndex] = tvertex;
        ++vertexIndex;
      }
      this._mesh = Mesh.createTangent(vertices, newIndexList);
    } else {
      this._mesh = Mesh.create(newVertexList, newIndexList);
    }
    this.objects = nodeTreeRoot;
    this._mesh.setObjects(nodeTreeRoot);
    this._mesh.commitToDevice();
    this._dirty = false;
    this._readyToRender = true;
  },
  _offsetObjects: function (vertList, objects, offsetMat, offsetPoint) {
    const $enum1 = ss.enumerate(objects);
    while ($enum1.moveNext()) {
      const node = $enum1.current;
      const matLoc = node.localMat;
      this._offsetObjects(vertList, node.children, matLoc, Vector3d.addVectors(node.pivotPoint, offsetPoint));
      const $enum2 = ss.enumerate(node.drawGroup);
      while ($enum2.moveNext()) {
        const group = $enum2.current;
        const end = group.startIndex + group.indexCount;
        for (let i = group.startIndex; i < end; i++) {
          const vert = vertList[i];
          vert.set_position(Vector3d.addVectors(vert.get_position(), Vector3d.addVectors(node.pivotPoint, offsetPoint)));
          vertList[i] = vert;
        }
      }
    }
  },
  setupLighting: function (renderContext) {
    const objPosition = Vector3d.create(renderContext.get_world().get_offsetX(), renderContext.get_world().get_offsetY(), renderContext.get_world().get_offsetZ());
    const objToLight = Vector3d.subtractVectors(objPosition, renderContext.get_reflectedLightPosition());
    const sunPosition = Vector3d.subtractVectors(renderContext.get_sunPosition(), renderContext.get_reflectedLightPosition());
    const cosPhaseAngle = (sunPosition.length() <= 0) ? 1 : Vector3d.dot(objToLight, sunPosition) / (objToLight.length() * sunPosition.length());
    let reflectedLightFactor = Math.max(0, cosPhaseAngle);
    reflectedLightFactor = Math.sqrt(reflectedLightFactor);
    let hemiLightFactor = 0;
    let sunlightFactor = 1;
    if (renderContext.get_occludingPlanetRadius() > 0) {
      const objAltitude = Vector3d.subtractVectors(objPosition, renderContext.get_occludingPlanetPosition()).length() - renderContext.get_occludingPlanetRadius();
      hemiLightFactor = Math.max(0, Math.min(1, 1 - (objAltitude / renderContext.get_occludingPlanetRadius()) * 300));
      reflectedLightFactor *= (1 - hemiLightFactor);
      const sunToPlanet = Vector3d.subtractVectors(renderContext.get_occludingPlanetPosition(), renderContext.get_sunPosition());
      const objToPlanet = Vector3d.subtractVectors(renderContext.get_occludingPlanetPosition(), objPosition);
      const hemiLightDirection = Vector3d.create(-objToPlanet.x, -objToPlanet.y, -objToPlanet.z);
      hemiLightDirection.normalize();
      renderContext.set_hemisphereLightUp(hemiLightDirection);
      const objToSun = Vector3d.subtractVectors(renderContext.get_sunPosition(), objPosition);
      const sunPlanetDistance = sunToPlanet.length();
      const t = -Vector3d.dot(objToSun, sunToPlanet) / (sunPlanetDistance * sunPlanetDistance);
      if (t > 1) {
        const shadowAxisPoint = Vector3d.addVectors(renderContext.get_sunPosition(), Vector3d.multiplyScalar(sunToPlanet, t));
        const d = Vector3d.subtractVectors(shadowAxisPoint, objPosition).length();
        const s = Vector3d.subtractVectors(shadowAxisPoint, renderContext.get_sunPosition()).length();
        const solarRadius = 0.004645784;
        const penumbraRadius = renderContext.get_occludingPlanetRadius() + (t - 1) * (renderContext.get_occludingPlanetRadius() + solarRadius);
        let umbraRadius = renderContext.get_occludingPlanetRadius() + (t - 1) * (renderContext.get_occludingPlanetRadius() - solarRadius);
        if (d < penumbraRadius) {
          let minimumShadow = 0;
          if (umbraRadius < 0) {
            const occlusion = Math.pow(1 / (1 - umbraRadius), 2);
            umbraRadius = 0;
            minimumShadow = 1 - occlusion;
          }
          const u = Math.max(0, umbraRadius);
          sunlightFactor = Math.max(minimumShadow, (d - u) / (penumbraRadius - u));
          const gray = ss.truncate((255.99 * sunlightFactor));
          renderContext.set_sunlightColor(Color.fromArgb(255, gray, gray, gray));
          hemiLightFactor *= sunlightFactor;
        }
      }
    }
    renderContext.set_reflectedLightColor(Color.fromArgb(255, ss.truncate((renderContext.get_reflectedLightColor().r * reflectedLightFactor)), ss.truncate((renderContext.get_reflectedLightColor().g * reflectedLightFactor)), ss.truncate((renderContext.get_reflectedLightColor().b * reflectedLightFactor))));
    renderContext.set_hemisphereLightColor(Color.fromArgb(255, ss.truncate((renderContext.get_hemisphereLightColor().r * hemiLightFactor)), ss.truncate((renderContext.get_hemisphereLightColor().g * hemiLightFactor)), ss.truncate((renderContext.get_hemisphereLightColor().b * hemiLightFactor))));
  },
  render: function (renderContext, opacity) {
    if (!this._readyToRender) {
      return;
    }
    if (this._dirty && !this.issLayer) {
      this._reload();
    }
    const oldWorld = renderContext.get_world();
    const offset = this._mesh.boundingSphere.center;
    let unitScale = 1;
    if (this._mesh.boundingSphere.radius > 0) {
      unitScale = 1 / this._mesh.boundingSphere.radius;
    }
    renderContext.set_world(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d.translation(Vector3d.create(-offset.x, -offset.y, -offset.z)), Matrix3d._scaling(unitScale, unitScale, unitScale)), oldWorld));
    const worldView = Matrix3d.multiplyMatrix(renderContext.get_world(), renderContext.get_view());
    const v = worldView.transform(Vector3d.get_empty());
    const scaleFactor = Math.sqrt(worldView.get_m11() * worldView.get_m11() + worldView.get_m22() * worldView.get_m22() + worldView.get_m33() * worldView.get_m33()) / unitScale;
    const dist = v.length();
    const radius = scaleFactor;
    const viewportHeight = ss.truncate(renderContext.height);
    const p11 = renderContext.get_projection().get_m11();
    const p34 = renderContext.get_projection().get_m34();
    const p44 = renderContext.get_projection().get_m44();
    const w = Math.abs(p34) * dist + p44;
    const pixelsPerUnit = (p11 / w) * viewportHeight;
    const radiusInPixels = (radius * pixelsPerUnit);
    if (radiusInPixels < 0.5) {
      return;
    }
    const savedSunlightColor = renderContext.get_sunlightColor();
    const savedReflectedColor = renderContext.get_reflectedLightColor();
    const savedHemiColor = renderContext.get_hemisphereLightColor();
    if (Settings.get_current().get_solarSystemLighting()) {
      this.setupLighting(renderContext);
      if (!this.useCurrentAmbient) {
        renderContext.set_ambientLightColor(Color.fromArgb(255, 11, 11, 11));
      }
    } else {
      renderContext.set_sunlightColor(Colors.get_black());
      renderContext.set_reflectedLightColor(Colors.get_black());
      renderContext.set_hemisphereLightColor(Colors.get_black());
      renderContext.set_ambientLightColor(Colors.get_white());
    }
    if (this._mesh == null) {
      return;
    }
    ModelShader.minLightingBrightness = 0.1;
    const count = this._meshMaterials.length;
    this._mesh.beginDrawing(renderContext);
    if (count > 0) {
      for (let i = 0; i < this._meshMaterials.length; i++) {
        if (this._meshMaterials[i].isDefault) {
          const mat = this._meshMaterials[i];
          mat.diffuse = this.color;
          mat.ambient = this.color;
          this._meshMaterials[i] = mat;
        }
        renderContext.setMaterial(this._meshMaterials[i], this._meshTextures[i], this._meshSpecularTextures[i], this._meshNormalMaps[i], opacity);
        if (this._mesh.vertexBuffer != null) {
          ModelShader.use(renderContext, this._mesh.vertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 32);
        } else {
          ModelShader.use(renderContext, this._mesh.tangentVertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 44);
        }
        renderContext.preDraw();
        this._mesh.drawSubset(renderContext, i);
      }
    } else {
      renderContext.preDraw();
      for (let i = 0; i < this._meshTextures.length; i++) {
        if (this._meshTextures[i] != null) {
          renderContext.set_mainTexture(this._meshTextures[i]);
          if (this._mesh.vertexBuffer != null) {
            ModelShader.use(renderContext, this._mesh.vertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 32);
          } else {
            ModelShader.use(renderContext, this._mesh.tangentVertexBuffer.vertexBuffer, this._mesh.indexBuffer.buffer, (this._meshTextures[i] != null) ? this._meshTextures[i].texture2d : null, opacity, false, 44);
          }
        }
        renderContext.preDraw();
        this._mesh.drawSubset(renderContext, i);
      }
    }
    renderContext.set_world(oldWorld);
    renderContext.set_sunlightColor(savedSunlightColor);
    renderContext.set_reflectedLightColor(savedReflectedColor);
    renderContext.set_hemisphereLightColor(savedHemiColor);
    renderContext.set_ambientLightColor(Colors.get_black());
  },
  dispose: function () {
    if (this._mesh != null) {
      this._mesh.dispose();
      this._mesh = null;
    }
    const $enum1 = ss.enumerate(ss.keys(this._textureCache));
    while ($enum1.moveNext()) {
      const key = $enum1.current;
      const tex = this._textureCache[key];
      if (tex != null) {
        tex.dispose();
      }
    }
    ss.clearKeys(this._textureCache);
    Object3d._disposeTextureList(this._meshTextures);
    Object3d._disposeTextureList(this._meshSpecularTextures);
    Object3d._disposeTextureList(this._meshNormalMaps);
    this._meshMaterials.length = 0;
    this._dirty = true;
  }
};



// wwtlib.Object3dLayer

export function Object3dLayer() {
  this._primaryUI$1 = null;
  this._heading$1 = 0;
  this._flipV$1 = true;
  this._flipHandedness$1 = false;
  this._smooth$1 = true;
  this._twoSidedGeometry$1 = false;
  this._pitch$1 = 0;
  this._roll$1 = 0;
  this._scale$1 = Vector3d.create(1, 1, 1);
  this._translate$1 = Vector3d.create(0, 0, 0);
  this._lightID$1 = 0;
  this._dirty$1 = false;
  this.objType = false;
  this._xHandle$1 = new Vector2d();
  this._yHandle$1 = new Vector2d();
  this._zHandle$1 = new Vector2d();
  this._hprHandles$1 = new Array(6);
  this._uiScale$1 = 1;
  this._showEditUi$1 = false;
  this._dragMode$1 = 0;
  this._pntDown$1 = new Vector2d();
  this._valueOnDown$1 = 0;
  this._valueOnDown2$1 = 0;
  this._hitDist$1 = 20;
  this._lockPreferedAxis$1 = false;
  this._preferY$1 = false;
  Layer.call(this);
}
Object3dLayer._initTranslateUI$1 = function() {
  Object3dLayer._translateUILines$1 = new LineList();
  Object3dLayer._translateUILines$1.timeSeries = false;
  Object3dLayer._translateUILines$1.set_depthBuffered(false);
  Object3dLayer._translateUILines$1.showFarSide = true;
  Object3dLayer._translateUI$1 = new TriangleList();
  Object3dLayer._translateUI$1.depthBuffered = false;
  Object3dLayer._translateUI$1.timeSeries = false;
  Object3dLayer._translateUI$1.writeZbuffer = false;
  const twoPi = Math.PI * 2;
  const step = twoPi / 45;
  const rad = 0.05;
  let a,pnt1,pnt2,pnt3;
  for (a = 0; a < twoPi; a += step) {
    pnt1 = Vector3d.create(1 - rad * 4, 0, 0);
    pnt2 = Vector3d.create(1 - rad * 4, Math.cos(a) * rad, Math.sin(a) * rad);
    pnt3 = Vector3d.create(1 - rad * 4, Math.cos(a + step) * rad, Math.sin(a + step) * rad);
    Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Colors.get_red(), Dates.empty());
  }
  for (a = 0; a < twoPi; a += step) {
    pnt1 = Vector3d.create(1, 0, 0);
    pnt3 = Vector3d.create(1 - rad * 4, Math.cos(a) * rad, Math.sin(a) * rad);
    pnt2 = Vector3d.create(1 - rad * 4, Math.cos(a + step) * rad, Math.sin(a + step) * rad);
    Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Color.fromArgb(255, 255, Math.max(0, (Math.sin(a) * 128)), Math.max(0, (Math.sin(a) * 128))), Dates.empty());
  }
  Object3dLayer._translateUILines$1.addLine(Vector3d.create(0, 0, 0), Vector3d.create(1, 0, 0), Colors.get_red(), Dates.empty());
  for (a = 0; a < twoPi; a += step) {
    pnt1 = Vector3d.create(0, 1 - rad * 4, 0);
    pnt3 = Vector3d.create(Math.cos(a) * rad, 1 - rad * 4, Math.sin(a) * rad);
    pnt2 = Vector3d.create(Math.cos(a + step) * rad, 1 - rad * 4, Math.sin(a + step) * rad);
    Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Colors.get_green(), Dates.empty());
  }
  for (a = 0; a < twoPi; a += step) {
    pnt1 = Vector3d.create(0, 1, 0);
    pnt2 = Vector3d.create(Math.cos(a) * rad, 1 - rad * 4, Math.sin(a) * rad);
    pnt3 = Vector3d.create(Math.cos(a + step) * rad, 1 - rad * 4, Math.sin(a + step) * rad);
    Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Color.fromArgb(255, Math.max(0, (Math.sin(a) * 128)), 255, Math.max(0, (Math.sin(a) * 128))), Dates.empty());
  }
  Object3dLayer._translateUILines$1.addLine(Vector3d.create(0, 0, 0), Vector3d.create(0, 1, 0), Colors.get_green(), Dates.empty());
  for (a = 0; a < twoPi; a += step) {
    pnt1 = Vector3d.create(0, 0, 1 - rad * 4);
    pnt2 = Vector3d.create(Math.cos(a) * rad, Math.sin(a) * rad, 1 - rad * 4);
    pnt3 = Vector3d.create(Math.cos(a + step) * rad, Math.sin(a + step) * rad, 1 - rad * 4);
    Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Colors.get_blue(), Dates.empty());
  }
  for (a = 0; a < twoPi; a += step) {
    pnt1 = Vector3d.create(0, 0, 1);
    pnt3 = Vector3d.create(Math.cos(a) * rad, Math.sin(a) * rad, 1 - rad * 4);
    pnt2 = Vector3d.create(Math.cos(a + step) * rad, Math.sin(a + step) * rad, 1 - rad * 4);
    Object3dLayer._translateUI$1.addTriangle(pnt1, pnt2, pnt3, Color.fromArgb(255, Math.max(0, (Math.sin(a) * 128)), Math.max(0, (Math.sin(a) * 128)), 255), Dates.empty());
  }
  Object3dLayer._translateUILines$1.addLine(Vector3d.create(0, 0, 0), Vector3d.create(0, 0, 1), Colors.get_blue(), Dates.empty());
  Object3dLayer._initRotateUI$1();
  Object3dLayer._initScaleUI$1();
};
Object3dLayer._initScaleUI$1 = function() {
  Object3dLayer._scaleUI$1 = new TriangleList();
  Object3dLayer._scaleUI$1.depthBuffered = false;
  Object3dLayer._scaleUI$1.timeSeries = false;
  Object3dLayer._scaleUI$1.writeZbuffer = false;
  const twoPi = Math.PI * 2;
  const step = twoPi / 45;
  const rad = 0.05;
  Object3dLayer._makeCube$1(Object3dLayer._scaleUI$1, Vector3d.create(1 - rad * 2, 0, 0), rad * 2, Colors.get_red());
  Object3dLayer._makeCube$1(Object3dLayer._scaleUI$1, Vector3d.create(0, 1 - rad * 2, 0), rad * 2, Colors.get_green());
  Object3dLayer._makeCube$1(Object3dLayer._scaleUI$1, Vector3d.create(0, 0, 1 - rad * 2), rad * 2, Colors.get_blue());
};
Object3dLayer._makeCube$1 = function(tl, center, size, color) {
  const dark = Color.fromArgb(255, ss.truncate((color.r * 0.6)), color.g, ss.truncate((color.b * 0.6)));
  const med = Color.fromArgb(255, ss.truncate((color.r * 0.8)), ss.truncate((color.g * 0.8)), ss.truncate((color.b * 0.8)));
  tl.addQuad(Vector3d.create(center.x + size, center.y + size, center.z + size), Vector3d.create(center.x + size, center.y + size, center.z - size), Vector3d.create(center.x - size, center.y + size, center.z + size), Vector3d.create(center.x - size, center.y + size, center.z - size), color, Dates.empty());
  tl.addQuad(Vector3d.create(center.x + size, center.y - size, center.z + size), Vector3d.create(center.x - size, center.y - size, center.z + size), Vector3d.create(center.x + size, center.y - size, center.z - size), Vector3d.create(center.x - size, center.y - size, center.z - size), color, Dates.empty());
  tl.addQuad(Vector3d.create(center.x - size, center.y + size, center.z + size), Vector3d.create(center.x - size, center.y + size, center.z - size), Vector3d.create(center.x - size, center.y - size, center.z + size), Vector3d.create(center.x - size, center.y - size, center.z - size), dark, Dates.empty());
  tl.addQuad(Vector3d.create(center.x + size, center.y + size, center.z + size), Vector3d.create(center.x + size, center.y - size, center.z + size), Vector3d.create(center.x + size, center.y + size, center.z - size), Vector3d.create(center.x + size, center.y - size, center.z - size), dark, Dates.empty());
  tl.addQuad(Vector3d.create(center.x + size, center.y + size, center.z + size), Vector3d.create(center.x - size, center.y + size, center.z + size), Vector3d.create(center.x + size, center.y - size, center.z + size), Vector3d.create(center.x - size, center.y - size, center.z + size), med, Dates.empty());
  tl.addQuad(Vector3d.create(center.x + size, center.y + size, center.z - size), Vector3d.create(center.x + size, center.y - size, center.z - size), Vector3d.create(center.x - size, center.y + size, center.z - size), Vector3d.create(center.x - size, center.y - size, center.z - size), med, Dates.empty());
};
Object3dLayer._initRotateUI$1 = function() {
  Object3dLayer._rotateUi$1 = new TriangleList();
  Object3dLayer._rotateUi$1.depthBuffered = false;
  Object3dLayer._rotateUi$1.timeSeries = false;
  Object3dLayer._rotateUi$1.writeZbuffer = false;
  const twoPi = Math.PI * 2;
  const step = twoPi / 40;
  const rad = 0.05;
  let index = 0;
  let a,start,end,pnt1,pnt2,pnt3,pnt4;
  for (a = 0; a < twoPi; a += step) {
    start = !(index % 10);
    end = !((index + 1) % 10);
    pnt1 = Vector3d.create(rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
    pnt2 = Vector3d.create(-rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
    pnt3 = Vector3d.create(rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
    pnt4 = Vector3d.create(-rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
    Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Color._fromArgbColor(192, Colors.get_red()), Dates.empty());
    index++;
  }
  index = 0;
  for (a = 0; a < twoPi; a += step) {
    start = !(index % 10);
    end = !((index + 1) % 10);
    pnt1 = Vector3d.create(Math.cos(a), Math.sin(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
    pnt2 = Vector3d.create(Math.cos(a), Math.sin(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
    pnt3 = Vector3d.create(Math.cos(a + step), Math.sin(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
    pnt4 = Vector3d.create(Math.cos(a + step), Math.sin(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
    Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Color._fromArgbColor(192, Colors.get_blue()), Dates.empty());
    index++;
  }
  index = 0;
  for (a = 0; a < twoPi; a += step) {
    start = !(index % 10);
    end = !((index + 1) % 10);
    pnt1 = Vector3d.create(Math.cos(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
    pnt2 = Vector3d.create(Math.cos(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
    pnt3 = Vector3d.create(Math.cos(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
    pnt4 = Vector3d.create(Math.cos(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
    Object3dLayer._rotateUi$1.addQuad(pnt1, pnt2, pnt3, pnt4, Color._fromArgbColor(192, Colors.get_green()), Dates.empty());
    index++;
  }
  index = 0;
  for (a = 0; a < twoPi; a += step) {
    start = !(index % 10);
    end = !((index + 1) % 10);
    pnt1 = Vector3d.create(-rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
    pnt2 = Vector3d.create(rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.cos(a), Math.sin(a));
    pnt3 = Vector3d.create(-rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
    pnt4 = Vector3d.create(rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.cos(a + step), Math.sin(a + step));
    Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Colors.get_red(), Dates.empty());
    index++;
  }
  index = 0;
  for (a = 0; a < twoPi; a += step) {
    start = !(index % 10);
    end = !((index + 1) % 10);
    pnt1 = Vector3d.create(Math.cos(a), Math.sin(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
    pnt2 = Vector3d.create(Math.cos(a), Math.sin(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)));
    pnt3 = Vector3d.create(Math.cos(a + step), Math.sin(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
    pnt4 = Vector3d.create(Math.cos(a + step), Math.sin(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)));
    Object3dLayer._rotateUi$1.addQuad(pnt1, pnt3, pnt2, pnt4, Colors.get_blue(), Dates.empty());
    index++;
  }
  index = 0;
  for (a = 0; a < twoPi; a += step) {
    start = !(index % 10);
    end = !((index + 1) % 10);
    pnt1 = Vector3d.create(Math.cos(a), -rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
    pnt2 = Vector3d.create(Math.cos(a), rad * ((start) ? 0 : ((end) ? 1.5 : 1)), Math.sin(a));
    pnt3 = Vector3d.create(Math.cos(a + step), -rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
    pnt4 = Vector3d.create(Math.cos(a + step), rad * ((start) ? 1.5 : ((end) ? 0 : 1)), Math.sin(a + step));
    Object3dLayer._rotateUi$1.addQuad(pnt1, pnt2, pnt3, pnt4, Colors.get_green(), Dates.empty());
    index++;
  }
};
export const Object3dLayer$ = {
  getPrimaryUI: function () {
    if (this._primaryUI$1 == null) {
      this._primaryUI$1 = new Object3dLayerUI(this);
    }
    return this._primaryUI$1;
  },
  get_flipV: function () {
    return this._flipV$1;
  },
  set_flipV: function (value) {
    if (this._flipV$1 !== value) {
      this._flipV$1 = value;
      if (this.object3d != null) {
        this.object3d.flipV = this._flipV$1;
        this.object3d._reload();
      }
      this.version++;
    }
    return value;
  },
  get_flipHandedness: function () {
    return this._flipHandedness$1;
  },
  set_flipHandedness: function (value) {
    if (this._flipHandedness$1 !== value) {
      this._flipHandedness$1 = value;
      if (this.object3d != null) {
        this.object3d.flipHandedness = this._flipHandedness$1;
        this.object3d._reload();
      }
      this.version++;
    }
    return value;
  },
  get_smooth: function () {
    return this._smooth$1;
  },
  set_smooth: function (value) {
    if (this._smooth$1 !== value) {
      this._smooth$1 = value;
      if (this.object3d != null) {
        this.object3d.smooth = this._smooth$1;
        this.object3d._reload();
      }
      this.version++;
    }
    return value;
  },
  get_twoSidedGeometry: function () {
    return this._twoSidedGeometry$1;
  },
  set_twoSidedGeometry: function (value) {
    if (this._twoSidedGeometry$1 !== value) {
      this._twoSidedGeometry$1 = value;
      this.version++;
    }
    return value;
  },
  get_heading: function () {
    return this._heading$1;
  },
  set_heading: function (value) {
    if (this._heading$1 !== value) {
      this.version++;
      this._heading$1 = value;
    }
    return value;
  },
  get_pitch: function () {
    return this._pitch$1;
  },
  set_pitch: function (value) {
    if (this._pitch$1 !== value) {
      this.version++;
      this._pitch$1 = value;
    }
    return value;
  },
  get_roll: function () {
    return this._roll$1;
  },
  set_roll: function (value) {
    if (this._roll$1 !== value) {
      this.version++;
      this._roll$1 = value;
    }
    return value;
  },
  get_scale: function () {
    return this._scale$1;
  },
  set_scale: function (value) {
    if (this._scale$1 !== value) {
      this.version++;
      this._scale$1 = value;
    }
    return value;
  },
  get_translate: function () {
    return this._translate$1;
  },
  set_translate: function (value) {
    if (this._translate$1 !== value) {
      this.version++;
      this._translate$1 = value;
    }
    return value;
  },
  get_lightID: function () {
    return this._lightID$1;
  },
  set_lightID: function (value) {
    this._lightID$1 = value;
    return value;
  },
  cleanUp: function () {
    this._dirty$1 = true;
  },
  colorChanged: function () {
    if (this.object3d != null) {
      this.object3d.color = this.get_color();
    }
  },
  writeLayerProperties: function (xmlWriter) {
    xmlWriter._writeAttributeString('FlipV', this.get_flipV().toString());
    xmlWriter._writeAttributeString('FlipHandedness', this.get_flipHandedness().toString());
    xmlWriter._writeAttributeString('Smooth', this.get_smooth().toString());
    xmlWriter._writeAttributeString('TwoSidedGeometry', this.get_twoSidedGeometry().toString());
    xmlWriter._writeAttributeString('Heading', this.get_heading().toString());
    xmlWriter._writeAttributeString('Pitch', this.get_pitch().toString());
    xmlWriter._writeAttributeString('Roll', this.get_roll().toString());
    xmlWriter._writeAttributeString('Scale', this.get_scale().toString());
    xmlWriter._writeAttributeString('Translate', this.get_translate().toString());
    xmlWriter._writeAttributeString('LightID', this.get_lightID().toString());
    xmlWriter._writeAttributeString('Obj', this.objType.toString());
  },
  getParams: function () {
    const paramList = new Array(14);
    paramList[0] = this._heading$1;
    paramList[1] = this._pitch$1;
    paramList[2] = this._roll$1;
    paramList[3] = this._scale$1.x;
    paramList[4] = this._scale$1.y;
    paramList[5] = this._scale$1.z;
    paramList[6] = this._translate$1.x;
    paramList[7] = this._translate$1.y;
    paramList[8] = this._translate$1.z;
    paramList[9] = this.get_color().r / 255;
    paramList[10] = this.get_color().g / 255;
    paramList[11] = this.get_color().b / 255;
    paramList[12] = this.get_color().a / 255;
    paramList[13] = this.get_opacity();
    return paramList;
  },
  getParamNames: function () {
    return ['Heading', 'Pitch', 'Roll', 'Scale.X', 'Scale.Y', 'Scale.Z', 'Translate.X', 'Translate.Y', 'Translate.Z', 'Colors.Red', 'Colors.Green', 'Colors.Blue', 'Colors.Alpha', 'Opacity'];
  },
  setParams: function (paramList) {
    if (paramList.length === 14) {
      this._heading$1 = paramList[0];
      this._pitch$1 = paramList[1];
      this._roll$1 = paramList[2];
      this._scale$1.x = paramList[3];
      this._scale$1.y = paramList[4];
      this._scale$1.z = paramList[5];
      this._translate$1.x = paramList[6];
      this._translate$1.y = paramList[7];
      this._translate$1.z = paramList[8];
      this.set_opacity(paramList[13]);
      const color = Color.fromArgb(ss.truncate((paramList[12] * 255)), ss.truncate((paramList[9] * 255)), ss.truncate((paramList[10] * 255)), ss.truncate((paramList[11] * 255)));
      this.set_color(color);
    }
  },
  add_propertiesChanged: function (value) {
    this.__propertiesChanged$1 = ss.bindAdd(this.__propertiesChanged$1, value);
  },
  remove_propertiesChanged: function (value) {
    this.__propertiesChanged$1 = ss.bindSub(this.__propertiesChanged$1, value);
  },
  fireChanged: function () {
    if (this.__propertiesChanged$1 != null) {
      this.__propertiesChanged$1(this, new ss.EventArgs());
    }
  },
  getEditUI: function () {
    return ss.safeCast(this, IUiController);
  },
  initializeFromXml: function (node) {
    this.set_flipV(ss.boolean(node.attributes.getNamedItem('FlipV').nodeValue));
    if (node.attributes.getNamedItem('FlipHandedness') != null) {
      this.set_flipHandedness(ss.boolean(node.attributes.getNamedItem('FlipHandedness').nodeValue));
    } else {
      this.set_flipHandedness(false);
    }
    if (node.attributes.getNamedItem('Smooth') != null) {
      this.set_smooth(ss.boolean(node.attributes.getNamedItem('Smooth').nodeValue));
    } else {
      this.set_smooth(true);
    }
    if (node.attributes.getNamedItem('TwoSidedGeometry') != null) {
      this.set_twoSidedGeometry(ss.boolean(node.attributes.getNamedItem('TwoSidedGeometry').nodeValue));
    } else {
      this.set_twoSidedGeometry(false);
    }
    if (node.attributes.getNamedItem('Obj') != null) {
      this.objType = ss.boolean(node.attributes.getNamedItem('Obj').nodeValue);
    } else {
      this.objType = false;
    }
    this.set_heading(parseFloat(node.attributes.getNamedItem('Heading').nodeValue));
    this.set_pitch(parseFloat(node.attributes.getNamedItem('Pitch').nodeValue));
    this.set_roll(parseFloat(node.attributes.getNamedItem('Roll').nodeValue));
    this.set_scale(Vector3d.parse(node.attributes.getNamedItem('Scale').nodeValue));
    this.set_translate(Vector3d.parse(node.attributes.getNamedItem('Translate').nodeValue));
    if (node.attributes.getNamedItem('LightID') != null) {
      this.set_lightID(parseInt(node.attributes.getNamedItem('LightID').nodeValue));
    }
  },
  draw: function (renderContext, opacity, flat) {
    const oldWorld = renderContext.get_world();
    const rotation = Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d._rotationZ(-this._roll$1 / 180 * Math.PI), Matrix3d._rotationX(-this._pitch$1 / 180 * Math.PI)), Matrix3d._rotationY(this._heading$1 / 180 * Math.PI));
    renderContext.set_world(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(rotation, Matrix3d._scaling(this._scale$1.x, this._scale$1.y, this._scale$1.z)), Matrix3d.translation(this._translate$1)), oldWorld));
    renderContext.set_twoSidedLighting(this.get_twoSidedGeometry());
    Planets.drawPointPlanet(renderContext, new Vector3d(), 1, Colors.get_red(), false);
    if (this._lightID$1 > 0) {
    } else {
      if (this.object3d != null) {
        this.object3d.color = this.get_color();
        this.object3d.render(renderContext, opacity * this.get_opacity());
      }
    }
    renderContext.set_twoSidedLighting(false);
    renderContext.set_world(oldWorld);
    return true;
  },
  addFilesToCabinet: function (fc) {
  },
  loadData: function (doc, filename) {
    if (ss.endsWith(filename.toLowerCase(), '.obj')) {
      this.objType = true;
    }
    if (!this._lightID$1) {
      if (this.objType) {
        this.object3d = new Object3d(doc, ss.replaceString(filename, '.txt', '.obj'), this.get_flipV(), this._flipHandedness$1, true, this.get_color());
      } else {
        this.object3d = new Object3d(doc, ss.replaceString(filename, '.txt', '.3ds'), this.get_flipV(), this._flipHandedness$1, true, this.get_color());
      }
    }
  },
  pointToView: function (pnt) {
    const clientHeight = WWTControl.singleton.renderContext.height;
    const clientWidth = WWTControl.singleton.renderContext.width;
    const viewWidth = (WWTControl.singleton.renderContext.width / WWTControl.singleton.renderContext.height) * 1116;
    const x = ((pnt.x) / (clientWidth) * viewWidth) - ((viewWidth - 1920) / 2);
    const y = (pnt.y) / clientHeight * 1116;
    return Vector2d.create(x, y);
  },
  render: function (renderEngine) {
    this._showEditUi$1 = true;
    return;
  },
  preRender: function (renderEngine) {
    this._showEditUi$1 = true;
    return;
  },
  mouseDown: function (sender, e) {
    const location = this.pointToView(Vector2d.create(e.offsetX, e.offsetY));
    this._pntDown$1 = location;
    const pnt = location;
    if (e.shiftKey) {
      if (Vector2d.subtract(pnt, this._xHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 10;
        this._valueOnDown$1 = this._scale$1.x;
        return true;
      }
      if (Vector2d.subtract(pnt, this._yHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 10;
        this._valueOnDown$1 = this._scale$1.y;
        return true;
      }
      if (Vector2d.subtract(pnt, this._zHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 10;
        this._valueOnDown$1 = this._scale$1.z;
        return true;
      }
    } else {
      if (Vector2d.subtract(pnt, this._xHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 1;
        this._valueOnDown$1 = this._translate$1.x;
        return true;
      }
      if (Vector2d.subtract(pnt, this._yHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 2;
        this._valueOnDown$1 = this._translate$1.y;
        return true;
      }
      if (Vector2d.subtract(pnt, this._zHandle$1).get_length() < this._hitDist$1) {
        this._dragMode$1 = 3;
        this._valueOnDown$1 = this._translate$1.z;
        return true;
      }
    }
    for (let i = 0; i < this._hprHandles$1.length; i++) {
      if (Vector2d.subtract(pnt, this._hprHandles$1[i]).get_length() < this._hitDist$1) {
        switch (i) {
          case 0:
            this._dragMode$1 = 4;
            this._valueOnDown$1 = this._heading$1;
            this._valueOnDown2$1 = this._pitch$1;
            return true;
          case 1:
            this._dragMode$1 = 7;
            this._valueOnDown$1 = this._heading$1;
            this._valueOnDown2$1 = this._pitch$1;
            return true;
          case 2:
            this._dragMode$1 = 5;
            this._valueOnDown$1 = this._pitch$1;
            this._valueOnDown2$1 = this._roll$1;
            return true;
          case 3:
            this._dragMode$1 = 8;
            this._valueOnDown$1 = this._pitch$1;
            this._valueOnDown2$1 = this._roll$1;
            return true;
          case 4:
            this._dragMode$1 = 6;
            this._valueOnDown$1 = this._roll$1;
            this._valueOnDown2$1 = this._heading$1;
            return true;
          case 5:
            this._dragMode$1 = 9;
            this._valueOnDown$1 = this._roll$1;
            this._valueOnDown2$1 = this._heading$1;
            return true;
          default:
            break;
        }
      }
    }
    return false;
  },
  mouseUp: function (sender, e) {
    if (!!this._dragMode$1) {
      this._dragMode$1 = 0;
      this._lockPreferedAxis$1 = false;
      return true;
    }
    return false;
  },
  mouseMove: function (sender, e) {
    const location = this.pointToView(Vector2d.create(e.offsetX, e.offsetY));
    if (!!this._dragMode$1) {
      let dist = 0;
      const distX = location.x - this._pntDown$1.x;
      const distY = -(location.y - this._pntDown$1.y);
      if (this._lockPreferedAxis$1) {
        if (this._preferY$1) {
          dist = distY;
          this._preferY$1 = true;
          Cursor.set_current(Cursors.get_sizeNS());
        } else {
          dist = distX;
          this._preferY$1 = false;
          Cursor.set_current(Cursors.get_sizeWE());
        }
      } else {
        if (Math.abs(distX) > Math.abs(distY)) {
          dist = distX;
          this._preferY$1 = false;
        } else {
          dist = distY;
          this._preferY$1 = true;
        }
        if (dist > 5) {
          this._lockPreferedAxis$1 = true;
        }
      }
      switch (this._dragMode$1) {
        case 0:
          break;
        case 1:
          this._translate$1.x = this._valueOnDown$1 + (12 * this._uiScale$1 * (dist / WWTControl.singleton.renderContext.width));
          break;
        case 2:
          this._translate$1.y = this._valueOnDown$1 + (12 * this._uiScale$1 * (dist / WWTControl.singleton.renderContext.width));
          break;
        case 3:
          this._translate$1.z = this._valueOnDown$1 + (12 * this._uiScale$1 * (dist / WWTControl.singleton.renderContext.width));
          break;
        case 4:
          this._heading$1 = this._valueOnDown$1 - distX / 4;
          this._pitch$1 = this._valueOnDown2$1 + distY / 4;
          break;
        case 5:
          this._pitch$1 = this._valueOnDown$1 + distY / 4;
          this._roll$1 = this._valueOnDown2$1 - distX / 4;
          break;
        case 6:
          this._roll$1 = this._valueOnDown$1 + distY / 4;
          this._heading$1 = this._valueOnDown2$1 - distX / 4;
          break;
        case 7:
          this._heading$1 = this._valueOnDown$1 - distX / 4;
          this._pitch$1 = this._valueOnDown2$1 - distY / 4;
          break;
        case 8:
          this._pitch$1 = this._valueOnDown$1 + distY / 4;
          this._roll$1 = this._valueOnDown2$1 + distX / 4;
          break;
        case 9:
          this._roll$1 = this._valueOnDown$1 - distY / 4;
          this._heading$1 = this._valueOnDown2$1 - distX / 4;
          break;
        case 10:
          this._scale$1.x = this._scale$1.y = this._scale$1.z = this._valueOnDown$1 * Math.pow(2, (dist / 100));
          break;
        default:
          break;
      }
      this.fireChanged();
      return true;
    } else {
      const pnt = location;
      if (Vector2d.subtract(pnt, this._xHandle$1).get_length() < this._hitDist$1) {
        Cursor.set_current(Cursors.get_sizeAll());
        return true;
      }
      if (Vector2d.subtract(pnt, this._yHandle$1).get_length() < this._hitDist$1) {
        Cursor.set_current(Cursors.get_sizeAll());
        return true;
      }
      if (Vector2d.subtract(pnt, this._zHandle$1).get_length() < this._hitDist$1) {
        Cursor.set_current(Cursors.get_sizeAll());
        return true;
      }
      for (let i = 0; i < this._hprHandles$1.length; i++) {
        if (Vector2d.subtract(pnt, this._hprHandles$1[i]).get_length() < this._hitDist$1) {
          Cursor.set_current(Cursors.get_sizeAll());
          return true;
        }
      }
    }
    return false;
  },
  mouseClick: function (sender, e) {
    return false;
  },
  click: function (sender, e) {
    return false;
  },
  mouseDoubleClick: function (sender, e) {
    return false;
  },
  keyDown: function (sender, e) {
    return false;
  },
  keyUp: function (sender, e) {
    return false;
  },
  hover: function (pnt) {
    return false;
  }
};

