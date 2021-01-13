import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { useHistory } from "react-router-dom";
import { setQuestionSchema } from "../../../../redux/modules/triviva/triviaWorkflow/fetch";
import { handleSubmitQuestion, setCurrentPathToQuestion } from "../../../../redux/workflow/fetch";

type StateProps = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | undefined;
    currentPath: string | undefined
}

type DispatchProps = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => void;
    onGetNextStep: () => void;
    onGetCurrentPath: () => void;
}

type TriviaQuestionParams = {
    triviaId: string;
    questionId: string;
};

type TriviaItemProps = RouteComponentProps<TriviaQuestionParams>

type Props = StateProps & DispatchProps & TriviaItemProps;

const QuestionPage = (props: Props) => {

    const {triviaCurrentQuestionSchema, onLoadQuestionSchema, onGetNextStep, onGetCurrentPath, currentPath, match} = props;
    const [triviaId, setTriviaId] = useState("");
    const [questionId, setQuestionId] = useState("");

    let history = useHistory();

    let prevPath = useRef(currentPath);

    useEffect(() => {
        if (currentPath) {
            if(prevPath.current !== currentPath) {
                history.replace(`/trivia/${currentPath}`);
            }
        }
        
    }, [currentPath]);

    useEffect(() => {
        setTriviaId(match.params.triviaId);
        setQuestionId(match.params.questionId);
        if (triviaId !== "" && questionId !== "") {
            onLoadQuestionSchema(triviaId, questionId);
        }
        
    }, [triviaId, questionId, match.params.triviaId, match.params.questionId, onLoadQuestionSchema]);

    const handleQuestionSubmit = () => {
        onGetNextStep();
        onGetCurrentPath();
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
    triviaCurrentQuestionSchema: state.triviaWorkflow.triviaCurrentQuestionSchema,
    currentPath: state.workflow.currentPath
})

const mapDispatch = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => setQuestionSchema(triviaId, questionId),
    onGetNextStep: () => handleSubmitQuestion(),
    onGetCurrentPath: () => setCurrentPathToQuestion()
}

const QuestionPageWithRouter = withRouter(QuestionPage);

export default connect(mapState, mapDispatch)(QuestionPageWithRouter);