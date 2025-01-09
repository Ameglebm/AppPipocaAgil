import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import CustomHeader from "../components/CustomHeader";
import RadioButtonCustom from "../components/RadioButtonCustom";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";
import ModalCustom from "../components/Modal";

function AddInsulin() {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
      key: "decimalUnits",
    },

    {
      id: 3,
      label: "Meias unidades - Ex.: 0,5.1,0.1,5 UI",
      value: "",
      isRadioButton: true,
      key: "halfUnits",
    },

    {
      id: 4,
      label: "Unidades Inteiras - Ex.: 1,2,3,4,5 UI",
      value: "",
      isRadioButton: true,
      key: "wholeUnits",
    },

    {
      id: 5,
      label: "Dosagem",
      value: "",
      placeholder: "Dose",
      keyboardType: "numeric",
    },
  ]);

  const handleInputChange = (id, value) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value: value.trim() || "" } : item
      )
    );
  };
  /*const handleRadioChange = (key) => {
    setSelectedRadio(key); // Atualiza o estado com o botão selecionado
  };*/

  const handleSave = () => {
    const allTextFieldsFilled = formData
      .filter((item) => !item.isRadioButton) // Apenas campos de texto
      .every((item) => item.value.trim() !== "");

    if (allTextFieldsFilled && selectedRadio) {
      setModalVisible(true); // Exibe o modal de sucesso
    } else {
      Alert.alert(
        "Erro",
        "Preencha os campos obrigatórios e selecione uma opção."
      );
    }
  };

  // Efeito para esconder o modal após 3 segundos
  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <CustomHeader title={"Adicionar Insulina"} />
      {formData.map((item) =>
        item.isRadioButton ? (
          <RadioButtonCustom
            key={item.id}
            title={item.id === 2 ? "Unidades de insulina" : null}
            label={item.label}
            value={item.key} // Valor único para este botão
            selectedValue={selectedRadio} // Valor atualmente selecionado
            onPress={() => setSelectedRadio(item.key)} // Atualiza o estado no pai
          />
        ) : (
          <CustomInput
            key={item.id}
            title={item.label}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={(value) => handleInputChange(item.id, value)}
            keyboardType={item.keyboardType}
          />
        )
      )}
      <ButtonSave onPress={handleSave} />
      {modalVisible && (
        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          message={"Registro salvo com sucesso"}
        />
      )}
    </View>
  );
}

export default AddInsulin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 12,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
    justifyContent: "center",
  },
});
