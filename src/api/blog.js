import axios from 'axios';

export function getOnlineBlog () {
  return axios.get('/api/getOnlineBlog').then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getOnlineArticleCount () {
  return axios.get('/api/getOnlineArticleCount').then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};