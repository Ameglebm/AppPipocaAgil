import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import Header from "../components/CustomHeader";
import Dropdown from "../components/DropDown";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";
//import Button from "../components/Button";

export default function registerGlucose() {
  const [glicose, setGlicose] = useState(0);

  return (
    <View style={{ backgroundColor: "#FDFDFD", flex: 1 }}>
      <Header title={"Registrar glicemia"} />
      <View style={{ backgroundColor: "#FDFDFD", padding: 20 }}>
        <Dropdown
          items={[
            {
              label: "Antes do café da manhã",
              value: "Antes do café da manhã",
            },
            {
              label: "Depois do café da manhã",
              value: "Depois do café da manhã",
            },
            { label: "Antes do almoço", value: "Antes do almoço" },
            { label: "Depois do almoço", value: "Depois do almoço" },
            { label: "Antes do jantar", value: "Antes do jantar" },
            { label: "Depois do jantar", value: "Antes de dormir" },
            { label: "Extra", value: "Extra" },
          ]}
          placeholder={"Selecione o tipo"}
          title={"Informe o tipo de glicemia"}
        />

        <CustomInput
          title={"Insira o valor de glicose no sangue"}
          placeholder={"000"}
          value={glicose}
          onChangeText={(value) => setGlicose(value)}
          keyboardType={"numeric"}
        />

        <View style={styles.viewBtns}>
          <TouchableOpacity style={styles.btnCancel}>
            <Text style={styles.btnTextCancel}>Cancelar</Text>
          </TouchableOpacity>

          <ButtonSave style={customButtonStyles} disabled={true} />
        </View>
      </View>
    </View>
  );
}

const customButtonStyles = {
  container: {
    width: 154,
    heigth: 36,
  },
  moveButton: {
    width: 154,
    paddingVertical: 8,
    paddingHorizontal: 42,
  },
};

const styles = StyleSheet.create({
  viewBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnCancel: {
    width: 154,
    heigth: 36,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  btnTextCancel: {
    color: "#898887",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
});
