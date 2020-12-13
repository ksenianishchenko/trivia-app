import {FunctionComponent} from 'react';
import StartPageWithRouter from "./pages/StartPage";
import HomePage from "./pages/Home";

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
    }
];
export {Routes};