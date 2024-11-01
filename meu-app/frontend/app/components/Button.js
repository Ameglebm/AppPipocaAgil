import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.btnEnviar, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnEnviar: {
    width: "100%",
    height: 44,
    marginTop: 24,
    backgroundColor: "#2F39D3",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FDFDFD",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Urbanist_700Bold",
    lineHeight: 19,
  },
});
