import { observable, computed, toJS, action } from "mobx";
import { getAlbumsForUser, getPhotosForAlbum } from "../services/APIService";

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

  @observable
  currentAlbum = null;

  @observable
  albumPhotoListMapping = new Map();

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadAlbums = userId => {
    getAlbumsForUser(userId).then(albums => {
      this.rawAlbumList = albums;
    });
  };

  @action
  setCurrentAlbum = album => {
    this.currentAlbum = album;
  };

  @action
  loadPhotoForAlbumId = async albumId => {
    this.albumPhotoListMapping[albumId] = await getPhotosForAlbum(albumId);
    return this.albumPhotoListMapping[albumId];
  };

  @computed
  get albumList() {
    return toJS(this.rawAlbumList);
  }
}
const photoStore = new PhotoStore();
export default photoStore;
