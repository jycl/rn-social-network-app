import {
  get,
  getUserList,
  getPostHistoryForUser,
  getCommentsForPost,
  getAlbumsForUser,
  getPhotosForAlbum,
  getTodosForUser,
  APIConfig
} from "../APIService";

describe("API service testing", () => {
  beforeEach(() => {
    //Set up Jest mock method for the fetch method, ensure response has properties: ok and json
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({ ok: true, json: () => ({}) });
    });
  });

  it("Test APIService get method ", async () => {
    const url = "/users";
    const responseJson = get(url);
    expect(responseJson).toMatchObject({});
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  });

  it("Test APIService getUserList method", async () => {
    //first test run using beforeEach set mock function
    const list = await getUserList();
    expect(list).toMatchObject({});

    //test set of data
    const userList = [
      {
        id: 1,
        name: "John Doe"
      },
      {
        id: 2,
        name: "Kevin McCormick"
      }
    ];

    //update mock fetch to return the test set user list data
    global.fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => userList
      });
    });

    const updatedList = await getUserList();

    //expect fetch to have run twice and that now the list is equal to userList
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(updatedList).toMatchObject(userList);
  });

  it("Test APIService getPostHistoryForUser method", async () => {
    //update mock fetch to return the post list
    const postHistory = [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body:
          "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }
    ];
    global.fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return postHistory;
        }
      });
    });
    const postList = await getPostHistoryForUser("1");
    const url = APIConfig.POSTS + `?userId=1`;
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(postList).toMatchObject(postHistory);
  });

  it("Test APIService getCommentsForPost method", async () => {
    //update mock fetch to return the comment list
    const testCommentList = [
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
    global.fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return testCommentList;
        }
      });
    });
    const commentList = await getCommentsForPost("1");
    const url = APIConfig.COMMENTS + `?postId=1`;
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(commentList).toMatchObject(testCommentList);
  });

  it("Test APIService getAlbumsForUser method", async () => {
    const testAlbumList = [
      { userId: 1, id: 1, title: "quidem molestiae enim" },
      { userId: 1, id: 2, title: "sunt qui excepturi placeat culpa" }
    ];
    global.fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return testAlbumList;
        }
      });
    });
    let albums = await getAlbumsForUser("1");
    const url = APIConfig.ALBUMS + `?userId=1`;
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(albums).toMatchObject(testAlbumList);
  });

  it("Test APIService getPhotosForAlbum method", async () => {
    const testPhotoList = [
      {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952"
      }
    ];
    global.fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return testPhotoList;
        }
      });
    });
    let photos = await getPhotosForAlbum("1");
    const url = APIConfig.PHOTOS + `?albumId=1`;
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(photos).toMatchObject(testPhotoList);
  });

  it("Test APIService getTodosForUser method", async () => {
    const testTodoList = [
      { userId: 1, id: 1, title: "delectus aut autem", completed: false },
      { userId: 1, id: 2, title: "quis ut nam", completed: true }
    ];
    global.fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return testTodoList;
        }
      });
    });
    let todos = await getTodosForUser("1");
    const url = APIConfig.TODOS + `?userId=1`;
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(todos).toMatchObject(testTodoList);
  });
});
