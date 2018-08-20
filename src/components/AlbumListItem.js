import React, { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

/**
 * AlbumListItem is a component that renders the list row view for each album.
 *
 * Props:
 * @property {String} title title of the album displayed in the center of the row
 * @property {Number} photoCount number of photos in album displayed next to photos icon
 * @property {func} onPress callback function when photos icon is pressed
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class AlbumListItem extends Component {
  render() {
    const { title, photoCount, onPress } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon name="photo-album" color={colors.cream} size={30} />
          <Text style={styles.listItemText}>{title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{`See photos (${photoCount}) `}</Text>
            <Icon
              name="photo-library"
              color={colors.lightBlue}
              largelarge
              size={fontSize.large}
            />
          </TouchableOpacity>
          <View style={styles.row} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "transparent"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: colors.blue
  },
  listItemText: {
    flex: 1,
    color: colors.cream,
    padding: 10,
    fontSize: fontSize.medium
  },
  text: {
    color: colors.lightBlue,
    fontSize: fontSize.small
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-end"
  },
  button: {
    flexDirection: "row",
    alignItems: "center"
  }
});

AlbumListItem.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  photoCount: PropTypes.number
};

AlbumListItem.defaultProps = {
  title: "title",
  onPress: () => {},
  photoCount: 0
};

export default AlbumListItem;
