import React from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { initializeWorkflow } from "../../../../redux/workflow/fetch";
import { setTriviaId } from "../../../../redux/modules/triviva/triviaWorkflow/actions";

import "./styles.scss";
import { TriviaInfoItem } from "../../../../abstractions/api/models/triviaInfoItem";

type TriviaCardProps = {
    item: TriviaInfoItem
}

type DispatchProps = {
    onInitializeWorkflow: (triviaId: string) => void;
    handleTriviaId: (triviaId: string) => void
}

type Props = TriviaCardProps & DispatchProps

const TriviaCard = (props: Props) => {
    const {item, onInitializeWorkflow, handleTriviaId} = props;

    let history = useHistory();

    const handleInitializeWorkflow = () => {
        handleTriviaId(item.id);
        onInitializeWorkflow(item.id);
        history.push(`trivia/${item.id}`);
    }

    return <div className="trivia-card">
        <div className="trivia-card__wrap">
            <div className="trivia-card__info">
                <h2 className="trivia-card__title">{item.title}</h2>
                <Button kind="button" className="btn btn--outline white" handleClick={handleInitializeWorkflow}>Start Trivia</Button>
            </div>
        </div>
    </div>
}

const mapDispatch = {
    onInitializeWorkflow: (triviaId: string) => initializeWorkflow(triviaId),
    handleTriviaId: (triviaId: string) => setTriviaId(triviaId),
}

export default connect(null, mapDispatch)(TriviaCard);