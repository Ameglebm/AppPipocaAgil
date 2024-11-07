import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmergenciaTab({ focused }) {
  return (
    <View style={styles.tabContainer}>
      <Image source={require("../../assets/images/emergencia.png")} />
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
    fontFamily: "Lato_400Regular",
  },
});
