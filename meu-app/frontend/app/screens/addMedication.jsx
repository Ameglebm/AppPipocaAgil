import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Dropdown from "../components/DropDown";
import CustomInput from "../components/CustomInput";
import InputWithPressable from "../components/InputWithPressable";
import ButtonSave from "../components/ButtonSave";
const LabelInputScreen = () => {
  const [formData, setFormData] = useState([
    {
      id: 1,
      label: "Nome do medicamento",
      value: "",
      placeholder: "Insira o nome",
    },
    {
      id: 2,
      label: "Para qual tratamento?",
      value: "",
      placeholder: "Selecione o tratamento",
    },
    {
      id: 3,
      label: "Dosagem",
      value: "",
      placeholder: "Dose",
      keyboardType: "numeric",
    },
    {
      id: 4,
      value: "",
      placeholder: ["mL", "IU", "%", "mcg", "mg", "g"],
      isInputWithPressable: true,
    },
    {
      id: 5,
      label: "Quantidade de doses restantes",
      value: "",
      placeholder: "Dose",
      keyboardType: "numeric",
    },
  ]);

  const handleInputChange = (id, value) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value: value } : item
      )
    );
  };
  const customButtonStyle = {
    paddingTop: 8,
    paddingBottom: 8,
  };
  return (
    <View style={styles.container}>
      <CustomHeader title={"Adicionar medicação"} />
      {formData.map((item) => (
        <View style={[styles.infoContainer]} key={item.id}>
          {item.isInputWithPressable ? (
            <InputWithPressable
              textLabel="Unidade"
              placeholder={item.placeholder}
              value={item.value}
              onPress={(selectedValue) =>
                handleInputChange(item.id, selectedValue)
              }
            />
          ) : item.label === "Para qual tratamento?" ? (
            <Dropdown
              items={[
                { label: "Pressão arterial", value: "Pressão arterial" },
                { label: "Diabetes", value: "Diabetes" },
                { label: "Colesterol", value: "Colesterol" },
                { label: "Obesidade", value: "Obesidade" },
                { label: "Doenças hepáticas", value: "Doenças hepáticas" },
                {
                  label: "Doenças renal crônica",
                  value: "Doenças renal crônica",
                },
                { label: "Doenças autoimunes", value: "Doenças autoimunes" },
                { label: "Infecções", value: "Infecções" },
              ]}
              placeholder={item.placeholder}
              value={item.value}
              onChangeItem={(value) => handleInputChange(item.id, value)}
              title={item.label}
            />
          ) : (
            <CustomInput
              title={item.label}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={(value) => handleInputChange(item.id, value)}
              keyboardType={item.keyboardType}
            />
          )}
        </View>
      ))}
      <ButtonSave labelButton={"Salvar"} style={customButtonStyle}></ButtonSave>
    </View>
  );
};

export default LabelInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
    flexDirection: "column",
    paddingRight: 20,
    paddingBottom: 32,
    paddingLeft: 20,
    gap: 16,
  },
  infoContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
