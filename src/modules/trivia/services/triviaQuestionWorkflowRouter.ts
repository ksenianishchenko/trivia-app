import IWorkflowRouter from "../../../abstractions/workflow/workflowRouter";

export default class TriviaQuestionWorkflowRouter implements IWorkflowRouter {
    getType(): string {
        return "TriviaQuestion";
    }

    route(step: any) {
        if(step.type !== "TriviaQuestion") {
            return;
        }
        return step;
    }
}