import Vue from 'vue';
import Vuex from 'vuex';
import modals from './modals';
import localization from './localization';
import ui from './ui';
import places from './places';

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
    layerManagerHidden:false
  },
  mutations: {
    init(state,ctl){
      state.ctrlInst = ctl;
      state.imageSets = wwtlib.WWTControl.imageSets;
    },
    setAny(state, obj){
      Object.keys(obj).forEach(k => state[k] = obj[k]);
    },
    toggleAny(state, key){
      state[key] = !state[key];
    }
  },
  actions: {

  }
});
