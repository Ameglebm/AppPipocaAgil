import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Biblioteca de ícones do Expo
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
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible} // Controla a visibilidade da senha
          onChangeText={onChangeText}
          value={value}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <MaterialIcons
            name={isPasswordVisible ? "visibility-off" : "visibility"}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: "#b7b7b8",
    backgroundColor: "#FDFDFD",
    borderRadius: 6,
  },
  textInput: {
    fontSize: 16,
  },
});

export default PasswordInput;
