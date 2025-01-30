import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import HistóricoSvg from "../SvgComponents/HistoricoSvg"; // Certifique-se de importar o SVG corretamente

export default function TabLabelHistorico({ focused }) {
  TabLabelHistorico.propTypes = {
    focused: PropTypes.bool.isRequired,
  };

  // Cor do ícone e texto com base no estado "focused"
  const iconColor = focused ? "#6179FA" : "#7B7A78";
  const textColor = focused ? "#6179FA" : "#7B7A78";

  return (
    <View style={styles.tabLabelContainer}>
      <HistóricoSvg
        style={[styles.tabImage, { color: iconColor }]} // Passando a cor dinamicamente para o SVG
      />
      <Text
        style={[styles.tabText, { color: textColor }]} // Passando a cor dinamicamente para o texto
      >
        Histórico
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
    color: "#7B7A78", // Cor padrão do texto
  },
});
