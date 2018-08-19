import { observable, computed, toJS, action } from "mobx";
import { getAlbumsForUser } from "../services/APIService";

/**
 * PhotoStore is an MobX store that manages the state values of components related
 * to photo albums and photo display.
 *
 * State params:
 * @param {Array} rawAlbumList Array of posts for user retrieved from backend API
 * @param {Array} albumList list of albums that has been converted from MobX object
 */
class PhotoStore {
  @observable
  rawAlbumList = [];

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadAlbums = userId => {
    getAlbumsForUser(userId).then(albums => {
      this.rawAlbumList = albums;
    });
  };

  @computed
  get albumList() {
    return toJS(this.rawAlbumList);
  }
}
const photoStore = new PhotoStore();
export default photoStore;
