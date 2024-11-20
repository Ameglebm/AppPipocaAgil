import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function ButtonSave({ scrollTo }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} style={styles.moveButtton}>
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
  },
  moveButtton: {
    width: "100%",
    height: 36,
    borderRadius: 8,
    backgroundColor: "#2F39D3",
    justifyContent: "center",
    alignItems: "center",
    // Configuração de sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Configuração de sombra para Android
    elevation: 3, // Use valores baixos para uma sombra mais sutil
  },
  textButton: {
    fontFamily: "Urbanist_700Bold",
    color: "#FDFDFD",
    fontSize: 18,
    lineHeight: 19.8,
  },
});
