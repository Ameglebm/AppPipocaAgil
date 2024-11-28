import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

export default function EmergenciaTab({ focused }) {
  EmergenciaTab.propTypes = {
    focused: PropTypes.bool.isRequired,
  };
  return (
    <View style={styles.tabContainer}>
      <View style={[focused && styles.circleFocused]}>
        <Image
          source={require("../../assets/images/emergencia.png")}
          style={[styles.tabBarIcon, focused && { tintColor: "#FDFDFD" }]}
        />
      </View>
      <Text style={styles.tabText}>Emergência</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    width: 78,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  tabText: {
    color: "#7B7A78",
    textAlign: "center",
    fontFamily: "Lato_400Regular",
    fontSize: 12,
    fontStyle: "normal",
    lineHeight: 16,
  },
  circleFocused: {
    width: 56,
    height: 56,
    backgroundColor: "#2F39D3",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
});
