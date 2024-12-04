import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import DatePicker from "react-native-modern-datepicker";

export default function registerPressArterial() {
  const navigation = useNavigation();

  const [openDateModal, setOpenDateModal] = useState(false); // abrir e fechar o modal
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [date, setDate] = useState("/ /"); // variavel de data
  const [time, setTime] = useState("00:00");

  function handleDateModal() {
    setOpenDateModal(!openDateModal);
  }

  function handleTimeModal() {
    setOpenTimeModal(!openTimeModal);
  }

  function handleDateChange(propDate) {
    setDate(propDate);
  }

  function handleTimeChange(propTime) {
    setTime(propTime);
  }

  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/backIcon.png")} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Registrar pressão arterial</Text>
      </View>

      <View style={styles.textViews}>
        <View style={styles.containerText}>
          <Text>Sistólica (mmHg)</Text>
          <Text>/</Text>
          <Text>Diastólica (mmHg)</Text>
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.inputsText}
            placeholder="-"
            placeholderTextColor="#B1B0AF"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputsText}
            placeholder="-"
            placeholderTextColor="#B1B0AF"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Data e hora da aferição</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity style={styles.btnModal} onPress={handleDateModal}>
            <Text style={{ color: "#B1B0AF", textAlign: "center" }}>
              {date}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={openDateModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  selected={date}
                  onDateChange={handleDateChange} // capturar a data selecionada
                />
                <TouchableOpacity onPress={handleDateModal}>
                  <Text>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={styles.btnModal} onPress={handleTimeModal}>
            <Text style={{ color: "#B1B0AF", textAlign: "center" }}>
              {time}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={openTimeModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="time"
                  selected={time}
                  onTimeChange={handleTimeChange}
                />
                <TouchableOpacity onPress={handleTimeModal}>
                  <Text>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnCancel}>
            <Text style={styles.textCancel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegister}>
            <Text style={styles.textRegister}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FDFDFD",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingLeft: 10,
    marginTop: 38,
    gap: 8,
  },
  textHeader: {
    fontSize: 24,
    fontFamily: "Urbanist_700Bold",
  },
  textViews: {
    paddingTop: 16,
    alignItems: "center",
    width: 320,
    gap: 20,
  },
  containerText: {
    flexDirection: "row",
    color: "#282828",
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 21,
    gap: 20,
  },

  inputs: {
    flexDirection: "row",
    justifyContent: "center",
    width: 193,
    gap: 80,
  },
  inputsText: {
    width: 56,
    height: 42,
    backgroundColor: "#FDFDFD", // Adiciona cor de fundo
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#C8C8C7", // Cor da borda
    borderRadius: 8,
    elevation: 1, // Elevação de 1px (somente no Android)
    shadowColor: "#000", // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Posição da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 1, // Raio da sombra
  },
  dateContainer: {
    alignSelf: "flex-start", // Alinha o texto à esquerda
    width: "100%",
  },
  dateText: {
    color: "#282828",
    fontFamily: "Urbanist_400Regular",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 17.6,
  },
  btnModal: {
    width: 154,
    height: 42,
    paddingVertical: 10,
    backgroundColor: "#FDFDFD", // Adiciona cor de fundo
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#C8C8C7", // Cor da borda
    borderRadius: 8,
    elevation: 1, // Elevação de 1px (somente no Android)
    shadowColor: "#000", // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Posição da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 1, // Raio da sombra
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FDFDFD",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 8,
  },
  btnCancel: {
    width: 154,
    height: 36,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FDFDFD",
  },
  btnRegister: {
    width: 154,
    height: 36,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#7A98FF",
  },
  textCancel: {
    color: "#898887",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
  textRegister: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
});
