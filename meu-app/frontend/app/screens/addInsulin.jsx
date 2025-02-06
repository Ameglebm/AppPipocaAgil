// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { pushInsulin, updateInsulinField } from "../reducers/insulinActions";
// Componentes
import CustomHeader from "../components/CustomHeader";
import RadioButtonCustom from "../components/RadioButtonCustom";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";
import ModalCustom from "../components/Modal";

function AddInsulin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.insulin.formData) || [];
  const [selectedRadio, setSelectedRadio] = useState(""); // Estado para o valor selecionado do rádio
  const [dosagem, setDosagem] = useState(""); // Estado para a dosagem
  const [modalVisible, setModalVisible] = useState(false);
  const handleInputChange = (id, value) => {
    dispatch(updateInsulinField(id, value));
  };

  const handleSave = () => {
    const allFieldsFilled = formData.every((item) => {
      // Verifique se o campo é um radio button ou um input normal
      if (item.isRadioButton) {
        // Verifique se o radio button foi selecionado
        const isRadioSelected = selectedRadio.trim() !== "";
        if (!isRadioSelected) {
          console.log(`Campo de seleção não preenchido: ${item.label}`);
        }
        return isRadioSelected;
      } else {
        // Para os campos de texto, verifica se o valor não está vazio
        const isFieldFilled = item.value.trim() !== "";
        if (!isFieldFilled) {
          console.log(`Campo não preenchido: ${item.label}`);
        }
        return isFieldFilled;
      }
    });

    if (allFieldsFilled && dosagem.trim() !== "") {
      const cleanedData = formData.map((item) => ({
        id: item.id,
        label: item.label,
        value: item.value.trim(),
      }));

      dispatch(pushInsulin(cleanedData));

      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        router.replace("screens/infoDiabetes"); // Redireciona para MedicamentoItem
      }, 1500);

      console.log(cleanedData);
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }

    console.log("Todos os campos preenchidos:", allFieldsFilled);
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
            onPress={() => {
              setSelectedRadio(item.key); // Atualiza o estado no pai
              console.log("Valor selecionado:", item.key); // Depuração
            }}
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
