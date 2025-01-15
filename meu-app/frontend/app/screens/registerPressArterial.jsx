import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import DatePicker from '@react-native-community/datetimepicker'; // Biblioteca usada para criar calendario e relogio
import { useNavigation, useRouter } from "expo-router";

export default function registerPressArterial() {
  const navigation = useNavigation();
  const router = useRouter();

  const [selected, setSelected] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false); // abrir e fechar o modal
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [selectedTime, setSelectedTime] = useState(false);
  const [systolic, setSystolic] = useState(""); // Valor do campo sistólico
  const [diastolic, setDiastolic] = useState(""); // Valor do campo diastólico
  const [date, setDate] = useState("/ /"); // variavel de data
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    //Ao iniciar a página seta o header dela como false
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  function handleDateModal() {
    setOpenDateModal(!openDateModal);
  }

  function handleTimeModal() {
    setOpenTimeModal(!openTimeModal);
  }

  function handleDateChange(propDate) {
    setDate(propDate);
  }

  // Mostra o modal de cancelamento
  function openCancelModal() {
    setIsModalVisible(true);
  }

  // Fecha o modal sem ação
  function closeCancelModal() {
    setIsModalVisible(false);
  }

  function saveDate() {
    if (date !== "/ /") {
      setSelectedDate(true); // Marca que uma data válida foi selecionada
      setOpenDateModal(false); // Fecha o modal
    }
  }

  function handleTimeChange(propTime) {
    setTime(propTime);
  }

  function saveTime() {
    if (date !== "00:00") {
      setSelectedTime(true); // Marca que uma hora válida foi selecionada
      setOpenTimeModal(false); // Fecha o modal
    }
  }
  // Reseta todos os campos para os valores padrão
  function resetFields() {
    setSystolic("");
    setDiastolic("");
    setSelectedDate(false);
    setSelectedTime(false);
    setDate("/ /");
    setTime("00:00");
  }

  // Confirma o cancelamento e reseta os campos
  function confirmCancel() {
    resetFields();
    closeCancelModal();
  }
  const saveRegister = () => {
    console.log("Registro Salvo");
    router.replace("./homeScreen");
  };

  /*API para validar e enviar os dados futuramente
  const sendForm = async () => {
    try {
      const response = await api.post("/endpoint-", {
        systolic: systolic,
        diastolic: diastolic,
        date: date,
        time: time,
      });

      console.log(response);

      if (){
        router.replace('/dir-tela')
      } 
    } catch {
      console.log("Error ao registar")
    }
  };*/

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
            style={[
              styles.inputsText,
              selected === "systolic" && styles.inputFocused, // Aplica o estilo se for o campo sistólico
            ]}
            onFocus={() => setSelected("systolic")} // Define o campo atual como focado
            onBlur={() => setSelected(null)} // Reseta o estado quando desfocado
            placeholder="-"
            placeholderTextColor="#B1B0AF"
            keyboardType="numeric"
            value={systolic}
            onChangeText={(text) => setSystolic(text)} // Atualiza o valor do campo sistólico
          />
          <TextInput
            style={[
              styles.inputsText,
              selected === "diastolic" && styles.inputFocused, // Aplica o estilo se for o campo sistólico
            ]}
            onFocus={() => setSelected("diastolic")} // Define o campo atual como focado
            onBlur={() => setSelected(null)} // Reseta o estado quando desfocado
            placeholder="-"
            placeholderTextColor="#B1B0AF"
            keyboardType="numeric"
            value={diastolic}
            onChangeText={(text) => setDiastolic(text)} // Atualiza o valor do campo sistólico
          />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Data e hora da aferição</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={[
              styles.btnModal,
              selectedDate && styles.btnModalSelected, // Aplica estilo se a data foi salva
            ]}
            onPress={handleDateModal}
          >
            <Text
              style={[
                styles.dateTextStyle, // Estilo padrão do texto
                selectedDate && styles.dateTextStyleSelected, // Estilo quando a data foi salva
              ]}
            >
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
                mode="date"
                display="spinner"
                value={date}
                onChange={handleDateChange}
                />
                <TouchableOpacity onPress={saveDate}>
                  <Text>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={[
              styles.btnModal,
              selectedTime && styles.btnModalSelected, // Aplica estilo se a data foi salva
            ]}
            onPress={handleTimeModal}
          >
            <Text
              style={[
                styles.dateTextStyle, // Estilo padrão do texto
                selectedTime && styles.dateTextStyleSelected, // Estilo quando a data foi salva
              ]}
            >
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
                display="spinner"
                value={time}
                onChange={handleTimeChange}
                />
                <TouchableOpacity onPress={saveTime}>
                  <Text>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnCancel} onPress={openCancelModal}>
            <Text style={styles.textCancel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnRegister,
              systolic && diastolic && selectedDate && selectedTime
                ? styles.btnRegisterActive
                : null, // Estilo ativo se os campos estiverem preenchidos
            ]}
            onPress={saveRegister}
          >
            <Text style={styles.textRegister}>Registrar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de Confirmação */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.image}>
                <Image source={require("../assets/images/alert-square.png")} />
              </View>

              <Text style={styles.modalText}>
                Confirmar cancelamento do registro de Pressão Arterial?
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButtonConfirm}
                  onPress={confirmCancel}
                >
                  <Text style={styles.modalButtonText}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={closeCancelModal}
                >
                  <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  inputFocused: {
    borderColor: "#B4D2F8", // Cor de borda ao focar
    borderWidth: 2, // Bordas mais espessas
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
  btnModalSelected: {
    backgroundColor: "#EDF3FF", // Cor de fundo para indicar seleção
    borderColor: "#EDF3FF", // Mesma cor da borda
  },
  dateTextStyle: {
    color: "#898887", // Cor padrão
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lato_400Regular",
  },

  dateTextStyleSelected: {
    color: "#282828", // Cor do texto ao salvar
    textAlign: "center",
    fontFamily: "Lato_400Regular",
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
  textCancel: {
    color: "#898887",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },
  btnRegister: {
    width: 154,
    height: 36,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#7A98FF",
    borderWidth: 1,
    borderColor: "#7A98FF", // Persian Blue do Figma
    // Sombras
    shadowColor: "rgba(12, 12, 13, 1)", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.15, // Opacidade da primeira sombra
    shadowRadius: 6, // Raio da primeira sombra
    elevation: 6, // Necessário para Android
  },
  btnRegisterActive: {
    backgroundColor: "#2F39D3", // Cor quando ativo
  },
  textRegister: {
    color: "#FDFDFD",
    fontFamily: "Urbanist_700Bold",
    fontSize: 18,
    lineHeight: 19.8,
  },

  modalOverlay: {
    flex: 1,
    height: 222,
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
