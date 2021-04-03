import React from "react";
import { TriviaQuestionItemAnswersChoice } from "../../../abstractions/api/models/triviaQuestionItem";

import "./styles.scss";

type CheckboxGroupTypes = {
  option: TriviaQuestionItemAnswersChoice;
  index: number;
  classAdd?: string;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxGroup = (props: CheckboxGroupTypes) => {
  const {option, index, handleChange, classAdd} = props;

  return <div className={`checkbox-group ${classAdd}`} key={index}>
    <label className="checkbox-group__label" htmlFor={option.id}>
        <input
            className="checkbox-group__input"
            type="checkbox"
            name={option.text}
            id={option.id}
            onChange={handleChange}
        />
        <span>{option.text}</span>
    </label>
  </div>
}

export default CheckboxGroup;