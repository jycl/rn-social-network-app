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
 * UserList component renders a FlatList with data from the userList props.
 * The list displays users' names retrieved from the backend and allows the
 * app user to press the list item to navigate to get more details (via onPress props).
 *
 * Props:
 * @property {array} userList array of objects that each represent a user and their details/props
 * @property {func} onPress callback method invoked when item row for user is pressed
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class UserList extends Component {
  render() {
    return (
      <FlatList
        ref="userList"
        keyExtractor={this._keyExtractor}
        renderItem={this._renderUserRow}
        ItemSeparatorComponent={this._renderSeparator}
        data={this.props.userList}
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
        <Text style={styles.listItemText}>{item.name}</Text>
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

UserList.propTypes = {
  userList: PropTypes.array,
  onPress: PropTypes.func
};

UserList.defaultProps = {
  userList: [],
  onPress: () => {}
};

export default UserList;
