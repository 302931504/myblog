import axios from 'axios';

export function addUsre (item) {
	return axios.post('/api/addFollow', {
		user_name: item.name,
		user_email: item.email
	}).then((res) => {
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

export function getCount () {
	return axios.get('/api/userCount').then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
};
