import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";

export default function ButtonSave({ onPress, style }) {
  ButtonSave.propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.moveButtton} onPress={onPress}>
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  moveButtton: {
    width: 320,
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
