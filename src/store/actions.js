import * as types from './mutation-types';
import {saveBlogs, saveUser} from '../common/js/cache';

export const pushNav = function ({commit, state}, {text, name}) {
	const index = state.navList.findIndex((nav) => {
		return nav.text === text;
	});
	if (index === -1) {
		const newNavA = {
			text: text,
			name: name
		};
		commit(types.PUSH_NAVLIST, newNavA);
	}
};

export const deleteNav = function ({commit, state}, name) {
	const index = state.navList.findIndex((nav) => {
		return nav.name === name;
	});
    commit(types.DELETE_NAV, index);
};  

export const deleteOthers = function ({commit, state}) {
	const index = state.navList.findIndex((nav) => {
		return nav.name === state.currentName;
	});
	const item = state.navList[index];
	commit(types.DELETE_ALL_NAV);
	commit(types.PUSH_NAVLIST, item);
};

export const pushLikeBlogs = function ({commit}, id) {
	commit(types.SET_LIKEBLOGS, saveBlogs(id));
};

export const saveCurrentUser = function ({commit}, {username, email}) {
	const user = {
		username,
		email
	};
	commit(types.SAVE_USER, saveUser(user));
};