import React from "react";
import { shallow } from "enzyme";
import CommentItem from "../CommentItem";
import AlbumListItem from "../AlbumListItem";
import PostListItem from "../PostListItem";
import TodoListItem from "../TodoListItem";
import UserListItem from "../UserListItem";

describe("List Item Testing", () => {
  it("AlbumListItem renders correctly", () => {
    const component = shallow(<AlbumListItem />);
    expect(component).toMatchSnapshot();
  });
  it("CommentItem renders correctly", () => {
    const component = shallow(<CommentItem />);
    expect(component).toMatchSnapshot();
  });
  it("PostListItem renders correctly", () => {
    const component = shallow(<PostListItem />);
    expect(component).toMatchSnapshot();
  });
  it("TodoListItem renders correctly", () => {
    const component = shallow(<TodoListItem />);
    expect(component).toMatchSnapshot();
  });
  it("UserListItem renders correctly", () => {
    const component = shallow(<UserListItem />);
    expect(component).toMatchSnapshot();
  });
});
