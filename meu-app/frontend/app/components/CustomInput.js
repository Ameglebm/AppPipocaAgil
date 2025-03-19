import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const CustomInput = ({
  placeholder,
  style,
  keyboardType,
  title,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, style]}>{title}</Text>
      </View>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#B1B0AF"
        style={[
          styles.input,
          styles.placeholder,
          style,
          isFocused && styles.inputFocused,
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
      ></TextInput>
    </View>
  );
};
export default CustomInput;

CustomInput.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  onChangeText: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keyboardType: PropTypes.oneOf([
    "default",
    "email-address",
    "numeric",
    "phone-pad",
    "number-pad",
    "decimal-pad",
    "visible-password",
    "ascii-capable",
    "twitter",
    "url",
    "web-search",
    "string",
  ]),
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 320,
    gap: 8,
  },
  labelContainer: {
    alignSelf: "flex-start",
    gap: 8,
  },
  label: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    height: 21,
  },
  input: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: "#FDFDFD",
    width: "100%",
    height: 44,
    fontFamily: "Urbanist_700Bold",
    lineHeight: 22,
    color: "#373737",
  },
  placeholder: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    lineHeight: 22,
  },
  inputFocused: {
    borderColor: "#5FA8FF",
    borderWidth: 2,
    shadowColor: "#B4D2F8", // Cor da sombra
    shadowOffset: { width: 0, height: 0 }, // Sem deslocamento
    shadowOpacity: 1, // Totalmente opaco
    shadowRadius: 3, // Tamanho da difusão
    elevation: 4, // Adicionado para compatibilidade com Android
  },
});
