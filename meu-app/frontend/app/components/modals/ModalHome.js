import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const ModalHome = ({ modalVisible, onClose, onContinue }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title} numberOfLines={1}>Personalize seu monitoramento</Text>
          <Text style={styles.description}>{
            `Para acompanhar melhor sua saúde,\nprecisamos de algumas informações sobre seu\ndiabetes. Isso ajudará a tornar seu\nmonitoramento mais preciso.`
            }
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.skipButton}>
              <Text style={styles.skipText}>Pular</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onContinue} style={styles.continueButton}>
              <Text style={styles.continueText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalHome;

ModalHome.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContainer: {
    fontFamily: "Urbanist_700Bold",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", 
  },
  modalContent: {
    width: 355,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#F6F6F6", 
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  title: {
    fontSize: 21,
    fontFamily: "Urbanist_700Bold",
    fontWeight: "700",
    color: "#0F0F0F",
    marginBottom: 10,
  },
  description: {
    alignItems: 'flex-start',
    fontSize: 14,
    textAlign: "left",
    color: "#7D7D7D", 
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  skipButton: {
    fontFamily: "Urbanist_600SemiBold",
    color: "#B0B0B0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
  },
  skipText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5E5D5C",
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2F39D3",
    borderRadius: 10,
    shadowColor: "#2F39D3",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,

  },
  continueText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
