import { get, getUserList } from "../APIService";

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
});
