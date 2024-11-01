import React from "react";
import { View, TextInput, Text, StyleSheet, Image } from "react-native";

const EmailInput = ({ value, onChangeText, error, footerMessage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>E-mail*</Text>
      <TextInput
        value={value}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#B1B0AF"
        onChangeText={onChangeText}
        style={[
          styles.input,
          styles.placeholder,
          error ? styles.inputError : null,
        ]}
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
    gap: 8,
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: "Lato_400Regular",
    lineHeight: 21,
    alignSelf: "flex-start",
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
  inputError: {
    borderColor: "#F34141",
    borderWidth: 1,
    elevation: 5,
    shadowColor: "#F7A1A1",
    shadowRadius: 3,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  placeholder: {
    fontFamily: "Lato_400Regular",
  },
  footerMessageContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  footerMessageText: {
    color: "#6E6E6E",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
    textAlign: "center",
  },
});
