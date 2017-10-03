import Vue from 'vue';

import 'vue-awesome/icons/calendar';
import 'vue-awesome/icons/clock-o';
import 'vue-awesome/icons/desktop';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/github';
import 'vue-awesome/icons/money';
import 'vue-awesome/icons/percent';
import Icon from 'vue-awesome/components/Icon';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

/**
 * Componentes GLobales de Vue.js:
 * Aquí registraremos todos los componentes globales que necesitemos!
 */
Vue.component('icon', Icon);

const app = new Vue({
  router,
  render: h => h(App),
});

app.$mount('#app');
