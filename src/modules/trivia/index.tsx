import {FunctionComponent} from "react";
import WelcomePage from "./pages/Welcome";
import HomePage from "./pages/Home";

type moduleItem = {
    url: string,
    component: FunctionComponent,
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
        component: WelcomePage,
        name: "WelcomePage"
    }
];
export {Routes};