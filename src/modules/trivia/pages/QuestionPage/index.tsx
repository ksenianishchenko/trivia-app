import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import { setQuestionSchema } from "../../../../redux/modules/triviva/triviaWorkflow/reducer";
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { useHistory } from "react-router-dom";

type StateProps = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | null;
}

type DispatchProps = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => void;
}

type TriviaQuestionParams = {
    triviaId: string;
    questionId: string;
};

type TriviaItemProps = RouteComponentProps<TriviaQuestionParams>

type Props = StateProps & DispatchProps & TriviaItemProps;

const QuestionPage = (props: Props) => {

    const {triviaCurrentQuestionSchema, onLoadQuestionSchema, match} = props;
    const [triviaId, setTriviaId] = useState("");
    const [questionId, setQuestionId] = useState("");

    let history = useHistory();

    function initParams() {
        setTriviaId(match.params.triviaId);
        setQuestionId(match.params.questionId);
    }

    useEffect(() => {
        initParams();
        if (triviaId !== "" && questionId !== "" && questionId !== "result") {
            onLoadQuestionSchema(triviaId, questionId);
        }
    })

    const handleQuestionSubmit = () => {
    }

    if (triviaCurrentQuestionSchema) {
        return <div className="question-page">
            <div className="page-inner">
                <div className="content-wrap">
                    <p className="text text-sm">Question 1/0</p>
                    <form className="form">
                        <h3>{triviaCurrentQuestionSchema.properties.answers.title}</h3>
                        <div className="form__btn-wrap">
                            {triviaCurrentQuestionSchema.properties.answers.enum.map((option, index) => {
                                return <div className="radio-group" key={index}>
                                <label className="radio-group__label" htmlFor="1">
                                    <input
                                        className="radio-group__input"
                                        type="radio"
                                        name={option}
                                        id="1"
                                    />
                                    <span>{option}</span>
                                </label>
                            </div>
                            })}
                        </div>
                        <Button
                            kind="button"
                            className="btn btn--outline"
                            handleClick={handleQuestionSubmit}
                        > Next </Button>
                    </form>
                </div>
            </div>
        </div>
    } else {
        return <div className="message">No question found</div>
    }
}

const mapState = (state: RootState | any) => ({
    triviaCurrentQuestionSchema: state.triviaWorkflow.triviaCurrentQuestionSchema
})

const mapDispatch = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => setQuestionSchema(triviaId, questionId)
}

const QuestionPageWithRouter = withRouter(QuestionPage);

export default connect(mapState, mapDispatch)(QuestionPageWithRouter);