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
  currentPhoto = null;

  @observable
  albumPhotoListMapping = new Map();

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadPhotoAlbums = userId => {
    getAlbumsForUser(userId).then(albums => {
      albums.forEach(async album => {
        let photos = await getPhotosForAlbum(album.id);
        album.photoCount = photos.length;
        this.albumPhotoListMapping[album.id] = photos;
        this.rawAlbumList.push(album);
      });
    });
  };

  @action
  setCurrentAlbum = album => {
    this.currentAlbum = album;
  };

  @action
  setCurrentPhoto = photo => {
    this.currentPhoto = photo;
  };

  @action
  clearData() {
    this.rawAlbumList = [];
    this.albumPhotoListMapping = new Map();
    this.currentAlbum = null;
    this.currentPhoto = null;
  }

  @computed
  get albumList() {
    let filteredArray = toJS(this.rawAlbumList)
      .concat()
      .sort((lhsUser, rhsUser) => {
        var idLeft = lhsUser.id;
        var idRight = rhsUser.id; // ignore upper and lowercase
        if (idLeft < idRight) {
          return -1;
        }
        if (idLeft > idRight) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    return filteredArray;
  }
}
const photoStore = new PhotoStore();
export default photoStore;
