import axios from 'axios';

export function updateInfo (item) {
  return axios.post('/api/updateMInfo', {
    account: item.account,
    password: item.password,
    nickname: item.nickname,
    email: item.email
  }).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    console.log(err);
  });
};