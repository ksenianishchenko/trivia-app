const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => { 
    const response = {
        statusCode: 400,
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        }
    };

    const triviaId = event.pathParameters.triviaId;
    const questionId = event.pathParameters.questionId;
    if (!triviaId || !questionId) {
        callback(null, response);
        return;
    }

    const primaryKey = `trivia/question/${triviaId}`;
    const secondaryKey = questionId;

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            "primary_key": primaryKey,
            "secondary_key": secondaryKey
        }
    };

    dynamoDb.get(params, (error, result) => {
        try {    
            if (error) {
                console.error(error);
                return;
            }

            console.log(params);

            if (!result?.Item?.record) {
                response.statusCode = 404;
                response.body = 'No such question schema';
                return;
            }
            else {
                const question = result.Item.record;
                response.headers["Content-Type"] = "application/json";
                response.body = JSON.stringify(question);
                response.statusCode = 200;
            }
        }
        finally {
            callback(null, response);
        }
    });
};