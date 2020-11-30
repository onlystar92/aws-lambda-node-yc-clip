const { v4: uuidv4 } = require('uuid');
const dynamoUtils = require('./utils/dynamoUtils');
const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');

const NUM_CHARS = 6;

const generateAccessCode = () => {
	const source = '123456789abcdefghijklmnpqrstuvwxyz';

	let result = '';

	for (let i = 0; i < NUM_CHARS; i++) {
		const index = Math.floor(Math.random() * 34);
		result = result + source.charAt(index);
	}

	return result;
}

const createProject = async function (docClient, req, res) {
	try {
		validateUtils.assertIsDefinedString(req.body.receiverName);
		validateUtils.assertIsDefinedString(req.body.organizerName);
		validateUtils.assertIsUuid(req.body.organizerId);
		validateUtils.assertIsDefinedString(req.body.organizerMessage);

		const projectId = uuidv4();
		const accessCode = generateAccessCode();
		const putParamsProjects = {
			TableName: "ycProjects",
			Item:{
				projectId: projectId,
				info: {
					receiverName: req.body.receiverName,
					organizerName: req.body.organizerName,
					organizerId: req.body.organizerId,
					organizerMessage: req.body.organizerMessage,
					timestamp: Date.now(),
					isBeingStitched: false,
					stitchedClipRef: null
				}
			}
		};

		const putParamsAccessCodes = {
			TableName: "ycAccessCodes",
			Item:{
				accessCode: accessCode,
				info: {
					projectId: projectId
				}
			}
		};

		const accessCodeResult = await dynamoUtils.putObject(docClient, putParamsAccessCodes);
		const projectResult = await dynamoUtils.putObject(docClient, putParamsProjects);

		res.json({
			projectId,
			accessCode,
		});
	} catch (error) {
		expressUtils.handleError(error, res);
	}
}

module.exports = exports = createProject;
