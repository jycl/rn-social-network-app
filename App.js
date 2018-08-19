import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import UserListScreen from "./src/screens/User/ListScreen";
import UserDetailScreen from "./src/screens/User/DetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PostCommentScreen from "./src/screens/Post/CommentScreen";
import PhotoGridScreen from "./src/screens/Photo/GridScreen";
import { Provider, observer } from "mobx-react";
import stores from "./src/stores";
import colors from "./src/styles/colors";
import fontSize from "./src/styles/fontSize";
import userStore from "./src/stores/userStore";

//callback to update the navBar header title value
const navStyleRenderer = () => ({
  title: `${userStore.selectedUser.name}`
});
const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    UserList: {
      screen: UserListScreen,
      navigationOptions: ({ navigation }) => ({
        title: `User List`,
        headerTitleStyle: {
          fontSize: fontSize.large
        }
      })
    },
    UserDetail: {
      screen: UserDetailScreen,
      navigationOptions: navStyleRenderer
    },
    PostComment: {
      screen: PostCommentScreen,
      navigationOptions: navStyleRenderer
    },
    PhotoGrid: {
      screen: PhotoGridScreen,
      navigationOptions: navStyleRenderer
    }
  },
  {
    initialRouteName: "UserList",
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.darkestBlue
      },
      headerTintColor: colors.lightestBlue,
      headerTitleStyle: {
        fontSize: fontSize.medium
      },
      headerBackTitle: " "
    }
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
