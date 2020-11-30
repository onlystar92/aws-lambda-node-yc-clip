const uuidv4 = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

const getBaseUrl = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const envId = urlParams.get('env');

	return envId ? ENVIRONMENTS[envId] : ENVIRONMENTS.local;
}

const setInputVal = (selector, value) => {
	document.querySelector(selector).value = value;
}

const getInputVal = (selector) => {
	return document.querySelector(selector).value;
}

const registerClickHandler = (selector, handler) => {
	document.querySelector(selector).addEventListener('click', handler );
}

const handleFetchResult = result => {
	console.log('result', result)
};

const handleFetchError = error => {
	console.log('error', error);
};

const doFetch = (method, url, body) => {
	return (new Promise((resolve, reject) => {
		fetch(getBaseUrl() + url, {
			method: method,
			headers: {'Content-Type': 'application/json'},
			body: body ? JSON.stringify(body) : undefined
		}).then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return response.json();
			}
		}).then(result => {
			if (result.errorCode) {
				reject(result);
			} else {
				resolve(result);
			}
		});
	}));
}

const uploadMovie = (url, file) => {
	fetch(url, {
		method: 'PUT',
		body: file,
		headers: {
			'Content-Type': file.type,
		},
	}).then(response => {
		console.log('done', response.ok);
		if (response.ok) {
			setInputVal('#create-upload-endpoint-key', uuidv4());
			setInputVal('#create-clip-clip-reference', getInputVal('#create-upload-endpoint-key'))
		}
	});
}
