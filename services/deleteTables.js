const deleteTable = (dynamodb, params) => {
    return new Promise((resolve, reject) => {
        dynamodb.deleteTable(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve()
            }
        });
    })
}

const deleteTables = async function (dynamodb, req, res) {
    const ycProjectsParams = { TableName : "ycProjects" };
    const ycClipsParams = { TableName : "ycClips" };
    const ycAccessCodeParams = { TableName : "ycAccessCodes" };

    let count = 0;

    try {
        await deleteTable(dynamodb, ycProjectsParams);
        count++;
        console.log('deleted ycProjects');
    } catch (error) {
        console.error('Could not delete ycProjects', error);
    }

    try {
        await deleteTable(dynamodb, ycClipsParams);
        count++;
        console.log('deleted ycClips');
    } catch (error) {
        console.error('Could not delete ycClips', error);
    }

    try {
        await deleteTable(dynamodb, ycAccessCodeParams);
        count++;
        console.log('deleted ycAccessCodes');
    } catch (error) {
        console.error('Could not delete ycAccess', error);
    }

    res.json({
        numTablesDeleted: count
    });
}

module.exports = exports = deleteTables;