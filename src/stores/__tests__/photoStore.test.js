import photoStore from "../photoStore";

describe("PhotoStore tests ", () => {
  it("Snapshot test of PhotoStore", () => {
    expect(photoStore).toMatchSnapshot();
  });

  it("Check initial state values", () => {
    expect(photoStore.rawAlbumList).toHaveLength(0);
  });
});
