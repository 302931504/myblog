import axios from 'axios';

export function getClassify () {
	return axios.get('/api/getClassifyCount').then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
};

export function getArticleTitle () {
	return axios.get('/api/getBlogDate').then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
};

export function getClassifyArticle (classify) {
	return axios.get('/api/getClassifyBlogDate?classify=' + classify).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => {
		console.log(err);
	});
};