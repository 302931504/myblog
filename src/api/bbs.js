import axios from 'axios';
import qs from 'qs';

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

export function getComment (item) {
	return axios.get('/api/getComment', {
		params: {
			reply_id: item.reply_id,
			type: item.type
		}
	}).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
};

export function quote (item) {
	return axios.post('/api/quote', {
		reply_id: item.reply_id,
		uemail: item.user_email,
		uname: item.user_name,
		content: item.bbs_content,
		type: item.type,
		to_email: item.to_email,
		to_content: item.to_content,
		old_user: item.old_user
	}).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
};