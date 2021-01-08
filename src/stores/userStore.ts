import {makeObservable, observable, computed, toJS, action} from 'mobx';
import {getUserList} from '../services/APIService';
import Constants from '../config/constants';
import {UserType, UserDetailsType, TabType} from '../types';

/**
 * UserStore is an MobX store that manages the state values related to the users
 * and will update components that are observing it (have this store injected).
 *
 * State params / getters:
 * @param {Array} rawUserList Array of users saved to retrieved from backend API
 * @param {Object} selectedUser Array of users saved to retrieved from backend API
 * @param {String} selectedTab Represents the currently selected tab (default Posts)
 * @param {Object} selectedUserDetails User details to display in UserDetailScreen
 * @param {Array} filteredUserList Sorted list of users based on sorting criteria (default by name)
 */
class UserStore {
  rawUserList: UserType[] = [];
  selectedUser: UserType | null = null;
  selectedTab: TabType = Constants.TAB_OPTION.POSTS;
  postStore;
  photoStore;
  todoStore;

  constructor(postStore, photoStore, todoStore) {
    makeObservable(this, {
      rawUserList: observable,
      selectedUser: observable,
      selectedTab: observable,
      setUserList: action,
      selectUser: action,
      selectTab: action,
      loadDataByTabCategory: action,
      resetSelection: action,
      selectedUserDetails: computed,
      filteredUserList: computed,
    });
    // make other store instances accessible to userStore https://stackoverflow.com/questions/44928645/
    this.postStore = postStore;
    this.photoStore = photoStore;
    this.todoStore = todoStore;
  }

  /**
   * Retrieve user list from backend and save to store
   */
  loadUserList = (): void => {
    getUserList().then(this.setUserList);
  };

  setUserList = (list: UserType[]): void => {
    this.rawUserList = list;
  };

  /**
   * Set the selected user (with displayed profile details)
   * @param {Object} user object selected from user list
   */
  selectUser = (user: UserType): void => {
    this.selectedUser = user;
  };

  /**
   * Set the selected user (with displayed profile details)
   * @param {Object} user object selected from user list
   */
  selectTab = (category: TabType): void => {
    if (this.selectedTab !== category) {
      this.selectedTab = category;
      this.loadDataByTabCategory(category);
    }
  };

  /**
   * Callback on tab select that loads the data for the corresponding
   * store in order to render the related UI components with data.
   * @param {String} category selected tab title / category
   */
  loadDataByTabCategory(category: TabType): void {
    if (!this.selectedUser) {
      return;
    }
    switch (category) {
      case Constants.TAB_OPTION.POSTS:
        this.postStore.loadPostHistory(this.selectedUser.id);
        break;
      case Constants.TAB_OPTION.ALBUMS:
        this.photoStore.loadPhotoAlbums(this.selectedUser.id);
        break;
      case Constants.TAB_OPTION.TODOS:
        this.todoStore.loadTodoList(this.selectedUser.id);
        break;
      default:
        break;
    }
  }

  /**
   * Reset current selections specific to user (e.g. Albums, Post history)
   * so that when a new user is selected the state params are not still rendered.
   * Note: Will clear the data from Post/Photo/TodoStores as well.
   */
  resetSelection = (): void => {
    this.selectedUser = null;
    this.selectedTab = Constants.TAB_OPTION.POSTS;
    this.postStore.clearData();
    this.photoStore.clearData();
    this.todoStore.clearData();
  };

  /**
   * @return {bool} inidcate whether current tab title is the selected one
   */
  isHighlighted = (tabTitle: TabType): boolean => {
    return tabTitle === this.selectedTab;
  };

  /**
   * @return {Object} object with selected user details to display.
   * Properties address and workplace are extracted from the original
   * selectedUser object.
   */
  get selectedUserDetails(): UserDetailsType {
    if (!this.selectedUser) {
      return {};
    }
    const {address, company, email, name, phone} = this.selectedUser;
    const {city, street, suite} = address;
    return {
      name,
      email,
      phone,
      address: `${suite} ${street}, ${city}`,
      workplace: company.name,
    };
  }

  /**
   * Sort user list before returning to display on UI, note that computed
   * values should be cached as long as observable doesn't change.
   * @return {Array} sorted array of the rawUserList
   */
  get filteredUserList(): UserType[] {
    const filteredArray = toJS(this.rawUserList)
      .concat()
      .sort((lhsUser, rhsUser) => {
        const nameLeft = lhsUser.name.toUpperCase(); // ignore upper and lowercase
        const nameRight = rhsUser.name.toUpperCase(); // ignore upper and lowercase
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

export default UserStore;
