// components/TabLabelSaude.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function TabLabelSaude() {
  return (
    <View style={styles.tabLabelContainer}>
      <Image
        source={require("../assets/images/saude-on.png")}
        style={styles.tabImage}
      />
      <Text style={styles.tabText}>Saúde</Text>
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
    width: 24,
    height: 24,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Lato_700Bold",
    lineHeight: 22,
  },
});
