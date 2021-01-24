import IWorkflowRouter from "../abstractions/workflow/workflowRouter";
import WorkflowStep from "../abstractions/workflow/workflowStep";

export default class TriviaResultWorkflowRouter implements IWorkflowRouter {
    getType(): string {
        return "TriviaResult";
    }

    route(step: WorkflowStep, id: string) {
        if(step.type !== "TriviaResult") {
            return;
        }
        return `/trivia/${id}/result`;
    }
}