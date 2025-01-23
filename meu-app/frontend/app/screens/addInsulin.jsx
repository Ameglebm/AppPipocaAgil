// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

// Estilos
import styles from "../assets/styles/addInsulin";

// Componentes
import CustomHeader from "../components/CustomHeader";
import RadioButtonCustom from "../components/RadioButtonCustom";
import CustomInput from "../components/CustomInput";
import ButtonSave from "../components/ButtonSave";
import ModalCustom from "../components/Modal";
import AlertModal from "../components/AlertModal";
import EnableNotifications from "../components/EnableNotifications";

function AddInsulin() {
  const router = useRouter();

  const {
    frequency,
    doseString,
    isSwitchEnabled: initialSwitchState,
  } = useLocalSearchParams(); //Captar os dados da tela de configuração de horários
  const isConfigured = frequency && doseString; // Verifica se os dados foram configurados

  const [selectedRadio, setSelectedRadio] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(
    initialSwitchState === "true"
  ); // Estado do switch

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
    if (isSwitchEnabled && !isConfigured) {
      setNotificationModalVisible(true); // Abre o modal quando o switch estiver ativo
    } else {
      setNotificationModalVisible(false); // Fecha o modal quando o switch estiver desativado
    }
  }, [isSwitchEnabled, isConfigured]);

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

      <View style={{ paddingTop: 28 }}>
        <EnableNotifications
          value={isSwitchEnabled}
          onValueChange={toggleSwitch}
        />
      </View>

      {/* Verifica se os dados estão configurados para mostrar as notificações */}
      {isConfigured && (
        <View style={styles.notificacaoContainer}>
          <Text style={styles.notificacaoTitle}>Notificações configuradas</Text>

          {/* Frequência dos dias */}
          <Text style={styles.textNotificacao}>
            <Text style={styles.frequencia}>Frequência: </Text>
            {frequency || "Carregando..."}
          </Text>

          {/* Exibe as doses e horários de forma separada */}
          {doseString
            ? doseString.split(", ").map((dose, index) => (
                <Text key={index} style={styles.textNotificacao}>
                  <Text
                    style={styles.frequencia}
                  >{`${index + 1}ª Dose: `}</Text>
                  {dose || "Carregando..."}
                </Text>
              ))
            : null}
        </View>
      )}

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
