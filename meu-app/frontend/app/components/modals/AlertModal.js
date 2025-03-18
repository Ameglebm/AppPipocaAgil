import { React, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IconSuccess from "../SvgComponents/IconSuccess";
import PropTypes from "prop-types";

const AlertModal = ({ modalVisible, onClose, message, buttons = [] }) => {
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
        <View style={styles.modalContent}>
          <IconSuccess style={styles.iconSuccess} />
          <Text style={styles.modalText}>
            {message ||
              "Deseja configurar os horários de administração de insulina agora?"}
          </Text>
          <Text style={styles.textAlert}>
            {message ||
              "Assim, você será notificado no momento certo e manterá seu tratamento em dia."}
          </Text>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                button.style,
                button.label === "Depois" && styles.afterBtn,
              ]}
              onPress={button.onPress}
            >
              <Text
                style={[
                  styles.buttonText,
                  button.textStyle,
                  button.label === "Depois" && styles.afterBtnText,
                ]}
              >
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

AlertModal.propTypes = {
  modalVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      style: PropTypes.object,
      textStyle: PropTypes.object,
    })
  ),
};

export default AlertModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 352,
    height: 294,
    borderRadius: 16,
    paddingTop: 40,
    paddingRight: 48,
    paddingBottom: 24,
    paddingLeft: 48,
    gap: 8,
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
    height: 60,
  },
  textAlert: {
    width: 256,
    height: 66,
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    color: "#282828",
  },
  iconSuccess: {
    zIndex: 2,
    position: "absolute",
    top: -24,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 42,
    borderRadius: 8,
    backgroundColor: "#2F39D3",
    width: 256,
    height: 36,
  },
  buttonText: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#FDFDFD",
    lineHeight: 19.8,
  },
  afterBtn: {
    backgroundColor: "#FDFDFD",
  },
  afterBtnText: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 19.8,
    color: "#5E5D5C",
  },
});
