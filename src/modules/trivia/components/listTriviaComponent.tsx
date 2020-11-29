import React from "react";
import IApiService from "../../../abstractions/api/service/apiService";
import {LocalApiService} from "../../api/service/localApiService";

export class ListTriviaComponent extends React.Component {
    private _apiService: IApiService;
    constructor(props: any) {
        super(props);
        this._apiService = new LocalApiService();
    }

     render() {
        let triviaItems: any;
        triviaItems = this._apiService.listItems();
        return '';
    }
}