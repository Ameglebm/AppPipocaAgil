// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { pushInsulin, updateInsulinField } from "../reducers/insulinActions";
// Componentes
import CustomHeader from "../components/CustomHeader";
import RadioButtonCustom from "../components/buttons/RadioButtonCustom";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/buttons/ButtonSave";
import ModalCustom from "../components/modals/Modal";

function AddInsulin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const params = useLocalSearchParams();
  const isEditing = params.isEditing || false;

  const options = [
    {
      id: 1,
      label: "Décimos da unidade - Ex.: 0,1.0,2 UI",
      key: "decimalUnits",
    },

    {
      id: 2,
      label: "Meias unidades - Ex.: 0,5.1,0.1,5 UI",
      key: "halfUnits",
    },

    {
      id: 3,
      label: "Unidades Inteiras - Ex.: 1,2,3,4,5 UI",
      key: "wholeUnits",
    },
  ];

  // Inicializa os estados com os valores recebidos (se estiver editando) ou vazios (se for nova insulina)
  const [selectedRadio, setSelectedRadio] = useState(
    params.unity || "decimalUnits"
  );
  const [dosage, setDosage] = useState(params.dosage || "");
  const [nameInsulin, setNameInsulin] = useState(params.name || "");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = () => {
    const insulinaData = {
      name: nameInsulin,
      unity: selectedRadio,
      dosage: dosage,
    };

    if (isEditing) {
      dispatch(updateInsulinField(params.id, insulinaData, userId));
    } else {
      dispatch(pushInsulin(insulinaData, userId));
    }

    console.log("Insulina salva:", insulinaData);

    // Exibe o modal
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      router.back(); // Retorna para a tela anterior
    }, 1500);
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

      <CustomInput
        title={"Nome da insulina"}
        placeholder={"Insira o nome"}
        value={nameInsulin}
        onChangeText={(value) => setNameInsulin(value)}
        keyboardType={"string"}
      />

      {options.map((item) => (
        <RadioButtonCustom
          title={item.id === 1 ? "Unidades de insulina" : null}
          key={item.id}
          label={item.label}
          value={item.key} // Valor único para este botão
          selectedValue={selectedRadio} // Valor atualmente selecionado
          onPress={() => {
            setSelectedRadio(item.key); // Atualiza o estado no pai
            console.log("Valor selecionado:", item.key); // Depuração
          }}
        />
      ))}

      <View style={{ paddingTop: 12 }}>
        <CustomInput
          title={"Dosagem"}
          placeholder={"Dose"}
          keyboardType={"numeric"}
          value={dosage}
          onChangeText={setDosage}
        />
      </View>

      <ButtonSave
        onPress={handleSave}
        style={customButtonStyles}
        ddisabled={!nameInsulin || !dosage}
      />

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
