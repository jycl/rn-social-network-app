import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Dimensions, Image, Text, View, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fontSize from "../../styles/fontSize";

const WINDOW_WIDTH = Dimensions.get("window").width;
/**
 * PhotoDetailScreen is a screen that renders a grid of photos for a specific
 * album.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
@inject("photoStore")
@observer
class PhotoDetailScreen extends Component {
  render() {
    const { currentPhoto } = this.props.photoStore;
    return (
      <View style={{ flex: 1, backgroundColor: colors.darkestBlue }}>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{
              width: WINDOW_WIDTH - 10,
              height: WINDOW_WIDTH - 10
            }}
            source={{ uri: currentPhoto.thumbnailUrl }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            backgroundColor: colors.darkestBlue
          }}
        >
          <Text style={styles.body}>{currentPhoto.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    color: colors.lightBlue,
    fontSize: fontSize.large
  }
});

export default PhotoDetailScreen;
