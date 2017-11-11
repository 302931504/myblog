import * as types from './mutation-types';

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

export const deleteNav = function ({commit, state}, {name}) {
	const index = state.navList.findIndex((nav) => {
		return nav.name === name;
	});
    commit(types.DELETE_NAV, index);
};