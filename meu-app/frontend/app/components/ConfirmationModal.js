import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AlertTriangle from "./SvgComponents/AlertTriangle";

const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  style,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView, style?.centeredView]}>
        <View style={[styles.modalView, style?.modalView]}>
          <View style={styles.iconContainer}>
            <View style={styles.warningIcon}>
              <AlertTriangle style={styles.warningText} />
            </View>
          </View>

          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>

          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#FDFDFD",
    borderRadius: 16,
    paddingHorizontal: 24,
    width: 352,
    height: 230,
    alignItems: "center",
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  warningIcon: {
    backgroundColor: "#F5A623",
    width: 48,
    height: 48,
    top: -24,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  warningText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalTitle: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    paddingHorizontal: 24,
    top: -30,
    color: "#282828",
    marginBottom: 8,
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    top: -24,
    color: "#282828",
    marginBottom: 24,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#2F39D3",
    paddingVertical: 5,
    paddingHorizontal: 42,
    top: -24,
    borderRadius: 8,
    width: 256,
    height: 36,
    marginBottom: 8,
  },
  confirmText: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    textAlign: "center",
  },
  cancelButton: {
    paddingVertical: 8,
    top: -24,
  },
  cancelText: {
    color: "#5E5D5C",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ConfirmationModal;
