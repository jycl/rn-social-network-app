import React, { Component } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";

/**
 * GenericList component renders a FlatList with data that will populate each row rendered by
 * the renderRowItem props. The list row depends on the passed renderRowItem render method,
 * if no method is passed the default empty <View/> is rendered.  Each row can also have a onPress
 * callback the TouchableOpacity can be disabled via props.
 *
 * Props:
 * @property {array} data array of objects that each represent each row to display their props
 * @property {func} onPress callback method invoked when item row is pressed
 * @property {func} renderRowItem render method that returns a custom JSX component for each list row
 * @property {bool} disabled indicator to disable on press callback / animation for row items
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class GenericList extends Component {
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this._renderRow}
        ItemSeparatorComponent={this._renderSeparator}
        data={this.props.data}
      />
    );
  }

  /**
   * Render each list item as button passing row item into props.onPress
   */
  _renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={this.props.onPressDisabled}
        onPress={() => this.props.onPress(item)}
        style={styles.listItemContainer}
      >
        {this.props.renderRowItem(item)}
      </TouchableOpacity>
    );
  };

  /**
   *  Seperator component rendered between each row
   */
  _renderSeparator = () => <View style={styles.separator} />;

  /**
   *  Set list item key by the record Id from backend and its index
   */
  _keyExtractor = (item, index) => `${item.id}_${index}`;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.blue,
    height: 2,
    width: "100%"
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: "transparent"
  },
  listItemText: {
    color: colors.cream,
    paddingVertical: 10,
    fontSize: fontSize.medium
  }
});

GenericList.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
  renderRowItem: PropTypes.func,
  onPressDisabled: PropTypes.bool
};

GenericList.defaultProps = {
  data: [],
  onPress: () => {},
  renderRowItem: () => <View />,
  onPressDisabled: false
};

export default GenericList;
