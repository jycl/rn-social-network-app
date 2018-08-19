import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import GenericList from "../../components/GenericList";
import UserListItem from "../../components/UserListItem";
import colors from "../../styles/colors";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

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

  /**
   * Update UserStore with selected user Object and navigate to UserDetailScreen.
   * @param {Object} user
   */
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
          renderRowItem={item => <UserListItem name={item.name} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkestBlue
  }
});

UserListScreen.wrappedComponent.propTypes = {
  userStore: PropTypes.object.isRequired //to test injected stores
};

export default UserListScreen;
