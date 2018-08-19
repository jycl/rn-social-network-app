import {
  get,
  getUserList,
  getPostHistoryForUser,
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
});
