import userStore from "../userStore";
import Constants from "../../config/constants";

describe("UserContainer tests ", () => {
  it("Snapshot test of UserStore", () => {
    expect(userStore).toMatchSnapshot();
  });
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

  it("Test select user action and get details", () => {
    expect(userStore.selectedUser).toBeNull();
    const user = {
      name: "Larry David",
      email: "larry.d@avid.com",
      address: {
        suite: "16",
        street: "Fiver Road",
        city: "Hong Kong"
      },
      company: {
        name: "Hawkins Lab",
        catchPhrase: "They won't be able to resist these pearls."
      }
    };
    userStore.selectUser(user);
    expect(userStore.selectedUser).toBeTruthy();
    expect(userStore.selectedUserDetails.name).toBe("Larry David");
    expect(userStore.selectedUserDetails.email).toBe("larry.d@avid.com");
    expect(userStore.selectedUserDetails.address).toBe(
      "16 Fiver Road, Hong Kong"
    );
    expect(userStore.selectedUserDetails.workplace).toBe("Hawkins Lab");
  });

  it("Test tab selection in user profile", () => {
    //track loadDataByTabCategory method which is called in selectTab
    let spy = jest.spyOn(userStore, "loadDataByTabCategory");
    //expect tab to be default (posts value)
    expect(userStore.selectedTab).toBe(Constants.TAB_OPTION.POSTS);
    expect(userStore.isHighlighted(Constants.TAB_OPTION.POSTS)).toBe(true);
    //set test option and check related values
    const testOption = "Family";
    userStore.selectTab(testOption);
    expect(userStore.selectedTab).toBe(testOption);
    expect(userStore.isHighlighted(Constants.TAB_OPTION.POSTS)).toBe(false);
    expect(userStore.isHighlighted(testOption)).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
    userStore.selectTab(Constants.TAB_OPTION.POSTS);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
