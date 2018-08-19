import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";

/**
 * GenericList component renders a FlatList with data from the userList props.
 * The list displays users' names retrieved from the backend and allows the
 * app user to press the list item to navigate to get more details (via onPress props).
 *
 * Props:
 * @property {array} data array of objects that each represent each row to display their props
 * @property {func} onPress callback method invoked when item row is pressed
 * @property {func} renderRowItem render method that returns a custom JSX component for each list row
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class GenericList extends Component {
  render() {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this._renderUserRow}
        ItemSeparatorComponent={this._renderSeparator}
        data={this.props.data}
      />
    );
  }

  /**
   * Render each list item as button passing row item into props.onPress
   */
  _renderUserRow = ({ item, index }) => {
    return (
      <TouchableOpacity
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
   *  Set list item key by the user Id from backend and its index
   */
  _keyExtractor = (item, index) => `${item.id}_${index}`;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.darkBlue,
    height: 2,
    width: "100%"
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: colors.blue
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
  renderRowItem: PropTypes.func
};

GenericList.defaultProps = {
  data: [],
  onPress: () => {},
  renderRowItem: () => <View />
};

export default GenericList;