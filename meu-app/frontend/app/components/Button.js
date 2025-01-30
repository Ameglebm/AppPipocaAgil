import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function Button({ title, onPress, style }) {
  Button.propTypes = {
    title: PropTypes.string.isRequired, // 'title' é obrigatório e deve ser string
    onPress: PropTypes.func, // 'onPress' é obrigatório e deve ser uma função
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // 'style' é opcional e pode ser um objeto ou um array
  };
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
