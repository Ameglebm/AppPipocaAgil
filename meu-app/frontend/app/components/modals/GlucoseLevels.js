// Bibliotecas externas
import React, { useEffect } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Componentes
import XClose from "../SvgComponents/XClose";
import IconSuccess from "../SvgComponents/IconSuccess";

const GlucoseLevels = ({
  visible,
  onClose,
  title,
  message,
  style,
  iconType,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose(); // Fecha o modal após 1 segundo
        router.back();
      }, 2000);
      return () => clearTimeout(timer); // Limpa o timer ao desmontar
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            iconType === "normal" && styles.modalViewSmall,
          ]}
        >
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              {iconType === "normal" ? <IconSuccess /> : <XClose />}
            </View>
          </View>

          <Text style={styles.modalTitle}>{title}</Text>

          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default GlucoseLevels;

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
  modalViewSmall: {
    height: 200,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  icon: {
    width: 48,
    height: 48,
    top: -24,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
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
    top: -24,
    fontFamily: "Lato_400Regular",
    color: "#282828",
    fontSize: 18,
    paddingHorizontal: 24,
    textAlign: "center",
  },
});
