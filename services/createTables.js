const ycProjectsParams = {
    AttributeDefinitions: [
        {
            AttributeName: "projectId",
            AttributeType: "S"
        },
    ],
    KeySchema: [
        {
            AttributeName: "projectId",
            KeyType: "HASH"
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: "ycProjects"
};

const ycClipsParams = {
    AttributeDefinitions: [
        {
            AttributeName: "projectId",
            AttributeType: "S"
        },
        {
            AttributeName: "clipId",
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "projectId",
            KeyType: "HASH"
        },
        {
            AttributeName: "clipId",
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: "ycClips"
};

const ycAccessCodeParams = {
    AttributeDefinitions: [
        {
            AttributeName: "accessCode",
            AttributeType: "S"
        },
    ],
    KeySchema: [
        {
            AttributeName: "accessCode",
            KeyType: "HASH"
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: "ycAccessCodes"
};

const createTable = (dynamodb, params) => {
    return new Promise((resolve, reject) => {
        dynamodb.createTable(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

const createTables = async function (dynamodb, req, res) {
    let count = 0;

    try {
        await createTable(dynamodb, ycProjectsParams);
        count++;
        console.log('created ycProjects');
    } catch (error) {
        console.error('Could not create ycProjects', error);
    }

    try {
        await createTable(dynamodb, ycClipsParams);
        count++;
        console.log('created ycClips');
    } catch (error) {
        console.error('Could not create ycClips', error);
    }

    try {
        await createTable(dynamodb, ycAccessCodeParams);
        count++;
        console.log('created ycAccessCodes');
    } catch (error) {
        console.error('Could not create ycAccessCode', error);
    }

    res.json({
        numTablesCreated: count
    });
}

module.exports = exports = createTables;