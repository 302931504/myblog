import qs from 'qs';
import axios from 'axios';

export function saveBlog (item) {
  return axios.post('/api/saveBlog', qs.stringify({
    title: item.title,
    classify_text: item.classify_text,
    tags: item.tags,
    description: item.description,
    content: item.content,
    isShow: item.isShow
  })).then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getClassify () {
	return axios.get('/api/getClassify').then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};