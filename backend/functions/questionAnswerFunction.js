const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {

    let response = {
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

    let paramsForScore = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                "primary_key": `scores`,
                "secondary_key": `trivia/${triviaId}/kseniia`
        }
    };

    try {
        const getQuestionResp = await dynamoDb.get(params).promise();

        if (!getQuestionResp.Item) {
            response.statusCode = 404;
            response.body = 'The question was not found';
            return;
        }

        response.headers["Content-Type"] = "application/json";
        let correctAnswers = JSON.stringify(getQuestionResp.Item.record[questionId].correct);
        response.body = correctAnswers;
        response.statusCode = 200;

        // logic for score
        const userScoreResp = await dynamoDb.get(paramsForScore).promise();

        //create a record in db if there is no one
        if (!userScoreResp) {
            console.log("No such record");
        }

        if (userScoreResp) {
            let score = userScoreResp.Item;
            let isCorrectAnswer;

            if (score) {
                if(correctAnswers.length === userAnswers.length) {
                    isCorrectAnswer = correctAnswers.every(value => userAnswers.includes(value));
                }

                if (isCorrectAnswer) {
                    //increase score by 1
                    score = score + 1;

                    console.log(correctAnswers);
                    console.log(userAnswers);
                    console.log(score);
                }
            }
        }
        
    } catch (err) {
        console.error(err);
        response.statusCode = 501;
    }    

    return response;
};