import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router';
import { Link, Redirect } from "react-router-dom";
import WorkflowDefinition from "../../../../abstractions/workflow/workflowDefinition";
import { setTriviaId } from "../../../../redux/modules/triviva/triviaWorkflow/actions";
import { RootState } from "../../../../redux/store";
import { setCurrentWorkflow } from "../../../../redux/workflow/reducer";

import Button from "../../../components/Button/index";


import "./styles.scss";

type StateProps = {
    triviaCurrentWorkflow: WorkflowDefinition | null
}

type DispatchProps = {
    onLoadWorkflow: (triviaId: string) => void;
    handleTriviaId: (triviaId: string) => void;
}

type TriviaItemParams = {
    triviaId: string; // parameters will always be a string (even if they are numerical)
};

type TriviaItemProps = RouteComponentProps<TriviaItemParams>

type Props = StateProps & DispatchProps & TriviaItemProps;

const StartPage = (props: Props) => {

    const [triviaId, setTriviaId] = useState("");
    const {onLoadWorkflow, handleTriviaId, triviaCurrentWorkflow, match} = props;

    useEffect(() => {
        setTriviaId(match.params.triviaId);
        
        if (triviaId) {
            handleTriviaId(triviaId);
            onLoadWorkflow(triviaId);
        }
    }, [triviaId])

    return <div className="start-page">
        <div className="page-inner">
            <div className="row">
                <div className="column column--6">
                    <h3>Harry Potter</h3>
                    <p>Description about the trivia content.</p>
                    <Link to={`/trivia/${triviaId}/0`} className="btn btn--outline">Get Started!</Link>
                </div>
                <div className="column column--6">
                </div>
            </div>
        </div>
    </div>
}

const mapState = (state: RootState) => ({
    triviaCurrentWorkflow: state.triviaWorkflow.triviaCurrentWorkflow
})

const mapDispatch = {
    onLoadWorkflow: (triviaId: string) => setCurrentWorkflow(triviaId),
    handleTriviaId: (triviaId: string) => setTriviaId(triviaId)
}

const StartPageWithRouter = withRouter(StartPage);

export default connect(mapState, mapDispatch)(StartPageWithRouter);