import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import UserListScreen from "./src/screens/User/ListScreen";
import HomeScreen from "./src/screens/HomeScreen";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    UserList: { screen: UserListScreen }
    /* To include:
        - UserDetailScreen
        - PhotoAlbumScreen --> PhotoListScreen
        - PostHistoryScreen
        - TodoListScreen
    */
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends Component {
  render() {
    return <AppNavigator />;
  }
}
