// import qs from 'qs';
import axios from 'axios';

export function getDraftByPage (page) {
	return axios.get('/api/getDraft?page=' + page).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getDraftCount () {
	return axios.get('/api/getDraftCount').then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function deletBlog (id) {
	return axios.get('/api/deletBlog?id=' + id).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};