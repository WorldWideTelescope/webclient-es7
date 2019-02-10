import {Planets} from './Planets';
import {PositionTextureVertexBuffer} from './Graphics/GIBuffer';
import {Coordinates} from './Coordinates';
import {SpaceTimeController} from './SpaceTimeController';
import {Matrix3d, PositionTexture, Vector3d} from './Double3d';
import {Tile} from './Tile';
import {ImageShader} from './Graphics/Shaders';
import ss from './scriptsharp/ss';
import {Dates, PointList, SimpleLineList} from './Graphics/Primative3d';
import {WebFile} from './WebFile';
import {Colors} from './Color';
import {WWTControl} from './WWTControl';
import {DT} from './astrocalc/AADate';
import {CT} from './astrocalc/AACoordinateTransformation';
import {Star} from './Star';

export function Grids() {}
Grids._createGalaxyImage = renderContext => {
  if (Grids._milkyWayImage == null) {
    Grids._milkyWayImage = Planets.loadPlanetTexture('//cdn.worldwidetelescope.org/webclient/images/milkywaybar.jpg');
  }
  const subdivs = 50;
  let lat, lng;
  let index = 0;
  const latMin = 64;
  const latMax = -64;
  const lngMin = -64;
  const lngMax = 64;
  Grids._galaxyImageVertexBuffer = new PositionTextureVertexBuffer((subdivs + 1) * (subdivs + 1));
  const verts = Grids._galaxyImageVertexBuffer.lock();
  let x1, y1;
  const latDegrees = latMax - latMin;
  const lngDegrees = lngMax - lngMin;
  const scaleFactor = 60800000;
  const ecliptic = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow()) / 180 * Math.PI;
  let point;
  const textureStepX = 1 / subdivs;
  const textureStepY = 1 / subdivs;
  for (y1 = 0; y1 <= subdivs; y1++) {
    if (y1 !== subdivs) {
      lat = latMax - (textureStepY * latDegrees * y1);
    }
    else {
      lat = latMin;
    }
    for (x1 = 0; x1 <= subdivs; x1++) {
      if (x1 !== subdivs) {
        lng = lngMin + (textureStepX * lngDegrees * x1);
      }
      else {
        lng = lngMax;
      }
      index = y1 * (subdivs + 1) + x1;
      point = Vector3d.create(lng * scaleFactor, 0, (lat - 28) * scaleFactor);
      point.rotateY(213 / 180 * Math.PI);
      point.rotateZ((-62.87175) / 180 * Math.PI);
      point.rotateY((-192.8595083) / 180 * Math.PI);
      point.rotateX(ecliptic);
      verts[index] = PositionTexture.createPosRaw(point, (1 - x1 * textureStepX), (y1 * textureStepY));
    }
  }
  Grids._galaxyImageVertexBuffer.unlock();
  Grids._galaxyImageTriangleCount = subdivs * subdivs * 2;
  const ui16array = new Uint16Array(subdivs * subdivs * 6);
  const indexArray = ui16array;
  for (y1 = 0; y1 < subdivs; y1++) {
    for (x1 = 0; x1 < subdivs; x1++) {
      index = (y1 * subdivs * 6) + 6 * x1;
      indexArray[index] = (y1 * (subdivs + 1) + x1);
      indexArray[index + 2] = ((y1 + 1) * (subdivs + 1) + x1);
      indexArray[index + 1] = (y1 * (subdivs + 1) + (x1 + 1));
      indexArray[index + 3] = (y1 * (subdivs + 1) + (x1 + 1));
      indexArray[index + 5] = ((y1 + 1) * (subdivs + 1) + x1);
      indexArray[index + 4] = ((y1 + 1) * (subdivs + 1) + (x1 + 1));
    }
  }
  Grids._galaxyImageIndexBuffer = Tile.prepDevice.createBuffer();
  Tile.prepDevice.bindBuffer(34963, Grids._galaxyImageIndexBuffer);
  Tile.prepDevice.bufferData(34963, ui16array, 35044);
};
Grids.drawGalaxyImage = (renderContext, opacity) => {
  if (Grids._galaxyImageIndexBuffer == null) {
    Grids._createGalaxyImage(renderContext);
  }
  const zoom = renderContext.viewCamera.zoom;
  const log = Math.log(Math.max(1, zoom)) / Math.log(4);
  const distAlpha = (log - 14) * 128;
  const alpha = (Math.min(255, Math.max(0, distAlpha)) * opacity);
  ImageShader.use(renderContext, Grids._galaxyImageVertexBuffer.vertexBuffer, Grids._galaxyImageIndexBuffer, Grids._milkyWayImage.texture2d, opacity, true);
  renderContext.gl.drawElements(4, Grids._galaxyImageTriangleCount * 3, 5123, 0);
};
Grids.drawStars3D = (renderContext, opacity) => {
  const zoom = renderContext.viewCamera.zoom;
  const distAlpha = Math.max(Math.min(255, (Math.log(zoom) - 15.5) * 40.8), 0);
  let alpha = Math.min(255, Math.max(0, ss.truncate(distAlpha)));
  if (alpha > 254) {
    return;
  }
  alpha = ((255 - alpha) * opacity);
  if (Grids._starSprites == null) {
    Grids.initStarVertexBuffer(renderContext);
  }
  if (Grids._starSprites != null) {
    Grids._starSprites.draw(renderContext, alpha / 255, false);
  }
};
Grids.initStarVertexBuffer = renderContext => {
  if (!Grids._starsDownloading) {
    Grids.getStarFile('//worldwidetelescope.org/wwtweb/catalog.aspx?Q=hipparcos');
    Grids._starsDownloading = true;
  }
  if (Grids._starSprites == null && Grids._starCount > 0) {
    const ecliptic = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow()) / 180 * Math.PI;
    const count = Grids._stars.length;
    Grids._starCount = count;
    Grids._starSprites = new PointList(renderContext);
    Grids._starSprites.depthBuffered = false;
    Grids._starSprites.showFarSide = true;
    const $enum1 = ss.enumerate(Grids._stars);
    while ($enum1.moveNext()) {
      const star = $enum1.current;
      const pos = Coordinates.raDecTo3dAu(star.RA, star.dec, star.distance);
      pos.rotateX(ecliptic);
      star.position = pos;
      const radDec = (1200000) / Math.pow(1.6, star.absoluteMagnitude);
      Grids._starSprites.addPoint(pos, star.col, new Dates(0, 1), radDec * 100);
    }
  }
};
Grids.initializeStarDB = text => {
  if (Grids._stars == null) {
    if (Grids._stars == null) {
      Grids._stars = [];
      const rows = text.split('\r\n');
      let star;
      const $enum1 = ss.enumerate(rows);
      while ($enum1.moveNext()) {
        const row = $enum1.current;
        const line = row;
        star = new Star(line);
        if (star.magnitude < Grids._limitingMagnitude && star.par > 0.001) {
          Grids._stars.push(star);
          Grids._hipparcosIndex[star.id] = star;
        }
      }
      Grids._starCount = Grids._stars.length;
    }
  }
};
Grids.getStarFile = url => {
  Grids._webFileStar = new WebFile(url);
  Grids._webFileStar.onStateChange = Grids.starFileStateChange;
  Grids._webFileStar.send();
};
Grids.starFileStateChange = () => {
  if (Grids._webFileStar.get_state() === 2) {
    alert(Grids._webFileStar.get_message());
  }
  else if (Grids._webFileStar.get_state() === 1) {
    Grids.initializeStarDB(Grids._webFileStar.getText());
  }
};
Grids.getGalaxyFile = url => {
  Grids._webFileGalaxy = new WebFile(url);
  Grids._webFileGalaxy.responseType = 'blob';
  Grids._webFileGalaxy.onStateChange = Grids.galaxyFileStateChange;
  Grids._webFileGalaxy.send();
};
Grids.galaxyFileStateChange = () => {
  if (Grids._webFileGalaxy.get_state() === 2) {
    alert(Grids._webFileGalaxy.get_message());
  }
  else if (Grids._webFileGalaxy.get_state() === 1) {
    const mainBlob = Grids._webFileGalaxy.getBlob();
    const chunck = new FileReader();
    chunck.onloadend = e => {
      const br = new BinaryReader(new Uint8Array(chunck.result));
      Grids.initializeCosmos(br);
    };
    chunck.readAsArrayBuffer(mainBlob);
  }
};
Grids.drawCosmos3D = (renderContext, opacity) => {
  const device = renderContext.gl;
  const zoom = renderContext.viewCamera.zoom;
  const distAlpha = ((Math.log(Math.max(1, zoom)) / Math.log(4)) - 15.5) * 90;
  const alpha = Math.min(255, Math.max(0, ss.truncate(distAlpha)));
  if (alpha < 3) {
    return;
  }
  Grids.initCosmosVertexBuffer();
  if (Grids._galaxyTextures == null) {
    if (Grids._largeSet) {
      Grids._galaxyTextures = new Array(256);
      for (let i = 0; i < 256; i++) {
        let num = i.toString();
        while (num.length < 4) {
          num = '0' + num;
        }
        const name = ss.format('//cdn.worldwidetelescope.org/webclient/images/gal_{0}.jpg', num);
        Grids._galaxyTextures[i] = Planets.loadPlanetTexture(name);
      }
    }
  }
  if (Grids._cosmosReady) {
    const count = 256;
    for (let i = 0; i < count; i++) {
      Grids._cosmosSprites[i].drawTextured(renderContext, Grids._galaxyTextures[i].texture2d, (alpha * opacity) / 255);
    }
  }
};
Grids.initCosmosVertexBuffer = () => {
  if (Grids._cosmosSprites == null) {
    Grids._downloadCosmosFile();
  }
};
Grids._createCosmosVertexBuffer = renderContext => {
  const device = Tile.prepDevice;
  const bucketCount = 256;
  if (Grids._cosmosSprites != null) {
    for (let ij = 0; ij < bucketCount; ij++) {
      if (Grids._cosmosSprites[ij] != null) {
        Grids._cosmosSprites[ij] = null;
      }
    }
  }
  Grids._cosmosSprites = null;
  const ecliptic = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow()) / 180 * Math.PI;
  Grids._cosmosSprites = new Array(bucketCount);
  const indexList = new Array(bucketCount);
  for (let i = 0; i < bucketCount; i++) {
    const count = Grids._galaxyVertexCounts[i];
    Grids._cosmosSprites[i] = new PointList(renderContext);
    Grids._cosmosSprites[i].depthBuffered = false;
    Grids._cosmosSprites[i].showFarSide = true;
    indexList[i] = 0;
  }
  const $enum1 = ss.enumerate(Grids._cosmos);
  while ($enum1.moveNext()) {
    const galaxy = $enum1.current;
    const bucket = galaxy.eTypeBucket;
    const index = indexList[bucket];
    const pos = Coordinates.raDecTo3dAu(galaxy.RA, galaxy.dec, (galaxy.distance * 206264.806 * 1000000) / 0.73);
    pos.rotateX(ecliptic);
    galaxy.position = pos;
    Grids._cosmosSprites[bucket].addPoint(pos, Colors.get_white(), new Dates(0, 1), (1E+09 * galaxy.size * 100));
    indexList[bucket]++;
  }
  Grids._cosmosReady = true;
};
Grids.initializeCosmos = br => {
  const max = Math.pow(100, 2.849485002);
  if (Grids._cosmos == null) {
    Grids._galaxyVertexCounts = new Array((Grids._largeSet) ? 256 : 20);
    if (Grids._cosmos == null) {
      Grids._cosmos = [];
      let galaxy;
      try {
        let count = 0;
        while (br.get_position() < br.get_length()) {
          galaxy = new Galaxy(br);
          Grids._cosmos.push(galaxy);
          Grids._galaxyVertexCounts[galaxy.eTypeBucket]++;
          count++;
        }
      }
      catch ($e1) {
      }
      br.close();
    }
    Grids._createCosmosVertexBuffer(WWTControl.singleton.renderContext);
  }
};
Grids._downloadCosmosFile = () => {
  if (!Grids._downloadingGalaxy) {
    Grids.getGalaxyFile('//worldwidetelescope.org/wwtweb/catalog.aspx?Q=cosmosnewbin');
    Grids._downloadingGalaxy = true;
  }
  return false;
};
Grids.drawEquitorialGrid = (renderContext, opacity, drawColor) => {
  if (Grids._equLineList == null) {
    Grids._equLineList = new SimpleLineList();
    Grids._equLineList.set_depthBuffered(false);
    for (let hour = 0; hour < 24; hour++) {
      for (let dec = -80; dec < 80; dec += 2) {
        Grids._equLineList.addLine(Coordinates.raDecTo3dAu(hour, dec, 1), Coordinates.raDecTo3dAu(hour, dec + 2, 1));
      }
    }
    for (let dec = -80; dec <= 80; dec += 10) {
      for (let hour = 0; hour < 23.8; hour += 0.2) {
        Grids._equLineList.addLine(Coordinates.raDecTo3dAu(hour, dec, 1), Coordinates.raDecTo3dAu(hour + 0.2, dec, 1));
      }
    }
    let counter = 0;
    for (let ra = 0; ra < 24; ra += 0.25) {
      let dec = 0.5;
      switch (counter % 4) {
        case 0:
          counter++;
          continue;
        case 3:
        case 1:
          dec = 0.25;
          break;
      }
      counter++;
      Grids._equLineList.addLine(Coordinates.raDecTo3dAu(ra, dec, 1), Coordinates.raDecTo3dAu(ra, -dec, 1));
    }
    counter = 0;
    for (let ra = 0; ra < 24; ra += 3) {
      counter = 0;
      for (let dec = -80; dec <= 80; dec += 1) {
        let width = 0.5 / 30;
        switch (counter % 10) {
          case 0:
            counter++;
            continue;
          case 5:
            width = 0.5 / 15;
            break;
        }
        counter++;
        Grids._equLineList.addLine(Coordinates.raDecTo3dAu(ra + width, dec, 1), Coordinates.raDecTo3dAu(ra - width, dec, 1));
      }
    }
  }
  Grids._equLineList.drawLines(renderContext, opacity, drawColor);
  return true;
};
Grids.drawEquitorialGridText = (renderContext, opacity, drawColor) => {
  Grids._makeEquitorialGridText();
  Grids._equTextBatch.draw(renderContext, opacity, drawColor);
  return true;
};
Grids._makeEquitorialGridText = () => {
  if (Grids._equTextBatch == null) {
    let text;
    Grids._equTextBatch = new Text3dBatch(30);
    let index = 0;
    for (let ra = 0; ra < 24; ra++) {
      text = ra.toString() + ' hr';
      if (ra < 10) {
        text = '  ' + ra.toString() + ' hr';
      }
      Grids._equTextBatch.add(new Text3d(Coordinates.raDecTo3dAu(ra + 0.005, 0.4, 1), Coordinates.raDecTo3dAu(ra + 0.005, 0.5, 1), text, 45, 0.00018));
    }
    index = 0;
    for (let ra = 0; ra < 24; ra += 3) {
      for (let dec = -80; dec <= 80; dec += 10) {
        if (!dec) {
          continue;
        }
        text = dec.toString();
        if (dec > 0) {
          text = '  +' + dec.toString();
          Grids._equTextBatch.add(new Text3d(Coordinates.raDecTo3dAu(ra, dec - 0.4, 1), Coordinates.raDecTo3dAu(ra, dec - 0.3, 1), text, 45, 0.00018));
        }
        else {
          text = '  - ' + text.substr(1);
          Grids._equTextBatch.add(new Text3d(Coordinates.raDecTo3dAu(ra, dec + 0.4, 1), Coordinates.raDecTo3dAu(ra, dec + 0.5, 1), text, 45, 0.00018));
        }
        index++;
      }
    }
  }
};
Grids.drawEcliptic = (renderContext, opacity, drawColor) => {
  const col = drawColor;
  const year = SpaceTimeController.get_now().getUTCFullYear();
  if (Grids._eclipticOverviewLineList == null || year !== Grids._eclipticYear) {
    if (Grids._eclipticOverviewLineList != null) {
      Grids._eclipticOverviewLineList.clear();
      Grids._eclipticOverviewLineList = null;
    }
    Grids._eclipticYear = year;
    const obliquity = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow());
    const mat = Matrix3d._rotationX((-obliquity / 360 * (Math.PI * 2)));
    let daysPerYear = 365.25;
    if (DT.isLeap(year, true)) {
      Grids._monthDays[1] = 29;
      daysPerYear = 366;
    }
    else {
      Grids._monthDays[1] = 28;
      daysPerYear = 365;
    }
    const count = 2 * ss.truncate(daysPerYear);
    Grids._eclipticCount = ss.truncate(daysPerYear);
    let jYear = SpaceTimeController.utcToJulian(new Date(year, 0, 1, 12, 0, 0));
    let index = 0;
    let d = 0;
    Grids._eclipticOverviewLineList = new SimpleLineList();
    Grids._eclipticOverviewLineList.set_depthBuffered(false);
    for (let m = 0; m < 12; m++) {
      const daysThisMonth = ss.truncate(Grids._monthDays[m]);
      for (let i = 0; i < daysThisMonth; i++) {
        const sunRaDec = Planets.getPlanetLocationJD('Sun', jYear);
        const sunEcliptic = CT.eq2Ec(sunRaDec.RA, sunRaDec.dec, obliquity);
        d = sunEcliptic.x;
        let width = 0.005;
        if (!i) {
          width = 0.01;
        }
        const dd = d;
        Grids._eclipticOverviewLineList.addLine(Vector3d._transformCoordinate(Vector3d.create(Math.cos((dd * Math.PI * 2) / 360), width, Math.sin((dd * Math.PI * 2) / 360)), mat), Vector3d._transformCoordinate(Vector3d.create(Math.cos((dd * Math.PI * 2) / 360), -width, Math.sin((dd * Math.PI * 2) / 360)), mat));
        index++;
        jYear += 1;
      }
      d += Grids._monthDays[m];
    }
  }
  Grids._eclipticOverviewLineList.drawLines(renderContext, opacity, drawColor);
  return true;
};
Grids.drawEclipticText = (renderContext, opacity, drawColor) => {
  Grids._makeEclipticText();
  Grids._eclipOvTextBatch.draw(renderContext, opacity, drawColor);
  return true;
};
Grids._makeEclipticText = () => {
  const year = SpaceTimeController.get_now().getUTCFullYear();
  if (Grids._eclipOvTextBatch == null) {
    Grids._eclipOvTextBatch = new Text3dBatch(80);
    Grids._eclipticTextYear = year;
    const obliquity = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow());
    const mat = Matrix3d._rotationX((-obliquity / 360 * (Math.PI * 2)));
    let daysPerYear = 365.25;
    if (DT.isLeap(year, true)) {
      Grids._monthDays[1] = 29;
      daysPerYear = 366;
    }
    else {
      Grids._monthDays[1] = 28;
      daysPerYear = 365;
    }
    const count = 2 * ss.truncate(daysPerYear);
    Grids._eclipticCount = ss.truncate(daysPerYear);
    let jYear = SpaceTimeController.utcToJulian(new Date(year, 0, 1, 12, 0, 0));
    let index = 0;
    let d = 0;
    for (let m = 0; m < 12; m++) {
      const daysThisMonth = ss.truncate(Grids._monthDays[m]);
      for (let i = 0; i < daysThisMonth; i++) {
        const sunRaDec = Planets.getPlanetLocationJD('Sun', jYear);
        const sunEcliptic = CT.eq2Ec(sunRaDec.RA, sunRaDec.dec, obliquity);
        d = sunEcliptic.x;
        const dd = d;
        if (i === Math.floor(daysThisMonth / 2)) {
          const center = Vector3d._transformCoordinate(Vector3d.create(Math.cos((dd * Math.PI * 2) / 360), 0.025, Math.sin((dd * Math.PI * 2) / 360)), mat);
          const up = Vector3d._transformCoordinate(Vector3d.create(Math.cos((dd * Math.PI * 2) / 360), 0.045, Math.sin((dd * Math.PI * 2) / 360)), mat);
          up.subtract(center);
          up.normalize();
          Grids._eclipOvTextBatch.add(new Text3d(center, up, Grids._monthNames[m], 80, 0.000159375));
        }
        index++;
        index++;
        jYear += 1;
      }
      d += Grids._monthDays[m];
    }
  }
};
Grids.drawPrecessionChart = (renderContext, opacity, drawColor) => {
  Grids._makePrecessionChart();
  Grids._precTextBatch.draw(renderContext, opacity, drawColor);
  Grids._precLineList.drawLines(renderContext, opacity, drawColor);
  return true;
};
Grids._makePrecessionChart = () => {
  const obliquity = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow());
  const mat = Matrix3d._rotationX((obliquity / 360 * (Math.PI * 2)));
  const col = Colors.get_white();
  if (Grids._precLineList == null) {
    Grids._precLineList = new SimpleLineList();
    Grids._precLineList.set_depthBuffered(false);
    for (let l = 0; l < 360; l++) {
      let b = 90 - obliquity;
      Grids._precLineList.addLine(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu((l + 1) / 15, b, 1), mat));
    }
    for (let l = -12000; l < 13000; l += 2000) {
      let b = 90 - obliquity;
      let p = -((l - 2000) / 25772 * 24) - 6;
      Grids._precLineList.addLine(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(p, b - 0.5, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(p, b + 0.5, 1), mat));
    }
  }
  if (Grids._precTextBatch == null) {
    Grids._precTextBatch = new Text3dBatch(50);
    const index = 0;
    for (let l = -12000; l < 13000; l += 2000) {
      let b = 90 - obliquity + 3;
      let p = -((l - 2000) / 25772 * 24) - 6;
      let text = l.toString();
      if (!l) {
        b = 90 - obliquity + 2;
        text = '1 CE';
      }
      else if (l < 0) {
        text = '  ' + Math.abs(l).toString() + ' BCE';
      }
      else {
        text = Math.abs(l).toString() + ' CE';
      }
      if (text.length === 9) {
        text = '   ' + text;
      }
      Grids._precTextBatch.add(new Text3d(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(p, b, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(p + 0.01, b, 1), mat), text, 75, 0.00015));
    }
  }
  return;
};
Grids.drawAltAzGrid = (renderContext, opacity, drawColor) => {
  const zenithAltAz = new Coordinates(0, 0);
  const zenith = Coordinates.horizonToEquitorial(zenithAltAz, SpaceTimeController.get_location(), SpaceTimeController.get_now());
  const raPart = -((zenith.get_RA() + 6) / 24 * (Math.PI * 2));
  const decPart = -(zenith.get_dec() / 360 * (Math.PI * 2));
  const raText = Coordinates.formatDMS(zenith.get_RA());
  const mat = Matrix3d._rotationY(-raPart);
  mat._multiply(Matrix3d._rotationX(decPart));
  mat.invert();
  if (Grids._altAzLineList == null) {
    Grids._altAzLineList = new SimpleLineList();
    Grids._altAzLineList.set_depthBuffered(false);
    for (let l = 0; l < 360; l += 10) {
      for (let b = -80; b < 80; b += 2) {
        Grids._altAzLineList.addLine(Coordinates.raDecTo3dAu(l / 15, b, 1), Coordinates.raDecTo3dAu(l / 15, b + 2, 1));
      }
    }
    for (let b = -80; b <= 80; b += 10) {
      for (let l = 0; l < 360; l += 5) {
        Grids._altAzLineList.addLine(Coordinates.raDecTo3dAu(l / 15, b, 1), Coordinates.raDecTo3dAu((l + 5) / 15, b, 1));
      }
    }
    let counter = 0;
    for (let l = 0; l < 360; l += 1) {
      let b = 0.25;
      switch (counter % 10) {
        case 0:
          counter++;
          continue;
        case 5:
          b = 0.5;
          break;
      }
      counter++;
      Grids._altAzLineList.addLine(Coordinates.raDecTo3dAu(l / 15, b, 1), Coordinates.raDecTo3dAu(l / 15, -b, 1));
    }
    counter = 0;
    for (let l = 0; l < 360; l += 90) {
      counter = 0;
      for (let b = -80; b <= 80; b += 1) {
        let width = 0.5 / 2;
        switch (counter % 10) {
          case 0:
            counter++;
            continue;
          case 5:
            width = 0.5;
            break;
        }
        counter++;
        Grids._altAzLineList.addLine(Coordinates.raDecTo3dAu((l + width) / 15, b, 1), Coordinates.raDecTo3dAu((l - width) / 15, b, 1));
      }
    }
  }
  const matOldWorld = renderContext.get_world().clone();
  const matOldWorldBase = renderContext.get_worldBase().clone();
  renderContext.set_worldBase(Matrix3d.multiplyMatrix(mat, renderContext.get_world()));
  renderContext.set_world(renderContext.get_worldBase().clone());
  renderContext.makeFrustum();
  Grids._altAzLineList.viewTransform = Matrix3d.invertMatrix(mat);
  Grids._altAzLineList.drawLines(renderContext, opacity, drawColor);
  renderContext.set_worldBase(matOldWorldBase);
  renderContext.set_world(matOldWorld);
  renderContext.makeFrustum();
  return true;
};
Grids.drawAltAzGridText = (renderContext, opacity, drawColor) => {
  const zenithAltAz = new Coordinates(0, 0);
  const zenith = Coordinates.horizonToEquitorial(zenithAltAz, SpaceTimeController.get_location(), SpaceTimeController.get_now());
  const raPart = -((zenith.get_RA() - 6) / 24 * (Math.PI * 2));
  const decPart = -(zenith.get_dec() / 360 * (Math.PI * 2));
  const raText = Coordinates.formatDMS(zenith.get_RA());
  const mat = Matrix3d._rotationY(-raPart - Math.PI);
  mat._multiply(Matrix3d._rotationX(decPart));
  mat.invert();
  Grids._makeAltAzGridText();
  const matOldWorld = renderContext.get_world().clone();
  const matOldWorldBase = renderContext.get_worldBase().clone();
  renderContext.set_worldBase(Matrix3d.multiplyMatrix(mat, renderContext.get_world()));
  renderContext.set_world(renderContext.get_worldBase().clone());
  renderContext.makeFrustum();
  Grids._altAzTextBatch.viewTransform = Matrix3d.invertMatrix(mat);
  Grids._altAzTextBatch.draw(renderContext, opacity, drawColor);
  renderContext.set_worldBase(matOldWorldBase);
  renderContext.set_world(matOldWorld);
  renderContext.makeFrustum();
  return true;
};
Grids._makeAltAzGridText = () => {
  const drawColor = Colors.get_white();
  let index = 0;
  if (Grids._altAzTextBatch == null) {
    Grids._altAzTextBatch = new Text3dBatch(30);
    for (let l = 0; l < 360; l += 10) {
      let text = '       ' + l.toString();
      if (l < 10) {
        text = '   ' + l.toString();
      }
      else if (l < 100) {
        text = '     ' + l.toString();
      }
      const lc = 360 - l;
      Grids._altAzTextBatch.add(new Text3d(Coordinates.raDecTo3dAu(lc / 15 - 6, 0.4, 1), Coordinates.raDecTo3dAu(lc / 15 - 6, 0.5, 1), text, 75, 0.00018));
    }
    index = 0;
    for (let l = 0; l < 360; l += 90) {
      for (let b = -80; b <= 80; b += 10) {
        if (!b) {
          continue;
        }
        let text = b.toString();
        if (b > 0) {
          text = '  +' + b.toString();
          Grids._altAzTextBatch.add(new Text3d(Coordinates.raDecTo3dAu(l / 15, b - 0.4, 1), Coordinates.raDecTo3dAu(l / 15, b - 0.3, 1), text, 75, 0.00018));
        }
        else {
          text = '  - ' + text.substr(1);
          Grids._altAzTextBatch.add(new Text3d(Coordinates.raDecTo3dAu(l / 15, b + 0.4, 1), Coordinates.raDecTo3dAu(l / 15, b + 0.5, 1), text, 75, 0.00018));
        }
        index++;
      }
    }
  }
  return;
};
Grids.drawEclipticGrid = (renderContext, opacity, drawColor) => {
  if (Grids._eclipticLineList == null) {
    Grids._eclipticLineList = new SimpleLineList();
    Grids._eclipticLineList.set_depthBuffered(false);
    const obliquity = Coordinates.meanObliquityOfEcliptic(2451545);
    const mat = Matrix3d._rotationX((-obliquity / 360 * (Math.PI * 2)));
    for (let l = 0; l < 360; l += 10) {
      for (let b = -80; b < 80; b += 2) {
        Grids._eclipticLineList.addLine(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b + 2, 1), mat));
      }
    }
    for (let b = -80; b <= 80; b += 10) {
      for (let l = 0; l < 360; l += 5) {
        Grids._eclipticLineList.addLine(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu((l + 5) / 15, b, 1), mat));
      }
    }
    let counter = 0;
    for (let l = 0; l < 360; l += 1) {
      let b = 0.25;
      switch (counter % 10) {
        case 0:
          counter++;
          continue;
        case 5:
          b = 0.5;
          break;
      }
      counter++;
      Grids._eclipticLineList.addLine(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, -b, 1), mat));
    }
    counter = 0;
    for (let l = 0; l < 360; l += 90) {
      counter = 0;
      for (let b = -80; b <= 80; b += 1) {
        let width = 0.5 / 2;
        switch (counter % 10) {
          case 0:
            counter++;
            continue;
          case 5:
            width = 0.5;
            break;
        }
        counter++;
        Grids._eclipticLineList.addLine(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu((l + width) / 15, b, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu((l - width) / 15, b, 1), mat));
      }
    }
  }
  Grids._eclipticLineList.drawLines(renderContext, opacity, drawColor);
  return true;
};
Grids.drawEclipticGridText = (renderContext, opacity, drawColor) => {
  Grids._makeEclipticGridText();
  Grids._eclipticTextBatch.draw(renderContext, opacity, drawColor);
  return true;
};
Grids._makeEclipticGridText = () => {
  const drawColor = Colors.get_white();
  const obliquity = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow());
  const mat = Matrix3d._rotationX((-obliquity / 360 * (Math.PI * 2)));
  if (Grids._eclipticTextBatch == null) {
    Grids._eclipticTextBatch = new Text3dBatch(30);
    for (let l = 0; l < 360; l += 10) {
      let text = '       ' + l.toString();
      if (l < 10) {
        text = '   ' + l.toString();
      }
      else if (l < 100) {
        text = '     ' + l.toString();
      }
      Grids._eclipticTextBatch.add(new Text3d(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, 0.4, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, 0.5, 1), mat), text, 75, 0.00018));
    }
    for (let l = 0; l < 360; l += 90) {
      for (let b = -80; b <= 80; b += 10) {
        if (!b) {
          continue;
        }
        let text = b.toString();
        if (b > 0) {
          text = '  +' + b.toString();
          Grids._eclipticTextBatch.add(new Text3d(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b - 0.4, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b - 0.3, 1), mat), text, 75, 0.00018));
        }
        else {
          text = '  - ' + text.substr(1);
          Grids._eclipticTextBatch.add(new Text3d(Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b + 0.4, 1), mat), Vector3d._transformCoordinate(Coordinates.raDecTo3dAu(l / 15, b + 0.5, 1), mat), text, 75, 0.00018));
        }
      }
    }
  }
  return;
};
Grids.drawGalacticGrid = (renderContext, opacity, drawColor) => {
  if (Grids._galLineList == null) {
    Grids._galLineList = new SimpleLineList();
    Grids._galLineList.set_depthBuffered(false);
    for (let l = 0; l < 360; l += 10) {
      for (let b = -80; b < 80; b += 2) {
        Grids._galLineList.addLine(Coordinates.galacticTo3dDouble(l, b), Coordinates.galacticTo3dDouble(l, b + 2));
      }
    }
    for (let b = -80; b <= 80; b += 10) {
      for (let l = 0; l < 360; l += 5) {
        Grids._galLineList.addLine(Coordinates.galacticTo3dDouble(l, b), Coordinates.galacticTo3dDouble(l + 5, b));
      }
    }
    let counter = 0;
    for (let l = 0; l < 360; l += 1) {
      let b = 0.25;
      switch (counter % 10) {
        case 0:
          counter++;
          continue;
        case 5:
          b = 0.5;
          break;
      }
      counter++;
      Grids._galLineList.addLine(Coordinates.galacticTo3dDouble(l, b), Coordinates.galacticTo3dDouble(l, -b));
    }
    counter = 0;
    for (let l = 0; l < 360; l += 90) {
      counter = 0;
      for (let b = -80; b <= 80; b += 1) {
        let width = 0.5 / 2;
        switch (counter % 10) {
          case 0:
            counter++;
            continue;
          case 5:
            width = 0.5;
            break;
        }
        counter++;
        Grids._galLineList.addLine(Coordinates.galacticTo3dDouble(l + width, b), Coordinates.galacticTo3dDouble(l - width, b));
      }
    }
  }
  Grids._galLineList.drawLines(renderContext, opacity, drawColor);
  return true;
};
Grids.drawGalacticGridText = (renderContext, opacity, drawColor) => {
  Grids._makeGalacticGridText();
  Grids._galTextBatch.draw(renderContext, opacity, drawColor);
  return true;
};
Grids._makeGalacticGridText = () => {
  if (Grids._galTextBatch == null) {
    Grids._galTextBatch = new Text3dBatch(30);
    for (let l = 0; l < 360; l += 10) {
      let text = '       ' + l.toString();
      if (l < 10) {
        text = '   ' + l.toString();
      }
      else if (l < 100) {
        text = '     ' + l.toString();
      }
      Grids._galTextBatch.add(new Text3d(Coordinates.galacticTo3dDouble(l, 0.4), Coordinates.galacticTo3dDouble(l, 0.5), text, 75, 0.00018));
    }
    for (let l = 0; l < 360; l += 90) {
      for (let b = -80; b <= 80; b += 10) {
        if (!b) {
          continue;
        }
        let text = b.toString();
        if (b > 0) {
          text = '  +' + b.toString();
          Grids._galTextBatch.add(new Text3d(Coordinates.galacticTo3dDouble(l, b - 0.4), Coordinates.galacticTo3dDouble(l, b - 0.3), text, 75, 0.00018));
        }
        else {
          text = '  - ' + text.substr(1);
          Grids._galTextBatch.add(new Text3d(Coordinates.galacticTo3dDouble(l, b + 0.4), Coordinates.galacticTo3dDouble(l, b + 0.5), text, 75, 0.00018));
        }
      }
    }
  }
};
Grids.drawPlanetGrid = (renderContext, opacity, drawColor) => {
  if (Grids._planetLineList == null) {
    Grids._planetLineList = new SimpleLineList();
    Grids._planetLineList.set_depthBuffered(true);
    const col = drawColor;
    for (let lng = 0; lng < 360; lng += 10) {
      for (let lat = -80; lat < 80; lat += 2) {
        Grids._planetLineList.addLine(Coordinates.geoTo3dDouble(lat, lng), Coordinates.geoTo3dDouble(lat + 2, lng));
      }
    }
    for (let lat = -80; lat <= 80; lat += 10) {
      for (let l = 0; l < 360; l += 5) {
        Grids._planetLineList.addLine(Coordinates.geoTo3dDouble(lat, l), Coordinates.geoTo3dDouble(lat, l + 5));
      }
    }
    let counter = 0;
    for (let lng = 0; lng < 360; lng += 1) {
      let lat = 0.25;
      switch (counter % 10) {
        case 0:
          counter++;
          continue;
        case 5:
          lat = 0.5;
          break;
      }
      counter++;
      Grids._planetLineList.addLine(Coordinates.geoTo3dDouble(lat, lng), Coordinates.geoTo3dDouble(-lat, lng));
    }
    counter = 0;
    for (let lng = 0; lng < 360; lng += 90) {
      counter = 0;
      for (let b = -80; b <= 80; b += 1) {
        let width = 0.5 / 2;
        switch (counter % 10) {
          case 0:
            counter++;
            continue;
          case 5:
            width = 0.5;
            break;
        }
        counter++;
        Grids._planetLineList.addLine(Coordinates.geoTo3dDouble(b, lng + width), Coordinates.geoTo3dDouble(b, lng - width));
      }
    }
  }
  Grids._planetLineList.aaFix = false;
  Grids._planetLineList.set_depthBuffered(true);
  Grids._planetLineList.sky = false;
  Grids._planetLineList.drawLines(renderContext, opacity, drawColor);
  return true;
};
Grids.drawPlanetGridText = (renderContext, opacity, drawColor) => {
  Grids._makePlanetGridText();
  Grids._planetTextBatch.draw(renderContext, opacity, drawColor);
  return true;
};
Grids._makePlanetGridText = () => {
  if (Grids._planetTextBatch == null) {
    Grids._planetTextBatch = new Text3dBatch(80);
    for (let lng = -180; lng < 180; lng += 10) {
      let text = '       ' + lng.toString();
      if (lng < 10) {
        text = '   ' + lng.toString();
      }
      else if (lng < 100) {
        text = '     ' + lng.toString();
      }
      Grids._planetTextBatch.add(new Text3d(Coordinates.geoTo3dDouble(0.4, lng), Coordinates.geoTo3dDouble(0.5, lng), text, -80, 6E-05));
    }
    for (let lng = 0; lng < 360; lng += 90) {
      for (let lat = -80; lat <= 80; lat += 10) {
        if (!lat) {
          continue;
        }
        let text = lat.toString();
        if (lat > 0) {
          text = '  +' + lat.toString();
          Grids._planetTextBatch.add(new Text3d(Coordinates.geoTo3dDouble(lat - 0.4, lng), Coordinates.geoTo3dDouble(lat - 0.3, lng), text, -80, 6E-05));
        }
        else {
          text = '  - ' + text.substring(1);
          Grids._planetTextBatch.add(new Text3d(Coordinates.geoTo3dDouble(lat + 0.4, lng), Coordinates.geoTo3dDouble(lat + 0.5, lng), text, -80, 6E-05));
        }
      }
    }
  }
};
export const Grids$ = {};