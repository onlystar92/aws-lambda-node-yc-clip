const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');
const stitchProject = async function (docClient, lambda, req, res) {
	try {
		validateUtils.assertIsUuid(req.body.projectId);
		const queryParams = {
			TableName: "ycClips",
			KeyConditionExpression: 'projectId = :hkey',
			ExpressionAttributeValues: {
				':hkey': req.body.projectId
			}
		};
		const getClipsResult = await dynamoUtils.queryObject(docClient, queryParams); //parameters: projectid, clipResult

		let output = {};
	
		lambda.invoke({
			FunctionName: 'stitchLambdaFunction',
			Payload: JSON.stringify({
				'projectId': req.body.projectId,
				'getClipsResult': getClipsResult
			  }),
		}, async function (err, data) {
			if (err) {
				output = {
					stitchInfo: err
				}
			} else {
				const updateParams = {
					TableName: "ycProjects",
					Key: {
						projectId: req.body.projectId,
					},
					UpdateExpression: "set info.isBeingStitched = :r",
					ExpressionAttributeValues: {
						":r": true,
					},
					ReturnValues: "UPDATED_NEW"
				};
				try {
					const updateProjectResult = await dynamoUtils.updateObject(docClient, updateParams);
					output = {
						stitchInfo: data,
						updateDB: updateProjectResult
					}
				} catch (error) {
					console.log(error);
				}
				
			}
			res.json({output});
		});

	
	} catch (error) {
		expressUtils.handleError(error, res);
	}

}

module.exports = exports = stitchProject;