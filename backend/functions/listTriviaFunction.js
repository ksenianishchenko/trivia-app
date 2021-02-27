exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 400
    };

    try {
        const triviaList = [];
    
        response.statusCode = 200;
        response.body = JSON.stringify(triviaList);
    }
    finally {
        callback(null, response);
    }
};