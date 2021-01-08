import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {observer} from 'mobx-react-lite';
import Tab from '../../components/Tab';
import Constants from '../../config/constants';
import GenericList from '../../components/GenericList';
import PostListItem from '../../components/PostListItem';
import AlbumListItem from '../../components/AlbumListItem';
import TodoListItem from '../../components/TodoListItem';
import UserDetailCard from '../../components/UserDetailCard';
import {getInitialsFromName} from '../../utility/DataFormatHelper';
import {useStore} from '../../stores';
import {
  NavigationProps,
  UserType,
  PostType,
  AlbumType,
  TodoType,
  TabType,
} from '../../types';

/**
 * UserDetailScreen is a screen that renders two main UI components.
 * The upper component displays the user details while the lower
 * component displays post history, photos, or todo list depending on
 * the tab selected.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */

/**
 * @param {String} title String displayed on tab and also used to determine selected/highlight tab
 * @return {JSX<Component>} <Tab> component configured to display title with onPress callback
 */

const UserDetailScreen = ({navigation}: NavigationProps) => {
  const {userStore, postStore, photoStore, todoStore} = useStore();
  useEffect(() => {
    if (userStore.selectedUser) {
      const {id} = userStore.selectedUser;
      postStore.loadPostHistory(id); // load the default tab selection details  
    }
  }, [userStore, postStore]);
  const {selectedUserDetails, selectedTab} = userStore;
  const {name} = selectedUserDetails as UserType;
  const initials = getInitialsFromName(name);

  /**
   * @param {String} tabCategory tab title used set the selected tab in UserStore
   * @return {func} Function that invokes selectTab with the passed param
   */
  const onPressTab = (tabCategory: TabType) => userStore.selectTab(tabCategory);

  const renderTab = (title: TabType) => {
    const isHighlighted = userStore.isHighlighted(title);
    return (
      <Tab
        title={title}
        onPress={() => onPressTab(title)}
        isHighlighted={isHighlighted}
      />
    );
  };

  /**
   * Update PostStore with selected post Object, load related comments and
   * navigate to PostCommentScreen.
   * @param {Object} post
   */
  const onPressPostItem = (post: PostType) => {
    postStore.setCurrentPost(post);
    postStore.loadPostComments(post.id);
    navigation.navigate('PostComment');
  };

  /**
   * Update PhotoStore with selected album Object and navigate to PhotoGridScreen.
   * @param {Object} album
   */
  const onPressPhotoAlbum = (album: AlbumType) => {
    photoStore.setCurrentAlbum(album);
    navigation.navigate('PhotoGrid');
  };

  /**
   * Render the list with correct data, props passed and corresponding component for
   * each GenericList row according to the selected tab: Posts, Albums or Todos.
   * @param {String} category compare with constants to check which list to render.
   * @return {JSX<Component>} <GenericList> with renderRowItem corresponding to category
   *                          default <View> if category is not matched with switch-case.
   */
  const renderCategoryList = (category: TabType) => {
    switch (category) {
      case Constants.TAB_OPTION.POSTS:
        return (
          <GenericList
            data={postStore.postList}
            onPressDisabled={true}
            renderRowItem={(item: PostType) => (
              <PostListItem
                title={item.title}
                body={item.body}
                onPress={() => onPressPostItem(item)}
              />
            )}
          />
        );
      case Constants.TAB_OPTION.ALBUMS:
        return (
          <GenericList
            data={photoStore.albumList}
            onPressDisabled={true}
            renderRowItem={(item: AlbumType) => (
              <AlbumListItem
                title={item.title}
                photoCount={item.photoCount}
                onPress={() => onPressPhotoAlbum(item)}
              />
            )}
          />
        );
      case Constants.TAB_OPTION.TODOS:
        return (
          <GenericList
            data={todoStore.todoList}
            renderRowItem={(item: TodoType) => (
              <TodoListItem completed={item.completed} title={item.title} />
            )}
            onPressDisabled={true}
          />
        );
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <UserDetailCard details={selectedUserDetails} initials={initials} />
      <View style={styles.tabs}>
        {renderTab(Constants.TAB_OPTION.POSTS)}
        {renderTab(Constants.TAB_OPTION.ALBUMS)}
        {renderTab(Constants.TAB_OPTION.TODOS)}
      </View>
      <View style={styles.categoryContainer}>
        {renderCategoryList(selectedTab)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  detailCard: {
    flex: 1,
    margin: 10,
  },
  tabs: {
    flexDirection: 'row',
  },
  categoryContainer: {
    flex: 4,
    backgroundColor: colors.darkBlue,
  },
});

export default observer(UserDetailScreen);
