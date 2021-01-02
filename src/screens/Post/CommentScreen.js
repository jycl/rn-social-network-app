import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { observer } from "mobx-react-lite";
import GenericList from "../../components/GenericList";
import PostListItem from "../../components/PostListItem";
import CommentItem from "../../components/CommentItem";
import { useStore } from "../../stores";

/**
 * PostCommentScreen is a screen that manages the views rendered for the
 * selected post and all comments related to that post.
 *
 * Props:
 * @property {Object} postStore injected store current post and related comments
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
const PostCommentScreen = () => {
  const { postStore } = useStore();
  const { currentPostCommentsList, currentPost } = postStore;
  /**
   * Render method that extracts required values from item and passes into
   * component as props.
   * @param {Object} comment Object record from postStore
   */
  const renderComment = comment => {
    const { name, body, email } = comment;
    return <CommentItem title={name} body={body} author={email} />;
  };

  return (
    <View style={styles.container}>
      <PostListItem title={currentPost.title} body={currentPost.body} />
      <View style={styles.commentsContainer}>
        <GenericList
          data={currentPostCommentsList}
          renderRowItem={renderComment}
          onPressDisabled={true}
        />
      </View>
    </View>
  );
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

export default observer(PostCommentScreen);
