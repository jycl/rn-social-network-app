import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

class TodoListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.completed ? (
          <Icon
            style={styles.listItemSymbol}
            name={"check-box"}
            color={colors.lightestBlue}
            size={fontSize.large}
          />
        ) : (
          <Icon
            style={styles.listItemSymbol}
            name={"check-box-outline-blank"}
            color={colors.lightestBlue}
            size={fontSize.large}
          />
        )}
        <Text style={styles.listItemText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: colors.blue
  },
  listItemText: {
    flex: 1,
    color: colors.cream,
    paddingVertical: 10,
    fontSize: fontSize.medium
  },
  listItemSymbol: {
    paddingRight: 12
  }
});

TodoListItem.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool
};

TodoListItem.defaultProps = {
  title: "title",
  completed: false
};

export default TodoListItem;
