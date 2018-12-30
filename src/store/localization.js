import axios from 'axios';
import xml2js from 'xml2js';
import appState from '../lib/appState';


const transformLanguagePack = (data) => {
  if (data.charAt(0) == 1) {
    return data;
  }
  const re1 = new RegExp(data.charAt(0), 'g');
  const re2 = new RegExp(data.charAt(3), 'g');
  return data.replace(re1, '').replace(re2, '');
};
let _resolver;
export const initPromise = new Promise(res => {
  _resolver = res;
});
export default {
  getters:{
    _(state){
      let en = state.englishData;
      return s => state.language === 'EN' || !en || en.indexOf(s) === -1 ?
        s : state.localeData[en.indexOf(s)];
    }
  },
  state:{
    language:'EN',
    languagePacks:[],
    englishData:[],
    localeData:[]
  },
  mutations:{
    setLanguagePacks:(state,packs) => state.languagePacks = packs,
    localeData:(state,{langCode,locArray}) => {
      state.localeData = locArray;
      state.language = langCode;
    }
  },
  actions:{
    initLocalization({state,commit}){
      state.language = appState.get('language') || 'EN';
      if (state.language !== 'EN'){
        initPromise.then(() => this.dispatch('setLanguage',state.language));
      }
      axios.get('//worldwidetelescope.org/wwtweb/catalog.aspx?X=Languages').then(response => {

        xml2js.parseString(response.data,(e,packs) => {
          if (e){
            console.warn('Languages not initialized',e);
            return;
          }
          packs = packs.LanguagePacks.LanguagePack.map(p => p.$);

          commit('setLanguagePacks',packs);
          axios.get(packs[0].Url).then((res) => {
            let data = transformLanguagePack(res.data);

            const dsplit = data.split('\n');
            let englishArray = [];
            dsplit.forEach(line => {
              const tabSplit = line.split('\t');
              let s = tabSplit[1];
              const index = Number(tabSplit[0]);
              if (s){
                s = s.split('\r')[0];
              }
              englishArray[index] = s;
            });
            state.englishData = englishArray;
            //console.log({englishArray,lpacks:state.lpacks});
            _resolver(true);
          });
        });
      });
    },
    setLanguage({state,commit},langCode){
      appState.set('language',langCode);
      state.langCode = langCode;
      initPromise.then(() => {

        let lpack = state.languagePacks.find(p => p.Code.toLowerCase() === langCode.toLowerCase());
        axios.get(lpack.Url).then(res => {
          let data = transformLanguagePack(res.data);
          let locArray = [];
          data.split('\n').forEach(item => {
            const spl = item.split('\t');
            const ind = parseInt(spl[0], 10);
            if (spl.length === 2 && !isNaN(ind)) {
              locArray[ind] = spl[1];
              //console.log(ind, item);
            }
          });
          commit('localeData',{ locArray,langCode});
        });
      });

    }
  }
};