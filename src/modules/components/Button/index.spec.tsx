import React from "react";
import { shallow } from 'enzyme';
import Button from "./index";

describe("Button component", () => {
    function createButton(
        kind: string,
        content: string,
        className?: string,
        handleClick?: () => void
        ) {
        const button = shallow(
            <Button
                kind={kind}
                className={className}
                handleClick={handleClick}
            >{content}</Button>
        );
        return button;
    }
    const handler = jest.fn();

    it("Should be render correctly", () => {

        const btn = createButton("submit", "Go!", "btn", handler);

        expect(btn).toMatchSnapshot();

    })

    it("Should call handler function on click", () => {

        const btn = createButton("submit", "Go!", "btn", handler);
        btn.simulate("click");
        expect(handler).toHaveBeenCalled();

    })

    it("Should render Submit button if kind = Submit", () => {

        const btn = createButton("Submit", "Go!", "btn", handler);

        expect(btn.hasClass("btn")).toBe(true);
        expect(btn.is(`[type="submit"]`)).toBe(true);

    })

})
