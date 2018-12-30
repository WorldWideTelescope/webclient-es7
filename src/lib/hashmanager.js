import eventbus from '../components/eventbus';

let privateHash = '#/';

const setHashVal = (key, v, privateOnly, reset) => {
  if (isNaN(v)) {
    v = v.replace(/\s/g, '_');
  }
  let newHash = '';
  const hash = privateOnly ? privateHash.substr(2) : location.hash.substr(2);
  if (reset) {
    newHash = key + '=' + v;
  } else if (getHashVal(key, privateOnly)) {
    const pairs = hash.split('&');
    if (pairs.length > 1) {
      pairs.forEach(pair => {
        const kvPair = pair.split('=');
        if (i > 0) {
          newHash += '&';
        }
        if (kvPair[0] == key) {
          newHash += kvPair[0] + '=' + v;
        } else {
          newHash += pair;
        }
      });
    } else if (hash.split('=')[0] === key) {
      newHash += key + '=' + v;
    }
  } else {
    if (hash.length > 2) {
      newHash = hash + '&' + key + '=' + v;
    } else {
      newHash = key + '=' + v;
    }
  }
  newHash = newHash.replace(/&&/g, '&');
  if (!privateOnly) {
    location.href = '#/' + newHash;
  } else {
    privateHash = '#/' + newHash;
  }

  return location.href.split('#')[0] + '#/' + newHash;
};

const removeHashVal = (key, privateOnly) => {
  let newHash = '';
  const hash = privateOnly ? privateHash.substr(2) : location.hash.substr(2);
  if (getHashVal(key, privateOnly)) {
    const pairs = hash.split('&');
    if (pairs.length > 1) {
      pairs.forEach(pair => {
        const kvPair = pair.split('=');
        if (i > 0) {
          newHash += '&';
        }
        if (kvPair[0] != key) {
          newHash += pair;
        }
      });
    } else if (hash.split('=')[0] == key) {
      newHash += '';
    }
  } else {
    newHash = hash;
  }
  newHash = newHash.replace(/&&/g, '&');
  if (!privateOnly) {
    location.href = '#/' + newHash;
  } else {
    privateHash = '#/' + newHash;
  }
  return location.href.split('#')[0] + '#/' + newHash;
};

const getHashVal = (key, privateOnly) => getHashObject(privateOnly)[key];

const getHashObject = (privateOnly, hashString) => {
  const obj = {};
  const hash = hashString ? hashString : privateOnly ? privateHash.substr(2) : location.hash.substr(2);
  if (hash.length > 2 && hash.indexOf('=') !== -1) {
    const pairs = hash.split('&');
    if (pairs.length > 0) {
      pairs.forEach(pair => {
        if (pair.indexOf('=') !== -1 && pair.length > 2) {
          const kvPair = pair.split('=');
          obj[kvPair[0].replace(/_/g, ' ')] = kvPair[1].replace(/_/g, ' ');
        }
      });
    }

  }
  return obj;
};

const hashChange = () =>
  setTimeout(() =>
    eventbus.$emit('hashChange', getHashObject()),
  10);

window.onhashchange = hashChange;

export default {
  setHashVal,
  getHashVal,
  removeHashVal,
  getHashObject
};;