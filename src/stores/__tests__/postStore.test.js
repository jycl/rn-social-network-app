import postStore from "../postStore";

describe("PostStore tests ", () => {
  it("Snapshot test of PostStore", () => {
    expect(postStore).toMatchSnapshot();
  });
  it("Check initial state values", () => {
    expect(postStore.rawPostList).toHaveLength(0);
    expect(postStore.postList).toHaveLength(0);

    //test set of data
    const postList = [
      {
        id: 1,
        title: "New album out today!"
      },
      {
        id: 2,
        title: "Feeling excited about the latest release..."
      }
    ];
    //set up mock function to load user list and set to rawUserList
    postStore.loadPostHistory = jest.fn().mockImplementation(() => {
      postStore.rawPostList = postList;
    });

    //invoke method and test if raw and filtered list contain correct values
    postStore.loadPostHistory("1");
    expect(postStore.rawPostList).toHaveLength(2);
    expect(postStore.postList).toHaveLength(2);
    expect(postStore.postList[0].title).toBe("New album out today!");
  });
});
