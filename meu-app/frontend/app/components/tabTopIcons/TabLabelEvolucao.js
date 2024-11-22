// components/TabLabelEvolucao.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function TabLabelEvolucao({ focused }) {
  TabLabelEvolucao.propTypes = {
    focused: PropTypes.bool.isRequired,
  };

  return (
    <View style={styles.tabLabelContainer}>
      <Image
        source={require("../../assets/images/bar-line-chart.png")}
        style={[styles.tabImage, focused && { tintColor: "#6179FA" }]}
      />
      <Text
        style={[styles.tabText, focused ? styles.colorFocused : styles.tabText]}
      >
        Evolução
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tabImage: {
    width: 20,
    height: 20,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Lato_700Bold",
    lineHeight: 22,
    color: "#7B7A78",
  },
  colorFocused: {
    fontSize: 16,
    fontFamily: "Lato_700Bold",
    lineHeight: 22,
    color: "#6179FA",
  },
});
