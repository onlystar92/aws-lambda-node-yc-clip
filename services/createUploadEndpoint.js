const expressUtils = require('./utils/expressUtils');
const validateUtils = require('./utils/validateUtils');
const { v4: uuidv4 } = require('uuid');


const createUploadEndpoint = async function (s3Client, req, res) {
    try {
        validateUtils.assertIsBoolean(req.body.isAndroid);
		validateUtils.assertIsUuid(req.body.key);

        const params = {
            Bucket: 'uploaded-yc-clips',
            Key: req.body.key + '.mp4',
            Expires: 30 * 60,
            ContentType: 'video/mp4'
        };

        const signedURL = await (new Promise((resolve, reject) => {
            s3Client.getSignedUrl(
                'putObject',
                params,
                (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                }
            );
        }));

        res.json({
            endpoint: signedURL
        });
    } catch (error) {
        expressUtils.handleError(error, res);
    }
}

module.exports = exports = createUploadEndpoint;
