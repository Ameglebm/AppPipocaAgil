import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function HomeTab({ focused }) {
  return (
    <View style={styles.tabContainer}>
      <Image
        source={require("../../assets/images/home-02.png")}
        style={styles.tabBaricon}
      />
      <Text style={styles.tabText}>Home</Text>
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
  tabBaricon: {},
  tabText: {
    color: "#7B7A78",
    fontFamily: "Lato_400Regular",
  },
  tabTextFocused: {},
});
