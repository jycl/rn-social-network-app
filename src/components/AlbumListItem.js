import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";

class AlbumListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.listItemText}>{this.props.item.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "transparent"
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: colors.blue
  },
  listItemText: {
    color: colors.cream,
    paddingVertical: 10,
    fontSize: fontSize.medium
  }
});

AlbumListItem.propTypes = {
  title: PropTypes.string
};

AlbumListItem.defaultProps = {
  title: "title"
};

export default AlbumListItem;
