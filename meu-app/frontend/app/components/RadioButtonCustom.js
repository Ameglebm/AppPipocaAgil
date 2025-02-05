import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { RadioButton } from "react-native-paper";
import InfoOctagon from "./SvgComponents/InfoOctagon";
import PropTypes from "prop-types";

const RadioButtonCustom = ({ title, label, value, selectedValue, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal

  return (
    <View style={styles.container}>
      {/* Modal personalizado */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Selecione o Formato de Unidades de Insulina.
            </Text>
            <Text style={styles.modalDescription}>
              Escolha entre décimos para ajustes finos, meias unidades para
              valores intermediários ou unidades inteiras para números exatos,
              conforme sua necessidade.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
      {title && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <InfoOctagon />
          </TouchableOpacity>
          <Text style={styles.textHeader}>{title}</Text>
        </View>
      )}
      <View style={styles.radioContainer}>
        <Text style={styles.optionText}>{label}</Text>
        <RadioButton
          value={value} // Define o valor único para este botão
          status={selectedValue === value ? "checked" : "unchecked"} // Verifica se o botão deve estar marcado
          onPress={onPress} // Função para alterar o valor selecionado
        />
      </View>
    </View>
  );
};

export default RadioButtonCustom;

RadioButtonCustom.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: 288,
    height: 32,
    flexDirection: "row",
    paddingBottom: 12,
    gap: 10,
    marginTop: 30,
  },
  textHeader: {
    fontFamily: "Urbanist_400Regular",
    fontSize: 16,
    lineHeight: 18,
    color: "#0F0F0F",
  },
  radioContainer: {
    flexDirection: "row",
    width: 288,
    height: 46,
    borderTopWidth: 1,
    borderColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: "#0F0F0F",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 284,
    height: 134,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    color: "#49454F",
    fontSize: 14,
    fontFamily: "Lato_700Bold",
    fontStyle: "normal",
    lineHeight: 21,
  },
  modalDescription: {
    color: "#49454F",
    textAlign: "auto",
    fontSize: 12,
    fontFamily: "Lato_400Regular",
    fontStyle: "normal",
    lineHeight: 16,
  },
  modalCloseButton: {
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    color: "#FFF",
    position: "absolute",
    right: 0,
  },
});
