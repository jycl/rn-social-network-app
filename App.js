import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import UserListScreen from "./src/screens/User/ListScreen";
import UserDetailScreen from "./src/screens/User/DetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PostCommentScreen from "./src/screens/Post/CommentScreen";
import PhotoGridScreen from "./src/screens/Photo/GridScreen";
import { Provider, observer } from "mobx-react";
import stores from "./src/stores";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    UserList: { screen: UserListScreen },
    UserDetail: { screen: UserDetailScreen },
    PostComment: { screen: PostCommentScreen },
    PhotoGrid: { screen: PhotoGridScreen }
    /* To include:
        - PhotoAlbumScreen --> PhotoListScreen
        - PostHistoryScreen
        - TodoListScreen
    */
  },
  {
    initialRouteName: "UserList"
  }
);

@observer
export default class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <AppNavigator />
      </Provider>
    );
  }
}
