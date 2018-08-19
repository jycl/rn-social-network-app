import { observable, computed, toJS, action } from "mobx";
import { getPostHistoryForUser } from "../services/APIService";

/**
 * PostStore is an MobX store that manages the state values
 * related to the users and will update components that are
 * observing it (have this store injected).
 *
 * State params:
 * @param {Array} rawPostList Array of posts for user retrieved from backend API
 * @param {Array} postList list of posts that has been converted from MobX object
 */
class PostStore {
  @observable
  rawPostList = [];

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadPostHistory = userId => {
    getPostHistoryForUser(userId).then(list => {
      this.rawPostList = list;
    });
  };

  @computed
  get postList() {
    return toJS(this.rawPostList);
  }
}
const postStore = new PostStore();
export default postStore;
