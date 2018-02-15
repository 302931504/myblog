export function initTime (time) {
	let myDate = new Date(time);
	let Year = myDate.getFullYear();
	let Month = myDate.getMonth() + 1;
	let Day = myDate.getDate();
	let Hours = myDate.getHours();
	let Minutes = myDate.getMinutes();
	let Seconds = myDate.getSeconds();
	if (Month < 10) {
		Month = '0' + Month;
	} 
	if (Day < 10) {
		Day = '0' + Day;
	}
	if (Hours < 10) {
		Hours = '0' + Hours;
	}
	if (Minutes < 10) {
		Minutes = '0' + Minutes;
	}
	if (Seconds < 10) {
		Seconds = '0' + Seconds;
	}
	let newtime = Year + '-' + Month + '-' + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
	return newtime;
};

export function checkEmail (email) {
	var regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if (regex.test(email)) {
		return true;
	} else {
		return false;
	}
};

/* export function initBBS (arr) {
	if (!arr.length) {
		return;
	}
	let newArr = [];
	let child = [];
	let i = 0;
	// let j = i + 1;
	for (i; i < arr.length - 1; i++) {
		if (arr[i].bbs_id !== arr[i + 1].bbs_id) {
		    newArr.push({
		    	id: arr[i].bbs_id,
		        reply_id: arr[i].reply_id,
		    	name: arr[i].user_name,
		    	email: arr[i].user_email,
			    content: arr[i].bbs_content,
			    time: arr[i].bbs_time,
			    type: arr[i].type,
			    child: []
		    });
		}
		if (arr[i].bbs_child_id) {
			child.push({
				id: arr[i].bbs_child_id,
				parent_id: arr[i].parent_id,
				email: arr[i].child_email,
				name: arr[i].child_name,
				content: arr[i].bbs_child_content,
				time: arr[i].bbs_child_time
			});
		}
	}
	newArr.push({
		id: arr[i].bbs_id,
        reply_id: arr[i].reply_id,
    	name: arr[i].user_name,
    	email: arr[i].user_email,
	    content: arr[i].bbs_content,
	    time: arr[i].bbs_time,
	    type: arr[i].type,
	    child: []
	});
	if (arr[i].bbs_child_id) {
		child.push({
			id: arr[i].bbs_child_id,
			parent_id: arr[i].parent_id,
			email: arr[i].child_email,
			name: arr[i].child_name,
			content: arr[i].bbs_child_content,
			time: arr[i].bbs_child_time
		});
	}
	i = 0;
	for (i; i < newArr.length; i++) {
		for (let j = 0; j < child.length; j++) {
			if (newArr[i].id === child[j].parent_id) {
				newArr[i].child.push(child[j]);
			}
		}
	}

	return newArr; 
}; */

export function initBBS (arr) {
	let newArr = [];
	for (let i = 0; i < arr.length; i++) {
		newArr.push({
			id: arr[i].bbs_id,
	        reply_id: arr[i].reply_id,
	    	name: arr[i].user_name,
	    	email: arr[i].user_email,
		    content: arr[i].bbs_content,
		    time: arr[i].bbs_time,
		    type: arr[i].type,
		    child: arr[i].child
		});
	}
	return newArr;
};

export function trim (s) {
	return s.replace(/(^\s*)|(\s*$)/g, '');
};
