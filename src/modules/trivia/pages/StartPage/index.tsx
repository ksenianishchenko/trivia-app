import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router';
import { Redirect } from "react-router-dom";
import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import { setQuestionSchema } from "../../../../redux/modules/triviva/triviaWorkflow/reducer";
import { RootState } from "../../../../redux/store";

import Button from "../../../components/Button/index";


import "./styles.scss";

type StateProps = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | null
}

type DispatchProps = {
    onGetStart: (triviaId: string, questionId: string) => void
}

type TriviaItemParams = {
    triviaId: string; // parameters will always be a string (even if they are numerical)
};

type TriviaItemProps = RouteComponentProps<TriviaItemParams>

type Props = StateProps & DispatchProps & TriviaItemProps;

const StartPage = (props: Props) => {

    const {triviaCurrentQuestionSchema, onGetStart, match} = props;
    const triviaId = match.params.triviaId;

    const onStartQuest = () => {
        onGetStart(triviaId, "0");
    }

    if (triviaCurrentQuestionSchema !== null) {
        return <Redirect to={`/trivia/${triviaId}/0`} />
    }

    return <div className="start-page">
        <div className="page-inner">
            <div className="row">
                <div className="column column--6">
                    <h3>Harry Potter</h3>
                    <p>Description about the trivia content.</p>
                    <Button
                        kind={"button"}
                        className={"btn btn--outline"}
                        handleClick={onStartQuest}
                    >Get Started!</Button>
                </div>
                <div className="column column--6">
                </div>
            </div>
        </div>
    </div>
}

const mapState = (state: RootState) => ({
    triviaCurrentQuestionSchema: state.triviaWorkflow.triviaCurrentQuestionSchema
})

const mapDispatch = {
    onGetStart: (triviaId: string, questionId: string) => setQuestionSchema(triviaId, questionId),
}

const StartPageWithRouter = withRouter(StartPage);

export default connect(mapState, mapDispatch)(StartPageWithRouter);