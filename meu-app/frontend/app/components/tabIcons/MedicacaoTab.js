import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function MedicacaoTab({ focused }) {
  return (
    <View style={styles.tabContainer}>
      <Image source={require("../../assets/images/pilulas 1.png")} />
      <Text style={styles.tabText}>Medicação</Text>
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
