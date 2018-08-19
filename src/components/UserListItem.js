import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
class UserListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="person" color={colors.lightBlue} size={30} />
        <Text style={styles.listItemText}>{this.props.item.name}</Text>
        <Icon name="keyboard-arrow-right" color={colors.lightBlue} size={30} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  listItemText: {
    flex: 1,
    color: colors.lightBlue,
    paddingVertical: 10,
    paddingLeft: 10,
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
