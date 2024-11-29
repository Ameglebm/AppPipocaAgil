import React from "react";
import { View, TextInput, Text, StyleSheet, Image } from "react-native";

const CustomInput = ({ placeholder, style, keyboardType, title }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, style]}>{title}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#B1B0AF"
        style={[styles.input, styles.placeholder, style]}
        keyboardType={keyboardType}
      ></TextInput>
    </View>
  );
};
export default CustomInput;
const styles = StyleSheet.create({
  inputContainer: {
    width: 320,
    gap: 8,
  },
  labelContainer: {
    alignSelf: "flex-start",
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
    elevation: 5,
    backgroundColor: "#FDFDFD",
    width: "100%",
    height: 44,
    fontFamily: "Urbanist_700Bold",
    lineHeight: 22,
    color: "#373737",
  },
  placeholder: {
    fontFamily: "Lato_400Regular",
  },
});
