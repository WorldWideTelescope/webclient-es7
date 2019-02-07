import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import sdk from './sdk/wwtsdk';
Vue.config.productionTip = false;
console.log({sdk});
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
