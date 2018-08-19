import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { inject, observer } from "mobx-react";
import GenericList from "../../components/GenericList";
import PostListItem from "../../components/PostListItem";
import CommentItem from "../../components/CommentItem";

/**
 * PostCommentScreen is a screen that renders the selected post
 * and all comments related to that post.
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

  renderComment = item => {
    const { name, body, email } = item;
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

export default PostCommentScreen;
