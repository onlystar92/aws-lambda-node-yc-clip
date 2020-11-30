document.addEventListener('DOMContentLoaded', function(event) {
	setInputVal('#create-project-organizer-id', uuidv4());
	setInputVal('#create-upload-endpoint-is-android', 'true');
	setInputVal('#create-upload-endpoint-key', uuidv4());

	registerClickHandler('#delete-tables-btn', () => {
		doFetch('DELETE', 'delete-tables', {}).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#create-tables-btn', () => {
		doFetch('POST', 'create-tables', {}).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#create-clip-btn', () => {
		const body = {
			recorderName: 'Gekke henkie',
			recorderId: uuidv4(),
			clipReference: getInputVal('#create-clip-clip-reference'),
			projectId: getInputVal('#create-clip-project-id')
		};

		doFetch('POST', 'create-clip', body).then(response => {
			console.log('response', response);
			setInputVal('#delete-clip-clip-id', response.clipId);
		}, handleFetchError);
	});

	registerClickHandler('#create-project-btn', () => {
		const body = {
			receiverName: 'Tante Sjaan',
			organizerName: 'Thomas',
			organizerId: uuidv4(),
			organizerMessage: 'Neem een filmpje op voor Tante Sjaan'
		};

		doFetch('POST', 'create-project', body).then(response => {
			console.log('response', response);
			setInputVal('#create-clip-project-id', response.projectId);
			setInputVal('#delete-clip-project-id', response.projectId);
			setInputVal('#delete-project-project-id', response.projectId);
			setInputVal('#get-clips-project-id', response.projectId);
			setInputVal('#get-project-project-id', response.projectId);
			setInputVal('#get-project-id-access-code', response.accessCode);
			setInputVal('#stitch-project-project-id', response.projectId);
		}, handleFetchError);
	});

	registerClickHandler('#delete-clip-btn', () => {
		const body = {
			projectId: getInputVal('#delete-clip-project-id'),
			clipId: getInputVal('#delete-clip-clip-id'),
		};

		doFetch('DELETE', 'delete-clip', body).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#delete-project-btn', () => {
		const body = {
			projectId: getInputVal('#delete-project-project-id'),
		};

		doFetch('DELETE', 'delete-project', body).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#get-clips-btn', () => {
		const projectId = getInputVal('#get-clips-project-id');

		doFetch('GET', 'get-clips/' + projectId).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#get-project-btn', () => {
		const projectId = getInputVal('#get-project-project-id');

		doFetch('GET', 'get-project/' + projectId).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#get-project-id-btn', () => {
		const accessCode = getInputVal('#get-project-id-access-code');

		doFetch('GET', 'get-project-id/' + accessCode).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#stitch-project-btn', () => {
		const body = {
			projectId: getInputVal('#stitch-project-project-id'),
		};

		doFetch('POST', 'stitch-project', body).then(handleFetchResult, handleFetchError);
	});

	registerClickHandler('#create-upload-endpoint-btn', () => {
		const body = {
			isAndroid: getInputVal('#create-upload-endpoint-is-android') === 'true',
			key: getInputVal('#create-upload-endpoint-key')
		};

		doFetch('POST', 'create-upload-endpoint', body).then(response => {
			setInputVal('#upload-movie-url', response.endpoint);
		}, handleFetchError);
	});

	registerClickHandler('#upload-movie-btn', () => {
		const url = getInputVal('#upload-movie-url');
		const selectedFile = document.getElementById('movie').files[0];

		uploadMovie(url, selectedFile);
	})
});
