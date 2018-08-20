import React, { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

/**
 * PostListItem is a component that renders the list row view for each post
 * under the post tab (post history).
 *
 * Props:
 * @property {String} title post title
 * @property {String} body post body
 * @property {func} onPress callback when the comment icon for post is pressed
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class PostListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.body}>{this.props.body}</Text>
        {this.props.onPress && (
          <View style={styles.commentsContainer}>
            <TouchableOpacity
              style={styles.commentsButton}
              onPress={this.props.onPress}
            >
              <Text style={styles.text}>See comments </Text>
              <Icon
                name={"mode-comment"}
                color={colors.lightestBlue}
                size={fontSize.large}
              />
            </TouchableOpacity>
          </View>
        )}
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
  },
  text: {
    color: colors.lightBlue,
    fontSize: fontSize.small
  },
  commentsContainer: {
    width: "100%",
    alignItems: "flex-end"
  },
  commentsButton: {
    flexDirection: "row",
    alignItems: "center"
  }
});

PostListItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onPress: PropTypes.func
};

PostListItem.defaultProps = {
  title: "title",
  body: "body"
};

export default PostListItem;
