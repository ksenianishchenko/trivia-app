import TriviaQuestionWorkflowStep from "../../../../abstractions/api/models/triviaQuestionWorkflowStep";
import WorkflowDefinition from "../../../../abstractions/api/models/workflowDefinition";
import WorkflowStep from "../../../../abstractions/api/models/workflowStep";

const harryPotterWorkflow : WorkflowDefinition = {
    startAt: "0",
    steps: new Map<string, WorkflowStep>()
};

const hpQuestion0: TriviaQuestionWorkflowStep = {
    id: "0",
    next: "1",
    end: false,
    type: "TriviaQuestion"
}
harryPotterWorkflow.steps.set("0", hpQuestion0);

const hpQuestion1: TriviaQuestionWorkflowStep = {
    id: "1",
    end: false,
    type: "TriviaQuestion",
    next: "2"
};
harryPotterWorkflow.steps.set("1", hpQuestion1);

const hpQuestion2: TriviaQuestionWorkflowStep = {
    id: "2",
    end: true,
    type: "TriviaQuestion",
    next: undefined
}

harryPotterWorkflow.steps.set("2", hpQuestion2);

export {harryPotterWorkflow};