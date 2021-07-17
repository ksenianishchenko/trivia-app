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

        console.log()
    }

    if (questionId === "result") {
        if(currentPath) {
            history.replace(currentPath);
        }
    }

    if (triviaCurrentQuestionSchema) { 
        return <div className="question-page dark-background">
            <div className="page-inner dark-background-inner">
                <div className="content-wrap">
                    <p className="text text-sm">{`Question ${answersCount}/${totalQuestions}`}</p>
                    <form className="form">
                        <h3>{triviaCurrentQuestionSchema.questionText}</h3>
                        <div className="form__btn-wrap">
                            {triviaCurrentQuestionSchema.answers.map((option, index) => {
                                return <div key={index}><RadioGroup 
                                option={option}
                                index={index}
                                name={triviaCurrentQuestionSchema.questionText}
                                handleChange={handleUsersAnswers}
                                classAdd={``}
                            /></div>
                            })}
                        </div>
                        <div className="button-wrap">
                            {
                                    activeButton ? <Button
                                    kind="button"
                                    className="btn btn--outline white"
                                    handleClick={onAnswersButtonClick}
                                > Answer </Button> : <Button
                                    kind="button"
                                    className="btn btn--outline white"
                                    handleClick={handleQuestionSubmit}
                                > Next </Button>
                            }
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    } else {
        return <div className="question-page dark-background" >
                <div className="page-inner dark-background-inner">
                <div className="content-wrap">
                </div>
            </div>
        </div>
    }
}

const mapState = (state: RootState | any) => ({
    triviaCurrentQuestionSchema: state.triviaWorkflow.triviaCurrentQuestionSchema,
    totalQuestions: state.workflow.totalQuestions,
    currentPath: state.workflow.currentPath,
    correctAnswers: state.triviaWorkflow.correctAnswers,
    correctAnswersTotal: state.triviaResult.correctAnswersTotal
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