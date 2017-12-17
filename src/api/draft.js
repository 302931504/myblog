// import qs from 'qs';
import axios from 'axios';

export function getDraftByPage () {
	return axios.get('/api/getDraftList').then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getDraftCount () {
	return axios.get('/api/getDraftCount').then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function deletBlog (id) {
	return axios.get('/api/deleteBlog?id=' + id).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};