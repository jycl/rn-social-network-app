import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { inject, observer } from "mobx-react";
import GenericList from "../../components/GenericList";

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
        <View style={styles.container}>
          <Text>{currentPost.title}</Text>
          <Text>{currentPost.body}</Text>
        </View>
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
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.body}</Text>
        <Text>{item.email}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream
  },
  commentsContainer: {
    flex: 4,
    backgroundColor: colors.darkBlue
  }
});

export default PostCommentScreen;
