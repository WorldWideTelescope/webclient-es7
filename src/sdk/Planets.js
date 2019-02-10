
import {Texture} from './Graphics/Texture';
import {Matrix3d, PositionColoredTextured, PositionTexture, Vector3d, Vector4d} from './Double3d';
import {Coordinates} from './Coordinates';
import {AstroCalc} from './astrocalc/AstroCalc';
import {Settings} from './settings';
import {SpaceTimeController} from './SpaceTimeController';
import {Color, Colors} from './Color';
import ss from './scriptsharp/ss';
import {Util} from './Util';
import {CAAMercury} from './astrocalc/AAMercury';
import {CAAVenus} from './astrocalc/AAVenus';
import {CAAEarth} from './astrocalc/AAEarth';
import {CAAMars} from './astrocalc/AAMars';
import {CAAJupiter} from './astrocalc/AAJupiter';
import {CAASaturn} from './astrocalc/AASaturn';
import {CAAUranus} from './astrocalc/AAUranus';
import {CAANeptune} from './astrocalc/AANeptune';
import {CAAPluto} from './astrocalc/AAPluto';
import {CAAMoon} from './astrocalc/AAMoon';
import {GM} from './astrocalc/AAGalileanMoons';
import {TileShader} from './Graphics/Shaders';
import {LayerManager} from './Layers/LayerManager';
import {Triangle} from './Triangle';
import {WWTControl} from './WWTControl';
import {Dates, OrbitLineList, PointList} from './Graphics/Primative3d';
import {UiTools} from './UITools';
import {EllipseRenderer} from './Orbit';

export function Planets() {
}
Planets.loadPlanetTexture = function(url) {
  const texture = new Texture();
  texture.load(url);
  return texture;
};
Planets.getPlanet3dLocation = function(target) {
  try {
    if (target < 21) {
      return Planets._planet3dLocations[target].copy();
    }
  }
  catch ($e1) {
  }
  return Vector3d.create(0, 0, 0);
};
Planets.getPlanet3dSufaceAltitude = function(target) {
  try {
    if (target < 21) {
      return Planets.getAdjustedPlanetRadius(target);
    }
  }
  catch ($e1) {
  }
  return 0;
};
Planets.getPlanetTargetPoint = function(target, lat, lng, jNow) {
  let temp;
  if (!jNow) {
    temp = Planets.getPlanet3dLocation(target);
  }
  else {
    temp = Planets.getPlanet3dLocationJD(target, jNow);
  }
  temp.add(Coordinates.raDecTo3dAu((lng / 15) + 6, lat, Planets.getPlanet3dSufaceAltitude(target)));
  return temp;
};
Planets.getPlanet3dLocationJD = function(target, jNow) {
  try {
    let result = new Vector3d();
    const centerRaDec = AstroCalc.getPlanet(jNow, 0, 0, 0, -6378149);
    const center = Coordinates.raDecTo3dAu(centerRaDec.RA, centerRaDec.dec, centerRaDec.distance);
    if (target === 19) {
      result = Vector3d.create(-center.x, -center.y, -center.z);
    }
    else {
      const planet = AstroCalc.getPlanet(jNow, target, 0, 0, -6378149);
      result = Coordinates.raDecTo3dAu(planet.RA, planet.dec, planet.distance);
      result.subtract(center);
    }
    result.rotateX(Coordinates.meanObliquityOfEcliptic(jNow) * Planets.RC);
    if (Settings.get_active().get_solarSystemScale() !== 1) {
      let parent;
      switch (target) {
        case 9:
          parent = Planets.getPlanet3dLocationJD(19, jNow);
          result.subtract(parent);
          result.multiply(Settings.get_active().get_solarSystemScale() / 2);
          result.add(parent);
          break;
        case 10:
        case 11:
        case 12:
        case 13:
          parent = Planets.getPlanet3dLocationJD(4, jNow);
          result.subtract(parent);
          result.multiply(Settings.get_active().get_solarSystemScale());
          result.add(parent);
          break;
        default:
          break;
      }
    }
    return result;
  }
  catch ($e1) {
    return Vector3d.create(0, 0, 0);
  }
};
Planets.getPlanetLocation = function(name) {
  const id = Planets.getPlanetIDFromName(name);
  if (Planets._planetLocations != null) {
    return Planets._planetLocations[id];
  }
  else {
    return AstroCalc.getPlanet(SpaceTimeController.get_jNow(), id, SpaceTimeController.get_location().get_lat(), SpaceTimeController.get_location().get_lng(), SpaceTimeController.get_altitude());
  }
};
Planets.getPlanetLocationJD = function(name, jNow) {
  const id = Planets.getPlanetIDFromName(name);
  return AstroCalc.getPlanet(jNow, id, SpaceTimeController.get_location().get_lat(), SpaceTimeController.get_location().get_lng(), SpaceTimeController.get_altitude());
};
Planets.getPlanetIDFromName = function(planetName) {
  switch (planetName) {
    case 'Sun':
      return 0;
    case 'Mercury':
      return 1;
    case 'Venus':
      return 2;
    case 'Mars':
      return 3;
    case 'Jupiter':
      return 4;
    case 'Saturn':
      return 5;
    case 'Uranus':
      return 6;
    case 'Neptune':
      return 7;
    case 'Pluto':
      return 8;
    case 'Moon':
      return 9;
    case 'Io':
      return 10;
    case 'Europa':
      return 11;
    case 'Ganymede':
      return 12;
    case 'Callisto':
      return 13;
    case 'Earth':
      return 19;
    case 'IoShadow':
      return 14;
    case 'EuropaShadow':
      return 15;
    case 'GanymedeShadow':
      return 16;
    case 'CallistoShadow':
      return 17;
    case 'SunEclipsed':
      return 18;
    case 'Custom':
      return 20;
    case 'Undefined':
      return 65536;
    default:
      return -1;
  }
};
Planets.getImageSetNameNameFrom3dId = function(id) {
  switch (id) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mercury';
    case 2:
      return 'Venus';
    case 3:
      return 'Visible Imagery';
    case 4:
      return 'Jupiter';
    case 5:
      return 'Saturn';
    case 6:
      return 'Uranus';
    case 7:
      return 'Neptune';
    case 8:
      return 'Pluto';
    case 9:
      return 'Moon';
    case 10:
      return 'Io (Jupiter)';
    case 11:
      return 'Europa (Jupiter)';
    case 12:
      return 'Ganymede (Jupiter)';
    case 13:
      return 'Callisto (Jupiter)';
    case 19:
      return 'Bing Maps Aerial';
    default:
      return '';
  }
};
Planets.getNameFrom3dId = function(id) {
  switch (id) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mercury';
    case 2:
      return 'Venus';
    case 3:
      return 'Mars';
    case 4:
      return 'Jupiter';
    case 5:
      return 'Saturn';
    case 6:
      return 'Uranus';
    case 7:
      return 'Neptune';
    case 8:
      return 'Pluto';
    case 9:
      return 'Moon';
    case 10:
      return 'Io';
    case 11:
      return 'Europa';
    case 12:
      return 'Ganymede';
    case 13:
      return 'Callisto';
    case 19:
      return 'Earth';
    default:
      return '';
  }
};
Planets.updatePlanetLocations = function(threeDee) {
  Planets._jNow = SpaceTimeController.get_jNow();
  if (threeDee) {
    Planets.updateOrbits(0);
  }
  if (Planets._planetDiameters == null) {
    Planets._planetDiameters = new Array(20);
    Planets._planetDiameters[0] = 0.009291568;
    Planets._planetDiameters[1] = 3.25794793734425E-05;
    Planets._planetDiameters[2] = 8.08669220531394E-05;
    Planets._planetDiameters[3] = 4.53785605596396E-05;
    Planets._planetDiameters[4] = 0.000954501;
    Planets._planetDiameters[5] = 0.000802173;
    Planets._planetDiameters[6] = 0.000339564;
    Planets._planetDiameters[7] = 0.000324825;
    Planets._planetDiameters[8] = 1.52007379777805E-05;
    Planets._planetDiameters[9] = 2.32084653538149E-05;
    Planets._planetDiameters[10] = 2.43519298386342E-05;
    Planets._planetDiameters[11] = 2.08692629580609E-05;
    Planets._planetDiameters[12] = 3.51742670356556E-05;
    Planets._planetDiameters[13] = 3.22263666626559E-05;
    Planets._planetDiameters[14] = 2.43519298386342E-05;
    Planets._planetDiameters[15] = 2.08692629580609E-05;
    Planets._planetDiameters[16] = 3.51742670356556E-05;
    Planets._planetDiameters[17] = 3.22263666626559E-05;
    Planets._planetDiameters[18] = 0.009291568 * 2;
    Planets._planetDiameters[19] = 8.55626412117809E-05;
  }
  if (Planets.planetColors == null) {
    const lightYellow = Color.fromArgb(255, 255, 255, 221);
    const orangeRed = Color.fromArgb(255, 255, 68, 0);
    Planets.planetColors = new Array(20);
    Planets.planetColors[0] = Colors.get_yellow();
    Planets.planetColors[1] = Colors.get_white();
    Planets.planetColors[2] = lightYellow;
    Planets.planetColors[3] = orangeRed;
    Planets.planetColors[4] = Color.fromArgb(255, 255, 165, 0);
    Planets.planetColors[5] = Color.fromArgb(255, 184, 134, 11);
    Planets.planetColors[6] = Color.fromArgb(255, 173, 216, 230);
    Planets.planetColors[7] = Colors.get_blue();
    Planets.planetColors[8] = Colors.get_white();
    Planets.planetColors[9] = Colors.get_white();
    Planets.planetColors[10] = Colors.get_white();
    Planets.planetColors[11] = Colors.get_white();
    Planets.planetColors[12] = Colors.get_white();
    Planets.planetColors[13] = Colors.get_white();
    Planets.planetColors[14] = Colors.get_black();
    Planets.planetColors[15] = Colors.get_black();
    Planets.planetColors[16] = Colors.get_black();
    Planets.planetColors[17] = Colors.get_black();
    Planets.planetColors[18] = Colors.get_white();
    Planets.planetColors[19] = Color.fromArgb(255, 173, 216, 230);
  }
  if (Planets._planetTilts == null) {
    Planets._planetTilts = new Array(20);
    Planets._planetTilts[0] = 0;
    Planets._planetTilts[1] = 0.01;
    Planets._planetTilts[2] = 177.4;
    Planets._planetTilts[3] = 25.19;
    Planets._planetTilts[4] = 3.13;
    Planets._planetTilts[5] = 26.73;
    Planets._planetTilts[6] = 97.77;
    Planets._planetTilts[7] = 28.32;
    Planets._planetTilts[8] = 119.61;
    Planets._planetTilts[9] = 23.439;
    Planets._planetTilts[10] = 2.21;
    Planets._planetTilts[11] = 0;
    Planets._planetTilts[12] = -0.33;
    Planets._planetTilts[13] = 0;
    Planets._planetTilts[14] = 0;
    Planets._planetTilts[15] = 0;
    Planets._planetTilts[16] = 0;
    Planets._planetTilts[17] = 0;
    Planets._planetTilts[18] = 0;
    Planets._planetTilts[19] = 23.5;
  }
  Planets._planetTilts[19] = Planets._obliquity / Planets.RC;
  if (Planets.planetRotationPeriod == null) {
    Planets.planetRotationPeriod = new Array(20);
    Planets.planetRotationPeriod[0] = 25.37995;
    Planets.planetRotationPeriod[1] = 58.6462;
    Planets.planetRotationPeriod[2] = -243.0187;
    Planets.planetRotationPeriod[3] = 1.02595675;
    Planets.planetRotationPeriod[4] = 0.41007;
    Planets.planetRotationPeriod[5] = 0.426;
    Planets.planetRotationPeriod[6] = -0.71833;
    Planets.planetRotationPeriod[7] = 0.67125;
    Planets.planetRotationPeriod[8] = -6.38718;
    Planets.planetRotationPeriod[9] = 27.3;
    Planets.planetRotationPeriod[10] = 1.769137786;
    Planets.planetRotationPeriod[11] = 3.551;
    Planets.planetRotationPeriod[12] = 7.155;
    Planets.planetRotationPeriod[13] = 16.69;
    Planets.planetRotationPeriod[14] = 0;
    Planets.planetRotationPeriod[15] = 0;
    Planets.planetRotationPeriod[16] = 0;
    Planets.planetRotationPeriod[17] = 0;
    Planets.planetRotationPeriod[18] = 0;
    Planets.planetRotationPeriod[19] = 0.99726968;
  }
  if (Planets._planetScales == null) {
    Planets._planetScales = new Array(20);
  }
  if (Planets._planet3dLocations == null) {
    Planets._planet3dLocations = new Array(20);
  }
  if (Settings.get_active().get_actualPlanetScale()) {
    Planets._planetScales[0] = 0.5;
    Planets._planetScales[1] = 0.25;
    Planets._planetScales[2] = 0.25;
    Planets._planetScales[3] = 0.25;
    Planets._planetScales[4] = 0.25;
    Planets._planetScales[5] = 0.5;
    Planets._planetScales[6] = 0.25;
    Planets._planetScales[7] = 0.25;
    Planets._planetScales[8] = 0.25;
    Planets._planetScales[9] = 0.25;
    Planets._planetScales[10] = 0.25;
    Planets._planetScales[11] = 0.25;
    Planets._planetScales[12] = 0.25;
    Planets._planetScales[13] = 0.25;
    Planets._planetScales[14] = 0.25;
    Planets._planetScales[15] = 0.25;
    Planets._planetScales[16] = 0.25;
    Planets._planetScales[17] = 0.25;
    Planets._planetScales[18] = 0.5;
    Planets._planetScales[19] = 0.25;
  }
  else {
    for (let i = 0; i < 20; i++) {
      if (i < 10) {
        Planets._planetScales[i] = 0.25;
      }
      else {
        Planets._planetScales[i] = 0.1;
      }
    }
    Planets._planetScales[0] = 0.5;
    Planets._planetScales[5] = 0.5;
    Planets._planetScales[18] = 0.5;
  }
  Planets._planetDrawOrder = {};
  Planets._planetLocations = new Array(20);
  let center = new Vector3d();
  const planetCenter = 0;
  if (planetCenter > -1) {
    const centerRaDec = AstroCalc.getPlanet(Planets._jNow, planetCenter, (threeDee) ? 0 : SpaceTimeController.get_location().get_lat(), (threeDee) ? 0 : SpaceTimeController.get_location().get_lng(), (threeDee) ? -6378149 : SpaceTimeController.get_altitude());
    center = Coordinates.raDecTo3dAu(centerRaDec.RA, centerRaDec.dec, centerRaDec.distance);
  }
  Planets._planet3dLocations[19] = Vector3d.create(-center.x, -center.y, -center.z);
  Planets._planet3dLocations[19].rotateX(Planets._obliquity);
  for (let i = 0; i < 18; i++) {
    Planets._planetLocations[i] = AstroCalc.getPlanet(Planets._jNow, i, (threeDee) ? 0 : SpaceTimeController.get_location().get_lat(), (threeDee) ? 0 : SpaceTimeController.get_location().get_lng(), (threeDee) ? -6378149 : SpaceTimeController.get_altitude());
    Planets._planet3dLocations[i] = Coordinates.raDecTo3dAu(Planets._planetLocations[i].RA, Planets._planetLocations[i].dec, Planets._planetLocations[i].distance);
    Planets._planet3dLocations[i].subtract(center);
    Planets._planet3dLocations[i].rotateX(Planets._obliquity);
    if (Settings.get_active().get_actualPlanetScale()) {
      Planets._planetScales[i] = (2 * Math.atan(0.5 * (Planets._planetDiameters[i] / Planets._planetLocations[i].distance))) / Math.PI * 180;
    }
    if (Settings.get_active().get_solarSystemScale() !== 1) {
      const id = i;
      let parent;
      switch (id) {
        case 9:
          parent = Planets._planet3dLocations[19];
          Planets._planet3dLocations[i].subtract(parent);
          Planets._planet3dLocations[i].multiply(Settings.get_active().get_solarSystemScale() / 2);
          Planets._planet3dLocations[i].add(parent);
          break;
        case 10:
        case 11:
        case 12:
        case 13:
          parent = Planets._planet3dLocations[4];
          Planets._planet3dLocations[i].subtract(parent);
          Planets._planet3dLocations[i].multiply(Settings.get_active().get_solarSystemScale());
          Planets._planet3dLocations[i].add(parent);
          break;
        default:
          break;
      }
    }
    let finalDistance = -Planets._planetLocations[i].distance;
    while (ss.keyExists(Planets._planetDrawOrder, finalDistance)) {
      finalDistance += 1E-10;
    }
    Planets._planetDrawOrder[finalDistance] = i;
  }
  Planets._planetLocations[18] = Planets._planetLocations[0];
  Planets._planetScales[0] *= 2;
  Planets._planetScales[18] = Planets._planetScales[0];
  Planets._planetScales[5] = Planets._planetScales[5] * 2;
  Planets._lastUpdate = SpaceTimeController.get_now();
};
Planets.planetsReady = function() {
};
Planets.updateOrbits = function(planetCenter) {
  try {
    Planets._obliquity = Coordinates.meanObliquityOfEcliptic(SpaceTimeController.get_jNow()) * Planets.RC;
    if (planetCenter !== Planets._lastPlanetCenterID) {
      Planets._orbits = null;
    }
    Planets._lastPlanetCenterID = planetCenter;
    if (Planets._orbits == null) {
      if (planetCenter < 0) {
        Planets._eclipticTilt = Matrix3d.get_identity();
      }
      else {
        Planets._eclipticTilt = Matrix3d.get_identity();
        Planets._eclipticTilt = Matrix3d._rotationX(Planets._obliquity);
      }
      if (Planets.planetOrbitalYears == null) {
        Planets.planetOrbitalYears = new Array(20);
        Planets.planetOrbitalYears[0] = 1;
        Planets.planetOrbitalYears[1] = 0.241;
        Planets.planetOrbitalYears[2] = 0.615;
        Planets.planetOrbitalYears[3] = 1.881;
        Planets.planetOrbitalYears[4] = 11.87;
        Planets.planetOrbitalYears[5] = 29.45;
        Planets.planetOrbitalYears[6] = 84.07;
        Planets.planetOrbitalYears[7] = 164.9;
        Planets.planetOrbitalYears[8] = 248.1;
        Planets.planetOrbitalYears[9] = 27.3 / 365.25;
        Planets.planetOrbitalYears[10] = 16.6890184 / 365.25;
        Planets.planetOrbitalYears[11] = 3.551181 / 365.25;
        Planets.planetOrbitalYears[12] = 7.15455296 / 365.25;
        Planets.planetOrbitalYears[13] = 16.6890184 / 365.25;
        Planets.planetOrbitalYears[19] = 1;
      }
      if (!Planets.readOrbits()) {
        Planets._orbits = new Array(20);
        for (let i = 1; i < 20; i++) {
          Planets._orbits[i] = new Array(Planets._orbitalSampleRate);
          if (i < 9 || i === 19) {
            for (let j = 0; j < Planets._orbitalSampleRate; j++) {
              let centerId = planetCenter;
              const now = Planets._jNow + ((Planets.planetOrbitalYears[i] * 365.25 / Planets._orbitalSampleRate) * (j - (Planets._orbitalSampleRate / 2)));
              let center = new Vector3d();
              if (i === 9) {
                centerId = -1;
              }
              else if (i > 9 && i < 14) {
                centerId = 4;
              }
              if (centerId > -1) {
                const centerRaDec = AstroCalc.getPlanet(now, centerId, 0, 0, -6378149);
                center = Coordinates.raDecTo3dAu(centerRaDec.RA, centerRaDec.dec, centerRaDec.distance);
              }
              if (i !== 19) {
                const planetRaDec = AstroCalc.getPlanet(now, i, 0, 0, -6378149);
                Planets._orbits[i][j] = Coordinates.raDecTo3dAu(planetRaDec.RA, planetRaDec.dec, planetRaDec.distance);
                Planets._orbits[i][j].subtract(center);
              }
              else {
                Planets._orbits[i][j] = Vector3d.create(-center.x, -center.y, -center.z);
              }
              Planets._orbits[i][j].rotateX(Planets._obliquity);
            }
            Planets._orbits[i][Planets._orbitalSampleRate - 1] = Planets._orbits[i][0];
          }
        }
        Planets.dumpOrbitsFile();
      }
    }
  }
  finally {
  }
};
Planets.readOrbits = function() {
  return false;
  return true;
};
Planets.dumpOrbitsFile = function() {
};
Planets.drawPlanets = function(renderContext, opacity) {
  if (Planets._planetTextures == null) {
    Planets._loadPlanetTextures();
  }
  const elong = Planets._geocentricElongation(Planets._planetLocations[9].RA, Planets._planetLocations[9].dec, Planets._planetLocations[0].RA, Planets._planetLocations[0].dec);
  let raDif = Planets._planetLocations[9].RA - Planets._planetLocations[0].RA;
  if (Planets._planetLocations[9].RA < Planets._planetLocations[0].RA) {
    raDif += 24;
  }
  let phaseAngle = Planets._phaseAngle(elong, Planets._planetLocations[9].distance, Planets._planetLocations[0].distance);
  const limbAngle = Planets._positionAngle(Planets._planetLocations[9].RA, Planets._planetLocations[9].dec, Planets._planetLocations[0].RA, Planets._planetLocations[0].dec);
  if (raDif < 12) {
    phaseAngle += 180;
  }
  const dista = (Math.abs(Planets._planetLocations[9].RA - Planets._planetLocations[0].RA) * 15) * Math.cos(Coordinates.degreesToRadians(Planets._planetLocations[0].dec));
  const distb = Math.abs(Planets._planetLocations[9].dec - Planets._planetLocations[0].dec);
  const sunMoonDist = Math.sqrt(dista * dista + distb * distb);
  let eclipse = false;
  let coronaOpacity = 0;
  const moonEffect = (Planets._planetScales[9] / 2 - sunMoonDist);
  const darkLimb = Math.min(32, ss.truncate((sunMoonDist * 32)));
  if (moonEffect > (Planets._planetScales[0] / 4)) {
    eclipse = true;
    coronaOpacity = Math.min(1, (moonEffect - (Planets._planetScales[0] / 2)) / 0.001);
    Planets._drawPlanet(renderContext, 18, coronaOpacity);
  }
  const $enum1 = ss.enumerate(ss.keys(Planets._planetDrawOrder));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    const planetId = Planets._planetDrawOrder[key];
    Planets._drawPlanet(renderContext, planetId, 1);
  }
  return true;
};
Planets._loadPlanetTextures = function() {
  const baseUrl = '//worldwidetelescope.org/webclient/Images/';
  Planets._planetTextures = new Array(20);
  Planets._planetTextures[0] = Planets.loadPlanetTexture(baseUrl + 'sun.png');
  Planets._planetTextures[1] = Planets.loadPlanetTexture(baseUrl + 'mercury.png');
  Planets._planetTextures[2] = Planets.loadPlanetTexture(baseUrl + 'venus.png');
  Planets._planetTextures[3] = Planets.loadPlanetTexture(baseUrl + 'mars.png');
  Planets._planetTextures[4] = Planets.loadPlanetTexture(baseUrl + 'jupiter.png');
  Planets._planetTextures[5] = Planets.loadPlanetTexture(baseUrl + 'saturn.png');
  Planets._planetTextures[6] = Planets.loadPlanetTexture(baseUrl + 'uranus.png');
  Planets._planetTextures[7] = Planets.loadPlanetTexture(baseUrl + 'neptune.png');
  Planets._planetTextures[8] = Planets.loadPlanetTexture(baseUrl + 'pluto.png');
  Planets._planetTextures[9] = Planets.loadPlanetTexture(baseUrl + 'moon.png');
  Planets._planetTextures[10] = Planets.loadPlanetTexture(baseUrl + 'io.png');
  Planets._planetTextures[11] = Planets.loadPlanetTexture(baseUrl + 'europa.png');
  Planets._planetTextures[12] = Planets.loadPlanetTexture(baseUrl + 'ganymede.png');
  Planets._planetTextures[13] = Planets.loadPlanetTexture(baseUrl + 'callisto.png');
  Planets._planetTextures[14] = Planets.loadPlanetTexture(baseUrl + 'moonshadow.png');
  Planets._planetTextures[15] = Planets.loadPlanetTexture(baseUrl + 'moonshadow.png');
  Planets._planetTextures[16] = Planets.loadPlanetTexture(baseUrl + 'moonshadow.png');
  Planets._planetTextures[17] = Planets.loadPlanetTexture(baseUrl + 'moonshadow.png');
  Planets._planetTextures[18] = Planets.loadPlanetTexture(baseUrl + 'sunCorona.png');
  Planets._planetTextures[19] = Planets.loadPlanetTexture(baseUrl + 'earth.png');
};
Planets.drawPlanets3D = function(renderContext, opacity, centerPoint) {
  Planets.initPlanetResources(renderContext);
  const distss = UiTools.solarSystemToMeters(renderContext.get_solarSystemCameraDistance());
  const moonFade = Math.min(1, Math.max(Util.log10(distss) - 7.3, 0));
  const fade = Math.min(1, Math.max(Util.log10(distss) - 8.6, 0));
  if (Settings.get_active().get_solarSystemOrbits() && fade > 0) {
    for (let ii = 1; ii < 10; ii++) {
      let id = ii;
      if (ii === 9) {
        id = 19;
      }
      const angle = Math.atan2(Planets._planet3dLocations[id].z, Planets._planet3dLocations[id].x);
      Planets._drawSingleOrbit(renderContext, Planets.planetColors[id], id, centerPoint, angle, Planets._planet3dLocations[id], fade);
    }
    const mid = 9;
    Planets._drawSingleOrbit(renderContext, Planets.planetColors[mid], mid, centerPoint, 0, Planets._planet3dLocations[mid], fade);
  }
  ss.clearKeys(Planets._drawOrder);
  const camera = renderContext.cameraPosition.copy();
  for (let planetId = 0; planetId < 14; planetId++) {
    if (!Planets._planetLocations[planetId].eclipsed) {
      const distVector = Vector3d.subtractVectors(camera, Vector3d.subtractVectors(Planets._planet3dLocations[planetId], centerPoint));
      if (!ss.keyExists(Planets._drawOrder, distVector.length())) {
        Planets._drawOrder[distVector.length()] = planetId;
      }
    }
  }
  const distVectorEarth = Vector3d.subtractVectors(camera, Vector3d.subtractVectors(Planets._planet3dLocations[19], centerPoint));
  if (!ss.keyExists(Planets._drawOrder, distVectorEarth.length())) {
    Planets._drawOrder[distVectorEarth.length()] = 19;
  }
  const $enum1 = ss.enumerate(ss.keys(Planets._drawOrder));
  while ($enum1.moveNext()) {
    const key = $enum1.current;
    let planetId = Planets._drawOrder[key];
    Planets._drawPlanet3d(renderContext, planetId, centerPoint);
  }
  return true;
};
Planets.getPlanetOrientationAtEpoch = function(planetID) {
  const m = Matrix3d.get_identity();
  const obliquityOfEcliptic = 23.4392794;
  if (planetID === 19) {
    m._multiply(Matrix3d._rotationX(obliquityOfEcliptic * Planets.RC));
  }
  else {
    m._multiply(Matrix3d._rotationX(-90 * Planets.RC));
    m._multiply(Matrix3d._rotationZ((180 + Planets._planetAngles[planetID].primeMeridian) * Planets.RC));
    m._multiply(Matrix3d._rotationX((90 - Planets._planetAngles[planetID].poleDec) * Planets.RC));
    m._multiply(Matrix3d._rotationZ((Planets._planetAngles[planetID].poleRa - 90) * Planets.RC));
    m._multiply(Matrix3d._rotationX(obliquityOfEcliptic * Planets.RC));
    m._multiply(Matrix3d._rotationX(90 * Planets.RC));
  }
  return m;
};
Planets.setupPlanetMatrix = function(renderContext, planetID, centerPoint, makeFrustum) {
  const matNonRotating = renderContext.get_world().clone();
  Planets._setupMatrixForPlanetGeometry(renderContext, planetID, centerPoint, makeFrustum);
  if (planetID === 0) {
    const radius = Planets.getAdjustedPlanetRadius(planetID);
    matNonRotating.scale(Vector3d.create(radius, radius, radius));
    const translation = Vector3d.subtractVectors(Planets._planet3dLocations[planetID], centerPoint);
    matNonRotating._multiply(Matrix3d.translation(translation));
    renderContext.set_worldBaseNonRotating(matNonRotating);
  }
};
Planets._setupMatrixForPlanetGeometry = function(renderContext, planetID, centerPoint, makeFrustum) {
  const radius = Planets.getAdjustedPlanetRadius(planetID);
  let rotationCurrent = 0;
  if (planetID === 19) {
    rotationCurrent = Math.PI + Coordinates.mstFromUTC2(SpaceTimeController.get_now(), 0) / 180 * Math.PI;
  }
  else {
    rotationCurrent = Math.PI + (((Planets._jNow - 2451545) / Planets.planetRotationPeriod[planetID]) * Math.PI * 2) % (Math.PI * 2);
  }
  if (planetID === 9) {
    rotationCurrent -= Math.PI / 2;
  }
  const matLocal = renderContext.get_world().clone();
  const matNonRotating = renderContext.get_world().clone();
  const translation = Vector3d.subtractVectors(Planets._planet3dLocations[planetID], centerPoint);
  const orientationAtEpoch = Planets.getPlanetOrientationAtEpoch(planetID);
  matLocal.scale(Vector3d.create(radius, radius, radius));
  matLocal._multiply(Matrix3d._rotationY(-rotationCurrent));
  matLocal._multiply(orientationAtEpoch);
  if (planetID === renderContext.viewCamera.target) {
    Planets.earthMatrix = Matrix3d.get_identity();
    Planets.earthMatrix._multiply(Matrix3d._rotationY(-rotationCurrent));
    Planets.earthMatrix._multiply(orientationAtEpoch);
    Planets.earthMatrixInv = Planets.earthMatrix.clone();
    Planets.earthMatrixInv.invert();
  }
  matLocal._multiply(Matrix3d.translation(translation));
  renderContext.set_world(matLocal);
  renderContext.set_worldBase(renderContext.get_world().clone());
  renderContext.set_nominalRadius(Planets.getPlanetRadiusInMeters(planetID));
  if (makeFrustum) {
    renderContext.makeFrustum();
  }
  matNonRotating.scale(Vector3d.create(radius, radius, radius));
  matNonRotating._multiply(orientationAtEpoch);
  matNonRotating._multiply(Matrix3d.translation(translation));
  renderContext.set_worldBaseNonRotating(matNonRotating);
  return rotationCurrent;
};
Planets.initPlanetResources = function(renderContext) {
};
Planets._drawSingleOrbit = function(renderContext, eclipticColor, id, centerPoint, startAngle, planetNow, opacity) {
  if (opacity < 0.01) {
    return;
  }
  if (renderContext.gl == null) {
    var count = Planets._orbitalSampleRate;
    var planetDropped = false;
    var viewPoint = renderContext.get_viewPoint();
    const ctx = renderContext.device;
    ctx.save();
    ctx.strokeStyle = eclipticColor.toString();
    ctx.lineWidth = 2;
    ctx.globalAlpha = 1;
    var point = new Vector3d();
    var pointTest = new Vector3d();
    var lastPoint = new Vector3d();
    var firstPoint = true;
    const translate = Matrix3d.translation(Vector3d.negate(centerPoint));
    const mat = Matrix3d.multiplyMatrix(translate, renderContext.WVP);
    const matWV = Matrix3d.multiplyMatrix(translate, renderContext.WV);
    for (let i = 0; i < count; i++) {
      var pnt = Planets._orbits[id][i];
      var angle = (Math.atan2(Planets._orbits[id][i].z, Planets._orbits[id][i].x) + Math.PI * 2 - startAngle) % (Math.PI * 2);
      var alpha = ss.truncate((angle / (Math.PI * 2) * 255));
      var alphaD = alpha / 255;
      if (alpha < 2 && !planetDropped) {
        pnt = planetNow;
        alphaD = 1;
      }
      pointTest = matWV.transform(pnt);
      point = mat.transform(pnt);
      if (pointTest.z > 0) {
        if (firstPoint) {
          firstPoint = false;
        }
        else {
          ctx.beginPath();
          ctx.globalAlpha = alphaD * opacity;
          ctx.moveTo(lastPoint.x, lastPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      }
      lastPoint = point;
    }
    ctx.restore();
  }
  else {
    if (id !== 9) {
      var count = Planets._orbitalSampleRate;
      var planetDropped = false;
      var viewPoint = renderContext.get_viewPoint();
      var point = new Vector3d();
      var pointTest = new Vector3d();
      var lastPoint = new Vector3d();
      let lastColor = new Color();
      var firstPoint = true;
      const list = new OrbitLineList();
      for (let i = 0; i < count; i++) {
        var pnt = Planets._orbits[id][i].copy();
        var angle = (Math.atan2(pnt.z, pnt.x) + Math.PI * 2 - startAngle) % (Math.PI * 2);
        var alpha = ss.truncate((angle / (Math.PI * 2) * 255));
        var alphaD = alpha / 255;
        const color = Color.fromArgb(alpha, eclipticColor.r, eclipticColor.g, eclipticColor.b);
        if (alpha < 2 && !planetDropped && !firstPoint) {
          pnt = Vector3d.subtractVectors(planetNow, centerPoint);
          alphaD = 1;
          alpha = 255;
          color.a = 255;
          lastColor.a = 255;
          list.addLine(lastPoint, pnt.copy(), lastColor._clone(), color._clone());
          lastColor.a = 0;
          color.a = 0;
          pnt = Planets._orbits[id][i].copy();
          planetDropped = true;
        }
        pnt = Vector3d.subtractVectors(pnt, centerPoint);
        if (firstPoint) {
          firstPoint = false;
        }
        else {
          list.addLine(lastPoint, pnt, lastColor, color);
        }
        lastPoint = pnt;
        lastColor = color._clone();
      }
      list.drawLines(renderContext, 1, Colors.get_white());
      list.clear();
    }
    else {
      let mu = 0;
      switch (id) {
        case 9:
          mu = 398600.44189 + 4902.7779;
          break;
        case 10:
        case 11:
        case 12:
        case 13:
          mu = 126686534;
          break;
        default:
          mu = 132712440018.8;
          break;
      }
      const deltaT = 1 / 1440 * 0.1;
      const r0 = Planets.getPlanetPositionDirect(id, Planets._jNow);
      const r1 = Planets.getPlanetPositionDirect(id, Planets._jNow - deltaT);
      const v = Vector3d.scale(Vector3d.subtractVectors(r0, r1), 1 / deltaT);
      const elements = Planets._stateVectorToKeplerian(r0, v, mu);
      Planets._drawSingleOrbitElements(renderContext, eclipticColor, id, centerPoint, startAngle, planetNow, elements);
    }
  }
};
Planets.getPlanetPositionDirect = function(id, jd) {
  let L = 0;
  let B = 0;
  let R = 0;
  switch (id) {
    case 1:
      L = CAAMercury.eclipticLongitude(jd);
      B = CAAMercury.eclipticLatitude(jd);
      R = CAAMercury.radiusVector(jd);
      break;
    case 2:
      L = CAAVenus.eclipticLongitude(jd);
      B = CAAVenus.eclipticLatitude(jd);
      R = CAAVenus.radiusVector(jd);
      break;
    case 19:
      L = CAAEarth.eclipticLongitude(jd);
      B = CAAEarth.eclipticLatitude(jd);
      R = CAAEarth.radiusVector(jd);
      break;
    case 3:
      L = CAAMars.eclipticLongitude(jd);
      B = CAAMars.eclipticLatitude(jd);
      R = CAAMars.radiusVector(jd);
      break;
    case 4:
      L = CAAJupiter.eclipticLongitude(jd);
      B = CAAJupiter.eclipticLatitude(jd);
      R = CAAJupiter.radiusVector(jd);
      break;
    case 5:
      L = CAASaturn.eclipticLongitude(jd);
      B = CAASaturn.eclipticLatitude(jd);
      R = CAASaturn.radiusVector(jd);
      break;
    case 6:
      L = CAAUranus.eclipticLongitude(jd);
      B = CAAUranus.eclipticLatitude(jd);
      R = CAAUranus.radiusVector(jd);
      break;
    case 7:
      L = CAANeptune.eclipticLongitude(jd);
      B = CAANeptune.eclipticLatitude(jd);
      R = CAANeptune.radiusVector(jd);
      break;
    case 8:
      L = CAAPluto.eclipticLongitude(jd);
      B = CAAPluto.eclipticLatitude(jd);
      R = CAAPluto.radiusVector(jd);
      break;
    case 9:
      L = CAAMoon.eclipticLongitude(jd);
      B = CAAMoon.eclipticLatitude(jd);
      R = CAAMoon.radiusVector(jd) / 149598000;
      break;
    case 10:
      var galileanInfo = GM.calculate(jd);
      var position = galileanInfo.satellite1.eclipticRectangularCoordinates;
      return Vector3d.create(position.x, position.z, position.y);
    case 11:
      var galileanInfo = GM.calculate(jd);
      var position = galileanInfo.satellite2.eclipticRectangularCoordinates;
      return Vector3d.create(position.x, position.z, position.y);
    case 12:
      var galileanInfo = GM.calculate(jd);
      var position = galileanInfo.satellite3.eclipticRectangularCoordinates;
      return Vector3d.create(position.x, position.z, position.y);
    case 13:
      var galileanInfo = GM.calculate(jd);
      var position = galileanInfo.satellite4.eclipticRectangularCoordinates;
      return Vector3d.create(position.x, position.z, position.y);
  }
  L = Coordinates.degreesToRadians(L);
  B = Coordinates.degreesToRadians(B);
  const eclPos = Vector3d.create(Math.cos(L) * Math.cos(B) * R, Math.sin(L) * Math.cos(B) * R, Math.sin(B) * R);
  const eclipticOfDateRotation = (Coordinates.meanObliquityOfEcliptic(jd) - Coordinates.meanObliquityOfEcliptic(2451545)) * Planets.RC;
  eclPos.rotateX(eclipticOfDateRotation);
  return Vector3d.create(eclPos.x, eclPos.z, eclPos.y);
};
Planets._stateVectorToKeplerian = function(position, velocity, mu) {
  const r = Vector3d.scale(position, 149598000);
  const v = Vector3d.scale(Vector3d.scale(velocity, 1 / 86400), 149598000);
  const rmag = r.length();
  const vmag = v.length();
  const sma = 1 / (2 / rmag - vmag * vmag / mu);
  const h = Vector3d.cross(r, v);
  const ecc = Vector3d.subtractVectors(Vector3d.scale(Vector3d.cross(v, h), 1 / mu), Vector3d.scale(r, 1 / rmag));
  const e = ecc.length();
  h.normalize();
  ecc.normalize();
  const s = Vector3d.cross(h, ecc);
  r.normalize();
  const cosNu = Vector3d.dot(ecc, r);
  const sinNu = Vector3d.dot(s, r);
  const E = Math.atan2(Math.sqrt(1 - e * e) * sinNu, e + cosNu);
  const elements = new KeplerianElements();
  elements.orientation = Matrix3d.create(ecc.x, ecc.y, ecc.z, 0, s.x, s.y, s.z, 0, h.x, h.y, h.z, 0, 0, 0, 0, 1);
  elements.a = sma;
  elements.e = e;
  elements.ea = E;
  return elements;
};
Planets._drawSingleOrbitElements = function(renderContext, eclipticColor, id, centerPoint, xstartAngle, planetNow, el) {
  let scaleFactor;
  switch (id) {
    case 9:
      if (Settings.get_active().get_solarSystemScale() > 1) {
        scaleFactor = Settings.get_active().get_solarSystemScale() / 2;
      }
      else {
        scaleFactor = 1;
      }
      break;
    case 10:
    case 11:
    case 12:
    case 13:
      scaleFactor = Settings.get_active().get_solarSystemScale();
      break;
    default:
      scaleFactor = 1;
      break;
  }
  const translation = Vector3d.negate(centerPoint);
  if (id === 9) {
    translation.add(Planets._planet3dLocations[19]);
  }
  else if (id === 10 || id === 11 || id === 12 || id === 13) {
    translation.add(Planets._planet3dLocations[4]);
  }
  const currentPosition = Vector3d.subtractVectors(planetNow, centerPoint);
  const worldMatrix = Matrix3d.multiplyMatrix(Matrix3d.multiplyMatrix(el.orientation, Matrix3d.translation(translation)), renderContext.get_world());
  EllipseRenderer.drawEllipseWithPosition(renderContext, el.a / 149598000 * scaleFactor, el.e, el.ea, eclipticColor, worldMatrix, currentPosition);
};
Planets.isPlanetInFrustum = function(renderContext, rad) {
  const frustum = renderContext.get_frustum();
  const center = Vector3d.create(0, 0, 0);
  const centerV4 = new Vector4d(0, 0, 0, 1);
  for (let i = 0; i < 6; i++) {
    if (frustum[i].dot(centerV4) + rad < 0) {
      return false;
    }
  }
  return true;
};
Planets._drawPlanet3d = function(renderContext, planetID, centerPoint) {
  if (planetID === 0) {
    TileShader.minLightingBrightness = 1;
  }
  else {
    TileShader.minLightingBrightness = 0.025;
    if (planetID === 19) {
      TileShader.atmosphereColor = Color.fromArgb(255, 65, 157, 217);
    }
    else {
      TileShader.atmosphereColor = Color.fromArgb(0, 0, 0, 0);
    }
  }
  const matOld = renderContext.get_world();
  const matOldBase = renderContext.get_worldBase();
  const matOldNonRotating = renderContext.get_worldBaseNonRotating();
  const radius = Planets.getAdjustedPlanetRadius(planetID);
  Planets.setupPlanetMatrix(renderContext, planetID, centerPoint, true);
  let planetWidth = 1;
  if (planetID === 5) {
    planetWidth = 3;
  }
  if (Planets.isPlanetInFrustum(renderContext, planetWidth)) {
    const matOld2 = renderContext.get_world();
    const matOldBase2 = renderContext.get_worldBase();
    const matOldNonRotating2 = renderContext.get_worldBaseNonRotating();
    let sun = Planets._planet3dLocations[0].copy();
    let planet = Planets._planet3dLocations[planetID].copy();
    sun = matOld.transform(sun);
    planet = matOld.transform(planet);
    renderContext.set_world(matOld);
    renderContext.set_worldBase(matOldBase);
    renderContext.set_worldBaseNonRotating(matOldNonRotating);
    Planets._setupMatrixForPlanetGeometry(renderContext, planetID, centerPoint, true);
    const sunPosition = Vector3d.subtractVectors(sun, planet);
    sunPosition.normalize();
    renderContext.set_sunPosition(sunPosition);
    TileShader.sunPosition = Vector3d.subtractVectors(Planets._planet3dLocations[0], planet);
    const loc = Vector3d.subtractVectors(Planets._planet3dLocations[planetID], centerPoint);
    loc.subtract(renderContext.cameraPosition);
    const dist = loc.length();
    const sizeIndexParam = (2 * Math.atan(0.5 * (radius / dist))) / Math.PI * 180;
    let sizeIndex = 0;
    if (sizeIndexParam > 10.5) {
      sizeIndex = 0;
    }
    else if (sizeIndexParam > 3.9) {
      sizeIndex = 1;
    }
    else if (sizeIndexParam > 0.72) {
      sizeIndex = 2;
    }
    else if (sizeIndexParam > 0.05) {
      sizeIndex = 3;
    }
    else {
      sizeIndex = 4;
    }
    if (planetID === 19 && sizeIndex < 2) {
      const width = Settings.get_active().get_solarSystemScale() * 1E-05;
    }
    if (sizeIndex < 4) {
      const oldLighting = renderContext.lighting;
      if (planetID === 5) {
        if (renderContext.gl == null) {
          renderContext.lighting = false;
          Planets.drawSaturnsRings(renderContext, false, dist);
          renderContext.lighting = oldLighting;
        }
      }
      if (!planetID) {
        renderContext.lighting = false;
      }
      Planets._drawSphere(renderContext, planetID);
      if (planetID === 5) {
        if (renderContext.gl == null) {
          renderContext.lighting = false;
          Planets.drawSaturnsRings(renderContext, true, dist);
        }
        else {
          renderContext.lighting = false;
          Planets._drawRings(renderContext);
          renderContext.lighting = oldLighting;
        }
      }
      renderContext.lighting = oldLighting;
    }
    else {
      if (!planetID) {
        Planets.drawPointPlanet(renderContext, new Vector3d(), (10 * Planets._planetDiameters[planetID]), Planets.planetColors[planetID], true);
      }
      else if (planetID < 9 || planetID === 19) {
        var size = (800 * Planets._planetDiameters[planetID]);
        Planets.drawPointPlanet(renderContext, new Vector3d(), Math.max(0.05, Math.min(0.1, size)), Planets.planetColors[planetID], true);
      }
      else if (sizeIndexParam > 0.002) {
        var size = (800 * Planets._planetDiameters[planetID]);
        Planets.drawPointPlanet(renderContext, new Vector3d(), Math.max(0.05, Math.min(0.1, size)), Planets.planetColors[planetID], true);
      }
    }
  }
  LayerManager._draw(renderContext, 1, false, Planets.getNameFrom3dId(planetID), true, false);
  renderContext.set_world(matOld);
  renderContext.set_worldBase(matOldBase);
  renderContext.set_worldBaseNonRotating(matOldNonRotating);
};
Planets.drawSaturnsRings = function(renderContext, front, distance) {
  if (Planets._ringsTriangleLists[0] == null) {
    Planets._ringImage = document.createElement('img');
    const xdomimg = Planets._ringImage;
    xdomimg.crossOrigin = 'anonymous';
    Planets._ringImage.src = '/webclient/images/saturnringsshadow.png';
    Planets._ringsTriangleLists[0] = [];
    Planets._ringsTriangleLists[1] = [];
    const ringSize = 2.25;
    const TopLeft = Vector3d.create(-ringSize, 0, -ringSize);
    const TopRight = Vector3d.create(ringSize, 0, -ringSize);
    const BottomLeft = Vector3d.create(-ringSize, 0, ringSize);
    const BottomRight = Vector3d.create(ringSize, 0, ringSize);
    const center = Vector3d.create(0, 0, 0);
    const leftCenter = Vector3d.create(-ringSize, 0, 0);
    const topCenter = Vector3d.create(0, 0, -ringSize);
    const bottomCenter = Vector3d.create(0, 0, ringSize);
    const rightCenter = Vector3d.create(ringSize, 0, 0);
    const level = 6;
    let vertexList;
    vertexList = [];
    var Width = 1024;
    var Height = 1024;
    vertexList.push(PositionTexture.createPosSize(TopLeft, 0, 0, Width, Height));
    vertexList.push(PositionTexture.createPosSize(TopRight, 1, 0, Width, Height));
    vertexList.push(PositionTexture.createPosSize(BottomLeft, 0, 1, Width, Height));
    vertexList.push(PositionTexture.createPosSize(BottomRight, 1, 1, Width, Height));
    let childTriangleList = [];
    childTriangleList.push(Triangle.create(0, 2, 1));
    childTriangleList.push(Triangle.create(2, 3, 1));
    let count = 5;
    while (count-- > 1) {
      const newList = [];
      const $enum1 = ss.enumerate(childTriangleList);
      while ($enum1.moveNext()) {
        var tri = $enum1.current;
        tri.subDivideNoNormalize(newList, vertexList);
      }
      childTriangleList = newList;
    }
    const miter = 0.6 / (Width / 256);
    const $enum2 = ss.enumerate(childTriangleList);
    while ($enum2.moveNext()) {
      var tri = $enum2.current;
      const p1 = vertexList[tri.a];
      const p2 = vertexList[tri.b];
      const p3 = vertexList[tri.c];
      Planets._ringsTriangleLists[0].push(RenderTriangle.createWithMiter(p1, p2, p3, Planets._ringImage, level, miter));
    }
  }
  if (renderContext.gl == null) {
    const cam = renderContext.cameraPosition;
    let test = new Vector3d();
    const worldLocal = Matrix3d.multiplyMatrix(Matrix3d._rotationY(Math.atan2(renderContext.get_sunPosition().x, renderContext.get_sunPosition().z)), renderContext.get_worldBaseNonRotating());
    const wv = Matrix3d.multiplyMatrix(worldLocal, renderContext.get_view());
    const wvp = Matrix3d.multiplyMatrix(wv, renderContext.get_projection());
    var Width = renderContext.width;
    var Height = renderContext.height;
    wvp.scale(Vector3d.create(Width / 2, -Height / 2, 1));
    wvp.translate(Vector3d.create(Width / 2, Height / 2, 0));
    let td = 0;
    for (let i = 0; i < 2; i++) {
      const $enum3 = ss.enumerate(Planets._ringsTriangleLists[0]);
      while ($enum3.moveNext()) {
        var tri = $enum3.current;
        test = wv.transform(tri.a.position);
        td = test.length();
        let draw = td > distance;
        if (front) {
          draw = !draw;
        }
        if (draw) {
          tri.opacity = 1;
          tri.draw(renderContext.device, wvp);
        }
      }
      RenderTriangle.cullInside = !RenderTriangle.cullInside;
    }
  }
  else {
  }
};
Planets._drawRings = function(renderContext) {
  Planets._initRings();
  TileShader.use(renderContext, Planets._ringsVertexBuffer.vertexBuffer, null, Planets._ringsTexture.texture2d, 1, false);
  renderContext.gl.drawArrays(5, 0, Planets._triangleCountRings);
};
Planets._initRings = function() {
  if (Planets._ringsVertexBuffer != null) {
    return;
  }
  Planets._ringsTexture = Planets.loadPlanetTexture('//cdn.worldwidetelescope.org/webclient/images/SaturnRingsStrip.png');
  const inner = 1.113;
  const outer = 2.25;
  Planets._ringsVertexBuffer = new PositionTextureVertexBuffer(((192 + 1) * 2));
  Planets._triangleCountRings = (192 + 1) * 2;
  const verts = Planets._ringsVertexBuffer.lock();
  const radStep = Math.PI * 2 / 192;
  let index = 0;
  for (let x = 0; x <= 192; x += 2) {
    const rads1 = x * radStep;
    const rads2 = (x + 1) * radStep;
    verts[index] = new PositionTexture();
    verts[index].position = Vector3d.create((Math.cos(rads1) * inner), 0, (Math.sin(rads1) * inner));
    verts[index].tu = 1;
    verts[index].tv = 0;
    index++;
    verts[index] = new PositionTexture();
    verts[index].position = Vector3d.create((Math.cos(rads1) * outer), 0, (Math.sin(rads1) * outer));
    verts[index].tu = 0;
    verts[index].tv = 0;
    index++;
    verts[index] = new PositionTexture();
    verts[index].position = Vector3d.create((Math.cos(rads2) * inner), 0, (Math.sin(rads2) * inner));
    verts[index].tu = 1;
    verts[index].tv = 1;
    index++;
    verts[index] = new PositionTexture();
    verts[index].position = Vector3d.create((Math.cos(rads2) * outer), 0, (Math.sin(rads2) * outer));
    verts[index].tu = 0;
    verts[index].tv = 1;
    index++;
  }
  Planets._ringsVertexBuffer.unlock();
};
Planets.drawPointPlanet = function(renderContext, location, size, color, zOrder) {
  const center = location;
  const rad = size / 2;
  if (renderContext.gl != null) {
    const ppList = new PointList(renderContext);
    ppList.minSize = 20;
    ppList.addPoint(location.copy(), color._clone(), new Dates(0, 1), size / 100);
    ppList.depthBuffered = true;
    ppList.draw(renderContext, 1, false);
  }
  else {
    const screenSpacePnt = renderContext.WVP.transform(center);
    if (screenSpacePnt.z < 0) {
      return;
    }
    if (!zOrder) {
      if (Vector3d.dot(renderContext.get_viewPoint(), center) < 0.55) {
        return;
      }
    }
    const ctx = renderContext.device;
    ctx.save();
    ctx.beginPath();
    ctx.arc(screenSpacePnt.x, screenSpacePnt.y, rad, 0, Math.PI * 2, true);
    ctx.lineWidth = 1;
    ctx.fillStyle = color.toString();
    if (true) {
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = color.toString();
    ctx.stroke();
    ctx.restore();
  }
};
Planets.getAdjustedPlanetRadius = function(planetID) {
  if (planetID > Planets._planetDiameters.length - 1) {
    planetID = 19;
  }
  const diameter = Planets._planetDiameters[planetID];
  let radius = (diameter / 2);
  if (!!planetID) {
    radius = radius * (1 + (3 * (Settings.get_active().get_solarSystemScale() - 1)));
  }
  else {
    radius = radius * (1 + (0.3 * (Settings.get_active().get_solarSystemScale() - 1)));
  }
  return radius;
};
Planets.getPlanetRadiusInMeters = function(planetID) {
  if (planetID > Planets._planetDiameters.length - 1) {
    planetID = 19;
  }
  const diameter = Planets._planetDiameters[planetID];
  return (diameter / 2) * 149598000 * 1000;
};
Planets._drawPlanet = function(renderContext, planetID, opacity) {
  const planetPosition = Planets._planetLocations[planetID];
  if (((planetID < 14) && Planets._planetScales[planetID] < (renderContext.viewCamera.zoom / 6) / 400)) {
    if (planetID < 10 || ((planetID < 14) && Planets._planetScales[planetID] > (renderContext.viewCamera.zoom / 6) / 6400)) {
      const point = Coordinates.raDecTo3d(planetPosition.RA, planetPosition.dec);
      Planets.drawPointPlanet(renderContext, point, 3, Planets.planetColors[planetID], false);
    }
    return;
  }
  let brush = null;
  if (planetID < 10 || planetID === 18) {
    brush = Planets._planetTextures[planetID];
  }
  else if (planetID < 14) {
    if (Planets._planetLocations[planetID].eclipsed) {
      brush = Planets._planetTextures[15];
    }
    else {
      if (Settings.get_active().get_showMoonsAsPointSource()) {
        brush = Planets._planetTextures[14];
      }
      else {
        brush = Planets._planetTextures[planetID];
      }
    }
  }
  else {
    if (!Planets._planetLocations[planetID].shadow) {
      return;
    }
    brush = Planets._planetTextures[15];
  }
  if (renderContext.gl != null) {
    if (Planets._planetPoints == null) {
      Planets._planetPoints = new Array(4);
      for (let i = 0; i < 4; i++) {
        Planets._planetPoints[i] = new PositionColoredTextured();
      }
    }
    const radius = (Planets._planetScales[planetID] / 2);
    const raRadius = (radius / Math.cos(planetPosition.dec / 180 * Math.PI));
    Planets._planetPoints[0].position = Coordinates.raDecTo3dAu((planetPosition.RA - (raRadius / 15)), planetPosition.dec + radius, 1);
    Planets._planetPoints[0].tu = 0;
    Planets._planetPoints[0].tv = 1;
    Planets._planetPoints[0].color = Colors.get_white();
    Planets._planetPoints[1].position = Coordinates.raDecTo3dAu((planetPosition.RA - (raRadius / 15)), planetPosition.dec - radius, 1);
    Planets._planetPoints[1].tu = 0;
    Planets._planetPoints[1].tv = 0;
    Planets._planetPoints[1].color = Colors.get_white();
    Planets._planetPoints[2].position = Coordinates.raDecTo3dAu((planetPosition.RA + (raRadius / 15)), planetPosition.dec + radius, 1);
    Planets._planetPoints[2].tu = 1;
    Planets._planetPoints[2].tv = 1;
    Planets._planetPoints[2].color = Colors.get_white();
    Planets._planetPoints[3].position = Coordinates.raDecTo3dAu((planetPosition.RA + (raRadius / 15)), planetPosition.dec - radius, 1);
    Planets._planetPoints[3].tu = 1;
    Planets._planetPoints[3].tv = 0;
    Planets._planetPoints[3].color = Colors.get_white();
    Planets._planetSprite.draw(renderContext, Planets._planetPoints, 4, brush, true, 1);
  }
  else {
    const center = Coordinates.raDecTo3d(planetPosition.RA, planetPosition.dec);
    const rad = Planets._planetScales[planetID] / (renderContext.get_fovScale() / 3600) / 2;
    const screenSpacePnt = renderContext.WVP.transform(center);
    if (screenSpacePnt.z < 0) {
      return;
    }
    if (Vector3d.dot(renderContext.get_viewPoint(), center) < 0.55) {
      return;
    }
    const ctx = renderContext.device;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(screenSpacePnt.x, screenSpacePnt.y, rad, 0, Math.PI * 2, true);
    ctx.lineWidth = 0;
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(brush.imageElement, screenSpacePnt.x - rad, screenSpacePnt.y - rad, rad * 2, rad * 2);
    ctx.globalAlpha = 1;
    ctx.restore();
  }
};
Planets._drawPlanetPhase = function(renderContext, planetID, phase, angle, dark) {
};
Planets._geocentricElongation = function(ObjectAlpha, ObjectDelta, SunAlpha, SunDelta) {
  ObjectAlpha = Coordinates.degreesToRadians(ObjectAlpha * 15);
  SunAlpha = Coordinates.degreesToRadians(SunAlpha * 15);
  ObjectDelta = Coordinates.degreesToRadians(ObjectDelta);
  SunDelta = Coordinates.degreesToRadians(SunDelta);
  return Coordinates.radiansToDegrees(Math.acos(Math.sin(SunDelta) * Math.sin(ObjectDelta) + Math.cos(SunDelta) * Math.cos(ObjectDelta) * Math.cos(SunAlpha - ObjectAlpha)));
};
Planets._phaseAngle = function(GeocentricElongation, EarthObjectDistance, EarthSunDistance) {
  GeocentricElongation = Coordinates.degreesToRadians(GeocentricElongation);
  return Coordinates.mapTo0To360Range(Coordinates.radiansToDegrees(Math.atan2(EarthSunDistance * Math.sin(GeocentricElongation), EarthObjectDistance - EarthSunDistance * Math.cos(GeocentricElongation))));
};
Planets._positionAngle = function(Alpha0, Delta0, Alpha, Delta) {
  Alpha0 = Coordinates.hoursToRadians(Alpha0);
  Alpha = Coordinates.hoursToRadians(Alpha);
  Delta0 = Coordinates.degreesToRadians(Delta0);
  Delta = Coordinates.degreesToRadians(Delta);
  return Coordinates.mapTo0To360Range(Coordinates.radiansToDegrees(Math.atan2(Math.cos(Delta0) * Math.sin(Alpha0 - Alpha), Math.sin(Delta0) * Math.cos(Delta) - Math.cos(Delta0) * Math.sin(Delta) * Math.cos(Alpha0 - Alpha))));
};
Planets._drawSphere = function(renderContext, planetID) {
  const planetName = Planets.getImageSetNameNameFrom3dId(planetID);
  let planet = WWTControl.singleton.getImagesetByName(planetName);
  if (planet == null) {
    planet = WWTControl.singleton.getImagesetByName('Bing Maps Aerial');
  }
  if (planet != null) {
    renderContext.drawImageSet(planet, 100);
    if (planetID === 19) {
    }
    return;
  }
};
export const Planets$ = {};

export function KeplerianElements() {
  this.a = 0;
  this.e = 0;
  this.ea = 0;
}
export const KeplerianElements$ = {};