const path = require('path');
const express = require('express');
const expressGa = require('express-ga-middleware');
const {BadgeFactory} = require('gh-badges');
const DATA = require('./data.json');

const app = express();

app.use(expressGa('UA-86157079-9'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	return res.sendFile('public/index.html', {
		root: __dirname
	});
});

app.get('/list', (req, res) => {
	return res.json(DATA);
});

app.get('/:countryCode', (req, res) => {
	let {countryCode} = req.params;
	countryCode = countryCode.toLowerCase();

	if (!(countryCode in DATA)) {
		res.status(400);
		return res.send(`<pre>Error 400: country code "${countryCode}" not found.\nGET /list for list of valid country codes.</pre>`);
	}

	const config = {
		heart: false,
		...req.query
	};

	const countryName = DATA[countryCode.toLowerCase()];

	const countryText = 'text' in config ? config.text : countryName;

	const badgeFormat = {
		template: 'flat',
		colorB: '#dc3545',
		...config,
		text: [
			`Made with ${config.heart ? '❤' : 'love'} in`,
			countryText
		]
	};

	const badgeSvg = new BadgeFactory().create(badgeFormat);
	console.log(badgeSvg);

	res.type('svg');
	return res.send(badgeSvg);
});

app.listen(process.env.PORT || 5000);
