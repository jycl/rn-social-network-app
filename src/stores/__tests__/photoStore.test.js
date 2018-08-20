import photoStore from "../photoStore";

describe("PhotoStore tests ", () => {
  it("Snapshot test of PhotoStore", () => {
    expect(photoStore).toMatchSnapshot();
  });

  it("Check state values initially and after changes", () => {
    expect(photoStore.rawAlbumList).toHaveLength(0);
    const albumList = [
      {
        id: 7,
        title: "July"
      },
      {
        id: 3,
        title: "March"
      },
      {
        id: 4,
        title: "April"
      },
      {
        id: 1,
        title: "January"
      }
    ];
    //set up mock function to load user list and set to rawUserList
    photoStore.loadPhotoAlbums = jest.fn().mockImplementation(() => {
      photoStore.rawAlbumList = albumList;
    });
    //invoke method and test if raw and filtered list contain correct values
    photoStore.loadPhotoAlbums("1");
    expect(photoStore.rawAlbumList).toHaveLength(4);
    expect(photoStore.albumList).toHaveLength(4);
    expect(photoStore.albumList[0].title).toBe("January");

    photoStore.clearData();
    expect(photoStore.rawAlbumList).toHaveLength(0);
  });

  it("Test album photo mapping", async () => {
    expect(photoStore.rawAlbumList).toHaveLength(0);
    const photoList = [
      {
        id: 4,
        thumbnailUrl: "/kittens"
      },
      {
        id: 1,
        thumbnailUrl: "/puppies"
      }
    ];
    photoStore.getPhotosForAlbum = jest.fn().mockImplementation(albumId => {
      return Promise.resolve(photoList);
    });
    photoStore.loadPhotoAlbums = jest.fn().mockImplementation(async () => {
      let photos = await photoStore.getPhotosForAlbum(1);
      photoStore.albumPhotoListMapping[1] = photos;
    });
    //invoke method and test if raw and filtered list contain correct values
    await photoStore.loadPhotoAlbums("1");
    expect(photoStore.albumPhotoListMapping[1]).toBeTruthy();
  });
});
