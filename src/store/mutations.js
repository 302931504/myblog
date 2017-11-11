import * as types from './mutation-types';

const mutation = {
  [types.PUSH_NAVLIST] (state, newNav) {
    state.navList.push(newNav);
  },
  [types.DELETE_NAV] (state, index) {
    state.navList.splice(index, 1);   
  }
};

export default mutation;