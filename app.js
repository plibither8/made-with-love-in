const path = require('path');
const fastify = require('fastify')();
const {BadgeFactory} = require('gh-badges');
const DATA = require('./data.json');

fastify.register(require('fastify-static'), {
	root: path.join(__dirname, 'public'),
	prefix: '/public/',
})

fastify.get('/', (req, reply) => {
	return reply.sendFile('index.html');
});

fastify.get('/index.js', (req, reply) => {
	return reply.sendFile('index.js');
});

fastify.get('/list', (req, reply) => {
	return reply.json(DATA);
});

fastify.get('/:countryCode', (req, reply) => {
	let {countryCode} = req.params;
	countryCode = countryCode.toLowerCase();

	if (countryCode === "pt") {
		return reply.send();
	}

	if (!(countryCode in DATA)) {
		reply.status(400);
		return reply.send(`<pre>Error 400: country code "${countryCode}" not found.\nGET /list for list of valid country codes.</pre>`);
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

	reply.type('image/svg+xml');
	return reply.send(badgeSvg);
});

fastify.listen(process.env.PORT || 5000);
