import Vue from 'vue';
import Vuex from 'vuex';
import modals from './modals';
import localization from './localization';
import ui from './ui';
import places from './places';
import util from '../lib/util';

Vue.use(Vuex);

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
    ctl:{},wc:{},ctrlInst:{},//todo:consolidate globally
    layerManagerHidden:false,
    instant:false,
    tracking:null
  },
  mutations: {
    init(state,ctl){
      state.ctrlInst = ctl;
      let mars = wwtlib.WWTControl.imageSets.find(s=>s._name==='Visible Imagery');
      mars.set_name('Mars');
    },
    setAny(state, obj){
      Object.keys(obj).forEach(k => state[k] = obj[k]);
    },
    toggleAny(state, key){
      state[key] = !state[key];
    }
  },
  actions: {
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