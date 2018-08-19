import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import UserList from "../../components/UserList";
import colors from "../../styles/colors";
import { inject, observer } from "mobx-react";

/**
 * UserListScreen is a screen that renders UI components displaying
 * the user list retrieved from the backend API.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
@inject("userStore")
@observer
class UserListScreen extends Component {
  componentDidMount() {
    this.props.userStore.loadUserList();
  }

  onPressUserRow = user => {
    this.props.userStore.selectUser(user);
    this.props.navigation.navigate("UserDetail");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, styles.headerText]}>User list:</Text>
        <UserList
          userList={this.props.userStore.filteredUserList}
          onPress={this.onPressUserRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream
  },
  header: {
    margin: 10
  },
  headerText: {
    fontSize: 20
  }
});

export default UserListScreen;
