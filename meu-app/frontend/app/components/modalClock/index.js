import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DatePicker from "@react-native-community/datetimepicker";

import styles from "./styles";

const modalClock = ({ onTimeChange }) => {
  const [time, setTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, selectedDate) => {
    if (event.type === "set") {
      // Verifica se o usuário confirmou a seleção
      const currentTime = selectedDate || time;
      setTime(currentTime); // Atualiza as horas
      setSelectedTime(true); // Marca que a hora foi selecionada
      onTimeChange(currentTime); // Chama a função de callback com a hora selecionada
    }
    setShowPicker(false); // Fecha o DatePicker em qualquer caso
  };

  function handleTimeModal() {
    setShowPicker(true);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.btnModal,
          selectedTime && styles.btnModalSelected, // Aplica estilo se a hora foi salva
        ]}
        onPress={handleTimeModal}
      >
        <Text
          style={[
            styles.dateTextStyle, // Estilo padrão do texto
            selectedTime && styles.dateTextStyleSelected, // Estilo quando a hora foi salva
          ]}
        >
          {selectedTime
            ? time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "Selecione o horário"}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DatePicker
          mode="time"
          display="spinner"
          value={time}
          onChange={handleTimeChange}
          is24Hour={true} // Exibe o relógio no formato 24 horas
        />
      )}
    </View>
  );
};

export default modalClock;
