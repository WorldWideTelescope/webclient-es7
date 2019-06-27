import util from '../lib/util';

let initPromise = null;
let rootPromise = null;
let ctrlInst;
export default {
  namespaced:true,
  state:{
    ctl:{},
    root:{},
    rootFolders:{},
    openCollectionsFolder:{}
  },
  mutations: {
    ensureOCFolder(state){
      if (!state.openCollectionsFolder) {
        let openCollectionsFolder = ctrlInst.createFolder();
        openCollectionsFolder.set_name('Open Collections');
        openCollectionsFolder.guid = 'f0';
        state.root.addChildFolder(openCollectionsFolder);
        state.openCollectionsFolder = openCollectionsFolder;
      }
    },
    setAny(state, obj){
      Object.keys(obj).forEach(k => state[k] = obj[k]);
    }
  },
  actions:{
    init({state,commit}){

      initPromise = initPromise || new Promise(res => {

        const tryInit = (ctl) => {

          ctrlInst = ctl;
          let root = ctrlInst.createFolder();
          let openCollectionsFolder;
          let collection;
          commit('setAny', {root});
          root.loadFromUrl('//worldwidetelescope.org/wwtweb/catalog.aspx?W=WCExploreRoot',  () => {

            if (util.getQSParam('wtml') != null) {
              openCollectionsFolder = ctrlInst.createFolder();
              openCollectionsFolder.set_name('Open Collections');
              collection = ctrlInst.createFolder();
              root.loadFromUrl(util.getQSParam('wtml'),  () => {
                collection.get_children();
                openCollectionsFolder.addChildFolder(collection);
                root.addChildFolder(openCollectionsFolder);
                res(root.get_children());
                commit('setAny',{ collection, openCollectionsFolder});
              });
            } else if (location.href.indexOf('?image=') !== -1) {
            //addVampFeeds();
              this.importImage(location.href.split('?image=')[1]).then(function (data) {
                res(root.get_children());
              });

            } else {
            //addVampFeeds();
              res(root.get_children());
            }
          });
        };
        this.dispatch('init').then(ctl => {
          state.ctl = ctl;
          tryInit(ctl);
        });
      });
      return initPromise;
    },
    getChildren(ctx,obj) {
      return new Promise(res => {
        obj.childLoadCallback(function () {
          const children = obj.get_children().map(item => {
            item.guid = obj.guid + '.' + (item.get_isFolder() ? item.get_name() : i);
            if (item.get_thumbnailUrl) {
              fixThumb(item);
            }
            return item;
          });
          res(transformData(children));
        });
      });
    },
    getRoot({commit, state}) {
      rootPromise = rootPromise || new Promise(res => {
        this.dispatch('places/init').then(function (folders) {
          commit('setAny',{rootFolders:folders});
          folders.forEach(item => {
            item.guid = item.get_name();
            if (item.get_thumbnailUrl) {
              fixThumb(item);
            }
          });
          transformData(folders);
          res(state.root.get_children());
        });
      });
      return rootPromise;
    },
    openCollection({state,commit}, url){
      return new Promise(res => {
        url = url.replace('www.worldwidetelescope.org', 'worldwidetelescope.org').replace('http://', '//');
        commit('ensureOCFolder');

        let collection = ctrlInst.createFolder();
        state.root.loadFromUrl(url, function () {
          //collection.get_children();
          collection.url = url;
          state.openCollectionsFolder.addChildFolder(collection);
          if (collection.get_name() === '') {
            res(collection.get_children());
          } else {
            res(collection);
          }
        });
      });
    },
    importImage({commit,state,dispatch},{url, manualData}) {
      return new Promise(res => {
        commit('ensureOCFolder');
        let collection = ctrlInst.createFolder();
        collection.set_name('Imported image');

        let encodedUrl = url.indexOf('%2F%2F') !== -1 ? url : encodeURIComponent(url);
        if (manualData) {
          encodedUrl += manualData;
        }
        state.root.loadFromUrl('//worldwidetelescope.org/WWTWeb/TileImage.aspx?imageurl=' + encodedUrl, function () {
          if (Number(collection.get_children()[0].get_RA()) !== 0 || Number(collection.get_children()[0].get_dec()) !== 0) {
            state.openCollectionsFolder.addChildFolder(collection);
            dispatch('getChildren',collection).then((children) => {
              if (collection.get_name() === '') {
                res(collection.get_children());
              } else {
                res(collection);
              }
            });
          } else {
            res(false);
          }
        });
      });
    }
  }
};


const cleanseUrl = (fieldName, item) => {
  if (item[fieldName])
    item[fieldName] = item[fieldName]
      .replace('www.worldwidetelescope.org', 'worldwidetelescope.org')
      .replace('http://', '//');
};
const fixThumb = item => {
  item.thumb = item.get_thumbnailUrl().replace('wwtstaging.azurewebsites.net/Content/Images/', 'wwtweb.blob.core.windows.net/images/')
    .replace('worldwidetelescope.org/Content/Images/', 'wwtweb.blob.core.windows.net/images/')
    .replace('worldwidetelescope.org/Content/Images/', 'wwtweb.blob.core.windows.net/images/')
    .replace('cdn.worldwidetelescope.org/wwtweb', 'worldwidetelescope.org/wwtweb');
  Object.keys(item).forEach(function (key) {
    const lk = key.toLowerCase();
    if (lk.indexOf('url') > -1 || lk.indexOf('thumb') > -1) {
      cleanseUrl(key, item);
    }
  });
};

const transformData = items => {
  items.forEach(item => {
    try {
      item.name = item.get_name();

      if (typeof item.get_type == 'function') {
        item.isPlanet = item.get_type() === 1;
        item.isFGImage = item.get_type() === 2 && typeof item.get_camParams == 'function';
      }
      if (typeof item.get_dataSetType == 'function') {
        item.isEarth = item.get_dataSetType() === 0;
        item.isPanorama = item.get_dataSetType() === 3;
        item.isSurvey = item.get_dataSetType() === 2;
        item.isPlanet = item.get_dataSetType() === 1;
      }
      Object.keys(item).forEach(function (key) {
        let lk = key.toLowerCase();
        if (lk.indexOf('url') > -1 || lk.indexOf('thumb') > -1) {
          cleanseUrl(key, item);
        }
      });
      if (item.get_url){
        item.url = item.get_url();
      }
      item.isFolder = Boolean(item.get_isFolder && item.get_isFolder());
    } catch (er) {
      util.log(item, er);
    }
  });
  return items;
};

const findChildById = (guid, collection) => collection.find(item => item.guid === guid.replace(/_/g, ' '));


//return api;