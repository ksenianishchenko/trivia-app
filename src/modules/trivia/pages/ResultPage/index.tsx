import React from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPath, setCurrentStepId } from "../../../../redux/workflow/actions";
import { RootState } from "../../../../redux/store";
import { setUserTotalAnswers } from "../../../../redux/modules/triviva/triviaResult/actions";

type StateProps = {
    correctAnswersTotal: number;
}

type DispatchProps = {
    onResetCurrentPath: () => void;
    onResetCurrentStepId: () => void;
    onSetTotalAnswers: (total: number) => void;
}

type Props = StateProps & DispatchProps;

const ReasultPage = (props: Props) => {

    const {onResetCurrentPath,
        onResetCurrentStepId,
        correctAnswersTotal,
        onSetTotalAnswers } = props;
    let history = useHistory();

    const resetPath = () => {
        onResetCurrentStepId();
        onResetCurrentPath();
        onSetTotalAnswers(0);

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
    correctAnswersTotal: state.triviaResult.correctAnswersTotal
})

const mapDispatch = (dispatch: any) => ({
    onResetCurrentPath: () => dispatch(setCurrentPath(undefined)),
    onResetCurrentStepId: () => dispatch(setCurrentStepId(undefined)),
    onSetTotalAnswers: (total: number) => setUserTotalAnswers(total)
})

export default connect(mapState, mapDispatch)(ReasultPage);