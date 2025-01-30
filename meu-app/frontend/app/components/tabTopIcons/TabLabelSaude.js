import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SaudeSvg from "../SvgComponents/SaudeSvg"; // O componente SVG exportado pelo SVGR

export default function TabLabelSaude({ focused }) {
  TabLabelSaude.propTypes = {
    focused: PropTypes.bool.isRequired,
  };

  // Define a cor com base no estado "focused"
  const iconColor = focused ? "#6179FA" : "#7B7A78";
  const textColor = focused ? "#6179FA" : "#7B7A78";

  return (
    <View style={styles.tabLabelContainer}>
      <SaudeSvg
        style={[
          styles.tabImage,
          { color: iconColor }, // Passa a cor dinamicamente via "color"
        ]}
      />
      <Text
        style={[
          styles.tabText,
          { color: textColor }, // Passa a cor dinamicamente para o texto
        ]}
      >
        Saúde
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
  },
});
