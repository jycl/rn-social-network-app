import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

/**
 * Photo component renders an Image.
 *
 * Props:
 * @property {String} url source uri to retrieve thumbnail for image
 * @property {func} onPress callback method invoked when photo is pressed
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class Photo extends Component {
  render() {
    return (
      <TouchableOpacity
        disabled={true}
        onPress={() => this.props.onPress(item)}
        style={styles.listItemContainer}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: this.props.url }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent"
  }
});

Photo.propTypes = {
  url: PropTypes.string,
  onPress: PropTypes.func
};

Photo.defaultProps = {
  url: "",
  onPress: () => {}
};

export default Photo;
