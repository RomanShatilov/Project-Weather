// Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import {i18n} from './plugins/i18n';

// Import Vue App, routes, store
import App from './App';
import routes from './routes';

Vue.use(VueRouter);

// Configure router
const router = new VueRouter({
  routes,
  i18n,
  linkActiveClass: 'active',
  mode: 'history',
});

new Vue({
  el: '#root',
  router,
  i18n,
  data: {

  },
  components: {
  },
  mounted() {

  },

  methods: {

  },
  render: h => h(App),
});