import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPath, setCurrentStepId } from "../../../../redux/workflow/actions";
import { RootState } from "../../../../redux/store";
import { RouteComponentProps } from 'react-router';
import { setTriviaScore } from "../../../../redux/modules/triviva/triviaResult/fetch";

type StateProps = {
    correctAnswersTotal: number;
    currentTriviaId: string;
}

type DispatchProps = {
    onResetCurrentPath: () => void;
    onResetCurrentStepId: () => void;
    onGetTotalScore: (triviaId: string) => void;
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
        match
    } = props;

    const [triviaId, setTriviaId] = useState(match.params.triviaId);

    let history = useHistory();

    useEffect(() => {
        setTriviaId(match.params.triviaId);
    }, [match.params.triviaId]);

    useEffect(() => {
        onGetTotalScore(triviaId);
        console.log("result");
    }, [triviaId]);

    const resetPath = () => {
        onResetCurrentStepId();
        onResetCurrentPath();

        history.push("/");
    }

    return <div className="result-page">
        <div className="page-inner">
            <h3>Trivia completed!</h3>
            <h2>Your result: {correctAnswersTotal}</h2>
            <Button
                kind="button"
                className="btn btn--outline"
                handleClick={resetPath}
            > Return </Button>
        </div>
    </div>
}

const mapState = (state: RootState | any) => ({
    correctAnswersTotal: state.triviaResult.correctAnswersTotal,
    currentTriviaId: state.triviaWorkflow.currentTriviaId
})

const mapDispatch = (dispatch: any) => ({
    onResetCurrentPath: () => dispatch(setCurrentPath(undefined)),
    onResetCurrentStepId: () => dispatch(setCurrentStepId(undefined)),
    onGetTotalScore: (triviaId: string) => dispatch(setTriviaScore(triviaId))
})

export default connect(mapState, mapDispatch)(ReasultPage);