import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";

/**
 * CommentItem is a component that renders the list row view for each comment
 * under the selected post.
 *
 * Props:
 * @property {String} title comment title
 * @property {String} body comment body
 * @property {String} author email/name of the commenter
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class CommentItem extends Component {
  render() {
    const { title, body, author } = this.props;
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        <Text style={styles.author}>Posted by: {author}</Text>
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
    color: colors.cream,
    padding: 10,
    fontSize: fontSize.small
  },
  body: {
    color: colors.cream,
    padding: 10,
    fontSize: fontSize.verySmall
  },
  author: {
    flex: 1,
    alignSelf: "flex-end",
    color: colors.cream,
    padding: 10,
    fontSize: fontSize.verySmall
  }
});

CommentItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.string
};

CommentItem.defaultProps = {
  title: "title",
  body: "body",
  author: "John Doe"
};

export default CommentItem;
