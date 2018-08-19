import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import GenericList from "../../components/GenericList";
import UserListItem from "../../components/UserListItem";
import colors from "../../styles/colors";
import fontSize from "../../styles/fontSize";
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
        <GenericList
          data={this.props.userStore.filteredUserList}
          onPress={this.onPressUserRow}
          renderRowItem={item => <UserListItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkestBlue
  },
  header: {
    margin: 10
  },
  headerText: {
    color: colors.lightBlue,
    fontSize: fontSize.large
  }
});

export default UserListScreen;
