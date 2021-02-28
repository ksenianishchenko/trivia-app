const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the trivia items.',
    };

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: 'primary_key=:primary_key',
        ExpressionAttributeValues: {
            ':primary_key': 'trivia'
        }
    };

    dynamoDb.query(params, (error, result) => {
        try {
            
            if (error) {
                console.error(error);
                return;
            }

            response.body = JSON.stringify(result.Items);
            response.statusCode = 200;

        }
        finally {
            callback(null, response);
        }
    });
};