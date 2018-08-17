import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

/**
 * Tentative start screen for social network app.
 * It contains navigation to the user list.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigate("UserList")}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Go to user list</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  buttonContainer: {
    backgroundColor: "blue",
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#FFFFFF"
  }
});

export default HomeScreen;
