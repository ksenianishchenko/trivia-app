import React from "react";
import { TriviaQuestionItemAnswersChoice } from "../../../abstractions/api/models/triviaQuestionItem";

type RadioGroupTypes = {
  option: TriviaQuestionItemAnswersChoice;
  index: number;
  name: string;
}

const RadioGroup = (props: RadioGroupTypes) => {
  const {option, index, name} = props;

  return <div className="radio-group" key={index}>
    <label className="radio-group__label" htmlFor={option.id}>
        <input
            className="radio-group__input"
            type="radio"
            name={name}
            value={option.text}
            id={option.id}
        />
        <span>{option.text}</span>
    </label>
  </div>
}

export default RadioGroup;