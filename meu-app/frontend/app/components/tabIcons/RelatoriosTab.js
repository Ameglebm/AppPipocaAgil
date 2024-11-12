import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function RelatoriosTab({ focused }) {
  return (
    <View style={styles.tabContainer}>
      <View style={[focused && styles.circleFocused]}>
        <Image
          source={require("../../assets/images/relatorios.png")}
          style={[styles.tabBaricon, focused && { tintColor: "#FDFDFD" }]}
        />
      </View>
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
