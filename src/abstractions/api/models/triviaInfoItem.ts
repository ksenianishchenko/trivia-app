type TriviaProperties = {
    background: string
}

export type TriviaInfoItem = {
    id: string;
    title: string;
    poster: string;
    description: string;
}

type RecordItemType = {
    id: string;
    title: string;
}

export type TriviaItemFromRecordType = {
    primmary_key: string;
    secondary_key: string;
    record: RecordItemType;
}