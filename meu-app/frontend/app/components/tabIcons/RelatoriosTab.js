import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function RelatoriosTab({ focused }) {
  return (
    <View style={styles.tabContainer}>
      <Image source={require("../../assets/images/relatorios.png")} />
      <Text style={styles.tabText}>Relatórios</Text>
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
    fontFamily: "Lato_400Regular",
  },
});
