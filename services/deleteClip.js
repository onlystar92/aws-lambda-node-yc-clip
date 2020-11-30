const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const deleteClip = async function (docClient, req, res) {
	try {
		validateUtils.assertIsUuid(req.body.projectId);
		validateUtils.assertIsUuid(req.body.clipId);

		const getParams = {
			TableName: "ycClips",
			Key:{
				projectId: req.body.projectId,
				clipId: req.body.clipId,
			}
		};

		const getClipResult = await dynamoUtils.getObject(docClient, getParams);
		const clipReference = getClipResult.Item.info.clipReference;

		//hier was ik nu s3 ding weggooien.

		console.log('getClipResult', getClipResult);

		const deleteParams = {
			TableName:"ycClips",
			Key:{
				projectId: req.body.projectId,
				clipId: req.body.clipId,
			}
		};

		const deleteClipResult = await dynamoUtils.deleteObject(docClient, deleteParams);

		res.json({
			projectId: req.body.projectId,
			clipId: req.body.clipId,
		});
	} catch (error) {
		expressUtils.handleError(error, res);
	}
}

module.exports = exports = deleteClip;
