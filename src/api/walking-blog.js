import axios from 'axios';

export function addWalkingBlog (formData) {
  return axios.post('/api/addWalkingBlog', formData).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getWalkingBlog () {
  return axios.get('/api/getWalkingBlog').then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function deleteWBlog (id) {
	return axios.get('/api/deleteWBlog?id=' + id).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
};
