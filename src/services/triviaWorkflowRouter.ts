import IWorkflowRouter from "../abstractions/workflow/workflowRouter";
import WorkflowStep from "../abstractions/workflow/workflowStep";

export default class TriviaQuestionWorkflowRouter implements IWorkflowRouter {
    getType(): string {
        return "TriviaQuestion";
    }

    route(step: WorkflowStep, id: string, questionId: string) {
        if(step.type !== "TriviaQuestion") {
            return;
        }
        return `/trivia/${id}/${questionId}`;
    }
}