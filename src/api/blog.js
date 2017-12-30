import axios from 'axios';

export function getOnlineBlogByPage (page) {
  return axios.get('/api/getOnlineBlog?page=' + page).then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getOnlineArticleCount () {
  return axios.get('/api/getOnlineArticleCount').then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};