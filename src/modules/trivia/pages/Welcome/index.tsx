import React from "react";
import { connect } from "react-redux";

import Button from "../../../components/Button/index";
import { onSetTriviaList } from "../../../../redux/triviaList/reducer";

import "./styles.scss";


type DispatchProps = {
    onGetStart: () => void
}

type Props = DispatchProps;

const WelcomePage = (props: Props) => {

    const {onGetStart} = props;

    function onStartQuest() {
        onGetStart();
    }

    return <div className="welcome-page">
        <div className="page-inner">
            <div className="row">
                <div className="column column--6">
                    <h1>Trivia Game</h1>
                    <p>Harry Potter</p>
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

const mapDispatch = {
    onGetStart: () => onSetTriviaList(),
}

export default connect(
    null,
    mapDispatch
)(WelcomePage);