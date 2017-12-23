import axios from 'axios';
import qs from 'qs';

export function getBBSList () {
	return axios.get('/api/getBBSList').then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getBBSChildList () {
	return axios.get('/api/getBBSChildList').then((res) => {
			return Promise.resolve(res.data);
		}).catch(err => err);
};

export function addBBS (item) {
	return axios.post('/api/addBBS', qs.stringify({
		reply_id: item.reply_id,
		user_email: item.user_email,
		user_name: item.user_name,
		bbs_content: item.bbs_content
	})).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};