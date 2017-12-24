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
		type: item.type,
		user_email: item.user_email,
		user_name: item.user_name,
		bbs_content: item.bbs_content
	})).then((res) => {
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

export function getbbsCount () {
	return axios.get('/api/getbbsCount').then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};