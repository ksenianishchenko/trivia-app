import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { useHistory } from "react-router-dom";
import { setQuestionSchema } from "../../../../redux/modules/triviva/triviaWorkflow/fetch";
import { handleSubmitQuestion, setCurrentPathToQuestion } from "../../../../redux/workflow/fetch";
import RadioGroup from "../../../components/RadioGroup";
import CheckboxGroup from "../../../components/CheckboxGroup";

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
    const [triviaId, setTriviaId] = useState(match.params.triviaId);
    const [questionId, setQuestionId] = useState(match.params.questionId);

    let history = useHistory();

    let prevPath = useRef(currentPath);

    useEffect(() => {
        if (currentPath) {
            if(prevPath.current !== currentPath) {
                history.replace(currentPath);
            }
        }
        
    }, [currentPath, history]);

    useEffect(() => {
        setTriviaId(match.params.triviaId);
        setQuestionId(match.params.questionId);

        if(triviaCurrentQuestionSchema === undefined) {
            onLoadQuestionSchema(triviaId, questionId);
        }
        
    }, [triviaId, questionId, match.params.triviaId, match.params.questionId]);

    const handleQuestionSubmit = () => {
        onGetNextStep();
        onGetCurrentPath();
    }

    if (questionId === "result") {
        if(currentPath) {
            history.replace(currentPath);
        }
    }

    if (triviaCurrentQuestionSchema) {
        return <div className="question-page">
            <div className="page-inner">
                <div className="content-wrap">
                    <p className="text text-sm">Question 1/0</p>
                    <form className="form">
                        <h3>{triviaCurrentQuestionSchema.questionText}</h3>
                        <div className="form__btn-wrap">
                            {triviaCurrentQuestionSchema.answers.map((option, index) => {
                                return triviaCurrentQuestionSchema.type === "single" ? 
                                <RadioGroup 
                                    option={option}
                                    index={index}
                                    name={triviaCurrentQuestionSchema.questionText}/> : 
                                <CheckboxGroup
                                    option={option}
                                    index={index}
                                />
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