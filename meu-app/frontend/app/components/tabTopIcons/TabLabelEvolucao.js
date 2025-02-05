// components/TabLabelEvolucao.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import EvolucaoSvg from "../SvgComponents/EvolucaoSvg";

export default function TabLabelEvolucao({ focused }) {
  TabLabelEvolucao.propTypes = {
    focused: PropTypes.bool.isRequired,
  };

  const iconColor = focused ? "#6179FA" : "#7B7A78";
  const textColor = focused ? "#6179FA" : "#7B7A78";

  return (
    <View style={styles.tabLabelContainer}>
      <EvolucaoSvg style={[styles.tabImage, { color: iconColor }]} />
      <Text style={[styles.tabText, { color: textColor }]}>Evolução</Text>
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
});
