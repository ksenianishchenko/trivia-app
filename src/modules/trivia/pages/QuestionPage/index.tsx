import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import { setQuestionSchema } from "../../../../redux/modules/triviva/triviaWorkflow/reducer";
import { RouteComponentProps, withRouter } from 'react-router';

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

    useEffect(() => {
        setTriviaId(match.params.triviaId);
        setQuestionId(match.params.questionId);

        if (triviaId !== "" && questionId !== "") {
            onLoadQuestionSchema(triviaId, questionId);
        }
        
        setTriviaId(match.params.triviaId);
    })

    const handleQuestionSubmit = () => {
        alert("clicked!");
    }

    if (triviaCurrentQuestionSchema) {
        return <div className="question-page">
            <div className="page-inner">
                <div className="content-wrap">
                    <p className="text text-sm">Question 1/0</p>
                    <form className="form">
                        <h3>In the Harry Potter book series, which character had the wand made of a phoenix bird feather?</h3>
                        <div className="form__btn-wrap">
                            <div className="radio-group">
                                <label className="radio-group__label" htmlFor="1">
                                    <input
                                        className="radio-group__input"
                                        type="radio"
                                        name="Hermione"
                                        id="1"
                                    />
                                    <span>Hermione</span>
                                </label>
                            </div>
                        </div>
                        <Button
                            kind="Submit"
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