const putObject = (docClient, putParams) => {
	return new Promise((resolve, reject) => {
		docClient.put(putParams, function(err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

const getObject = (docClient, getParams) => {
	return new Promise((resolve, reject) => {
		docClient.get(getParams, function(err, data) {
			if (err) {
				reject(err)
			} else {
				resolve(data);
			}
		});
	})
}

const queryObject = (docClient, queryParams) => {
	return new Promise((resolve, reject) => {
		docClient.query(queryParams, function(err, data) {
			if (err) {
				reject(err)
			} else {
				resolve(data);
			}
		});
	})
}

const updateObject = (docClient, updateParams) => {
	return new Promise((resolve, reject) => {
		docClient.update(updateParams, function(err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

const deleteObject = (docClient, deleteParams) => {
	return new Promise((resolve, reject) => {
		docClient.delete(deleteParams, function(err, data) {
			if (err) {
				reject(err)
			} else {
				resolve(data);
			}
		});
	})
}

module.exports.putObject = putObject;
module.exports.getObject = getObject;
module.exports.updateObject = updateObject;
module.exports.queryObject = queryObject;
module.exports.deleteObject = deleteObject;
