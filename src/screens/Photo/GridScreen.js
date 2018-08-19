import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PhotoGrid from "../../components/PhotoGrid";
import Constants from "../../config/constants";
import { formatDataForGrid } from "../../utility/DataFormatHelper";
/**
 * PhotoGridScreen is a screen that renders a grid of photos for a specific
 * album.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
@inject("photoStore")
@observer
class PhotoGridScreen extends Component {
  render() {
    const { currentAlbum, albumPhotoListMapping } = this.props.photoStore;
    let formattedData = formatDataForGrid(
      albumPhotoListMapping[currentAlbum.id],
      Constants.NUM_GRID_COLUMNS,
      { isPlaceholder: true }
    );
    return (
      <PhotoGrid data={formattedData} numColumns={Constants.NUM_GRID_COLUMNS} />
    );
  }
}

export default PhotoGridScreen;
