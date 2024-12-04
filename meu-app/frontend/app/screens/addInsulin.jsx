import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "../components/CustomHeader";
import RadioButtonCustom from "../components/RadioButtonCustom";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";

function addInsulin() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [formData, setFormData] = useState([
    {
      id: 1,
      label: "Nome da Insulina",
      value: "",
      placeholder: "Insira o nome",
    },
    {
      id: 2,
      label: "Décimos da unidade - Ex.: 0,1.0,2 UI",
      value: "",
      isRadioButton: true,
    },
    {
      id: 3,
      label: "Meias unidades - Ex.: 0,5.1,0.1,5 UI",
      value: "",
      isRadioButton: true,
    },
    {
      id: 4,
      label: "Unidades Inteiras - Ex.: 1,2,3,4,5 UI",
      value: "",
      isRadioButton: true,
    },
    {
      id: 5,
      label: "Dosagem",
      value: "",
      placeholder: "Dose",
    },
  ]);
  return (
    <View style={styles.container}>
      <CustomHeader title={"Adicionar Insulina"} />
      <CustomInput title="Nome da Insulina" placeholder="Insira o nome" />
      {formData
        .filter((item) => item.isRadioButton)
        .map((item, index) => (
          <RadioButtonCustom
            key={item.id}
            title={index === 0 ? "Unidades de insulina" : null}
            label={item.label}
            value={selectedValue}
            setValue={setSelectedValue}
          />
        ))}
      <CustomInput title="Dosagem" placeholder="Dose" />
      <ButtonSave />
    </View>
  );
}

export default addInsulin;

const styles = StyleSheet.create({
  container: {
    width: 360,
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    gap: 12,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
    justifyContent: "center",
  },
});
