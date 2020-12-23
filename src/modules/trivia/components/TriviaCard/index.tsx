import React from "react";
import {Link} from "react-router-dom";
import TriviaInfoItem from "../../../../abstractions/api/models/triviaInfoItem";

import "./styles.scss";

type TriviaCardProps = {
    item: TriviaInfoItem
}

type Props = TriviaCardProps

const TriviaCard = (props: Props) => {
    const {item} = props;

    return <div className="trivia-card" style={{backgroundImage: `${item.properties.background}`}}>
        <div className="trivia-card__wrap">
            <div className="trivia-card__info">
                <Link to={`/trivia/${item.id}`} className="link trivia-card__title">{item.title}</Link>
            </div>
        </div>
    </div>
}

export default TriviaCard;