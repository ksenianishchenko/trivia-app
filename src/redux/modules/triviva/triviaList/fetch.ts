import {TriviaInfoItem, TriviaItemFromRecordType} from "../../../../abstractions/api/models/triviaInfoItem";
import API from "../../../../modules/api/service/api";
import { setTriviaItemsList } from "./actions";
import { DispatchTypeTrivia } from "./types";

const onSetTriviaList = () => {
  return (dispatch: DispatchTypeTrivia) => {
      const triviaList: TriviaInfoItem[] = [];
      
      API.get(`/v1/trivia`).
      then((response: any) => {
          const parsedData = JSON.parse(response.data.body);
          const list = parsedData;
          list.map((item: TriviaItemFromRecordType) => {
              return triviaList.push({
                  id: item.record.id,
                  title: item.record.title,
              });
          });

          dispatch(setTriviaItemsList(triviaList));
      }).catch((error) => {
          console.error(error);
      });
      
  }
}


export {onSetTriviaList};
