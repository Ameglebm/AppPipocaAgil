import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import InfoOctagon from "./svgComponenets/InfoOctagon";

const RadioButtonCustom = ({ title, label, value, selectedValue, onPress }) => {
  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.header}>
          <InfoOctagon />
          <Text style={styles.textHeader}>{title}</Text>
        </View>
      )}
      <View style={styles.radioContainer}>
        <Text style={styles.optionText}>{label}</Text>
        <RadioButton
          value={value} // Define o valor único para este botão
          status={selectedValue === value ? "checked" : "unchecked"} // Verifica se o botão deve estar marcado
          onPress={onPress} // Função para alterar o valor selecionado
        />
      </View>
    </View>
  );
};

export default RadioButtonCustom;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: 288,
    height: 32,
    flexDirection: "row",
    paddingBottom: 12,
    gap: 10,
    marginTop: 35,
  },
  textHeader: {
    fontFamily: "Urbanist_400Regular",
    fontSize: 16,
    lineHeight: 18,
    color: "#0F0F0F",
  },
  radioContainer: {
    flexDirection: "row",
    width: 288,
    height: 54,
    borderTopWidth: 1,
    gap: 8,
    borderColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "#0F0F0F",
  },
});
