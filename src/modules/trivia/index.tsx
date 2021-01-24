import StartPageWithRouter from "./pages/StartPage";
import HomePage from "./pages/Home";
import QuestionPageWithRouter from './pages/QuestionPage';
import ReasultPage from "./pages/ResultPage";

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
        url: "/trivia/:triviaId/result",
        component: ReasultPage,
        name: "ResultPage"
    },
    {
        url: "/trivia/:triviaId/:questionId",
        component: QuestionPageWithRouter,
        name: "QuestionPage"
    }
    
];
export {Routes};