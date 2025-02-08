import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";

export default function ButtonSave({ onPress, style, disabled }) {
  return (
    <View style={[styles.container, style?.container]}>
      <TouchableOpacity
        style={[
          styles.moveButton,
          style?.moveButton,
          disabled ? styles.disabled : null,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.textButton, style?.textButton]}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

ButtonSave.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape({
    container: PropTypes.object,
    moveButton: PropTypes.object,
    textButton: PropTypes.object,
  }),
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  disabled: {
    backgroundColor: "#7A98FF",
  },
  moveButton: {
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
