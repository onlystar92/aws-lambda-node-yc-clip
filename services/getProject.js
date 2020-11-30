const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const getProject = async function (docClient, req, res) {
	try {
		validateUtils.assertIsUuid(req.params.projectId);

		const getParams = {
			TableName: "ycProjects",
			Key:{
				projectId: req.params.projectId,
			}
		};

		const getProjectResult = await dynamoUtils.getObject(docClient, getParams);

		res.json(getProjectResult.Item);
	} catch (error) {
		expressUtils.handleError(error, res);
	}
}

module.exports = exports = getProject;
