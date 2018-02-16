import axios from 'axios';
import qs from 'qs';

export function getBlogByPage (item) {
  return axios.get('/api/getBlogList', {
  	params: {
  		page: item.page,
  		isShow: item.isShow
  	}
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
};

export function getAllCount () {
  return axios.get('/api/getNum').then((res) => {
    return Promise.resolve(res.data);
  }).catch(err => err);
}; 

export function getKeyBlog (item) {
	return axios.get('/api/getKeyBlog?isShow=' + item.isShow + '&keyWord=' + item.keyWord).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
}; 

export function getClassifyBlog (item) {
	return axios.get('/api/getClassifyBlog?isShow=' + item.isShow + '&text=' + item.text).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function draftBlog (id) {
	return axios.post('/api/draftBlog', qs.stringify({
		id: id
	})).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getCount (isShow) {
	return axios.get('/api/getCount', {
		params: {
			isShow: isShow
		}
	}).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
}

export function getAdjacent (item) {
	return axios.get('/api/getAdjacentBlog', {
		params: {
			id: item.id,
			show: item.show
		}
	}).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
}

export function getOnlineBlog (page) {
	return axios.get('/api/getOnlineBlogList?page=' + page).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
}

export function readArticle (id) {
	return axios.get('/api/addLookTimes?id=' + id).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
}

export function clickLike (id) {
	return axios.get('/api/clickLike?id=' + id).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
}