import React, { Component } from "react";
import { observer } from "mobx-react-lite";
import { View, StyleSheet } from "react-native";
import Grid from "../../components/Grid";
import Constants from "../../config/constants";
import { formatDataForGrid } from "../../utility/DataFormatHelper";
import colors from "../../styles/colors";
import Photo from "../../components/Photo";
import { useStore } from "../../stores";

/**
 * PhotoGridScreen is a screen that renders a grid of photos for a specific
 * album.
 *
 * Props:
 * @property {Object} photoStore injected store containing photos for selected album
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
const PhotoGridScreen = ({ navigation }) => {
  const { photoStore } = useStore();
  const { currentAlbum, albumPhotoListMapping } = photoStore;
  let formattedData = formatDataForGrid(
    albumPhotoListMapping[currentAlbum.id],
    Constants.NUM_GRID_COLUMNS,
    { isPlaceholder: true }
  );

  /**
   * Render each list item as button passing row item into props.onPress
   */
  const renderPhotoItem = ({ item }) => {
    if (item.isPlaceholder) {
      return <View style={styles.placeholder} />;
    }
    const { thumbnailUrl } = item;
    return (
      <Photo
        url={thumbnailUrl}
        onPress={() => {
          photoStore.setCurrentPhoto(item);
          navigation.navigate("PhotoDetail");
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Grid
        data={formattedData}
        numColumns={Constants.NUM_GRID_COLUMNS}
        renderGridItem={renderPhotoItem}
      />
    </View>
  );
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

export default observer(PhotoGridScreen);
