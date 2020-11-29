export default class TriviaInfoItem {
    private _id: string;
    private _title: string;
    private _category: string;
    constructor() {
        this._id = "";
        this._title = "";
        this._category = "";
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }
    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }
}