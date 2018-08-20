import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { View, StyleSheet } from "react-native";
import Grid from "../../components/Grid";
import Constants from "../../config/constants";
import { formatDataForGrid } from "../../utility/DataFormatHelper";
import colors from "../../styles/colors";
import Photo from "../../components/Photo";
import PropTypes from "prop-types";

/**
 * PhotoGridScreen is a screen that renders a grid of photos for a specific
 * album.
 *
 * Props:
 * @property {Object} photoStore injected store containing photos for selected album
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
      <View style={styles.container}>
        <Grid
          data={formattedData}
          numColumns={Constants.NUM_GRID_COLUMNS}
          renderGridItem={this.renderPhotoItem}
        />
      </View>
    );
  }

  /**
   * Render each list item as button passing row item into props.onPress
   */
  renderPhotoItem = ({ item }) => {
    if (item.isPlaceholder) {
      return <View style={styles.placeholder} />;
    }
    const { thumbnailUrl } = item;
    return (
      <Photo
        url={thumbnailUrl}
        onPress={() => {
          this.props.photoStore.setCurrentPhoto(item);
          this.props.navigation.navigate("PhotoDetail");
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue
  },
  placeholder: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent"
  }
});

PhotoGridScreen.wrappedComponent.propTypes = {
  photoStore: PropTypes.object.isRequired //to test injected stores
};

export default PhotoGridScreen;
