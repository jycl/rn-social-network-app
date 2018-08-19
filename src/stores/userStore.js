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
  @observable
  selectedUser = null;

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadUserList = () => {
    getUserList().then(rawUserList => {
      this.rawUserList = rawUserList;
    });
  };

  /**
   * Set the selected user (with displayed profile details)
   * @param {Object} user object selected from user list
   */
  @action
  selectUser = user => {
    this.selectedUser = user;
  };

  /**
   * @return {Object} object with selected user details to display.
   * Properties address and workplace are extracted from the original
   * selectedUser object.
   */
  @computed
  get selectedUserDetails() {
    const {
      city,
      street,
      suite,
      company,
      email,
      name,
      phone
    } = this.selectedUser;
    return {
      name,
      email,
      phone,
      address: `${suite} ${street}, ${city}`,
      workplace: company.name
    };
  }

  /**
   * Sort user list before returning to display on UI, note that computed
   * values should be cached as long as observable doesn't change.
   * @return {Array} sorted array of the rawUserList
   */
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
