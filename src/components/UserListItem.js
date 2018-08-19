import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";

class UserListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.listItemText}>{this.props.item.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent"
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

UserListItem.propTypes = {
  name: PropTypes.string
};

UserListItem.defaultProps = {
  name: ""
};

export default UserListItem;
