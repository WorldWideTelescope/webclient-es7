import eventbus from '../components/eventbus';
import {initPromise} from '../store/localization';
import store from '../store/store';
import _ from 'lodash';

console.log({store});

let ctrlInst = () => store.state.ctrlInst;
let browsers = {};

let has = (src, search) => src.indexOf(search) >= 0;

let init = () => {
  let ua = navigator.userAgent.toLowerCase();

  browsers.isEdge = has(ua, 'edge/') > 0;
  browsers.isFF = has(ua, 'firefox') > 0;
  browsers.isIE = has(ua, 'msie') || has(ua, 'trident');
  browsers.isChrome = has(ua, 'chrome');
  browsers.isSafari = has(ua, 'safari') && !browsers.isChrome && !browsers.isIE && !browsers.isEdge && !browsers.isFF;
  browsers.isChrome = has(ua, 'chrome') > 0 && !browsers.isIE && !browsers.isEdge && !browsers.isFF;
  browsers.isWindows = has(ua, 'windows');
  store.commit('ui/setAny',{browsers});
};


const getClassificationText = clsid => {
  let out = null;
  if (clsid && !isNaN(Number(clsid))) {
    let str = _.find(wwtlib.Classification, (cls) => cls === clsid);
    str = str.replace(/^\s*/, ''); // strip leading spaces
    out = str.replace(/^[a-z]|[^\s][A-Z]/g, (str, offset) => !!offset ?
      str.toUpperCase() :
      `${str.substr(0, 1)} ${str.substr(1).toUpperCase()}`);
  }
  return out;
};

const formatDecimalHours = (dayFraction, spaced) => {
  let ts = new Date(new Date().toUTCString()).valueOf() - new Date().valueOf();
  let hr = ts / (1000 * 60 * 60);
  let day = (dayFraction - hr) + 0.0083333334;
  while (day > 24) {
    day -= 24;
  }
  while (day < 0) {
    day += 24;
  }
  let hours = day.toFixed(0);
  let minutes = ((day * 60) - (hours * 60)).toFixed(0);
  let join = spaced ? ' : ' : ':';
  return ([int2(hours), int2(minutes)]).join(join);
};
const int2 = dec => Math.abs(Math.floor(dec)) < 10 ? dec < 0 ? '-0' + Math.abs(Math.floor(dec)) : '0' + Math.floor(dec) : Math.floor(dec);
const truncate = n => (n >= 0) ? Math.floor(n) : Math.ceil(n);
const formatHms = (angle, isHmsFormat, signed, spaced) => {
  let minutes = (angle - truncate(angle)) * 60;
  let seconds = (minutes - truncate(minutes)) * 60;
  minutes = Math.abs(minutes);
  seconds = Math.abs(seconds);

  let join = spaced ? ' : ' : ':';
  if (isNaN(angle)) {
    angle = minutes = seconds = 0;
  }
  return isHmsFormat ? int2(angle) + 'h'
    + int2(minutes) + 'm'
    + int2(seconds) + 's' :
    ([signed && angle > 0 ? '+' + int2(angle) : int2(angle), int2(minutes), int2(seconds)]).join(join);
};

const parseHms = (input) => {

  const convertHmstoDec = (hours, minutes, seconds) =>
    parseInt(hours) + parseInt(minutes) / 60 + parseInt(seconds) / (60 * 60);
  let parts = (input.indexOf(':') != -1) ?
    input.split(':') :
    input.indexOf('h') !== -1 ? input.replace(/h/, ',').replace(/m/, ',').replace(/s/, '').split(',') :
      null;

  if (parts) {
    return convertHmstoDec(parts[0], parts[1], parts[2]);
  } else {
    return parseFloat(input);
  }
};

const getAstroDetails = place => {
  const ra = place.get_RA(), dec = place.get_dec(), name = place.get_name();
  let coords = wwtlib.Coordinates.fromRaDec(ra, dec);
  let stc = wwtlib.SpaceTimeController;
  const curLoc = stc.get_location;
  const altAz = wwtlib.Coordinates.equitorialToHorizon(coords, curLoc, stc.get_now());
  place.altAz = altAz;
  const classificationText = getClassificationText(place.get_classification());
  let riseSet;
  const loc = (jnow) => wwtlib.Planets.getPlanetLocation(name, jnow);
  if (classificationText === 'Solar System') {
    let jNow = stc.get_jNow() + .5;
    let p1 = loc(jNow - 1);
    let p2 = loc(jNow);
    let p3 = loc(jNow + 1);
    let type = name === 'Sun' ? 1 : name === 'Moon' ? 2 : 0;
    riseSet = wwtlib.AstroCalc.getRiseTrinsitSet(jNow, curLoc.get_lat(), -curLoc.get_lng(), p1.RA, p1.dec, p2.RA, p2.dec, p3.RA, p3.dec, type);
  } else {
    riseSet = wwtlib.AstroCalc.getRiseTrinsitSet(jNow, curloc.get_lat(), -stc.get_location().get_lng(), place.get_RA(), place.get_dec(), place.get_RA(), place.get_dec(), place.get_RA(), place.get_dec(), 0);
  }
  if (!riseSet.bValid && !riseSet.bNeverRises) {
    riseSet.bNeverSets = true;
  }
  place.riseSet = riseSet;
};

const drawCircleOverPlace = place => {
  ctrlInst().clearAnnotations();
  if ($('#lstLookAt').val() === '2') {
    let circle = ctrlInst().createCircle();
    circle.set_center(place.get_location3d());
    circle.set_skyRelative(false);

    ctrlInst().addAnnotation(circle);
  }
};

function getIsPlanet(place) {
  let cls, isPlanet;
  if (typeof place.get_classification === 'function') {
    cls = place.get_classification();
    isPlanet = getClassificationText(cls) === 'Solar System';
  }
  return isPlanet || typeof place.get_rotation === 'function';
}

function secondsToTime(secs) {
  let hours = Math.floor(secs / (60 * 60));

  let divisorForMinutes = secs % (60 * 60);
  let minutes = Math.floor(divisorForMinutes / 60);

  let divisorForSeconds = divisorForMinutes % 60;
  let seconds = Math.ceil(divisorForSeconds);

  let obj = {
    'h': hours < 10 ? '0' + hours : hours.toString(),
    'm': minutes < 10 ? '0' + minutes : minutes.toString(),
    's': seconds < 10 ? '0' + seconds : seconds.toString()
  };
  return obj;
}

function getQSParam(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getImageset(place) {
  if (!place) {
    return null;
  } else if (ss.canCast(place, wwtlib.Imageset)) {
    return place;
  } else if (place.get_backgroundImageset && ss.canCast(place.get_backgroundImageset(), wwtlib.Imageset)) {
    return place.get_backgroundImageset();
  } else if (place.get_studyImageset && ss.canCast(place.get_studyImageset(), wwtlib.Imageset)) {
    return place.get_studyImageset();
  } else {
    return null;
  }
}

function getCreditsText(pl) {
  let imageSet = getImageset(pl);
  if (imageSet) {
    return imageSet.get_creditsText();
  } else {
    return '';
  }
}

function getCreditsUrl(pl) {
  let imageSet = getImageset(pl);
  if (imageSet) {
    return imageSet.get_creditsUrl();
  } else {
    return '';
  }
}

let accelDevice = false;

function isAccelDevice() {
  return accelDevice;
}

function log() {
  if (getQSParam('debug') != null) {
    console.log(arguments);
  }
}

let isStandalone =  () => location.href.indexOf('localhost') > 1;

function nav(url) {
  if (isStandalone() && url.indexOf('http') !== 0) {
    url = 'http://worldwidetelescope.org' + url;
  }
  window.open(url);
}

function resetCamera(leaveHash) {
  if (!leaveHash) {
    location.hash = '/';
  }
  ctrlInst().gotoRaDecZoom(0, 0, 60, true);
};



let imageSetTypes = [];

function getImageSetType(sType) {
  if (!imageSetTypes.length) {
    $.each(wwtlib.ImageSetType, function (k, v) {
      if (!isNaN(v)) {
        imageSetTypes[v] = k.toLowerCase();
      }
    });
  }
  return imageSetTypes.indexOf(sType.toLowerCase()) == -1 ? 2 : imageSetTypes.indexOf(sType.toLowerCase());

}

function mobileLink() {
  let delim = '?';
  if (location.search.split('=').length > 1) {
    delim = '&';
  }
  const url = location.href;

  const bit = api.isMobile ? 0 : 1;
  if (getQSParam('mobile')) {
    return url.replace('mobile=' + getQSParam('mobile'), 'mobile=' + bit);
  }
  return location.href + delim + 'mobile=' + bit;
}


let dirtyInterval,
  viewport = {
    isDirty: false,
    RA: 0,
    Dec: 0,
    Fov: 60
  };

function trackViewportChanges() {
  viewport = {
    isDirty: false,
    init: true,
    RA: ctrlInst().getRA(),
    Dec: ctrlInst().getDec(),
    Fov: ctrlInst().get_fov()
  };

  eventbus.$emit('viewportchange', viewport);

  initPromise.then(function () {
    viewport = {
      isDirty: false,
      init: true,
      RA: ctrlInst().getRA(),
      Dec: ctrlInst().getDec(),
      Fov: ctrlInst().get_fov()
    };

    eventbus.$emit('viewportchange', viewport);
    viewport.init = false;
    dirtyInterval = setInterval(dirtyViewport, 250);
  });
}


let dirtyViewport = function () {
  let wasDirty = viewport.isDirty;
  let c = ctrlInst();
  viewport.isDirty = c.getRA() !== viewport.RA || c.getDec() !== viewport.Dec || c.get_fov() !== viewport.Fov;
  viewport.RA = c.getRA();
  viewport.Dec = c.getDec();
  viewport.Fov = c.get_fov();
  if (viewport.isDirty || wasDirty) {
    $rootScope.viewport = viewport;
    eventbus.$emit('viewportchange', viewport);
  }
};

function argb2Hex(argb){
  const convChannel = cbyte => {
    const h = cbyte.toString(16);
    return h.length == 2 ? h : '0' + h;
  };
  return `#${convChannel(argb.r)}${convChannel(argb.g)}${convChannel(argb.b)}`;

}
function hex2argb(hex,argb){
  const rgb = hex.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16));
  argb.r = rgb[0];
  argb.g = rgb[1];
  argb.b = rgb[2];
  return argb;
}

init();

export default {
  getClassificationText,
  getAstroDetails,
  formatDecimalHours,
  formatHms,
  drawCircleOverPlace,
  getIsPlanet,
  secondsToTime,
  getQSParam,
  getImageset,
  getCreditsText,
  getCreditsUrl,
  isAccelDevice,
  isStaging: () => location.href.indexOf('worldwidetelescope.org') === -1,
  isDebug: !!getQSParam('debug'),
  nav,
  log,
  resetCamera,
  getImageSetType,
  trackViewportChanges,
  parseHms,
  mobileLink,
  argb2Hex,
  hex2argb,
  firstCharLower:s => s.charAt(0).toLowerCase() + s.substr(1),
  firstCharUpper:s => s.charAt(0).toUpperCase() + s.substr(1)
};