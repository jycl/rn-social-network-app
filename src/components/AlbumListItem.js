import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

class AlbumListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="photo-album" color={colors.lightBlue} size={30} />
        <Text style={styles.listItemText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: colors.blue
  },
  listItemText: {
    color: colors.cream,
    padding: 10,
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
