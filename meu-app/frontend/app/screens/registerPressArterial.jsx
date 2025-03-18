import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import styles from "../assets/styles/registerPressArterial";
import backIcon from "../assets/images/icons/backIcon.png";
import alertSquare from "../assets/images/icons/alert-square.png";
import DatePicker from "@react-native-community/datetimepicker"; // Biblioteca usada para criar calendario e relogio
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateBloodPressure } from "../reducers/healthActions";

export default function registerPressArterial() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [selected, setSelected] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false); // abrir e fechar o modal
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState(false);
  const [selectedTime, setSelectedTime] = useState(false);

  const [systolic, setSystolic] = useState(""); // Valor do campo sistólico
  const [diastolic, setDiastolic] = useState(""); // Valor do campo diastólico
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const isButtonDisabled = !(
    systolic &&
    diastolic &&
    selectedDate &&
    selectedTime
  );

  function handleDateModal() {
    setOpenDateModal((prev) => !prev);
  }

  function handleTimeModal() {
    setOpenTimeModal((prev) => !prev);
  }

  // Mostra o modal de cancelamento
  function openCancelModal() {
    setIsModalVisible(true);
  }

  // Fecha o modal sem ação
  function closeCancelModal() {
    setIsModalVisible(false);
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
    console.log("Salvando dados...");
    const pressureData = {
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      timestamp: new Date().toISOString(),
    };

    dispatch(updateBloodPressure(pressureData)); // Salva no Redux
    console.log("Dados salvos: ", pressureData);
    router.back(); // Retorna para a tela anterior
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
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={backIcon} />
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
              {selectedDate
                ? `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
                : "/ /"}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={openDateModal}
          >
            <View style={styles.centeredView}>
              <View>
                <DatePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                      setSelectedDate(true); // Marca que a data foi escolhida
                      setOpenDateModal(false); // Fecha o modal automaticamente
                    }
                  }}
                />
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
              {selectedTime
                ? time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "00:00"}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={openTimeModal}
          >
            <View style={styles.centeredView}>
              <View>
                <DatePicker
                  mode="time"
                  display="spinner"
                  value={time}
                  onChange={(event, selectedTime) => {
                    if (selectedTime) {
                      setTime(selectedTime);
                      setSelectedTime(true); // Marca que a hora foi escolhida
                      setOpenTimeModal(false); // Fecha o modal automaticamente
                    }
                  }}
                />
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
              !isButtonDisabled ? styles.btnRegisterActive : null, // Estilo ativo se os campos estiverem preenchidos
            ]}
            onPress={saveRegister}
            disabled={isButtonDisabled}
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
                <Image source={alertSquare} />
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
