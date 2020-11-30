const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const getClips = async function (docClient, req, res) {
	try {
		validateUtils.assertIsUuid(req.params.projectId);

		const queryParams = {
			TableName: "ycClips",
			KeyConditionExpression : 'projectId = :hkey',
			ExpressionAttributeValues : {
				':hkey' : req.params.projectId
			}
		};

		const getClipsResult = await dynamoUtils.queryObject(docClient, queryParams);

		res.json(getClipsResult.Items);
	} catch (error) {
		expressUtils.handleError(error, res);
	}
}

module.exports = exports = getClips;
