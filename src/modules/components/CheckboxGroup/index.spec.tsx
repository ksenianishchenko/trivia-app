import React from "react";
import { shallow } from 'enzyme';
import CheckboxGroup from "./index";


describe("should render <CheckboxGroup /> component correct", () => {

  const mockOption = {
    "id": "0",
    "text": "Lord Volan De Mort",
    "imageUrl": ""
  }

  it("should render checkbox group button", () => {
      const tree = shallow(<CheckboxGroup option={mockOption} index={1} />);
      expect(tree).toMatchSnapshot();
  })

})