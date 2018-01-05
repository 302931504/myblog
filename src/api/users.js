import qs from 'qs';
import axios from 'axios';

export function addUsre (item) {
	return axios.post('/api/addFollow', qs.stringify({
		user_name: item.name,
		user_email: item.email
	})).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function deleteUser (id) {
	return axios.get('/api/deleteUser?user_id=' + id).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getUserList (page) {
	return axios.get('/api/getUserList?page=' + page).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};
