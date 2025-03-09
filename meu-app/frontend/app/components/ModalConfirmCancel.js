import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import alertSquare from "../assets/images/alert-square.png";
import PropTypes from "prop-types";

const ModalConfirmCancel = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.image}>
            <Image source={alertSquare} />
          </View>

          <Text style={styles.modalText}>
            Tem certeza que deseja cancelar o registro de peso?
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButtonConfirm}
              onPress={onConfirm}
            >
              <Text style={styles.modalButtonText}>Sim, cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={onClose}
            >
              <Text style={styles.modalButtonTextCancel}>Revisar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirmCancel;

ModalConfirmCancel.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    position: "relative", // Define um contexto de posicionamento para `absolute` na imagem
    overflow: "visible", // Evita cortes na imagem
  },
  image: {
    backgroundColor: "#5FA8FF",
    width: 48,
    height: 48,
    padding: 12,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    position: "absolute", // Sai do fluxo normal do layout
    top: "0%", // Alinha dinamicamente no topo do container
    left: "57%", // Centraliza horizontalmente no modal
    transform: [
      { translateX: -24 }, // Movimenta horizontalmente pela metade da largura
      { translateY: -24 }, // Movimenta verticalmente pela metade da altura
    ],
  },
  modalText: {
    width: "80%",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    color: "282828",
    fontStyle: "normal",
    lineHeight: 19.8,
    marginTop: 20, // Adiciona um espaçamento superior para garantir que o texto não sobreponha a imagem
    marginBottom: 16,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  modalButtonConfirm: {
    backgroundColor: "#2F39D3",
    width: 256,
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 42,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#FDFDFD",
    width: 158,
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 42,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 19.8,
  },
  modalButtonTextCancel: {
    color: "#5E5D5C",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    fontStyle: "normal",
    lineHeight: 19.8,
  },
});
