// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  pushMedication,
  updateMedicationField,
} from "../reducers/medicationActions";

// Componentes
import ButtonSave from "../components/ButtonSave";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import Dropdown from "../components/DropDown";
import InputWithPressable from "../components/InputWithPressable";
import ModalCustom from "../components/Modal";

const LabelInputScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.medication.formData) || [];

  const handleInputChange = (id, value) => {
    dispatch(updateMedicationField(id, value));
  };

  const [modalVisible, setModalVisible] = useState(false); //Controle de visibilidade do modal

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  const handleSave = () => {
    const allFieldsFilled = formData.every((item) => item.value !== "");

    if (allFieldsFilled) {
      const cleanedData = formData.map((item) => ({
        id: item.id,
        label: item.label,
        value: item.value,
      }));

      dispatch(pushMedication(cleanedData));

      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        router.back(); // Redireciona para MedicamentoItem
      }, 1500);

      console.log(cleanedData);
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={{ marginTop: 35, paddingBottom: 12 }}>
        <CustomHeader title={"Adicionar medicação"} />
      </View>

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

      <ButtonSave style={customButtonStyle} onPress={handleSave} />

      <ModalCustom
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={"Registro salvo com sucesso"}
      />
    </ScrollView>
  );
};

export default LabelInputScreen;

const customButtonStyle = {
  container: {
    paddingBottom: 16,
  },
  moveButton: {
    height: 42,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },
  infoContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  notificacaoContainer: {
    paddingLeft: 20,
    width: 320,
    flexShrink: 1,
    paddingTop: 16,
    gap: 16,
  },
  notificacaoTitle: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  textNotificacao: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
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
