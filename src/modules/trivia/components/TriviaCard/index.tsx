import React from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { initializeWorkflow } from "../../../../redux/workflow/fetch";
import { setTriviaId } from "../../../../redux/modules/triviva/triviaWorkflow/actions";
import { TriviaInfoItem } from "../../../../abstractions/api/models/triviaInfoItem";

import "./styles.scss";


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

    return <div className="trivia-card" style={{backgroundImage: `url("./resourses/${item.id}.jpg")`}}>
        <div className="trivia-card__wrap">
            <div className="trivia-card__info">
                <h2 className="trivia-card__title">{item.title}</h2>
                <p>Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
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