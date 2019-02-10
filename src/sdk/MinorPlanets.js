import {WebFile} from './WebFile';
import {EOE} from './astrocalc/AAElliptical';
import ss from './scriptsharp/ss';
import {Planets} from './Planets';
import {BlendState} from './BlendState';
import {Matrix3d, Vector3d} from './Double3d';
import {KeplerPointSpriteShader} from './Graphics/Shaders';
import {Colors} from './Color';
import {SpaceTimeController} from './SpaceTimeController';
import {KeplerVertexBuffer} from './Graphics/GIBuffer';
import {BinaryReader} from './Utilities/BinaryReader';
import {KeplerVertex} from './KeplerVertex';

export const MinorPlanets = {

  getMpcFile: url => {
    MinorPlanets._webMpcFile = new WebFile(url);
    MinorPlanets._webMpcFile.responseType = 'blob';
    MinorPlanets._webMpcFile.onStateChange = MinorPlanets.starFileStateChange;
    MinorPlanets._webMpcFile.send();
  },
  starFileStateChange: () => {
    if (MinorPlanets._webMpcFile.get_state() === 2) {
      alert(MinorPlanets._webMpcFile.get_message());
    } else if (MinorPlanets._webMpcFile.get_state() === 1) {
      const mainBlob = MinorPlanets._webMpcFile.getBlob();
      const chunck = new FileReader();
      chunck.onloadend = e => {
        MinorPlanets._readFromBin(new BinaryReader(new Uint8Array(chunck.result)));
        MinorPlanets.initMPCVertexBuffer();
      };
      chunck.readAsArrayBuffer(mainBlob);
    }
  },
  _readFromBin: br => {
    MinorPlanets.mpcList = [];
    const len = br.get_length();
    let ee;
    try {
      while (br.get_position() < len) {
        ee = EOE._create(br);
        MinorPlanets.mpcList.push(ee);
      }
    } catch ($e1) {
    }
    br.close();
  },
  drawMPC3D: (renderContext, opacity, centerPoint) => {
    const zoom = renderContext.viewCamera.zoom;
    const distAlpha = ((Math.log(Math.max(1, zoom)) / Math.log(4)) - 15.5) * 90;
    const alpha = Math.min(255, Math.max(0, ss.truncate(distAlpha)));
    if (alpha > 254) {
      return;
    }
    if (MinorPlanets._mpcVertexBuffer == null) {
      if (MinorPlanets.starTexture == null) {
        MinorPlanets.starTexture = Planets.loadPlanetTexture('//cdn.worldwidetelescope.org/webclient/images/starProfileAlpha.png');
      }
      for (let i = 0; i < 7; i++) {
        MinorPlanets._mpcBlendStates[i] = BlendState.create(false, 1000);
      }
      if (!MinorPlanets._initBegun) {
        MinorPlanets._startInit();
        MinorPlanets._initBegun = true;
      }
      return;
    }
    const offset = Matrix3d.translation(Vector3d.negate(centerPoint));
    const world = Matrix3d.multiplyMatrix(renderContext.get_world(), offset);
    const matrixWV = Matrix3d.multiplyMatrix(world, renderContext.get_view());
    const cam = Vector3d._transformCoordinate(renderContext.cameraPosition, Matrix3d.invertMatrix(renderContext.get_world()));
    if (MinorPlanets._mpcVertexBuffer != null) {
      for (let i = 0; i < 7; i++) {
        MinorPlanets._mpcBlendStates[i].set_targetState(true);
        if (MinorPlanets._mpcBlendStates[i].get_state()) {
          KeplerPointSpriteShader.use(renderContext, matrixWV, MinorPlanets._mpcVertexBuffer[i].vertexBuffer, MinorPlanets.starTexture.texture2d, Colors.get_white(), opacity * MinorPlanets._mpcBlendStates[i].get_opacity(), false, (SpaceTimeController.get_jNow() - KeplerVertex.baseDate), 0, renderContext.cameraPosition, 200, 0.1);
          renderContext.gl.drawArrays(0, 0, MinorPlanets._mpcVertexBuffer[i].count);
        }
      }
    }
  },
  _startInit: () => {
    MinorPlanets.getMpcFile('//cdn.worldwidetelescope.org/wwtweb/catalog.aspx?Q=mpcbin');
  },
  initMPCVertexBuffer: () => {
    try {
      if (MinorPlanets._mpcVertexBuffer == null) {
        const mpcVertexBufferTemp = new Array(7);
        MinorPlanets._mpcCount = MinorPlanets.mpcList.length;
        const lists = new Array(7);
        for (let i = 0; i < 7; i++) {
          lists[i] = [];
        }
        const $enum1 = ss.enumerate(MinorPlanets.mpcList);
        while ($enum1.moveNext()) {
          const ee = $enum1.current;
          let listID = 0;
          if (ee.a < 2.5) {
            listID = 0;
          } else if (ee.a < 2.83) {
            listID = 1;
          } else if (ee.a < 2.96) {
            listID = 2;
          } else if (ee.a < 3.3) {
            listID = 3;
          } else if (ee.a < 5) {
            listID = 4;
          } else if (ee.a < 10) {
            listID = 5;
          } else {
            listID = 6;
          }
          const vert = new KeplerVertex();
          vert.fill(ee);
          lists[listID].push(vert);
        }
        for (let i = 0; i < 7; i++) {
          mpcVertexBufferTemp[i] = KeplerVertexBuffer.create(lists[i]);
          mpcVertexBufferTemp[i].unlock();
        }
        MinorPlanets._mpcVertexBuffer = mpcVertexBufferTemp;
      }
    } finally {
    }
  }
};
