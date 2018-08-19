import React from "react";
import { FlatList } from "react-native";
import GenericList from "../GenericList";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("Rendering user list with mock props", () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  //test set of data
  const data = [
    {
      id: 1,
      name: "John Doe"
    },
    {
      id: 2,
      name: "Kevin McCormick"
    }
  ];

  it("UserList renders correctly and updates data", () => {
    const component = shallow(<GenericList />);
    expect(component).toMatchSnapshot();
    expect(component.find(FlatList).props().data).toHaveLength(0);
    //update user list and see if FlatList data updates

    component.setProps({ data });
    expect(component).toMatchSnapshot();
    expect(component.find(FlatList).props().data).toHaveLength(2);
  });
});
