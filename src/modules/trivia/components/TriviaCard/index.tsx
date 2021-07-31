import React from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { initializeWorkflow } from "../../../../redux/workflow/fetch";
import { setCurrentTriviaItem, setTriviaId } from "../../../../redux/modules/triviva/triviaWorkflow/actions";
import { TriviaInfoItem } from "../../../../abstractions/api/models/triviaInfoItem";

import "./styles.scss";


type TriviaCardProps = {
    item: TriviaInfoItem
}

type DispatchProps = {
    onInitializeWorkflow: (triviaId: string) => void;
    onHandleTriviaId: (triviaId: string) => void;
    onSetCurrentTriviaItem: (item: TriviaInfoItem) => void;
}

type Props = TriviaCardProps & DispatchProps

const TriviaCard = (props: Props) => {
    const {item, onInitializeWorkflow, onHandleTriviaId, onSetCurrentTriviaItem} = props;

    let history = useHistory();

    const handleInitializeWorkflow = () => {
        onHandleTriviaId(item.id);
        onInitializeWorkflow(item.id);
        onSetCurrentTriviaItem(item);
        history.push(`trivia/${item.id}`);
    }

    return <div className="trivia-card" style={{backgroundImage: `url("./resourses/${item.id}.jpg")`}}>
        <div className="trivia-card__wrap">
            <div className="trivia-card__info">
                <h2 className="trivia-card__title">{item.title}</h2>
                <p>{item.description}</p>
                <Button kind="button" className="btn btn--outline white" handleClick={handleInitializeWorkflow}>Start Trivia</Button>
            </div>
        </div>
    </div>
}

const mapDispatch = {
    onInitializeWorkflow: (triviaId: string) => initializeWorkflow(triviaId),
    onHandleTriviaId: (triviaId: string) => setTriviaId(triviaId),
    onSetCurrentTriviaItem: (item: TriviaInfoItem) => setCurrentTriviaItem(item)
}

export default connect(null, mapDispatch)(TriviaCard);