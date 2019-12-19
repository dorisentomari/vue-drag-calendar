import Vue from 'vue';
import App from './App.vue';

import { Button, ButtonGroup } from 'view-design';
import 'view-design/dist/styles/iview.css';
import './drag-calendar.scss';

import constant from './constant';

Vue.component('Button', Button);
Vue.component('ButtonGroup', ButtonGroup);

Vue.prototype.$constant = constant;

new Vue({
  render: h => h(App),
}).$mount('#app');
