import userStore from "../userStore";

describe("UserContainer tests ", () => {
  it("Check initial state values", () => {
    expect(userStore.rawUserList).toHaveLength(0);
    expect(userStore.filteredUserList).toHaveLength(0);

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
    //set up mock function to load user list and set to rawUserList
    userStore.loadUserList = jest.fn().mockImplementation(() => {
      userStore.rawUserList = userList;
    });

    //invoke method and test if raw and filtered list contain correct values
    userStore.loadUserList();
    expect(userStore.rawUserList).toHaveLength(2);
    expect(userStore.filteredUserList).toHaveLength(2);
    expect(userStore.filteredUserList[0].name).toBe("John Doe");
  });
});
