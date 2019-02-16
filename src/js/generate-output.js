const form = document.querySelector('form');
const inputCountrySelect = document.querySelector('#input-country-select');

const getSearchParamsData = () => {
	const formValues = Object.values(form).reduce((obj, field) => {
		obj[field.name] = {
			value: field.type === 'checkbox' ? field.checked : field.value,
			default: field.dataset.default
		};
		return obj;
	}, {});

	const searchParamsData = {};
	Object.keys(formValues).forEach(key => {
		if (key === 'country') {
			return;
		}

		const field = formValues[key];
		if (field.value.toString() === field.default) {
			return;
		}

		searchParamsData[key] = field.value;
	});

	return searchParamsData;
};

form.addEventListener('change', () => {
	const countryName = inputCountrySelect.value;

	let searchParams = new URLSearchParams(getSearchParamsData()).toString();
	searchParams = searchParams === '' ? '' : `?${searchParams}`;
	const badgeUrl = `https://madewithlove.now.sh/${countryNames[countryName]}${searchParams}`;

	document.querySelector('#output-svg').src = badgeUrl;
	document.querySelector('#output-url').innerHTML = badgeUrl;
	document.querySelector('#output-html').innerHTML = `&lt;img src="${badgeUrl}"&gt;`;
	document.querySelector('#output-md').innerHTML = `![Made with love in ${countryName}](${badgeUrl})`;
	document.querySelector('#output-rst').innerHTML = `.. image:: ${badgeUrl}`;
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
});
