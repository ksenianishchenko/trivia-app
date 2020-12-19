import StartPageWithRouter from "./pages/StartPage";
import HomePage from "./pages/Home";
import Question from './pages/Question';

type moduleItem = {
    url: string,
    component: any,
    name: string
}

const Routes: moduleItem[] = [
    {
        url: "/trivia",
        component: HomePage,
        name: "Homepage"
    },
    {
        url: "/trivia/:triviaId",
        component: StartPageWithRouter,
        name: "WelcomePage"
    },
    {
        url: "/trivia/:triviaId/:questionId",
        component: Question,
        name: "QuestionPage"
    }
];
export {Routes};