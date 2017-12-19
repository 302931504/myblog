import axios from 'axios';

export function getBBSList () {
	return axios.get('/api/getBBSList').then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getBBSChildList () {
	return axios.get('/api/getBBSChildList').then((res) => {
			return Promise.resolve(res.data);
		}).catch(err => err);
}

/* function initBBS () {
	let bbs;
	let bbsChild;
	let newBbs;
	let newBbsChild = [];
	axios.get('/api/getBBSList').then((res) => {
	    bbs = res.data.data;
	    for (let i = 0; i < bbs.length; i++) {
			newBbs.push({id: bbs[i].bbs_id,
				          reply_id: bbs[i].reply_id,
			              email: bbs[i].user_email,
			              name: bbs[i].user_name,
			              content: bbs[i].bbs_content,
			              time: bbs[i].bbs_time,
			              child: newBbsChild});
		}
	    console.log(bbs);
	    axios.get('/api/getBBSChildList').then((res) => {
			bbsChild = res.data.data;
		}).catch(err => err);
		for (let i = 0; i < newBbs.length; i++) {
	    	for (let j = 0; j < bbsChild.length; j++) {
	    		if (newBbs[i].id === bbsChild[j].parent_id) {
				    newBbs[i].child.push({id: bbsChild[j].bbs_child_id,
										   sender_email: bbsChild[j].sender_email,
										   sender_name: bbsChild[j].sender_name,
										   receiver_email: bbsChild[j].receiver_email,
										   receiver_name: bbsChild[j].receiver_name,
										   content: bbsChild[j].bbs_child_content,
										   time: bbsChild[j].bbs_child_time});
	    		}
	    	}
	    }
    return Promise.resolve(newBbs);	
	}).catch(err => err);
} */