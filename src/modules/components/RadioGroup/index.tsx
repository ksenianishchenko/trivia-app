import React from "react";
import { TriviaQuestionItemAnswersChoice } from "../../../abstractions/api/models/triviaQuestionItem";

import "./styles.scss";

type RadioGroupTypes = {
  option: TriviaQuestionItemAnswersChoice;
  index: number;
  name: string;
  classAdd?: string;
  checked?: boolean;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = (props: RadioGroupTypes) => {
  const {option, index, name, handleChange, classAdd, checked} = props;

  return <div className={`radio-group ${classAdd}`} key={`radio_${option.id}`}>
    <input
        className="radio-group__input"
        type="radio"
        name={name}
        value={option.text}
        id={option.id}
        onChange={handleChange}
    />
    <label className="radio-group__label" htmlFor={option.id}><span>{option.text}</span></label>
    <div className="toggle"></div>
  </div>
}

export default RadioGroup;