import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/Button/index";
import { onSetQuestionsRequest } from "../../redux/list/reducer";
import { RootState } from "../../redux/store";
import { ITriviaItem } from "../../redux/list/types";

import "./styles.scss";

interface StateProps {
    triviaQuestionsList: ITriviaItem[]
}

interface DispatchProps {
    onGetStart: () => void;
}

type Props =  StateProps & DispatchProps;

const WelcomePage = (props: Props) => {

    const {onGetStart, triviaQuestionsList} = props;

    function onStartQuest() {
        onGetStart();
    }

    if (triviaQuestionsList.length) {
        return (
            <Redirect to="/questions" />
        )
    }

    return <div className="welcome-page">
        <div className="page-inner">
            <div className="row">
                <div className="column column--6">
                    <h1>Trivia Game</h1>
                    <p>Train your brain!</p>
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
    triviaQuestionsList: state.triviaData.triviaQuestionsList
})

const mapDispatch = {
    onGetStart: () => onSetQuestionsRequest(),
}

export default connect(
    mapState,
    mapDispatch
)(WelcomePage);