import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router';
import { Redirect } from "react-router-dom";
import WorkflowDefinition from "../../../../abstractions/workflow/workflowDefinition";
import { setTriviaId } from "../../../../redux/modules/triviva/triviaWorkflow/actions";
import { RootState } from "../../../../redux/store";
import { getCurrentStep, setCurrentWorkflow } from "../../../../redux/workflow/reducer";

import Button from "../../../components/Button/index";


import "./styles.scss";

type StateProps = {
    currentWorkflow: WorkflowDefinition | null;
    currentStep: any
}

type DispatchProps = {
    onLoadWorkflow: (triviaId: string) => void;
    handleTriviaId: (triviaId: string) => void;
    onGetCurrentStep: () => void;
}

type TriviaItemParams = {
    triviaId: string; // parameters will always be a string (even if they are numerical)
};

type TriviaItemProps = RouteComponentProps<TriviaItemParams>

type Props = StateProps & DispatchProps & TriviaItemProps;

const StartPage = (props: Props) => {

    const [triviaId, setTriviaId] = useState("");
    const {onLoadWorkflow, handleTriviaId, currentStep, onGetCurrentStep, match} = props;

    const navigateFirstStep = () => {
        onGetCurrentStep();
    }

    useEffect(() => {
        setTriviaId(match.params.triviaId);
        
        if (triviaId) {
            handleTriviaId(triviaId);
            onLoadWorkflow(triviaId);
        }
    }, [triviaId])

    if (currentStep) {
        return <Redirect to={`${triviaId}/${currentStep.id}`} />
    }

    return <div className="start-page">
        <div className="page-inner">
            <div className="row">
                <div className="column column--6">
                    <h3>Harry Potter</h3>
                    <p>Description about the trivia content.</p>
                    <Button kind="button" className="btn btn--outline" handleClick={navigateFirstStep}>Get Started!</Button>
                </div>
                <div className="column column--6">
                </div>
            </div>
        </div>
    </div>
}

const mapState = (state: RootState | any) => ({
    currentWorkflow: state.workflow.workflowDefinition,
    currentStep: state.workflow.currentStep
})

const mapDispatch = {
    onLoadWorkflow: (triviaId: string) => setCurrentWorkflow(triviaId),
    handleTriviaId: (triviaId: string) => setTriviaId(triviaId),
    onGetCurrentStep: () => getCurrentStep()
}

const StartPageWithRouter = withRouter(StartPage);

export default connect(mapState, mapDispatch)(StartPageWithRouter);