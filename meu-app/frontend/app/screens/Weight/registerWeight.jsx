// Bibliotecas Externas
import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";

// Componentes
import Header from "../../components/CustomHeader";
import Input from "../../components/CustomInput";
import ButtonSave from "../../components/buttons/ButtonSave";
import ButtonCancel from "../../components/buttons/ButtonCancel";
import CancelModal from "../../components/modals/ModalConfirmCancel";
import SuccessModal from "../../components/modals/Modal";
import ConfirmSaveModal from "../../components/modals/ConfirmationModal";

// Redux
import { useDispatch } from "react-redux";
import { addWeightRecord } from "../../reducers/weightActions";

export default function registerWeight() {
  const router = useRouter();
  const [peso, setPeso] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

  const dispatch = useDispatch();

  // Função para verificar se o botão deve estar desabilitado
  useEffect(() => {
    if (peso) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [peso]);

  useEffect(() => {
    if (modalSuccessVisible) {
      const timer = setTimeout(() => {
        setModalSuccessVisible(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [modalSuccessVisible]);

  const handleCancelPress = () => {
    // Implementar a lógica para cancelar o registro
    setModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setPeso(0);
    setModalVisible(false); // Fecha o modal após confirmar
    router.back();
  };

  const handleSave = () => {
    if (peso != 0) {
      setModalConfirmVisible(true);
    }
  };

  const handleConfirmSave = () => {
    dispatch(addWeightRecord(peso)); // Adiciona o peso ao estado global

    setModalConfirmVisible(false);
    setModalSuccessVisible(true);

    setTimeout(() => {
      router.back(); // Navega de volta após 1.5s
    }, 1500);
  };

  const handleCancelSave = () => {
    setModalConfirmVisible(false); // Fecha o modal de confirmação sem salvar
  };
  return (
    <View
      style={{
        backgroundColor: "#FDFDFD",
        flex: 1,
        alignItems: "center",
        paddingTop: 45,
      }}
    >
      <Header title={"Registrar Peso"} />
      <Input
        title={"Digite seu peso"}
        placeholder={"000 kg"}
        value={peso}
        onChangeText={(value) => setPeso(value)}
        keyboardType={"numeric"}
      />

      <View style={styles.viewBtns}>
        <ButtonCancel onPress={handleCancelPress} />

        <ButtonSave
          style={customButtonStyles}
          disabled={isDisabled}
          onPress={handleSave}
        />
      </View>

      {/*Modais*/}

      <CancelModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmCancel}
      />

      <ConfirmSaveModal
        visible={modalConfirmVisible}
        onClose={() => setModalConfirmVisible(false)}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave} // Fecha o modal se o usuário cancelar
        title={`${peso} kg`}
        message="Deseja salvar registro de peso?"
        buttonText={"Editar"}
        style={customModalStyles}
      />

      <SuccessModal
        modalVisible={modalSuccessVisible}
        onClose={() => setModalSuccessVisible(false)}
        message={"Registro salvo com sucesso"}
      />
    </View>
  );
}

// Sobrescrição de estilos
const customButtonStyles = {
  container: {
    width: 154,
    heigth: 36,
    paddingLeft: 5,
  },
  moveButton: {
    width: 154,
    paddingVertical: 8,
    paddingHorizontal: 42,
  },
};

const customModalStyles = {
  centeredView: {},
  modalView: {
    width: 352,
    height: 210,
    marginTop: 20,
  },
};

const styles = StyleSheet.create({
  viewBtns: {
    flexDirection: "row",
  },
});
