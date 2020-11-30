const validateUtils = require('./validateUtils');
const ValidationError = validateUtils.ValidationError;

const handleError = (error, res) => {
	console.log('error: ' + error.constructor.name);

	if (error instanceof ValidationError) {
		res.status(400).send({ errorCode: 400, error: error.message });
	} else {
		res.status(500).send({ errorCode: 500, error: error.message });
	}
}

module.exports.handleError = handleError;
