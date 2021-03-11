const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  
    const response = {
        statusCode: 501,
        headers: { 
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,GET"
         },
        body: 'Couldn\'t fetch the workflow',
    };

    if (!event.pathParameters.triviaId) {
        response.statusCode = 400;
        response.body = 'Workflow Type or Workflow Id is missing';
        return response;
    }

    const secondaryKey = `trivia/${event.pathParameters.triviaId}`;
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

            if (!result.Item) {
                response.statusCode = 404;
                response.body = `The given workflow was not found`;
            }
            else {
                response.body = JSON.stringify(result.Item.record);
                response.statusCode = 200;
            }

        }
        finally {
            callback(null, response);
        }
    });

};