import ss from './scriptsharp/ss';

export function UiTools() {}
UiTools.gamma = (val, gamma) => Math.min(255, ss.truncate(((255 * Math.pow(val / 255, 1 / gamma)) + 0.5)));
UiTools.getNamesStringFromArray = array => {
  let names = '';
  let delim = '';
  const $enum1 = ss.enumerate(array);
  while ($enum1.moveNext()) {
    const name = $enum1.current;
    names += delim;
    names += name;
    delim = ';';
  }
  return names;
};
UiTools.solarSystemToMeters = SolarSystemCameraDistance => SolarSystemCameraDistance * 149598000 * 370;
UiTools.metersToSolarSystemDistance = meters => meters / 370 * 149598000;
UiTools.metersToZoom = meters => ((meters / 1000 / 370) - 1E-06) / 4 * 9;
UiTools.formatDistance = distance => {
  if (distance < 0.1) {
    let km = (distance * 149598000);
    if (km < 10) {
      const m = ss.truncate((km * 1000));
      return ss.format('{0} m', m);
    }
    else {
      km = ss.truncate(km);
      return ss.format('{0} km', km);
    }
  }
  else if (distance < (10)) {
    var au = ss.truncate((distance * 10)) / 10;
    return ss.format('{0} au', au);
  }
  else if (distance < (63239.6717 / 10)) {
    var au = ss.truncate(distance);
    return ss.format('{0} au', au);
  }
  else if (distance < (63239.6717 * 10)) {
    var ly = ss.truncate(((distance * 10) / 63239.6717)) / 10;
    return ss.format('{0} ly', ly);
  }
  else if (distance < (63239.6717 * 1000000)) {
    var ly = ss.truncate((distance / 63239.6717));
    return ss.format('{0} ly', ly);
  }
  else if (distance < (206264.806 * 10000000)) {
    var mpc = ss.truncate(((distance * 10) / (206264.806 * 1000000))) / 10;
    return ss.format('{0} Mpc', mpc);
  }
  else if (distance < (206264.806 * 1000000000)) {
    var mpc = ss.truncate((distance / (206264.806 * 1000000)));
    return ss.format('{0} Mpc', mpc);
  }
  else {
    var mpc = ss.truncate(((distance * 10) / (206264.806 * 1000000000))) / 10;
    return ss.format('{0} Gpc', mpc);
  }
};
UiTools.formatDecimalHours = dayFraction => {
  const today = ss.now();
  let ts = today.getTimezoneOffset() / 60;
  ts = 0;
  let day = (dayFraction - ts) + 0.0083333334;
  while (day > 24) {
    day -= 24;
  }
  while (day < 0) {
    day += 24;
  }
  const hours = ss.truncate(day);
  const minutes = ss.truncate(((day * 60) - (hours * 60)));
  const seconds = ss.truncate(((day * 3600) - ((hours * 3600) + (minutes * 60))));
  return ss.format('{0}:{1}', hours, minutes, seconds);
};
UiTools.splitString = (data, delimiter) => {
  const output = [];
  let nestingLevel = 0;
  let current = 0;
  let count = 0;
  let start = 0;
  while (current < data.length) {
    if (data.substr(current, 1) === '(') {
      nestingLevel++;
    }
    if (data.substr(current, 1) === ')') {
      nestingLevel--;
    }
    if (current === (data.length - 1)) {
      count++;
    }
    if (current === (data.length - 1) || (data.substr(current, 1) === delimiter && delimiter === '\t') || (!nestingLevel && data.substr(current, 1) === delimiter)) {
      output.push(data.substr(start, count));
      start = current + 1;
      count = 0;
    }
    else {
      count++;
    }
    current++;
  }
  return output;
};
UiTools.split = (data, delimiters) => {
  const output = [];
  const nestingLevel = 0;
  let current = 0;
  let count = 0;
  let start = 0;
  while (current < data.length) {
    if (current === (data.length - 1)) {
      count++;
    }
    if (current === (data.length - 1) || delimiters.indexOf(data.substr(current, 1)) > -1) {
      output.push(data.substr(start, count));
      start = current + 1;
      count = 0;
    }
    else {
      count++;
    }
    current++;
  }
  return output;
};
UiTools._beep = () => {
};