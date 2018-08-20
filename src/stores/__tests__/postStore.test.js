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

  it("Check current post and post comments", () => {
    expect(postStore.currentPost).toBe(null);
    expect(postStore.currentPostComments).toHaveLength(0);

    //test set of data
    const post = {
      id: 1,
      title: "New album out today!"
    };
    const comments = [
      {
        postId: 1,
        id: 1,
        name: "That's great!",
        body: "Happy for you.",
        name: "John"
      },
      {
        postId: 1,
        id: 2,
        name: "x2!",
        body: "",
        name: "Marie"
      }
    ];

    postStore.loadPostComments = jest.fn().mockImplementation(() => {
      postStore.currentPostComments = comments;
    });
    postStore.setCurrentPost(post);
    postStore.loadPostComments(post.id);

    //invoke method and test if raw and filtered list contain correct values
    expect(postStore.currentPost.title).toBe("New album out today!");
    expect(postStore.currentPostComments).toHaveLength(2);
  });
});
