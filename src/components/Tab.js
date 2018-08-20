import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";

/**
 * Grid component renders a TouachableOpacity with title and callback on press.
 *
 * Props:
 * @property {String} title displayed on tab
 * @property {func} onPress callback when tab is pressed
 * @property {bool} isHighlighted indicator that tab is currently selected (highlight style)
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class Tab extends Component {
  render() {
    const { title, onPress, isHighlighted } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, isHighlighted && styles.highlighted]}
      >
        <Text style={[styles.text, isHighlighted && styles.highlightedText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: colors.darkestBlue
  },
  text: {
    fontSize: fontSize.medium,
    color: colors.cream
  },
  highlighted: {
    backgroundColor: colors.lightestBlue
  },
  highlightedText: {
    color: colors.darkestBlue
  }
});

Tab.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  isHighlighted: PropTypes.bool
};

Tab.defaultProps = {
  title: "",
  onPress: () => {},
  isHighlighted: false
};

export default Tab;
