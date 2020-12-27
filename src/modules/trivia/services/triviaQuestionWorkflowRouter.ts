import IWorkflowRouter from "../../../abstractions/workflow/workflowRouter";
import WorkflowStep from "../../../abstractions/workflow/workflowStep";

export default class TriviaQuestionWorkflowRouter implements IWorkflowRouter {
    getType(): string {
        return "TriviaQuestion";
    }

    route(step: WorkflowStep): void {
        if(step.type !== "TriviaQuestion") {
            return;
        }

        console.log("TriviaQuestionWorkflowRouter");
    }
}