import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Label = ({ title, style }) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={[styles.label, style]}>{title}</Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  labelContainer: {
    alignSelf: "flex-start",
  },
  label: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    height: 21,
  },
});
