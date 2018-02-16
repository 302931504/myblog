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

export function trim (s) {
	return s.replace(/(^\s*)|(\s*$)/g, '');
};
