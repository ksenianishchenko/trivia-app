const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 501,
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,GET, POST"
        },
        body: 'Couldn\'t update answers',
    };

    const userAnswers = JSON.parse(event.body);
    const triviaId = event.pathParameters.triviaId;
    const questionId = event.pathParameters.questionId;
    const primaryKey = `trivia/question/${triviaId}`;
    const secondaryKey = questionId;
    let score;

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
            console.log(userAnswers);

            if (!result.Item) {
                response.statusCode = 404;
                response.body = 'The question was not found';
                return;
            }
            else {
                response.headers["Content-Type"] = "application/json";
                let correctAnswers = JSON.stringify(result.Item.record[questionId].correct);
                response.body = correctAnswers;
                response.statusCode = 200;
            }
        }
        finally {
            callback(null, response);
        }
    });
};