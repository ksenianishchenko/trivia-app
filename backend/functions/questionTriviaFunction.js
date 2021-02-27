const questions = {
  "harry-potter": {
      "0": {
          "id": "0",
          "title": "Harry Potter book",
          "questionText": "In the Harry Potter book series, which character had the wand made of a phoenix bird feather?",
          "type": "single",
          "next": "1",
          "answers": [
              {
                  "id": "0",
                  "text": "Hermione",
                  "imageUrl": ""
              },
              {
                  "id": "1",
                  "text": "Tom Riddle",
                  "imageUrl": ""
              },
              {
                  "id": "2",
                  "text": "Ron",
                  "imageUrl": ""
              },
              {
                  "id": "3",
                  "text": "Professor Snape",
                  "imageUrl": ""
              },
              {
                  "id": "4",
                  "text": "Malfoy",
                  "imageUrl": ""
              },
          ],
          "required": [
              "answers"
          ]
      },
      "1": {
          "id": "1",
          "title": "Harry Potter book",
          "questionText": "How does Harry first learn that he is a wizard",
          "type": "multiple",
          "next": "2",
          "answers": [
              {
                  "id": "0",
                  "text": "The Dursleys tell him when he is eight",
                  "imageUrl": ""
              },
              {
                  "id": "1",
                  "text": "Dudley accidentally lets it slip",
                  "imageUrl": ""
              },
              {
                  "id": "2",
                  "text": "He reads about it in the Daily Prophet",
                  "imageUrl": ""
              },
              {
                  "id": "3",
                  "text": "Hagrid has to track him down to tell him",
                  "imageUrl": ""
              }
          ],
          "required": [
              "answers"
          ]
      },
      "2": {
          "id": "2",
          "title": "Harry Potter book",
          "questionText": "Who is Tom Riddle",
          "type": "single",
          "next": "display-results-step",
          "answers": [
              {
                  "id": "0",
                  "text": "Lord Volan De Mort",
                  "imageUrl": ""
              },
              {
                  "id": "1",
                  "text": "Dudley",
                  "imageUrl": ""
              },
              {
                  "id": "2",
                  "text": "Harry Potter",
                  "imageUrl": ""
              },
              {
                  "id": "3",
                  "text": "Severus",
                  "imageUrl": ""
              }
          ],
          "required": [
              "answers"
          ]
      }
  }
}

exports.handler = (event, context, callback) => {  
    const response = {
        statusCode: 400
    };

    try {
        const triviaId = event.pathParameters.triviaId;
        const questionId = event.pathParameters.questionId;

        if (!questions[triviaId]) {
            response.statusCode = 404;
            response.headers = { 'Content-Type': 'text/plain' };
            response.body = 'No such question schema';
            return;
        }


        const trivia = questions[triviaId];
        const questionSchema = trivia[questionId];

        response.statusCode = 200;
        response.body = JSON.stringify(questionSchema);
    }
    finally {
        callback(null, response);
    }
};