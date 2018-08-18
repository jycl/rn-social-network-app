import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";

/**
 * UserListScreen is a screen that renders UI components displaying
 * the user list retrieved from the backend API.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class UserListScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, styles.headerText]}>User list:</Text>
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
