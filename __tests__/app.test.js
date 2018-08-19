import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";

describe("App", () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it("renders correctly", () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
