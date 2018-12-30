let data;

function setKey(key, val) {
  try {
    if (val === null && data[key]) {
      delete data[key];
    } else {
      data[key] = val;
    }
    if (localStorage) {
      localStorage.setItem('appState', JSON.stringify(data));
    }
  } catch (er) {
    console.log('Error using localstorage. Is it turned off?');
  }
}

function getKey(k) {
  return data[k];
}

function getAll() { return data; }

const init = function () {
  const storedData = localStorage ? localStorage.getItem('appState') : {};
  data = storedData && localStorage ? JSON.parse(storedData) : {};
};
init();
export default {
  get:getKey,
  set:setKey,
  getAll
};