import React from "react";
import ReactTestRenderer from "react-test-renderer";
import App from "../App";

describe("App", () => {
  it("renders correctly", () => {
    const instance = ReactTestRenderer.create(<App />);
    expect(instance.toJSON()).toMatchSnapshot();
  });
});
