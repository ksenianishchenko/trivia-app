import WorkflowStep from "./workflowStep";

export default interface TriviaQuestionWorkflowStep extends WorkflowStep {
    type: string;
    id: string;
    next: string | undefined;
    end: boolean;
};