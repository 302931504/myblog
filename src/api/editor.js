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

export function deleteClassify (id) {
  return axios.get('/api/deleteClassify?classify_id=' + id).then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function addClassify (text) {
  return axios.get('/api/addClassify?classify_text=' + text).then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function updateBlog (item) {
  return axios.post('/api/updateBlog', qs.stringify({
    id: item.id,
    title: item.title,
    classify_text: item.classify_text,
    tags: item.tags,
    description: item.description,
    content: item.content,
    isShow: item.isShow
  })).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function uploadImg (formData) {
  return axios.post('/api/uploadImg', formData).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    console.log(err);
  });
};