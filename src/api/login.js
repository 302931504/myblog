import qs from 'qs';
import axios from 'axios';

export function login (user) {
  return axios.post('/api/login', qs.stringify({
    username: user.username,
    password: user.password
  })).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function logout () {
  return axios.get('/api/logout').then(res => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};