import Vue from 'vue';
import Vuex from 'vuex';
import modals from './modals';
import localization from './localization';
import ui from './ui';
import places from './places';
import util from '../lib/util';

Vue.use(Vuex);

let initResolver;
let initPromise = new Promise(res => initResolver = res);
export default new Vuex.Store({
  modules:{
    modals,
    localization,
    ui,
    places
  },
  getters:{
    px(){
      return numVal => `${numVal}px`;
    },
    currentImageset(state){
      const dataSetType = state.lookAtTypes.indexOf(state.lookAt);
      return wwtlib.WWTControl.imageSets.filter(imgset => imgset._dataSetType === dataSetType);
    }
  },
  state: {
    language:'EN',
    wwtlib:{},
    lookAtTypes:['Earth', 'Planet', 'Sky', 'Panorama', 'SolarSystem'],
    lookAt:'Sky',
    imagery:'Digitized Sky Survey (Color)',
    imageSets:[],
    ribbonExpanded:false,
    ctl:{},wc:{},ctrlInst:{},//todo:consolidate globally
    layerManagerHidden:false,
    instant:false,
    tracking:null
  },
  mutations: {
    init(state,{ctl,wwtlib}){
      state.ctrlInst = ctl;
      state.wwtlib = wwtlib;
      window.wc = ctl;
      initResolver(ctl);
      /*ctl.settings.set_solarSystemMinorOrbits(true);
      ctl.settings.set_solarSystemMinorPlanets(true);
      let mars = wwtlib.WWTControl.imageSets.find(s=>s._name==='Visible Imagery');
      mars.set_name('Mars');
      ctl.setBackgroundImageByName('3D Solar System View');*/
    },
    setAny(state, obj){
      Object.keys(obj).forEach(k => state[k] = obj[k]);
    },
    toggleAny(state, key){
      state[key] = !state[key];
    }
  },
  actions: {
    init(){
      return initPromise;
    },
    setLookAt({state,commit,dispatch}, {lookAt, imageryName, noUpdate, keepCamera}){
      commit('setAny',{lookAt});
      dispatch('lookAtChanged',{imageryName, noUpdate, keepCamera});
    },
    lookAtChanged({state}, {lookAt, imageryName, noUpdate, keepCamera}){
      if (!keepCamera) {
        util.resetCamera(true);
      }
      //start here
    }
  }
});
