// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

// Componentes
import CustomHeader from "../components/CustomHeader";
import RadioButtonCustom from "../components/RadioButtonCustom";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";
import ModalCustom from "../components/Modal";

function AddInsulin() {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [dosagem, setDosagem] = useState("");
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
  ]);

  const handleInputChange = (id, value) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value: value.trim() || "" } : item
      )
    );
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginTop: 20, paddingBottom: 5 }}>
        <CustomHeader title={"Adicionar Insulina"} />
      </View>

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

      <View style={{ paddingTop: 12 }}>
        <CustomInput
          title={"Dosagem"}
          placeholder={"Dose"}
          keyboardType={"numeric"}
          value={dosagem}
          onChangeText={setDosagem}
        />
      </View>

      <ButtonSave onPress={handleSave} style={customButtonStyles} />

      {modalVisible && (
        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          message={"Registro salvo com sucesso"}
        />
      )}
    </ScrollView>
  );
}
export default AddInsulin;

const customButtonStyles = {
  container: {
    paddingTop: 50,
  },
  moveButton: {
    height: 42,
  },
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 8,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    gap: 8,
  },
  notificacaoContainer: {
    width: 320,
    gap: 16,
    flexShrink: 1,
  },
  notificacaoTitle: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  textNotificacao: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    lineHeight: 22,
  },
  frequencia: {
    color: "#2F39D3",
    fontSize: 16,
  },
  dados: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#282828",
  },
});
