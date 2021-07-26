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
import { setScore } from "../../../../redux/modules/triviva/triviaResult/actions";

import "./styles.scss";

type StateProps = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | undefined;
    currentPath: string | undefined;
    correctAnswers: string[];
    totalQuestions: number | undefined;
    correctAnswersTotal: number;
    isCurrentAnswerCorrect: boolean | undefined;
    currentTriviaPoster: string;
}

type DispatchProps = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => void;
    onGetNextStep: () => void;
    onGetCurrentPath: () => void;
    onGetCorrectAnswers: (triviaId: string, questionId: string, answers: string[]) => void;
    onSetTotalAnswers: (total: number) => void;
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
        totalQuestions,
        currentTriviaPoster
    } = props;

    const [triviaId, setTriviaId] = useState(match.params.triviaId);
    const [questionId, setQuestionId] = useState(match.params.questionId);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [answersCount, setAnswersCount] = useState(1);
    const [activeButton, setActiveButton] = useState(true);

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
    }, [triviaId, questionId, onLoadQuestionSchema]);

    const handleQuestionSubmit = () => {
        
        onGetNextStep();
        onGetCurrentPath();

        //reset usersAnswers
        setUserAnswers([]);
        setAnswersCount(answersCount + 1);
        setActiveButton(true);
    }

    const handleUsersAnswers = (evt: React.ChangeEvent<HTMLInputElement>) => {
        // get user answers
        if (evt.target.checked) {
            let currentOptionId = evt.target.id;

            //add question id in user answers object
            setUserAnswers([...userAnswers, currentOptionId]);
            
        }
        
    }

    const onAnswersButtonClick = () => {
        // post user answers 
        onGetCorrectAnswers(triviaId, questionId, userAnswers);
        setActiveButton(false);
    }

    if (questionId === "result") {
        if(currentPath) {
            history.replace(currentPath);
        }
    }

    if (triviaCurrentQuestionSchema) { 
        return <div className="question-page dark-background" style={{backgroundImage: `url("/resourses/${currentTriviaPoster}")`}}>
            <div className="page-inner dark-background-inner">
                <div className="content-wrap">
                    <p className="text text-sm">{`Question ${answersCount}/${totalQuestions}`}</p>
                    <form className="form">
                        <h3 className="question-title">{triviaCurrentQuestionSchema.questionText}</h3>
                        <div className="form__btn-wrap">
                            {triviaCurrentQuestionSchema.answers.map((option, index) => {
                                return <div key={index}><RadioGroup 
                                option={option}
                                index={index}
                                name={triviaCurrentQuestionSchema.questionText}
                                handleChange={handleUsersAnswers}
                                classAdd={""}
                                checked = {userAnswers.includes(option.id) ? true : false}
                            /></div>
                            })}
                        </div>
                        <div className={activeButton ? `button-wrap button-wrap--align-right` : `button-wrap button-wrap--align-left`}>
                            {
                                    activeButton ? <Button
                                    kind="button"
                                    className="btn btn--outline btn--icon white hover--green"
                                    handleClick={onAnswersButtonClick}
                                > Answer <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                              </svg></Button> : <Button
                                    kind="button"
                                    className="btn btn--outline btn--icon white hover--green"
                                    handleClick={handleQuestionSubmit}
                                > Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                              </svg></Button>
                            }
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    } else {
        return <div className="question-page dark-background" style={{backgroundImage: `url("/resourses/harry-potter.jpg")`}}>
                <div className="page-inner dark-background-inner">
                <div className="content-wrap"></div>
            </div>
        </div>
    }
}

const mapState = (state: RootState | any) => ({
    triviaCurrentQuestionSchema: state.triviaWorkflow.triviaCurrentQuestionSchema,
    totalQuestions: state.workflow.totalQuestions,
    currentPath: state.workflow.currentPath,
    correctAnswers: state.triviaWorkflow.correctAnswers,
    correctAnswersTotal: state.triviaResult.correctAnswersTotal,
    isCurrentAnswerCorrect: state.triviaWorkflow.isCurrentAnswerCorrect,
    currentTriviaPoster: state.triviaWorkflow.currentTriviaPoster
})

const mapDispatch = {
    onLoadQuestionSchema: (triviaId: string, questionId: string) => setQuestionSchema(triviaId, questionId),
    onGetNextStep: () => handleSubmitQuestion(),
    onGetCurrentPath: () => setCurrentPathToQuestion(),
    onGetCorrectAnswers: (triviaId: string, questionId: string, answers: string[]) => setCorrectAnswers(triviaId, questionId, answers),
    onSetTotalAnswers: (total: number) => setScore(total)
}

const QuestionPageWithRouter = withRouter(QuestionPage);

export default connect(mapState, mapDispatch)(QuestionPageWithRouter);