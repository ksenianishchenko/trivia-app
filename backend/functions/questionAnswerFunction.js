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
    const table = process.env.DYNAMODB_TABLE;

    let bodyResponse = {
        "correctAnswers": [],
        "score": 0,
        "isCorrectAnswer": false
    }

    const params = {
        TableName: table,
        Key: {
            "primary_key": primaryKey,
            "secondary_key": secondaryKey
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
        let correctAnswers = getQuestionResp.Item.record[questionId].correct;
        bodyResponse.correctAnswers = correctAnswers;

        // logic for score
        const userScoreResp = await dynamoDb.get({
            TableName: table,
            Key: {
                "primary_key": `scores`,
                "secondary_key": `trivia/${triviaId}/kseniia`
            }
        }).promise();

        //create a record in db if there is no one
        if (!userScoreResp) {
            console.log("No such record");
        }

        if (userScoreResp) {
            let isCorrectAnswer = false;
            let userAnswersData = userAnswers.data;

            isCorrectAnswer = correctAnswers.every(value => userAnswersData.includes(value));
            console.log("User isCorrectAnswer:", isCorrectAnswer);

            if (isCorrectAnswer !== false) {
                //increase score by 1
                const updateScore = await dynamoDb.update({
                    TableName: table,
                    Key: {
                        "primary_key": `scores`,
                        "secondary_key": `trivia/${triviaId}/kseniia`
                    },
                    UpdateExpression: "set #dynobase_record.score = #dynobase_record.score + :val",
                    ExpressionAttributeValues:{
                        ":val": 1
                    },
                    ExpressionAttributeNames: { "#dynobase_record": "record" },
                    ReturnValues:"UPDATED_NEW"
                }).promise();

                if(updateScore) {
                    bodyResponse.score = updateScore.Attributes.record.score;
                    console.log("Updated item:", JSON.stringify(updateScore));
                }

                bodyResponse.isCorrectAnswer = true;
            }

            console.log(bodyResponse);

            response.body = JSON.stringify(bodyResponse);
            response.statusCode = 200;
        }
    } catch (err) {
        console.error(err);
        response.statusCode = 501;
    }    

    return response;
};