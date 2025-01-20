import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather"; // Biblioteca de ícones do Expo
import PropTypes from "prop-types";

const PasswordInput = ({ onChangeText, value, placeholder }) => {
  PasswordInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    placeholder: PropTypes.string.isRequired,
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible} // Controla a visibilidade da senha
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <Feather
          name={isPasswordVisible ? "eye-off" : "eye"}
          size={24}
          color="#B1B0AF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B1B0AF", // Cor da borda
    backgroundColor: "#FDFDFD",
    borderRadius: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    height: 44,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default PasswordInput;
