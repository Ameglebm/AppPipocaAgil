import { React, useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import IconSuccess from "./svgComponenets/IconSuccess";

const ModalCustom = ({ modalVisible, onClose, message }) => {
  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible, onClose]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <IconSuccess style={styles.iconSuccess} />
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message || "Mensagem padrão"}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 352,
    height: 92,
    borderRadius: 16,
    paddingTop: 48,
    paddingRight: 48,
    paddingBottom: 24,
    paddingLeft: 48,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
    position: "relative",
  },
  modalText: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 20,
    textAlign: "center",
    width: 256,
    height: 20,
  },
  iconSuccess: {
    zIndex: 2,
    position: "absolute",
    bottom: 390,
  },
});
