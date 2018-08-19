import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Photo from "./Photo";

/**
 * PhotoGrid component renders a FlatList with numColumns props to form a grid.
 * The items rendered are photos (Images rendered with url from data).
 *
 * Props:
 * @property {array} data array of objects that each represent a photo record
 * @property {func} onPress callback method invoked when photo is pressed
 * @property {number} numColumns number of columns to render grid by

 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class PhotoGrid extends Component {
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this.renderPhotoItem}
        data={this.props.data}
        numColumns={this.props.numColumns}
      />
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
    return <Photo url={thumbnailUrl} onPress={this.props.onPress} />;
  };

  /**
   *  Set list item key by the user Id from backend and its index
   */
  _keyExtractor = (item, index) => `${item.id}_${index}`;
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent"
  }
});

PhotoGrid.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
  renderRowItem: PropTypes.func,
  onPressDisabled: PropTypes.bool
};

PhotoGrid.defaultProps = {
  data: [],
  onPress: () => {},
  renderRowItem: () => <View />,
  onPressDisabled: false
};

export default PhotoGrid;
