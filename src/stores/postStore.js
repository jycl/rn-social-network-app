import { observable, computed, toJS, action } from "mobx";
import {
  getPostHistoryForUser,
  getCommentsForPost
} from "../services/APIService";

/**
 * PostStore is an MobX store that manages the state values
 * related to the users and will update components that are
 * observing it (have this store injected).
 *
 * State params:
 * @param {Array} rawPostList Array of posts for user retrieved from backend API
 * @param {Array} currentPost Selected post to see related comments
 * @param {Array} currentPostComments stored comments related to post retrieved from backend
 * @param {Array} postList list of posts that has been converted from MobX object
 * @param {Array} currentPostCommentsList  list of comments that has been converted from MobX object
 */
class PostStore {
  @observable
  rawPostList = [];
  @observable
  currentPost = null;
  @observable
  currentPostComments = [];

  /**
   * Retrieve post list from backend and save to store
   */
  @action
  loadPostHistory = userId => {
    getPostHistoryForUser(userId).then(list => {
      this.rawPostList = list;
    });
  };

  @action
  setCurrentPost = post => {
    this.currentPost = post;
  };

  /**
   * Retrieve comments for current post from backend and save to store
   */
  @action
  loadPostComments = postId => {
    getCommentsForPost(postId).then(comments => {
      this.currentPostComments = comments;
    });
  };

  @action
  clearData() {
    this.rawPostList = [];
    this.currentPost = null;
    this.currentPostComments = [];
  }

  @computed
  get postList() {
    return toJS(this.rawPostList);
  }

  @computed
  get currentPostCommentsList() {
    return toJS(this.currentPostComments);
  }
}
const postStore = new PostStore();
export default postStore;
