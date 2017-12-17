import * as types from './mutation-types';

const mutation = {
  [types.PUSH_NAVLIST] (state, newNav) {
    state.navList.push(newNav);
  },
  [types.DELETE_NAV] (state, index) {
    state.navList.splice(index, 1);   
  },
  [types.DELETE_ALL_NAV] (state) {
  	state.navList = [{text: '后台首页', name: 'home'}];
  },
  [types.SET_CURRENTNAME] (state, name) {
  	state.currentName = name;
  },
  [types.SET_EDITBLOG] (state, blog) {
    state.editBlog = blog;
  }
};

export default mutation;