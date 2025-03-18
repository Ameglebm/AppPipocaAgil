import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ButtonLogin = ({ labelButton, onpress }) => {
  // Validação de props
  ButtonLogin.propTypes = {
    labelButton: PropTypes.string.isRequired, // 'title' é obrigatório e deve ser string
    onpress: PropTypes.func.isRequired, // 'onPress' é obrigatório e deve ser função
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onpress}>
      <Text style={styles.textBtn}>{labelButton}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F39D3",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    minHeight: 42,
    paddingHorizontal: 80,
    marginTop: 16,
    borderRadius: 8,
  },
  textBtn: {
    color: "#FDFDFD",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 19.8,
  },
});

export default ButtonLogin;
