import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import MedicacaoSvg from "../svgComponenets/MedicacaoSvg";

export default function MedicacaoTab({ focused }) {
  MedicacaoTab.propTypes = {
    focused: PropTypes.bool.isRequired,
  };

  const iconColor = focused ? "#FDFDFD" : "#7B7A78"; // Cor do ícone com base no estado "focused"
  const circleColor = focused ? "#2F39D3" : "transparent"; // Cor do círculo com base no estado "focused"

  return (
    <View style={styles.tabContainer}>
      <View style={[styles.circle, focused && styles.circleFocused]}>
        {/* Passa a cor para o componente MedicacaoSvg */}
        <MedicacaoSvg color={iconColor} />
      </View>
      <Text style={[styles.tabText, focused && styles.colorFocused]}>
        Medicação
      </Text>
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
    color: "#7B7A78", // Cor padrão do texto
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
