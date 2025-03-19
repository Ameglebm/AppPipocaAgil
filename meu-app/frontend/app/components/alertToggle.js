import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

import xCloseImage from "../assets/images/icons/x-close.png";
import infoOctagonImage from "../assets/images/icons/info-octagon.png";

const AlertToggle = () => {
  const [alertEnabled, setAlertEnabled] = useState(false);
  const position = new Animated.Value(0); // Definindo position como uma Animated.Value
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal

  // Efeito para ativar/desativar as notificações e iniciar a animação
  useEffect(() => {
    if (alertEnabled) {
      console.log("Alertas ativados");
      // Adicione integração com API ou lógica adicional aqui
    } else {
      console.log("Alertas desativados");
    }
    Animated.spring(position, {
      toValue: alertEnabled ? 22 : 0, // Mover o "thumb" para a posição correta
      useNativeDriver: false, // Não usa o driver nativo
    }).start();
  }, [alertEnabled]); // A animação será chamada sempre que alertEnabled mudar

  // Função para alternar o estado do switch
  const toggleSwitch = () => {
    setAlertEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.alertContainer}>
      {/* Modal personalizado */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Image source={xCloseImage} style={styles.modalCloseButtonText} />
            </Pressable>
            <Text style={styles.modalTitle}>Lembretes</Text>
            <Text style={styles.modalsubTitle}>Configure seus lembretes</Text>
            <Text style={styles.modalDescription}>
              O app enviará notificações sempre que seus níveis de glicemia
              estiverem próximos de sair das metas, permitindo que você tome
              ações preventivas a tempo.{"\n"}
              Caso os valores ultrapassem as metas, o app indicará ajustes
              imediatos, como agendar uma consulta médica ou revisar seu
              tratamento, ajudando você a manter um controle mais eficaz da
              glicemia e a evitar complicações.
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.alertView}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={infoOctagonImage} style={styles.alertImage} />
        </TouchableOpacity>

        <Text style={styles.alertText}>Ativar notificações</Text>
      </View>

      <TouchableOpacity style={styles.switchContainer} onPress={toggleSwitch}>
        <View
          style={[
            styles.track,
            { backgroundColor: alertEnabled ? "#FDFDFD" : "#FDFDFD" },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: position }] }, // Usando o Animated.Value para mover o thumb
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AlertToggle;

const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 352,
    height: 64,
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#EDF3FF",
    borderRadius: 16,
  },
  alertView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    color: "#282828",
    fontFamily: "Urbanist_400Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 17.6,
  },
  alertImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  switchContainer: {
    width: 52,
    height: 32,
    padding: 8,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#7A98FF",
    justifyContent: "center",
    alignItems: "center",
  },
  track: {
    width: 48,
    height: 28,
    borderRadius: 100,
    justifyContent: "center",
  },
  thumb: {
    width: 16,
    height: 16,
    marginLeft: 5,
    backgroundColor: "#7A98FF",
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 360,
    height: 366,
    paddingTop: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    color: "#282828",
    fontSize: 28,
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    lineHeight: 30.8,
    paddingBottom: 16,
  },
  modalsubTitle: {
    color: "#282828",
    fontSize: 16,
    fontFamily: "Lato_700Bold",
    fontStyle: "normal",
    lineHeight: 22,
    marginBottom: 10,
    paddingBottom: 8,
  },
  modalDescription: {
    color: "#282828",
    fontSize: 14,
    fontFamily: "Lato_400Regular",
    fontStyle: "normal",
    lineHeight: 21,
  },
  modalCloseButton: {
    borderRadius: 8,
    paddingBottom: 16,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
