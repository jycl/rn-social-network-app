import React, { Component } from "react";
import { createStackNavigator, HeaderBackButton } from "react-navigation";
import UserListScreen from "./src/screens/User/ListScreen";
import UserDetailScreen from "./src/screens/User/DetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PostCommentScreen from "./src/screens/Post/CommentScreen";
import PhotoGridScreen from "./src/screens/Photo/GridScreen";
import PhotoDetailScreen from "./src/screens/Photo/DetailScreen";
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
      navigationOptions: ({ navigation }) => ({
        title: `${userStore.selectedUser.name}`,
        headerLeft: () => {
          let goBack = () => {
            userStore.resetSelection();
            navigation.goBack();
          };
          return (
            <HeaderBackButton
              tintColor={colors.lightestBlue}
              onPress={() => goBack()}
            />
          );
        }
      })
    },
    PostComment: {
      screen: PostCommentScreen,
      navigationOptions: navStyleRenderer
    },
    PhotoGrid: {
      screen: PhotoGridScreen,
      navigationOptions: navStyleRenderer
    },
    PhotoDetail: {
      screen: PhotoDetailScreen,
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
