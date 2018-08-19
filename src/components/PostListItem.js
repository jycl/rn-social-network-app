import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";

class PostListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.listItemText}>{this.props.title}</Text>
        <Text style={styles.listItemText}>{this.props.body}</Text>
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

PostListItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
};

PostListItem.defaultProps = {
  title: "title",
  body: "body"
};

export default PostListItem;
