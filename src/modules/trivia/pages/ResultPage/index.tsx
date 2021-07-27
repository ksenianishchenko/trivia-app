import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPath, setCurrentStepId } from "../../../../redux/workflow/actions";
import { RootState } from "../../../../redux/store";
import { RouteComponentProps } from 'react-router';
import { setTriviaScore } from "../../../../redux/modules/triviva/triviaResult/fetch";

import "./styles.scss";
import { resetLocalScore, setCurrentTriviaPoster } from "../../../../redux/modules/triviva/triviaWorkflow/actions";

type StateProps = {
    correctAnswersTotal: number;
    currentTriviaId: string;
    localScore: number;
    totalQuestions: number | undefined;
    currentTriviaPoster: string;
}

type DispatchProps = {
    onResetCurrentPath: () => void;
    onResetCurrentStepId: () => void;
    onGetTotalScore: (triviaId: string) => void;
    onResetLocalScore: () => void;
    onResetCurrentPoster: () => void;
}

type TriviaParams = {
    triviaId: string;
};

type TriviaProps = RouteComponentProps<TriviaParams>

type Props = StateProps & DispatchProps & TriviaProps;

const ReasultPage = (props: Props) => {

    const {onResetCurrentPath,
        onResetCurrentStepId,
        correctAnswersTotal,
        onGetTotalScore,
        onResetLocalScore,
        localScore,
        totalQuestions,
        currentTriviaPoster,
        onResetCurrentPoster,
        match
    } = props;

    const [triviaId, setTriviaId] = useState(match.params.triviaId);

    let history = useHistory();

    useEffect(() => {
        setTriviaId(match.params.triviaId);
    }, [match.params.triviaId]);

    useEffect(() => {
        onGetTotalScore(triviaId);
    }, [triviaId]);

    const resetPath = () => {
        onResetCurrentStepId();
        onResetCurrentPath();
        onResetLocalScore();
        onResetCurrentPoster();

        history.push("/");
    }

    return <div className="result-page dark-background text-white">
        <div className="page-inner">
            <div className="content-wrap">
                <div className="result-page__img">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16">
                    <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
                </svg>
                </div>
                <h2>Your score:</h2>
                <h3>{localScore} / {totalQuestions}</h3>

                <Button
                    kind="button"
                    className="btn btn--icon white"
                    handleClick={resetPath}
                > Return to the main page </Button>

            </div>
        </div>
    </div>
}

const mapState = (state: RootState | any) => ({
    correctAnswersTotal: state.triviaResult.correctAnswersTotal,
    currentTriviaId: state.triviaWorkflow.currentTriviaId,
    localScore: state.triviaWorkflow.localScore,
    totalQuestions: state.workflow.totalQuestions,
    currentTriviaPoster: state.triviaWorkflow.currentTriviaPoster
})

const mapDispatch = (dispatch: any) => ({
    onResetCurrentPath: () => dispatch(setCurrentPath(undefined)),
    onResetCurrentStepId: () => dispatch(setCurrentStepId(undefined)),
    onGetTotalScore: (triviaId: string) => dispatch(setTriviaScore(triviaId)),
    onResetLocalScore: () => dispatch(resetLocalScore()),
    onResetCurrentPoster: () => dispatch(setCurrentTriviaPoster(""))
})

export default connect(mapState, mapDispatch)(ReasultPage);