import qs from 'qs';
import axios from 'axios';

export function addWalkingBlog (blog) {
  return axios.post('/api/addWalkingBlog', qs.stringify({
    content: blog.content,
    tags: blog.tags
  })).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getWalkingBlog () {
  return axios.get('/api/getWalkingBlog').then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getblogCount () {
	return axios.get('/api/getblogCount').then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};