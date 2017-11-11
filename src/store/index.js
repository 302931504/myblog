import Vue from 'vue';
import vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';
import * as getters from './getters';
import state from './state';
import createLogger from 'vuex/dist/logger';

Vue.use(vuex);

const debug = process.env.NODE_DEV !== 'production';
export default new vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});