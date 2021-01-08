import {makeObservable, observable, computed, toJS, action} from 'mobx';
import {getAlbumsForUser, getPhotosForAlbum} from '../services/APIService';

/**
 * PhotoStore is an MobX store that manages the state values of components related
 * to photo albums and photo display.
 *
 * State params / getters:
 * @param {Array} rawAlbumList Array of posts for user retrieved from backend API
 * @param {Array} albumList list of albums that has been converted from MobX object
 */
class PhotoStore {
  rawAlbumList = [];
  currentAlbum = null;
  currentPhoto = null;
  albumPhotoListMapping = new Map();

  constructor() {
    makeObservable(this, {
      rawAlbumList: observable,
      currentAlbum: observable,
      currentPhoto: observable,
      albumPhotoListMapping: observable,
      loadPhotoAlbums: action,
      setCurrentAlbum: action,
      setCurrentPhoto: action,
      clearData: action,
      albumList: computed,
    });
}

  /**
   * Retrieve user list from backend and save to store
   */
  loadPhotoAlbums = userId => {
    getAlbumsForUser(userId).then(albums => {
      albums.forEach(async album => {
        let photos = await getPhotosForAlbum(album.id);
        album.photoCount = photos.length;
        // TODO do not update observable this way, use a set method 
        this.albumPhotoListMapping[album.id] = photos;
        this.rawAlbumList.push(album);
      });
    });
  };

  setCurrentAlbum = album => {
    this.currentAlbum = album;
  };

  setCurrentPhoto = photo => {
    this.currentPhoto = photo;
  };

  clearData() {
    this.rawAlbumList = [];
    this.albumPhotoListMapping = new Map();
    this.currentAlbum = null;
    this.currentPhoto = null;
  }

  /**
   * Sort album list before returning to display on UI as the albums are
   * added to rawAlbumList asynchronously (after retrieving photos).
   * Note that computed values should be cached as long as observable doesn't change.
   * @return {Array} sorted array of the rawAlbumList
   */
  get albumList() {
    let filteredArray = toJS(this.rawAlbumList)
      .concat()
      .sort((lhsUser, rhsUser) => {
        var idLeft = lhsUser.id;
        var idRight = rhsUser.id;
        if (idLeft < idRight) {
          return -1;
        }
        if (idLeft > idRight) {
          return 1;
        }
        // ids must be equal
        return 0;
      });
    return filteredArray;
  }
}

export default PhotoStore;
