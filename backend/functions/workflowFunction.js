const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (request, context) => {
    const response = {
        statusCode: 501
    };

    if (request.workflow_type && request.workflow_id) {
        const secondaryKey = `${request.workflow_type}/${request.workflow_id}`;
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                "primary_key": "workflow",
                "secondary_key": secondaryKey
            }
        };

        const getResp = await dynamoDb.get(params).promise();
        if (getResp?.Item?.record) {
            return getResp.Item.record;
        } else {
            response.statusCode = 404;
        }
    } else {
        response.statusCode = 400;
    }

    throw Error(JSON.stringify(response));
};