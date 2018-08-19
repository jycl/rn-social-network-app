import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fontSize from "../styles/fontSize";
import PropTypes from "prop-types";

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
    backgroundColor: colors.darkestBlue
  },
  text: {
    fontSize: fontSize.medium,
    color: colors.cream
  },
  highlighted: {
    backgroundColor: colors.cream
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
