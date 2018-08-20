import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import colors from "../styles/colors";

/**
 * UserDetailCard component renders details (properties) of the currently
 * selected user record. The initials of the user are also displayed on a
 * circular icon to the left.
 *
 * Props:
 * @property {String} initials two character string to display on left icon
 * @property {object} details object containing user details, if the corresponding
 *                            parameter is null or undefined, display empty string
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
class UserDetailCard extends Component {
  render() {
    const { details, initials } = this.props;
    const { name, email, phone, address, workplace } = details;
    return (
      <View style={styles.container}>
        <View style={styles.initialsContainer}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.renderLabelValue("Name: ", name || "")}
          {this.renderLabelValue("Email: ", email || "")}
          {this.renderLabelValue("Phone: ", phone || "")}
          {this.renderLabelValue("Address: ", address || "")}
          {this.renderLabelValue("Company: ", workplace || "")}
        </View>
      </View>
    );
  }

  renderLabelValue(label, value) {
    return (
      <View style={styles.labelContainer}>
        <Text style={[styles.label, styles.text]}>{label}</Text>
        <Text style={[styles.labelValue, styles.text]}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  labelContainer: {
    paddingVertical: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontWeight: "bold"
  },
  labelValue: {
    flex: 1,
    textAlign: "right"
  },
  text: {
    color: colors.cream
  },
  initialsContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: colors.lightestBlue,
    alignItems: "center",
    justifyContent: "center"
  },
  initials: {
    color: colors.darkestBlue,
    fontSize: 48
  }
});

UserDetailCard.propTypes = {
  details: PropTypes.object,
  initials: PropTypes.string
};

UserDetailCard.defaultProps = {
  details: {},
  initials: "AA"
};

export default UserDetailCard;
