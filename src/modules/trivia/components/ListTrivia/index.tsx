import React from "react";
import { Link } from "react-router-dom";
import TriviaInfoItem from "../../../../abstractions/api/models/triviaInfoItem";

interface ListProps {
    list: TriviaInfoItem[]
}

const ListTrivia = (props: ListProps) => {
    const {list} = props;
    return <div className="list-trivia">
        <h2>Trivia list</h2>
        <div className="list-trivia__wrap">
            {
                list.map((item: TriviaInfoItem, index: number) => {
                    return <div className="list-trivia__item" key={index}>
                        <Link to={`/trivia/${item.id}`}>{item.title}</Link>
                    </div>
                })
            }
        </div>
    </div>
}

export default ListTrivia;
