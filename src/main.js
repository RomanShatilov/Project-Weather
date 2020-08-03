import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueGeolocation from 'vue-browser-geolocation';
import style from './scss/index.scss';

Vue.config.productionTip = false;
Vue.use(
    VueGeolocation,
    style
);

new Vue({
  vuetify,
  router,
  store,
  VueAxios,
  axios,
  VueGeolocation,
  render: h => h(App)
}).$mount('#app')
