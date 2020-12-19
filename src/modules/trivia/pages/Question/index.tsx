import React from "react";
import Button from "../../../components/Button";

const Question = () => {

    const handleQuestionSubmit = () => {
        alert("clicked!");
    }

    return <div className="question-page">
        <div className="page-inner">
            <div className="content-wrap">
                <p className="text text-sm">Question 1/10</p>
                <form className="form">
                    <h3>In the Harry Potter book series, which character had the wand made of a phoenix bird feather?</h3>
                    <div className="form__btn-wrap">
                        <div className="radio-group">
                            <label className="radio-group__label" htmlFor="1">
                                <input
                                    className="radio-group__input"
                                    type="radio"
                                    name="Hermione"
                                    id="1"
                                />
                                <span>Hermione</span>
                            </label>
                        </div>
                    </div>
                    <Button
                        kind="Submit"
                        className="btn btn--outline"
                        handleClick={handleQuestionSubmit}
                    > Next </Button>
                </form>
            </div>
        </div>
    </div>
}

export default Question;