const express = require('express');
const helmet = require('helmet');
const csp = require('helmet-csp');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");
const app = express();
const port = 3000;
const deleteTables = require('./services/deleteTables');
const createTables = require('./services/createTables');

const createClip = require('./services/createClip');
const createProject = require('./services/createProject');
const createUploadEndpoint = require('./services/createUploadEndpoint');
const deleteClip = require('./services/deleteClip');
const deleteProject = require('./services/deleteProject');
const getClips = require('./services/getClips');
const getProject = require('./services/getProject');
const getProjectId = require('./services/getProjectId');
const stitchProject = require('./services/stitchProject');

AWS.config.update({
    accessKeyId: 'AKIAYFG7DFPBABBYDCFN',
    secretAccessKey: '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',
    region: "eu-central-1",
    signatureVersion: 'v4',
});

const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
const docClient = new AWS.DynamoDB.DocumentClient();
const s3Client = new AWS.S3({
    signatureVersion: 'v4',
    region: 'eu-central-1',
    endpoint: new AWS.Endpoint('uploaded-yc-clips.s3-accelerate.amazonaws.com'),
    useAccelerateEndpoint: true,
});

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(csp({
	directives: {
		defaultSrc: ["* 'unsafe-inline'"],
		connectSrc:["* 'unsafe-inline'"]
	}
}))

app.use(express.static('client'));



dynamodb.listTables((err, data) => {
    console.log('Table list:');
    console.log(data);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.delete('/delete-tables', (req, res) => {
    deleteTables(dynamodb, req, res);
});

app.post('/create-tables', (req, res) => {
    createTables(dynamodb, req, res);
});

app.post('/create-clip', (req, res) => {
    createClip(docClient, req, res);
});

app.post('/create-project', (req, res) => {
	createProject(docClient, req, res);
});

app.delete('/delete-clip', (req, res) => {
	deleteClip(docClient, req, res);
});

app.delete('/delete-project', (req, res) => {
	deleteProject(docClient, req, res);
});

app.get('/get-clips/:projectId', (req, res) => {
	getClips(docClient, req, res);
});

app.get('/get-project/:projectId', (req, res) => {
	getProject(docClient, req, res);
});

app.get('/get-project-id/:accessCode', (req, res) => {
	getProjectId(docClient, req, res);
});

app.post('/stitch-project', (req, res) => {
	stitchProject(docClient, req, res);
});

app.post('/create-upload-endpoint', (req, res) => {
    createUploadEndpoint(s3Client, req, res);
});
