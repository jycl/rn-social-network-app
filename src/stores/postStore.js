import { makeObservable, observable, computed, toJS, action } from "mobx";
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
  rawPostList = [];
  currentPost = null;
  currentPostComments = [];

  constructor() {
    makeObservable(this, {
      rawPostList: observable,
      currentPost: observable,
      currentPostComments: observable,
      setPostHistory: action,
      setPostComments: action,
      setCurrentPost: action,
      clearData: action,
      postList: computed,
      currentPostCommentsList: computed,
    });
}

  /**
   * Retrieve post list from backend and save to store
   */
  loadPostHistory = userId => getPostHistoryForUser(userId).then(this.setPostHistory);      

  setPostHistory = list => this.rawPostList = list;

  setCurrentPost = post => this.currentPost = post;

  /**
   * Retrieve comments for current post from backend and save to store
   */
  loadPostComments = postId => getCommentsForPost(postId).then(this.setPostComments);

  // set explicitly as action, otherwise need to use runInAction; see https://stackoverflow.com/questions/64770762
  setPostComments = comments => this.currentPostComments = comments;

  clearData() {
    this.rawPostList = [];
    this.currentPost = null;
    this.currentPostComments = [];
  }

  get postList() {
    return toJS(this.rawPostList);
  }

  get currentPostCommentsList() {
    return toJS(this.currentPostComments);
  }
}

export default PostStore;
