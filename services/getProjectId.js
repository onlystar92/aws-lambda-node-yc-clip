const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const getProjectId = async function (docClient, req, res) {
	try {
		validateUtils.assertIsAccessCode(req.params.accessCode);

		const getParams = {
			TableName: "ycAccessCodes",
			Key:{
				accessCode: req.params.accessCode,
			}
		};

		const getProjectIdResult = await dynamoUtils.getObject(docClient, getParams);

		res.json(getProjectIdResult.Item);
	} catch (error) {
		expressUtils.handleError(error, res);
	}
}

module.exports = exports = getProjectId;
