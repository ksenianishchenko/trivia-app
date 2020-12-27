import TriviaQuestionWorkflowStep from "../../../../abstractions/api/models/triviaQuestionWorkflowStep";
import WorkflowDefinition from "../../../../abstractions/workflow/workflowDefinition";
import WorkflowStep from "../../../../abstractions/workflow/workflowStep";

const stepsMap = new Map<string, WorkflowStep>();

const hpQuestion0: TriviaQuestionWorkflowStep = {
    id: "0",
    next: "1",
    end: false,
    type: "TriviaQuestion"
}

const hpQuestion1: TriviaQuestionWorkflowStep = {
    id: "1",
    end: false,
    type: "TriviaQuestion",
    next: "2"
};

const hpQuestion2: TriviaQuestionWorkflowStep = {
    id: "2",
    end: true,
    type: "TriviaQuestion",
    next: undefined
}

stepsMap.set("0", hpQuestion0);
stepsMap.set("1", hpQuestion1);
stepsMap.set("2", hpQuestion2);
console.log("Create");
console.log(stepsMap);


const harryPotterWorkflow : WorkflowDefinition = {
    startAt: "0",
    steps: stepsMap
};

console.log(harryPotterWorkflow.steps.get("0"));
console.log(harryPotterWorkflow);
export {harryPotterWorkflow};