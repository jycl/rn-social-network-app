import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";

/**
 * Grid component renders a FlatList with numColumns props to form a grid.
 *
 * Props:
 * @property {array} data array of objects represented in each grid element
 * @property {number} numColumns number of columns to render grid by
 * @property {func} renderGridItem render method for each element
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class Grid extends Component {
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this.props.renderGridItem}
        data={this.props.data}
        numColumns={this.props.numColumns}
      />
    );
  }

  /**
   *  Set list item key by the Id of object and its index
   */
  _keyExtractor = (item, index) => `${item.id}_${index}`;
}

Grid.propTypes = {
  data: PropTypes.array,
  renderGridItem: PropTypes.func,
  onPressDisabled: PropTypes.bool
};

Grid.defaultProps = {
  data: [],
  onPress: () => {},
  renderGridItem: () => <View />
};

export default Grid;
