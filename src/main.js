import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import colorpicker from 'v-cpicker';
Vue.use(colorpicker);

import movable from 'v-movable';
Vue.use(movable);
//import wwtlib from './sdk/wwtsdk';

Vue.config.productionTip = false;
//console.log({wwtlib});
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

