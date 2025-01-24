// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, ScrollView, Text, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

// Componentes
import AlertModal from "../components/AlertModal";
import ButtonSave from "../components/ButtonSave";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import Dropdown from "../components/DropDown";
import EnableNotifications from "../components/EnableNotifications";
import InputWithPressable from "../components/InputWithPressable";
import ModalCustom from "../components/Modal";

const LabelInputScreen = () => {
  const router = useRouter();
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
      label: "Dosagem por administração",
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
    console.log(`Alterando campo ID ${id} com o valor:`, value);
    setFormData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const [modalVisible, setModalVisible] = useState(false); //Controle de visibilidade do modal

  // Controle do switch de notificação
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(
    initialSwitchState === "true"
  ); // Estado do switch

  // Alterna o estado do switch
  const toggleSwitch = () => setIsSwitchEnabled((prevState) => !prevState);

  // Lógica para captar os dados da tela de configuração de horário
  const {
    frequency,
    doseString,
    isSwitchEnabled: initialSwitchState,
  } = useLocalSearchParams(); //Captar os dados da tela de configuração de horários
  const isConfigured = frequency && doseString; // Verifica se os dados foram configurados

  const handleNavigateToSchedules = () => {
    setNotificationModalVisible(false);
    router.push("./settingsSchedules"); // Certifique-se que essa rota está registrada na stack screen
  };

  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);

  useEffect(() => {
    if (isSwitchEnabled && !isConfigured) {
      setNotificationModalVisible(true); // Abre o modal quando o switch estiver ativo
    } else {
      setNotificationModalVisible(false); // Fecha o modal quando o switch estiver desativado
    }
  }, [isSwitchEnabled, isConfigured]);

  // Função para fechar o modal novo
  const handleNotificationClose = () => {
    setNotificationModalVisible(false);
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

  return (
    <ScrollView style={styles.container}>
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

      <View style={{ alignItems: "center", paddingTop: 32 }}>
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

      <ButtonSave style={customButtonStyle} onPress={handleSave}></ButtonSave>

      <ModalCustom
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={"Registro salvo com sucesso"}
      />

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
    height: 97,
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
