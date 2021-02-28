const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  
    const response = {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the workflow',
    };

    const secondaryKey = "trivia/" + event.secondary_key;

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            "primary_key": "workflow",
            "secondary_key": secondaryKey
        }
    };

    dynamoDb.get(params, (error, result) => {
        try {
            
            if (error) {
                console.error(error);
                return;
            }

            response.body = JSON.stringify(result);
            response.statusCode = 200;

        }
        finally {
            callback(null, response);
        }
    });

};