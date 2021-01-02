import React, { Component, createContext, useContext } from "react";
import { createStackNavigator, createAppContainer, HeaderBackButton } from "react-navigation";
import UserListScreen from "./src/screens/User/ListScreen";
import UserDetailScreen from "./src/screens/User/DetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PostCommentScreen from "./src/screens/Post/CommentScreen";
import PhotoGridScreen from "./src/screens/Photo/GridScreen";
import PhotoDetailScreen from "./src/screens/Photo/DetailScreen";
import { observer } from 'mobx-react-lite';
import { store, StoreContext, useStore }  from "./src/stores";
import colors from "./src/styles/colors";
import fontSize from "./src/styles/fontSize";
// import userStore from "./src/stores/userStore";

//callback to update the navBar header title value
const navStyleRenderer = () => ({
  // title: userStore.selectedUser ? `${userStore.selectedUser.name}` : '',
});
const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    UserList: {
      screen: UserListScreen,
      navigationOptions: () => ({
        title: `User List`,
        headerTitleStyle: {
          fontSize: fontSize.large
        }
      })
    },
    UserDetail: {
      screen: UserDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('name', 'User Details'),
        headerLeft: () => {
          return (
            <HeaderBackButton
              tintColor={colors.lightestBlue}
              onPress={() => {
                const onBack = navigation.getParam('onBack', () => {});
                if(onBack) {
                  onBack();
                }
                navigation.goBack();
              }}
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
    defaultNavigationOptions: {
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
const App = observer(() => {
  const AppContainer = createAppContainer(AppNavigator);
  return (
    <StoreContext.Provider value={store}>
      <AppContainer />
    </StoreContext.Provider>
  );
});

export default App;