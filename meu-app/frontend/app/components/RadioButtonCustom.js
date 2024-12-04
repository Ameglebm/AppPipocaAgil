import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import InfoOcatagon from "./svgComponenets/InfoOctagon";

const RadioButtonCustom = ({ title, style, label }) => {
  const [value, setValue] = useState(null);
  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.header}>
          <InfoOcatagon />
          <Text style={styles.textHeader}>{title}</Text>
        </View>
      )}
      <View style={styles.radioContainer}>
        <Text style={styles.optionText}>
          {label || "Décimos da unidade - Ex.: 0,1.0,2 UI"}
        </Text>
        <RadioButton
          value={label} // Usa o label como o valor único
          status={value === label ? "checked" : "unchecked"} // Verifica se o valor corresponde ao selecionado
          onPress={() => setValue(label)} // Atualiza o estado com o valor do label
        />
      </View>
    </View>
  );
};

export default RadioButtonCustom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  header: {
    width: 288,
    height: 32,
    flexDirection: "row",
    paddingBottom: 12,
    gap: 10,
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
