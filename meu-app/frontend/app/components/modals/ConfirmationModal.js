import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AlertTriangle from "../SvgComponents/AlertTriangle";
import PropTypes from "prop-types";

const ConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  style,
  buttonText,
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
          <View style={[styles.iconContainer, style?.iconContainer]}>
            <View style={[styles.warningIcon, style?.warningIcon]}>
              <AlertTriangle style={[styles.warningText, style?.warningIcon]} />
            </View>
          </View>

          <View style={{ top: -24 }}>
            <Text style={[styles.modalTitle, style?.modalTitle]}>{title}</Text>
            <Text style={[styles.modalText, style?.modalText]}>{message}</Text>
          </View>

          <TouchableOpacity
            style={[styles.confirmButton, style?.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={[styles.confirmText, style?.confirmText]}>
              Confirmar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cancelButton, style?.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.cancelText, style?.cancelText]}>
              {buttonText || "Cancelar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.any.isRequired,
  message: PropTypes.string,
  style: PropTypes.object,
  buttonText: PropTypes.string,
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
    top: -24,
  },
  warningIcon: {
    backgroundColor: "#F5A623",
    width: 48,
    height: 48,
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
    paddingBottom: 8,
    color: "#282828",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    color: "#282828",
    minHeight: 20,
    marginBottom: -8,
  },
  confirmButton: {
    backgroundColor: "#2F39D3",
    paddingVertical: 5,
    paddingHorizontal: 42,
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
  },
  cancelText: {
    color: "#5E5D5C",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ConfirmationModal;
