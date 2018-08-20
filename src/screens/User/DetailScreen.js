import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { inject, observer } from "mobx-react";
import Tab from "../../components/Tab";
import Constants from "../../config/constants";
import GenericList from "../../components/GenericList";
import PostListItem from "../../components/PostListItem";
import AlbumListItem from "../../components/AlbumListItem";
import TodoListItem from "../../components/TodoListItem";
import UserDetailCard from "../../components/UserDetailCard";
import { getInitialsFromName } from "../../utility/DataFormatHelper";
import PropTypes from "prop-types";

/**
 * UserDetailScreen is a screen that renders two main UI components.
 * The upper component displays the user details while the lower
 * component displays post history, photos, or todo list depending on
 * the tab selected.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
@inject("userStore", "postStore", "photoStore", "todoStore")
@observer
class UserDetailScreen extends Component {
  componentDidMount() {
    const { id } = this.props.userStore.selectedUser;
    this.props.postStore.loadPostHistory(id); //load the default tab selection details
  }

  render() {
    const { selectedUserDetails, selectedTab } = this.props.userStore;
    const { name } = selectedUserDetails;
    const initials = getInitialsFromName(name);
    return (
      <View style={styles.container}>
        <UserDetailCard details={selectedUserDetails} initials={initials} />
        <View style={styles.tabs}>
          {this.renderTab(Constants.TAB_OPTION.POSTS)}
          {this.renderTab(Constants.TAB_OPTION.ALBUMS)}
          {this.renderTab(Constants.TAB_OPTION.TODOS)}
        </View>
        <View style={styles.categoryContainer}>
          {this.renderCategoryList(selectedTab)}
        </View>
      </View>
    );
  }

  /**
   * @param {String} title String displayed on tab and also used to determine selected/highlight tab
   * @return {JSX<Component>} <Tab> component configured to display title with onPress callback
   */
  renderTab(title) {
    const isHighlighted = this.props.userStore.isHighlighted(title);
    return (
      <Tab
        title={title}
        onPress={() => this.onPressTab(title)}
        isHighlighted={isHighlighted}
      />
    );
  }

  /**
   * @param {String} tabCategory tab title used set the selected tab in UserStore
   * @return {func} Function that invokes selectTab with the passed param
   */
  onPressTab = tabCategory => this.props.userStore.selectTab(tabCategory);

  /**
   * Render the list with correct data, props passed and corresponding component for
   * each GenericList row according to the selected tab: Posts, Albums or Todos.
   * @param {String} category compare with constants to check which list to render.
   * @return {JSX<Component>} <GenericList> with renderRowItem corresponding to category
   *                          default <View> if category is not matched with switch-case.
   */
  renderCategoryList(category) {
    switch (category) {
      case Constants.TAB_OPTION.POSTS:
        return (
          <GenericList
            data={this.props.postStore.postList}
            onPressDisabled={true}
            renderRowItem={item => (
              <PostListItem
                title={item.title}
                body={item.body}
                onPress={() => this.onPressPostItem(item)}
              />
            )}
          />
        );
      case Constants.TAB_OPTION.ALBUMS:
        return (
          <GenericList
            data={this.props.photoStore.albumList}
            onPressDisabled={true}
            renderRowItem={item => (
              <AlbumListItem
                title={item.title}
                photoCount={item.photoCount}
                onPress={() => this.onPressPhotoAlbum(item)}
              />
            )}
          />
        );
      case Constants.TAB_OPTION.TODOS:
        return (
          <GenericList
            data={this.props.todoStore.todoList}
            renderRowItem={item => (
              <TodoListItem completed={item.completed} title={item.title} />
            )}
            onPressDisabled={true}
          />
        );
      default:
        return <View />;
    }
  }

  /**
   * Update PostStore with selected post Object, load related comments and
   * navigate to PostCommentScreen.
   * @param {Object} post
   */
  onPressPostItem = post => {
    this.props.postStore.setCurrentPost(post);
    this.props.postStore.loadPostComments(post.id);
    this.props.navigation.navigate("PostComment");
  };

  /**
   * Update PhotoStore with selected album Object and navigate to PhotoGridScreen.
   * @param {Object} album
   */
  onPressPhotoAlbum = album => {
    this.props.photoStore.setCurrentAlbum(album);
    this.props.navigation.navigate("PhotoGrid");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue
  },
  detailCard: {
    flex: 1,
    margin: 10
  },
  tabs: {
    flexDirection: "row"
  },
  categoryContainer: {
    flex: 4,
    backgroundColor: colors.darkBlue
  }
});

//to test injected stores
UserDetailScreen.wrappedComponent.propTypes = {
  userStore: PropTypes.object.isRequired,
  postStore: PropTypes.object.isRequired,
  photoStore: PropTypes.object.isRequired,
  todoStore: PropTypes.object.isRequired
};

export default UserDetailScreen;
