import { observable, computed, toJS, action } from "mobx";
import { getUserList } from "../services/APIService";

/**
 * UserStore is an MobX store that manages the state values
 * related to the users and will update components that are
 * observing it (have this store injected).
 *
 * State params:
 * @param {Array} rawUserList Array of users saved to retrieved from backend API
 * @param {Array} filteredUserList Sorted list of users based on sorting criteria (default by name)
 */
class UserStore {
  @observable
  rawUserList = [];

  /**
   * Use the API
   */
  @action
  loadUserList = () => {
    getUserList().then(rawUserList => {
      this.rawUserList = rawUserList;
    });
  };

  @computed
  get filteredUserList() {
    let filteredArray = toJS(this.rawUserList)
      .concat()
      .sort((lhsUser, rhsUser) => {
        var nameLeft = lhsUser.name.toUpperCase(); // ignore upper and lowercase
        var nameRight = rhsUser.name.toUpperCase(); // ignore upper and lowercase
        if (nameLeft < nameRight) {
          return -1;
        }
        if (nameLeft > nameRight) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    return filteredArray;
  }
}
const userStore = new UserStore();
export default userStore;
