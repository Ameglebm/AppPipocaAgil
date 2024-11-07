// screens/ScreenOne.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ScreenOne() {
  return (
    <View style={styles.screen}>
      <Text>Esta é a Tela 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
