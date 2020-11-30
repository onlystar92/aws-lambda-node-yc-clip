const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const stitchProject = async function (docClient, req, res) {
	try {
		validateUtils.assertIsUuid(req.body.projectId);

		const updateParams = {
			TableName:"ycProjects",
			Key:{
				projectId: req.body.projectId,
			},
			UpdateExpression: "set info.isBeingStitched = :r",
			ExpressionAttributeValues:{
				":r":true,
			},
			ReturnValues:"UPDATED_NEW"
		};

		const updateProjectResult = await dynamoUtils.updateObject(docClient, updateParams);

		res.json({
			projectId: req.body.projectId,
			info: updateProjectResult.Attributes.info
		});
	} catch (error) {
		expressUtils.handleError(error, res);
	}
}

module.exports = exports = stitchProject;
