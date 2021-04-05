import React from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPath, setCurrentStepId } from "../../../../redux/workflow/actions";

type DispatchProps = {
    onResetCurrentPath: () => void;
    onResetCurrentStepId: () => void;
}

type Props = DispatchProps;

const ReasultPage = (props: Props) => {

    const {onResetCurrentPath, onResetCurrentStepId} = props;
    let history = useHistory();

    const resetPath = () => {
        onResetCurrentStepId();
        onResetCurrentPath();

        history.push("/");
    }

    return <div className="result-page">
        <div className="page-inner">
            <h3>Trivia completed!</h3>
            <Button
                kind="button"
                className="btn btn--outline"
                handleClick={resetPath}
            > Return </Button>
        </div>
    </div>
}

const mapDispatch = (dispatch: any) => ({
    onResetCurrentPath: () => dispatch(setCurrentPath(undefined)),
    onResetCurrentStepId: () => dispatch(setCurrentStepId(undefined))
})

export default connect(null, mapDispatch)(ReasultPage);