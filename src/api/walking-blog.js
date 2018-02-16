import axios from 'axios';

export function addWalkingBlog (formData) {
  return axios.post('/api/addWalkingBlog', formData).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getWalkingBlog (item) {
  return axios.get('/api/getWalkingBlog', {
    params: {
      page: item.page,
      limit: item.limit
    }
  }).then(res => {
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

export function getWalkDetail (id) {
  return axios.get('/api/getWalkDetail?id=' + id).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    console.log(err);
  }); 
};

export function readWalkingBlog (id) {
  return axios.get('/api/addlikeTimes?id=' + id).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    console.log(err);
  });
};