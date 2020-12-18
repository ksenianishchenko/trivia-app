import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from "redux"

import Button from "../../../components/Button/index";
import { onSetTriviaList } from "../../../../redux/modules/triviaList/reducer";


import "./styles.scss";


type DispatchProps = {
    onGetStart: () => void
}

type TriviaItemParams = {
    triviaId: string; // parameters will always be a string (even if they are numerical)
};

type TriviaItemProps = RouteComponentProps<TriviaItemParams>

type Props = DispatchProps & TriviaItemProps;

const StartPage = (props: Props) => {

    const {onGetStart, match} = props;

    function onStartQuest() {
        onGetStart();
    }

    const triviaId = match.params.triviaId;

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

const mapDispatch = {
    onGetStart: () => onSetTriviaList(),
}

const StartPageWithRouter = withRouter(StartPage);

export default connect(null, mapDispatch)(StartPageWithRouter);