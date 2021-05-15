import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router';
import { Redirect } from "react-router-dom";
import WorkflowDefinition from "../../../../abstractions/workflow/workflowDefinition";
import { setScore } from "../../../../redux/modules/triviva/triviaResult/actions";
import { RootState } from "../../../../redux/store";
import { setCurrentPathToQuestion } from "../../../../redux/workflow/fetch";

import Button from "../../../components/Button/index";


import "./styles.scss";

type StateProps = {
    currentWorkflow: WorkflowDefinition | null;
    currentStep: any,
    currentPath: string | undefined
}

type DispatchProps = {
    onGetCurrentPath: () => void;
    onSetTotalAnswers: (total: number) => void;
}

type TriviaItemParams = {
    triviaId: string; // parameters will always be a string (even if they are numerical)
};

type TriviaItemProps = RouteComponentProps<TriviaItemParams>

type Props = StateProps & DispatchProps & TriviaItemProps;

const StartPage = (props: Props) => {

    const {currentPath,
        onGetCurrentPath,
        onSetTotalAnswers } = props;

    const navigateFirstStep = () => {
        onSetTotalAnswers(0);
        onGetCurrentPath();
    }

    if (currentPath) {
        return <Redirect to={currentPath} />
    }

    return <div className="start-page">
        <div className="page-inner">
            <div className="row">
                <div className="column column--6">
                    <h3>Harry Potter</h3>
                    <p>Description about the trivia content.</p>
                    <Button kind="button" className="btn btn--outline black" handleClick={navigateFirstStep}>Get Started!</Button>
                </div>
                <div className="column column--6">
                </div>
            </div>
        </div>
    </div>
}

const mapState = (state: RootState | any) => ({
    currentWorkflow: state.workflow.workflowDefinition,
    currentStep: state.workflow.currentStep,
    currentPath: state.workflow.currentPath
})

const mapDispatch = {
    onGetCurrentPath: () => setCurrentPathToQuestion(),
    onSetTotalAnswers: (total: number) => setScore(total)
}

const StartPageWithRouter = withRouter(StartPage);

export default connect(mapState, mapDispatch)(StartPageWithRouter);