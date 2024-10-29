import React from "react";
import { View, TextInput, Text, StyleSheet, Image } from "react-native";

const EmailInput = ({ value, onChangeText, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>E-mail*</Text>
      <TextInput
        value={value}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#B1B0AF"
        onChangeText={onChangeText}
        style={[styles.input, error ? styles.inputError : null]}
      />
      {error ? (
        <View style={styles.errorContainer}>
          <Image
            source={require("../assets/images/warning-circle.png")} // Atualize o caminho conforme necessário
            style={styles.warningIcon}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default EmailInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    width: 320,
  },
  label: {
    fontSize: 14,
    fontFamily: "Lato_400Regular",
    lineHeight: 21,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "rgba(177, 176, 175, 0.16)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
    height: 44,
    fontFamily: "Urbanist_700Bold",
    lineHeight: 22,
  },
  inputError: {
    borderColor: "red",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  warningIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
  },
  errorText: {
    color: "#F34141",
    fontSize: 14,
    fontFamily: "Lato_400Regular",
  },
});
