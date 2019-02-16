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

const generateOutput = () => {
	const countryName = inputCountrySelect.value;

	const searchParamsData = getSearchParamsData();
	let searchParams = new URLSearchParams(searchParamsData).toString();
	searchParams = searchParams === '' ? '' : `?${searchParams}`;
	const badgeUrl = `https://madewithlove.now.sh/${countryNames[countryName]}${searchParams}`;

	const textB = 'text' in searchParamsData ? searchParamsData.text : countryName;
	const altText = `Made with love in ${textB}`;
	document.querySelector('#output-svg').src = badgeUrl;
	document.querySelector('#output-url').innerHTML = badgeUrl;
	document.querySelector('#output-html').innerHTML = `&lt;img src="${badgeUrl}" alt="${altText}"&gt;`;
	document.querySelector('#output-md').innerHTML = `![${altText}](${badgeUrl})`;
	document.querySelector('#output-rst').innerHTML = `.. image:: ${badgeUrl}`;
};

form.addEventListener('change', generateOutput);

form.addEventListener('submit', e => {
	e.preventDefault();
});

generateOutput();
