import React from "react";
import { shallow } from 'enzyme';
import RadioGroup from "./index";


describe("should render <RadioGroup /> component correct", () => {

  const mockOption = {
    "id": "0",
    "text": "Lord Volan De Mort",
    "imageUrl": ""
  }

  it("should render radio group button", () => {
      const tree = shallow(<RadioGroup option={mockOption} index={1} />);
      expect(tree).toMatchSnapshot();
  })

})