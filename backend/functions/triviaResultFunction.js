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
      body: 'Couldn\'t fetch the trivia score.',
  };

  const triviaId = event.pathParameters.triviaId;
  const userId = event.pathParameters.userId;
  if (!triviaId || !userId) {
      callback(null, response);
      return;
  }

  const primaryKey = `scores`;
  const secondaryKey = `trivia/${triviaId}/kseniia`;

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

        if (!result?.Item?.record) {
            response.statusCode = 404;
            response.body = 'No such record';
            return;
        }
        else {
            response.headers["Content-Type"] = "application/json";
            const score = result.Item.record;
            response.body = JSON.stringify(score);
            response.statusCode = 200;
        }
    }
    finally {
        callback(null, response);
    }
  });

};