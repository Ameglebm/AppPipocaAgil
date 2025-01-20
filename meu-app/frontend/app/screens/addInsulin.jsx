import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, Text, ScrollView } from "react-native";
import CustomHeader from "../components/CustomHeader";
import RadioButtonCustom from "../components/RadioButtonCustom";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";
import ModalCustom from "../components/Modal";
import AlertModal from "../components/AlertModal";
import EnableNotifications from "../components/EnableNotifications";
import { useRouter } from "expo-router";

function AddInsulin() {
  const router = useRouter();
  const [selectedRadio, setSelectedRadio] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [frequencia, setFrequencia] = useState(null);
  const [dose, setDose] = useState(null);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false); // Estado do switch
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
  useEffect(() => {
    // Simulando recebimento dos dados
    setTimeout(() => {
      setFrequencia("seg, qua, sex");
      setDose("11:00"); // Dados recebidos
    }, 3000); // Simulação de 3 segundos
  }, []);
  useEffect(() => {
    if (isSwitchEnabled) {
      setNotificationModalVisible(true); // Abre o modal quando o switch estiver ativo
    } else {
      setNotificationModalVisible(false); // Fecha o modal quando o switch estiver desativado
    }
  }, [isSwitchEnabled]);
  // Alterna o estado do switch
  const toggleSwitch = () => setIsSwitchEnabled((prevState) => !prevState);

  // Função para fechar o modal novo
  const handleNotificationClose = () => {
    setNotificationModalVisible(false);
  };

  const handleNavigateToSchedules = () => {
    setNotificationModalVisible(false);
    router.push("./settingsSchedules"); // Certifique-se que essa rota está registrada no Stack Navigator.
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginTop: 35 }}>
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

      <EnableNotifications
        value={isSwitchEnabled}
        onValueChange={toggleSwitch}
      ></EnableNotifications>

      <View style={styles.notificacaoContainer}>
        <Text style={styles.notificacaoTitle}>Notificações configuradas</Text>
        <Text style={styles.textNotificacao}>
          <Text style={styles.frequencia}>Frequência </Text>{" "}
          {frequencia ? (
            <Text style={styles.dados}>{frequencia}</Text>
          ) : (
            <Text style={styles.dados}>Carregando...</Text>
          )}
        </Text>
        <Text style={styles.textNotificacao}>
          <Text style={styles.frequencia}>1º Dose </Text>{" "}
          {dose ? (
            <Text style={styles.dados}>{dose}</Text>
          ) : (
            <Text style={styles.dados}>Carregando...</Text>
          )}
        </Text>
      </View>

      <ButtonSave onPress={handleSave} />
      {modalVisible && (
        <ModalCustom
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          message={"Registro salvo com sucesso"}
        />
      )}

      {notificationModalVisible && (
        <AlertModal
          visible={notificationModalVisible}
          onClose={handleNotificationClose}
          buttons={[
            {
              label: "Configurar agora",
              onPress: handleNavigateToSchedules, // Navegar para a tela de configurações
            },
            {
              label: "Depois",
              onPress: handleNotificationClose, // Fechar modal
            },
          ]}
        />
      )}
    </ScrollView>
  );
}
export default AddInsulin;

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
    gap: 16,
  },
  notificacaoContainer: {
    width: 320,
    height: 97,
    gap: 16,
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
  },
  dados: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#282828",
  },
});
