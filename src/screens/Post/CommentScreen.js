import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { inject, observer } from "mobx-react";
import GenericList from "../../components/GenericList";
import PostListItem from "../../components/PostListItem";
import CommentItem from "../../components/CommentItem";
import PropTypes from "prop-types";

/**
 * PostCommentScreen is a screen that manages the views rendered for the
 * selected post and all comments related to that post.
 *
 * Props:
 * @property {Object} postStore injected store current post and related comments
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
@inject("postStore")
@observer
class PostCommentScreen extends Component {
  render() {
    const { currentPostCommentsList, currentPost } = this.props.postStore;
    return (
      <View style={styles.container}>
        <PostListItem title={currentPost.title} body={currentPost.body} />
        <View style={styles.commentsContainer}>
          <GenericList
            data={currentPostCommentsList}
            renderRowItem={this.renderComment}
            onPressDisabled={true}
          />
        </View>
      </View>
    );
  }

  /**
   * Render method that extracts required values from item and passes into
   * component as props.
   * @param {Object} comment Object record from postStore
   */
  renderComment = comment => {
    const { name, body, email } = comment;
    return <CommentItem title={name} body={body} author={email} />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue
  },
  commentsContainer: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    borderTopWidth: 1,
    borderTopColor: colors.cream,
    padding: 5
  }
});

PostCommentScreen.wrappedComponent.propTypes = {
  postStore: PropTypes.object.isRequired //to test injected stores
};

export default PostCommentScreen;
