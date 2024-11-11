import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function HomeTab({ focused }) {
  return (
    <View style={styles.tabContainer}>
      <View style={[focused && styles.circleFocused]}>
        <Image
          source={require("../../assets/images/home-02.png")}
          style={styles.tabBaricon}
        />
      </View>
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
  circleFocused: {
    width: 50,
    height: 50,
    backgroundColor: "#2F39D3",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
});
