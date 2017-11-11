// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import './common/less/index.less';

Vue.use(mavonEditor);
var instance = axios.create({
	headers: {'content-type': 'application/x-www-form-urlencoded'}
});
Vue.prototype.$http = instance;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
