import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";

class PostListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.body}>{this.props.body}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent"
  },
  rowContainer: {
    padding: 10,
    backgroundColor: colors.blue
  },
  title: {
    fontWeight: "bold",
    color: colors.cream,
    padding: 10,
    fontSize: fontSize.medium
  },
  body: {
    color: colors.cream,
    padding: 10,
    fontSize: fontSize.small
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
