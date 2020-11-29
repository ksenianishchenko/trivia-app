import React from "react";
import { connect } from "react-redux";
import {RootState} from "../../redux/store";
import {ITriviaItem} from "../../redux/list/types";

interface StateProps {
    triviaQuestionsList: ITriviaItem[]
}

type Props = StateProps;

const Question = (props: Props) => {
    const {triviaQuestionsList} = props;
    return <div className="question-page">
        {
            triviaQuestionsList.map((item, index) => {
                return <div>
                    <p>{item.question}</p>
                </div>
            })
        }
    </div>
};

const mapState = (state: RootState) => ({
    triviaQuestionsList: state.triviaData.triviaQuestionsList
})

export default connect(mapState, null)(Question);