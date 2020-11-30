const { v4: uuidv4 } = require('uuid');
const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const createClip = async function (docClient, req, res) {
    try {
    	validateUtils.assertIsUuid(req.body.recorderId);
		validateUtils.assertIsDefinedString(req.body.recorderName);
		validateUtils.assertIsUuid(req.body.clipReference);

        const clipId = uuidv4();
        const putParams = {
            TableName: "ycClips",
            Item:{
                projectId: req.body.projectId,
                clipId,
                info: {
                    recorderName: req.body.recorderName,
                    recorderId: req.body.recorderId,
                    clipReference: req.body.clipReference,
                    timestamp: Date.now(),
                }
            }
        };

        const result = await dynamoUtils.putObject(docClient, putParams);

        res.json({
            clipId
        });
    } catch (error) {
		expressUtils.handleError(error, res);
    }
}

module.exports = exports = createClip;
