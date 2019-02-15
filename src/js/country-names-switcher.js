const countryNameSpan = document.querySelector('#badge-text-B');

const countrySwitchNames = () => {
	const nameList = Object.keys(countryNames);
	const index = Math.floor(Math.random() * nameList.length);
	const name = nameList[index];
	document.title = `Made with ❤ in ${name}`;
	countryNameSpan.innerHTML = name;
};

setInterval(countrySwitchNames, 1500);
