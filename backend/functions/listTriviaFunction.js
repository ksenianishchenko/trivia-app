const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 501,
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        },
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

            response.headers["Content-Type"] = "application/json";
            response.body = JSON.stringify(result.Items);
            response.statusCode = 200;

        }
        finally {
            callback(null, response);
        }
    });
};