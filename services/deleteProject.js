const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const deleteProject = async function (docClient, req, res) {
	try {
		validateUtils.assertIsUuid(req.body.projectId);

		const deleteParams = {
			TableName:"ycProjects",
			Key:{
				projectId: req.body.projectId,
			}
		};

		const deleteProjectResult = await dynamoUtils.deleteObject(docClient, deleteParams);

		res.json({
			projectId: req.body.projectId,
		});
	} catch (error) {
		expressUtils.handleError(error, res);
	}
}

module.exports = exports = deleteProject;
