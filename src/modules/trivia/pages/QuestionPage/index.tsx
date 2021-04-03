import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import { connect } from "react-redux";
import { RootState } from "../../../../redux/store";
import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import { RouteComponentProps, withRouter } from 'react-router';
import { useHistory } from "react-router-dom";
import { setCorrectAnswers, setQuestionSchema } from "../../../../redux/modules/triviva/triviaWorkflow/fetch";
import { handleSubmitQuestion, setCurrentPathToQuestion } from "../../../../redux/workflow/fetch";
import RadioGroup from "../../../components/RadioGroup";
import CheckboxGroup from "../../../components/CheckboxGroup";
import { setUserAnswers } from "../../../../redux/modules/triviva/triviaWorkflow/actions";
import { UserAnswer } from "../../../../redux/modules/triviva/triviaWorkflow/types";

type StateProps = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | undefined;
    currentPath: string | undefined,
    correctAnswers: string[]
}

type DispatchProps = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => void;
    onGetNextStep: () => void;
    onGetCurrentPath: () => void;
    onGetCorrectAnswers: (triviaId: string, questionId: string) => void;
    onGetUsersAnswers: (answers: UserAnswer) => void;
}

type TriviaQuestionParams = {
    triviaId: string;
    questionId: string;
};

type TriviaItemProps = RouteComponentProps<TriviaQuestionParams>

type Props = StateProps & DispatchProps & TriviaItemProps;

const QuestionPage = (props: Props) => {

    const { 
        triviaCurrentQuestionSchema,
        onLoadQuestionSchema,
        onGetNextStep,
        onGetCurrentPath,
        currentPath,
        match,
        onGetCorrectAnswers,
        onGetUsersAnswers,
        correctAnswers
    } = props;

    const [triviaId, setTriviaId] = useState(match.params.triviaId);
    const [questionId, setQuestionId] = useState(match.params.questionId);
    const [userAnswers, setUserAnswers] = useState<UserAnswer>({});

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
        
    }, [match.params.triviaId, match.params.questionId]);

    useEffect(() => {
        onLoadQuestionSchema(triviaId, questionId);
        onGetCorrectAnswers(triviaId, questionId);
        
    }, [triviaId, questionId]);

    const handleQuestionSubmit = () => {
        onGetNextStep();
        onGetCurrentPath();

        //reset usersAnswers
        setUserAnswers({});
    }

    const handleUsersAnswers = (evt: React.ChangeEvent<HTMLInputElement>) => {
        // get user answers
        if (evt.target.checked) {
            let currentOptionId = evt.target.id;
            let answer:UserAnswer = {};

            if (correctAnswers.length > 0 && correctAnswers.indexOf(currentOptionId) > -1) {
                answer[currentOptionId] = "correct";
            } else {
                answer[currentOptionId] = "error";
            }

            setUserAnswers({...userAnswers, ...answer});
        }

        //set users answers in redux store (don't use right now)
        onGetUsersAnswers(userAnswers);
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
                                    name={triviaCurrentQuestionSchema.questionText}
                                    handleChange={handleUsersAnswers}
                                    classAdd={userAnswers[option.id] ? `${userAnswers[option.id]}` : ``}
                                /> : 
                                <CheckboxGroup
                                    option={option}
                                    index={index}
                                    handleChange={handleUsersAnswers}
                                    classAdd={userAnswers[option.id] ? `${userAnswers[option.id]}` : ``}
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
    currentPath: state.workflow.currentPath,
    correctAnswers: state.triviaWorkflow.correctAnswers
})

const mapDispatch = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => setQuestionSchema(triviaId, questionId),
    onGetNextStep: () => handleSubmitQuestion(),
    onGetCurrentPath: () => setCurrentPathToQuestion(),
    onGetCorrectAnswers: (triviaId: string, questionId: string) => setCorrectAnswers(triviaId, questionId),
    onGetUsersAnswers: (answers: UserAnswer) => setUserAnswers(answers)
}

const QuestionPageWithRouter = withRouter(QuestionPage);

export default connect(mapState, mapDispatch)(QuestionPageWithRouter);