import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Dropdown from "../components/DropDown";
import CustomInput from "../components/CustomInput";
import InputWithPressable from "../components/InputWithPressable";
import ButtonSave from "../components/ButtonSave";
import ModalCustom from "../components/Modal";
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
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (id, value) => {
    console.log(`Alterando campo ID ${id} com o valor:`, value);
    setFormData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleSave = () => {
    console.log("Form Data", formData);

    const allFieldsFilled = formData.every((item) => {
      if (item.isInputWithPressable) {
        return item.value && item.value !== "";
      } else if (Array.isArray(item.placeholder)) {
        return item.value && item.value !== "";
      } else {
        return item.value && item.value !== "";
      }
    });

    console.log("All Fields Filled:", allFieldsFilled);

    if (allFieldsFilled) {
      setModalVisible(true);
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };
  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);
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
              onValueChange={(selectedValue) => {
                handleInputChange(item.id, selectedValue);
              }}
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
      <ButtonSave
        labelButton={"Salvar"}
        style={customButtonStyle}
        onPress={handleSave}
      ></ButtonSave>
      <ModalCustom
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={"Registro salvo com sucesso"}
      />
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
