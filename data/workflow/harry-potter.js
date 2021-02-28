const harryPotterWorkflow = {
    startAt: "0",
    steps: {
        "0": {
            id: "0",
            next: "1",
            end: false,
            type: "TriviaQuestion"
        },
        "1": {
            id: "1",
            end: false,
            type: "TriviaQuestion",
            next: "2"
        },
        "2": {
            id: "2",
            end: true,
            type: "TriviaQuestion",
            next: "display-results-step"
        },
        "display-results-step": {
            id: "display-results-step",
            end: true,
            type: "TriviaResult",
            next: undefined
        }
      }
};