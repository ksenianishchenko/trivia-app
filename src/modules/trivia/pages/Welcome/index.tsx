import React from "react";
import { connect } from "react-redux";
import { Dispatch } from 'redux';

import Button from "../../components/Button/index";
import {onSetQuestionsRequest} from "../../redux/list/reducer";

import "./styles.scss";

interface DispatchProps {
    onGetStart: () => void;
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

const mapDispatchToProps = (dispatch: Dispatch):DispatchProps => ({
    onGetStart: () => dispatch(onSetQuestionsRequest());
})

export default connect(null, mapDispatchToProps)(WelcomePage);