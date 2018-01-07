import axios from 'axios';
import qs from 'qs';

export function getBBSList (item) {
	return axios.get('/api/getBBSList', {
		params: {
			reply_id: item.reply_id,
			page: item.page,
			type: item.type
		}
	}).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getBBSChildList () {
	return axios.get('/api/getBBSChildList').then((res) => {
			return Promise.resolve(res.data);
		}).catch(err => err);
};

export function comment (item) {
	return axios.post('/api/comment', {
		reply_id: item.reply_id,
		uemail: item.user_email,
		uname: item.user_name,
		content: item.bbs_content,
		type: item.type
	}).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function addChildBBS (item) {
	return axios.post('/api/addChildBBS', qs.stringify({
		parent_id: item.parent_id,
		user_email: item.user_email,
		user_name: item.user_name,
		bbs_child_content: item.bbs_content
	})).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function deleteBBS (id) {
	return axios.get('/api/deleteBBS?bbs_id=' + id).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function deleteChildBBS (id) {
	return axios.get('/api/deleteChildBBS?id=' + id).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};
