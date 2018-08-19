import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../styles/colors";

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
        onPress={() => this.props.onPress()}
        style={styles.listItemContainer}
      >
        <Image style={styles.photoContainer} source={{ uri: this.props.url }} />
        {this.renderPlaceholder()}
      </TouchableOpacity>
    );
  }

  /**
   * Render loading icon when image has not fully loaded from URL.
   */
  renderPlaceholder() {
    return (
      <View zIndex={-1} style={[styles.placeholder, styles.photoContainer]}>
        <Icon name="data-usage" color={colors.lightBlue} size={30} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent"
  },
  photoContainer: {
    width: 100,
    height: 100
  },
  placeholder: {
    flex: 1,
    left: 10,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
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
